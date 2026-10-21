(function(){
'use strict';
const LESSONS=[...L_GA2,...L_GA1,...L_WISO,...L_NEU_A,...L_NEU_B,...L_NEU_C,...L_NEU_D];
const ORDER=['technik','pseudo1','sql1','sql2','klasse','erm','test','pseudo3','sql4','ausbildung','arbeitsrecht','sozial','betrieb_org','umlv','ui','anforderung','sec2','qs','db2','vorgehen','security','pseudo2','sql3','unternehmen','patterns','rest','quali','projekt','architektur','betrieb','wirtschaft','beruf_recht'];
const BY=Object.fromEntries(LESSONS.map(l=>[l.id,l]));
LESSONS.forEach(l=>l.quiz.forEach((q,i)=>{q._k=l.id+':'+i;q._l=l.id;}));
const CLIPS=Object.assign({},CLIPS_GA2,CLIPS_GA1,CLIPS_WISO,CLIPS_NEU_A,CLIPS_NEU_B,CLIPS_NEU_C,CLIPS_NEU_D);
WISO_BANK.forEach((q,i)=>{q._k='bank:'+i;q._l=null;});
const CASES=[...CASES_GA1,...CASES_GA1B,...CASES_GA2,...CASES_GA2B];
const areaOf=q=>q._l?BY[q._l].area:'WISO';
LESSONS.forEach(l=>{if(CLIPS[l.id])l.clip2=CLIPS[l.id];});
const EXAM=new Date('2026-11-25T08:00:00+01:00');
const PLAN_END=new Date('2026-11-15T12:00:00+01:00');
const AREA={GA2:'GA2 Algorithmen',GA1:'GA1 Planen',WISO:'WiSo'};
const DAY=864e5;

/* ---------- state ---------- */
const LS='ap2crashkurs.v1';
const fresh=()=>({v:1,updatedAt:0,xp:0,days:{},lessons:{},review:{},writes:{},sound:true,rate:1,planStart:null,cases:{}});
let S=fresh();
try{const raw=localStorage.getItem(LS); if(raw) S=Object.assign(fresh(),JSON.parse(raw));}catch(e){}
if(!S.planStart){S.planStart=today();}
function today(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function L(id){return S.lessons[id]||(S.lessons[id]={clip:false,quizBest:-1,write:{}});}
let remoteRef=null, pushTimer=null, pushing=false, pushAgain=false, syncState='lokal';
function save(){S.updatedAt=Date.now();try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){}schedulePush();}
function schedulePush(){if(!remoteRef)return;clearTimeout(pushTimer);pushTimer=setTimeout(push,2500);}
async function push(){if(!remoteRef)return;if(pushing){pushAgain=true;return;}pushing=true;
  try{await remoteRef.set({json:JSON.stringify(S),updatedAt:S.updatedAt});syncState='gesichert';}catch(e){syncState='lokal';}
  pushing=false;if(pushAgain){pushAgain=false;push();}}
async function connect(){
  try{
    if(!window.claude||!window.claude.use)return false;
    const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    if(!db||!user)return true;
    const uid=await user.id(); if(!uid)return true;
    const ref=db.doc('data/users/'+uid+'/progress');
    const snap=await ref.get();
    if(snap.exists){const d=snap.data();try{const rs=JSON.parse(d.json);if((rs.updatedAt||0)>(S.updatedAt||0)){S=Object.assign(fresh(),rs);try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){}rerender();}}catch(e){}}
    remoteRef=ref;syncState='gesichert';
    if(!snap.exists||(S.updatedAt>((snap.data()||{}).updatedAt||0)))push();
  }catch(e){}
  return true;
}
(async()=>{for(let i=0;i<6;i++){if(await connect())return;await new Promise(r=>setTimeout(r,800));}})();

/* ---------- xp / days ---------- */
function gain(n){S.xp+=n;const t=today();S.days[t]=(S.days[t]||0)+n;save();}
function streak(){let n=0;let d=new Date();if(!S.days[today(d)])d=new Date(d-DAY);while(S.days[today(d)]){n++;d=new Date(d-DAY);}return n;}
function dueReview(){const now=Date.now();return Object.entries(S.review).filter(([k,r])=>r.due<=now&&qByKey(k)).map(([k])=>k);}
function qByKey(k){const [id,i]=k.split(':');if(id==='bank')return WISO_BANK[+i];return BY[id]&&BY[id].quiz[+i];}
function markWrong(k){S.review[k]={box:1,due:Date.now()};}
function markRight(k){const r=S.review[k];if(!r)return;const box=r.box+1;if(box>3){delete S.review[k];}else{S.review[k]={box,due:Date.now()+[0,DAY,3*DAY,6*DAY][box]};}}

/* ---------- progress ---------- */
function lessonPct(id){const s=L(id),l=BY[id];let p=0;if(s.clip)p+=30;if(s.quizBest>=0)p+=40*Math.max(.25,s.quizBest/100);const w=Object.keys(s.write).length;p+=30*Math.min(1,w/l.write.length);return Math.round(p);}
function stepsDone(id){const s=L(id),l=BY[id];return [s.clip,s.quizBest>=0,Object.keys(s.write).length>=l.write.length];}
function areaPct(a){const ls=LESSONS.filter(l=>l.area===a);return Math.round(ls.reduce((x,l)=>x+lessonPct(l.id),0)/ls.length);}
function nextLesson(){for(const id of ORDER){const d=stepsDone(id);if(!d.every(Boolean))return id;}return null;}
function nextStep(id){const d=stepsDone(id);return d[0]?(d[1]?(d[2]?0:2):1):0;}
/* Plan rechnet jeden Tag neu: offene Lektionen werden ab heute gleichmäßig bis 15.11. verteilt */
function planDates(){
  const t0=new Date();t0.setHours(12,0,0,0);
  const end=new Date(Math.max(PLAN_END.getTime(),t0.getTime()));
  const days=Math.max(1,Math.round((end-t0)/DAY)+1);
  const open=ORDER.filter(id=>!stepsDone(id).every(Boolean));
  const dates={};open.forEach((id,i)=>{dates[id]=new Date(t0.getTime()+Math.floor(i*days/open.length)*DAY);});
  return {days,open:open.length,items:ORDER.map(id=>({id,date:dates[id]||null}))};
}
function paceText(p){if(!p.open)return 'Alle Lektionen erledigt.';const r=p.open/p.days;
  if(r>=1)return `${p.open} Lektionen offen, ${p.days} Tage bis 15.11.: etwa ${Math.ceil(r)} pro Tag.`;
  const every=Math.floor(p.days/p.open);return `${p.open} Lektionen offen, ${p.days} Tage bis 15.11.: ${every<=1?'etwa eine pro Tag':'eine alle '+every+' Tage'}.`;}

/* ---------- helpers ---------- */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const view=$('#view');
function h(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content;}
function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),1800);}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const norm=s=>String(s).toLowerCase().replace(/[\s€%]/g,'').replace(/\.$/,'');
const fmtD=d=>d.toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'});
function daysLeft(){return Math.max(0,Math.ceil((EXAM-new Date())/DAY));}
const ICON={
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
 pause:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
 prev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg>',
 next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 5l7 7-7 7"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg>',
 sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
 mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"/></svg>',
 yt:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
};

