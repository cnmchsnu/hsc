"use client";

import Link from "next/link";
import { Sidebar } from "../../src/components/Sidebar";
import { Header } from "../../src/components/Header";
import { MobileNav } from "../../src/components/MobileNav";

export default function ScannerPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
              Staff Scanner
            </span>
            <h1 className="text-2xl font-bold text-on-surface">
              QR Code 通用核銷掃描器
            </h1>
            <p className="text-xs text-on-surface-variant">
              將票券或商品 QR Code 對準下方掃描框
            </p>
          </div>

          {/* Scanner Viewport Box */}
          <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 flex items-center justify-center">
            {/* Reticle Frame */}
            <div className="relative w-56 h-56 border-2 border-indigo-500/50 rounded-2xl flex items-center justify-center p-4">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 rounded-br-lg" />

              <div className="w-full h-0.5 bg-indigo-500 shadow-[0_0_12px_#6366F1] animate-pulse" />
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-white bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl">
              <span>相機狀態: 掃描中</span>
              <button
                onClick={() => alert("閃光燈已切換")}
                className="p-1 hover:text-indigo-400"
              >
                <span className="material-symbols-outlined text-[20px]">
                  flashlight_on
                </span>
              </button>
            </div>
          </div>

          {/* Quick Simulation Outcome Buttons */}
          <div className="bg-surface-container rounded-2xl p-5 space-y-3">
            <h3 className="text-xs uppercase font-bold text-outline text-center">
              快捷模擬掃描結果測試
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
              <Link
                href="/scanner/result/ticket"
                className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 rounded-xl text-center transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  confirmation_number
                </span>
                票券掃描成功
              </Link>
              <Link
                href="/scanner/result/pickup"
                className="p-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 rounded-xl text-center transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  local_mall
                </span>
                商品領貨成功
              </Link>
              <Link
                href="/scanner/result/payment"
                className="p-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 rounded-xl text-center transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  payments
                </span>
                現場收款成功
              </Link>
            </div>
          </div>

          {/* History */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-on-surface">最近掃描紀錄</h2>
            <div className="space-y-2">
              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">
                      check_circle
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-on-surface">
                      VIP 入場券 - #TK-9876-5432
                    </div>
                    <div className="text-on-surface-variant">張小明 (A區 12排)</div>
                  </div>
                </div>
                <span className="text-on-surface-variant font-mono">10:42 AM</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
