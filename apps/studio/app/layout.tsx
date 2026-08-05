import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Union Studio",
  description: "Student Union Digitalization Platform Studio Management Console",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap"
        />
      </head>
      <body className="min-h-full bg-background font-sans text-on-background">
        {children}
      </body>
    </html>
  );
}