/* ---------- navigation ---------- */
let tab='heute', screen=null; // screen = {type:'lesson',id,step} | {type:'quiz',...}
let cleanup=null;
function go(t){stopAll();tab=t;screen=null;rerender();window.scrollTo(0,0);}
function stopAll(){if(cleanup){cleanup();cleanup=null;}}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>go(b.dataset.tab)));
function rerender(){
  $('#cd').textContent='noch '+daysLeft()+' Tage';
  const due=dueReview().length;const bd=$('#wdhBadge');bd.hidden=!due;bd.textContent=due;
  document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-current',(!screen&&b.dataset.tab===tab)?'page':'false'));
  if(screen&&screen.type==='lesson')return renderLesson();
  if(screen&&(screen.type==='run'||screen.type==='case'||screen.type==='beleg'))return;
  ({heute:renderHeute,themen:renderThemen,wdh:renderWdh,pruefung:renderPruefung})[tab]();
}

/* ---------- HEUTE ---------- */
function renderHeute(){
  const nid=nextLesson();const t=today();const todayXp=S.days[t]||0;const goal=120;
  const plan=planDates();const due=dueReview().length;const tk=today();
  let nextHtml='';
  if(nid){const l=BY[nid];const st=nextStep(nid);const lbl=['Erklärclip ansehen','Quiz machen','Schreibaufgabe lösen'][st];
    nextHtml=`<div class="card next stack">
      <div class="row between"><span class="eyebrow">Jetzt dran</span><span class="area ${l.area}">${AREA[l.area]}</span></div>
      <h2>${esc(l.title)}</h2>
      <p class="muted small">${esc(l.why)}</p>
      <button class="btn block" data-open="${nid}" data-step="${st}">${lbl} · ca. ${l.mins} Min</button>
    </div>`;}
  else nextHtml=`<div class="card next stack"><span class="eyebrow">Alles durch</span><h2>Alle Lektionen erledigt</h2><p class="muted">Jetzt: Wiederholen und Prüfungssimulation, jeden Tag ein bisschen.</p><button class="btn block" data-go="pruefung">Zur Prüfungssimulation</button></div>`;
  const items=plan.items.slice().sort((a,b)=>(a.date?a.date.getTime():0)-(b.date?b.date.getTime():0));
  const pl=items.map(p=>{const l=BY[p.id];const d=!p.date;const isToday=p.date&&today(p.date)===tk;
    return `<span class="d">${d?'erledigt':(isToday?'<b style="color:var(--ink)">heute</b>':fmtD(p.date))}</span><button class="lrow" style="padding:8px 10px;grid-template-columns:1fr" data-open="${p.id}"><span class="t ${d?'done':''}" style="font-size:.92rem">${esc(l.title)}</span></button><span class="chip ${d?'ok':(isToday?'mark':'')}">${d?'fertig':lessonPct(p.id)+' %'}</span>`;}).join('');
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="hero"><div class="big num">${daysLeft()}<small>Tage</small></div><div class="lbl">bis zur schriftlichen AP2</div><div class="sub">Mi, 25.11.2026 · GA1, GA2 und WiSo an einem Vormittag</div></div>
    <div class="stats">
      <div class="stat"><b>${streak()}</b><span>Tage am Stück</span></div>
      <div class="stat"><b>${S.xp}</b><span>XP gesamt</span></div>
      <div class="stat"><b>${due}</b><span>zum Wiederholen</span></div>
    </div>
    <div class="card stack"><div class="row between"><span class="eyebrow">Tagesziel</span><span class="small num"><b>${Math.min(todayXp,goal)}</b> / ${goal} XP</span></div><div class="bar mark"><i style="width:${Math.min(100,todayXp/goal*100)}%"></i></div><p class="small muted">Eine Lektion komplett bringt rund 120 XP. Das sind etwa 25 bis 30 Minuten.</p></div>
    ${nextHtml}
    ${due?`<button class="btn ghost block" data-go="wdh">${due} falsche Antworten wiederholen</button>`:''}
    <section class="stack"><h3>Stand pro Prüfungsbereich</h3>
      ${['GA2','GA1','WISO'].map(a=>`<div class="stack" style="gap:6px"><div class="row between"><span class="area ${a}">${AREA[a]}</span><span class="small num">${areaPct(a)} %</span></div><div class="bar"><i style="width:${areaPct(a)}%"></i></div></div>`).join('')}
    </section>
    <section class="stack"><div class="stack" style="gap:4px"><h3>Dein Plan bis 15.11.</h3><p class="small muted">${paceText(plan)} Der Plan rechnet sich jeden Tag neu, je nachdem wann du lernst. Danach nur noch Wiederholung.</p></div>
      <div class="plan">${pl}</div>
    </section>
    <p class="small muted">Fortschritt: ${syncState==='gesichert'?'in deinem Konto gesichert':'auf diesem Gerät gespeichert'}.</p>
  </div>`));
  bindCommon();
}
function bindCommon(){
  view.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openLesson(b.dataset.open,b.dataset.step!=null?+b.dataset.step:nextStep(b.dataset.open))));
  view.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
}

/* ---------- THEMEN ---------- */
function renderThemen(){
  const sec=a=>{const ls=ORDER.map(id=>BY[id]).filter(l=>l.area===a).sort((x,y)=>x.prio-y.prio);
    return `<section class="stack"><div class="row between"><h2>${AREA[a]}</h2><span class="small num muted">${areaPct(a)} %</span></div>
    ${ls.map(l=>{const d=stepsDone(l.id);const s=L(l.id);return `<button class="lrow" data-open="${l.id}"><span class="t">${esc(l.title)}</span><span class="pips" aria-label="Schritte erledigt">${d.map(x=>`<span class="pip ${x?'on':''}"></span>`).join('')}</span>
      <span class="meta"><span class="prio p${l.prio}">${['','Muss','Wichtig','Bonus'][l.prio]}</span><span class="small muted">· ${l.mins} Min</span>${s.quizBest>=0?`<span class="chip ${s.quizBest>=50?'ok':'bad'} num">Quiz ${s.quizBest} %</span>`:''}</span></button>`;}).join('')}</section>`;};
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>Themen</h1><p class="muted">Sortiert nach Prüfungsrelevanz. <b>Muss</b> heißt: kam in fast jeder Prüfung dran. Die drei Balken sind Clip, Quiz und Schreiben.</p></div>
    ${sec('GA2')}${sec('GA1')}${sec('WISO')}
  </div>`));
  bindCommon();
}

