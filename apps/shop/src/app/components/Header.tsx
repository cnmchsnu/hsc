"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "首頁", href: "/" },
    { name: "限時優惠", href: "/products?filter=promo" },
    { name: "所有商品", href: "/products" },
    { name: "我的訂單", href: "/profile?tab=orders" },
    { name: "個人檔案", href: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-surface-variant/40 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center h-16 md:h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-stack-lg">
          <Link href="/" className="text-headline-md font-headline-md font-bold text-primary tracking-wide">
            學生會商城
          </Link>
          <nav className="hidden md:flex gap-gutter items-center ml-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href.split("?")[0]!));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-label-md font-label-md transition-all duration-200 hover:text-primary hover:scale-105 ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-gutter">
          {/* Search Box */}
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-surface rounded-full border-none focus:ring-2 focus:ring-primary-container w-44 lg:w-64 transition-all text-sm outline-none"
              placeholder="搜尋商品..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-stack-md">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="p-2 hover:bg-surface-container-low rounded-lg transition-all active:scale-95 flex items-center justify-center relative"
            >
              <span className="material-symbols-outlined text-primary text-[24px]">
                shopping_cart
              </span>
              <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </Link>

            {/* Notification Icon */}
            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-all active:scale-95 flex items-center justify-center relative">
              <span className="material-symbols-outlined text-primary text-[24px]">
                notifications
              </span>
              <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Profile Avatar */}
            <Link
              href="/profile"
              className="h-9 w-9 md:h-10 md:w-10 rounded-full overflow-hidden border border-outline-variant ml-1 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <img
                alt="User profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB89PSiFZb2LY4fSWHoLHmhRZw6GukX2agbCE0PHYNTqnDYU6vxh7GdO-6-534dUmszFOX3ttvexgdUv3EBSYZiVf_UdyngtSZo1bpIve8PeUNVme-OEAw2pQDhM_jVwL3vyi0BH_c9V6_C08xbQQsUx02Fw62bqBrCAAj786BdFW51dtGtH9WTBunoj_rfdfOxEwC-TW0ekII8GwqTwy9kywsU_c9vWxC_ezj7sFfNp_B7sBpn4a1Cwvh0tt9FMB8iOp7elhg387I"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-surface-container-low rounded-lg transition-all md:hidden flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-primary text-[24px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-surface-variant/40 px-margin-mobile py-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface rounded-full border-none focus:ring-2 focus:ring-primary-container text-sm outline-none"
              placeholder="搜尋商品..."
              type="text"
            />
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href.split("?")[0]!));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg text-body-md transition-colors ${
                  isActive
                    ? "bg-surface-container-low text-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
