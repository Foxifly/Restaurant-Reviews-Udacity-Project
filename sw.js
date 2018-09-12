self.addEventListener('install', (event) => {
  const urlsToCache = ['/', '/index.html', '/restaurant.html', '/css/styles.css', '/data/restaurants.json', '/img/1.jpg'];
  event.waitUntil(
    caches.open('restaurant-cache-v1').then((cache) => {
      cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.status == '404') {
        return new Response("Not found")
      }
      return response;
    }).catch(() => {
      return new Response("Bad boi")
    })
  )
})