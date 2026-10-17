import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, /api/* requests are proxied to the Express backend so the
// frontend never needs to hard-code the backend origin.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Allow temporary public tunnels (Cloudflare Tunnel / ngrok / localtunnel) for quick client demos.
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', '.loca.lt'],
    proxy: {
      '/media': { target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:5000', changeOrigin: true },
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
