'use client';

import { useState, useEffect, useRef } from 'react';

import { SKUDetail } from '@repo/commerce/application';


import { updateVariantAction } from "@/actions/commerce"


import { ProductManageDetail } from "@repo/commerce/application";

import { X } from "lucide-react";


interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  sku: SKUDetail;
  data: ProductManageDetail;
  onChange: React.Dispatch<React.SetStateAction<ProductManageDetail>>;
}

export function SKUModal({ isOpen, onClose, sku, data, onChange }: EditModalProps) {
    const [formData, setFormData] = useState<SKUDetail | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 當傳進來的 data 改變時，更新內部的 formData State
    useEffect(() => {
        if (sku) setFormData(sku);
    }, [sku]);

    // 監聽 Esc 鍵關閉 & 阻止背景頁面捲動
    useEffect(() => {
        
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        };

        if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden"; // 鎖定背景捲動
        }

        return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    // 如果沒開啟或是沒有資料，不渲染任何東西
    if (!isOpen || !formData) return null;

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation();
        setError(null);
        setSuccessMessage(null);
        setIsSaving(true);
        try {
            const nextSkuDraftDetail = data.skuDraftDetail.map(detail =>
                detail.sku.code === formData.sku.code
                    ? formData
                    : detail
            );

            onChange(prev => ({
                ...prev,
                skuDraftDetail: nextSkuDraftDetail,
            }));
            await updateVariantAction({
                productSlug: data.product.slug,
                options: data.variantDetails.map((v) => v.option),
                values: data.variantDetails.flatMap((v) => {
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
                skus: nextSkuDraftDetail.flatMap(detail => detail.sku.code == formData.sku.code ? [formData.sku] : [detail.sku]),
                prices: nextSkuDraftDetail
                .flatMap(detail => {
                    const prices =
                        detail.sku.code === formData.sku.code
                            ? formData.price
                            : detail.price;

                    return (prices ?? []).map((price) => ({
                        id: price!.id,
                        skuId: price!.skuId,
                        code: detail.sku.code,
                        amount: price!.amount,
                        currency: price!.currency,
                        compareAt: price!.compareAt,
                        cost: price!.cost,
                        effectiveFrom: price!.effectiveFrom,
                        effectiveTo: price!.effectiveTo,
                        version: price!.version,
                    }));
                }),
                inventory: nextSkuDraftDetail.filter((detail) => !!detail.inventory).map((detail) => {
                    const inventory = detail.sku.code === formData.sku.code ? formData.inventory : detail.inventory;
                    return {
                        skuid: inventory!.skuid,
                        code: detail.sku.code,
                        availableQuantity: inventory!.availableQuantity,
                        reservedQuantity: inventory!.reservedQuantity,
                        incomingQuantity: inventory!.incomingQuantity,
                        version: inventory!.version,
                    };
                }),
            });
            setSuccessMessage("變更已儲存！");
            timerRef.current = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
            onClose();
        } catch (error) {
            console.error("更新 SKU 資訊時發生錯誤:", error);
            setError("儲存變更時發生錯誤，請稍後再試。");
        } finally {
            setIsSaving(false);
        }

        
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm animate-fade-in">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative z-10 w-full max-w-5xl overflow-hidden border border-outline-variant bg-surface-container-lowest rounded-2xl hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
            <div className="flex justify-between items-center p-8 cursor-pointer">
                <h2 className="text-2xl font-black tracking-tight text-on-surface">管理  {formData.sku.code}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="px-5 pt-6 sm:px-8">
                <div className="overflow-x-auto custom-scrollbar">
                    <div className="flex flex-col gap-4 px-4">
                        <div className="flex flex-col md:flex-row items-stretch gap-6 py-4">
                            
                            {/* 1. 左側標題區塊 */}
                            <div className="shrink-0 flex items-center pr-2">
                                <h4 className="font-headline-md text-xl font-bold text-on-surface">
                                商品庫存
                                </h4>
                            </div>

                            {/* ⭕ 2. 中間這條線：貫穿兩者中間的分隔線 */}
                            <div className="hidden md:block w-1 bg-primary-container rounded-full my-1"></div>

                            {/* 3. 右側表格區塊 */}
                            <div className="flex-1 w-full overflow-x-auto">
                                <table className="w-full min-w-[500px] text-center">
                                <thead className="bg-surface text-on-surface-variant font-mono text-base uppercase tracking-widest">
                                    <tr>
                                        <th className="px-4 py-3">可用現貨</th>
                                        <th className="px-4 py-3">已預定(未出貨)</th>
                                        <th className="px-4 py-3">待入庫</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                    <tr className="group transition-colors font-bold hover:bg-surface-container-high/30">
                                    <td className="px-4 py-4 text-lg text-on-surface">
                                        <input
                                            type="number"
                                            className="w-1/2 px-2 py-1.5 bg-surface text-center focus:outline-none rounded-lg focus:ring-on-primary-fixed-variant focus:ring-2"
                                            value={(formData.inventory?.availableQuantity ?? 0) - (formData.inventory?.reservedQuantity ?? 0)}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                inventory: {
                                                    skuid: formData.inventory?.skuid ?? "",
                                                    reservedQuantity: formData.inventory?.reservedQuantity ?? 0,
                                                    incomingQuantity: formData.inventory?.incomingQuantity ?? 0,
                                                    availableQuantity: parseInt(e.target.value, 10) + (formData.inventory?.reservedQuantity ?? 0),
                                                    version: formData.inventory?.version ?? 1,
                                                },
                                            })}
                                        />
                                    </td>
                                    <td className="px-4 py-4 text-lg text-on-surface-variant">
                                        <span className="px-2 py-1.5 bg-surface text-center">{formData.inventory?.reservedQuantity ?? 0}</span>
                                    </td>
                                    <td className="px-4 py-4 text-lg font-semibold text-on-surface">
                                        <input
                                            type="number"
                                            className="w-1/2 px-3 py-1.5 bg-surface text-center focus:outline-none rounded-lg focus:ring-on-primary-fixed-variant focus:ring-2"
                                            value={formData.inventory?.incomingQuantity ?? 0}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                inventory: {
                                                    skuid: formData.inventory?.skuid ?? "",
                                                    reservedQuantity: formData.inventory?.reservedQuantity ?? 0,
                                                    incomingQuantity: parseInt(e.target.value, 10),
                                                    availableQuantity: formData.inventory?.availableQuantity ?? 0,
                                                    version: formData.inventory?.version ?? 1,
                                                },
                                            })}
                                        />
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="h-px bg-outline-variant m-8"></div>

                        <div className="flex flex-col md:flex-row items-stretch gap-6 py-4">
                            
                            {/* 1. 左側標題區塊 */}
                            <div className="shrink-0 flex items-center pr-2">
                                <h4 className="font-headline-md text-xl font-bold text-on-surface">
                                    售價管理
                                </h4>
                            </div>

                            {/* ⭕ 2. 中間這條線：貫穿兩者中間的分隔線 */}
                            <div className="hidden md:block w-1 bg-primary-container rounded-full my-1"></div>

                            {/* 3. 右側表格區塊 */}
                            <div className="flex-1 w-full overflow-x-auto border border-outline-variant rounded-lg">
                                <table className="w-full min-w-[550px] text-center border-collapse">
                                {/* ⭕ 1. 利用 colgroup 精準控制每一欄的寬度，減少不必要的橫向撐開 */}
                                <colgroup>
                                    <col className="w-16" />
                                    <col className="w-28" />
                                    <col className="w-28" />
                                    <col className="w-28" />
                                    <col className="w-36" /> 
                                    <col className="w-36" />
                                </colgroup>

                                <thead className="bg-surface text-on-surface-variant font-mono text-xs uppercase tracking-widest border-b border-outline-variant">
                                    <tr>
                                    <th className="px-1.5 py-3">幣值</th>
                                    <th className="px-1.5 py-3">價格</th>
                                    <th className="px-1.5 py-3">比較價</th>
                                    <th className="px-1.5 py-3">成本</th>
                                    <th className="px-1.5 py-3">生效日期</th>
                                    <th className="px-1.5 py-3">結束日期</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-outline-variant">
                                    {formData!.price!.map((price) => (
                                    <tr key={price.currency} className="group transition-colors hover:bg-surface-container-high/30">
                                        {/* 幣值 */}
                                        <td className="px-1.5 py-2 text-base font-bold text-on-surface-variant whitespace-nowrap">
                                            <span className="px-2 py-1 bg-surface rounded-lg">{price.currency}</span>
                                        </td>

                                        {/* 價格 */}
                                        <td className="px-1.5 py-2 text-base font-semibold text-on-surface">
                                        <input
                                            type="number"
                                            className="w-full px-2 py-1 bg-surface text-center focus:outline-none rounded-lg focus:ring-on-primary-fixed-variant focus:ring-2"
                                            value={price.amount ?? 0}
                                            onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                price: formData.price!.map((p) =>
                                                p.currency === price.currency
                                                    ? { ...p, amount: parseFloat(e.target.value) || 0 }
                                                    : p
                                                ),
                                            })
                                            }
                                        />
                                        </td>

                                        {/* 比較價 */}
                                        <td className="px-1.5 py-2 text-sm text-on-surface-variant">
                                        <div className="relative inline-block w-full group/item">
                                            <input
                                            type="number"
                                            className={`w-full px-2 py-1 bg-surface text-center focus:outline-none rounded-lg focus:ring-on-primary-fixed-variant focus:ring-2 ${
                                                price.compareAt === null ? "text-transparent select-none" : "text-on-surface"
                                            }`}
                                            value={price.compareAt ?? ""}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const parsedNumber = parseInt(val, 10);
                                                const finalCost = isNaN(parsedNumber) ? null : parsedNumber;

                                                setFormData({
                                                ...formData,
                                                price: formData.price!.map((p) =>
                                                    p.currency === price.currency ? { ...p, compareAt: finalCost } : p
                                                ),
                                                });
                                            }}
                                            />
                                            {price.compareAt === null && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-surface text-on-surface-variant/60 font-medium rounded-lg pointer-events-none text-xs">
                                                N/A
                                            </div>
                                            )}
                                            {price.compareAt !== null && (
                                            <button
                                                type="button"
                                                title="清除並設為 N/A"
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData({
                                                    ...formData,
                                                    price: formData.price!.map((p) =>
                                                    p.currency === price.currency ? { ...p, compareAt: null } : p
                                                    ),
                                                });
                                                }}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 text-on-surface-variant/40 hover:text-on-surface rounded-full transition-colors opacity-0 group-hover/item:opacity-100 focus:opacity-100"
                                            >
                                                <X size={14} />
                                            </button>
                                            )}
                                        </div>
                                        </td>

                                        {/* 成本 */}
                                        <td className="px-1.5 py-2 text-sm text-on-surface-variant">
                                        <div className="relative inline-block w-full group/item">
                                            <input
                                            type="number"
                                            className={`w-full px-2 py-1 bg-surface text-center focus:outline-none rounded-lg focus:ring-on-primary-fixed-variant focus:ring-2 ${
                                                price.cost === null ? "text-transparent select-none" : "text-on-surface"
                                            }`}
                                            value={price.cost ?? ""}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const parsedNumber = parseInt(val, 10);
                                                const finalCost = isNaN(parsedNumber) ? null : parsedNumber;

                                                setFormData({
                                                ...formData,
                                                price: formData.price!.map((p) =>
                                                    p.currency === price.currency ? { ...p, cost: finalCost } : p
                                                ),
                                                });
                                            }}
                                            />
                                            {price.cost === null && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-surface text-on-surface-variant/60 font-medium rounded-lg pointer-events-none text-xs">
                                                N/A
                                            </div>
                                            )}
                                            {price.cost !== null && (
                                            <button
                                                type="button"
                                                title="清除並設為 N/A"
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData({
                                                    ...formData,
                                                    price: formData.price!.map((p) =>
                                                    p.currency === price.currency ? { ...p, cost: null } : p
                                                    ),
                                                });
                                                }}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 text-on-surface-variant/40 hover:text-on-surface rounded-full transition-colors opacity-0 group-hover/item:opacity-100 focus:opacity-100"
                                            >
                                                <X size={14} />
                                            </button>
                                            )}
                                        </div>
                                        </td>

                                        {/* 生效日期 */}
                                        <td className="px-1.5 py-2 text-sm font-semibold text-on-surface">
                                        <input
                                            type="date"
                                            className="w-full px-2 py-1 bg-surface text-center focus:outline-none rounded-lg focus:ring-on-primary-fixed-variant focus:ring-2 text-xs"
                                            value={(price.effectiveFrom ?? new Date()).toISOString().split('T')[0]}
                                            onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const newDate = inputValue ? new Date(`${inputValue}T00:00:00`) : new Date();
                                            setFormData({
                                                ...formData,
                                                price: formData.price!.map((p) =>
                                                p.currency === price.currency
                                                    ? { ...p, effectiveFrom: newDate }
                                                    : p
                                                ),
                                            });
                                            }}
                                        />
                                        </td>

                                        {/* 結束日期 */}
                                        <td className="px-1.5 py-2 text-sm text-on-surface-variant">
                                        <div className="relative inline-block w-full group/item">
                                            <input
                                                type="date"
                                                className={`w-full pl-2 pr-6 py-1 bg-surface text-center focus:outline-none rounded-lg focus:ring-on-primary-fixed-variant focus:ring-2 text-xs ${
                                                    !price.effectiveTo ? "text-transparent select-none" : "text-on-surface"
                                                }`}
                                                value={
                                                    price.effectiveTo
                                                    ? new Date(price.effectiveTo).toISOString().split("T")[0]
                                                    : ""
                                                }
                                                onClick={(e) => e.currentTarget.showPicker()}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    const newDate = inputValue ? new Date(`${inputValue}T00:00:00`) : null;
                                                    setFormData({
                                                        ...formData,
                                                        price: formData.price!.map((p) =>
                                                            p.currency === price.currency
                                                            ? { ...p, effectiveTo: newDate }
                                                            : p
                                                        ),
                                                    });
                                                }}
                                            />
                                            {!price.effectiveTo && (
                                            <div 
                                                className="absolute inset-0 flex items-center justify-center bg-surface text-on-surface-variant/60 font-medium rounded-lg pointer-events-none text-xs"
                            
                                            >
                                                N/A (永久)
                                            </div>
                                            )}
                                            {price.effectiveTo && (
                                            <button
                                                type="button"
                                                title="重置為永久"
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData({
                                                    ...formData,
                                                    price: formData.price!.map((p) =>
                                                    p.currency === price.currency ? { ...p, effectiveTo: null } : p
                                                    ),
                                                });
                                                }}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 text-on-surface-variant/50 hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                            )}
                                        </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className="flex flex-col-reverse gap-3 bg-surface-container-low/50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
                    {error && <span className="text-error text-sm">{error}</span>}
                    {successMessage && <span className="text-success text-sm">{successMessage}</span>}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-outline-variant bg-background px-5 py-3 text-sm font-semibold text-on-surface-variant shadow-sm transition-all hover:bg-surface-container-low active:scale-95"
                    >
                        取消
                    </button>
                    {isSaving && <span className="px-6 py-3 text-on-surface-variant text-sm">儲存中...</span>}
                    {!isSaving && (
                        <button
                            type="submit"
                            className={`rounded-full bg-primary-container px-6 py-3 text-sm font-black tracking-wide text-on-primary shadow-sm transition-all hover:brightness-110 active:scale-95 ${!formData ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            儲存變更
                        </button>
                    )}
                </div>
            </form>
        </div>
    </div>
  );
}