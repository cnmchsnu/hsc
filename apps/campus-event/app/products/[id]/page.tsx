"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { MOCK_MERCHANDISE } from "@/mock/eventMockData";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = MOCK_MERCHANDISE.find((p) => p.id === resolvedParams.id) || MOCK_MERCHANDISE[0];

  const [selectedSize, setSelectedSize] = useState(product.options?.sizes?.[1] || "M");
  const [selectedColor, setSelectedColor] = useState(product.options?.colors?.[0] || "經典黑");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full min-h-screen bg-background pb-20 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-on-surface-variant flex items-center gap-2">
          <Link href="/events" className="hover:underline">校慶紀念品</Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">{product.title}</span>
        </div>

        {/* Main Product Grid */}
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Image Showcase */}
          <div className="space-y-4">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-surface-container relative">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-tertiary text-on-tertiary text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Details & Purchase Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-tertiary uppercase tracking-widest">
                OFFICIAL MERCHANDISE
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-extrabold text-tertiary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-outline line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.options?.sizes && (
                <div className="mt-6 space-y-2">
                  <span className="text-xs font-bold text-on-surface-variant block">
                    選擇尺寸 (Size)
                  </span>
                  <div className="flex items-center gap-2">
                    {product.options.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? "border-tertiary bg-tertiary text-on-tertiary shadow-sm"
                            : "border-outline-variant text-on-surface-variant hover:border-outline"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.options?.colors && (
                <div className="mt-6 space-y-2">
                  <span className="text-xs font-bold text-on-surface-variant block">
                    選擇顏色 (Color)
                  </span>
                  <div className="flex items-center gap-2">
                    {product.options.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          selectedColor === color
                            ? "border-tertiary bg-tertiary-container text-on-tertiary-container font-bold"
                            : "border-outline-variant text-on-surface-variant"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-bold text-on-surface-variant block">
                  購買數量
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg border border-outline-variant text-base font-bold flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-6 text-center text-on-surface">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-lg border border-outline-variant text-base font-bold flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-6 border-t border-outline-variant">
              <Link
                href={`/checkout?productId=${product.id}&qty=${quantity}&size=${selectedSize}&color=${selectedColor}`}
                className="w-full py-3.5 rounded-xl bg-tertiary hover:opacity-90 text-on-tertiary font-bold text-center block text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                立即預購結帳 (${product.price * quantity})
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
