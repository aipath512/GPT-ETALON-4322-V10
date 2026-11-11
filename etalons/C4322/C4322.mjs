// SCARA: compunerea unui site unic din 1-3 etaloane independente CAEN 4322.
// CUI identifica firma; CAEN selecteaza etalonul. Nu publica si nu contacta firme.
import heating from './C43221.mjs';
import climate from './C43222.mjs';
import sanitary from './C43223.mjs';

export const CAEN_4322 = '4322';
export const SUBCLASSES = Object.freeze({ C43221: heating, C43222: climate, C43223: sanitary });

function normalized(text) {
  return String(text ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('ro').replace(/\s+/g, ' ').trim();
}
function uniqueCatalog(items, category) {
  const byId = new Map(), byName = new Map();
  for (const item of items) {
    if (!item.id || !item.name) throw new Error(category + ': ID sau denumire lipsa');
    const nameKey = normalized(item.name);
    const foundId = byName.get(nameKey);
    if (foundId && foundId !== item.id) {
      throw new Error(category + ': posibil duplicat semantic: ' + item.name + ' (' + foundId + ' / ' + item.id + ')');
    }
    if (byId.has(item.id)) throw new Error(category + ': ID duplicat: ' + item.id);
    byName.set(nameKey, item.id);
    byId.set(item.id, item);
  }
  return [...byId.values()];
}
export function validateEtalon(etalon) {
  if (etalon.caen !== CAEN_4322 || etalon.parentClassId !== 'C4322') throw new Error('Etalon incompatibil cu C4322');
  uniqueCatalog(etalon.services, 'services');
  uniqueCatalog(etalon.products, 'products');
  return {classId:etalon.classId, services:etalon.services.length, products:etalon.products.length, valid:true};
}
export function composeC4322({ CUI, CAEN = CAEN_4322, NumeFirma, SubtitluFirma = '', activeClasses, activeServices, activeProducts, ...company }) {
  const cui = String(CUI ?? '').replace(/\D/g,'');
  if (String(CAEN) !== CAEN_4322) throw new Error('Generatorul este momentan doar pentru CAEN 4322');
  if (!/^[0-9]{2,10}$/.test(cui)) throw new Error('CUI invalid ca format; validarea oficiala se face separat');
  if (!String(NumeFirma ?? '').trim()) throw new Error('NumeFirma este obligatoriu');
  if (!Array.isArray(activeClasses) || new Set(activeClasses).size !== activeClasses.length ||
      activeClasses.length < 1 || activeClasses.length > 3 ||
      activeClasses.some(id => !SUBCLASSES[id])) throw new Error('Selectati 1-3 subclase valide, fara dubluri');
  const selected = activeClasses.map(id => SUBCLASSES[id]);
  selected.forEach(validateEtalon);
  const allServices = uniqueCatalog(selected.flatMap(x => x.services), 'services');
  const allProducts = uniqueCatalog(selected.flatMap(x => x.products), 'products');
  const serviceIds = activeServices == null ? allServices.map(x=>x.id) : activeServices;
  const productIds = activeProducts == null ? allProducts.map(x=>x.id) : activeProducts;
  if (!Array.isArray(serviceIds) || !Array.isArray(productIds) ||
      new Set(serviceIds).size!==serviceIds.length || new Set(productIds).size!==productIds.length) {
    throw new Error('Listele active trebuie sa fie seturi fara duplicate');
  }
  const sAllowed = new Set(allServices.map(x => x.id)), pAllowed = new Set(allProducts.map(x => x.id));
  if (serviceIds.some(x=>!sAllowed.has(x)) || productIds.some(x=>!pAllowed.has(x))) {
    throw new Error('Catalog activ incompatibil cu subclasele selectate');
  }
  return {
    kind:'SCARA_C4322_SITE_CONFIG', version:'1.0.0-draft',
    key:{CAEN:CAEN_4322,CUI:cui},
    company:{NumeFirma:String(NumeFirma).trim(),SubtitluFirma:String(SubtitluFirma).trim(),...company},
    activeClasses:[...activeClasses],
    services:allServices.filter(x => serviceIds.includes(x.id)),
    products:allProducts.filter(x => productIds.includes(x.id)),
    assistant:{knowledgeModules:[...activeClasses],companyCUI:cui},
    publication:{status:'preview_only',approvalRequired:true},
    warnings:['Configuratie demonstrativa: serviciile si produsele trebuie confirmate de firma inainte de publicare.']
  };
}
