import { ProductImage } from '../../../commerce/src/product-image';
import type { ProductImageRow } from '../../entities';

export function toProductImage(
    row: ProductImageRow,
): ProductImage {

    return {

        id: row.id,

        productId: row.product_id,

        url: row.storage_path,

        alt: null,

        displayOrder: row.display_order,

    };



}