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
            
            const currentUserProfile =
                await this.currentUserService.getCurrentUserProfile();

            if (!currentUserProfile) {
                throw new Error('User not authenticated');
            }

            const updatedProfile: Profile = {
                id: currentUserProfile.id,
                displayName: currentUserProfile.displayName,
                sync_display_name: currentUserProfile.sync_display_name,
                autoClassification: currentUserProfile.autoClassification,
                finalClassification: currentUserProfile.finalClassification,
                version: currentUserProfile.version,
                
                // ⭕ 只有當它們不是 undefined 時，才寫入屬性
                ...(currentUserProfile.class !== undefined && { class: currentUserProfile.class }),
                ...(currentUserProfile.number !== undefined && { number: currentUserProfile.number }),
                ...(currentUserProfile.studentId !== undefined && { studentId: currentUserProfile.studentId }),
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