import { SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export interface SupabaseClientFactory {

    createUserClient(): Promise<SupabaseClient>;

    createServiceClient(): Promise<SupabaseClient>;

}

class DefaultSupabaseClientFactory
    implements SupabaseClientFactory {

    async createUserClient(): Promise<SupabaseClient> {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
        
        
        return createServerClient(
            supabaseUrl!,
            supabaseKey!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
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

    async createServiceClient() {
        const cookieStore = await cookies();
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
        return createServerClient(
            supabaseUrl!,
            supabaseKey!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
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
}

export function createSupabaseClientFactory(): SupabaseClientFactory {
    return new DefaultSupabaseClientFactory();
}