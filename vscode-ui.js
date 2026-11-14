/* VS Code × macOS chrome: activity bar, command center, minimap, cursor position. */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const body=document.body;
const openSearch=()=>$('search-trigger')?.click();
$('command-center')?.addEventListener('click',openSearch);
$('act-search')?.addEventListener('click',openSearch);
$('act-theme')?.addEventListener('click',()=>$('theme')?.click());

const explorer=$('act-explorer');
explorer?.addEventListener('click',()=>body.classList.toggle('sidebar-hidden'));
function syncExplorer(){
  if(!explorer)return;
  const open=!body.classList.contains('sidebar-hidden');
  explorer.classList.toggle('active',open);
  explorer.setAttribute('aria-pressed',String(open));
}
new MutationObserver(syncExplorer).observe(body,{attributes:true,attributeFilter:['class']});
syncExplorer();

const code=$('code'),content=$('content'),pos=$('status-pos'),label=$('cc-label');
function syncEditor(){
  if(!code)return;
  const lines=[...code.querySelectorAll('.line')];
  lines.forEach(l=>l.classList.remove('current'));
  const last=lines[lines.length-1];
  if(last){
    last.classList.add('current');
    const text=last.lastElementChild?.textContent||'';
    if(pos)pos.textContent='Ln '+lines.length+', Col '+(text.length+1);
  }
  let map=code.querySelector('.minimap');
  if(!map){map=document.createElement('div');map.className='minimap';map.setAttribute('aria-hidden','true')}
  map.replaceChildren(...lines.map(l=>{
    const text=l.lastElementChild?.textContent||'';
    const bar=document.createElement('i');
    bar.style.marginLeft=(text.length-text.trimStart().length)*2+'px';
    bar.style.width=Math.min(text.trim().length*1.6,96)+'px';
    if(text.startsWith('#'))bar.className='c';
    return bar;
  }));
  code.append(map);
  const active=document.querySelector('#tabs .tab.active .tab-label');
  if(label&&active)label.textContent='cv-portfolio — '+active.textContent;
  document.querySelector('#tabs .tab.active')?.scrollIntoView({block:'nearest',inline:'nearest'});
}
let first=true;
function swap(){
  syncEditor();
  if(first){first=false;return}
  [code,content].forEach(el=>{if(!el)return;el.classList.remove('swap-in');void el.offsetWidth;el.classList.add('swap-in')});
}
if(content)new MutationObserver(swap).observe(content,{childList:true});
swap();

/* Boot splash: full on first visit per session, skipped afterwards. */
const boot=$('boot');
const start=performance.now();
function finishBoot(){
  const wait=body.classList.contains('boot-skip')?0:Math.max(0,750-(performance.now()-start));
  setTimeout(()=>{
    body.classList.add('booted');
    try{sessionStorage.setItem('cvstudio-booted','1')}catch(e){}
    setTimeout(()=>boot?.remove(),600);
  },wait);
}
/* With music configured, the first visit waits for an "Open" click (invitation style):
   that click is the user gesture browsers require before audio can play. */
function gateBoot(){
  const music=window.SiteMusic;
  if(!music||!music.enabled||body.classList.contains('boot-skip')||!boot){finishBoot();return}
  const card=boot.querySelector('.boot-card');
  boot.querySelector('.boot-bar')?.remove();
  const id=document.documentElement.lang==='id';
  const wrap=document.createElement('div');wrap.className='boot-actions';
  wrap.innerHTML='<button type="button" class="boot-open"><svg class="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg><span>'+(id?'Buka Portofolio':'Open Portfolio')+'</span></button>'
    +'<button type="button" class="boot-quiet">'+(id?'Masuk tanpa musik':'Enter without music')+'</button>';
  card.append(wrap);
  boot.setAttribute('aria-hidden','false');boot.setAttribute('role','dialog');boot.setAttribute('aria-label','Welcome');
  boot.style.animation='none';
  const open=wrap.querySelector('.boot-open');open.focus({preventScroll:true});
  open.addEventListener('click',()=>{music.play();finishBoot()});
  wrap.querySelector('.boot-quiet').addEventListener('click',finishBoot);
}
if(document.readyState==='complete')gateBoot();else window.addEventListener('load',gateBoot,{once:true});
})();
