"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Share2, User, Ticket, ShoppingBag, Calendar } from "lucide-react";

export function Header() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/50">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            校
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-text-primary text-base tracking-tight leading-tight">
              校園活動推廣平台
            </span>
            <span className="text-xs text-text-secondary font-medium">Campus Event Studio</span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            onClick={() => setActiveTab("overview")}
            className={`text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "text-primary font-semibold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            活動總覽
          </Link>
          <Link
            href="/events"
            onClick={() => setActiveTab("events")}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "events"
                ? "text-primary font-semibold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Calendar className="w-4 h-4" />
            校慶專區
          </Link>
          <Link
            href="/events/2"
            className="text-sm font-medium text-neon-cyan hover:text-neon-cyan/80 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            電競週 (Neon)
          </Link>
          <Link
            href="/tickets/3"
            className="text-sm font-medium text-primary-container hover:opacity-80 transition-colors flex items-center gap-1.5"
          >
            <Ticket className="w-4 h-4" />
            音樂祭 Pass (Yellow)
          </Link>
          <Link
            href="/products/m1"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            紀念商品
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Share"
            className="p-2 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <Link
            href="/checkout"
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm hover:opacity-90 transition-colors"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
