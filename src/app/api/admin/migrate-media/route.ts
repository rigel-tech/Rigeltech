import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { toSupabasePath } from "@/lib/media";

export const dynamic = "force-dynamic";

const COLLECTIONS = [
    "pages",
    "news",
    "projects",
    "services",
    "fields",
    "careers",
    "teamMembers",
    "siteSettings",
    "navigation",
];

const getAdminKey = () =>
    process.env.ADMIN_API_KEY ||
    process.env.DRAFT_SECRET ||
    process.env.REVALIDATE_SECRET;

const isAuthorized = (req: Request) => {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret") || req.headers.get("x-admin-key");
    const adminKey = getAdminKey();
    return Boolean(adminKey && secret === adminKey);
};

const getDatabase = async () => {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB;
    return dbName ? client.db(dbName) : client.db();
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
};

const normalizeValue = (
    value: unknown,
): { value: unknown; changed: boolean } => {
    if (typeof value === "string") {
        const path = toSupabasePath(value);
        if (path && path !== value) {
            return { value: path, changed: true };
        }
        return { value, changed: false };
    }

    if (Array.isArray(value)) {
        let changed = false;
        const next = value.map((entry) => {
            const normalized = normalizeValue(entry);
            if (normalized.changed) changed = true;
            return normalized.value;
        });
        return { value: next, changed };
    }

    if (isPlainObject(value)) {
        let changed = false;
        const next: Record<string, unknown> = {};
        Object.entries(value).forEach(([key, entry]) => {
            const normalized = normalizeValue(entry);
            if (normalized.changed) changed = true;
            next[key] = normalized.value;
        });
        return { value: next, changed };
    }

    return { value, changed: false };
};

type Payload = {
    collection?: string;
    collections?: string[];
    all?: boolean;
};

export async function POST(req: Request) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload: Payload = {};
    try {
        payload = (await req.json()) as Payload;
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const requested = payload.all
        ? COLLECTIONS
        : payload.collection
          ? [payload.collection]
          : payload.collections || [];

    if (requested.length === 0) {
        return NextResponse.json(
            { error: "Missing collection" },
            { status: 400 },
        );
    }

    const db = await getDatabase();
    const results = [];

    for (const name of requested) {
        const col = db.collection(name);
        const cursor = col.find({});
        let scanned = 0;
        let updated = 0;

        // eslint-disable-next-line no-await-in-loop
        for await (const doc of cursor) {
            scanned += 1;
            const { _id, ...rest } = doc as Record<string, unknown> & {
                _id?: unknown;
            };
            const normalized = normalizeValue(rest);
            if (!normalized.changed) continue;

            // eslint-disable-next-line no-await-in-loop
            await col.updateOne(
                { _id: _id as never },
                { $set: normalized.value as never },
            );
            updated += 1;
        }

        results.push({ collection: name, scanned, updated });
    }

    return NextResponse.json({ results });
}
