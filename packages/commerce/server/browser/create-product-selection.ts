import { createProductSelection as findProductVariantSKU , ProductVariant } from "@repo/commerce/application";


export function createProductSelection(
    variant: ProductVariant,
) {
    return findProductVariantSKU(variant);
}