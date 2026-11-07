(function(){
'use strict';
/* ================= Daten ================= */
const LESSONS=[...L_GA2,...L_GA1,...L_WISO,...L_NEU_A,...L_NEU_B,...L_NEU_C,...L_NEU_D];
const BY=Object.fromEntries(LESSONS.map(l=>[l.id,l]));
/* Überarbeitete Antwortoptionen (falsche Antworten gleich lang und plausibel) */
if(typeof QFIX!=='undefined'){const SRC={L_GA2,L_GA1,L_WISO,L_NEU_A,L_NEU_B,L_NEU_C,L_NEU_D,CLIPS_GA2,CLIPS_GA1,CLIPS_WISO,CLIPS_NEU_A,CLIPS_NEU_B,CLIPS_NEU_C,CLIPS_NEU_D,WISO_BANK};
  for(const k in QFIX){const [src,id,i]=k.split('|');const o=QFIX[k];let q=null;
    if(src==='WISO_BANK')q=WISO_BANK[+i];else if(/^L_/.test(src)){const l=(SRC[src]||[]).find(x=>x.id===id);q=l&&l.quiz[+i];}else{const c=SRC[src]&&SRC[src][id];q=c&&c[+i]&&c[+i].check;}
    if(q&&q.o&&q.o.length===o.length)q.o=o.slice();}}
LESSONS.forEach(l=>l.quiz.forEach((q,i)=>{q._k=l.id+':'+i;q._l=l.id;}));
const CLIPS=Object.assign({},CLIPS_GA2,CLIPS_GA1,CLIPS_WISO,CLIPS_NEU_A,CLIPS_NEU_B,CLIPS_NEU_C,CLIPS_NEU_D);
const DIALOG=Object.assign({},typeof DIALOG_GA2!=='undefined'?DIALOG_GA2:{},typeof DIALOG_GA1!=='undefined'?DIALOG_GA1:{},typeof DIALOG_WISO!=='undefined'?DIALOG_WISO:{});
const EXTRA=Object.assign({},typeof EXTRA_GA2!=='undefined'?EXTRA_GA2:{},typeof EXTRA_GA1!=='undefined'?EXTRA_GA1:{},typeof EXTRA_WISO!=='undefined'?EXTRA_WISO:{});
WISO_BANK.forEach((q,i)=>{q._k='bank:'+i;q._l=null;});
const CASES=[...CASES_GA1,...CASES_GA1B,...CASES_GA2,...CASES_GA2B];
LESSONS.forEach(l=>{if(CLIPS[l.id])l.clip2=CLIPS[l.id];});
const areaOf=q=>q._l?BY[q._l].area:'WISO';
const AREA={GA2:'GA2 Algorithmen',GA1:'GA1 Planen',WISO:'WiSo',EXAM:'Prüfung'};
/* Kategorien wie im Themenbaum: Oberthema → Themen. Reihenfolge = empfohlene Lernreihenfolge */
const CATS=[
 {id:'algo',t:'Programmierung & Algorithmen',items:['pseudo1','pseudo3','pseudo2','test','qs']},
 {id:'db',t:'Datenbanken & SQL',items:['sql1','sql2','erm','sql4','sql3','db2']},
 {id:'uml',t:'Modellierung & UML',items:['klasse','umlv','patterns']},
 {id:'proj',t:'Projekt, Anforderungen & UI',items:['anforderung','vorgehen','ui','projekt','quali']},
 {id:'sec',t:'IT-Sicherheit & Datenschutz',items:['sec2','security']},
 {id:'arch',t:'Architektur, Schnittstellen & Betrieb',items:['architektur','rest','betrieb']},
 {id:'wiso1',t:'WiSo: Ausbildung & Arbeit',items:['ausbildung','arbeitsrecht','sozial','beruf_recht']},
 {id:'wiso2',t:'WiSo: Betrieb & Wirtschaft',items:['betrieb_org','unternehmen','wirtschaft']},
 {id:'start',t:'Extra: Prüfungstechnik (optional)',items:['technik']}
];
const CAT_OF={};CATS.forEach(c=>c.items.forEach(id=>CAT_OF[id]=c));
/* Lernreihenfolge nach Prüfungsrelevanz (Punkte pro Stunde), nicht nach Baum */
const ORDER=['pseudo1','sql1','sql2','klasse','erm','test','pseudo3','sql4','ausbildung','arbeitsrecht','sozial','betrieb_org','umlv','ui','anforderung','sec2','qs','db2','vorgehen','security','pseudo2','sql3','unternehmen','patterns','rest','quali','projekt','architektur','betrieb','wirtschaft','beruf_recht','technik'];
const EXAM=new Date('2026-11-25T08:00:00+01:00');
const DAY=864e5;

/* ================= Zustand ================= */
const LS='ap2crashkurs.v1';
/* Fremde Daten (Sync-Code, Cloud, localStorage) nur nach Prüfung übernehmen: Größe, Typen, bekannte Schlüssel */
function cleanState(json){
  try{if(typeof json!=='string'||json.length>1500000)return null;const o=JSON.parse(json);if(!o||typeof o!=='object'||Array.isArray(o))return null;
    const f=fresh();const out={};const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
    for(const k of Object.keys(f)){if(!(k in o))continue;const v=o[k];const d=f[k];
      if(typeof d==='number'&&typeof v==='number'&&isFinite(v))out[k]=v;
      else if(typeof d==='boolean'&&typeof v==='boolean')out[k]=v;
      else if(isObj(d)&&isObj(v))out[k]=v;
      else if(d===null&&(typeof v==='string'||v===null))out[k]=v;
      else if(typeof d==='string'&&typeof v==='string'&&v.length<40)out[k]=v;}
    for(const k of ['af','openCat'])if(typeof o[k]==='string'&&o[k].length<20)out[k]=o[k];
    if(typeof o.vol==='number'&&isFinite(o.vol))out.vol=Math.max(0,Math.min(1.5,o.vol));
    if(!['auto','light','dark'].includes(out.theme))delete out.theme;
    if(out.rate!=null&&!(out.rate>=0.5&&out.rate<=2))delete out.rate;
    return Object.assign(fresh(),out);}catch(e){return null;}}
const fresh=()=>({v:2,updatedAt:0,xp:0,days:{},lessons:{},review:{},writes:{},sound:true,rate:1,cc:true,theme:'auto',planStart:null,cases:{},wrong:{},daylog:{},open:{start:true,algo:true}});
let S=fresh();
try{const raw=localStorage.getItem(LS);const c=raw&&cleanState(raw);if(c)S=c;}catch(e){}
if(!S.planStart)S.planStart=today();
function today(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function L(id){return S.lessons[id]||(S.lessons[id]={clip:false,quizBest:-1,write:{}});}
let remoteRef=null,pushTimer=null,pushing=false,pushAgain=false,syncState='lokal';
function save(){S.updatedAt=Date.now();try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){}schedulePush();}
function schedulePush(){if(!remoteRef)return;clearTimeout(pushTimer);pushTimer=setTimeout(push,2500);}
async function push(){if(!remoteRef)return;if(pushing){pushAgain=true;return;}pushing=true;
  try{await remoteRef.set({json:JSON.stringify(S),updatedAt:S.updatedAt});syncState='sync';}catch(e){syncState='lokal';}
  pushing=false;paintSync();if(pushAgain){pushAgain=false;push();}}
async function connect(){
  try{
    if(!window.claude||!window.claude.use)return false;
    const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    if(!db||!user)return true;
    const uid=await user.id();if(!uid)return true;
    const ref=db.doc('data/users/'+uid+'/progress');
    const snap=await ref.get();
    if(snap.exists){const d=snap.data();try{const rs=cleanState(d.json);if(rs&&(rs.updatedAt||0)>(S.updatedAt||0)){S=rs;try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){}applyTheme();render();}}catch(e){}}
    remoteRef=ref;syncState='sync';paintSync();
    if(!snap.exists||(S.updatedAt>((snap.data()||{}).updatedAt||0)))push();
  }catch(e){}
  return true;
}
(async()=>{for(let i=0;i<6;i++){if(await connect())return;await new Promise(r=>setTimeout(r,800));}})();

/* ---------- Sync ohne Claude: Google-Login über Firebase (nur wenn konfiguriert) ---------- */
const FBC=window.FIREBASE_CONFIG;let fbAuth=null,fbUser=null,fbUnsub=null,pendingRemote=null,fbReady=false;
const fbOn=()=>!!(FBC&&FBC.apiKey);
function loadScript(u){return new Promise((res,rej)=>{const sc=document.createElement('script');sc.src=u;sc.onload=res;sc.onerror=rej;document.head.appendChild(sc);});}
function applyRemote(json){try{const rs=cleanState(json);if(!rs)return;if((rs.updatedAt||0)<=(S.updatedAt||0))return;S=Object.assign(fresh(),rs);try{localStorage.setItem(LS,JSON.stringify(S));}catch(e){}applyTheme();}catch(e){}}
const busyRoute=()=>['topic','case','run'].includes(R.v);
async function fbInit(){
  if(!fbOn()||(window.claude&&window.claude.use))return;
  try{const b='vendor/firebase/';
    await loadScript(b+'firebase-app-compat.js');await loadScript(b+'firebase-auth-compat.js');await loadScript(b+'firebase-firestore-compat.js');
    firebase.initializeApp(FBC);fbAuth=firebase.auth();const fdb=firebase.firestore();fbReady=true;
    try{await fbAuth.getRedirectResult();}catch(e){}
    fbAuth.onAuthStateChanged(async u=>{fbUser=u;if(fbUnsub){fbUnsub();fbUnsub=null;}
      if(!u){remoteRef=null;syncState='lokal';paintSync();if(R.v==='settings')render();return;}
      const ref=fdb.collection('progress').doc(u.uid);
      try{const snap=await ref.get();
        if(snap.exists){const d=snap.data();if((d.updatedAt||0)>(S.updatedAt||0)){if(busyRoute())pendingRemote=d.json;else{applyRemote(d.json);render();}}}
        remoteRef={set:d=>ref.set(d)};syncState='sync';paintSync();
        if(!snap.exists||(S.updatedAt>((snap.data()||{}).updatedAt||0)))push();
        fbUnsub=ref.onSnapshot(sn=>{if(!sn.exists||sn.metadata.hasPendingWrites)return;const d=sn.data();if((d.updatedAt||0)<=(S.updatedAt||0))return;
          if(busyRoute())pendingRemote=d.json;else{applyRemote(d.json);render();}});
        if(R.v==='settings')render();
      }catch(e){syncState='fehler';paintSync();}
    });
  }catch(e){fbReady=false;}
}
function fbLogin(){if(!fbReady){toast('Sync lädt noch, kurz warten');return;}const pr=new firebase.auth.GoogleAuthProvider();
  const mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||window.matchMedia('(display-mode: standalone)').matches;
  if(mobile)fbAuth.signInWithRedirect(pr);else fbAuth.signInWithPopup(pr).catch(()=>fbAuth.signInWithRedirect(pr));}
function fbLogout(){if(fbAuth)fbAuth.signOut();}
fbInit();

/* ================= Lernlogik ================= */
function gain(n){S.xp+=n;const t=today();S.days[t]=(S.days[t]||0)+n;save();}
function streak(){let n=0;let d=new Date();if(!S.days[today(d)])d=new Date(d-DAY);while(S.days[today(d)]){n++;d=new Date(d-DAY);}return n;}
function qByKey(k){const [id,i]=k.split(':');if(id==='bank')return WISO_BANK[+i];return BY[id]&&BY[id].quiz[+i];}
/* Wiederholung, gestaucht auf die Zeit bis zur Prüfung: 0, 1, 2, 4, 7 Tage */
const IV=[0,DAY,2*DAY,4*DAY,7*DAY];
function dueReview(){const now=Date.now();return Object.entries(S.review).filter(([k,r])=>r.due<=now&&qByKey(k)).map(([k])=>k);}
function markWrong(k){S.review[k]={box:1,due:Date.now()+10*60e3};const w=S.wrong[k]||(S.wrong[k]={n:0});w.n++;w.last=Date.now();w.fixed=false;}
function markRight(k){const r=S.review[k];if(!r)return;const box=r.box+1;if(box>=IV.length){delete S.review[k];if(S.wrong[k])S.wrong[k].fixed=true;}else S.review[k]={box,due:Date.now()+IV[box]};}
function lessonPct(id){const s=L(id),l=BY[id];let p=0;if(s.clip)p+=30;if(s.quizBest>=0)p+=40*Math.max(.25,s.quizBest/100);const w=Object.keys(s.write).length;p+=30*Math.min(1,w/l.write.length);return Math.round(p);}
function stepsDone(id){const s=L(id),l=BY[id];return [s.clip,s.quizBest>=0,Object.keys(s.write).length>=l.write.length];}
const isDone=id=>stepsDone(id).every(Boolean);
function catPct(c){return Math.round(c.items.reduce((a,id)=>a+lessonPct(id),0)/c.items.length);}
function allPct(){return Math.round(LESSONS.reduce((a,l)=>a+lessonPct(l.id),0)/LESSONS.length);}
function areaPct(a){const ls=LESSONS.filter(l=>l.area===a);return Math.round(ls.reduce((x,l)=>x+lessonPct(l.id),0)/ls.length);}
function nextStep(id){const d=stepsDone(id);return d[0]?(d[1]?(d[2]?0:2):1):0;}
function checkComplete(id){if(isDone(id)){const t=today();const lg=S.daylog[t]||(S.daylog[t]={topics:[]});if(!lg.topics.includes(id)){lg.topics.push(id);save();toast('Thema abgeschlossen');}}}
function daysLeft(){return Math.max(0,Math.ceil((EXAM-new Date())/DAY));}
function caseResult(c){const st=S.cases[c.id];let points=0,checked=false;if(!st)return {points,checked};
  c.tasks.forEach(t=>t.sub.forEach(s=>{const k=t.nr+s.id;const cr=st.crit[k]||[];if(st.shown[k])checked=true;s.criteria.forEach((x,i)=>{if(cr[i])points+=x.points;});}));return {points,checked};}

/* Lernplan: neue Themen zuerst, dann Prüfungsfälle unter Zeitdruck, letzter Tag locker.
   Rechnet sich jeden Tag neu aus dem, was offen ist. */
function buildPlan(){
  const t0=new Date();t0.setHours(12,0,0,0);
  const last=new Date(EXAM.getTime()-DAY);last.setHours(12,0,0,0);
  const days=[];for(let d=new Date(t0);d<=last;d=new Date(d.getTime()+DAY))days.push(today(d));
  if(!days.length)days.push(today(t0));
  const N=days.length;const tk=today();
  const doneToday=(S.daylog[tk]&&S.daylog[tk].topics)||[];
  const open=ORDER.filter(id=>!isDone(id)&&!doneToday.includes(id));
  const openCases=CASES.filter(c=>!caseResult(c).checked);
  let caseDays=N>=10?6:Math.max(0,Math.floor((N-1)/2));
  if(!openCases.length)caseDays=Math.min(caseDays,2);
  const topicDays=Math.max(1,N-1-caseDays);
  const perDay=Math.ceil((open.length+doneToday.length)/topicDays)||0;
  const plan=days.map((d,i)=>({date:d,topics:[],cases:[],wiso:false,review:true,mix:false,light:false}));
  let q=open.slice();
  plan[0].topics=doneToday.slice();
  for(let i=0;i<topicDays&&i<N;i++){const need=Math.max(0,perDay-plan[i].topics.length);plan[i].topics.push(...q.splice(0,need));plan[i].mix=i>0||S.xp>0;}
  if(q.length)plan[Math.min(topicDays,N)-1].topics.push(...q);
  const cd=[];for(let i=topicDays;i<N-1;i++)cd.push(i);
  if(N>1)plan[N-1].light=true; else plan[0].light=false;
  if(cd.length){openCases.forEach((c,j)=>plan[cd[j%cd.length]].cases.push(c.id));
    [cd[0],cd[cd.length-1]].forEach(i=>{if(plan[i])plan[i].wiso=true;});}
  plan.forEach(p=>{p.mins=p.topics.reduce((a,id)=>a+BY[id].mins+25,0)+p.cases.length*95+(p.wiso?60:0)+(p.review?20:0)+(p.mix?10:0)+(p.light?60:0);});
  return {plan,N,topicDays,perDay};
}

/* ================= Helfer ================= */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const view=$('#view');
function h(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content;}
function toast(msg){document.querySelectorAll('.toast').forEach(t=>t.remove());const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),1900);}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const norm=s=>String(s).toLowerCase().replace(/[\s€%]/g,'').replace(/\.$/,'');
const fmtD=s=>{const d=new Date(s+'T12:00:00');return d.toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'});};
const fmtMin=m=>m>=60?(Math.floor(m/60)+' h'+(m%60?' '+(m%60)+' min':'')):m+' min';
const ring=(p,cls)=>`<span class="ring ${p>=100?'full':''} ${cls||''}" style="--p:${p}" data-v="${p}"></span>`;
const I={
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 rep:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/></svg>',
 err:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h11l3 3v13H5z"/><path d="M9 10l6 6M15 10l-6 6"/></svg>',
 exam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></svg>',
 gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
 bulb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/></svg>',
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
 quiz:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01"/></svg>',
 pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg>',
 chev:'<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M9 5l7 7-7 7"/></svg>',
 case:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
 mix:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
 dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
 yt:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
};

/* ================= Theme ================= */
function applyTheme(){const r=document.documentElement;if(S.theme==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',S.theme);}
applyTheme();
$('#themeBtn').addEventListener('click',()=>{const dark=document.documentElement.getAttribute('data-theme')==='dark'||(S.theme==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);S.theme=dark?'light':'dark';applyTheme();save();});
function paintSync(){const el=$('#syncNote');if(!el)return;el.textContent=syncState==='sync'?(fbUser?'● synchron (Google)':'● synchron (Konto)'):(syncState==='fehler'?'Sync-Fehler':(fbOn()?'Sync einrichten →':'lokal gespeichert'));el.style.cursor=fbOn()?'pointer':'';}

/* ================= Router ================= */
let cleanup=null,R={v:'heute'},runCfg=null;
function stopAll(){if(cleanup){cleanup();cleanup=null;}}
function parse(){const p=location.hash.replace(/^#\/?/,'').split('/').filter(Boolean).map(decodeURIComponent);
  const m={thema:'topic',heute:'heute',plan:'plan',wiederholen:'wdh',fehlerheft:'fehler',pruefung:'pruefung',fall:'case',belegsatz:'beleg',einstellungen:'settings',runde:'run',themen:'themen'};
  const v=m[p[0]]||'heute';const steps={video:0,quiz:1,schreiben:2};
  return {v,id:p[1],step:p[2]!=null?steps[p[2]]:null};}
function nav(hash){if(location.hash===hash)render();else location.hash=hash;}
const topicHash=(id,step)=>'#/thema/'+id+(step!=null?'/'+['video','quiz','schreiben'][step]:'');
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});
function render(){
  stopAll();closeDrawer();R=parse();
  if(pendingRemote&&!busyRoute()){applyRemote(pendingRemote);pendingRemote=null;}
  if(R.v==='topic'&&!BY[R.id])R={v:'heute'};
  if(R.v==='run'&&!runCfg)R={v:'heute'};
  if(R.v==='themen'&&window.matchMedia('(min-width:960px)').matches)R={v:'heute'};
  renderSide();
  const fn={heute:renderHeute,plan:renderPlan,topic:renderTopic,wdh:renderWdh,fehler:renderFehler,pruefung:renderPruefung,case:()=>openCase(R.id),beleg:openBeleg,settings:renderSettings,run:renderRun,themen:renderThemenMobile}[R.v];
  fn();
  const titles={heute:'Heute',plan:'Lernplan',wdh:'Wiederholen',fehler:'Fehlerheft',pruefung:'Prüfungstraining',beleg:'Belegsatz',settings:'Einstellungen',run:runCfg&&runCfg.title,themen:'Themen'};
  $('#mTitle').textContent=R.v==='topic'?BY[R.id].title:(R.v==='case'?'Prüfungsfall':(titles[R.v]||'AP2 Trainer'));
  document.querySelectorAll('.tab').forEach(b=>{const map={heute:['heute','plan','settings'],themen:['topic','themen'],wdh:['wdh','fehler','run'],pruefung:['pruefung','case','beleg']};b.setAttribute('aria-current',(map[b.dataset.tab]||[]).includes(R.v)?'page':'false');});
}

/* ================= Seitenleiste ================= */
function renderSide(){
  const due=dueReview().length;$('#cd').textContent=daysLeft();$('#cdM').textContent=daysLeft()+' T';
  const bd=$('#wdhBadge');bd.hidden=!due;bd.textContent=due;
  const nWrong=Object.values(S.wrong).filter(w=>!w.fixed).length;
  const items=[['heute','#/heute','Heute',I.home],['plan','#/plan','Lernplan',I.cal],['wdh','#/wiederholen','Wiederholen',I.rep,due],['fehler','#/fehlerheft','Fehlerheft',I.err,nWrong],['pruefung','#/pruefung','Prüfungstraining',I.exam]];
  const act=v=>R.v===v||(v==='pruefung'&&(R.v==='case'||R.v==='beleg'))||(v==='wdh'&&R.v==='run');
  $('#nav').innerHTML=items.map(([v,href,t,ic,b])=>`<button class="nv" data-href="${href}" aria-current="${act(v)?'page':'false'}">${ic}<span>${t}</span>${b?`<span class="badge num">${b}</span>`:''}</button>`).join('');
  const dp=dayProgress();const dpEl=$('#dayp');if(dpEl){dpEl.innerHTML=`<span>Heute <b class="num">${dp.n}/${dp.all}</b>${dayLog().closed?' · abgeschlossen ✓':''}</span><span class="rs-bar"><i style="width:${dp.all?dp.n/dp.all*100:0}%"></i></span>`;}
  const next=ORDER.find(id=>!isDone(id));
  const rs=$('#resume');
  if(next){const l=BY[next];const st=nextStep(next);const pc=lessonPct(next);
    rs.innerHTML=`<span class="rs-ey">Weiter, wo du warst</span><span class="rs-t">${esc(l.title)}</span><span class="rs-m"><span class="rs-step">${[I.play,I.quiz,I.pen][st]}${['Video','Quiz','Schreiben'][st]}</span><span class="num">${pc} %</span></span><span class="rs-bar"><i style="width:${pc}%"></i></span>`;
    rs.dataset.href=topicHash(next,st);rs.hidden=false;}
  else rs.hidden=true;
  $('#allPct').textContent=LESSONS.filter(l=>isDone(l.id)).length+' von '+LESSONS.length+' fertig';
  $('#fchips').innerHTML=[['all','Alle'],['GA1','GA1'],['GA2','GA2'],['WISO','WiSo']].map(([k,t])=>`<button data-af="${k}" class="${(S.af||'all')===k?'on':''} ${k}">${t}</button>`).join('');
  $('#tree').innerHTML=treeHtml();
  paintSync();
}
const CAT_IC={start:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></svg>',algo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',db:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',uml:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 8.5h16M4 14h16"/></svg>',proj:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/></svg>',sec:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>',arch:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="6" rx="1"/><rect x="14" y="14" width="7" height="6" rx="1"/><path d="M6.5 10v4a3 3 0 0 0 3 3H14M17.5 14v-4a3 3 0 0 0-3-3H10"/></svg>',wiso1:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.5M18 14a5 5 0 0 1 3 6"/></svg>',wiso2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V9l8-5 8 5v12M9 21v-6h6v6M3 21h18"/></svg>',exam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>'};
function statusIcon(id){const d=stepsDone(id);const n=d.filter(Boolean).length;
  if(n===3)return '<span class="st done" title="fertig"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>';
  return `<span class="st" style="--p:${n/3*100}" title="${n} von 3 Schritten"></span>`;}
function treeHtml(){
  const q=($('#tSearch')&&$('#tSearch').value||'').trim().toLowerCase();const af=S.af||'all';
  const match=id=>{const l=BY[id];return (af==='all'||l.area===af)&&(!q||l.title.toLowerCase().includes(q)||CAT_OF[id].t.toLowerCase().includes(q));};
  const curCat=R.v==='topic'&&CAT_OF[R.id]?CAT_OF[R.id].id:null;
  let html=CATS.map((c,ci)=>{const ids=c.items.filter(match);if(!ids.length)return '';
    const done=c.items.filter(isDone).length;const p=catPct(c);const open=q||af!=='all'?true:(S.openCat?S.openCat===c.id:curCat===c.id);
    return `<div class="cat ${open?'open':''} ${curCat===c.id?'cur':''}"><button class="cat-h" data-tog="${c.id}" aria-expanded="${open}">
      <span class="cat-ic">${ci+1}</span><span class="cat-tx"><b>${esc(c.t)}</b><span class="cat-bar"><i style="width:${p}%"></i></span></span><span class="cat-cnt ${done===c.items.length?'full':''}">${done}/${c.items.length}</span>${I.chev}</button>
      <div class="cat-b">${ids.map(id=>{const l=BY[id];const d=stepsDone(id);const fin=isDone(id);return `<button class="tp ${fin?'fin':''}" data-href="${topicHash(id)}" aria-current="${R.v==='topic'&&R.id===id?'page':'false'}"><span class="tn">${ci+1}.${c.items.indexOf(id)+1}</span><span class="tt">${esc(l.title)}${l.prio===1&&!fin?' <span class="must" title="Kommt fast immer dran">Muss</span>':''}</span><span class="tr">${fin?'<span class="ck" title="fertig">✓</span>':`<span class="pips" title="Video, Quiz, Schreiben">${d.map(x=>`<i class="${x?'on':''}"></i>`).join('')}</span>`}</span></button>`;}).join('')}</div></div>`;}).join('');
  if(!q&&(af==='all')){const n=CASES.filter(c=>caseResult(c).checked).length;const open=S.openCat==='exam'||R.v==='case';
    html+=`<div class="cat ${open?'open':''}"><button class="cat-h" data-tog="exam" aria-expanded="${open}"><span class="cat-ic">P</span><span class="cat-tx"><b>Prüfungsfälle</b><span class="cat-bar"><i style="width:${Math.round(n/CASES.length*100)}%"></i></span></span><span class="cat-cnt">${n}/${CASES.length}</span>${I.chev}</button>
    <div class="cat-b">${CASES.map(c=>{const r=caseResult(c);return `<button class="tp" data-href="#/fall/${c.id}" aria-current="${R.v==='case'&&R.id===c.id?'page':'false'}" title="${esc(c.title)}"><span class="tn">${c.area}</span><span class="tt">${esc(c.title.replace(/^Fall \d+: /,''))}</span><span class="tr">${r.checked?`<span class="ck">${r.points}</span>`:''}</span></button>`;}).join('')}
    <button class="tp" data-href="#/belegsatz"><span class="tn"></span><span class="tt">Belegsatz-Spickzettel</span><span class="tr"></span></button></div></div>`;}
  return html||'<p class="small muted" style="padding:10px">Kein Thema gefunden.</p>';
}
function bindTree(root){
  root.addEventListener('click',e=>{const t=e.target.closest('[data-tog],[data-af],[data-href]');if(!t||!root.contains(t))return;
    if(t.dataset.tog){const id=t.dataset.tog;const el=t.closest('.cat');const open=!el.classList.contains('open');
      root.querySelectorAll('.cat.open').forEach(c=>{if(c!==el){c.classList.remove('open');c.querySelector('.cat-h').setAttribute('aria-expanded','false');}});
      el.classList.toggle('open',open);t.setAttribute('aria-expanded',open);S.openCat=open?id:'none';save();return;}
    if(t.dataset.af){S.af=t.dataset.af;save();renderSide();return;}
    nav(t.dataset.href);});
  const s=$('#tSearch');s.addEventListener('input',()=>{$('#tree').innerHTML=treeHtml();});
}
function openDrawer(toTree){document.body.classList.add('drawer');const sc=$('.side-scroll');if(toTree){const t=$('.tree-tools');if(t)sc.scrollTop=t.getBoundingClientRect().top-sc.getBoundingClientRect().top+sc.scrollTop-6;}}
function closeDrawer(){document.body.classList.remove('drawer');}
bindTree($('#side'));$('#syncNote').addEventListener('click',()=>{if(fbOn())nav('#/einstellungen');});$('#settingsBtn').addEventListener('click',()=>nav('#/einstellungen'));
$('#menuBtn').addEventListener('click',()=>openDrawer());$('#scrim').addEventListener('click',closeDrawer);
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>nav('#/'+b.dataset.go)));
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{const t=b.dataset.tab;if(t==='themen'){openDrawer(true);return;}nav({heute:'#/heute',wdh:'#/wiederholen',pruefung:'#/pruefung'}[t]);}));
function renderThemenMobile(){renderHeute();openDrawer(true);}
function bindCommon(root){root=root||view;
  root.querySelectorAll('[data-href]').forEach(b=>b.addEventListener('click',()=>nav(b.dataset.href)));
  root.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>ACT[b.dataset.act](b)));}
