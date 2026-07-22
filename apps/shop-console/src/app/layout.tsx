import type { Metadata } from "next";
import "./globals.css";
import { plusJakartaSans, jetBrainsMono } from "../lib/font";
import { Sidebar } from "./components/layout/sidebar";
import { Header } from "./components/layout/header";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "HSNU Admin | 學生會商城管理後台",
  description: "師大附中學生會商城管理系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-surface text-on-surface font-body-md overflow-x-hidden">
        <Analytics />
        <SpeedInsights />
        <Sidebar />
        <Header />
        <main className="ml-64 pt-16 min-h-screen bg-surface">
          {children}
        </main>
      </body>
    </html>
  );
}
