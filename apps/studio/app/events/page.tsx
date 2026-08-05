"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "../../src/components/Sidebar";
import { Header } from "../../src/components/Header";
import { MobileNav } from "../../src/components/MobileNav";
import { mockEvents, EventMock } from "../../src/mock/studioMockData";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventMock>(mockEvents[0]);
  const [filter, setFilter] = useState<"ALL" | "進行中" | "草稿">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesFilter = filter === "ALL" || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-0 md:pl-72 min-h-screen">
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          {/* Left List Pane */}
          <div className="w-full md:w-80 lg:w-96 bg-surface border-r border-outline-variant/30 flex flex-col shrink-0">
            {/* Header & Search */}
            <div className="p-4 border-b border-outline-variant/30 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-on-surface">活動列表</h2>
                <button className="bg-primary text-on-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  建立活動
                </button>
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">
                  search
                </span>
                <input
                  type="text"
                  placeholder="搜尋活動..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-container-low text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setFilter("ALL")}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                    filter === "ALL"
                      ? "bg-surface-container-high text-on-surface"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  全部 ({mockEvents.length})
                </button>
                <button
                  onClick={() => setFilter("進行中")}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                    filter === "進行中"
                      ? "bg-surface-container-high text-on-surface"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  進行中 (1)
                </button>
                <button
                  onClick={() => setFilter("草稿")}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                    filter === "草稿"
                      ? "bg-surface-container-high text-on-surface"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  草稿 (2)
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredEvents.map((event) => {
                const isSelected = selectedEvent.id === event.id;
                return (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm relative ${
                      isSelected
                        ? "bg-surface-container-high border-primary/40 shadow-sm"
                        : "bg-surface border-transparent hover:bg-surface-container-low"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />
                    )}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-bold text-on-surface line-clamp-1">
                          {event.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant mt-1">
                          包含 {event.itemCount} 個商品 • 更新: {event.lastUpdated}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          event.status === "進行中"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-surface-variant text-on-surface-variant"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Pane */}
          <div className="flex-1 bg-surface-container-lowest flex flex-col h-full overflow-y-auto p-6 md:p-8">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              {/* Header bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">
                      campaign
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold text-on-surface">
                        {selectedEvent.title}
                      </h1>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded text-xs font-bold">
                        {selectedEvent.status}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      ID: {selectedEvent.id} • 建立於 2024-03-01
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/events/${selectedEvent.id}`}
                    className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
                    title="活動細節"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      visibility
                    </span>
                  </Link>
                  <Link
                    href={`/events/${selectedEvent.id}/settings`}
                    className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
                    title="設定"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      settings
                    </span>
                  </Link>
                  <Link
                    href={`/events/${selectedEvent.id}/appearance`}
                    className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors"
                    title="外觀"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      palette
                    </span>
                  </Link>
                </div>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-surface p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
                  <span className="text-xs uppercase font-bold text-outline">
                    總瀏覽量
                  </span>
                  <div className="text-2xl font-extrabold text-on-surface mt-2">
                    45.2K
                  </div>
                </div>

                <div className="bg-surface p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
                  <span className="text-xs uppercase font-bold text-outline">
                    報名人數
                  </span>
                  <div className="text-2xl font-extrabold text-on-surface mt-2">
                    {selectedEvent.registrations} / {selectedEvent.maxCapacity}
                  </div>
                </div>

                <div className="bg-surface p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
                  <span className="text-xs uppercase font-bold text-outline">
                    總收入
                  </span>
                  <div className="text-2xl font-extrabold text-on-surface mt-2">
                    NT$ {selectedEvent.revenue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Main Visual Card */}
              <div className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-on-surface">
                  主視覺設定 preview
                </h3>
                <div className="h-48 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-600/80 flex items-center justify-center p-6 text-center">
                    <div>
                      <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                        春季煥新系列
                      </span>
                      <h2 className="text-2xl font-extrabold mt-2">
                        {selectedEvent.title}
                      </h2>
                    </div>
                  </div>
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
