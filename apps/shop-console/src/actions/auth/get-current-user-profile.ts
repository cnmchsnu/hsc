"use server";

import { getCurrentUserProfile } from "@repo/auth/server";
import { CurrentUserProfile } from "../../../../../packages/auth/application";



export async function getCurrentUserProfileAction(): Promise<CurrentUserProfile | null> {
    return await getCurrentUserProfile();
}