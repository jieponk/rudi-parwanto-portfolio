const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'blog');
const OUT = path.join(ROOT, 'blog');
const SETTINGS = path.join(ROOT, 'content', 'settings', 'blog.json');
const SITE = 'https://masrudi.site';
const PER_PAGE = 4;
const BLOG_MEDIA = path.join(ROOT, 'assets', 'blog');
const DEFAULT_IMAGE = '/assets/blog/no-image.webp';
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
  if(!v || /[\u0000-\u001f\u007f]/.test(v) || v.startsWith('//')) return '#';
  // Reject entity-obfuscated schemes before the first path/query/fragment separator.
  const firstPart=v.split(/[/?]/,1)[0];
  if(firstPart.includes('&') && /(?:&(?:#\d+|#x[0-9a-f]+|colon);?)/i.test(firstPart)) return '#';
  if(/^(https?:\/\/|mailto:|#|\/(?!\/)|\.{1,2}\/|\?)/i.test(v)) return v;
  if(!/^[a-z][a-z0-9+.-]*:/i.test(v)) return v;
  return '#';
}
const RAW_TAGS = new Set('a abbr article aside b br button code del details div dl dt dd em fieldset figcaption figure form hr i img ins kbd label legend li mark nav ol option output p pre progress samp section small span strong sub summary sup table tbody td textarea tfoot th thead tr u ul var select input'.split(' '));
const RAW_VOID_TAGS = new Set(['br','hr','img','input']);
const RAW_ATTRS = new Set('abbr accept alt aria-controls aria-current aria-describedby aria-expanded aria-hidden aria-label aria-labelledby aria-selected aria-valuemax aria-valuemin aria-valuenow autocomplete checked class cols colspan disabled download for height hidden href id inputmode loading max maxlength min minlength multiple name open pattern placeholder rel required role rows rowspan selected src step tabindex target title type value width'.split(' '));
function safeRawTag(match){
  const closing=!!match[1], name=String(match[2]||'').toLowerCase();
  if(!RAW_TAGS.has(name)) return '';
  if(closing) return RAW_VOID_TAGS.has(name)?'':`</${name}>`;
  const rawAttrs=match[3]||''; let attrs='', attrRe=/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g, a;
  while((a=attrRe.exec(rawAttrs))){
    const key=a[1].toLowerCase(); if((!RAW_ATTRS.has(key)&&!key.startsWith('data-'))||key.startsWith('on')) continue;
    let value=a[2]??a[3]??a[4]??'';
    if(['href','src'].includes(key)){ value=safeHref(value); if(value==='#' && !/^#/.test(a[2]??a[3]??a[4]??'')) continue; }
    if(key==='target' && value!=='_blank' && value!=='_self') continue;
    if(key==='type' && !/^(text|email|url|search|number|range|checkbox|radio|button|submit|reset)$/i.test(value)) continue;
    attrs+=` ${key}="${escAttr(value)}"`;
  }
  if(name==='a' && /\starget="_blank"/.test(attrs) && !/\srel=/.test(attrs)) attrs+=' rel="noopener noreferrer"';
  return `<${name}${attrs}${RAW_VOID_TAGS.has(name)?' />':'>'}`;
}
function sanitizeRawHtml(html=''){
  return String(html).replace(/<!--[\s\S]*?-->/g,'').replace(/<\s*(\/?)\s*([a-zA-Z][\w:-]*)\b([^<>]*?)\s*(\/?)>/g,(whole,slash,name,attrs,selfClose)=>safeRawTag([whole,slash,name,attrs,selfClose]));
}
function inline(input=''){
  let source=String(input);
  const codes=[], rawTags=[];
  source=source.replace(/`([^`]+)`/g,(_,code)=>`\u0000CODE${codes.push(code)-1}\u0000`);
  source=source.replace(/<\s*(\/?)\s*([a-zA-Z][\w:-]*)\b([^<>]*?)\s*(\/?)>/g,(tag,slash,name,attrs,selfClose)=>{
    const safe=safeRawTag([tag,slash,name,attrs,selfClose]);
    if(!safe) return '';
    return `\u0000HTML${rawTags.push(safe)-1}\u0000`;
  });
  let x=esc(source);
  x=x.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+["']([^"']*)["'])?\)/g,(_,alt,url,title)=>{
    const href=safeHref(url);
    return `<img src="${escAttr(href)}" alt="${escAttr(alt)}"${title?` title="${escAttr(title)}"`:''} loading="lazy">`;
  });
  x=x.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+["']([^"']*)["'])?\)/g,(_,label,url,title)=>{
    const href=safeHref(url), external=/^https?:\/\//i.test(href);
    return `<a href="${escAttr(href)}"${title?` title="${escAttr(title)}"`:''}${external?' rel="noopener noreferrer" target="_blank"':''}>${label}</a>`;
  });
  // Bare URLs become clickable links, without swallowing common trailing punctuation.
  x=x.replace(/(^|[\s(])((?:https?:\/\/)[^\s<>]+)/g,(_,prefix,url)=>{
    const trailing=(url.match(/[.,!?;:)]+$/)||[''])[0], href=url.slice(0,url.length-trailing.length);
    return `${prefix}<a href="${escAttr(href)}" target="_blank" rel="noopener noreferrer">${href}</a>${trailing}`;
  });
  x=x.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
     .replace(/__(.+?)__/g,'<strong>$1</strong>')
     .replace(/~~(.+?)~~/g,'<del>$1</del>')
     .replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<em>$2</em>')
     .replace(/(^|[^_])_([^_\n]+)_/g,'$1<em>$2</em>');
  x=x.replace(/\u0000CODE(\d+)\u0000/g,(_,i)=>`<code>${esc(codes[Number(i)]||'')}</code>`);
  x=x.replace(/\u0000HTML(\d+)\u0000/g,(_,i)=>rawTags[Number(i)]||'');
  return x;
}
function splitTableRow(line=''){
  let s=String(line).trim();
  if(s.startsWith('|')) s=s.slice(1);
  if(s.endsWith('|')) s=s.slice(0,-1);
  return s.split('|').map(x=>x.trim());
}
function markdown(md=''){
  let source=String(md).replace(/\r/g,'').replace(/^\\(?=(?:#{1,6}\s|[-+*>]\s|\d+\.\s))/gm,'');
  const footnoteDefs=new Map(), footnoteOrder=[], footnoteRefCounts=new Map();
  source=source.split('\n').filter(line=>{const m=line.match(/^\s*\[\^([\w-]+)\]:\s*(.*)$/);if(!m)return true;footnoteDefs.set(m[1],m[2]);return false}).join('\n');
  const lines=source.split('\n'); let html=''; const headingIds=new Map();
  const isBlank=i=>i>=lines.length||!lines[i].trim();
  const tableSep=line=>/^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line||'');
  const slugText=s=>String(s).replace(/<[^>]*>/g,'').replace(/&amp;/g,'and').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section';
  const uniqueId=s=>{const base=slugText(s),n=(headingIds.get(base)||0)+1;headingIds.set(base,n);return n===1?base:`${base}-${n}`};
  function renderInline(text){
    const tokens=[]; const prepared=String(text).replace(/\[\^([\w-]+)\]/g,(_,id)=>{let n=footnoteOrder.indexOf(id);if(n<0){footnoteOrder.push(id);n=footnoteOrder.length-1}const count=(footnoteRefCounts.get(id)||0)+1;footnoteRefCounts.set(id,count);tokens.push({id,n,refId:`fnref-${id}${count>1?'-'+count:''}`});return `\u0000FN${tokens.length-1}\u0000`});
    let out=inline(prepared);
    out=out.replace(/\u0000FN(\d+)\u0000/g,(_,i)=>{const f=tokens[Number(i)];return `<sup class="footnote-ref" id="${escAttr(f.refId)}"><a href="#fn-${escAttr(f.id)}" aria-label="Catatan kaki ${f.n+1}">${f.n+1}</a></sup>`});
    return out;
  }
  const blockStart=i=>{if(i>=lines.length)return true;const t=lines[i].trim();if(!t)return true;return /^```/.test(t)||/^(#{1,6})\s+/.test(t)||/^(?:---+|___+|\*\*\*+)\s*$/.test(t)||/^>\s?/.test(t)||/^\s*(?:[-+*]|\d+\.)\s+/.test(lines[i])||(i+1<lines.length&&lines[i].includes('|')&&tableSep(lines[i+1]))};
  function parseListAt(start){
    const first=lines[start].match(/^(\s*)([-+*]|\d+\.)\s+(.+)$/);if(!first)return {html:'',next:start};
    const indent=first[1].replace(/\t/g,'  ').length,ordered=/\d+\./.test(first[2]),tag=ordered?'ol':'ul';const items=[];let current='',i=start;
    while(i<lines.length){
      if(!lines[i].trim()){if(i+1<lines.length&&/^\s+(?:[-+*]|\d+\.)\s+/.test(lines[i+1])){i++;continue}break}
      const m=lines[i].match(/^(\s*)([-+*]|\d+\.)\s+(.+)$/);if(!m)break;const level=m[1].replace(/\t/g,'  ').length;if(level<indent)break;
      if(level>indent){if(!current)break;const nested=parseListAt(i);if(!nested.html||nested.next<=i)break;current+=nested.html;i=nested.next;continue}
      if((/\d+\./.test(m[2]))!==ordered)break;if(current)items.push(`<li>${current}</li>`);current=renderInline(m[3].trim());i++;
    }
    if(current)items.push(`<li>${current}</li>`);return {html:`<${tag}>${items.join('')}</${tag}>`,next:i};
  }
  for(let i=0;i<lines.length;){
    if(isBlank(i)){i++;continue}const raw=lines[i],t=raw.trim();
    // Preserve allow-listed multi-line HTML components, including custom data-* hooks.
    const rawBlock=t.match(/^<(details|figure|form|div|section|article|aside|nav|table|ul|ol|blockquote|fieldset)\b[^>]*>/i);
    if(rawBlock){const tag=rawBlock[1].toLowerCase(),buf=[raw];i++;let depth=(raw.match(new RegExp(`<${tag}\\b`,'ig'))||[]).length-(raw.match(new RegExp(`</${tag}\\s*>`,'ig'))||[]).length;while(i<lines.length&&depth>0){buf.push(lines[i]);depth+=(lines[i].match(new RegExp(`<${tag}\\b`,'ig'))||[]).length-(lines[i].match(new RegExp(`</${tag}\\s*>`,'ig'))||[]).length;i++}html+=sanitizeRawHtml(buf.join('\n'));continue}
    const fence=t.match(/^```\s*([\w-]*)\s*$/);
    if(fence){const lang=(fence[1]||'').toLowerCase();i++;const buf=[];while(i<lines.length&&!/^```\s*$/.test(lines[i].trim())){buf.push(lines[i]);i++}if(i<lines.length)i++;const code=esc(buf.join('\n'));if(lang==='mermaid'){html+=`<div class="mermaid-block"><pre class="mermaid" role="img" aria-label="Diagram alur">${code}</pre><details class="diagram-source"><summary>Lihat kode diagram</summary><pre><code>${code}</code></pre></details></div>`}else{const langLabel=(lang||'text').toUpperCase();html+=`<div class="code-block"><div class="code-toolbar"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-lang">${esc(langLabel)}</span><button class="copy-code" type="button" aria-label="Salin kode" aria-live="polite">Salin</button></div><pre><code${lang?` class="language-${escAttr(lang)}"`:''}>${code}</code></pre></div>`}continue}
    const h=t.match(/^(#{1,6})\s+(.+)$/);if(h){const n=h[1].length,txt=h[2].replace(/[`*_~]/g,''),id=uniqueId(txt);html+=`<h${n} id="${escAttr(id)}">${renderInline(h[2])}</h${n}>`;i++;continue}
    if(/^(?:---+|___+|\*\*\*+)\s*$/.test(t)){html+='<hr>';i++;continue}
    if(i+1<lines.length&&raw.includes('|')&&tableSep(lines[i+1])){const head=splitTableRow(raw);i+=2;const rows=[];while(i<lines.length&&lines[i].trim()&&lines[i].includes('|')){rows.push(splitTableRow(lines[i]));i++}html+='<div class="table-wrap" role="region" aria-label="Tabel artikel" tabindex="0"><table><thead><tr>'+head.map(c=>`<th scope="col">${renderInline(c)}</th>`).join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+head.map((_,idx)=>`<td>${renderInline(r[idx]??'')}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';continue}
    if(/^>\s?/.test(t)){const buf=[];while(i<lines.length&&/^>\s?/.test(lines[i].trim())){buf.push(lines[i].trim().replace(/^>\s?/,''));i++}const first=buf[0]||'',call=first.match(/^\[!(INFO|SUCCESS|WARNING|DANGER|TIP|NOTE)\]\s*(.*)$/i);if(call){const kind=call[1].toLowerCase(),title=call[2]||({info:'Informasi',success:'Berhasil',warning:'Perhatian',danger:'Peringatan',tip:'Tips',note:'Catatan'}[kind]);const body=buf.slice(1).join('\n').trim(),paragraphs=body.split(/\n\s*\n/).filter(Boolean);html+=`<aside class="callout callout-${kind}" role="${kind==='danger'?'alert':'note'}"><strong class="callout-title">${renderInline(title)}</strong>${paragraphs.map(paragraph=>`<p>${renderInline(paragraph.trim())}</p>`).join('')}</aside>`}else{const chunks=buf.join('\n').split(/\n\s*\n/).filter(Boolean);html+=`<blockquote>${chunks.map(chunk=>`<p>${renderInline(chunk.trim())}</p>`).join('')}</blockquote>`}continue}
    const listMatch=raw.match(/^(\s*)([-+*]|\d+\.)\s+(.+)$/);if(listMatch){const parsed=parseListAt(i);html+=parsed.html;i=parsed.next;continue}
    const para=[];while(i<lines.length&&!isBlank(i)){if(para.length&&blockStart(i))break;para.push(lines[i].trim());i++}if(para.length)html+=`<p>${renderInline(para.join(' '))}</p>`;
  }
  if(footnoteOrder.length){const items=footnoteOrder.map((id,index)=>{const note=footnoteDefs.get(id)||'Catatan tidak ditemukan.';return `<li id="fn-${escAttr(id)}"><span>${renderInline(note)}</span> <a class="footnote-backref" href="#fnref-${escAttr(id)}" aria-label="Kembali ke referensi catatan ${index+1}">↩</a></li>`}).join('');html+=`<section class="footnotes" aria-label="Catatan kaki"><h2>Catatan kaki</h2><ol>${items}</ol></section>`}
  const headingMatches=[...html.matchAll(/<h([2-3]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)];
  if(headingMatches.length>=3){const toc=`<nav class="article-toc" aria-label="Daftar isi"><details open><summary>Daftar isi</summary><ol>${headingMatches.map(m=>`<li class="toc-level-${m[1]}"><a href="#${escAttr(m[2])}">${m[3].replace(/<[^>]+>/g,'')}</a></li>`).join('')}</ol></details></nav>`;html=toc+html}
  return html;
}
function shell({title,description,canonical,body,type='website',image=''}){const chosenImage=image||DEFAULT_IMAGE;const ogImage=chosenImage.startsWith('http')?chosenImage:SITE+chosenImage;const mermaidScript=body.includes('class="mermaid-block"')?'<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js" defer></script>':'';return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${ogImage}"><meta property="og:site_name" content="Rudi Parwanto Portfolio"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${ogImage}"><link rel="alternate" type="application/rss+xml" title="Blog Rudi Parwanto" href="/feed.xml"><script>document.documentElement.dataset.theme=localStorage.getItem('cv-theme')||'dark'</script><link rel="stylesheet" href="/blog/blog.css">${mermaidScript}</head><body><header class="mac-menu"><div class="menu-left"><a class="apple" href="/" aria-label="Kembali ke portofolio"><img src="/assets/icon-apple.webp" alt="" width="17" height="17"></a><b>CV Studio</b><nav aria-label="Navigasi utama"><a href="/">Portfolio</a><a class="active" href="/blog/" aria-current="page">Blog</a></nav></div><div class="menu-right"><button class="theme-toggle" type="button" aria-label="Ganti tema" onclick="let t=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=t;localStorage.setItem('cv-theme',t);this.textContent=t==='light'?'☾':'☀';window.syncCommentsTheme?.()">☀</button><span class="menu-clock" id="clock"></span></div></header><div class="window"><div class="titlebar"><div class="lights" aria-hidden="true"><i></i><i></i><i></i></div><span>CV Studio — Rudi Parwanto</span><span class="title-right">HTML&nbsp; · &nbsp;BLOG</span></div><nav class="tabs" aria-label="Tab"><a href="/">portfolio.js <span aria-hidden="true">↗</span></a><a href="/blog/" class="selected">blog.md</a></nav><div class="work"><aside class="sidebar"><div class="explorer-title">EXPLORER</div><a class="folder" href="/"><img src="/assets/icon-folder.webp" alt="" width="15" height="15"> cv-portfolio</a><a class="file-link" href="/">⌘ &nbsp; portfolio.js</a><a class="file-link selected" href="/blog/">▤ &nbsp; blog.md</a><div class="sidebar-caption">RUDI PARWANTO<br>E-Commerce Specialist</div></aside><div class="editor"><div class="breadcrumb"><a href="/">cv-portfolio</a> <span>›</span> <a href="/blog/">blog.md</a></div>${body}</div></div><footer class="status"><span>Ready &nbsp; · &nbsp; Blog</span><span>UTF-8 &nbsp; · &nbsp; Markdown</span></footer></div><script>
const c=document.getElementById('clock');
function tick(){c.textContent=new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit'}).format(new Date())}
tick();setInterval(tick,60000);
document.querySelector('.theme-toggle').textContent=document.documentElement.dataset.theme==='light'?'☾':'☀';
function utterancesTheme(){return document.documentElement.dataset.theme==='light'?'github-light':'github-dark'}
window.syncCommentsTheme=function(){const frame=document.querySelector('.utterances-frame');if(frame?.contentWindow)frame.contentWindow.postMessage({type:'set-theme',theme:utterancesTheme()},'https://utteranc.es')};
(function(){const mount=document.getElementById('comments-mount');if(!mount)return;const script=document.createElement('script');script.src='https://utteranc.es/client.js';script.async=true;script.crossOrigin='anonymous';script.setAttribute('repo','jieponk/rudi-parwanto-portfolio');script.setAttribute('issue-term','pathname');script.setAttribute('theme',utterancesTheme());mount.appendChild(script)})();
document.addEventListener('click',async e=>{const btn=e.target.closest('.copy-code,[data-copy-target]');if(!btn)return;let code;if(btn.matches('[data-copy-target]')){const target=document.getElementById(btn.getAttribute('data-copy-target'));code=target?.textContent}else{code=btn.closest('.code-block')?.querySelector('code')?.textContent}if(code==null)return;const original=btn.textContent;let ok=false;try{await navigator.clipboard.writeText(code);ok=true}catch(_){const area=document.createElement('textarea');area.value=code;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();try{ok=document.execCommand('copy')}catch(__){}area.remove()}btn.textContent=ok?'Tersalin':'Gagal menyalin';btn.classList.toggle('copied',ok);btn.setAttribute('aria-label',ok?'Teks berhasil disalin':'Gagal menyalin teks');window.setTimeout(()=>{btn.textContent=original;btn.classList.remove('copied');btn.setAttribute('aria-label','Salin kode')},1800)});
document.addEventListener('click',e=>{const trigger=e.target.closest('[data-tab-trigger]');if(!trigger)return;const group=trigger.closest('[data-tabs]');if(!group)return;const key=trigger.getAttribute('data-tab-trigger');group.querySelectorAll('[data-tab-trigger]').forEach(el=>{const active=el===trigger;el.setAttribute('aria-selected',String(active));el.tabIndex=active?0:-1});group.querySelectorAll('[data-tab-panel]').forEach(panel=>{const active=panel.getAttribute('data-tab-panel')===key;panel.hidden=!active;panel.setAttribute('aria-hidden',String(!active))})});
document.addEventListener('keydown',e=>{const trigger=e.target.closest('[data-tab-trigger]');if(!trigger||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const group=trigger.closest('[data-tabs]');const tabs=[...group.querySelectorAll('[data-tab-trigger]')];let i=tabs.indexOf(trigger);if(e.key==='ArrowRight')i=(i+1)%tabs.length;else if(e.key==='ArrowLeft')i=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')i=0;else i=tabs.length-1;e.preventDefault();tabs[i].focus();tabs[i].click()});
(function(){const links=[...document.querySelectorAll('.article-toc a[href^="#"]')];if(!links.length||!('IntersectionObserver'in window))return;const headings=links.map(a=>document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>{const active=a.hash==='#'+entry.target.id;if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}})},{rootMargin:'-12% 0px -72% 0px'});headings.forEach(h=>observer.observe(h))})();
(function(){const diagrams=[...document.querySelectorAll('.mermaid-block pre.mermaid')];if(!diagrams.length)return;const render=()=>{if(!window.mermaid)return;try{window.mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:document.documentElement.dataset.theme==='light'?'default':'dark'});window.mermaid.run({nodes:diagrams})}catch(e){console.warn('Diagram Mermaid tidak dapat dirender; kode sumber tetap tersedia.',e)}};if(window.mermaid)render();else{const script=document.querySelector('script[src*="mermaid.min.js"]');script?.addEventListener('load',render,{once:true})}})();
document.querySelectorAll('.image-comparison').forEach(box=>{const range=box.querySelector('input[type="range"]'),after=box.querySelector('.comparison-after');if(!range||!after)return;const update=()=>{const value=Math.max(0,Math.min(100,Number(range.value)||50));after.style.clipPath='inset(0 '+(100-value)+'% 0 0)';box.style.setProperty('--comparison-position',value+'%');range.setAttribute('aria-valuenow',String(value))};range.addEventListener('input',update);update()});
</script></body></html>`}
function labelSlug(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function tags(p){const arr=Array.isArray(p.labels)?p.labels.filter(Boolean):[];return arr.length?`<div class="tags">${arr.map(x=>`<a href="/blog/label/${labelSlug(x)}/"># ${esc(x)}</a>`).join('')}</div>`:''}
function postImage(p){const img=p&&typeof p.image==='string'?p.image.trim():'';return img||DEFAULT_IMAGE}
function cleanBlogOutput(){if(!fs.existsSync(OUT))return;for(const ent of fs.readdirSync(OUT,{withFileTypes:true})){if(ent.isDirectory())fs.rmSync(path.join(OUT,ent.name),{recursive:true,force:true})}}
function labelsBox(all){return all.length?`<section class="labels-panel"><div class="section-head"><p class="eyebrow">LABELS</p><span>${all.length} label</span></div><div class="label-cloud">${all.map(x=>`<a href="/blog/label/${labelSlug(x.name)}/"><b>#</b> ${esc(x.name)} <span>${x.count}</span></a>`).join('')}</div></section>`:''}
function card(p){const img=postImage(p);return `<article class="card"><a class="card-media" href="/blog/${p.slug}/"><img src="${esc(img)}" alt="${escAttr(p.title)}" loading="lazy"></a><div><span class="category">${esc(p.category||'E-Commerce')}</span><h2><a href="/blog/${p.slug}/">${esc(p.title)}</a></h2><p>${esc(p.description||'')}</p>${tags(p)}<time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></div></article>`}
function pagination(page,total){if(total<=1)return '';let h='<nav class="pagination" aria-label="Halaman blog">';if(page>1)h+=`<a href="${page===2?'/blog/':`/blog/page/${page-1}/`}">← Sebelumnya</a>`;for(let i=1;i<=total;i++)h+=i===page?`<span class="current" aria-current="page">${i}</span>`:`<a href="${i===1?'/blog/':`/blog/page/${i}/`}">${i}</a>`;if(page<total)h+=`<a href="/blog/page/${page+1}/">Berikutnya →</a>`;return h+'</nav>'}
async function main(){
await convertBlogImages();
fs.mkdirSync(OUT,{recursive:true});
cleanBlogOutput();
const files=fs.existsSync(CONTENT)?fs.readdirSync(CONTENT).filter(f=>f.endsWith('.json')):[],posts=[],used=new Set();
for(const file of files){try{const p=JSON.parse(fs.readFileSync(path.join(CONTENT,file),'utf8')),date=parseDate(p.date);if(!p||typeof p.title!=='string'||!p.title.trim()||typeof p.slug!=='string'||!slugOK(p.slug)||!date||used.has(p.slug)){console.warn(`Skipping ${file}: missing/invalid title, slug, date, or duplicate slug`);continue}used.add(p.slug);posts.push({...p,image:webpPath(p.image),date:date.iso,labels:Array.isArray(p.labels)?p.labels:[]})}catch(e){console.warn(`Skipping ${file}: ${e.message}`)}}
posts.sort((a,b)=>b.date.localeCompare(a.date));
let featuredSlug='';try{featuredSlug=JSON.parse(fs.readFileSync(SETTINGS,'utf8')).featured_slug||''}catch(e){}
const featured=posts.find(p=>p.slug===featuredSlug)||posts[0]||null;
const regular=featured?posts.filter(p=>p.slug!==featured.slug):posts;
const totalPages=Math.max(1,Math.ceil(regular.length/PER_PAGE));
const labelMap=new Map();for(const p of posts)for(const name of p.labels||[]){const key=String(name).trim();if(!key)continue;const cur=labelMap.get(key)||{name:key,count:0,posts:[]};cur.count++;cur.posts.push(p);labelMap.set(key,cur)}
const allLabels=[...labelMap.values()].sort((a,b)=>a.name.localeCompare(b.name,'id'));
const featuredHtml=featured?`<section class="featured"><div class="featured-copy"><p class="eyebrow">FEATURED POST</p><span class="category">${esc(featured.category||'E-Commerce')}</span><h2><a href="/blog/${featured.slug}/">${esc(featured.title)}</a></h2><p>${esc(featured.description||'')}</p>${tags(featured)}<div class="featured-meta"><time datetime="${esc(featured.date)}">${fmtDate(featured.date)}</time><a href="/blog/${featured.slug}/">Baca artikel →</a></div></div><a class="featured-image" href="/blog/${featured.slug}/"><img src="${esc(postImage(featured))}" alt="${escAttr(featured.title)}" loading="eager"></a></section>`:'';
for(let page=1;page<=totalPages;page++){const slice=regular.slice((page-1)*PER_PAGE,page*PER_PAGE),list=`<section class="latest"><div class="section-head"><p class="eyebrow">LATEST POSTS</p><span>${regular.length} artikel lainnya</span></div><div class="grid">${slice.map(card).join('')||'<p>Belum ada artikel lainnya.</p>'}</div>${pagination(page,totalPages)}</section>`,hero=`<main class="wrap"><section class="hero"><p class="eyebrow">NOTES & INSIGHTS</p><h1>Blog</h1><p>Catatan praktis seputar e-commerce, marketplace, product SEO, campaign, dan workflow.</p></section>${page===1?featuredHtml:''}${list}${page===1?labelsBox(allLabels):''}</main>`,canonical=page===1?SITE+'/blog/':`${SITE}/blog/page/${page}/`,html=shell({title:page===1?'Blog — Rudi Parwanto':`Blog — Halaman ${page} — Rudi Parwanto`,description:'Artikel Rudi Parwanto tentang e-commerce, marketplace operations, product SEO, campaign, dan workflow.',canonical,body:hero});if(page===1)fs.writeFileSync(path.join(OUT,'index.html'),html);else{const dir=path.join(OUT,'page',String(page));fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html)}}
for(const label of allLabels){const slug=labelSlug(label.name),dir=path.join(OUT,'label',slug);fs.mkdirSync(dir,{recursive:true});const total=Math.max(1,Math.ceil(label.posts.length/PER_PAGE));for(let page=1;page<=total;page++){const pageDir=page===1?dir:path.join(dir,'page',String(page));fs.mkdirSync(pageDir,{recursive:true});const slice=label.posts.slice((page-1)*PER_PAGE,page*PER_PAGE);let pg='<nav class=\"pagination\" aria-label=\"Halaman label\">';if(page>1)pg+=`<a href=\"${page===2?`/blog/label/${slug}/`:`/blog/label/${slug}/page/${page-1}/`}\">← Sebelumnya</a>`;if(page<total)pg+=`<a href=\"/blog/label/${slug}/page/${page+1}/\">Berikutnya →</a>`;pg+='</nav>';const body=`<main class=\"wrap\"><section class=\"hero label-hero\"><p class=\"eyebrow\">LABEL</p><h1># ${esc(label.name)}</h1><p>${label.posts.length} artikel dengan label ini.</p><a class=\"back\" href=\"/blog/\">← Semua artikel</a></section><section class=\"latest\"><div class=\"grid\">${slice.map(card).join('')}</div>${pg}</section></main>`;fs.writeFileSync(path.join(pageDir,'index.html'),shell({title:`# ${label.name} — Blog Rudi Parwanto`,description:`Artikel blog Rudi Parwanto dengan label ${label.name}.`,canonical:page===1?`${SITE}/blog/label/${slug}/`:`${SITE}/blog/label/${slug}/page/${page}/`,body}))}}
for(const p of posts){const dir=path.join(OUT,p.slug);fs.mkdirSync(dir,{recursive:true});const img=postImage(p);const article=`<main class="article"><a class="back" href="/blog/">← Semua artikel</a><article><span class="category">${esc(p.category||'E-Commerce')}</span><h1>${esc(p.title)}</h1><div class="meta"><time datetime="${esc(p.date)}">${fmtDate(p.date)}</time> · Rudi Parwanto</div>${tags(p)}<img class="cover" src="${esc(img)}" alt="${escAttr(p.title)}"><div class="prose">${markdown(p.body)}</div><aside class="author-box"><img src="/assets/foto-profil.webp" alt="Rudi Parwanto" width="64" height="64"><div><span class="author-kicker">AUTHOR.md</span><strong>Rudi Parwanto</strong><p>E-Commerce Specialist · menulis catatan tentang marketplace, workflow, teknologi, dan gear.</p></div></aside><section class="comments-shell" id="comments"><div class="comments-head"><div><span class="comments-kicker">DISCUSSION.thread</span><h2>Komentar</h2><p>Diskusi artikel menggunakan GitHub Issues. Login GitHub diperlukan untuk mengirim komentar.</p></div><span class="comments-status"><i></i> OPEN</span></div><div id="comments-mount" class="comments-mount"></div></section></article></main>`;const schema=JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description||'',datePublished:p.date,author:{'@type':'Person',name:'Rudi Parwanto'},mainEntityOfPage:SITE+'/blog/'+p.slug+'/',keywords:p.labels||[],image:img.startsWith('http')?img:SITE+img});let page=shell({title:`${p.title} — Rudi Parwanto`,description:p.description||'',canonical:SITE+'/blog/'+p.slug+'/',body:article,type:'article',image:img});page=page.replace('</head>',`<meta property="article:published_time" content="${esc(p.date)}"><meta property="article:author" content="Rudi Parwanto">${(p.labels||[]).map(x=>`<meta property="article:tag" content="${esc(x)}">`).join('')}<script type="application/ld+json">${schema.replace(/</g,'\\u003c')}</script></head>`);fs.writeFileSync(path.join(dir,'index.html'),page)}
const rss=posts.map(p=>`<item><title>${esc(p.title)}</title><link>${SITE}/blog/${p.slug}/</link><guid>${SITE}/blog/${p.slug}/</guid><pubDate>${new Date(p.date+'T00:00:00Z').toUTCString()}</pubDate><description>${esc(p.description||'')}</description></item>`).join('');fs.writeFileSync(path.join(ROOT,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog Rudi Parwanto</title><link>${SITE}/blog/</link><description>E-Commerce, marketplace operations, product SEO, campaign, dan workflow.</description><language>id-ID</language>${rss}</channel></rss>`);
const today=new Date().toISOString().slice(0,10),urls=[{loc:SITE+'/',lastmod:today},{loc:SITE+'/blog/',lastmod:posts[0]?.date||today},...Array.from({length:Math.max(0,totalPages-1)},(_,i)=>({loc:`${SITE}/blog/page/${i+2}/`,lastmod:posts[0]?.date||today})),...posts.map(p=>({loc:SITE+'/blog/'+p.slug+'/',lastmod:p.date})),...allLabels.map(l=>({loc:SITE+'/blog/label/'+labelSlug(l.name)+'/',lastmod:l.posts[0]?.date||today}))];fs.writeFileSync(path.join(ROOT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('')}</urlset>`);console.log(`Built ${posts.length} blog post(s), ${totalPages} listing page(s).`);

}
if(require.main===module) main().catch(e=>{console.error(e);process.exit(1)});
module.exports={markdown,inline,sanitizeRawHtml,safeHref,parseDate};
