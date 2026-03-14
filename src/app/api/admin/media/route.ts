import { NextResponse } from "next/server";
import { getSupabaseAdmin, getSupabaseBucket } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type MediaItem = {
    name: string;
    path: string;
    url: string;
    size: number;
    updatedAt: string;
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

export async function GET(req: Request) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const supabase = getSupabaseAdmin();
        const bucket = getSupabaseBucket();

        const { data, error } = await supabase.storage
            .from(bucket)
            .list("uploads", {
                limit: 200,
                offset: 0,
                sortBy: { column: "updated_at", order: "desc" },
            });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const files = (data ?? []).filter((item) => item && item.metadata);
        const ttlRaw = process.env.SUPABASE_SIGNED_URL_TTL || "3600";
        const ttl = Number.isFinite(Number(ttlRaw)) ? Number(ttlRaw) : 3600;

        const paths = files.map((item) => `uploads/${item.name}`);
        const signedMap = new Map<string, string>();

        if (paths.length > 0) {
            const { data: signedUrls, error: signedError } =
                await supabase.storage.from(bucket).createSignedUrls(paths, ttl);

            if (signedError) {
                return NextResponse.json(
                    { error: signedError.message },
                    { status: 500 },
                );
            }

            (signedUrls ?? []).forEach((entry) => {
                if (entry?.path && entry.signedUrl) {
                    signedMap.set(entry.path, entry.signedUrl);
                }
            });
        }

        const items: MediaItem[] = files
            .map((item) => {
                const path = `uploads/${item.name}`;
                const url = signedMap.get(path);
                if (!url) return null;
                const updated =
                    item.updated_at || item.created_at || new Date(0).toISOString();
                return {
                    name: item.name,
                    path,
                    url,
                    size: item.metadata?.size ?? 0,
                    updatedAt: updated,
                };
            })
            .filter(Boolean) as MediaItem[];

        return NextResponse.json({ data: items });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || "Failed to load media" },
            { status: 500 },
        );
    }
}
