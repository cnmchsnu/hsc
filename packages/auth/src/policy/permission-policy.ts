import type { PermissionKey } from "../types";

export interface PermissionPolicy {

    can(
        permissions: ReadonlySet<PermissionKey>,
        required: PermissionKey,
    ): boolean;

}