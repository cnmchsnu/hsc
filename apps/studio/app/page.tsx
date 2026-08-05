"use client";

import Link from "next/link";
import { Sidebar } from "../src/components/Sidebar";
import { Header } from "../src/components/Header";
import { MobileNav } from "../src/components/MobileNav";

export default function StudioHome() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72">
        <div className="p-6 max-w-6xl mx-auto space-y-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-container rounded-3xl p-6 shadow-sm">
            <div>
              <span className="text-xs uppercase font-bold text-outline tracking-widest">
                Staff Operations
              </span>
              <h1 className="text-2xl font-bold text-on-surface mt-1">
                Studio 運作中心
              </h1>
              <p className="text-sm text-on-surface-variant mt-1">
                歡迎使用學生會數位化平台 Studio 管理後台
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/scanner"
                className="px-5 py-2.5 bg-primary text-on-primary font-semibold rounded-full text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  qr_code_scanner
                </span>
                開啟掃描器
              </Link>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-4">
              快速操作
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/scanner/result/payment"
                className="flex flex-col items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container-high rounded-2xl p-6 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">
                    payments
                  </span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  收取款項
                </span>
              </Link>

              <Link
                href="/scanner/result/pickup"
                className="flex flex-col items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container-high rounded-2xl p-6 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">
                    local_mall
                  </span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  商品核銷
                </span>
              </Link>

              <Link
                href="/scanner/result/ticket"
                className="flex flex-col items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container-high rounded-2xl p-6 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">
                    confirmation_number
                  </span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  門票核銷
                </span>
              </Link>

              <Link
                href="/scanner"
                className="flex flex-col items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container-high rounded-2xl p-6 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">
                    qr_code_scanner
                  </span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  通用掃描
                </span>
              </Link>
            </div>
          </div>

          {/* Today Tasks Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-on-surface">
                今日任務狀態
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <span className="material-symbols-outlined text-[18px]">
                        pending_actions
                      </span>
                    </div>
                    <span className="text-sm font-medium text-on-surface">
                      待處理核銷
                    </span>
                  </div>
                  <span className="text-2xl font-bold font-mono text-on-surface">
                    14
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-outlined text-[18px]">
                        check_circle
                      </span>
                    </div>
                    <span className="text-sm font-medium text-on-surface">
                      已完成訂單
                    </span>
                  </div>
                  <span className="text-2xl font-bold font-mono text-on-surface">
                    128
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Domain Links */}
            <div className="bg-surface-container rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-on-surface">
                快速前往
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/events"
                  className="p-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl flex items-center gap-3 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">
                    event
                  </span>
                  <span className="text-sm font-medium">活動總覽</span>
                </Link>
                <Link
                  href="/orders"
                  className="p-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl flex items-center gap-3 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">
                    receipt_long
                  </span>
                  <span className="text-sm font-medium">訂單總覽</span>
                </Link>
                <Link
                  href="/campaigns"
                  className="p-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl flex items-center gap-3 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">
                    campaign
                  </span>
                  <span className="text-sm font-medium">行銷 Studio</span>
                </Link>
                <Link
                  href="/settings/landing-page"
                  className="p-3 bg-surface-container-low hover:bg-surface-container-high rounded-xl flex items-center gap-3 transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">
                    web
                  </span>
                  <span className="text-sm font-medium">Landing Page</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
