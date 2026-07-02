import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // next 參數可以用來支持登入後跳轉到指定頁面（例如：/dashboard）
  const next = searchParams.get('next') ?? '/' 

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Server Component 有時會限制 set cookie，這裡防禦性 catch
            }
          },
        },
      }
    )
    
    // 關鍵：用 code 交換 session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 如果失敗，導向錯誤頁面或首頁
  return NextResponse.redirect(`${origin}/auth/auth-error`)
}