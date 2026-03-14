import { draftMode } from "next/headers";
import { getMongoClient } from "@/lib/mongodb";
import { positions, type Position } from "@/app/careers/data";
import { resolveMediaUrl } from "@/lib/media";

type PositionDoc = Partial<Position> & {
    slug?: string;
    _id?: unknown;
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

const normalizePositions = async (items: PositionDoc[]): Promise<Position[]> =>
    Promise.all(
        items.map(async (item, index) => ({
            id: item.id || item.slug || String(item._id ?? index),
            title: item.title || "",
            tags: item.tags || [],
            description: item.description || "",
            icon: await resolveMediaUrl(item.icon || "💼"),
            salary: item.salary || "",
            location: item.location || "",
            type: item.type || "",
            urgent: Boolean(item.urgent),
        })),
    );

export const getOpenPositions = async (): Promise<Position[]> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return positions;
    }

    try {
        const db = await getDatabase();
        const query = await buildStatusFilter();
        const items = await db
            .collection<PositionDoc>("careers")
            .find(query)
            .toArray();

        if (items.length > 0 || mode === "db") {
            return normalizePositions(items);
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return positions;
};
