import { createAuthContainer } from '../../container';

import { cache } from 'react';

import type { CurrentUser } from '../../application/CurrentUserService';


export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
    const { authenticationReadService } = await createAuthContainer();

    return authenticationReadService.getCurrentUser();
});