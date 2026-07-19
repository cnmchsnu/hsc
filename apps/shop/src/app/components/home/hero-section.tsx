import Link from "next/link";
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
    
    return (
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
                立即選購 <ChevronRight size={20} />
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
    );
}