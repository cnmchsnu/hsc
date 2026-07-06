import "server-only";

import { requireUser } from "./require-user";
import { createCurrentUserAbility } from "../ability";

import { PermissionDeniedError } from "../errors/permission-denied";

import type { PermissionKey } from "../types";

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