
import { AuthSession } from "@supabase/supabase-js";
import { Session } from "../../../auth/domain/session";

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