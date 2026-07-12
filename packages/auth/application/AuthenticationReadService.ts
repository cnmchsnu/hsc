import type { Session, SessionService } from "../domain/identity";
import { CurrentUser, CurrentUserService } from "./CurrentUserService";
import { LoginFlowService } from "./LoginFlowService";

export interface AuthenticationReadService {

    getSession(): Promise<Session | null>;

    getCurrentUser(): Promise<CurrentUser | null>;

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

        async getCurrentUser(): Promise<CurrentUser | null> {

            return await this.currentUserService.get();
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
