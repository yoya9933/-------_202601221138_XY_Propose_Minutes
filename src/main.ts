import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { isSupabaseConfigured } from '@/lib/supabase'

// 相容舊連結：將非 hash 路徑導向 hash 路由
// 例如：https://sharegift.tw/admin -> https://sharegift.tw/#/admin
if (!window.location.hash && window.location.pathname !== '/') {
  const redirectUrl = `${window.location.origin}/#${window.location.pathname}${window.location.search}`
  window.location.replace(redirectUrl)
}

const app = createApp(App)

// 開發環境調試信息
if (import.meta.env.DEV) {
  console.log('🚀 應用啟動中...')
  console.log('📋 環境變數:')
  console.log('  - VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? '✅ 已配置' : '❌ 未配置')
  console.log('  - VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ 已配置' : '❌ 未配置')
  console.log('  - Supabase 連接狀態:', isSupabaseConfigured() ? '✅ 已連接' : '❌ 未連接')
}

app.use(router)
app.mount('#app')
