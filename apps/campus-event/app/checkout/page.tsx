"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Smartphone, Building } from "lucide-react";

export default function CheckoutPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<"linepay" | "credit" | "atm">("linepay");
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePay = () => {
    setIsCompleted(true);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm font-mono";

  return (
    <div className="w-full min-h-screen bg-background pb-20 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
            <ShieldCheck className="w-4 h-4" />
            SECURE CHECKOUT
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            訂單結帳與付款
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            請確認您的明細並選擇安全支付方式完成交易。
          </p>
        </div>

        {isCompleted ? (
          /* Payment Success Confirmation State */
          <div className="bg-surface-container-lowest rounded-3xl border border-tertiary-container/30 p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-on-surface">
                付款成功！電子憑證已開立
              </h2>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                訂單編號 <span className="font-mono font-bold text-on-surface">#ORD-202611-0982</span>
                <br />
                已將確認信與 QR Code 憑證寄送至您的信箱。
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/events"
                className="px-6 py-3 rounded-xl bg-primary text-on-primary text-sm font-bold shadow-md hover:opacity-90 transition-colors"
              >
                返回活動中心
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-surface-container text-on-surface text-sm font-bold hover:bg-surface-container-high transition-colors"
              >
                返回首頁
              </Link>
            </div>
          </div>
        ) : (
          /* Standard Checkout Form */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left 2 cols: Payment selection & Contact info */}
            <div className="md:col-span-2 space-y-6">
              {/* Payment Methods */}
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-on-surface">
                  選擇付款方式
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("linepay")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-24 transition-all ${
                      paymentMethod === "linepay"
                        ? "border-tertiary bg-tertiary-container/30 ring-2 ring-tertiary/20"
                        : "border-outline-variant hover:border-outline"
                    }`}
                  >
                    <Smartphone className={`w-6 h-6 ${paymentMethod === "linepay" ? "text-tertiary" : "text-on-surface-variant"}`} />
                    <div>
                      <span className="text-xs font-extrabold text-on-surface block">
                        LINE Pay
                      </span>
                      <span className="text-[10px] text-on-surface-variant">行動支付快速核帳</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("credit")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-24 transition-all ${
                      paymentMethod === "credit"
                        ? "border-primary bg-primary-container/20 ring-2 ring-primary/20"
                        : "border-outline-variant hover:border-outline"
                    }`}
                  >
                    <CreditCard className={`w-6 h-6 ${paymentMethod === "credit" ? "text-primary" : "text-on-surface-variant"}`} />
                    <div>
                      <span className="text-xs font-extrabold text-on-surface block">
                        信用卡 / 簽帳卡
                      </span>
                      <span className="text-[10px] text-on-surface-variant">VISA / MasterCard</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("atm")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-24 transition-all ${
                      paymentMethod === "atm"
                        ? "border-secondary bg-secondary-container/30 ring-2 ring-secondary/20"
                        : "border-outline-variant hover:border-outline"
                    }`}
                  >
                    <Building className={`w-6 h-6 ${paymentMethod === "atm" ? "text-secondary" : "text-on-surface-variant"}`} />
                    <div>
                      <span className="text-xs font-extrabold text-on-surface block">
                        WebATM / 轉帳
                      </span>
                      <span className="text-[10px] text-on-surface-variant">虛擬帳號繳費</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Details Input */}
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-on-surface">
                  {paymentMethod === "linepay"
                    ? "LINE Pay 綠色通道認證"
                    : paymentMethod === "credit"
                    ? "信用卡資訊"
                    : "轉帳繳費提醒"}
                </h2>

                {paymentMethod === "credit" ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-on-surface-variant block mb-1">卡號</label>
                      <input
                        type="text"
                        placeholder="4000 1234 5678 9010"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-on-surface-variant block mb-1">有效期限</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-on-surface-variant block mb-1">CVC / 安全碼</label>
                        <input
                          type="text"
                          placeholder="123"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    點擊「確認付款」後，將自動開啟導向至安全的 {paymentMethod === "linepay" ? "LINE Pay 錢包" : "銀聯轉帳系統"} 完成授權。
                  </p>
                )}
              </div>
            </div>

            {/* Right col: Order summary */}
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 flex flex-col justify-between shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-on-surface border-b border-outline-variant pb-3">
                  訂單明細
                </h2>

                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-on-surface block">
                        90 周年限定紀念 T-Shirt (M / 經典黑)
                      </span>
                      <span className="text-on-surface-variant">數量: 1</span>
                    </div>
                    <span className="font-bold text-on-surface">
                      $1,200
                    </span>
                  </div>

                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-on-surface block">
                        全校電競聯賽門票 Pass
                      </span>
                      <span className="text-on-surface-variant">數量: 1</span>
                    </div>
                    <span className="font-bold text-on-surface">
                      $350
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant space-y-2">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>小計</span>
                    <span>$1,550</span>
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>校慶優惠折抵</span>
                    <span className="text-tertiary font-bold">-$150</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-on-surface pt-2 border-t border-outline-variant">
                    <span>應付總額</span>
                    <span className="text-primary">$1,400</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePay}
                className="w-full py-4 rounded-xl bg-primary hover:opacity-90 text-on-primary font-extrabold text-sm shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
              >
                確認並立即付款 ($1,400)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