const ACT={
  review:()=>{const due=dueReview();if(!due.length){toast('Gerade nichts fällig');return;}startRun(shuffle(due).slice(0,25).map(qByKey),{title:'Wiederholen',showLesson:true,xpEach:5,kind:'review'});},
  mix:()=>{const ids=ORDER.filter(id=>L(id).quizBest>=0);const pool=(ids.length?ids:ORDER.slice(0,6)).flatMap(id=>BY[id].quiz);startRun(shuffle(pool).slice(0,15),{title:'Mix-Runde',showLesson:true,xpEach:5,kind:'mix'});},
  wiso:()=>startRun(shuffle(LESSONS.filter(l=>l.area==='WISO').flatMap(l=>l.quiz).concat(WISO_BANK)).slice(0,30),{title:'WiSo-Prüfung',total:3600,xpEach:5,kind:'wiso'}),
  blitz:()=>startRun(shuffle(LESSONS.flatMap(l=>l.quiz).concat(WISO_BANK)).slice(0,10),{title:'Blitzrunde',timer:20,showLesson:true}),
  gamix:()=>startRun(shuffle(LESSONS.filter(l=>l.area!=='WISO').flatMap(l=>l.quiz)).slice(0,15),{title:'GA-Mix',timer:45,showLesson:true}),
  fehler:()=>{const ks=Object.keys(S.wrong).filter(k=>!S.wrong[k].fixed&&qByKey(k));if(!ks.length){toast('Fehlerheft ist leer');return;}startRun(shuffle(ks).slice(0,25).map(qByKey),{title:'Fehlerheft üben',showLesson:true,xpEach:5});}
};

