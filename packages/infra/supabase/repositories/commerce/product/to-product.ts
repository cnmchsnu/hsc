import type { Product } from "../../../../../commerce/domain/product";
import type { CreateProduct, UpdateProduct } from "../../../../../commerce/application/command/product";
import type { ProductRow } from "@repo/database/entities";

import { RepositoryMapper } from "../../shared/repository-mapper";

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
            price: row.price,
            compareAtPrice: row.compare_at_price,
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
            price: dto.price,
            compare_at_price: dto.compareAtPrice ?? null,
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
            price: dto.price,
            compare_at_price: dto.compareAtPrice,
        };
    },

    toUpdateRows(
        dto: readonly UpdateProduct[],
    ): Partial<ProductRow>[] {
        return dto.map(this.toUpdateRow);
    },
};

