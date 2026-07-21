import type {
    ProductSelectionResult,
} from "./type";

import type {
    ProductVariant,
    ProductVariantSKU,
} from "../build-product-variant";

export function resolveProductSelection(
    optionCount: number,
    selectedValueIds: readonly string[],
    skuMap: Map<string, ProductVariantSKU>,
    skuValueMap: Map<string, Set<string>>,
    valueSkuMap: Map<string, Set<string>>,
): ProductSelectionResult {

    // ---------- compatible skus ----------
    
    let compatibleSkuIds:
            Set<string> | null = null;

    for (const valueId of selectedValueIds) {

        const skuIds = valueSkuMap.get(valueId);
            
        if (!skuIds) {
            compatibleSkuIds = new Set();
            break;
        }
        if (!compatibleSkuIds) {
            compatibleSkuIds = new Set(skuIds);
            continue;
        }

        compatibleSkuIds =
            new Set(
                [...compatibleSkuIds]
                    .filter(id => skuIds.has(id),),
            );
    }

    if (compatibleSkuIds === null) {
        compatibleSkuIds =
            new Set(
                skuMap.keys(),
            );
    }

    // ---------- available values ----------

    const availableValueIds =
        new Set<string>();

    for (const skuId of compatibleSkuIds) {

        const valueIds =
            skuValueMap.get(skuId);

        if (!valueIds) {
            continue;
        }

        valueIds.forEach(id =>
            availableValueIds.add(id),
        );

    }

    // ---------- sku ----------

    let sku =
        null;

    if (
        compatibleSkuIds.size === 1
        && selectedValueIds.length === optionCount

    ) {
        const skuId =
            [...compatibleSkuIds][0];

        sku =
            skuMap.get(skuId) ?? null;

    }

    // ---------- completed ----------

    const completed =
        selectedValueIds.length === optionCount


    return {

        sku,

        completed,

        availableValueIds:
            [...availableValueIds],

    };

}