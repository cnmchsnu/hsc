import type { AuthUser } from '@supabase/supabase-js'
import type { User } from "@supabase/supabase-js";

import type {
    CurrentUser,
    SyncProfileInput,
    UserProfile,
} from "../types";

export function toCurrentUser(
    authUser: AuthUser,
    profile: UserProfile,
): CurrentUser {
    return {
        
        id: authUser.id,

        email: authUser.email?.toString() ?? "",

        displayName:
            profile.displayName ??
            authUser.user_metadata.full_name?.toString() ??
            authUser.email?.split("@")[0],

        avatarUrl: 
            profile.avatarUrl ??
            authUser.user_metadata.avatar_url?.toString() ??
            null,

        classification: 
            profile.finalClassification,

    };
}

export function toSyncProfileInput(
    user: User,
): SyncProfileInput {
    return {
        DisplayName:
            user.user_metadata.full_name ??
            null,

        AvatarUrl:
            user.user_metadata.avatar_url ??
            null,
    };
}
