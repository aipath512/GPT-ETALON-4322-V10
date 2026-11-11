#!/usr/bin/env python3
"""Generator SCARA C4322 — v2.0 2026-11-11 (sursa: dicționarul entitate-relație).

Reconstruiește cele trei site-uri de familie (cloudflare-pages/C43221..C43223)
din modulele de date etalons/C4322/C4322x.mjs. Rulare: python3 tools/build_c4322.py
C43221/C43222/C43223 sunt coduri interne SCARA; codul CAEN oficial (Rev.3) este clasa 4322.
"""
import json, html, pathlib, re, shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
VERSION = 'v2.3'
DATE = '2026-11-11'
SESSION = '0006H'
CFG = json.loads((ROOT / 'etalons/C4322/firma.json').read_text(encoding='utf-8'))
FIRM = CFG['NumeFirma']
PUBLIC = bool(CFG.get('Public'))
ROBOTS = 'index,follow,max-snippet:-1,max-image-preview:large' if PUBLIC else 'noindex,nofollow'
BASE = CFG.get('URL', {})
FAMILIES = {
    'C43221': {'icon': '♨', 'subtitle': 'Soluții de încălzire pentru apartamente și case'},
    'C43222': {'icon': '❄', 'subtitle': 'Aer condiționat, ventilație și confort în fiecare sezon'},
    'C43223': {'icon': '◉', 'subtitle': 'Instalații de apă, baie și canalizare pentru locuințe'},
}
LANGS = {
 'ro':('Română',['Acasă','Servicii și produse','Despre','Servicii','Produse','Caută: cuvinte-cheie, cod, grupă, marcă…','Afișează','Preț min / recomandat / max','de completat','din','fișe','Nu există rezultate.','Toate','Mărci','recomandat','Vezi mai multe']),
 'en':('English',['Home','Services & products','About','Services','Products','Search by name, description or operation…','Show','Price min / avg / max','to be completed','of','entries','No results.','All','Brands','recommended','See more']),
 'fr':('Français',['Accueil','Services et produits','À propos','Services','Produits','Rechercher par nom, description ou opération…','Afficher','Prix min / moyen / max','à compléter','sur','fiches','Aucun résultat.','Tout','Marques','recommandé','Voir plus']),
 'de':('Deutsch',['Startseite','Leistungen und Produkte','Über uns','Leistungen','Produkte','Suche nach Name, Beschreibung oder Arbeitsgang…','Anzeigen','Preis min / mittel / max','auszufüllen','von','Einträge','Keine Ergebnisse.','Alle','Marken','empfohlen','Mehr anzeigen']),
 'it':('Italiano',['Home','Servizi e prodotti','Chi siamo','Servizi','Prodotti','Cerca per nome, descrizione o operazione…','Mostra','Prezzo min / medio / max','da completare','di','schede','Nessun risultato.','Tutti','Marche','consigliato','Vedi di più']),
 'es':('Español',['Inicio','Servicios y productos','Quiénes somos','Servicios','Productos','Buscar por nombre, descripción u operación…','Mostrar','Precio mín / medio / máx','por completar','de','fichas','Sin resultados.','Todos','Marcas','recomendado','Ver más']),
 'pt':('Português',['Início','Serviços e produtos','Sobre','Serviços','Produtos','Pesquisar por nome, descrição ou operação…','Mostrar','Preço mín / médio / máx','a preencher','de','fichas','Sem resultados.','Todos','Marcas','recomendado','Ver mais']),
 'nl':('Nederlands',['Home','Diensten en producten','Over ons','Diensten','Producten','Zoek op naam, beschrijving of handeling…','Tonen','Prijs min / gem / max','nog in te vullen','van','fiches','Geen resultaten.','Alle','Merken','aanbevolen','Meer bekijken']),
 'pl':('Polski',['Strona główna','Usługi i produkty','O nas','Usługi','Produkty','Szukaj według nazwy, opisu lub czynności…','Pokaż','Cena min / śr. / maks.','do uzupełnienia','z','kart','Brak wyników.','Wszystkie','Marki','zalecana','Zobacz więcej']),
 'cs':('Čeština',['Domů','Služby a produkty','O nás','Služby','Produkty','Hledat podle názvu, popisu nebo úkonu…','Zobrazit','Cena min / prům. / max','k doplnění','z','karet','Žádné výsledky.','Vše','Značky','doporučená','Zobrazit více']),
 'sk':('Slovenčina',['Domov','Služby a produkty','O nás','Služby','Produkty','Hľadať podľa názvu, popisu alebo úkonu…','Zobraziť','Cena min / priem. / max','na doplnenie','z','kariet','Žiadne výsledky.','Všetko','Značky','odporúčaná','Zobraziť viac']),
 'sl':('Slovenščina',['Domov','Storitve in izdelki','O nas','Storitve','Izdelki','Iskanje po imenu, opisu ali opravilu…','Prikaži','Cena min / povp. / maks.','za dopolnitev','od','kartic','Ni rezultatov.','Vse','Znamke','priporočena','Prikaži več']),
 'hr':('Hrvatski',['Početna','Usluge i proizvodi','O nama','Usluge','Proizvodi','Traži po nazivu, opisu ili radnji…','Prikaži','Cijena min / prosj. / maks.','za dopunu','od','kartica','Nema rezultata.','Sve','Marke','preporučena','Prikaži više']),
 'hu':('Magyar',['Főoldal','Szolgáltatások és termékek','Rólunk','Szolgáltatások','Termékek','Keresés név, leírás vagy művelet szerint…','Megjelenítés','Ár min / átl. / max','kitöltendő','/','adatlap','Nincs találat.','Összes','Márkák','ajánlott','Továbbiak']),
 'bg':('Български',['Начало','Услуги и продукти','За нас','Услуги','Продукти','Търсене по име, описание или операция…','Покажи','Цена мин / ср. / макс','за попълване','от','карти','Няма резултати.','Всички','Марки','препоръчана','Виж още']),
 'el':('Ελληνικά',['Αρχική','Υπηρεσίες και προϊόντα','Σχετικά','Υπηρεσίες','Προϊόντα','Αναζήτηση με όνομα, περιγραφή ή εργασία…','Εμφάνιση','Τιμή ελάχ. / μέση / μέγ.','προς συμπλήρωση','από','καρτέλες','Κανένα αποτέλεσμα.','Όλα','Μάρκες','προτεινόμενη','Δείτε περισσότερα']),
 'da':('Dansk',['Forside','Ydelser og produkter','Om os','Ydelser','Produkter','Søg efter navn, beskrivelse eller opgave…','Vis','Pris min / gns. / maks.','udfyldes senere','af','kort','Ingen resultater.','Alle','Mærker','anbefalet','Se mere']),
 'sv':('Svenska',['Hem','Tjänster och produkter','Om oss','Tjänster','Produkter','Sök på namn, beskrivning eller moment…','Visa','Pris min / medel / max','fylls i senare','av','kort','Inga resultat.','Alla','Märken','rekommenderat','Visa mer']),
 'fi':('Suomi',['Etusivu','Palvelut ja tuotteet','Tietoa meistä','Palvelut','Tuotteet','Hae nimellä, kuvauksella tai työvaiheella…','Näytä','Hinta min / keski / maks','täydennetään','/','korttia','Ei tuloksia.','Kaikki','Merkit','suositeltu','Näytä lisää']),
 'et':('Eesti',['Avaleht','Teenused ja tooted','Meist','Teenused','Tooted','Otsi nime, kirjelduse või toimingu järgi…','Näita','Hind min / kesk / max','täitmata','/','kaarti','Tulemusi pole.','Kõik','Kaubamärgid','soovitatav','Vaata rohkem']),
 'lv':('Latviešu',['Sākums','Pakalpojumi un produkti','Par mums','Pakalpojumi','Produkti','Meklēt pēc nosaukuma, apraksta vai darbības…','Rādīt','Cena min. / vid. / maks.','jāaizpilda','no','kartītes','Nav rezultātu.','Visi','Zīmoli','ieteicamā','Skatīt vairāk']),
 'lt':('Lietuvių',['Pradžia','Paslaugos ir produktai','Apie mus','Paslaugos','Produktai','Ieškoti pagal pavadinimą, aprašymą ar operaciją…','Rodyti','Kaina min. / vid. / maks.','bus papildyta','iš','kortelių','Rezultatų nėra.','Visi','Prekės ženklai','rekomenduojama','Žiūrėti daugiau']),
 'ga':('Gaeilge',['Baile','Seirbhísí agus táirgí','Fúinn','Seirbhísí','Táirgí','Cuardaigh de réir ainm, tuairisc nó oibríocht…','Taispeáin','Praghas íos / meán / uas','le comhlánú','as','cártaí','Gan torthaí.','Gach rud','Brandaí','molta','Tuilleadh']),
 'mt':('Malti',['Paġna ewlenija','Servizzi u prodotti','Dwarna','Servizzi','Prodotti','Fittex skont isem, deskrizzjoni jew operazzjoni…','Uri','Prezz min / medju / mass','għad irid jimtela','minn','skedi','L-ebda riżultat.','Kollha','Marki','rakkomandat','Ara aktar']),
}
KEYS = ['home','catalog','about','services','products','search','show','price','tofill','of','sheets','noresults','all','brands','rec','more']

