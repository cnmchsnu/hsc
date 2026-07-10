import "server-only";

import { createServerClient } from "@repo/database/client/server";
import { SupabaseProfileRepository } from "@repo/database/identity";
import { SupabaseAuthorizationRepository } from "@repo/database/authorization"

import { createCurrentUserService } from "../domain/current-user";
import { createProfileService } from "../domain/profile";
import { createAuthorizationService } from "../domain/authorization";

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
