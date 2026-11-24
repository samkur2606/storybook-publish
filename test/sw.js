/* App shell only: downloaded books remain separately in IndexedDB. */
const CACHE = 'storybook-test-shell-v42';
const SHELL = ["./index.html","./test-mode.config.js","./icons/book.svg?v=cream-4","./icons/book-192.png?v=cream-4","./icons/book-512.png?v=cream-4"];
const ROOT = new URL('./', self.registration.scope);
const SHELL_PATHS = new Set(SHELL.map(path => new URL(path, ROOT).pathname));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(SHELL.map(async path => {
        const url = new URL(path, ROOT);
        const response = await fetch(new Request(url, {cache: 'reload'}));
        if (!response.ok) throw Error('App shell HTTP ' + response.status);
        await cache.put(url, response);
      })))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('storybook-test-shell-') && key !== CACHE)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname !== ROOT.pathname && !SHELL_PATHS.has(url.pathname)) return;

  event.respondWith((async () => {
    try {
      // Fetch the current shell without relying on stale browser HTTP caches.
      const fresh = await fetch(new Request(request, {cache: 'no-store'}));
      if (!fresh.ok) throw Error('App shell HTTP ' + fresh.status);
      const cache = await caches.open(CACHE);
      await cache.put(request, fresh.clone());
      return fresh;
    } catch (error) {
      const cache = await caches.open(CACHE);
      const fallback = await cache.match(request, {ignoreSearch: true});
      if (fallback) return fallback;
      if (url.pathname === ROOT.pathname) {
        const index = await cache.match(new URL('./index.html', ROOT));
        if (index) return index;
      }
      throw error;
    }
  })());
});

