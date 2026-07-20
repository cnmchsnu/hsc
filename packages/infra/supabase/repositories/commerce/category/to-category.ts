import type { Category, CreateCategory, UpdateCategory } from "../../../../../commerce/domain/category";
import type { CategoryRow } from "../../../entities";

import { RepositoryMapper } from "@repo/shared";

export const CategoryRepositoryMapper: RepositoryMapper<
    Category,
    CategoryRow,
    CreateCategory,
    UpdateCategory
> = {

    fromRow(
        row: CategoryRow,
    ): Category {
        return {
            id: row.id,
            name: row.name,
            slug: row.slug,
            description: row.description,
            parentId: row.parent_id,
            status: row.status,
            displayOrder: row.display_order,
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
        };
    },

    fromRows(
        rows: readonly CategoryRow[],
    ): Category[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateCategory,
    ): Partial<CategoryRow> {
        return {
            name: dto.name,
            slug: dto.slug,
            description: dto.description ?? null,
            parent_id: dto.parentId ?? null,
            status: dto.status,
            display_order: dto.displayOrder,
        };
    },

    toCreateRows(
        dto: readonly CreateCategory[],
    ): Partial<CategoryRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateCategory,
    ): Partial<CategoryRow> {
        return {
            id: dto.id,
            name: dto.name,
            slug: dto.slug,
            description: dto.description,
            parent_id: dto.parentId,
            status: dto.status,
            display_order: dto.displayOrder,
        };
    },

    toUpdateRows(
        dto: readonly UpdateCategory[],
    ): Partial<CategoryRow>[] {
        return dto.map(this.toUpdateRow);
    },
};