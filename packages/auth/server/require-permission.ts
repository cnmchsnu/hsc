import "server-only";

import { requireUser } from "./require-user";
import { createCurrentUserAbility } from "../domain/ability";

import { PermissionDeniedError } from "../domain/authorization/error";

import type { PermissionKey } from "../domain/authorization/type";

export async function requirePermission(
    permission: PermissionKey,
): Promise<void> {


    const currentUser =
        await requireUser();

    const ability =
        createCurrentUserAbility(
            currentUser,
        );

    if (!ability.can(permission)) {

        throw new PermissionDeniedError(
            permission,
        );

    }

}
