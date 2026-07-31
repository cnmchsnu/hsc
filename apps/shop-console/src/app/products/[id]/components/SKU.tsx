'use client';

import { useState } from "react";


import { ProductManageDetail } from "@repo/commerce/application";


import { updateImagesAction } from "@/actions/commerce"


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


    
    const handleDisableSKU = (code: string,) => {
        const value = productData.skuDetails.find((v) => v.sku.code === code);

        if (!value) return;

        const updatedValues = productData.skuDetails.map((v) => {
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

        onChange({
            ...productData,
            skuDetails: updatedValues,
        });
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
                <button
                    type="button"
                    className="px-4 py-2 bg-surface-container text-on-primary-fixed-variant font-bold rounded-xl hover:bg-surface-container-high transition-colors text-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    儲存變更
                </button>
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
                            {productData.skuDetails.filter((detail) => detail.sku.status === 'inactive' || detail.sku.status === 'active').map((detail) => (
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
                                    {detail.inventory?.availableQuantity ?? 0}
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
                                </td>
                                <SKUModal
                                    isOpen={selectedSKU === detail.sku.code}
                                    onClose={() => setSelectedSKU('')}
                                    sku={detail}
                                    data={productData}
                                    onChange={onChange}
                                />
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