/* Offline-first cache for this single-page booklet. Must be installed once over HTTPS / localhost. */
const CACHE='envelhecer-com-saude-unica-v1';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./assets/css/style.css", "./assets/css/pagina-unica.css", "./assets/js/site.js", "./assets/js/pagina-unica.js", "./assets/img/atividade-01.webp", "./assets/img/refeicao-11.webp", "./assets/img/atividade-08.webp", "./assets/img/refeicao-02.webp", "./assets/img/refeicao-07.webp", "./assets/img/refeicao-12.webp", "./assets/img/atividade-07.webp", "./assets/img/musculatura-comparacao.webp", "./assets/img/queda-06-seguro.svg", "./assets/img/refeicao-01.webp", "./assets/img/atividade-06.webp", "./assets/img/refeicao-05.webp", "./assets/img/refeicao-03.webp", "./assets/img/refeicao-09.webp", "./assets/img/queda-05-risco.svg", "./assets/img/queda-02-seguro.svg", "./assets/img/queda-04-seguro.svg", "./assets/img/queda-05-seguro.svg", "./assets/img/atividade-03.webp", "./assets/img/queda-04-risco.svg", "./assets/img/atividade-02.webp", "./assets/img/favicon.svg", "./assets/img/queda-03-risco.svg", "./assets/img/refeicao-10.webp", "./assets/img/refeicao-08.webp", "./assets/img/queda-01-risco.svg", "./assets/img/refeicao-04.webp", "./assets/img/queda-01-seguro.svg", "./assets/img/atividade-04.webp", "./assets/img/queda-02-risco.svg", "./assets/img/atividade-05.webp", "./assets/img/queda-06-risco.svg", "./assets/img/refeicao-06.webp", "./assets/img/queda-03-seguro.svg"];
self.addEventListener('install', event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&key.startsWith('envelhecer-com-saude-unica-')).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
    if(response.ok){const clone=response.clone();caches.open(CACHE).then(c=>c.put(event.request,clone));}
    return response;
  }).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
