import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eanorambuena.github.io',
  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date(),
    }),
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
