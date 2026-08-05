"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "../../src/components/Sidebar";
import { Header } from "../../src/components/Header";
import { MobileNav } from "../../src/components/MobileNav";
import { mockOrders, OrderMock } from "../../src/mock/studioMockData";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderMock>(mockOrders[0]);
  const [filter, setFilter] = useState<string>("ALL");

  const filteredOrders = mockOrders.filter((ord) => {
    if (filter === "ALL") return true;
    return ord.status === filter;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />
      <Header />

      <main className="pt-16 pb-20 md:pb-0 md:pl-72 min-h-screen">
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          {/* Main Table Area */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-outline-variant/30 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 bg-surface border-b border-outline-variant/30 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-on-surface">訂單管理</h1>
                  <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                    {mockOrders.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/orders/reconciliation"
                    className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      account_balance_wallet
                    </span>
                    訂單對帳
                  </Link>
                  <Link
                    href={`/orders/${selectedOrder.id}/print`}
                    className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      print
                    </span>
                    列印單據
                  </Link>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 overflow-x-auto text-xs">
                {["ALL", "已完成", "待處理", "對帳中"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilter(st)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      filter === st
                        ? "bg-primary text-on-primary font-bold"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {st === "ALL" ? "全部訂單" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 bg-surface border-b border-outline-variant/30 text-xs font-bold text-outline">
                  <tr>
                    <th className="p-3">訂單編號</th>
                    <th className="p-3">顧客姓名</th>
                    <th className="p-3">訂購日期</th>
                    <th className="p-3">金額</th>
                    <th className="p-3">付款方式</th>
                    <th className="p-3">狀態</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredOrders.map((ord) => {
                    const isSelected = selectedOrder.id === ord.id;
                    return (
                      <tr
                        key={ord.id}
                        onClick={() => setSelectedOrder(ord)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-primary/10 font-medium"
                            : "hover:bg-surface-container-low"
                        }`}
                      >
                        <td className="p-3 font-mono text-primary font-bold">
                          {ord.id}
                        </td>
                        <td className="p-3 font-bold">{ord.customerName}</td>
                        <td className="p-3 text-xs text-on-surface-variant">
                          {ord.date}
                        </td>
                        <td className="p-3 font-mono font-bold">
                          NT$ {ord.total.toLocaleString()}
                        </td>
                        <td className="p-3 text-xs">{ord.paymentMethod}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.status === "已完成"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : ord.status === "對帳中"
                                ? "bg-amber-500/10 text-amber-600"
                                : "bg-blue-500/10 text-blue-600"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Inspector Panel */}
          <div className="w-full md:w-80 lg:w-96 bg-surface-container-low p-6 flex flex-col gap-6 shrink-0 border-t md:border-t-0 border-outline-variant/30 overflow-y-auto">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
              <h2 className="font-mono font-bold text-lg text-primary">
                #{selectedOrder.id}
              </h2>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded text-xs font-bold">
                {selectedOrder.status}
              </span>
            </div>

            {/* Customer Details */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold text-outline tracking-wider">
                顧客資訊
              </h3>
              <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 space-y-1 text-sm">
                <div className="font-bold text-on-surface">
                  {selectedOrder.customerName}
                </div>
                <div className="text-xs text-on-surface-variant">
                  {selectedOrder.email}
                </div>
                <div className="text-xs text-on-surface-variant">
                  {selectedOrder.phone}
                </div>
              </div>
            </div>

            {/* Items & Financial summary */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold text-outline tracking-wider">
                訂單明細
              </h3>
              <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>學生會入場早鳥套票</span>
                  <span className="font-mono font-bold">NT$ {selectedOrder.total}</span>
                </div>
                <div className="border-t border-outline-variant/20 pt-2 flex justify-between items-center font-bold">
                  <span>總計金額</span>
                  <span className="font-mono text-primary text-base">
                    NT$ {selectedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 space-y-2">
              <Link
                href={`/orders/${selectedOrder.id}/print`}
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm text-center block hover:bg-primary/90 transition-colors shadow-sm"
              >
                開啟收據與列印單據
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
