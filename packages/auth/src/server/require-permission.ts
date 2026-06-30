import "server-only";

import { requireUser } from "./require-user";
import { createAuthContainer } from "../container";

import { PermissionDeniedError } from "../errors/permission-denied";

import type { PermissionKey } from "../types";

export async function requirePermission(
    permission: PermissionKey,
): Promise<void> {

    const currentUser =
        await requireUser();

    if (
        !currentUser.permission.has(
            permission,
        )
    ) {
        throw new PermissionDeniedError(
            permission,
        );
    }

}