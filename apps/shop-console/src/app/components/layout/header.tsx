"use client";

import { useState, useEffect } from "react";

import { getCurrentUserProfileAction } from "@/actions/auth";
import { CircleUserRound } from "lucide-react";
import { CurrentUserProfile } from "../../../../../../packages/auth/application";

export function Header() {
  const [currentUserProfile, setCurrentUserProfile] = useState<CurrentUserProfile | null>(null);

  useEffect(() => {
    async function fetchCurrentUserProfile() {
      try {
        const profile = await getCurrentUserProfileAction();
        setCurrentUserProfile(profile);
      } catch (error) {
        console.error("Error fetching current user profile:", error);
      }
    }

    fetchCurrentUserProfile();
  }, []);


  return (
    <header className="fixed top-0 right-0 left-50 h-16 bg-background border-b border-outline-variant px-10 flex items-center justify-between z-40">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="w-20 font-headline-md text-xl font-extrabold text-on-primary-fixed-variant">
          管理後台
        </h2>
        <div className="relative w-96 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container transition-all"
            placeholder="全域搜尋..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-all"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
          type="button"
          aria-label="Help"
          className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-all"
        >
          <span className="material-symbols-outlined">help</span>
        </button>
        <div className="w-px h-6 bg-outline-variant mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface">{currentUserProfile?.displayName || "Unknown User"}</p>
            {/* <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
              {currentUserProfile?.role || "Unknown Role"}
            </p> */}
          </div>
          <span className="h-10 w-10 md:h-10 md:w-10 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center justify-center">
              { !currentUserProfile?.avatarUrl ? (
                <CircleUserRound className="text-primary text-[24px]" />
              ) : (
                <img src={currentUserProfile.avatarUrl!} width={48} height={48} />
              )
              }
            </span>
        </div>
      </div>
    </header>
  );
}
