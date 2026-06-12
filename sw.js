const CACHE = "chess-v1";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./chess.js",
  "./stockfish.js",
  "./stockfish.wasm",
  "./manifest.json",
  "./icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
