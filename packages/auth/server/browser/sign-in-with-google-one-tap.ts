"server-only";

import { createBrowserContainer } from '../../container/browserContiner';


export async function signInWithGoogleOneTap(
    provider: string,
    token: string
): Promise<void> {

    const { authenticationCommandService } = await createBrowserContainer();

    return authenticationCommandService.signInWithGoogleOneTap(provider, token);
}