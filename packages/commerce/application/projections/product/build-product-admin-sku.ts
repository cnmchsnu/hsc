import type {
    SKU, 
    VariantOptionValue, 
    InventoryItem, 
    Price
} from '../../../domain';
import { ProductVariantSKU } from './build-product-variant-sku';


export interface ProductAdminSKU {

    sku: SKU;

    values: readonly VariantOptionValue[];

    inventory: InventoryItem | null;

    currentPrice: Price | null;

}

export function toProductAdminSKU(

    variantSku:
        ProductVariantSKU,

): ProductAdminSKU {

    return {

        sku:
            variantSku.sku,

        values:
            variantSku.values,

        inventory:
            variantSku.inventory,

        currentPrice:
            variantSku.currentPrice,

    };

}

