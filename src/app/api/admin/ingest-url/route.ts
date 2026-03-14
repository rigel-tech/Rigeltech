import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const getAdminKey = () =>
    process.env.ADMIN_API_KEY ||
    process.env.DRAFT_SECRET ||
    process.env.REVALIDATE_SECRET;

const isAuthorized = (req: Request) => {
    const secret = req.headers.get("x-admin-key");
    const adminKey = getAdminKey();
    return Boolean(adminKey && secret === adminKey);
};

const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
};

const decodeHtml = (value: string) =>
    value
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

const pickMeta = (html: string, name: string) => {
    const regex = new RegExp(
        `<meta[^>]+(?:property|name)=[\"']${name}[\"'][^>]+content=[\"']([^\"']+)[\"'][^>]*>`,
        "i",
    );
    const match = html.match(regex);
    return match?.[1] ? decodeHtml(match[1]) : "";
};

const pickTitle = (html: string) => {
    const ogTitle = pickMeta(html, "og:title");
    if (ogTitle) return ogTitle;
    const twitterTitle = pickMeta(html, "twitter:title");
    if (twitterTitle) return twitterTitle;
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match?.[1] ? decodeHtml(match[1]) : "";
};

const pickDescription = (html: string) => {
    const ogDesc = pickMeta(html, "og:description");
    if (ogDesc) return ogDesc;
    const twitterDesc = pickMeta(html, "twitter:description");
    if (twitterDesc) return twitterDesc;
    const metaDesc = pickMeta(html, "description");
    return metaDesc || "";
};

const pickImage = (html: string) => {
    const ogImg = pickMeta(html, "og:image");
    if (ogImg) return ogImg;
    const twitterImg = pickMeta(html, "twitter:image");
    if (twitterImg) return twitterImg;
    return "";
};

const pickCanonical = (html: string) => {
    const match = html.match(
        /<link[^>]+rel=[\"']canonical[\"'][^>]+href=[\"']([^\"']+)[\"'][^>]*>/i,
    );
    return match?.[1] ? decodeHtml(match[1]) : "";
};

const removeTags = (html: string, tag: string) => {
    const re = new RegExp(`<${tag}[^>]*>[\s\S]*?<\/${tag}>`, "gi");
    return html.replace(re, "");
};

const normalizeRelativeUrls = (html: string, baseUrl: string) => {
    try {
        const base = new URL(baseUrl);

        // Fix src and href attributes that are relative.
        html = html.replace(
            /\b(src|href)=(["'])(?!https?:|\/\/)([^"']+)\2/gi,
            (match, attr, quote, value) => {
                try {
                    return `${attr}=${quote}${new URL(value, base).toString()}${quote}`;
                } catch {
                    return match;
                }
            },
        );

        // Ensure lazy-loaded images have a usable src/srcset.
        html = html
            .replace(/\bdata-src=(["'])([^"']+)\1/gi, "src=$1$2$1")
            .replace(/\bdata-srcset=(["'])([^"']+)\1/gi, "srcset=$1$2$1")
            .replace(/\bdata-original=(["'])([^"']+)\1/gi, "src=$1$2$1");

        // Fix srcset values (comma separated list of urls+descriptors)
        html = html.replace(
            /\bsrcset=(["'])([^"']+)\1/gi,
            (match, quote, value) => {
                const parts = value.split(",");
                const fixed = parts
                    .map((part: string) => {
                        const [url, ...rest] = part.trim().split(/\s+/);
                        try {
                            const abs = new URL(url, base).toString();
                            return [abs, ...rest].join(" ");
                        } catch {
                            return part;
                        }
                    })
                    .join(", ");
                return `srcset=${quote}${fixed}${quote}`;
            },
        );

        return html;
    } catch {
        return html;
    }
};

const embedVideos = (html: string) => {
    // Convert YouTube links to embeds
    html = html.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi,
        (match, videoId) => {
            return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
    );

    // Convert Vimeo links to embeds
    html = html.replace(
        /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/gi,
        (match, videoId) => {
            return `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
    );

    return html;
};

const pickContent = (html: string, baseUrl: string) => {
    // Prefer article content blocks used by many news sites.
    const patterns = [
        /<div[^>]+class=["'][^"']*article-content[^"']*["'][\s\S]*?<\/div>/i,
        /<div[^>]+id=["']content_article["'][\s\S]*?<\/div>/i,
        /<article[\s\S]*?<\/article>/i,
        /<body[^>]*>([\s\S]*?)<\/body>/i,
    ];

    let content = "";
    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) {
            content = match[0];
            break;
        }
    }

    // Remove common layout elements that belong to the site wrapper.
    ["header", "footer", "nav", "aside", "script", "style", "noscript"].forEach(
        (tag) => {
            content = removeTags(content, tag);
        },
    );

    // Normalize relative URLs so images and links work when embedded.
    content = normalizeRelativeUrls(content, baseUrl);

    // Convert video links to embedded players
    content = embedVideos(content);

    return content;
};

export async function POST(req: Request) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload: { url?: string } = {};
    try {
        payload = (await req.json()) as { url?: string };
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const normalized = payload.url ? normalizeUrl(payload.url) : null;
    if (!normalized) {
        return NextResponse.json(
            { error: "Missing url" },
            { status: 400 },
        );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // Reduced timeout
    try {
        const res = await fetch(normalized, {
            method: "GET",
            headers: { 
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "vi,en-US;q=0.9,en;q=0.8",
            },
            signal: controller.signal,
        });
        if (!res.ok) {
            const statusText = res.status === 403 ? "Truy cập bị từ chối" :
                              res.status === 404 ? "Không tìm thấy trang" :
                              res.status === 429 ? "Quá nhiều yêu cầu" :
                              `Lỗi HTTP ${res.status}`;
            return NextResponse.json(
                { error: `Không thể tải nội dung: ${statusText}` },
                { status: 400 },
            );
        }
        const html = await res.text();
        
        // Check for JavaScript redirect/bot protection
        if (html.includes('document.cookie=') && html.includes('window.location.reload')) {
            return NextResponse.json(
                { error: "Trang web có bảo vệ chống bot. Không thể tự động lấy nội dung. Vui lòng sao chép nội dung thủ công." },
                { status: 400 },
            );
        }
        
        // Check for other common bot protection patterns
        if (html.includes('captcha') || html.includes('recaptcha') || html.length < 1000) {
            return NextResponse.json(
                { error: "Trang web yêu cầu xác thực hoặc có bảo vệ chống truy cập tự động." },
                { status: 400 },
            );
        }
        
        const title = pickTitle(html);
        const description = pickDescription(html);
        const imageRaw = pickImage(html);
        const canonical = pickCanonical(html) || normalized;
        const content = pickContent(html, normalized);

        let image = "";
        if (imageRaw) {
            try {
                image = new URL(imageRaw, normalized).toString();
            } catch {
                image = imageRaw;
            }
        }

        return NextResponse.json({
            title,
            description,
            image,
            canonical,
            content,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        const userFriendlyMessage = 
            errorMessage.includes("aborted") ? "Yêu cầu bị timeout (quá thời gian chờ)" :
            errorMessage.includes("ENOTFOUND") ? "Không thể kết nối đến domain" :
            errorMessage.includes("ECONNREFUSED") ? "Kết nối bị từ chối" :
            `Lỗi kết nối: ${errorMessage}`;
        return NextResponse.json(
            { error: userFriendlyMessage },
            { status: 400 },
        );
    } finally {
        clearTimeout(timeout);
    }
}
