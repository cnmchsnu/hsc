import { UserService } from "../domain/identity";

import { ProfileSyncService } from "./ProfileSyncService";
import { ProfileInitializationService } from "./ProfileInitializationService";
import { ProfileRepository } from "../domain/profile";

export interface LoginFlowService {

    execute(): Promise<void>;

}

interface LoginFlowServiceDependencies {

    userService: UserService;

    profileSyncService: ProfileSyncService;

    profileInitializationService: ProfileInitializationService;

    profileRepository: ProfileRepository;

}

class DefaultLoginFlowService
    implements LoginFlowService {

        constructor(
            private readonly userService: UserService,
            private readonly profileSyncService: ProfileSyncService,
            private readonly profileInitializationService: ProfileInitializationService,
            private readonly profileRepository: ProfileRepository
        ) {}

    async execute(): Promise<void> {

        const user =
            await this.userService.get();

        if (!user) {
            throw new Error("No active user found.");
        }

        const existProfile = await this.profileRepository.exists(user.id);

        if (!existProfile) {
            await this.profileInitializationService.initialize(user.id);
        }
        

        await this.profileSyncService.sync(user.id);
    }
}

export function createLoginFlowService(
    dependencies: LoginFlowServiceDependencies
): LoginFlowService {
    return new DefaultLoginFlowService(
        dependencies.userService,
        dependencies.profileSyncService,
        dependencies.profileInitializationService,
        dependencies.profileRepository
    );
}
        
