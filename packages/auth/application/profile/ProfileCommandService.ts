import { UpdateProfile } from './commands';
import { Profile } from '../../domain/profile';

import { ProfileRepository } from '@repo/database/repositories';
import { CurrentUserService } from '../CurrentUserService';


export interface ProfileCommandService {

    updateUserProfile(
        command: UpdateProfile,
    ): Promise<Profile>;

}

interface ProfileCommandServiceDependencies {

    currentUserService: CurrentUserService;

    profileRepository: ProfileRepository;

}

class DefaultProfileCommandService 
    implements ProfileCommandService {


        constructor(
            private readonly currentUserService: CurrentUserService,
            private readonly profileRepository: ProfileRepository,
        ) {}    

        async updateUserProfile(
            command: UpdateProfile,
        ): Promise<Profile> {
            
            const currentUser =
            await this.currentUserService.get();

            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            const profile =
                await this.profileRepository.findById(currentUser.session.userId);

            if (!profile) {
                throw new Error('Profile not found');
            }

            const updatedProfile: Profile = {
                ...profile,
                displayName: command.displayName ?? profile.displayName,
                class: command.class ?? profile.class,
                number: command.number ?? profile.number,
                sync_display_name: (command.displayName === profile.displayName) ? true : false,
                version: profile.version + 1,
            };

            await this.profileRepository.update(updatedProfile);

            return updatedProfile;
        }
}

export function createProfileCommandService(
    dependencies: ProfileCommandServiceDependencies,
): ProfileCommandService {

    return new DefaultProfileCommandService(
        dependencies.currentUserService,
        dependencies.profileRepository,
    );
}