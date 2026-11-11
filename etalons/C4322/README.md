# ETALON CAEN+CUI — C4322 / v1.0.0-draft

Trei module autonome (coduri interne SCARA, **nu** coduri CAEN oficiale):
- `C43221.mjs`: încălzire — 16 servicii + 18 produse.
- `C43222.mjs`: climatizare — 15 servicii + 14 produse.
- `C43223.mjs`: sanitare — 15 servicii + 17 produse.

Clasa / compozitorul `C4322.mjs` validează combinațiile și produce **o singură configurație de site** pentru cheia `(CAEN, CUI)`. Orice subset nevid al celor trei module este permis (7 combinații). Același nume de firmă și același subtitlu alimentează configurația unică. CUI este verificat doar ca **format**: identificarea reală a firmei rămâne responsabilitatea FirmsFinder/ONRC.

## Exemplu de utilizare

```js
import {composeC4322} from './C4322.mjs';
const site = composeC4322({
  CAEN: '4322',
  CUI: '12345678',
  NumeFirma: 'TCS INSTAL',
  SubtitluFirma: 'Instalații de încălzire și sanitare în București',
  activeClasses: ['C43221', 'C43223']
});
console.log(site.services.length, site.products.length);
```

## Testare

`node --test etalons/C4322/C4322.test.mjs`

## Limite / etape neexecutate

- Fișele reflectă exact catalogul anterior `catalog.js`: **46 servicii și 49 produse**, nu o cercetare exhaustivă a întregii piețe București.
- Modulele sunt surse de date individuale, nu trei site-uri HTML publicate. Integrarea în renderer-ul existent și generarea paginilor nu sunt încă efectuate.
- Nu s-au migrat automat cele 500 FAQ către trei KB individuale și nu a fost conectat backendul EVA.
- Identitatea, autorizațiile, serviciile oferite efectiv, produsele și disponibilitatea trebuie confirmate de firmă.
- Nu este permisă publicarea automată; rezultatul poartă starea `preview_only`.
- Nu modificați producția sau ramura `main` fără teste și aprobare.
