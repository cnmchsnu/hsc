import type { AuthUser } from '@supabase/supabase-js'
import type { User } from "@supabase/supabase-js";

import type {
    Authorization,
    CurrentUser,
    SyncProfileInput,
    UserProfile,
} from "../types";

import { can } from '../ability';

export function toCurrentUser(
    authUser: AuthUser,
    profile: UserProfile,
    authorization: Authorization
): CurrentUser {

    return {
        
        id: authUser.id,

        email: authUser.email?.toString() ?? "",

        displayName:
            profile.displayName ??
            authUser.user_metadata.full_name?.toString() ??
            authUser.email?.split("@")[0],

        studentId:
            profile.studentId ?? null,

        avatarUrl: 
            profile.avatarUrl ??
            authUser.user_metadata.avatar_url?.toString() ??
            null,

        classification: 
            profile.finalClassification,

        authorization: 
            authorization,
            

    };
}

export function toSyncProfileInput(
    user: User,
    isInternal: boolean,
): SyncProfileInput {
    return {
        DisplayName:
            user.user_metadata.full_name ??
            null,

        StudentId:
            (isInternal ? user.email?.replace("@gs.hs.ntnu.edu.tw", "") : null ) ?? //setting Update
            null,

        AvatarUrl:
            user.user_metadata.avatar_url ??
            null,
    };
}
