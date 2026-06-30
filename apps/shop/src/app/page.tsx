import { getCurrentUser } from "@repo/auth/server";

import {
  HeroSection,
  BentoCTA,
  FeaturedProducts,
  PromoProducts,
  PromoCountdown
} from "./components/home"

interface Countdown {
  hours: string;
  minutes: string;
  seconds: string;
}

export default async function Home() {

    const currentUser = await getCurrentUser();

    console.log(currentUser);


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
