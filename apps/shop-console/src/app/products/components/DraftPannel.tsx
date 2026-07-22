"use client"

import Link from "next/link";

import { useProductSearch } from "@repo/commerce-react";
import { useEffect } from "react";

export function DraftPannel() {
    const { loading, products, hasMore, loadMore, refresh } = useProductSearch({
        filter: {
            status: ["active"],
        },
        sort: "newest",
        page: 1,
        pageSize: 4,
    });

    useEffect(() => {
        refresh();
    }, []);

    return (
        <section className={`mb-8 ${!products.length ? "hidden" : ""}`}>
            <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-on-primary-fixed-variant">
                edit_note
                </span>
                <span>繼續編輯</span>
            </h3>
            <button
                type="button"
                className="text-on-primary-fixed-variant text-sm font-bold hover:underline"
            >
                查看所有草稿
            </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {products.map((draft) => (
                    <div
                    key={draft.product.id}
                    className="min-w-[280px] bg-surface-container-lowest p-4 rounded-xl border border-outline-variant hover:shadow-md transition-all group"
                    >
                    <div className="flex gap-4 mb-4">
                        <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant relative">
                        <img
                            src={draft.thumbnail?.url}
                            alt="似乎還沒有圖片喔"
                            className="object-cover w-full h-full"
                        />
                        </div>
                        <div className="flex-1 min-w-0">
                        <div className="bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                            草稿
                        </div>
                        <h4 className="text-sm font-bold text-on-surface truncate">
                            {draft.product.name}
                        </h4>
                        <p className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-[14px]">
                            schedule
                            </span>
                            <span>開發中</span>
                        </p>
                        </div>
                    </div>
                    <Link
                        href="/products/1"
                        className="w-full block text-center bg-surface-container-high py-2 rounded-lg text-xs font-bold text-on-primary-fixed-variant hover:bg-primary-container hover:text-white transition-colors"
                    >
                        繼續編輯
                    </Link>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => loadMore()}
                    disabled={!hasMore || loading}
                    className={`flex items-center justify-center bg-surface-container-lowest transition-all ${
                            !hasMore
                            ? "hidden"
                            : ""
                        }`}
                >
                    <span className="material-symbols-outlined bg-surface-container-lowest p-2 border border-outline-variant rounded-full border-2 transition-all hover:scale-110 hover:shadow-md hover:scale-110 transition-all ">
                        arrow_forward
                    </span>
                </button>
            </div>
        </section>
    );
}