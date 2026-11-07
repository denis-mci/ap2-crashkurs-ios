#!/usr/bin/env node
/* Exportiert alle Sprechzeilen der Web-Videos (Tom + Lisa) nach web/audio_src.json.
   Gleiche Beat-Logik wie web/src/player.js (VideoPlayer.build). Aufruf: node tools/export_beats.js */
const fs=require('fs'),path=require('path'),vm=require('vm');
const SRC=path.join(__dirname,'..','web','src');
const files=['c_ga2.js','c_ga1.js','c_wiso.js','clips_ga2.js','clips_ga1.js','clips_wiso.js','n_a.js','n_b.js','n_c.js','n_d.js',
  'nclips_a.js','nclips_b.js','nclips_c.js','nclips_d.js','dialog_ga1.js','dialog_ga2.js','dialog_wiso.js','merke.js','extra_ga1.js','extra_ga2.js','extra_wiso.js'];
let code=files.map(f=>fs.readFileSync(path.join(SRC,f),'utf8')).join('\n');
const names=[...code.matchAll(/^const ([A-Z_0-9]+)\s*=/gm)].map(m=>m[1]);
code+='\n;globalThis.__X={'+names.join(',')+'};';
const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx);const X=ctx.__X;
const lessons=[].concat(...names.filter(n=>/^L_/.test(n)).map(n=>X[n]));
const clips=Object.assign({},...names.filter(n=>/CLIPS/.test(n)).map(n=>X[n]));
const dialog=Object.assign({},...names.filter(n=>/^DIALOG/.test(n)).map(n=>X[n]));
const out={};
for(const l of lessons){const sc=clips[l.id]||[];const d=dialog[l.id]||{};const beats=[];
  // g = Pause vor dem Satz in Sekunden (natürlicher Sprechrhythmus statt harter Schnitte)
  beats.push({who:'T',say:'Heute geht es um '+l.title.replace(/:/g,',')+'. '+(l.why||''),g:0});
  const M=(X.MERKE||{})[l.id]||[];
  const E=Object.assign({},X.EXTRA_GA1||{},X.EXTRA_GA2||{},X.EXTRA_WISO||{})[l.id]||{};
  sc.forEach((s,si)=>{s.beats.forEach((b,bi)=>beats.push({who:'T',say:b.say,g:bi===0?1.1:0.45}));(E[si]||[]).forEach(t=>beats.push({who:'T',say:t,g:0.5}));if(M[si])beats.push({who:'T',say:'Merk dir: '+M[si],g:0.8});});
  if(d.o||M.some(Boolean))beats.push({who:'T',g:1.2,say:d.o?'Zum Mitnehmen. '+d.o.replace(/^(Also zusammengefasst|Zusammengefasst|Also|Merke|Merksatz)\s*:\s*/i,''):'Zum Mitnehmen: dein Merkzettel.'});
  out[l.id]=beats;}
fs.writeFileSync(path.join(__dirname,'..','web','audio_src.json'),JSON.stringify(out,null,0));
console.log('Lektionen:',Object.keys(out).length,'Beats:',Object.values(out).reduce((a,b)=>a+b.length,0));
