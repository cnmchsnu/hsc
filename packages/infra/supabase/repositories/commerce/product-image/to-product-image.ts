import { ProductImage, CreateProductImage, UpdateProductImage } from '../../../../../commerce/domain/product-image';
import type { ProductImageRow } from '../../../entities';

import { RepositoryMapper } from '@repo/shared';

export const ProductImageRepositoryMapper: RepositoryMapper<
    ProductImage,
    ProductImageRow,
    CreateProductImage,
    UpdateProductImage
> = {

    fromRow(
        row: ProductImageRow,
    ): ProductImage {
        return {
            id: row.id,
            productId: row.product_id,
            url: row.storage_path,
            isPrimary: row.is_primary,
            displayOrder: row.display_order,
            alt: null, // Assuming alt is not stored in the database and is set to null by default
        };
    },

    fromRows(
        rows: readonly ProductImageRow[],
    ): ProductImage[] {
        return rows.map(this.fromRow);
    },

    toCreateRow(
        dto: CreateProductImage,
    ): Partial<ProductImageRow> {
        return {
            product_id: dto.productId,
            storage_path: dto.url,
            is_primary: dto.isPrimary,
            display_order: dto.displayOrder,
        };
    },

    toCreateRows(
        dto: readonly CreateProductImage[],
    ): Partial<ProductImageRow>[] {
        return dto.map(this.toCreateRow);
    },

    toUpdateRow(
        dto: UpdateProductImage,
    ): Partial<ProductImageRow> {
        return {
            id: dto.id,
            storage_path: dto.url,
            is_primary: dto.isPrimary,
            display_order: dto.displayOrder,
        };
    },

    toUpdateRows(
        dto: readonly UpdateProductImage[],
    ): Partial<ProductImageRow>[] {
        return dto.map(this.toUpdateRow);
    }

    
}
