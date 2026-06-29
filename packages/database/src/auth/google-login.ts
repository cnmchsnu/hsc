import { createBrowserClient } from '../client/browser'

export const signInWithGoogle = async (redirectTo?: string) => {
  const supabase = createBrowserClient()
  
  // 動態取得當前的 origin，如果是 Server 端則由外部傳入
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const callbackUrl = `${origin}/auth/callback`
  try{ 
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo || callbackUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
    },
  })

  if (error) {
    console.error("OAuth Error", error);
    console.error(JSON.stringify(error, null, 2));
    throw error;
  }

  return data

  }catch (error) {
    console.error(error);
    throw error;
  }
  
}

export const signOut = async () => {
  const supabase = createBrowserClient()
  
  // 呼叫 Supabase 登出，這會同時：
  // 1. 通知 Supabase Auth 伺服器該存取權杖 (Access Token) 已失效
  // 2. 清除瀏覽器 LocalStorage/Cookie 中的會話状态
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw error
  }

  
}

export const getUser = async () => {
  const supabase = createBrowserClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) return null

  // 從 Google 的 meta_data 中解構出我們需要的資料
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name,
    avatar: user.user_metadata?.avatar_url,
  }
}

