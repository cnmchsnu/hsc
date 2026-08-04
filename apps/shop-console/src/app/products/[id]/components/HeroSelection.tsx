
import Link from "next/link";


import { ProductManageDetail } from "@repo/commerce/application";


export function HeroSelection({productData}: {productData: ProductManageDetail}) {
    return(
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-tighter ${productData.product.status === 'draft' ? 'bg-orange-100 text-orange-400' : 'bg-green-100 text-green-700'}`}>
                    {productData.product.status === 'draft' ? "草稿" : "已發佈"}
                </span>
                <span className="text-on-surface-variant font-mono text-xs">
                    最後更新於 開發中
                </span>
                </div>
                <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-on-primary-fixed-variant tracking-tight">
                    {productData.product.name}
                </h2>
                <div className="flex flex-wrap gap-6 text-on-surface-variant">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">
                    category
                    </span>
                    {productData.breadcrumb.map((item) => (
                    <span key={item.id} className="flex items-center gap-2">
                        <Link
                        className="hover:text-on-primary-fixed-variant transition-colors"
                        href={`/products?categorySlugs=${item.slug}`} 
                        >
                        {item.name}
                        </Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </span>
                    ))}
                    <span className="text-on-primary-fixed-variant font-bold">{productData.product.name}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">
                    check_circle
                    </span>
                    <span className="font-medium">可預購</span>
                </div> */}
                </div>
            </div>
            <div className="flex gap-4">
                {productData.product.status === 'draft' && (
                    <button
                        className={`px-6 py-3 border-2 border-primary-container text-on-primary-fixed-variant font-bold rounded-2xl hover:bg-surface-container-high transition-all`}
                    >
                        儲存草稿
                    </button>
                )}
                {/* {productData.product.status !== 'draft' && (
                    <Link
                    href="/products"
                    className={`px-6 py-3 border-2 border-primary-container text-on-primary-fixed-variant font-bold rounded-2xl hover:bg-surface-container-high transition-all flex items-center gap-2`}
                    >
                        <span className="material-symbols-outlined text-sm">
                            open_in_new
                        </span>
                    <span>查看前台商品</span>
                </Link>
                )} */}
                <button
                type="button"
                disabled={!(productData.product.status === 'draft')}
                className={`px-8 py-3 bg-surface-container-high ${
                    productData.product.status === 'draft' ? 'text-on-primary-fixed-variant' : 'text-on-surface-variant'
                    }
                    font-bold rounded-2xl c opacity-70 transition-all shadow-sm flex items-center gap-2`}
                >
                    <span className="material-symbols-outlined text-sm">task_alt</span>
                    <span>{productData.product.status === 'draft' ? "上架商品" : "已發佈"}</span>
                </button>
            </div>
        </section>
    );

}