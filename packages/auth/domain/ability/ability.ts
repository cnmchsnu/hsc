import type { PermissionKey } from "../authorization/type";

export interface Ability {

    can(
        permission: PermissionKey,
    ): boolean;

}
