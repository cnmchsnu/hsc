import type { PermissionKey } from "../authorization/type";

export interface PermissionPolicy {

    can(
        permissions: ReadonlySet<PermissionKey>,
        required: PermissionKey,
    ): boolean;

}
