// WiSo: Wirtschafts- und Sozialkunde
const L_WISO = [
{
id:'ausbildung', area:'WISO', prio:1, title:'Ausbildung: BBiG und Jugendschutz', mins:20,
why:'Fragen zur eigenen Ausbildung sind in WiSo fast garantiert.',
clip:[
{h:'Duales System', v:{table:[['Lernort','Rechtsgrundlage','Aufsicht'],['Betrieb','BBiG, Ausbildungsordnung','IHK (zuständige Stelle)'],['Berufsschule','Schulgesetz, Rahmenlehrplan','Land']]},
 say:'Deine Ausbildung ist dual: Betrieb und Berufsschule. Für den Betrieb gilt das Berufsbildungsgesetz, kurz BBiG, und die Ausbildungsordnung. Die IHK überwacht als zuständige Stelle, führt das Verzeichnis der Ausbildungsverträge und nimmt die Prüfungen ab. Die Berufsschule ist Sache des Bundeslandes.'},
{h:'Der Ausbildungsvertrag', v:{list:['Muss vor Beginn schriftlich bzw. in Textform festgehalten werden','Inhalte u. a.: Beruf, Beginn und Dauer, tägliche Ausbildungszeit, Probezeit, Vergütung, Urlaub, Kündigungsvoraussetzungen','Wird bei der IHK ins Verzeichnis eingetragen','Bei Minderjährigen stimmen die gesetzlichen Vertreter zu und erhalten den Vertrag']},
 say:'Der Ausbildungsvertrag muss vor Beginn schriftlich oder seit 2024 auch in Textform, also zum Beispiel als PDF, festgehalten werden. Drin stehen unter anderem Beruf, Beginn und Dauer, die tägliche Ausbildungszeit, die Probezeit, Vergütung, Urlaub und die Kündigungsvoraussetzungen. Die IHK trägt ihn ins Verzeichnis ein. Bei Minderjährigen müssen die Eltern zustimmen und bekommen den Vertrag ebenfalls.'},
{h:'Pflichten', v:{table:[['Azubi','Ausbildender (Betrieb)'],['Lernpflicht, sorgfältig arbeiten','Ausbildungsziel vermitteln'],['Weisungen befolgen','Ausbildungsmittel kostenlos stellen'],['Berufsschule besuchen','für Berufsschule und Prüfung freistellen'],['Ausbildungsnachweis führen','Ausbildungsnachweis kontrollieren'],['Schweigepflicht','Vergütung zahlen, nur ausbildungsbezogene Aufgaben'],['Betriebsordnung einhalten','Zeugnis ausstellen']]},
 say:'Deine Pflichten: lernen, Weisungen befolgen, Berufsschule besuchen, den Ausbildungsnachweis führen, schweigen über Betriebsgeheimnisse. Die Pflichten des Betriebs: dich ausbilden, Ausbildungsmittel kostenlos stellen, dich für Schule und Prüfung freistellen, Vergütung zahlen, dir nur ausbildungsbezogene Aufgaben geben und am Ende ein Zeugnis ausstellen.'},
{h:'Probezeit und Kündigung', v:{table:[['Zeitpunkt','Wer','Wie'],['In der Probezeit (1 bis 4 Monate)','beide','jederzeit, ohne Frist, ohne Grund, schriftlich'],['Nach der Probezeit','beide','nur fristlos aus wichtigem Grund, schriftlich mit Gründen'],['Nach der Probezeit','nur Azubi','4 Wochen Frist bei Berufswechsel oder Aufgabe der Ausbildung']]},
 say:'Die Probezeit dauert mindestens einen und höchstens vier Monate. In der Probezeit können beide jederzeit ohne Frist und ohne Grund kündigen, aber schriftlich. Nach der Probezeit kann der Betrieb nur noch fristlos aus wichtigem Grund kündigen. Du als Azubi kannst zusätzlich mit vier Wochen Frist kündigen, wenn du den Beruf wechselst oder die Ausbildung aufgibst. Immer schriftlich, nach der Probezeit mit Begründung.'},
{h:'Ende der Ausbildung', v:{list:['Endet mit Ablauf der Ausbildungszeit','Oder vorher: mit Bekanntgabe des Prüfungsergebnisses durch den Ausschuss (bestanden)','Durchgefallen: Verlängerung auf Verlangen bis zur Wiederholungsprüfung, max. 1 Jahr','Prüfung darf 2× wiederholt werden','Weiterarbeit ohne Absprache → unbefristetes Arbeitsverhältnis','Verkürzung auf Antrag bei guten Leistungen']},
 say:'Die Ausbildung endet mit Ablauf der Zeit. Bestehst du vorher, endet sie mit der Bekanntgabe des Ergebnisses durch den Prüfungsausschuss. Fällst du durch, kannst du verlangen, dass sie bis zur Wiederholungsprüfung verlängert wird, höchstens ein Jahr. Die Prüfung darf zweimal wiederholt werden. Und Achtung: Arbeitest du nach der Ausbildung einfach weiter, ohne dass etwas vereinbart wurde, entsteht ein unbefristetes Arbeitsverhältnis.'},
{h:'Zeugnis', v:{table:[['Einfaches Zeugnis','Qualifiziertes Zeugnis'],['Art, Dauer, Ziel der Ausbildung','zusätzlich Verhalten und Leistung'],['immer','nur auf Verlangen des Azubis']]},
 say:'Am Ende gibt es ein Zeugnis. Das einfache Zeugnis nennt Art, Dauer und Ziel der Ausbildung und die erworbenen Fertigkeiten. Das qualifizierte enthält zusätzlich Verhalten und Leistung, aber nur, wenn du es verlangst.'},
{h:'Jugendarbeitsschutz (unter 18)', v:{table:[['Regel','Wert'],['Arbeitszeit','max. 8 h/Tag, 40 h/Woche, 5-Tage-Woche'],['Pausen','30 min bei mehr als 4,5 h, 60 min bei mehr als 6 h'],['Freizeit zwischen zwei Tagen','mind. 12 h'],['Berufsschule mit mehr als 5 Unterrichtsstunden','1× pro Woche = 8 h Arbeitszeit'],['Urlaub','30 / 27 / 25 Werktage (unter 16 / 17 / 18)']]},
 say:'Für Jugendliche unter achtzehn gilt das Jugendarbeitsschutzgesetz. Maximal acht Stunden am Tag und vierzig in der Woche, Fünf-Tage-Woche. Pausen: dreißig Minuten bei mehr als viereinhalb Stunden, sechzig Minuten bei mehr als sechs Stunden. Zwölf Stunden Freizeit zwischen zwei Arbeitstagen. Ein Berufsschultag mit mehr als fünf Unterrichtsstunden zählt einmal pro Woche als acht Stunden. Urlaub: dreißig, siebenundzwanzig oder fünfundzwanzig Werktage, je nach Alter.'},
{h:'Mindestausbildungsvergütung', v:{stat:'724 €', sub:'1. Ausbildungsjahr bei Beginn 2026. Danach +18 %, +35 %, +40 %. Tarifverträge dürfen abweichen.'},
 say:'Die Mindestausbildungsvergütung für Ausbildungen, die 2026 beginnen, liegt im ersten Jahr bei siebenhundertvierundzwanzig Euro. In den Folgejahren gibt es Aufschläge von achtzehn, fünfunddreißig und vierzig Prozent.'}
],
videos:[{id:'98ClY1Qp7Bc',t:'Rechte und Pflichten im Ausbildungsvertrag',c:'Die Merkhilfe Wirtschaft'},{id:'vN-nyhEp0nI',t:'Kündigung des Ausbildungsvertrages',c:'#Sogeht by Sven Stemmler'}],
quiz:[
{q:'Wie lange darf die Probezeit in der Ausbildung höchstens dauern?', o:['1 Monat','3 Monate','4 Monate','6 Monate'], a:2, e:'Mindestens 1, höchstens 4 Monate (§ 20 BBiG).'},
{q:'Wie kann der Betrieb NACH der Probezeit kündigen?', o:['mit 4 Wochen Frist','nur fristlos aus wichtigem Grund','gar nicht','mündlich jederzeit'], a:1, e:'Ordentliche Kündigung durch den Betrieb ist nach der Probezeit ausgeschlossen.'},
{q:'Der Azubi will den Beruf wechseln. Welche Kündigungsfrist gilt nach der Probezeit?', o:['keine','2 Wochen','4 Wochen','3 Monate'], a:2, e:'4 Wochen bei Aufgabe oder Wechsel der Ausbildung.'},
{q:'Wann endet die Ausbildung, wenn du die Prüfung vorzeitig bestehst?', o:['Ende des Monats','mit Bekanntgabe des Ergebnisses durch den Prüfungsausschuss','nach Vertragsende','nach Zeugnisübergabe'], a:1, e:'§ 21 BBiG.'},
{q:'Du arbeitest nach der bestandenen Prüfung ohne Absprache weiter. Was entsteht?', o:['nichts','befristetes Arbeitsverhältnis','unbefristetes Arbeitsverhältnis','Praktikum'], a:2, e:'§ 24 BBiG.'},
{q:'Wer muss die Ausbildungsmittel (z. B. Laptop, Fachbücher für den Betrieb) bezahlen?', o:['Azubi','Berufsschule','Ausbildender, kostenlos für den Azubi','IHK'], a:2, e:'Pflicht des Ausbildenden.'},
{q:'Was enthält das qualifizierte Zeugnis zusätzlich?', o:['Gehalt','Verhalten und Leistung','Krankheitstage','Noten der Berufsschule'], a:1, e:'Nur auf Verlangen.'},
{q:'Wer überwacht die Ausbildung und nimmt die Prüfung ab?', o:['Berufsschule','IHK als zuständige Stelle','Agentur für Arbeit','Betriebsrat'], a:1, e:'Die IHK.'},
{q:'Wie lange muss die Pause für Jugendliche bei mehr als 6 Stunden Arbeit insgesamt sein?', o:['30 min','45 min','60 min','90 min'], a:2, e:'JArbSchG: 60 Minuten.'},
{q:'Wie oft darf die Abschlussprüfung wiederholt werden?', type:'input', a:['2','zweimal','2x','2 mal'], e:'Zweimal.'}
],
write:[
{task:'Nenne 3 Pflichten des Azubis und 3 Pflichten des Ausbildenden.',
 keys:[['Lernpflicht',/lern/i],['Berufsschule',/berufsschul|schule/i],['Ausbildungsnachweis / Berichtsheft',/nachweis|berichtsheft/i],['Schweigepflicht / Weisungen',/schweig|weisung|verschwieg/i],['Ausbildungsmittel kostenlos',/mittel|kostenlos/i],['Vergütung',/verg(ü|ue)tung|bezahl|lohn/i],['Freistellung',/freistell/i]],
 model:'Azubi: Lernpflicht, Weisungen befolgen, Berufsschule besuchen, Ausbildungsnachweis führen, Schweigepflicht.\nAusbildender: Ausbildungsziel vermitteln, Ausbildungsmittel kostenlos stellen, für Berufsschule und Prüfung freistellen, Vergütung zahlen, Zeugnis ausstellen.'}
]},

{
id:'arbeitsrecht', area:'WISO', prio:1, title:'Arbeitsrecht, Betriebsrat, Tarif', mins:25,
why:'Gewerkschaft, Betriebsrat und JAV sind typische WiSo-Fragen.',
clip:[
{h:'Rangfolge der Regeln', v:{code:`Grundgesetz
 └ Gesetze (BGB, ArbZG, KSchG, BUrlG ...)
    └ Tarifvertrag
       └ Betriebsvereinbarung
          └ Arbeitsvertrag

Günstigkeitsprinzip: Abweichen nach unten nur,
wenn es für den Arbeitnehmer BESSER ist.`},
 say:'Die Rangfolge im Arbeitsrecht: oben Grundgesetz und Gesetze, dann Tarifvertrag, dann Betriebsvereinbarung, ganz unten der Arbeitsvertrag. Eine niedrigere Regel darf nur abweichen, wenn sie für den Arbeitnehmer günstiger ist. Das ist das Günstigkeitsprinzip.'},
{h:'Arbeitszeit und Urlaub (Erwachsene)', v:{table:[['Regel','Wert'],['Arbeitszeit','8 h/Tag, bis 10 h wenn Ausgleich auf Ø 8 h'],['Pause','30 min bei mehr als 6 h, 45 min bei mehr als 9 h'],['Ruhezeit','11 h zwischen zwei Arbeitstagen'],['Mindesturlaub','24 Werktage (6-Tage-Woche) = 20 Arbeitstage bei 5-Tage-Woche']]},
 say:'Für Erwachsene gilt das Arbeitszeitgesetz: acht Stunden am Tag, bis zu zehn, wenn es im Durchschnitt auf acht ausgeglichen wird. Pause dreißig Minuten bei mehr als sechs Stunden, fünfundvierzig bei mehr als neun. Elf Stunden Ruhezeit. Mindesturlaub sind vierundzwanzig Werktage, bei einer Fünf-Tage-Woche also zwanzig Arbeitstage.'},
{h:'Kündigung', v:{table:[['Art','Regel'],['Form','immer schriftlich, keine E-Mail, kein WhatsApp'],['Grundfrist','4 Wochen zum 15. oder zum Monatsende'],['Längere Frist','für den Arbeitgeber, je länger man im Betrieb ist'],['Fristlos','wichtiger Grund, innerhalb 2 Wochen nach Kenntnis'],['Abmahnung','meist vor verhaltensbedingter Kündigung nötig'],['Betriebsrat','muss vor jeder Kündigung durch den Arbeitgeber angehört werden, wenn es einen gibt']]},
 say:'Eine Kündigung muss immer schriftlich auf Papier mit Unterschrift sein. E-Mail reicht nicht. Die Grundfrist ist vier Wochen zum fünfzehnten oder zum Monatsende. Für den Arbeitgeber wird sie länger, je länger du im Betrieb bist. Fristlos geht nur aus wichtigem Grund, innerhalb von zwei Wochen. Vor einer verhaltensbedingten Kündigung kommt meist eine Abmahnung. Und gibt es einen Betriebsrat, muss er vor jeder Kündigung durch den Arbeitgeber angehört werden, sonst ist die Kündigung unwirksam.'},
{h:'Kündigungsschutzgesetz', v:{list:['Gilt ab mehr als 10 Arbeitnehmern im Betrieb und 6 Monaten Betriebszugehörigkeit','Kündigung muss sozial gerechtfertigt sein: personen-, verhaltens- oder betriebsbedingt','Klage beim Arbeitsgericht innerhalb von 3 Wochen','Besonderer Schutz: Schwangere, Elternzeit, Betriebsrat/JAV, Schwerbehinderte, Azubis nach Probezeit']},
 say:'Das Kündigungsschutzgesetz gilt in Betrieben mit mehr als zehn Arbeitnehmern, wenn du länger als sechs Monate da bist. Dann braucht der Arbeitgeber einen Grund: personenbedingt, verhaltensbedingt oder betriebsbedingt. Du kannst innerhalb von drei Wochen beim Arbeitsgericht klagen. Besonders geschützt sind Schwangere, Leute in Elternzeit, Betriebsräte, Schwerbehinderte und Azubis nach der Probezeit.'},
{h:'Betriebsrat', v:{table:[['Fakt','Wert'],['Wählbar ab','5 ständigen wahlberechtigten Arbeitnehmern, davon 3 wählbar'],['Amtszeit','4 Jahre'],['Wählen darf','wer mind. 16 Jahre alt ist'],['Gewählt werden darf','wer 18 ist und 6 Monate im Betrieb']]},
 say:'Ein Betriebsrat kann gewählt werden, wenn ein Betrieb mindestens fünf ständige wahlberechtigte Arbeitnehmer hat, von denen drei wählbar sind. Die Amtszeit beträgt vier Jahre. Wählen darf man ab sechzehn, gewählt werden ab achtzehn und nach sechs Monaten im Betrieb.'},
{h:'Rechte des Betriebsrats', v:{table:[['Stufe','Bedeutung','Beispiele'],['Mitbestimmung','ohne Zustimmung geht nichts','Arbeitszeitbeginn, Pausen, Urlaubsplan, technische Überwachung (z. B. neue Software, die Leistung messen kann)'],['Mitwirkung','Anhörung / Beratung, Arbeitgeber entscheidet','Kündigung (Anhörung), Personalplanung'],['Information','nur unterrichten','wirtschaftliche Lage']]},
 say:'Der Betriebsrat hat drei Stufen von Rechten. Mitbestimmung: Ohne seine Zustimmung geht nichts. Das gilt bei Arbeitszeiten, Pausen, Urlaubsplan und bei technischen Einrichtungen, die Leistung oder Verhalten überwachen können. Für dich als ITler wichtig: Neue Software, die so etwas kann, braucht die Zustimmung des Betriebsrats. Mitwirkung: Er wird angehört, aber der Arbeitgeber entscheidet, zum Beispiel bei Kündigungen. Information: Er wird nur unterrichtet.'},
{h:'JAV', v:{table:[['Fakt','Wert'],['Wer','Jugend- und Auszubildendenvertretung'],['Voraussetzung','mind. 5 AN unter 18 oder Azubis unter 25 UND ein Betriebsrat'],['Amtszeit','2 Jahre'],['Rolle','vertritt Jugendliche und Azubis gegenüber dem Betriebsrat']]},
 say:'Die Jugend- und Auszubildendenvertretung, kurz JAV, gibt es ab fünf Arbeitnehmern unter achtzehn oder Azubis unter fünfundzwanzig. Es muss aber einen Betriebsrat geben. Die Amtszeit ist zwei Jahre. Die JAV arbeitet über den Betriebsrat, nicht direkt mit dem Arbeitgeber.'},
{h:'Tarifvertrag', v:{list:['Tarifparteien: Gewerkschaft und Arbeitgeberverband (Verbandstarif) oder einzelner Arbeitgeber (Haustarif)','Tarifautonomie: Staat mischt sich nicht ein (Art. 9 GG)','Manteltarifvertrag: Arbeitszeit, Urlaub, Kündigung (lange Laufzeit)','Lohn- und Gehaltstarifvertrag: Höhe der Bezahlung (kurze Laufzeit)','Friedenspflicht: kein Streik während der Laufzeit','Ablauf: Verhandlung → Scheitern → Schlichtung → Urabstimmung (75 %) → Streik → Einigung → Urabstimmung (25 %)']},
 say:'Tarifverträge schließen Gewerkschaften mit Arbeitgeberverbänden oder einzelnen Arbeitgebern ab. Der Staat mischt sich nicht ein, das nennt man Tarifautonomie. Der Manteltarifvertrag regelt Arbeitszeit und Urlaub, der Lohn- und Gehaltstarifvertrag die Bezahlung. Während der Laufzeit gilt Friedenspflicht, also kein Streik. Für einen Streik braucht es eine Urabstimmung, bei der meist fünfundsiebzig Prozent zustimmen müssen.'},
{h:'Mutterschutz und Elternzeit', v:{table:[['Regel','Wert'],['Mutterschutz','6 Wochen vor, 8 Wochen nach der Geburt'],['Kündigungsverbot','Schwangerschaft bis 4 Monate nach Geburt'],['Elternzeit','bis 3 Jahre pro Kind, für beide Eltern'],['Anmeldung Elternzeit','7 Wochen vorher (bis 3. Geburtstag)'],['Mindestlohn 2026','13,90 € pro Stunde']]},
 say:'Mutterschutz gilt sechs Wochen vor und acht Wochen nach der Geburt. Schwangere sind bis vier Monate nach der Geburt vor Kündigung geschützt. Elternzeit gibt es bis zu drei Jahre pro Kind für beide Elternteile, anmelden sieben Wochen vorher. Und der gesetzliche Mindestlohn liegt 2026 bei dreizehn Euro neunzig.'}
],
videos:[{id:'fTcNA__4d0w',t:'Betriebsrat einfach erklärt',c:'Poko-Institut Münster'},{id:'FNuQffezCPw',t:'Tarifvertrag einfach erklärt',c:'BetriebsratVideo by W.A.F.'}],
quiz:[
{q:'Ab wie vielen ständigen wahlberechtigten Arbeitnehmern kann ein Betriebsrat gewählt werden?', type:'input', a:['5','fünf'], e:'§ 1 BetrVG.'},
{q:'Wie lange ist die Amtszeit der JAV?', o:['1 Jahr','2 Jahre','4 Jahre','5 Jahre'], a:1, e:'JAV 2 Jahre, Betriebsrat 4 Jahre.'},
{q:'Ist eine Kündigung per E-Mail wirksam?', o:['ja','nein, Schriftform mit Unterschrift nötig','nur in der Probezeit','nur mit Lesebestätigung'], a:1, e:'§ 623 BGB.'},
{q:'Was passiert, wenn der Betriebsrat vor einer Kündigung nicht angehört wurde?', o:['nichts','Kündigung ist unwirksam','Frist verlängert sich','Abfindung fällig'], a:1, e:'§ 102 BetrVG.'},
{q:'Neue Software kann die Leistung der Mitarbeiter auswerten. Welches Recht hat der Betriebsrat?', o:['Information','Mitwirkung','Mitbestimmung','keins'], a:2, e:'§ 87 Abs. 1 Nr. 6 BetrVG: technische Überwachungseinrichtungen.'},
{q:'Innerhalb welcher Frist muss eine Kündigungsschutzklage erhoben werden?', o:['1 Woche','2 Wochen','3 Wochen','3 Monate'], a:2, e:'3 Wochen nach Zugang der Kündigung.'},
{q:'Was bedeutet Friedenspflicht?', o:['Kein Streik während der Laufzeit des Tarifvertrags','Kein Streit im Betrieb','Kündigungsverbot','Schlichtung ist Pflicht'], a:0, e:'Nur über Punkte, die der laufende Vertrag regelt.'},
{q:'Was regelt der Manteltarifvertrag?', o:['nur die Gehaltshöhe','Rahmenbedingungen wie Arbeitszeit und Urlaub','Betriebsratswahl','Sozialversicherung'], a:1, e:'Lohn/Gehalt steht im Lohn- und Gehaltstarifvertrag.'},
{q:'Wie lange gilt Mutterschutz nach der Geburt (normal)?', o:['6 Wochen','8 Wochen','12 Wochen','14 Wochen'], a:1, e:'6 Wochen vor, 8 Wochen nach.'},
{q:'Wie hoch ist der Mindestlohn 2026 pro Stunde?', type:'input', a:['13,90','13.90','13,9','13.9','13,90 €','13,90€'], e:'Seit 1.1.2026: 13,90 €; ab 2027: 14,60 €.'},
{q:'Mindesturlaub bei 5-Tage-Woche nach BUrlG in Arbeitstagen?', type:'input', a:['20'], e:'24 Werktage bei 6-Tage-Woche = 20 Arbeitstage bei 5-Tage-Woche.'},
{q:'Ab wann gilt das Kündigungsschutzgesetz?', o:['ab 1. Tag','ab mehr als 10 AN und 6 Monaten Betriebszugehörigkeit','ab 5 AN','nur im öffentlichen Dienst'], a:1, e:'§§ 1, 23 KSchG.'}
],
write:[
{task:'Erkläre den Unterschied zwischen Mitbestimmung, Mitwirkung und Information des Betriebsrats mit je einem Beispiel.',
 keys:[['Mitbestimmung = Zustimmung nötig',/mitbestimm.*(zustimm|ohne|nicht)/is],['Beispiel Mitbestimmung',/arbeitszeit|pause|urlaubsplan|(ü|ue)berwach|software/i],['Mitwirkung = Anhörung / Beratung',/mitwirk.*(anh(ö|oe)r|berat)/is],['Beispiel Mitwirkung',/k(ü|ue)ndig|personalplan/i],['Information = nur unterrichten',/informat.*(unterricht|inform|mitteil)/is]],
 model:'Mitbestimmung: Der Arbeitgeber kann ohne Zustimmung des Betriebsrats nicht handeln, z. B. bei Arbeitszeitregelungen oder Einführung einer Software, die Leistung überwachen kann.\nMitwirkung: Der Betriebsrat wird angehört oder beraten, der Arbeitgeber entscheidet aber, z. B. Anhörung vor einer Kündigung.\nInformation: Der Betriebsrat wird nur unterrichtet, z. B. über die wirtschaftliche Lage.'}
]},

{
id:'sozial', area:'WISO', prio:1, title:'Sozialversicherung und Lohn', mins:20,
why:'Die 5 Säulen und die Abrechnung sind WiSo-Dauerbrenner.',
clip:[
{h:'Die 5 Säulen', v:{table:[['Versicherung','Träger','Beitrag 2026'],['Krankenversicherung','Krankenkassen','14,6 % + Zusatzbeitrag (Ø 2,9 %)'],['Rentenversicherung','Deutsche Rentenversicherung','18,6 %'],['Arbeitslosenversicherung','Bundesagentur für Arbeit','2,6 %'],['Pflegeversicherung','Pflegekassen','3,6 %'],['Unfallversicherung','Berufsgenossenschaften und Unfallkassen','zahlt nur der Arbeitgeber']]},
 say:'Die Sozialversicherung hat fünf Säulen. Krankenversicherung bei den Krankenkassen: vierzehn Komma sechs Prozent plus Zusatzbeitrag, im Schnitt zwei Komma neun. Rentenversicherung bei der Deutschen Rentenversicherung: achtzehn Komma sechs Prozent. Arbeitslosenversicherung bei der Bundesagentur für Arbeit: zwei Komma sechs Prozent. Pflegeversicherung bei den Pflegekassen: drei Komma sechs Prozent. Und die Unfallversicherung bei den Berufsgenossenschaften, die zahlt der Arbeitgeber allein.'},
{h:'Wer zahlt was?', v:{list:['Kranken-, Renten-, Arbeitslosen-, Pflegeversicherung: Arbeitgeber und Arbeitnehmer je zur Hälfte (Ausnahme Pflege in Sachsen: AN 2,3 %, AG 1,3 %)','Ausnahme Pflege: Kinderlose ab 23 zahlen 0,6 % Zuschlag allein','Unfallversicherung: nur Arbeitgeber','Azubis bis 325 € Vergütung im Monat: Arbeitgeber zahlt alles allein']},
 say:'Die ersten vier Versicherungen teilen sich Arbeitgeber und Arbeitnehmer zur Hälfte. Ausnahme: Kinderlose ab dreiundzwanzig zahlen einen Pflegezuschlag von null Komma sechs Prozent allein. Die Unfallversicherung zahlt nur der Arbeitgeber. Und bei Azubis mit höchstens dreihundertfünfundzwanzig Euro im Monat zahlt der Arbeitgeber alles allein.'},
{h:'Unfallversicherung', v:{list:['Arbeitsunfälle','Wegeunfälle: direkter Weg zur Arbeit / Berufsschule und zurück','Berufskrankheiten','Auch Azubis und Berufsschüler sind versichert','Unfall sofort dem Arbeitgeber melden, D-Arzt aufsuchen']},
 say:'Die Unfallversicherung deckt Arbeitsunfälle, Berufskrankheiten und Wegeunfälle. Wegeunfall heißt auf dem direkten Weg zur Arbeit oder Berufsschule und zurück. Machst du einen privaten Umweg, zum Beispiel zum Einkaufen, bist du in der Regel nicht versichert.'},
{h:'Brutto zu Netto', v:{code:`  Bruttogehalt
− Lohnsteuer (nach Steuerklasse)
− Solidaritätszuschlag (meist entfallen)
− Kirchensteuer (8 % / 9 % der Lohnsteuer)
− Sozialversicherung (Arbeitnehmeranteile)
= Nettogehalt

Beispiel AN-Anteile, unter 23:
KV 7,3 % + 1,45 % | RV 9,3 % | AV 1,3 % | PV 1,8 %
= 21,15 % → bei 1.000 € brutto: 211,50 €`},
 say:'Vom Brutto zum Netto: Abgezogen werden Lohnsteuer, gegebenenfalls Soli und Kirchensteuer, und die Arbeitnehmeranteile zur Sozialversicherung. Beispiel unter dreiundzwanzig: Krankenversicherung sieben Komma drei plus halber Zusatzbeitrag, Rente neun Komma drei, Arbeitslosen eins Komma drei, Pflege eins Komma acht. Zusammen rund einundzwanzig Prozent. Bei tausend Euro brutto also etwa zweihundertelf Euro fünfzig.'},
{h:'Steuerklassen', v:{table:[['Klasse','Wer'],['I','ledig'],['II','alleinerziehend'],['III','verheiratet, besser verdienend (Partner V)'],['IV','verheiratet, ähnlich verdienend'],['V','verheiratet, geringer verdienend'],['VI','Zweitjob']]},
 say:'Die Steuerklassen. Eins für Ledige. Zwei für Alleinerziehende. Drei und fünf für Verheiratete mit unterschiedlichem Einkommen. Vier für Verheiratete mit ähnlichem Einkommen. Sechs für einen Zweitjob.'},
{h:'Prinzipien', v:{table:[['Prinzip','Bedeutung'],['Solidaritätsprinzip','Beitrag nach Einkommen, Leistung nach Bedarf'],['Generationenvertrag','Junge zahlen die Renten der Alten (Umlage)'],['Versicherungspflicht','gilt automatisch für Arbeitnehmer und Azubis; in KV/PV nur bis zur Versicherungspflichtgrenze (2026: 77.400 €/Jahr)'],['Beitragsbemessungsgrenze','bis dahin wird Beitrag berechnet, darüber nicht']]},
 say:'Die Prinzipien: Solidaritätsprinzip, du zahlst nach deinem Einkommen, bekommst aber Leistung nach Bedarf. Generationenvertrag in der Rente: Die Arbeitenden zahlen die heutigen Renten. Und die Beitragsbemessungsgrenze: Einkommen darüber wird nicht mehr verbeitragt.'}
],
videos:[{id:'YcsiF3lI670',t:'Sozialversicherung: 5 Säulen einfach erklärt',c:'Die Merkhilfe Wirtschaft'},{id:'PaLmldtLryQ',t:'5 Säulen der Sozialversicherung',c:'Politik & Gesellschaft einfach erklärt'}],
quiz:[
{q:'Wer zahlt die Unfallversicherung?', o:['Arbeitnehmer allein','Arbeitgeber allein','beide je zur Hälfte','der Staat'], a:1, e:'Träger sind die Berufsgenossenschaften.'},
{q:'Wer ist Träger der Arbeitslosenversicherung?', o:['Krankenkassen','Berufsgenossenschaft','Bundesagentur für Arbeit','Deutsche Rentenversicherung'], a:2, e:'Bundesagentur für Arbeit.'},
{q:'Wie hoch ist der Beitragssatz zur Rentenversicherung 2026 (gesamt, in %)?', type:'input', a:['18,6','18.6','18,6 %','18,6%'], e:'18,6 %, je 9,3 % für AG und AN.'},
{q:'Du fährst nach der Arbeit einen Umweg zum Einkaufen und verunglückst. Bist du über die Unfallversicherung versichert?', o:['ja, immer','in der Regel nein, da privater Umweg','nur bei Schulden','nur samstags'], a:1, e:'Nur der direkte Weg ist versichert.'},
{q:'Ein Azubi verdient 300 € im Monat. Wer zahlt die Sozialversicherung?', o:['Azubi allein','Arbeitgeber allein','beide hälftig','niemand'], a:1, e:'Geringverdienergrenze 325 € für Azubis.'},
{q:'Welche Steuerklasse hat ein lediger Arbeitnehmer ohne Kinder?', o:['I','II','III','IV'], a:0, e:'Klasse I.'},
{q:'Wer zahlt den Kinderlosenzuschlag zur Pflegeversicherung?', o:['Arbeitgeber','Arbeitnehmer allein (ab 23)','beide','Staat'], a:1, e:'0,6 %, nur Arbeitnehmer.'},
{q:'"Die Arbeitenden finanzieren die heutigen Renten." Wie heißt das?', o:['Äquivalenzprinzip','Generationenvertrag','Subsidiarität','Kapitaldeckung'], a:1, e:'Umlageverfahren.'},
{q:'Wie hoch ist der Beitragssatz zur Arbeitslosenversicherung 2026 (gesamt, in %)?', type:'input', a:['2,6','2.6','2,6 %','2,6%'], e:'2,6 %, je 1,3 %.'}
],
write:[
{task:'Nenne alle 5 Zweige der Sozialversicherung mit ihrem Träger und schreibe dazu, wer die Beiträge zahlt.',
 keys:[['Krankenversicherung / Krankenkasse',/kranken/i],['Rentenversicherung / DRV',/rente/i],['Arbeitslosenversicherung / Bundesagentur',/arbeitslos|bundesagentur/i],['Pflegeversicherung / Pflegekasse',/pflege/i],['Unfallversicherung / Berufsgenossenschaft',/unfall|berufsgenoss/i],['hälftig AG/AN',/h(ä|ae)lft|je zur|50/i],['Unfall nur Arbeitgeber',/(nur|allein).*arbeitgeber|arbeitgeber.*(nur|allein)/i]],
 model:'Krankenversicherung: Krankenkassen.\nRentenversicherung: Deutsche Rentenversicherung.\nArbeitslosenversicherung: Bundesagentur für Arbeit.\nPflegeversicherung: Pflegekassen.\nUnfallversicherung: Berufsgenossenschaften.\nDie ersten vier zahlen Arbeitgeber und Arbeitnehmer je zur Hälfte (Kinderlosenzuschlag Pflege nur AN), die Unfallversicherung zahlt der Arbeitgeber allein.'}
]},

{
id:'unternehmen', area:'WISO', prio:2, title:'Unternehmen, Markt, Kaufvertrag', mins:25,
why:'Rechtsformen und Vertragsrecht runden WiSo ab.',
clip:[
{h:'Rechtsformen', v:{table:[['Form','Gründer','Kapital','Haftung'],['Einzelunternehmen','1','kein Minimum','unbeschränkt, privat'],['GbR','mind. 2','kein Minimum','alle unbeschränkt'],['OHG','mind. 2','kein Minimum','alle unbeschränkt, unmittelbar, solidarisch'],['KG','mind. 2','kein Minimum','Komplementär voll, Kommanditist nur Einlage'],['GmbH','ab 1','25.000 € Stammkapital','nur Gesellschaftsvermögen'],['UG (haftungsbeschränkt)','ab 1','ab 1 €, Rücklagepflicht 25 % des Jahresüberschusses','nur Gesellschaftsvermögen'],['AG','ab 1','50.000 € Grundkapital','nur Gesellschaftsvermögen']]},
 say:'Die Rechtsformen. Bei Einzelunternehmen, GbR und OHG haften die Inhaber mit ihrem Privatvermögen. Bei der KG haftet der Komplementär voll, der Kommanditist nur mit seiner Einlage. Bei Kapitalgesellschaften haftet nur das Gesellschaftsvermögen. GmbH: fünfundzwanzigtausend Euro Stammkapital. UG: ab einem Euro, muss aber Rücklagen bilden. AG: fünfzigtausend Euro Grundkapital.'},
{h:'Organe', v:{table:[['','GmbH','AG'],['Leitung','Geschäftsführer','Vorstand'],['Kontrolle','(Aufsichtsrat Pflicht bei mehr als 500 AN)','Aufsichtsrat'],['Eigentümer','Gesellschafterversammlung','Hauptversammlung']]},
 say:'Die Organe. Die GmbH wird vom Geschäftsführer geleitet, die Eigentümer treffen sich in der Gesellschafterversammlung. Die AG hat drei Organe: Vorstand leitet, Aufsichtsrat kontrolliert, Hauptversammlung der Aktionäre entscheidet Grundsätzliches.'},
{h:'Deine Kanzlei', v:{stat:'PartG mbB', sub:'Partnerschaftsgesellschaft mit beschränkter Berufshaftung: für Freie Berufe wie Steuerberater, Wirtschaftsprüfer, Anwälte. Eintrag im Partnerschaftsregister. Für Fehler bei der Berufsausübung haftet nur das Gesellschaftsvermögen, dafür ist eine erhöhte Berufshaftpflicht Pflicht.'},
 say:'Kleiner Bonus aus deinem Alltag. Muth und Partner ist eine Partnerschaftsgesellschaft mit beschränkter Berufshaftung, kurz PartG mbB. Diese Rechtsform gibt es nur für Freie Berufe wie Steuerberater, Wirtschaftsprüfer und Anwälte. Für Berufsfehler haftet nur das Gesellschaftsvermögen. Dafür braucht die Gesellschaft eine erhöhte Berufshaftpflichtversicherung.'},
{h:'Vollmachten', v:{table:[['','Prokura','Handlungsvollmacht'],['Eintrag ins Handelsregister','ja','nein'],['Zusatz bei Unterschrift','ppa.','i. V. / i. A.'],['Darf','fast alle Geschäfte','gewöhnliche Geschäfte des Betriebs'],['Darf NICHT','Grundstücke verkaufen/belasten, Bilanz unterschreiben, Prokura erteilen, Insolvenz anmelden','zusätzlich ohne Sondervollmacht: Kredite, Prozesse, Grundstücke']]},
 say:'Vollmachten. Prokura wird im Handelsregister eingetragen, man unterschreibt mit ppa. Der Prokurist darf fast alles, aber keine Grundstücke verkaufen oder belasten, keine Bilanz unterschreiben und keine Prokura erteilen. Die Handlungsvollmacht wird nicht eingetragen, man unterschreibt mit i. V. Sie gilt nur für gewöhnliche Geschäfte.'},
{h:'Ziele und Nachhaltigkeit', v:{table:[['Begriff','Bedeutung'],['Ökonomisches Prinzip','Maximalprinzip: mit gegebenen Mitteln max. Ergebnis. Minimalprinzip: Ziel mit min. Mitteln'],['3 Säulen der Nachhaltigkeit','ökologisch, ökonomisch, sozial'],['Zielbeziehungen','komplementär (fördern sich), konkurrierend (behindern sich), indifferent (egal)'],['Green IT','Energieeffizienz, lange Nutzung, Recycling, Blauer Engel']]},
 say:'Unternehmensziele. Das ökonomische Prinzip gibt es als Maximalprinzip, also mit gegebenen Mitteln das Beste rausholen, und als Minimalprinzip, also ein Ziel mit möglichst wenig Mitteln erreichen. Nachhaltigkeit hat drei Säulen: ökologisch, ökonomisch, sozial. Zielbeziehungen sind komplementär, wenn sie sich fördern, konkurrierend, wenn sie sich behindern, und indifferent, wenn sie sich nicht beeinflussen.'},
{h:'Markt und Marktformen', v:{table:[['Nachfrager ↓ / Anbieter →','viele Anbieter','wenige Anbieter','ein Anbieter'],['viele Nachfrager','Polypol','Oligopol','Monopol']]},
 say:'In der sozialen Marktwirtschaft bilden sich Preise über Angebot und Nachfrage. Wo beide sich treffen, liegt der Gleichgewichtspreis. Bei den Marktformen zählt die Anzahl der Anbieter: viele heißt Polypol, wenige heißt Oligopol, einer heißt Monopol.'},
{h:'Kaufvertrag', v:{list:['Entsteht durch zwei übereinstimmende Willenserklärungen: Antrag + Annahme','Schaufenster, Katalog, Onlineshop = nur Aufforderung zum Angebot','Geschäftsfähigkeit: unter 7 geschäftsunfähig, 7 bis 17 beschränkt (Taschengeldparagraf), ab 18 voll','Gewährleistung: 2 Jahre, zuerst Nacherfüllung (Reparatur oder Ersatz)','Danach: Rücktritt, Minderung oder Schadensersatz','Online bei einem Unternehmer gekauft (Verbraucher): 14 Tage Widerrufsrecht, nicht bei Privatverkauf','Garantie = freiwillig vom Hersteller, Gewährleistung = gesetzlich vom Verkäufer']},
 say:'Ein Kaufvertrag entsteht durch zwei übereinstimmende Willenserklärungen: Antrag und Annahme. Ein Schaufenster oder ein Onlineshop ist noch kein Angebot, sondern nur eine Aufforderung, ein Angebot zu machen. Geschäftsfähigkeit: unter sieben geschäftsunfähig, sieben bis siebzehn beschränkt, ab achtzehn voll. Die Gewährleistung beträgt zwei Jahre. Zuerst hat der Verkäufer das Recht auf Nacherfüllung, also Reparatur oder Ersatz. Erst danach Rücktritt oder Minderung. Kaufst du als Verbraucher online bei einem Unternehmer, hast du vierzehn Tage Widerrufsrecht. Bei einem Privatverkauf nicht. Garantie ist freiwillig, Gewährleistung ist Gesetz.'}
],
videos:[{id:'8so4aRl7kiw',t:'Unternehmensformen einfach erklärt',c:'Wirtschaft verstehen'}],
quiz:[
{q:'Wie hoch ist das Mindest-Stammkapital einer GmbH?', o:['1 €','12.500 €','25.000 €','50.000 €'], a:2, e:'AG: 50.000 € Grundkapital.'},
{q:'Wer haftet bei der KG unbeschränkt?', o:['Kommanditist','Komplementär','beide','keiner'], a:1, e:'Kommanditist nur mit seiner Einlage.'},
{q:'Welches Organ kontrolliert bei der AG den Vorstand?', o:['Hauptversammlung','Aufsichtsrat','Geschäftsführer','Betriebsrat'], a:1, e:'Aufsichtsrat.'},
{q:'Was darf ein Prokurist NICHT?', o:['Mitarbeiter einstellen','Kredite aufnehmen','Grundstücke verkaufen','Verträge unterschreiben'], a:2, e:'Grundstücke veräußern oder belasten nur mit Sondervollmacht.'},
{q:'Wie unterschreibt ein Prokurist?', o:['i. V.','i. A.','ppa.','gez.'], a:2, e:'per procura.'},
{q:'Wenige Anbieter, viele Nachfrager:', o:['Polypol','Oligopol','Monopol','Monopson'], a:1, e:'Z. B. Mobilfunkanbieter.'},
{q:'Ein Onlineshop zeigt eine Grafikkarte für 499 €. Ist das ein Angebot im rechtlichen Sinn?', o:['ja','nein, nur Aufforderung zur Abgabe eines Angebots','nur mit AGB','nur bei Lagerbestand'], a:1, e:'Die Bestellung des Kunden ist der Antrag.'},
{q:'Ein 15-Jähriger kauft ohne Zustimmung der Eltern ein Handy auf Raten. Der Vertrag ist ...', o:['wirksam','schwebend unwirksam','nichtig','strafbar'], a:1, e:'Beschränkt geschäftsfähig, Ratenkauf nicht vom Taschengeldparagrafen gedeckt.'},
{q:'Was muss der Käufer bei einem Mangel zuerst verlangen?', o:['Rücktritt','Minderung','Nacherfüllung','Schadensersatz'], a:2, e:'Vorrang der Nacherfüllung.'},
{q:'Umweltschutz senkt kurzfristig den Gewinn. Welche Zielbeziehung?', o:['komplementär','konkurrierend','indifferent','identisch'], a:1, e:'Die Ziele behindern sich.'},
{q:'Wie viele Tage Widerrufsrecht hat ein Verbraucher beim Online-Kauf bei einem Unternehmer?', type:'input', a:['14','14 tage'], e:'14 Tage nach § 355 BGB. Bei Privatverkäufen gibt es kein Widerrufsrecht.'},
{q:'Welche Rechtsform hat Muth & Partner?', o:['GmbH','AG','PartG mbB','OHG'], a:2, e:'Partnerschaftsgesellschaft mit beschränkter Berufshaftung.'}
],
write:[
{task:'Ein Freund will eine IT-Firma gründen und wenig persönlich haften, hat aber nur 2.000 € Startkapital. Welche Rechtsform empfiehlst du? Begründe mit Haftung und Kapital.',
 keys:[['UG (haftungsbeschränkt)',/\bug\b|unternehmergesellschaft/i],['Mindestkapital 1 €',/1\s*(€|euro)|ein\s*euro/i],['Haftung nur Gesellschaftsvermögen',/gesellschaftsverm(ö|oe)gen|beschr(ä|ae)nkt|nicht.*privat|privat.*nicht/i],['Rücklage / später GmbH',/r(ü|ue)cklage|25\s*%|viertel|gmbh/i]],
 model:'Ich empfehle die UG (haftungsbeschränkt). Sie kann schon mit 1 € Stammkapital gegründet werden, die 2.000 € reichen also. Es haftet nur das Gesellschaftsvermögen, nicht das Privatvermögen. Die UG muss jedes Jahr ein Viertel des Jahresüberschusses in eine Rücklage stecken, bis das Stammkapital auf mindestens 25.000 € erhöht wurde, dann wird sie zur GmbH.'}
]}
];
