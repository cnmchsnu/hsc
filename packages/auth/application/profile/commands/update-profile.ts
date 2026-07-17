import { ProfileStatus } from "../../../domain/profile";

export interface UpdateProfile {

    id: string;

    displayName?: string;

    studentId?: string | null;

    class?: string | null;

    number?: string | null;

    avatarUrl?: string | null;

    manualOverride?: string | null;

    sync_display_name?: boolean;

    status?: ProfileStatus;
}