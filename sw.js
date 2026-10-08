// 造型日報 Service Worker
// アプリを更新したら VERSION を変えてください(自動で新しい版に切り替わります)
const VERSION = "zokei-nippo-v1";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./config.js", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // 画面(HTML)は「ネット優先・つながらなければ保存版」: 電波があれば常に最新版
  if (req.mode === "navigate" || req.url.endsWith("/config.js")) {
    e.respondWith(
      fetch(req.url.split("#")[0], {cache: "no-store"}).then(res => { const cp = res.clone(); const key = req.mode === "navigate" ? "./index.html" : req; caches.open(VERSION).then(c => c.put(key, cp)); return res; })
        .catch(() => caches.match(req.mode === "navigate" ? "./index.html" : req).then(r => r || caches.match("./")))
    );
    return;
  }
  // その他(アイコン等)は保存版優先
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return res; })));
});
