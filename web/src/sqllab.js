/* ================= SQL-LABOR =================
   Echte Abfragen auf der Kanzlei-Datenbank (SQLite im Browser über sql.js, selbst gehostet unter vendor/sqljs).
   Jeder Prüflauf startet mit frischen Daten. Vergleich: Ergebnis deiner Abfrage gegen das der Musterlösung. */
const SQL_TASKS=[];SQLLAB.levels.forEach((lv,li)=>lv.tasks.forEach((t,ti)=>{t.lv=lv;t.li=li;t.ti=ti;SQL_TASKS.push(t);}));
const SQL_BY=Object.fromEntries(SQL_TASKS.map(t=>[t.id,t]));
const SQL_LV=Object.fromEntries(SQLLAB.levels.map(l=>[l.id,l]));
const SQL_LINK={sql1:['l1','l3'],sql2:['l2','l4'],sql3:['l5','l6'],sql4:['l4','l7']};
/* Tabellenübersicht ohne Datenbank: aus dem Schema gelesen */
const SQL_TABLES=[...SQLLAB.schema.matchAll(/CREATE TABLE (\w+) \(\n([\s\S]*?)\n\);/g)].map(m=>{
  const lines=m[2].split('\n').map(s=>s.trim().replace(/,$/,''));
  const pk=(lines.find(s=>/^PRIMARY KEY \(/.test(s))||'').replace(/^PRIMARY KEY \(|\)$/g,'').split(/,\s*/);
  const cols=lines.filter(s=>!/^PRIMARY KEY \(/.test(s)).map(s=>{const p=s.split(/\s+/);const fk=(s.match(/REFERENCES (\w+)/)||[])[1];
    return {n:p[0],ty:p[1],pk:/PRIMARY KEY/.test(s)||pk.includes(p[0]),fk};});
  return {name:m[1],cols};});
const sqlDone=id=>!!(S.sql[id]&&S.sql[id].ok);
const sqlCount=()=>SQL_TASKS.filter(t=>sqlDone(t.id)).length;
const sqlNext=lv=>(lv?SQL_LV[lv].tasks:SQL_TASKS).find(t=>!sqlDone(t.id))||(lv?SQL_LV[lv].tasks[0]:null);

let sqlP=null;
function sqlEngine(){
  if(!sqlP)sqlP=new Promise((res,rej)=>{
    const go=()=>window.initSqlJs({locateFile:f=>'vendor/sqljs/'+f}).then(res,rej);
    if(window.initSqlJs){go();return;}
    const s=document.createElement('script');s.src='vendor/sqljs/sql-wasm.js';s.onload=go;s.onerror=()=>rej(new Error('Datenbank-Modul nicht geladen'));
    document.head.appendChild(s);}).catch(e=>{sqlP=null;throw e;});
  return sqlP;}
function sqlDb(SQL){const db=new SQL.Database();
  const part=i=>v=>{const m=v==null?null:String(v).match(/^(\d{4})-(\d{2})-(\d{2})/);return m?+m[i]:null;};
  /* wie in der Prüfung (MySQL-Stil), damit YEAR(Datum) usw. funktionieren */
  db.create_function('YEAR',part(1));db.create_function('MONTH',part(2));db.create_function('DAY',part(3));
  db.create_function('CURDATE',()=>today());db.create_function('NOW',()=>today()+' '+new Date().toTimeString().slice(0,8));
  db.exec(SQLLAB.schema);return db;}
function sqlExec(db,code){const r=db.exec(code);return r.length?r[r.length-1]:null;}
const sqlNv=v=>{if(v==null)return '∅';const s=String(v).trim();if(typeof v==='number'||/^-?\d+(\.\d+)?$/.test(s))return String(Math.round(Number(v)*100)/100);return s;};
function sqlCmp(got,exp,order){
  if(!got&&exp)return {ok:false,msg:'Deine Anweisung liefert keine Ergebnistabelle. Fehlt das SELECT?'};
  if(!exp)return {ok:!got||!got.values.length};
  const gc=got.columns.length,ec=exp.columns.length;
  if(gc!==ec)return {ok:false,msg:`Du gibst ${gc} Spalte${gc===1?'':'n'} aus, gesucht ${ec===1?'ist':'sind'} ${ec}.`+(gc>ec?' Nur die verlangten Spalten auswählen.':'')};
  if(got.values.length!==exp.values.length)return {ok:false,msg:`Du hast ${got.values.length} Zeile${got.values.length===1?'':'n'}, erwartet ${exp.values.length===1?'ist':'sind'} ${exp.values.length}.`+(got.values.length>exp.values.length?' Filter (WHERE, HAVING, DISTINCT) prüfen.':' Zu streng gefiltert, oder fehlt ein LEFT JOIN?')};
  const exact=r=>r.map(sqlNv).join('\u0001'),loose=r=>r.map(sqlNv).sort().join('\u0001');
  const same=k=>{const a=got.values.map(k),b=exp.values.map(k);return [a.slice().sort().join('\n')===b.slice().sort().join('\n'),a.join('\n')===b.join('\n')];};
  let [set,seq]=same(exact),note='';
  if(!set){[set,seq]=same(loose);if(set)note=' Die Spalten stehen in anderer Reihenfolge, das ist okay.';}
  if(!set)return {ok:false,msg:'Spalten und Zeilenzahl stimmen, aber nicht alle Werte. Filter, JOIN-Bedingung und Berechnung prüfen.'};
  if(order&&!seq)return {ok:false,msg:'Die richtigen Zeilen, aber in falscher Reihenfolge. ORDER BY und ASC/DESC prüfen.'};
  return {ok:true,msg:note};}
function sqlErr(e){const m=String(e&&e.message||e);
  const tr=[[/no such column: (\S+)/,'Die Spalte $1 gibt es nicht. Tippfehler oder fehlender Tabellen-Alias?'],
    [/no such table: (\S+)/,'Die Tabelle $1 gibt es nicht. Schau in die Tabellenübersicht.'],
    [/no such function: (\S+)/,'Die Funktion $1 kennt die Datenbank nicht.'],
    [/near "(.+?)": syntax error/,'Syntaxfehler bei „$1“. Komma, Klammer, Anführungszeichen oder Schlüsselwort prüfen.'],
    [/incomplete input/,'Die Anweisung ist unvollständig. Fehlt eine schließende Klammer oder ein Anführungszeichen?'],
    [/ambiguous column name: (\S+)/,'Die Spalte $1 gibt es in mehreren Tabellen. Schreib den Alias davor, z. B. m.$1.'],
    [/misuse of aggregate/,'Aggregatfunktion an der falschen Stelle. Bedingungen auf SUM, COUNT usw. gehören ins HAVING, nicht ins WHERE.'],
    [/FOREIGN KEY constraint failed/,'Fremdschlüssel verletzt: Der Wert verweist auf einen Datensatz, den es nicht gibt, oder der Datensatz wird noch gebraucht.'],
    [/UNIQUE constraint failed: (\S+)/,'Den Schlüsselwert in $1 gibt es schon.'],
    [/NOT NULL constraint failed: (\S+)/,'$1 darf nicht leer sein.'],
    [/(table|view|index) (\S+) already exists/,'$2 gibt es schon.'],
    [/(\d+) values for (\d+) columns/,'$1 Werte für $2 Spalten: Anzahl der Werte und Spalten muss gleich sein.'],
    [/has (\d+) columns but (\d+) values were supplied/,'Die Tabelle hat $1 Spalten, du lieferst $2 Werte.']];
  for(const [r,t] of tr)if(r.test(m))return {de:m.match(r)[0].replace(r,t),raw:m};
  return {de:'Die Datenbank meldet einen Fehler.',raw:m};}
const sqlCell=v=>v==null?'<td class="null">NULL</td>':`<td${typeof v==='number'?' class="n"':''}>${esc(typeof v==='number'&&!Number.isInteger(v)?Math.round(v*100)/100:v)}</td>`;
function sqlTable(r,cap){
  if(!r)return `<p class="small muted">${cap||'Keine Ergebnistabelle.'}</p>`;
  return `<div class="sqlres"><table><thead><tr>${r.columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${r.values.slice(0,200).map(row=>`<tr>${row.map(sqlCell).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="small muted num">${r.values.length} Zeile${r.values.length===1?'':'n'}${r.values.length>200?' (200 angezeigt)':''}${cap?' · '+esc(cap):''}</p>`;}
function sqlSchemaHtml(stat){
  const tn=t=>stat?`<b class="sqltn">${esc(t.name)}</b>`:`<button class="sqltn" data-tbl="${t.name}" title="Daten ansehen">${esc(t.name)}</button>`;
  const cn=c=>stat?`<span class="col ${c.pk?'pk':''}">${esc(c.n)}</span>`:`<button data-ins="${c.n}" class="${c.pk?'pk':''}">${esc(c.n)}</button>`;
  return `<div class="sqltabs">${SQL_TABLES.map(t=>`<div class="sqltab">${tn(t)}
    <ul>${t.cols.map(c=>`<li>${cn(c)}${c.fk?`<span class="fk">→ ${esc(c.fk)}</span>`:''}</li>`).join('')}</ul></div>`).join('')}</div>
    <p class="small muted">${stat?'':'Tabellenname antippen zeigt die Daten, Spaltenname fügt ihn ein. '}<u>Unterstrichen</u> = Primärschlüssel, → = Fremdschlüssel.</p>`;}
const SQL_KW=['SELECT','*','FROM','WHERE','AND','OR','=',"'…'",'JOIN','LEFT JOIN','ON','GROUP BY','HAVING','ORDER BY','DESC','COUNT(*)','SUM(','AVG(','MAX(','MIN(','DISTINCT','LIKE','IS NULL','IN (',')',',',';'];
function sqlEditor(val){
  return `<div class="sqled"><label class="sr" for="sqlIn">SQL-Anweisung</label>
    <textarea id="sqlIn" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="SELECT …">${esc(val||'')}</textarea>
    <div class="kw" role="toolbar" aria-label="Bausteine einfügen">${SQL_KW.map(k=>`<button data-kw="${esc(k)}">${esc(k)}</button>`).join('')}</div></div>`;}
function sqlBindEditor(root,onRun,onInput){
  const ta=$('#sqlIn',root);
  const ins=txt=>{const s=ta.selectionStart,e=ta.selectionEnd,v=ta.value;
    if(txt==="'…'"){ta.setRangeText("''",s,e,'end');ta.selectionStart=ta.selectionEnd=s+1;}
    else{const pre=s>0&&!/[\s(]$/.test(v.slice(0,s))&&!/^[),;]/.test(txt)?' ':'';const post=/[(]$/.test(txt)?'':' ';ta.setRangeText(pre+txt+post,s,e,'end');}
    ta.focus();onInput&&onInput();};
  root.querySelectorAll('[data-kw]').forEach(b=>b.addEventListener('click',()=>ins(b.dataset.kw)));
  root.querySelectorAll('[data-ins]').forEach(b=>b.addEventListener('click',()=>ins(b.dataset.ins)));
  ta.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();onRun();}
    else if(e.key==='Tab'&&!e.shiftKey){e.preventDefault();ta.setRangeText('  ',ta.selectionStart,ta.selectionEnd,'end');}});
  if(onInput)ta.addEventListener('input',onInput);
  return ta;}
function sqlLoading(out){out.innerHTML='<p class="small muted">Datenbank wird geladen …</p>';}
function sqlLoadFail(out,e){out.innerHTML=`<div class="sqlmsg bad"><b>Die Datenbank konnte nicht starten.</b><span>Bitte Seite neu laden. Läuft es dann immer noch nicht, blockiert dein Browser WebAssembly.</span><small>${esc(String(e&&e.message||e))}</small></div>`;}

function renderSql(){
  const id=R.id;
  if(id==='frei')return sqlPlayground();
  if(SQL_LV[id]){const t=sqlNext(id);nav('#/sql/'+t.id);return;}
  if(SQL_BY[id])return sqlTask(SQL_BY[id]);
  const n=sqlCount(),nx=sqlNext();
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>SQL-Labor</h1><p class="muted">Echte Abfragen auf einer Kanzlei-Datenbank, direkt im Browser. Jeder Lauf startet mit frischen Daten, kaputt machen kannst du nichts.</p></div>
    <div class="sqlhero card"><div class="stack"><span class="small muted">Geschafft</span><b class="num sqlbig">${n} / ${SQL_TASKS.length}</b><span class="rs-bar"><i style="width:${n/SQL_TASKS.length*100}%"></i></span></div>
      <div class="row wrap"><button class="btn" data-href="#/sql/${nx?nx.id:SQL_TASKS[0].id}">${I.play} ${n?'Weiter':'Loslegen'}${nx?': '+esc(nx.t):''}</button><button class="btn ghost" data-href="#/sql/frei">Freie Spielwiese</button></div></div>
    ${SQLLAB.levels.map((lv,li)=>{const k=lv.tasks.filter(t=>sqlDone(t.id)).length;return `<section class="stack">
      <div class="sqlhd"><h2>${li+1} · ${esc(lv.t)}</h2><span class="chip ${k===lv.tasks.length?'ok':''} num">${k}/${lv.tasks.length}</span></div>
      <p class="small muted">${esc(lv.sub)}</p>
      <div class="sqlgrid">${lv.tasks.map((t,ti)=>`<button class="sqlt ${sqlDone(t.id)?'done':''}" data-href="#/sql/${t.id}"><span class="pi">${sqlDone(t.id)?'✓':ti+1}</span><span>${esc(t.t)}</span></button>`).join('')}</div></section>`;}).join('')}
    <details class="card"><summary><b>Die Tabellen der Kanzlei</b></summary>${sqlSchemaHtml(true)}</details>
  </div>`));
  bindCommon();}

function sqlTask(t){
  const st=S.sql[t.id]||{};const lv=t.lv;const idx=SQL_TASKS.indexOf(t);const prev=SQL_TASKS[idx-1],next=SQL_TASKS[idx+1];
  let fails=0,engine=null;
  view.replaceChildren(h(`<div class="stack sqlpage">
    <div class="row"><button class="iconbtn" data-href="#/sql" aria-label="Zur Übersicht">${I.back}</button>
      <div><span class="small muted">Level ${t.li+1} · ${esc(lv.t)} · Aufgabe ${t.ti+1}/${lv.tasks.length}</span><h1>${esc(t.t)} ${sqlDone(t.id)?'<span class="chip ok">gelöst</span>':''}</h1></div></div>
    <div class="sqlwrap"><div class="stack">
      <div class="card stack"><p class="sq-q">${esc(t.q)}</p>${t.order?'<p class="small muted">Die Reihenfolge der Zeilen wird geprüft.</p>':''}
        ${lv.note&&t.ti===0?`<p class="small sqlnote">${esc(lv.note)}</p>`:''}
        <div class="row wrap"><button class="btn ghost sm" id="hintB">Tipp</button><button class="btn ghost sm" id="expB">Erwartetes Ergebnis</button><button class="btn ghost sm" id="solB" ${sqlDone(t.id)?'':'hidden'}>Musterlösung</button></div>
        <div id="hintBox"></div></div>
      ${sqlEditor(st.q)}
      <div class="row wrap"><button class="btn" id="runB">${I.play} Ausführen und prüfen</button><span class="small muted kbd">Strg + Enter</span></div>
      <div id="sqlOut" aria-live="polite"></div>
      <div class="row sqlnav">${prev?`<button class="btn ghost sm" data-href="#/sql/${prev.id}">← ${esc(prev.t)}</button>`:'<span></span>'}${next?`<button class="btn ghost sm" data-href="#/sql/${next.id}">${esc(next.t)} →</button>`:'<button class="btn ghost sm" data-href="#/sql">Übersicht</button>'}</div>
    </div>
    <aside class="card sqlside"><h3>Tabellen</h3>${sqlSchemaHtml()}</aside></div>
  </div>`));
  bindCommon();
  const out=$('#sqlOut'),box=$('#hintBox');
  let dt=null;const persist=()=>{clearTimeout(dt);dt=setTimeout(()=>{const o=S.sql[t.id]||(S.sql[t.id]={});o.q=ta.value.slice(0,1500);save();},700);};
  const ta=sqlBindEditor(view,run,persist);
  $('#runB').addEventListener('click',run);
  const eng=()=>engine?Promise.resolve(engine):(sqlLoading(out),sqlEngine().then(E=>engine=E));
  $('#hintB').addEventListener('click',()=>{box.innerHTML=`<p class="sqlhint">${esc(t.hint)}</p>`;});
  $('#solB').addEventListener('click',()=>{box.innerHTML=`<pre class="model pre">${esc(t.sol)}</pre><button class="btn ghost sm" id="useSol">In den Editor übernehmen</button>`;
    $('#useSol').addEventListener('click',()=>{ta.value=t.sol;persist();ta.focus();});});
  $('#expB').addEventListener('click',()=>eng().then(E=>{const db=sqlDb(E);try{db.exec(t.sol);const r=t.check?sqlExec(db,t.check[0]):sqlExec(db,t.sol);
      box.innerHTML=`<p class="small muted">${t.check?'So soll es danach aussehen:':'So soll dein Ergebnis aussehen:'}</p>`+sqlTable(r);}finally{db.close();}}).catch(e=>sqlLoadFail(out,e)));
  view.querySelectorAll('[data-tbl]').forEach(b=>b.addEventListener('click',()=>eng().then(E=>{const db=sqlDb(E);try{out.innerHTML=`<p class="small muted">Tabelle ${esc(b.dataset.tbl)} (Startdaten):</p>`+sqlTable(sqlExec(db,'SELECT * FROM '+b.dataset.tbl));}finally{db.close();}}).catch(e=>sqlLoadFail(out,e))));
  function run(){
    const code=ta.value.trim();if(!code){toast('Erst eine SQL-Anweisung schreiben');ta.focus();return;}
    eng().then(E=>{
      const mine=sqlDb(E),ref=sqlDb(E);let res,shown,info='';
      try{
        try{shown=sqlExec(mine,code);if(t.check)info=mine.getRowsModified()+' Zeile(n) betroffen';}
        catch(e){fails++;const x=sqlErr(e);out.innerHTML=`<div class="sqlmsg bad"><b>${esc(x.de)}</b><small>${esc(x.raw)}</small></div>`;if(fails>=2)$('#solB').hidden=false;return;}
        if(t.check){ref.exec(t.sol);res={ok:true};let after=null;
          for(const q of t.check){const a=sqlExec(mine,q),b=sqlExec(ref,q);after=after||a;const c=sqlCmp(a,b,true);if(!c.ok){res={ok:false,msg:'Das Ergebnis in der Datenbank stimmt noch nicht. Bedingung (WHERE), Werte und Spalten prüfen.'};break;}}
          shown=after;}
        else res=sqlCmp(shown,sqlExec(ref,t.sol),!!t.order);
      }finally{mine.close();ref.close();}
      const first=!sqlDone(t.id);
      if(res.ok){const o=S.sql[t.id]||(S.sql[t.id]={});o.ok=1;o.q=code.slice(0,1500);if(first)gain(10);else save();$('#solB').hidden=false;}
      else{fails++;if(fails>=2)$('#solB').hidden=false;}
      out.innerHTML=`<div class="sqlmsg ${res.ok?'ok':'bad'}"><b>${res.ok?'Richtig ✓':'Noch nicht'}</b><span>${esc(res.msg||'')}</span></div>`
        +sqlTable(shown,t.check?(info+(shown?' · so sieht die Tabelle danach aus':'')):'')
        +(res.ok&&next?`<button class="btn" id="nxB">Nächste Aufgabe: ${esc(next.t)} →</button>`:'')
        +(res.ok&&!next?`<button class="btn" data-href="#/sql">Alle Aufgaben geschafft · Übersicht</button>`:'');
      bindCommon(out);const nb=$('#nxB');if(nb)nb.addEventListener('click',()=>nav('#/sql/'+next.id));
      if(res.ok)renderSide();
      out.scrollIntoView({behavior:'smooth',block:'nearest'});
    }).catch(e=>sqlLoadFail(out,e));}
}

function sqlPlayground(){
  let engine=null,db=null;
  view.replaceChildren(h(`<div class="stack sqlpage">
    <div class="row"><button class="iconbtn" data-href="#/sql" aria-label="Zur Übersicht">${I.back}</button><div><h1>Freie Spielwiese</h1><span class="small muted">Alles ausprobieren. Änderungen bleiben, bis du die Daten zurücksetzt.</span></div></div>
    <div class="sqlwrap"><div class="stack">
      ${sqlEditor(S.sqlFree||'SELECT m.Name, COUNT(a.AuftragID) AS Auftraege\nFROM Mandant m\nLEFT JOIN Auftrag a ON a.MandantID = m.MandantID\nGROUP BY m.MandantID, m.Name;')}
      <div class="row wrap"><button class="btn" id="runB">${I.play} Ausführen</button><button class="btn ghost" id="resetB">Daten zurücksetzen</button><span class="small muted kbd">Strg + Enter</span></div>
      <div id="sqlOut" aria-live="polite"></div></div>
    <aside class="card sqlside"><h3>Tabellen</h3>${sqlSchemaHtml()}</aside></div></div>`));
  bindCommon();
  const out=$('#sqlOut');let dt=null;
  const ta=sqlBindEditor(view,run,()=>{clearTimeout(dt);dt=setTimeout(()=>{S.sqlFree=ta.value.slice(0,3000);save();},800);});
  const ready=()=>db?Promise.resolve(db):(sqlLoading(out),sqlEngine().then(E=>{engine=E;db=sqlDb(E);return db;}));
  cleanup=()=>{if(db){db.close();db=null;}};
  $('#runB').addEventListener('click',run);
  $('#resetB').addEventListener('click',()=>{if(db){db.close();db=null;}out.innerHTML='<p class="small muted">Startdaten wiederhergestellt.</p>';});
  view.querySelectorAll('[data-tbl]').forEach(b=>b.addEventListener('click',()=>ready().then(d=>{out.innerHTML=`<p class="small muted">Tabelle ${esc(b.dataset.tbl)}:</p>`+sqlTable(sqlExec(d,'SELECT * FROM '+b.dataset.tbl));}).catch(e=>sqlLoadFail(out,e))));
  function run(){const code=ta.value.trim();if(!code)return;
    ready().then(d=>{try{const r=sqlExec(d,code);out.innerHTML=r?sqlTable(r):`<div class="sqlmsg ok"><b>Ausgeführt</b><span>${d.getRowsModified()} Zeile(n) betroffen.</span></div>`;}
      catch(e){const x=sqlErr(e);out.innerHTML=`<div class="sqlmsg bad"><b>${esc(x.de)}</b><small>${esc(x.raw)}</small></div>`;}}).catch(e=>sqlLoadFail(out,e));}
}
