import { SessionService } from "../domain/identity";
import { UserRepository } from "@repo/database/repositories";

import { ProfileSyncService } from "./ProfileSyncService";
import { ProfileInitializationService } from "./ProfileInitalizationService";

export interface LoginFlowService {

    execute(): Promise<void>;

}

interface LoginFlowServiceDependencies {

    sessionService: SessionService;

    userRepository: UserRepository;

    profileSyncService: ProfileSyncService;

    profileInitializationService: ProfileInitializationService;

}

class DefaultLoginFlowService
    implements LoginFlowService {

        constructor(
            private readonly sessionService: SessionService,
            private readonly userRepository: UserRepository,
            private readonly profileSyncService: ProfileSyncService,
            private readonly profileInitializationService: ProfileInitializationService,
        ) {}

    async execute(): Promise<void> {

        const session =
            await this.sessionService.getSession();

        if (!session) {
            throw new Error("No active session found.");
        }

        const user = 
            await this.userRepository.getById(session.userId);

        if (!user) {
            throw new Error("User not found for the current session.");
        }

        await this.profileInitializationService.initialize(user.id);

        await this.profileSyncService.sync(user.id);
    }
}

export function createLoginFlowService(
    dependencies: LoginFlowServiceDependencies
): LoginFlowService {
    return new DefaultLoginFlowService(
        dependencies.sessionService,
        dependencies.userRepository,
        dependencies.profileSyncService,
        dependencies.profileInitializationService
    );
}
        
