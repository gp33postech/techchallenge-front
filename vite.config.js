import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // <- ESSENCIAL para o Render servir os arquivos corretamente
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