CSS = """:root{--bg:#071a1c;--surface:#0f2a2c;--surface2:#13363a;--text:#ffffff;--muted:#a9c4bd;--border:#1f4446;--accent:#91ddd0;--btn:#bdf2dc;--btntext:#08322f;--hero:linear-gradient(90deg,#0b2528 0%,#0b292aef 48%,#185255aa),radial-gradient(circle at 82% 35%,#5f9e8d 0,#194748 58%,#0b2528 95%)}
body.light-mode{--bg:#f6f7f4;--surface:#ffffff;--surface2:#e6efea;--text:#0a0a0a;--muted:#0a0a0a;--border:#cfddd5;--accent:#164e47;--hero:linear-gradient(135deg,#e5f3ea,#b7dacc)}
body.light-mode *{color:#0a0a0a !important}body.light-mode .btn,body.light-mode .tab.active{background:#bdf2dc;border-color:#164e47}body.light-mode #themeToggle,body.light-mode #themeToggle b{color:#ffffff !important}
*{box-sizing:border-box}html{font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}body{margin:0;background:var(--bg);color:var(--text)}a{color:inherit}button,input,select{font:inherit}
.container{max-width:1180px;margin:auto;padding:0 24px}
header{position:sticky;top:0;z-index:3;background:var(--surface);border-bottom:1px solid var(--border)}
header .bar{display:flex;justify-content:space-between;align-items:center;min-height:76px;gap:12px;flex-wrap:wrap;padding-left:46px}
.logo{font-size:20px;font-weight:850;letter-spacing:-.5px}.logo small{display:block;font-size:10px;letter-spacing:1.5px;font-weight:700;color:var(--muted)}
nav{display:flex;gap:16px;flex-wrap:wrap;align-items:center}nav a{text-decoration:none;font-size:13px;font-weight:700}
.tools{display:flex;gap:10px;align-items:center;font-size:12px;color:var(--muted);flex-wrap:wrap}
.tools select{background:var(--surface2);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:6px 8px}
#themeToggle{position:fixed;top:68px;left:10px;z-index:9;width:34px;height:34px;border-radius:9px;border:1px solid var(--border);background:#ffffff;color:#000000;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
body.light-mode #themeToggle{background:#000000}body.light-mode #themeToggle span{color:#0a0a0a !important}
#themeToggle span{position:absolute;top:37px;left:50%;transform:translateX(-50%);font-size:10px;font-weight:800;white-space:nowrap;color:var(--text)}
.hero{padding:80px 0;background:var(--hero);color:#ffffff}
.eyebrow{color:var(--accent);font-size:12px;letter-spacing:2px;font-weight:800;text-transform:uppercase}.hero .eyebrow{color:#91ddd0}
.hero h1{font-size:clamp(40px,7vw,86px);max-width:900px;line-height:1.05;letter-spacing:-3px;margin:16px 0}.hero p{font-size:clamp(17px,2.4vw,24px);line-height:1.5;max-width:660px;color:#d6e8e2}
.firm{font-size:clamp(20px,3vw,30px);font-weight:850;margin-top:6px}.firm small{display:inline-block;margin-left:8px;font-size:11px;letter-spacing:1px;font-weight:800;padding:3px 8px;border-radius:6px;background:#ffd36b;color:#3a2a00}
.btn{border:none;border-radius:12px;background:var(--btn);color:var(--btntext);padding:14px 22px;font-weight:800;cursor:pointer;text-decoration:none;display:inline-flex}
.meta{margin-top:22px;display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:#c4dfda}
.cui-box{margin:22px 0;padding:14px 16px;border:1px solid #ffffff33;border-radius:14px;background:#ffffff14;max-width:620px}.cui-box form{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.cui-box input{flex:1;min-width:150px;padding:10px 12px;border-radius:10px;border:1px solid #ffffff55;background:#0b2528;color:#fff}.cui-box button{padding:10px 16px;border:none;border-radius:10px;background:#bdf2dc;color:#08322f;font-weight:800;cursor:pointer}.cui-val{font-size:22px;font-weight:850;letter-spacing:.5px}.cui-ok{color:#91ddd0}.cui-bad{color:#ffb4a8}
body.light-mode .cui-box input{background:#ffffff}
.section{padding:60px 0}.section h2{font-size:clamp(28px,4vw,42px);letter-spacing:-1.2px;margin:8px 0}.muted{color:var(--muted)}
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:26px 0 16px}.tab{padding:12px 18px;border-radius:12px;border:1px solid var(--border);background:var(--surface);color:var(--text);font-weight:750;cursor:pointer}.tab.active{color:#08322f;background:var(--btn);border-color:var(--btn)}
.search{padding:15px;border:1px solid var(--border);border-radius:12px;width:100%;max-width:530px;background:var(--surface);color:var(--text);margin:0 0 22px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:17px}
.card{border:1px solid var(--border);background:var(--surface);border-radius:19px;overflow:hidden}
.visual{height:150px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#e5f3ea,#b7dacc);font-size:55px;color:#164e47}.visual img{max-height:130px;max-width:90%}
.content{padding:22px}.code{font-size:11px;letter-spacing:1px;color:var(--accent);font-weight:800}.card h3{font-size:20px;line-height:1.2;margin:10px 0}.card p{color:var(--muted);font-size:14px;line-height:1.55}
.price{font-size:13px;border:1px dashed var(--border);border-radius:10px;padding:8px 10px;margin-top:10px;line-height:1.5}.price b{font-size:16px;color:var(--accent)}.price small{display:block;opacity:.8}
.brands{font-size:12.5px;margin-top:8px}.grp{display:inline-block;font-size:11px;font-weight:800;padding:3px 8px;border-radius:6px;background:var(--surface2);margin-bottom:6px}.shared{background:#ffd36b;color:#3a2a00}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 18px}.chip{padding:8px 12px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--text);font-size:13px;font-weight:700;cursor:pointer}.chip.active{background:var(--btn);color:#08322f;border-color:var(--btn)}
.hero .subfam{font-size:clamp(16px,2.2vw,20px);font-weight:700;color:#bdf2dc;margin:4px 0 12px}.hero .chips .chip{background:#ffffff14;color:#fff;border-color:#ffffff33}
.card details{border-top:1px solid var(--border);padding-top:12px;margin-top:14px;font-size:13px}summary{cursor:pointer;font-weight:700}
.empty{padding:40px;background:var(--surface);border-radius:14px}
.notice{border:1px solid #e8dfbd;background:#fff9e7;color:#65552b;border-radius:14px;padding:17px;margin:30px 0;font-size:13px}
.about{background:var(--surface2)}
footer{background:#041214;color:#d1e9df;padding:38px 0;font-size:13px;line-height:1.7}
@media(max-width:700px){header .bar{align-items:start;flex-direction:column;padding:14px 0 14px 46px}.hero{padding:56px 0}.hero h1{letter-spacing:-2px}.section{padding:42px 0}}
"""

def esc(s):
    return html.escape(str(s), quote=True)

DIC_DIR = ROOT / 'etalons/C4322/dictionar'
ENT = json.loads((DIC_DIR / 'entitati.json').read_text(encoding='utf-8'))
REL = json.loads((DIC_DIR / 'relatii.json').read_text(encoding='utf-8'))
SLUGF = {'C43221': 'incalzire', 'C43222': 'climatizare', 'C43223': 'sanitare'}
CARD = {'1': (1, 1), '0..1': (0, 1), '0..*': (0, None), '1..*': (1, None)}

def check_dictionary():
    """Oprește construcția dacă dicționarul încalcă tipurile sau cardinalitățile."""
    E = {e['id']: e for e in ENT['entitati']}
    assert len(E) == len(ENT['entitati']), 'ID de entitate duplicat'
    codes = [e['code'] for e in ENT['entitati'] if e.get('code')]
    assert len(codes) == len(set(codes)), 'cod duplicat'
    T = {t['type']: t for t in REL['tipuri']}
    ids = [r['id'] for r in REL['relatii']]; assert len(ids) == len(set(ids)), 'ID de relație duplicat'
    seen = set()
    for r in REL['relatii']:
        t = T.get(r['type']); assert t, 'tip necunoscut ' + r['type']
        assert r['source'] in E and r['target'] in E, 'capăt inexistent ' + r['id']
        assert E[r['source']]['type'] in t['sourceType'].split('|'), 'tip sursă greșit ' + r['id']
        assert E[r['target']]['type'] in t['targetType'].split('|'), 'tip țintă greșit ' + r['id']
        k = (r['type'], r['source'], r['target']); assert k not in seen, 'relație dublă ' + r['id']; seen.add(k)
        assert r.get('session'), 'relație fără sesiune ' + r['id']
    for t in REL['tipuri']:
        rs = [r for r in REL['relatii'] if r['type'] == t['type']]
        for side, other, card in (('source', 'target', t['targetCard']), ('target', 'source', t['sourceCard'])):
            types = t[side + 'Type'].split('|'); lo, hi = CARD[card]
            for e in ENT['entitati']:
                if e['type'] not in types: continue
                n = sum(1 for r in rs if r[side] == e['id'])
                assert n >= lo and (hi is None or n <= hi), f"cardinalitate {t['type']} {card} încălcată pentru {e.get('code') or e['id']} ({n})"
    return len(ENT['entitati']), len(REL['relatii'])

