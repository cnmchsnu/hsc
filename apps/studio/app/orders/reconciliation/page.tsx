"use client";

import Link from "next/link";
import { Sidebar } from "../../../src/components/Sidebar";
import { Header } from "../../../src/components/Header";
import { MobileNav } from "../../../src/components/MobileNav";

export default function OrderReconciliationPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Link
              href="/orders"
              className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </Link>
            <div>
              <span className="text-xs uppercase font-bold text-outline tracking-wider">
                財務與會計
              </span>
              <h1 className="text-2xl font-bold text-on-surface">
                訂單對帳中心 (Reconciliation)
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pending Transfers (Left Pane) */}
            <div className="lg:col-span-4 bg-surface-container rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-base text-on-surface">
                  待核對轉帳
                </h2>
                <span className="px-2.5 py-1 bg-primary text-on-primary rounded-full text-xs font-bold">
                  3 筆待辦
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-primary/10 border-2 border-primary p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs font-mono text-primary font-bold">
                    <span>#ORD-2026-0801</span>
                    <span>剛上傳</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-outline uppercase font-bold block">
                        匯款末五碼
                      </span>
                      <span className="text-xl font-bold font-mono text-on-surface">
                        88192
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-outline uppercase font-bold block">
                        金額
                      </span>
                      <span className="text-lg font-bold font-mono text-primary">
                        NT$ 1,280
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 space-y-2 hover:bg-surface-container-high transition-colors cursor-pointer">
                  <div className="flex justify-between text-xs font-mono text-on-surface-variant">
                    <span>#ORD-2026-0802</span>
                    <span>2小時前</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-outline uppercase font-bold block">
                        匯款末五碼
                      </span>
                      <span className="text-lg font-bold font-mono text-on-surface">
                        44102
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-outline uppercase font-bold block">
                        金額
                      </span>
                      <span className="text-base font-bold font-mono">
                        NT$ 650
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Confirm & System Match (Right Pane) */}
            <div className="lg:col-span-8 bg-surface-container rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
                <h2 className="font-bold text-lg text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">
                    bolt
                  </span>
                  單號 #ORD-2026-0801 比對驗證
                </h2>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    check_circle
                  </span>
                  系統比對 100% 吻合
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 space-y-2">
                  <span className="text-xs uppercase font-bold text-outline">
                    顧客提交證明
                  </span>
                  <div className="h-40 rounded-lg bg-slate-900 text-slate-400 flex flex-col items-center justify-center text-xs font-mono p-4 text-center">
                    <span className="material-symbols-outlined text-[32px] mb-1">
                      receipt_long
                    </span>
                    轉帳收據截圖 preview.png
                    <span className="text-emerald-400 font-bold mt-2">
                      末五碼: 88192
                    </span>
                  </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 space-y-3 text-sm">
                  <span className="text-xs uppercase font-bold text-outline">
                    系統訂單細節
                  </span>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <span className="text-on-surface-variant">顧客姓名</span>
                    <span className="font-bold">張小明</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <span className="text-on-surface-variant">聯絡電話</span>
                    <span className="font-mono">0912-345-678</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-on-surface-variant">應收金額</span>
                    <span className="font-mono text-primary text-lg">
                      NT$ 1,280
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  onClick={() => alert("已標記為資料不符")}
                  className="px-5 py-2.5 bg-surface-container-high hover:bg-surface-container-highest rounded-full text-sm font-bold text-on-surface transition-colors"
                >
                  駁回 / 補件
                </button>
                <button
                  onClick={() => alert("對帳成功！已標記訂單為已入帳")}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-on-primary rounded-full text-sm font-bold shadow-md transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    check
                  </span>
                  確認款項入帳
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
