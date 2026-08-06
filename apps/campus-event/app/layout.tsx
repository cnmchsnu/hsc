import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "校園活動推廣平台 | Campus Event Studio",
  description: "發掘精彩時刻，連結無限可能。校園活動、電競賽事與校慶商品訂購專區。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-jakarta bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