def from_dictionary():
    E = {e['id']: e for e in ENT['entitati']}
    out = lambda typ: [r for r in REL['relatii'] if r['type'] == typ]
    fam = {e['code']: e for e in E.values() if e['type'] == 'Familie'}
    fam_of_group = {r['target']: E[r['source']]['code'] for r in out('FAMILIE_ARE_GRUPA')}
    group_of = {r['target']: E[r['source']] for r in out('GRUPA_CONTINE')}
    shown = {}
    for r in out('AFISAT_PE') + out('REFERIT_PE'): shown.setdefault(r['source'], []).append(E[r['target']]['code'])
    brands = {}
    for r in out('ARE_MARCA'): brands.setdefault(r['source'], []).append(E[r['target']]['name'])
    uses, used_in = {}, {}
    for r in out('FOLOSESTE_PRODUS'):
        uses.setdefault(r['source'], []).append(E[r['target']]['code']); used_in.setdefault(r['target'], []).append(E[r['source']]['code'])
    mods = {}
    for fid, f in sorted(fam.items()):
        groups = sorted([E[g] for g, fc in fam_of_group.items() if fc == fid], key=lambda g: g['properties'].get('ordine', 0))
        d = {'classId': fid, 'parentClassId': 'C4322', 'caen': '4322', 'family': SLUGF[fid], 'title': f['name'], 'version': '2.0.0-dictionar',
             'market': f['properties'].get('piata', 'București'), 'groups': [g['name'] for g in groups], 'services': [], 'products': [],
             'sharedRefs': {'services': [], 'products': []}, 'notes': f['properties'].get('note', ''), 'dictionarySession': ENT['sesiune']}
        mods[fid] = d
    for e in ENT['entitati']:
        if e['type'] not in ('Serviciu', 'Produs'): continue
        g = group_of[e['id']]; home = fam_of_group[g['id']]; kind = 'services' if e['type'] == 'Serviciu' else 'products'
        x = {'id': e['code'], 'group': g['name'], 'name': e['name'], **e['properties'], 'entityId': e['id']}
        if kind == 'products': x['brands'] = ', '.join(brands.get(e['id'], [])); x['usedIn'] = used_in.get(e['id'], [])
        else: x['uses'] = uses.get(e['id'], [])
        mods[home][kind].append(x)
        for fid in shown.get(e['id'], []):
            if fid != home: mods[fid]['sharedRefs'][kind].append(e['code'])
    gt = {E[g]['name']: E[g]['properties'] for g in fam_of_group}
    assert len(gt) == len(fam_of_group), 'nume de grupă repetat între familii'
    return mods, gt

MODS, GT = from_dictionary()
REL_OK = all(r.get('status') == 'validat' for r in REL['relatii'] if r['type'] == 'FOLOSESTE_PRODUS')
def load(fid):
    return MODS[fid]

ALL = {}
ABS = lambda base, u: u if u.startswith('http') else base + u
ITEM_URL = lambda kind, x: f'/{kind}/' + SLUG(x['id'] + ' ' + x['name']) + '/'
def find(kind, iid):
    for ofid in FAMILIES:
        for x in load(ofid)[kind]:
            if x['id'] == iid: return ofid, x
    raise KeyError(iid)

def items(fid, d, kind):
    out = [dict(x) for x in d[kind]]
    for iid in d.get('sharedRefs', {}).get(kind, []):
        ofid, x = find(kind, iid); x = dict(x)
        x['sharedFrom'] = load(ofid)['title']; x['homeFid'] = ofid; x['homeGroup'] = x['group']; x['group'] = SHARED_G; x['external'] = True
        out.append(x)
    return out

def not_found(fid, d):
    return f"""<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Pagină inexistentă | {FIRM} · {fid}</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><style>body{{margin:0;font-family:Inter,system-ui,sans-serif;background:#071a1c;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px}}a{{color:#08322f;background:#bdf2dc;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:800}}</style></head><body><div><p style="letter-spacing:2px;color:#91ddd0;font-weight:800">404 · {fid} · {esc(d['title'])}</p><h1>Pagina nu există.</h1><p>{FIRM} (firmă fictivă) — etalon intern SCARA.</p><p><a href="/">Înapoi la {esc(d['title'])}</a></p></div></body></html>
"""

def gen_svg(iid, name, fid):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 470"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5f3ea"/><stop offset="1" stop-color="#b7dacc"/></linearGradient></defs><rect width="560" height="470" fill="url(#g)"/><circle cx="470" cy="70" r="70" fill="#ffffff" opacity=".35"/><rect x="200" y="110" width="160" height="160" rx="24" fill="#f6f7f4" stroke="#7fb5a5" stroke-width="4"/><text x="280" y="215" font-family="Arial,sans-serif" font-size="64" font-weight="bold" fill="#3d8b78" text-anchor="middle">{FAMILIES[fid]["icon"]}</text><rect x="20" y="370" width="520" height="90" fill="#0b2528"/><rect x="20" y="370" width="8" height="90" fill="#d9822b"/><text x="40" y="401" fill="#a9d4c9" font-family="Arial,sans-serif" font-size="17" font-weight="bold">{iid} · {fid} · {FIRM} · FICTIV</text><text x="40" y="440" fill="#fff" font-family="Arial,sans-serif" font-size="22" font-weight="bold">{esc(name)[:40]}</text></svg>\n'

def favicon(fid):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0b2528"/><text x="32" y="30" font-family="Arial,sans-serif" font-size="15" font-weight="700" fill="#91ddd0" text-anchor="middle">TCE</text><text x="32" y="50" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">{fid[-1]}</text></svg>\n'

HEADERS = """/*
  X-Robots-Tag: noindex, nofollow
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'
"""
# Funcțiile Pages din /functions (admin al site-ului vechi) nu rulează pe site-urile de familie
ROUTES = json.dumps({'version': 1, 'include': ['/__functii-dezactivate__'], 'exclude': []}, indent=2) + '\n'

import re, unicodedata

SLUG = lambda t: re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFD', t).encode('ascii', 'ignore').decode().lower()).strip('-')
SHARED_G = 'Vezi și — alte familii'

def brand_list(s):
    out = []
    for b in (s or '').split(','):
        b = b.split(':')[-1].strip()
        if b and not b.lower().startswith('marca'):
            out.append(b)
    return out

def catalog(fid, d):
    """Catalogul site-ului: fișe proprii + partajate, cu mărci normalizate și imagini."""
    S, P = items(fid, d, 'services'), items(fid, d, 'products')
    for x in P:
        x['brandList'] = brand_list(x.get('brands'))
        x['img'] = '/img/' + x['id'] + '.svg'
    by_group = {}
    for x in P:
        by_group.setdefault(x.get('homeGroup', x['group']), set()).update(x['brandList'])
    pb = {}
    for ofid in FAMILIES:
        for y in load(ofid)['products']: pb[y['id']] = brand_list(y.get('brands'))
    for x in S:
        rel_b = sorted({b for pid in x.get('uses', []) for b in pb.get(pid, [])})
        x['brandList'] = rel_b or sorted(by_group.get(x.get('homeGroup', x['group']), set()))
    for kind, xs in (('servicii', S), ('produse', P)):
        for x in xs:
            x['url'] = ITEM_URL(kind, x)
            if x.get('external'): x['url'] = BASE.get(x['homeFid'], '') + x['url']
    for x in S + P:
        g = x.get('homeGroup', x['group'])
        x['gimg'] = '/img/grupe/' + SLUG(g) + '.' + ('jpg' if (ROOT / 'img/grupe' / (SLUG(g) + '.jpg')).exists() else 'svg')
        if 'img' not in x: x['img'] = x['gimg']
    return S, P

def group_svg(g, fid):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d5a55"/><stop offset="1" stop-color="#0b2528"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="320" cy="80" r="90" fill="#91ddd0" opacity=".12"/><circle cx="80" cy="330" r="120" fill="#bdf2dc" opacity=".08"/><text x="200" y="215" font-family="Arial,sans-serif" font-size="120" fill="#bdf2dc" text-anchor="middle">{FAMILIES[fid]["icon"]}</text><text x="200" y="330" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">{esc(g)[:30]}</text></svg>\n'

