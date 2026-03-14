import { draftMode } from "next/headers";
import { getMongoClient } from "@/lib/mongodb";
import { FIELDS } from "@/constants/data";
import { resolveMediaUrl } from "@/lib/media";

export type Field = {
    id: number;
    icon: string;
    title: string;
    description: string;
    features: string[];
};

type FieldDoc = Partial<Field> & {
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

const normalizeFields = async (items: FieldDoc[]): Promise<Field[]> =>
    Promise.all(
        items.map(async (item, index) => ({
            id:
                typeof item.id === "number"
                    ? item.id
                    : Number.parseInt(String(item.slug || ""), 10) ||
                      index + 1,
            icon: await resolveMediaUrl(item.icon || ""),
            title: item.title || "",
            description: item.description || "",
            features: item.features || [],
        })),
    );

export const getFields = async (): Promise<Field[]> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return FIELDS as Field[];
    }

    try {
        const db = await getDatabase();
        const query = await buildStatusFilter();
        const items = await db
            .collection<FieldDoc>("fields")
            .find(query)
            .toArray();

        if (items.length > 0 || mode === "db") {
            return normalizeFields(items);
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return FIELDS as Field[];
};