/* ================= HEUTE ================= */
/* Tagesplan: wird beim ersten Öffnen des Tages eingefroren, damit sich die Liste nicht verschiebt, während du lernst */
function dayLog(){const t=today();return S.daylog[t]||(S.daylog[t]={topics:[]});}
function dayTasks(){
  const lg=dayLog();
  if(lg.snap&&lg.snap.topics.includes('technik')&&lessonPct('technik')===0)delete lg.snap;
  if(!lg.snap){const p=buildPlan().plan[0];lg.snap={topics:p.topics.slice(),cases:p.cases.slice(),wiso:p.wiso,mix:p.mix,light:p.light};save();}
  const sn=lg.snap;const man=lg.manual||{};const due=dueReview().length;const T=[];
  sn.topics.forEach(id=>{const l=BY[id];if(!l)return;const d=stepsDone(id);const st=nextStep(id);const fin=d.every(Boolean);
    T.push({key:'t:'+id,done:fin||!!man['t:'+id],auto:fin,title:l.title,sub:fin?'Video, Quiz und Schreiben erledigt':`${d.filter(Boolean).length} von 3 Schritten · als Nächstes ${['Video','Quiz','Schreiben'][st]}`,mins:fin?0:Math.round((l.mins+25)*(3-d.filter(Boolean).length)/3),href:topicHash(id,fin?null:st),ic:fin?'✓':[I.play,I.quiz,I.pen][st],go:d.some(Boolean)?'Weiter':'Starten'});});
  T.push({key:'review',done:due===0||!!man.review,auto:due===0,title:'Wiederholen',sub:due?`${due} Fragen fällig`:'gerade nichts fällig',mins:due?Math.max(5,Math.round(due*.6)):0,act:'review',ic:I.rep,go:'Starten'});
  if(sn.mix)T.push({key:'mix',done:!!lg.mixDone||!!man.mix,auto:!!lg.mixDone,title:'Mix-Runde',sub:'15 gemischte Fragen aus deinen Themen',mins:10,act:'mix',ic:I.mix,go:'Starten'});
  sn.cases.forEach(cid=>{const c=CASES.find(x=>x.id===cid);if(!c)return;const r=caseResult(c);T.push({key:'c:'+cid,done:r.checked||!!man['c:'+cid],auto:r.checked,title:c.title,sub:`Prüfungsfall ${c.area} · 90 Minuten unter Zeitdruck`,mins:95,href:'#/fall/'+cid,ic:I.case,go:'Starten'});});
  if(sn.wiso)T.push({key:'wiso',done:!!lg.wisoDone||!!man.wiso,auto:!!lg.wisoDone,title:'WiSo-Prüfung simulieren',sub:'30 Fragen in 60 Minuten',mins:60,act:'wiso',ic:I.exam,go:'Starten'});
  if(sn.light)T.push({key:'light',done:!!man.light,auto:false,title:'Generalprobe light',sub:'Belegsatz und Fehlerheft durchgehen, früh schlafen',mins:60,href:'#/belegsatz',ic:I.bulb,go:'Öffnen'});
  return T;
}
function dayProgress(){const T=dayTasks();const n=T.filter(t=>t.done).length;return {T,n,all:T.length,rest:T.filter(t=>!t.done).reduce((a,t)=>a+t.mins,0)};}

