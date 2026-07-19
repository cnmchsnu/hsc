'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* 1. 觸發按鈕：利用絕對定位或相對 Header 的佈局，確保按鈕在正確位置 */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-surface-container-low rounded-lg transition-all flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-primary text-[24px]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* 2. 下拉選單內容 */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-background border-t border-surface-variant/40 px-margin-mobile py-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
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
              <Suspense key={link.name} fallback={<span className="block py-2 px-3 rounded-lg text-body-md transition-colors text-on-surface-variant"></span>}>
                <Link
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
              </Suspense>
            );
          })}
        </div>
      )}
    </>
  );
}