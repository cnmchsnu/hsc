import { ProductVariantSKU } from './build-product-variant-sku';
import { ProductVariantOption,  } from './build-product-variant-option';





export interface ProductVariant {

    options: readonly ProductVariantOption[];

    skus: readonly ProductVariantSKU[];

}

export function toProductVariant(
    options: readonly ProductVariantOption[],
    skus: readonly ProductVariantSKU[],

): ProductVariant {

    return {
        options: options,
        skus: skus,
    };
}

