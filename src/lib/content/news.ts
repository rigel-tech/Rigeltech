import { draftMode } from "next/headers";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";
import { newsData, type NewsItem } from "@/app/news/data";
import { resolveMediaUrl } from "@/lib/media";

type NewsQueryOptions = {
    limit?: number;
    popular?: boolean;
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
        if (draft) {
            return {
                $or: [
                    { status: "draft" },
                    { status: "published" },
                    { status: { $exists: false } },
                ],
            };
        }
        return {
            $or: [{ status: "published" }, { status: { $exists: false } }],
        };
    } catch {
        return {
            $or: [{ status: "published" }, { status: { $exists: false } }],
        };
    }
};

type NewsDoc = NewsItem & {
    slug?: string;
    _id?: unknown;
    createdAt?: string;
    updatedAt?: string;
    status?: string;
    sourceKey?: string;
    order?: number | string;
};

const isValidObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

const parseDateValue = (value?: string) => {
    if (!value || typeof value !== "string") return null;
    const [day, month, year] = value.split("/");
    if (!day || !month || !year) return null;
    const iso = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00Z`;
    const time = Date.parse(iso);
    return Number.isNaN(time) ? null : time;
};

const parseIsoDate = (value?: string) => {
    if (!value || typeof value !== "string") return null;
    const time = Date.parse(value);
    return Number.isNaN(time) ? null : time;
};

const getOrderValue = (item: NewsDoc): number | null => {
    const value = item.order;
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return null;
};

const sortNewsItems = (items: NewsDoc[]) => {
    return [...items].sort((a, b) => {
        const orderA = getOrderValue(a);
        const orderB = getOrderValue(b);

        if (orderA !== null || orderB !== null) {
            if (orderA !== null && orderB !== null) {
                if (orderA !== orderB) return orderA - orderB;
            } else if (orderA !== null) {
                return -1;
            } else if (orderB !== null) {
                return 1;
            }
        }

        const dateA =
            parseDateValue(a.date as string) ??
            parseIsoDate(a.updatedAt as string) ??
            parseIsoDate(a.createdAt as string) ??
            0;
        const dateB =
            parseDateValue(b.date as string) ??
            parseIsoDate(b.updatedAt as string) ??
            parseIsoDate(b.createdAt as string) ??
            0;
        return dateB - dateA;
    });
};

const normalizeNews = async (items: NewsDoc[]): Promise<NewsItem[]> => {
    const validItems = items.filter(
        (item) => item && typeof item.title === "string",
    );
    return Promise.all(
        validItems.map(async (item) => {
            // Serialize MongoDB objects to plain objects
            const serializedItem = JSON.parse(JSON.stringify(item));
            return {
                ...serializedItem,
                id: item.id || item.slug || String(item._id ?? ""),
                image: await resolveMediaUrl(item.image || ""),
            };
        }),
    );
};

export const getLatestNews = async (options: NewsQueryOptions = {}) => {
    const mode = getSourceMode();
    const allowDbFallback = Boolean(process.env.MONGODB_URI);

    if (mode === "static" && !allowDbFallback) {
        const fallback = newsData.filter((news) => !news.isPopular);
        return options.limit ? fallback.slice(0, options.limit) : fallback;
    }

    const mergeWithSeed = async (seedItems: NewsItem[]) => {
        const seedById = new Map(seedItems.map((item) => [item.id, item]));
        try {
            const db = await getDatabase();
            const statusFilter = await buildStatusFilter();
            const query: Record<string, unknown> = {
                $and: [
                    statusFilter,
                    {
                        $or: [
                            { isPopular: false },
                            { isPopular: "false" },
                            { isPopular: 0 },
                            { isPopular: { $exists: false } },
                        ],
                    },
                ],
            };

            const cursor = db.collection<NewsDoc>("news").find(query);
            cursor.sort({ updatedAt: -1, createdAt: -1 });

            if (options.limit) {
                cursor.limit(options.limit);
            }

            const rawItems = await cursor.toArray();
            const dbItems = await normalizeNews(sortNewsItems(rawItems));
            dbItems.forEach((item) => seedById.set(item.id, item));
            const merged = Array.from(seedById.values());
            return sortNewsItems(merged);
        } catch {
            // If db fails, fall back to seed only.
            return seedItems;
        }
    };

    const seedFallback = sortNewsItems(newsData.filter((news) => !news.isPopular));
    if (mode === "static") {
        const merged = await mergeWithSeed(seedFallback);
        return options.limit ? merged.slice(0, options.limit) : merged;
    }

    try {
        const merged = await mergeWithSeed(seedFallback);
        if (merged.length > 0 || mode === "db") {
            return options.limit ? merged.slice(0, options.limit) : merged;
        }
    } catch {
        if (mode === "db") {
            throw new Error("Failed to load news from database.");
        }
    }

    return options.limit ? seedFallback.slice(0, options.limit) : seedFallback;
};

export const getPopularNews = async (options: NewsQueryOptions = {}) => {
    const mode = getSourceMode();
    const allowDbFallback = Boolean(process.env.MONGODB_URI);

    if (mode === "static" && !allowDbFallback) {
        const fallback = newsData.filter((news) => news.isPopular);
        return options.limit ? fallback.slice(0, options.limit) : fallback;
    }

    const mergeWithSeed = async (seedItems: NewsItem[]) => {
        const seedById = new Map(seedItems.map((item) => [item.id, item]));
        try {
            const db = await getDatabase();
            const statusFilter = await buildStatusFilter();
            const query: Record<string, unknown> = {
                $and: [
                    statusFilter,
                    { $or: [{ isPopular: true }, { isPopular: "true" }, { isPopular: 1 }] },
                ],
            };

            const cursor = db.collection<NewsDoc>("news").find(query);
            cursor.sort({ updatedAt: -1, createdAt: -1 });

            if (options.limit) {
                cursor.limit(options.limit);
            }

            const rawItems = await cursor.toArray();
            const dbItems = await normalizeNews(sortNewsItems(rawItems));
            dbItems.forEach((item) => seedById.set(item.id, item));
            const merged = Array.from(seedById.values());
            return sortNewsItems(merged);
        } catch {
            return seedItems;
        }
    };

    const seedFallback = sortNewsItems(newsData.filter((news) => news.isPopular));
    if (mode === "static") {
        const merged = await mergeWithSeed(seedFallback);
        return options.limit ? merged.slice(0, options.limit) : merged;
    }

    try {
        const merged = await mergeWithSeed(seedFallback);
        if (merged.length > 0 || mode === "db") {
            return options.limit ? merged.slice(0, options.limit) : merged;
        }
    } catch {
        if (mode === "db") {
            throw new Error("Failed to load news from database.");
        }
    }

    return options.limit ? seedFallback.slice(0, options.limit) : seedFallback;
};

export const getNews = async (options: NewsQueryOptions = {}): Promise<NewsItem[]> => {
    const mode = getSourceMode();
    if (mode === "static") {
        const fallback = sortNewsItems(newsData);
        return options.limit ? fallback.slice(0, options.limit) : fallback;
    }

    try {
        const db = await getDatabase();
        const statusFilter = await buildStatusFilter();
        const query: Record<string, unknown> = statusFilter;

        const cursor = db.collection<NewsDoc>("news").find(query);
        cursor.sort({ updatedAt: -1, createdAt: -1 });

        if (options.limit) {
            cursor.limit(options.limit);
        }

        const rawItems = await cursor.toArray();
        const items = sortNewsItems(rawItems);
        if (items.length > 0 || mode === "db") return normalizeNews(items);
    } catch {
        if (mode === "db") {
            throw new Error("Failed to load news from database.");
        }
    }

    const fallback = sortNewsItems(newsData);
    return options.limit ? fallback.slice(0, options.limit) : fallback;
};

export const getNewsBySlug = async (slug: string) => {
    const mode = getSourceMode();
    const allowDbFallback = Boolean(process.env.MONGODB_URI);

    if (mode !== "static" || allowDbFallback) {
        try {
            const db = await getDatabase();
            const clauses: Record<string, unknown>[] = [{ slug }, { id: slug }];
            if (isValidObjectId(slug)) {
                clauses.push({ _id: new ObjectId(slug) });
            }
            const statusFilter = await buildStatusFilter();
            const query: Record<string, unknown> = {
                $and: [statusFilter, { $or: clauses }],
            };
            let item = await db.collection<NewsDoc>("news").findOne(query);
            if (!item) {
                item = await db
                    .collection<NewsDoc>("news")
                    .findOne({ $or: clauses });
            }
            if (item && typeof item.title === "string") {
                return {
                    ...item,
                    id: item.id || item.slug || String(item._id ?? ""),
                    image: await resolveMediaUrl(item.image || ""),
                };
            }

            if (mode === "db") {
                return null;
            }
        } catch {
            if (mode === "db") {
                throw new Error("Failed to load news by slug from database.");
            }
        }
    }

    return newsData.find((news) => news.id === slug) || null;
};
