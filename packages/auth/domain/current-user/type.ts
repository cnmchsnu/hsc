import type { Ability } from "../ability";
import type { Authorization } from "../authorization/type";

export interface CurrentUser {

    id: string;

    email: string;

    displayName: string;

    avatarUrl: string | null;

    studentId: string | null;

    classification: string;

    authorization: Authorization

    // readonly ability: Ability;
    
}
