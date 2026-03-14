import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as unknown as {
    _mongoClientPromise?: Promise<MongoClient>;
};

let cachedPromise: Promise<MongoClient> | undefined;

export const getMongoClient = () => {
    if (!uri) {
        throw new Error("Missing MONGODB_URI in environment variables.");
    }

    if (process.env.NODE_ENV === "development") {
        if (!globalForMongo._mongoClientPromise) {
            const client = new MongoClient(uri);
            globalForMongo._mongoClientPromise = client.connect();
        }
        return globalForMongo._mongoClientPromise;
    }

    if (!cachedPromise) {
        const client = new MongoClient(uri);
        cachedPromise = client.connect();
    }

    return cachedPromise;
};
