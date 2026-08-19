import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Single-page app now: React Router handles /, /login, /dashboard
// client-side instead of Vite building three separate HTML entry points.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
