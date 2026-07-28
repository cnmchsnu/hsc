import type { Profile, ProfileRepository } from "../domain/profile";
import { AutoClassificationService } from "./AutoClassificationService";

export interface ProfileInitializationService {

    initialize(
        userId: string,
    ): Promise<void>;

}

interface ProfileInitializationServiceDependencies {

    autoClassificationService: AutoClassificationService;

    profileRepository: ProfileRepository;

}

class DefaultProfileInitializationService
    implements ProfileInitializationService {

        constructor(
            private readonly autoClassificationService: AutoClassificationService,
            private readonly profileRepository: ProfileRepository,
        ) {}

    async initialize(
        userId: string,
    ): Promise<void> {

        const profile =
            await this.profileRepository.findByUid(userId);

        if (!profile) {
            const autoClassification =
                await this.autoClassificationService.Determine();

            const newProfile: Profile = {
                id: userId,
                displayName: "",
                autoClassification: autoClassification,
                finalClassification: autoClassification,
                sync_display_name: true,
                version: 1,
            };

            await this.profileRepository.create(newProfile);
        }

    }
}


export function createProfileInitializationService(
    dependencies: ProfileInitializationServiceDependencies
): ProfileInitializationService {
    return new DefaultProfileInitializationService(
        dependencies.autoClassificationService,
        dependencies.profileRepository,
    );
}