'use server';

import { UpdateProfile } from "../../../../../../packages/auth/application/profile";
import { updateUserProfile } from "@repo/auth/server";

export async function updateCurrentProfile(

    command: UpdateProfile,

) {

    return await updateUserProfile(command);

}