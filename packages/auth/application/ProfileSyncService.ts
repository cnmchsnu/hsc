import { ProfileRepository, UserRepository } from "@repo/database/repositories"

import { Profile } from "../domain/profile";

export interface ProfileSyncService {

    sync(
        userId: string,
    ): Promise<void>;

}

interface ProfileSyncServiceDependencies {

    userRepository: UserRepository;
    
    profileRepository: ProfileRepository;

}


class DefaultProfileSyncService
    implements ProfileSyncService {

        constructor(
            private readonly userRepository: UserRepository,
            private readonly profileRepository: ProfileRepository,
        ) {}

        async sync(
            userId: string,
        ): Promise<void> {
            const user = await this.userRepository.getById(userId);

            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }

            const profile = await this.profileRepository.findById(userId);

            if (!profile) {
                throw new Error(`Profile for user with ID ${userId} not found.`);
            }

            const newProfile: Profile = {
                ...profile,
                displayName: user.name,
                avatarUrl: user.avatar!,
            };

            await this.profileRepository.update(newProfile);
        }
    }


export function createProfileSyncService(
    dependencies: ProfileSyncServiceDependencies,
): ProfileSyncService {
    return new DefaultProfileSyncService(
        dependencies.userRepository,
        dependencies.profileRepository,
    );
}