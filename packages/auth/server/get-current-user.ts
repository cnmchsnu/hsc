import { createAuthContainer } from '../container';

import type { CurrentUser } from '../application/CurrentUserService';


export async function getCurrentUser(): Promise<CurrentUser | null> {

    const { authenticationService } = await createAuthContainer();

    return authenticationService.getCurrentUser();
}