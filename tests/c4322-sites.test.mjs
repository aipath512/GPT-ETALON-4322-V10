// Teste site-uri de familie SCARA C4322 — v1.4 2026-11-11
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const root = process.cwd();
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const exists = p => fs.existsSync(path.join(root, p));
const FAM = {C43221: {title: 'Încălzire', prefix: 'I', s: 34, p: 36, sub: 'Instalații de încălzire'},
             C43222: {title: 'Climatizare', prefix: 'C', s: 25, p: 28, sub: 'Instalații de climatizare'},
             C43223: {title: 'Sanitare', prefix: 'S', s: 30, p: 34, sub: 'Instalații sanitare'}};
const firma = JSON.parse(read('etalons/C4322/firma.json'));
const moduleData = fid => {const s = read(`etalons/C4322/${fid}.mjs`); return JSON.parse(s.slice(s.indexOf('{'), s.lastIndexOf('}') + 1));};
const siteCatalog = fid => JSON.parse(read(`cloudflare-pages/${fid}/catalog.js`).match(/const CAT=(\{.*\});/)[1]);

for (const [fid, f] of Object.entries(FAM)) {
  test(`${fid} — modul de date corect`, () => {
    const d = moduleData(fid);
    assert.equal(d.title, f.title);
    assert.equal(d.services.length, f.s);
    assert.equal(d.products.length, f.p);
    for (const x of d.services) assert.match(x.id, new RegExp(`^S-${f.prefix}-\\d{2}$`));
    for (const x of d.products) assert.match(x.id, new RegExp(`^P-${f.prefix}-\\d{2}$`));
  });

  test(`${fid} — trei pagini (acasă, servicii, produse) complete`, () => {
    const dir = `cloudflare-pages/${fid}`;
    for (const page of ['index.html', 'servicii/index.html', 'produse/index.html']) {
      const html = read(`${dir}/${page}`);
      assert.doesNotMatch(html, /undefined|subclas/i, page);
      assert.ok(html.includes(firma.NumeFirma) && html.includes(f.sub), page);
      assert.match(html, /name="robots" content="noindex,nofollow"/);
      for (const id of ['themeToggle', 'langSel', 'q', 'fBrand', 'fGroup', 'list']) assert.match(html, new RegExp(`id="${id}"`), page + ' ' + id);
      assert.equal((html.match(/<option value="[a-z]{2}">/g) || []).length, 24, page);
      assert.match(html, /sesiune 0001C/);
      assert.match(html, /src="\/catalog\.js"/); assert.match(html, /src="\/app\.js"/);
    }
    const home = read(`${dir}/index.html`);
    assert.match(home, /id="cuiBox"/);
    assert.ok(home.includes(JSON.stringify(firma.CUI)));
    for (const g of moduleData(fid).groups) assert.ok(home.includes(`>${g} — `), 'grupă pe homepage: ' + g);
    assert.match(home, /href="\/servicii\/\?grupa=/); assert.match(home, /href="\/produse\/\?grupa=/);
    for (const file of ['404.html', 'favicon.svg', 'robots.txt', '_headers', '_routes.json']) assert.ok(exists(`${dir}/${file}`), file);
  });

  test(`${fid} — catalogul publicat = fișe proprii + comune, cu preț, mărci și imagini`, () => {
    const d = moduleData(fid), c = siteCatalog(fid), dir = `cloudflare-pages/${fid}`;
    const own = kind => [...d[kind].map(x => x.id), ...(d.sharedRefs?.[kind] || [])];
    assert.deepEqual(c.services.map(x => x.id), own('services'));
    assert.deepEqual(c.products.map(x => x.id), own('products'));
    for (const x of [...c.services, ...c.products]) {
      assert.ok(x.priceMinRON <= x.priceAvgRON && x.priceAvgRON <= x.priceMaxRON, x.id);
      assert.ok(x.priceUnit && x.group && x.img, x.id);
      assert.ok(exists(`${dir}${x.img}`), 'imagine ' + x.img);
    }
    for (const x of c.products) assert.ok(x.brands && x.brandList.length, x.id);
    for (const js of ['app.js', 'catalog.js']) execFileSync(process.execPath, ['--check', path.join(root, dir, js)]);
  });
}
