export interface UserProfile {

    userId: string;

    displayName: string | null;
    avatarUrl: string | null;

    studentId: string | null;

    autoClassification: string;
    manualOverride: string | null;
    finalClassification: string;

    syncDisplayName: boolean;
    syncAvatar: boolean;

    createdAt: Date;
    updatedAt: Date;
}

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

    StudentId?: string | null;

    AvatarUrl?: string | null;
}

export interface EnsureProfileInput {
    userId: string;

    sync: SyncProfileInput;

    autoClassification: string;
}
