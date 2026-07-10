import { createAuthContainer } from '../container';

import type { Session } from '../domain/identity';


export async function getSession(): Promise<Session| null> {

    const { authenticationService } = await createAuthContainer();

    return await authenticationService.getSession();
}