# Setup & Deployment

Panduan konfigurasi sekali jalan untuk masrudi.site. Rangkuman dari catatan setup lama
(`CLOUDFLARE-SETUP.txt`, `BLOG-CMS-SETUP.txt`, `BLOG-COMMENTS-SETUP.txt`, `README-SETUP.txt`).

## 1. Cloudflare Workers Builds

| Pengaturan | Nilai |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Setiap push ke `main` memicu build dan deploy otomatis.
Setelah deploy pertama, tambahkan `masrudi.site` di **Custom Domains** pada Worker.

## 2. Worker secrets

`Workers & Pages → rudi-parwanto-portfolio → Settings → Variables and Secrets`, tambahkan sebagai **Secret**:

| Nama | Dipakai untuk |
|---|---|
| `MASTER_USERNAME` | Login kalkulator `/master/` |
| `MASTER_PASSWORD` | Login kalkulator `/master/` |
| `MASTER_SECRET` | Tanda tangan sesi (string acak ≥ 32 karakter) |
| `GITHUB_OAUTH_ID` | Login Decap CMS `/admin/` |
| `GITHUB_OAUTH_SECRET` | Login Decap CMS `/admin/` |

Jangan pernah menyimpan nilai secret di repository.

> **Penting:** isi semua nilai di atas dengan tipe **Secret**, bukan Text. `wrangler.json` memakai
> `"keep_vars": true` agar variabel dashboard tidak terhapus saat deploy otomatis, tetapi tipe Secret tetap
> paling aman karena tidak pernah ikut terhapus.

## 3. CMS blog (`/admin/`)

Decap CMS memakai GitHub OAuth proxy di `worker.js`. Buat **GitHub OAuth App**:

- Homepage URL: `https://masrudi.site`
- Authorization callback URL: `https://masrudi.site/api/callback`

Login di `/admin/` dengan GitHub. CMS akan commit ke `content/blog/`, lalu Cloudflare membangun ulang blog, `feed.xml`, dan `sitemap.xml`.
Artikel yang belum siap tayang disimpan di `content/drafts/` (tidak dibaca oleh build).

## 4. Komentar blog (Utterances)

1. Pastikan **Issues** aktif di repo `jieponk/rudi-parwanto-portfolio`.
2. Install GitHub App **utterances** untuk repo ini: <https://github.com/apps/utterances>.
3. Komentar tiap artikel otomatis tersimpan sebagai Issue berdasarkan pathname.

## 5. Kalkulator marketplace (`/master/`)

- API Worker: `/api/login`, `/api/logout`, `/api/session`, `/api/categories`, `/api/calculate`.
- Sesi berlaku 12 jam (cookie HttpOnly + Secure). Login tidak disimpan di HTML/JS publik.
- Data fee: `worker-data/*.json` (tidak diunggah sebagai aset publik, lihat `.assetsignore`).
- **Disarankan:** lindungi `/master/*` dengan Cloudflare Access (Zero Trust → Access → Applications)
  agar form login tidak dapat diakses publik.

## 6. Cek setelah deploy

- <https://masrudi.site/> · <https://masrudi.site/blog/> · <https://masrudi.site/links/>
- <https://masrudi.site/sitemap.xml> · <https://masrudi.site/robots.txt> · <https://masrudi.site/feed.xml>
- Login `/admin/` dan `/master/`, serta kolom komentar di satu artikel.
