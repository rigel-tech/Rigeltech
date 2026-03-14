import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export const getSupabaseAdmin = () => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    if (!cachedClient) {
        cachedClient = createClient(url, key, {
            auth: { persistSession: false },
        });
    }

    return cachedClient;
};

export const getSupabaseBucket = () => {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET;
    if (!bucket) {
        throw new Error("Missing SUPABASE_STORAGE_BUCKET");
    }
    return bucket;
};
