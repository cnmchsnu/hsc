
import type { RoleRow } from "@repo/database/entities";

import { Role } from "../../../../../auth/domain/role";

export function toRole(
    row: RoleRow
): Role {
    return {
        id: row.id,
        scope: row.scope,
        name: row.name,
        description: row.description
    };
}