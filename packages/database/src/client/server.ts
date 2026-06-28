import "server-only";
// packages/database/src/client/server.ts
import { cookies } from "next/headers";
import { createServerClient as createSSRServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function createServerClient() {
    const cookieStore = await cookies();

    return createSSRServerClient(
        supabaseUrl!,
        supabaseKey!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        );
                    } catch {
                        // Ignore when called from a Server Component.
                    }
                },
            },
        },
    );
}