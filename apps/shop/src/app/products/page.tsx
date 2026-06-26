"use client";

import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  rating: number;
  image: string;
  isLimited?: boolean;
}

export default function ProductList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Stationery"]);
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>("最新上架");

  const categories = [
    { id: "Apparel", name: "服飾類" },
    { id: "Stationery", name: "文具類" },
    { id: "Accessories", name: "配件飾品" },
    { id: "Souvenirs", name: "校園紀念" },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "HSNU 經典精裝筆記本",
      category: "Stationery",
      categoryName: "文具類",
      price: 350,
      rating: 4.9,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz5bhD-2aWjrgEc3vOPfYYhpzVefQ5l51Nb_oFJnJFpF2qcMYRQOU7cSlA4BxKBX7muoP2IcVdyeU1-b5uiEgUcY9JsF9Z5cn-PLf35CxNPULKHKywFuGQhOTZS57KMmJs5h0-PGuDVp6wy_QqJ07BVC73C4vIoGmyJ5YicYJxMLmLgSWzKBayx_vof-pjHusuyhJXUx3EhO_NGUX3dag41V5PzKLlTrv1medSU4g3pLuQ-Xb_5zsVP01u5VB7X4JldQPlZyoCZeI",
    },
    {
      id: 2,
      name: "限量版校友鋼珠筆組",
      category: "Stationery",
      categoryName: "文具類",
      price: 880,
      rating: 5.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTE4sc-YU0Dpt9AtGfCNFrPrT6E6jNnqU0JJrtLrBQWzDlGnIlcTmzHjwr-7HJlY0510sVJHzoLkC4aJlrv2kwcHCBIUem3037cIxyrlMhVrQ_Lowm_3JZMtHTkiM7UuF4ZmyRsrs_At4gAT1Fur5YR0Mafe9Fm2zzTKDxNYtlppDXolDr6c_EZbAFREJ2EyGAvYu3omdq8Ax-wgNaYPGYYmGNjXVIHmhspWG4FGnSwpxXfVybYVcfWWq2cX1BYjNOpKBra2PZN-k",
      isLimited: true,
    },
    {
      id: 3,
      name: "質感磨砂隨行杯",
      category: "Souvenirs",
      categoryName: "校園紀念",
      price: 420,
      rating: 4.7,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtNucimxOjhPfFBh7MnQnQSp0em-c7rWPDv8t_O_LsikhttfyzfO6VJgJlXfRX4T-Wxd6EwZQSGE4BvL4h8GcnUrPEzpWy0Bu2dPZjCoxjbuTH-94tVHeRIztq774xjV8lgAlp5kFr24ylEGJomJzh10JDGHopfKx1osI-h7Zh8u8Ogp5A6Dw64a1YG9M5ic9q3JXrEtTTj9KsvkCpeoO5RTUYJC6hbaBNH0Nu0wgEeWmOhSFhDEc6kjDA14p3bHJwOkg6XM4ctqw",
    },
    {
      id: 4,
      name: "校園生活機能後背包",
      category: "Accessories",
      categoryName: "配件飾品",
      price: 1280,
      rating: 4.8,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvNEwEDBIyiO-pkxOxU2_yhcZx8-DRJRvGGCjlo3gAV-VBIr6V8leeC-jEp6SQ6ccyGp1rNi1V4eb9HyfYx-PtlL53K8dQUuQ-NBrRYTvmF5GQIOHrW8yPVTwQkfe61BdrlYuBDOK1eqJNKTMKK4pj-ECVQnIxwcGCruyEJxamN0RQLWh0c83htzlfKeqrfMzYiPDl_D4bqneUtD5L3N9PqpT-RSA0UWKGfzGxuHlXcGZ_kDvxR8ytch4xT8U8XMW30vWfAA9ud-8",
    },
    {
      id: 5,
      name: "原創插畫防水貼紙包",
      category: "Stationery",
      categoryName: "文具類",
      price: 150,
      rating: 4.9,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_1behlWhUa6txG7BgeiDC_-Bg4Dh0q52mFJFnimuqlHWBQ_Q4g7PDuJVVpSDr7eHSPI0JDXbkA2vHjj0r4h0835p4GDySvF-8Dy1wswRoSf-WvcU412XlYWje_2dM45r2O5N8R8wKqp9juHWGaToFhXx25WDQ8F0uPReigmM3NPCay74WwrFXbVfgQiw0ynl_LFeZNvV96Qmmi1xrUONpHi1O_aANXbZg19bvHlC6yhdK6WVfMvMHa4ToZ_VdmT9pC2RyVRZqxDA",
    },
    {
      id: 6,
      name: "精緻校徽金屬鑰匙圈",
      category: "Accessories",
      categoryName: "配件飾品",
      price: 180,
      rating: 4.6,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBomfwuJsgFvlmc5skR0UAx_4rl0CBw4v7-h4mNa5reTjLJhIL3zrDZrnnuhasK1SvvWa1HXLYyISJ-sQrv4oKZzs8zgNOMTEImz4tgw1g-PYhcK0TpM_HiTUBYE2iHS-6TricZugc5sGNEhnfA-jOEtywjXEITn19Xbw059T8OgA8LS1qzL7gnKfrlYRMLu9ZMcSfd_5cj4BGnD_2osJopxmhwPHGp8_wSV6bzbaSEAO_8tYJXGfPO0Aw8BV1LRbo4mg4ACPcNuIs",
    },
    {
      id: 7,
      name: "經典校徽 100% 純棉 Tee",
      category: "Apparel",
      categoryName: "服飾類",
      price: 450,
      rating: 4.9,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNYtjC2rbEOdSqPLQYTjs8gTwY0che453f5wsari92VYfD16rPuYMjJViNH38mDpy4QpTy0S3iR7pkYpd1YKRBPz8DQzOHRVbewivvuVN3QJLbbmNfoPu95NbVcdLWEEKXDDhWbPqbkS6NV6sH-mWjEvS4wNAmR7U4RqAk32WzNTD-J3dSiUoiZKq0E2EPOqzvizHqXEMUeDifo_Lcj4rlE6LUItG9kMBTlc0S2_3oSq75314rGXlySBCHDdcm_TIega6uBlX9j8g",
    },
  ];

  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Filter
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesPrice = p.price <= priceRange;
    return matchesCategory && matchesPrice;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "價格：由低到高") return a.price - b.price;
    if (sortBy === "價格：由高到低") return b.price - a.price;
    if (sortBy === "熱門程度") return b.rating - a.rating;
    return b.id - a.id; // default Latest
  });

  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">
      {/* Left Sidebar Filter */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-stack-lg bg-surface p-stack-lg rounded-xl border border-surface-variant shadow-sm">
          {/* Category Section */}
          <div>
            <h3 className="font-headline-md text-[18px] text-on-surface font-bold mb-4">商品分類</h3>
            <ul className="space-y-stack-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(c.id)}
                      onChange={() => handleCategoryChange(c.id)}
                      className="w-5 h-5 rounded border-outline text-on-primary-fixed-variant focus:ring-on-primary-fixed-variant"
                    />
                    <span
                      className={`font-body-md transition-colors ${
                        selectedCategories.includes(c.id)
                          ? "text-on-primary-fixed-variant font-medium"
                          : "text-on-surface-variant group-hover:text-on-primary-fixed-variant"
                      }`}
                    >
                      {c.name} ({c.id})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="pt-stack-md border-t border-surface-variant">
            <h3 className="font-headline-md text-[18px] text-on-surface font-bold mb-4">價格範圍</h3>
            <div className="space-y-4">
              <input
                className="w-full accent-on-primary-fixed-variant cursor-pointer"
                max="2000"
                min="0"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                type="range"
              />
              <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
                <span>NT$ 0</span>
                <span className="font-bold text-on-primary-fixed-variant">NT$ {priceRange.toLocaleString()}+</span>
              </div>
            </div>
          </div>

          {/* Promo Banner in Sidebar */}
          <div className="rounded-lg bg-on-primary-fixed-variant p-4 text-on-primary relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-label-sm font-label-sm opacity-80 mb-1">年度限定</p>
              <h4 className="font-headline-md text-[20px] font-bold mb-2">會員專屬 85 折</h4>
              <button className="bg-white text-on-primary-fixed-variant px-4 py-1 rounded-full font-label-sm text-label-sm hover:scale-105 transition-transform active:scale-95">
                立即升級
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Product Grid Area */}
      <div className="flex-grow">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg gap-stack-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold text-3xl">探索所有商品</h2>
            <p className="font-body-md text-on-surface-variant mt-1">
              共有 {sortedProducts.length} 件符合條件的商品
            </p>
          </div>
          <div className="flex items-center gap-stack-md self-end sm:self-auto">
            <span className="text-label-sm font-label-sm text-on-surface-variant whitespace-nowrap">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-surface-variant rounded-lg px-3 py-2 text-body-md focus:ring-on-primary-fixed-variant focus:border-on-primary-fixed-variant min-w-[160px] outline-none"
            >
              <option>最新上架</option>
              <option>價格：由低到高</option>
              <option>價格：由高到低</option>
              <option>熱門程度</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {sortedProducts.map((p) => (
            <div
              key={p.id}
              className="product-card group bg-surface border border-surface-variant rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-on-primary-container/10 hover:-translate-y-1 relative"
            >
              <button className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-on-primary-fixed-variant hover:bg-on-primary-fixed-variant hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px]">favorite</span>
              </button>
              <div className="aspect-square relative overflow-hidden bg-surface-variant">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={p.name}
                  src={p.image}
                />
                <div className="quick-add absolute bottom-0 left-0 w-full p-4 transform translate-y-full opacity-0 transition-all duration-300">
                  <button className="w-full bg-on-primary-fixed-variant text-on-primary py-2 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 shadow-lg active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                    快速加入
                  </button>
                </div>
                {p.isLimited && (
                  <div className="absolute top-3 left-3 bg-lto-timer text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    LIMITED
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-label-sm font-label-sm text-on-primary-fixed-variant uppercase tracking-wider mb-1 block">
                  {p.categoryName}
                </span>
                <Link href={`/products/${p.id}`} className="font-bold text-lg text-on-surface mb-2 line-clamp-1 block hover:underline">
                  {p.name}
                </Link>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-headline-md text-on-primary-fixed-variant font-bold">
                    NT$ {p.price}
                  </span>
                  <div className="flex items-center gap-1 text-secondary">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-label-sm font-label-sm">{p.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
