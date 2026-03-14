import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const secret =
        searchParams.get("secret") || req.headers.get("x-admin-key");
    const redirect = searchParams.get("redirect") || "/";
    const disable =
        searchParams.get("disable") === "1" ||
        searchParams.get("disable") === "true";

    const adminKey = process.env.ADMIN_API_KEY || process.env.DRAFT_SECRET;
    if (!adminKey || secret !== adminKey) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 },
        );
    }

    const mode = await draftMode();

    if (disable) {
        mode.disable();
        return NextResponse.json({ draft: false });
    }

    mode.enable();
    const safeRedirect = redirect.startsWith("/") ? redirect : "/";
    return NextResponse.redirect(new URL(safeRedirect, req.url));
}
