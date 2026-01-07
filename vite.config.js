import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer']
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [],
    }
  }
})