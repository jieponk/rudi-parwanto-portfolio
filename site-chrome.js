/* Shared behaviour for /blog, /links and 404: theme, explorer, clock, history arrows. */
(()=>{
'use strict';
const body=document.body,root=document.documentElement,$=id=>document.getElementById(id);
const SUN='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
function apply(light,save){
  body.classList.toggle('light',light);
  if(light)root.dataset.theme='light';else root.dataset.theme='dark';
  const b=$('theme');
  if(b){b.innerHTML=(light?MOON:SUN)+'<span>'+(light?'Dark':'Light')+'</span>';b.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme')}
  let m=document.querySelector('meta[name="theme-color"]');
  if(!m){m=document.createElement('meta');m.name='theme-color';document.head.append(m)}
  m.content=light?'#f8f8f8':'#1f1f1f';
  if(save){try{localStorage.setItem('cvstudio-theme',light?'light':'dark')}catch(e){}}
  if(typeof window.syncCommentsTheme==='function')window.syncCommentsTheme();
}
apply(body.classList.contains('light')||root.dataset.theme==='light',false);
const toggle=()=>apply(!body.classList.contains('light'),true);
$('theme')?.addEventListener('click',toggle);
$('act-theme')?.addEventListener('click',toggle);

const explorer=$('act-explorer');
explorer?.addEventListener('click',()=>{
  const hidden=body.classList.toggle('sidebar-hidden');
  explorer.classList.toggle('active',!hidden);explorer.setAttribute('aria-pressed',String(!hidden));
});
document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>b.dataset.nav==='back'?history.back():history.forward()));

const clock=$('clock');
function tick(){if(clock)clock.textContent=new Date().toLocaleString('en-US',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true})}
tick();setInterval(tick,30000);
document.querySelector('.tabs .tab.active')?.scrollIntoView({block:'nearest',inline:'nearest'});
})();
