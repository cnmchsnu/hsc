import type { CurrentUser } from "../types";
import type { PermissionKey } from "../types";

export function can(
    user: CurrentUser,
    permission: PermissionKey,
): boolean {

    return user.authorization.permissions.has(
        permission,
    );

}