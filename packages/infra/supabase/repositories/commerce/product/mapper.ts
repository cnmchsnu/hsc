import type { Product, CreateProduct, UpdateProduct } from "../../../../../commerce/domain/product";
import type { ProductRow } from "../../../entities";

import { RepositoryMapper } from "@repo/shared/";

export const ProductRepositoryMapper: RepositoryMapper<
    Product,
    ProductRow,
    CreateProduct,
    UpdateProduct
> = {

    fromRow(
        row: ProductRow,
    ): Product {
        return {
            id: row.id,
            slug: row.slug,
            name: row.name,
            description: row.description,
            status: row.status,
        };
    },

    fromRows(
        rows: readonly ProductRow[],
    ): Product[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateProduct,
    ): Partial<ProductRow> {
        return {
            slug: dto.slug,
            name: dto.name,
            description: dto.description ?? null,
            status: dto.status,
        };
    },

    toCreateRows(
        dto: readonly CreateProduct[],
    ): Partial<ProductRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateProduct,
    ): Partial<ProductRow> {
        return {
            id: dto.id,
            slug: dto.slug,
            name: dto.name,
            description: dto.description,
            status: dto.status,
        };
    },

    toUpdateRows(
        dto: readonly UpdateProduct[],
    ): Partial<ProductRow>[] {
        return dto.map(this.toUpdateRow);
    },
};

