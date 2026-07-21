'use client'

import Link from "next/dist/client/link";
import { useState, Suspense } from "react";
import { VariantSelector } from "./variant";
import { ProductGallery } from "./ProductGallery";

import type { ProductDetail } from "@repo/commerce/application";

import { useProductSelection } from "@repo/commerce-react";
import { Plus, Minus } from 'lucide-react';



export function HeroSection({productData}: {productData: ProductDetail}) {


    const [qty, setQty] = useState(1);

    const { selectedValueIds, selectValue } = useProductSelection(productData.variants);

    const handleQtyChange = (val: number) => {
        const newQty = qty + val;
        if (newQty >= 1) setQty(newQty);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Gallery */}
            <Suspense fallback={<span className="text-on-surface-variant text-center">Loading Product Gallery...</span>}>
                <ProductGallery productData={productData} />
            </Suspense>

            {/* Right: Details */}
            <div className="flex flex-col">
                <div className="mb-stack-sm flex items-center gap-2">
                    {productData.categories.map((cat) => (
                        <span key={cat.id} className="bg-primary-container text-white text-[12px] pl-2 pr-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
                            {cat.name}
                        </span>
                    ))}
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm font-bold text-3xl">
                    {productData.product.name}
                </h2>
                <div className="flex items-baseline gap-4 mb-stack-md">
                    <span className="text-3xl font-bold text-on-primary-fixed-variant">NT$ {productData.displayPrice?.min?.amount}</span>
                    {productData.displayPrice?.current?.compareAt && (  
                    <div className="flex items-center gap-4">
                        <span className="text-on-surface-variant line-through font-label-md">NT$ {productData.displayPrice?.min?.compareAt ?? ""}</span>
                        <span className="text-2xl bg-secondary-container text-lto-timer px-4 py-1 rounded-full font-bold">
                        {100 - Math.round(((productData.displayPrice?.current?.compareAt - productData.displayPrice?.current?.amount) / productData.displayPrice?.current?.compareAt || 1) * 100)}折
                        </span>
                    </div>
                    )}
                </div>

            {/* LTO Timer */}
            {/* <div className="bg-surface-container-low border border-on-primary-container p-stack-md rounded-xl mb-stack-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lto-timer animate-pulse">timer</span>
                <span className="font-bold text-on-primary-fixed-variant">限時優惠倒數</span>
                </div>
                <div className="flex gap-2 font-label-md text-lto-timer text-lg items-center">
                <span className="bg-white px-2 py-1 rounded shadow-sm font-bold">{countdown.hours}</span>:
                <span className="bg-white px-2 py-1 rounded shadow-sm font-bold">{countdown.minutes}</span>:
                <span className="bg-white px-2 py-1 rounded shadow-sm font-bold">{countdown.seconds}</span>
                </div>
            </div> */}

            <p className="text-on-surface-variant mb-stack-lg leading-relaxed">{productData.product.description}</p>

            {/* Selectors */}
            <div className="space-y-6 mb-stack-lg">
                {productData.variants.options.map(option => (
                    <VariantSelector
                        key={option.option.id}
                        option={option}
                        selectedValueIds={selectedValueIds}
                        onSelect={selectValue}
                    />
                ))}

                <div>
                    <span className="block font-bold text-on-surface mb-3">數量</span>
                    <div className="flex items-center w-32 border-2 border-surface-variant rounded-lg overflow-hidden bg-surface">                        <button
                        className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                        onClick={() => handleQtyChange(-1)}
                        >
                        <Minus className="w-6 h-6 text-primary hover:scale-110" strokeWidth={2.5} />
                        </button>
                        <span className="w-12 text-center font-label-md font-bold select-none text-on-surface">
                        {qty}
                        </span>
                        <button
                        className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                        onClick={() => handleQtyChange(1)}
                        >
                        <Plus className="w-6 h-6 text-primary hover:scale-110" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-white border-2 border-on-primary-fixed-variant text-on-primary-fixed-variant py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all active:scale-95 group">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
                    shopping_cart
                    </span>
                    加入購物車
                </button>
                <Link
                    href="/checkout"
                    className="flex-1 bg-on-primary-fixed-variant text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-95 shadow-lg shadow-on-primary-fixed-variant/20 text-center"
                >
                    立即購買
                </Link>
                </div>
            </div>
        </div>

    );

}