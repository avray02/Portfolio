// Service Worker for Portfolio Website
const CACHE_NAME = 'portfolio-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style-new.css',
  '/assets/js/script-new.js',
  '/assets/js/particles.min.js',
  '/assets/js/app.js',
  '/skills/skills.json',
  '/projects/projects.json',
  '/assets/images/logo/white.png',
  '/assets/images/logo/black.png',
  '/assets/images/logo/color.png',
  '/assets/images/bitmoji/hero.webp',
  '/assets/images/profil.png',
  // Add other critical assets as needed
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch events
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});