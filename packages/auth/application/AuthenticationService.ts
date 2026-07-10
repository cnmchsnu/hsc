import { AuthenticationProvider } from "../domain/identity";
import type { Session, SessionService } from "../domain/identity";
import { CurrentUser, CurrentUserService } from "./CurrentUserService";
import { LoginFlowService } from "./LoginFlowService";

export interface AuthenticationService {

    getSession(): Promise<Session | null>;

    getCurrentUser(): Promise<CurrentUser | null>;

    signInWithGoogle(redirectTo?: string): Promise<void>

    signOut(): Promise<void>

    refresh(): Promise<void>

    revoke() : Promise<void>
    
}

interface AuthReadServiceDependencies {

    provider: AuthenticationProvider,

    sessionService: SessionService;

    currentUserService: CurrentUserService;

    loginFlowService: LoginFlowService;

}

class DefaultAuthenticationService 
    implements AuthenticationService {


        constructor(
            private readonly provider: AuthenticationProvider,

            private readonly sessionService: SessionService,

            private readonly currentUserService: CurrentUserService,

            private readonly loginFlowService: LoginFlowService,
        ) {}

        async getSession(): Promise<Session | null> {

            return this.sessionService.getSession();
        }

        async getCurrentUser(): Promise<CurrentUser | null> {

            return this.currentUserService.get();
        }

        async signInWithGoogle(
            redirectTo?: string
        ): Promise<void> {
            this.provider.signInWithGoogle(redirectTo);

            this.loginFlowService.execute()
                .catch((error) => {
                    console.error("Error during login flow:", error);
                });

        }

        async signOut(): Promise<void> {
            return this.provider.signOut();
        }

        async refresh(): Promise<void> {
            return this.provider.refreshSession();
        }

        async revoke(): Promise<void> {
            return this.provider.revokeSession();
        }

}

export function createAuthenticationService(
    dependencies: AuthReadServiceDependencies,
): AuthenticationService {
    return new DefaultAuthenticationService(
        dependencies.provider,
        dependencies.sessionService,
        dependencies.currentUserService,
        dependencies.loginFlowService,
    );
}
