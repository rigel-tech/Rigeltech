import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const getDatabase = async () => {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB;
    return dbName ? client.db(dbName) : client.db();
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const collection = searchParams.get("collection");
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");
    const limitRaw = searchParams.get("limit");

    if (!collection) {
        return NextResponse.json(
            { error: "Missing collection" },
            { status: 400 },
        );
    }

    const { isEnabled: draft } = await draftMode();
    const status = draft ? "draft" : "published";
    const db = await getDatabase();
    const col = db.collection(collection);

    const statusFilter = {
        $or: [{ status }, { status: { $exists: false } }],
    };

    const query: Record<string, unknown> = { ...statusFilter };
    if (slug) query.slug = slug;
    if (id) query.id = id;

    if (slug || id) {
        const doc = await col.findOne(query);
        return NextResponse.json({ data: doc, draft });
    }

    const limit = limitRaw ? Number.parseInt(limitRaw, 10) : 0;
    const cursor = col.find(query);
    if (Number.isFinite(limit) && limit > 0) {
        cursor.limit(limit);
    }

    const docs = await cursor.toArray();
    return NextResponse.json({ data: docs, draft });
}
