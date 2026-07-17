import { createAuthContainer } from '../../container';

import { Profile } from '../../domain/profile';

import type { UpdateProfile } from '../../application/profile/commands/update-profile';


export async function updateUserProfile(command: UpdateProfile): Promise<Profile| null> {

    const { profileCommandService } = await createAuthContainer();

    return await profileCommandService.updateUserProfile(command);
}