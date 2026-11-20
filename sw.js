/* Cache only the application shell; book pages live in IndexedDB after loading. */
const CACHE = 'storybook-app-shell-v1';
const SHELL = ['./Mein_Buecherregal_V17.html','./manifest.webmanifest','./icons/book.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('storybook-app-shell-') && key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const url = new URL(request.url);
  if (!SHELL.some(path => url.pathname.endsWith(path.slice(1)))) return;
  event.respondWith(fetch(request).then(response => {
    if(response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(request,copy));
    }
    return response;
  }).catch(() => caches.match(request)));
});
