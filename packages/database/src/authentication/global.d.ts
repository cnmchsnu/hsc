// packages/auth/src/global.d.ts

import 'google.accounts'

declare global {
  interface Window {
    // 讓 TypeScript 知道 window.google 的存在與結構
    google?: typeof google
  }
}