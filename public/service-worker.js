const CACHE_NAME = 'v1'; // ตั้งชื่อ Cache
const CACHE_URLS = [
  '/', // URL ที่จะถูกเก็บใน Cache
  '/index.html',
  '/styles.css',
  '/script.js',
  '/psu-alert-logo.png', // เพิ่มไฟล์ที่คุณต้องการให้เก็บใน Cache
];

// ติดตั้ง Service Worker และ Cache ไฟล์ที่กำหนด
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(CACHE_URLS);
    })
  );
});

// เปิดใช้งาน Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // ลบแคชเก่า
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// จัดการการดึงข้อมูล
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // ตรวจสอบว่าไฟล์มีในแคชหรือไม่
      return response || fetch(event.request).catch(() => {
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      });
    })
  );
});
