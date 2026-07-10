import { createAuthContainer } from '../container';

export async function requireSession(): Promise<void> {

    const { authenticationService } = await createAuthContainer();

    const session = await authenticationService.getSession();

    if (!session) {
        throw new Error("No session found.");
    }
}