import { createAuthContainer } from '../../container';

import type { Session } from '../../domain/identity';


export async function getSession(): Promise<Session| null> {

    const { authenticationReadService } = await createAuthContainer();

    return await authenticationReadService.getSession();
}