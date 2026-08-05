"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navGroups = [
    {
      title: "活動與行銷",
      items: [
        { label: "活動總覽", href: "/events", icon: "event" },
        { label: "活動設定", href: "/events/CMP-2024-SPRING/settings", icon: "settings" },
        { label: "活動外觀", href: "/events/CMP-2024-SPRING/appearance", icon: "palette" },
        { label: "行銷 Studio", href: "/campaigns", icon: "campaign" },
      ],
    },
    {
      title: "訂單管理",
      items: [
        { label: "訂單總覽", href: "/orders", icon: "receipt_long" },
        { label: "訂單對帳", href: "/orders/reconciliation", icon: "account_balance_wallet" },
      ],
    },
    {
      title: "現場核銷與工具",
      items: [
        { label: "QR Code 掃描器", href: "/scanner", icon: "qr_code_scanner" },
        { label: "Landing Page 設定", href: "/settings/landing-page", icon: "web" },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col border-r border-outline-variant hidden md:flex">
      <div className="flex items-center gap-md px-lg py-xl">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold">
          S
        </div>
        <span className="font-heading-h3 text-heading-h3 text-on-surface tracking-tight font-bold text-xl">
          Studio
        </span>
      </div>

      <nav className="flex-1 px-md space-y-md overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-xs">
            <p className="px-md pb-xs text-label-caps font-label-caps text-outline uppercase text-xs font-bold tracking-wider">
              {group.title}
            </p>
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-md px-md py-sm rounded-lg transition-all text-sm font-medium ${
                    isActive
                      ? "bg-secondary-container text-on-secondary-container font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-lg border-t border-outline-variant">
        <div className="flex items-center gap-md p-sm rounded-xl bg-surface-container-low">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-body-sm font-semibold text-on-surface truncate text-sm">
              Admin User
            </span>
            <span className="text-[10px] text-outline uppercase font-bold">
              Pro Plan
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
