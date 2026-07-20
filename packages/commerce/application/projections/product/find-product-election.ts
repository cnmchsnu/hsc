import { ProductVariant, ProductVariantSKU } from "./build-product-variant";


export interface ProductSelection {

    productId: string;

    selectedValueIds: readonly string[];

}

export interface ProductSelectionResult {

    sku: ProductVariantSKU;

}

export function findProductVariantSKU(
    variant: ProductVariant,
    selectedValueIds: readonly string[],
): ProductVariantSKU | null {

    const selected = new Set(selectedValueIds);

    return (
        variant.skus.find((candidate) => {

            if (candidate.values.length !== selected.size) {
                return false;
            }

            return candidate.values.every((value) =>
                selected.has(value.id),
            );

        }) ?? null
    );

}