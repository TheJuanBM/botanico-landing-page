import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import node from '@astrojs/node';

// Usar adaptador de Node.js para preview, Vercel para producción
const isPreview = process.env.ASTRO_PREVIEW === 'true';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: isPreview ? node({ mode: 'standalone' }) : vercel(),
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
            'react-vendor': ['react', 'react-dom'],
            'heroui-date': ['@heroui/date-picker', '@heroui/system', '@internationalized/date'],
            'react-aria': ['@react-aria/i18n', '@react-aria/live-announcer'],
            framer: ['framer-motion'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['@heroui/system', '@heroui/date-picker'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@heroui/system', '@heroui/date-picker'],
    },
  },
});
