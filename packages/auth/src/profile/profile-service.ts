import type { ProfileRepository } from "@repo/database/identity";
import type {
    CreateProfileInput,
    SyncProfileInput,
    UpdateProfileInput,
    UserProfile,
} from "../types";

import { buildSyncUpdate } from "./profile-sync";

export interface ProfileService {

    getByUserId(
        userId: string,
    ): Promise<UserProfile | null>;

    create(
        input: CreateProfileInput,
    ): Promise<UserProfile>;

    update(
        userId: string,
        input: UpdateProfileInput,
    ): Promise<UserProfile>;

    sync(
        userId: string,
        input: SyncProfileInput,
    ): Promise<UserProfile>;
}

export function createProfileService(
    repository: ProfileRepository,
): ProfileService {

    return {

        async getByUserId(userId) {
            return repository.findByUserId(userId);
        },

        async create(input) {
            return repository.create(input);
        },

        async update(userId, input) {
            return repository.update(userId, input);
        },

        async sync(userId, provider) {

            const profile =
                await repository.findByUserId(userId);

            if (!profile) {
                throw new Error("Profile not found");
            }

            const update =
                buildSyncUpdate(profile, provider);

            return repository.update(
                userId,
                update,
            );
        },
    };
}

