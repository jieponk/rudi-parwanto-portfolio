const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'blog');
const OUT = path.join(ROOT, 'blog');
const SETTINGS = path.join(ROOT, 'content', 'settings', 'blog.json');
const SITE = 'https://rudiparwanto.netlify.app';
const PER_PAGE = 4;
const BLOG_MEDIA = path.join(ROOT, 'assets', 'blog');
let sharp = null;
try { sharp = require('sharp'); } catch (e) { console.warn('Sharp tidak tersedia; gambar blog tidak dikonversi ke WebP.'); }
function webpPath(src){
  if(typeof src !== 'string') return src;
  const clean=src.split('?')[0];
  if(!/^\/assets\/blog\/.*\.(jpe?g|png)$/i.test(clean)) return src;
  return clean.replace(/\.(jpe?g|png)$/i,'.webp');
}
async function convertBlogImages(){
  if(!sharp || !fs.existsSync(BLOG_MEDIA)) return;
  const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(ent=>ent.isDirectory()?walk(path.join(dir,ent.name)):[path.join(dir,ent.name)]);
  for(const input of walk(BLOG_MEDIA).filter(f=>/\.(jpe?g|png)$/i.test(f))){
    const output=input.replace(/\.(jpe?g|png)$/i,'.webp');
    try{
      const srcStat=fs.statSync(input), outStat=fs.existsSync(output)?fs.statSync(output):null;
      if(!outStat || srcStat.mtimeMs>outStat.mtimeMs) await sharp(input).rotate().resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true}).webp({quality:82,effort:4}).toFile(output);
    }catch(e){console.warn(`WebP gagal untuk ${path.relative(ROOT,input)}: ${e.message}`)}
  }
}
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const escAttr = s => esc(s).replace(/`/g,'&#96;');
const slugOK = s => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
function parseDate(value){if(typeof value!=='string'||!value.trim())return null;const m=value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);if(!m)return null;const iso=`${m[1]}-${m[2]}-${m[3]}`,date=new Date(`${iso}T00:00:00Z`);return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===iso?{iso,date}:null}
const fmtDate=s=>{const p=parseDate(s);return p?new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(p.date):'Tanggal tidak tersedia'};
function safeHref(value=''){
  const v=String(value).trim();
  return /^(https?:\/\/|mailto:|\/|#)/i.test(v) ? v : '#';
}
function inline(input=''){
  let source=String(input);
  const codes=[];
  source=source.replace(/`([^`]+)`/g,(_,code)=>`\u0000CODE${codes.push(code)-1}\u0000`);
  let x=esc(source);
  x=x.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+["']([^"']*)["'])?\)/g,(_,alt,url,title)=>{
    const href=safeHref(url);
    return `<img src="${escAttr(href)}" alt="${escAttr(alt)}"${title?` title="${escAttr(title)}"`:''} loading="lazy">`;
  });
  x=x.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+["']([^"']*)["'])?\)/g,(_,label,url,title)=>{
    const href=safeHref(url), external=/^https?:\/\//i.test(href);
    return `<a href="${escAttr(href)}"${title?` title="${escAttr(title)}"`:''}${external?' rel="noopener noreferrer" target="_blank"':''}>${label}</a>`;
  });
  x=x.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
     .replace(/__(.+?)__/g,'<strong>$1</strong>')
     .replace(/~~(.+?)~~/g,'<del>$1</del>')
     .replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<em>$2</em>')
     .replace(/(^|[^_])_([^_\n]+)_/g,'$1<em>$2</em>');
  x=x.replace(/\u0000CODE(\d+)\u0000/g,(_,i)=>`<code>${esc(codes[Number(i)]||'')}</code>`);
  return x;
}
function splitTableRow(line=''){
  let s=String(line).trim();
  if(s.startsWith('|')) s=s.slice(1);
  if(s.endsWith('|')) s=s.slice(0,-1);
  return s.split('|').map(x=>x.trim());
}
function markdown(md=''){
  const source=String(md).replace(/\r/g,'').replace(/^\\(?=(?:#{1,6}\s|[-+*>]\s|\d+\.\s))/gm,'');
  const lines=source.split('\n');
  let html='';
  const isBlank=i=>i>=lines.length||!lines[i].trim();
  const tableSep=line=>/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line||'');
  const blockStart=i=>{
    if(i>=lines.length) return true;
    const t=lines[i].trim();
    if(!t) return true;
    return /^```/.test(t)||/^(#{1,6})\s+/.test(t)||/^(?:---+|___+|\*\*\*+)\s*$/.test(t)||/^>\s?/.test(t)||/^\s*(?:[-+*]|\d+\.)\s+/.test(lines[i])||(i+1<lines.length&&lines[i].includes('|')&&tableSep(lines[i+1]));
  };
  for(let i=0;i<lines.length;){
    if(isBlank(i)){i++;continue}
    const raw=lines[i], t=raw.trim();
    const fence=t.match(/^```\s*([\w-]*)\s*$/);
    if(fence){
      const lang=fence[1]||'';i++;const buf=[];
      while(i<lines.length&&!/^```\s*$/.test(lines[i].trim())){buf.push(lines[i]);i++}
      if(i<lines.length)i++;
      html+=`<pre><code${lang?` class="language-${escAttr(lang)}"`:''}>${esc(buf.join('\n'))}</code></pre>`;
      continue;
    }
    const h=t.match(/^(#{1,6})\s+(.+)$/);
    if(h){const n=h[1].length;html+=`<h${n}>${inline(h[2])}</h${n}>`;i++;continue}
    if(/^(?:---+|___+|\*\*\*+)\s*$/.test(t)){html+='<hr>';i++;continue}
    if(i+1<lines.length&&raw.includes('|')&&tableSep(lines[i+1])){
      const head=splitTableRow(raw);i+=2;const rows=[];
      while(i<lines.length&&lines[i].trim()&&lines[i].includes('|')){rows.push(splitTableRow(lines[i]));i++}
      html+='<div class="table-wrap"><table><thead><tr>'+head.map(c=>`<th>${inline(c)}</th>`).join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+head.map((_,idx)=>`<td>${inline(r[idx]??'')}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';
      continue;
    }
    if(/^>\s?/.test(t)){
      const buf=[];
      while(i<lines.length){const m=lines[i].trim().match(/^>\s?(.*)$/);if(!m)break;buf.push(m[1]);i++}
      html+=`<blockquote><p>${inline(buf.join(' '))}</p></blockquote>`;
      continue;
    }
    const listMatch=raw.match(/^\s*([-+*]|\d+\.)\s+(.+)$/);
    if(listMatch){
      const ordered=/\d+\./.test(listMatch[1]), tag=ordered?'ol':'ul', items=[];
      while(i<lines.length){
        if(!lines[i].trim()){i++;continue}
        const m=lines[i].match(/^\s*([-+*]|\d+\.)\s+(.+)$/);
        if(!m||(/\d+\./.test(m[1])!==ordered))break;
        items.push(m[2].trim());i++;
      }
      html+=`<${tag}>${items.map(item=>`<li>${inline(item)}</li>`).join('')}</${tag}>`;
      continue;
    }
    const para=[];
    while(i<lines.length&&!isBlank(i)){
      if(para.length&&blockStart(i))break;
      para.push(lines[i].trim());i++;
    }
    if(para.length)html+=`<p>${inline(para.join(' '))}</p>`;
  }
  return html;
}
function shell({title,description,canonical,body,type='website',image=''}){const ogImage=image?(image.startsWith('http')?image:SITE+image):SITE+'/assets/foto-profil.webp';return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${ogImage}"><meta property="og:site_name" content="Rudi Parwanto Portfolio"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${ogImage}"><link rel="alternate" type="application/rss+xml" title="Blog Rudi Parwanto" href="/feed.xml"><script>document.documentElement.dataset.theme=localStorage.getItem('cv-theme')||'dark'</script><link rel="stylesheet" href="/blog/blog.css"></head><body><header class="mac-menu"><div class="menu-left"><a class="apple" href="/" aria-label="Kembali ke portofolio"><img src="/assets/icon-apple.webp" alt="" width="17" height="17"></a><b>CV Studio</b><nav aria-label="Navigasi utama"><a href="/">Portfolio</a><a class="active" href="/blog/" aria-current="page">Blog</a></nav></div><div class="menu-right"><button class="theme-toggle" type="button" aria-label="Ganti tema" onclick="let t=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=t;localStorage.setItem('cv-theme',t);this.textContent=t==='light'?'☾':'☀'">☀</button><span class="menu-clock" id="clock"></span></div></header><div class="window"><div class="titlebar"><div class="lights" aria-hidden="true"><i></i><i></i><i></i></div><span>CV Studio — Rudi Parwanto</span><span class="title-right">HTML&nbsp; · &nbsp;BLOG</span></div><nav class="tabs" aria-label="Tab"><a href="/">portfolio.js <span aria-hidden="true">↗</span></a><a href="/blog/" class="selected">blog.md</a></nav><div class="work"><aside class="sidebar"><div class="explorer-title">EXPLORER</div><a class="folder" href="/"><img src="/assets/icon-folder.webp" alt="" width="15" height="15"> cv-portfolio</a><a class="file-link" href="/">⌘ &nbsp; portfolio.js</a><a class="file-link selected" href="/blog/">▤ &nbsp; blog.md</a><div class="sidebar-caption">RUDI PARWANTO<br>E-Commerce Specialist</div></aside><div class="editor"><div class="breadcrumb"><a href="/">cv-portfolio</a> <span>›</span> <a href="/blog/">blog.md</a></div>${body}</div></div><footer class="status"><span>Ready &nbsp; · &nbsp; Blog</span><span>UTF-8 &nbsp; · &nbsp; Markdown</span></footer></div><script>const c=document.getElementById('clock');function tick(){c.textContent=new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit'}).format(new Date())}tick();setInterval(tick,60000);document.querySelector('.theme-toggle').textContent=document.documentElement.dataset.theme==='light'?'☾':'☀'</script></body></html>`}
function labelSlug(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function tags(p){const arr=Array.isArray(p.labels)?p.labels.filter(Boolean):[];return arr.length?`<div class="tags">${arr.map(x=>`<a href="/blog/label/${labelSlug(x)}/"># ${esc(x)}</a>`).join('')}</div>`:''}
function labelsBox(all){return all.length?`<section class="labels-panel"><div class="section-head"><p class="eyebrow">LABELS</p><span>${all.length} label</span></div><div class="label-cloud">${all.map(x=>`<a href="/blog/label/${labelSlug(x.name)}/"><b>#</b> ${esc(x.name)} <span>${x.count}</span></a>`).join('')}</div></section>`:''}
function card(p){return `<article class="card">${p.image?`<a href="/blog/${p.slug}/"><img src="${esc(p.image)}" alt="" loading="lazy"></a>`:''}<div><span class="category">${esc(p.category||'E-Commerce')}</span><h2><a href="/blog/${p.slug}/">${esc(p.title)}</a></h2><p>${esc(p.description||'')}</p>${tags(p)}<time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></div></article>`}
function pagination(page,total){if(total<=1)return '';let h='<nav class="pagination" aria-label="Halaman blog">';if(page>1)h+=`<a href="${page===2?'/blog/':`/blog/page/${page-1}/`}">← Sebelumnya</a>`;for(let i=1;i<=total;i++)h+=i===page?`<span class="current" aria-current="page">${i}</span>`:`<a href="${i===1?'/blog/':`/blog/page/${i}/`}">${i}</a>`;if(page<total)h+=`<a href="/blog/page/${page+1}/">Berikutnya →</a>`;return h+'</nav>'}
async function main(){
await convertBlogImages();
fs.mkdirSync(OUT,{recursive:true});
const files=fs.existsSync(CONTENT)?fs.readdirSync(CONTENT).filter(f=>f.endsWith('.json')):[],posts=[],used=new Set();
for(const file of files){try{const p=JSON.parse(fs.readFileSync(path.join(CONTENT,file),'utf8')),date=parseDate(p.date);if(!p||typeof p.title!=='string'||!p.title.trim()||typeof p.slug!=='string'||!slugOK(p.slug)||!date||used.has(p.slug)){console.warn(`Skipping ${file}: missing/invalid title, slug, date, or duplicate slug`);continue}used.add(p.slug);posts.push({...p,image:webpPath(p.image),date:date.iso,labels:Array.isArray(p.labels)?p.labels:[]})}catch(e){console.warn(`Skipping ${file}: ${e.message}`)}}
posts.sort((a,b)=>b.date.localeCompare(a.date));
let featuredSlug='';try{featuredSlug=JSON.parse(fs.readFileSync(SETTINGS,'utf8')).featured_slug||''}catch(e){}
const featured=posts.find(p=>p.slug===featuredSlug)||posts[0]||null;
const regular=featured?posts.filter(p=>p.slug!==featured.slug):posts;
const totalPages=Math.max(1,Math.ceil(regular.length/PER_PAGE));
const labelMap=new Map();for(const p of posts)for(const name of p.labels||[]){const key=String(name).trim();if(!key)continue;const cur=labelMap.get(key)||{name:key,count:0,posts:[]};cur.count++;cur.posts.push(p);labelMap.set(key,cur)}
const allLabels=[...labelMap.values()].sort((a,b)=>a.name.localeCompare(b.name,'id'));
const featuredHtml=featured?`<section class="featured"><div class="featured-copy"><p class="eyebrow">FEATURED POST</p><span class="category">${esc(featured.category||'E-Commerce')}</span><h2><a href="/blog/${featured.slug}/">${esc(featured.title)}</a></h2><p>${esc(featured.description||'')}</p>${tags(featured)}<div class="featured-meta"><time datetime="${esc(featured.date)}">${fmtDate(featured.date)}</time><a href="/blog/${featured.slug}/">Baca artikel →</a></div></div>${featured.image?`<a class="featured-image" href="/blog/${featured.slug}/"><img src="${esc(featured.image)}" alt="" loading="eager"></a>`:''}</section>`:'';
for(let page=1;page<=totalPages;page++){const slice=regular.slice((page-1)*PER_PAGE,page*PER_PAGE),list=`<section class="latest"><div class="section-head"><p class="eyebrow">LATEST POSTS</p><span>${regular.length} artikel lainnya</span></div><div class="grid">${slice.map(card).join('')||'<p>Belum ada artikel lainnya.</p>'}</div>${pagination(page,totalPages)}</section>`,hero=`<main class="wrap"><section class="hero"><p class="eyebrow">NOTES & INSIGHTS</p><h1>Blog</h1><p>Catatan praktis seputar e-commerce, marketplace, product SEO, campaign, dan workflow.</p></section>${page===1?featuredHtml:''}${list}${page===1?labelsBox(allLabels):''}</main>`,canonical=page===1?SITE+'/blog/':`${SITE}/blog/page/${page}/`,html=shell({title:page===1?'Blog — Rudi Parwanto':`Blog — Halaman ${page} — Rudi Parwanto`,description:'Artikel Rudi Parwanto tentang e-commerce, marketplace operations, product SEO, campaign, dan workflow.',canonical,body:hero});if(page===1)fs.writeFileSync(path.join(OUT,'index.html'),html);else{const dir=path.join(OUT,'page',String(page));fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)}}
for(const label of allLabels){const slug=labelSlug(label.name),dir=path.join(OUT,'label',slug);fs.mkdirSync(dir,{recursive:true});const total=Math.max(1,Math.ceil(label.posts.length/PER_PAGE));for(let page=1;page<=total;page++){const pageDir=page===1?dir:path.join(dir,'page',String(page));fs.mkdirSync(pageDir,{recursive:true});const slice=label.posts.slice((page-1)*PER_PAGE,page*PER_PAGE);let pg='<nav class=\"pagination\" aria-label=\"Halaman label\">';if(page>1)pg+=`<a href=\"${page===2?`/blog/label/${slug}/`:`/blog/label/${slug}/page/${page-1}/`}\">← Sebelumnya</a>`;if(page<total)pg+=`<a href=\"/blog/label/${slug}/page/${page+1}/\">Berikutnya →</a>`;pg+='</nav>';const body=`<main class=\"wrap\"><section class=\"hero label-hero\"><p class=\"eyebrow\">LABEL</p><h1># ${esc(label.name)}</h1><p>${label.posts.length} artikel dengan label ini.</p><a class=\"back\" href=\"/blog/\">← Semua artikel</a></section><section class=\"latest\"><div class=\"grid\">${slice.map(card).join('')}</div>${pg}</section></main>`;fs.writeFileSync(path.join(pageDir,'index.html'),shell({title:`# ${label.name} — Blog Rudi Parwanto`,description:`Artikel blog Rudi Parwanto dengan label ${label.name}.`,canonical:page===1?`${SITE}/blog/label/${slug}/`:`${SITE}/blog/label/${slug}/page/${page}/`,body}))}}
for(const p of posts){const dir=path.join(OUT,p.slug);fs.mkdirSync(dir,{recursive:true});const article=`<main class="article"><a class="back" href="/blog/">← Semua artikel</a><article><span class="category">${esc(p.category||'E-Commerce')}</span><h1>${esc(p.title)}</h1><div class="meta"><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time> · Rudi Parwanto</div>${tags(p)}${p.image?`<img class="cover" src="${esc(p.image)}" alt="">`:''}<div class="prose">${markdown(p.body)}</div></article></main>`;const schema=JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description||'',datePublished:p.date,author:{'@type':'Person',name:'Rudi Parwanto'},mainEntityOfPage:SITE+'/blog/'+p.slug+'/',keywords:p.labels||[],image:p.image?(p.image.startsWith('http')?p.image:SITE+p.image):undefined});let page=shell({title:`${p.title} — Rudi Parwanto`,description:p.description||'',canonical:SITE+'/blog/'+p.slug+'/',body:article,type:'article',image:p.image||''});page=page.replace('</head>',`<meta property="article:published_time" content="${esc(p.date)}"><meta property="article:author" content="Rudi Parwanto">${(p.labels||[]).map(x=>`<meta property="article:tag" content="${esc(x)}">`).join('')}<script type="application/ld+json">${schema.replace(/</g,'\\u003c')}</script></head>`);fs.writeFileSync(path.join(dir,'index.html'),page)}
const rss=posts.map(p=>`<item><title>${esc(p.title)}</title><link>${SITE}/blog/${p.slug}/</link><guid>${SITE}/blog/${p.slug}/</guid><pubDate>${new Date(p.date+'T00:00:00Z').toUTCString()}</pubDate><description>${esc(p.description||'')}</description></item>`).join('');fs.writeFileSync(path.join(ROOT,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog Rudi Parwanto</title><link>${SITE}/blog/</link><description>E-Commerce, marketplace operations, product SEO, campaign, dan workflow.</description><language>id-ID</language>${rss}</channel></rss>`);
const today=new Date().toISOString().slice(0,10),urls=[{loc:SITE+'/',lastmod:today},{loc:SITE+'/blog/',lastmod:posts[0]?.date||today},...Array.from({length:Math.max(0,totalPages-1)},(_,i)=>({loc:`${SITE}/blog/page/${i+2}/`,lastmod:posts[0]?.date||today})),...posts.map(p=>({loc:SITE+'/blog/'+p.slug+'/',lastmod:p.date})),...allLabels.map(l=>({loc:SITE+'/blog/label/'+labelSlug(l.name)+'/',lastmod:l.posts[0]?.date||today}))];fs.writeFileSync(path.join(ROOT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('')}</urlset>`);console.log(`Built ${posts.length} blog post(s), ${totalPages} listing page(s).`);

}
main().catch(e=>{console.error(e);process.exit(1)});
