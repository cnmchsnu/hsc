import { createBrowserContainer } from '../../container/browserContiner';


export async function signInWithGoogle(
    redirectTo?: string
): Promise<void> {

    const { authenticationCommandService } = await createBrowserContainer();

    return authenticationCommandService.signInWithGoogle(redirectTo);
}