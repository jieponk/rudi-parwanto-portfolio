// ============================================================
// RUDI PARWANTO — PORTFOLIO CONTENT
// Edit text inside code: [...] and html: `...` for each tab.
// Save the file, then redeploy this entire folder to Netlify.
// ============================================================

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
      </section>
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

  // ======================== SKILLS ==========================
  skills: {
    icon: '⌘', label: 'skills.js', heading: 'Skills & Expertise',
    code: [
      '# Core Competencies', '',
      'const skills = {',
      '  platforms: ["Shopee", "TikTok Shop", "Lazada"],',
      '  commerce: ["Product SEO", "Campaign", "Live Selling"],',
      '  analytics: ["Microsoft Excel", "Sales Reporting"],',
      '  people: ["Communication", "Negotiation", "Teamwork"]',
      '};'
    ],
    html: `<section class="card"><h2>// Skill Overview</h2><div class="stack">
      <div><h3>Marketplace Platforms</h3><div class="tags"><span class="tag">Shopee</span><span class="tag">TikTok Shop</span><span class="tag">Lazada</span></div></div>
      <div><h3>E-Commerce Operations</h3><div class="tags"><span class="tag">Marketplace Management</span><span class="tag">Product Listing</span><span class="tag">Product SEO</span><span class="tag">Catalog Management</span><span class="tag">Customer Service</span></div></div>
      <div><h3>Marketing & Sales</h3><div class="tags"><span class="tag">Campaign Management</span><span class="tag">Live Streaming</span><span class="tag">Digital Marketing</span><span class="tag">Sales Strategy</span></div></div>
      <div><h3>Analytics & Office</h3><div class="tags"><span class="tag">Microsoft Excel</span><span class="tag">Microsoft Word</span><span class="tag">Microsoft Office</span><span class="tag">Sales Analysis</span><span class="tag">Administration</span></div></div>
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
      <div class="contact-row"><span class="icon">✉</span><div><b>Email</b><small><a href="mailto:jieponk@gmail.com">jieponk@gmail.com</a></small></div></div>
      <div class="contact-row"><span class="icon">☎</span><div><b>Telepon / WhatsApp</b><small><a href="https://wa.me/6285799776565" target="_blank" rel="noopener noreferrer">0857 9977 6565</a></small></div></div>
      <div class="contact-row"><span class="icon">⌖</span><div><b>Jakarta Pusat, Indonesia</b><small>Location</small></div></div>
      </section><section class="card"><h2>// Social Links</h2>
      <div class="contact-row"><span class="icon">▣</span><div><b>LinkedIn</b><small><a href="https://id.linkedin.com/in/rudi-parwanto-a0723b163" target="_blank" rel="noopener noreferrer">Rudi Parwanto ↗</a></small></div></div>
      <div class="contact-row"><span class="icon">◎</span><div><b>Instagram</b><small><a href="https://www.instagram.com/rudi_parwanto/" target="_blank" rel="noopener noreferrer">@rudi_parwanto ↗</a></small></div></div>
      <div class="contact-row"><span class="icon">f</span><div><b>Facebook</b><small><a href="https://www.facebook.com/rudi.parwanto.2025" target="_blank" rel="noopener noreferrer">Rudi Parwanto ↗</a></small></div></div>
      </section></div>`
  }
};


// ============================================================
// LANGUAGE SETTINGS — English is the default; Indonesian is optional.
// 5+ years reflects combined e-commerce roles (2017–2019, 2023–present),
// not continuous employment. Update this label as your career progresses.
// ============================================================
const englishPages = structuredClone(pages);
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
  </section>
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
 <div><h3>Communication & Collaboration</h3><div class="tags"><span class="tag">Communication</span><span class="tag">Negotiation</span><span class="tag">Teamwork</span><span class="tag">Public Speaking</span></div></div>
 </div></section>`;
englishPages.education.html = `<div class="cards"><section class="card"><h2>// Formal Education</h2>
 <div class="timeline"><span class="period">Jun 2014 – Jun 2017</span><h3>SMK Bina Karya 1 Karanganyar</h3><p class="muted">Multimedia</p><p>Participated in student council and scouting activities.</p></div>
 <h2>// Training</h2><div class="timeline"><span class="period">Jun 2023 – Jul 2023</span><h3>Gada Pratama</h3><p class="muted">PT Produktif Citra Sukses</p><p>Basic security training covering safety procedures, patrols, emergency response, and professional discipline.</p></div></section>
 <section class="card"><h2>// Certifications & Recognition</h2><div class="timeline"><h3>Gada Pratama Certificate</h3><p class="muted">PT Produktif Citra Sukses · 2023</p></div><div class="timeline"><h3>Shopee Award 2024</h3><p class="muted">Home Electronic — Best Seller · Jan 2024</p><p>Sales achievement recognition in the Home Electronic category, as stated on the CV.</p></div><div class="timeline"><h3>Employment Reference Letter</h3><p class="muted">PT SINAR AGUNG INDOTAMA · Mar 2026</p></div></section></div>`;
