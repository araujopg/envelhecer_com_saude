/* Navigation for a single-page digital health booklet; no analytics or tracking. */
(() => {
  'use strict';
  const chapterData = [
    ['inicio','Início'],
    ['alimentacao','Alimentação'],
    ['atividade-fisica','Atividade física'],
    ['prevencao-quedas','Prevenção de quedas'],
    ['cuidados-saude','Cuide da saúde'],
    ['ubs','Sua UBS'],
    ['fontes','Fontes']
  ];
  const chapters=chapterData.map(([id,name])=>({id,name,el:document.getElementById(id)}));
  const navLinks=[...document.querySelectorAll('[data-nav-chapter]')];
  const toggle=document.getElementById('presentation-toggle');
  const dock=document.getElementById('presentation-dock');
  const prev=document.getElementById('present-prev');
  const next=document.getElementById('present-next');
  const name=document.getElementById('present-section');
  const count=document.getElementById('present-count');
  let currentIndex=0;
  let rafPending=false;

  function updateIndex(i){
    if(i<0||i>=chapters.length || currentIndex===i && name.textContent===chapters[i].name)return;
    currentIndex=i;
    navLinks.forEach(link=>{
      if(link.dataset.navChapter===chapters[i].id){link.setAttribute('aria-current','location');}
      else{link.removeAttribute('aria-current');}
    });
    name.textContent=chapters[i].name;
    count.textContent=`${i+1} de ${chapters.length}`;
    prev.disabled=i===0;
    next.disabled=i===chapters.length-1;
  }
  function getCurrentChapter(){
    // Account for the sticky chapter navigation.
    const threshold=window.innerHeight>700?210:155;
    let chosen=0;
    chapters.forEach((ch,i)=>{if(ch.el.getBoundingClientRect().top<=threshold)chosen=i;});
    return chosen;
  }
  function onScroll(){
    if(rafPending)return;
    rafPending=true;
    requestAnimationFrame(()=>{rafPending=false;updateIndex(getCurrentChapter());});
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  window.addEventListener('hashchange',onScroll);
  function go(i){
    const target=chapters[Math.min(Math.max(i,0),chapters.length-1)];
    if(!target)return;
    updateIndex(chapters.indexOf(target));
    target.el.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    if(history.replaceState)history.replaceState(null,'','#'+target.id);
  }
  const setPresentation=(on)=>{
    document.body.classList.toggle('presentation-mode',on);
    toggle.setAttribute('aria-pressed',String(on));
    toggle.setAttribute('aria-label',on?'Sair do modo apresentação':'Ativar modo apresentação');
    toggle.querySelector('.present-label').textContent=on?'Sair da apresentação':'Modo apresentação';
    dock.hidden=!on;
    updateIndex(getCurrentChapter());
  };
  toggle.addEventListener('click',()=>setPresentation(!document.body.classList.contains('presentation-mode')));
  prev.addEventListener('click',()=>go(currentIndex-1));
  next.addEventListener('click',()=>go(currentIndex+1));
  document.addEventListener('keydown',e=>{
    if(!document.body.classList.contains('presentation-mode'))return;
    if(['INPUT','TEXTAREA','SELECT','BUTTON','SUMMARY'].includes(document.activeElement?.tagName))return;
    if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();go(currentIndex+1);}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(currentIndex-1);}
    if(e.key==='Escape'){setPresentation(false);}
  });
  // Keep anchor jumps in the same document and reflect the section in the chapter counter.
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',()=>{
      const i=chapters.findIndex(x=>'#'+x.id===a.getAttribute('href'));
      if(i>=0)updateIndex(i);
    });
  });
  // Optional offline cache: requires HTTPS (or localhost); direct file access still works from extracted files.
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
  updateIndex(getCurrentChapter());
})();
