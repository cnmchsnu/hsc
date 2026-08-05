"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "../../../../src/components/Sidebar";
import { Header } from "../../../../src/components/Header";
import { MobileNav } from "../../../../src/components/MobileNav";
import { mockEvents } from "../../../../src/mock/studioMockData";

export default function EventAppearancePage() {
  const params = useParams();
  const eventId = (params.id as string) || "CMP-2024-SPRING";
  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0];

  const [selectedTheme, setSelectedTheme] = useState("vibrant");
  const [bgType, setBgType] = useState("color");

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
          {/* Left Editor Controls */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Link
                  href={`/events/${event.id}`}
                  className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_back
                  </span>
                </Link>
                <div>
                  <span className="text-xs uppercase font-bold text-outline tracking-wider">
                    視覺風格
                  </span>
                  <h1 className="text-2xl font-bold text-on-surface">
                    外觀設定
                  </h1>
                </div>
              </div>
              <button
                onClick={() => alert("外觀設定已成功套用")}
                className="bg-primary text-on-primary font-bold px-5 py-2 rounded-full text-sm hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  save
                </span>
                儲存變更
              </button>
            </div>

            {/* Theme Selector */}
            <section className="bg-surface-container rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  palette
                </span>
                色彩主題選擇
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedTheme("vibrant")}
                  className={`p-3 rounded-xl border-2 text-left space-y-2 transition-all ${
                    selectedTheme === "vibrant"
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-surface-container-low hover:bg-surface-container-high"
                  }`}
                >
                  <div className="h-10 rounded bg-gradient-to-r from-blue-600 to-indigo-600 w-full" />
                  <span className="text-xs font-bold block text-center">
                    活力海洋
                  </span>
                </button>

                <button
                  onClick={() => setSelectedTheme("minimal")}
                  className={`p-3 rounded-xl border-2 text-left space-y-2 transition-all ${
                    selectedTheme === "minimal"
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-surface-container-low hover:bg-surface-container-high"
                  }`}
                >
                  <div className="h-10 rounded bg-gradient-to-r from-slate-900 to-slate-700 w-full" />
                  <span className="text-xs font-bold block text-center">
                    極簡黑白
                  </span>
                </button>

                <button
                  onClick={() => setSelectedTheme("warm")}
                  className={`p-3 rounded-xl border-2 text-left space-y-2 transition-all ${
                    selectedTheme === "warm"
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-surface-container-low hover:bg-surface-container-high"
                  }`}
                >
                  <div className="h-10 rounded bg-gradient-to-r from-amber-600 to-rose-600 w-full" />
                  <span className="text-xs font-bold block text-center">
                    溫暖夕陽
                  </span>
                </button>

                <button
                  onClick={() => setSelectedTheme("custom")}
                  className={`p-3 rounded-xl border-2 text-left space-y-2 transition-all ${
                    selectedTheme === "custom"
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-surface-container-low hover:bg-surface-container-high"
                  }`}
                >
                  <div className="h-10 rounded bg-gradient-to-r from-emerald-600 to-teal-600 w-full" />
                  <span className="text-xs font-bold block text-center">
                    清新森林
                  </span>
                </button>
              </div>
            </section>

            {/* Visual Assets */}
            <section className="bg-surface-container rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  image
                </span>
                圖片與素材
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-2">
                    主視覺 Hero 圖片
                  </label>
                  <div className="h-32 rounded-xl bg-surface-container-high border-2 border-dashed border-outline-variant flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-outline text-[32px]">
                      cloud_upload
                    </span>
                    <span className="text-xs font-semibold text-on-surface-variant mt-1">
                      拖曳或點擊上傳 Hero 圖片 (1920x1080)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-2">
                    背景風格
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setBgType("color")}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                        bgType === "color"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-outline-variant/30"
                      }`}
                    >
                      純色/漸層
                    </button>
                    <button
                      onClick={() => setBgType("image")}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                        bgType === "image"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-outline-variant/30"
                      }`}
                    >
                      圖片填滿
                    </button>
                    <button
                      onClick={() => setBgType("pattern")}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                        bgType === "pattern"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-outline-variant/30"
                      }`}
                    >
                      幾何圖紋
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Live Mobile Preview */}
          <div className="w-full lg:w-96 bg-slate-950 p-6 flex flex-col items-center justify-center border-l border-outline-variant/20 shrink-0">
            <span className="text-xs uppercase font-bold text-slate-400 mb-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                smartphone
              </span>
              即時手機預覽
            </span>
            <div className="w-72 h-[500px] bg-slate-900 rounded-[32px] border-4 border-slate-700 shadow-2xl p-4 overflow-y-auto space-y-4 text-white text-xs">
              <div className="h-32 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center p-4 text-center font-bold text-sm">
                {event.title}
              </div>
              <div className="p-3 bg-slate-800 rounded-xl space-y-2">
                <div className="font-bold">活動入場票券 (一般票)</div>
                <div className="text-slate-400 font-mono">NT$ 350</div>
                <div className="w-full py-1.5 bg-blue-600 rounded text-center font-bold">
                  立即報名
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
