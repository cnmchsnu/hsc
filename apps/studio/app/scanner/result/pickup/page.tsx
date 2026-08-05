"use client";

import Link from "next/link";
import { Sidebar } from "../../../../src/components/Sidebar";
import { Header } from "../../../../src/components/Header";
import { MobileNav } from "../../../../src/components/MobileNav";

export default function ProductPickupResultPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-lg mx-auto space-y-6 text-center">
          <div className="flex items-center gap-3 text-left">
            <Link
              href="/scanner"
              className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </Link>
            <div>
              <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
                商品核銷 (Product Pickup)
              </span>
              <h1 className="text-xl font-bold text-on-surface">
                驗證成功 Ready for Pickup
              </h1>
            </div>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-[48px]">
              local_mall
            </span>
          </div>

          <div className="bg-surface-container rounded-2xl p-5 text-left space-y-4 border border-outline-variant/30">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <div>
                <span className="text-xs font-bold text-outline block uppercase">
                  訂單編號
                </span>
                <span className="font-mono font-bold text-base text-on-surface">
                  #ORD-8924-X
                </span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded text-xs font-bold">
                已付清
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-outline uppercase block">
                應發放商品項目
              </span>

              <div className="flex justify-between items-center bg-surface p-3 rounded-xl">
                <div>
                  <div className="font-bold text-sm">學生會經典馬克杯</div>
                  <div className="text-xs text-on-surface-variant">消光黑 (Matte Black)</div>
                </div>
                <span className="font-mono font-bold text-base bg-surface-container-high px-2 py-0.5 rounded">
                  x 2
                </span>
              </div>

              <div className="flex justify-between items-center bg-surface p-3 rounded-xl">
                <div>
                  <div className="font-bold text-sm">紀念紀念 T-Shirt</div>
                  <div className="text-xs text-on-surface-variant">尺寸 L (Dark Grey)</div>
                </div>
                <span className="font-mono font-bold text-base bg-surface-container-high px-2 py-0.5 rounded">
                  x 1
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("商品經手發放完成！")}
            className="w-full py-3.5 bg-primary hover:bg-primary/90 text-on-primary rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">check</span>
            確認核銷並完成發放
          </button>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
