// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    babel: {
      plugins: [],
    },
  })],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/chat-widget-entry.jsx'),
      name: 'ChatWidget',
      fileName: 'chat-widget',
      formats: ['iife'],
    },
    rollupOptions: {
      external: [], 
    },
  },
})
