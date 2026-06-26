"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Countdown {
  hours: string;
  minutes: string;
  seconds: string;
}

export default function ProductDetail() {
  const params = useParams();
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("detail");
  const [countdown, setCountdown] = useState<Countdown>({
    hours: "04",
    minutes: "22",
    seconds: "05",
  });

  const productData = {
    id: params?.id || "1",
    name: "聯名系列：經典電繡連帽衛衣",
    price: 1280,
    originalPrice: 1580,
    sku: "HSNU-2024-W01",
    description: "本款連帽衛衣採用 400g 重磅純棉面料，內層親膚磨毛處理，保暖且挺括。胸前電繡校徽採用 3D 立體針法，展現出色的工藝細節。適合春秋冬三季穿著，展現學生的學術活力與青春氣息。",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHd9vTEiLLnys_ZFLmYQ0JwT8QqyNRiN4mr1Q_dC3XNUv7m9UQ-PqqjnU7pIMP33mY9u0_d0pqlpM9sChRT400iWlAq1Vb1lxejMGGxdmPqximep3CRbdbsoTMyhF9K3hxbBNkPmCwmO5bB8a1J_c7AT-7OmBYOFmVROS0c-bPH4Z2izo3PojG6Cfi-Yu8hHad2qTVnqu7nIUyRC_FVIWrbzhHHd-QpE-NutSwFwZ4F96e4X4q-wvAJR6Vx6oZvogB-JijQTDOa1M",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBknVz1EnVVewviflTuT3EiLwHtLx-h2xPYdSTjuzOwCVKuyv03TQ3aFgTq12ZsXjlQVID8vFZRxiKYpyGW1dgWF5NCbX9e8ckwksMv7FB9cIAQj6imZqxYZLKKbeG50aXScy0WaDrefHxvNd6c_oZ1bGLworefhR_EbVZsX418rpMkYN6lMIMXJfn-KorUQa4pV8PRUsEi-eCmCeHXJMQsA6bq4X7d7NviXSUIMqmPtCwuQ9VLxFkh1WaxVYHy2wSyUyn-jR3QkA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwvd-x6uwz5eokqWAdalkv0Pd9m8oPHxGjkjBm02hiLxDwXxit13D8BzWjoov3GdHrbgPG2MbmESaxqLfa7meFA3zUs55T1HbMQEg_1sJC1O-Aeo5zmQxmaoH9pJtP_cYd_4uUduO97tDcYJL84MEdEZuoCGk_6e2Zv9eFf0hGPHorirfrk35pUO8oxwIT7DVI0Fmlz3lC7vIWwqWvZF59FkzRXCg_MrUv9u_Qk7hN5x-GbJ6bzVAFSVZTAc3pWNVhHmRJdq15kAY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWdCUfgsNtcFVTDyJibpm1YV9ZyjSsZLNZYUjy3u0VDJTg-ciMcYuqgABicZNXI7XlF4GkfbO4ZBhLQsHvlLrqEUjzDirTBPCzRUNB5Zoje-JwznrIaAB5JKC3S-fldNuEOgjDhJHlLny0FCpMNVRHOrcRfJMJN_0iMotKVYoxLHNviSYNhRRHcgV2ZLO5EvyJxWTtNRwx9ga03fV0SRHk29qwyZpwykH8xN7OVZfFMB3izAh-aCnuVDEskxkLoDDPbpSojZD3g4",
    ],
    colors: ["#001D4A", "#343A40", "#E9ECEF"],
    sizes: ["S", "M", "L", "XL"],
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(target.getHours() + 4, target.getMinutes() + 22, target.getSeconds() + 5);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQtyChange = (val: number) => {
    const newQty = qty + val;
    if (newQty >= 1) setQty(newQty);
  };

  const recommendations = [
    {
      id: 11,
      name: "聯名保溫杯 (午夜黑)",
      price: 550,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEm7qIwpq4do8odSpimug-prpUxkc-phy0Ran267qRhUjafJoYK8XAsb11vcpO5oi0OilUDJNFz4kzedBOxxskv2xME9X7KT7xcN-g46f1bNDkLXdZ5UmjpB0_23HKIvZVJ9ADmk6IH_WdiemNz6uBWzdJ-IJ7XraYdo44igBt4wmQUflBjdgOPcDgXQCp23QE1HM3TiTHmy6PtTcsdEMXuJKWCi-H4oNr1WPCvg0yr7Lw1bAtdHBEjiZiQ_ytpGGAdtiLcvXJHJ8",
    },
    {
      id: 12,
      name: "布面精裝筆記本套裝",
      price: 390,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsvh3GWerFhu1ZLjeWzPeb78LeGw48hfdgTzNP3FXQJ16KpDKuZvCz9xcsOav496KcFdXhtu2EMdve9oBhbznr4Ghwx9q1gvHxVKV0D2S6nnK18iZyuzeUJUWSyyf2vzPGYfMNAJjZGyJPUoJtEsqzntlyO1_DyR6fE61mLdDxCqCu43aj3N4BCNu6A0VevkzKS80CFAMLPY2xz5aQ4vTaQAw38RM2fb9J9S6JWVsLRRz_gLgZK2A0uVzHAcibwrcovamzGDaVS0",
    },
    {
      id: 13,
      name: "附中經典壓紋保溫瓶",
      price: 590,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDidmLD_uVCLsBCy1pxB0HLL_9seNI7FgHA7FuMor89Hv4LHnhDLtfbNzsQRqs_wBT22Nj8quIq-jBxpOeUOAcq4zXWEshq7aFYrrNeyIMbdoST0JAr9L1dVUb80AfvhvIiiQmvX-KFz1k9g8hQiJZ6vbq16U4kMR6I-wuuhbNK5qaDrpO0URrQzOzLP4HOprcRPzjczSVuepywA9gtjnj5vJO2tIkrcjVvltpfz8nhxfQMGTEhgj2i1m_n6xZMDctNoMbtp4NP7LI",
    },
    {
      id: 14,
      name: "77週年紀念雙肩後背包",
      price: 1150,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRMV_rZn8lMHXqiFx1erkPWB7BERr8iNdFMy11A6OBm5HZPiFZJ88MiWH6D7K9uL5YFc5XxuPStagCdpXm-DowvhLAJD8CMqwt91wDs0d2PVKkeyGE2xntlpLr8TLCuVCH5PUqZ1sNPzrnHoCwTJWreAL9JpubQtgUXQNGiPs9bU9ohZym6d5YkpiAf-JdEt9ka6GX1ovxCDio-r7-qqjNjSEug62lv50i_orl0P44GMH1uPj-wOK3ttawOqaHkAlcVJUFFfXFnz4",
    },
  ];

  return (
    <div className="flex-grow max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-stack-lg text-on-surface-variant font-label-md">
        <Link className="hover:text-on-primary-fixed-variant transition-colors" href="/">
          首頁
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link className="hover:text-on-primary-fixed-variant transition-colors" href="/products">
          校園服飾
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-primary-fixed-variant font-bold">聯名連帽衛衣</span>
      </nav>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Gallery */}
        <div className="space-y-stack-md">
          <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-low border border-surface-variant shadow-sm group relative">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={productData.name}
              src={productData.images[activeThumb]}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productData.images.map((img, idx) => (
              <button
                key={idx}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-80 ${
                  activeThumb === idx ? "border-on-primary-fixed-variant" : "border-transparent hover:border-outline-variant"
                }`}
                onClick={() => setActiveThumb(idx)}
              >
                <img className="w-full h-full object-cover" alt={`Thumb ${idx}`} src={img} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <div className="mb-stack-sm flex items-center gap-2">
            <span className="bg-primary-container text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">
              校慶限定
            </span>
            <span className="text-on-surface-variant font-label-sm">SKU: {productData.sku}</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm font-bold text-3xl">
            {productData.name}
          </h2>
          <div className="flex items-baseline gap-4 mb-stack-md">
            <span className="text-3xl font-bold text-on-primary-fixed-variant">NT$ {productData.price}</span>
            <span className="text-on-surface-variant line-through font-label-md">NT$ {productData.originalPrice}</span>
            <span className="bg-secondary-container text-on-secondary-fixed-variant px-2 py-0.5 rounded-full text-xs font-bold">
              8折
            </span>
          </div>

          {/* LTO Timer */}
          <div className="bg-surface-container-low border border-on-primary-container p-stack-md rounded-xl mb-stack-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lto-timer animate-pulse">timer</span>
              <span className="font-bold text-on-primary-fixed-variant">限時優惠倒數</span>
            </div>
            <div className="flex gap-2 font-label-md text-lto-timer text-lg items-center">
              <span className="bg-white px-2 py-1 rounded shadow-sm font-bold">{countdown.hours}</span>:
              <span className="bg-white px-2 py-1 rounded shadow-sm font-bold">{countdown.minutes}</span>:
              <span className="bg-white px-2 py-1 rounded shadow-sm font-bold">{countdown.seconds}</span>
            </div>
          </div>

          <p className="text-on-surface-variant mb-stack-lg leading-relaxed">{productData.description}</p>

          {/* Selectors */}
          <div className="space-y-6 mb-stack-lg">
            <div>
              <span className="block font-bold text-on-surface mb-3">選擇顏色</span>
              <div className="flex gap-3">
                {productData.colors.map((c, idx) => (
                  <button
                    key={idx}
                    style={{ backgroundColor: c }}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === idx ? "border-on-primary-fixed-variant ring-2 ring-offset-2 ring-primary-container/45" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-on-surface">選擇尺寸</span>
                <button className="text-on-primary-fixed-variant text-sm underline font-medium">尺寸對照表</button>
              </div>
              <div className="flex gap-3">
                {productData.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-all font-label-md ${
                      selectedSize === s
                        ? "border-on-primary-fixed-variant bg-surface-container-low text-on-primary-fixed-variant font-bold"
                        : "border-surface-variant hover:border-on-primary-fixed-variant"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block font-bold text-on-surface mb-3">數量</span>
              <div className="flex items-center w-32 border-2 border-surface-variant rounded-lg overflow-hidden bg-surface">
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  onClick={() => handleQtyChange(-1)}
                >
                  <span className="material-symbols-outlined text-sm font-bold">remove</span>
                </button>
                <span className="w-12 text-center font-label-md font-bold select-none text-on-surface">
                  {qty}
                </span>
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  onClick={() => handleQtyChange(1)}
                >
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-white border-2 border-on-primary-fixed-variant text-on-primary-fixed-variant py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all active:scale-95 group">
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
                shopping_cart
              </span>
              加入購物車
            </button>
            <Link
              href="/checkout"
              className="flex-1 bg-on-primary-fixed-variant text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-95 shadow-lg shadow-on-primary-fixed-variant/20 text-center"
            >
              立即購買
            </Link>
          </div>
        </div>
      </div>

      {/* Details Tabs */}
      <div className="mt-24">
        <div className="border-b border-surface-variant flex gap-8 mb-stack-lg">
          <button
            onClick={() => setActiveTab("detail")}
            className={`pb-4 font-bold transition-all ${
              activeTab === "detail" ? "text-on-primary-fixed-variant border-b-2 border-on-primary-fixed-variant" : "text-on-surface-variant"
            }`}
          >
            商品詳情
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`pb-4 font-bold transition-all ${
              activeTab === "delivery" ? "text-on-primary-fixed-variant border-b-2 border-on-primary-fixed-variant" : "text-on-surface-variant"
            }`}
          >
            運送政策
          </button>
          <button
            onClick={() => setActiveTab("service")}
            className={`pb-4 font-bold transition-all ${
              activeTab === "service" ? "text-on-primary-fixed-variant border-b-2 border-on-primary-fixed-variant" : "text-on-surface-variant"
            }`}
          >
            售後服務
          </button>
        </div>

        {activeTab === "detail" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-200">
            <div className="lg:col-span-2 space-y-stack-lg">
              <div className="prose prose-on-surface max-w-none">
                <h4 className="text-xl font-bold mb-4">材質與工藝</h4>
                <p className="mb-6">
                  本產品選用優質新疆長絨棉，經過精密梳棉程序，排除雜質與短纖維，確保織物表面細膩平滑。400g/㎡ 的重磅厚度，不僅提供了優異的保暖性能，更能維持洗滌後不易變形的硬挺廓形。
                </p>
                <div className="bg-surface p-stack-lg rounded-2xl border border-surface-variant">
                  <h5 className="font-bold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant">info</span>
                    產品規格
                  </h5>
                  <ul className="space-y-2 font-label-md text-on-surface-variant">
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>面料：</span>
                      <span>100% 重磅純棉</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>版型：</span>
                      <span>寬鬆直筒 (Relaxed Fit)</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>工藝：</span>
                      <span>3D 複合立體電繡</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/50 pb-2">
                      <span>細節：</span>
                      <span>定染色織抽繩、雙層加厚帽兜</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  className="w-full"
                  alt="3D Embroidery detail"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTjW_7xi8Tt8HMgRItPuX-QVROH-P7UJwSQPRKHfMXdcbUC8Puo9t2jUwbVBd3enB_tD2xfbjCO1jDXkAl-QTDQ31rTm3PYSZ95A5CpqI1QuxG4qzBH-dw3h8Uv_KAtz70q8J8LSXq-L-4uLqRbzX_cML9FwIoK3igAxEekyvwdJ4EL4j3DyY4BxRXyC-6gpT8gFjGdTNWNpqsaH_TBqy18TO3WrTWd_EbK-m1_44OF970PfDMAFRwR796kmq3WbD-GOwn1btgMtY"
                />
              </div>
            </div>
            <div className="space-y-stack-lg">
              <div className="bg-surface-container-high p-stack-lg rounded-2xl">
                <h4 className="font-bold mb-4 text-on-primary-fixed-variant">購買須知</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant shrink-0">
                      local_shipping
                    </span>
                    <div className="text-sm">
                      <p className="font-bold">校內取貨免運</p>
                      <p className="text-on-surface-variant">可於學生會辦公室直接領取</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant shrink-0">security</span>
                    <div className="text-sm">
                      <p className="font-bold">正品保證</p>
                      <p className="text-on-surface-variant">學生會官方授權，保證校園正品</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant shrink-0">
                      assignment_return
                    </span>
                    <div className="text-sm">
                      <p className="font-bold">七天鑑賞期</p>
                      <p className="text-on-surface-variant">包裝完整可享退換貨服務</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="bg-surface p-stack-lg rounded-2xl border border-surface-variant animate-in fade-in duration-200">
            <h4 className="text-xl font-bold mb-4">校內取貨說明</h4>
            <p className="mb-4">下單完成後，商品將於 3-5 個工作天內配送至學生會辦公室。屆時您將收到取貨簡訊或 Email 通知，即可憑下單編號至辦公室領取商品。</p>
            <p className="mb-2">取貨時間：每週一至週五 12:00 - 13:30 / 16:30 - 18:00</p>
            <p>取貨地點：學生活動中心 2 樓學生會辦公室</p>
          </div>
        )}

        {activeTab === "service" && (
          <div className="bg-surface p-stack-lg rounded-2xl border border-surface-variant animate-in fade-in duration-200">
            <h4 className="text-xl font-bold mb-4">售後與換貨服務</h4>
            <p className="mb-4">我們提供 7 天的鑑賞期服務。收到商品 7 天內，若尺寸不合或有瑕疵，在吊牌未剪、商品包裝完整且未經洗滌的情況下，均可辦理退換貨。</p>
            <p>若有任何退換貨需求，請與學生會客服信箱聯繫，或直接於取貨時間前來學生會辦公室洽詢。</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <section className="mt-24">
        <div className="flex justify-between items-end mb-stack-lg">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-2xl">
            你可能也喜歡
          </h3>
          <Link className="text-on-primary-fixed-variant flex items-center gap-1 font-bold group" href="/products">
            查看更多{" "}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {recommendations.map((r) => (
            <div key={r.id} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface mb-3 border border-surface-variant relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={r.name}
                  src={r.image}
                />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-fixed-variant">
                    add_shopping_cart
                  </span>
                </button>
              </div>
              <Link href={`/products/${r.id}`} className="font-bold text-on-surface truncate block hover:underline">
                {r.name}
              </Link>
              <p className="text-on-primary-fixed-variant font-bold mt-1">NT$ {r.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
