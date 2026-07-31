import { ProfileRepository } from "../domain/profile";

import { Profile } from "../domain/profile";
import { UserService } from "../domain/identity";


export interface ProfileSyncService {

    sync(
        userId: string,
    ): Promise<void>;

}

interface ProfileSyncServiceDependencies {

    userService: UserService;
    
    profileRepository: ProfileRepository;

}


class DefaultProfileSyncService
    implements ProfileSyncService {

        constructor(
            private readonly userService: UserService,
            private readonly profileRepository: ProfileRepository,
        ) {}

        async sync(
            userId: string,
        ): Promise<void> {
            const user = await this.userService.get();

            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }

            const profile = await this.profileRepository.findByUid(userId);

            if (!profile) {
                throw new Error(`Profile for user with ID ${userId} not found.`);
            }

            const newProfile: Profile = {
                ...profile,
                displayName: profile.sync_display_name ? user.name : profile.displayName,
                avatarUrl: profile.avatarUrl,
            };

            if (newProfile === profile) {
                return;
            }

            await this.profileRepository.update(newProfile);
        }
    }


export function createProfileSyncService(
    dependencies: ProfileSyncServiceDependencies,
): ProfileSyncService {
    return new DefaultProfileSyncService(
        dependencies.userService,
        dependencies.profileRepository,
    );
}