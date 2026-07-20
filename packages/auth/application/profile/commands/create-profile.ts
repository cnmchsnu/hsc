import { ProfileStatus } from "../../../domain/profile";

export interface CreateProfile {

    id: string;

    displayName: string;

    studentId?: string | null;

    class?: string | null;

    number?: string | null;

    avatarUrl?: string | null;

    autoClassification: string;

    manualOverride?: string | null;

}