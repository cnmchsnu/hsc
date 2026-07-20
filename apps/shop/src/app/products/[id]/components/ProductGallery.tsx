'use client'

import { ProductDetail } from "@repo/commerce/application";
import { useState } from "react";




export function ProductGallery({productData}: {productData: ProductDetail}) {

    const [activeThumb, setActiveThumb] = useState(0);

    return (
        <div className="space-y-stack-md">
                <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-surface-variant shadow-sm group relative">
                    <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={productData.product.name}
                    src={productData.images[activeThumb]?.url}
                    width={500}
                    height={500}
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
    )
}
        