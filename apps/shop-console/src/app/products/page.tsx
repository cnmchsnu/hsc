import Link from "next/link";

import { DraftPannel } from "./components/DraftPannel";
import { ProductTable } from "./components/ProductTable";

export default function ProductOverviewContent() {

  return (
    <div className="max-w-[1280px] mx-auto p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface">
            商品管理
          </h1>
          <p className="text-on-surface-variant font-body-md mt-1">
            管理商城中的商品。
          </p>
        </div>
        <Link
          href="/products/1"
          className="bg-primary-container text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:brightness-110 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          <span>新增商品</span>
        </Link>
      </div>

      {/* Continue Editing Section */}
      <DraftPannel />

      {/* Product Table Area */}
      <ProductTable />
      
    </div>
  );
}
