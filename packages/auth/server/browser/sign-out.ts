"server-only";

import { createBrowserContainer } from '../../container/browserContiner';


export async function signOut(): Promise<void> {

    const { authenticationCommandService } = await createBrowserContainer();

    return authenticationCommandService.signOut();
}