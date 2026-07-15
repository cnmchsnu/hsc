import type { AuthenticationProvider } from "@repo/infra/supabase/auth";


export interface AuthenticationService {

    signInWithGoogle(redirectTo?: string): Promise<void>;

    signInWithGoogleOneTap(
        provider: string, 
        token: string
    ): Promise<void>;

    signOut(): Promise<void>;

    refreshSession(): Promise<void>;

    revokeSession(): Promise<void>;

}

interface AuthenticationServiceDependencies {

    authenticationProvider: AuthenticationProvider;
    

}

export class DefaultAuthenticationService
    implements AuthenticationService {

    constructor(
        private readonly authenticationProvider: AuthenticationProvider,
    ) {}

    async signInWithGoogle(
        redirectTo?: string
    ): Promise<void> {
        return this.authenticationProvider.signInWithGoogle(redirectTo);
    }

    async signInWithGoogleOneTap(
        provider: string,
        token: string
    ): Promise<void> {
        return this.authenticationProvider.signInWithGoogleIdToken(provider, token);
    }

    async signOut(): Promise<void> {
        return this.authenticationProvider.signOut();
    }


    async refreshSession(): Promise<void> {
        return this.authenticationProvider.refreshSession();
    }

    async revokeSession(): Promise<void> {
        return this.authenticationProvider.revokeSession();
    }

}

export function createAuthenticationService(
    dependencies: AuthenticationServiceDependencies
): AuthenticationService {
    return new DefaultAuthenticationService(
        dependencies.authenticationProvider,
    );
}
