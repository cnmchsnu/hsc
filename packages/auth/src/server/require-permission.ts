import "server-only";

import { requireUser } from "./require-user";

import { PermissionDeniedError } from "../errors/permission-denied";

import type { PermissionKey } from "../types";

export async function requirePermission(
    permissions: PermissionKey,
): Promise<void> {

    const currentUser =
        await requireUser();

    if (
        !currentUser.permissions.has(
            permissions,
        )
    ) {
        console.log(currentUser.permissions)
        throw new PermissionDeniedError(
            permissions,
        );
    }

}