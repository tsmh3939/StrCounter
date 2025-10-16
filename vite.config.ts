import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'StrCounter',
        short_name: 'StrCounter',
        description: '文字数カウンターアプリ',
        lang: 'ja',
        dir: 'ltr',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        scope: '/',
        background_color: '#2A303C',
        theme_color: '#2A303C',
        categories: ['productivity', 'utilities'],
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}']
      }
    })
  ],
  base: './',
  server: {
    host: true,	// サーバーがリッスンするホストアドレスを指定
    port: 5173,	// 開発サーバーが使用するポート番号
  },
})
