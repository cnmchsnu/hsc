import { ProductImage } from '../../../../../commerce/domain/product-image';
import type { ProductImageRow } from '@repo/database/entities';

export function toProductImage(
    row: ProductImageRow,
): ProductImage {

    return {

        id: row.id,

        productId: row.product_id,

        url: row.storage_path,

        isPrimary: row.is_primary,

        alt: null,

        displayOrder: row.display_order,

    };



}