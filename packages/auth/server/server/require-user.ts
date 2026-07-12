import { createAuthContainer } from '../../container';

export async function requireUser(): Promise<void> {

    const { authenticationReadService } = await createAuthContainer();

    const currentUser = await authenticationReadService.getCurrentUser();

    if (!currentUser) {
        throw new Error("No current user found.");
    }
}