"use client";

import { use } from "react";
import Link from "next/link";
import { Ticket, Calendar, MapPin, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { MOCK_EVENTS } from "@/mock/eventMockData";

export default function TicketYellowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id) || MOCK_EVENTS[2];

  return (
    <div data-theme="campus_yellow" className="w-full min-h-screen bg-background text-on-background pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Brutalist Badge Header */}
        <div className="flex items-center justify-between border-b-2 border-on-surface pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary-container text-on-primary-container border-2 border-on-surface font-bold text-xs rounded">
              CAMPUS FESTIVAL PASS
            </span>
            <span className="text-xs font-semibold text-tertiary">
              [90th Anniversary]
            </span>
          </div>
          <span className="text-xs font-bold bg-on-surface text-primary-container px-3 py-1 rounded">
            即將額滿
          </span>
        </div>

        {/* Hero Ticket Card - Brutalist style */}
        <div className="bg-surface-container-lowest border-2 border-on-surface shadow-[4px_4px_0px_var(--on-surface)] rounded-2xl overflow-hidden p-6 sm:p-8 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-tertiary">
                <Ticket className="w-4 h-4" />
                OFFICIAL ENTRY TICKET
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-on-background leading-tight">
                {event.title}
              </h1>
              <p className="text-base text-on-surface-variant font-medium">
                {event.subtitle}
              </p>
            </div>

            {/* Price tag */}
            <div className="bg-primary-container border-2 border-on-surface p-4 rounded-xl text-center shrink-0 w-full sm:w-auto">
              <span className="text-xs font-bold text-on-primary-container block">
                TICKET PRICE
              </span>
              <span className="text-4xl font-extrabold text-on-primary-container">
                ${event.price || 250}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t-2 border-outline-variant">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-tertiary" />
              <div>
                <span className="text-xs text-on-surface-variant block">EVENT DATE</span>
                <span className="font-bold text-sm text-on-background">{event.date} ({event.time})</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-tertiary" />
              <div>
                <span className="text-xs text-on-surface-variant block">LOCATION</span>
                <span className="font-bold text-sm text-on-background">{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Description & Included Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface-container-lowest border-2 border-on-surface p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold text-on-background flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-tertiary" />
              憑票獨享禮遇與權益
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {event.description}
            </p>

            <div className="space-y-2.5 pt-4">
              <div className="flex items-center gap-2 text-sm text-on-background font-medium">
                <CheckCircle className="w-4 h-4 text-tertiary shrink-0" />
                園遊會全場攤位滿 $200 折 $30 優惠卷兩張
              </div>
              <div className="flex items-center gap-2 text-sm text-on-background font-medium">
                <CheckCircle className="w-4 h-4 text-tertiary shrink-0" />
                免費兌換 90 周年校慶金屬限定鑰匙圈乙個
              </div>
              <div className="flex items-center gap-2 text-sm text-on-background font-medium">
                <CheckCircle className="w-4 h-4 text-tertiary shrink-0" />
                樂團搖滾區優先入場通道憑證
              </div>
            </div>
          </div>

          {/* Action sidebar */}
          <div className="bg-primary-container border-2 border-on-surface shadow-[4px_4px_0px_var(--on-surface)] p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-on-primary-container">
                立即購買 Pass
              </h3>
              <p className="text-xs text-on-primary-container/80 font-medium mt-1">
                剩餘配額有限，填寫報名資料後直接前往安全結帳頁面。
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href={`/events/${event.id}/register`}
                className="w-full py-3.5 bg-on-surface hover:opacity-90 text-primary-container font-extrabold text-center block rounded-xl text-sm transition-all flex items-center justify-center gap-2 border-2 border-on-surface"
              >
                前往報名 / 購買
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-[11px] text-on-primary-container/70 text-center block">
                100% 正品保障 • 電子票券即時核發
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
