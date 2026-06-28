import type { AuthUser } from '@supabase/supabase-js'
import type { ProfileService } from "../profile";

import type { CurrentUser } from "../types";

import { toCurrentUser, toSyncProfileInput } from "./mapper";



export interface CurrentUserService {
    get(
        authUser: AuthUser,
    ): Promise<CurrentUser>;
}


export function createCurrentUserService(
    profileService: ProfileService,
): CurrentUserService {

    return {

        async get(authUser) {

            const profile =
                await profileService.ensure(
                    {
                        userId: authUser.id,

                        autoClassification: "guest",

                        sync: toSyncProfileInput(authUser),
                    }
                );

            return toCurrentUser(
                authUser,
                profile,
            );
        },
    };
}