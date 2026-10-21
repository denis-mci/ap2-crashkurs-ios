/* Clip-Player v2: Beat-basiert, synchron zu Audio (Piper) oder Fallback-Stimme */
const ClipPlayer = (function(){
'use strict';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fnv(s){let h=0x811c9dc5;for(const ch of s){h^=ch.codePointAt(0);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,'0');}

/* ---------- Audio-Index (MP3 pro Beat, von Piper erzeugt) ---------- */
/* Audio-Sprite pro Lektion: audio/<lektion>.mp3 + Start/Ende je Beat in audio/index.json */
let AUDIO=null; let audioLoad=null;
function loadAudioIndex(){
  if(audioLoad)return audioLoad;
  audioLoad=fetch('audio/index.json').then(r=>r.ok?r.json():null).then(j=>{AUDIO=j&&j.lessons?j.lessons:{};}).catch(()=>{AUDIO={};});
  return audioLoad;
}

/* ---------- Simulationen für Spezialanimationen ---------- */
function bubbleSteps(arr){
  let items=arr.map((v,i)=>({id:i,v}));const steps=[{order:items.map(x=>x.id),cmp:null,sw:false,sorted:[]}];
  const n=items.length;const sorted=[];
  for(let i=0;i<n-1;i++){for(let j=0;j<n-1-i;j++){const a=items[j],b=items[j+1];let sw=false;if(a.v>b.v){items[j]=b;items[j+1]=a;sw=true;}
    steps.push({order:items.map(x=>x.id),cmp:[items[j].id,items[j+1].id],sw,sorted:sorted.slice()});}
    sorted.push(items[n-1-i].id);}
  sorted.push(items[0].id);
  steps.push({order:items.map(x=>x.id),cmp:null,sw:false,sorted:items.map(x=>x.id),end:true});
  return steps;
}
function binSteps(arr,t){const st=[{lo:0,hi:arr.length-1,mid:null}];let lo=0,hi=arr.length-1;
  while(lo<=hi){const mid=Math.floor((lo+hi)/2);st.push({lo,hi,mid});if(arr[mid]===t){st.push({lo:mid,hi:mid,mid,found:true});break;}if(arr[mid]<t)lo=mid+1;else hi=mid-1;}
  return st;}

/* ---------- Visual-Renderer ---------- */
function stepIndex(show,len){if(!show||show.step==null)return 0;if(show.step==='end')return len-1;return Math.max(0,Math.min(len-1,show.step));}

function renderVisual(v,show,prev){
  show=show||{};
  if(v.code!=null){
    const lines=v.code.split('\n');const r=show.lines||[1,lines.length];
    return `<div class="cv-code">${lines.map((l,i)=>{const n=i+1;const vis=n<=r[1];
      const cls=!vis?'off':(n>=r[0]&&n<=r[1]&&!(r[0]===1&&r[1]===lines.length)?'hl':'on');
      return `<div class="ln ${cls}"><span class="no">${n}</span><span class="tx">${esc(l)||' '}</span></div>`;}).join('')}</div>`;
  }
  if(v.list){const n=show.item||v.list.length;
    return `<ol class="cv-list">${v.list.map((x,i)=>`<li class="${i+1>n?'off':(i+1===n&&show.item?'hl':'on')}"><span class="b">${i+1}</span><span>${esc(x)}</span></li>`).join('')}</ol>`;}
  if(v.table){const t=v.table;const n=show.rows||t.length-1;const hl=show.hl;
    return `<div class="cv-tw"><table class="cv-table"><thead><tr>${t[0].map((c,ci)=>`<th class="${hl&&hl[0]===0&&hl[1]===ci+1?'cell':''}">${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.slice(1).map((r,ri)=>{const k=ri+1;
      return `<tr class="${k>n?'off':(k===n&&show.rows?'hl':'on')}">${r.map((c,ci)=>`<td class="${hl&&hl[0]===k&&hl[1]===ci+1?'cell':''}">${esc(c)}</td>`).join('')}</tr>`;}).join('')}</tbody></table></div>`;}
  if(v.stat!=null){return `<div class="cv-stat"><div class="big">${esc(v.stat)}</div>${v.sub?`<div class="sub">${esc(v.sub)}</div>`:''}</div>`;}
  if(v.anim==='bubble'){
    const st=v._st||(v._st=bubbleSteps(v.arr));const s=st[stepIndex(show,st.length)];const max=Math.max(...v.arr);const n=v.arr.length;
    const w=100/n;
    return `<div class="cv-bub" style="--n:${n}">${v.arr.map((val,id)=>{const pos=s.order.indexOf(id);const cmp=s.cmp&&s.cmp.includes(id);const done=s.sorted.includes(id);
      return `<div class="bb ${cmp?(s.sw?'sw':'cmp'):''} ${done?'done':''}" style="left:${pos*w}%;width:${w}%"><div class="col" style="height:${20+70*val/max}%"><span>${val}</span></div></div>`;}).join('')}
      <div class="cap">${s.end?'Fertig sortiert':(s.cmp?(s.sw?'Links größer: tauschen':'Reihenfolge passt: nicht tauschen'):'Ausgangslage')}</div></div>`;}
  if(v.anim==='binsearch'){
    const st=v._st||(v._st=binSteps(v.arr,v.target));const s=st[stepIndex(show,st.length)];
    return `<div class="cv-bin"><div class="tgt">Gesucht: <b>${v.target}</b></div><div class="cells">${v.arr.map((x,i)=>{const out=i<s.lo||i>s.hi;const mid=i===s.mid;
      return `<div class="cell ${out?'out':''} ${mid?(s.found?'found':'mid'):''}"><span class="v">${x}</span><span class="i">${i}</span></div>`;}).join('')}</div>
      <div class="cap">${s.found?'Gefunden an Index '+s.mid:(s.mid==null?'Ganze Liste, sortiert':'Mitte: '+v.arr[s.mid]+(v.arr[s.mid]<v.target?', gesucht ist größer → rechts weiter':', gesucht ist kleiner → links weiter'))}</div></div>`;}
  if(v.anim==='join'){
    const k=stepIndex(show,3);const L=v.left,R=v.right;const [li,ri]=v.on;const keys=[...new Set(L.rows.map(r=>r[li]))];
    const color=key=>{const i=keys.indexOf(key);return i<0?'':' k'+(i%4);};
    const matched=key=>R.rows.some(r=>r[ri]===key);
    const tbl=(T,col,side)=>`<div class="cv-tw"><div class="tn">${esc(T.name)}</div><table class="cv-table sm"><thead><tr>${T.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${T.rows.map(r=>{
      const key=r[col];const m=side==='L'?matched(key):keys.includes(key);const cls=k>=1?(m?'jm'+color(key):'jx'):'on';
      return `<tr class="${cls}">${r.map((c,ci)=>`<td class="${ci===col&&k>=1?'key':''}">${esc(c)}</td>`).join('')}</tr>`;}).join('')}</tbody></table></div>`;
    let res='';
    if(k>=2){const cols=[...L.cols,...R.cols.filter((c,i)=>i!==ri)];const rows=[];
      L.rows.forEach(lr=>{const ms=R.rows.filter(rr=>rr[ri]===lr[li]);if(ms.length)ms.forEach(rr=>rows.push({c:color(lr[li]),r:[...lr,...rr.filter((x,i)=>i!==ri)]}));else if(v.type==='left')rows.push({c:' nul',r:[...lr,...R.cols.filter((c,i)=>i!==ri).map(()=>'NULL')]});});
      res=`<div class="cv-tw res"><div class="tn">Ergebnis ${v.type==='left'?'LEFT JOIN':'INNER JOIN'}</div><table class="cv-table sm"><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(x=>`<tr class="jm${x.c}">${x.r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
    return `<div class="cv-join"><div class="two">${tbl(L,li,'L')}${tbl(R,ri,'R')}</div>${res}</div>`;}
  if(v.anim==='trace'){const n=show.rows||0;
    return `<div class="cv-trace">${renderVisual({code:v.code},{lines:[1,v.code.split('\n').length]})}<div class="cv-tw"><table class="cv-table sm"><thead><tr><th>#</th>${v.vars.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${v.rows.map((r,i)=>`<tr class="${i>=n?'off':(i===n-1?'hl':'on')}"><td>${i}</td>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;}
  if(v.anim==='stack'){const n=v.calls.length;const k=show.step==='end'?2*n:(show.step||0);const pushed=Math.min(k,n);const resolved=Math.max(0,k-n);
    let html='';for(let i=pushed-1;i>=0;i--){const isRes=i>=n-resolved;const top=(k<=n&&i===pushed-1)||(k>n&&i===n-resolved);
      html+=`<div class="fr ${isRes?'res':''} ${top?'top':''}"><span class="c">${esc(v.calls[i])}</span>${isRes?`<span class="r">= ${esc(v.returns[i])}</span>`:''}</div>`;}
    return `<div class="cv-stack"><div class="lbl">Aufrufstapel</div>${html||'<div class="fr ghost">leer</div>'}<div class="cap">${k===0?'':k<=n?'Aufruf '+pushed+': Problem wird kleiner':(resolved<n?'Rückgabe wandert nach unten':'Ergebnis: '+esc(v.returns[0]))}</div></div>`;}
  if(v.anim==='group'){const k=stepIndex(show,3);const keys=[...new Set(v.rows.map(r=>r[0]))];
    const agg=vals=>({SUM:vals.reduce((a,b)=>a+b,0),COUNT:vals.length,AVG:vals.reduce((a,b)=>a+b,0)/vals.length,MAX:Math.max(...vals),MIN:Math.min(...vals)})[v.fn];
    if(k===0)return `<div class="cv-tw"><table class="cv-table"><thead><tr>${v.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${v.rows.map(r=>`<tr class="on">${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if(k===1)return `<div class="cv-groups">${keys.map((key,gi)=>`<div class="grp k${gi%4}"><div class="gk">${esc(key)}</div>${v.rows.filter(r=>r[0]===key).map(r=>`<div class="gr">${esc(r[1])}</div>`).join('')}</div>`).join('')}</div>`;
    return `<div class="cv-tw"><table class="cv-table"><thead><tr><th>${esc(v.cols[0])}</th><th>${v.fn}(${esc(v.cols[1])})</th></tr></thead><tbody>${keys.map((key,gi)=>`<tr class="jm k${gi%4}"><td>${esc(key)}</td><td><b>${agg(v.rows.filter(r=>r[0]===key).map(r=>+r[1]))}</b></td></tr>`).join('')}</tbody></table></div>`;}
  return '';
}

/* ---------- Stimme ---------- */
let fbVoice=null;
function pickVoice(){const s=window.speechSynthesis;if(!s)return;const vs=s.getVoices().filter(v=>/^de/i.test(v.lang));
  const score=v=>(/premium|enhanced|erweitert|natural|neural|online/i.test(v.name)?10:0)+(/google|microsoft/i.test(v.name)?3:0)+(/de[-_]DE/i.test(v.lang)?1:0);
  fbVoice=vs.sort((a,b)=>score(b)-score(a))[0]||null;}
if(window.speechSynthesis){pickVoice();try{speechSynthesis.addEventListener('voiceschanged',pickVoice);}catch(e){}}

/* ---------- Player ---------- */
function mount(root,lesson,opts){
  const scenes=lesson.clip2;opts=opts||{};
  const flat=[];scenes.forEach((s,si)=>s.beats.forEach((b,bi)=>flat.push({si,bi,b,last:bi===s.beats.length-1})));
  let pos=0,playing=false,gen=0,timer=null,checkOpen=false,ended=false;
  const audio=new Audio();audio.preload='auto';let raf=0;
  let spriteSrc='audio/'+lesson.id+'.mp3';
  /* Als Blob laden: dann klappt Springen im Audio auch ohne Range-Support des Servers */
  fetch(spriteSrc).then(r=>r.ok?r.blob():null).then(b=>{if(b){spriteSrc=URL.createObjectURL(b);}}).catch(()=>{});
  function spriteFor(txt){const m=AUDIO&&AUDIO[lesson.id];return m?m[fnv(txt)]:null;}
  function playSegment(seg,rate,onEnd,onFail){
    const start=()=>{try{audio.currentTime=seg[0];}catch(e){}audio.playbackRate=rate;
      const pr=audio.play();if(pr&&pr.catch)pr.catch(onFail);
      cancelAnimationFrame(raf);const tick=()=>{if(audio.currentTime>=seg[1]-0.02||audio.ended){audio.pause();onEnd();return;}raf=requestAnimationFrame(tick);};raf=requestAnimationFrame(tick);};
    if(!audio.src.endsWith(spriteSrc)){audio.src=spriteSrc;audio.addEventListener('loadedmetadata',start,{once:true});audio.load();}
    else if(audio.readyState>=1)start();else audio.addEventListener('loadedmetadata',start,{once:true});
  }
  root.innerHTML=`<div class="cp">
    <div class="cp-stage" id="cpStage">
      <div class="cp-segs">${scenes.map(()=>'<i><b></b></i>').join('')}</div>
      <div class="cp-head"><span class="cp-chip" id="cpChip"></span><span class="cp-count num" id="cpCount"></span></div>
      <div class="cp-vis" id="cpVis"></div>
      <div class="cp-cap" id="cpCap"></div>
      <div class="cp-check" id="cpCheck" hidden></div>
      <button class="cp-big" id="cpBig" aria-label="Abspielen"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></button>
    </div>
    <div class="cp-ctrl">
      <button class="iconbtn" id="cpSnd" aria-label="Ton"></button>
      <div class="mid"><button class="iconbtn" id="cpPrev" aria-label="Zurück"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg></button>
        <button class="iconbtn play" id="cpPlay" aria-label="Abspielen"></button>
        <button class="iconbtn" id="cpNext" aria-label="Weiter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 5l7 7-7 7"/></svg></button></div>
      <button class="iconbtn" id="cpRate" aria-label="Tempo" style="font-weight:800;font-size:.85rem"></button>
    </div>
    <p class="small muted" id="cpVoiceNote"></p>
  </div>`;
  const $=id=>root.querySelector('#'+id);
  const segs=[...root.querySelectorAll('.cp-segs b')];
  const S=opts.settings;
  function setCtl(){$('cpPlay').innerHTML=playing?'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>':'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    $('cpPlay').setAttribute('aria-label',playing?'Pause':'Abspielen');$('cpBig').hidden=playing||checkOpen;
    $('cpSnd').innerHTML=S.sound?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"/></svg>';
    $('cpRate').textContent=(S.rate||1).toString().replace('.',',')+'×';}
  let lastSi=-1;
  function paint(){const f=flat[pos];const sc=scenes[f.si];
    $('cpChip').textContent=sc.h;$('cpCount').textContent=(f.si+1)+' / '+scenes.length;
    const vis=$('cpVis');const html=renderVisual(sc.v,f.b.show);
    if(f.si!==lastSi){vis.classList.remove('enter');void vis.offsetWidth;vis.classList.add('enter');lastSi=f.si;}
    vis.innerHTML=html;
    const cap=$('cpCap');cap.classList.remove('in');void cap.offsetWidth;cap.textContent=f.b.say;cap.classList.add('in');
    segs.forEach((b,i)=>{const sb=scenes[i].beats.length;let p=0;if(i<f.si)p=1;else if(i===f.si)p=(f.bi+(ended?1:0))/sb;b.style.width=(p*100)+'%';});
  }
  function stopSound(){gen++;clearTimeout(timer);cancelAnimationFrame(raf);try{audio.pause();}catch(e){}if(window.speechSynthesis){try{speechSynthesis.cancel();}catch(e){}}}
  function playBeat(){stopSound();const my=gen;const f=flat[pos];const txt=f.b.say;
    const done=()=>{if(my!==gen)return;timer=setTimeout(()=>{if(my===gen&&playing)afterBeat();},350);};
    const est=Math.max(2200,txt.length*68/(S.rate||1));
    const seg=spriteFor(txt);
    if(S.sound&&seg){playSegment(seg,S.rate||1,done,()=>{timer=setTimeout(done,est);});timer=setTimeout(done,((seg[1]-seg[0])*1000/(S.rate||1))*2+4000);}
    else if(S.sound&&window.speechSynthesis){try{const u=new SpeechSynthesisUtterance(txt);u.lang='de-DE';if(fbVoice)u.voice=fbVoice;u.rate=S.rate||1;u.onend=done;u.onerror=done;speechSynthesis.speak(u);timer=setTimeout(done,est*1.8+2500);}catch(e){timer=setTimeout(done,est);}}
    else timer=setTimeout(done,est);
  }
  function afterBeat(){const f=flat[pos];const sc=scenes[f.si];
    if(f.last&&sc.check&&!sc._answered){openCheck(sc);return;}
    advance();}
  function advance(){if(pos<flat.length-1){pos++;paint();if(playing)playBeat();}else finish();}
  function finish(){playing=false;stopSound();ended=true;paint();setCtl();opts.onFinish&&opts.onFinish();}
  function openCheck(sc){checkOpen=true;stopSound();setCtl();const c=$('cpCheck');const ch=sc.check;
    c.innerHTML=`<div class="ck-in"><div class="ck-ey">Kurz mitdenken</div><div class="ck-q">${esc(ch.q)}</div><div class="ck-o">${ch.o.map((o,i)=>`<button data-i="${i}">${esc(o)}</button>`).join('')}</div><div class="ck-fb" id="ckFb"></div></div>`;
    c.hidden=false;
    c.querySelectorAll('button[data-i]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.i;const ok=i===ch.a;
      c.querySelectorAll('button[data-i]').forEach(x=>{x.disabled=true;const xi=+x.dataset.i;if(xi===ch.a)x.classList.add('ok');else if(xi===i)x.classList.add('no');});
      sc._answered=true;opts.onCheck&&opts.onCheck(ok);
      c.querySelector('#ckFb').innerHTML=`<b class="${ok?'ok':'no'}">${ok?'Genau.':'Nicht ganz.'}</b> ${esc(ch.e)}<button class="ck-go" id="ckGo">Weiter</button>`;
      c.querySelector('#ckGo').addEventListener('click',()=>{c.hidden=true;checkOpen=false;playing=true;setCtl();advance();});}));}
  function toggle(){if(checkOpen)return;if(playing){playing=false;stopSound();}else{if(ended){pos=0;ended=false;scenes.forEach(s=>s._answered=false);paint();}playing=true;playBeat();}setCtl();}
  function jumpBeat(d){if(checkOpen)return;const n=pos+d;if(n<0)return;if(n>=flat.length){finish();return;}pos=n;ended=false;paint();if(playing)playBeat();else stopSound();}
  function jumpScene(d){if(checkOpen)return;const si=flat[pos].si+d;if(si<0||si>=scenes.length)return;pos=flat.findIndex(f=>f.si===si);ended=false;paint();if(playing)playBeat();else stopSound();}
  $('cpPlay').addEventListener('click',toggle);$('cpBig').addEventListener('click',toggle);
  $('cpNext').addEventListener('click',()=>jumpBeat(1));$('cpPrev').addEventListener('click',()=>jumpBeat(-1));
  $('cpSnd').addEventListener('click',()=>{S.sound=!S.sound;opts.onSettings&&opts.onSettings();setCtl();if(playing)playBeat();});
  $('cpRate').addEventListener('click',()=>{const r=[1,1.25,1.5];S.rate=r[(r.indexOf(S.rate||1)+1)%r.length];opts.onSettings&&opts.onSettings();setCtl();if(playing)playBeat();});
  const stage=$('cpStage');let tx=null,ty=null;
  stage.addEventListener('touchstart',e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;},{passive:true});
  stage.addEventListener('touchend',e=>{if(tx==null)return;const t=e.changedTouches[0];const dx=t.clientX-tx,dy=t.clientY-ty;tx=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){jumpScene(dx<0?1:-1);}},{passive:true});
  $('cpVis').addEventListener('click',()=>toggle());
  loadAudioIndex().then(()=>{$('cpVoiceNote').textContent=AUDIO&&AUDIO[lesson.id]?'Stimme: Thorsten (Piper). Tippe aufs Bild für Pause, wische für die nächste Szene.':'Für diese Lektion gibt es noch keine Aufnahme, dein Gerät liest vor.';});
  paint();setCtl();
  return ()=>{playing=false;stopSound();};
}
return {mount,fnv,renderVisual};
})();
