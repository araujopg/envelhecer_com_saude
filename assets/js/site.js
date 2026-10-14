(() => {
 'use strict';
 const menuButton=document.getElementById('menu-toggle');
 const nav=document.getElementById('main-nav');
 if(menuButton&&nav){
   menuButton.addEventListener('click',()=>{
     const opening=menuButton.getAttribute('aria-expanded')!=='true';
     menuButton.setAttribute('aria-expanded',String(opening));
     menuButton.setAttribute('aria-label',opening?'Fechar menu':'Abrir menu');
     nav.classList.toggle('is-open',opening);
   });
   nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu')}});
 }
 const textButton=document.getElementById('increase-text');
 if(textButton){
   textButton.addEventListener('click',()=>{
     const bigger=document.body.classList.toggle('text-large');
     textButton.setAttribute('aria-pressed',String(bigger));
     textButton.setAttribute('title',bigger?'Restaurar tamanho do texto':'Aumentar letras');
   });
   textButton.setAttribute('aria-pressed','false');
 }
 const mealFilters=document.querySelectorAll('[data-meal-filter]');
 const meals=document.querySelectorAll('[data-meal-group]');
 mealFilters.forEach(btn=>btn.addEventListener('click',()=>{
   const filter=btn.dataset.mealFilter;
   mealFilters.forEach(b=>{const selected=b===btn;b.classList.toggle('is-active',selected);b.setAttribute('aria-pressed',String(selected));});
   meals.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.mealGroup!==filter;});
 }));
 const checks=[...document.querySelectorAll('[data-fall-check]')];
 if(checks.length){
   const count=document.getElementById('falls-count'),progress=document.getElementById('falls-progress'),msg=document.getElementById('falls-feedback');
   const update=()=>{
     const n=checks.filter(c=>c.checked).length;
     count.textContent=`${n} de ${checks.length}`;
     progress.style.width=`${n/checks.length*100}%`;
     msg.textContent=n===0?'Comece marcando os cuidados que já existem na sua casa.':n===checks.length?'Você marcou todos os cuidados. Continue atento a outros riscos na sua casa.':`Você marcou ${n} ${n===1?'cuidado':'cuidados'}. Veja o que ainda pode melhorar.`;
   };
   checks.forEach(ch=>ch.addEventListener('change',update));
   const reset=document.getElementById('falls-reset');
   if(reset)reset.addEventListener('click',()=>{checks.forEach(c=>c.checked=false);update();});
 }
})();
