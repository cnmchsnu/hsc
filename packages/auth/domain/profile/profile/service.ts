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
    ): Promise<readonly Profile[]>;

    findByClass(
        classes: readonly string[]
    ): Promise<readonly Profile[]>;

    // Query

    list(): Promise<readonly Profile[]>;

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
        async findbyId(
            userId: string
        ): Promise<Profile | null> {
            const profile = await repository.findById(userId);

            if (!profile) {
                throw new Error(`Profile not found for userId: ${userId}`);
            }
            return profile;
        },

        // Read Batch
        async findByIds(
            userIds: readonly string[],
        ): Promise<readonly Profile[]> {
            const profiles = await repository.findByIds(userIds);

            if (!profiles || profiles.length === 0) {
                throw new Error(`Profiles not found for userIds: ${userIds.join(', ')}`);
            }

            return profiles;
        },

        async findByClass(
            classes: string[]
        ): Promise<readonly Profile[]> {
            return repository.findByClass(classes);
        },

        // Query
        async list(): Promise<readonly Profile[]> {
            return repository.list();
        },

        async search(
            options: ProfileListOptions
        ): Promise<ProfileList> {
            return repository.search(options);
        },

        // Existing Single
        async exists(
            userId: string,
        ): Promise<boolean> {
            return repository.exists(userId);
        },

        // Existing Batch
        async listExistingUserIds(
            userIds: readonly string[],
        ): Promise<string[]> {
            return repository.listExistingUserIds(userIds);
        },

        // Write Single

        async create(
            userId: string,
            profile: Partial<Profile>
        ): Promise<void> {
            return repository.create({
                ...profile,
                userId,
            } as Profile);
        },

        async update(
            profile: Profile
        ): Promise<void> {
            return repository.update(profile);
        },

        async delete(
            userId: string
        ): Promise<void> {
            return repository.delete(userId);
        },

        // Write Batch

        async createMany(
            profiles: readonly Profile[],
        ): Promise<void> {
            return repository.createMany(profiles);
        },

        async updateMany(
            profiles: readonly Profile[],
        ): Promise<void> {
            return repository.updateMany(profiles);
        },

        async deleteMany(
            userIds: readonly string[],
        ): Promise<void> {
            return repository.deleteMany(userIds);
        }

    };
}