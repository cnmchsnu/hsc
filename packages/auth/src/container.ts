// packages/auth/src/container.ts
import "server-only";

import { createServerClient } from "@repo/database/client/server";
import { SupabaseProfileRepository } from "@repo/database/identity";

import { createCurrentUserService } from "./current-user";
import { createProfileService } from "./profile";

export async function createAuthContainer() {

    const client = await createServerClient();

    const profileRepository =
        new SupabaseProfileRepository(client);

    const profileService =
        createProfileService(profileRepository);

    const currentUserService =
        createCurrentUserService(profileService);

    return {
        client,

        currentUserService,

        profileService,
    };
}