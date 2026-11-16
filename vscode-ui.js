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
  requestAnimationFrame(()=>document.querySelector('#tabs .tab.active')?.scrollIntoView({block:'nearest',inline:'nearest'}));
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
if(document.readyState==='complete')finishBoot();else window.addEventListener('load',finishBoot,{once:true});
})();
