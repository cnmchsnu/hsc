export interface Profile {

    id: string;

    displayName: string;

    studentId?: string | null;

    class?: string | null;

    number?: string | null;

    avatarUrl?: string | null;

    autoClassification: string;

    manualOverride?: string | null;
    
    finalClassification: string;

    sync_display_name: boolean;

    version: number;

}

export interface ProfileList {

    items: readonly Profile[];

    total: number;

    page: number;

    pageSize: number;

}

export type ProfileSort =
    | "newest"
    | "oldest"
    | "class-asc"
    | "class-desc"
    | "name-asc"
    | "name-desc"
    | "studentId-asc"
    | "studentId-desc";

export type ProfileStatus = 
    | "active"
    | "deactived"
    | "deleted"

export interface ProfileListOptions {

    page: number;

    pageSize: number;

    keyword?: string;

    profileIds?: readonly string[];

    studentId?: string;

    class?: string;

    number?: string;

    CreateDateBefore?: Date;

    CreateDateAfter?: Date;

    lastActiveDate?: Date;

    classification?: string;

    status?: ProfileStatus[];

    sort?: ProfileSort;

}