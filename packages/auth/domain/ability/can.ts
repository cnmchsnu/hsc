import type { CurrentUser } from "../current-user/type";
import type { PermissionKey } from "../authorization/type";

export function can(
    user: CurrentUser,
    permission: PermissionKey,
): boolean {

    return user.authorization.permissions.has(
        permission,
    );

}
