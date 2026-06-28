// packages/auth/src/container.ts

import { cookies } from "next/headers";

import { createServerClient } from "@repo/database/client";
import { SupabaseProfileRepository } from "@repo/database/identity";

import { createCurrentUserService } from "./current-user";

export async function createAuthContainer() {
    const cookieStore = await cookies();

    const client = createServerClient(cookieStore);

    const profileRepository =
        new SupabaseProfileRepository(client);

    const currentUserService =
        createCurrentUserService(profileRepository);

    return {
        client,

        profileRepository,

        currentUserService,
    };
}