import type { ProductVariant } from '../build-product-variant';
import type { ProductVariantSKU } from '../build-product-variant-sku';


export interface ProductSelection {

    productId: string;

    selectedValueIds: readonly string[];

}

export interface ProductSelectionResult {

    sku: ProductVariantSKU | null;

    availableValueIds: readonly string[];

    completed: boolean;

}


export interface ProductSelectionEngine {

    resolve(
        selectedValueIds: readonly string[]
    ): ProductSelectionResult;

    toggle(
        selectedValueIds: readonly string[],
        optionId: string,
        valueId: string,
    ): string[];

}