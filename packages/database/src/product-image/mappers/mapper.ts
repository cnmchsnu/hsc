import { ProductImage } from '@repo/commerce/product-image';
import type {
    ProductImageRow,
} from '../types/';

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