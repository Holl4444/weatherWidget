import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'WeatherWidget',
        extend: true,
        globals: {
          react: 'React',
          'react-dom/client': 'ReactDOM', // Update this line
        },
        exports: 'named',
        inlineDynamicImports: true,
      },
      preserveEntrySignatures: 'exports-only',
    },
  },
});
