import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RevalidatePayload = {
    path?: string;
    paths?: string[];
    tag?: string;
    tags?: string[];
};

const getAdminKey = () =>
    process.env.ADMIN_API_KEY || process.env.REVALIDATE_SECRET;

const isAuthorized = (secret: string | null) => {
    const adminKey = getAdminKey();
    return Boolean(adminKey && secret === adminKey);
};

const extractFromSearchParams = (req: Request): RevalidatePayload => {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const paths = searchParams.getAll("path");
    const tags = searchParams.getAll("tag");

    return {
        path,
        paths: paths.length > 0 ? paths : undefined,
        tag,
        tags: tags.length > 0 ? tags : undefined,
    };
};

const normalize = (payload: RevalidatePayload) => {
    const pathSet = new Set<string>();
    const tagSet = new Set<string>();

    if (payload.path) pathSet.add(payload.path);
    if (payload.paths) payload.paths.forEach((p) => pathSet.add(p));
    if (payload.tag) tagSet.add(payload.tag);
    if (payload.tags) payload.tags.forEach((t) => tagSet.add(t));

    return {
        paths: Array.from(pathSet).filter(Boolean),
        tags: Array.from(tagSet).filter(Boolean),
    };
};

const performRevalidate = (paths: string[], tags: string[]) => {
    paths.forEach((path) => revalidatePath(path));
    tags.forEach((tag) => revalidateTag(tag, {}));
};

export async function GET(req: Request) {
    const secret =
        new URL(req.url).searchParams.get("secret") ||
        req.headers.get("x-admin-key");

    if (!isAuthorized(secret)) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 },
        );
    }

    const { paths, tags } = normalize(extractFromSearchParams(req));

    if (paths.length === 0 && tags.length === 0) {
        return NextResponse.json(
            { error: "Missing path or tag" },
            { status: 400 },
        );
    }

    performRevalidate(paths, tags);

    return NextResponse.json({
        revalidated: true,
        paths,
        tags,
        at: new Date().toISOString(),
    });
}

export async function POST(req: Request) {
    const secret = req.headers.get("x-admin-key");

    if (!isAuthorized(secret)) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 },
        );
    }

    let payload: RevalidatePayload = {};
    try {
        payload = (await req.json()) as RevalidatePayload;
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 },
        );
    }

    const { paths, tags } = normalize(payload);

    if (paths.length === 0 && tags.length === 0) {
        return NextResponse.json(
            { error: "Missing path or tag" },
            { status: 400 },
        );
    }

    performRevalidate(paths, tags);

    return NextResponse.json({
        revalidated: true,
        paths,
        tags,
        at: new Date().toISOString(),
    });
}
