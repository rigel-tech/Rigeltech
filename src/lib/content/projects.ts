import { draftMode } from "next/headers";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";
import { projects, type Project } from "@/app/projects/data";
import { resolveMediaUrl, resolveMediaUrls } from "@/lib/media";

type ProjectDoc = Partial<Project> & {
    slug?: string;
    _id?: unknown;
};

const isValidObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

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
        if (draft) {
            return {
                $or: [
                    { status: "draft" },
                    { status: "published" },
                    { status: { $exists: false } },
                ],
            };
        }
        return {
            $or: [{ status: "published" }, { status: { $exists: false } }],
        };
    } catch {
        return {
            $or: [{ status: "published" }, { status: { $exists: false } }],
        };
    }
};

const normalizeProjects = async (items: ProjectDoc[]): Promise<Project[]> =>
    Promise.all(
        items.map(async (item) => {
            const imageValue = item.image || "";
            const galleryValue = item.gallery || (item.image ? [item.image] : []);
            const [image, gallery] = await Promise.all([
                resolveMediaUrl(imageValue),
                resolveMediaUrls(galleryValue),
            ]);

            return {
                id: item.id || item.slug || String(item._id ?? ""),
                title: item.title || "",
                description: item.description || "",
                image,
                tech: item.tech || [],
                year: item.year || "",
                fullDescription: item.fullDescription || item.description || "",
                challenge: item.challenge || "",
                solution: item.solution || "",
                results: item.results || [],
                gallery,
            };
        }),
    );

export const getProjects = async (): Promise<Project[]> => {
    const mode = getSourceMode();
    if (mode === "static") {
        return projects;
    }

    try {
        const db = await getDatabase();
        const query = await buildStatusFilter();
        const items = await db
            .collection<ProjectDoc>("projects")
            .find(query)
            .toArray();

        if (items.length > 0 || mode === "db") {
            return normalizeProjects(items);
        }
    } catch (error) {
        if (mode === "db") {
            throw error;
        }
    }

    return projects;
};

export const getProjectBySlug = async (slug: string) => {
    const mode = getSourceMode();

    if (mode !== "static") {
        try {
            const db = await getDatabase();
            const clauses: Record<string, unknown>[] = [
                { id: slug },
                { slug },
            ];
            if (isValidObjectId(slug)) {
                clauses.push({ _id: new ObjectId(slug) });
            }
            const statusFilter = await buildStatusFilter();
            const query = {
                $and: [statusFilter, { $or: clauses }],
            };
            let item = await db
                .collection<ProjectDoc>("projects")
                .findOne(query);
            if (!item) {
                item = await db
                    .collection<ProjectDoc>("projects")
                    .findOne({ $or: clauses });
            }

            if (item) {
                return (await normalizeProjects([item]))[0];
            }

            if (mode === "db") {
                return null;
            }
        } catch (error) {
            if (mode === "db") {
                throw error;
            }
        }
    }

    return projects.find((project) => project.id === slug) || null;
};
