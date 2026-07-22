'use client';
import { mockCatalogProducts } from "@/mock/productsMock";

import Link from "next/link";

import { useState, useEffect } from "react";

import { useProductSearch } from "@repo/commerce-react";

export function ProductTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("所有分類");
    const [selectedStockStatus, setSelectedStockStatus] = useState("供應狀態");
    const [selectedPublishStatus, setSelectedPublishStatus] = useState("狀態");

    const { loading, products, hasMore, loadMore, refresh } = useProductSearch({
        filter: {
            status: ["active"],
        },
        sort: "newest",
        page: 1,
        pageSize: 10,
    });

    useEffect(() => {
        refresh();
    }, []);


    return (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant flex flex-wrap items-center gap-3 bg-surface-container-low/30">
            <div className="relative flex-1 min-w-[240px]">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                    search
                </span>
                <input
                    className="w-full bg-white border border-outline-variant rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary-container/20 focus:border-on-primary-fixed-variant transition-all"
                    placeholder="搜尋名稱、SKU 或分類..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <select
                className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option>所有分類</option>
                <option>服飾</option>
                <option>文具</option>
                <option>配件</option>
            </select>
            {/* <select
                className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
                value={selectedStockStatus}
                onChange={(e) => setSelectedStockStatus(e.target.value)}
            >
                <option>供應狀態</option>
                <option>有現貨</option>
                <option>庫存緊張</option>
                <option>缺貨</option>
            </select> */}
            <select
                className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
                value={selectedPublishStatus}
                onChange={(e) => setSelectedPublishStatus(e.target.value)}
            >
                <option>狀態</option>
                <option>全部</option>
                <option>已發佈</option>
                <option>已封存</option>
            </select>
            <div className="w-px h-6 bg-outline-variant mx-1"></div>
            <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant text-sm font-medium hover:bg-surface-container-high transition-colors"
            >
                <span className="material-symbols-outlined text-[18px]">sort</span>
                <span>排序</span>
            </button>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                    <th className="p-4 w-10">
                    <input
                        className="rounded border-outline-variant text-on-primary-fixed-variant focus:ring-on-primary-fixed-variant cursor-pointer"
                        type="checkbox"
                    />
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">商品</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">分類</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">價格</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">庫存</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">狀態</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">最後更新</th>
                    <th className="p-4 w-10"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                {products.map((product) => (
                    <tr
                    key={product.product.id}
                    className="hover:bg-surface-container-high/20 transition-colors group"
                    >
                    <td className="p-4">
                        <input
                        className="rounded border-outline-variant text-on-primary-fixed-variant focus:ring-on-primary-fixed-variant cursor-pointer"
                        type="checkbox"
                        />
                    </td>
                    <td className="p-4">
                        <Link
                        href={`/products/${product.product.id}`}
                        className="flex items-center gap-3 group-hover:underline"
                        >
                            <div className="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant overflow-hidden shrink-0 relative">
                                <img
                                src={product.thumbnail?.url}
                                alt={product.product.name}
                                className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-on-surface">{product.product.name}</p>
                                <p className="text-[10px] font-mono text-on-surface-variant">
                                    有庫存：{product.availability?.availableSKUCount} 款式
                                </p>
                            </div>
                        </Link>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant">
                        {product.primaryCategory?.name ?? "未分類"}
                    </td>
                    <td className="p-4 text-sm font-bold text-on-surface">
                        {product.displayPrice?.hasRange 
                            ? `${product.displayPrice?.min?.amount} ~ ${product.displayPrice?.max?.amount}` 
                            : `${product.displayPrice?.current?.amount}`}
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                        <div
                            className={`w-2 h-2 rounded-full ${
                            product.availability?.totalStock && product.availability?.totalStock > 200
                                ? "bg-green-500"
                                : product.availability?.totalStock && product.availability?.totalStock <= 50
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                        />
                        尚有
                        <span className={`text-sm font-medium
                            ${product.availability?.totalStock && product.availability?.totalStock > 200
                            ? "text-green-700"
                            : product.availability?.totalStock && product.availability?.totalStock <= 50
                            ? "text-orange-600"
                            : "text-red-700 text-xl"}`}>
                            {product.availability?.inStock
                            ? `${product.availability?.totalStock}`
                            : "缺貨"
                            }
                        </span>
                        {product.availability?.totalStock && product.availability?.totalStock > 200
                            ? "件現貨"
                            : product.availability?.totalStock
                            ? "件庫存緊張"
                            : ""}
                        </div>
                    </td>
                    <td className="p-4">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">
                            已發佈
                        </span>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant">
                        開發中
                    </td>
                    <td className="p-4">
                        <button
                        type="button"
                        className="p-2 rounded-lg hover:bg-surface-container-high transition-colors"
                        >
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </td>
                    </tr>
                ))}
                    <tr className={`${!hasMore ? "hidden" : "" }`}>
                        <td colSpan={7} className={`${!hasMore ? "hidden" : "p-6" } transition-colors bg-surface-container-low/20 `}>
                            <div className="flex flex-col items-center gap-4">
                                <button
                                type="button"
                                onClick={() => loadMore()}
                                disabled={!hasMore || loading}
                                className={`flex items-center gap-2 px-8 py-2.5 rounded-full border-2 border-primary-container text-on-primary-fixed-variant font-bold hover:bg-primary-container hover:text-white transition-all active:scale-95 ${
                                    !hasMore
                                    ? "hidden"
                                    : ""
                                }`}
                                >
                                    載入更多商品
                                <span className="material-symbols-outlined">expand_more</span>
                                </button>
                                {/* <p className="text-xs text-on-surface-variant">
                                    顯示 124 個商品中的 {filteredProducts.length} 個
                                </p> */}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>

    );
}