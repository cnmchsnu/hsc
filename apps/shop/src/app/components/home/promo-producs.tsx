import Link from "next/link";

export function PromoProducts() {
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

  return (
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
  );
}