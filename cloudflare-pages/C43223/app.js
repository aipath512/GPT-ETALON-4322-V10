// SCARA C4322 — v2.3 2026-11-11
(function(){
'use strict';
const page=document.body.dataset.page;let lang='ro';
const T=k=>(I18N[lang]||I18N.ro)[k]||I18N.ro[k];
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=v=>v==null?'—':Number(v).toLocaleString('ro-RO');
const SYN={ac:['aer conditionat','split'],clima:['climatizare','aer conditionat'],calorifer:['radiator'],calorifere:['radiator'],radiator:['calorifer'],
 centrala:['centrala termica','cazan'],pdc:['pompa de caldura'],acm:['apa calda','boiler'],wc:['vas wc','toaleta'],toaleta:['wc'],
 robinet:['baterie','robinet'],baterie:['robinet'],desfundare:['canalizare','scurgere'],freon:['agent frigorific'],iscir:['verificare tehnica','revizie']};
const all=[...CAT.services.map(x=>({...x,kind:'servicii'})),...CAT.products.map(x=>({...x,kind:'produse'}))];
all.forEach(x=>x._h=norm([x.id,x.name,x.group,x.homeGroup,x.sharedFrom,(x.brandList||[]).join(' '),x.descriptionShort,x.operations,x.selectionCriteria,x.recommendedWhen].join(' ')));
const homeLike=page==='home'||page==='detail';
const pool=page==='servicii'?all.filter(x=>x.kind==='servicii'):page==='produse'?all.filter(x=>x.kind==='produse'):all;
const brands=[...new Set(pool.flatMap(x=>x.brandList||[]))].sort((a,b)=>a.localeCompare(b,'ro'));
const fB=document.getElementById('fBrand'),fG=document.getElementById('fGroup'),q=document.getElementById('q');
fB.insertAdjacentHTML('beforeend',brands.map(b=>'<option value="'+esc(b)+'">'+esc(b)+'</option>').join(''));
function match(x,tokens){return tokens.every(t=>x._h.includes(t)||(SYN[t]||[]).some(s=>x._h.includes(norm(s))))}
function score(x,tokens){const n=norm(x.name);return tokens.reduce((s,t)=>s+(n.includes(t)?2:0),0)}
function price(x){return '<div class="price"><strong>'+esc(T('price'))+':</strong> '+fmt(x.priceMinRON)+' – <b>'+fmt(x.priceAvgRON)+'</b> – '+fmt(x.priceMaxRON)+' lei / '+esc(x.priceUnit||'')+'<small>'+esc(T('rec'))+': '+fmt(x.priceAvgRON)+' lei · '+esc(x.priceBasis||'')+'</small></div>'}
function row(x,compact){
 const href=x.url;
 return '<article class="row" id="'+(compact?'r-':'')+esc(x.id)+'"><img class="rimg" src="'+esc(x.img)+'" alt="" loading="lazy"><div class="rbody">'+
  (x.sharedFrom?'<span class="grp shared">Vezi pe site-ul '+esc(x.sharedFrom)+' · '+esc(x.homeGroup)+'</span>':'<span class="grp">'+esc(x.group)+'</span>')+
  '<h3><a href="'+href+'">'+esc(x.name)+'</a></h3><div class="code">'+esc(x.id)+' · '+(x.kind==='servicii'?'serviciu':'produs')+'</div>'+
  (x.kind==='produse'&&x.brands?'<div class="brands"><strong>'+esc(T('brands'))+':</strong> '+esc(x.brands)+'</div>':'')+price(x)+
  '<p>'+esc(x.descriptionShort)+' <a class="dlink" href="'+href+'">'+(x.external?'Vezi pe site-ul '+esc(x.sharedFrom)+' →':'Detalii →')+'</a></p>'+(compact?'':'<details><summary>'+(x.kind==='servicii'?'Operațiuni și recomandări':'Criterii de selecție')+'</summary><p>'+esc(x.kind==='servicii'?x.operations:x.selectionCriteria)+'</p>'+(x.recommendedWhen?'<p><strong>Când:</strong> '+esc(x.recommendedWhen)+'</p>':'')+'</details>')+'</div></article>'}
function render(){
 const tokens=norm(q.value).split(/\s+/).filter(Boolean),b=fB.value,g=fG.value,active=tokens.length||b||g;
 let rows=pool.filter(x=>(!b||(x.brandList||[]).includes(b))&&(!g||x.group===g)&&match(x,tokens));
 if(tokens.length)rows.sort((a,c)=>score(c,tokens)-score(a,tokens));
 const list=document.getElementById('list'),count=document.getElementById('count');
 if(homeLike&&!active){list.innerHTML='';count.textContent='';return}
 count.textContent=rows.length+' '+T('of')+' '+pool.length+' '+T('sheets');
 list.innerHTML=rows.length?rows.map(x=>row(x,homeLike)).join(''):'<div class="empty">'+esc(T('noresults'))+'</div>';
 const u=new URL(location.href);[['q',q.value],['marca',b],['grupa',g]].forEach(([k,v])=>v?u.searchParams.set(k,v):u.searchParams.delete(k));history.replaceState(null,'',u);
}
const P=new URLSearchParams(location.search);q.value=P.get('q')||'';fB.value=P.get('marca')||'';fG.value=P.get('grupa')||'';
[q,fB,fG].forEach(e=>e.addEventListener('input',render));
function applyLang(l){lang=I18N[l]?l:'ro';document.documentElement.lang=lang;document.getElementById('langSel').value=lang;document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=T(e.dataset.i18n));q.placeholder=T('search');try{localStorage.setItem('scara-lang',lang)}catch(e){}render()}
document.getElementById('langSel').addEventListener('change',e=>applyLang(e.target.value));
function applyTheme(m){document.body.classList.toggle('light-mode',m==='light');document.getElementById('themeIcon').textContent=m==='light'?'☾':'☀';document.getElementById('themeLabel').textContent=m==='light'?'Dark':'Light';try{localStorage.setItem('scara-theme',m)}catch(e){}}
document.getElementById('themeToggle').addEventListener('click',()=>applyTheme(document.body.classList.contains('light-mode')?'dark':'light'));
let th='dark',lg='ro';try{th=localStorage.getItem('scara-theme')||'dark';lg=localStorage.getItem('scara-lang')||'ro'}catch(e){}
applyTheme(th);applyLang(lg);
const clock=()=>{document.getElementById('clock').textContent=new Date().toLocaleString('ro-RO',{dateStyle:'short',timeStyle:'short'})};clock();setInterval(clock,30000);
const fp=P.get('firma');if(fp){const n=fp.slice(0,80);document.querySelectorAll('#firmName').forEach(e=>e.textContent=n);document.getElementById('logoFirm').firstChild.textContent=n}
if(location.hash){const el=document.getElementById(location.hash.slice(1));if(el){el.classList.add('hit');el.scrollIntoView()}}
// CUI: parametru comun din firma.json, înlocuibil cu ?cui=; validare cu cifra de control oficială (cheia 753217532)
const view=document.getElementById('cuiView');if(view){
 const msg=document.getElementById('cuiMsg'),inp=document.getElementById('cuiInput'),baseTitle=document.title;
 const clean=s=>String(s||'').toUpperCase().replace(/^RO/,'').replace(/\D/g,'');
 const valid=c=>{if(!/^\d{2,10}$/.test(c))return false;const k='753217532',b=c.slice(0,-1).padStart(9,'0');let s=0;for(let i=0;i<9;i++)s+=b[i]*k[i];let r=s*10%11;if(r===10)r=0;return r===+c.slice(-1)};
 function show(raw){const c=clean(raw);
  if(c&&c===clean(CUI_DEF)&&CUI_EX){inp.value=c;view.textContent='CUI '+c;view.className='cui-val';msg.textContent='CUI exemplu — parametru comun celor trei site-uri, de înlocuit în firma.json.';document.title=baseTitle;return}
  if(!c){view.textContent='Fără CUI';view.className='cui-val';msg.textContent='Introduceți CUI-ul firmei.';document.title=baseTitle;return}
  inp.value=c;view.textContent='CUI '+c;
  if(valid(c)){view.className='cui-val cui-ok';msg.textContent='Cifra de control este corectă. Identitatea firmei nu este verificată aici (ONRC/ANAF).'}
  else{view.className='cui-val cui-bad';msg.textContent='Atenție: cifra de control nu corespunde — CUI probabil greșit.'}
  document.title='CUI '+c+' · '+baseTitle}
 document.getElementById('cuiForm').addEventListener('submit',e=>{e.preventDefault();const c=clean(inp.value);const u=new URL(location.href);c?u.searchParams.set('cui',c):u.searchParams.delete('cui');history.replaceState(null,'',u);show(c)});
 show(P.get('cui')||CUI_DEF)}
})();
