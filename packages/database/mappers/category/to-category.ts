import type { Category } from "../../../commerce/domain/category";
import type { CategoryRow } from "../../entities";

export function toCategory(
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

}