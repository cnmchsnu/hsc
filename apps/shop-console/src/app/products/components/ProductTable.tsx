
import Link from "next/link";


import { ProductSummary } from "@repo/commerce/application";

export function ProductTable({ products, hasMore, loading, loadMore }: { products: ProductSummary[]; hasMore: boolean; loading: boolean; loadMore: () => void }) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left w-full min-w-[950px] border-collapse">
                <thead>
                    <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                        {/* <th className="p-4 w-10">
                        <input
                            className="rounded border-outline-variant text-on-primary-fixed-variant focus:ring-on-primary-fixed-variant cursor-pointer"
                            type="checkbox"
                        />
                        </th> */}
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">商品</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">分類</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">價格</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">庫存</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">狀態</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">最後更新</th>
                        <th className="p-4 w-10"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                {products.map((product) => (
                    <tr
                    key={product.product.id}
                    className="hover:bg-surface-container-high/20 transition-colors group"
                    >
                    {/* <td className="p-4">
                        <input
                        className="rounded border-outline-variant text-on-primary-fixed-variant focus:ring-on-primary-fixed-variant cursor-pointer"
                        type="checkbox"
                        />
                    </td> */}
                    <td className="p-4">
                        <Link
                        href={`/products/${product.product.slug}`}
                        className="flex items-center gap-3 group-hover:underline"
                        >
                            <div className="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant overflow-hidden shrink-0 relative">
                                <img
                                src={product.thumbnail?.url}
                                alt={product.product.name}
                                className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-on-surface">{product.product.name}</p>
                                <p className="text-[10px] font-mono text-on-surface-variant">
                                    有庫存：{product.availability?.availableSKUCount} 款式
                                </p>
                            </div>
                        </Link>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant">
                        {product.primaryCategory?.name ?? "未分類"}
                    </td>
                    <td className="p-4 text-sm font-bold text-on-surface">
                        {product.displayPrice?.hasRange 
                            ? `${product.displayPrice?.min?.amount} ~ ${product.displayPrice?.max?.amount}` 
                            : `${product.displayPrice?.current?.amount}`}
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                        <div
                            className={`w-2 h-2 rounded-full ${
                            product.availability?.totalStock && product.availability?.totalStock > 200
                                ? "bg-green-500"
                                : product.availability?.totalStock && product.availability?.totalStock <= 50
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                        />
                        尚有
                        <span className={`text-sm font-medium
                            ${product.availability?.totalStock && product.availability?.totalStock > 200
                            ? "text-green-700"
                            : product.availability?.totalStock && product.availability?.totalStock <= 50
                            ? "text-orange-600"
                            : "text-red-700 text-xl"}`}>
                            {product.availability?.inStock
                            ? `${product.availability?.totalStock}`
                            : "缺貨"
                            }
                        </span>
                        {product.availability?.totalStock && product.availability?.totalStock > 200
                            ? "件現貨"
                            : product.availability?.totalStock
                            ? "件庫存緊張"
                            : ""}
                        </div>
                    </td>
                    <td className="p-4">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                                product.product.status === 'draft' ? 'bg-orange-100 text-orange-400' : 'bg-green-100 text-green-700'}`}>
                            {product.product.status === 'draft' ? "草稿" : "已發佈"}
                        </span>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant">
                        開發中
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
                <tfoot>
                    <tr className={`${!hasMore ? "hidden" : "" } bg-surface-container-low/50 border-b border-outline-variant`}>
                        <td colSpan={7} className={`${!hasMore ? "hidden" : "p-6" } transition-colors bg-surface-container-low/20 `}>
                            <div className="flex flex-col items-center gap-4 sticky left-0 min-w-full flex justify-center items-center p-2 bg-surface-container-low/20">
                                <button
                                type="button"
                                onClick={() => loadMore()}
                                disabled={!hasMore || loading}
                                className={`flex items-center gap-2 px-8 py-2.5 rounded-full border-2 border-primary-container text-on-primary-fixed-variant font-bold hover:bg-primary-container hover:text-white transition-all active:scale-95 ${
                                    !hasMore
                                    ? "hidden"
                                    : ""
                                }`}
                                >
                                    載入更多商品
                                <span className="material-symbols-outlined">expand_more</span>
                                </button>
                                {/* <p className="text-xs text-on-surface-variant">
                                    顯示 124 個商品中的 {filteredProducts.length} 個
                                </p> */}
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            </div>
    );

}