def shell(fid, d, page_id, title_txt, desc, body, depth, path='/', ld=None):
    ld_html = ('<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace('<', '\\u003c') + '</script>') if ld else ''
    """Pagină completă: antet standard, căutare comună, conținut, subsol, scripturi."""
    f = FAMILIES[fid]; title = d['title']; sub = CFG['SubtitluFamilie'][fid]
    i18n = {k: dict(zip(KEYS, v[1])) for k, v in LANGS.items()}
    opts = ''.join(f'<option value="{k}">{esc(v[0])}</option>' for k, v in LANGS.items())
    groups = d['groups'] + ([SHARED_G] if any(d.get('sharedRefs', {}).values()) else [])
    gopts = ''.join(f'<option value="{esc(g)}">{esc(g)}</option>' for g in groups)
    AC = ' aria-current="page"'
    nav = lambda href, key, label, pid: f'<a href="{href}" data-i18n="{key}"{AC if pid == page_id else ""}>{label}</a>'
    return f"""<!doctype html>
<html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="{ROBOTS}"><meta name="theme-color" content="#071a1c"><link rel="canonical" href="{BASE.get(fid, '')}{path}">
<meta property="og:type" content="website"><meta property="og:title" content="{esc(title_txt)} | {FIRM}"><meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{BASE.get(fid, '')}{path}"><meta property="og:locale" content="ro_RO">
<link rel="alternate" type="application/json" href="/api/catalog.json" title="Catalog {fid} (JSON)"><link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt">
<title>{esc(title_txt)} | {FIRM} · {esc(sub)} · SCARA {fid}</title>
<meta name="description" content="{esc(desc)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
{CSS}{CSS2}</style>{ld_html}</head>
<body data-page="{page_id}">
<button id="themeToggle" type="button" aria-label="Schimbă tema"><b id="themeIcon">☀</b><span id="themeLabel">Light</span></button>
<header><div class="container bar"><a class="logo" id="logoFirm" href="/" style="text-decoration:none">{FIRM}<small>{esc(sub).upper()} · FIRMĂ FICTIVĂ · CAEN 4322</small></a>
<nav>{nav('/', 'home', 'Acasă', 'home')}{nav('/servicii/', 'services', 'Servicii', 'servicii')}{nav('/produse/', 'products', 'Produse', 'produse')}{nav('/despre/', 'about', 'Despre', 'despre')}<a href="/dictionar/"{AC if page_id == 'dictionar' else ''}>Dicționar</a></nav>
<div class="tools"><select id="langSel" aria-label="Limba">{opts}</select><span id="clock"></span><span>{VERSION} · {DATE} · sesiune {SESSION}</span></div></div></header>
<main>{body}
<section class="section" id="cauta"><div class="container">
<div class="searchbar" role="search"><input id="q" type="search" placeholder="Caută: cuvinte-cheie, cod, grupă…" aria-label="Caută"><select id="fBrand" aria-label="Marcă"><option value="" data-i18n="brands">Mărci</option></select><select id="fGroup" aria-label="Grupă"><option value="" data-i18n="all">Toate</option>{gopts}</select></div>
<p id="count" class="muted" aria-live="polite"></p><div id="list" class="rows"></div>
<div class="notice"><strong>{FIRM} este o firmă fictivă.</strong> Etalon intern SCARA. Prețuri orientative în lei cu TVA (min / mediu recomandat / max), estimări nov. 2026 de validat; serviciile = manoperă fără materiale. Conținutul catalogului este în limba română; selectorul de limbă traduce interfața.</div>
</div></section></main>
<footer><div class="container"><strong>SCARA · AiVenture</strong><br>{fid} — {esc(title)} · {FIRM} (fictivă) · {esc(sub)} · CAEN 4322 · {VERSION} · {DATE} · sesiune {SESSION}<br>{'Site demonstrativ public, realizat de AiVenture S.R.L.' if PUBLIC else 'Etalon intern, neindexat'}; firma afișată este fictivă și nu reprezintă ofertă comercială.</div></footer>
<script>const I18N={json.dumps(i18n, ensure_ascii=False).replace('<', '\\u003c')};const CUI_DEF={json.dumps(CFG['CUI'])},CUI_EX={'true' if CFG.get('CUIExemplu') else 'false'},ICON="{f['icon']}";</script>
<script src="/catalog.js"></script><script src="/app.js"></script></body></html>
"""

PL = lambda n, one, many: f'{n} {one if n == 1 else many}'

def home(fid, d, S, P):
    f = FAMILIES[fid]; title = d['title']; sub = CFG['SubtitluFamilie'][fid]
    rows = []
    for g in d['groups'] + [SHARED_G]:
        gs = [x for x in S if x['group'] == g]; gp = [x for x in P if x['group'] == g]
        if not gs and not gp: continue
        mix = [x for pair in zip(gs, gp) for x in pair] + gs[len(gp):] + gp[len(gs):]
        ex = [x['name'] for x in mix][:3]
        img = (gs + gp)[0]['gimg'] if g != SHARED_G else '/img/grupe/' + SLUG(g) + '.svg'
        links = (f'<a href="/servicii/?grupa={esc(g)}"><span data-i18n="more">Vezi mai multe</span> · {PL(len(gs), 'serviciu', 'servicii')} →</a>' if gs else '') + \
                (f'<a href="/produse/?grupa={esc(g)}"><span data-i18n="more">Vezi mai multe</span> · {PL(len(gp), 'produs', 'produse')} →</a>' if gp else '')
        rows.append(f'<article class="row grow"><img class="rimg" src="{img}" alt="" loading="lazy"><div class="rbody"><h3>{esc(g)} — {PL(len(gs), 'serviciu', 'servicii')} · {PL(len(gp), 'produs', 'produse')}</h3><p>{esc(", ".join(ex))}.</p><div class="more">{links}</div></div></article>')
    return f"""<section class="hero" id="acasa"><div class="container"><div class="eyebrow">{fid} · {esc(title)} · București</div>
<div class="firm"><span id="firmName">{FIRM}</span><small>FICTIV</small></div><div class="subfam">{esc(sub)}</div>
<h1>{esc(title)}</h1><p>{esc(f['subtitle'])}</p>
<div class="cui-box" id="cuiBox" aria-live="polite"><div class="eyebrow">CUI firmă</div><div id="cuiView" class="cui-val">Fără CUI</div><div id="cuiMsg" style="font-size:13px;opacity:.85"></div><form id="cuiForm"><input id="cuiInput" inputmode="numeric" autocomplete="off" placeholder="CUI, ex. RO51415878" aria-label="CUI firmă"><button type="submit" data-i18n="show">Afișează</button></form></div>
<div class="meta"><span>{f['icon']} {len(S)} servicii</span><span>{len(P)} produse</span><span>{len(d['groups'])} grupe</span></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">GRUPE · {esc(title).upper()}</div><h2>{esc(sub)}</h2><div class="rows">{''.join(rows)}</div></div></section>"""

def fmt_ro(v):
    return f'{v:,}'.replace(',', '.')

def steps(text):
    parts = [t.strip().rstrip('.') for t in re.split(r',| și ', text or '') if t.strip()]
    return ''.join(f'<li>{esc(t[0].upper() + t[1:])}</li>' for t in parts)

def detail(fid, d, x, kind, S, P):
    sub = CFG['SubtitluFamilie'][fid]; g = x.get('homeGroup', x['group']); gt = GT.get(g, {})
    is_s = kind == 'servicii'; label = 'Serviciu' if is_s else 'Produs'
    mn, av, mx, u = fmt_ro(x['priceMinRON']), fmt_ro(x['priceAvgRON']), fmt_ro(x['priceMaxRON']), x['priceUnit']
    basis = ('Prețul este pentru manoperă: materialele, piesele și echipamentul se plătesc separat.' if is_s
             else 'Prețul este pentru echipament sau material, fără montaj; montajul îl găsiți mai jos, la serviciile legate.')
    other = P if is_s else S
    codes = x.get('uses', []) if is_s else x.get('usedIn', [])
    byc = {}
    for ofid in FAMILIES:
        for y in load(ofid)['products' if is_s else 'services']: byc[y['id']] = y
    known = {y['id']: y for y in other}
    rel = []
    for c in codes:
        y = known.get(c)
        if y is None and c in byc:
            ofid = next(f for f in FAMILIES if any(z['id'] == c for z in load(f)['products' if is_s else 'services']))
            y = dict(byc[c]); y['url'] = BASE.get(ofid, '') + ITEM_URL('produse' if is_s else 'servicii', y); y['otherFid'] = ofid
        if y: rel.append(y)
    same = [y for y in (S if is_s else P) if y.get('homeGroup', y['group']) == g and y['id'] != x['id']][:6]
    other_site = lambda y: y.get('otherFid') or y.get('homeFid')
    li = lambda ys: ''.join((f'<li><a href="{y["url"]}">{esc(y["name"])}</a>' + (f' <span class="grp shared">vezi pe site-ul {esc(load(other_site(y))["title"])}</span>' if other_site(y) else '')) + f' <span class="muted">· {esc(y["id"])} · {fmt_ro(y["priceAvgRON"])} lei / {esc(y["priceUnit"])}</span></li>' for y in ys)
    brands = ''.join(f'<a class="chip" href="/produse/?marca={esc(b)}">{esc(b)}</a>' for b in x.get('brandList', []))
    shared = f'<span class="grp shared">Comun cu {esc(x["sharedFrom"])}</span> ' if x.get('sharedFrom') else ''
    blocks = [f'<div class="dblock"><h2>Pe scurt</h2><p class="lead">{esc(x["descriptionShort"])}</p>{"<p><strong>Despre " + esc(g.lower()) + ":</strong> " + esc(gt["intro"]) + "</p>" if gt.get("intro") else ""}</div>']
    if is_s:
        blocks.append(f'<div class="dblock"><h2>Când aveți nevoie</h2><p>{esc(x.get("recommendedWhen", ""))}</p></div>')
        blocks.append(f'<div class="dblock"><h2>Ce presupune lucrarea</h2><ol class="steps">{steps(x.get("operations"))}</ol></div>')
    else:
        blocks.append(f'<div class="dblock"><h2>Cum alegeți</h2><p>Criteriile care contează: {esc(x.get("selectionCriteria", ""))}</p></div>')
        if brands: blocks.append(f'<div class="dblock"><h2>Mărci</h2><div class="chips">{brands}</div><p class="muted">Mărci uzuale în București; disponibilitatea și modelele se confirmă la ofertare.</p></div>')
    blocks.append(f'<div class="dblock"><h2>Cât costă</h2><div class="pricebig"><span>min<b>{mn}</b></span><span class="rec">recomandat<b>{av}</b></span><span>max<b>{mx}</b></span></div><p class="muted">lei / {esc(u)}, cu TVA</p><p>{basis} Prețul recomandat este media orientativă din București; intervalul min–max arată diferența dintre o lucrare simplă și una complexă. Prețul final se stabilește după evaluare.</p>{"<p><strong>Ce influențează prețul:</strong> " + esc(gt["pret"]) + "</p>" if gt.get("pret") else ""}<p class="muted">{esc(x.get("priceSource", ""))}</p></div>')
    if gt.get('reguli'): blocks.append(f'<div class="dblock"><h2>Reguli și siguranță</h2><p>{esc(gt["reguli"])}</p></div>')
    if gt.get('sfat'): blocks.append(f'<div class="dblock tip"><h2>Sfatul instalatorului</h2><p>{esc(gt["sfat"])}</p></div>')
    if rel: blocks.append(f'<div class="dblock"><h2>{"Produse folosite" if is_s else "Servicii pentru acest produs"}</h2><ul class="rel">{li(rel)}</ul><p class="muted">Relație din dicționarul de date ({"FOLOSESTE_PRODUS" if is_s else "FOLOSIT_IN"}, 0..* : 0..*){", validată de inginerul instalator" if REL_OK else ", propusă — de validat"}.</p></div>')
    if same: blocks.append(f'<div class="dblock"><h2>Alte {"servicii" if is_s else "produse"} din grupa {esc(g)}</h2><ul class="rel">{li(same)}</ul></div>')
    crumbs = f'<nav class="crumbs" aria-label="Navigare"><a href="/" data-i18n="home">Acasă</a> › <a href="/{kind}/">{label if False else ("Servicii" if is_s else "Produse")}</a> › <a href="/{kind}/?grupa={esc(x["group"])}">{esc(x["group"])}</a> › <span>{esc(x["name"])}</span></nav>'
    return f"""<section class="hero small"><div class="container">{crumbs}
<div class="eyebrow">{label} · {esc(x["id"])} · {fid}</div><div class="dhead"><img class="dimg" src="{x["img"]}" alt=""><div>{shared}<span class="grp">{esc(g)}</span>
<h1>{esc(x["name"])}</h1><p>{esc(x["descriptionShort"])}</p><p class="dprice">{mn} – <b>{av}</b> – {mx} lei / {esc(u)}</p></div></div></div></section>
<section class="section"><div class="container detail">{''.join(blocks)}
<p><a class="btn" href="/{kind}/">← Toate {"serviciile" if is_s else "produsele"}</a></p></div></section>"""

def dict_page(fid, d, S, P):
    E = {e['id']: e for e in ENT['entitati']}
    mine = {x['entityId'] for x in S + P}
    fam_e = next(e for e in ENT['entitati'] if e['type'] == 'Familie' and e['code'] == fid)
    grp_e = {r['target'] for r in REL['relatii'] if r['type'] == 'FAMILIE_ARE_GRUPA' and r['source'] == fam_e['id']}
    rels = [r for r in REL['relatii'] if r['source'] in mine | grp_e | {fam_e['id']} or r['target'] in mine]
    brands = {r['target'] for r in rels if r['type'] == 'ARE_MARCA'}
    lab = lambda e: (esc(e.get('code')) + ' · ' if e.get('code') else '') + esc(e['name'])
    types = ''.join(f'<tr><td><b>{t["type"]}</b><br><span class="muted">invers: {t["inverse"]}</span></td><td>{t["sourceType"]} → {t["targetType"]}</td><td><b>{t["sourceCard"]} : {t["targetCard"]}</b></td><td>{esc(t["descriere"])}</td><td>{sum(1 for r in rels if r["type"] == t["type"])}</td></tr>' for t in REL['tipuri'])
    def ent_rows(ids):
        out = []
        for i in ids:
            e = E[i]
            o = [f'{r["type"]} → {lab(E[r["target"]])}' + (' <i>(propus)</i>' if r.get('status') == 'propus' else '') for r in rels if r['source'] == i]
            inv = {t['type']: t['inverse'] for t in REL['tipuri']}
            n = [f'{inv[r["type"]]} → {lab(E[r["source"]])}' for r in rels if r['target'] == i]
            out.append(f'<tr id="{e["id"]}"><td><code>{e["id"]}</code></td><td>{lab(e)}</td><td>{"<br>".join(o + n)}</td></tr>')
        return ''.join(out)
    sec = lambda title, ids: f'<details class="dblock"><summary><b>{title}</b> — {len(ids)}</summary><div class="tw"><table class="dt"><tr><th>ID entitate</th><th>Cod · nume</th><th>Relații (directe și inverse)</th></tr>{ent_rows(ids)}</table></div></details>'
    svc = [x['entityId'] for x in S]; prd = [x['entityId'] for x in P]
    return f"""<section class="hero small"><div class="container"><div class="eyebrow">DICȚIONAR DE DATE · {fid} · SESIUNE {ENT['sesiune']}</div>
<h1>Dicționar entitate–relație</h1><p>Sursa unică a site-ului: {len(mine) + len(grp_e) + len(brands) + 1} entități și {len(rels)} relații pentru {esc(d['title'])}. Fiecare relație are inversă, cardinalitate și sesiune; paginile site-ului sunt generate din el.</p></div></section>
<section class="section"><div class="container">
<div class="dblock"><h2>Tipuri de relații și cardinalități</h2><div class="tw"><table class="dt"><tr><th>Relație</th><th>De la → la</th><th>Cardinalitate</th><th>Sens</th><th>Pe acest site</th></tr>{types}</table></div>
<p class="muted">Cardinalitatea „sursă : țintă” — ex. GRUPA_CONTINE 1 : 0..* = o fișă are exact o grupă, o grupă are zero sau mai multe fișe. {'Relațiile FOLOSESTE_PRODUS au fost validate de inginerul instalator.' if REL_OK else 'Relațiile FOLOSESTE_PRODUS sunt propuse și așteaptă validarea inginerului instalator.'}</p></div>
{sec('Familie și grupe', [fam_e['id']] + sorted(grp_e))}{sec('Servicii', svc)}{sec('Produse', prd)}{sec('Mărci', sorted(brands, key=lambda i: E[i]['name'].lower()))}
<p class="muted">Fișiere sursă în GitHub: <code>etalons/C4322/dictionar/entitati.json</code> și <code>relatii.json</code> — metamodel AiVenture Semantic Data Dictionary (ENTITY / PROPERTY / RELATIONSHIP / VALUE / SESSION).</p>
</div></section>"""

AIVENTURE = {'@type': 'Organization', 'name': 'AiVenture S.R.L.', 'url': 'https://5thelement.ai', 'identifier': 'RO51415878'}

def py_row(x, kind):
    is_s = kind == 'servicii'
    grp = (f'<span class="grp shared">Vezi pe site-ul {esc(x["sharedFrom"])} · {esc(x["homeGroup"])}</span>' if x.get('sharedFrom') else f'<span class="grp">{esc(x["group"])}</span>')
    more = f'Vezi pe site-ul {esc(x["sharedFrom"])} →' if x.get('external') else 'Detalii →'
    br = '' if is_s or not x.get('brands') else f'<div class="brands"><strong>Mărci:</strong> {esc(x["brands"])}</div>'
    av = fmt_ro(x['priceAvgRON'])
    price = f'<div class="price"><strong>Preț min / recomandat / max:</strong> {fmt_ro(x["priceMinRON"])} – <b>{av}</b> – {fmt_ro(x["priceMaxRON"])} lei / {esc(x["priceUnit"])}<small>recomandat: {av} lei · {esc(x.get("priceBasis", ""))}</small></div>'
    det = f'<details><summary>{"Operațiuni și recomandări" if is_s else "Criterii de selecție"}</summary><p>{esc(x.get("operations") if is_s else x.get("selectionCriteria"))}</p>' + (f'<p><strong>Când:</strong> {esc(x["recommendedWhen"])}</p>' if x.get('recommendedWhen') else '') + '</details>'
    return f'<article class="row" id="{esc(x["id"])}"><img class="rimg" src="{x["img"]}" alt="" loading="lazy"><div class="rbody">{grp}<h3><a href="{x["url"]}">{esc(x["name"])}</a></h3><div class="code">{esc(x["id"])} · {"serviciu" if is_s else "produs"}</div>{br}{price}<p>{esc(x["descriptionShort"])} <a class="dlink" href="{x["url"]}">{more}</a></p>{det}</div></article>'

def crumbs_ld(base, items):
    return {'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': base + u} for i, (n, u) in enumerate(items)]}

