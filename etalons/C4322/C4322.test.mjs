import test from 'node:test';
import assert from 'node:assert/strict';
import {SUBCLASSES, validateEtalon, composeC4322} from './C4322.mjs';

test('3 independent C4322 etalons with expected catalog sizes', () => {
  assert.deepEqual(Object.keys(SUBCLASSES), ['C43221','C43222','C43223']);
  assert.deepEqual(Object.values(SUBCLASSES).map(validateEtalon).map(x=>[x.services,x.products]), [[16,18],[15,14],[15,17]]);
});

test('seven non-empty combinations, one site per CUI + CAEN', () => {
  const ids = Object.keys(SUBCLASSES);
  for (let mask=1;mask<8;mask++) {
    const activeClasses=ids.filter((_,i)=>(mask&(1<<i))!==0);
    const site=composeC4322({CAEN:'4322',CUI:'12345678',NumeFirma:'TCS INSTAL',SubtitluFirma:'Instalatii Bucuresti',activeClasses});
    assert.equal(site.key.CAEN,'4322');
    assert.equal(site.key.CUI,'12345678');
    assert.deepEqual(site.activeClasses,activeClasses);
    assert.equal(site.services.length,activeClasses.reduce((n,id)=>n+SUBCLASSES[id].services.length,0));
    assert.equal(site.products.length,activeClasses.reduce((n,id)=>n+SUBCLASSES[id].products.length,0));
    assert.equal(new Set(site.services.map(x=>x.id)).size,site.services.length);
    assert.equal(new Set(site.products.map(x=>x.id)).size,site.products.length);
    assert.equal(site.publication.status,'preview_only');
  }
});

test('bifare la nivel de serviciu si produs; fara scurgeri intre etaloane', () => {
  const site=composeC4322({
    CUI:'12345678',NumeFirma:'Firma Demo',activeClasses:['C43221'],
    activeServices:['S-I-01'],activeProducts:['P-I-01']
  });
  assert.equal(site.services.length,1);
  assert.equal(site.products.length,1);
  assert.throws(()=>composeC4322({
    CUI:'12345678',NumeFirma:'Firma Demo',activeClasses:['C43221'],
    activeServices:['S-C-01']
  }));
  assert.throws(()=>composeC4322({CUI:'12345678',NumeFirma:'Demo',activeClasses:[]}));
  assert.throws(()=>composeC4322({CUI:'12345678',NumeFirma:'Demo',activeClasses:['C43221','C43221']}));
});
