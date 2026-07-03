import Link from "next/link";

import type { ProductSearchResult } from "@repo/commerce/queries";

import { SortSelect } from "./sort-select";


export function ProductGrid({ products }: { products: ProductSearchResult }) {
    

    return (
        <div className="flex-grow">
            {/* Toolbar */}
            <SortSelect sortcount={products.total} />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {products.items.map((p) => (
                <div
                key={p.product.id}
                className="product-card group bg-surface border border-surface-variant rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-on-primary-container/10 hover:-translate-y-1 relative"
                >
                <button className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-on-primary-fixed-variant hover:bg-on-primary-fixed-variant hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
                <div className="aspect-square relative overflow-hidden bg-surface-variant">
                    <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={p.product.name}
                    src={p.thumbnail?.url}
                    />
                    <div className="quick-add absolute bottom-0 left-0 w-full p-4 transform translate-y-full opacity-0 transition-all duration-300">
                    <button className="w-full bg-on-primary-fixed-variant text-on-primary py-2 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 shadow-lg active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                        快速加入
                    </button>
                    </div>
                    {/* {p.isLimited && (
                    <div className="absolute top-3 left-3 bg-lto-timer text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        LIMITED
                    </div>
                    )} */}
                </div>
                <div className="p-4">
                    <span className="text-label-sm font-label-sm text-on-primary-fixed-variant uppercase tracking-wider mb-1 block">
                    {p.primaryCategory?.name}
                    </span>
                    <Link href={`/products/${p.product.id}`} className="font-bold text-lg text-on-surface mb-2 line-clamp-1 block hover:underline">
                    {p.product.name}
                    </Link>
                    <div className="flex items-center justify-between">
                    <span className="font-label-md text-headline-md text-on-primary-fixed-variant font-bold">
                        NT$ {p.product.price}
                    </span>
                    {/* <div className="flex items-center gap-1 text-secondary">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                        </span>
                        <span className="text-label-sm font-label-sm">{p.rating}</span>
                    </div> */}
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}