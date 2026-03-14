import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin, getSupabaseBucket } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 2 * 1024 * 1024;

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

export async function POST(req: Request) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let form: FormData;
    try {
        form = await req.formData();
    } catch {
        return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const files = form
        .getAll("file")
        .filter((entry): entry is File => entry instanceof File);
    const replacePathRaw = form.get("replacePath");
    const collection = form.get("collection");
    const docKey = form.get("docKey");
    const fieldPath = form.get("fieldPath");

    if (files.length === 0) {
        return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const slugify = (value: string) =>
        value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const normalizeReplacePath = (value: FormDataEntryValue | null) => {
        if (!value) return null;
        const raw = String(value).replace(/^\/+/, "");
        if (!raw.startsWith("uploads/")) return null;
        if (raw.includes("..") || raw.includes("\\")) return null;
        return raw;
    };

    const buildStablePath = () => {
        if (!collection || !docKey || !fieldPath) return null;
        const parts = [
            slugify(String(collection)),
            slugify(String(docKey)),
            slugify(String(fieldPath)),
        ].filter(Boolean);
        if (parts.length < 3) return null;
        return `uploads/${parts.join("__")}`;
    };

    const useStablePath = String(form.get("useStablePath") || "") === "1";
    const replacePath = useStablePath ? normalizeReplacePath(replacePathRaw) : null;
    const stablePath = useStablePath ? buildStablePath() : null;
    const upsert = Boolean(replacePath || stablePath);

    const uploadFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            return { error: "Only image uploads are supported" };
        }

        if (file.size > MAX_FILE_BYTES) {
            return { error: "File exceeds 2MB limit" };
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const ext = file.name.includes(".")
            ? `.${file.name.split(".").pop() ?? ""}`
            : `.${file.type.split("/")[1] || "png"}`;

        const objectPath =
            replacePath ||
            stablePath ||
            `uploads/${Date.now()}-${randomUUID()}${ext}`;

        try {
            const supabase = getSupabaseAdmin();
            const bucket = getSupabaseBucket();

            const { error } = await supabase.storage
                .from(bucket)
                .upload(objectPath, buffer, {
                    contentType: file.type || "application/octet-stream",
                    cacheControl: "3600",
                    upsert,
                });

            if (error) {
                return { error: error.message };
            }

            const ttlRaw = process.env.SUPABASE_SIGNED_URL_TTL || "3600";
            const ttl = Number.isFinite(Number(ttlRaw)) ? Number(ttlRaw) : 3600;

            const { data: signedData, error: signedError } =
                await supabase.storage.from(bucket).createSignedUrl(objectPath, ttl);

            if (signedError || !signedData?.signedUrl) {
                return { error: signedError?.message || "Failed to sign URL" };
            }

            return { url: signedData.signedUrl, path: objectPath };
        } catch (error) {
            return { error: (error as Error).message || "Upload failed" };
        }
    };

    const results = [] as Array<{ url?: string; path?: string; error?: string }>;
    for (const file of files) {
        const result = await uploadFile(file);
        results.push(result);
    }

    if (results.length === 1) {
        return NextResponse.json(results[0]);
    }

    return NextResponse.json({ results });
}

