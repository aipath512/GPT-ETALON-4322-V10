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
