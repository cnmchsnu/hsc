import type { ProductVariantOption } from "@repo/commerce/application";

export interface VariantSelectorProps {

    option: ProductVariantOption;

    selectedValueIds: readonly string[];

    onSelect(
        optionId: string,
        valueId: string,
    ): void;

}