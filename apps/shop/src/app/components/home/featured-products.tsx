import Link from "next/link";
import { ProductSummary } from "../../../../../../packages/commerce/application/read";

import { SquareArrowOutUpRight } from 'lucide-react';

export async function FeaturedProducts({featuredProducts}: {featuredProducts: ProductSummary[]}) {




    return (
        <section className="py-stack-lg bg-background">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="flex items-center justify-between mb-gutter">
            <h2 className="text-headline-lg font-headline-lg text-primary">精選商品</h2>
            <Link className="text-primary font-medium flex items-center gap-1 hover:underline text-sm" href="/products">
                查看全部 <SquareArrowOutUpRight className="text-sm" />
            </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {featuredProducts!.map((p) => (
                <Link key={p.product.slug} href={`/products/${p.product.slug}`} className="product-card bg-surface rounded-xl overflow-hidden border border-outline-variant flex flex-col hover:shadow-lg transition-shadow">
                    <div
                        key={p.product.slug}
                        className="product-card bg-surface rounded-xl overflow-hidden border border-outline-variant flex flex-col"
                    >
                        <div className="aspect-square relative overflow-hidden bg-white">
                            <img className="w-full h-full object-cover" alt={p.product.name} src={p.thumbnail?.url} />
                            {/* <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 glass-effect rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-white transition-colors">
                            <span className="material-symbols-outlined">favorite</span>
                            </button> */}
                        </div>
                        <div className="p-stack-md flex flex-col flex-grow">
                            <div className="flex-grow">
                            <span className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest">
                                {p.primaryCategory?.name}
                            </span>
                            <span className="block font-bold text-primary mt-1 hover:underline">
                                {p.product.name}
                            </span>
                            <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{p.product.description}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-outline-variant flex items-center justify-between">
                            <span className="text-headline-md font-bold text-primary">${p.displayPrice?.current?.amount}</span>
                            <button className="p-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined">add_shopping_cart</span>
                            </button>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </section>
  );

}