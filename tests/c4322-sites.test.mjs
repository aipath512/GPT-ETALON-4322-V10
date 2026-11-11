// Teste site-uri de familie SCARA C4322 — v1.3 2026-11-11
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const root = process.cwd();
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const FAM = {C43221: {title: 'Încălzire', prefix: 'I', s: 34, p: 36, sub: 'Instalații de încălzire'},
             C43222: {title: 'Climatizare', prefix: 'C', s: 25, p: 28, sub: 'Instalații de climatizare'},
             C43223: {title: 'Sanitare', prefix: 'S', s: 30, p: 34, sub: 'Instalații sanitare'}};
const firma = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'etalons/C4322/firma.json'), 'utf8'));
const moduleData = fid => {const s = read(`etalons/C4322/${fid}.mjs`); return JSON.parse(s.slice(s.indexOf('{'), s.lastIndexOf('}') + 1));};
const pageData = html => JSON.parse(html.match(/const DATA=(\{.*?\});\n/)[1]);

for (const [fid, f] of Object.entries(FAM)) {
  test(`${fid} — modul de date corect`, () => {
    const d = moduleData(fid);
    assert.equal(d.title, f.title);
    assert.equal(d.services.length, f.s);
    assert.equal(d.products.length, f.p);
    for (const x of d.services) assert.match(x.id, new RegExp(`^S-${f.prefix}-\\d{2}$`));
    for (const x of d.products) assert.match(x.id, new RegExp(`^P-${f.prefix}-\\d{2}$`));
  });

  test(`${fid} — pagina publicată este completă și sincronizată cu modulul`, () => {
    const dir = `cloudflare-pages/${fid}`;
    const html = read(`${dir}/index.html`);
    assert.doesNotMatch(html, /undefined/);
    assert.doesNotMatch(html, /subclas/i);
    assert.ok(html.includes(firma.NumeFirma));
    assert.ok(html.includes(f.sub));
    assert.ok(html.includes(JSON.stringify(firma.CUI)));
    assert.match(html, /id="groupChips"/);
    assert.match(html, /name="robots" content="noindex,nofollow"/);
    assert.match(html, /id="cuiBox"/);
    assert.match(html, /id="themeToggle"/);
    assert.match(html, /id="langSel"/);
    assert.match(html, /sesiune 0001C/);
    assert.equal((html.match(/<option value=/g) || []).length, 24);
    assert.match(html, new RegExp(`<title>${f.title} \\|`));
    const d = moduleData(fid), p = pageData(html);
    const own = kind => [...d[kind].map(x => x.id), ...(d.sharedRefs?.[kind] || [])];
    assert.deepEqual(p.services.map(x => x.id), own('services'));
    assert.deepEqual(p.products.map(x => x.id), own('products'));
    for (const x of [...p.services, ...p.products]) {
      assert.ok(x.priceMinRON <= x.priceAvgRON && x.priceAvgRON <= x.priceMaxRON, x.id);
      assert.ok(x.priceUnit && x.group, x.id);
    }
    for (const x of p.products) { assert.ok(x.brands, x.id); assert.match(read(`${dir}/img/${x.id}.svg`), /<svg[\s\S]*<\/svg>/); }
    for (const file of ['404.html', 'favicon.svg', 'robots.txt', '_headers', '_routes.json']) assert.ok(fs.existsSync(path.join(root, dir, file)), file);
    const script = html.match(/<script>([\s\S]*?)<\/script>/g).pop().replace(/<\/?script>/g, '');
    const tmp = path.join(fs.mkdtempSync(path.join(process.env.RUNNER_TEMP || '/tmp', 'c4322-')), fid + '.js');
    fs.writeFileSync(tmp, script);
    execFileSync(process.execPath, ['--check', tmp]);
  });
}
