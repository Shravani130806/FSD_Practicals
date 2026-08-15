import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        login: resolve(root, 'login.html'),
        dashboard: resolve(root, 'dashboard.html'),
      },
    },
  },
})
