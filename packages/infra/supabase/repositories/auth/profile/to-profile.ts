import { UserProfileRow } from "@repo/database/entities";
import { Profile } from "../../../../../auth/domain/profile";

export function toProfile(
    row: UserProfileRow   
): Profile {
    return {
        id: row.user_id,
        displayName: row.display_name!,
        studentId: row.student_id,
        class: row.class,
        number: row.number,
        avatarUrl: row.avatar_url,
        autoClassification: row.auto_classification,
        manualOverride: row.manual_override,
        finalClassification: row.final_classification,
        status: row.status,
        version: row.version,
    }
}