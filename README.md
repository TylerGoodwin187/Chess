# Chess

📲 STEP 3 — OPEN ON iPHONE (IMPORTANT)

Open Safari (NOT Chrome)

Go to your link.

Let it fully load once.

This is critical because:

Safari only registers the service worker after first full load

⸻

📦 STEP 4 — INSTALL IT (THIS IS THE “APP” MOMENT)

In Safari:

1. Tap Share button (square with arrow)
2. Scroll down
3. Tap:

📌 “Add to Home Screen”

⸻

🧠 STEP 5 — SET ICON + NAME

When prompted:

* Name: “Adaptive Chess” or whatever you want
* Icon: comes from manifest.json

Tap:

Add

⸻

📱 STEP 6 — OPEN IT LIKE A REAL APP

Now tap the icon.

What happens:

* opens fullscreen
* no Safari bar
* no URL
* behaves like app

⸻

📴 STEP 7 — MAKE IT OFFLINE (THIS IS THE KEY PART)

This only works if your service worker is correct.

sw.js must:

* cache ALL files
* intercept requests

Then:

After first load:

* open app once WITH internet
* close it
* turn on airplane mode
* reopen app

If done right:
✔ still works
✔ Stockfish still runs
✔ chess still playable

If not:
❌ blank screen = cache not set correctly

⸻

⚠️ COMMON FAILURES (THIS SAVES YOU HOURS)

❌ “Add to Home Screen missing”

Fix:

* must use Safari
* must have manifest.json linked

⸻

❌ App opens but is white/offline broken

Fix:

* service worker didn’t install
* reload page once with internet ON

⸻

❌ Stockfish not working offline

Fix:

* .wasm file not cached
* or not in same folder path

⸻

❌ iOS ignoring updates

Fix:

* change cache version in sw.js:
const CACHE_NAME = "chess-app-v2";

