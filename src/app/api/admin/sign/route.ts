import { NextResponse } from "next/server";
import { getSupabaseAdmin, getSupabaseBucket } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

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

    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    if (!path) {
        return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }

    try {
        const supabase = getSupabaseAdmin();
        const bucket = getSupabaseBucket();
        const ttlRaw = process.env.SUPABASE_SIGNED_URL_TTL || "3600";
        const ttl = Number.isFinite(Number(ttlRaw)) ? Number(ttlRaw) : 3600;

        const { data, error } = await supabase.storage
            .from(bucket)
            .createSignedUrl(path, ttl);

        if (error || !data?.signedUrl) {
            return NextResponse.json(
                { error: error?.message || "Failed to sign URL" },
                { status: 500 },
            );
        }

        return NextResponse.json({ url: data.signedUrl });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || "Failed to sign URL" },
            { status: 500 },
        );
    }
}
