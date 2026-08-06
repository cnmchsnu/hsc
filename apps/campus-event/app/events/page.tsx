"use client";

import Link from "next/link";
import { Info, ArrowRight, ShoppingBag, Ticket, Sparkles } from "lucide-react";
import { MOCK_MERCHANDISE, MOCK_EVENTS } from "@/mock/eventMockData";

export default function EventsOverviewPage() {
  return (
    <div className="w-full min-h-screen bg-background pb-16">
      {/* Hero Header Section (25vh limit) */}
      <section className="relative w-full h-[25vh] bg-gradient-to-r from-primary via-primary-container to-tertiary-container overflow-hidden flex flex-col justify-center px-6 sm:px-12 text-on-primary">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-primary/20 backdrop-blur-md text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            90 周年校慶特刊專區
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            校慶紀念品與活動特刊
          </h1>
          <p className="text-sm sm:text-base text-on-primary/80 mt-1">
            創新、連結、構建未來。探索限定服飾、收藏徽章與特別 Pass。
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        {/* Intro text card */}
        <div className="bg-surface-container-lowest p-4 sm:p-6 rounded-2xl border border-outline-variant shadow-sm">
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            大家期待的校慶紀念品與特別活動票券來啦！這次不只有專屬帽 T、T-shirt，還有限定金屬紀念徽章與電競/音樂祭入場 Pass。
          </p>
        </div>

        {/* Notice Banner */}
        <div className="bg-primary text-on-primary p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-lg shadow-primary/20">
          <Info className="w-6 h-6 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg">
              下單截止日期：10 月 10 日 23:59
            </span>
            <span className="text-xs sm:text-sm text-on-primary/80 mt-0.5">
              領取時間：將於商品與票券核發後，依訂單順序陸續出貨或開放入場憑證。
            </span>
          </div>
        </div>

        {/* Merchandise & Tickets Catalog Section */}
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary" />
              限定紀念品與週邊
            </h2>
            <span className="text-xs text-on-surface-variant font-medium">點擊品項查看詳細內容</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {MOCK_MERCHANDISE.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-surface-container">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.badge && (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-primary text-on-primary text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-on-surface">
                    {item.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-outline-variant/40 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-outline block">預購特惠</span>
                    <span className="text-lg font-extrabold text-primary">
                      ${item.price}
                    </span>
                  </div>
                  <Link
                    href={`/products/${item.id}`}
                    className="px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-on-primary text-xs font-bold transition-colors shadow-sm"
                  >
                    選擇尺寸與購買
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Activity Pass Section */}
        <div className="space-y-4 pt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
              <Ticket className="w-6 h-6 text-secondary" />
              特別活動與主題 Pass
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm hover:border-primary transition-colors"
              >
                <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-primary">
                    [{event.category}] {event.statusTag}
                  </span>
                  <h3 className="font-bold text-base text-on-surface mt-0.5">
                    {event.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {event.date} • {event.location}
                  </p>
                </div>
                <Link
                  href={
                    event.themeStyle === "neon_pulse"
                      ? `/events/${event.id}`
                      : event.themeStyle === "campus_yellow"
                      ? `/tickets/${event.id}`
                      : `/events/${event.id}`
                  }
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-inverse-surface text-inverse-on-surface text-xs font-bold text-center hover:opacity-90 transition-opacity"
                >
                  進入主題頁
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
