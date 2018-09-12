//Service Worker install function
self.addEventListener("install", event => {
  const urlsToCache = [
    "/",
    "/index.html",
    "/restaurant.html",
    "/css/styles.css",
    "/data/restaurants.json",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
    "/img/10.jpg",
    "/js/dbhelper.js",
    "/js/main.js",
    "/js/restaurant_info.js"
  ];
  event.waitUntil(
    caches.open("restaurant-cache-v1").then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

//service worker fetch function (updates cache)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log(`Found ${JSON.stringify(event.request)} in the cache.`)
        return response;
      } else {
        console.log(`Didn't find ${JSON.stringify(event.request)} in the cache.`)
        return fetch(event.request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open("v1").then((cache) => {
              cache.put(event.request, responseClone)
            });
            return response;
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
  )
});