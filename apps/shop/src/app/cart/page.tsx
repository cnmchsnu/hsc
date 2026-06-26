"use client";

import Link from "next/link";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  qty: number;
  spec: string;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 201,
      name: "HSNU 經典棒球外套",
      price: 1620,
      originalPrice: 1800,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIaIHP7qox0uj_lGE393y0JhFrNEwXyROmdgA1h935oxGjFmguGnVcj6xSCAGPU8Yd7P1xDwOTYgoKZhxSUUhPW5fImkWt7vWOYlVbDTPzGslnQ-CGjNy3saT4pevx9quxHsQ2TqLCEClCJ6eV3IRPX5P1OLJ-2X1lsfyvqtMJ7eGgooe6dix3aNRUXerZDFPSPGnZArO73yOZ4BNfXOXm66j0Z7gkKKJupHmFeU62jLYq5qsfE01DE3mohqC9c9VzKF11jGHJnow",
      qty: 1,
      spec: "規格：海軍藍 / L",
    },
    {
      id: 202,
      name: "附中限定不鏽鋼保溫瓶",
      price: 990,
      originalPrice: 1100,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7GwhF6h2QvOvO_W_LKUO0UCXts-E6uByjAFwZzV2LlLThg0_4ZArePw4CZUwxQW4M2anq3ezSBZRNa5xj4czRNa5MG0jgYL2Sqa7kvPLpjSgNcgOxKO3fiyjvQlnbxG7v2JoveDyPyOMPnw29Pt2wLmLvepHz2HREH8fxYApAVAkg_1f6f_oGA4-B6Q5WWf9CbcH99mcMEzSUY68XbFq7Ml0ob4hP7K9Y2c1bo-uxcCbJoGYDzGduDXuXcmIjbAoGYNtpq3Vn1YE",
      qty: 2,
      spec: "規格：曜石黑 / 500ml",
    },
    {
      id: 203,
      name: "學聯會限定：吉祥物吊飾",
      price: 135,
      originalPrice: 150,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0QMvSoQVQY55WPqVFxELEGHo6Col7HWBBcIrPd7jwYatJ6-PIqdezGNGZ7dMwFT50Fs8eBetHBBep7nlqsPVuBDPtZIyf9dOJskICq59RIT7KF6M79_L2OWtzz5IBO8cD6syFiEtBwXMLOqrFR298aB7aBw5OS1-dFMlgNCEkGHYLYjuSyu1QphoYnCRbg0w1eYtsLRf7eROtL-7Q0TA60m5bN19GySFIHRU3fWWkgHITOer9sjy8iAiAPK5idPFK3vXfXmd4ukQ",
      qty: 1,
      spec: "規格：單款 / 附中限定",
    },
  ]);

  const handleQtyChange = (id: number, val: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + val;
          return { ...item, qty: newQty >= 1 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.originalPrice * item.qty, 0);
  const discount = Math.round(subtotal * 0.1); // 9折
  const totalItemsCount = items.reduce((acc, item) => acc + item.qty, 0);
  const shipping = subtotal > 0 ? 60 : 0;
  const total = subtotal - discount + shipping;

  const recommendations = [
    {
      id: 301,
      name: "HSNU 帆布托特包",
      price: 250,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkMVPOUKTG8p009kMxYHx_-maZumBpL7OZqdx76Cn_eVPRvuRjEy9hH2ygNRJoPaW8uKzNXEY-Ov5IrB-UlL0LJzzIMGSfkHgnfelmpj5VTHxaWt8CwwVPodE99-DQ3siVIGOPEGlayWe6SWIn6SwFvzdgDw-2hdRz_-CBETmLqpglvtmg1f-qaKlfYNAoKcnoLUDEFAXBM9M-oj_EvDTGwH221BlwFD_XPxm2IaQ49ZgH6N6VMFX5GliVKhK-0fNX-aLuuqBnmPo",
      isSale: true,
    },
    {
      id: 302,
      name: "高級皮革筆記本",
      price: 320,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCorz6gnpr6Tc-jdcg73IAFz6ityM31AMf5GrgT4VLSa7CuG1bEiz0nspSoSJpsqGnNJQ6i-VEn1sx9biEtvKuAUgiBV_Eo5GMFOx1I0r0TGmVNxBQQ3CmpcDeLFndkjrq84Quv5rGzP_jivfvjG5p2zRio5PmUlfczTGAwjEwgjoUa6I00gd1BVpH9kF8iYyA_B4wrrVb2nMin-5aaP3DPfq24ptJRMX9aQLHo1GKTClDDTXDyDXorj4VEA7uKbrXk9vDc7Qu07CY",
    },
    {
      id: 303,
      name: "經典校徽 POLO 衫",
      price: 550,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbizDYj0moa3AYFcJx38N71PK9zS8x4oXK6uCT0Hie24CytyBr4q7hdGf6RXio7SKNXnZjWfzmBu5kbmpD5AZyylHiL66bMwAii_Vg6dLzUXpQbtmRyAJfyncu3e2TSHx5rEkrvGXdIj2_Cqs3tIzeOWQx0u4XVgAdlSNKnJFJ-OvsMBtUACtNKyUUGf2wxocL9SsX7tchaRMkoWfY8xCLA8zzkVPZnemt_DwACp9xN8EOeBXc-OKsOCwHzJVTV3O-Fk7zx-6RbR8",
    },
    {
      id: 304,
      name: "潮流附中設計長襪",
      price: 150,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhi7nXEUTgnuWo12Fpww24qEb4TWGA_kcoKL8QAnqcA-Qk7eT5ms8VKvxiKAJGqQvTszbKvF0yPOzzWYsYEelIICxieT-twXrso_DCcGMIfkDbI28OYAHD9cuaRE-pGw6Eh4Iw8Pcvl09DjjLtsnEsYVidxn6rs-SicI-XPbjyRKL4lW9NyA7VdEXOnzXCYagkhHOEczfeN3179aoU3JOIWNanrdbrxSCMmp_gajuM8JUMhc9vVzCT3KfaqC4rsW5ExCBBoX4QVCw",
    },
  ];

  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg">
      {/* Progress Indicator */}
      <section className="mb-stack-lg flex justify-center">
        <div className="flex items-center gap-4 w-full max-w-2xl">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-label-md shadow-md">
              1
            </div>
            <span className="font-label-sm text-primary font-bold">確認清單</span>
          </div>
          <div className="h-[2px] bg-outline-variant flex-1 mb-6"></div>
          <div className="flex flex-col items-center gap-2 flex-1 opacity-40">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold font-label-md">
              2
            </div>
            <span className="font-label-sm text-on-surface-variant">填寫資料</span>
          </div>
          <div className="h-[2px] bg-outline-variant flex-1 mb-6"></div>
          <div className="flex flex-col items-center gap-2 flex-1 opacity-40">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold font-label-md">
              3
            </div>
            <span className="font-label-sm text-on-surface-variant">完成訂單</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Cart Items List (8 cols) */}
        <section className="lg:col-span-8 space-y-stack-md">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md flex items-center gap-2 font-bold text-2xl">
            購物車 <span className="text-body-md font-normal text-text-secondary">({totalItemsCount} 件商品)</span>
          </h2>

          {items.length === 0 ? (
            <div className="bg-surface rounded-xl p-12 border border-outline-variant text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-outline">shopping_cart</span>
              <p className="text-on-surface-variant text-lg">您的購物車是空的</p>
              <Link href="/products" className="inline-block bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary-container transition-all">
                探索商品
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="cart-item-hover bg-surface rounded-xl p-4 border border-outline-variant flex flex-col sm:flex-row gap-6 transition-all duration-300"
              >
                <div className="w-full sm:w-32 h-32 rounded-lg bg-surface-container-highest overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link href={`/products/${item.id}`} className="font-bold text-lg text-on-surface hover:underline">
                        {item.name}
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-text-secondary hover:text-error transition-colors p-1"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                    <p className="text-text-secondary text-label-md mt-1">{item.spec}</p>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-outline-variant rounded-lg bg-background overflow-hidden">
                      <button
                        onClick={() => handleQtyChange(item.id, -1)}
                        className="px-3 py-1 hover:bg-surface-container-high transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="px-4 py-1 font-label-md font-bold border-x border-outline-variant text-on-surface">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(item.id, 1)}
                        className="px-3 py-1 hover:bg-surface-container-high transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-text-secondary text-label-sm line-through">
                        NT$ {(item.originalPrice * item.qty).toLocaleString()}
                      </p>
                      <p className="text-primary font-bold text-body-lg text-lg">
                        NT$ {(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Order Summary (4 cols) */}
        <aside className="lg:col-span-4">
          <div className="bg-surface rounded-xl p-6 border border-outline-variant sticky top-28">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 font-bold text-xl">訂單摘要</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-on-surface-variant">
                <span>商品小計 ({totalItemsCount})</span>
                <span className="font-label-md font-bold">NT$ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lto-timer font-bold">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">sell</span>
                  <span>校友/學生 9 折優惠</span>
                </div>
                <span className="font-label-md">- NT$ {discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>預估運費</span>
                <span className="font-label-md font-bold">NT$ {shipping.toLocaleString()}</span>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-body-lg font-bold text-lg">總計金額</span>
                <span className="text-headline-lg text-primary font-extrabold text-2xl">
                  NT$ {total.toLocaleString()}
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              className={`w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-body-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md text-center ${
                items.length === 0 ? "pointer-events-none opacity-50" : ""
              }`}
            >
              前往結帳
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-label-sm text-text-secondary">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>校園實體店面取貨免運費</span>
              </div>
              <div className="flex items-center gap-2 text-label-sm text-text-secondary">
                <span className="material-symbols-outlined text-[16px]">security</span>
                <span>SSL 安全加密支付環境</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Recommended Items */}
      <section className="mt-stack-lg">
        <div className="flex items-center justify-between mb-stack-md">
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-xl">你可能也會喜歡</h2>
          <Link className="text-primary font-bold flex items-center gap-1 hover:underline text-sm" href="/products">
            查看更多商品
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {recommendations.map((r) => (
            <div
              key={r.id}
              className="group bg-surface rounded-xl overflow-hidden border border-outline-variant hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={r.name} src={r.image} />
                {r.isSale && (
                  <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-[10px] font-bold">
                    SALE
                  </span>
                )}
              </div>
              <div className="p-4">
                <Link href={`/products/${r.id}`} className="font-bold text-body-md truncate block text-on-surface hover:underline">
                  {r.name}
                </Link>
                <p className="text-primary font-bold mt-1">NT$ {r.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
