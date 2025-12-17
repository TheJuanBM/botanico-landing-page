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
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
    contentCollectionCache: true,
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      target: 'esnext',
      chunkSizeWarningLimit: 600,
      modulePreload: {
        polyfill: false,
        resolveDependencies: (_, deps) => {
          return deps.filter((dep) => {
            return dep.includes('vendor') || dep.includes('react-core');
          });
        },
      },
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 50000,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react/') || id.includes('react-dom/')) {
                return 'react-core';
              }

              if (id.includes('@react-aria/')) {
                if (id.includes('@react-aria/i18n')) {
                  return 'react-aria-i18n';
                }
                if (id.includes('@react-aria/live-announcer')) {
                  return 'react-aria-announcer';
                }
                return 'react-aria-other';
              }

              if (id.includes('@heroui/')) {
                if (id.includes('@heroui/date-picker')) {
                  return 'heroui-date-picker';
                }
                if (id.includes('@heroui/system')) {
                  return 'heroui-system';
                }
                if (id.includes('@heroui/theme')) {
                  return 'heroui-theme';
                }
                return 'heroui-other';
              }

              if (id.includes('@internationalized/date')) {
                return 'intl-date';
              }

              if (id.includes('framer-motion')) {
                return 'framer-motion';
              }

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
