import Link from "next/link";
import { Suspense } from "react";

export default function ProductNotFound() {
  return (
    <main className="flex-grow pt-16 pb-24 flex items-center justify-center relative overflow-hidden bg-background">
      {/* Atmospheric Background Element */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center z-10">
        {/* Illustration / Icon Section */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-3xl scale-150 group-hover:scale-175 transition-transform duration-700"></div>
          <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-surface-container rounded-xl shadow-sm border border-outline-variant relative">
            <span 
              className="material-symbols-outlined text-[120px] md:text-[160px] text-primary-container" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              production_quantity_limits
            </span>
            {/* Decorative Badge */}
            <div className="absolute -top-4 -right-4 bg-primary-container text-on-primary px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              404
            </div>
          </div>
        </div>

        {/* Text Content Section */}
        <div className="max-w-xl space-y-4">
          <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-primary-container">
            找不到該商品
          </h1>
          <p className="font-body-lg text-on-surface-variant px-4">
            抱歉，您所尋找的商品可能已下架或網址有誤。
          </p>

          {/* Action Section */}
          <Suspense fallback={<div className="text-on-surface-variant">Loading...</div>}>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                className="group relative px-10 py-4 bg-primary-container text-on-primary rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 overflow-hidden" 
                href="/"
              >
                <span className="material-symbols-outlined">home</span>
                <span>返回首頁</span>
              </Link>
              <Link 
                className="px-10 py-4 text-primary font-bold border border-primary/20 rounded-xl hover:bg-primary/5 transition-all active:scale-95 flex items-center gap-2"
                href="/products"
              >
                <span className="material-symbols-outlined">search</span>
                <span>搜尋其他商品</span>
              </Link>
            </div>
          </Suspense>

        </div>
      </div>
    </main>
  );
}
