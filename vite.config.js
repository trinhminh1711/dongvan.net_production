import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
 server: {
    host: true,       // Tương đương với '0.0.0.0' (allow all)
    port: 80,         // Port 80
    strictPort: true,
	allowedHosts: ['dongvan.net'] // Nếu port 80 bị chiếm thì không tự động đổi port
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
