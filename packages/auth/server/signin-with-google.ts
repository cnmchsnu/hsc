import { createAuthContainer } from '../container';


export async function signInWithGoogle(): Promise<void> {

    const { authenticationService } = await createAuthContainer();

    return authenticationService.signInWithGoogle();
}