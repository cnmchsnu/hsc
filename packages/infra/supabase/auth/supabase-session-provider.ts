import { Session } from "../../../auth/domain/identity";
import { SessionProvider } from "./session-provider";
import { createServerClient } from "../client";

import { toSession } from "./mapper";

export class SupabaseSessionProvider
    implements SessionProvider {

    async getSession(): Promise<Session | null> {

        const supabase =
            await createServerClient();

        const {
            data,
            error,
        } = await supabase.auth.getSession();

        if (error) {

            throw error;

        }

        const session = data.session;

        if (!session) {

            return null;

        }

        return toSession(session);

    }

    async refreshSession(): Promise<Session | null> {

        const supabase =
            await createServerClient();

        const {
            data,
            error,
        } = await supabase.auth.refreshSession();

        if (error) {

            throw error;

        }

        const session = data.session;

        if (!session) {

            return null;

        }

        return toSession(session);

    }

    async invalidateSession(): Promise<void> {

        const supabase =
            await createServerClient();

        const { error } =
            await supabase.auth.signOut();

        if (error) {

            throw error;

        }

    }

}