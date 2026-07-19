import Link from "next/link";
import { ProductSummary } from "../../../../../../packages/commerce/application/read";

export async function PromoProducts({promoProducts}: {promoProducts: ProductSummary[]}) {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {promoProducts!.map((p) => (
        <Link key={p.product.slug} href={`/products/${p.product.slug}`} className="product-card bg-background rounded-xl overflow-hidden border border-outline-variant group flex flex-row h-48">
          <div
            className="product-card bg-background rounded-xl overflow-hidden border border-outline-variant group flex flex-row h-48"
          >
            <div className="w-2/5 relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={p.product.name
                }
                src={p.thumbnail?.url}
              />
              {/* <div className="absolute top-2 left-2 bg-error text-white text-[10px] px-2 py-1 rounded-full font-bold">
                {p.discount}
              </div> */}
          </div>
          <div className="w-3/5 p-stack-md flex flex-col justify-between">
            <div>
              <Link href={`/products/${p.product.slug}`} className="font-bold text-lg text-primary line-clamp-1 hover:underline">
                {p.product.name}
              </Link>
              <p className="text-on-surface-variant text-sm mt-1">{p.product.description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                  <span className="text-lto-timer font-bold text-xl">${p.displayPrice?.min?.amount ?? ""}</span>
                  <span className="text-on-surface-variant text-xs line-through">${p.displayPrice?.min?.compareAt ?? ""}</span>
              </div>
                {/* <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-lto-timer" style={{ width: `${p.progress}%` }}></div>
                </div>
                <p className="text-[10px] text-on-surface-variant">僅剩 {p.remaining} 件可供選購</p> */}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}