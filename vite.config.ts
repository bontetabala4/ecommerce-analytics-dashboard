import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react()
    , tailwindcss()
  ],

  base: '/ecommerce-analytics-dashboard/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Optionnel : pour debug
    minify: false,
    sourcemap: true
  },
  server: {
    port: 3000
  }
})
