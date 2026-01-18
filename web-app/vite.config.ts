import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    // Enable minification
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2015',
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split MUI into separate chunks for better caching
          'mui-core': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'mui-pickers': ['@mui/x-date-pickers'], // Lazy loaded, separate cache
          'form-vendor': ['react-hook-form', 'react-hook-form-mui'],
          'table-vendor': ['@tanstack/react-table'],
          'utils-vendor': ['axios', 'date-fns', 'notistack'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional, increases bundle size)
    sourcemap: false,
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      'axios',
      'date-fns',
    ],
  },
});
