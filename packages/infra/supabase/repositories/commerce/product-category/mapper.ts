

import { ProductCategory, CreateProductCategory } from "../../../../../commerce/domain/product-category";
import type { ProductCategoryRow } from "../../../entities";

import { RepositoryMapper } from "@repo/shared";


export const ProductCategoryRepositoryMapper: RepositoryMapper<
    ProductCategory,
    ProductCategoryRow,
    CreateProductCategory,
    ProductCategory
> = {

    fromRow(
        row: ProductCategoryRow,
    ): ProductCategory {

        return {
            category_id: row.category_id,
            product_id: row.product_id,

            is_primary: row.is_primary,
            display_order: row.display_order,
        };
    },

    fromRows(
        rows: readonly ProductCategoryRow[],
    ): ProductCategory[] {

        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateProductCategory,
    ): Partial<ProductCategoryRow> {

        return {
            category_id: dto.categoryId,
            product_id: dto.productId,

            is_primary: dto.isPrimary ?? false,
            display_order: dto.displayOrder,
        };
    },

    toCreateRows(
        dto: readonly CreateProductCategory[],
    ): Partial<ProductCategoryRow>[] {

        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: ProductCategory,
    ): Partial<ProductCategoryRow> {

        return {
            category_id: dto.category_id,
            product_id: dto.product_id,

            is_primary: dto.is_primary ?? false,
            display_order: dto.display_order,
        };
    },

    toUpdateRows(
        dto: readonly ProductCategory[],
    ): Partial<ProductCategoryRow>[] {

        return dto.map(this.toUpdateRow);
    },
};
