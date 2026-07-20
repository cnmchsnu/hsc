import type { Session, SessionService } from "../domain/identity";
import { CurrentUserProfile, CurrentUserAuthorizationContext, CurrentUserService } from "./CurrentUserService";
import { LoginFlowService } from "./LoginFlowService";

export interface AuthenticationReadService {

    getSession(): Promise<Session | null>;

    getCurrentUserProfile(): Promise<CurrentUserProfile | null>;

    getCurrentUserAuthorizationContext(): Promise<CurrentUserAuthorizationContext | null>;

    exchangeCodeForSession(code: string): Promise<void>;

    
}

interface AuthReadServiceDependencies {

    sessionService: SessionService;

    currentUserService: CurrentUserService;

    loginFlowService: LoginFlowService;

}

class DefaultAuthenticationReadService 
    implements AuthenticationReadService {


        constructor(
            private readonly sessionService: SessionService,

            private readonly currentUserService: CurrentUserService,

            private readonly loginFlowService: LoginFlowService
        ) {}

        async getSession(): Promise<Session | null> {

            return await this.sessionService.getSession();
        }

        async exchangeCodeForSession(code: string): Promise<void> {
            await this.sessionService.exchangeCodeForSession(code);

            await this.loginFlowService.execute();
        }

        async getCurrentUserProfile(): Promise<CurrentUserProfile | null> {

            return await this.currentUserService.getCurrentUserProfile();
        }

        async getCurrentUserAuthorizationContext(): Promise<CurrentUserAuthorizationContext | null> {

            return await this.currentUserService.getCurrentUserAuthorizationContext();
        }


}

export function createAuthenticationReadService(
    dependencies: AuthReadServiceDependencies,
): AuthenticationReadService {
    return new DefaultAuthenticationReadService(
        dependencies.sessionService,
        dependencies.currentUserService,
        dependencies.loginFlowService
    );
}
