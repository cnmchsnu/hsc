import { PermissionPolicy } from "./permission-policy";
import type { Permission } from "../../domain/permissions";

export class DefaultPermissionPolicy
    implements PermissionPolicy {

    constructor() {

    }

    hasPermission(
        permissions: readonly Permission[],
        permission: string,
    ): boolean {

        return permissions.some(
            p => p.key === permission,
        );

    }

    hasAnyPermission(
        permissions: readonly Permission[],
        required: readonly string[],
    ): boolean {

        const keys = new Set(
            permissions.map(p => p.key),
        );

        return required.some(
            key => keys.has(key),
        );

    }

    hasAllPermissions(
        permissions: readonly Permission[],
        required: readonly string[],
    ): boolean {

        const keys = new Set(
            permissions.map(p => p.key),
        );

        return required.every(
            key => keys.has(key),
        );

    }

};
