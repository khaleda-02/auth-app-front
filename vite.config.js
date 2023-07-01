import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': "https://express-auth-app-back.onrender.com"
    }
  }
})