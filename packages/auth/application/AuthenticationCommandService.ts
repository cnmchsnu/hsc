import { AuthenticationService } from "../domain/identity";

import { LoginFlowService } from "./LoginFlowService";


export interface AuthenticationCommandService {

    signInWithGoogle(
        redirectTo?: string,
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
            this.authenticationService.signInWithGoogle(redirectTo);

        }

        async signOut(): Promise<void> {
            return this.authenticationService.signOut();
        }

}


export function createAuthenticationCommandService(
    dependencies: AuthCommandServiceDependencies
): AuthenticationCommandService {
    return new DefaultAuthenticationCommandService(
        dependencies.authenticationService,
    )
}