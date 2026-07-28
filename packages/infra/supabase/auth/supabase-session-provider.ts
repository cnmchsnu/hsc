import type { SupabaseClient } from "@supabase/supabase-js";

import { Session } from "../../../auth/domain/identity";
import { SessionProvider } from "./session-provider";

import { toSession } from "./mapper";

export class SupabaseSessionProvider
    implements SessionProvider {

    constructor(
        private readonly client: SupabaseClient,
    ) {}

    async getSession(): Promise<Session | null> {


        const {
            data,
            error,
        } = await this.client.auth.getSession();

        if (error) {

            throw error;

        }

        const session = data.session;

        if (!session) {

            return null;

        }

        return toSession(session);

    }

    async exchangeCodeForSession(code: string): Promise<void> {

        const { error } =
            await this.client.auth.exchangeCodeForSession(code);

        if (error) {

            throw error;

        }

        // return toSession(data.session);

    }

    async refreshSession(): Promise<Session | null> {

        const {
            data,
            error,
        } = await this.client.auth.refreshSession();

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

        const { error } =
            await this.client.auth.signOut();

        if (error) {

            throw error;

        }

    }

}