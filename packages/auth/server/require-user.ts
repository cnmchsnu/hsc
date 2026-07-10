import { createAuthContainer } from '../container';

export async function requireUser(): Promise<void> {

    const { authenticationService } = await createAuthContainer();

    const currentUser = await authenticationService.getCurrentUser();

    if (!currentUser) {
        throw new Error("No current user found.");
    }
}