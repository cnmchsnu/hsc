import { Ability } from "../ability";
import { Authorization } from "./authorization";

export interface CurrentUser {

    id: string;

    email: string;

    displayName: string;

    avatarUrl: string | null;

    classification: string;

    authorization: Authorization

    readonly ability: Ability;
    
}

