import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr'

export const createBrowserClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 防禦性檢查：沒讀到時在控制台警告，而不是直接炸掉
  if (!url || !anonKey) {
    console.error('❌ Supabase 環境變數遺失！請檢查 .env.local 是否正確放進 apps/shop 目錄下。')
    // 回傳一個空的或 mock client，避免前端整頁白畫面
    return createSSRBrowserClient('https://placeholder.supabase.co', 'placeholder')
  }

  return createSSRBrowserClient(url, anonKey)
}