/* ---------- LESSON ---------- */
function openLesson(id,step){stopAll();screen={type:'lesson',id,step:step||0};rerender();window.scrollTo(0,0);}
function renderLesson(){
  stopAll();
  const l=BY[screen.id];const d=stepsDone(l.id);
  view.replaceChildren(h(`<div class="stack">
    <div class="lhead"><button class="iconbtn" id="back" aria-label="Zurück">${ICON.back}</button><h1>${esc(l.title)}</h1></div>
    <div class="row"><span class="area ${l.area}">${AREA[l.area]}</span><span class="prio p${l.prio}">${['','Muss','Wichtig','Bonus'][l.prio]}</span></div>
    <div class="steps" role="tablist">${['Clip','Quiz','Schreiben'].map((n,i)=>`<button class="step ${d[i]?'done':''}" data-s="${i}" aria-current="${screen.step===i?'step':'false'}"><span class="ck"></span>${i+1}. ${n}</button>`).join('')}</div>
    <div id="body" class="stack"></div>
  </div>`));
  $('#back').addEventListener('click',()=>go(tab));
  view.querySelectorAll('.step').forEach(b=>b.addEventListener('click',()=>{screen.step=+b.dataset.s;renderLesson();}));
  const body=$('#body');
  if(screen.step===0)clipStep(l,body);
  if(screen.step===1)quizStep(l,body);
  if(screen.step===2)writeStep(l,body);
}

/* ----- clip player ----- */
function renderVisual(v){
  const tbl=t=>`<div class="tw"><table><thead><tr>${t[0].map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.slice(1).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if(v.code)return `<pre>${esc(v.code)}</pre>`;
  if(v.list)return `<ul>${v.list.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  if(v.stat)return `<div class="statbig"><span>${esc(v.stat)}</span></div><p class="muted" style="margin-top:10px">${esc(v.sub||'')}</p>`;
  if(v.table)return tbl(v.table)+(v.table2?tbl(v.table2):'');
  return '';
}
function clipStep(l,body){
  body.append(h(`<p class="why"><b>Warum wichtig:</b> ${esc(l.why)}</p><div id="cpRoot"></div><div id="after"></div>
  ${l.videos.length?`<section class="stack"><h3>Mehr dazu auf YouTube</h3><p class="small muted">Optional. Das Quiz fragt den Clip oben ab.</p><div class="vids">${l.videos.map(v=>`<a class="vid" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener"><span class="pl">${ICON.yt}</span><span><b>${esc(v.t)}</b><span>${esc(v.c)}</span></span></a>`).join('')}</div></section>`:''}`));
  cleanup=ClipPlayer.mount($('#cpRoot',body),l,{settings:S,onSettings:save,
    onCheck:ok=>{if(ok)gain(5);},
    onFinish:()=>{const s=L(l.id);if(!s.clip){s.clip=true;gain(20);toast('Clip geschafft · +20 XP');}
      const a=$('#after');a.replaceChildren(h(`<div class="card stack"><h3>Clip durch. Jetzt das Quiz dazu.</h3><button class="btn block" id="toQuiz">Quiz starten</button></div>`));
      $('#toQuiz').addEventListener('click',()=>{screen.step=1;renderLesson();window.scrollTo(0,0);});
      const st=view.querySelector('.step[data-s="0"]');if(st)st.classList.add('done');}});
}

/* ----- Zeichenfläche für Diagramm-Aufgaben ----- */
function sketchPad(host,key){
  const SK='ap2sketch:'+key;let strokes=[];try{strokes=JSON.parse(localStorage.getItem(SK)||'[]');}catch(e){}
  host.innerHTML=`<div class="sk"><div class="sk-tools"><button class="sk-b on" data-t="pen">Stift</button><button class="sk-b" data-t="thin">Fein</button><button class="sk-b" data-t="eraser">Radierer</button><span style="flex:1"></span><button class="sk-b" data-a="undo">Zurück</button><button class="sk-b" data-a="clear">Leeren</button></div><canvas class="sk-c"></canvas><p class="small muted">Mit dem Finger zeichnen. Tipp: Auf Papier geht es genauso, danach mit der Musterlösung vergleichen.</p></div>`;
  const cv=host.querySelector('canvas');const ctx=cv.getContext('2d');let tool='pen';let cur=null;
  function size(){const w=cv.clientWidth;const hgt=Math.round(w*1.1);const dpr=window.devicePixelRatio||1;cv.width=w*dpr;cv.height=hgt*dpr;cv.style.height=hgt+'px';ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function draw(){ctx.clearRect(0,0,cv.width,cv.height);ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.clientWidth,cv.clientHeight);
    for(const s of strokes){ctx.beginPath();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=s.t==='eraser'?'#fff':'#111';ctx.lineWidth=s.t==='eraser'?22:(s.t==='thin'?1.6:3);
      const w=cv.clientWidth;s.p.forEach((pt,i)=>{const x=pt[0]*w,y=pt[1]*w;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();}}
  function pos(e){const r=cv.getBoundingClientRect();const w=cv.clientWidth;return [+((e.clientX-r.left)/w).toFixed(4),+((e.clientY-r.top)/w).toFixed(4)];}
  function persist(){try{localStorage.setItem(SK,JSON.stringify(strokes));}catch(e){}}
  cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);cur={t:tool,p:[pos(e)]};strokes.push(cur);draw();});
  cv.addEventListener('pointermove',e=>{if(!cur)return;cur.p.push(pos(e));draw();});
  const up=()=>{if(cur){cur=null;persist();}};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  host.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>{tool=b.dataset.t;host.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x===b));}));
  host.querySelector('[data-a="undo"]').addEventListener('click',()=>{strokes.pop();persist();draw();});
  const clr=host.querySelector('[data-a="clear"]');clr.addEventListener('click',()=>{if(!clr.dataset.sure){clr.dataset.sure=1;clr.textContent='Sicher?';setTimeout(()=>{delete clr.dataset.sure;clr.textContent='Leeren';},2500);return;}strokes=[];persist();draw();delete clr.dataset.sure;clr.textContent='Leeren';});
  requestAnimationFrame(size);window.addEventListener('resize',size);
}
function diagramImg(id,src){const er=/erDiagram/.test(src||'');return `<figure class="dg"><img src="diagrams/${id}.png" alt="Gezeichnete Musterlösung" loading="lazy"><figcaption class="small muted">Gezeichnete Musterlösung${er?' (Krähenfuß-Notation; Chen-Notation ist genauso richtig)':''}. Antippen zum Vergrößern.</figcaption></figure>`;}
function bindZoom(root){root.querySelectorAll('.dg img').forEach(img=>img.addEventListener('click',()=>img.classList.toggle('big')));}