function renderHeute(){
  const tk=today();const lg=dayLog();const {T,n,all,rest}=dayProgress();const due=dueReview().length;
  const cur=T.find(t=>!t.done);const closed=!!lg.closed;
  const nextPlan=buildPlan().plan[1];
  const row=t=>`<div class="td ${t.done?'done':''} ${t===cur&&!closed?'now':''}">
      <button class="tick" data-tick="${t.key}" aria-label="${t.done?'Als offen markieren':'Als erledigt markieren'}" ${t.auto?'disabled title="automatisch erledigt"':''}>${t.done?'✓':''}</button>
      <button class="td-main" ${t.href?`data-href="${t.href}"`:`data-act="${t.act}"`}><span class="td-t">${t===cur&&!closed?'<span class="nowtag">Jetzt dran</span>':''}<b>${esc(t.title)}</b><small>${t.sub}${!t.done&&t.mins?' · ca. '+t.mins+' min':''}</small></span></button>
      ${t.done?'':`<button class="btn sm ${t===cur?'':'ghost'}" ${t.href?`data-href="${t.href}"`:`data-act="${t.act}"`}>${t.go}</button>`}
    </div>`;
  const pct=all?Math.round(n/all*100):0;
  view.replaceChildren(h(`<div class="stack-lg">
    ${closed?`<section class="hero done-day"><div><p>${new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})}</p><h1>Tag geschafft ✓</h1><p>${n} von ${all} Aufgaben erledigt · ${S.days[tk]||0} XP · ${streak()} ${streak()===1?'Tag':'Tage'} am Stück</p></div><div class="cd"><b class="num">${daysLeft()}</b><span>Tage bis 25.11.</span></div>
        <div class="go"><button class="btn ghost" id="reopen">Tag wieder öffnen</button>${nextPlan&&nextPlan.topics[0]?`<button class="btn" data-href="${topicHash(nextPlan.topics[0])}">Bonus: schon mit morgen anfangen</button>`:''}</div></section>`
    :`<section class="hero"><div><p>${new Date().toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})}</p><h1>${n===0?(S.xp?'Willkommen zurück.':'Los geht’s.'):(n===all?'Alles erledigt!':'Weiter so.')}</h1><p>${n} von ${all} erledigt${rest?' · noch ca. '+fmtMin(rest):''}</p></div>
      <div class="cd"><b class="num">${daysLeft()}</b><span>Tage bis 25.11.</span></div>
      <div class="go">${cur?`<button class="btn" ${cur.href?`data-href="${cur.href}"`:`data-act="${cur.act}"`}>${I.play} Jetzt: ${esc(cur.title)}</button>`:`<button class="btn" id="close1">Tag abschließen</button>`}</div></section>`}
    <section class="stack">
      <div class="row between"><h2>Dein Plan für heute</h2><span class="num muted">${n}/${all} · ${pct} %</span></div>
      <div class="bar ok"><i style="width:${pct}%"></i></div>
      <div class="todo">${T.map(row).join('')}</div>
      ${closed?'':`<div class="row between dayfoot"><p class="small muted">Haken setzen sich von selbst, sobald du etwas fertig hast. Du kannst sie auch selbst setzen.</p><button class="btn ${n===all?'':'ghost'}" id="closeDay">${n===all?'Tag abschließen ✓':'Tag abschließen'}</button></div>`}
    </section>
    ${nextPlan?`<section class="stack" style="gap:8px"><h3>Morgen dran</h3><p class="small muted">${[...nextPlan.topics.map(id=>esc(BY[id].title)),...nextPlan.cases.map(cid=>esc(CASES.find(c=>c.id===cid).title)),nextPlan.wiso?'WiSo-Simulation':'',nextPlan.light?'Generalprobe light':''].filter(Boolean).join(' · ')||'Wiederholen'}</p></section>`:''}
    <p class="sumline">Gesamt <b>${allPct()} %</b> · <b>${LESSONS.filter(l=>isDone(l.id)).length} von ${LESSONS.length}</b> Themen fertig · <b>${streak()}</b> ${streak()===1?'Tag':'Tage'} am Stück</p>
    <section class="stack" style="gap:10px"><h2>Stand pro Prüfungsbereich</h2><div class="areas">${['GA1','GA2','WISO'].map(a=>`<span class="area ${a}">${AREA[a]}</span><div class="bar"><i style="width:${areaPct(a)}%"></i></div><span class="num muted">${LESSONS.filter(l=>l.area===a&&isDone(l.id)).length}/${LESSONS.filter(l=>l.area===a).length} · <b style="color:var(--ink)">${areaPct(a)} %</b></span>`).join('')}</div></section>
  </div>`));
  bindCommon();
  view.querySelectorAll('[data-tick]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.tick;lg.manual=lg.manual||{};lg.manual[k]=!lg.manual[k];save();renderHeute();renderSide();}));
  const close=()=>{lg.closed=true;lg.closedAt=Date.now();if(!S.days[tk])S.days[tk]=1;save();toast('Tag abgeschlossen');renderHeute();renderSide();window.scrollTo(0,0);};
  const cb=$('#closeDay');if(cb)cb.addEventListener('click',()=>{if(n<all&&!cb.dataset.sure){cb.dataset.sure=1;cb.textContent=`Noch ${all-n} offen. Trotzdem abschließen?`;return;}close();});
  const c1=$('#close1');if(c1)c1.addEventListener('click',close);
  const ro=$('#reopen');if(ro)ro.addEventListener('click',()=>{lg.closed=false;save();renderHeute();renderSide();});
}

