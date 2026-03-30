const CACHE_VERSION = "kamran-profile-v2";
const APP_SCOPE = "/app6/profile/";
const CORE_ASSETS = [
  APP_SCOPE,
  APP_SCOPE + "index.html",
  APP_SCOPE + "manifest.webmanifest",
  APP_SCOPE + "assets/css/main.css",
  APP_SCOPE + "assets/js/jquery.min.js",
  APP_SCOPE + "assets/js/jquery.scrolly.min.js",
  APP_SCOPE + "assets/js/jquery.scrollex.min.js",
  APP_SCOPE + "assets/js/browser.min.js",
  APP_SCOPE + "assets/js/breakpoints.min.js",
  APP_SCOPE + "assets/js/util.js",
  APP_SCOPE + "assets/js/main.js",
  APP_SCOPE + "images/profile1.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isLocal = url.origin === self.location.origin;

  // Always prefer network for page navigations so design/content updates appear quickly.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (isLocal && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(APP_SCOPE + "index.html", copy));
          }
          return response;
        })
        .catch(() => caches.match(APP_SCOPE + "index.html"))
    );
    return;
  }

  // Cache-first for static assets.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (isLocal && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => new Response("Offline", { status: 503, statusText: "Offline" }));
    })
  );
});
