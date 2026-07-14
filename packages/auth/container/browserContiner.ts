
import { SupabaseAuthenticationProvider } from "../../infra/supabase/auth/supabase-authentication-provider";
import { createAuthenticationCommandService, type AuthenticationCommandService } from "../application/AuthenticationCommandService"
import { createAuthenticationService } from "../domain/identity/authentication/service";


export interface BrowserContainer {

    authenticationCommandService: AuthenticationCommandService;

}

export async function createBrowserContainer(): Promise<BrowserContainer> {

        const authenticationProvider
        = new SupabaseAuthenticationProvider();

        const authenticationService =
            createAuthenticationService({
                authenticationProvider,
            });

        const authenticationCommandService =
            createAuthenticationCommandService({
                authenticationService,
            });

        return {
            authenticationCommandService,
        }
}