/* ================= LERNPLAN & METHODEN ================= */
function renderPlan(){
  const {plan,topicDays,perDay}=buildPlan();const tk=today();
  const ex=today(EXAM);
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>Lernplan bis zur Prüfung</h1><p class="muted">Gebaut für 3 bis 4 Stunden am Tag. Erst alle Themen (${perDay} pro Tag an ${topicDays} Tagen), dann komplette Prüfungsfälle unter Zeitdruck, der letzte Tag bleibt locker. Der Plan rechnet sich jeden Tag neu: Schaffst du mehr, rückt alles nach vorne.</p></div>
    <div class="days">${plan.map((p,i)=>`<div class="dy ${p.date===tk?'today':''}"><b>${new Date(p.date+'T12:00').getDate()}.</b>${p.date===tk?'heute':fmtD(p.date).slice(0,2)}<br>${p.light?'locker':(p.cases.length?p.cases.length+' Fall':p.topics.length+' Th.')}</div>`).join('')}<div class="dy exam"><b>25.</b>Prüfung</div></div>
    <section class="stack">${plan.map(p=>`<div class="card stack" style="gap:8px"><div class="row between"><b>${p.date===tk?'Heute':fmtD(p.date)}</b><span class="chip num">${fmtMin(p.mins)}</span></div>
      ${p.topics.length?`<div class="row" style="gap:6px">${p.topics.map(id=>`<button class="chip ${isDone(id)?'ok':''}" data-href="${topicHash(id)}" style="border:0;cursor:pointer">${isDone(id)?'✓ ':''}${esc(BY[id].title)}</button>`).join('')}</div>`:''}
      ${p.cases.length?`<div class="row" style="gap:6px">${p.cases.map(cid=>{const c=CASES.find(x=>x.id===cid);return `<button class="chip acc" data-href="#/fall/${cid}" style="border:0;cursor:pointer">${esc(c.title)}</button>`;}).join('')}</div>`:''}
      <p class="small muted">${[p.review?'Wiederholen':'',p.mix?'Mix-Runde':'',p.wiso?'WiSo-Simulation 60 min':'',p.light?'Nur Belegsatz, Fehlerheft und Schlaf. Nichts Neues mehr.':''].filter(Boolean).join(' · ')}</p></div>`).join('')}</section>
    <section class="stack"><h2>Lernmethoden, die hier eingebaut sind</h2>
      <div class="card stack">
        ${[
         ['Aktives Abrufen statt Wiederlesen','Direkt nach jedem Video kommt das Quiz. Etwas aus dem Kopf zu holen speichert es deutlich besser als nochmal zuschauen. Im Video selbst kommen Mitdenk-Fragen, bevor aufgelöst wird.'],
         ['Verteiltes Wiederholen','Falsche Antworten kommen nach 10 Minuten, 1, 2, 4 und 7 Tagen wieder, gestaucht auf die Zeit bis zum 25.11. Plane jeden Tag die Wiederholen-Runde zuerst ein, sie dauert selten über 20 Minuten.'],
         ['Vermischen (Interleaving)','Die Mix-Runde wirft Fragen aus allen bisherigen Themen durcheinander. Fühlt sich schwerer an, genau das trainiert die Prüfungssituation, in der niemand ansagt, welches Thema gerade dran ist.'],
         ['Schreiben wie in der Prüfung','GA1 und GA2 sind offene Aufgaben. Deshalb schreibst du pro Thema echte Antworten und vergleichst mit der Musterlösung. Trick: Musterlösung lesen, Feld leeren, aus dem Kopf neu schreiben.'],
         ['Feynman-Check','Wenn du ein Thema durch hast: Erkläre es in 60 Sekunden laut, als wärst du Tom. Wo du stockst, ist die Lücke. Dann gezielt das Kapitel im Video anspringen.'],
         ['Pomodoro für 3 bis 4 Stunden','50 Minuten lernen, 10 Minuten Pause, nach drei Blöcken 30 Minuten Pause. Ein Block entspricht ungefähr einem Thema. Im Bett lieber Videos und Wiederholen, Schreiben am Schreibtisch.'],
         ['Prüfungsfälle unter Zeit','Ab der zweiten Woche löst du komplette Fälle mit 90-Minuten-Timer und bewertest dich ehrlich nach Schema. Das trainiert Zeitmanagement, an dem viele scheitern.']
        ].map((t,i)=>`<div class="tip"><span class="n">${i+1}</span><div><b>${t[0]}</b><p class="small muted">${t[1]}</p></div></div>`).join('')}
      </div>
    </section>
    <section class="card stack"><h3>Zum Nachhören (IT-Berufe-Podcast)</h3><p class="small muted">Stefan Macke wertet regelmäßig aus, welche Themen in den AP2-Prüfungen drankamen. Daher stammen die Gewichtungen in diesem Trainer. Gut für Spaziergänge.</p>
      <div class="vids">
        <a class="vid" href="https://it-berufe-podcast.de/vorbereitung-auf-die-ihk-abschlusspruefung-der-it-berufe/themen-der-schriftlichen-ihk-pruefungen-der-it-berufe/" target="_blank" rel="noopener"><span class="pl" style="background:var(--accent)">${I.yt}</span><span><b>Themen aller AP2-Prüfungen seit 2021</b><span>Auswertung, welche Themen wie oft drankamen</span></span></a>
        <a class="vid" href="https://it-berufe-podcast.de/neuer-pruefungskatalog-fuer-die-ap2-als-fachinformatiker-anwendungsentwicklung-ab-2025-it-berufe-podcast-191/" target="_blank" rel="noopener"><span class="pl" style="background:var(--accent)">${I.yt}</span><span><b>Folge 191: Neuer Prüfungskatalog AP2 ab 2025</b><span>Was neu ist, was gestrichen wurde</span></span></a>
      </div></section>
  </div>`));
  bindCommon();
}

/* ================= THEMA ================= */
function renderTopic(){
  const l=BY[R.id];const c=CAT_OF[l.id];const d=stepsDone(l.id);const s=L(l.id);const pc=lessonPct(l.id);
  const step=R.step;const nx=nextStep(l.id);const started=d.some(Boolean);const all=d.every(Boolean);
  const vMin=Math.max(2,Math.round((((l.clip2||[]).reduce((a,x)=>a+x.beats.length,0)+Object.values(EXTRA[l.id]||{}).reduce((a,x)=>a+x.length*2,0))*6+40)/60));
  const sinfo=[
    {t:'Video',ic:I.play,sub:`ca. ${vMin} Min · ${(l.clip2||[]).length} Kapitel`,st:s.clip?'angesehen':''},
    {t:'Quiz',ic:I.quiz,sub:`${l.quiz.length} Fragen`,st:s.quizBest>=0?s.quizBest+' %':''},
    {t:'Schreiben',ic:I.pen,sub:`${l.write.length} Aufgabe${l.write.length>1?'n':''}`,st:Object.keys(s.write).length?Object.keys(s.write).length+'/'+l.write.length:''}];
  if(step==null){
    const goStep=all?0:nx;
    view.replaceChildren(h(`<div class="launch">
      <div class="launch-card">
        <div class="crumb" style="justify-content:center"><span>${esc(c.t)}</span><span>·</span><span class="area ${l.area}">${AREA[l.area]}</span><span class="chip ${l.prio===1?'bad':''}">${['','Muss','Wichtig','Bonus'][l.prio]}</span></div>
        <h1>${esc(l.title)}</h1>
        <p class="muted">${esc(l.why)}</p>
        <div class="launch-meta"><span>${ring(pc)}<b>${pc} %</b> geschafft</span><span>⏱ ca. ${vMin+25} Min</span><span>3 Schritte</span></div>
        <button class="btn launch-go" data-href="${topicHash(l.id,goStep)}">${I.play} ${all?'Nochmal ansehen':(started?'Kurs fortsetzen · '+sinfo[nx].t:'Kurs starten')}</button>
        <ol class="launch-steps">${sinfo.map((x,i)=>`<li class="${d[i]?'done':''}"><button data-href="${topicHash(l.id,i)}"><span class="pi">${d[i]?'✓':i+1}</span><span><b>${x.t}</b><small>${x.sub}${x.st?' · '+x.st:''}</small></span></button></li>`).join('')}</ol>
      </div>
      ${topicNav(l.id)}
    </div>`));
    bindCommon();return;
  }
  view.replaceChildren(h(`<div class="course">
    <div class="cbar">
      <button class="iconbtn" data-href="${topicHash(l.id)}" aria-label="Zur Übersicht">${I.back}</button>
      <div class="cbar-t"><small>${esc(c.t)}</small><b>${esc(l.title)}</b></div>
      <ol class="stepper">${sinfo.map((x,i)=>`<li class="${d[i]?'done':''} ${step===i?'cur':''}"><button data-href="${topicHash(l.id,i)}" aria-current="${step===i?'step':'false'}"><span class="sn">${d[i]?'✓':i+1}</span><span class="sl">${x.t}</span></button></li>`).join('')}</ol>
    </div>
    <div id="body" class="stack"></div>
    <div class="cfoot">
      ${step>0?`<button class="btn ghost" data-href="${topicHash(l.id,step-1)}">${I.back} ${sinfo[step-1].t}</button>`:`<button class="btn ghost" data-href="${topicHash(l.id)}">${I.back} Übersicht</button>`}
      ${step<2?`<button class="btn" data-href="${topicHash(l.id,step+1)}">Weiter: ${sinfo[step+1].t} <span style="transform:rotate(180deg);display:inline-flex">${I.back}</span></button>`:(()=>{const i=ORDER.indexOf(l.id);const nid=ORDER.find((x,j)=>j>i&&!isDone(x))||ORDER[i+1];return nid?`<button class="btn" data-href="${topicHash(nid)}">Nächstes Thema <span style="transform:rotate(180deg);display:inline-flex">${I.back}</span></button>`:'';})()}
    </div></div>`));
  bindCommon();
  const body=$('#body');
  if(step===0)videoStep(l,body);
  if(step===1)quizStep(l,body);
  if(step===2)writeStep(l,body);
}
function topicNav(id){const i=ORDER.indexOf(id);const nid=ORDER.find((x,j)=>j>i&&!isDone(x))||ORDER[i+1];
  return nid?`<button class="lrow" data-href="${topicHash(nid)}"><span class="t">Nächstes empfohlenes Thema: ${esc(BY[nid].title)}</span>${ring(lessonPct(nid))}</button>`:'';}
function markStepDone(i){const st=view.querySelector(`.stepper li:nth-child(${i+1})`);if(st){st.classList.add('done');st.querySelector('.sn').textContent='✓';}renderSide();}

function videoStep(l,body){
  body.append(h(`<div id="vpRoot"></div><div id="after"></div>${l.videos&&l.videos.length?`<details class="card"><summary style="cursor:pointer;font-weight:700">Zusätzlich auf YouTube (${l.videos.length})</summary><div class="vids" style="margin-top:10px">${l.videos.map(v=>`<a class="vid" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener"><span class="pl">${I.yt}</span><span><b>${esc(v.t)}</b><span>${esc(v.c)}</span></span></a>`).join('')}</div></details>`:''}`));
  cleanup=VideoPlayer.mount($('#vpRoot',body),l,{settings:S,onSettings:save,dialog:DIALOG[l.id],merke:(typeof MERKE!=='undefined'?MERKE[l.id]:null),extra:EXTRA[l.id],area:l.area,areaLabel:AREA[l.area],
    onCheck:ok=>{if(ok)gain(5);},
    onFinish:notes=>{const s=L(l.id);if(!s.clip){s.clip=true;gain(20);toast('Video geschafft · +20 XP');checkComplete(l.id);}markStepDone(0);
      $('#after').replaceChildren(h(`<div class="card stack"><h3>Jetzt sofort abrufen, solange es frisch ist.</h3>${notes&&notes.length?`<details><summary style="cursor:pointer;font-weight:700">Merkzettel zum Thema (${notes.length})</summary><ol style="margin:8px 0 0;padding-left:1.3em;display:flex;flex-direction:column;gap:4px">${notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ol></details>`:''}<p class="small muted">Das Quiz direkt nach dem Video bringt mehr als das Video zweimal zu schauen.</p><button class="btn block" data-href="${topicHash(l.id,1)}">Quiz starten</button></div>`));bindCommon($('#after'));}});
}

/* ----- Quiz-Engine ----- */
function runQuiz(container,items,opts){
  opts=opts||{};let idx=0,right=0;const res=[];let tmr=null,ttm=null;const tEnd=opts.total?Date.now()+opts.total*1000:0;
  if(opts.total){ttm=setInterval(()=>{const r=Math.max(0,Math.round((tEnd-Date.now())/1000));const el=container.querySelector('#tt');if(el)el.textContent=Math.floor(r/60)+':'+String(r%60).padStart(2,'0');if(r<=0){clearInterval(ttm);end(true);}},500);}
  let keyH=null;
  function q(){clearInterval(tmr);
    if(idx>=items.length)return end();
    const it=items[idx];const isCode=/\n/.test(it.q)&&/[=;(]|für|solange|SELECT/i.test(it.q);
    const parts=isCode?it.q.split('\n\n'):[it.q];
    const qhtml=isCode?(parts.length>1?`<div class="qtext code">${esc(parts.slice(0,-1).join('\n\n'))}</div><div class="qtext">${esc(parts[parts.length-1])}</div>`:`<div class="qtext code">${esc(it.q)}</div>`):`<div class="qtext">${esc(it.q)}</div>`;
    const order=it.type==='input'?null:shuffle(it.o.map((t,k)=>k));
    container.replaceChildren(h(`<div class="stack">
      <div class="qtop"><span class="eyebrow num">Frage ${idx+1} / ${items.length}</span><span class="row" style="gap:6px">${opts.showLesson?`<span class="area ${areaOf(it)}">${AREA[areaOf(it)]}</span>`:''}${opts.total?`<span class="chip mark num" id="tt"></span>`:''}</span></div>
      <div class="qprog"><i style="width:${idx/items.length*100}%"></i></div>
      ${opts.timer?'<div class="timer"><i id="ti"></i></div>':''}
      ${qhtml}
      ${it.type==='input'?`<form id="f" class="stack"><input class="inp" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Antwort eintippen" inputmode="${/^-?[\d,.]+$/.test(it.a[0])?'decimal':'text'}"><button class="btn block">Prüfen</button></form>`:`<div class="opts">${order.map((k,j)=>`<button class="opt" data-k="${k}"><span class="k">${'ABCDEF'[j]}</span><span>${esc(it.o[k])}</span></button>`).join('')}</div>`}
      <div id="fb"></div></div>`));
    let answered=false;
    function answer(ok,given){if(answered)return;answered=true;clearInterval(tmr);
      if(ok){right++;markRight(it._k);}else markWrong(it._k);
      res.push({k:it._k,ok});
      if(it.type!=='input'){container.querySelectorAll('.opt').forEach(b=>{b.disabled=true;const k=+b.dataset.k;if(k===it.a)b.classList.add('right');else if(k===given)b.classList.add('wrong');});}
      else{const i=$('#ans',container);i.disabled=true;container.querySelector('#f button').remove();}
      const corr=it.type==='input'?it.a[0]:it.o[it.a];
      $('#fb',container).replaceChildren(h(`<div class="stack"><div class="fb ${ok?'ok':'bad'}"><b>${ok?'Richtig':(given===-2?'Zeit abgelaufen':'Nicht ganz')}</b>${ok?'':'Richtig ist: <b style="display:inline;color:inherit">'+esc(corr)+'</b><br>'}${esc(it.e)}</div><button class="btn block" id="nq">${idx+1<items.length?'Nächste Frage':'Auswertung'}</button></div>`));
      $('#nq',container).addEventListener('click',()=>{idx++;q();container.scrollIntoView({block:'start',behavior:'smooth'});});
      $('#nq',container).focus({preventScroll:true});
    }
    if(it.type==='input'){const f=$('#f',container);f.addEventListener('submit',e=>{e.preventDefault();const v=$('#ans',container).value;if(!v.trim())return;answer(it.a.some(a=>norm(a)===norm(v)),-1);});setTimeout(()=>{const a=$('#ans',container);if(a&&!opts.timer&&matchMedia('(pointer:fine)').matches)a.focus({preventScroll:true});},50);}
    else container.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{const k=+b.dataset.k;answer(k===it.a,k);}));
    if(opts.timer){const t0=Date.now(),T=opts.timer*1000;const bar=$('#ti',container);tmr=setInterval(()=>{const p=1-(Date.now()-t0)/T;bar.style.width=Math.max(0,p*100)+'%';if(p<=0)answer(false,-2);},100);}
  }
  keyH=e=>{if(e.target.matches('input,textarea'))return;const i='abcdef1234'.indexOf(e.key.toLowerCase());if(i<0)return;const n=i>=6?i-6:i;const b=container.querySelectorAll('.opt')[n];if(b&&!b.disabled)b.click();};
  document.addEventListener('keydown',keyH);
  let ended=false;
  function end(timeUp){if(ended)return;ended=true;clearInterval(tmr);clearInterval(ttm);const pct=Math.round(right/items.length*100);opts.onEnd&&opts.onEnd(pct,right,res);
    const pass=pct>=50;
    container.replaceChildren(h(`<div class="card result stack"><span class="eyebrow">Ergebnis</span><div class="score num">${pct} %</div><p>${right} von ${items.length} richtig${timeUp?' · Zeit abgelaufen':''}</p>
      <p class="chip ${pass?'ok':'bad'}" style="align-self:center">${pass?'Bestehens-Niveau erreicht':'Unter 50 %, nochmal ran'}</p>
      ${res.some(r=>!r.ok)?'<p class="small muted">Falsche Antworten liegen jetzt in Wiederholen und im Fehlerheft.</p>':''}
      <div id="endBtns" class="stack"></div></div>`));
    opts.endButtons&&opts.endButtons($('#endBtns',container));
    save();renderSide();}
  q();
  return ()=>{clearInterval(tmr);clearInterval(ttm);document.removeEventListener('keydown',keyH);};
}
function quizStep(l,body){
  const s=L(l.id);
  if(!s.clip)body.append(h(`<p class="why">Tipp: Erst das Video. Das Quiz fragt genau das ab. Oder teste dich vorher, Raten vor dem Lernen hilft beim Merken auch.</p>`));
  const box=document.createElement('div');body.append(box);
  cleanup=runQuiz(box,shuffle(l.quiz),{onEnd:(pct,right)=>{s.quizBest=Math.max(s.quizBest,pct);gain(right*10);toast('+'+(right*10)+' XP');markStepDone(1);checkComplete(l.id);},
    endButtons:el=>{el.append(h(`<button class="btn block" data-href="${topicHash(l.id,2)}">Weiter zum Schreiben</button><button class="btn ghost block" id="again">Quiz nochmal</button>`));bindCommon(el);
      $('#again',el).addEventListener('click',()=>render());}});
}

/* ----- Zeichenfläche ----- */
function sketchPad(host,key){
  const SK='ap2sketch:'+key;let strokes=[];try{strokes=JSON.parse(localStorage.getItem(SK)||'[]');}catch(e){}
  host.innerHTML=`<div class="sk"><div class="sk-tools"><button class="sk-b on" data-t="pen">Stift</button><button class="sk-b" data-t="thin">Fein</button><button class="sk-b" data-t="eraser">Radierer</button><span style="flex:1"></span><button class="sk-b" data-a="undo">Zurück</button><button class="sk-b" data-a="clear">Leeren</button></div><canvas class="sk-c"></canvas><p class="small muted">Mit Finger oder Maus zeichnen. Auf Papier geht es genauso, danach mit der Musterlösung vergleichen.</p></div>`;
  const cv=host.querySelector('canvas');const ctx=cv.getContext('2d');let tool='pen';let cur=null;
  function size(){const w=cv.clientWidth;if(!w)return;const hgt=Math.round(w*Math.min(1.1,620/w));const dpr=window.devicePixelRatio||1;cv.width=w*dpr;cv.height=hgt*dpr;cv.style.height=hgt+'px';ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
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
  if(window.ResizeObserver)new ResizeObserver(size).observe(cv);
}
function diagramImg(id,src){const er=/erDiagram/.test(src||'');return `<figure class="dg"><img src="diagrams/${id}.png" alt="Gezeichnete Musterlösung" loading="lazy"><figcaption class="small muted">Gezeichnete Musterlösung${er?' (Krähenfuß-Notation; Chen-Notation ist genauso richtig)':''}. Antippen zum Vergrößern.</figcaption></figure>`;}
function bindZoom(root){root.querySelectorAll('.dg img').forEach(img=>img.addEventListener('click',()=>img.classList.toggle('big')));}

/* ----- Schreiben ----- */
function writeStep(l,body){
  const s=L(l.id);
  body.append(h(`<p class="why"><b>Schreiben wie in der Prüfung.</b> GA1 und GA2 bestehen nur aus offenen Aufgaben. Tippe deine Lösung, die App prüft die Kernpunkte und zeigt die Musterlösung.</p>`));
  const doneCheck=()=>{if(Object.keys(s.write).length>=l.write.length){markStepDone(2);checkComplete(l.id);}};
  l.write.forEach((w,wi)=>{
    const key=l.id+':w'+wi;const mono=/\n/.test(w.model)&&/SELECT|funktion|UPDATE|\{|——/.test(w.model);
    body.append(h(`<div class="card stack" id="wc${wi}">
      <div class="row between"><span class="eyebrow">Aufgabe ${wi+1} von ${l.write.length}</span>${s.write[wi]!=null?`<span class="chip ${s.write[wi]>=60?'ok':'bad'} num">zuletzt ${s.write[wi]} %</span>`:''}</div>
      <p style="font-weight:700;white-space:pre-wrap">${esc(w.task)}</p>
      ${w.diagram?`<div class="seg2" role="tablist"><button class="on" data-mode="draw" data-wi="${wi}">Zeichnen</button><button data-mode="text" data-wi="${wi}">Text</button></div><div class="skhost" id="sk${wi}"></div><button class="btn ghost block" id="dv${wi}">Mit gezeichneter Musterlösung vergleichen</button><div id="dr${wi}"></div>`:''}
      <textarea class="ta ${mono?'mono':''}" ${w.diagram?'hidden':''} id="ta${wi}" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${mono?'Hier deine Lösung tippen …':'Deine Antwort in eigenen Worten …'}"></textarea>
      <button class="btn block" id="ck${wi}" ${w.diagram?'hidden':''}>Prüfen</button>
      <div id="wr${wi}"></div></div>`));
    const ta=$('#ta'+wi,body);ta.value=S.writes[key]||'';
    if(w.diagram){const did=l.id+'_w'+wi;sketchPad($('#sk'+wi,body),key);
      body.querySelectorAll(`[data-wi="${wi}"]`).forEach(b=>b.addEventListener('click',()=>{const draw=b.dataset.mode==='draw';body.querySelectorAll(`[data-wi="${wi}"]`).forEach(x=>x.classList.toggle('on',x===b));$('#sk'+wi,body).hidden=!draw;$('#dv'+wi,body).hidden=!draw;ta.hidden=draw;$('#ck'+wi,body).hidden=draw;}));
      $('#dv'+wi,body).addEventListener('click',()=>{const r=$('#dr'+wi,body);r.replaceChildren(h(`<div class="stack">${diagramImg(did,w.diagram)}<span class="eyebrow">Musterlösung als Text</span><pre class="model">${esc(w.model)}</pre><p class="small"><b>Wie gut war deine Zeichnung?</b></p><div class="row"><button class="btn ghost" data-sr="100">Passt</button><button class="btn ghost" data-sr="50">Teilweise</button><button class="btn ghost" data-sr="0">Daneben</button></div></div>`));bindZoom(r);
        r.querySelectorAll('[data-sr]').forEach(b=>b.addEventListener('click',()=>{const first=s.write[wi]==null;s.write[wi]=+b.dataset.sr;gain(first?30:10);toast(first?'+30 XP':'+10 XP');r.querySelectorAll('[data-sr]').forEach(x=>x.disabled=true);doneCheck();}));});
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
        <p class="small muted">Die App sucht nach Stichworten. Vergleiche trotzdem selbst, andere Formulierungen können auch richtig sein.</p>
        <span class="eyebrow">Musterlösung</span><pre class="model">${esc(w.model)}</pre>${w.diagram?diagramImg(l.id+'_w'+wi,w.diagram):''}
        ${w.alt?`<p class="small">${esc(w.alt)}</p>`:''}
        <p class="small"><b>Zum Einprägen:</b> Musterlösung einmal lesen, Feld leeren, aus dem Kopf neu schreiben.</p>
        <button class="btn ghost block" id="rw${wi}">Feld leeren und nochmal schreiben</button></div>`));
      $('#rw'+wi,body).addEventListener('click',()=>{ta.value='';S.writes[key]='';save();$('#wr'+wi,body).replaceChildren();ta.focus();});
      doneCheck();toast(first?'+30 XP':'+10 XP');
    });
  });
  body.append(h(`<div class="stack" style="margin-top:6px"><div class="card stack"><b>Feynman-Check zum Abschluss</b><p class="small muted">Erkläre das Thema jetzt in 60 Sekunden laut, ohne hinzuschauen. Wo du hängst, spring im Video ins passende Kapitel.</p></div></div>`));
}

