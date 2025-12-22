import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
    domains: [],
  },
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
    },
    ssr: {
      noExternal: ['@heroui/system', '@heroui/date-picker', '@react-aria/live-announcer'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@heroui/system',
        '@heroui/date-picker',
        '@react-aria/live-announcer',
      ],
      exclude: ['@astrojs/react'],
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@react-aria/live-announcer': resolve(
          __dirname,
          'node_modules/@react-aria/live-announcer/dist/module.js'
        ),
      },
    },
  },
});
