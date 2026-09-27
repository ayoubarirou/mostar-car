'use strict';
(() => {
 const hero=document.querySelector('.hero');
 const button=document.querySelector('.hero-motion-toggle');
 let manuallyPaused=false;
 let inView=true;
 const sync=()=>hero.classList.toggle('motion-paused',manuallyPaused||!inView||document.hidden);
 button.addEventListener('click',()=>{
  manuallyPaused=!manuallyPaused;
  button.setAttribute('aria-pressed',String(manuallyPaused));
  button.textContent=manuallyPaused?'▷ Reprendre l’animation':'Ⅱ Pause animation';
  sync();
 });
 document.addEventListener('visibilitychange',sync);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:0}).observe(hero);
})();
