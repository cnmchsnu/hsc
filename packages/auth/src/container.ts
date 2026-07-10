// packages/auth/src/container.ts
import "server-only";

import { createServerClient } from "@repo/database/client/server";
import { SupabaseProfileRepository, SupabaseAuthorizationRepository } from "@repo/infra/supabase/repositories";

import { createCurrentUserService } from "./current-user";
import { createProfileService } from "./profile";
import { createAuthorizationService } from "./authorization"

export async function createAuthContainer() {

    const client = await createServerClient();

    const profileRepository =
        new SupabaseProfileRepository(client);

    const profileService =
        createProfileService(profileRepository);

    const authorizationRepository = new SupabaseAuthorizationRepository(client,);

    const authorizationService =
        createAuthorizationService(
            authorizationRepository,
        );
        
    const currentUserService =
        createCurrentUserService(profileService,authorizationService);

    return {
        client,

        currentUserService,

        profileService,

        authorizationService,

        authorizationRepository,
        
    };
}