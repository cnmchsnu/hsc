import { AuthSession, User as SupabaseUser } from "@supabase/supabase-js";
import { Session, User } from "../../../auth/domain/identity";

export function toSession(
    session: AuthSession
): Session {
    return {
        accessToken: session.access_token,

        refreshToken: session.refresh_token,

        expiresAt: new Date(
            session.expires_at! * 1000,
        ),

        userId: session.user.id,

    };
}

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