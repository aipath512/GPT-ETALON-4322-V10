/* C4322B FAQ knowledge base: one source shared by the visible FAQ page and assistant. */
(function(global){
  'use strict';
  const norm=s=>String(s||'').toLocaleLowerCase('ro-RO').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const items=[];
  const add=(category,question,answer,sourceId='')=>items.push({id:'FAQ-'+String(items.length+1).padStart(3,'0'),category,question,answer,sourceId});
  for(const s of SERVICES){
    const n=s.name;
    const c='Servicii · '+famNames[s.family];
    add(c,'Ce presupune serviciul „'+n+'”?',s.summary,s.id);
    add(c,'Ce lucrări pot fi incluse la „'+n+'”?',s.scope+' Lista exactă a operațiunilor se stabilește după evaluare și se confirmă în deviz.',s.id);
    add(c,'Când poate fi necesar serviciul „'+n+'”?',s.when+' Evaluarea la fața locului stabilește dacă această intervenție este potrivită.',s.id);
    add(c,'Cât costă serviciul „'+n+'”?','Prețul nu este confirmat în acest catalog demonstrativ. Cere un deviz scris, cu manoperă, materiale, TVA, eventuală deplasare și excluderi.',s.id);
    add(c,'Cum cer o ofertă pentru serviciul „'+n+'”?','Deschide pagina Ofertă, indică „'+n+'”, localitatea, problema și condițiile de acces. Oferta reală depinde de verificarea situației și a prestatorului.',s.id);
  }
  for(const p of PRODUCTS){
    const n=p.name,c='Produse · '+famNames[p.family];
    add(c,'Ce este produsul „'+n+'”?',p.description,p.id);
    add(c,'Cum aleg produsul „'+n+'”?',p.choose+' Confirmă specificațiile și compatibilitatea cu un specialist înainte de comandă.',p.id);
    add(c,'La ce trebuie să fiu atent înainte de achiziția „'+n+'”?',p.choose+' Solicită marca, modelul, fișa tehnică, condițiile de instalare și garanția.',p.id);
    add(c,'Care este prețul pentru „'+n+'”?','Catalogul nu include prețuri, stocuri sau mărci confirmate. Solicită o ofertă datată cu modelul exact, prețul final și condițiile de livrare.',p.id);
    add(c,'Cum solicit „'+n+'” într-o ofertă?','Menționează „'+n+'” și destinația de utilizare în formularul demonstrativ de pe pagina Ofertă. Disponibilitatea și compatibilitatea trebuie confirmate.',p.id);
  }
  const general=[
    ['Este C4322B o firmă reală?','Nu. C4322B este un etalon demonstrativ, fără identitate juridică, autorizații și prestări comerciale confirmate.'],
    ['Cum găsesc lista de servicii?','Deschide pagina Servicii și caută după denumire, cuvinte-cheie sau descrierea problemei.'],
    ['Cum găsesc un produs?','Deschide pagina Produse și folosește căutarea sau filtrul pe familie.'],
    ['Ce familii de servicii există?','Catalogul este organizat în Încălzire, Climatizare și Sanitare.'],
    ['Câte servicii sunt în catalog?','Catalogul demonstrativ conține 46 de fișe de servicii.'],
    ['Câte produse sunt în catalog?','Catalogul demonstrativ conține 49 de fișe de produse.'],
    ['Pot cere o ofertă online?','Poți pregăti o cerere demonstrativă din pagina Ofertă, pe care o copiezi sau o trimiți din aplicația de email. Nu există procesare automată a comenzilor.'],
    ['Prețurile de pe site sunt ferme?','Nu. Nu sunt publicate prețuri contractuale confirmate; solicită o ofertă scrisă.'],
    ['Există stocuri confirmate?','Nu. Acest catalog descrie familii de produse, fără stoc sau disponibilitate verificate.'],
    ['Sunt confirmate autorizațiile firmei?','Nu. Nu sunt revendicate autorizații ISCIR, ANRE ori certificări pentru o firmă reală.'],
    ['Cine execută lucrările care necesită autorizare?','Într-un contract real, numai persoanele sau operatorii autorizați pentru activitatea reglementată. Verifică documentele înainte de lucrare.'],
    ['Ce fac dacă miroase a gaz?','Îndepărtează-te într-un loc sigur, evită acționarea întrerupătoarelor și contactează operatorul competent pentru urgențe. Site-ul nu gestionează incidente.'],
    ['Se oferă garanție pentru manoperă?','Condițiile, durata și excluderile trebuie confirmate în contractul cu prestatorul efectiv.'],
    ['Garanția produsului este aceeași cu garanția montajului?','Nu neapărat. Sunt obligații potențial diferite, stabilite de furnizor și prestator, conform contractului și legii aplicabile.'],
    ['Cum pregătesc o cerere de ofertă corectă?','Descrie problema, localitatea, echipamentul, suprafețele relevante, accesul și termenul dorit; cere detalierea materialelor și manoperei.'],
    ['Se poate face diagnostic la distanță prin asistent?','Nu. Asistentul oferă informații orientative din catalog; nu înlocuiește o inspecție tehnică sau un specialist autorizat.'],
    ['Asistentul folosește inteligență artificială generativă?','În această versiune demonstrativă, asistentul folosește reguli și baza locală de întrebări-răspunsuri, fără model generativ conectat.'],
    ['Pot folosi asistentul în orice moment?','Interfața locală a asistentului poate fi accesată în orice moment cât site-ul este disponibil; aceasta nu garantează asistență umană.'],
    ['Pot verifica fiecare răspuns al asistentului?','Da. Aceleași răspunsuri sunt publicate în pagina FAQ, cu referință la fișa serviciului sau produsului când este cazul.'],
    ['Pot filtra întrebările după domeniu?','Da. FAQ permite filtrarea între servicii, produse și întrebări generale, plus căutare text.'],
    ['Datele prezentate sunt oferte comerciale?','Nu. Sunt conținut demonstrativ și nu constituie promisiuni contractuale.'],
    ['Pot solicita intervenții de urgență aici?','Nu există un serviciu real de intervenții confirmat. În urgențe, contactează furnizorii sau autoritățile competente.'],
    ['Cum pot verifica politica de confidențialitate?','Consultă pagina Legal, secțiunile Confidențialitate, GDPR și Cookies.'],
    ['Cum pot verifica disponibilitatea într-o localitate?','Aria efectivă de acoperire nu este verificată pentru firma-model. Ea trebuie confirmată de prestatorul real.'],
    ['Ce informații trebuie să conțină devizul?','Solicită identificarea prestatorului, manopera, materialele, cantitățile, TVA, deplasarea, termenul, garanția, plățile și excluderile.']
  ];
  for(const [q,a] of general)add('General',q,a);
  if(items.length!==500)throw new Error('FAQ corpus must contain exactly 500 Q&A: '+items.length);
  const tokenize=s=>new Set(norm(s).split(' ').filter(t=>t.length>3&&!['este','care','pentru','acest','aceasta','serviciul','produsul','cum','cat','sunt','poate','despre','vreau','doresc'].includes(t)));
  function search(query,options={}){
    const q=norm(query),tokens=tokenize(query),limit=options.limit||5;
    if(!q)return items.slice(0,limit);
    return items.map(x=>{
      const text=norm(x.question),a=norm(x.answer),name=x.sourceId?(x.question.match(/„([^”]+)”/)||[])[1]||'':'';
      const nt=norm(name);let score=0;
      if(q===text)score+=1000;
      if(text.includes(q))score+=75;
      if(nt&&q.includes(nt))score+=65;
      for(const t of tokens){if(text.includes(t))score+=11;if(nt.includes(t))score+=7;if(a.includes(t))score+=1}
      return {x,score};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.x);
  }
  global.C4322FAQ={items,search,normalize:norm};
})(typeof window==='undefined'?globalThis:window);
