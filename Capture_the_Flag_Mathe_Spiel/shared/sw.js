const CACHE_NAME = "ctf-mathe-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./app.js",
  "./engine.js",
  "./inputs.js",
  "./tasks.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  console.log("Service Worker installiert");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache geöffnet");
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log("Cache Fehler:", err))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker aktiviert");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("Alter Cache gelöscht:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});