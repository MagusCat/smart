import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@hooks": "/src/hooks"
    }
  },
  plugins: [tailwindcss(), react()],
 
  server: {
    proxy: {
      '/api': { 
        target: 'http://localhost:3000', 
        changeOrigin: true, 
        
      },
    },
  },
})