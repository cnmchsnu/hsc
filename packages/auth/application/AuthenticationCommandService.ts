import { AuthenticationService } from "../domain/identity";

export interface AuthenticationCommandService {

    signInWithGoogle(
        redirectTo?: string,
    ): Promise<void>;

    signInWithGoogleOneTap(
        provider: string,
        token: string,
    ): Promise<void>;


    signOut(): Promise<void>;

}

interface AuthCommandServiceDependencies {

    authenticationService: AuthenticationService

}



class DefaultAuthenticationCommandService 
    implements AuthenticationCommandService {


        constructor(
            private readonly authenticationService: AuthenticationService,
        ) {}

        async signInWithGoogle(
            redirectTo?: string
        ): Promise<void> {
            await this.authenticationService.signInWithGoogle(redirectTo);
        }

        async signInWithGoogleOneTap(
            provider: string,
            token: string
        ): Promise<void> {
            await this.authenticationService.signInWithGoogleOneTap(provider, token);
        }

        async signOut(): Promise<void> {
            await this.authenticationService.signOut();
        }

}


export function createAuthenticationCommandService(
    dependencies: AuthCommandServiceDependencies
): AuthenticationCommandService {
    return new DefaultAuthenticationCommandService(
        dependencies.authenticationService
    )
}