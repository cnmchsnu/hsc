import type { AuthUser } from '@supabase/supabase-js'
import type { ProfileService } from "../profile";
import type { AuthorizationService } from "../authorization"

import type { CurrentUser } from "../types";

import { toCurrentUser, toSyncProfileInput } from "./mapper";



export interface CurrentUserService {
    get(
        authUser: AuthUser,
    ): Promise<CurrentUser>;
}


export function createCurrentUserService(
    profileService: ProfileService,
    authorizationService: AuthorizationService,
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

            const authorization = 
                await authorizationService.get(
                    authUser.id,
                );
        
            return toCurrentUser(
                authUser,
                profile,
                authorization,
            );
        },
    };
}