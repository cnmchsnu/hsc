"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "../../../src/components/Sidebar";
import { Header } from "../../../src/components/Header";
import { MobileNav } from "../../../src/components/MobileNav";

export default function LandingPageSettings() {
  const [heroTitle, setHeroTitle] = useState("春季換新裝，全館 8 折起");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "把握初春美好時光，為自己挑選一套閃亮新行頭。限時加碼滿額贈。"
  );
  const [ctaText, setCtaText] = useState("立即選購");

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
          {/* Block List Sidebar */}
          <div className="w-full lg:w-64 bg-surface-container-low border-r border-outline-variant/30 p-4 space-y-3 shrink-0 overflow-y-auto">
            <h3 className="font-bold text-sm text-on-surface">頁面結構區塊</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-primary/10 border-l-4 border-primary rounded-lg font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  view_carousel
                </span>
                首圖區塊 (Hero)
              </div>
              <div className="p-3 bg-surface hover:bg-surface-container-high rounded-lg text-on-surface-variant flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">
                  campaign
                </span>
                公告區塊 (Notice)
              </div>
              <div className="p-3 bg-surface hover:bg-surface-container-high rounded-lg text-on-surface-variant flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">
                  local_offer
                </span>
                優惠專區 (Offer)
              </div>
              <div className="p-3 bg-surface hover:bg-surface-container-high rounded-lg text-on-surface-variant flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">
                  help_center
                </span>
                常見問題 (FAQ)
              </div>
            </div>
          </div>

          {/* Center Editor Form */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs uppercase font-bold text-outline tracking-wider">
                  頁面設計
                </span>
                <h1 className="text-xl font-bold text-on-surface">
                  Landing Page 首頁區塊編輯
                </h1>
              </div>
              <button
                onClick={() => alert("Landing Page 已成功儲存與發佈")}
                className="bg-primary text-on-primary font-bold px-5 py-2 rounded-full text-xs hover:bg-primary/90 transition-colors shadow-sm"
              >
                發佈變更
              </button>
            </div>

            <div className="bg-surface-container rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-on-surface">
                首圖區塊 (Hero Section) 文字與設定
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    主標題
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface p-3 rounded-xl border border-outline-variant/30 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    副標題
                  </label>
                  <textarea
                    rows={3}
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface p-3 rounded-xl border border-outline-variant/30 outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">
                    行動呼籲按鈕 (CTA)
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface p-3 rounded-xl border border-outline-variant/30 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Phone Preview */}
          <div className="w-full lg:w-80 bg-slate-950 p-6 flex flex-col items-center justify-center border-l border-outline-variant/20 shrink-0">
            <span className="text-xs uppercase font-bold text-slate-400 mb-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                smartphone
              </span>
              手機即時預覽
            </span>
            <div className="w-64 h-[460px] bg-slate-900 rounded-[28px] border-4 border-slate-700 p-4 flex flex-col justify-end text-white text-center space-y-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
              <div className="relative z-20 space-y-2">
                <span className="text-[10px] uppercase tracking-widest bg-blue-600 px-2 py-0.5 rounded-full font-bold">
                  2024 SPRING
                </span>
                <h2 className="text-lg font-extrabold leading-tight">
                  {heroTitle}
                </h2>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {heroSubtitle}
                </p>
                <div className="w-full py-2 bg-blue-600 rounded-full font-bold text-xs">
                  {ctaText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
