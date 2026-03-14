import { draftMode } from "next/headers";
import { getMongoClient } from "@/lib/mongodb";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/content/team-static";
import { resolveMediaUrl } from "@/lib/media";

type TeamDoc = Partial<TeamMember> & {
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

const normalizeTeam = async (items: TeamDoc[]): Promise<TeamMember[]> =>
    Promise.all(
        items.map(async (item, index) => ({
            id: item.id || item.slug || String(item._id ?? index),
            name: item.name || { vi: "", en: "" },
            position: item.position || { vi: "", en: "" },
            phone: item.phone,
            mobile: item.mobile || "",
            email: item.email || "",
            qrCode: await resolveMediaUrl(item.qrCode || ""),
        })),
    );

export const getTeamMembers = async (): Promise<TeamMember[]> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return TEAM_MEMBERS;
    }

    try {
        const db = await getDatabase();
        const query = await buildStatusFilter();
        const items = await db
            .collection<TeamDoc>("teamMembers")
            .find(query)
            .toArray();

        if (items.length > 0 || mode === "db") {
            return normalizeTeam(items);
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return TEAM_MEMBERS;
};
