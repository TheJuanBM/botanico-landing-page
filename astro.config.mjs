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
    prefetchAll: false,
    defaultStrategy: 'load',
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
      sourcemap: false,
      minify: 'esbuild',
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }

              if (id.includes('@heroui') || id.includes('@internationalized')) {
                return 'heroui-vendor';
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
