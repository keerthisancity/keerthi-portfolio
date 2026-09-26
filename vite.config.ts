import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/keerthi-portfolio/",
  server: {
    proxy: {
      '/api': {
        target: 'https://keerthiportfolioapi.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
