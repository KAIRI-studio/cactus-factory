const CACHE_NAME = "cactus-factory-2026-09-17-204";
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css?v=204",
  "./assets/equipment-heading-v2.webp",
  "./assets/equipment-factory-frame-v4.webp",
  "./assets/equipment-detail-console-100.webp",
  "./assets/equipment-detail-console-300.webp",
  "./assets/equipment-detail-console-700.webp",
  "./assets/equipment-detail-console-complete.webp",
  "./assets/equipment-detail-light-lv0.webp",
  "./assets/equipment-detail-light-lv1.webp",
  "./assets/equipment-detail-light-lv2.webp",
  "./assets/equipment-detail-light-lv3.webp",
  "./assets/equipment-detail-mist-lv0.webp",
  "./assets/equipment-detail-mist-lv1.webp",
  "./assets/equipment-detail-mist-lv2.webp",
  "./assets/equipment-detail-mist-lv3.webp",
  "./assets/equipment-detail-air-lv0.webp",
  "./assets/equipment-detail-air-lv1.webp",
  "./assets/equipment-detail-air-lv2.webp",
  "./assets/equipment-detail-air-lv3.webp",
  "./assets/equipment-detail-sensor-lv0.webp",
  "./assets/equipment-detail-sensor-lv1.webp",
  "./assets/equipment-detail-sensor-lv2.webp",
  "./assets/equipment-detail-sensor-lv3.webp",
  "./assets/equipment-coin-meter.webp",
  "./assets/nutrient-purchase-panel.webp",
  "./assets/nutrient-purchase-panel-active.webp",
  "./assets/equipment-action-install-100.webp",
  "./assets/equipment-action-upgrade-300.webp",
  "./assets/equipment-action-upgrade-700.webp",
  "./assets/equipment-action-complete.webp",
  "./title-v3.css?v=2",
  "./game.js?v=204",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/kairi-studio-logo.png",
  "./assets/title-hero-v3.webp",
  "./assets/title-logo-v3.webp",
  "./assets/title-start-v2.webp",
  "./assets/equipment-room-v2.webp",
  "./assets/equipment-buttons-v1.webp",
  "./assets/equipment-buttons-v5.webp",
  "./assets/equipment-card-frame-v2.webp",
  "./assets/equipment-upgrade-board-v1.webp",
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
  "./assets/cactus-legend-sage-v6.png",
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
