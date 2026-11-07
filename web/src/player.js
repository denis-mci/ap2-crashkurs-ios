/* Video-Player v4: Erklärvideo im Notizbuch-Stil.
   Ein Erklärer (Tom). Pro Beat: Kamerafahrt auf das, worüber gesprochen wird, handgezeichnete Kreise/Pfeile,
   Untertitel im Sprechtempo mit Textmarker auf Fachbegriffen, „Achtung“-Stempel bei typischen Fehlern,
   „Merk dir“-Zettel am Ende jeder Szene und ein Merkzettel zum Schluss.
   Audio: Sprite pro Lektion (audio/<id>.mp3 + audio/index.json), sonst Sprachausgabe des Geräts. */
const VideoPlayer=(function(){
'use strict';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fnv=ClipPlayer.fnv;
const RATES=[0.9,1,1.15,1.3,1.5,1.75,2];
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

let AUDIO=null,audioLoad=null;
function loadIndex(){if(audioLoad)return audioLoad;
  audioLoad=fetch('audio/index.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(j=>{AUDIO=j&&j.lessons?j.lessons:{};}).catch(()=>{AUDIO={};});
  return audioLoad;}
const keyOf=(who,say)=>who==='L'?fnv('L|'+say):fnv(say);

/* Gerätestimme als Fallback: bevorzugt natürliche/neuronale Stimmen */
let VO=null;
function pickVoice(){const s=window.speechSynthesis;if(!s)return;const vs=s.getVoices().filter(v=>/^de/i.test(v.lang));if(!vs.length)return;
  const q=v=>(/natural|neural|online|premium|enhanced|erweitert/i.test(v.name)?20:0)+(/conrad|florian|killian|markus|yannick|stefan/i.test(v.name)?5:0)+(/google|microsoft/i.test(v.name)?3:0);
  VO=vs.slice().sort((a,b)=>q(b)-q(a))[0];}
if(window.speechSynthesis){pickVoice();try{speechSynthesis.addEventListener('voiceschanged',pickVoice);}catch(e){}}

function outroText(o){return o?'Zum Mitnehmen. '+o.replace(/^(Also zusammengefasst|Zusammengefasst|Also|Merke|Merksatz)\s*:\s*/i,''):'';}
const WARN=/achtung|typische[rn]? fehler|häufigste[rn]? fehler|klassiker|falle|verwechsel|vergiss nie|goldene regel/i;

function build(lesson,dialog,merke,extra){
  const scenes=lesson.clip2||[];const d=dialog||{};const M=merke||[];const flat=[];const chapters=[];
  chapters.push({h:'Einstieg',start:0});
  flat.push({ch:0,si:-1,who:'T',say:'Heute geht es um '+lesson.title.replace(/:/g,',')+'. '+(lesson.why||''),v:{intro:true}});
  scenes.forEach((s,si)=>{
    chapters.push({h:s.h,start:flat.length,si});const ci=chapters.length-1;
    s.beats.forEach(b=>flat.push({ch:ci,si,who:'T',say:b.say,show:b.show}));
    const lastShow=(s.beats[s.beats.length-1]||{}).show;
    ((extra||{})[si]||[]).forEach(t=>flat.push({ch:ci,si,who:'T',say:t,show:lastShow,deep:true}));
    if(M[si])flat.push({ch:ci,si,who:'T',say:'Merk dir: '+M[si],show:lastShow,merke:M[si]});
    flat[flat.length-1].last=true;
  });
  const notes=M.filter(Boolean);
  if(d.o||notes.length){chapters.push({h:'Zusammenfassung',start:flat.length});flat.push({ch:chapters.length-1,si:-2,who:'T',say:d.o?outroText(d.o):'Zum Mitnehmen: dein Merkzettel.',v:{outro:true}});}
  chapters.forEach((c,i)=>c.end=(chapters[i+1]?chapters[i+1].start:flat.length));
  return {scenes,flat,chapters,notes};
}

/* handgezeichnete Formen */
const jit=n=>(Math.random()-.5)*n;
function roughEllipse(x,y,w,h){const cx=x+w/2,cy=y+h/2,rx=w/2+10,ry=h/2+9;let d='';const st=-0.6+jit(.3);
  for(let i=0;i<=27;i++){const a=st+i/24*Math.PI*2;const r=1+jit(.06);d+=(i?'L':'M')+(cx+Math.cos(a)*rx*r).toFixed(1)+' '+(cy+Math.sin(a)*ry*r).toFixed(1);}return d;}
function roughLine(x1,y1,x2,y2){const mx=(x1+x2)/2+jit(6),my=(y1+y2)/2+jit(5);return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;}
function arrow(x2,y2,x1){const y1=y2+26+jit(8);const ang=Math.atan2(y2-y1,x2-x1);const hl=11;
  return roughLine(x1,y1,x2,y2)+` M${x2.toFixed(1)} ${y2.toFixed(1)} L${(x2-hl*Math.cos(ang-0.5)).toFixed(1)} ${(y2-hl*Math.sin(ang-0.5)).toFixed(1)} M${x2.toFixed(1)} ${y2.toFixed(1)} L${(x2-hl*Math.cos(ang+0.5)).toFixed(1)} ${(y2-hl*Math.sin(ang+0.5)).toFixed(1)}`;}

/* Untertitel: Wörter mit Schlüsselbegriffen */
const STOP=new Set(['dass','diese','dieser','dieses','einen','einem','einer','nicht','immer','heißt','wenn','dann','oder','also','auch','noch','werden','wird','beim','sind','eine','aber','hier','jetzt','alle','ganz','zwei','drei','genau','dabei','durch','unter','oben','unten','mitte']);
function subWords(text,keySet){
  return text.split(/(\s+)/).map(t=>{if(/^\s+$/.test(t))return t;const bare=t.replace(/[.,:;!?()„“"]/g,'');const low=bare.toLowerCase();
    const key=bare.length>1&&!STOP.has(low)&&(/^[A-ZÄÖÜ]{2,}$/.test(bare)||/\d/.test(bare)||keySet.has(low));
    return `<span class="w${key?' k':''}">${esc(t)}</span>`;}).join('');}
function visualWords(v){const s=new Set();if(!v)return s;JSON.stringify(v).toLowerCase().replace(/[a-zäöüß][a-zäöüß\-]{4,}/g,m=>{s.add(m);return m;});STOP.forEach(w=>s.delete(w));return s;}

function mount(root,lesson,opts){
  opts=opts||{};const S=opts.settings;const area=opts.area||'';
  const {scenes,flat,chapters,notes}=build(lesson,opts.dialog,opts.merke,opts.extra);
  let pos=0,playing=false,gen=0,timer=null,checkOpen=false,ended=false,raf=0,inkT=0;
  const cam={s:1,x:0,y:0};
  const audio=new Audio();audio.preload='auto';
  let actx=null,gain=null;
  const vol=()=>S.vol==null?1:S.vol;
  function applyVol(){const v=vol();if(gain){gain.gain.value=v;audio.volume=1;}else{audio.volume=Math.min(1,v);}}
  function ensureGraph(){/* nur für Blob-Quellen: dann ist Verstärkung bis 150 % möglich, auch auf dem iPhone */
    if(gain||!audio.src.startsWith('blob:'))return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    try{actx=new AC();const src=actx.createMediaElementSource(audio);gain=actx.createGain();src.connect(gain);gain.connect(actx.destination);}catch(e){gain=null;}
    applyVol();}
  let spriteSrc='audio/'+lesson.id+'.mp3';
  fetch(spriteSrc).then(r=>r.ok?r.blob():null).then(b=>{if(b)spriteSrc=URL.createObjectURL(b);}).catch(()=>{});
  const seg=f=>{const m=AUDIO&&AUDIO[lesson.id];return m?m[keyOf(f.who,f.say)]:null;};
  const estDur=f=>{const s=seg(f);return s?(s[1]-s[0]):Math.max(1.8,f.say.length/14.5);};
  let total=0;let starts=[];
  function computeStarts(){starts=[];let t=0;flat.forEach(f=>{starts.push(t);t+=estDur(f)+.4;});total=t;}
  computeStarts();
  let beatT0=0,beatOff=0,dragging=false,pendingOff=0;
  const keySets=scenes.map(s=>visualWords(s.v));

  root.innerHTML=`<div class="vp" tabindex="0">
   <div class="vp-stage" id="vpStage">
     <div class="vp-top"><span class="vp-ch" id="vpCh"></span><span class="vp-cnt num" id="vpCnt"></span></div>
     <div class="vp-cam" id="vpCam"><div class="vp-vis" id="vpVis"></div><svg class="vp-ink" id="vpInk" aria-hidden="true"></svg></div>
     <div class="vp-stamp" id="vpStamp" hidden>Achtung!</div>
     <div class="vp-note" id="vpNote2" hidden></div>
     <div class="vp-sub" id="vpSub"><span class="vp-av T">T</span><div class="vp-line"><b>Tom</b><span id="vpTxt"></span></div></div>
     <div class="vp-check" id="vpCheck" hidden></div>
     <button class="vp-big" id="vpBig" aria-label="Video abspielen"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg><span>Video starten · ca. ${Math.max(1,Math.round(total/60))} Min</span></button>
   </div>
   <div class="vp-tl" id="vpTl" role="slider" tabindex="0" aria-label="Video-Position" aria-valuemin="0"><div class="tl-track"><i class="tl-fill" id="tlFill"></i><span id="tlTicks"></span><i class="tl-thumb" id="tlThumb"></i></div><div class="tl-tip" id="tlTip" hidden></div></div>
   <div class="vp-ctrl">
     <button class="vp-ib vp-skip" id="vpBack10" aria-label="10 Sekunden zurück"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/></svg><b>10</b></button>
     <button class="vp-ib" id="vpPrev" aria-label="Zurück"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg></button>
     <button class="vp-ib vp-play" id="vpPlay" aria-label="Abspielen"></button>
     <button class="vp-ib" id="vpNext" aria-label="Weiter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 5l7 7-7 7"/></svg></button>
     <button class="vp-ib vp-skip" id="vpFwd10" aria-label="10 Sekunden vor"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4"/></svg><b>10</b></button>
     <span class="vp-time num" id="vpTime"></span>
     <span style="flex:1"></span>
     <button class="vp-ib vp-mz" id="vpMz" aria-label="Merkzettel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3h14v18l-7-4-7 4z"/></svg><b class="num" id="vpMzN">0</b></button>
     <button class="vp-ib vp-txt" id="vpRate" aria-label="Tempo"></button>
     <span class="vp-vol"><button class="vp-ib" id="vpVolB" aria-label="Lautstärke" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg><b class="num" id="vpVolN"></b></button><span class="vp-volpop" id="vpVolP" hidden><button class="vp-vs" data-dv="-0.1" aria-label="Leiser">−</button><input type="range" id="vpVol" min="0" max="1.5" step="0.05" aria-label="Lautstärke"><button class="vp-vs" data-dv="0.1" aria-label="Lauter">+</button></span></span>
     <button class="vp-ib" id="vpCC" aria-label="Untertitel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 10.5a2 2 0 1 0 0 3M16.5 10.5a2 2 0 1 0 0 3"/></svg></button>
     <button class="vp-ib" id="vpSnd" aria-label="Ton"></button>
     <button class="vp-ib" id="vpFs" aria-label="Vollbild"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>
   </div>
   <details class="vp-chap"><summary>Kapitel (${chapters.length})</summary><ol>${chapters.map((c,i)=>`<li><button data-cj="${i}"><span class="num">${i+1}</span>${esc(c.h)}</button></li>`).join('')}</ol></details>
   <p class="vp-hint small muted" id="vpHint"></p>
  </div>`;
  const $=id=>root.querySelector('#'+id);
  const wrap=root.querySelector('.vp');const vis=$('vpVis');const camEl=$('vpCam');const ink=$('vpInk');

  function visual(f){
    if(f.v&&f.v.intro)return `<div class="vp-card"><span class="vp-area ${area}">${esc(opts.areaLabel||area)}</span><h2 class="hand-in">${esc(lesson.title)}</h2><svg class="vp-under" viewBox="0 0 300 12" preserveAspectRatio="none"><path d="M3 8 C70 2 140 11 200 6 S270 4 297 7"/></svg><div class="vp-agenda">${scenes.map((s,i)=>`<span style="animation-delay:${(.6+i*.14).toFixed(2)}s"><i>${i+1}</i>${esc(s.h)}</span>`).join('')}</div></div>`;
    if(f.v&&f.v.outro)return `<div class="vp-memo"><div class="vp-memo-h">Dein Merkzettel</div><ol>${notes.map((n,i)=>`<li style="animation-delay:${(.2+i*.35).toFixed(2)}s">${esc(n)}</li>`).join('')}</ol></div>`;
    return ClipPlayer.renderVisual(scenes[f.si].v,f.show);
  }
  /* Kamera: auf hervorgehobene Elemente zoomen */
  function focusRect(){
    const els=[...vis.querySelectorAll('.hl,.cell,.mid,.found,.fr.top,.bb.cmp,.bb.sw')].filter(e=>e.getClientRects().length);
    if(!els.length)return null;const cb=camEl.getBoundingClientRect();
    let x1=1e9,y1=1e9,x2=-1e9,y2=-1e9;els.forEach(e=>{const r=e.getBoundingClientRect();x1=Math.min(x1,r.left);y1=Math.min(y1,r.top);x2=Math.max(x2,r.right);y2=Math.max(y2,r.bottom);});
    const tl=(px,py)=>[(px-cb.left-cam.x)/cam.s,(py-cb.top-cam.y)/cam.s];
    const a=tl(x1,y1),b=tl(x2,y2);return {x:a[0],y:a[1],w:b[0]-a[0],h:b[1]-a[1],cw:cb.width,ch:cb.height};
  }
  function moveCam(f){
    let s=1,x=0,y=0;const r=(f.v&&(f.v.intro||f.v.outro))?null:focusRect();
    if(r&&!reduce){const max=r.cw<600?1.22:1.38;
      s=Math.max(1,Math.min(max,(r.cw*.86)/Math.max(r.w,1),(r.ch*.7)/Math.max(r.h,1)));
      if(s<1.08)s=1.06; /* leichte Fahrt auch bei breiten Elementen */
      x=r.cw/2-s*(r.x+r.w/2);y=r.ch/2-s*(r.y+r.h/2);
      x=Math.min(0,Math.max(r.cw-s*r.cw,x));y=Math.min(0,Math.max(r.ch-s*r.ch,y));}
    cam.s=s;cam.x=x;cam.y=y;vis.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
  }
  /* Tinte: Kreis oder Unterstrich mit Pfeil, sobald die Kamera steht */
  function drawInk(f){clearTimeout(inkT);ink.innerHTML='';if(f.v&&(f.v.intro||f.v.outro))return;
    inkT=setTimeout(()=>{const r=focusRect();if(!r)return;
      const sx=cam.x+r.x*cam.s,sy=cam.y+r.y*cam.s,sw=r.w*cam.s,sh=r.h*cam.s;
      ink.setAttribute('viewBox',`0 0 ${r.cw.toFixed(0)} ${r.ch.toFixed(0)}`);
      let d;if(sw/Math.max(sh,1)>5||sw>r.cw*.6){d=roughLine(sx+4,sy+sh+4,sx+sw-4,sy+sh+2+jit(3));if(sx>40)d+=' '+arrow(sx-6,sy+sh/2,Math.max(4,sx-44));}
      else d=roughEllipse(sx,sy,sw,sh);
      ink.innerHTML=`<path d="${d}" pathLength="1"/>`;},reduce?0:700);}
  let lastCh=-1,lastSi=null;
  function paint(){const f=flat[pos];const c=chapters[f.ch];
    const chEl=$('vpCh');
    if(f.ch!==lastCh){chEl.textContent=c.h;chEl.classList.remove('hand-in');void chEl.offsetWidth;chEl.classList.add('hand-in');
      vis.classList.remove('enter');void vis.offsetWidth;vis.classList.add('enter');lastCh=f.ch;
      cam.s=1;cam.x=0;cam.y=0;vis.style.transition='none';vis.style.transform='none';void vis.offsetWidth;vis.style.transition='';}
    $('vpCnt').textContent=(f.ch+1)+' / '+chapters.length;
    vis.innerHTML=visual(f);
    requestAnimationFrame(()=>{moveCam(f);drawInk(f);});
    const note=$('vpNote2');
    if(f.merke){note.innerHTML=`<b>Merk dir!</b><span>${esc(f.merke)}</span>`;note.hidden=false;note.classList.remove('in');void note.offsetWidth;note.classList.add('in');}
    else if(f.si!==lastSi||f.si<0)note.hidden=true;
    lastSi=f.si;
    $('vpMzN').textContent=flat.slice(0,pos+1).filter(x=>x.merke).length;
    const st=$('vpStamp');if(!f.merke&&f.si>=0&&WARN.test(f.say)){st.hidden=false;st.classList.remove('in');void st.offsetWidth;st.classList.add('in');}else st.hidden=true;
    const ks=f.si>=0?keySets[f.si]:new Set();
    $('vpTxt').innerHTML=f.merke?`<span class="w k">Merk dir:</span> ${subWords(f.merke,new Set((f.merke.toLowerCase().match(/[a-zäöüß]{5,}/g)||[])))}`:subWords(f.say,ks);
    timeWords(f);
    $('vpSub').classList.toggle('hidecc',S.cc===false);
    $('vpSub').classList.toggle('merke',!!f.merke);
    root.querySelectorAll('[data-cj]').forEach((b,i)=>b.classList.toggle('on',i===f.ch));
    updateTL();
  }
  /* Wörter im Sprechtempo einblenden */
  function timeWords(f){const ws=[...$('vpTxt').querySelectorAll('.w')];const dur=estDur(f)/(S.rate||1);const all=ws.reduce((a,w)=>a+w.textContent.length+1,0)||1;let acc=0;
    ws.forEach(w=>{w.style.animationDelay=(acc/all*dur*.95).toFixed(2)+'s';acc+=w.textContent.length+1;});}
  function restartWords(){const t=$('vpTxt');t.classList.remove('run','all');void t.offsetWidth;t.classList.add('run');}
  function showAllWords(){$('vpTxt').classList.add('run','all');}
  const mmss=s=>{s=Math.round(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
  function setCtl(){
    $('vpPlay').innerHTML=playing?'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>':'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    $('vpPlay').setAttribute('aria-label',playing?'Pause':'Abspielen');
    $('vpBig').hidden=playing||checkOpen||pos>0||ended;
    $('vpSnd').innerHTML=S.sound?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6"/></svg>';
    $('vpRate').textContent=String(S.rate||1).replace('.',',')+'×';
    $('vpCC').classList.toggle('off',S.cc===false);
    wrap.classList.toggle('playing',playing);
    wrap.classList.toggle('idle',!playing&&pos===0&&!ended&&!checkOpen);
  }
  function stopSound(){gen++;clearTimeout(timer);cancelAnimationFrame(raf);try{audio.pause();}catch(e){}if(window.speechSynthesis){try{speechSynthesis.cancel();}catch(e){}}wrap.classList.remove('talk');}
  function playSeg(sg,rate,onEnd,onFail,off){
    const start=()=>{ensureGraph();if(actx&&actx.state==='suspended')actx.resume();applyVol();try{audio.currentTime=sg[0]+(off||0);}catch(e){}audio.playbackRate=rate;try{audio.preservesPitch=true;}catch(e){}
      const pr=audio.play();if(pr&&pr.catch)pr.catch(onFail);
      cancelAnimationFrame(raf);const tick=()=>{if(audio.currentTime>=sg[1]-0.02||audio.ended){audio.pause();onEnd();return;}raf=requestAnimationFrame(tick);};raf=requestAnimationFrame(tick);};
    if(!audio.src.endsWith(spriteSrc)){audio.src=spriteSrc;audio.addEventListener('loadedmetadata',start,{once:true});audio.load();}
    else if(audio.readyState>=1)start();else audio.addEventListener('loadedmetadata',start,{once:true});
  }
  function playBeat(off){stopSound();const my=gen;const f=flat[pos];const rate=S.rate||1;off=off||pendingOff||0;pendingOff=0;
    beatOff=off;beatT0=performance.now();
    wrap.classList.add('talk');timeWords(f);restartWords();
    const pause=f.merke?1100:(f.last?650:320);
    const done=()=>{if(my!==gen)return;wrap.classList.remove('talk');showAllWords();timer=setTimeout(()=>{if(my===gen&&playing)afterBeat();},Math.round(pause/rate));};
    const sg=seg(f);const est=Math.max(400,(sg?0:Math.max(1800,f.say.length*68/rate))-off*1000/rate);
    if(S.sound&&sg){playSeg(sg,rate,done,()=>{timer=setTimeout(done,est);},off);timer=setTimeout(done,((sg[1]-sg[0]-off)*1000/rate)*2+4000);}
    else if(S.sound&&window.speechSynthesis){try{const u=new SpeechSynthesisUtterance(f.say);u.lang='de-DE';if(VO)u.voice=VO;u.rate=rate;u.volume=Math.min(1,vol());u.onend=done;u.onerror=done;
        speechSynthesis.speak(u);timer=setTimeout(done,est*1.8+2500);}catch(e){timer=setTimeout(done,est);}}
    else timer=setTimeout(done,est);
  }
  /* Zeitleiste zum Spulen */
  function curT(){const f=flat[pos];const d=estDur(f);let inBeat;
    if(ended)return total;
    const sg=seg(f);
    if(playing&&S.sound&&sg&&audio.src&&!audio.paused)inBeat=audio.currentTime-sg[0];
    else if(playing)inBeat=beatOff+(performance.now()-beatT0)/1000*(S.rate||1);
    else inBeat=pendingOff||0;
    return starts[pos]+Math.max(0,Math.min(d,inBeat));}
  function chAt(t){let k=0;for(let i=0;i<flat.length;i++){if(starts[i]<=t)k=i;else break;}return k;}
  function updateTL(t){if(t==null)t=curT();const pc=total?Math.min(100,t/total*100):0;
    $('tlFill').style.width=pc+'%';$('tlThumb').style.left=pc+'%';
    $('vpTl').setAttribute('aria-valuemax',Math.round(total));$('vpTl').setAttribute('aria-valuenow',Math.round(t));
    $('vpTime').textContent=mmss(t/(S.rate||1))+' / '+mmss(total/(S.rate||1));}
  function drawTicks(){$('tlTicks').innerHTML=chapters.slice(1).map(c=>`<i class="tl-tick" style="left:${(starts[c.start]/total*100).toFixed(2)}%"></i>`).join('');}
  function seek(t){if(checkOpen)return;t=Math.max(0,Math.min(total-0.05,t));const k=chAt(t);const off=Math.max(0,Math.min(estDur(flat[k])-0.2,t-starts[k]));
    pos=k;ended=false;paint();if(playing)playBeat(off);else{stopSound();pendingOff=off;showAllWords();}setCtl();updateTL(starts[k]+off);}
  function tFromX(x){const r=$('vpTl').getBoundingClientRect();return Math.max(0,Math.min(1,(x-r.left)/r.width))*total;}
  function tip(t,x){const tp=$('tlTip');const k=chAt(t);const r=$('vpTl').getBoundingClientRect();tp.hidden=false;tp.textContent=mmss(t/(S.rate||1))+' · '+chapters[flat[k].ch].h;
    const w=tp.offsetWidth;tp.style.left=Math.max(0,Math.min(r.width-w,(x-r.left)-w/2))+'px';}
  {const tl=$('vpTl');
    tl.addEventListener('pointerdown',e=>{dragging=true;tl.setPointerCapture(e.pointerId);const t=tFromX(e.clientX);updateTL(t);tip(t,e.clientX);tl.classList.add('drag');});
    tl.addEventListener('pointermove',e=>{const t=tFromX(e.clientX);tip(t,e.clientX);if(dragging)updateTL(t);});
    const endDrag=e=>{if(!dragging)return;dragging=false;tl.classList.remove('drag');$('tlTip').hidden=true;seek(tFromX(e.clientX));};
    tl.addEventListener('pointerup',endDrag);tl.addEventListener('pointercancel',()=>{dragging=false;tl.classList.remove('drag');$('tlTip').hidden=true;});
    tl.addEventListener('pointerleave',()=>{if(!dragging)$('tlTip').hidden=true;});
    tl.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();seek(curT()+5);}else if(e.key==='ArrowLeft'){e.preventDefault();e.stopPropagation();seek(curT()-5);}});}
  const tlTimer=setInterval(()=>{if(!dragging&&root.isConnected)updateTL();},250);
  function afterBeat(){const f=flat[pos];if(f.last&&f.si>=0){const sc=scenes[f.si];if(sc.check&&!sc._answered){openCheck(sc);return;}}advance();}
  function advance(){if(pos<flat.length-1){pos++;paint();if(playing)playBeat();}else finish();}
  function finish(){playing=false;stopSound();ended=true;paint();setCtl();showAllWords();opts.onFinish&&opts.onFinish(notes);}
  function openCheck(sc){checkOpen=true;stopSound();setCtl();const c=$('vpCheck');const ch=sc.check;
    c.innerHTML=`<div class="ck-in"><div class="ck-ey">Kurz mitdenken, bevor es weitergeht</div><div class="ck-q">${esc(ch.q)}</div><div class="ck-o">${ch.o.map((o,i)=>`<button data-i="${i}">${esc(o)}</button>`).join('')}</div><div class="ck-fb" id="ckFb"></div><button class="ck-skip" id="ckSkip">Überspringen</button></div>`;
    c.hidden=false;
    const cont=()=>{c.hidden=true;checkOpen=false;playing=true;setCtl();advance();};
    c.querySelector('#ckSkip').addEventListener('click',()=>{sc._answered=true;cont();});
    c.querySelectorAll('button[data-i]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.i;const ok=i===ch.a;
      c.querySelectorAll('button[data-i]').forEach(x=>{x.disabled=true;const xi=+x.dataset.i;if(xi===ch.a)x.classList.add('ok');else if(xi===i)x.classList.add('no');});
      sc._answered=true;opts.onCheck&&opts.onCheck(ok);c.querySelector('#ckSkip').remove();
      c.querySelector('#ckFb').innerHTML=`<b class="${ok?'ok':'no'}">${ok?'Genau.':'Nicht ganz.'}</b> ${esc(ch.e)}<button class="ck-go" id="ckGo">Weiter</button>`;
      c.querySelector('#ckGo').addEventListener('click',cont);c.querySelector('#ckGo').focus();}));}
  function toggle(){if(checkOpen)return;if(playing){playing=false;stopSound();showAllWords();}else{if(ended){pos=0;ended=false;scenes.forEach(s=>s._answered=false);paint();}playing=true;playBeat();}setCtl();}
  function jump(n){if(checkOpen)return;if(n<0)n=0;if(n>=flat.length){finish();return;}pos=n;pendingOff=0;ended=false;paint();if(playing)playBeat();else{stopSound();showAllWords();}setCtl();}
  function jumpCh(i){if(i<0||i>=chapters.length)return;jump(chapters[i].start);}
  $('vpPlay').addEventListener('click',toggle);$('vpBig').addEventListener('click',toggle);
  $('vpNext').addEventListener('click',()=>jump(pos+1));
  $('vpBack10').addEventListener('click',()=>seek(curT()-10));$('vpFwd10').addEventListener('click',()=>seek(curT()+10));$('vpPrev').addEventListener('click',()=>jump(pos-1));
  root.querySelectorAll('[data-cj]').forEach(b=>b.addEventListener('click',()=>{jumpCh(+b.dataset.cj);if(!playing)toggle();}));
  $('vpMz').addEventListener('click',()=>jumpCh(chapters.length-1));
  $('vpSnd').addEventListener('click',()=>{S.sound=!S.sound;opts.onSettings&&opts.onSettings();setCtl();if(playing)playBeat();});
  $('vpCC').addEventListener('click',()=>{S.cc=S.cc===false;opts.onSettings&&opts.onSettings();setCtl();$('vpSub').classList.toggle('hidecc',S.cc===false);});
  const setVol=v=>{S.vol=Math.max(0,Math.min(1.5,Math.round(v*20)/20));$('vpVol').value=S.vol;$('vpVolN').textContent=Math.round(S.vol*100)+'%';applyVol();opts.onSettings&&opts.onSettings();};
  $('vpVol').addEventListener('input',e=>setVol(+e.target.value));
  root.querySelectorAll('[data-dv]').forEach(b=>b.addEventListener('click',()=>setVol(vol()+ +b.dataset.dv)));
  $('vpVolB').addEventListener('click',()=>{const p=$('vpVolP');p.hidden=!p.hidden;$('vpVolB').setAttribute('aria-expanded',!p.hidden);});
  setVol(vol());
  $('vpRate').addEventListener('click',()=>{const i=RATES.indexOf(S.rate||1);S.rate=RATES[(i+1)%RATES.length];opts.onSettings&&opts.onSettings();setCtl();paint();if(playing)playBeat();});
  const refit=()=>{moveCam(flat[pos]);drawInk(flat[pos]);};
  $('vpFs').addEventListener('click',()=>{const fs=document.fullscreenElement||document.webkitFullscreenElement;
    if(fs||wrap.classList.contains('fsfake')){if(fs)(document.exitFullscreen||document.webkitExitFullscreen).call(document);wrap.classList.remove('fsfake');setTimeout(refit,300);return;}
    const req=wrap.requestFullscreen||wrap.webkitRequestFullscreen;const fake=()=>wrap.classList.add('fsfake');
    if(req){try{const p=req.call(wrap);if(p&&p.catch)p.catch(fake);}catch(e){fake();}}else fake();setTimeout(refit,350);});
  window.addEventListener('resize',refit);
  const stage=$('vpStage');let tx=null,ty=null;
  stage.addEventListener('touchstart',e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;},{passive:true});
  stage.addEventListener('touchend',e=>{if(tx==null)return;const t=e.changedTouches[0];const dx=t.clientX-tx,dy=t.clientY-ty;tx=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)jumpCh(flat[pos].ch+(dx<0?1:-1));},{passive:true});
  camEl.addEventListener('click',toggle);
  wrap.addEventListener('keydown',e=>{if(e.target.closest('.vp-check'))return;
    if(e.key===' '||e.key==='k'){e.preventDefault();toggle();}
    else if(e.key==='ArrowRight'){e.preventDefault();jump(pos+1);}else if(e.key==='ArrowLeft'){e.preventDefault();jump(pos-1);}
    else if(e.key==='f'){$('vpFs').click();}
    else if(e.key==='j'){seek(curT()-10);}else if(e.key==='l'){seek(curT()+10);}
    else if(e.key==='ArrowUp'){e.preventDefault();setVol(vol()+0.1);}else if(e.key==='ArrowDown'){e.preventDefault();setVol(vol()-0.1);}});
  loadIndex().then(()=>{computeStarts();drawTicks();const has=AUDIO&&AUDIO[lesson.id];const missing=flat.some(f=>!(has&&has[keyOf(f.who,f.say)]));
    $('vpHint').textContent=(has&&!missing?'':'Gerätestimme aktiv, die Profi-Stimme folgt. ')+'Leiste ziehen zum Spulen, J/L = 10 s zurück/vor, Leertaste = Pause, Pfeile = Satz vor/zurück, hoch/runter = lauter/leiser, wischen = nächstes Kapitel. Lesezeichen-Knopf = Merkzettel.';paint();});
  paint();setCtl();showAllWords();
  drawTicks();
  return ()=>{playing=false;stopSound();clearTimeout(inkT);clearInterval(tlTimer);window.removeEventListener('resize',refit);};
}
return {mount,build,keyOf,outroText};
})();
