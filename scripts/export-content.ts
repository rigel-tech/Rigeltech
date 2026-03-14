import { promises as fs } from "fs";
import path from "path";
import { newsData } from "../src/app/news/data";
import { projects } from "../src/app/projects/data";
import { FIELDS, SERVICES } from "../src/constants/data";
import {
    companyLinks,
    serviceLinks,
    socialLinks,
} from "../src/constants/footerLinks";
import { positions } from "../src/app/careers/data";
import { TEAM_MEMBERS } from "../src/lib/content/team-static";
import { SITE_SETTINGS_FALLBACK } from "../src/lib/content/site";
import {
    ABOUT_FALLBACK,
    PRIVACY_FALLBACK,
    TERMS_FALLBACK,
} from "../src/lib/content/pages";

type ExportDoc = Record<string, unknown> & {
    sourceKey: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

const now = new Date().toISOString();

const makeSourceKeyFactory = (collection: string) => {
    const counts = new Map<string, number>();
    return (baseKey: string, index: number) => {
        const safeKey = baseKey || String(index);
        const count = counts.get(safeKey) ?? 0;
        counts.set(safeKey, count + 1);
        const suffix = count > 0 ? `:${count}` : "";
        return `${collection}:${safeKey}${suffix}`;
    };
};

const withMeta = (
    collection: string,
    items: Record<string, unknown>[],
    baseKeyFn: (item: Record<string, unknown>, index: number) => string,
): ExportDoc[] => {
    const makeKey = makeSourceKeyFactory(collection);
    return items.map((item, index) => {
        const baseKey = baseKeyFn(item, index);
        const sourceKey = makeKey(baseKey, index);
        const status = (item.status as string) || "published";
        return {
            ...item,
            status,
            sourceKey,
            createdAt: (item.createdAt as string) || now,
            updatedAt: now,
        };
    });
};

const outputDir = path.resolve(process.cwd(), "content", "seed");

const writeJson = async (name: string, data: ExportDoc[]) => {
    const filePath = path.join(outputDir, `${name}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return { name, filePath, count: data.length };
};

const run = async () => {
    await fs.mkdir(outputDir, { recursive: true });

    const news = withMeta(
        "news",
        newsData.map((item) => {
            const typed = item as typeof item & { slug?: string };
            return {
                ...item,
                slug: typed.slug || item.id,
            };
        }),
        (item) => String(item.id || item.slug || ""),
    );

    const projectsData = withMeta(
        "projects",
        projects.map((item) => {
            const typed = item as typeof item & { slug?: string };
            return {
                ...item,
                slug: typed.slug || item.id,
            };
        }),
        (item, index) => String(item.id || item.slug || index),
    );

    const fieldsData = withMeta(
        "fields",
        FIELDS as unknown as Record<string, unknown>[],
        (item, index) => String(item.id || item.slug || index),
    );

    const servicesData = withMeta(
        "services",
        SERVICES as unknown as Record<string, unknown>[],
        (item, index) => String(item.title || item.slug || index),
    );

    const careersData = withMeta(
        "careers",
        positions as unknown as Record<string, unknown>[],
        (item, index) => String(item.id || item.slug || index),
    );

    const teamData = withMeta(
        "teamMembers",
        TEAM_MEMBERS as unknown as Record<string, unknown>[],
        (item, index) => String(item.id || item.slug || index),
    );

    const siteSettingsData = withMeta(
        "siteSettings",
        [SITE_SETTINGS_FALLBACK as unknown as Record<string, unknown>],
        (item) => String(item.key || "default"),
    );

    const navigationData = withMeta(
        "navigation",
        [
            {
                key: "footer",
                serviceLinks,
                companyLinks,
                socialLinks,
            } as unknown as Record<string, unknown>,
        ],
        (item) => String(item.key || "footer"),
    );

    const pagesData = withMeta(
        "pages",
        [
            {
                slug: "about",
                type: "about",
                title: ABOUT_FALLBACK.title,
                content: ABOUT_FALLBACK,
            },
            {
                slug: PRIVACY_FALLBACK.slug,
                type: "legal",
                title: PRIVACY_FALLBACK.title,
                contentHtml: PRIVACY_FALLBACK.contentHtml,
            },
            {
                slug: TERMS_FALLBACK.slug,
                type: "legal",
                title: TERMS_FALLBACK.title,
                contentHtml: TERMS_FALLBACK.contentHtml,
            },
        ] as unknown as Record<string, unknown>[],
        (item) => String(item.slug || item.title || ""),
    );

    const results = await Promise.all([
        writeJson("news", news),
        writeJson("projects", projectsData),
        writeJson("fields", fieldsData),
        writeJson("services", servicesData),
        writeJson("careers", careersData),
        writeJson("teamMembers", teamData),
        writeJson("siteSettings", siteSettingsData),
        writeJson("navigation", navigationData),
        writeJson("pages", pagesData),
    ]);

    results.forEach((result) => {
        console.log(
            `Exported ${result.count} items to ${path.relative(
                process.cwd(),
                result.filePath,
            )}`,
        );
    });
};

run().catch((error) => {
    console.error("Export failed:", error);
    process.exit(1);
});
