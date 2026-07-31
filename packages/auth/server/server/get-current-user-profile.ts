import { createAuthContainer } from '../../container';

import { cache } from 'react';

import type { CurrentUserProfile } from '../../application';


export async function getCurrentUserProfile(): Promise<CurrentUserProfile | null> {
    
    const { authenticationReadService } = await createAuthContainer();

    const user = await authenticationReadService.getCurrentUserProfile();


    return user;
}