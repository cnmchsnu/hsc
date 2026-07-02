import type { UserProfile } from "../../../../auth/src/types";

import type { UserProfileRow } from "../types";

export function toUserProfile(
    row: UserProfileRow,
): UserProfile {
    return {
        userId: row.user_id,

        displayName: row.display_name,

        avatarUrl: row.avatar_url,

        studentId: row.student_id,

        autoClassification: row.auto_classification,

        manualOverride: row.manual_override,

        finalClassification: row.final_classification,

        syncDisplayName: row.sync_display_name,

        syncAvatar: row.sync_avatar,

        createdAt: new Date(row.created_at),

        updatedAt: new Date(row.updated_at),
    };
}