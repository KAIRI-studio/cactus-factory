const CACHE_NAME = "cactus-factory-2026-09-15-55";
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css?v=137",
  "./title-v3.css?v=2",
  "./game.js?v=140",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/kairi-studio-logo.png",
  "./assets/title-hero-v3.webp",
  "./assets/title-logo-v3.webp",
  "./assets/title-start-v2.webp",
  "./assets/original-sand-factory-v2.png",
  "./assets/factory-air.png",
  "./assets/factory-sensor.png",
  "./assets/sand-factory-automatic.png?v=3",
  "./assets/simple-bold-sprout.png",
  "./assets/cactus-normal.png",
  "./assets/cactus-rare-flower.png",
  "./assets/cactus-super-bunny.png",
  "./assets/cactus-super-suit.png?v=2",
  "./assets/cactus-super-red.png",
  "./assets/cactus-super-blue.png",
  "./assets/cactus-super-yellow.png",
  "./assets/cactus-legend-sage-v5.webp",
  "./assets/cactus-star-v3.webp",
  "./assets/rare-nutrient-crate-bold.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(APP_FILES);
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key !== CACHE_NAME; }).map(function (key) {
      return caches.delete(key);
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then(function (response) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(function (cache) { cache.put("./index.html", copy); });
      return response;
    }).catch(function () { return caches.match("./index.html"); }));
    return;
  }
  event.respondWith(caches.match(event.request).then(function (cached) {
    const fresh = fetch(event.request).then(function (response) {
      if (response.ok) caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, response.clone()); });
      return response;
    }).catch(function () { return cached; });
    return cached || fresh;
  }));
});
