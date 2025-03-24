import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    terserOptions: {
      compress: true,
      mangle: true,
    },
    rollupOptions: {
      input: 'index.html',
      output: {
        format: 'es',
        dir: 'dist',
        entryFileNames: '[name].[hash].js',
        compact: true,
      },
    },
  },
});
