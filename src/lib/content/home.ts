import { draftMode } from "next/headers";
import { BANNER_IMAGES, CLIENT_LOGOS } from "@/constants/images";
import { getMongoClient } from "@/lib/mongodb";
import { resolveMediaUrl, resolveMediaUrls } from "@/lib/media";

export type HomeBlock = {
    id: string;
    type:
        | "banner"
        | "about"
        | "news"
        | "fields"
        | "services"
        | "serviceExtra"
        | "clients";
    label?: string;
    visible?: boolean;
};

export type HomeContent = {
    key: string;
    hero: {
        headline: string;
        subheadline: string;
    };
    bannerSlides: {
        id: string;
        image: string;
        alt: string;
        title: string;
        description: string;
    }[];
    about: {
        title: string;
        heading: string;
        body: string;
        stats: { value: string; label: string }[];
        image: string;
        imageAlt: string;
    };
    clients: {
        title: string;
        logos: { id: string; image: string; alt: string }[];
    };
    blocks: HomeBlock[];
    docKey?: string;
};

type HomeDoc = Partial<HomeContent> & {
    status?: string;
    sourceKey?: string;
    _id?: unknown;
};

const DEFAULT_BLOCKS: HomeBlock[] = [
    { id: "banner", type: "banner", label: "Banner", visible: true },
    { id: "about", type: "about", label: "About", visible: true },
    { id: "news", type: "news", label: "News", visible: true },
    { id: "fields", type: "fields", label: "Fields", visible: true },
    { id: "services", type: "services", label: "Services", visible: true },
    {
        id: "serviceExtra",
        type: "serviceExtra",
        label: "Service Extra",
        visible: true,
    },
    { id: "clients", type: "clients", label: "Clients", visible: true },
];

const HOME_FALLBACK: HomeContent = {
    key: "default",
    hero: {
        headline: "Rigel Tech - Công nghệ tài chính số hàng đầu Việt Nam",
        subheadline:
            "Đối tác tin cậy trong hành trình chuyển đổi số của doanh nghiệp",
    },
    bannerSlides: BANNER_IMAGES.map((banner) => ({
        id: String(banner.id),
        image: banner.src,
        alt: banner.alt,
        title: banner.title,
        description: banner.description,
    })),
    about: {
        title: "Về RIGEL TECH",
        heading: "Sáng tạo & Chuyên môn",
        body: "RIGEL TECH là công ty công nghệ với đội ngũ kỹ sư phần mềm giàu nhiệt huyết và sáng tạo. Chúng tôi chuyên phát triển các giải pháp web hiện đại và ứng dụng di động thông minh, giúp doanh nghiệp bắt kịp xu hướng công nghệ mới.",
        stats: [
            { value: "15+", label: "Chuyên gia công nghệ" },
            { value: "20+", label: "Dự án đang phát triển" },
        ],
        image: "/about-bg.png",
        imageAlt: "About Us",
    },
    clients: {
        title: "Khách hàng tiêu biểu của Rigel Tech",
        logos: CLIENT_LOGOS.map((client) => ({
            id: String(client.id),
            image: client.src,
            alt: client.alt,
        })),
    },
    blocks: DEFAULT_BLOCKS,
    docKey: "home:default",
};

const getDatabase = async () => {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB;
    return dbName ? client.db(dbName) : client.db();
};

const getSourceMode = () => {
    const source = process.env.CONTENT_SOURCE?.toLowerCase();
    if (!source || source === "auto") return "auto";
    if (source === "db") return "db";
    return "static";
};

const buildStatusFilter = async () => {
    try {
        const { isEnabled: draft } = await draftMode();
        const status = draft ? "draft" : "published";
        return {
            $or: [{ status }, { status: { $exists: false } }],
        };
    } catch {
        return {
            $or: [{ status: "published" }, { status: { $exists: false } }],
        };
    }
};

const normalizeBlocks = (blocks?: HomeBlock[]) => {
    if (!Array.isArray(blocks) || blocks.length === 0) {
        return DEFAULT_BLOCKS;
    }
    return blocks.map((block, index) => ({
        id: block.id || `${block.type}-${index}`,
        type: block.type,
        label: block.label,
        visible: block.visible ?? true,
    }));
};

const normalizeHome = async (doc?: HomeDoc): Promise<HomeContent> => {
    const key = doc?.key || HOME_FALLBACK.key;
    const hero = doc?.hero || HOME_FALLBACK.hero;
    const bannerSlides = doc?.bannerSlides || HOME_FALLBACK.bannerSlides;
    const about = doc?.about || HOME_FALLBACK.about;
    const clients = doc?.clients || HOME_FALLBACK.clients;
    const blocks = normalizeBlocks(doc?.blocks);

    const [slides, aboutImage, logos] = await Promise.all([
        Promise.all(
            bannerSlides.map(async (slide, index) => ({
                id: slide.id || String(index + 1),
                image: await resolveMediaUrl(slide.image || ""),
                alt: slide.alt || "",
                title: slide.title || "",
                description: slide.description || "",
            })),
        ),
        resolveMediaUrl(about.image || ""),
        resolveMediaUrls(clients.logos.map((logo) => logo.image || "")),
    ]);

    return {
        key,
        hero: {
            headline: hero.headline || "",
            subheadline: hero.subheadline || "",
        },
        bannerSlides: slides,
        about: {
            title: about.title || "",
            heading: about.heading || "",
            body: about.body || "",
            stats: about.stats || [],
            image: aboutImage,
            imageAlt: about.imageAlt || "",
        },
        clients: {
            title: clients.title || "",
            logos: clients.logos.map((logo, index) => ({
                id: logo.id || String(index + 1),
                image: logos[index] || logo.image || "",
                alt: logo.alt || "",
            })),
        },
        blocks,
        docKey: String(doc?.sourceKey || doc?._id || doc?.key || key),
    };
};

export const getHomeContent = async (): Promise<HomeContent> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return HOME_FALLBACK;
    }

    try {
        const db = await getDatabase();
        const query = {
            ...(await buildStatusFilter()),
            key: HOME_FALLBACK.key,
        };
        const doc = await db.collection<HomeDoc>("home").findOne(query);
        if (doc || mode === "db") {
            return normalizeHome(doc || {});
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return HOME_FALLBACK;
};

export const HOME_BLOCK_TYPES = DEFAULT_BLOCKS;
