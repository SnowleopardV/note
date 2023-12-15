import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve.alias对象下配置@指向路径
  resolve: {
    alias: {
      '@': join(__dirname, './src/'),
    },
  },
})
