// ============================================================
// RUDI PARWANTO — PORTFOLIO CONTENT
// Edit text inside code: [...] and html: `...` for each tab.
// Save the file, then push changes to GitHub; Cloudflare will deploy automatically.
// ============================================================

// Project screenshots (urbanix.id). Defined first because the pages object below uses it.
const URBANIX_SHOTS = {dark:'assets/projects/urbanix-dark.webp', light:'assets/projects/urbanix-light.webp', w:791, h:500};

const pages = {
  // ====================== ABOUT ME ==========================
  about: {
    icon: '♟', label: 'about.js', heading: 'About Rudi Parwanto',
    code: [
      '# About Rudi Parwanto', '',
      'const specialist = {',
      '  name: "Rudi Parwanto",',
      '  role: "E-Commerce Specialist",',
      '  location: "Jakarta Pusat, Indonesia",',
      '  focus: "Marketplace Growth & Operations",',
      '  experience: "5+ years in e-commerce",',
      '  available: true',
      '};'
    ],
    html: `<div class="cards">
      <section class="card"><h2>// Profile</h2>
        <div class="profile"><div class="avatar"><img src="assets/foto-profil.webp" alt="Foto profil Rudi Parwanto" width="600" height="600"></div><div><h3>Rudi Parwanto</h3><p class="muted">E-Commerce Specialist · Jakarta Pusat</p><span class="pill">● Marketplace Growth & Digital Commerce</span></div></div>
        <p>Spesialis e-commerce dengan pengalaman lebih dari 5 tahun dalam operasional marketplace, optimasi katalog, campaign, dan analisis penjualan di bidang elektronik serta perlengkapan kreator.</p>
        <div class="notice">Saat ini bekerja di PT KOOLSNAP MULTI RETAILINDO dan menangani tiga toko: Aneka Foto, Urbanix, dan GearNest.</div>
      <div class="cta-row"><a class="btn btn-primary" href="Rudi-Parwanto-CV.pdf" download><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg><span>Unduh CV</span></a><a class="btn" href="#contact"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 3 10 14"/><path d="M21 3 14.5 21l-4.5-7-7-4.5z"/></svg><span>Hubungi Saya</span></a><a class="btn btn-ghost" href="https://id.linkedin.com/in/rudi-parwanto-a0723b163" target="_blank" rel="noopener noreferrer"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18"/></svg><span>LinkedIn</span></a></div></section>
      <section class="card"><h2>// Quick Facts</h2>
        <div class="facts"><span>Full Name:</span><span>Rudi Parwanto</span></div>
        <div class="facts"><span>Experience:</span><span>5+ years in e-commerce</span></div>
        <div class="facts"><span>Role:</span><span>E-Commerce Specialist</span></div>
        <div class="facts"><span>Location:</span><span>Jakarta Pusat, ID</span></div>
        <div class="facts"><span>Current Company:</span><span>PT KOOLSNAP MULTI RETAILINDO</span></div>
        <div class="facts"><span>Stores:</span><span>Aneka Foto · Urbanix · GearNest</span></div>
        <div class="facts"><span>Platforms:</span><span>Shopee · TikTok Shop · Lazada</span></div>
      </section>
    </div>`
  },

  // ==================== WORK EXPERIENCE =====================
  experience: {
    icon: '▣', label: 'experience.js', heading: 'Work Experience',
    code: [
      '# Professional Experience', '',
      'const currentRole = {',
      '  company: "PT KOOLSNAP MULTI RETAILINDO",',
      '  role: "E-Commerce Specialist",',
      '  period: "Apr 2026 - Present",',
      '  stores: ["Aneka Foto", "Urbanix", "GearNest"],',
      '  industry: "Camera & Photography Retail"',
      '};'
    ],
    html: `<div class="cards"><section class="card"><h2>// Professional Experience</h2>
      <div class="timeline"><span class="period">Apr 2026 – Sekarang</span><h3>E-Commerce Specialist Staff</h3><p class="muted">PT KOOLSNAP MULTI RETAILINDO · Aneka Foto, Urbanix & GearNest</p><ul>
        <li>Mengelola tiga toko marketplace di bawah satu perusahaan: Aneka Foto, Urbanix, dan GearNest.</li>
        <li>Mengoptimalkan listing, katalog, variasi produk, dan materi penjualan kamera serta perlengkapan kreator.</li>
        <li>Mengelola campaign dan aktivitas operasional toko, serta memantau performa penjualan.</li>
      </ul></div>
      <div class="timeline"><span class="period">Sep 2023 – Mar 2026</span><h3>E-Commerce Specialist Staff</h3><p class="muted">PT SINAR AGUNG INDOTAMA</p><ul><li>Mengelola penjualan elektronik melalui TikTok Shop, Shopee, dan Lazada.</li><li>Menganalisis performa penjualan, tren pasar, dan menyusun laporan dengan Microsoft Excel.</li><li>Optimasi listing dan SEO produk; pengelolaan campaign, live streaming, dan aktivitas digital marketing.</li><li>Menjalin hubungan dengan supplier, partner, dan pelanggan.</li></ul></div>
      <div class="timeline"><span class="period">Mar 2021 – Jan 2023</span><h3>Crewstore</h3><p class="muted">Bebek dan Ayam Kampung Mas Budi</p><p>Operasional restoran, pelayanan pelanggan, koordinasi tim, pengaturan jadwal, kontrol stok, dan laporan penjualan harian.</p></div>
      <div class="timeline"><span class="period">Nov 2019 – Jan 2021</span><h3>Crewstore</h3><p class="muted">PT SUMBER ALFARIA TRIJAYA TBK</p><p>Pelayanan pelanggan, kasir/POS, display produk, pengecekan stok, restock, dan penerimaan barang.</p></div>
      <div class="timeline"><span class="period">Nov 2017 – Nov 2019</span><h3>Admin Marketplace</h3><p class="muted">PT SINAR AGUNG INDOTAMA</p><p>Upload dan editing foto produk, chat pelanggan, pengaturan harga dan promo, serta pengelolaan event kampanye marketplace.</p></div>
      <div class="timeline"><span class="period">Jul 2017 – Nov 2017</span><h3>Percetakan & Penataan Huruf</h3><p class="muted">LEE COMPUTER</p><p>Layout dan editing desain, operasional percetakan, kontrol kualitas hasil cetak, serta pengelolaan pesanan.</p></div>
      </section><section class="card"><h2>// Current Workplace</h2><h3>PT KOOLSNAP MULTI RETAILINDO</h3><p class="muted">Satu perusahaan · tiga toko</p>
      <div class="facts"><span>01</span><span>Aneka Foto</span></div><div class="facts"><span>02</span><span>Urbanix</span></div><div class="facts"><span>03</span><span>GearNest</span></div>
      <h2>// Recognition</h2><p><b>Shopee Award 2024 — Home Electronic Best Seller</b></p><p class="muted">Jan 2024 · Penghargaan tercantum pada CV.</p></section></div>`
  },

  // ======================= PROJECTS =========================
  projects: {
    icon: '◆', label: 'projects.js', heading: 'Projects',
    code: [
      '# Selected Projects', '',
      'const projects = [',
      '  { name: "urbanix.id", type: "E-commerce store", status: "live" },',
      '  { name: "Marketplace Calculator", type: "Pricing tool", status: "in use" }',
      '];'
    ],
    html: projectsHtml('id')
  },

  // ======================== SKILLS ==========================
  skills: {
    icon: '⌘', label: 'skills.js', heading: 'Skills & Expertise',
    code: [
      '# Core Competencies', '',
      'const skills = {',
      '  platforms: ["Shopee", "TikTok Shop", "Lazada"],',
      '  commerce: ["Product SEO", "Campaign", "Live Selling"],',
      '  analytics: ["Microsoft Excel", "Sales Reporting"],',
      '  web: ["Next.js", "Django", "Cloudflare"],',
      '  people: ["Communication", "Negotiation", "Teamwork"]',
      '};'
    ],
    html: `<section class="card"><h2>// Skill Overview</h2><div class="stack">
      <div><h3>Marketplace Platforms</h3><div class="tags"><span class="tag">Shopee</span><span class="tag">TikTok Shop</span><span class="tag">Lazada</span></div></div>
      <div><h3>E-Commerce Operations</h3><div class="tags"><span class="tag">Marketplace Management</span><span class="tag">Product Listing</span><span class="tag">Product SEO</span><span class="tag">Catalog Management</span><span class="tag">Customer Service</span></div></div>
      <div><h3>Marketing & Sales</h3><div class="tags"><span class="tag">Campaign Management</span><span class="tag">Live Streaming</span><span class="tag">Digital Marketing</span><span class="tag">Sales Strategy</span></div></div>
      <div><h3>Analytics & Office</h3><div class="tags"><span class="tag">Microsoft Excel</span><span class="tag">Microsoft Word</span><span class="tag">Microsoft Office</span><span class="tag">Sales Analysis</span><span class="tag">Administration</span></div></div>
      <div><h3>Web Development</h3><div class="tags"><span class="tag">HTML / CSS / JavaScript</span><span class="tag">Next.js</span><span class="tag">React</span><span class="tag">Django</span><span class="tag">PostgreSQL</span><span class="tag">Docker</span><span class="tag">Cloudflare</span><span class="tag">Technical SEO</span></div></div>
      <div><h3>Communication & Collaboration</h3><div class="tags"><span class="tag">Communication</span><span class="tag">Negotiation</span><span class="tag">Teamwork</span><span class="tag">Public Speaking</span></div></div>
      </div></section>`
  },

  // ====================== EDUCATION =========================
  education: {
    icon: '⚑', label: 'education.js', heading: 'Education & Certifications',
    code: [
      '# Education & Training', '',
      'const education = {',
      '  school: "SMK Bina Karya 1 Karanganyar",',
      '  major: "Multimedia",',
      '  period: "Jun 2014 - Jun 2017",',
      '  training: "Gada Pratama (Jun - Jul 2023)"',
      '};'
    ],
    html: `<div class="cards"><section class="card"><h2>// Formal Education</h2>
      <div class="timeline"><span class="period">Jun 2014 – Jun 2017</span><h3>SMK Bina Karya 1 Karanganyar</h3><p class="muted">Jurusan Multimedia</p><p>Aktif dalam kegiatan OSIS dan Dewan Kerja Pramuka selama masa sekolah.</p></div>
      <h2>// Training</h2><div class="timeline"><span class="period">Jun 2023 – Jul 2023</span><h3>Gada Pratama</h3><p class="muted">PT Produktif Citra Sukses</p><p>Pelatihan dasar satuan pengamanan mencakup prosedur keamanan, patroli, penanganan situasi darurat, dan kedisiplinan.</p></div></section>
      <section class="card"><h2>// Certifications & Recognition</h2><div class="timeline"><h3>Sertifikat Gada Pratama</h3><p class="muted">PT Produktif Citra Sukses · 2023</p></div><div class="timeline"><h3>Shopee Award 2024</h3><p class="muted">Home Electronic — Best Seller · Jan 2024</p><p>Penghargaan atas pencapaian penjualan kategori Home Electronic sebagaimana tercantum pada CV.</p></div><div class="timeline"><h3>Surat Referensi Kerja</h3><p class="muted">PT SINAR AGUNG INDOTAMA · Mar 2026</p></div></section></div>`
  },

  // ======================== CONTACT =========================
  contact: {
    icon: '✉', label: 'contact.js', heading: 'Contact Information',
    code: [
      '# Get In Touch', '',
      'const contact = {',
      '  email: "jieponk@gmail.com",',
      '  phone: "+62 857 9977 6565",',
      '  instagram: "@rudi_parwanto",',
      '  location: "Jakarta Pusat, Indonesia"',
      '};'
    ],
    html: `<div class="cards"><section class="card"><h2>// Get In Touch</h2>
      <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg></span><div><b>Email</b><small><a href="mailto:jieponk@gmail.com">jieponk@gmail.com</a></small></div></div>
      <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg></span><div><b>Telepon / WhatsApp</b><small><a href="https://wa.me/6285799776565" target="_blank" rel="noopener noreferrer">0857 9977 6565</a></small></div></div>
      <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><div><b>Jakarta Pusat, Indonesia</b><small>Location</small></div></div>
      </section><section class="card"><h2>// Social Links</h2>
      <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18"/></svg></span><div><b>LinkedIn</b><small><a href="https://id.linkedin.com/in/rudi-parwanto-a0723b163" target="_blank" rel="noopener noreferrer">Rudi Parwanto</a></small></div></div>
      <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none"/></svg></span><div><b>Instagram</b><small><a href="https://www.instagram.com/rudi_parwanto/" target="_blank" rel="noopener noreferrer">@rudi_parwanto</a></small></div></div>
      <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/></svg></span><div><b>Facebook</b><small><a href="https://www.facebook.com/rudi.parwanto.2025" target="_blank" rel="noopener noreferrer">Rudi Parwanto</a></small></div></div>
      </section></div>`
  }
};


