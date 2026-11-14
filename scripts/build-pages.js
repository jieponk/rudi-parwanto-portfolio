// Generates /links/index.html and /404.html with the shared VS Code × macOS chrome.
// Run: node scripts/build-pages.js  (also part of `npm run build`).
'use strict';
const fs = require('fs');
const path = require('path');
const { chrome, themeBoot, bodyOpen, svg } = require('./chrome');
const ROOT = path.resolve(__dirname, '..');
const V = '20261114c';

const I = {
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>',
  book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  camera: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none"/>',
  phone: '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18"/>',
  people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
  back: '<path d="M19 12H5m0 0 6-6m-6 6 6 6"/>'
};
const ic = k => svg(I[k]);

function page({ title, description, canonical, robots, frame, body, extraCss = '' }) {
  return `<!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">`
    + `<title>${title}</title><meta name="description" content="${description}">${canonical ? `<link rel="canonical" href="${canonical}">` : ''}${robots ? `<meta name="robots" content="${robots}">` : ''}`
    + `<meta name="theme-color" content="#1f1f1f"><link rel="icon" href="/favicon.ico?v=2" sizes="any">${themeBoot}`
    + `<link rel="stylesheet" href="/vscode.css?v=${V}">${extraCss}</head>${bodyOpen}${frame.head}${body}${frame.foot}`
    + `<script src="/site-chrome.js?v=${V}"></script></body></html>\n`;
}

// ---------- /links ----------
const links = [
  ['/', 'home', 'Portfolio', 'Experience, projects & skills', false],
  ['/blog/', 'book', 'Blog', 'Notes, workflow & e-commerce', false],
  ['https://www.instagram.com/rudi_parwanto/', 'camera', 'Instagram', '@rudi_parwanto', true],
  ['https://wa.me/6285799776565', 'phone', 'WhatsApp', '+62 857 9977 6565', true],
  ['mailto:jieponk@gmail.com', 'mail', 'Email', 'jieponk@gmail.com', false],
  ['https://id.linkedin.com/in/rudi-parwanto-a0723b163', 'brief', 'LinkedIn', 'Rudi Parwanto', true],
  ['https://www.facebook.com/rudi.parwanto.2025', 'people', 'Facebook', 'Rudi Parwanto', true]
];
const linkCards = links.map(([href, icon, name, sub, ext]) =>
  `<a class="link-card" href="${href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}><span class="link-icon">${ic(icon)}</span><span class="link-text"><b>${name}</b><small>${sub}</small></span><span class="arrow">${ic('arrow')}</span></a>`).join('');

const linksBody = `<div class="links-content">
<section class="profile-card" aria-labelledby="profile-name">
  <img class="links-avatar" src="/assets/foto-profil.webp" alt="Rudi Parwanto" width="112" height="112" fetchpriority="high">
  <div><p class="eyebrow">// personal hub</p><h1 id="profile-name">Rudi Parwanto</h1><p class="role">E-Commerce Specialist · Jakarta</p>
  <span class="pill"><span class="online-dot" aria-hidden="true"></span>Available Online</span></div>
</section>
<section class="link-section" aria-labelledby="connect-title">
  <h2 class="section-title" id="connect-title">// Connect &amp; Explore</h2>
  <div class="link-grid">${linkCards}</div>
</section>
<section class="shop-card" aria-labelledby="shop-title">
  <div class="shop-copy"><p class="eyebrow">// camera &amp; gear</p><h2 id="shop-title">Cari Kamera &amp; Gear?</h2><p>Temukan kamera, lensa, dan perlengkapan pilihan di Aneka Foto.</p></div>
  <a class="btn btn-primary" href="https://shopee.co.id/anekafoto" target="_blank" rel="noopener noreferrer">${ic('bag')}<span>Belanja di Aneka Foto</span>${ic('arrow')}</a>
</section>
</div>`;

fs.writeFileSync(path.join(ROOT, 'links', 'index.html'), page({
  title: 'Links — Rudi Parwanto',
  description: 'Link resmi Rudi Parwanto — portfolio, blog, kontak, dan Aneka Foto.',
  canonical: 'https://masrudi.site/links/',
  frame: chrome({ section: 'links', app: 'Links Studio', crumbs: ['cv-portfolio', 'links'] }),
  body: linksBody,
  extraCss: `<link rel="stylesheet" href="/links/links.css?v=${V}">`
}));

// ---------- 404 ----------
const notFoundBody = `<div class="nf">
<pre class="nf-code" aria-hidden="true"><span class="c">// 404.html</span>
<span class="k">throw new</span> <span class="t">Error</span>(<span class="s">"File not found"</span>);</pre>
<h1 id="nf-title">404 — File Not Found</h1>
<p id="nf-msg">The page you’re looking for doesn’t exist or has been moved.</p>
<div class="nf-actions"><a class="btn btn-primary" href="/" id="nf-home">${ic('back')}<span>Return to Portfolio</span></a><a class="btn" href="/blog/">${ic('book')}<span>Open Blog</span></a></div>
</div>
<script>try{if(localStorage.getItem('rudi-language')==='id'){document.documentElement.lang='id';document.getElementById('nf-msg').textContent='Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.';document.querySelector('#nf-home span').textContent='Kembali ke Portofolio'}}catch(e){}</script>`;

fs.writeFileSync(path.join(ROOT, '404.html'), page({
  title: '404 — CV Studio',
  description: 'Page not found',
  robots: 'noindex',
  frame: chrome({ section: '404', app: 'CV Studio', crumbs: ['cv-portfolio'] }),
  body: notFoundBody,
  extraCss: `<link rel="stylesheet" href="/links/links.css?v=${V}">`
}));
console.log('Built links/index.html and 404.html');
