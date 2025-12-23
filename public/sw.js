const CACHE_NAME = 'botanico-v1';
const STATIC_CACHE_NAME = 'botanico-static-v1';
const DYNAMIC_CACHE_NAME = 'botanico-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/fonts/Inter-Regular.woff2',
  '/fonts/Inter-Medium.woff2',
  '/fonts/Inter-SemiBold.woff2',
  '/fonts/PlayfairDisplay-Regular.woff2',
  '/fonts/PlayfairDisplay-Bold.woff2',
  '/fonts/PlayfairDisplay-SemiBold.woff2',
];

const PAGES_TO_CACHE = ['/', '/habitaciones', '/mito', '/galeria', '/contacto', '/reservar'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name.startsWith('botanico-') &&
              name !== STATIC_CACHE_NAME &&
              name !== DYNAMIC_CACHE_NAME
            );
          })
          .map(caches.delete)
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          const cachedResponse = await caches.match(request);
          return cachedResponse || (await caches.match('/'));
        }
      })()
    );
    return;
  }

  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(DYNAMIC_CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      })()
    );
    return;
  }

  event.respondWith(fetch(request));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
