import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import node from '@astrojs/node';

const isPreview = process.env.ASTRO_PREVIEW === 'true';

export default defineConfig({
  output: 'server',
  adapter: isPreview ? node({ mode: 'standalone' }) : vercel(),
  integrations: [
    tailwind(),
    react({
      include: ['**/react/**', '**/*.{tsx,jsx}'],
      experimentalReactChildren: true,
    }),
  ],
  site: 'https://botanico-landing-page.vercel.app',
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
      chunkSizeWarningLimit: 600,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lenis')) {
                return 'lenis';
              }

              return 'vendor';
            }
          },
        },
      },
    },
    ssr: {
      noExternal: ['@heroui/system', '@heroui/date-picker'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@heroui/system', '@heroui/date-picker'],
      exclude: ['@astrojs/react'],
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
});
