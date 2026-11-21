const VERSION = "v1";
const SCOPE = self.registration.scope;
const CACHE_PREFIX = "variant25-web:" + SCOPE + ":";
const CACHE_NAME = CACHE_PREFIX + VERSION;

const FILES = [
    "./",
    "./index.html",
    "./catalog.html",
    "./form.html",
    "./style.css",
    "./catalog.js",
    "./catalog-page.js",
    "./form.js",
    "./manifest.webmanifest",
    "./images/item1.png"
];

// 1. Установка (сохраняем файлы в кэш)
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            var requests = [];
            for (var i = 0; i < FILES.length; i++) {
                requests.push(new Request(new URL(FILES[i], SCOPE), { cache: "reload" }));
            }
            return cache.addAll(requests);
        })
    );
});

// 2. Активация (удаляем старый кэш)
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(names) {
            var promises = [];
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                if (name.indexOf(CACHE_PREFIX) === 0 && name !== CACHE_NAME) {
                    promises.push(caches.delete(name));
                }
            }
            return Promise.all(promises);
        })
    );
});

// 3. Перехват запросов (отдаем из кэша или из сети)
self.addEventListener("fetch", function(event) {
    var request = event.request;
    if (request.method !== "GET" || !request.url.startsWith(SCOPE)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(request).then(function(savedResponse) {
                if (savedResponse) {
                    return savedResponse;
                } else {
                    return fetch(request);
                }
            });
        })
    );
});