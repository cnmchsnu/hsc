

import Link from "next/link";
import { Suspense } from "react";
import { MobileMenu } from "./header/MobileMenu"
import { DesktopMenu } from "./header/DesktopMenu";
import { UserAvatar } from "./header/UserAvatar";

import { ShoppingCart, Bell, CircleUserRound  } from 'lucide-react';


import { getCurrentUserProfile } from "@repo/auth/server";

import { GoogleOneTap } from "./GoogleOneTap";

export async function Header() {

  const currentUserProfile = await getCurrentUserProfile("Header component");

  const navLinks = [
    { name: "首頁", href: "/" },
    { name: "所有商品", href: "/products" },
    { name: "我的訂單", href: "/profile?tab=orders" },
    { name: "個人檔案", href: "/profile" },
  ];

  return (

    <header className="sticky top-0 z-50 w-full bg-background border-b border-surface-variant/40 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center h-16 md:h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-stack-lg">
          <Suspense fallback={<span className="text-headline-md font-headline-md font-bold text-primary tracking-wide">
              Loading...
            </span>}>
            <Link href="/" className="text-headline-md font-headline-md font-bold text-primary tracking-wide">
              學生會商城
            </Link>
          </Suspense>
          <DesktopMenu navLinks={navLinks} />
        </div>

        <div className="flex items-center gap-gutter">
          {/* Search Box */}
          {/* <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-surface rounded-full border-none focus:ring-2 focus:ring-primary-container w-44 lg:w-64 transition-all text-sm outline-none"
              placeholder="搜尋商品..."
              type="text"
            />
          </div> */}

          <div className="flex items-center gap-stack-md">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="p-2 hover:bg-surface-container-low rounded-lg transition-all active:scale-95 flex items-center justify-center relative"
            >
              <ShoppingCart className="text-primary text-[24px]" />
              <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </Link>

            {/* Notification Icon */}
            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-all active:scale-95 flex items-center justify-center relative">
              <Bell className="text-primary text-[24px]" />
              <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Profile Avatar */}
            <Suspense fallback={
              <div className="h-10 w-10 md:h-10 md:w-10 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center justify-center" >
                <CircleUserRound className="text-primary text-[24px]" />
              </div>
              }>
              <UserAvatar currentUserProfile={currentUserProfile} />
            </Suspense>
            

            <MobileMenu navLinks={navLinks} />

            {!currentUserProfile && <GoogleOneTap />}
            
          </div>
        </div>
      </div>
    </header>
  );
}
