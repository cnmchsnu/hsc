"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "儀表板", href: "/dashboard", icon: "dashboard" },
    { label: "會員管理", href: "/members", icon: "group" },
    { label: "商品管理", href: "/products", icon: "inventory_2" },
    { label: "類別管理", href: "/categories", icon: "category" },
    { label: "訂單管理", href: "/orders", icon: "shopping_cart" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-6 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-on-primary-fixed-variant rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white">school</span>
        </div>
        <div>
          <h1 className="font-headline-md text-lg font-bold text-on-primary-fixed-variant leading-tight">
            HSNU Admin
          </h1>
          <p className="text-xs text-on-surface-variant opacity-70">
            師大附中學生會
          </p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) || (item.href === "/products" && (pathname === "/" || pathname.startsWith("/products")));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 transition-colors rounded-lg ${
                isActive
                  ? "text-on-primary-fixed-variant font-bold border-r-4 border-on-primary-fixed-variant bg-surface-container-high"
                  : "text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-4 space-y-1 border-t border-outline-variant pt-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-colors rounded-lg"
        >
          <span className="material-symbols-outlined">settings</span>
          <span>設定</span>
        </Link>
        <button
          type="button"
          className="w-full text-left flex items-center gap-3 px-3 py-2 text-error font-medium hover:bg-surface-container-high transition-colors rounded-lg"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>登出</span>
        </button>
      </div>
    </aside>
  );
}
