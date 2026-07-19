import { createAuthContainer } from '../../container';

import { cache } from 'react';

import type { Session } from '../../domain/identity';


export const getSession: () => Promise<Session | null> = cache(async () => {
    const { authenticationReadService } = await createAuthContainer();

    return await authenticationReadService.getSession();
});