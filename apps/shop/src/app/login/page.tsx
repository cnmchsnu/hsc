"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "會員登入 - 學生會商城";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock login delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`登入成功！\n帳號：${email}`);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    alert("正在重導向至 Google 帳號登入系統...");
  };

  return (
    <main className="min-h-[calc(100vh-64px-180px)] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-background">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container opacity-[0.03] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary-container opacity-[0.05] rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-[480px] z-10">
        {/* Login Card */}
        <div 
          className="border border-outline-variant rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,233,230,0.3) 100%)",
          }}
        >
          {/* Card Header */}
          <div className="text-center mb-8">
            <h1 className="font-headline-lg text-3xl font-extrabold text-primary-container mb-2">會員登入</h1>
            <p className="text-on-surface-variant font-body-md">歡迎回來！請登入您的帳號以繼續購物。</p>
          </div>

          {/* Primary Action: Google Login */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-outline text-on-surface font-semibold text-sm py-3 px-6 rounded-xl hover:bg-surface-container-low transition-all duration-200 hover:scale-[1.01] active:scale-95 shadow-sm cursor-pointer"
          >
            <img 
              alt="Google Logo" 
              className="w-5 h-5" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHev9JhEVilBgfOPZty1PnnierN-iPR_vtocFT55p8-xQT43E3adVkGNCYIrK-JCnLOfgql_YVzK6x4aW42pm2w8kABMYFxqfBWgewmqjQOmQoV7y1yja-oMBzmoSLjPY_bQLOmMHMMPt8w4fPEEnKUdrfvJ9KqNwJapviGkQ-s02I_7urr9aY36AF2cgSgmyNbcf1QxkHVrGrJLcF9470EP_EjpoG4mFCFBCXE2W0Wx_fucHsrMHhcHeLEJLgg_v1j6hMW8-6Vdo"
            />
            <span>使用 Google 帳號登入</span>
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-outline-variant"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FAF7F6] px-4 text-on-surface-variant font-medium">或使用電子郵件</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="email">
                電子郵件 / 學號
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s112345@gs.hsnu.edu.tw"
                className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all placeholder:text-outline/70"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-on-surface" htmlFor="password">
                  密碼
                </label>
                <Link href="#" className="text-xs font-semibold text-primary-container hover:underline">
                  忘記密碼？
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="請輸入您的密碼"
                  className="w-full bg-surface-bright border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all placeholder:text-outline/70 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary-container flex items-center justify-center p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-container hover:bg-primary text-white font-semibold text-base py-3.5 rounded-xl shadow-sm hover:shadow-md hover:brightness-110 active:scale-98 transition-all duration-200 mt-4 h-auto cursor-pointer"
            >
              {isSubmitting ? "登入中..." : "登入"}
            </Button>
          </form>

          {/* Navigation for registration */}
          <div className="mt-8 text-center">
            <p className="font-body-md text-on-surface-variant text-sm">
              還沒有帳號嗎？{" "}
              <Link href="#" className="text-primary-container font-bold hover:underline decoration-2 underline-offset-4">
                立即註冊
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">shield</span>
            <span className="text-xs font-semibold">SSL 安全加密</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">school</span>
            <span className="text-xs font-semibold">師大附中學生會認證</span>
          </div>
        </div>
      </div>
    </main>
  );
}
