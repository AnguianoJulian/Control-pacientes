const CACHE_NAME = "control-pacientes-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/main.js",
    "/manifest.json"
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
