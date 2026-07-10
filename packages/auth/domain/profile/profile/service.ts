import { Profile, ProfileList, ProfileListOptions } from './type';

import { ProfileRepository } from '@repo/database/repositories';

export interface ProfileService {

    // Read Single

    findbyId(
        userId: string
    ): Promise<Profile | null>;

    // Read Batch

    findByIds(
        userIds: readonly string[],
    ): Promise<Profile[]>;

    findByClass(
        classes: readonly string[]
    ): Promise<Profile[]>;

    // Query

    list(): Promise<Profile[]>;

    search(
        options: ProfileListOptions
    ): Promise<ProfileList>;

    // Existing Single

    exists(
        userId: string,
    ): Promise<boolean>;

    // Existing Batch

    listExistingUserIds(
        userIds: readonly string[],
    ): Promise<string[]>;

    // Write Single

    create(
        userId: string,
        profile: Profile
    ): Promise<void>;

    update(
        userId: string, 
        profile: Profile
    ): Promise<void>;

    delete(
        userId: string
    ): Promise<void>;

    // Write Batch

    createMany(
        profiles: readonly Profile[],
    ): Promise<void>;

    updateMany(
        profiles: readonly Profile[],
    ): Promise<void>;

    deleteMany(
        userIds: readonly string[],
    ): Promise<void>;
}

export function createProfileService(
    repository: ProfileRepository,
): ProfileService {
    return {

        // Read Single
        async getProfile(
            userId: string
        ): Promise<Profile | null> {
            throw new Error('Not implemented');
        },

        // Read Batch
        async getProfilesById(
            userIds: readonly string[],
        ): Promise<Profile[]> {
            throw new Error('Not implemented');
        },

        async getProfilesByClass(
            classes: string[]
        ): Promise<Profile[]> {
            throw new Error('Not implemented')
        },

        // Existing Single
        async exists(
            userId: string,
        ): Promise<boolean> {
            throw new Error('Not implemented');
        },

        // Existing Batch
        async listExistingUserIds(
            userIds: readonly string[],
        ): Promise<string[]> {
            throw new Error('Not implemented');
        },

        // Write Single

        async create(
            userId: string,
            profile: Partial<Profile>
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async update(
            userId: string,
            profile: Partial<Profile>
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async delete(
            userId: string
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        // Write Batch

        async createMany(
            profiles: readonly Profile[],
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async updateMany(
            profiles: readonly Profile[],
        ): Promise<void> {
            throw new Error('Not implemented');
        },

        async deleteMany(
            userIds: readonly string[],
        ): Promise<void> {
            throw new Error('Not implemented');
        }

    };
}