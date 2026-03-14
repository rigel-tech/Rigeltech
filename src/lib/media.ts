import { getSupabaseAdmin, getSupabaseBucket } from "@/lib/supabase-admin";

const SUPABASE_PREFIX = "supabase://";
const SUPABASE_PATH_PREFIX = "uploads/";

const hasSupabaseConfig = () =>
    Boolean(
        process.env.SUPABASE_URL &&
            process.env.SUPABASE_SERVICE_ROLE_KEY &&
            process.env.SUPABASE_STORAGE_BUCKET,
    );

const normalizeSupabasePath = (value: string) =>
    value.startsWith(SUPABASE_PREFIX)
        ? value.slice(SUPABASE_PREFIX.length)
        : value;

const tryExtractPathFromUrl = (value: string) => {
    try {
        const url = new URL(value);
        const bucket = process.env.SUPABASE_STORAGE_BUCKET;
        if (!bucket) return null;
        const pattern =
            /\/storage\/v1\/(?:object|render\/image)\/(?:sign|public)\/([^/]+)\/(.+)/;
        const match = url.pathname.match(pattern);
        if (!match) return null;
        if (match[1] !== bucket) return null;
        return match[2];
    } catch {
        return null;
    }
};

export const toSupabasePath = (value: string) => {
    if (!value) return null;
    if (value.startsWith(SUPABASE_PREFIX)) {
        return normalizeSupabasePath(value);
    }
    if (value.startsWith(SUPABASE_PATH_PREFIX)) {
        return value;
    }
    if (value.startsWith("http://") || value.startsWith("https://")) {
        return tryExtractPathFromUrl(value);
    }
    return null;
};

const getSignedUrlTtl = () => {
    const ttlRaw = process.env.SUPABASE_SIGNED_URL_TTL || "3600";
    const ttl = Number.parseInt(ttlRaw, 10);
    return Number.isFinite(ttl) ? ttl : 3600;
};

export const resolveMediaUrl = async (value: string): Promise<string> => {
    const path = toSupabasePath(value);
    if (!value || !path || !hasSupabaseConfig()) {
        return value;
    }

    try {
        const supabase = getSupabaseAdmin();
        const bucket = getSupabaseBucket();
        const { data, error } = await supabase.storage
            .from(bucket)
            .createSignedUrl(path, getSignedUrlTtl());

        if (error || !data?.signedUrl) {
            return value;
        }
        return data.signedUrl;
    } catch {
        return value;
    }
};

export const resolveMediaUrls = async (values: string[]): Promise<string[]> => {
    if (!values || values.length === 0 || !hasSupabaseConfig()) {
        return values;
    }

    const paths = values
        .map((value) => (value ? toSupabasePath(value) : null))
        .filter((value): value is string => Boolean(value));

    if (paths.length === 0) {
        return values;
    }

    try {
        const supabase = getSupabaseAdmin();
        const bucket = getSupabaseBucket();
        const { data, error } = await supabase.storage
            .from(bucket)
            .createSignedUrls(paths, getSignedUrlTtl());

        if (error || !data) {
            return values;
        }

        const map = new Map<string, string>();
        data.forEach((entry) => {
            if (entry?.path && entry.signedUrl) {
                map.set(entry.path, entry.signedUrl);
            }
        });

        return values.map((value) => {
            const path = value ? toSupabasePath(value) : null;
            if (!value || !path) return value;
            return map.get(path) || value;
        });
    } catch {
        return values;
    }
};
