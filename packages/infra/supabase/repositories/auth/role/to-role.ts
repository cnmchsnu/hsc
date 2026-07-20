
import type { RoleRow } from "../../../entities"

import { Role } from "../../../../../auth/domain/authorization";

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