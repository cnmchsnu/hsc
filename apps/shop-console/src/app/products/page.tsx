

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  mockDraftProducts,
  mockCatalogProducts,
} from "../../mock/productsMock";

export default function ProductOverviewContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("所有分類");
  const [selectedStockStatus, setSelectedStockStatus] = useState("供應狀態");
  const [selectedPublishStatus, setSelectedPublishStatus] = useState("狀態");

  const filteredProducts = mockCatalogProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "所有分類" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1280px] mx-auto p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface">
            商品管理
          </h1>
          <p className="text-on-surface-variant font-body-md mt-1">
            管理商城中的商品。
          </p>
        </div>
        <Link
          href="/products/1"
          className="bg-primary-container text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:brightness-110 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          <span>新增商品</span>
        </Link>
      </div>

      {/* Continue Editing Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-on-primary-fixed-variant">
              edit_note
            </span>
            <span>繼續編輯</span>
          </h3>
          <button
            type="button"
            className="text-on-primary-fixed-variant text-sm font-bold hover:underline"
          >
            查看所有草稿
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {mockDraftProducts.map((draft) => (
            <div
              key={draft.id}
              className="min-w-[280px] bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-all group"
            >
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant relative">
                  <img
                    src={draft.imageUrl}
                    alt={draft.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                    草稿
                  </div>
                  <h4 className="text-sm font-bold text-on-surface truncate">
                    {draft.title}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">
                      schedule
                    </span>
                    <span>{draft.updatedAt}</span>
                  </p>
                </div>
              </div>
              <Link
                href="/products/1"
                className="w-full block text-center bg-surface-container-high py-2 rounded-lg text-xs font-bold text-on-primary-fixed-variant hover:bg-primary-container hover:text-white transition-colors"
              >
                繼續編輯
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Product Table Area */}
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
          <select
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
          >
            <option>供應狀態</option>
            <option>有現貨</option>
            <option>庫存緊張</option>
            <option>缺貨</option>
          </select>
          <select
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-container/20 text-on-surface-variant"
            value={selectedPublishStatus}
            onChange={(e) => setSelectedPublishStatus(e.target.value)}
          >
            <option>狀態</option>
            <option>已發佈</option>
            <option>已排程</option>
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
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  商品
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  分類
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  價格
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  庫存
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  狀態
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  最後更新
                </th>
                <th className="p-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
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
                      href={`/products/${product.id}`}
                      className="flex items-center gap-3 group-hover:underline"
                    >
                      <div className="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant overflow-hidden shrink-0 relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{product.name}</p>
                        <p className="text-[10px] font-mono text-on-surface-variant">
                          SKU: {product.sku}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant">
                    {product.category}
                  </td>
                  <td className="p-4 text-sm font-bold text-on-surface">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          product.stockStatus === "in_stock"
                            ? "bg-green-500"
                            : product.stockStatus === "low_stock"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm font-medium">
                        {product.stockStatus === "in_stock"
                          ? `${product.stock} 件有現貨`
                          : product.stockStatus === "low_stock"
                          ? `${product.stock} 件庫存緊張`
                          : "缺貨"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">
                      已發佈
                    </span>
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant">
                    {product.lastUpdated}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
