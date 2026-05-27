import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: true,
    proxy: {
      '/api': 'http://localhost:3001',
      '/cie-papers': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/cie-papers/, ''),
      },
    },
  },
});
