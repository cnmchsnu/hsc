import type { ProductVariant } from "../build-product-variant";

export function toggleProductSelection(
    selectedValueIds: readonly string[],
    optionId: string,
    valueId: string,
    optoptionalSkuValueMap: Map<string, Set<string>>,
): string[] {

    // 找出目前被點擊 Option 底下所有 Value
    const option = optoptionalSkuValueMap.get(optionId)

    if (!option) {
        return [...selectedValueIds];
    }


    // 移除同一個 Option 已選取的 Value
    const nextSelection = selectedValueIds.filter(
        (id) => !option.has(id),
    );

    // 點同一個值 = Toggle Off
    const alreadySelected = selectedValueIds.includes(valueId);

    if (alreadySelected) {
        return nextSelection;
    }

    // 選擇新值
    return [
        ...nextSelection,
        valueId,
    ];
}