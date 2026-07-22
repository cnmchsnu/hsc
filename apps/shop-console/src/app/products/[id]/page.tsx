"use client";

import Link from "next/link";
import { useState } from "react";
import { mockProductDetail, type ProductDetailData } from "../../../mock/productsMock";

export default function ProductDetailContent({ productId }: { productId?: string }) {
  const [productData, setProductData] = useState<ProductDetailData>(mockProductDetail);
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);

  // Card collapse states
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({
    basic: false,
    category: false,
    media: false,
    specs: false,
    variants: false,
    danger: false,
  });

  const toggleCard = (cardKey: string) => {
    setCollapsedCards((prev) => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

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
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-tighter">
                已發佈
              </span>
              <span className="text-on-surface-variant font-mono text-xs">
                最後更新於 {productData.lastUpdated}
              </span>
            </div>
            <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-on-primary-fixed-variant tracking-tight">
              {productData.name}
            </h2>
            <div className="flex flex-wrap gap-6 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">
                  category
                </span>
                <span className="font-medium">{productData.categoryPath}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">
                  check_circle
                </span>
                <span className="font-medium">可預購</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="/products"
              className="px-6 py-3 border-2 border-primary-container text-on-primary-fixed-variant font-bold rounded-2xl hover:bg-surface-container-high transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">
                open_in_new
              </span>
              <span>查看前台商品</span>
            </Link>
            <button
              type="button"
              disabled
              className="px-8 py-3 bg-surface-container-high text-on-surface-variant font-bold rounded-2xl cursor-not-allowed opacity-70 transition-all shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">task_alt</span>
              <span>已發佈</span>
            </button>
          </div>
        </section>

        {/* Collapsible Cards */}
        <div className="grid grid-cols-1 gap-8 items-start">
          {/* 1. General Card (Basic Info) */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
            <div
              className="flex justify-between items-center p-8 cursor-pointer group"
              onClick={() => toggleCard("basic")}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`material-symbols-outlined text-on-primary-fixed-variant transition-transform duration-300 ${
                    collapsedCards.basic ? "-rotate-90" : ""
                  }`}
                >
                  expand_more
                </span>
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">
                    基本資訊
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    商品的基礎辨識資訊與商城展示描述內容。
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-surface-container text-on-primary-fixed-variant font-bold rounded-xl hover:bg-surface-container-high transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                儲存基本資訊
              </button>
            </div>
            {!collapsedCards.basic && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-8"></div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-sm text-on-surface-variant">
                        商品名稱
                      </label>
                      <input
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary-container/20"
                        type="text"
                        value={productData.name}
                        onChange={(e) =>
                          setProductData({ ...productData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-on-surface-variant">
                      網址路徑 (URL Slugs)
                    </label>
                    <div className="space-y-3">
                      <input
                        className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary-container/20"
                        type="text"
                        value={productData.slug}
                        onChange={(e) =>
                          setProductData({ ...productData, slug: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-on-surface-variant">
                      商品描述
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline-variant text-sm focus:ring-2 focus:ring-primary-container/20"
                      rows={4}
                      value={productData.description}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-on-surface-variant">
                      狀態
                    </label>
                    <div className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant text-on-surface-variant cursor-not-allowed flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">
                        lock
                      </span>
                      <span>啟用</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Product Category Card */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
            <div
              className="flex justify-between items-center p-8 cursor-pointer group"
              onClick={() => toggleCard("category")}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`material-symbols-outlined text-on-primary-fixed-variant transition-transform duration-300 ${
                    collapsedCards.category ? "-rotate-90" : ""
                  }`}
                >
                  expand_more
                </span>
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">
                    商品分類
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    將商品指派至層級結構。
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
            {!collapsedCards.category && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-6"></div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase text-on-surface-variant tracking-wider">
                      主分類
                    </label>
                    <div className="p-3 bg-surface rounded-xl border border-outline-variant flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
                      <span className="text-sm font-bold">
                        {productData.categoryPath}
                      </span>
                      <span className="material-symbols-outlined">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase text-on-surface-variant tracking-wider">
                      分類樹狀選取
                    </label>
                    <div className="border border-outline-variant rounded-xl p-4 space-y-3 bg-surface max-h-48 overflow-y-auto custom-scrollbar">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          folder_open
                        </span>
                        <span className="text-sm">服飾配件</span>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="material-symbols-outlined text-sm">
                          check_box
                        </span>
                        <span className="text-sm">外套類</span>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="material-symbols-outlined text-sm">
                          check_box_outline_blank
                        </span>
                        <span className="text-sm">T-Shirt</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          folder_open
                        </span>
                        <span className="text-sm">配件周邊</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Media Card (Product Media) */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant">
            <div
              className="flex justify-between items-center p-8 cursor-pointer group"
              onClick={() => toggleCard("media")}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`material-symbols-outlined text-on-primary-fixed-variant transition-transform duration-300 ${
                    collapsedCards.media ? "-rotate-90" : ""
                  }`}
                >
                  expand_more
                </span>
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">
                    商品圖片
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    管理此商品的圖片。
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
            {!collapsedCards.media && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-8"></div>
                <div className="space-y-4">
                  {productData.images.map((img) => (
                    <div
                      key={img.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-outline-variant rounded-2xl items-center hover:bg-surface transition-colors"
                    >
                      <div className="w-20 h-20 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant relative">
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <input
                          className="px-4 py-2 bg-surface rounded-xl border border-outline-variant text-sm"
                          type="text"
                          value={img.url}
                          readOnly
                        />
                        <input
                          className="px-4 py-2 bg-surface rounded-xl border border-outline-variant text-sm"
                          type="text"
                          value={img.alt}
                          onChange={(e) => {
                            const newImages = productData.images.map((item) =>
                              item.id === img.id
                                ? { ...item, alt: e.target.value }
                                : item
                            );
                            setProductData({ ...productData, images: newImages });
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="primary"
                            checked={img.isPrimary}
                            onChange={() => {
                              const newImages = productData.images.map((item) => ({
                                ...item,
                                isPrimary: item.id === img.id,
                              }));
                              setProductData({ ...productData, images: newImages });
                            }}
                            className="text-on-primary-fixed-variant focus:ring-on-primary-fixed-variant"
                          />
                          <span className="text-xs font-bold text-on-surface-variant">
                            主圖
                          </span>
                        </label>
                        <button
                          type="button"
                          className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="w-full py-4 border-2 border-dashed border-outline-variant rounded-2xl text-on-surface-variant hover:bg-surface hover:border-on-primary-fixed-variant hover:text-on-primary-fixed-variant transition-all font-bold flex items-center justify-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined">
                      add_photo_alternate
                    </span>
                    <span>新增圖片網址</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Product Specification Card */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
            <div
              className="flex justify-between items-center p-8 cursor-pointer group"
              onClick={() => toggleCard("specs")}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`material-symbols-outlined text-on-primary-fixed-variant transition-transform duration-300 ${
                    collapsedCards.specs ? "-rotate-90" : ""
                  }`}
                >
                  expand_more
                </span>
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">
                    商品規格
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    配置顏色、尺寸與材質等選項。
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="px-4 py-2 bg-surface-container text-on-primary-fixed-variant font-bold rounded-xl hover:bg-surface-container-high transition-colors text-sm"
                >
                  儲存變更
                </button>
              </div>
            </div>
            {!collapsedCards.specs && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-6"></div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-sm text-on-surface">
                        尺寸
                      </label>
                      <button
                        type="button"
                        className="text-on-primary-fixed-variant text-xs font-bold hover:underline"
                      >
                        新增選項
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {productData.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold border border-outline-variant"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-sm text-on-surface">
                        顏色
                      </label>
                      <button
                        type="button"
                        className="text-on-primary-fixed-variant text-xs font-bold hover:underline"
                      >
                        新增選項
                      </button>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar border border-outline-variant rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead className="text-on-surface-variant font-mono text-[10px] uppercase tracking-widest border-b border-outline-variant bg-surface">
                          <tr>
                            <th className="px-4 py-2">顏色預覽</th>
                            <th className="px-4 py-2">規格名稱</th>
                            <th className="px-4 py-2">顯示名稱</th>
                            <th className="px-4 py-2 text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                          {productData.colors.map((color, idx) => (
                            <tr
                              key={color.name}
                              className="hover:bg-surface-container-lowest transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <input
                                    className="w-8 h-8 rounded-lg border border-outline-variant cursor-pointer bg-transparent shrink-0"
                                    type="color"
                                    value={color.hex}
                                    onChange={(e) => {
                                      const newColors = [...productData.colors];
                                      newColors[idx].hex = e.target.value;
                                      setProductData({
                                        ...productData,
                                        colors: newColors,
                                      });
                                    }}
                                  />
                                  <input
                                    className="w-20 px-2 py-1 bg-white rounded border border-outline-variant text-xs font-mono uppercase"
                                    type="text"
                                    value={color.hex}
                                    onChange={(e) => {
                                      const newColors = [...productData.colors];
                                      newColors[idx].hex = e.target.value;
                                      setProductData({
                                        ...productData,
                                        colors: newColors,
                                      });
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  className="w-full px-3 py-1.5 bg-white rounded-lg border border-outline-variant text-sm focus:ring-on-primary-fixed-variant"
                                  type="text"
                                  value={color.name}
                                  onChange={(e) => {
                                    const newColors = [...productData.colors];
                                    newColors[idx].name = e.target.value;
                                    setProductData({
                                      ...productData,
                                      colors: newColors,
                                    });
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  className="w-full px-3 py-1.5 bg-white rounded-lg border border-outline-variant text-sm focus:ring-on-primary-fixed-variant"
                                  type="text"
                                  value={color.displayName}
                                  onChange={(e) => {
                                    const newColors = [...productData.colors];
                                    newColors[idx].displayName = e.target.value;
                                    setProductData({
                                      ...productData,
                                      colors: newColors,
                                    });
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  type="button"
                                  className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-colors"
                                >
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span>
                                </button>
                              </td>
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

          {/* 5. Product Styles Card */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-xl hover:shadow-surface-container-high/40 transition-all duration-300">
            <div
              className="flex justify-between items-center p-8 cursor-pointer group"
              onClick={() => toggleCard("variants")}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`material-symbols-outlined text-on-primary-fixed-variant transition-transform duration-300 ${
                    collapsedCards.variants ? "-rotate-90" : ""
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
            {!collapsedCards.variants && (
              <div className="px-8 pb-8">
                <div className="h-px bg-outline-variant mb-8"></div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left">
                    <thead className="bg-surface text-on-surface-variant font-mono text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3">SKU 編號</th>
                        <th className="px-4 py-3">狀態</th>
                        <th className="px-4 py-3">價格(必填)</th>
                        <th className="px-4 py-3">原價/比較</th>
                        <th className="px-4 py-3">庫存</th>
                        <th className="px-4 py-3">條碼</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {productData.variants.map((v, idx) => (
                        <tr
                          key={v.id}
                          className="hover:bg-surface transition-colors group"
                        >
                          <td className="px-4 py-4 font-mono text-sm">{v.sku}</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">
                              啟用
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <input
                              className="w-24 px-2 py-1 bg-transparent border border-outline-variant text-sm font-bold rounded"
                              type="text"
                              value={`$${v.price.toFixed(2)}`}
                              onChange={(e) => {
                                const newVariants = [...productData.variants];
                                const num = parseFloat(
                                  e.target.value.replace(/[^0-9.]/g, "")
                                );
                                newVariants[idx].price = isNaN(num) ? 0 : num;
                                setProductData({
                                  ...productData,
                                  variants: newVariants,
                                });
                              }}
                            />
                          </td>
                          <td className="px-4 py-4 text-on-surface-variant text-sm">
                            ${v.comparePrice?.toFixed(2)}
                          </td>
                          <td className="px-4 py-4">
                            <input
                              className="w-20 px-2 py-1 bg-transparent border border-outline-variant text-sm rounded"
                              type="number"
                              value={v.stock}
                              onChange={(e) => {
                                const newVariants = [...productData.variants];
                                newVariants[idx].stock =
                                  parseInt(e.target.value, 10) || 0;
                                setProductData({
                                  ...productData,
                                  variants: newVariants,
                                });
                              }}
                            />
                          </td>
                          <td className="px-4 py-4 font-mono text-xs">
                            {v.barcode}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* 6. Danger Zone Section (Collapsible) */}
          <section className="mt-8">
            <div className="bg-error-container/10 border-2 border-error/20 rounded-2xl transition-all duration-300">
              <div
                className="flex justify-between items-center p-8 cursor-pointer group"
                onClick={() => toggleCard("danger")}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`material-symbols-outlined text-error transition-transform duration-300 ${
                      collapsedCards.danger ? "-rotate-90" : ""
                    }`}
                  >
                    expand_more
                  </span>
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
                <span className="text-error font-bold text-sm hidden group-hover:inline-block">
                  點擊展開/收合
                </span>
              </div>
              {!collapsedCards.danger && (
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
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
