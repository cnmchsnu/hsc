import type { Permission } from "../../../../../auth/domain/authorization";
import type { CreatePermission, UpdatePermission } from "../../../../../auth/application/authorization/permissions";
import type { PermissionRow } from "@repo/database/entities";

import { RepositoryMapper } from "../../shared/repository-mapper";

export const PermissionRepositoryMapper: RepositoryMapper<
    Permission,
    PermissionRow,
    CreatePermission,
    UpdatePermission
> = {

    fromRow(
        row: PermissionRow,
    ): Permission {
        return {
            id: row.id,
            key: row.key,
            scope: row.scope,
            description: row.description,
        };
    },

    fromRows(
        rows: readonly PermissionRow[],
    ): Permission[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreatePermission,
    ): Partial<PermissionRow> {
        return {
            key: dto.key,
            scope: dto.scope,
            description: dto.description ?? null,
        };
    },

    toCreateRows(
        dto: readonly CreatePermission[],
    ): Partial<PermissionRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdatePermission,
    ): Partial<PermissionRow> {
        return {
            key: dto.key,
            scope: dto.scope,
            description: dto.description,
        };
    },

    toUpdateRows(
        dto: readonly UpdatePermission[],
    ): Partial<PermissionRow>[] {
        return dto.map(this.toUpdateRow);
    },
};