"server-only";
import { createBrowserContainer } from '../../container/browserContiner';
import { createAuthContainer } from '../../container';


export async function completeOAuthCallback(
    code: string
): Promise<void> {

    const { authenticationReadService } = await createAuthContainer();

    await authenticationReadService.exchangeCodeForSession(code);
}