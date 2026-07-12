import { createAuthContainer } from '../../container';

import type { CurrentUser } from '../../application/CurrentUserService';


export async function getCurrentUser(): Promise<CurrentUser | null> {

    const { authenticationReadService } = await createAuthContainer();

    return authenticationReadService.getCurrentUser();
}