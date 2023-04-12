const staticCacheName = "static-site-v1";
const dynamicCacheName = "dynamic-site-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/src/main.jsx",
  "/src/App.jsx",
  "/src/pages/Home.jsx",
  "/src/pages/NotFound.jsx",
  "/src/pages/Characters/Characters.jsx",
  "/src/pages/Episodes/Episodes.jsx",
  "/src/pages/Locations/Locations.jsx",

  "/src/assets/login.png",
  "/src/assets/logo.png",
  "/src/assets/Rick&Morty.png",
  "/src/assets/Rick&Morty_404.png",
];

self.addEventListener("install", async (event) => {
  console.log("Service Worker has been installed");
  const cache = await caches.open(staticCacheName);
  await cache.addAll(ASSETS);
});

self.addEventListener("activate", async (event) => {
  console.log("Service Worker has been activated");
  const cachesKeysArr = await caches.keys();
  await Promise.all(
    cachesKeysArr
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete(key))
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker fetch event");
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        return networkFirst(request);
      }))
    );
  } catch (e) {
    console.log("error", e);
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match("/src/pages/NotFound.jsx"));
  }
}
