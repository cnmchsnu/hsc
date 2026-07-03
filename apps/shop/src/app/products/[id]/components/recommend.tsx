import Link from "next/link";

export function Recommendations() {
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
  )
}