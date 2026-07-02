import {
  HeroSection,
  BentoCTA,
  FeaturedProducts,
  PromoProducts,
  PromoCountdown
} from "./components/home"

export default async function Home() {

  console.log("CHECK ENV:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      {/* LTO Section */}
      <section className="py-stack-lg bg-surface">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <PromoCountdown />
          <PromoProducts />
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Bento CTA */}
      <BentoCTA/>
    </div>
  );
}
