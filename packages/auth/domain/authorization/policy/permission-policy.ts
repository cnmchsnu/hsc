import type { Permission } from "../permissions";

export interface PermissionPolicy {

    hasPermission(

        permissions: readonly Permission[],

        permission: string,

    ): boolean;

    hasAnyPermission(
        permissions: readonly Permission[],
        permission: readonly string[],
    ): boolean;

    hasAllPermissions(
        permissions: readonly Permission[],
        permission: readonly string[],
    ): boolean;

}