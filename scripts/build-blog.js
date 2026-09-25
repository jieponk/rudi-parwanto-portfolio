const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'blog');
const OUT = path.join(ROOT, 'blog');
const SITE = 'https://rudiparwanto.netlify.app';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slugOK = s => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
function parseDate(value){
  if(typeof value !== 'string' || !value.trim()) return null;
  const match=value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(!match) return null;
  const iso=`${match[1]}-${match[2]}-${match[3]}`;
  const date=new Date(`${iso}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10)===iso ? {iso,date} : null;
}
const fmtDate = s => {
  const parsed=parseDate(s);
  if(!parsed) return 'Tanggal tidak tersedia';
  return new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(parsed.date);
};
function inline(s){
  let x=esc(s);
  x=x.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>');
  x=x.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" rel="noopener noreferrer">$1</a>');
  return x;
}
function markdown(md=''){
  const lines=String(md).replace(/\r/g,'').replace(/^\\(?=[#>*-]\s?)/gm,'').split('\n'); let html='', para=[], list=false;
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
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${ogImage}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${ogImage}"><meta property="og:site_name" content="Rudi Parwanto Portfolio"><link rel="alternate" type="application/rss+xml" title="Blog Rudi Parwanto" href="/feed.xml"><script>document.documentElement.dataset.theme=localStorage.getItem('cv-theme')||'dark'</script><link rel="stylesheet" href="/blog/blog.css"></head><body><header class="mac-menu"><div class="menu-left"><a class="apple" href="/" aria-label="Kembali ke portofolio"><img src="/assets/icon-apple.webp" alt="" width="17" height="17"></a><b>CV Studio</b><nav aria-label="Navigasi utama"><a href="/">Portfolio</a><a class="active" href="/blog/" aria-current="page">Blog</a></nav></div><div class="menu-right"><button class="theme-toggle" type="button" aria-label="Ganti tema" onclick="let t=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=t;localStorage.setItem('cv-theme',t);this.textContent=t==='light'?'☾':'☀'">☀</button><span class="menu-clock" id="clock"></span></div></header><div class="window"><div class="titlebar"><div class="lights" aria-hidden="true"><i></i><i></i><i></i></div><span>CV Studio — Rudi Parwanto</span><span class="title-right">HTML&nbsp; · &nbsp;BLOG</span></div><nav class="tabs" aria-label="Tab"><a href="/">portfolio.js <span aria-hidden="true">↗</span></a><a href="/blog/" class="selected">blog.md</a></nav><div class="work"><aside class="sidebar"><div class="explorer-title">EXPLORER</div><a class="folder" href="/"><img src="/assets/icon-folder.webp" alt="" width="15" height="15"> cv-portfolio</a><a class="file-link" href="/">⌘ &nbsp; portfolio.js</a><a class="file-link selected" href="/blog/">▤ &nbsp; blog.md</a><div class="sidebar-caption">RUDI PARWANTO<br>E-Commerce Specialist</div></aside><div class="editor"><div class="breadcrumb"><a href="/">cv-portfolio</a> <span>›</span> <a href="/blog/">blog.md</a></div>${body}</div></div><footer class="status"><span>Ready &nbsp; · &nbsp; Blog</span><span>UTF-8 &nbsp; · &nbsp; Markdown</span></footer></div><script>const c=document.getElementById('clock');function tick(){c.textContent=new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit'}).format(new Date())}tick();setInterval(tick,60000);document.querySelector('.theme-toggle').textContent=document.documentElement.dataset.theme==='light'?'☾':'☀'</script></body></html>`;
}
fs.mkdirSync(OUT,{recursive:true});
const files=fs.existsSync(CONTENT)?fs.readdirSync(CONTENT).filter(f=>f.endsWith('.json')):[];
const posts=[];
const used=new Set();
for(const file of files){
  try{
    const p=JSON.parse(fs.readFileSync(path.join(CONTENT,file),'utf8'));
    const date=parseDate(p.date);
    if(!p || typeof p.title!=='string' || !p.title.trim() || typeof p.slug!=='string' || !slugOK(p.slug) || !date || used.has(p.slug)){
      console.warn(`Skipping ${file}: missing/invalid title, slug, date, or duplicate slug`);
      continue;
    }
    used.add(p.slug);
    posts.push({...p,date:date.iso});
  }catch(error){console.warn(`Skipping ${file}: ${error.message}`)}
}
posts.sort((a,b)=>b.date.localeCompare(a.date));
const cards=posts.map(p=>`<article class="card">${p.image?`<a href="/blog/${p.slug}/"><img src="${esc(p.image)}" alt="" loading="lazy"></a>`:''}<div><span class="category">${esc(p.category||'E-Commerce')}</span><h2><a href="/blog/${p.slug}/">${esc(p.title)}</a></h2><p>${esc(p.description||'')}</p><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></div></article>`).join('');
fs.writeFileSync(path.join(OUT,'index.html'),shell({title:'Blog — Rudi Parwanto',description:'Artikel Rudi Parwanto tentang e-commerce, marketplace operations, product SEO, campaign, dan workflow.',canonical:SITE+'/blog/',body:`<main class="wrap"><section class="hero"><p class="eyebrow">NOTES & INSIGHTS</p><h1>Blog</h1><p>Catatan praktis seputar e-commerce, marketplace, product SEO, campaign, dan workflow.</p></section><section class="grid">${cards||'<p>Belum ada artikel.</p>'}</section></main>`}));
for(const p of posts){
  const dir=path.join(OUT,p.slug);fs.mkdirSync(dir,{recursive:true});
  const article=`<main class="article"><a class="back" href="/blog/">← Semua artikel</a><article><span class="category">${esc(p.category||'E-Commerce')}</span><h1>${esc(p.title)}</h1><div class="meta"><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time> · Rudi Parwanto</div>${p.image?`<img class="cover" src="${esc(p.image)}" alt="">`:''}<div class="prose">${markdown(p.body)}</div></article></main>`;
  const schema=JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description||'',datePublished:p.date,author:{'@type':'Person',name:'Rudi Parwanto'},mainEntityOfPage:SITE+'/blog/'+p.slug+'/',image:p.image?(p.image.startsWith('http')?p.image:SITE+p.image):undefined});
  let page=shell({title:`${p.title} — Rudi Parwanto`,description:p.description||'',canonical:SITE+'/blog/'+p.slug+'/',body:article,type:'article',image:p.image||''});
  page=page.replace('</head>',`<meta property="article:published_time" content="${esc(p.date)}"><meta property="article:author" content="Rudi Parwanto"><script type="application/ld+json">${schema.replace(/</g,'\\u003c')}</script></head>`);
  fs.writeFileSync(path.join(dir,'index.html'),page);
}
const rss=posts.map(p=>`<item><title>${esc(p.title)}</title><link>${SITE}/blog/${p.slug}/</link><guid>${SITE}/blog/${p.slug}/</guid><pubDate>${new Date(p.date+'T00:00:00Z').toUTCString()}</pubDate><description>${esc(p.description||'')}</description></item>`).join('');
fs.writeFileSync(path.join(ROOT,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog Rudi Parwanto</title><link>${SITE}/blog/</link><description>E-Commerce, marketplace operations, product SEO, campaign, dan workflow.</description><language>id-ID</language>${rss}</channel></rss>`);
const today=new Date().toISOString().slice(0,10);
const urls=[{loc:SITE+'/',lastmod:today},{loc:SITE+'/blog/',lastmod:posts[0]?.date||today},...posts.map(p=>({loc:SITE+'/blog/'+p.slug+'/',lastmod:p.date}))];
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('')}</urlset>`);
console.log(`Built ${posts.length} blog post(s).`);
