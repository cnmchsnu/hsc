import { SessionService, UserService } from "../domain/identity";

import { ProfileSyncService } from "./ProfileSyncService";
import { ProfileInitializationService } from "./ProfileInitalizationService";
import { ProfileRepository } from "../../database/repositories/identity";

export interface LoginFlowService {

    execute(): Promise<void>;

}

interface LoginFlowServiceDependencies {

    sessionService: SessionService;

    profileSyncService: ProfileSyncService;

    profileInitializationService: ProfileInitializationService;

    profileRepository: ProfileRepository;

}

class DefaultLoginFlowService
    implements LoginFlowService {

        constructor(
            private readonly sessionService: SessionService,
            private readonly profileSyncService: ProfileSyncService,
            private readonly profileInitializationService: ProfileInitializationService,
            private readonly profileRepository: ProfileRepository
        ) {}

    async execute(): Promise<void> {

        const session =
            await this.sessionService.getSession();

        if (!session) {
            throw new Error("No active session found.");
        }

        const existProfile = await this.profileRepository.exists(session.userId);

        if (!existProfile) {
            await this.profileInitializationService.initialize(session.userId);
        }
        

        await this.profileSyncService.sync(session.userId);
    }
}

export function createLoginFlowService(
    dependencies: LoginFlowServiceDependencies
): LoginFlowService {
    return new DefaultLoginFlowService(
        dependencies.sessionService,
        dependencies.profileSyncService,
        dependencies.profileInitializationService,
        dependencies.profileRepository
    );
}
        
