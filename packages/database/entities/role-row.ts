import { RoleTypes } from "../../auth/domain/authorization/role";

export interface RoleRow {

    id: string;

    name: string;

    description: string;

    scope: RoleTypes;

    created_at: string;

    updated_at: string;

}