# C4322B — Website-etalon B2C București

**Prototip funcțional al unui site modern pentru o firmă fictivă CAEN 4322.** Încălzire, climatizare și instalații sanitare pentru apartamente și case.

## Pagini
- `index.html`: homepage premium cu hero, categorii, avantaje și FAQ
- `despre.html`: identitatea demonstrativă a companiei
- `servicii.html`: **46 servicii** grupate în trei familii, cu fișe și filtrare
- `produse.html`: **49 familii de produse**, cod de catalog, ilustrație SVG locală, descriere și criterii de alegere
- `mentenanta.html`: revizii și contract de mentenanță (model)
- `garantii.html`: produs, manoperă și reparații
- `certificari.html`: verificarea cerințelor ISCIR, ANRE și F-gaze (fără certificate revendicate)
- `oferta.html`: formular local de compunere a cererii, copiere text și deschidere email
- `legal.html`: Termeni, Cookies, Confidențialitate, GDPR, AI Act
- `contact.html`: date demonstrative de contact
- `faq.html`: **500 perechi întrebare–răspuns**, filtrabile, cu căutare și Schema.org FAQPage JSON-LD, din aceeași bază folosită de asistent

Include **asistent conversațional automat** pe toate paginile. Funcționează pe reguli locale și caută în catalog; **nu** este conectat la un model generativ AI.

## Date demonstrative
- Nume: C4322B
- Adresă fictivă: Strada Exemplului nr. 24, București
- Email demonstrativ: email@etalon.com
- Nu se inventează persoane, CUI, nr. Registrul Comerțului, certificări sau prețuri.

## Fișiere și deploy
Site static HTML/CSS/JS (regenerat și verificat pe 8 noiembrie 2026): `style.css` (design), `catalog.js` (date), `app.js` (rendering, interacțiuni), 10 fișiere HTML. Nu necesită npm sau build. Cloudflare Pages: conectare repository, build command gol, output directory `.` (rădăcina).

## Important înainte de a-l folosi comercial
- Site-ul demonstrativ are `noindex,nofollow` și `robots.txt` cu `Disallow: /`. Actualizează numai după eliminarea datelor fictive.
- Imaginile HERO/de atmosferă și cele ale familiilor de servicii folosesc încă referințe externe Unsplash; ilustrațiile celor 49 de produse sunt SVG-uri locale demonstrative, nu fotografii ale modelelor comerciale. Fonturile sunt de la Google Fonts: verificați licențele și solicitările către furnizori.
- Prețuri, contracte, garanții comerciale, urgențe și autorizări: **neconfirmate**, necesită dovezi.
- Formularul **nu trimite și nu stochează pe server**; `mailto:` deschide aplicația email a utilizatorului.
- Textele legale sunt **exemple**, nu atestă conformitatea juridică.
- Pentru un AI conversațional real se va integra un backend securizat, cu control al datelor, costurilor și transparență.
- Catalogul este model de ofertă, nu afirmația că o firmă reală prestează toate operațiunile.

© 2026 C4322B — prototip demonstrativ.


## Regenerare completă C4322B — 2026-11-08

- **Repository unic de lucru:** `aipath512/GPT-ETALON-4322-V10`. Nicio modificare necesară în `scara-valorii`.
- **Backup înaintea regenerării:** ramura `backup-before-regeneration-2026-11-08`.
- Homepage cu titlul „Casa ta merită confortul potrivit. În fiecare anotimp.”, design mobil, meniu, contact, navigare și asistent local.
- 10 pagini HTML publice (fără /admin), 46 de servicii organizate în 3 familii, **49 de produse cu 49 ilustrații SVG proprii** și coduri de catalog. Cele 46 de servicii sunt fișe într-o pagină cu căutare, nu 46 de URL-uri distincte.
- Căutare după termeni și intenții în Servicii / Produse; deep linkurile `?familie=...` și `?q=...` sunt acceptate.
- Pagina `/admin/` rămâne **DEMO PUBLIC, fără autentificare**; nu introduceți date private. Modulul `/admin/intro/` este separat și FAIL-CLOSED prin Cloudflare Access.
- Pentru Owner INTRO, configurați în Cloudflare Pages variabilele `ETALON_ACCESS_TEAM_DOMAIN` (de forma `echipa.cloudflareaccess.com`), `ETALON_ACCESS_AUD` (Application AUD Tag), `ETALON_OWNER_EMAIL` (adresa Owner verificată). Adăugați o politică Zero Trust Access pentru `/admin/intro/*`, exclusiv Owner, și testați accesul autorizat/neautorizat. Fără configurație, pagina rămâne inaccesibilă.
- Nu pretindem implementarea funcțiilor HOLMES.AI, AI Voice sau transmiterea efectivă a cererilor prin backend; acestea necesită servicii dedicate și integrare ulterioară.
- Toate paginile site-ului fictiv păstrează `noindex,nofollow`. Publicarea pe un domeniu real trebuie verificată separat față de commitul GitHub.


