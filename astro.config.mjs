import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://eanorambuena.github.io',
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['detect-gpu'],
    },
    ssr: {
      noExternal: ['three', '@react-three/fiber', '@react-three/drei', 'detect-gpu'],
    },
  },
});
