import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";

type ExportDoc = Record<string, unknown> & {
    sourceKey?: string;
    status?: string;
};

const getArgValue = (name: string) => {
    const index = process.argv.indexOf(name);
    if (index === -1) return null;
    return process.argv[index + 1] || null;
};

const shouldWrite = process.argv.includes("--write");
const onlyCollection = getArgValue("--collection") || getArgValue("--only");

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB;

if (!mongoUri) {
    console.error("Missing MONGODB_URI. Set it in your environment.");
    process.exit(1);
}

const outputDir = path.resolve(process.cwd(), "content", "seed");

const listCollections = () => {
    const all = [
        "news",
        "projects",
        "fields",
        "services",
        "careers",
        "teamMembers",
        "siteSettings",
        "navigation",
        "pages",
        "home",
    ];
    if (!onlyCollection) return all;
    return all.filter((name) => name === onlyCollection);
};

const loadJson = async (collection: string) => {
    const filePath = path.join(outputDir, `${collection}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const cleaned = raw.replace(/^\uFEFF/, "");
    const data = JSON.parse(cleaned) as ExportDoc[];
    if (!Array.isArray(data)) {
        throw new Error(`Invalid JSON in ${filePath}`);
    }
    return { data, filePath };
};

const ensureMeta = (doc: ExportDoc, collection: string, index: number) => {
    if (!doc.sourceKey) {
        const baseKey =
            String(doc.id || doc.slug || doc.title || doc.name || index) ||
            String(index);
        doc.sourceKey = `${collection}:${baseKey}`;
    }
    if (!doc.status) {
        doc.status = "published";
    }
};

const run = async () => {
    const collections = listCollections();
    if (collections.length === 0) {
        console.error("No valid collection selected.");
        process.exit(1);
    }

    if (!shouldWrite) {
        console.log("Dry run mode. Use --write to apply changes.");
    }

    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = mongoDbName ? client.db(mongoDbName) : client.db();

    for (const collection of collections) {
        const { data, filePath } = await loadJson(collection);
        const col = db.collection(collection);

        const operations = data.map((doc, index) => {
            ensureMeta(doc, collection, index);
            return {
                updateOne: {
                    filter: { sourceKey: doc.sourceKey },
                    update: { $set: doc },
                    upsert: true,
                },
            };
        });

        console.log(
            `Loaded ${data.length} items from ${path.relative(
                process.cwd(),
                filePath,
            )}`,
        );

        if (shouldWrite) {
            const result = await col.bulkWrite(operations, { ordered: false });
            console.log(
                `Seeded ${collection}: upserted ${result.upsertedCount}, modified ${result.modifiedCount}`,
            );
        }
    }

    await client.close();
};

run().catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
});
