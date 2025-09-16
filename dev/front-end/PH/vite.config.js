import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['586125e709c1.ngrok-free.app',"fair-bugs-trade.loca.lt","localhost"]
  }
})