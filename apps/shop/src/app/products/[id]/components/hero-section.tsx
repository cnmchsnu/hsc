'use client'

import Link from "next/dist/client/link";
import { useState } from "react";
import { SkuSelector } from "./sku-selector";
import type { ProductDetail } from "@repo/commerce/application";


export function HeroSection({productData}: {productData: ProductDetail}) {

    const [activeThumb, setActiveThumb] = useState(0);

    return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Gallery */}
        <div className="space-y-stack-md">
          <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-surface-variant shadow-sm group relative">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={productData.product.name}
              src={productData.images[activeThumb]?.url}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productData.images.map((img: { url: string }, idx: number) => (
              <button
                key={idx}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-80 ${
                  activeThumb === idx ? "border-on-primary-fixed-variant" : "border-transparent hover:border-outline-variant"
                }`}
                onClick={() => setActiveThumb(idx)}
              >
                <img className="w-full h-full object-cover" alt={`Thumb ${idx}`} src={img.url} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <div className="mb-stack-sm flex items-center gap-2">
            <span className="bg-primary-container text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">
              校慶限定
            </span>
            {/* <span className="text-on-surface-variant font-label-sm">SKU: {productData.sku}</span> */}
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm font-bold text-3xl">
            {productData.product.name}
          </h2>
          <div className="flex items-baseline gap-4 mb-stack-md">
            <span className="text-3xl font-bold text-on-primary-fixed-variant">NT$ {productData.displayPrice?.min?.amount}</span>
            <span className="text-on-surface-variant line-through font-label-md">NT$ {productData.displayPrice?.min?.compareAt ?? ""}</span>
            {productData.displayPrice?.min?.compareAt && (
              <span className="bg-secondary-container text-on-secondary-fixed-variant px-2 py-0.5 rounded-full text-xs font-bold">
                {Math.round(((productData.displayPrice?.min?.compareAt - productData.displayPrice?.min?.amount) / productData.displayPrice?.min?.compareAt || 1) * 100)}%OFF
              </span>
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
          <SkuSelector productData={productData} />
          

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