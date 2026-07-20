import Link from "next/link";

import { getProductSummariesByCategory } from "@repo/commerce/server";


export interface RecommendationsProps {

    categorySlug: string;

    currentProductId?: string;


}


export async function Recommendations({categorySlug, currentProductId}: RecommendationsProps) {
  let products = await getProductSummariesByCategory(categorySlug);

  products = products.filter((p) => p.product.id !== currentProductId);



  return (
    <section className="mt-24">
        <div className="flex justify-between items-end mb-stack-lg">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-2xl">
            你可能也喜歡
          </h3>
          <Link className="text-on-primary-fixed-variant flex items-center gap-1 font-bold group" href="/products">
            查看更多{" "}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {products.map((r) => (
            <div key={r.product.slug} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface mb-3 border border-surface-variant relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={r.product.name}
                  src={r.thumbnail?.url}
                />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-fixed-variant">
                    add_shopping_cart
                  </span>
                </button>
              </div>
              <Link href={`/products/${r.product.slug}`} className="font-bold text-on-surface truncate block hover:underline">
                {r.product.name}
              </Link>
              <p className="text-on-primary-fixed-variant font-bold mt-1">NT$ {r.displayPrice?.current?.amount}</p>
            </div>
          ))}
        </div>
      </section>
  )
}