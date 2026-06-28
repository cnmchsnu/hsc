import type { Session } from "@supabase/supabase-js";

import { createServerClient } from "@repo/database/client";

export async function getSession(): Promise<Session | null> {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw error;
    }

    return data.session;
}