// ====================== PROJECTS (shared builder) =========
// Edit project facts here; both languages use this function.
function projectsHtml(lang){
  const id = lang === 'id';
  const t = (en, idn) => id ? idn : en;
  const svg = d => '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const ext = svg('<path d="M7 17 17 7M8 7h9v9"/>');
  const git = svg('<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>');
  const lock = svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>');
  const list = (title, items) => '<div><h4>' + title + '</h4><ul>' + items.map(x => '<li>' + x + '</li>').join('') + '</ul></div>';
  const tags = arr => '<div class="tags">' + arr.map(x => '<span class="tag">' + x + '</span>').join('') + '</div>';
  // Browser-window preview. imgs = {dark, light, w, h} or null for a placeholder card.
  const shot = (url, imgs, alt, href) => {
    const bar = '<div class="shot-bar"><span class="shot-lights" aria-hidden="true"><i></i><i></i><i></i></span><span class="shot-url">' + svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>') + url + '</span></div>';
    const body = imgs
      ? '<img class="shot-img shot-dark" src="' + imgs.dark + '" alt="' + alt + '" width="' + imgs.w + '" height="' + imgs.h + '" loading="lazy" decoding="async">'
        + '<img class="shot-img shot-light" src="' + imgs.light + '" alt="" aria-hidden="true" width="' + imgs.w + '" height="' + imgs.h + '" loading="lazy" decoding="async">'
      : '<div class="shot-placeholder"><b>' + url + '</b><span>' + t('Open the live site', 'Buka website live') + ' ↗</span></div>';
    const inner = bar + '<div class="shot-view">' + body + '</div>';
    return href ? '<a class="shot" href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="' + alt + '">' + inner + '</a>' : '<figure class="shot">' + inner + '</figure>';
  };
  const kpis = arr => '<div class="kpis">' + arr.map(([v, l]) => '<div><b>' + v + '</b><span>' + l + '</span></div>').join('') + '</div>';
  return '<div class="projects">'
  + '<section class="card project">'
  +   '<div class="project-head"><div><h2>// 01 · ' + t('E-commerce website', 'Website e-commerce') + '</h2><h3>urbanix.id</h3>'
  +   '<p class="muted">' + t('Online store for creator gear (cameras, lenses, drones, audio) — built solo from scratch for PT Koolsnap Multi Retailindo.', 'Toko online perlengkapan kreator (kamera, lensa, drone, audio) — dibangun sendiri dari nol untuk PT Koolsnap Multi Retailindo.') + '</p></div>'
  +   '<span class="pill">● ' + t('Live since 10 Nov 2026', 'Live sejak 10 Nov 2026') + '</span></div>'
  +   shot('urbanix.id', URBANIX_SHOTS, t('urbanix.id storefront preview', 'Pratinjau toko urbanix.id'), 'https://urbanix.id')
  +   kpis([['±211', t('active products, synced', 'produk aktif & tersinkron')], ['3', t('shipping options', 'opsi pengiriman')], [t('Daily', 'Harian'), t('auto backup to Google Drive', 'backup otomatis ke Google Drive')], ['24/7', t('uptime monitoring & alerts', 'monitoring & notifikasi')]])
  +   '<div class="feature-grid">'
  +     list(t('For shoppers', 'Untuk pembeli'), [
          t('Catalog with variants, search, categories, promos and vouchers', 'Katalog dengan varian, pencarian, kategori, promo, dan voucher'),
          t('Checkout via WhatsApp admin or Shopee — no account needed', 'Checkout via WhatsApp admin atau Shopee — tanpa daftar akun'),
          t('Regular (JNE/J&T), cargo and same-day (GoSend/Grab) shipping', 'Pengiriman Reguler (JNE/J&T), Kargo, dan Same Day (GoSend/Grab)'),
          t('Order tracking and printable invoices', 'Cek status pesanan dan invoice siap cetak'),
          t('Automated emails: confirmation, payment reminder, shipped, review request', 'Email otomatis: konfirmasi, pengingat bayar, paket dikirim, minta ulasan'),
          t('Verified-buyer reviews with stars, text and photos', 'Ulasan pembeli terverifikasi (bintang, teks, foto)')])
  +     list('Seller Center', [
          t('Products, stock, prices, promos, vouchers and banners', 'Kelola produk, stok, harga, promo, voucher, dan banner'),
          t('Orders: status, tracking numbers, buyer chat, review requests via WA', 'Pesanan: status, resi, chat pembeli, minta ulasan via WA'),
          t('Bulk product updates via Excel', 'Mass update produk lewat Excel'),
          t('Articles, comments, reviews and news sources', 'Artikel, komentar, ulasan, dan sumber berita')])
  +     list(t('Google & marketing', 'Google & pemasaran'), [
          t('Indexed in Google Search Console; full SEO (sitemap, JSON-LD, Open Graph)', 'Terindeks di Google Search Console; SEO lengkap (sitemap, JSON-LD, Open Graph)'),
          t('Google Merchant Center feed: 211 products sent daily (awaiting review)', 'Feed Google Merchant Center: 211 produk terkirim harian (menunggu peninjauan)'),
          t('Google Customer Reviews survey to build store rating', 'Survei Google Customer Reviews untuk rating toko'),
          t('“Inspirasi”: articles plus auto-translated camera news', 'Menu Inspirasi: artikel + berita kamera otomatis')])
  +     list(t('Reliability & data', 'Keamanan & operasional'), [
          t('24/7 monitoring with automatic alerts', 'Pemantauan 24 jam dengan notifikasi otomatis'),
          t('Daily database and photo backups copied to Google Drive', 'Backup database & foto harian, disalin ke Google Drive'),
          t('Zero-disruption deploys for shoppers', 'Update website tanpa mengganggu pembeli'),
          t('Privacy policy aligned with Indonesia’s PDP Law', 'Kebijakan privasi mengacu UU PDP')])
  +   '</div>'
  +   tags(['Next.js 14', 'React', 'Django 5.2', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Docker', 'Caddy', 'Cloudflare', 'VPS'])
  +   '<div class="cta-row"><a class="btn btn-primary" href="https://urbanix.id" target="_blank" rel="noopener noreferrer">' + ext + '<span>' + t('Visit urbanix.id', 'Kunjungi urbanix.id') + '</span></a>'
  +   '<a class="btn" href="https://github.com/jieponk/urbanix-store" target="_blank" rel="noopener noreferrer">' + git + '<span>' + t('Source on GitHub', 'Kode di GitHub') + '</span></a></div>'
  + '</section>'
  + '<section class="card project">'
  +   '<div class="project-head"><div><h2>// 02 · ' + t('Internal tool', 'Alat internal') + '</h2><h3>' + t('Marketplace Pricing & Fee Calculator', 'Kalkulator Harga & Fee Marketplace') + '</h3>'
  +   '<p class="muted">' + t('Pricing tool used by the Aneka Foto team to check net income and margin per marketplace before setting a selling price.', 'Alat hitung yang dipakai tim Aneka Foto untuk mengecek pendapatan bersih dan margin per marketplace sebelum menentukan harga jual.') + '</p></div>'
  +   '<span class="pill">● ' + t('Used by the team', 'Dipakai tim') + '</span></div>'
  +   shot('masrudi.site/master', {dark:'assets/projects/calculator-dark.webp', light:'assets/projects/calculator-light.webp', w:1600, h:1241}, t('Marketplace calculator with example data', 'Kalkulator marketplace dengan data contoh'))
  +   '<p class="shot-caption">' + t('Screenshot uses example numbers, not real store data.', 'Screenshot memakai angka contoh, bukan data toko asli.') + '</p>'
  +   kpis([['4', t('stores / marketplaces', 'toko / marketplace')], ['270+', t('Shopee fee categories', 'kategori fee Shopee')], [t('Normal + promo', 'Normal + promo'), t('profit in one view', 'laba dalam satu tampilan')], [t('Login', 'Login'), t('private, session-based', 'akses privat berbasis sesi')]])
  +   '<div class="feature-grid">'
  +     list(t('What it does', 'Fungsi'), [
          t('Inputs: SKU, cost, selling price and supplier cashback', 'Input: SKU, modal, harga jual, dan cashback supplier'),
          t('Shopee, GearNest, TikTok Shop (Mall / Non-Mall) and Blibli', 'Shopee, GearNest, TikTok Shop (Mall / Non-Mall), dan Blibli'),
          t('Searchable fee categories with the matching percentage', 'Pencarian kategori fee lengkap dengan persentasenya'),
          t('Campaign and extra-program toggles', 'Opsi ikut campaign dan program tambahan')])
  +     list(t('Output', 'Hasil'), [
          t('Net income after marketplace fees', 'Pendapatan bersih setelah potongan marketplace'),
          t('Final profit at normal and promo price, colour-coded', 'Laba akhir harga normal dan promo, dengan warna untung/rugi'),
          t('Line-by-line fee breakdown and summary', 'Rincian potongan per komponen dan ringkasan')])
  +   '</div>'
  +   tags(['JavaScript', 'Cloudflare Workers', 'REST API', 'JSON fee tables', t('Session auth', 'Autentikasi sesi')])
  +   '<p class="notice">' + lock + ' ' + t('Internal tool — access is limited to the team, so no public demo.', 'Alat internal — akses khusus tim, jadi tidak ada demo publik.') + '</p>'
  + '</section>'
  + '</div>';
}

// ============================================================
// LANGUAGE SETTINGS — English is the default; Indonesian is optional.
// 5+ years reflects combined e-commerce roles (2017–2019, 2023–present),
// not continuous employment. Update this label as your career progresses.
// ============================================================
const englishPages = structuredClone(pages);
englishPages.projects.html = projectsHtml('en');
englishPages.about.code = [
  '# About Rudi Parwanto', '', 'const specialist = {',
  '  name: "Rudi Parwanto",', '  role: "E-Commerce Specialist",',
  '  location: "Central Jakarta, Indonesia",',
  '  experience: "5+ years in e-commerce",',
  '  focus: "Marketplace Growth & Operations",', '  available: true', '};'
];
englishPages.about.html = `<div class="cards">
  <section class="card"><h2>// Profile</h2>
    <div class="profile"><div class="avatar"><img src="assets/foto-profil.webp" alt="Rudi Parwanto profile photo" width="600" height="600"></div><div><h3>Rudi Parwanto</h3><p class="muted">E-Commerce Specialist · Central Jakarta</p><span class="pill">● Marketplace Growth & Digital Commerce</span></div></div>
    <p>E-Commerce Specialist with 5+ years of combined experience in marketplace operations, product optimization, promotional campaigns, and sales performance analysis across consumer electronics and photography retail.</p>
    <p class="muted">Currently managing Aneka Foto, Urbanix, and GearNest under PT KOOLSNAP MULTI RETAILINDO.</p>
  <div class="cta-row"><a class="btn btn-primary" href="Rudi-Parwanto-CV.pdf" download><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg><span>Download CV</span></a><a class="btn" href="#contact"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 3 10 14"/><path d="M21 3 14.5 21l-4.5-7-7-4.5z"/></svg><span>Contact Me</span></a><a class="btn btn-ghost" href="https://id.linkedin.com/in/rudi-parwanto-a0723b163" target="_blank" rel="noopener noreferrer"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18"/></svg><span>LinkedIn</span></a></div></section>
  <section class="card"><h2>// Quick Facts</h2>
    <div class="facts"><span>Experience:</span><span>5+ years in e-commerce</span></div>
    <div class="facts"><span>Location:</span><span>Central Jakarta, ID</span></div>
    <div class="facts"><span>Current Role:</span><span>E-Commerce Specialist</span></div>
    <div class="facts"><span>Company:</span><span>PT KOOLSNAP MULTI RETAILINDO</span></div>
    <div class="facts"><span>Stores:</span><span>Aneka Foto · Urbanix · GearNest</span></div>
    <div class="facts"><span>Platforms:</span><span>Shopee · TikTok Shop · Lazada</span></div>
  </section></div>`;
englishPages.experience.code = [
 '# Professional Experience', '', 'const currentRole = {',
 '  company: "PT KOOLSNAP MULTI RETAILINDO",',
 '  role: "E-Commerce Specialist",', '  period: "Apr 2026 - Present",',
 '  stores: ["Aneka Foto", "Urbanix", "GearNest"],',
 '  industry: "Camera & Photography Retail"', '};'
];
englishPages.experience.html = `<div class="cards"><section class="card"><h2>// Professional Experience</h2>
 <div class="timeline"><span class="period">Apr 2026 – Present</span><h3>E-Commerce Specialist Staff</h3><p class="muted">PT KOOLSNAP MULTI RETAILINDO · Aneka Foto, Urbanix & GearNest</p><ul><li>Manage three marketplace stores within one company.</li><li>Optimize product listings, catalogs, variants, and sales content for cameras and creator equipment.</li><li>Coordinate promotional campaigns, store operations, and sales performance monitoring.</li></ul></div>
 <div class="timeline"><span class="period">Sep 2023 – Mar 2026</span><h3>E-Commerce Specialist Staff</h3><p class="muted">PT SINAR AGUNG INDOTAMA</p><ul><li>Managed consumer electronics sales across TikTok Shop, Shopee, and Lazada.</li><li>Analyzed sales performance and market trends; prepared reports in Microsoft Excel.</li><li>Optimized product listings and SEO; managed campaigns, live selling, and digital marketing activities.</li><li>Maintained relationships with suppliers, partners, and customers.</li></ul></div>
 <div class="timeline"><span class="period">Mar 2021 – Jan 2023</span><h3>Store Crew</h3><p class="muted">Bebek dan Ayam Kampung Mas Budi</p><p>Restaurant operations, customer service, team coordination, staff scheduling, inventory control, and daily sales reporting.</p></div>
 <div class="timeline"><span class="period">Nov 2019 – Jan 2021</span><h3>Store Crew</h3><p class="muted">PT SUMBER ALFARIA TRIJAYA TBK</p><p>Customer service, point-of-sale operations, product displays, stock checks, replenishment, and goods receiving.</p></div>
 <div class="timeline"><span class="period">Nov 2017 – Nov 2019</span><h3>Marketplace Administrator</h3><p class="muted">PT SINAR AGUNG INDOTAMA</p><p>Uploaded and edited product images, handled customer inquiries, updated prices and promotions, and supported marketplace campaigns.</p></div>
 <div class="timeline"><span class="period">Jul 2017 – Nov 2017</span><h3>Printing & Typesetting</h3><p class="muted">LEE COMPUTER</p><p>Print layout and design editing, print production, quality control, and order management.</p></div>
 </section><section class="card"><h2>// Current Workplace</h2><h3>PT KOOLSNAP MULTI RETAILINDO</h3><p class="muted">One company · Three stores</p>
 <div class="facts"><span>01</span><span>Aneka Foto</span></div><div class="facts"><span>02</span><span>Urbanix</span></div><div class="facts"><span>03</span><span>GearNest</span></div>
 <h2>// Recognition</h2><p><b>Shopee Award 2024 — Home Electronic Best Seller</b></p><p class="muted">Jan 2024 · As listed on the CV.</p></section></div>`;
englishPages.skills.html = `<section class="card"><h2>// Skill Overview</h2><div class="stack">
 <div><h3>Marketplace Platforms</h3><div class="tags"><span class="tag">Shopee</span><span class="tag">TikTok Shop</span><span class="tag">Lazada</span></div></div>
 <div><h3>E-Commerce Operations</h3><div class="tags"><span class="tag">Marketplace Management</span><span class="tag">Product Listing</span><span class="tag">Product SEO</span><span class="tag">Catalog Management</span><span class="tag">Customer Service</span></div></div>
 <div><h3>Marketing & Sales</h3><div class="tags"><span class="tag">Campaign Management</span><span class="tag">Live Selling</span><span class="tag">Digital Marketing</span><span class="tag">Sales Strategy</span></div></div>
 <div><h3>Analytics & Office</h3><div class="tags"><span class="tag">Microsoft Excel</span><span class="tag">Microsoft Word</span><span class="tag">Microsoft Office</span><span class="tag">Sales Analysis</span><span class="tag">Administration</span></div></div>
 <div><h3>Web Development</h3><div class="tags"><span class="tag">HTML / CSS / JavaScript</span><span class="tag">Next.js</span><span class="tag">React</span><span class="tag">Django</span><span class="tag">PostgreSQL</span><span class="tag">Docker</span><span class="tag">Cloudflare</span><span class="tag">Technical SEO</span></div></div>
      <div><h3>Communication & Collaboration</h3><div class="tags"><span class="tag">Communication</span><span class="tag">Negotiation</span><span class="tag">Teamwork</span><span class="tag">Public Speaking</span></div></div>
 </div></section>`;
englishPages.education.html = `<div class="cards"><section class="card"><h2>// Formal Education</h2>
 <div class="timeline"><span class="period">Jun 2014 – Jun 2017</span><h3>SMK Bina Karya 1 Karanganyar</h3><p class="muted">Multimedia</p><p>Participated in student council and scouting activities.</p></div>
 <h2>// Training</h2><div class="timeline"><span class="period">Jun 2023 – Jul 2023</span><h3>Gada Pratama</h3><p class="muted">PT Produktif Citra Sukses</p><p>Basic security training covering safety procedures, patrols, emergency response, and professional discipline.</p></div></section>
 <section class="card"><h2>// Certifications & Recognition</h2><div class="timeline"><h3>Gada Pratama Certificate</h3><p class="muted">PT Produktif Citra Sukses · 2023</p></div><div class="timeline"><h3>Shopee Award 2024</h3><p class="muted">Home Electronic — Best Seller · Jan 2024</p><p>Sales achievement recognition in the Home Electronic category, as stated on the CV.</p></div><div class="timeline"><h3>Employment Reference Letter</h3><p class="muted">PT SINAR AGUNG INDOTAMA · Mar 2026</p></div></section></div>`;
englishPages.contact.code = ['# Contact Information','','const contact = {','  email: "jieponk@gmail.com",','  phone: "+62 857 9977 6565",','  instagram: "@rudi_parwanto",','  location: "Central Jakarta, Indonesia"','};'];
englishPages.contact.html = `<div class="cards"><section class="card"><h2>// Get In Touch</h2>
 <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg></span><div><b>Email</b><small><a href="mailto:jieponk@gmail.com">jieponk@gmail.com</a></small></div></div>
 <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg></span><div><b>Phone / WhatsApp</b><small><a href="https://wa.me/6285799776565" target="_blank" rel="noopener noreferrer">+62 857 9977 6565</a></small></div></div>
 <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg></span><div><b>Central Jakarta, Indonesia</b><small>Location</small></div></div>
 </section><section class="card"><h2>// Social Links</h2>
 <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18"/></svg></span><div><b>LinkedIn</b><small><a href="https://id.linkedin.com/in/rudi-parwanto-a0723b163" target="_blank" rel="noopener noreferrer">Rudi Parwanto</a></small></div></div>
 <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none"/></svg></span><div><b>Instagram</b><small><a href="https://www.instagram.com/rudi_parwanto/" target="_blank" rel="noopener noreferrer">@rudi_parwanto</a></small></div></div>
 <div class="contact-row"><span class="icon"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/></svg></span><div><b>Facebook</b><small><a href="https://www.facebook.com/rudi.parwanto.2025" target="_blank" rel="noopener noreferrer">Rudi Parwanto</a></small></div></div>
 </section></div>`;
let language = localStorage.getItem('rudi-language') === 'id' ? 'id' : 'en';
function activePages(){ return language === 'en' ? englishPages : pages; }
function setPortfolioLanguage(next){
 if(next !== 'en' && next !== 'id') return;
 language = next;
 localStorage.setItem('rudi-language', language);
 document.documentElement.lang = language;
 render();
 window.dispatchEvent(new CustomEvent('portfolio-language-change',{detail:{language}}));
}
document.documentElement.lang = language;

let active='about';const tabs=document.getElementById('tabs'),files=document.getElementById('files'),editor=document.getElementById('editor');
function escapeHTML(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
function highlight(s){if(s.startsWith('#'))return '<span class="comment">'+escapeHTML(s)+'</span>';let escaped=escapeHTML(s);return escaped.replace(/("(?:[^"\\]|\\.)*")|\b(const|true|false)\b|\b([a-zA-Z]+)(?=:)/g,(m,str,kw,prop)=>str?'<span class="string">'+str+'</span>':kw?'<span class="'+(kw==='const'?'keyword':'bool')+'">'+kw+'</span>':'<span class="prop">'+prop+'</span>')}
function select(id){if(!activePages()[id])return;active=id;render();editor.scrollTop=0;history.replaceState(null,'','#'+id)}
function render(){tabs.replaceChildren();files.replaceChildren();Object.entries(activePages()).forEach(([id,p])=>{let t=document.createElement('button');t.type='button';t.className='tab'+(id===active?' active':'');t.setAttribute('aria-label','Open '+p.label.replace('.js','')+' section');t.innerHTML='<span class="fi" aria-hidden="true">JS</span><span class="tab-label">'+p.label+'</span>';t.dataset.page=id;t.onclick=()=>select(id);tabs.append(t);let f=document.createElement('button');f.type='button';f.className='file'+(id===active?' active':'');f.setAttribute('aria-label','Open '+p.label.replace('.js','')+' section');f.innerHTML='<span class="fi" aria-hidden="true">JS</span><span class="filename">'+p.label+'</span>';f.dataset.page=id;f.dataset.id=id;f.onclick=()=>select(id);files.append(f)});let p=activePages()[active];document.getElementById('breadcrumb').innerHTML='<span>cv-portfolio</span><i class="crumb-sep">›</i><span>src</span><i class="crumb-sep">›</i><span>components</span><i class="crumb-sep">›</i><span class="fi" aria-hidden="true">JS</span><b>'+p.label+'</b>';document.getElementById('code').innerHTML=p.code.map((line,i)=>'<div class="line"><span class="ln">'+(i+1)+'</span><span>'+highlight(line)+'</span></div>').join('');document.getElementById('content').innerHTML=p.html;document.getElementById('linecount').textContent=Object.values(activePages()).reduce((n,p)=>n+p.code.length,0)}
function syncThemeButton(){const b=document.getElementById('theme');if(!b)return;const light=document.body.classList.contains('light');b.innerHTML=light?'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg><span>Dark</span>':'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><span>Light</span>';b.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=light?'#f8f8f8':'#1f1f1f'}document.getElementById('theme').onclick=()=>{document.body.classList.toggle('light');syncThemeButton()};function clock(){document.getElementById('clock').textContent=new Date().toLocaleString('en-US',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true})}clock();setInterval(clock,30000);window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(activePages()[id]&&id!==active){active=id;render()}});active=activePages()[location.hash.slice(1)]?location.hash.slice(1):'about';render();


// Persist theme selection; initialize after the existing theme button handler.
(function(){
  const button=document.getElementById('theme');
  if(!button) return;
  try {
    if(localStorage.getItem('cvstudio-theme')==='light' && !document.body.classList.contains('light')){
      button.click();
    }
  }catch(e){}
  button.addEventListener('click',function(){
    try {localStorage.setItem('cvstudio-theme',document.body.classList.contains('light')?'light':'dark')}catch(e){}
  });
})();
