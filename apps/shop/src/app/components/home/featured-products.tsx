import Link from "next/link";


export function FeaturedProducts() {

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
  );

}