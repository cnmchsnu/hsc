import { findProductVariantSKU, ProductVariant } from "@repo/commerce/application";


export function createProductSelection(
    variant: ProductVariant,
) {
    return {

        find(
            selectedValueIds: readonly string[],
        ) {
            return findProductVariantSKU(
                variant,
                selectedValueIds,
            );
        },

    };
}