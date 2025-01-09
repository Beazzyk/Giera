// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  root: './',  // Ścieżka do głównego folderu (gdzie znajduje się App.tsx i main.tsx)
  build: {
    outDir: 'dist',  // Folder, do którego będą generowane pliki podczas budowania
  },
  server: {
    port: 3000,  // Można wybrać port
  },
})
