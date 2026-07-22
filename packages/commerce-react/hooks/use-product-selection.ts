'use client';
import { useMemo, useState } from "react";

import type { ProductVariant } from "@repo/commerce/application";

import { createProductSelection } from "@repo/commerce/server/browser";

export function useProductSelection(
    variant: ProductVariant,
) {

    const engine = useMemo(
        () => createProductSelection(variant),
        [variant],
    );

    const [selectedValueIds, setSelectedValueIds] =
        useState<string[]>([]);

    const result = useMemo(
        () =>
            engine.resolve(
                selectedValueIds,
            ),
        [
            engine,
            selectedValueIds,
        ],
    );

    function selectValue(
        optionId: string,
        valueId: string,
    ) {

        setSelectedValueIds(previous =>
            engine.toggle(
                previous,
                optionId,
                valueId,
            ),
        );

    }

    function reset() {

        setSelectedValueIds([]);

    }

    return {

        selectedValueIds,

        selectedSKU: result.sku,

        availableValueIds:
            result.availableValueIds,

        completed:
            result.completed,

        selectValue,

        reset,

    };

}