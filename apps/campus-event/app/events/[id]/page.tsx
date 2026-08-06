"use client";

import { use } from "react";
import Link from "next/link";
import { Clock, MapPin, Trophy, Shield, Zap, ArrowRight, Share2 } from "lucide-react";
import { MOCK_EVENTS } from "@/mock/eventMockData";

export default function GamingNeonEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id) || MOCK_EVENTS[1];

  return (
    <div data-theme="neon_pulse" className="w-full min-h-screen bg-background text-on-background pb-20">
      {/* Glow ambient backgrounds */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-8 relative z-10">
        {/* Top Tag & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-neon-magenta/20 text-secondary border border-neon-magenta/50 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <Zap className="w-3.5 h-3.5" />
              LIVE ESPORTS FESTIVAL
            </span>
            <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 rounded-full text-xs font-bold">
              NEON PULSE THEME
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Banner Card */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-neon-cyan/30 shadow-[0_0_40px_rgba(0,242,255,0.15)] bg-surface-container">
          <div className="w-full aspect-[21/9] sm:aspect-[21/8] relative">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>

          <div className="p-6 sm:p-8 -mt-16 sm:-mt-24 relative z-10 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-on-background drop-shadow-md">
              {event.title}
            </h1>
            <p className="text-base sm:text-lg text-neon-cyan font-semibold mt-2">
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Info Grid & Registration CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Columns */}
          <div className="md:col-span-2 space-y-6">
            {/* Event Description Card */}
            <div className="bg-surface-container/80 backdrop-blur-md border border-outline-variant p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-neon-cyan flex items-center gap-2">
                <Trophy className="w-5 h-5 text-neon-lime" />
                賽事簡介與活動亮點
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {event.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block">競賽時間</span>
                    <span className="text-sm font-bold text-on-background">{event.date} {event.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center text-secondary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block">決賽地點</span>
                    <span className="text-sm font-bold text-on-background">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks & Rewards */}
            <div className="bg-surface-container/80 backdrop-blur-md border border-outline-variant p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-on-background flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-cyan" />
                參賽福利與觀賽獎勵
              </h3>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
                  現場抽將總價值 $20,000 高階電競周邊
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  報名即贈 Neon Pulse 限定宣傳刺繡臂章
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta" />
                  知名主播全程實況解說與 VIP 現場體驗席
                </li>
              </ul>
            </div>
          </div>

          {/* Right Action Sidebar Card */}
          <div className="bg-surface-container/80 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between border-2 border-neon-cyan/40 space-y-6">
            <div>
              <span className="text-xs text-neon-cyan uppercase tracking-widest font-bold block">
                TICKET PRICE
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-on-background">
                  ${event.price || 350}
                </span>
                <span className="text-xs text-on-surface-variant">/ 尊榮入場憑證</span>
              </div>

              {/* Progress counter */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-on-surface-variant">已搶購席位</span>
                  <span className="text-neon-lime">
                    {event.registeredCount || 410} / {event.capacity || 500}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full"
                    style={{
                      width: `${((event.registeredCount || 410) / (event.capacity || 500)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="space-y-3 pt-4 border-t border-outline-variant">
              <Link
                href={`/events/${event.id}/register`}
                className="w-full py-3.5 rounded-xl bg-neon-cyan hover:opacity-90 text-inverse-surface font-extrabold text-center block text-sm tracking-wide shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                立即報名參賽 / 預購席位
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-on-surface-variant text-center">
                付款方式支援 LINE Pay / 信用卡 / 轉帳
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
