import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const getDatabase = async () => {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB;
    return dbName ? client.db(dbName) : client.db();
};

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

const withAdmin = (req: Request) => {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
};

const serializeDoc = (doc: Record<string, unknown>) => {
    const { _id, ...rest } = doc;
    return {
        ...rest,
        _id: (doc._id as { toString?: () => string })?.toString?.() ?? _id,
    };
};

const parseLimit = (value: string | null, fallback: number) => {
    if (!value) return fallback;
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const buildStatusFilter = (status: string | null) => {
    if (!status || status === "all") return {};
    if (status === "published") {
        return { $or: [{ status: "published" }, { status: { $exists: false } }] };
    }
    return { status };
};

const isValidObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

export async function GET(req: Request) {
    const authError = withAdmin(req);
    if (authError) return authError;

    const mode = await draftMode();

    const { searchParams } = new URL(req.url);
    const collection = searchParams.get("collection");
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const status = searchParams.get("status");
    const limit = parseLimit(searchParams.get("limit"), 200);
    const skip = parseLimit(searchParams.get("skip"), 0);

    if (!collection) {
        return NextResponse.json(
            { error: "Missing collection" },
            { status: 400 },
        );
    }

    const db = await getDatabase();
    const col = db.collection(collection);

    const query: Record<string, unknown> = {
        ...buildStatusFilter(status),
    };
    if (id) query.id = id;
    if (slug) query.slug = slug;

    if (id || slug) {
        const doc = await col.findOne(query);
        return NextResponse.json({ data: doc ? serializeDoc(doc) : null });
    }

    const docs = await col
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 })
        .toArray();

    const { isEnabled: draft } = mode;
    return NextResponse.json({ data: docs.map(serializeDoc), draft });
}

type SavePayload = {
    collection?: string;
    doc?: Record<string, unknown>;
};

const buildSourceKey = (collection: string, doc: Record<string, unknown>) => {
    const baseKey =
        (doc.sourceKey as string) ||
        String(doc.slug || doc.id || doc.title || doc.name || Date.now());
    return baseKey.includes(":") ? baseKey : `${collection}:${baseKey}`;
};

const pickFilter = (collection: string, doc: Record<string, unknown>) => {
    if (typeof doc._id === "string" && isValidObjectId(doc._id)) {
        return { _id: new ObjectId(doc._id) };
    }

    if (doc.sourceKey) return { sourceKey: doc.sourceKey };
    if (doc.slug) return { slug: doc.slug };
    if (doc.id) return { id: doc.id };
    if (doc.title) return { title: doc.title };

    return { sourceKey: buildSourceKey(collection, doc) };
};

const pickDeleteFilter = (doc: Record<string, unknown>) => {
    if (typeof doc._id === "string" && isValidObjectId(doc._id)) {
        return { _id: new ObjectId(doc._id) };
    }
    if (doc.sourceKey) return { sourceKey: doc.sourceKey };
    if (doc.slug) return { slug: doc.slug };
    if (doc.id) return { id: doc.id };
    return null;
};

export async function POST(req: Request) {
    const authError = withAdmin(req);
    if (authError) return authError;

    let payload: SavePayload = {};
    try {
        payload = (await req.json()) as SavePayload;
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!payload.collection || !payload.doc) {
        return NextResponse.json(
            { error: "Missing collection or doc" },
            { status: 400 },
        );
    }

    const collection = payload.collection;
    const doc = { ...payload.doc };
    const now = new Date().toISOString();

    const { _id, ...docData } = doc;

    if (!docData.sourceKey) {
        docData.sourceKey = buildSourceKey(collection, docData);
    }

    if (!docData.status) {
        docData.status = "published";
    }

    if (!docData.createdAt) {
        docData.createdAt = now;
    }

    docData.updatedAt = now;

    const db = await getDatabase();
    const col = db.collection(collection);
    const filter = pickFilter(collection, doc);

    await col.updateOne(filter, { $set: docData }, { upsert: true });

    const saved = await col.findOne(filter);

    return NextResponse.json({ data: saved ? serializeDoc(saved) : docData });
}

type DeletePayload = {
    collection?: string;
    doc?: Record<string, unknown>;
};

export async function DELETE(req: Request) {
    const authError = withAdmin(req);
    if (authError) return authError;

    let payload: DeletePayload = {};
    try {
        payload = (await req.json()) as DeletePayload;
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (!payload.collection || !payload.doc) {
        return NextResponse.json(
            { error: "Missing collection or doc" },
            { status: 400 },
        );
    }

    const filter = pickDeleteFilter(payload.doc);
    if (!filter) {
        return NextResponse.json(
            { error: "Missing document identifier" },
            { status: 400 },
        );
    }

    const db = await getDatabase();
    const col = db.collection(payload.collection);

    const result = await col.deleteOne(filter);

    return NextResponse.json({ deleted: result.deletedCount || 0 });
}
