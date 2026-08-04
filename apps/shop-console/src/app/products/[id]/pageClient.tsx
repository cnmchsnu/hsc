"use client";

import { useState,  } from "react";


import {
    HeroSelection,
    General,
    ProductCategory,
    Media,
    VariantOptionValue,
    SKU,
} from "./components";



import type { ProductManageDetail } from "@repo/commerce/application";




export function ProductDetailContent({ productDetail }: {productDetail: ProductManageDetail}) {

    const [productData, setProductData] = useState<ProductManageDetail>(productDetail);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    return (
        <div className="pb-20">
        {/* Top Banner Alert (Success Status) */}
        {showSuccessBanner && (
            <div className="bg-green-50 border-b border-green-100 px-10 py-3 flex items-center justify-between sticky top-16 z-30">
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600">
                check_circle
                </span>
                <span className="text-green-800 font-bold">商品已成功發佈！</span>
            </div>
            <button
                type="button"
                className="material-symbols-outlined text-green-600 hover:bg-green-100 rounded-full p-1 transition-colors text-sm"
                onClick={() => setShowSuccessBanner(false)}
            >
                close
            </button>
            </div>
        )}

        {/* Main Content */}
        <div className="max-w-[1280px] mx-auto px-10 py-8">
            {/* Hero Section */}
            <HeroSelection productData={productData} />

            {/* Collapsible Cards */}
            <div className="grid grid-cols-1 gap-8 items-start">
            {/* 1. General Card (Basic Info) */}
            <General productData={productData} onChange={setProductData} />

            {/* 2. Product Category Card */}
            <ProductCategory productData={productData} onChange={setProductData} />

            {/* 3. Media Card (Product Media) */}
            <Media productData={productData} onChange={setProductData} />

            {/* 4. Product Specification Card */}
            <VariantOptionValue productData={productData} onChange={setProductData} />

            {/* 5. Product Styles Card */}
            <SKU productData={productData} onChange={setProductData} />

            {/* 6. Danger Zone Section (Collapsible) */}
        <section className="mt-8">
            <div className="bg-error-container/10 border-2 border-error/20 rounded-2xl transition-all duration-300">
            <div
                className="flex justify-between items-center p-8 cursor-pointer group"
            >
                <div className="flex items-center gap-4">
                <div>
                    <h3 className="font-headline-md text-xl font-bold text-error flex items-center gap-2">
                    <span className="material-symbols-outlined">warning</span>
                    <span>危險區域</span>
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-1">
                    不可逆的操作，將影響商品可見度與資料庫完整性。
                    </p>
                </div>
                </div>
            </div>
                <div className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="p-6 bg-white rounded-xl border border-outline-variant flex justify-between items-center hover:border-error/40 transition-all">
                        <div>
                        <h4 className="font-bold text-on-surface">封存商品</h4>
                        <p className="text-xs text-on-surface-variant mt-1">
                        自商店隱藏但保留相關紀錄。
                        </p>
                    </div>
                    <button
                        type="button"
                        className="px-6 py-2 border border-outline text-on-surface font-bold rounded-xl hover:bg-surface transition-colors text-sm"
                    >
                        封存
                    </button>
                    </div>
                    <div className="p-6 bg-white rounded-xl border border-outline-variant flex justify-between items-center hover:border-error/40 transition-all">
                    <div>
                        <h4 className="font-bold text-on-surface">
                        永久刪除商品
                        </h4>
                        <p className="text-xs text-on-surface-variant mt-1">
                        此操作無法復原，將移除所有相關 SKU 與紀錄。
                        </p>
                    </div>
                    <button
                        type="button"
                        className="px-6 py-2 bg-error text-white font-bold rounded-xl hover:opacity-90 transition-colors text-sm"
                    >
                        刪除
                    </button>
                    </div>
                </div>
                </div>
                </div>
            </section>
            </div>
        </div>
        </div>
    );
}
