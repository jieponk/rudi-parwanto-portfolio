/* Mobile drawer reuses the same File/Edit/View/Go/Window/Help controls and actions. */
(()=>{
'use strict';
const trigger=document.getElementById('mobile-menu-trigger');
const nav=document.getElementById('app-menus');
if(!trigger||!nav)return;
function close(){nav.classList.remove('mobile-open');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-label','Open application menu');nav.querySelectorAll('.app-menu.open').forEach(menu=>{menu.classList.remove('open');menu.querySelector('.menu-trigger')?.setAttribute('aria-expanded','false')})}
trigger.addEventListener('click',()=>{const opening=!nav.classList.contains('mobile-open');if(opening){nav.classList.add('mobile-open');trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-label','Close application menu')}else close()});
nav.addEventListener('click',event=>{if(event.target.closest('.menu-dropdown button'))close()});
document.addEventListener('pointerdown',event=>{if(!nav.contains(event.target)&&!trigger.contains(event.target))close()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('mobile-open')){close();trigger.focus()}});
window.matchMedia('(min-width: 751px)').addEventListener('change',event=>{if(event.matches)close()});
})();
