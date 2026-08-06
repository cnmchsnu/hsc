"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { MOCK_EVENTS } from "@/mock/eventMockData";

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("全部活動");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["全部活動", "學術講座", "社團展演", "體育賽事", "電競週"];

  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesCategory =
      selectedCategory === "全部活動" || event.category === selectedCategory;
    const matchesSearch =
      event.title.includes(searchQuery) ||
      event.description.includes(searchQuery) ||
      event.location.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-background text-on-background">
      {/* Hero Section: 25vh Max (Campaign Engine Studio V2) */}
      <section className="relative w-full h-[25vh] bg-gradient-to-b from-surface-container-low to-background flex items-center justify-center overflow-hidden border-b border-outline-variant/40">
        {/* Abstract blur background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-surface-tint/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/20 text-on-primary-container text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            全新升級 Campaign Engine V2
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-background mb-2">
            探索校園活動
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            發掘精彩時刻，連結無限可能。最新校友論壇、音樂祭與校園電競大賽。
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* Filters & Search Bar (Apple-style pill) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 bg-surface-container-high rounded-full p-1.5 shadow-sm w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-surface-container-lowest text-primary shadow-sm font-semibold scale-105"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋活動名稱、地點..."
              className="w-full pl-10 pr-4 py-2 bg-surface-container-high text-on-surface text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-outline transition-all"
            />
          </div>
        </div>

        {/* Featured Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => {
            const targetHref =
              event.themeStyle === "neon_pulse"
                ? `/events/${event.id}`
                : event.themeStyle === "campus_yellow"
                ? `/tickets/${event.id}`
                : `/events/${event.id}`;

            return (
              <Link
                key={event.id}
                href={targetHref}
                className="group relative flex flex-col bg-surface-container-low rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-outline-variant/50"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-full text-primary text-xs font-semibold shadow-sm">
                    {event.statusTag}
                  </div>
                  {event.themeStyle === "neon_pulse" && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-inverse-surface/80 text-neon-cyan text-xs font-bold rounded-md border border-neon-cyan/50">
                      NEON PULSE 主題
                    </div>
                  )}
                  {event.themeStyle === "campus_yellow" && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-primary-container text-on-primary-container text-xs font-bold rounded-md border border-outline">
                      CAMPUS YELLOW 主題
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-surface-container-lowest relative z-10 -mt-4 rounded-t-[24px]">
                  <div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant text-xs mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.organizer}</span>
                    </div>

                    <h3 className="text-xl font-bold text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-outline-variant/40 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>
                    <span className="flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                      查看詳情
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