## Tema și cardurile — actualizare 2026-11-08

- Site-ul public etalon folosește **Dark** ca temă implicită, inclusiv homepage, servicii, produse, formulare și paginile informaționale.
- Butonul **☀ Light / ☾ Dark** din antet permite schimbarea manuală a temei; preferința se păstrează în `localStorage` per browser. Dacă nu există preferință salvată, se pornește în Dark.
- Listele de servicii și produse folosesc carduri late cu **fotografie/ilustrație în stânga** și **nume, cod, descriere și acces la fișă în dreapta**, după referința vizuală furnizată.
- Nu se inventează prețuri: în lipsa unor tarife verificate se afișează „Preț la cerere” / „Preț stabilit la ofertare”.
- Schimbările sunt limitate la `GPT-ETALON-4322-V10` și nu activează automat vreun deployment Cloudflare.


## Avatar animat în bula asistentului (8 noiembrie 2026)

- Bula publică a asistentului conține avatarul din materialul video furnizat de Owner, în locul simbolului static.
- Clipul este redat fără sunet (autoplay muted playsinline), redat pentru primele 2 secunde, apoi mutat automat pe cadrul cu zâmbet larg de la secunda 5 a clipului și oprit acolo fără reluare; salutul „wave” este animat în CSS timp de 2 secunde. Respectă setarea `prefers-reduced-motion` pentru gest.
- **Limită importantă:** sursa video este momentan pe un URL extern `assets.x.ai` și disponibilitatea lui nu a fost confirmată. La indisponibilitate, interfața afișează un avatar de rezervă; pentru producție, copiați assetul cu drepturi corespunzătoare în storage propriu (R2 sau GitHub) și schimbați `src` în `app.js`.
- Un GIF de 2 secunde a fost generat din atașament în spațiul de lucru, dar nu a fost încă încărcat ca fișier binar în repository. Integrarea actuală a site-ului redă clipul video original, nu fișierul GIF local.


## Regenerare integrală — Dark-first / Avatar Smile (8 noiembrie 2026)

**Singurul repository modificat:** `aipath512/GPT-ETALON-4322-V10`.
**Punct de restaurare:** `backup-before-full-regeneration-2026-11-08-v2`.

- Toate cele **10 pagini publice** preîncarcă tema preferată înainte de stiluri. Tema inițială este **Dark**, iar toggle-ul `Light/Dark` din antet se păstrează între pagini.
- Cardurile din cataloage sunt orizontale, responsive, cu imagine stânga, denumire, cod, descriere, link „VEZI FIȘA” și preț neconfirmat explicit.
- Catalogul păstrează **46 de fișe de servicii și 49 de fișe de produse** cu ilustrații SVG individuale, filtrare după familie și căutare după cuvinte/intenții.
- Bula asistentului redă salutul de **2 secunde** (video extern), apoi caută cadrul cu **zâmbet deschis** la secunda 5 și oprește acolo redarea, fără buclă. Un timer suplimentar ajută în browserele care limitează evenimentele `timeupdate`. În caz de eroare video se afișează un avatar fallback.
- Asistentul are suport de închidere la `Escape` și refocalizare pe buton.
- Testele de regresie sunt în `tests/site.test.mjs`, executabile local cu `node --test tests/site.test.mjs` și configurate în `.github/workflows/site-check.yml`.
- Aceasta este o **regenerare a codului**, nu o confirmare a deploymentului `1clic-ia.eu` sau `cl4322b.pages.dev`.
- Limitări: video-ul avatarului și fotografiile de ambient sunt încă găzduite extern; prețurile, certificările, AI Voice, HOLMES.AI și un flux real de transmitere a cererilor de ofertă **nu sunt active** în acest prototip.


## FAQ V1.0 — 500 perechi, o singură bază de răspunsuri

- `faq-data.js` generează determinist **230 Q&A** pentru 46 servicii, **245 Q&A** pentru 49 produse și **25 Q&A** generale.
- FAQ-urile sunt derivate din `catalog.js`, nu din informații inventate; nu afirmă prețuri, stocuri, autorizări ori termene neconfirmate.
- `faq.html` prezintă toate întrebările cu `<details>`/`<summary>`, filtrează și caută în client fără API extern.
- JSON-LD `FAQPage` cu aceleași 500 de întrebări și răspunsuri este creat din același corpus. **Nu garantează afișarea de rich results în Google** și pagina rămâne `noindex,nofollow` cât timp este demonstrativă.
- Asistentul automat folosește `C4322FAQ.search()` și indică ID-ul FAQ, în plus față de regulile de siguranță și răspunsurile de rezervă.
- Număr pagini după adăugare: **11 publice + 2 administrative = 13 HTML**.
- Test: `node --test tests/site.test.mjs`. Validarea browser/live deploy trebuie efectuată separat.

