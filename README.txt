RUDI PARWANTO PORTFOLIO — CLOUDFLARE WORKERS

Situs statis dan API dijalankan oleh Cloudflare Worker. Konten blog bersumber dari content/blog/*.json.

Build lokal: npm run build
Deploy: npx wrangler deploy
Konfigurasi deployment: wrangler.json + .assetsignore
Worker API dan OAuth Decap CMS: worker.js

Setelah mengubah konten blog, build akan memperbarui halaman blog, feed.xml, dan sitemap.xml.
Lihat CLOUDFLARE-SETUP.txt untuk konfigurasi dashboard dan secrets.
