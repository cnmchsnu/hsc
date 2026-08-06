import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-on-primary text-xs font-bold">
              校
            </div>
            <span className="font-bold text-text-primary text-sm">
              學生會數位化平台 — 校園活動中心
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            © 2026 Student Union Digitalization Platform. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-text-secondary">
          <Link href="/" className="hover:underline">
            活動總覽
          </Link>
          <Link href="/events" className="hover:underline">
            校慶紀念品
          </Link>
          <Link href="/events/2" className="hover:underline">
            電競賽事
          </Link>
          <Link href="/checkout" className="hover:underline">
            訂單查詢
          </Link>
        </div>
      </div>
    </footer>
  );
}
