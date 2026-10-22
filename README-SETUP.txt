MARKETPLACE MASTER — CLOUDFLARE WORKERS SETUP

Halaman /master/ memakai API Worker yang sekarang berada di worker.js.
Login tidak disimpan di HTML/JavaScript publik.

Di Cloudflare Dashboard > Workers & Pages > rudi-parwanto-portfolio > Settings > Variables and Secrets, tambahkan sebagai Secret:
- MASTER_USERNAME = username yang kamu tentukan
- MASTER_PASSWORD = password yang kamu tentukan
- MASTER_SECRET = string acak panjang minimal 32 karakter

API kalkulator: /api/login, /api/logout, /api/session, /api/categories, /api/calculate.
Session berlaku 12 jam dan memakai cookie HttpOnly + Secure.
Jangan menaruh password atau secret di repository.
