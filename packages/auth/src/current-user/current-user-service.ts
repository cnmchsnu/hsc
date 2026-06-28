import type { AuthUser } from '@supabase/supabase-js'
import type { ProfileRepository } from "@repo/database/identity";

import type { CurrentUser } from "../types";

import { toCurrentUser } from "./mapper";

import { UserProfileNotFoundError } from "./errors";



export interface CurrentUserService {
    get(
        authUser: AuthUser,
    ): Promise<CurrentUser>;
}


export function createCurrentUserService(
    profileRepository: ProfileRepository,
): CurrentUserService {

    return {

        async get(authUser) {

            const profile =
                await profileRepository.findByUserId(
                    authUser.id,
                );

            if (!profile) {
                throw new UserProfileNotFoundError(
                    authUser.id,
                );
            }

            return toCurrentUser(
                authUser,
                profile,
            );
        },
    };
}