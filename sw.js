// TEHFI Scanner: keeps the page itself on the phone so the app opens even with a weak signal.
// Scans are never cached: they go straight to the Production Monitor (a different site, not touched here).
var CACHE = 'tehfi-scanner-v0.7.2';
var SHELL = ['./', './index.html', './html5-qrcode.min.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return; // the PMP calls pass through untouched
  if (req.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname)) {
    // the page: newest version when online, the kept copy when offline
    e.respondWith(fetch(req).then(function (r) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put('./index.html', cp); }); return r; }).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) { return hit || fetch(req); }));
});
