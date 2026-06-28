export interface CreateProfileInput {
    userId: string;

    displayName?: string | null;

    avatarUrl?: string | null;

    studentId?: string | null;

    autoClassification: string;
}

export interface UpdateProfileInput {
    displayName?: string | null;

    avatarUrl?: string | null;

    studentId?: string | null;

    manualOverride?: string | null;

    syncDisplayName?: boolean;

    syncAvatar?: boolean;
}

export interface SyncProfileInput {
    DisplayName?: string | null;

    AvatarUrl?: string | null;
}

export interface EnsureProfileInput {
    userId: string;

    sync: SyncProfileInput;

    autoClassification: string;
}