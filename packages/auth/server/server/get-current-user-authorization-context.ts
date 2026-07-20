import { createAuthContainer } from '../../container';

import { cache } from 'react';

import type { CurrentUserAuthorizationContext } from '../../application';


export const getCurrentUserAuthorizationContext = cache(async (): Promise<CurrentUserAuthorizationContext | null> => {

    const { authenticationReadService } = await createAuthContainer();

    const user = await authenticationReadService.getCurrentUserAuthorizationContext();


    return user;
});