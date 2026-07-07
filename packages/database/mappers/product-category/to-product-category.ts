import { ProductCategory } from "../../../commerce/domain/product-category";
import type { ProductCategoryRow } from "../../entities";


export function toProductCategory(
    row: ProductCategoryRow
): ProductCategory {
    return {
        category_id: row.category_id,
        product_id: row.product_id,
        is_primary: row.is_primary,
        display_order: row.display_order,
    };
}
