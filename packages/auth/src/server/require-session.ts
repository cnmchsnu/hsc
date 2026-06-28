import type { Session } from "@supabase/supabase-js";

import { getSession } from "./get-session";

import { AuthenticationRequiredError } from "./errors";

export async function requireSession(): Promise<Session> {
    const session = await getSession();

    if (!session) {
        throw new AuthenticationRequiredError();
    }

    return session;
}