import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      protocol: 'ws',
      host: '192.168.54.55',
      port: 8080,
      clientPort: 8080,
    },
  },
})
