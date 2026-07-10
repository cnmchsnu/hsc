import type { Permission } from "../../../../../auth/domain/permissions";
import type { PermissionRow } from "@repo/database/entities";

export function toPermission(
    row: PermissionRow
): Permission {

    return {
        id: row.id,

        key: row.key,

        scope: row.scope,

        description: row.description,

    }

}