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
- Clipul este redat fără sunet (autoplay muted playsinline), oprit automat la secunda 2, pe cadrul zâmbitor; salutul „wave” este animat în CSS timp de 2 secunde. Respectă setarea `prefers-reduced-motion` pentru gest.
- **Limită importantă:** sursa video este momentan pe un URL extern `assets.x.ai` și disponibilitatea lui nu a fost confirmată. La indisponibilitate, interfața afișează un avatar de rezervă; pentru producție, copiați assetul cu drepturi corespunzătoare în storage propriu (R2 sau GitHub) și schimbați `src` în `app.js`.
- Un GIF de 2 secunde a fost generat din atașament în spațiul de lucru, dar nu a fost încă încărcat ca fișier binar în repository. Integrarea actuală a site-ului redă clipul video original, nu fișierul GIF local.
