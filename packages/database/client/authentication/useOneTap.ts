'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '../browser'

declare global {
  interface Window {
    google?: any
  }
}

interface UseOneTapOptions {
  clientId: string
  parentButtonId?: string
}

export function useOneTap({ clientId, parentButtonId }: UseOneTapOptions) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const isInitializingRef = useRef<boolean>(false)

  useEffect(() => {
    let isMounted = true

    const initOneTap = async () => {
      // 🛡️ 實體鎖，防止 React 開發環境雙重觸發
      if (isInitializingRef.current || (window as any).__google_one_tap_active) {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt()
        }
        return
      }

      isInitializingRef.current = true
      console.log('⚡ [OneTap] 啟動全新不跳頁、免 Nonce 安全驗證引擎...')

      // 載入 Google 腳本
      let script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]') as HTMLScriptElement
      if (!script) {
        script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }

      const handleScriptLoad = () => {
        if (!window.google || !isMounted) {
          isInitializingRef.current = false
          return
        }

        // 🚀 順應 Chrome：完全開啟 FedCM，並且「絕對不要傳入 nonce」
        // 當完全不碰 nonce 時，Google 就會改用通道簽章驗證，徹底避開 403 與 400 Mismatch 錯誤！
        window.google.accounts.id.initialize({
          client_id: clientId,
          use_fedcm_for_button: true,
          use_fedcm_for_prompt: true, // 🔥 必須開啟，讓 Chrome 滿意，403 就會消失
          context: 'signin',
          itp_support: true,
          callback: async (response: any) => {
            try {
              console.log('🔑 [OneTap] 成功獲取 Google 憑證，正在原地登入 Supabase...')
              
              // 🚀 這裡不要傳 nonce 屬性！
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential, // 👈 只傳 Token
              })

              if (error) throw error

              console.log('🎉 [OneTap] 原地秒登入成功！')

              // 清理全域標記
              delete (window as any).__google_one_tap_active
              window.google?.accounts?.id?.cancel()
              
              // 原地單頁重新整理狀態，達成不跳頁秒登入
              router.refresh()
            } catch (err) {
              console.error('❌ [OneTap] 原地秒登入失敗:', err)
              isInitializingRef.current = false
            }
          }
        });

        (window as any).__google_one_tap_active = true

        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.warn('⚠️ [OneTap] 視窗未顯示原因:', notification.getNotDisplayedReason())
            isInitializingRef.current = false
          }
        })
      }

      if (window.google?.accounts?.id) {
        handleScriptLoad()
      } else {
        script.addEventListener('load', handleScriptLoad)
      }
    }

    initOneTap()

    return () => {
      isMounted = false
    }
  }, [clientId, router, supabase.auth]) 
}