## Site-uri de familie C43221 / C43222 / C43223 — v1.1 (11 noiembrie 2026)
- Trei site-uri independente, câte unul per proiect Cloudflare Pages (Build output directory = `cloudflare-pages/C4322x`):
  - C43221 Încălzire → gpt-etalon-4322-v10.pages.dev (proiect `scara-c43221`)
  - C43222 Climatizare → gpt-etalon-4322-v10-88z.pages.dev (proiect `scara-c43222`)
  - C43223 Sanitare → gpt-etalon-4322-v10-bfs.pages.dev (proiect `scara-c43223`)
- Firmă fictivă afișată: **TCE INSTAL SRL**. Parametri în adresă: `?cui=` (validat cu cifra de control oficială) și `?firma=`.
- C43221–C43223 sunt coduri interne SCARA; codul CAEN oficial (Rev.3) este clasa 4322.
- Sursa datelor: `etalons/C4322/C4322x.mjs` (cu câmpuri `priceMinRON` / `priceAvgRON` / `priceMaxRON`, încă necompletate).
- Paginile se regenerează din module cu `python3 tools/build_c4322.py`; testele `tests/c4322-sites.test.mjs` rulează în GitHub Actions.
- Antet: comutator Dark/Light, selector 24 limbi UE (traduce interfața; catalogul rămâne în română), dată/oră, versiune, sesiune 0001C.

## v1.3 (11 noiembrie 2026) — catalog extins, grupe, prețuri, mărci, fără dubluri
- Catalog: Încălzire 34 servicii + 36 produse, Climatizare 25 + 28, Sanitare 30 + 34 = **187 fișe unice** (cod și denumire unice în toate familiile).
- O fișă relevantă pentru două familii există o singură dată și apare pe ambele site-uri prin `sharedRefs` (ex. P-I-13 Boiler electric și la Sanitare).
- Fiecare fișă are grupă (filtre pe pagină), preț **min / recomandat (media) / max** în lei cu TVA, unitate, bază (manoperă sau echipament) și sursă; produsele au mărci uzuale. Prețurile sunt **estimări orientative nov. 2026, de validat**.
- Parametri comuni în `etalons/C4322/firma.json` (NumeFirma, CUI, subtitluri de familie). La orice modificare, acțiunea `build-c4322.yml` regenerează paginile automat.

## v1.4 (11 noiembrie 2026) — pagini Servicii / Produse, căutare comună
- Fiecare site de familie are 3 pagini: `/` (grupele familiei, câte 3 exemple + „Vezi mai multe”), `/servicii/` și `/produse/` (toate fișele, în format rând: imagine, nume, cod, mărci, preț min / mediu / max, descriere).
- Căutare pe toate paginile: cuvinte-cheie (fără diacritice, cu sinonime: AC, calorifer, PDC, ACM…) + filtru de marcă + filtru de grupă, combinabile; parametri în adresă `?q=&marca=&grupa=`.
- Fotografii pe grupe: puneți `img/grupe/<grupa>.jpg` (ex. `img/grupe/centrale-termice.jpg`) în repo; acțiunea GitHub le preia automat în locul ilustrațiilor.

## v1.5 (11 noiembrie 2026) — pagini de detaliu pe fiecare fișă
- Fiecare serviciu și produs are pagina lui, pe înțelesul clientului: `/servicii/<cod-nume>/` și `/produse/<cod-nume>/` (195 de pagini pe cele trei site-uri).
- Conținut: pe scurt, când aveți nevoie / cum alegeți, ce presupune lucrarea (pași), cât costă (min / recomandat / max, ce influențează prețul), mărci, reguli și siguranță (ISCIR, ANRE, F-gaze), sfatul instalatorului, servicii și produse legate.
- Textele pe grupe sunt acum proprietăți ale entităților Grupă din dicționar (vezi v2.0).

## v2.0 (11 noiembrie 2026) — dicționar entitate–relație, sursă unică (sesiune 0006H)
- **Sursa unică (SSOT):** `etalons/C4322/dictionar/entitati.json` (383 entități: clasă CAEN 4322, 3 familii, 29 grupe, 89 servicii, 98 produse, 163 mărci) și `relatii.json` (982 relații, 7 tipuri, fiecare cu inversă, cardinalitate și sesiune 0006H).
- Tipuri: CAEN_ARE_FAMILIE 1:1..*, FAMILIE_ARE_GRUPA 1:1..*, GRUPA_CONTINE 1:0..*, AFISAT_PE 0..*:1..*, FOLOSESTE_PRODUS 0..*:0..* (propuse, de validat), ARE_MARCA 0..*:1..*, FIRMA_OFERA 0..*:0..* (pentru SCARA per CUI).
- Modulele `etalons/C4322/C4322x.mjs` și toate paginile sunt **generate** din dicționar; nu se editează manual. Generatorul și testele opresc publicarea dacă o cardinalitate sau un tip de relație e încălcat.
- Pagina `/dictionar/` pe fiecare site arată entitățile și relațiile (directe și inverse).
