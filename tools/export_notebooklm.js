#!/usr/bin/env node
/* Schreibt pro Thema eine NotebookLM-Quelle nach notebooklm/<id>.md (gleicher Inhalt wie der Download-Knopf in der App). */
const fs=require('fs'),path=require('path'),vm=require('vm');
const SRC=path.join(__dirname,'..','web','src');
const files=['c_ga2.js','c_ga1.js','c_wiso.js','clips_ga2.js','clips_ga1.js','clips_wiso.js','n_a.js','n_b.js','n_c.js','n_d.js','nclips_a.js','nclips_b.js','nclips_c.js','nclips_d.js','dialog_ga1.js','dialog_ga2.js','dialog_wiso.js','extra_ga1.js','extra_ga2.js','extra_wiso.js','merke.js'];
let code=files.map(f=>fs.readFileSync(path.join(SRC,f),'utf8')).join('\n');
const names=[...code.matchAll(/^const ([A-Z_0-9]+)\s*=/gm)].map(m=>m[1]);
code+='\n;globalThis.__X={'+names.join(',')+'};';
const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx);const X=ctx.__X;
const lessons=[].concat(...names.filter(n=>/^L_/.test(n)).map(n=>X[n]));
const clips=Object.assign({},...names.filter(n=>/CLIPS/.test(n)).map(n=>X[n]));
const dialog=Object.assign({},...names.filter(n=>/^DIALOG/.test(n)).map(n=>X[n]));
const AREA={GA2:'GA2 Algorithmen',GA1:'GA1 Planen',WISO:'WiSo'};
const out=path.join(__dirname,'..','notebooklm');fs.mkdirSync(out,{recursive:true});
let idx='# NotebookLM-Quellen\n\nPro Thema eine Datei. In NotebookLM ein Notebook anlegen, die Datei als Quelle hochladen, dann „Video-Übersicht“ oder „Audio-Übersicht“ erzeugen. Den Prompt aus der Datei ins Anpassen-Feld kopieren.\n\n';
for(const l of lessons){const sc=clips[l.id]||[];const d=dialog[l.id]||{};
  let md=`# ${l.title}\n\n> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich ${AREA[l.area]}.\n\n`;
  md+=`**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.\n\n## Warum prüfungsrelevant\n\n${l.why}\n\n## Inhalt\n\n`;
  sc.forEach((s,i)=>{md+=`### ${i+1}. ${s.h}\n\n`;if(d.s&&d.s[i])md+=`*Leitfrage: ${d.s[i]}*\n\n`;md+=s.beats.map(b=>b.say).concat(((Object.assign({},X.EXTRA_GA1||{},X.EXTRA_GA2||{},X.EXTRA_WISO||{})[l.id]||{})[i])||[]).join(' ')+'\n\n';if((X.MERKE||{})[l.id]&&X.MERKE[l.id][i])md+=`**Merk dir:** ${X.MERKE[l.id][i]}\n\n`;const v=s.v||{};
    if(v.code)md+='```\n'+v.code+'\n```\n\n';if(v.table)md+=v.table.map((r,j)=>'| '+r.join(' | ')+' |'+(j===0?'\n|'+r.map(()=>'---').join('|')+'|':'')).join('\n')+'\n\n';if(v.list)md+=v.list.map(x=>'- '+x).join('\n')+'\n\n';
    if(s.check)md+=`Kontrollfrage: ${s.check.q} Antwort: ${s.check.o[s.check.a]}. ${s.check.e}\n\n`;});
  if(d.o)md+=`## Zusammenfassung\n\n${d.o}\n\n`;
  md+='## Übungsfragen mit Lösung\n\n'+l.quiz.map((q,i)=>`${i+1}. ${q.q.replace(/\n/g,'  \n')}\n   - Lösung: ${q.type==='input'?q.a[0]:q.o[q.a]}. ${q.e}`).join('\n')+'\n\n';
  md+='## Schreibaufgaben mit Musterlösung\n\n'+l.write.map((w,i)=>`### Aufgabe ${i+1}\n\n${w.task}\n\n\`\`\`\n${w.model}\n\`\`\`\n`).join('\n');
  fs.writeFileSync(path.join(out,l.id+'.md'),md);idx+=`- [${l.title}](${l.id}.md) · ${AREA[l.area]}\n`;}
fs.writeFileSync(path.join(out,'README.md'),idx);console.log('geschrieben:',lessons.length);
