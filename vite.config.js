import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend',
  publicDir: 'public',
  build: { outDir: '../dist', emptyOutDir: true, sourcemap: false },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.e2b.app'],
    port: 5173,
    strictPort: true,
    proxy: { '/api': { target: 'http://localhost:4000', changeOrigin: true } }
  },
  preview: { host: '0.0.0.0', port: 4173 }
});
