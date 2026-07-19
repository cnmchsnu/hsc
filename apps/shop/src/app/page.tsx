import { getProductSummariesByCategory } from "@repo/commerce/server";

import { Suspense } from "react";

import {
  HeroSection,
  BentoCTA,
  FeaturedProducts,
  PromoProducts,
} from "./components/home"

export default async function Home() {
  const [promoProducts, featuredProducts] = await Promise.all([
    getProductSummariesByCategory("Promo"),
    getProductSummariesByCategory("Featured"),
  ]);
  

  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      {/* LTO Section */}
      <Suspense fallback={<span className="text-on-surface-variant text-center">Loading LTO Products...</span>}>
        <section className="py-stack-lg bg-surface">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <PromoProducts promoProducts={promoProducts} />
          </div>
        </section>
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={<span className="text-on-surface-variant text-center">Loading Featured Products...</span>}>
        <FeaturedProducts featuredProducts={featuredProducts} />
      </Suspense>

      {/* Bento CTA */}
      <BentoCTA/>
    </div>
  );
}
