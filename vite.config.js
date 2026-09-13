import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')

// https://vite.dev/config/
export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "react": path.resolve(import.meta.dirname, "./node_modules/react"),
      "react-dom": path.resolve(import.meta.dirname, "./node_modules/react-dom"),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      '@tsparticles/engine',
      '@tsparticles/slim',
    ],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three';
          }
          if (id.includes('@splinetool')) {
            return 'spline';
          }
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'animations';
          }
          if (id.includes('@tsparticles')) {
            return 'particles';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})