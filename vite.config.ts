import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    VitePWA({
      manifest: {
        name: 'Online Survey',
        short_name: 'Survey',
        start_url: '/',
        display: 'minimal-ui',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // path to your image
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // path to your image
            sizes: '512x512',
            type: 'image/png',
          },
          // You might want to add Apple-specific icons and splash screens
        ],
      },
      registerType: 'autoUpdate',
      /* devOptions: {
        enabled: true,
      }, */
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
