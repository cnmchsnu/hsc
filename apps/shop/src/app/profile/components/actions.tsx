"use client";

import { signOut } from "@repo/auth/server/browser"; // Import the sign-out function

export function Actions() {


    const handleSignOut = async () => {
      try {
        await signOut()
        window.location.reload();
      } catch (error) {
        console.error('Google login failed:', error)
        alert('登入失敗，請稍後再試')
      }
    }


    return (
        <section className="bento-card bg-surface rounded-xl p-stack-md flex flex-col gap-2 border border-outline-variant shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <button className="flex items-center justify-between p-3 hover:bg-surface-container-low rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                  lock_reset
                </span>
                <span className="font-label-md text-label-md">更改密碼</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
            <button className="flex items-center justify-between p-3 hover:bg-surface-container-low rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                  shield_person
                </span>
                <span className="font-label-md text-label-md">隱私設定</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </button>
            <div className="h-px bg-outline-variant my-1"></div>
            <button className="flex items-center justify-between p-3 hover:bg-error-container/30 rounded-lg transition-colors group text-error" onClick={handleSignOut}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-md text-label-md">登出</span>
              </div>
            </button>
          </section>
    )

}