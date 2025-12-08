import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind(), react()],
  site: 'https://hotelbotanico.com',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      target: 'esnext',
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            heroui: ['@heroui/react', '@heroui/date-picker'],
            'react-vendor': ['react', 'react-dom'],
            framer: ['framer-motion'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['@heroui/react', '@heroui/date-picker'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@heroui/react'],
    },
  },
});
