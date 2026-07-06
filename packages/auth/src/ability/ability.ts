import type { PermissionKey } from "../types";

export interface Ability {

    can(
        permission: PermissionKey,
    ): boolean;

}