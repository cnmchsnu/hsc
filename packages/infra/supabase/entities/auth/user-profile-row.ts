import { ProfileStatus } from "../../../../auth/domain/profile";

export interface UserProfileRow {
    user_id: string;

    display_name: string | null;

    student_id: string | null;

    class: string | null;

    number: string | null;

    avatar_url: string | null;

    auto_classification: string;

    manual_override: string | null;

    final_classification: string;

    sync_display_name: boolean;

    sync_avatar: boolean;

    status: ProfileStatus;

    version: number;

    created_at: string;

    updated_at: string;
}