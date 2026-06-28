import "server-only";

import type { CurrentUser } from "../types";

import { getCurrentUser } from "./get-current-user";

export async function requireUser(): Promise<CurrentUser> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Authentication required.");
    }

    return user;
}