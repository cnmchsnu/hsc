import { createAuthContainer } from '../../container';

export async function requireUser(): Promise<boolean> {

    const { authenticationReadService } = await createAuthContainer();

    const currentUser = await authenticationReadService.getCurrentUser();

    if (!currentUser) {
        return false;
    }

    return true;
}