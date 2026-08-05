"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "活動", href: "/events", icon: "event" },
    { label: "訂單", href: "/orders", icon: "receipt_long" },
    { label: "掃描", href: "/scanner", icon: "qr_code_scanner" },
    { label: "行銷", href: "/campaigns", icon: "campaign" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline-variant z-50 flex items-center justify-around md:hidden">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-xs ${
              isActive ? "text-primary font-bold" : "text-on-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
