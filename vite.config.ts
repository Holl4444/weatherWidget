import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // Disable minification for better error messages
    sourcemap: true, // Enable sourcemaps
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'WeatherWidget',
        extend: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
