import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@repo/auth/server";

interface Countdown {
  hours: string;
  minutes: string;
  seconds: string;
}

export default async function Home() {

    const currentUser = await getCurrentUser();

    console.log(currentUser);


  const [countdown, setCountdown] = useState<Countdown>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(23, 59, 59, 999);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const promoProducts = [
    {
      id: 101,
      name: "77週年紀念飛行夾克",
      description: "經典藍紅配色，加厚內襯",
      price: 1280,
      originalPrice: 1600,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGTZ7HivE5kJd6ek73oHm0XZOTq1UUxLzXcZIuvwpsFnw7C8DMyo4p3vqnRWeFC3ppqiSMkxdRZ3ldGQEhFydxI6tFi0ZqrqndvzqsS_KlYesbwfY9EElnYXgA8UtxdHiJVRndakMkgBFzhUqYQN80YyAHiIiGp3LyfFnAFXweeNWZkpxyaWayWe3KEjuAaY0GZLyngDfmFpZeo_XcrrGU_iHA2tCNjNLqKJGtDdy7EDw7QUTRI4X9l6t9Ss051OSN-_oOovf_fEo",
      discount: "20% OFF",
      progress: 65,
      remaining: 12,
    },
    {
      id: 102,
      name: "附中魂。感溫陶瓷杯",
      description: "倒入熱水隨即變色",
      price: 299,
      originalPrice: 350,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB52bQFVZOHWqiPbgB6tGFbEfZ8sPf19Opf-QqAZ7NnMKzVLYd-LYyc9p8YSDHSy0sGZhlVxOebh4ej0sHaKTmm7gZz2y0A71Cc4Y0f7t6qfA7LEZDbFAZpdK5Cmm8tTt5lYmEbRBLiZFW3GGCiOmLTAfJsWyBu0bOhwD4vm1ONf24i_NxwGfmo_5W5Ns1Vy3fmQnemboAthbiAaAWPqRJ-RZtmS4plCKm_mPlAKhx_Vik0whjzDNcAB6-n4fBp8HTpqyeDpRpJAL0",
      discount: "15% OFF",
      progress: 88,
      remaining: 3,
    },
    {
      id: 103,
      name: "社團聯名紀念胸章組",
      description: "一組四入，精緻鋅合金",
      price: 150,
      originalPrice: 220,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTvkv0L79gvfmmpxlze4BpUmwRXBH1BkamEy3hNxEW-9NgtiPuVmwNp8VxLhcCRFgS0Al2mCP27n4Rm0dTxzjwH_xyp_5sQ5b_toZfRPpMEBSUXqMkEmiYAUh5DxIDGWOvMceY4uLfpHtAYSMld7nVAy012roG1zbSJi6itHbiAe3eNQAMJaZiTsCzqvxFpakDX-AhiXwwjGy6obtBdB_fQPK6JgkMDsqUqTYYD3yzvdMgNwOFwN0zjxZcfUoYFGW5Ojz3HDorJpM",
      discount: "HOT",
      progress: 40,
      remaining: 45,
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "經典校徽 100% 純棉 Tee",
      category: "Apparel",
      description: "採用極致柔軟長絨棉，透氣吸汗，夏日校園必備單品。",
      price: 450,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNYtjC2rbEOdSqPLQYTjs8gTwY0che453f5wsari92VYfD16rPuYMjJViNH38mDpy4QpTy0S3iR7pkYpd1YKRBPz8DQzOHRVbewivvuVN3QJLbbmNfoPu95NbVcdLWEEKXDDhWbPqbkS6NV6sH-mWjEvS4wNAmR7U4RqAk32WzNTD-J3dSiUoiZKq0E2EPOqzvizHqXEMUeDifo_Lcj4rlE6LUItG9kMBTlc0S2_3oSq75314rGXlySBCHDdcm_TIega6uBlX9j8g",
    },
    {
      id: 2,
      name: "Pro 極簡機能防潑水後背包",
      category: "Accessories",
      description: "內置 15.6 吋筆電隔層，多口袋設計方便收納各類文具。",
      price: 1150,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRMV_rZn8lMHXqiFx1erkPWB7BERr8iNdFMy11A6OBm5HZPiFZJ88MiWH6D7K9uL5YFc5XxuPStagCdpXm-DowvhLAJD8CMqwt91wDs0d2PVKkeyGE2xntlpLr8TLCuVCH5PUqZ1sNPzrnHoCwTJWreAL9JpubQtgUXQNGiPs9bU9ohZym6d5YkpiAf-JdEt9ka6GX1ovxCDio-r7-qqjNjSEug62lv50i_orl0P44GMH1uPj-wOK3ttawOqaHkAlcVJUFFfXFnz4",
    },
    {
      id: 3,
      name: "職人手感。精裝筆記本套組",
      category: "Stationery",
      description: "進口米色道林紙，書寫不透墨，附贈 brand 特製原子筆。",
      price: 380,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6nIuUWTYJ0v1jU7Dv8eYUikZGqaMFlijJP2liq9zuPS8r7chUyYtvokdGHQXKhZR02W1QDxcLntB05vH7aI1_YnUmqcX2_uOcHPv9vRvRQxOGF3YvKXLf5udTgRU-PQQMTgH5sQw7kPUP80aZkS-Bi3_YF-DtdPTLqal-YpYPNRM4Mtv0oQPnlsvqQXI9Ni4pAF3UGx-plynfXiF0cODAvIEFxnatC2S52LLXmau1R-aDikBvJ0kjbPtEe-8Z52trZnCJvqDgA24",
    },
    {
      id: 4,
      name: "極簡主義不鏽鋼保溫瓶",
      category: "Lifestyle",
      description: "12小時長效保溫保冷，輕量化設計，隨時補充水分。",
      price: 590,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDidmLD_uVCLsBCy1pxB0HLL_9seNI7FgHA7FuMor89Hv4LHnhDLtfbNzsQRqs_wBT22Nj8quIq-jBxpOeUOAcq4zXWEshq7aFYrrNeyIMbdoST0JAr9L1dVUb80AfvhvIiiQmvX-KFz1k9g8hQiJZ6vbq16U4kMR6I-wuuhbNK5qaDrpO0URrQzOzLP4HOprcRPzjczSVuepywA9gtjnj5vJO2tIkrcjVvltpfz8nhxfQMGTEhgj2i1m_n6xZMDctNoMbtp4NP7LI",
    },
  ];

  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/85 to-transparent"></div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
          <div className="space-y-stack-lg">
            <div className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm tracking-wider">
              NEW COLLECTION 2024
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-display-lg font-display-lg text-on-primary leading-tight font-bold">
              承載附中靈魂<br />
              <span className="text-secondary-fixed">展現青春活力</span>
            </h1>
            <p className="text-body-lg font-body-lg text-primary-fixed max-w-md">
              探索師大附中學生會專屬週邊，從經典帽T到限量紀念品。我們將傳統精神轉化為現代潮流，讓榮耀穿在身上。
            </p>
            <div className="flex gap-gutter pt-4">
              <Link
                href="/products"
                className="px-6 py-3 md:px-8 md:py-4 bg-on-primary text-primary font-bold rounded-xl hover:bg-surface-container-lowest hover:scale-105 transition-all shadow-lg flex items-center gap-2"
              >
                立即選購 <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <button className="px-6 py-3 md:px-8 md:py-4 border-2 border-on-primary text-on-primary font-bold rounded-xl hover:bg-white/10 transition-all">
                品牌故事
              </button>
            </div>
          </div>
          <div className="hidden lg:block h-[500px] relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              className="w-full h-full object-cover"
              alt="HSNU student association merchandise"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqUWvtAQ8jwpDacLRDjKfXif3YgpNgHPdV81_XHLRmFFpiA87kSaV_KSRI-yd9gT4LLW8dnrMhjeXZ8UHFc-l9e74ARxAyWhMPlB5yNqCwzU2JPLs9Y41AqPedNIXUo-AF0qKRCasIvRyxwVWCF8aCj62lyxVLJU2rMTzdAYvCoU5gN9g_uGyjAPb2MXx-WhYuiPWAmxpHenVfxkRTM3_P1Oq12ahXVAJWkor__nJaqL4Q6ZjaWrvet9Wzc3nBXywFB0qiVaKiIg4"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl"></div>
          </div>
        </div>
      </section>

      {/* LTO Section */}
      <section className="py-stack-lg bg-surface">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-gutter">
            <div className="space-y-2">
              <h2 className="text-headline-lg font-headline-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                  timer
                </span>
                限時閃購倒數
              </h2>
              <p className="text-on-surface-variant">別錯過本週的專屬學生會員折扣！</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="flex gap-2">
                <div className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-headline-md min-w-[60px] text-center shadow-md">
                  {countdown.hours}
                </div>
                <div className="text-primary text-headline-md flex items-center">:</div>
                <div className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-headline-md min-w-[60px] text-center shadow-md">
                  {countdown.minutes}
                </div>
                <div className="text-primary text-headline-md flex items-center">:</div>
                <div className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-headline-md min-w-[60px] text-center shadow-md">
                  {countdown.seconds}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {promoProducts.map((p) => (
              <div
                key={p.id}
                className="product-card bg-background rounded-xl overflow-hidden border border-outline-variant group flex flex-row h-48"
              >
                <div className="w-2/5 relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={p.name}
                    src={p.image}
                  />
                  <div className="absolute top-2 left-2 bg-error text-white text-[10px] px-2 py-1 rounded-full font-bold">
                    {p.discount}
                  </div>
                </div>
                <div className="w-3/5 p-stack-md flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${p.id}`} className="font-bold text-lg text-primary line-clamp-1 hover:underline">
                      {p.name}
                    </Link>
                    <p className="text-on-surface-variant text-sm mt-1">{p.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lto-timer font-bold text-xl">${p.price}</span>
                      <span className="text-on-surface-variant text-xs line-through">${p.originalPrice}</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-lto-timer" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <p className="text-[10px] text-on-surface-variant">僅剩 {p.remaining} 件可供選購</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-stack-lg bg-background">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center justify-between mb-gutter">
            <h2 className="text-headline-lg font-headline-lg text-primary">精選商品</h2>
            <Link className="text-primary font-medium flex items-center gap-1 hover:underline text-sm" href="/products">
              查看全部 <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="product-card bg-surface rounded-xl overflow-hidden border border-outline-variant flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-white">
                  <img className="w-full h-full object-cover" alt={p.name} src={p.image} />
                  <button className="absolute top-3 right-3 w-10 h-10 bg-white/80 glass-effect rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-white transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-stack-md flex flex-col flex-grow">
                  <div className="flex-grow">
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest">
                      {p.category}
                    </span>
                    <Link href={`/products/${p.id}`} className="block font-bold text-primary mt-1 hover:underline">
                      {p.name}
                    </Link>
                    <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-outline-variant flex items-center justify-between">
                    <span className="text-headline-md font-bold text-primary">${p.price}</span>
                    <button className="p-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento CTA */}
      <section className="py-stack-lg bg-surface">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bento-grid">
          <div className="col-span-12 md:col-span-8 bg-primary rounded-3xl p-stack-lg flex flex-col justify-center text-on-primary min-h-[300px] relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-lg">
              <h2 className="text-3xl md:text-headline-lg font-headline-lg mb-4 font-bold">
                加入特約會員
                <br />
                享全館 9 折優惠
              </h2>
              <p className="text-primary-fixed mb-8">
                驗證師大附中學生信箱，即可立即升等為特約會員，參與專屬預購活動與積點回饋。
              </p>
              <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 text-sm w-fit">
                立即驗證身份 <span className="material-symbols-outlined">verified_user</span>
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-surface-container-high rounded-3xl p-stack-lg flex flex-col justify-center items-center text-center shadow-md border border-outline-variant relative overflow-hidden">
            <span className="material-symbols-outlined text-6xl text-primary mb-4">local_shipping</span>
            <h3 className="font-bold text-primary text-xl mb-2">校內取貨免運費</h3>
            <p className="text-on-surface-variant text-sm">線上訂購，可至學生會辦公室直接領取，省去運費更快速。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
