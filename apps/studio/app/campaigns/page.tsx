"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "../../src/components/Sidebar";
import { Header } from "../../src/components/Header";
import { MobileNav } from "../../src/components/MobileNav";

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<"builder" | "engine">("builder");

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
                行銷與自動化
              </span>
              <h1 className="text-2xl font-bold text-on-surface">
                Campaign Engine Studio
              </h1>
            </div>

            <div className="flex gap-2 bg-surface-container p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab("builder")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "builder"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Campaign Builder
              </button>
              <button
                onClick={() => setActiveTab("engine")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "engine"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                自動化引擎 (v2)
              </button>
            </div>
          </div>

          {/* Builder / Engine Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container p-6 rounded-2xl space-y-3">
              <span className="text-xs uppercase font-bold text-outline">
                進行中行銷活動
              </span>
              <div className="text-3xl font-extrabold text-on-surface">4</div>
              <p className="text-xs text-on-surface-variant">
                包含早鳥折扣與社群分享加碼
              </p>
            </div>

            <div className="bg-surface-container p-6 rounded-2xl space-y-3">
              <span className="text-xs uppercase font-bold text-outline">
                自動發送通知數
              </span>
              <div className="text-3xl font-extrabold text-on-surface">
                12,450
              </div>
              <p className="text-xs text-emerald-600 font-semibold">
                觸及率 94.2%
              </p>
            </div>

            <div className="bg-surface-container p-6 rounded-2xl space-y-3">
              <span className="text-xs uppercase font-bold text-outline">
                轉化效益
              </span>
              <div className="text-3xl font-extrabold text-on-surface">
                NT$ 86,000
              </div>
              <p className="text-xs text-on-surface-variant">來自促銷模組</p>
            </div>
          </div>

          {/* Studio Canvas Placeholder */}
          <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px]">
                campaign
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-on-surface">
                {activeTab === "builder"
                  ? "Campaign Builder 可視化流程編輯器"
                  : "Campaign Engine v2 規則引擎"}
              </h2>
              <p className="text-xs text-on-surface-variant max-w-md mx-auto mt-1">
                建立跨管道觸發條件，設定報名成功自動推播、早鳥折扣與個人化優惠碼。
              </p>
            </div>
            <button
              onClick={() => alert("行銷活動已建立並開始執行")}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:bg-primary/90 transition-colors shadow-md"
            >
              建立新行銷企劃
            </button>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
