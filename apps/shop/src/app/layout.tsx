import type { Metadata } from "next";

import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";

import "@repo/ui/styles/globals.css";

import {
  Header,
  Footer
} from "./components"

export const metadata: Metadata = {
  title: "學生會商城 | HSNU Student Association Store",
  description: "師大附中學生會唯一官方授權平台，提供高品質的校園生活週邊商品。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background font-body-md text-body-md text-on-background">
        <SpeedInsights />
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
