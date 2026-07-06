'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '../browser'

declare global {
  interface Window {
    google?: any
  }
}


async function generateNonce() {
  const encdoer = new TextEncoder()
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  const data = array.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')

  const hashBuffer = await crypto.subtle.digest('SHA-256', encdoer.encode(data))
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

interface UseOneTapOptions {
  clientId: string // Google Cloud Console 的 Client ID
  parentButtonId?: string // 自訂的 Google 登入按鈕 ID (非必填，但留著彈性大)
}

export function useOneTap({ clientId, parentButtonId }: UseOneTapOptions) {
  const router = useRouter()
  const supabase = createBrowserClient()

  const nonceref = useRef<string>('')

  useEffect(() => {
    let isMounted = true
    const initOneTap = async() => {

      if (!nonceref.current) {
        nonceref.current = await generateNonce()
      }
      const currentNonce = nonceref.current
      
      // 1. 載入 Google Identity Services 腳本
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      const handleScriptLoad = () => {
        if (!window.google || !isMounted) return

        if ((window as any).__google_one_tap_initialized) {
          // 如果已經初始化過了，我們直接彈出視窗即可，不要重新 initialize
          window.google.accounts.id.prompt()
          return
        }
        
        // 2. 初始化 Google 一鍵登入
        window.google.accounts.id.initialize({
          client_id: clientId,
          use_fedcm: true,
          use_fedcm_for_button: true,
          use_fedcm_for_prompt: true,
          nonce: currentNonce,
          callback: async (response: any) => {
            try {
              // 3. 收到 Google 的 id_token 後，送去給 Supabase 驗證
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
                nonce: currentNonce
              })

              if (error) throw error
              // 登入成功後重置全域狀態，方便下次可能還需要登入
              delete (window as any).__google_one_tap_initialized
              window.google?.accounts?.id?.cancel()

              // 4. 登入成功，重新整理或導向首頁
              window.location.href = '/'
            } catch (err) {
              console.error('One Tap 登入失敗:', err)
            }
          },
          // 可選：如果你想要防止使用者關閉後短時間內重複彈出，可以使用這個
          cancel_on_tap_outside: false, 
        }),

        // 標記為已初始化
        (window as any).__google_one_tap_initialized = true
        // 4. 觸發 One Tap 彈出視窗
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.log('One Tap 未顯示原因:', notification.getNotDisplayedReason())
          }
        })
      }

      if (window.google) {
        handleScriptLoad()
      } else {
        script.addEventListener('load', handleScriptLoad)
      }

    }

    initOneTap()

    return () => {
      // 畫面銷毀時清理腳本與視窗
      isMounted = false
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel()
      }
    }
  }, [clientId, parentButtonId, router, supabase.auth])
}