/* ----- quiz engine ----- */
function runQuiz(container,items,opts){
  opts=opts||{};let idx=0,right=0;const res=[];let tmr=null;let ttm=null;const tEnd=opts.total?Date.now()+opts.total*1000:0;
  if(opts.total){ttm=setInterval(()=>{const r=Math.max(0,Math.round((tEnd-Date.now())/1000));const el=container.querySelector('#tt');if(el)el.textContent=Math.floor(r/60)+':'+String(r%60).padStart(2,'0');if(r<=0){clearInterval(ttm);end(true);}},500);}
  function q(){clearInterval(tmr);
    if(idx>=items.length)return end();
    const it=items[idx];const isCode=/\n/.test(it.q)&&/[=;(]|für|solange|SELECT/i.test(it.q);
    const parts=isCode?it.q.split('\n\n'):[it.q];
    const qhtml=isCode?(parts.length>1?`<div class="qtext code">${esc(parts.slice(0,-1).join('\n\n'))}</div><div class="qtext">${esc(parts[parts.length-1])}</div>`:`<div class="qtext code">${esc(it.q)}</div>`):`<div class="qtext">${esc(it.q)}</div>`;
    const order=it.type==='input'?null:shuffle(it.o.map((t,k)=>k));
    container.replaceChildren(h(`<div class="stack">
      <div class="qtop"><span class="eyebrow num">Frage ${idx+1} / ${items.length}</span>${opts.showLesson?`<span class="area ${areaOf(it)}">${AREA[areaOf(it)]}</span>`:''}${opts.total?`<span class="chip mark num" id="tt"></span>`:''}</div>
      ${opts.timer?'<div class="timer"><i id="ti"></i></div>':''}
      ${qhtml}
      ${it.type==='input'?`<form id="f" class="stack"><input class="inp" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Antwort eintippen" inputmode="${/^-?[\d,.]+$/.test(it.a[0])?'decimal':'text'}"><button class="btn block">Prüfen</button></form>`:`<div class="opts">${order.map(k=>`<button class="opt" data-k="${k}">${esc(it.o[k])}</button>`).join('')}</div>`}
      <div id="fb"></div>
    </div>`));
    let answered=false;
    function answer(ok,given){if(answered)return;answered=true;clearInterval(tmr);
      if(ok){right++;markRight(it._k);}else markWrong(it._k);
      res.push({k:it._k,ok});
      if(it.type!=='input'){container.querySelectorAll('.opt').forEach(b=>{b.disabled=true;const k=+b.dataset.k;if(k===it.a)b.classList.add('right');else if(k===given)b.classList.add('wrong');});}
      else{const i=$('#ans',container);i.disabled=true;container.querySelector('#f button').remove();}
      const corr=it.type==='input'?it.a[0]:it.o[it.a];
      $('#fb',container).replaceChildren(h(`<div class="stack"><div class="fb ${ok?'ok':'bad'}"><b>${ok?'Richtig':(given===-2?'Zeit abgelaufen':'Nicht ganz')}</b>${ok?'':'Richtig ist: <b style="display:inline;color:inherit">'+esc(corr)+'</b><br>'}${esc(it.e)}</div><button class="btn block" id="nq">${idx+1<items.length?'Nächste Frage':'Auswertung'}</button></div>`));
      $('#nq',container).addEventListener('click',()=>{idx++;q();window.scrollTo(0,0);});
      $('#nq',container).focus({preventScroll:true});
    }
    if(it.type==='input'){const f=$('#f',container);f.addEventListener('submit',e=>{e.preventDefault();const v=$('#ans',container).value;if(!v.trim())return;answer(it.a.some(a=>norm(a)===norm(v)),-1);});setTimeout(()=>{const a=$('#ans',container);if(a&&!opts.timer)a.focus({preventScroll:true});},50);}
    else container.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{const k=+b.dataset.k;answer(k===it.a,k);}));
    if(opts.timer){const t0=Date.now(),T=opts.timer*1000;const bar=$('#ti',container);tmr=setInterval(()=>{const p=1-(Date.now()-t0)/T;bar.style.width=Math.max(0,p*100)+'%';if(p<=0)answer(false,-2);},100);}
  }
  let ended=false;
  function end(timeUp){if(ended)return;ended=true;clearInterval(tmr);clearInterval(ttm);const pct=Math.round(right/items.length*100);opts.onEnd&&opts.onEnd(pct,right,res);
    const pass=pct>=50;
    container.replaceChildren(h(`<div class="card result stack"><span class="eyebrow">Ergebnis</span><div class="score num">${pct} %</div><p>${right} von ${items.length} richtig${timeUp?' · Zeit abgelaufen':''}</p>
      <p class="chip ${pass?'ok':'bad'}" style="align-self:center">${pass?'Bestehens-Niveau erreicht':'Unter 50 %, nochmal ran'}</p>
      ${res.some(r=>!r.ok)?'<p class="small muted">Falsche Antworten liegen jetzt unter Wiederholen.</p>':''}
      <div id="endBtns" class="stack"></div></div>`));
    opts.endButtons&&opts.endButtons($('#endBtns',container));
    save();rerenderBadge();
  }
  q();
  return ()=>{clearInterval(tmr);clearInterval(ttm);};
}
function rerenderBadge(){const due=dueReview().length;const bd=$('#wdhBadge');bd.hidden=!due;bd.textContent=due;}

function quizStep(l,body){
  const s=L(l.id);
  if(!s.clip)body.append(h(`<p class="why">Tipp: Erst den Clip ansehen. Das Quiz fragt genau den ab.</p>`));
  const box=document.createElement('div');body.append(box);
  cleanup=runQuiz(box,shuffle(l.quiz),{onEnd:(pct,right)=>{const first=s.quizBest<0;s.quizBest=Math.max(s.quizBest,pct);gain(right*10);toast('+'+(right*10)+' XP');if(first)view.querySelector('.step[data-s="1"]').classList.add('done');},
    endButtons:el=>{el.append(h(`<button class="btn block" id="toW">Weiter zum Schreiben</button><button class="btn ghost block" id="again">Quiz nochmal</button>`));
      $('#toW',el).addEventListener('click',()=>{screen.step=2;renderLesson();window.scrollTo(0,0);});
      $('#again',el).addEventListener('click',()=>{screen.step=1;renderLesson();});}});
}

/* ----- writing ----- */
function writeStep(l,body){
  const s=L(l.id);
  body.append(h(`<p class="why"><b>Schreiben wie in der Prüfung.</b> In GA1 und GA2 gibt es nur offene Aufgaben. Tippe deine Lösung, dann prüft die App, welche Kernpunkte drin sind, und zeigt die Musterlösung.</p>`));
  l.write.forEach((w,wi)=>{
    const key=l.id+':w'+wi;const mono=/\n/.test(w.model)&&/SELECT|funktion|UPDATE|\{|——/.test(w.model);
    const card=h(`<div class="card stack" id="wc${wi}">
      <div class="row between"><span class="eyebrow">Aufgabe ${wi+1} von ${l.write.length}</span>${s.write[wi]!=null?`<span class="chip ${s.write[wi]>=60?'ok':'bad'} num">zuletzt ${s.write[wi]} %</span>`:''}</div>
      <p style="font-weight:700">${esc(w.task)}</p>
      ${w.diagram?`<div class="seg2" role="tablist"><button class="on" data-mode="draw" data-wi="${wi}">Zeichnen</button><button data-mode="text" data-wi="${wi}">Text</button></div><div class="skhost" id="sk${wi}"></div><button class="btn ghost block" id="dv${wi}">Mit gezeichneter Musterlösung vergleichen</button><div id="dr${wi}"></div>`:''}
      <textarea class="ta ${mono?'mono':''}" ${w.diagram?'hidden':''} id="ta${wi}" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${mono?'Hier deine Lösung tippen …':'Deine Antwort in eigenen Worten …'}"></textarea>
      <button class="btn block" id="ck${wi}" ${w.diagram?'hidden':''}>Prüfen</button>
      <div id="wr${wi}"></div></div>`);
    body.append(card);
    const ta=$('#ta'+wi,body);ta.value=S.writes[key]||'';
    if(w.diagram){const did=l.id+'_w'+wi;sketchPad($('#sk'+wi,body),key);
      body.querySelectorAll(`[data-wi="${wi}"]`).forEach(b=>b.addEventListener('click',()=>{const draw=b.dataset.mode==='draw';body.querySelectorAll(`[data-wi="${wi}"]`).forEach(x=>x.classList.toggle('on',x===b));$('#sk'+wi,body).hidden=!draw;$('#dv'+wi,body).hidden=!draw;ta.hidden=draw;$('#ck'+wi,body).hidden=draw;}));
      $('#dv'+wi,body).addEventListener('click',()=>{const r=$('#dr'+wi,body);r.replaceChildren(h(`<div class="stack">${diagramImg(did,w.diagram)}<span class="eyebrow">Musterlösung als Text</span><pre class="model">${esc(w.model)}</pre><p class="small"><b>Wie gut war deine Zeichnung?</b></p><div class="row"><button class="btn ghost" data-sr="100">Passt</button><button class="btn ghost" data-sr="50">Teilweise</button><button class="btn ghost" data-sr="0">Daneben</button></div></div>`));bindZoom(r);
        r.querySelectorAll('[data-sr]').forEach(b=>b.addEventListener('click',()=>{const first=s.write[wi]==null;s.write[wi]=+b.dataset.sr;gain(first?30:10);toast(first?'+30 XP':'+10 XP');r.querySelectorAll('[data-sr]').forEach(x=>x.disabled=true);if(Object.keys(s.write).length>=l.write.length)view.querySelector('.step[data-s="2"]').classList.add('done');}));});
    }
    let dt=null;ta.addEventListener('input',()=>{clearTimeout(dt);dt=setTimeout(()=>{S.writes[key]=ta.value;save();},800);});
    $('#ck'+wi,body).addEventListener('click',()=>{
      const txt=ta.value;if(txt.trim().length<5){toast('Schreib erst etwas, auch halbe Lösungen zählen');return;}
      S.writes[key]=txt;
      const hits=w.keys.map(([lbl,re])=>({lbl,ok:re.test(txt)}));const pct=Math.round(hits.filter(x=>x.ok).length/hits.length*100);
      const first=s.write[wi]==null;s.write[wi]=pct;gain(first?30:10);
      $('#wr'+wi,body).replaceChildren(h(`<div class="stack">
        <div class="row between"><b>${pct>=60?'Gut, das bringt Punkte':'Da fehlt noch was'}</b><span class="chip ${pct>=60?'ok':'bad'} num">${pct} %</span></div>
        <ul class="keys">${hits.map(x=>`<li class="${x.ok?'hit':'miss'}"><span class="m">${x.ok?'✓':'–'}</span><span>${esc(x.lbl)}</span></li>`).join('')}</ul>
        <p class="small muted">Die App sucht nach Stichworten. Vergleiche trotzdem selbst mit der Musterlösung, andere Formulierungen können auch richtig sein.</p>
        <span class="eyebrow">Musterlösung</span><pre class="model">${esc(w.model)}</pre>${w.diagram?diagramImg(l.id+'_w'+wi,w.diagram):''}
        ${w.alt?`<p class="small">${esc(w.alt)}</p>`:''}
        <p class="small"><b>Trick fürs Einprägen:</b> Lies die Musterlösung einmal, dann lösche dein Feld und schreib sie aus dem Kopf nochmal.</p>
        <button class="btn ghost block" id="rw${wi}">Feld leeren und nochmal schreiben</button>
      </div>`));
      $('#rw'+wi,body).addEventListener('click',()=>{ta.value='';S.writes[key]='';save();$('#wr'+wi,body).replaceChildren();ta.focus();});
      if(Object.keys(s.write).length>=l.write.length)view.querySelector('.step[data-s="2"]').classList.add('done');
      toast(first?'+30 XP':'+10 XP');
    });
  });
  const nid=ORDER[ORDER.indexOf(l.id)+1];
  body.append(h(`<div class="stack" style="margin-top:6px">${nid?`<button class="btn ghost block" data-open="${nid}" data-step="0">Nächste Lektion: ${esc(BY[nid].title)}</button>`:''}</div>`));
  body.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openLesson(b.dataset.open,0)));
}

/* ---------- WIEDERHOLEN ---------- */
function renderWdh(){
  const due=dueReview();const all=Object.keys(S.review).filter(qByKey);
  const weak=ORDER.filter(id=>L(id).quizBest>=0&&L(id).quizBest<60);
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>Wiederholen</h1><p class="muted">Jede falsche Antwort landet hier. Beantwortest du sie richtig, kommt sie nach 1, 3 und 6 Tagen wieder. Nach dreimal richtig ist sie raus.</p></div>
    ${due.length?`<div class="card next stack"><h2 class="num">${due.length} Fragen fällig</h2><button class="btn block" id="go">Jetzt wiederholen</button></div>`:
      `<div class="card empty">${all.length?`Heute nichts fällig. ${all.length} Fragen kommen in den nächsten Tagen wieder.`:'Noch nichts falsch beantwortet. Falsche Antworten aus Quiz und Prüfungssimulation landen automatisch hier.'}</div>`}
    ${weak.length?`<section class="stack"><h3>Lektionen unter 60 %</h3>${weak.map(id=>`<button class="lrow" data-open="${id}" data-step="1"><span class="t">${esc(BY[id].title)}</span><span class="chip bad num">${L(id).quizBest} %</span></button>`).join('')}</section>`:''}
  </div>`));
  bindCommon();
  const g=$('#go');if(g)g.addEventListener('click',()=>startRun(shuffle(due).slice(0,20).map(qByKey),{title:'Wiederholen',showLesson:true,xpEach:5}));
}

/* ---------- RUN (Wiederholen / Simulation) ---------- */
function startRun(items,o){
  stopAll();screen={type:'run'};rerender();
  view.replaceChildren(h(`<div class="stack"><div class="lhead"><button class="iconbtn" id="back" aria-label="Zurück">${ICON.back}</button><h1>${esc(o.title)}</h1></div><div id="rb"></div></div>`));
  $('#back').addEventListener('click',()=>go(tab));
  cleanup=runQuiz($('#rb'),items,{timer:o.timer,total:o.total,showLesson:o.showLesson,onEnd:(pct,right)=>{gain(right*(o.xpEach||5));if(o.onEnd)o.onEnd(pct);},
    endButtons:el=>{el.append(h(`<button class="btn block" id="bk">Fertig</button>`));$('#bk',el).addEventListener('click',()=>go(tab));}});
  window.scrollTo(0,0);
}

/* ---------- PRÜFUNG ---------- */
const CALC={ap1:60,proj:70,ga1:45,ga2:45,wiso:55};
function renderPruefung(){
  const pool=a=>LESSONS.filter(l=>!a||a.includes(l.area)).flatMap(l=>l.quiz).concat(!a||a.includes('WISO')?WISO_BANK:[]);
  const caseRow=c=>{const r=caseResult(c);return `<button class="lrow" data-case="${c.id}"><span class="t">${esc(c.title)}</span><span class="area ${c.area}">${c.area}</span><span class="meta small muted">${esc(c.scenario.slice(0,90))}…</span><span class="meta">${r.checked?`<span class="chip ${r.points>=50?'ok':'bad'} num">${r.points} / 100 · Note ${grade(r.points)}</span>`:'<span class="small muted">90 Minuten · 4 Handlungsschritte</span>'}</span></button>`;};
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>Prüfungsmodus</h1><p class="muted">Erst die Lektionen, dann hier unter echten Bedingungen üben.</p></div>
    <section class="stack"><h2>Prüfungsfälle wie in der AP2</h2><p class="small muted">Komplette Prüfungsbereiche: Szenario, 4 Handlungsschritte à 25 Punkte, 90 Minuten. Du schreibst deine Lösungen, deckst die Musterlösung auf und hakst das Bewertungsschema ehrlich ab.</p>
      ${CASES.map(caseRow).join('')}
      <button class="btn ghost block" id="beleg">Belegsatz-Spickzettel öffnen (SQL, Pseudocode, UML)</button>
    </section>
    <h2>Schnelle Runden</h2>
    <div class="stack">
      <button class="lrow" id="m4"><span class="t">WiSo-Prüfung simulieren</span><span class="chip mark">60 min</span><span class="meta small muted">30 Fragen aus dem ganzen WiSo-Pool, 60 Minuten Gesamtzeit wie am Prüfungstag.</span></button>
      <button class="lrow" id="m1"><span class="t">Blitzrunde</span><span class="chip mark">20 s</span><span class="meta small muted">10 Fragen quer durch alles. Perfekt für zwischendurch.</span></button>
      <button class="lrow" id="m2"><span class="t">WiSo-Simulation</span><span class="chip">60 s</span><span class="meta small muted">25 WiSo-Fragen, 60 Sekunden pro Frage.</span></button>
      <button class="lrow" id="m3"><span class="t">GA-Mix</span><span class="chip">45 s</span><span class="meta small muted">15 Fragen aus GA1 und GA2.</span></button>
    </div>
    <section class="card stack" id="calc">
      <h2>Bestehens-Rechner</h2>
      <p class="small muted">Beispielwerte, schieb sie auf deine eigenen. AP1 kennst du schon, das Projekt schätzt du.</p>
      ${[['ap1','AP1 (Februar)','20 %'],['proj','Projekt (Doku + Präsentation)','50 %'],['ga1','GA1 Planen','10 %'],['ga2','GA2 Algorithmen','10 %'],['wiso','WiSo','10 %']].map(([k,n,w])=>`<label class="sl"><span>${n} <span class="muted small">· ${w}</span></span><span class="v num" id="v_${k}">${CALC[k]}</span><input type="range" id="r_${k}" min="0" max="100" value="${CALC[k]}"></label>`).join('')}
      <div id="cres"></div>
    </section>
    <section class="card stack">
      <h2>Prüfungstag</h2>
      <p class="small muted">Typischer Ablauf, die genauen Zeiten stehen in deiner Einladung der IHK.</p>
      <div class="tw" style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.9rem">
        <tr><td style="padding:6px 0" class="num">08:00 bis 09:30</td><td><b>GA1</b> Planen eines Softwareproduktes</td></tr>
        <tr><td style="padding:6px 0" class="num">10:00 bis 11:30</td><td><b>GA2</b> Algorithmen</td></tr>
        <tr><td style="padding:6px 0" class="num">11:45 bis 12:45</td><td><b>WiSo</b> gebundene Aufgaben</td></tr></table></div>
      <ul class="check small">
        <li>Einladung und Personalausweis</li><li>Nicht programmierbarer Taschenrechner</li><li>Mehrere Kulis, Lineal</li><li>Belegsatz liegt bei: SQL-Syntax und UML dort nachschauen</li><li>Erst alle Aufgaben überfliegen, mit den leichtesten anfangen</li><li>Nie etwas leer lassen, Teilpunkte gibt es fast überall</li>
      </ul>
    </section>
    <section class="card stack">
      <h2>Quellen zum Nachhören</h2>
      <p class="small muted">IT-Berufe-Podcast von Stefan Macke. Daher stammen die Zahlen zur Prüfungsrelevanz in dieser App.</p>
      <div class="vids">
        <a class="vid" href="https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/themen-der-schriftlichen-ihk-pruefungen-der-it-berufe/" target="_blank" rel="noopener"><span class="pl" style="background:var(--accent)">${ICON.yt}</span><span><b>Themen aller AP2-Prüfungen seit 2021</b><span>Auswertung, welche Themen wie oft drankamen</span></span></a>
        <a class="vid" href="https://it-berufe-podcast.de/neuer-pruefungskatalog-fuer-die-ap2-als-fachinformatiker-anwendungsentwicklung-ab-2025-it-berufe-podcast-191/" target="_blank" rel="noopener"><span class="pl" style="background:var(--accent)">${ICON.yt}</span><span><b>Folge 191: Neuer Prüfungskatalog AP2 ab 2025</b><span>Was neu ist, was gestrichen wurde</span></span></a>
      </div>
    </section>
  </div>`));
  $('#m1').addEventListener('click',()=>startRun(shuffle(pool()).slice(0,10),{title:'Blitzrunde',timer:20,showLesson:true}));
  $('#m2').addEventListener('click',()=>startRun(shuffle(pool(['WISO'])).slice(0,25),{title:'WiSo-Simulation',timer:60,showLesson:false}));
  $('#m3').addEventListener('click',()=>startRun(shuffle(pool(['GA1','GA2'])).slice(0,15),{title:'GA-Mix',timer:45,showLesson:true}));
  $('#m4').addEventListener('click',()=>startRun(shuffle(pool(['WISO'])).slice(0,30),{title:'WiSo-Prüfung',total:3600,showLesson:false,xpEach:5}));
  view.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>openCase(b.dataset.case)));
  $('#beleg').addEventListener('click',openBeleg);
  Object.keys(CALC).forEach(k=>$('#r_'+k).addEventListener('input',e=>{CALC[k]=+e.target.value;$('#v_'+k).textContent=CALC[k];calc();}));
  calc();
}
/* ---------- PRÜFUNGSFÄLLE ---------- */
function grade(p){return p>=92?1:p>=81?2:p>=67?3:p>=50?4:p>=30?5:6;}
function caseState(id){return S.cases[id]||(S.cases[id]={ans:{},crit:{},shown:{},left:null});}
function caseResult(c){const st=S.cases[c.id];let points=0,checked=false;if(!st)return {points,checked};
  c.tasks.forEach(t=>t.sub.forEach(s=>{const k=t.nr+s.id;const cr=st.crit[k]||[];if(st.shown[k])checked=true;s.criteria.forEach((x,i)=>{if(cr[i])points+=x.points;});}));return {points,checked};}
function matBlock(m){if(!m)return '';return `<div class="stack" style="gap:6px">${m.title?`<span class="eyebrow">${esc(m.title)}</span>`:''}${m.code!=null?`<pre class="model pre">${esc(m.code)}</pre>`:''}${m.table?`<div class="tw cs-tw"><table class="cs-t"><thead><tr>${m.table[0].map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${m.table.slice(1).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}</div>`;}
let caseTimer=null;
function openCase(id){
  stopAll();const c=CASES.find(x=>x.id===id);screen={type:'case',id};rerender();
  const st=caseState(id);if(st.left==null)st.left=c.minutes*60;
  let running=false;
  const subHtml=(t,s)=>{const k=t.nr+s.id;const shown=st.shown[k];const cr=st.crit[k]||[];
    return `<div class="stack cs-sub" data-k="${k}">
      <div class="row between"><b>${s.id})</b><span class="chip num">${s.points} Punkte</span></div>
      <p class="cs-q">${esc(s.q)}</p>${matBlock(s.material)}
      ${s.kind==='diagram'?`<div class="seg2"><button class="on" data-cmode="draw" data-ck="${k}">Zeichnen</button><button data-cmode="text" data-ck="${k}">Text</button></div><div class="skhost" data-sk="${k}"></div>`:''}
      <textarea ${s.kind==='diagram'?'hidden':''} class="ta ${s.kind==='code'?'mono':''}" data-ta="${k}" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Deine Lösung …">${esc(st.ans[k]||'')}</textarea>
      ${shown?`<div class="stack"><span class="eyebrow">Musterlösung</span>${s.diagram?diagramImg(c.id+'_'+k,s.diagram):''}<pre class="model ${s.kind==='code'?'pre':''}">${esc(s.model)}</pre>
        <span class="eyebrow">Bewertung: hake ehrlich ab, was du hattest</span>
        <div class="crit">${s.criteria.map((x,i)=>`<label class="cr"><input type="checkbox" data-cr="${k}" data-i="${i}" ${cr[i]?'checked':''}><span>${esc(x.text)}</span><b class="num">${x.points} P</b></label>`).join('')}</div>
        <p class="small num">Erreicht: <b data-sum="${k}">${s.criteria.reduce((a,x,i)=>a+(cr[i]?x.points:0),0)}</b> von ${s.points}</p></div>`
      :`<button class="btn ghost block" data-show="${k}">Musterlösung und Bewertung zeigen</button>`}
    </div>`;};
  function render(){
    const r=caseResult(c);
    view.replaceChildren(h(`<div class="stack-lg">
      <div class="lhead"><button class="iconbtn" id="back" aria-label="Zurück">${ICON.back}</button><h1>${esc(c.title)}</h1></div>
      <div class="cs-bar"><span class="area ${c.area}">${c.area}</span><span class="cs-time num" id="ctime"></span><button class="btn" id="ctog" style="min-height:40px;padding:8px 14px"></button></div>
      <div class="card stack"><span class="eyebrow">Ausgangssituation</span><p>${esc(c.scenario)}</p></div>
      ${(c.material||[]).length?`<div class="card stack"><span class="eyebrow">Material (Belegsatz zum Fall)</span>${c.material.map(matBlock).join('')}</div>`:''}
      ${c.tasks.map(t=>`<section class="card stack"><div class="row between"><h2>${esc(t.title)}</h2><span class="chip mark num">${t.points} P</span></div>${t.intro?`<p class="muted">${esc(t.intro)}</p>`:''}${t.sub.map(s=>subHtml(t,s)).join('')}</section>`).join('')}
      <div class="card stack" style="text-align:center"><span class="eyebrow">Dein Ergebnis bisher</span><div class="result"><div class="score num">${r.points}</div><p>von 100 Punkten · Note ${grade(r.points)}</p></div>
        <p class="small muted">Zählt nur für Teilaufgaben, bei denen du die Lösung aufgedeckt hast. Ab 50 Punkten ist der Bereich bestanden.</p>
        <button class="btn ghost block" id="creset">Fall komplett zurücksetzen</button></div>
    </div>`));
    $('#back').addEventListener('click',()=>{stopTimer();go(tab);});
    view.querySelectorAll('[data-sk]').forEach(hst=>sketchPad(hst,'case:'+id+':'+hst.dataset.sk));
    view.querySelectorAll('[data-cmode]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ck;const draw=b.dataset.cmode==='draw';view.querySelectorAll(`[data-ck="${k}"]`).forEach(x=>x.classList.toggle('on',x===b));view.querySelector(`[data-sk="${k}"]`).hidden=!draw;view.querySelector(`[data-ta="${k}"]`).hidden=draw;}));
    bindZoom(view);
    view.querySelectorAll('[data-ta]').forEach(ta=>{let dt;ta.addEventListener('input',()=>{clearTimeout(dt);dt=setTimeout(()=>{st.ans[ta.dataset.ta]=ta.value;save();},700);});});
    view.querySelectorAll('[data-show]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.show;const ta=view.querySelector(`[data-ta="${k}"]`);st.ans[k]=ta.value;st.shown[k]=true;save();const y=window.scrollY;render();window.scrollTo(0,y);}));
    view.querySelectorAll('[data-cr]').forEach(cb=>cb.addEventListener('change',()=>{const k=cb.dataset.cr;const arr=st.crit[k]||(st.crit[k]=[]);arr[+cb.dataset.i]=cb.checked;save();
      const t=c.tasks.find(t=>k.startsWith(String(t.nr)));const s=t.sub.find(s=>t.nr+s.id===k);view.querySelector(`[data-sum="${k}"]`).textContent=s.criteria.reduce((a,x,i)=>a+(arr[i]?x.points:0),0);
      const rr=caseResult(c);view.querySelector('.result .score').textContent=rr.points;view.querySelector('.result p').textContent=`von 100 Punkten · Note ${grade(rr.points)}`;}));
    $('#creset').addEventListener('click',()=>{const b=$('#creset');if(b.dataset.sure){S.cases[id]={ans:{},crit:{},shown:{},left:c.minutes*60};save();stopTimer();openCase(id);}else{b.dataset.sure='1';b.textContent='Wirklich? Nochmal tippen zum Zurücksetzen';}});
    $('#ctog').addEventListener('click',()=>{running?stopTimer():startTimer();});
    paintTime();
  }
  function paintTime(){const l=Math.max(0,st.left);$('#ctime').textContent=(l<=0?'Zeit um · ':'')+Math.floor(l/60)+':'+String(Math.floor(l%60)).padStart(2,'0');$('#ctog').textContent=running?'Pause':(l===c.minutes*60?'Zeit starten':'Weiter');}
  function startTimer(){running=true;let last=Date.now();caseTimer=setInterval(()=>{const n=Date.now();st.left-=(n-last)/1000;last=n;if(st.left<=0){st.left=0;stopTimer();}paintTime();},1000);paintTime();}
  function stopTimer(){running=false;clearInterval(caseTimer);save();if($('#ctime'))paintTime();}
  cleanup=()=>{clearInterval(caseTimer);save();};
  render();window.scrollTo(0,0);
}
function openBeleg(){
  stopAll();screen={type:'beleg'};rerender();
  view.replaceChildren(h(`<div class="stack-lg"><div class="lhead"><button class="iconbtn" id="back" aria-label="Zurück">${ICON.back}</button><h1>Belegsatz-Spickzettel</h1></div>
    <p class="muted small">In der Prüfung bekommst du einen bundeseinheitlichen Belegsatz mit SQL-Beiblatt und UML-Notation. Das hier ist eine Übungsversion in derselben Art, damit du weißt, wo was steht. Kein Original.</p>
    ${BELEGSATZ.map(b=>`<section class="card stack"><h3>${esc(b.title)}</h3><pre class="model pre">${esc(b.code)}</pre></section>`).join('')}</div>`));
  $('#back').addEventListener('click',()=>go(tab));window.scrollTo(0,0);
}
function calc(){
  const c=CALC;const total=.2*c.ap1+.5*c.proj+.1*(c.ga1+c.ga2+c.wiso);
  const t2=(.5*c.proj+.1*c.ga1+.1*c.ga2+.1*c.wiso)/.8;
  const parts=[c.proj,c.ga1,c.ga2,c.wiso];
  const r=[
    ['Gesamtergebnis mindestens 50',total>=49.5,total.toFixed(1)],
    ['Teil 2 mindestens 50',t2>=49.5,t2.toFixed(1)],
    ['Mindestens 3 von 4 Bereichen in Teil 2 ab 50',parts.filter(x=>x>=50).length>=3,parts.filter(x=>x>=50).length+' von 4'],
    ['Kein Bereich in Teil 2 unter 30',parts.every(x=>x>=30),Math.min(...parts)+' min.']];
  const ok=r.every(x=>x[1]);
  $('#cres').replaceChildren(h(`<div class="stack"><div class="verdict ${ok?'ok':'bad'}">${ok?'Bestanden':'Nicht bestanden'}</div>
    <ul class="rules">${r.map(x=>`<li><span class="chip ${x[1]?'ok':'bad'}">${x[1]?'erfüllt':'fehlt'}</span><span style="flex:1">${x[0]}</span><span class="num small muted">${x[2]}</span></li>`).join('')}</ul>
    <p class="small muted">Liegt ein Bereich zwischen 30 und 49, kannst du dort eine 15-minütige mündliche Ergänzungsprüfung beantragen, wenn sie über das Bestehen entscheidet. Regeln nach § 16 und § 17 FIAusbV, Rundung durch die IHK kann leicht abweichen.</p></div>`));
}

rerender();
})();
