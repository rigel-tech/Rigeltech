import { draftMode } from "next/headers";
import { getMongoClient } from "@/lib/mongodb";

export type WorkingHour = {
    label: string;
    value: string;
};

export type SiteSettings = {
    key: string;
    companyName: string;
    taxId: string;
    description: string;
    mainOffice: string;
    branchOffice: string;
    hotline: string;
    email: string;
    website: string;
    workingHours: WorkingHour[];
};

export const SITE_SETTINGS_FALLBACK: SiteSettings = {
    "key": "default",
    "companyName": "CÔNG TY TNHH RIGEL TECH",
    "taxId": "0312689498",
    "description": "Kiến tạo giá trị từ công nghệ",
    "mainOffice": "282 Đường số 13, Phường Phước Long, TP. Hồ Chí Minh, Việt Nam.",
    "branchOffice": "156 Nam Kỳ Khởi Nghĩa, Phường Sài Gòn, TP. Hồ Chí Minh, Việt Nam.",
    "hotline": "0938.065.499",
    "email": "info@rigeltech.vn",
    "website": "www.rigeltech.vn",
    "workingHours": [
        {
            "label": "Thứ 2 - Thứ 6",
            "value": "08:00 - 17:30"
        },
        {
            "label": "Thứ 7",
            "value": "08:00 - 12:00"
        }
    ]
};

type SiteSettingsDoc = Partial<SiteSettings> & {
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

const normalizeSiteSettings = (doc: SiteSettingsDoc): SiteSettings => ({
    key: doc.key || SITE_SETTINGS_FALLBACK.key,
    companyName: doc.companyName || SITE_SETTINGS_FALLBACK.companyName,
    taxId: doc.taxId || SITE_SETTINGS_FALLBACK.taxId,
    description: doc.description || SITE_SETTINGS_FALLBACK.description,
    mainOffice: doc.mainOffice || SITE_SETTINGS_FALLBACK.mainOffice,
    branchOffice: doc.branchOffice || SITE_SETTINGS_FALLBACK.branchOffice,
    hotline: doc.hotline || SITE_SETTINGS_FALLBACK.hotline,
    email: doc.email || SITE_SETTINGS_FALLBACK.email,
    website: doc.website || SITE_SETTINGS_FALLBACK.website,
    workingHours: doc.workingHours || SITE_SETTINGS_FALLBACK.workingHours,
});

export const getSiteSettings = async (): Promise<SiteSettings> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return SITE_SETTINGS_FALLBACK;
    }

    try {
        const db = await getDatabase();
        const query = {
            ...(await buildStatusFilter()),
            key: SITE_SETTINGS_FALLBACK.key,
        };
        const doc = await db
            .collection<SiteSettingsDoc>("siteSettings")
            .findOne(query);

        if (doc || mode === "db") {
            return normalizeSiteSettings(doc || {});
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return SITE_SETTINGS_FALLBACK;
};
