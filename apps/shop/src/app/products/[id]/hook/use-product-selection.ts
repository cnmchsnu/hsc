// use-product-selection.ts

import { useMemo, useState } from "react";
import { ProductVariant } from "@repo/commerce/application"
import { createProductSelection } from "@repo/commerce/server/browser";

export function useProductSelection(
    variant: ProductVariant,
) {

    const [selectedValueIds, setSelectedValueIds] =
        useState<string[]>([]);

    const selection = useMemo(
        () => createProductSelection(variant),
        [variant],
    );

    const selectedSKU = selection.find(selectedValueIds);

    function selectValue(
        optionId: string,
        valueId: string,
    ) {

        setSelectedValueIds((previous) => {

            const removed =
                previous.filter((id) => {

                    const value =
                        variant.options
                            .flatMap(o => o.values)
                            .find(v => v.id === id);

                    return value?.optionId !== optionId;

                });

            return [
                ...removed,
                valueId,
            ];

        });

    }

    return {

        selectedValueIds,

        selectedSKU,

        selectValue,

    };

}