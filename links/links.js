(()=>{
  'use strict';
  const root=document.documentElement;
  const theme=document.getElementById('theme');
  const clock=document.getElementById('clock');
  const icon=theme?.querySelector('img');
  const label=theme?.querySelector('span');
  function apply(mode){
    const light=mode==='light';
    root.classList.toggle('light',light);
    document.body.classList.toggle('light',light);
    if(label) label.textContent=light?'Dark':'Light';
    if(icon) icon.src=light?'../assets/icon-moon.webp':'../assets/icon-sun.webp';
    localStorage.setItem('rudi-theme',mode);
  }
  apply(localStorage.getItem('rudi-theme')==='light'?'light':'dark');
  theme?.addEventListener('click',()=>apply(document.body.classList.contains('light')?'dark':'light'));
  function tick(){if(clock)clock.textContent=new Intl.DateTimeFormat('en-US',{weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}
  tick();setInterval(tick,30000);
})();
