// Teste dicționar entitate–relație C4322 — v1.0 2026-11-11 (sesiune 0006H)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ENT = JSON.parse(fs.readFileSync('etalons/C4322/dictionar/entitati.json', 'utf8'));
const REL = JSON.parse(fs.readFileSync('etalons/C4322/dictionar/relatii.json', 'utf8'));
const E = new Map(ENT.entitati.map(e => [e.id, e]));
const CARD = {'1': [1, 1], '0..1': [0, 1], '0..*': [0, Infinity], '1..*': [1, Infinity]};

test('entități: ID și cod unice, sesiune pe fiecare', () => {
  assert.equal(E.size, ENT.entitati.length);
  const codes = ENT.entitati.filter(e => e.code).map(e => e.code);
  assert.equal(new Set(codes).size, codes.length);
  for (const e of ENT.entitati) { assert.match(e.id, /^ENT-C4322-\d{4}$/); assert.equal(e.session, '0006H'); }
});

test('relații: tip cunoscut, capete existente, tipuri corecte, fără dubluri, cu sesiune', () => {
  const T = new Map(REL.tipuri.map(t => [t.type, t]));
  const seen = new Set();
  for (const r of REL.relatii) {
    const t = T.get(r.type); assert.ok(t, r.type); assert.ok(t.inverse, 'inversă lipsă ' + r.type);
    assert.ok(E.has(r.source) && E.has(r.target), r.id);
    assert.ok(t.sourceType.split('|').includes(E.get(r.source).type), r.id);
    assert.ok(t.targetType.split('|').includes(E.get(r.target).type), r.id);
    const k = r.type + r.source + r.target; assert.ok(!seen.has(k), 'dublă ' + r.id); seen.add(k);
    assert.equal(r.session, '0006H');
  }
});

test('cardinalități respectate pe fiecare tip de relație', () => {
  for (const t of REL.tipuri) {
    const rs = REL.relatii.filter(r => r.type === t.type);
    for (const [side, card] of [['source', t.targetCard], ['target', t.sourceCard]]) {
      const [lo, hi] = CARD[card], types = t[side + 'Type'].split('|');
      for (const e of ENT.entitati.filter(e => types.includes(e.type))) {
        const n = rs.filter(r => r[side] === e.id).length;
        assert.ok(n >= lo && n <= hi, `${t.type} ${card}: ${e.code || e.id} are ${n}`);
      }
    }
  }
});

test('fiecare serviciu și produs are preț min ≤ recomandat ≤ max', () => {
  for (const e of ENT.entitati.filter(e => e.type === 'Serviciu' || e.type === 'Produs')) {
    const p = e.properties; assert.ok(p.priceMinRON <= p.priceAvgRON && p.priceAvgRON <= p.priceMaxRON, e.code);
  }
});
