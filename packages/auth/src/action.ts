import { createClient } from './browser'

export const signInWithGoogle = async (redirectTo?: string) => {
  const supabase = createClient()
  
  // 動態取得當前的 origin，如果是 Server 端則由外部傳入
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const callbackUrl = `${origin}/auth/callback`

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

  if (error) throw error
  return data
}