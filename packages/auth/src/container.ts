// packages/auth/src/container.ts
import "server-only";

import { createServerClient } from "@repo/database/client/server";
import { SupabaseProfileRepository } from "@repo/database/identity";
import { SupabaseAuthorizationRepository } from "@repo/database/authorization"

import { createCurrentUserService } from "./current-user";
import { createProfileService } from "./profile";
import { createAuthorizationService } from "./authorization"

export async function createAuthContainer() {

    const client = await createServerClient();

    const profileRepository =
        new SupabaseProfileRepository(client);

    const profileService =
        createProfileService(profileRepository);

    const currentUserService =
        createCurrentUserService(profileService);

    const authorizationRepository = new SupabaseAuthorizationRepository(client,);

    const authorizationService =
        createAuthorizationService(
            authorizationRepository,
    );

    return {
        client,

        currentUserService,

        profileService,

        authorizationService,

        authorizationRepository,
        
    };
}