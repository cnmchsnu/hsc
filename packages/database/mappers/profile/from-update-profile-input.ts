import type {
    UpdateProfileInput,
} from "../../../auth/application/profile";

export function fromUpdateProfileInput(
    input: UpdateProfileInput,
) {
    return {
        display_name: input.displayName,

        avatar_url: input.avatarUrl,

        student_id: input.studentId,

        manual_override: input.manualOverride,

        sync_display_name:
            input.syncDisplayName,

        sync_avatar:
            input.syncAvatar,
    };
}