"use client";

import Link from "next/link";
import { useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  spec: string;
  image: string;
}

export default function Checkout() {
  const [phone, setPhone] = useState("0912-345-678");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const orderItems: OrderItem[] = [
    {
      id: 11,
      name: "師大附中 75 週年紀念帽T",
      price: 750,
      qty: 1,
      spec: "尺寸: XL",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8xSQ_6uUabn9A80jy4imq3J3A3pbOkyrz6bYv0zZLVotwkpR1pFhSwvgH6KP8-cRUOaSqgLK4-Cx71l5kVTf4_qu__538Yvh1eYVdUgbQjO6sKGhkN4VHgsZqKszk0O93_4ne8fUQx0lNXUkzs8Qwrz0wYlc3ol42Cv6-8pf5_Hv1IMvcYCr7hcbzsdNhrbQQRtlIEX21n_9jYUyNheVe75j7lsvj9uPKsREk1YkYibIOIsg8VpzP6hSyB5fooIf8aRbgJlMpF14",
    },
    {
      id: 12,
      name: "限定精裝文具套組",
      price: 200,
      qty: 2,
      spec: "款式: 極致黑",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxEkgjA8JV91ai6QUb82az4cXDzD08l1fDZDsQFygussCUvDKRxqQAXGFSGeRiLVemk54yVy52qgtfqkJ9VLx3CQgtOMwanQk9EUgzIerJW0bPhZV3knRf_NxGNHUl1nBtWVPOVTdFwd0sm3aStK2tF2xSI2FhBq4QiQrynS8vZCB-1d4_hkB-1chpk3cTSgG49cFMmO1rpdKRlH-OJDnRRpBVzQwJKrYu_pWRxbHF3omoM8-oNU-WuIVPyFMlAD9c0t_T_DZbJQM",
    },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = 50; // Member discount
  const total = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-20 flex flex-col items-center justify-center text-center space-y-6">
        <span className="material-symbols-outlined text-6xl text-primary animate-bounce">
          check_circle
        </span>
        <h2 className="text-3xl font-bold text-primary">預訂成功！</h2>
        <p className="text-on-surface-variant max-w-md">
          您的預訂單號為 <span className="font-bold text-on-surface">#HSNU-2026-62601</span>。
          請記得於三個工作日內，<span className="font-bold text-primary">至學生會辦公室進行現金付款並取貨</span>。
        </p>
        <div className="pt-6 flex gap-4">
          <Link href="/profile?tab=orders" className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-surface-container-low transition-all">
            查看訂單記錄
          </Link>
          <Link href="/" className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container transition-all">
            回到首頁
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-12">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-16 max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant font-bold">
            1
          </div>
          <span className="font-label-sm text-label-sm text-text-secondary">確認清單</span>
        </div>
        <div className="flex-grow h-[2px] bg-outline-variant mx-4 mb-6"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg ring-4 ring-primary-fixed ring-opacity-50">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <span className="font-label-md text-label-md text-primary font-bold">填寫資料</span>
        </div>
        <div className="flex-grow h-[2px] bg-outline-variant mx-4 mb-6"></div>
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant font-bold">
            3
          </div>
          <span className="font-label-sm text-label-sm text-text-secondary">預訂完成</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Customer Information */}
        <div className="lg:col-span-7 space-y-stack-lg">
          <section className="bg-surface p-8 rounded-xl border border-outline-variant">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-primary rounded-full"></div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-2xl">
                領取人資訊
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block">學生姓名</label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface cursor-not-allowed outline-none"
                  readOnly
                  type="text"
                  value="陳小明"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block">學號</label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface cursor-not-allowed outline-none"
                  readOnly
                  type="text"
                  value="11200123"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block">聯繫電話</label>
                <input
                  className="w-full border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-background"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block">學校信箱</label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface cursor-not-allowed outline-none"
                  readOnly
                  type="email"
                  value="s11200123@gs.hs.ntnu.edu.tw"
                />
              </div>
            </div>

            {/* Pickup Instruction Badge */}
            <div className="mt-10 p-6 bg-surface-container-highest rounded-xl border-l-4 border-primary flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-3xl shrink-0">info</span>
              <div>
                <p className="font-bold text-primary mb-1 text-lg">線下取貨說明</p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  本商城僅提供線上預訂服務。請於訂單成立後三個工作日內，
                  <span className="font-bold text-primary">至學生會辦公室進行現金付款與取貨</span>。
                </p>
              </div>
            </div>
          </section>

          {/* Map / Location Visual */}
          <div className="relative group overflow-hidden rounded-xl h-64 border border-outline-variant shadow-sm transition-transform hover:scale-[1.01]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-on-background/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined">location_on</span>
                <p className="font-bold text-lg">學生活動中心 2F 學生會辦公室</p>
              </div>
              <p className="text-white/80 font-body-md ml-8 text-sm mt-1">開放時間：週一至週五 12:30 - 13:10</p>
            </div>
            <div className="w-full h-full bg-surface-container">
              <img
                className="w-full h-full object-cover"
                alt="HSNU campus center map render"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1oSqJe162wpawQ0Rit8VgLz_4KOVCdFtcbFNygipNIpjLiXmzlmxrisnE9DSiE9JGZ2zWZBpm351278vFjXwNCyoXscwQrJYKrrdKpuEaW4j9lXjqOC8ixZ5Sju8MHy4cG_tspIW4eAhAqQ1onhfiujTNTGR5UwVridG8aJfLcnXbmkUqcqzXYUObReT1SSHbrx_9iCdTW_qYGGV8V_lVN2hAqtzqX71cyJ_-si-X-IhrT7LVdPU6vx_NAqLki064hZEYoQcbeOU"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-stack-md">
            <section className="bg-surface p-8 rounded-xl border border-outline-variant shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-8 font-bold text-xl">訂單摘要</h2>
              {/* Order Items */}
              <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-20 h-20 bg-surface-container-high rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant">
                      <img className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={item.name} src={item.image} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-body-lg text-body-lg font-semibold text-on-surface line-clamp-1">{item.name}</h3>
                      <p className="text-text-secondary font-label-sm text-xs mt-1">{item.spec} | 數量: {item.qty}</p>
                    </div>
                    <p className="font-label-md text-label-md text-primary font-bold">NT$ {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-outline-variant pt-6 space-y-3">
                <div className="flex justify-between text-on-surface-variant font-body-md">
                  <span>商品小計</span>
                  <span className="font-bold">NT$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-body-md">
                  <span>學生會員優惠</span>
                  <span className="text-secondary font-bold">- NT$ {discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-outline-variant/30">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">應付總額</span>
                  <div className="text-right">
                    <span className="font-headline-lg text-headline-lg text-primary text-2xl font-extrabold">NT$ {total.toLocaleString()}</span>
                    <p className="text-text-secondary text-[10px] mt-1 font-label-sm">取貨時以現金支付</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-8 bg-primary text-white font-headline-md py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-primary-container transition-all active:scale-95 shadow-md hover:shadow-lg group disabled:opacity-50 font-bold"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>處理中...</span>
                  </>
                ) : (
                  <>
                    <span>送出預訂單</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                  </>
                )}
              </button>
              <p className="text-center mt-6 text-text-secondary font-label-sm flex items-center justify-center gap-1 text-xs">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                您的個人資料受學生會隱私權條款保護
              </p>
            </section>

            {/* Membership Badge Side Card */}
            <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl text-white shadow-xl flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-label-sm opacity-80 uppercase tracking-widest text-xs">Membership Status</p>
                <p className="font-headline-md text-headline-md font-bold text-xl">榮譽學生會員</p>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
