/* Language menu: only the Control Center icon opens this selector. */
(()=>{
  'use strict';
  const trigger=document.getElementById('control-trigger');
  const dropdown=document.getElementById('control-language-menu');
  const wrap=document.getElementById('control-wrap');
  if(!trigger||!dropdown||!wrap)return;
  const options=[...dropdown.querySelectorAll('[data-language]')];
  function sync(){
    const current=document.documentElement.lang==='id'?'id':'en';
    options.forEach(option=>{
      const selected=option.dataset.language===current;
      option.setAttribute('role','menuitemradio');
      option.setAttribute('aria-checked',String(selected));
    });
    document.getElementById('control-heading').textContent=current==='id'?'Bahasa':'Language';
    trigger.setAttribute('aria-label',current==='id'?'Pengaturan bahasa':'Language settings');
    const mobileLabel=document.getElementById('mobile-language-label');
    if(mobileLabel)mobileLabel.textContent=current==='id'?'ID':'EN';
  }
  function close(){dropdown.hidden=true;trigger.setAttribute('aria-expanded','false')}
  function open(){sync();dropdown.hidden=false;trigger.setAttribute('aria-expanded','true')}
  trigger.addEventListener('click',()=>dropdown.hidden?open():close());
  options.forEach(option=>option.addEventListener('click',()=>{
    if(typeof setPortfolioLanguage==='function')setPortfolioLanguage(option.dataset.language);
    sync();close();trigger.focus();
  }));
  document.addEventListener('pointerdown',event=>{if(!wrap.contains(event.target))close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!dropdown.hidden){close();trigger.focus()}});
  window.addEventListener('portfolio-language-change',sync);
  sync();
})();
