import { createAuthContainer } from '../../container';

import { cache } from 'react';

import type { CurrentUserProfile } from '../../application';


export const getCurrentUserProfile = cache(async (source: string): Promise<CurrentUserProfile | null> => {
    
    const { authenticationReadService } = await createAuthContainer();

    const user = await authenticationReadService.getCurrentUserProfile();


    return user;
});