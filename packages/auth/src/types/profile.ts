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