/* ----- NotebookLM-Export ----- */
function mdFor(l){
  const sc=l.clip2||[];const d=DIALOG[l.id]||{};
  let md=`# ${l.title}\n\n> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich ${AREA[l.area]}.\n\n`;
  md+=`**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.\n\n`;
  md+=`## Warum prüfungsrelevant\n\n${l.why}\n\n## Inhalt\n\n`;
  sc.forEach((s,i)=>{md+=`### ${i+1}. ${s.h}\n\n`;if(d.s&&d.s[i])md+=`*Leitfrage: ${d.s[i]}*\n\n`;md+=s.beats.map(b=>b.say).join(' ')+'\n\n';
    const v=s.v||{};if(v.code)md+='```\n'+v.code+'\n```\n\n';if(v.table)md+=v.table.map((r,j)=>'| '+r.join(' | ')+' |'+(j===0?'\n|'+r.map(()=>'---').join('|')+'|':'')).join('\n')+'\n\n';if(v.list)md+=v.list.map(x=>'- '+x).join('\n')+'\n\n';
    if(s.check)md+=`Kontrollfrage: ${s.check.q} Antwort: ${s.check.o[s.check.a]}. ${s.check.e}\n\n`;});
  if(d.o)md+=`## Zusammenfassung\n\n${d.o}\n\n`;
  md+=`## Übungsfragen mit Lösung\n\n`+l.quiz.map((q,i)=>`${i+1}. ${q.q.replace(/\n/g,'  \n')}\n   - Lösung: ${q.type==='input'?q.a[0]:q.o[q.a]}. ${q.e}`).join('\n')+'\n\n';
  md+=`## Schreibaufgaben mit Musterlösung\n\n`+l.write.map((w,i)=>`### Aufgabe ${i+1}\n\n${w.task}\n\n\`\`\`\n${w.model}\n\`\`\`\n`).join('\n');
  return md;
}

