import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Router and Lenis are on every route; splitting them out keeps the
        // page chunks small and lets the vendor bundle cache across deploys.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          scroll: ['lenis'],
        },
      },
    },
  },
});
