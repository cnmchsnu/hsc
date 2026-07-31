import { createAuthContainer } from '../../container';

import { Profile } from '../../domain/profile';

import type { UpdateProfile } from '../../domain/profile';


export async function updateUserProfile(command: UpdateProfile): Promise<Profile| null> {

    const { profileCommandService } = await createAuthContainer();

    return await profileCommandService.updateUserProfile(command);
}