"use client";

import Link from "next/link";
import { Sidebar } from "../../../../src/components/Sidebar";
import { Header } from "../../../../src/components/Header";
import { MobileNav } from "../../../../src/components/MobileNav";
import { mockScanResult } from "../../../../src/mock/studioMockData";

export default function TicketResultPage() {
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
              <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                掃描結果 (Ticket Verified)
              </span>
              <h1 className="text-xl font-bold text-on-surface">
                門票驗證成功
              </h1>
            </div>
          </div>

          {/* Success Status Icon */}
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
            <span className="material-symbols-outlined text-[64px]">
              check_circle
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-on-surface">
              {mockScanResult.holderName}
            </h2>
            <p className="text-sm font-semibold text-emerald-600">
              票券狀態: 有效 (VALID)
            </p>
          </div>

          {/* Ticket Information Card */}
          <div className="bg-surface-container rounded-2xl p-5 text-left space-y-3 border border-outline-variant/30">
            <div className="flex justify-between border-b border-outline-variant/20 pb-2 text-xs">
              <span className="text-on-surface-variant">票券編號</span>
              <span className="font-mono font-bold">{mockScanResult.ticketId}</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant/20 pb-2 text-xs">
              <span className="text-on-surface-variant">活動名稱</span>
              <span className="font-bold">{mockScanResult.eventName}</span>
            </div>
            <div className="flex justify-between border-b border-outline-variant/20 pb-2 text-xs">
              <span className="text-on-surface-variant">座位 / 區域</span>
              <span className="font-bold text-primary">{mockScanResult.seat}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">驗證時間</span>
              <span className="font-mono">{mockScanResult.timestamp}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => alert("門票已標記無效")}
              className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-xl font-bold text-sm transition-colors"
            >
              拒絕入場
            </button>
            <button
              onClick={() => alert("入場放行核銷成功！")}
              className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">
                login
              </span>
              確認放行入場
            </button>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
