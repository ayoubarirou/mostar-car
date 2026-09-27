'use strict';
(() => {
 const options=window.MOSTAR.intro||{};
 const intro=document.querySelector('#cinematic-intro');
 if(!intro||options.enabled===false||typeof intro.showModal!=='function')return;
 const video=intro.querySelector('video');
 const poster=intro.querySelector('.intro-poster');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const duration=Math.max(3000,Math.min(5000,Number(options.durationMs)||4000));
 const fade=reduced.matches?150:600;
 let leaving=false,exitTimer,closeTimer;
 poster.src=options.poster||window.MOSTAR.heroImage;
 intro.querySelector('.intro-tagline').textContent=options.tagline||'Votre route commence ici.';
 intro.style.setProperty('--intro-hold',`${duration-fade}ms`);
 const finish=()=>{
  clearTimeout(exitTimer);clearTimeout(closeTimer);
  video.pause();video.removeAttribute('src');video.load();
  intro.close();document.body.classList.remove('intro-active');
  const heading=document.querySelector('.hero h1');
  if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
 };
 const leave=()=>{
  if(leaving)return;leaving=true;
  clearTimeout(exitTimer);intro.classList.add('is-leaving');
  closeTimer=setTimeout(finish,fade);
 };
 intro.querySelector('.intro-skip').addEventListener('click',leave);
 intro.addEventListener('cancel',event=>{event.preventDefault();leave();});
 document.body.classList.add('intro-active');intro.showModal();
 // Exit on schedule even if the video is slow, blocked or missing.
 exitTimer=setTimeout(leave,duration-fade);
 if(options.videoSrc&&!reduced.matches){
  video.muted=true;video.poster=poster.src;
  video.addEventListener('playing',()=>intro.classList.add('video-playing'),{once:true});
  video.addEventListener('error',()=>intro.classList.remove('video-playing'));
  video.src=options.videoSrc;
  video.play().catch(()=>intro.classList.remove('video-playing'));
 }
 reduced.addEventListener('change',()=>{if(reduced.matches){video.pause();intro.classList.remove('video-playing');}});
})();
