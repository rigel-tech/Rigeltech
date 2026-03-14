import { draftMode } from "next/headers";
import { getMongoClient } from "@/lib/mongodb";
import { SERVICES } from "@/constants/data";
import { resolveMediaUrl } from "@/lib/media";

export type Service = {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    sourceKey?: string;
};

type ServiceDoc = Partial<Service> & {
    slug?: string;
    id?: string | number;
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

const normalizeServices = async (items: ServiceDoc[]): Promise<Service[]> =>
    Promise.all(
        items.map(async (item, index) => ({
            title: item.title || "",
            subtitle: item.subtitle || "",
            description: item.description || "",
            icon: await resolveMediaUrl(item.icon || ""),
            sourceKey: item.sourceKey
                ? String(item.sourceKey)
                : item.slug
                  ? String(item.slug)
                  : item.id
                    ? String(item.id)
                    : String(item._id ?? index),
        })),
    );

export const getServices = async (): Promise<Service[]> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return SERVICES as Service[];
    }

    try {
        const db = await getDatabase();
        const query = await buildStatusFilter();
        const items = await db
            .collection<ServiceDoc>("services")
            .find(query)
            .toArray();

        if (items.length > 0 || mode === "db") {
            return normalizeServices(items);
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return SERVICES as Service[];
};
