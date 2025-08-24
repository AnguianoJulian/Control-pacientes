const CACHE_NAME = "pacientes-cache-v1";
const urlsToCache = [
    "index.html",
    "main.js",
    "styles.css",
    "manifest.json"
];

// Instalar y guardar en caché
self.addEventListener("install", event => {
    event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// Interceptar peticiones y servir desde caché
self.addEventListener("fetch", event => {
    event.respondWith(
    caches.match(event.request).then(response => {
        return response || fetch(event.request);
    })
);
});
