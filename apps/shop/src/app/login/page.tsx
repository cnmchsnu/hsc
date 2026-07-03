"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { useOneTap, signInWithGoogle } from "@repo/database/auth"; // Import the Google sign-in function


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    document.title = "會員登入 - 學生會商城";
  }, []);


  useOneTap({
    clientId: process.env.GOOGLE_CLIENT_ID!, 
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock login delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`登入成功！\n帳號：${email}`);
    }, 1200);
  };

const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
    } catch (error) {
      console.error('Google login failed:', error)
      alert('登入失敗，請稍後再試')
    } finally {
      setIsLoading(false)
    }
}



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
          <button className="w-full gsi-material-button" onClick={handleGoogleLogin} disabled={isLoading}>
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg version="1.1" viewBox="0 0 48 48" style={{ display: 'block' }}>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Continue with Google</span>
              <span style={{ display: 'none' }}>Continue with Google</span>
            </div>
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
          {/* <div className="mt-8 text-center">
            <p className="font-body-md text-on-surface-variant text-sm">
              還沒有帳號嗎？{" "}
              <Link href="#" className="text-primary-container font-bold hover:underline decoration-2 underline-offset-4">
                立即註冊
              </Link>
            </p>
          </div> */}
        </div>

        {/* Footer Trust Badges */}
        {/* <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">shield</span>
            <span className="text-xs font-semibold">SSL 安全加密</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">school</span>
            <span className="text-xs font-semibold">師大附中學生會認證</span>
          </div>
        </div> */}
      </div>
    </main>
  );
}
