"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "../../../../src/components/Sidebar";
import { Header } from "../../../../src/components/Header";
import { MobileNav } from "../../../../src/components/MobileNav";
import { mockOrders } from "../../../../src/mock/studioMockData";

export default function OrderPrintPage() {
  const params = useParams();
  const orderId = (params.id as string) || "ORD-2026-0801";
  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-8 md:pl-72 min-h-screen">
        <div className="p-6 max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/orders"
                className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_back
                </span>
              </Link>
              <div>
                <span className="text-xs uppercase font-bold text-outline tracking-wider">
                  列印中心
                </span>
                <h1 className="text-2xl font-bold text-on-surface">
                  單據與收據列印 (#{order.id})
                </h1>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="bg-primary text-on-primary font-bold px-5 py-2 rounded-full text-sm hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                print
              </span>
              列印單據 (PDF)
            </button>
          </div>

          {/* Printable Receipt Paper Mockup */}
          <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-xl max-w-3xl mx-auto border border-slate-200 font-sans space-y-6">
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  學生會數位化平台 - 繳費證明單
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  列印時間: {new Date().toLocaleString()} • 訂單編號: {order.id}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  顧客姓名
                </span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  聯絡電話
                </span>
                <span className="font-mono">{order.phone}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  電子郵件
                </span>
                <span className="font-mono">{order.email}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  付款方式
                </span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>

            {/* Purchased Items */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-slate-400">
                購買項目明細
              </h3>
              <table className="w-full text-left text-sm border-collapse">
                <thead className="border-b border-slate-200 text-xs text-slate-500">
                  <tr>
                    <th className="py-2">項目說明</th>
                    <th className="py-2 text-right">數量</th>
                    <th className="py-2 text-right">單價</th>
                    <th className="py-2 text-right">小計</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-3">學生會 2024 春季特賣會 入場門票</td>
                    <td className="py-3 text-right font-mono">1</td>
                    <td className="py-3 text-right font-mono">
                      NT$ {order.total}
                    </td>
                    <td className="py-3 text-right font-mono font-bold">
                      NT$ {order.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div className="border-t-2 border-slate-900 pt-4 flex justify-between items-center text-lg font-bold">
              <span>實付總金額</span>
              <span className="font-mono text-2xl text-blue-600">
                NT$ {order.total.toLocaleString()}
              </span>
            </div>

            {/* Verification Stamp Footer */}
            <div className="pt-8 border-t border-dashed border-slate-300 flex justify-between items-center text-xs text-slate-500">
              <div>發行單位: 學生會行政中心 Studio</div>
              <div>此證明單具蓋章核銷之同等效力</div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
