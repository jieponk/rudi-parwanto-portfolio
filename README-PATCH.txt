V5 — Blog Admin + Featured Settings + Labels + TikTok V4

Copy seluruh isi folder ini ke ROOT repository dan Replace file yang sama.

BARU DI V5:
1. /admin/ memiliki branded top bar RUDI PARWANTO agar lebih menyatu dengan portfolio.
   Catatan: editor inti tetap Decap CMS, jadi tidak 100% dapat diubah seperti UI portfolio custom.
2. Featured Post tidak lagi toggle per artikel.
   Buka Admin > Blog Settings > Featured Post > pilih "Artikel yang Disematkan" > Publish.
   Hanya satu slug disimpan di content/settings/blog.json.
3. Halaman /blog/ sekarang punya menu LABELS otomatis dari semua label yang dipakai artikel.
4. Klik label membuka /blog/label/[label]/ dan menampilkan artikel terkait.
5. Label pada card/artikel juga clickable.
6. Blog utama tetap 1 Featured + 4 Latest Posts per halaman + pagination.
7. TikTok calculator mempertahankan perbaikan V4.

DEPLOY:
Extract > copy isi folder ke repo > Replace > GitHub Desktop > Commit main > Push origin > tunggu Netlify Published.

V6:
- Mobile blog memakai app-shell 100dvh: header/menu dan status/footer tetap terlihat; hanya konten tengah yang scroll.
- Menambahkan /favicon.ico (RP) sehingga browser dapat menemukannya secara global tanpa perlu mengubah setiap halaman.
- Upload JPG/JPEG/PNG di assets/blog otomatis dibuat versi WebP saat Netlify build menggunakan Sharp.
- Halaman blog otomatis merujuk versi .webp; source JPG/PNG tetap disimpan sebagai file asli CMS.
- WebP dibatasi maksimal 1800x1800 tanpa memperbesar gambar, quality 82.
- package.json ditambahkan agar Netlify menginstal Sharp sebelum menjalankan scripts/build-blog.js.
