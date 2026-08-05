"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "../../../src/components/Sidebar";
import { Header } from "../../../src/components/Header";
import { MobileNav } from "../../../src/components/MobileNav";
import { mockEvents } from "../../../src/mock/studioMockData";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = (params.id as string) || "CMP-2024-SPRING";
  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Top Bar with Back Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/events"
              className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </Link>
            <div>
              <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
                活動細節概覽
              </span>
              <h1 className="text-2xl font-bold text-on-surface">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Revenue & Metrics Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3 bg-surface-container p-6 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-bold text-outline">
                  總營收
                </span>
                <span className="material-symbols-outlined text-outline">
                  trending_up
                </span>
              </div>
              <div className="text-3xl font-extrabold font-mono text-on-surface">
                NT$ {event.revenue.toLocaleString()}
              </div>
            </div>

            <div className="bg-surface-container p-5 rounded-2xl shadow-sm space-y-2">
              <span className="text-xs uppercase font-bold text-outline">
                總訂單數
              </span>
              <div className="text-2xl font-bold font-mono text-on-surface">
                1,248
              </div>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  arrow_upward
                </span>{" "}
                12%
              </span>
            </div>

            <div className="bg-surface-container p-5 rounded-2xl shadow-sm space-y-2">
              <span className="text-xs uppercase font-bold text-amber-600">
                待處理退款
              </span>
              <div className="text-2xl font-bold font-mono text-on-surface">
                14
              </div>
              <span className="text-xs text-on-surface-variant">
                需於 48H 內處理
              </span>
            </div>

            <div className="bg-surface-container p-5 rounded-2xl shadow-sm space-y-2">
              <span className="text-xs uppercase font-bold text-outline">
                已報名人數
              </span>
              <div className="text-2xl font-bold font-mono text-on-surface">
                {event.registrations} / {event.maxCapacity}
              </div>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-on-surface">快速設定選項</h2>
            <div className="bg-surface-container rounded-2xl shadow-sm overflow-hidden divide-y divide-outline-variant/30">
              <Link
                href={`/events/${event.id}/appearance`}
                className="flex items-center gap-4 p-4 hover:bg-surface-container-high transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined">edit_document</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-on-surface">
                    編輯活動頁面與外觀
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    修改主視覺、色彩主題與說明文案
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline">
                  chevron_right
                </span>
              </Link>

              <Link
                href={`/events/${event.id}/settings`}
                className="flex items-center gap-4 p-4 hover:bg-surface-container-high transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <span className="material-symbols-outlined">settings</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-on-surface">
                    活動詳細設定
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    票種價格、時間地點與權限管理
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline">
                  chevron_right
                </span>
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-4 p-4 hover:bg-surface-container-high transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined">receipt_long</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-on-surface">
                    查看活動對應訂單
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    檢視購票記錄與現場對帳
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
