MARKETPLACE MASTER — SETUP NETLIFY

1. Folder /master/ adalah halaman login + kalkulator.
2. Login TIDAK ditanam di HTML/JavaScript publik.
3. Di Netlify > Site configuration > Environment variables, buat:
   MASTER_USERNAME = (username yang kamu tentukan)
   MASTER_PASSWORD = (password yang kamu tentukan)
   MASTER_SECRET   = string acak panjang minimal 32 karakter

PENTING:
- Untuk Netlify Functions, deploy paling aman/praktis lewat repository Git yang terhubung ke Netlify.
- Jangan menaruh password langsung di index.html.
- Setelah deploy, buka: https://domain-kamu/master/
- Session berlaku 12 jam dan disimpan dalam cookie HttpOnly + Secure.
- Rumus kalkulator dan tabel fee dijalankan/dikirim dari Netlify Functions setelah login.

LOGIKA AWAL:
- Shopee/GearNest: fee kategori Star/Star+ dari fee shopee.xlsx.
- Shopee: FeeMax 5,5% max 40k; XTRA 6,5% max 80k; PACK 1.600; PREMI 0,5%; DAPAT 0,5%; promo 1% x 1,11.
- GearNest: FeeMax 5,5% max 40k; XTRA 4,5% max 60k; PACK 1.600; PREMI 0,5%; promo 1% x 1,11.
- TikTok: kategori umum 7,75%; Audio/Tripod-Aksesori 9,5%; FeeMax 3% max 60k; XTRA 2% max 100k; Premi 1.250; Mall 1,8% max 50k default OFF; Campaign 1%.
- Blibli: mengikuti master rumus: fee 5,75%; FeeMax 2,5% max 30k; XTRA 6% max 500k; PACK 1,8% max 50k; Premi 1.250; Campaign 1%.

Ini versi TEST awal agar kamu bisa membandingkan hasil website dengan Excel sebelum fitur lain ditambahkan.
