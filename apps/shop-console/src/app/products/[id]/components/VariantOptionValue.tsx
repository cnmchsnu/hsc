'use client';

import { useRef, useState, useEffect } from "react";

import { ProductManageDetail } from "@repo/commerce/application";

import { VariantOptionName } from "@repo/commerce/domain";

import * as Switch  from "@radix-ui/react-switch";

import { RadixMultiSelect } from "../../../components/ui";


import { rebuildSKUAction, updateVariantAction } from "@/actions/commerce";


    

interface VariantOptionValueProps {
    productData: ProductManageDetail;
    onChange: React.Dispatch<React.SetStateAction<ProductManageDetail>>;
}


export function VariantOptionValue({ productData, onChange }: VariantOptionValueProps) {

    const [collapsedCard, setCollapsedCard] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const newColorCount = useRef(productData.variantDetails.find((v) => v.option.name === 'color')?.values.length ?? 0);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [variantDetails, setVariantDetails] = useState(productData.variantDetails);

    useEffect(() => {
        setVariantDetails(productData.variantDetails);
    }, [productData]);

    const sizeOptions = [
        { value: "S", label: "S", index: 0 },
        { value: "M", label: "M", index: 1 },
        { value: "L", label: "L", index: 2 },
        { value: "XL", label: "XL", index: 3 },
        { value: "XXL", label: "XXL", index: 4 },
    ];


    const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsSaving(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const newSKU = await rebuildSKUAction({
                current: productData.skuDraftDetail,
                desired: variantDetails,
                product: productData.product,
            });
            onChange({
                ...productData,
                variantDetails,
                skuDraftDetail: newSKU,
            });

            await updateVariantAction({
                productSlug: productData.product.slug,
                options: variantDetails.map((v) => v.option),
                values: variantDetails.flatMap((v) => {
                    return v.values.map((val) => ({
                        id: val.id.includes("new") ? "" : val.id,
                        optionId: v.option.id,
                        optionName: v.option.id,
                        isEnabled: val.isEnabled,
                        value: val.value,
                        valueName: val.value_name,
                        displayValue: val.displayValue,
                        sortOrder: val.sortOrder,
                        version: val.version,
                    }));
                }),
                skus: newSKU.flatMap((sku) => sku.sku),
                prices: newSKU
                .filter((sku) => !!sku.price)
                .flatMap((sku) => {
                    const priceList = Array.isArray(sku.price) ? sku.price : [sku.price];

                    return priceList.map((price) => ({
                    id: price!.id,
                    skuId: price!.skuId,
                    code: sku.sku.code,
                    amount: price!.amount,
                    currency: price!.currency,
                    compareAt: price!.compareAt,
                    cost: price!.cost,
                    effectiveFrom: price!.effectiveFrom,
                    effectiveTo: price!.effectiveTo,
                    version: price!.version,
                    }));
                }),
                inventory: newSKU.filter((sku) => !!sku.inventory).map((sku) => ({
                    skuid: sku.inventory!.skuid,
                    code: sku.sku.code,
                    availableQuantity: sku.inventory!.availableQuantity,
                    reservedQuantity: sku.inventory!.reservedQuantity,
                    incomingQuantity: sku.inventory!.incomingQuantity,
                    version: sku.inventory!.version,
                })),
            });
            setSuccessMessage("變更已儲存！");
        } catch (err) {
            console.error("Error saving changes:", err);
            setError("儲存變更時發生錯誤，請稍後再試。");
        }
        timerRef.current = setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
        setIsSaving(false);
    }

    const handleToggleSizeOption = () => {
        const option = variantDetails.find((v) => v.option.name === 'size');

        if (!option) {
            variantDetails.push({
                option: {
                    id: "",
                    productId: productData.product.id,
                    name: 'size' as VariantOptionName,
                    isEnabled: true,
                    displayName: "尺寸",
                    sortOrder: 1,
                    version: 1,
                },
                values: [],
            });
        }
        // 1. 先計算出最新的 enable 狀態
        const nextEnableState = !(option?.option.isEnabled ?? false);

        // 2. 先計算出最新的 variantDetails 陣列
        let updatedOptValues = variantDetails.map((v) =>
            v.option.name === 'size'
                ? { ...v, option: { ...v.option, isEnabled: nextEnableState } }
                : v
        );

        setVariantDetails(updatedOptValues);

    };


    const handleToggleColorOption = () => {

        const option = variantDetails.find((v) => v.option.name === 'color')

        if (!option) {
            variantDetails.push({
                option: {
                    id: "",
                    productId: productData.product.id,
                    name: 'color' as VariantOptionName,
                    isEnabled: false,
                    displayName: "顏色",
                    sortOrder: 0,
                    version: 1,
                },
                values: [],
            });
        }

        // 1. 取得顏色的下一個狀態
        const nextEnableState = !(option?.option.isEnabled ?? false);

        // 2. 更新陣列（確定比對的是 'color'）
        let updatedOptValues = variantDetails.map((v) =>
            v.option.name === 'color' // 👈 檢查這裡有沒有誤寫成 'size'！
                ? { ...v, option: { ...v.option, isEnabled: nextEnableState } }
                : v
        );

        setVariantDetails(updatedOptValues);

    };
    
    const handleSizeOptionChange = (values: string[]) => {

        const rawValues = variantDetails.find((v) => v.option.name === 'size')?.values || [];

        const rawValuesMap = new Map<string, typeof rawValues[0]>(rawValues.map((v) => [v.value, v]));

        let update: typeof rawValues = rawValues.map((v) => {
            if (!values.includes(v.value)) {
                return {
                    ...v,
                    isEnabled: false,
                }
            } else {
                return {
                    ...v,
                    isEnabled: true,
                }
            }
            
        });

        update?.push(...values.filter((v) => !rawValuesMap.has(v)).map((v, index) => ({
            id: "",
            optionId: variantDetails.find((v) => v.option.name === 'size')?.option.id ?? "",
            isEnabled: true,
            value: v,
            value_name: v,  
            displayValue: v,
            sortOrder: 0,
            version: 1,
        })));

        update.forEach((v) => {
            v.sortOrder = sizeOptions.find((opt) => opt.value === v.value)?.index ?? 0;
        });
        
        update.sort((a, b) => a.sortOrder - b.sortOrder);

        const updatedVariantDetails = variantDetails.map((v) =>
            v.option.name === 'size'
                ? { ...v, values: update ?? [] }
                : v
        );

        setVariantDetails(updatedVariantDetails);

    }


    const handleDisableColorOptionValue = (value: string) => {

        const updatedValues = variantDetails.map((v) => {
            if (v.option.name === 'color') {
                return {
                    ...v,
                    values: v.values.map((val) =>
                        val.value === value ? { ...val, isEnabled: !val.isEnabled } : val
                    ),
                };
            }
            return v;
        });

        setVariantDetails(updatedValues);
    }


    const handleColorValueNameChange = (id: string, newValue: string, type: 'value_name' | 'value' | 'display_value') => {
        const value = variantDetails.find((v) => v.option.name === 'color')?.values.find((v) => v.id === id);

        if (!value) return;

        const updatedValues = variantDetails.map((v) => {
            if (v.option.name === 'color') {
                return {
                    ...v,
                    values: v.values.map((val) =>
                        val.id === id ? {
                            ...val,
                            value: (type === 'value' ? newValue : val.value),
                            value_name: (type === 'value_name' ? newValue : val.value_name).replace(/[^a-zA-Z]/g, ''),
                            displayValue: (type === 'display_value' ? newValue : val.displayValue)
                        } : val
                    ),
                };
            }
            return v;
        });

        setVariantDetails(updatedValues);
    }

    const handleColorSlugValidation = (slug: string) => {
        const values = variantDetails.find((v) => v.option.name === 'color');

        const duplicate = values?.values.filter((v) => v.value_name === slug);

        if (duplicate && duplicate.length > 1) {
            return true; // Slug is duplicate
        }

        return false; // Slug is unique
    }

    
    
    const handleAddColorOption = () => {

        const values = variantDetails.find((v) => v.option.name === 'color')?.values; 

        values?.push({
            id: "new"+newColorCount.current++,
            optionId: variantDetails.find((v) => v.option.name === 'color')?.option.id ?? "",
            isEnabled: true,
            value: "#000000",
            value_name: "Black",
            displayValue: "黑色",
            sortOrder: values.length,
            version: 1,
        });

        const updatedVariantDetails = variantDetails.map((v) =>
            v.option.name === 'color'
                ? { ...v, values: values ?? [] }
                : v
        );

        setVariantDetails(updatedVariantDetails);
    }

    const handleRemoveColorOptionValue = (id: string) => {
        console.log("Removing color option value:", id);

        const values = variantDetails.find((v) => v.option.name === 'color')?.values;

        if (!values) return;


        console.log("Filtered values:", values);

        const updatedValues = variantDetails.map((v) => {
            if (v.option.name === "color") {
                return {
                    option: v.option,
                    values: values.filter(val => val.id !== id && val.id.includes("new")), // 只刪除沒有 id 的值
                };
            }
            return v;
        });

        setVariantDetails(updatedValues);
    };




    return (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
            <div
              className="flex justify-between items-center p-6 cursor-pointer group"
              onClick={() => setCollapsedCard(!collapsedCard)}
            >
                <div className="flex items-center gap-4">
                    <span
                        className={`material-symbols-outlined text-on-primary-fixed-variant transition-transform duration-300 ${
                            collapsedCard ? "-rotate-90" : ""
                        }`}
                    >
                        expand_more
                    </span>
                    <div>
                        <h3 className="font-headline-md text-xl font-bold text-on-surface">商品規格</h3>
                        <p className="text-on-surface-variant text-sm mt-1">配置顏色、尺寸與材質等選項。</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">   
                    {error && <span className="text-error text-sm">{error}</span>}
                    {successMessage && <span className="text-success text-sm">{successMessage}</span>}
                    {isSaving && <span className="text-on-surface-variant text-sm">儲存中...</span>}
                    {!isSaving && (
                        <button
                            type="button"
                            className={`px-4 py-2 text-on-primary-fixed-variant font-bold rounded-xl transition-colors text-sm ${
                                isSaving || !productData.product.id || productData.variantDetails === variantDetails
                                ? 'cursor-not-allowed bg-surface-container-low'
                                : 'bg-surface-container hover:bg-surface-container-high'
                            }`}
                            onClick={handleSaveChanges}
                            disabled={isSaving || productData.product.id === "" || productData.variantDetails === variantDetails }
                        >
                            儲存變更
                        </button>
                    )}
                </div>
                </div>
                {!collapsedCard && (
                <div className="px-8 pb-8">
                    <div className="h-px bg-outline-variant mb-6"></div>
                    <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-mono text-sm text-on-surface">
                                尺寸
                            </label>
                            <Switch.Root
                            id="size-spec-toggle"
                            checked={variantDetails.find((v) => v.option.name === 'size')?.option.isEnabled ?? false}
                            onCheckedChange={handleToggleSizeOption}
                            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-surface-container-high transition-colors focus:outline-none data-[state=checked]:bg-primary-container"
                            >
                            {/* Switch.Thumb 對應原本 after: 的小圓點 */}
                                <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white border border-outline-variant transition-transform translate-x-[2px] data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                        </div>
                        <div className={`flex flex-wrap gap-2 ${!(variantDetails.find((v) => v.option.name === 'size')?.option.isEnabled ?? false) ? "opacity-40 pointer-events-none select-none" : ""}`}>
                            <RadixMultiSelect
                                options={sizeOptions}
                                selected={variantDetails.find((v) => v.option.name === 'size')?.values.flatMap((size) => (size.isEnabled ? [size.value] : [])) || [] }
                                onChange={handleSizeOptionChange}
                                placeholder="選擇尺寸..."
                                className="w-full border border-outline-variant rounded-xl p-4 space-y-2 bg-surface overflow-y-auto"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                        <label className="font-mono text-sm text-on-surface">
                            顏色
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className={`text-on-primary-fixed-variant text-xs font-bold hover:underline ${!(variantDetails.find((v) => v.option.name === 'color')?.option.isEnabled ?? false) ? "opacity-40 pointer-events-none select-none" : ""}`}    
                                onClick={handleAddColorOption}
                            >
                                新增選項
                            </button>
                            <Switch.Root
                                id="color-spec-toggle"
                                checked={variantDetails.find((v) => v.option.name === 'color')?.option.isEnabled ?? false}
                                onCheckedChange={handleToggleColorOption}
                                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-surface-container-high transition-colors focus:outline-none data-[state=checked]:bg-primary-container"
                            >
                                {/* Switch.Thumb 對應原本 after: 的小圓點 */}
                                <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white border border-outline-variant transition-transform translate-x-[2px] data-[state=checked]:translate-x-[22px]" />
                            </Switch.Root>
                            </div>
                        </div>
                        <div className={`overflow-x-auto custom-scrollbar border border-outline-variant rounded-xl ${!(variantDetails.find((v) => v.option.name === 'color')?.option.isEnabled ?? false) ? "opacity-40 pointer-events-none select-none" : ""}`}>
                        <table className="w-full text-left border-collapse">
                            <thead className="text-on-surface-variant font-mono text-[10px] uppercase tracking-widest border-b border-outline-variant bg-surface">
                            <tr>
                                <th className="px-4 py-2">顏色</th>
                                <th className="px-4 py-2">slug</th>
                                <th className="px-4 py-2">顯示名稱</th>
                                {productData.product.status !== 'draft' && <th className="px-4 py-2">狀態</th>}
                                {productData.product.status === 'draft' && <th className="px-4 py-2 text-center">刪除</th>}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                            {variantDetails.find((v) => v.option.name === 'color')?.values.map((color, idx) => (
                                <tr
                                key={color.id}
                                className="hover:bg-surface-container-lowest transition-colors"
                                >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 border-outline-variant p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none [&::-moz-color-swatch]:rounded-full ${
                                                !color.isEnabled ? "opacity-40 pointer-events-none select-none" : ""
                                            }`}
                                            type="color"
                                            value={color.value}
                                            disabled={!color.id.includes("new")}
                                            onChange={(e) => handleColorValueNameChange(color.id, e.target.value, 'value')}
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                    className={`w-full px-3 py-1.5 rounded-lg border border-outline-variant text-sm focus:ring-on-primary-fixed-variant 
                                        ${!color.isEnabled ? "opacity-40 pointer-events-none select-none" : ""} 
                                        ${!color.id.includes("new") ? 'cursor-not-allowed bg-surface-container-low' : 'bg-surface'}`}
                                    type="text"
                                    value={color.value_name}
                                    disabled={!color.id.includes("new")}
                                    onChange={(e) => handleColorValueNameChange(color.id, e.target.value, 'value_name')}
                                    />
                                    {handleColorSlugValidation(color.value_name) && <span className="text-xs text-error mt-1">此 Slug 重複使用，請選擇其他名稱。{color.id}</span>}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                    className={`w-full px-3 py-1.5 bg-white rounded-lg border border-outline-variant text-sm focus:ring-on-primary-fixed-variant ${
                                        !color.isEnabled ? "opacity-40 pointer-events-none select-none" : ""
                                    }`}
                                    type="text"
                                    value={color.displayValue}
                                    onChange={(e) => handleColorValueNameChange(color.id, e.target.value, 'display_value')}
                                    />
                                </td>
                                {productData.product.status !== 'draft' && (
                                <td className="px-4 py-3">
                                    <Switch.Root
                                        id={`${color.id}-spec-toggle`}
                                        checked={color.isEnabled}
                                        onCheckedChange={() => handleDisableColorOptionValue(color.value)}
                                        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-surface-container-high transition-colors focus:outline-none data-[state=checked]:bg-primary-container"
                                    >
                                    {/* Switch.Thumb 對應原本 after: 的小圓點 */}
                                        <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white border border-outline-variant transition-transform translate-x-[2px] data-[state=checked]:translate-x-[22px]" />
                                    </Switch.Root>
                                </td>
                                )}
                                {(productData.product.status === 'draft' || !!!color.id) && (
                                    <td className="pr-4 py-3 text-right">
                                        <button 
                                            className="p-2 text-on-surface-variant hover:text-error hover:cursor-pointer hover:bg-error-container/20 rounded-lg transition-colors"
                                            onClick={() => handleRemoveColorOptionValue(color.id)}
                                            disabled={!color.id.includes("new")}
                                        >
                                            <span className="material-symbols-outlined text-error">delete</span>
                                        </button>
                                    </td>
                                )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                )}
          </div>
    )  
}