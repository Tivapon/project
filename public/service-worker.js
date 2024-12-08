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
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // ตรวจสอบว่าคำขอเป็น API หรือไม่ ถ้าใช่ ให้ส่งคำขอนี้ต่อไปยังเครือข่ายโดยตรง
  if (requestUrl.pathname.startsWith('/api')) {
    // ไม่แคชคำขอที่เป็น API
    return fetch(event.request).then((response) => response).catch((err) => {
      console.error('Failed to fetch API:', err);
      return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable',
      });
    });
  }

  // จัดการคำขออื่น ๆ ด้วยแคช
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      });
    })
  );
});
