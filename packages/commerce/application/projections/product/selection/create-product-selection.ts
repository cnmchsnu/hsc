import type {
    ProductVariant,
    ProductVariantSKU,
} from "../build-product-variant";

import type {
    ProductSelectionEngine,
} from "./type";

import {
    toggleProductSelection,
} from "./toggle-product-selection";

import {
    resolveProductSelection,
} from "./resolve-product-selection";

export function createProductSelection(
    variant: ProductVariant,
): ProductSelectionEngine {

    // ---------- value -> option ----------

    const valueToOptionMap =
        new Map<string, string>();

    // ---------- option -> values ----------

    const optionValuesMap =
        new Map<string, Set<string>>();

    for (const option of variant.options) {
        optionValuesMap.set(
            option.option.id,
            new Set(
                option.values.map(
                    value => value.id,
                ),
            ),
        );

        option.values.forEach(value => {

            valueToOptionMap.set(
                value.id,
                option.option.id,
            );

        });

    }

    // ---------- sku -> values ----------

    const skuValueMap =
        new Map<string, Set<string>>();

    variant.skus.forEach(sku => {

        skuValueMap.set(

            sku.sku.id,

            new Set(

                sku.values.map(

                    value => value.id,

                ),

            ),

        );

    });


    // ---------- sku -> values ----------

    const valueSkuMap =
        new Map<string, Set<string>>();

    for (const sku of variant.skus) {

        const valueIds =
            new Set(
                sku.values.map(v => v.id),
            );

        skuValueMap.set(
            sku.sku.id,
            valueIds,
        );

        for (const valueId of valueIds) {

            let skuIds =
                valueSkuMap.get(valueId);

            if (!skuIds) {

                skuIds = new Set<string>();

                valueSkuMap.set(
                    valueId,
                    skuIds,
                );

            }

            skuIds.add(sku.sku.id);

        }

    }

    // ---------- sku -> variant ----------

    const skuMap =
        new Map<string, ProductVariantSKU>();

    for (const sku of variant.skus) {

        skuMap.set(
            sku.sku.id,
            sku,
        );

        const valueIds =
            new Set(
                sku.values.map(v => v.id),
            );

        skuValueMap.set(
            sku.sku.id,
            valueIds,
        );

        for (const valueId of valueIds) {

            let skuIds =
                valueSkuMap.get(valueId);

            if (!skuIds) {

                skuIds = new Set<string>();

                valueSkuMap.set(
                    valueId,
                    skuIds,
                );

            }

            skuIds.add(sku.sku.id);

        }

    }

    return {

        toggle(
            selectedValueIds,
            optionId,
            valueId,
        ) {

            return toggleProductSelection(

                selectedValueIds,

                optionId,

                valueId,

                optionValuesMap,

            );

        },

        resolve(
            selectedValueIds,
        ) {

            return resolveProductSelection(

                variant.options.length,

                selectedValueIds,

                skuMap,

                skuValueMap,

                valueSkuMap,

            );

        },

    };

}