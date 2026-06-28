import type {
    SyncProfileInput,
    UpdateProfileInput,
    UserProfile,
} from "../types";

export function buildSyncUpdate(
    profile: UserProfile,
    provider: SyncProfileInput,
): UpdateProfileInput {

    const update: UpdateProfileInput = {};

    if (
        profile.syncDisplayName &&
        provider.providerDisplayName
    ) {
        update.displayName =
            provider.providerDisplayName;
    }

    if (
        profile.syncAvatar &&
        provider.providerAvatarUrl
    ) {
        update.avatarUrl =
            provider.providerAvatarUrl;
    }

    return update;
}