import { draftMode } from "next/headers";
import { getMongoClient } from "@/lib/mongodb";
import {
    serviceLinks,
    companyLinks,
    socialLinks,
} from "@/constants/footerLinks";

export type NavLink = {
    name: string;
    href: string;
};

export type FooterLinks = {
    serviceLinks: NavLink[];
    companyLinks: NavLink[];
    socialLinks: NavLink[];
};

const FOOTER_FALLBACK: FooterLinks = {
    serviceLinks,
    companyLinks,
    socialLinks,
};

type FooterLinksDoc = Partial<FooterLinks> & {
    key?: string;
    status?: string;
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

const normalizeFooterLinks = (doc: FooterLinksDoc): FooterLinks => ({
    serviceLinks: doc.serviceLinks || FOOTER_FALLBACK.serviceLinks,
    companyLinks: doc.companyLinks || FOOTER_FALLBACK.companyLinks,
    socialLinks: doc.socialLinks || FOOTER_FALLBACK.socialLinks,
});

export const getFooterLinks = async (): Promise<FooterLinks> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return FOOTER_FALLBACK;
    }

    try {
        const db = await getDatabase();
        const query = {
            ...(await buildStatusFilter()),
            key: "footer",
        };
        const doc = await db
            .collection<FooterLinksDoc>("navigation")
            .findOne(query);

        if (doc || mode === "db") {
            return normalizeFooterLinks(doc || {});
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return FOOTER_FALLBACK;
};
