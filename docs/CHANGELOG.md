# Changelog

## 2026-11-14 — VS Code × macOS redesign
- Tampilan baru di semua halaman: menu bar kaca, activity bar, explorer, tab, breadcrumb, status bar, ikon SVG.
- Animasi boot (sekali per sesi), transisi tab, mode gelap/terang tersimpan lintas halaman.
- Tab **Projects** (urbanix.id, kalkulator marketplace) dan grup skill **Web Development**.
- SEO: isi About di-prerender ke `index.html`, schema `Person` + `ProfilePage` lebih lengkap.
- Template chrome bersama (`scripts/chrome.js`); `/links` dan `404` dibangun oleh `scripts/build-pages.js`.
- `/admin/` beralih dari Decap CMS ke Sveltia CMS (tampilan modern, config sama).
- Favicon baru (`</>` gradien biru-ungu) dalam SVG/ICO/PNG + `site.webmanifest`; gambar share 1200×630 (`assets/og-image.jpg`).
- SEO: `og:image` 1200×630 di semua halaman publik, `og:locale`, deskripsi homepage diperluas, `/links/` masuk sitemap + Open Graph.
- `wrangler.json`: `keep_vars: true` agar variabel dashboard tidak terhapus saat deploy.
- Artikel tes dipindah ke `content/drafts/`; catatan setup lama dirangkum ke `docs/SETUP.md`.

## V8 — Links
- Halaman `/links/` mengikuti shell editor portfolio; CTA "Cari Kamera & Gear?" ke Shopee Aneka Foto.

## V5 — Blog admin
- Top bar bermerek di `/admin/`, Featured Post lewat `content/settings/blog.json`, halaman label `/blog/label/[label]/`.
