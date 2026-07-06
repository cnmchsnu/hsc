import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  // ⭕ 把讀取變數的邏輯移到函式內部
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // 加上防禦型檢查，如果真的沒抓到，能精準回報是哪個值漏了
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      `[Supabase] 瀏覽器客戶端初始化失敗。URL: ${!!supabaseUrl}, Key: ${!!supabaseKey}`
    );
  }

  return createSSRBrowserClient(
    supabaseUrl,
    supabaseKey
  );
};