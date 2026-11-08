import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const pages=['index','despre','servicii','produse','mentenanta','garantii','certificari','oferta','legal','contact'];
test('all ten public pages are complete and dark-first',()=>{
 for(const p of pages){
  const html=read(p+'.html');
  assert.match(html,/<html lang="ro">/);
  assert.match(html,/name="robots" content="noindex,nofollow"/);
  assert.match(html,/document.documentElement.dataset.theme/);
  assert.match(html,/href="style.css"/);
  assert.match(html,/src="app.js"/);
  assert.match(html,new RegExp('data-page="'+(p==='index'?'home':p)+'"'));
 }
});
test('Javascript syntax',()=>{for(const name of ['app.js','catalog.js','admin/demo.js','admin/admin.js'])execFileSync(process.execPath,['--check',name],{cwd:root})});
test('46 services, 49 products and three categories',()=>{
 const script=read('catalog.js')+'\nconsole.log(JSON.stringify({services:SERVICES.length,products:PRODUCTS.length,families:Object.keys(famNames)}))';
 const result=JSON.parse(execFileSync(process.execPath,['-e',script],{cwd:root,encoding:'utf8'}));
 assert.equal(result.services,46);assert.equal(result.products,49);
 assert.deepEqual(result.families.sort(),['climatizare','incalzire','sanitare']);
});
test('each product has a local svg illustration',()=>{
 const script=read('catalog.js')+'\nconsole.log(JSON.stringify(PRODUCTS.map(x=>x.id)))';
 const ids=JSON.parse(execFileSync(process.execPath,['-e',script],{cwd:root,encoding:'utf8'}));
 for(const id of ids){const svg=read('img/products/'+id+'.svg');assert.match(svg,/<svg/);assert.match(svg,/<\/svg>/)}
});
test('theme, horizontal cards and two-second avatar are wired',()=>{
 const app=read('app.js'),css=read('style.css');
 assert.match(app,/id="themeToggle"/);assert.match(app,/localStorage.getItem\('c4322b-theme'\)/);
 assert.match(app,/service-entry/);assert.match(app,/product-entry/);
 assert.match(app,/WAVE_SECONDS=2/);assert.match(app,/SMILE_FRAME_SECONDS=5/);
 assert.match(css,/:root\[data-theme="light"\]/);
 assert.match(css,/\.entry\.service-entry,\.entry\.product-entry/);
});

test('FAQ page contains theme bootstrap and script launcher',()=>{
 const html=read('faq.html');assert.match(html,/data-page="faq"/);assert.match(html,/noindex,nofollow/);assert.match(html,/src="app.js"/);
});
test('500 FAQ entries use the 46 services and 49 products as their sources',()=>{
 const src=read('catalog.js')+'\n'+read('faq-data.js')+'\nconsole.log(JSON.stringify({rows:globalThis.C4322FAQ.items,services:SERVICES,products:PRODUCTS}))';
 const d=JSON.parse(execFileSync(process.execPath,['-e',src],{cwd:root,encoding:'utf8'}));
 assert.equal(d.rows.length,500);
 assert.equal(d.rows.filter(x=>x.category.startsWith('Servicii')).length,230);
 assert.equal(d.rows.filter(x=>x.category.startsWith('Produse')).length,245);
 assert.equal(d.rows.filter(x=>x.category==='General').length,25);
 assert.equal(new Set(d.rows.map(x=>x.id)).size,500);
 assert.equal(new Set(d.rows.map(x=>x.question)).size,500);
 const ids=new Set([...d.services,...d.products].map(x=>x.id));
 for(const x of d.rows){assert.ok(x.question.length>12);assert.ok(x.answer.length>20);if(x.sourceId)assert.ok(ids.has(x.sourceId))}
});
test('FAQ markup and assistant share a single knowledge base',()=>{
 const app=read('app.js');assert.match(app,/C4322FAQ.items.map/);assert.match(app,/C4322FAQ.search/);
 assert.match(app,/faq-jsonld/);assert.match(app,/faq-data.js/);assert.match(app,/if\(page==='faq'\)initFaq\(\)/);
});