englishPages.contact.code = ['# Contact Information','','const contact = {','  email: "jieponk@gmail.com",','  phone: "+62 857 9977 6565",','  instagram: "@rudi_parwanto",','  location: "Central Jakarta, Indonesia"','};'];
englishPages.contact.html = `<div class="cards"><section class="card"><h2>// Get In Touch</h2>
 <div class="contact-row"><span class="icon">✉</span><div><b>Email</b><small><a href="mailto:jieponk@gmail.com">jieponk@gmail.com</a></small></div></div>
 <div class="contact-row"><span class="icon">☎</span><div><b>Phone / WhatsApp</b><small><a href="https://wa.me/6285799776565" target="_blank" rel="noopener noreferrer">+62 857 9977 6565</a></small></div></div>
 <div class="contact-row"><span class="icon">⌖</span><div><b>Central Jakarta, Indonesia</b><small>Location</small></div></div>
 </section><section class="card"><h2>// Social Links</h2>
 <div class="contact-row"><span class="icon">▣</span><div><b>LinkedIn</b><small><a href="https://id.linkedin.com/in/rudi-parwanto-a0723b163" target="_blank" rel="noopener noreferrer">Rudi Parwanto ↗</a></small></div></div>
 <div class="contact-row"><span class="icon">◎</span><div><b>Instagram</b><small><a href="https://www.instagram.com/rudi_parwanto/" target="_blank" rel="noopener noreferrer">@rudi_parwanto ↗</a></small></div></div>
 <div class="contact-row"><span class="icon">f</span><div><b>Facebook</b><small><a href="https://www.facebook.com/rudi.parwanto.2025" target="_blank" rel="noopener noreferrer">Rudi Parwanto ↗</a></small></div></div>
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
function render(){tabs.replaceChildren();files.replaceChildren();Object.entries(activePages()).forEach(([id,p])=>{let t=document.createElement('button');t.type='button';t.className='tab'+(id===active?' active':'');t.setAttribute('aria-label','Open '+p.label.replace('.js','')+' section');t.innerHTML='<img class="nav-icon" src="assets/icon-'+id.replace('about','profile').replace('experience','briefcase').replace('skills','code').replace('education','education').replace('contact','mail')+'.webp" alt=""> '+p.label;t.onclick=()=>select(id);tabs.append(t);let f=document.createElement('button');f.type='button';f.className='file'+(id===active?' active':'');f.setAttribute('aria-label','Open '+p.label.replace('.js','')+' section');f.innerHTML='<img class="nav-icon" src="assets/icon-'+id.replace('about','profile').replace('experience','briefcase').replace('skills','code').replace('education','education').replace('contact','mail')+'.webp" alt=""><span class="filename">'+p.label+'</span>';f.onclick=()=>select(id);files.append(f)});let p=activePages()[active];document.getElementById('breadcrumb').innerHTML='cv-portfolio &gt; src &gt; components &gt; <b>'+p.label+'</b>';document.getElementById('code').innerHTML=p.code.map((line,i)=>'<div class="line"><span class="ln">'+(i+1)+'</span><span>'+highlight(line)+'</span></div>').join('');document.getElementById('content').innerHTML=p.html;document.getElementById('linecount').textContent=Object.values(activePages()).reduce((n,p)=>n+p.code.length,0)}
document.getElementById('theme').onclick=()=>{document.body.classList.toggle('light');document.getElementById('theme').innerHTML=document.body.classList.contains('light')?'☾ Dark':'<img src="assets/icon-sun.webp" alt="" width="14" height="14"> Light'};function clock(){document.getElementById('clock').textContent=new Date().toLocaleString('en-US',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true})}clock();setInterval(clock,30000);window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(activePages()[id]&&id!==active){active=id;render()}});active=activePages()[location.hash.slice(1)]?location.hash.slice(1):'about';render();


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
