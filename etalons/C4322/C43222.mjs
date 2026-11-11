// GENERAT din etalons/C4322/dictionar (sesiune 0006H) de tools/build_c4322.py — nu editați manual; modificați dicționarul.
// Catalog C43222 — Climatizare. Identificatorii C43221-3 sunt interni SCARA, nu subcoduri CAEN oficiale.
export const etalon = {
  "classId": "C43222",
  "parentClassId": "C4322",
  "caen": "4322",
  "family": "climatizare",
  "title": "Climatizare",
  "version": "2.0.0-dictionar",
  "market": "București",
  "groups": [
    "Aer condiționat split",
    "Multisplit, casetă, duct, consolă",
    "Sisteme comerciale (VRF, chiller)",
    "Ventilație și recuperare",
    "Calitatea aerului",
    "Trasee și accesorii",
    "Automatizări și control",
    "Service și igienizare"
  ],
  "services": [
    {
      "id": "S-C-01",
      "group": "Aer condiționat split",
      "name": "Consultanță și dimensionare aer condiționat",
      "descriptionShort": "Alegerea puterii și poziției corecte pentru încăperea ta.",
      "operations": "Evaluare suprafață, orientare, izolație, traseu frigorific și electric.",
      "recommendedWhen": "Înainte de cumpărarea aparatului.",
      "priceMinRON": 0,
      "priceAvgRON": 150,
      "priceMaxRON": 300,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "vizită",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0184",
      "uses": [
        "P-C-01",
        "P-C-02",
        "P-C-03",
        "P-C-04",
        "P-C-05"
      ]
    },
    {
      "id": "S-C-02",
      "group": "Aer condiționat split",
      "name": "Montaj AC split 9000–12000 BTU",
      "descriptionShort": "Răcire și încălzire suplimentară pentru o cameră.",
      "operations": "Unitate interioară/exterioară, traseu, vidare, evacuare condens și probă.",
      "recommendedWhen": "Dormitoare și livinguri potrivite ca volum.",
      "priceMinRON": 600,
      "priceAvgRON": 800,
      "priceMaxRON": 1100,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0185",
      "uses": [
        "P-C-01",
        "P-C-02",
        "P-C-11",
        "P-C-12"
      ]
    },
    {
      "id": "S-C-03",
      "group": "Aer condiționat split",
      "name": "Montaj AC split 18000–24000 BTU",
      "descriptionShort": "Climatizare pentru spații mai mari, dacă dimensionarea o permite.",
      "operations": "Amplasare, console, legături frigorifice, protecții și testare.",
      "recommendedWhen": "Living mare sau spațiu open space.",
      "priceMinRON": 900,
      "priceAvgRON": 1100,
      "priceMaxRON": 1500,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0186",
      "uses": [
        "P-C-03",
        "P-C-04",
        "P-C-11",
        "P-C-12"
      ]
    },
    {
      "id": "S-C-04",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Montaj multisplit",
      "descriptionShort": "Climatizarea a două sau mai multe camere cu sistem comun.",
      "operations": "Dimensionare, trasee separate, montaj și teste.",
      "recommendedWhen": "Apartamente cu mai multe camere.",
      "priceMinRON": 600,
      "priceAvgRON": 800,
      "priceMaxRON": 1200,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "unitate interioară",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0187",
      "uses": [
        "P-C-05",
        "P-C-16",
        "P-C-11"
      ]
    },
    {
      "id": "S-C-05",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Montaj aer condiționat tip casetă / duct",
      "descriptionShort": "Distribuție discretă a aerului în configurații speciale.",
      "operations": "Integrare în plafon și trasee, cu verificarea accesului la mentenanță.",
      "recommendedWhen": "Case cu tavane adecvate.",
      "priceMinRON": 1500,
      "priceAvgRON": 2500,
      "priceMaxRON": 4500,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0188",
      "uses": [
        "P-C-06",
        "P-C-07",
        "P-C-22"
      ]
    },
    {
      "id": "S-C-06",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Montaj sisteme VRF / VRV",
      "descriptionShort": "Controlul mai multor zone cu o soluție centralizată.",
      "operations": "Proiectare specializată, rețea frigorifică, control și probe.",
      "recommendedWhen": "Locuințe mari, cu multe zone.",
      "priceMinRON": 1200,
      "priceAvgRON": 2000,
      "priceMaxRON": 3500,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "unitate interioară",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0189",
      "uses": [
        "P-C-18",
        "P-C-26"
      ]
    },
    {
      "id": "S-C-07",
      "group": "Ventilație și recuperare",
      "name": "Montaj ventilație cu recuperare de căldură",
      "descriptionShort": "Aer proaspăt cu reducerea pierderilor termice.",
      "operations": "Tubulaturi, unitate recuperare, filtre, prize aer și reglaje.",
      "recommendedWhen": "Case etanșe și renovări aprofundate.",
      "priceMinRON": 3000,
      "priceAvgRON": 6000,
      "priceMaxRON": 12000,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "lucrare",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0190",
      "uses": [
        "P-C-09",
        "P-C-22"
      ]
    },
    {
      "id": "S-C-08",
      "group": "Service și igienizare",
      "name": "Igienizare și curățare AC",
      "descriptionShort": "Curățarea componentelor expuse la praf și umezeală.",
      "operations": "Filtre, evaporator, tavă de condens, evacuare și produse compatibile.",
      "recommendedWhen": "Întreținere periodică sau miros neplăcut.",
      "priceMinRON": 150,
      "priceAvgRON": 250,
      "priceMaxRON": 400,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0191",
      "uses": [
        "P-C-28"
      ]
    },
    {
      "id": "S-C-09",
      "group": "Service și igienizare",
      "name": "Revizie periodică AC",
      "descriptionShort": "Verificarea eficienței și funcționării înainte de sezon.",
      "operations": "Inspecție electrică/vizuală, parametri, condens, curățare după necesitate.",
      "recommendedWhen": "Primăvara și în perioadele de utilizare intensă.",
      "priceMinRON": 200,
      "priceAvgRON": 300,
      "priceMaxRON": 450,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0192",
      "uses": [
        "P-C-28",
        "P-C-27"
      ]
    },
    {
      "id": "S-C-10",
      "group": "Service și igienizare",
      "name": "Diagnostic și reparații AC",
      "descriptionShort": "Remedierea defecțiunilor de răcire, zgomot sau eroare.",
      "operations": "Diagnostic, identificare piesă și deviz înainte de reparație.",
      "recommendedWhen": "Când apar simptome anormale.",
      "priceMinRON": 150,
      "priceAvgRON": 300,
      "priceMaxRON": 600,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "intervenție, fără piese",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0193",
      "uses": [
        "P-C-27"
      ]
    },
    {
      "id": "S-C-11",
      "group": "Service și igienizare",
      "name": "Verificare pierderi agent frigorific",
      "descriptionShort": "Identificarea scurgerilor înaintea încărcării instalației.",
      "operations": "Test etanșeitate, remediere și operațiuni de agent frigorific prin personal competent.",
      "recommendedWhen": "Când răcirea scade sau presiunile sunt incorecte.",
      "priceMinRON": 150,
      "priceAvgRON": 250,
      "priceMaxRON": 500,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "lucrare",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0194",
      "uses": [
        "P-C-27"
      ]
    },
    {
      "id": "S-C-12",
      "group": "Service și igienizare",
      "name": "Încărcare agent frigorific",
      "descriptionShort": "Restabilirea cantității necesare după rezolvarea cauzei pierderii.",
      "operations": "Verificări, încărcare tip/cantitate prescrisă și teste finale.",
      "recommendedWhen": "Doar după diagnostic, nu ca remediu automat.",
      "priceMinRON": 250,
      "priceAvgRON": 450,
      "priceMaxRON": 800,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "lucrare, cu agent",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0195",
      "uses": [
        "P-C-27"
      ]
    },
    {
      "id": "S-C-13",
      "group": "Service și igienizare",
      "name": "Demontare și relocare AC",
      "descriptionShort": "Mutarea aparatului fără deteriorarea componentelor.",
      "operations": "Recuperare agent unde este cazul, demontare și remontare, teste.",
      "recommendedWhen": "Renovare sau schimbare locuință.",
      "priceMinRON": 200,
      "priceAvgRON": 500,
      "priceMaxRON": 900,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0196",
      "uses": [
        "P-C-11",
        "P-C-12"
      ]
    },
    {
      "id": "S-C-14",
      "group": "Trasee și accesorii",
      "name": "Traseu frigorific și evacuare condens",
      "descriptionShort": "Realizarea corectă a legăturilor dintre unități.",
      "operations": "Țevi, izolație, cablu, condens și străpungeri conform situației.",
      "recommendedWhen": "Montaj nou sau refacerea traseului.",
      "priceMinRON": 100,
      "priceAvgRON": 130,
      "priceMaxRON": 180,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "m",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0197",
      "uses": [
        "P-C-11",
        "P-C-13"
      ]
    },
    {
      "id": "S-C-15",
      "group": "Automatizări și control",
      "name": "Automatizări climatizare și Wi-Fi",
      "descriptionShort": "Programarea confortului și controlul de pe telefon.",
      "operations": "Configurare termostate, telecomenzi și module compatibile.",
      "recommendedWhen": "Locuințe cu control pe zone.",
      "priceMinRON": 100,
      "priceAvgRON": 200,
      "priceMaxRON": 400,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0198",
      "uses": [
        "P-C-14",
        "P-C-26"
      ]
    },
    {
      "id": "S-C-16",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Montaj aer condiționat tip consolă",
      "descriptionShort": "Unitate interioară montată jos, pe perete sau pardoseală.",
      "operations": "Fixare, traseu frigorific, condens, vidare, probe.",
      "recommendedWhen": "Mansarde, ferestre mari, spații fără perete liber sus.",
      "priceMinRON": 800,
      "priceAvgRON": 1100,
      "priceMaxRON": 1500,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0199",
      "uses": [
        "P-C-15",
        "P-C-11"
      ]
    },
    {
      "id": "S-C-17",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Montaj perdele de aer",
      "descriptionShort": "Separarea climatică a intrărilor în spații comerciale.",
      "operations": "Suspendare deasupra ușii, alimentare, comandă, reglaj.",
      "recommendedWhen": "Magazine, recepții, intrări cu trafic mare.",
      "priceMinRON": 400,
      "priceAvgRON": 800,
      "priceMaxRON": 1500,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0200",
      "uses": [
        "P-C-21"
      ]
    },
    {
      "id": "S-C-18",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Montaj chiller și ventiloconvectoare",
      "descriptionShort": "Răcire și încălzire centralizată cu apă.",
      "operations": "Amplasare chiller, trasee de apă, ventiloconvectoare, echilibrare, punere în funcțiune.",
      "recommendedWhen": "Clădiri de birouri, hoteluri, spații mari.",
      "priceMinRON": 8000,
      "priceAvgRON": 20000,
      "priceMaxRON": 60000,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "lucrare",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0201",
      "uses": [
        "P-C-19",
        "P-C-20"
      ]
    },
    {
      "id": "S-C-19",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Montaj sisteme rooftop pentru spații comerciale",
      "descriptionShort": "Unități compacte pe acoperiș pentru hale și magazine.",
      "operations": "Ridicare, racorduri de aer, alimentare, comenzi, punere în funcțiune.",
      "recommendedWhen": "Hale, supermarketuri, spații comerciale mari.",
      "priceMinRON": 5000,
      "priceAvgRON": 12000,
      "priceMaxRON": 30000,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "lucrare",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0202",
      "uses": [
        "P-C-22"
      ]
    },
    {
      "id": "S-C-20",
      "group": "Ventilație și recuperare",
      "name": "Montaj ventilatoare de extracție baie și bucătărie",
      "descriptionShort": "Evacuarea umidității și a mirosurilor.",
      "operations": "Străpungere, tubulatură, clapetă antiretur, alimentare, temporizare.",
      "recommendedWhen": "Băi fără geam, bucătării, spații cu mucegai.",
      "priceMinRON": 150,
      "priceAvgRON": 300,
      "priceMaxRON": 600,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0203",
      "uses": [
        "P-C-08",
        "P-C-23"
      ]
    },
    {
      "id": "S-C-21",
      "group": "Calitatea aerului",
      "name": "Montaj dezumidificatoare și umidificatoare",
      "descriptionShort": "Controlul umidității aerului în locuință.",
      "operations": "Amplasare, evacuare condens sau alimentare apă, setare umiditate.",
      "recommendedWhen": "Subsoluri, case noi, aer prea uscat iarna.",
      "priceMinRON": 100,
      "priceAvgRON": 250,
      "priceMaxRON": 600,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0204",
      "uses": [
        "P-C-24",
        "P-C-25"
      ]
    },
    {
      "id": "S-C-22",
      "group": "Trasee și accesorii",
      "name": "Montaj pompă de condens",
      "descriptionShort": "Evacuarea condensului când nu se poate gravitațional.",
      "operations": "Montaj pompă, traseu, racord la canalizare, probă.",
      "recommendedWhen": "Unități montate departe de un punct de scurgere.",
      "priceMinRON": 150,
      "priceAvgRON": 250,
      "priceMaxRON": 400,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0205",
      "uses": [
        "P-C-13"
      ]
    },
    {
      "id": "S-C-23",
      "group": "Trasee și accesorii",
      "name": "Pre-instalare climatizare în renovare",
      "descriptionShort": "Trasee îngropate înainte de finisaje.",
      "operations": "Trasee frigorifice și de condens, cablu, cutii de așteptare, probe de presiune.",
      "recommendedWhen": "Renovări și case noi, înainte de tencuială.",
      "priceMinRON": 400,
      "priceAvgRON": 700,
      "priceMaxRON": 1200,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "unitate",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0206",
      "uses": [
        "P-C-11",
        "P-C-13"
      ]
    },
    {
      "id": "S-C-24",
      "group": "Service și igienizare",
      "name": "Curățare și dezinfecție tubulatură ventilație",
      "descriptionShort": "Igienizarea canalelor de aer și a grilelor.",
      "operations": "Inspecție, periere, aspirare, dezinfecție, raport.",
      "recommendedWhen": "Ventilații vechi, mirosuri, spații publice.",
      "priceMinRON": 15,
      "priceAvgRON": 30,
      "priceMaxRON": 60,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "m",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0207",
      "uses": [
        "P-C-22"
      ]
    },
    {
      "id": "S-C-25",
      "group": "Service și igienizare",
      "name": "Intervenții urgente climatizare",
      "descriptionShort": "Defecțiuni în sezonul cald sau la echipamente critice.",
      "operations": "Diagnostic, remediere sau soluție provizorie, ofertă pentru piese.",
      "recommendedWhen": "Camere de servere, cabinete, valuri de căldură.",
      "priceMinRON": 250,
      "priceAvgRON": 450,
      "priceMaxRON": 800,
      "priceBasis": "manoperă, fără materiale",
      "priceUnit": "intervenție",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0208",
      "uses": [
        "P-C-27"
      ]
    }
  ],
  "products": [
    {
      "id": "P-C-01",
      "group": "Aer condiționat split",
      "name": "Aer condiționat split 9000 BTU",
      "descriptionShort": "Climatizare pentru spații mici, după dimensionare.",
      "selectionCriteria": "Capacitate la condiții reale, SEER/SCOP și zgomot.",
      "priceMinRON": 1500,
      "priceAvgRON": 2300,
      "priceMaxRON": 4000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0209",
      "brands": "Daikin, Mitsubishi Electric, Gree, LG, Samsung, Midea",
      "usedIn": [
        "S-C-01",
        "S-C-02"
      ]
    },
    {
      "id": "P-C-02",
      "group": "Aer condiționat split",
      "name": "Aer condiționat split 12000 BTU",
      "descriptionShort": "Aparat pentru camere de dimensiune medie.",
      "selectionCriteria": "Clasa energetică, poziționare, consum, filtrare.",
      "priceMinRON": 1700,
      "priceAvgRON": 2700,
      "priceMaxRON": 4500,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0212",
      "brands": "Daikin, Mitsubishi Electric, Gree, LG, Samsung, Midea",
      "usedIn": [
        "S-C-01",
        "S-C-02"
      ]
    },
    {
      "id": "P-C-03",
      "group": "Aer condiționat split",
      "name": "Aer condiționat split 18000 BTU",
      "descriptionShort": "Aparat pentru zone mai mari.",
      "selectionCriteria": "Dimensionare, lungime traseu și poziția unităților.",
      "priceMinRON": 2700,
      "priceAvgRON": 4000,
      "priceMaxRON": 7000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0213",
      "brands": "Daikin, Mitsubishi Electric, Gree, LG, Samsung",
      "usedIn": [
        "S-C-01",
        "S-C-03"
      ]
    },
    {
      "id": "P-C-04",
      "group": "Aer condiționat split",
      "name": "Aer condiționat split 24000 BTU",
      "descriptionShort": "Aparat de capacitate mare pentru spații compatibile.",
      "selectionCriteria": "Alimentare electrică, debit și instalare.",
      "priceMinRON": 3200,
      "priceAvgRON": 5000,
      "priceMaxRON": 8500,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0214",
      "brands": "Daikin, Mitsubishi Electric, Gree, LG, Samsung",
      "usedIn": [
        "S-C-01",
        "S-C-03"
      ]
    },
    {
      "id": "P-C-05",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Sistem multisplit",
      "descriptionShort": "Mai multe unități interioare, o configurație comună exterioară.",
      "selectionCriteria": "Combinații admise de producător și trasee.",
      "priceMinRON": 6000,
      "priceAvgRON": 10000,
      "priceMaxRON": 18000,
      "priceBasis": "echipament / material",
      "priceUnit": "sistem (2 unități)",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0215",
      "brands": "Daikin, Mitsubishi Electric, LG, Samsung, Gree",
      "usedIn": [
        "S-C-01",
        "S-C-04"
      ]
    },
    {
      "id": "P-C-06",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Aer condiționat tip casetă",
      "descriptionShort": "Distribuie aerul prin grile într-un plafon.",
      "selectionCriteria": "Înălțime disponibilă și acces service.",
      "priceMinRON": 5000,
      "priceAvgRON": 8500,
      "priceMaxRON": 15000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0216",
      "brands": "Daikin, Mitsubishi Electric, Gree, Toshiba",
      "usedIn": [
        "S-C-05"
      ]
    },
    {
      "id": "P-C-07",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Aer condiționat duct",
      "descriptionShort": "Distribuție prin canale, cu unitatea ascunsă.",
      "selectionCriteria": "Presiune disponibilă, zgomot și filtrare.",
      "priceMinRON": 5000,
      "priceAvgRON": 9000,
      "priceMaxRON": 16000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0218",
      "brands": "Daikin, Mitsubishi Electric, Gree, Toshiba",
      "usedIn": [
        "S-C-05"
      ]
    },
    {
      "id": "P-C-08",
      "group": "Ventilație și recuperare",
      "name": "Ventilator de baie",
      "descriptionShort": "Ajută la evacuarea aerului umed.",
      "selectionCriteria": "Debit, protecție electrică, nivel sonor.",
      "priceMinRON": 80,
      "priceAvgRON": 250,
      "priceMaxRON": 700,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0219",
      "brands": "Vents, Vortice, Soler & Palau",
      "usedIn": [
        "S-C-20"
      ]
    },
    {
      "id": "P-C-09",
      "group": "Ventilație și recuperare",
      "name": "Recuperator de căldură",
      "descriptionShort": "Ventilație cu transfer parțial de energie între fluxuri.",
      "selectionCriteria": "Randament, filtre, debit și îngheț.",
      "priceMinRON": 2500,
      "priceAvgRON": 6000,
      "priceMaxRON": 15000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0223",
      "brands": "Zehnder, Komfovent, Vents, Blauberg",
      "usedIn": [
        "S-C-07"
      ]
    },
    {
      "id": "P-C-10",
      "group": "Calitatea aerului",
      "name": "Purificator / filtru de aer",
      "descriptionShort": "Reduce particulele pentru care este proiectat.",
      "selectionCriteria": "CADR, tip filtru și cost consumabile.",
      "priceMinRON": 400,
      "priceAvgRON": 1200,
      "priceMaxRON": 4000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0226",
      "brands": "Philips, Xiaomi, Daikin, Blueair",
      "usedIn": []
    },
    {
      "id": "P-C-11",
      "group": "Trasee și accesorii",
      "name": "Traseu frigorific cupru",
      "descriptionShort": "Transportă agentul între unitățile AC.",
      "selectionCriteria": "Diametru, izolație, lungime maximă.",
      "priceMinRON": 40,
      "priceAvgRON": 70,
      "priceMaxRON": 120,
      "priceBasis": "echipament / material",
      "priceUnit": "m",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0230",
      "brands": "Halcor, KME, Wieland",
      "usedIn": [
        "S-C-02",
        "S-C-03",
        "S-C-04",
        "S-C-13",
        "S-C-14",
        "S-C-16",
        "S-C-23"
      ]
    },
    {
      "id": "P-C-12",
      "group": "Trasee și accesorii",
      "name": "Kit console AC",
      "descriptionShort": "Fixează unitatea exterioară pe suport adecvat.",
      "selectionCriteria": "Sarcină, vibrații și ancorare.",
      "priceMinRON": 60,
      "priceAvgRON": 100,
      "priceMaxRON": 200,
      "priceBasis": "echipament / material",
      "priceUnit": "set",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0234",
      "brands": "Sauermann, Fischer",
      "usedIn": [
        "S-C-02",
        "S-C-03",
        "S-C-13"
      ]
    },
    {
      "id": "P-C-13",
      "group": "Trasee și accesorii",
      "name": "Pompă condens",
      "descriptionShort": "Evacuează apa când panta naturală lipsește.",
      "selectionCriteria": "Debit, nivel sonor și mentenanță.",
      "priceMinRON": 250,
      "priceAvgRON": 450,
      "priceMaxRON": 900,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0237",
      "brands": "Sauermann, Aspen, Charlotte",
      "usedIn": [
        "S-I-02",
        "S-C-14",
        "S-C-22",
        "S-C-23"
      ]
    },
    {
      "id": "P-C-14",
      "group": "Automatizări și control",
      "name": "Modul Wi-Fi climatizare",
      "descriptionShort": "Permite controlul aparatului de la distanță.",
      "selectionCriteria": "Compatibilitate și securitatea contului.",
      "priceMinRON": 150,
      "priceAvgRON": 300,
      "priceMaxRON": 600,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0240",
      "brands": "Daikin, Mitsubishi Electric, Gree, LG",
      "usedIn": [
        "S-C-15"
      ]
    },
    {
      "id": "P-C-15",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Aer condiționat consolă",
      "descriptionShort": "Unitate interioară de pardoseală.",
      "selectionCriteria": "Capacitate BTU, înălțime, zgomot.",
      "priceMinRON": 3500,
      "priceAvgRON": 5500,
      "priceMaxRON": 9000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0241",
      "brands": "Daikin, Mitsubishi Electric, Fujitsu",
      "usedIn": [
        "S-C-16"
      ]
    },
    {
      "id": "P-C-16",
      "group": "Multisplit, casetă, duct, consolă",
      "name": "Unitate exterioară multisplit",
      "descriptionShort": "Alimentează mai multe unități interioare.",
      "selectionCriteria": "Număr de racorduri, capacitate totală, clasă energetică.",
      "priceMinRON": 4000,
      "priceAvgRON": 7000,
      "priceMaxRON": 13000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0243",
      "brands": "Daikin, Mitsubishi Electric, LG, Samsung",
      "usedIn": [
        "S-C-04"
      ]
    },
    {
      "id": "P-C-17",
      "group": "Aer condiționat split",
      "name": "Aer condiționat mobil",
      "descriptionShort": "Răcire fără montaj fix.",
      "selectionCriteria": "Capacitate, tub de evacuare, zgomot.",
      "priceMinRON": 1200,
      "priceAvgRON": 2000,
      "priceMaxRON": 3500,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0244",
      "brands": "De'Longhi, Electrolux, Midea",
      "usedIn": []
    },
    {
      "id": "P-C-18",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Sistem VRF / VRV",
      "descriptionShort": "Climatizare pentru clădiri cu multe zone.",
      "selectionCriteria": "Capacitate, număr unități interioare, recuperare de căldură.",
      "priceMinRON": 40000,
      "priceAvgRON": 90000,
      "priceMaxRON": 250000,
      "priceBasis": "echipament / material",
      "priceUnit": "sistem",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0246",
      "brands": "Daikin, Mitsubishi Electric, LG, Samsung",
      "usedIn": [
        "S-C-06"
      ]
    },
    {
      "id": "P-C-19",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Chiller",
      "descriptionShort": "Produce apă răcită pentru ventiloconvectoare.",
      "selectionCriteria": "Capacitate, agent frigorific, zgomot.",
      "priceMinRON": 30000,
      "priceAvgRON": 70000,
      "priceMaxRON": 200000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0247",
      "brands": "Daikin, Carrier, Trane, Clivet",
      "usedIn": [
        "S-C-18"
      ]
    },
    {
      "id": "P-C-20",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Ventiloconvector",
      "descriptionShort": "Unitate terminală pe apă rece sau caldă.",
      "selectionCriteria": "Tip montaj, debit de aer, comandă.",
      "priceMinRON": 1500,
      "priceAvgRON": 2500,
      "priceMaxRON": 5000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0251",
      "brands": "Daikin, Sabiana, Aermec, Galletti",
      "usedIn": [
        "S-I-21",
        "S-C-18"
      ]
    },
    {
      "id": "P-C-21",
      "group": "Sisteme comerciale (VRF, chiller)",
      "name": "Perdea de aer",
      "descriptionShort": "Barieră de aer deasupra ușii.",
      "selectionCriteria": "Lățime ușă, cu sau fără încălzire, debit.",
      "priceMinRON": 800,
      "priceAvgRON": 2000,
      "priceMaxRON": 5000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0255",
      "brands": "Sonniger, Frico, Flowair",
      "usedIn": [
        "S-C-17"
      ]
    },
    {
      "id": "P-C-22",
      "group": "Ventilație și recuperare",
      "name": "Tubulatură de ventilație și grile",
      "descriptionShort": "Distribuția aerului în încăperi.",
      "selectionCriteria": "Diametru, material, izolație, grile reglabile.",
      "priceMinRON": 30,
      "priceAvgRON": 60,
      "priceMaxRON": 120,
      "priceBasis": "echipament / material",
      "priceUnit": "m",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0257",
      "brands": "Vents, Systemair, Lindab",
      "usedIn": [
        "S-C-05",
        "S-C-07",
        "S-C-19",
        "S-C-24"
      ]
    },
    {
      "id": "P-C-23",
      "group": "Ventilație și recuperare",
      "name": "Ventilator de extracție pe canal",
      "descriptionShort": "Extracție pentru bucătării și spații tehnice.",
      "selectionCriteria": "Debit, presiune, zgomot.",
      "priceMinRON": 300,
      "priceAvgRON": 700,
      "priceMaxRON": 1800,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0260",
      "brands": "Vents, Systemair, Soler & Palau",
      "usedIn": [
        "S-C-20"
      ]
    },
    {
      "id": "P-C-24",
      "group": "Calitatea aerului",
      "name": "Dezumidificator",
      "descriptionShort": "Reduce umiditatea aerului.",
      "selectionCriteria": "Litri pe zi, suprafață, evacuare condens.",
      "priceMinRON": 700,
      "priceAvgRON": 1300,
      "priceMaxRON": 3000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0261",
      "brands": "De'Longhi, Meaco, Trotec",
      "usedIn": [
        "S-C-21"
      ]
    },
    {
      "id": "P-C-25",
      "group": "Calitatea aerului",
      "name": "Umidificator",
      "descriptionShort": "Crește umiditatea aerului uscat.",
      "selectionCriteria": "Tip (ultrasonic, evaporativ), rezervor, suprafață.",
      "priceMinRON": 200,
      "priceAvgRON": 500,
      "priceMaxRON": 1500,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0264",
      "brands": "Philips, Boneco, Beurer",
      "usedIn": [
        "S-C-21"
      ]
    },
    {
      "id": "P-C-26",
      "group": "Automatizări și control",
      "name": "Controller central / telecomandă cablată",
      "descriptionShort": "Comandă unitară pentru mai multe unități.",
      "selectionCriteria": "Compatibilitate, număr de unități, programare.",
      "priceMinRON": 300,
      "priceAvgRON": 800,
      "priceMaxRON": 3000,
      "priceBasis": "echipament / material",
      "priceUnit": "buc",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0267",
      "brands": "Daikin, Mitsubishi Electric, LG, Samsung",
      "usedIn": [
        "S-C-06",
        "S-C-15"
      ]
    },
    {
      "id": "P-C-27",
      "group": "Trasee și accesorii",
      "name": "Agent frigorific R32 / R410A",
      "descriptionShort": "Încărcare și completare circuite frigorifice.",
      "selectionCriteria": "Tip agent compatibil, cantitate, manipulare certificată F-gaze.",
      "priceMinRON": 80,
      "priceAvgRON": 150,
      "priceMaxRON": 300,
      "priceBasis": "echipament / material",
      "priceUnit": "kg",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0268",
      "brands": "Chemours, Honeywell, Daikin",
      "usedIn": [
        "S-C-09",
        "S-C-10",
        "S-C-11",
        "S-C-12",
        "S-C-25"
      ]
    },
    {
      "id": "P-C-28",
      "group": "Service și igienizare",
      "name": "Filtre și consumabile pentru aer condiționat",
      "descriptionShort": "Filtre de schimb și soluții de igienizare.",
      "selectionCriteria": "Model compatibil, tip filtru.",
      "priceMinRON": 40,
      "priceAvgRON": 100,
      "priceMaxRON": 250,
      "priceBasis": "echipament / material",
      "priceUnit": "set",
      "priceSource": "Estimare orientativă nov. 2026 (repere: Hornbach, Altex, eMAG, brig.ro, instalatori București) — de validat",
      "entityId": "ENT-C4322-0270",
      "brands": "Daikin, Mitsubishi Electric, Gree, LG",
      "usedIn": [
        "S-C-08",
        "S-C-09"
      ]
    }
  ],
  "sharedRefs": {
    "services": [
      "S-I-11"
    ],
    "products": [
      "P-I-02"
    ]
  },
  "notes": "Catalog etalon sectorial; serviciile și produsele concrete ale firmei sunt confirmate individual. Nu reprezintă stoc, ofertă contractuală ori certificare.",
  "dictionarySession": "0006H"
};
export default etalon;
