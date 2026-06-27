'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from './browser'

interface UseOneTapOptions {
  clientId: string // Google Cloud Console 的 Client ID
  parentButtonId?: string // 自訂的 Google 登入按鈕 ID (非必填，但留著彈性大)
}

export function useOneTap({ clientId, parentButtonId }: UseOneTapOptions) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // 1. 載入 Google Identity Services 腳本
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      if (!window.google) return

      // 2. 初始化 Google 一鍵登入
      window.google.accounts.id.initialize({
        client_id: clientId,
        use_fedcm: true,
        callback: async (response) => {
          try {
            // 3. 收到 Google 的 id_token 後，送去給 Supabase 驗證
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.credential,
            })

            if (error) throw error

            // 4. 登入成功，重新整理或導向首頁
            router.refresh()
          } catch (err) {
            console.error('One Tap 登入失敗:', err)
          }
        },
        // 可選：如果你想要防止使用者關閉後短時間內重複彈出，可以使用這個
        cancel_on_tap_outside: false, 
      })

      // 4. 觸發 One Tap 彈出視窗
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log('One Tap 未顯示原因:', notification.getNotDisplayedReason())
        }
      })

      // (可選) 如果你有傳統的 Google 登入按鈕，也可以順便綁定官方樣式
      if (parentButtonId) {
        const buttonEl = document.getElementById(parentButtonId)
        if (buttonEl) {
          window.google.accounts.id.renderButton(buttonEl, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
          })
        }
      }
    }

    return () => {
      // 畫面銷毀時清理腳本與視窗
      script.remove()
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel()
      }
    }
  }, [clientId, parentButtonId, router, supabase.auth])
}