/* ================= WIEDERHOLEN ================= */
function renderWdh(){
  const due=dueReview();const all=Object.keys(S.review).filter(qByKey);
  const weak=ORDER.filter(id=>L(id).quizBest>=0&&L(id).quizBest<60);
  const upcoming=[1,2,3,4,5,6,7].map(n=>{const t=Date.now()+n*DAY;return Object.values(S.review).filter(r=>r.due>Date.now()+(n-1)*DAY&&r.due<=t).length;});
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>Wiederholen</h1><p class="muted">Jede falsche Antwort kommt hier wieder: nach 10 Minuten, dann nach 1, 2, 4 und 7 Tagen. Nach viermal richtig ist sie gelernt.</p></div>
    ${due.length?`<div class="card stack"><h2 class="num">${due.length} Fragen fällig</h2><p class="small muted">Dauert etwa ${Math.max(3,Math.round(due.length*.6))} Minuten. Am besten zuerst am Tag erledigen.</p><button class="btn block" data-act="review">Jetzt wiederholen</button></div>`:
      `<div class="card empty">${all.length?`Gerade nichts fällig. ${all.length} Fragen kommen in den nächsten Tagen wieder.`:'Noch nichts falsch beantwortet. Falsche Antworten aus Quiz und Simulation landen automatisch hier.'}</div>`}
    ${all.length?`<section class="card stack"><h3>Die nächsten 7 Tage</h3><div class="days">${upcoming.map((n,i)=>`<div class="dy"><b class="num">${n}</b>${i===0?'morgen':'+'+(i+1)+' T'}</div>`).join('')}</div></section>`:''}
    <section class="grid2">
      <button class="td" data-act="mix"><span class="ic">${I.mix}</span><span><b>Mix-Runde</b><small>15 gemischte Fragen aus deinen Themen</small></span></button>
      <button class="td" data-href="#/fehlerheft"><span class="ic">${I.err}</span><span><b>Fehlerheft</b><small>alle bisherigen Fehler mit Erklärung</small></span></button>
    </section>
    ${weak.length?`<section class="stack"><h3>Themen unter 60 % im Quiz</h3>${weak.map(id=>`<button class="lrow" data-href="${topicHash(id,1)}"><span class="t">${esc(BY[id].title)}</span><span class="chip bad num">${L(id).quizBest} %</span></button>`).join('')}</section>`:''}
  </div>`));
  bindCommon();
}
function renderFehler(){
  const ks=Object.keys(S.wrong).filter(k=>qByKey(k)).sort((a,b)=>(S.wrong[b].n-S.wrong[a].n)||((S.wrong[b].last||0)-(S.wrong[a].last||0)));
  const open=ks.filter(k=>!S.wrong[k].fixed),fixed=ks.filter(k=>S.wrong[k].fixed);
  const groups={};open.forEach(k=>{const q=qByKey(k);const t=q._l?BY[q._l].title:'WiSo-Fragenpool';(groups[t]=groups[t]||[]).push(k);});
  const card=k=>{const q=qByKey(k);const w=S.wrong[k];return `<div class="err"><div class="row between"><span class="area ${areaOf(q)}">${AREA[areaOf(q)]}</span><span class="chip bad num">${w.n}× falsch</span></div><div class="q">${esc(q.q)}</div><div class="a"><b>Richtig:</b> ${esc(q.type==='input'?q.a[0]:q.o[q.a])}</div><div class="e">${esc(q.e)}</div></div>`;};
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>Fehlerheft</h1><p class="muted">Alles, was du einmal falsch hattest, mit Erklärung. Vor der Prüfung einmal komplett durchlesen. Eine Frage gilt als gelernt, wenn du sie in der Wiederholung viermal richtig hattest.</p></div>
    ${open.length?`<button class="btn" data-act="fehler" style="align-self:flex-start">${open.length} offene Fehler üben</button>`:`<div class="card empty">Keine offenen Fehler. ${fixed.length?fixed.length+' Fehler hast du schon ausgebügelt.':''}</div>`}
    ${Object.entries(groups).map(([t,arr])=>`<section class="stack"><h3>${esc(t)} <span class="muted small">(${arr.length})</span></h3>${arr.map(card).join('')}</section>`).join('')}
    ${fixed.length?`<details class="card"><summary style="cursor:pointer;font-weight:700">Ausgebügelt (${fixed.length})</summary><div class="stack" style="margin-top:12px">${fixed.map(card).join('')}</div></details>`:''}
  </div>`));
  bindCommon();
}

/* ================= RUNDEN ================= */
function startRun(items,o){runCfg={items,o};nav('#/runde');}
function renderRun(){const {items,o}=runCfg;
  view.replaceChildren(h(`<div class="stack"><div class="row"><button class="iconbtn" id="back" aria-label="Zurück">${I.back}</button><h1>${esc(o.title)}</h1></div><div id="rb"></div></div>`));
  $('#back').addEventListener('click',()=>history.back());
  cleanup=runQuiz($('#rb'),items,{timer:o.timer,total:o.total,showLesson:o.showLesson,onEnd:(pct,right)=>{if(o.kind){dayLog()[o.kind+'Done']=true;}gain(right*(o.xpEach||5));},
    endButtons:el=>{el.append(h(`<button class="btn block" id="bk">Zurück zum Tagesplan</button>`));$('#bk',el).addEventListener('click',()=>{runCfg=null;nav('#/heute');});}});
}