def ld_home(fid, d, base):
    sub = CFG['SubtitluFamilie'][fid]
    return {'@context': 'https://schema.org', '@graph': [
        {'@type': 'WebSite', 'name': f'{FIRM} — {sub} (site demonstrativ SCARA {fid})', 'url': base + '/', 'inLanguage': 'ro', 'publisher': AIVENTURE,
         'description': f'Site demonstrativ: catalog de referință {sub.lower()} în București, cu prețuri orientative min / mediu / max. Firma afișată este fictivă.'},
        {'@type': 'ItemList', 'name': 'Grupe ' + d['title'], 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': g, 'url': base + '/servicii/?grupa=' + g} for i, g in enumerate(d['groups'])]}]}

def ld_list(fid, kind, xs, base):
    return {'@context': 'https://schema.org', '@graph': [
        {'@type': 'CollectionPage', 'name': kind.capitalize() + ' — ' + CFG['SubtitluFamilie'][fid], 'url': base + f'/{kind}/', 'inLanguage': 'ro', 'publisher': AIVENTURE},
        {'@type': 'ItemList', 'numberOfItems': len(xs), 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': x['name'], 'url': ABS(base, x['url'])} for i, x in enumerate(xs)]},
        crumbs_ld(base, [('Acasă', '/'), (kind.capitalize(), f'/{kind}/')])]}

def ld_item(fid, x, kind, base):
    g = x.get('homeGroup', x['group'])
    if kind == 'servicii':
        main = {'@type': 'Service', 'name': x['name'], 'serviceType': x['name'], 'category': g, 'description': x['descriptionShort'], 'identifier': x['id'],
                'areaServed': {'@type': 'City', 'name': 'București'}, 'url': base + x['url'], 'isRelatedTo': [{'@type': 'Product', 'name': c} for c in x.get('uses', [])]}
    else:
        main = {'@type': 'Product', 'name': x['name'], 'sku': x['id'], 'category': g, 'description': x['descriptionShort'], 'url': base + x['url'],
                'brand': [{'@type': 'Brand', 'name': b} for b in x.get('brandList', [])]}
    main['additionalProperty'] = [{'@type': 'PropertyValue', 'name': n, 'value': v, 'unitText': 'RON / ' + x['priceUnit']} for n, v in
                                  (('preț minim orientativ', x['priceMinRON']), ('preț recomandat (medie)', x['priceAvgRON']), ('preț maxim orientativ', x['priceMaxRON']))]
    return {'@context': 'https://schema.org', '@graph': [main, crumbs_ld(base, [('Acasă', '/'), (kind.capitalize(), f'/{kind}/'), (x['name'], x['url'])])]}

def despre(fid, d, S, P):
    """Pagina Despre: blocul de încredere (model fli.ro) din firma.json → Incredere. Fără schema Review: recenziile sunt exemple."""
    T = CFG.get('Incredere', {}); title = d['title']; sub = CFG['SubtitluFamilie'][fid]
    demo = '<span class="tip">DEMONSTRATIV</span>' if T.get('Demonstrativ', True) else ''
    val = lambda v: esc(v) if v else '<em class="muted">de completat</em>'
    li = lambda xs: '<ul>' + ''.join(f'<li>{esc(x)}</li>' for x in xs) + '</ul>'
    cifre = ''.join(f'<span><strong>{esc(n)}</strong> {esc(t)}</span>' for n, t in T.get('Cifre', []))
    tel = T.get('Telefon', ''); tel_href = re.sub(r'[^0-9+]', '', tel)
    contract = next((x for x in S if not x.get('external') and re.search(r'revizi|întreținere|mentenan', x['name'], re.I)), None)
    contract_html = (f'<p>Revizia anuală intră în contractul de mentenanță: <a href="{contract["url"]}">{esc(contract["name"])}</a> — '
                     f'{contract["priceMinRON"]}–{contract["priceMaxRON"]} lei / {esc(contract["priceUnit"])}, recomandat <strong>{contract["priceAvgRON"]} lei</strong>.</p>') if contract else ''
    autz = ''.join(f'<li><strong>{esc(a)}</strong> — {esc(b)}. Nr. autorizație: <em class="muted">de completat</em></li>' for a, b in T.get('Autorizatii', {}).get(fid, []))
    iso = ''.join(f'<li>{esc(x)} — nr. certificat: <em class="muted">de completat</em></li>' for x in T.get('ISO', []))
    prog = ''.join(f'<li><strong>{esc(a)}</strong>: {esc(b)}</li>' for a, b in T.get('Program', []))
    zona = ''.join(f'<li><strong>{esc(a)}</strong>: {esc(b)}</li>' for a, b in T.get('Zona', []))
    rec = ''.join(f'<div class="dblock"><p>„{esc(t)}”</p><p class="muted">— {esc(n)}, {esc(dt)} · exemplu fictiv</p></div>' for n, dt, t in T.get('Recenzii', []))
    mail = T.get('Email', '')
    subj = f'Vreau contract de mentenanță — {sub}'
    return f"""<section class="hero" id="despre"><div class="container"><div class="eyebrow">{fid} · {esc(title)} · Despre firmă {demo}</div>
<div class="firm"><span>{FIRM}</span><small>FICTIV</small></div><div class="subfam">{esc(sub)}</div>
<h1>{esc(T.get('Hook', 'Despre noi'))}</h1>
<div class="meta">{cifre}</div>
<p><a class="btn" href="tel:{tel_href}">Dispecerat {esc(tel)}</a> <a class="btn" href="mailto:{esc(mail)}?subject={esc(subj)}">Vreau contract</a></p></div></section>
<section class="section"><div class="container">
<div class="dblock"><h2>Misiunea noastră</h2><p class="lead">{esc(T.get('Misiune', ''))}</p></div>
<div class="dblock"><h2>Cum lucrăm</h2><ol>{''.join(f'<li>{esc(x)}</li>' for x in T.get('CumLucram', []))}</ol></div>
<div class="dblock"><h2>De ce să ne alegeți</h2>{li(T.get('Avantaje', []))}</div>
<div class="dblock"><h2>Program și urgențe</h2><ul>{prog}</ul><p>{esc(T.get('Urgente', ''))}</p></div>
<div class="dblock"><h2>Contract de mentenanță</h2>{contract_html}<p><a class="btn" href="mailto:{esc(mail)}?subject={esc(subj)}">Vreau contract</a></p></div>
<div class="dblock"><h2>Autorizații</h2><ul>{autz}</ul></div>
<div class="dblock"><h2>Certificări ISO</h2><ul>{iso}</ul></div>
<div class="dblock"><h2>Zona de acoperire</h2><ul>{zona}</ul></div>
<div class="dblock"><h2>Mărci</h2><p>Lucrăm cu mărcile din catalog; lista completă pe fiecare fișă de <a href="/produse/">produs</a>.</p></div>
<h2>Ce spun clienții</h2><p class="muted">Model de afișare cu exemple fictive; la o firmă reală se preiau recenziile verificabile (ex. Google), cu dată.</p>{rec}
<div class="dblock"><h2>Date de contact și juridice</h2><ul>
<li><strong>Firmă:</strong> {FIRM} (fictivă)</li><li><strong>CUI:</strong> {esc(CFG.get('CUI'))}{' (exemplu)' if CFG.get('CUIExemplu') else ''}</li>
<li><strong>Nr. Reg. Com.:</strong> {val(T.get('NrRegCom'))}</li><li><strong>Adresă:</strong> {esc(T.get('Adresa', ''))}</li>
<li><strong>Telefon dispecerat:</strong> <a href="tel:{tel_href}">{esc(tel)}</a></li><li><strong>Email:</strong> <a href="mailto:{esc(mail)}">{esc(mail)}</a></li></ul></div>
</div></section>"""

def ld_despre(fid, base):
    return {'@context': 'https://schema.org', '@type': 'AboutPage', 'name': f'Despre {FIRM} (firmă fictivă, site demonstrativ SCARA {fid})', 'url': base + '/despre/', 'inLanguage': 'ro', 'publisher': AIVENTURE}

def ld_dict(fid, base):
    return {'@context': 'https://schema.org', '@type': 'Dataset', 'name': f'Dicționar entitate–relație C4322 ({fid})', 'url': base + '/dictionar/', 'inLanguage': 'ro',
            'description': 'Entități (familii, grupe, servicii, produse, mărci) și relații cu cardinalități pentru instalații CAEN 4322, sesiune ' + ENT['sesiune'] + '.',
            'creator': AIVENTURE, 'distribution': [{'@type': 'DataDownload', 'encodingFormat': 'application/json', 'contentUrl': base + '/dictionar/' + n} for n in ('entitati.json', 'relatii.json')]}

def robots_txt(base):
    if not PUBLIC: return 'User-agent: *\nDisallow: /\n'
    bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot']
    return 'User-agent: *\nAllow: /\n\n' + ''.join(f'User-agent: {b}\nAllow: /\n\n' for b in bots) + f'Sitemap: {base}/sitemap.xml\n'

def sitemap(base, paths):
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'<url><loc>{base}{p}</loc><lastmod>{DATE}</lastmod></url>\n' for p in paths) + '</urlset>\n'

def llms(fid, d, S, P, base):
    sub = CFG['SubtitluFamilie'][fid]
    lines = [f'# {FIRM} — {sub} (site demonstrativ SCARA {fid})', '',
             f'> Catalog de referință pentru {sub.lower()} în București: {len(S)} servicii și {len(P)} produse, fiecare cu cod, grupă, mărci și preț orientativ min / mediu (recomandat) / max în lei cu TVA (estimări nov. 2026). Firma afișată este fictivă; site realizat de AiVenture S.R.L. (CUI RO51415878). Clasa CAEN 4322 (Rev.3); C43221–C43223 sunt coduri interne SCARA.', '',
             '## Pagini principale', f'- [Acasă]({base}/): grupele familiei', f'- [Servicii]({base}/servicii/): toate serviciile cu prețuri', f'- [Produse]({base}/produse/): toate produsele cu mărci și prețuri', f'- [Despre]({base}/despre/): cum lucrăm, program, autorizații, zonă, contract de mentenanță, contact', f'- [Dicționar de date]({base}/dictionar/): entități, relații, cardinalități', '',
             '## Date pentru mașini', f'- [Catalog JSON]({base}/api/catalog.json)', f'- [Entități]({base}/dictionar/entitati.json)', f'- [Relații]({base}/dictionar/relatii.json)', f'- [Agent card A2A]({base}/.well-known/agent.json)', '',
             '## Servicii'] + [f'- [{x["name"]}]({ABS(base, x["url"])}): {x["priceMinRON"]}–{x["priceMaxRON"]} lei / {x["priceUnit"]}, recomandat {x["priceAvgRON"]} lei' for x in S] + \
            ['', '## Produse'] + [f'- [{x["name"]}]({ABS(base, x["url"])}): {x["priceMinRON"]}–{x["priceMaxRON"]} lei / {x["priceUnit"]}, recomandat {x["priceAvgRON"]} lei; mărci: {x.get("brands", "")}' for x in P]
    return '\n'.join(lines) + '\n'

def agent_card(fid, d, base):
    sub = CFG['SubtitluFamilie'][fid]
    return {'protocolVersion': '0.3.0', 'name': f'SCARA {fid} — {sub} (demonstrativ)', 'description': f'Catalog de referință {sub.lower()} în București: servicii, produse, mărci și prețuri orientative min / mediu / max. Firma afișată ({FIRM}) este fictivă. Acces numai citire, prin resurse JSON statice.',
            'url': base + '/', 'version': VERSION, 'provider': {'organization': 'AiVenture S.R.L.', 'url': 'https://5thelement.ai'},
            'capabilities': {'streaming': False, 'pushNotifications': False}, 'defaultInputModes': ['text/plain'], 'defaultOutputModes': ['application/json', 'text/html'],
            'skills': [{'id': 'catalog', 'name': 'Catalog servicii și produse', 'description': 'Lista completă a serviciilor și produselor, cu cod, grupă, mărci, relații serviciu–produs și preț min / mediu / max: ' + base + '/api/catalog.json',
                        'tags': ['CAEN 4322', 'instalații', sub, 'București', 'prețuri'], 'examples': ['Cât costă montajul unei centrale termice în București?', 'Ce mărci de centrale în condensare există?']},
                       {'id': 'dictionar', 'name': 'Dicționar entitate–relație', 'description': 'Entități și relații cu cardinalități (sesiune ' + ENT['sesiune'] + '): ' + base + '/dictionar/entitati.json, ' + base + '/dictionar/relatii.json', 'tags': ['dicționar de date', 'knowledge graph']}],
            'documentationUrl': base + '/llms.txt'}

def listing(fid, d, kind, S, P):
    sub = CFG['SubtitluFamilie'][fid]; n = len(S) if kind == 'servicii' else len(P)
    return f"""<section class="hero small"><div class="container"><div class="eyebrow">{fid} · {esc(d['title'])}</div>
<div class="firm"><span id="firmName">{FIRM}</span><small>FICTIV</small></div><div class="subfam">{esc(sub)}</div>
<h1>{'Servicii' if kind == 'servicii' else 'Produse'} — {n}</h1><p>Cod, {'grupă' if kind == 'servicii' else 'mărci'}, preț min / mediu / max pentru fiecare {'serviciu' if kind == 'servicii' else 'produs'}.</p></div></section>"""

APP_JS = r"""(function(){
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
"""

CSS2 = """.rows{display:flex;flex-direction:column;border:1px solid var(--border);border-radius:22px;background:#000000;overflow:hidden;margin-top:18px}
body.light-mode .rows{background:#ffffff}
.row{display:flex;gap:22px;align-items:flex-start;padding:22px;border-bottom:1px solid var(--border)}.row:last-child{border-bottom:none}
.row.hit{outline:2px solid var(--accent);outline-offset:-2px}
.rimg{width:150px;height:150px;flex:0 0 150px;object-fit:cover;border-radius:20px;background:#e5f3ea}
.rbody{flex:1;min-width:0}.rbody h3{font-size:clamp(19px,2.6vw,26px);font-weight:850;line-height:1.2;margin:4px 0 6px}.rbody h3 a{text-decoration:none}
.rbody p{color:var(--muted);font-size:15px;line-height:1.55;margin:8px 0}
.grow .rbody h3{font-size:clamp(20px,3vw,30px)}.grow .rbody p{font-size:clamp(15px,2vw,19px)}
.more{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}.more a{font-size:13px;font-weight:800;text-decoration:none;padding:8px 12px;border-radius:999px;background:var(--btn);color:#08322f}
.searchbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.searchbar input{flex:2;min-width:200px;padding:14px;border:1px solid var(--border);border-radius:12px;background:var(--surface);color:var(--text)}
.searchbar select{flex:1;min-width:140px;padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--surface);color:var(--text)}
.hero.small{padding:46px 0}.hero.small h1{font-size:clamp(34px,6vw,64px)}
.crumbs{font-size:13px;margin-bottom:14px;color:#c4dfda}.crumbs a{color:#bdf2dc}
.dhead{display:flex;gap:22px;align-items:flex-start;margin-top:10px}.dimg{width:180px;height:180px;border-radius:22px;object-fit:cover;flex:0 0 180px;background:#e5f3ea}.dprice{font-size:20px}.dprice b{color:#bdf2dc}
.detail{max-width:860px}.dblock{border:1px solid var(--border);background:var(--surface);border-radius:18px;padding:20px 22px;margin:0 0 16px}.dblock h2{font-size:22px;margin:0 0 10px;letter-spacing:-.4px}.dblock p{line-height:1.65}.lead{font-size:18px;font-weight:600}
.steps{line-height:1.8;padding-left:22px}.rel{line-height:1.9;padding-left:20px}.tip{border-color:var(--accent)}
.pricebig{display:flex;gap:10px;flex-wrap:wrap}.pricebig span{flex:1;min-width:0;border:1px solid var(--border);border-radius:14px;padding:12px 6px;text-align:center;font-size:10.5px;text-transform:uppercase;letter-spacing:.3px;overflow-wrap:anywhere}.pricebig b{display:block;font-size:26px;letter-spacing:0;text-transform:none;margin-top:4px}.pricebig .rec{border-color:var(--accent);background:var(--surface2)}.pricebig .rec b{color:var(--accent)}
@media(max-width:700px){.dhead{flex-direction:column}.dimg{width:120px;height:120px;flex-basis:120px}}
.tw{overflow-x:auto}.dt{border-collapse:collapse;width:100%;font-size:13px}.dt th,.dt td{border-bottom:1px solid var(--border);padding:8px;text-align:left;vertical-align:top}.dt code{font-size:11px}details.dblock summary{cursor:pointer;font-size:18px}
@media(max-width:700px){.dt tr{display:block;border-bottom:1px solid var(--border);padding:8px 0}.dt tr:first-child{display:none}.dt td{display:block;border:none;padding:3px 4px}}
nav a[aria-current=page]{text-decoration:underline;text-underline-offset:5px}
@media(max-width:700px){.row{gap:14px;padding:16px}.rimg{width:92px;height:92px;flex-basis:92px;border-radius:16px}}
"""

def main():
    ne, nr = check_dictionary(); print('dicționar valid:', ne, 'entități,', nr, 'relații, sesiune', ENT['sesiune'])
    for fid, d in MODS.items():
        (ROOT / 'etalons/C4322' / (fid + '.mjs')).write_text(f'// GENERAT din etalons/C4322/dictionar (sesiune {ENT["sesiune"]}) de tools/build_c4322.py — nu editați manual; modificați dicționarul.\n// Catalog {fid} — {d["title"]}. Identificatorii C43221-3 sunt interni SCARA, nu subcoduri CAEN oficiale.\nexport const etalon = ' + json.dumps(d, ensure_ascii=False, indent=2) + ';\nexport default etalon;\n', encoding='utf-8')
    for fid in FAMILIES:
        d = load(fid); out = ROOT / 'cloudflare-pages' / fid
        for k_ in ('servicii', 'produse'):
            if (out / k_).exists(): shutil.rmtree(out / k_)  # fără pagini vechi rămase
        (out / 'img' / 'grupe').mkdir(parents=True, exist_ok=True)
        S, P = catalog(fid, d)
        for g in dict.fromkeys(d['groups'] + [SHARED_G] + [x.get('homeGroup', x['group']) for x in S + P]):
            src = ROOT / 'img/grupe' / (SLUG(g) + '.jpg')
            if src.exists(): (out / 'img/grupe' / src.name).write_bytes(src.read_bytes())
            (out / 'img/grupe' / (SLUG(g) + '.svg')).write_text(group_svg(g, fid), encoding='utf-8')
        for p in P:
            src = ROOT / 'img/products' / (p['id'] + '.svg')
            if not src.exists():
                (out / 'img' / (p['id'] + '.svg')).write_text(gen_svg(p['id'], p['name'], fid), encoding='utf-8'); continue
            svg = src.read_text(encoding='utf-8').replace('C4322B · EXEMPLU', fid + ' · ' + FIRM + ' · FICTIV')
            (out / 'img' / (p['id'] + '.svg')).write_text(svg, encoding='utf-8')
        cat = {'family': fid, 'services': S, 'products': P}
        (out / 'catalog.js').write_text('// Catalog ' + fid + ' — generat de tools/build_c4322.py ' + VERSION + '\nconst CAT=' + json.dumps(cat, ensure_ascii=False).replace('<', '\\u003c') + ';\n', encoding='utf-8')
        (out / 'app.js').write_text('// SCARA C4322 — ' + VERSION + ' ' + DATE + '\n' + APP_JS, encoding='utf-8')
        sub = CFG['SubtitluFamilie'][fid]; base = BASE.get(fid, '')
        (out / 'index.html').write_text(shell(fid, d, 'home', d['title'], f'{FIRM} — {sub}: {len(d["groups"])} grupe, {len(S)} servicii și {len(P)} produse cu prețuri orientative, București. Etalon intern SCARA {fid}.', home(fid, d, S, P), 0, '/', ld_home(fid, d, base)), encoding='utf-8')
        for kind, n in (('servicii', len(S)), ('produse', len(P))):
            (out / kind).mkdir(exist_ok=True)
            xs = S if kind == 'servicii' else P
            html_ = shell(fid, d, kind, kind.capitalize(), f'{FIRM} — {sub}: toate cele {n} {kind}, cu cod, mărci și preț min / mediu / max. Etalon SCARA {fid}.', listing(fid, d, kind, S, P), 1, f'/{kind}/', ld_list(fid, kind, xs, base))
            html_ = html_.replace('<div id="list" class="rows"></div>', '<div id="list" class="rows">' + ''.join(py_row(x, kind) for x in xs) + '</div>', 1)
            (out / kind / 'index.html').write_text(html_, encoding='utf-8')
        for kind, xs in (('servicii', S), ('produse', P)):
            for x in [y for y in xs if not y.get('external')]:
                dd = out / x['url'].strip('/'); dd.mkdir(parents=True, exist_ok=True)
                (dd / 'index.html').write_text(shell(fid, d, 'detail', x['name'], f"{x['name']} ({x['id']}) — {sub}, {FIRM}: ce este, ce presupune, preț min / mediu / max {x['priceMinRON']}–{x['priceMaxRON']} lei / {x['priceUnit']}.", detail(fid, d, x, kind, S, P), 2, x['url'], ld_item(fid, x, kind, base)), encoding='utf-8')
        (out / 'dictionar').mkdir(exist_ok=True)
        (out / 'dictionar' / 'index.html').write_text(shell(fid, d, 'dictionar', 'Dicționar de date', f'Dicționarul entitate–relație al site-ului {fid}: entități, relații, cardinalități, sesiune {ENT["sesiune"]}.', dict_page(fid, d, S, P), 1, '/dictionar/', ld_dict(fid, base)), encoding='utf-8')
        (out / 'despre').mkdir(exist_ok=True)
        (out / 'despre' / 'index.html').write_text(shell(fid, d, 'despre', 'Despre', f'{FIRM} — {sub}: cum lucrăm, program, autorizații, zonă de acoperire, contract de mentenanță și contact. Firmă fictivă, etalon SCARA {fid}.', despre(fid, d, S, P), 1, '/despre/', ld_despre(fid, base)), encoding='utf-8')
        (out / '404.html').write_text(not_found(fid, d), encoding='utf-8')
        (out / 'favicon.svg').write_text(favicon(fid), encoding='utf-8')
        (out / 'robots.txt').write_text(robots_txt(base), encoding='utf-8')
        paths = ['/', '/servicii/', '/produse/', '/despre/', '/dictionar/'] + [x['url'] for x in S + P if not x.get('external')]
        (out / 'sitemap.xml').write_text(sitemap(base, paths), encoding='utf-8')
        (out / 'llms.txt').write_text(llms(fid, d, S, P, base), encoding='utf-8')
        (out / 'api').mkdir(exist_ok=True)
        keep = ('id', 'entityId', 'name', 'group', 'homeGroup', 'sharedFrom', 'descriptionShort', 'operations', 'recommendedWhen', 'selectionCriteria', 'brands', 'uses', 'usedIn', 'priceMinRON', 'priceAvgRON', 'priceMaxRON', 'priceUnit', 'priceBasis', 'priceSource')
        api = {'site': base + '/', 'familie': fid, 'titlu': d['title'], 'subtitlu': sub, 'firma': {'nume': FIRM, 'fictiva': CFG.get('Fictiva', True)}, 'editor': 'AiVenture S.R.L. (RO51415878)',
               'caen': '4322', 'sesiune': ENT['sesiune'], 'versiune': VERSION, 'data': DATE, 'moneda': 'RON, cu TVA', 'grupe': d['groups'],
               'servicii': [{**{k: x[k] for k in keep if k in x}, 'url': ABS(base, x['url']), 'trimitere': bool(x.get('external'))} for x in S], 'produse': [{**{k: x[k] for k in keep if k in x}, 'url': ABS(base, x['url']), 'trimitere': bool(x.get('external'))} for x in P]}
        (out / 'api' / 'catalog.json').write_text(json.dumps(api, ensure_ascii=False, indent=1), encoding='utf-8')
        for n_ in ('entitati.json', 'relatii.json'):
            (out / 'dictionar' / n_).write_bytes((DIC_DIR / n_).read_bytes())
        (out / '.well-known').mkdir(exist_ok=True)
        (out / '.well-known' / 'agent.json').write_text(json.dumps(agent_card(fid, d, base), ensure_ascii=False, indent=1), encoding='utf-8')
        (out / '.well-known' / 'agent-card.json').write_text(json.dumps(agent_card(fid, d, base), ensure_ascii=False, indent=1), encoding='utf-8')
        (out / '_headers').write_text(HEADERS if not PUBLIC else HEADERS.replace('  X-Robots-Tag: noindex, nofollow\n', ''), encoding='utf-8')
        (out / '_routes.json').write_text(ROUTES, encoding='utf-8')
        print(fid, len(S), 'servicii,', len(P), 'produse (cu fișele comune)')

if __name__ == '__main__':
    main()
