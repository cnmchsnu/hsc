import { createAuthContainer } from '../../container';

export async function requireSession(): Promise<void> {

    const { authenticationReadService } = await createAuthContainer();

    const session = await authenticationReadService.getSession();

    if (!session) {
        throw new Error("No session found.");
    }
}