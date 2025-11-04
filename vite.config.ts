import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 👇 This is critical for GitHub Pages
  base: '/searchspring-frontend/',

  build: {
    outDir: 'dist',
    sourcemap: false, // Optional: set to true if you want debug maps
  },

  server: {
    port: 5173, // default dev server port
    open: true, // auto open browser on npm run dev
  },
})
