import type {
    SyncProfileInput,
    UpdateProfileInput,
    UserProfile,
} from "../types";

export function buildSyncUpdate(
    profile: UserProfile,
    input: SyncProfileInput,
): Partial<UpdateProfileInput> {

    const update: Partial<UpdateProfileInput> = {};

    if (
        profile.syncDisplayName &&
        input.DisplayName !== undefined &&
        input.DisplayName !== profile.displayName
    ) {
        update.displayName = input.DisplayName;
    }

    if (
        profile.syncAvatar &&
        input.AvatarUrl !== undefined &&
        input.AvatarUrl !== profile.avatarUrl
    ) {
        update.avatarUrl = input.AvatarUrl;
    }

    update.studentId = input.StudentId

    return update;
}