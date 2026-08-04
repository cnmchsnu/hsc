'use client';

import { useState, useRef, useEffect } from "react";


import { ProductManageDetail } from "@repo/commerce/application";


import { updateVariantAction } from "@/actions/commerce"


import { SKUStatus } from "@repo/commerce/domain";

interface SKUProps {
    productData: ProductManageDetail;
    onChange: React.Dispatch<React.SetStateAction<ProductManageDetail>>;
}


import * as Switch  from "@radix-ui/react-switch";
import { SKUModal } from "./SKUEditor";

export function SKU({ productData, onChange }: SKUProps) {

    const [collapsedCard, setCollapsedCard] = useState(false);
    const [selectedSKU, setSelectedSKU] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [skuDraftDetail, setSKUDraftDetail] = useState(productData.skuDraftDetail);

    useEffect(() => {
        setSKUDraftDetail(productData.skuDraftDetail);
    }, [productData]);

    const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setError(null);
        setSuccessMessage(null);
        setIsSaving(true);
        try {
            onChange((prev) => ({
                ...prev,
                skuDraftDetail: skuDraftDetail,
            }));
            await updateVariantAction({
                productSlug: productData.product.slug,
                options: productData.variantDetails.map((v) => v.option),
                values: productData.variantDetails.flatMap((v) => {
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
                skus: skuDraftDetail.flatMap((sku) => sku.sku),
                prices: skuDraftDetail
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
                inventory: skuDraftDetail.filter((sku) => !!sku.inventory).map((sku) => ({
                    skuid: sku.inventory!.skuid,
                    code: sku.sku.code,
                    availableQuantity: sku.inventory!.availableQuantity,
                    reservedQuantity: sku.inventory!.reservedQuantity,
                    incomingQuantity: sku.inventory!.incomingQuantity,
                    version: sku.inventory!.version,
                })),
            });
            setSuccessMessage("變更已儲存！");
        } catch (error) {
            console.error("儲存變更時發生錯誤:", error);
            setError("儲存變更時發生錯誤，請稍後再試。");
        } finally {
            setIsSaving(false);
        }
        
        timerRef.current = setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };


    
    const handleDisableSKU = (code: string,) => {
        const value = skuDraftDetail.find((v) => v.sku.code === code);

        if (!value) return;

        const updatedValues = skuDraftDetail.map((v) => {
            if (v.sku.code === code) {
                return {
                    ...v,
                    sku: {
                        ...v.sku,
                        status: v.sku.status === 'active' ? 'inactive' : 'active' as SKUStatus,
                    }
                };
            }
            return v;
        });

        setSKUDraftDetail(updatedValues);
        
    }


    return (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
                <div
                className="flex justify-between items-center p-8 cursor-pointer group"
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
                    <h3 className="font-headline-md text-xl font-bold text-on-surface">
                        商品款式
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-1">
                        所有生成的規格變體之庫存管理與定價。
                    </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {error && <span className="text-error text-sm">{error}</span>}
                    {successMessage && <span className="text-success text-sm">{successMessage}</span>}
                    {isSaving && <span className="text-on-surface-variant text-sm">儲存中...</span>}
                    {!isSaving && (
                        <button
                            type="button"
                            className={`px-4 py-2 bg-surface-container text-on-primary-fixed-variant font-bold rounded-xl hover:bg-surface-container-high transition-colors text-sm${
                                isSaving || !productData.product.id || productData.skuDraftDetail === skuDraftDetail
                                ? 'cursor-not-allowed bg-surface-container-low'
                                : 'bg-surface-container hover:bg-surface-container-high'
                            }`}
                            onClick={handleSaveChanges}
                            disabled={isSaving || productData.product.id === "" || productData.skuDraftDetail === skuDraftDetail}
                        >
                            儲存變更
                        </button>
                    )}
                </div>
                </div>
                {!collapsedCard && (
                    <div className="px-8 pb-8">
                        <div className="h-px bg-outline-variant mb-8"></div>
                        <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full min-w-[800px] text-left">
                            <thead className="bg-surface text-on-surface-variant font-mono text-xs uppercase tracking-widest">
                            <tr>
                                <th className="px-4 py-3">SKU Code</th>
                                <th className="px-4 py-3">狀態</th>
                                <th className="px-4 py-3">價格</th>
                                <th className="px-4 py-3">原價/比較</th>
                                <th className="px-4 py-3">庫存</th>
                                <th className="px-4 py-3">條碼</th>
                                <th className="px-4 py-3">更多</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                            {skuDraftDetail.filter((detail) => detail.sku.status === 'inactive' || detail.sku.status === 'active').map((detail) => (
                                <tr
                                key={detail.sku.code}
                                className="hover:bg-surface transition-colors group"
                                >
                                <td className={`px-4 py-4 font-mono text-sm ${!(detail.sku.status === 'active') ? "opacity-40 pointer-events-none select-none" : ""}`}>{detail.sku.code}</td>
                                <td className="px-4 py-4">
                                    <Switch.Root
                                        id={`${detail.sku.code}-spec-toggle`}
                                        checked={detail.sku.status === 'active'}
                                        onCheckedChange={() => handleDisableSKU(detail.sku.code)}
                                        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-surface-container-high transition-colors focus:outline-none data-[state=checked]:bg-primary-container"
                                    >
                                    {/* Switch.Thumb 對應原本 after: 的小圓點 */}
                                        <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white border border-outline-variant transition-transform translate-x-[2px] data-[state=checked]:translate-x-[22px]" />
                                    </Switch.Root>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`text-on-surface-variant text-sm mr-2 ${!(detail.sku.status === 'active') ? "opacity-40 pointer-events-none select-none" : ""}`}>
                                    ${detail.price?.find(p => p.currency === 'TWD')?.amount ?? 0}
                                    </span>
                                </td>
                                <td className={`px-4 py-4 text-on-surface-variant text-sm ${!(detail.sku.status === 'active') ? "opacity-40 pointer-events-none select-none" : ""}`}>
                                    ${detail.price?.find(p => p.currency === 'TWD')?.compareAt ?? 0}
                                </td>
                                <td className={`px-4 py-4 ${!(detail.sku.status === 'active') ? "opacity-40 pointer-events-none select-none" : ""}`}>
                                    {(detail.inventory?.availableQuantity ?? 0) + (detail.inventory?.incomingQuantity ?? 0)}
                                </td>
                                <td className={`px-4 py-4 font-mono text-xs ${!(detail.sku.status === 'active') ? "opacity-40 pointer-events-none select-none" : ""}`}>
                                    {detail.sku.barcode || "N/A"}
                                </td>
                                <td className={`px-4 py-4 ${!(detail.sku.status === 'active') ? "opacity-40 pointer-events-none select-none" : ""}`}>
                                    <button
                                    type="button"
                                    onClick={() => setSelectedSKU(detail.sku.code)}
                                    >
                                        <span className="material-symbols-outlined px-2 py-2 text-on-primary-fixed-variant font-bold rounded-xl hover:bg-surface-container-high transition-colors text-sm">
                                            more_vert
                                        </span>
                                    </button>
                                    <SKUModal
                                        isOpen={selectedSKU === detail.sku.code}
                                        onClose={() => setSelectedSKU('')}
                                        sku={detail}
                                        data={productData}
                                        onChange={onChange}
                                    />
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                )}
            </div>
    )  
}