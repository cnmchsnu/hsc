"use client";

import Link from "next/link";
import { Sidebar } from "../../../../src/components/Sidebar";
import { Header } from "../../../../src/components/Header";
import { MobileNav } from "../../../../src/components/MobileNav";

export default function ProductPaymentResultPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-lg mx-auto space-y-6 text-center">
          <div className="flex items-center gap-3 text-left">
            <Link
              href="/scanner"
              className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </Link>
            <div>
              <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">
                現場收款與核銷
              </span>
              <h1 className="text-xl font-bold text-on-surface">
                待確認收款 (Pending Payment)
              </h1>
            </div>
          </div>

          <div className="w-20 h-20 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-outlined text-[48px]">
              payments
            </span>
          </div>

          <div className="bg-surface-container rounded-2xl p-6 text-left space-y-4 border border-outline-variant/30">
            <div className="text-center py-2 border-b border-outline-variant/20">
              <span className="text-xs font-bold text-outline uppercase">
                應收取總金額
              </span>
              <div className="text-3xl font-extrabold text-primary font-mono mt-1">
                NT$ 1,280
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">訂購人</span>
                <span className="font-bold">張小明 (Lin Xiao-Ming)</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">電話</span>
                <span className="font-mono">0912-345-678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">支付管道</span>
                <span className="font-bold text-indigo-600">
                  LINE Pay / 現場現金
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => alert("交易已取消")}
              className="flex-1 py-3.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-xl font-bold text-sm transition-colors"
            >
              取消
            </button>
            <button
              onClick={() => alert("現場金額核對完成！已完成入帳")}
              className="flex-[2] py-3.5 bg-primary hover:bg-primary/90 text-on-primary rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
              確認收到款項
            </button>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
