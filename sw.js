// Service Worker for Portfolio Website
const CACHE_NAME = 'portfolio-v2.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/styles/pages/home.css',
  '/src/pages/home.js',
  '/personal-page/index.html',
  '/src/styles/pages/personal.css',
  '/src/pages/personal.js',
  '/src/services/particles.min.js',
  '/src/services/particles-config.js',
  '/src/components/footer.js',
  '/src/data/skills.json',
  '/src/data/education.json',
  '/src/data/projects.json',
  '/src/data/experiences.json',
  '/src/data/athletic-performances.json',
  '/src/assets/images/logo/white.png',
  '/src/assets/images/logo/black.png',
  '/src/assets/images/logo/color.png',
  '/src/assets/images/bitmoji/hero.webp',
  '/src/assets/images/common/profil.png',
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