/* ================= PRÜFUNG ================= */
const CALC={ap1:60,proj:70,ga1:45,ga2:45,wiso:55};
function grade(p){return p>=92?1:p>=81?2:p>=67?3:p>=50?4:p>=30?5:6;}
function renderPruefung(){
  const caseRow=c=>{const r=caseResult(c);return `<button class="lrow" data-href="#/fall/${c.id}"><span class="t">${esc(c.title)}</span><span class="area ${c.area}">${c.area}</span><span class="meta small muted">${esc(c.scenario.slice(0,110))}…</span><span class="meta">${r.checked?`<span class="chip ${r.points>=50?'ok':'bad'} num">${r.points} / 100 · Note ${grade(r.points)}</span>`:'<span class="small muted">90 Minuten · 4 Handlungsschritte</span>'}</span></button>`;};
  view.replaceChildren(h(`<div class="stack-lg">
    <div class="stack"><h1>Prüfungstraining</h1><p class="muted">Erst die Themen, dann hier unter echten Bedingungen üben.</p></div>
    <section class="stack"><h2>Schnelle Runden</h2><div class="grid2">
      <button class="td" data-act="wiso"><span class="ic">${I.exam}</span><span><b>WiSo-Prüfung</b><small>30 Fragen, 60 Minuten wie am Prüfungstag</small></span></button>
      <button class="td" data-act="blitz"><span class="ic">${I.bulb}</span><span><b>Blitzrunde</b><small>10 Fragen, 20 Sekunden pro Frage</small></span></button>
      <button class="td" data-act="gamix"><span class="ic">${I.mix}</span><span><b>GA-Mix</b><small>15 Fragen GA1 und GA2, 45 s pro Frage</small></span></button>
      <button class="td" data-href="#/belegsatz"><span class="ic">${I.pen}</span><span><b>Belegsatz-Spickzettel</b><small>SQL, Pseudocode, UML zum Nachschlagen</small></span></button>
    </div></section>
    <section class="stack"><h2>Prüfungsfälle wie in der AP2</h2><p class="small muted">Komplette Prüfungsbereiche: Szenario, 4 Handlungsschritte à 25 Punkte, 90 Minuten. Schreiben, Musterlösung aufdecken, ehrlich nach Schema abhaken.</p>
      <div class="grid2">${CASES.map(caseRow).join('')}</div></section>
    <section class="card stack" id="calc"><h2>Bestehens-Rechner</h2><p class="small muted">Beispielwerte, schieb sie auf deine eigenen.</p>
      ${[['ap1','AP1','20 %'],['proj','Projekt (Doku + Präsentation)','50 %'],['ga1','GA1 Planen','10 %'],['ga2','GA2 Algorithmen','10 %'],['wiso','WiSo','10 %']].map(([k,n,w])=>`<label class="sl"><span>${n} <span class="muted small">· ${w}</span></span><span class="v num" id="v_${k}">${CALC[k]}</span><input type="range" id="r_${k}" min="0" max="100" value="${CALC[k]}"></label>`).join('')}
      <div id="cres"></div></section>
    <section class="card stack"><h2>Prüfungstag</h2><p class="small muted">Typischer Ablauf, die genauen Zeiten stehen in deiner Einladung der IHK.</p>
      <ul class="check small"><li>GA1 und GA2 je 90 Minuten, WiSo 60 Minuten</li><li>Einladung und Personalausweis</li><li>Nicht programmierbarer Taschenrechner, mehrere Kulis, Lineal</li><li>Belegsatz liegt bei: SQL-Syntax und UML dort nachschauen</li><li>Erst alles überfliegen, mit den leichtesten Aufgaben anfangen</li><li>Nie etwas leer lassen, Teilpunkte gibt es fast überall</li></ul></section>
  </div>`));
  bindCommon();
  Object.keys(CALC).forEach(k=>$('#r_'+k).addEventListener('input',e=>{CALC[k]=+e.target.value;$('#v_'+k).textContent=CALC[k];calc();}));
  calc();
}
function caseState(id){return S.cases[id]||(S.cases[id]={ans:{},crit:{},shown:{},left:null});}
function matBlock(m){if(!m)return '';return `<div class="stack" style="gap:6px">${m.title?`<span class="eyebrow">${esc(m.title)}</span>`:''}${m.code!=null?`<pre class="model pre">${esc(m.code)}</pre>`:''}${m.table?`<div class="cs-tw"><table class="cs-t"><thead><tr>${m.table[0].map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${m.table.slice(1).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}</div>`;}
let caseTimer=null;
function openCase(id){
  const c=CASES.find(x=>x.id===id);if(!c){nav('#/pruefung');return;}
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
      :`<button class="btn ghost block" data-show="${k}">Musterlösung und Bewertung zeigen</button>`}</div>`;};
  function draw(){
    const r=caseResult(c);
    view.replaceChildren(h(`<div class="stack-lg">
      <div class="stack" style="gap:8px"><div class="crumb"><span>Prüfungstraining</span><span>›</span><span class="area ${c.area}">${c.area}</span></div><h1>${esc(c.title)}</h1></div>
      <div class="cs-bar"><span class="cs-time num" id="ctime"></span><button class="btn sm" id="ctog"></button></div>
      <div class="card stack"><span class="eyebrow">Ausgangssituation</span><p>${esc(c.scenario)}</p></div>
      ${(c.material||[]).length?`<div class="card stack"><span class="eyebrow">Material zum Fall</span>${c.material.map(matBlock).join('')}</div>`:''}
      ${c.tasks.map(t=>`<section class="card stack"><div class="row between"><h2>${esc(t.title)}</h2><span class="chip mark num">${t.points} P</span></div>${t.intro?`<p class="muted">${esc(t.intro)}</p>`:''}${t.sub.map(s=>subHtml(t,s)).join('')}</section>`).join('')}
      <div class="card stack" style="text-align:center"><span class="eyebrow">Dein Ergebnis bisher</span><div class="result"><div class="score num">${r.points}</div><p>von 100 Punkten · Note ${grade(r.points)}</p></div>
        <p class="small muted">Zählt nur für aufgedeckte Teilaufgaben. Ab 50 Punkten ist der Bereich bestanden.</p>
        <button class="btn ghost block" id="creset">Fall komplett zurücksetzen</button></div></div>`));
    view.querySelectorAll('[data-sk]').forEach(hst=>sketchPad(hst,'case:'+id+':'+hst.dataset.sk));
    view.querySelectorAll('[data-cmode]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ck;const dr=b.dataset.cmode==='draw';view.querySelectorAll(`[data-ck="${k}"]`).forEach(x=>x.classList.toggle('on',x===b));view.querySelector(`[data-sk="${k}"]`).hidden=!dr;view.querySelector(`[data-ta="${k}"]`).hidden=dr;}));
    bindZoom(view);
    view.querySelectorAll('[data-ta]').forEach(ta=>{let dt;ta.addEventListener('input',()=>{clearTimeout(dt);dt=setTimeout(()=>{st.ans[ta.dataset.ta]=ta.value;save();},700);});});
    view.querySelectorAll('[data-show]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.show;const ta=view.querySelector(`[data-ta="${k}"]`);st.ans[k]=ta.value;st.shown[k]=true;save();const y=window.scrollY;draw();window.scrollTo(0,y);renderSide();}));
    view.querySelectorAll('[data-cr]').forEach(cb=>cb.addEventListener('change',()=>{const k=cb.dataset.cr;const arr=st.crit[k]||(st.crit[k]=[]);arr[+cb.dataset.i]=cb.checked;save();
      const t=c.tasks.find(t=>k.startsWith(String(t.nr)));const s=t.sub.find(s=>t.nr+s.id===k);view.querySelector(`[data-sum="${k}"]`).textContent=s.criteria.reduce((a,x,i)=>a+(arr[i]?x.points:0),0);
      const rr=caseResult(c);view.querySelector('.result .score').textContent=rr.points;view.querySelector('.result p').textContent=`von 100 Punkten · Note ${grade(rr.points)}`;}));
    $('#creset').addEventListener('click',()=>{const b=$('#creset');if(b.dataset.sure){S.cases[id]={ans:{},crit:{},shown:{},left:c.minutes*60};save();stopTimer();render();}else{b.dataset.sure='1';b.textContent='Wirklich? Nochmal tippen zum Zurücksetzen';}});
    $('#ctog').addEventListener('click',()=>{running?stopTimer():startTimer();});
    paintTime();
  }
  function paintTime(){const l=Math.max(0,st.left);const el=$('#ctime');if(!el)return;el.textContent=(l<=0?'Zeit um · ':'⏱ ')+Math.floor(l/60)+':'+String(Math.floor(l%60)).padStart(2,'0');$('#ctog').textContent=running?'Pause':(l===c.minutes*60?'Zeit starten':'Weiter');}
  function startTimer(){running=true;let last=Date.now();caseTimer=setInterval(()=>{const n=Date.now();st.left-=(n-last)/1000;last=n;if(st.left<=0){st.left=0;stopTimer();}paintTime();},1000);paintTime();}
  function stopTimer(){running=false;clearInterval(caseTimer);save();paintTime();}
  cleanup=()=>{clearInterval(caseTimer);save();};
  draw();
}
function openBeleg(){
  view.replaceChildren(h(`<div class="stack-lg"><div class="stack"><h1>Belegsatz-Spickzettel</h1><p class="muted small">In der Prüfung bekommst du einen bundeseinheitlichen Belegsatz mit SQL-Beiblatt und UML-Notation. Das hier ist eine Übungsversion in derselben Art, damit du weißt, wo was steht. Kein Original.</p></div>
    ${BELEGSATZ.map(b=>`<section class="card stack"><h3>${esc(b.title)}</h3><pre class="model pre">${esc(b.code)}</pre></section>`).join('')}</div>`));
}
function calc(){
  const c=CALC;const total=.2*c.ap1+.5*c.proj+.1*(c.ga1+c.ga2+c.wiso);
  const t2=(.5*c.proj+.1*c.ga1+.1*c.ga2+.1*c.wiso)/.8;const parts=[c.proj,c.ga1,c.ga2,c.wiso];
  const r=[['Gesamtergebnis mindestens 50',total>=49.5,total.toFixed(1)],['Teil 2 mindestens 50',t2>=49.5,t2.toFixed(1)],['Mindestens 3 von 4 Bereichen in Teil 2 ab 50',parts.filter(x=>x>=50).length>=3,parts.filter(x=>x>=50).length+' von 4'],['Kein Bereich in Teil 2 unter 30',parts.every(x=>x>=30),Math.min(...parts)+' min.']];
  const ok=r.every(x=>x[1]);
  $('#cres').replaceChildren(h(`<div class="stack"><div class="verdict ${ok?'ok':'bad'}">${ok?'Bestanden':'Nicht bestanden'}</div>
    <ul class="rules">${r.map(x=>`<li><span class="chip ${x[1]?'ok':'bad'}">${x[1]?'erfüllt':'fehlt'}</span><span style="flex:1">${x[0]}</span><span class="num small muted">${x[2]}</span></li>`).join('')}</ul>
    <p class="small muted">Ist GA1, GA2 oder WiSo schlechter als ausreichend, kannst du in einem dieser Bereiche eine etwa 15-minütige mündliche Ergänzungsprüfung beantragen, wenn sie über das Bestehen entscheiden kann. Regeln nach § 16 und § 17 FIAusbV, Rundung durch die IHK kann leicht abweichen.</p></div>`));
}

/* ================= EINSTELLUNGEN & SYNC ================= */
function b64e(s){return btoa(unescape(encodeURIComponent(s)));}
function b64d(s){return decodeURIComponent(escape(atob(s.trim())));}
function renderSettings(){
  view.replaceChildren(h(`<div class="stack-lg">
    <h1>Einstellungen & Sync</h1>
    <section class="card stack"><h3>Darstellung</h3><div class="seg2" style="grid-template-columns:repeat(3,1fr)">${[['auto','Automatisch'],['light','Hell'],['dark','Dunkel']].map(([k,t])=>`<button data-th="${k}" class="${S.theme===k?'on':''}">${t}</button>`).join('')}</div><p class="small muted">Dunkel ist angenehmer zum Lernen im Bett.</p></section>
    <section class="card stack"><h3>Video</h3><label class="row between"><span>Ton an</span><input type="checkbox" id="sSnd" ${S.sound?'checked':''}></label><label class="row between"><span>Untertitel</span><input type="checkbox" id="sCC" ${S.cc!==false?'checked':''}></label><p class="small muted">Tempo stellst du direkt im Player ein (bis 2×).</p></section>
    <section class="card stack"><h3>Fortschritt zwischen Handy und PC</h3>
      ${fbOn()?(fbUser?`<p class="small"><b style="color:var(--ok)">● Synchron mit Google</b> als ${esc(fbUser.email||fbUser.displayName||'')}. Melde dich auf deinen anderen Geräten mit demselben Google-Konto an, dann ist alles überall gleich.</p><button class="btn ghost sm" id="fbOut" style="align-self:flex-start">Abmelden</button>`
        :`<p class="small muted">Melde dich auf Handy und PC mit demselben Google-Konto an. Danach wird dein Fortschritt automatisch abgeglichen, auch live.</p><button class="btn" id="fbIn" style="align-self:flex-start">Mit Google anmelden</button>`)
      :`<p class="small muted">${syncState==='sync'?'<b style="color:var(--ok)">Automatisch synchron</b> über dein Claude-Konto. Nichts weiter zu tun.':'Auf dieser Seite wird lokal gespeichert. Hier per Code übertragen: auf Gerät A kopieren, auf Gerät B einfügen.'}</p>`}
      <p class="small muted">Ohne Anmeldung: Sync-Code auf Gerät A kopieren, auf Gerät B einfügen.</p>
      <div class="row"><button class="btn ghost sm" id="exp">Sync-Code kopieren</button><button class="btn ghost sm" id="imp">Sync-Code einfügen</button></div>
      <textarea class="ta" id="code" style="min-height:90px;font-family:var(--f-mono);font-size:12px" placeholder="Sync-Code" hidden></textarea>
      <button class="btn sm" id="impGo" hidden>Übernehmen</button></section>
    <section class="card stack"><h3>Zurücksetzen</h3><button class="btn ghost sm" id="reset" style="align-self:flex-start">Gesamten Fortschritt löschen</button></section>
  </div>`));
  view.querySelectorAll('[data-th]').forEach(b=>b.addEventListener('click',()=>{S.theme=b.dataset.th;applyTheme();save();render();}));
  $('#sSnd').addEventListener('change',e=>{S.sound=e.target.checked;save();});
  const fi=$('#fbIn');if(fi)fi.addEventListener('click',fbLogin);const fo=$('#fbOut');if(fo)fo.addEventListener('click',fbLogout);
  $('#sCC').addEventListener('change',e=>{S.cc=e.target.checked;save();});
  const code=$('#code');
  $('#exp').addEventListener('click',async()=>{const c=b64e(JSON.stringify(S));code.hidden=false;code.value=c;$('#impGo').hidden=true;try{await navigator.clipboard.writeText(c);toast('Code kopiert');}catch(e){code.select();toast('Code markiert, bitte kopieren');}});
  $('#imp').addEventListener('click',()=>{code.hidden=false;code.value='';$('#impGo').hidden=false;code.focus();});
  $('#impGo').addEventListener('click',()=>{try{if(code.value.length>2000000)throw 0;const o=cleanState(b64d(code.value));if(!o||!Object.keys(o.lessons).length&&!o.xp)throw 0;S=o;save();applyTheme();toast('Fortschritt übernommen');nav('#/heute');}catch(e){toast('Code ungültig');}});
  $('#reset').addEventListener('click',e=>{const b=e.currentTarget;if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Wirklich alles löschen? Nochmal tippen';return;}S=fresh();save();nav('#/heute');});
}

render();
})();
