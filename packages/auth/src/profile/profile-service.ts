import type { ProfileRepository } from "@repo/database/identity";
import { UserProfileNotFoundError } from "../current-user";
import type {
    CreateProfileInput,
    SyncProfileInput,
    UpdateProfileInput,
    EnsureProfileInput,
    UserProfile,
} from "../types";

import { buildSyncUpdate } from "./profile-sync";

export interface ProfileService {

    get(
        userId: string,
    ): Promise<UserProfile | null>;

    update(
        userId: string,
        input: UpdateProfileInput,
    ): Promise<UserProfile>;

    ensure(
        input: EnsureProfileInput,
    ): Promise<UserProfile>;
}

export function createProfileService(
    repository: ProfileRepository,
): ProfileService {

    async function  getOrCreateProfile(
        input: EnsureProfileInput,
    ): Promise<UserProfile> {

        const existing =
            await repository.findByUserId(input.userId);

        if (existing) {
            return existing;
        }

        return repository.create({
            userId: input.userId,

            displayName: input.sync.DisplayName,

            avatarUrl: input.sync.AvatarUrl,

            autoClassification: input.autoClassification,

        });
    }

    async function sync(
        profile: UserProfile,
        syncProfileInput: SyncProfileInput
    ): Promise<UserProfile> {


            const update =
                buildSyncUpdate(profile, syncProfileInput);

            if (Object.keys(update).length === 0) {
                return profile;
            }

            return repository.update(
                profile.userId,
                update,
            );
    }

    return {

        async get(userId): Promise<UserProfile | null> {
            return repository.findByUserId(userId);
        },

        async update(userId, input): Promise<UserProfile> {
            return repository.update(userId, input);
        },


        

        async ensure(input): Promise<UserProfile> {

            const profile =
                await  getOrCreateProfile(input);


            return sync(
                profile,
                input.sync,
            );
        },

    };
}

