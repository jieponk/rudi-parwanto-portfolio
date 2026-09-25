const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'blog');
const OUT = path.join(ROOT, 'blog');
const SITE = 'https://rudiparwanto.netlify.app';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slugOK = s => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const fmtDate = s => new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(s+'T00:00:00Z'));
function inline(s){
  let x=esc(s);
  x=x.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>');
  x=x.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" rel="noopener noreferrer">$1</a>');
  return x;
}
function markdown(md=''){
  const lines=String(md).replace(/\r/g,'').split('\n'); let html='', para=[], list=false;
  const flush=()=>{if(para.length){html+=`<p>${inline(para.join(' '))}</p>`;para=[]}};
  const endList=()=>{if(list){html+='</ul>';list=false}};
  for(const line of lines){
    if(!line.trim()){flush();endList();continue}
    const h=line.match(/^(#{1,3})\s+(.+)$/); if(h){flush();endList();html+=`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;continue}
    const li=line.match(/^[-*]\s+(.+)$/); if(li){flush();if(!list){html+='<ul>';list=true}html+=`<li>${inline(li[1])}</li>`;continue}
    const q=line.match(/^>\s?(.+)$/); if(q){flush();endList();html+=`<blockquote>${inline(q[1])}</blockquote>`;continue}
    para.push(line.trim());
  }
  flush();endList();return html;
}
function shell({title,description,canonical,body,type='website',image=''}){
  const ogImage=image ? (image.startsWith('http')?image:SITE+image) : SITE+'/assets/foto-profil.webp';
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${ogImage}"><meta name="twitter:card" content="summary_large_image"><link rel="alternate" type="application/rss+xml" title="Blog Rudi Parwanto" href="/feed.xml"><link rel="stylesheet" href="/blog/blog.css"></head><body><header class="top"><a class="brand" href="/">RUDI PARWANTO</a><nav aria-label="Navigasi"><a href="/">Portfolio</a><a aria-current="page" href="/blog/">Blog</a></nav></header>${body}<footer>© ${new Date().getUTCFullYear()} Rudi Parwanto · E-Commerce Specialist</footer></body></html>`;
}
fs.mkdirSync(OUT,{recursive:true});
const files=fs.existsSync(CONTENT)?fs.readdirSync(CONTENT).filter(f=>f.endsWith('.json')):[];
const posts=files.map(f=>JSON.parse(fs.readFileSync(path.join(CONTENT,f),'utf8'))).filter(p=>p.title&&p.slug&&p.date&&slugOK(p.slug)).sort((a,b)=>new Date(b.date)-new Date(a.date));
const cards=posts.map(p=>`<article class="card">${p.image?`<a href="/blog/${p.slug}/"><img src="${esc(p.image)}" alt="" loading="lazy"></a>`:''}<div><span class="category">${esc(p.category||'E-Commerce')}</span><h2><a href="/blog/${p.slug}/">${esc(p.title)}</a></h2><p>${esc(p.description||'')}</p><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></div></article>`).join('');
fs.writeFileSync(path.join(OUT,'index.html'),shell({title:'Blog — Rudi Parwanto',description:'Artikel Rudi Parwanto tentang e-commerce, marketplace operations, product SEO, campaign, dan workflow.',canonical:SITE+'/blog/',body:`<main class="wrap"><section class="hero"><p class="eyebrow">NOTES & INSIGHTS</p><h1>Blog</h1><p>Catatan praktis seputar e-commerce, marketplace, product SEO, campaign, dan workflow.</p></section><section class="grid">${cards||'<p>Belum ada artikel.</p>'}</section></main>`}));
for(const p of posts){
  const dir=path.join(OUT,p.slug);fs.mkdirSync(dir,{recursive:true});
  const article=`<main class="article"><a class="back" href="/blog/">← Semua artikel</a><article><span class="category">${esc(p.category||'E-Commerce')}</span><h1>${esc(p.title)}</h1><div class="meta"><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time> · Rudi Parwanto</div>${p.image?`<img class="cover" src="${esc(p.image)}" alt="">`:''}<div class="prose">${markdown(p.body)}</div></article></main>`;
  const schema=JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description||'',datePublished:p.date,author:{'@type':'Person',name:'Rudi Parwanto'},mainEntityOfPage:SITE+'/blog/'+p.slug+'/',image:p.image?(p.image.startsWith('http')?p.image:SITE+p.image):undefined});
  let page=shell({title:`${p.title} — Rudi Parwanto`,description:p.description||'',canonical:SITE+'/blog/'+p.slug+'/',body:article,type:'article',image:p.image||''});
  page=page.replace('</head>',`<script type="application/ld+json">${schema.replace(/</g,'\\u003c')}</script></head>`);
  fs.writeFileSync(path.join(dir,'index.html'),page);
}
const rss=posts.map(p=>`<item><title>${esc(p.title)}</title><link>${SITE}/blog/${p.slug}/</link><guid>${SITE}/blog/${p.slug}/</guid><pubDate>${new Date(p.date+'T00:00:00Z').toUTCString()}</pubDate><description>${esc(p.description||'')}</description></item>`).join('');
fs.writeFileSync(path.join(ROOT,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog Rudi Parwanto</title><link>${SITE}/blog/</link><description>E-Commerce, marketplace operations, product SEO, campaign, dan workflow.</description><language>id-ID</language>${rss}</channel></rss>`);
const urls=[SITE+'/',SITE+'/blog/',...posts.map(p=>SITE+'/blog/'+p.slug+'/')];
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${posts.length} blog post(s).`);
