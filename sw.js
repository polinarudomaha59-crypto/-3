const CACHE_NAME = "ecopunkt-variant-25-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./catalog.html",
    "./form.html",
    "./style.css",
    "./app.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                FILES_TO_CACHE.map((file) => {
                    return fetch(file, { cache: "no-cache" })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Файл не найден: ${file}`);
                            }

                            return cache.put(file, response);
                        })
                        .catch((error) => {
                            console.error(error.message);
                        });
                })
            );
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                .filter((cacheName) => cacheName !== CACHE_NAME)
                .map((cacheName) => caches.delete(cacheName))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    if (event.request.mode === "navigate") {
                        return caches.match("./index.html");
                    }

                    return new Response("Файл недоступен без интернета", {
                        status: 503,
                        headers: {
                            "Content-Type": "text/plain; charset=utf-8"
                        }
                    });
                });
        })
    );
});