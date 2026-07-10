import type { User as SupabaseUser } from "@supabase/supabase-js"

import type { User } from "../../../../../auth/domain/user"

export function toUser(
    supabaseUser: SupabaseUser
): User {
    return {
        id: supabaseUser.id,
        email: supabaseUser.email ?? "",
        name: supabaseUser.user_metadata?.full_name ?? "",
        avatar: supabaseUser.user_metadata?.avatar_url ?? null,
        hd: supabaseUser.user_metadata?.custom_claims?.hd ?? null,
    }
}