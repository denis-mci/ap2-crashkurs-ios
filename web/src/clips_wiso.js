// WiSo: Erklärclips im Format v2
const CLIPS_WISO = {

ausbildung: [
{h:'Prüfung bestanden, und dann?', v:{stat:'0 Unterschriften', sub:'Nach der Prüfung einfach weitergearbeitet'},
 beats:[
  {say:'Du bestehst die Prüfung und arbeitest am Montag einfach weiter. Nichts unterschrieben, nichts besprochen. Was passiert?', show:{}},
  {say:'Dann entsteht automatisch ein unbefristetes Arbeitsverhältnis. Genau solche Fälle fragt WiSo gern ab.', show:{}}
 ]},
{h:'Dual und Vertrag', v:{list:['Dual: Betrieb nach BBiG, Berufsschule ist Ländersache','IHK: überwacht, führt Verzeichnis, nimmt Prüfung ab','Vertrag vor Beginn: schriftlich oder Textform','Inhalt: Beruf, Dauer, Zeit, Probezeit, Geld, Urlaub','Minderjährig: Eltern stimmen zu, bekommen Vertrag']},
 beats:[
  {say:'Deine Ausbildung ist dual. Im Betrieb gelten das Berufsbildungsgesetz, kurz BBiG, und die Ausbildungsordnung. Die Berufsschule ist Sache des Landes.', show:{item:1}},
  {say:'Die IHK ist die zuständige Stelle. Sie überwacht die Ausbildung, führt das Verzeichnis der Verträge und nimmt die Prüfungen ab.', show:{item:2}},
  {say:'Der Vertrag wird vor dem Start festgehalten. Schriftlich oder seit 2024 auch in Textform, zum Beispiel als PDF.', show:{item:3}},
  {say:'Drin stehen Beruf, Beginn, Dauer, tägliche Ausbildungszeit, Probezeit, Vergütung, Urlaub und Kündigung. Minderjährig? Dann stimmen die Eltern zu.', show:{item:5}}
 ]},
{h:'Pflichten über Kreuz', v:{table:[['Du als Azubi','Dein Betrieb'],['Lernen, sorgfältig arbeiten','Ausbildungsziel vermitteln'],['Weisungen befolgen','Ausbildungsmittel kostenlos'],['Berufsschule besuchen','Freistellen für Schule und Prüfung'],['Ausbildungsnachweis führen','Nachweis kontrollieren, Vergütung'],['Schweigepflicht','Nur Ausbildungsaufgaben, Zeugnis']]},
 beats:[
  {say:'Du musst lernen und Weisungen befolgen. Dein Betrieb muss dir das Ausbildungsziel vermitteln.', show:{rows:2}},
  {say:'Laptop, Fachbücher für den Betrieb? Das sind Ausbildungsmittel. Die stellt der Betrieb, und zwar kostenlos für dich.', show:{rows:2, hl:[2,2]}},
  {say:'Du besuchst die Berufsschule und führst den Ausbildungsnachweis. Der Betrieb stellt dich frei, kontrolliert den Nachweis und zahlt.', show:{rows:4}},
  {say:'Du schweigst über Betriebsgeheimnisse. Der Betrieb gibt dir nur Aufgaben, die zur Ausbildung gehören, und am Ende ein Zeugnis.', show:{rows:5}}
 ]},
{h:'Probezeit und Kündigung', v:{table:[['Wann','Wer','Wie'],['Probezeit, 1 bis 4 Monate','beide','jederzeit, ohne Frist, ohne Grund'],['Nach der Probezeit','beide','nur fristlos aus wichtigem Grund'],['Nach der Probezeit','nur Azubi','4 Wochen Frist bei Berufswechsel oder Aufgabe'],['Immer','beide','schriftlich, nach Probezeit mit Gründen']]},
 beats:[
  {say:'Die Probezeit dauert mindestens einen und höchstens 4 Monate. Da können beide jederzeit kündigen, ohne Frist und ohne Grund.', show:{rows:1}},
  {say:'Danach wird es hart. Der Betrieb kann nur noch fristlos kündigen, und nur aus wichtigem Grund.', show:{rows:2}},
  {say:'Du hast eine Extratür. Willst du den Beruf wechseln oder die Ausbildung aufgeben, kündigst du mit 4 Wochen Frist.', show:{rows:3}},
  {say:'Und egal wann: Kündigung immer schriftlich. Nach der Probezeit mit Begründung.', show:{rows:4}}
 ],
 check:{q:'Du bist seit 6 Monaten dabei. Kann der Betrieb dir mit 4 Wochen Frist kündigen?', o:['Ja, ganz normal','Nein, nur fristlos aus wichtigem Grund'], a:1, e:'Die Probezeit ist vorbei. Der Betrieb kann nur noch fristlos aus wichtigem Grund kündigen.'}},
{h:'Ende und Zeugnis', v:{list:['Normal: Ende mit Ablauf der Ausbildungszeit','Früher bestanden: Ende mit Bekanntgabe des Ergebnisses','Durchgefallen: Verlängerung auf Verlangen, max. 1 Jahr','Prüfung darf 2-mal wiederholt werden','Zeugnis: einfach immer, qualifiziert auf Verlangen']},
 beats:[
  {say:'Die Ausbildung endet mit Ablauf der Zeit. Bestehst du früher, endet sie mit der Bekanntgabe des Ergebnisses durch den Prüfungsausschuss.', show:{item:2}},
  {say:'Durchgefallen? Auf dein Verlangen wird bis zur Wiederholungsprüfung verlängert, höchstens ein Jahr. Wiederholen darfst du zweimal.', show:{item:4}},
  {say:'Zum Schluss gibt es ein Zeugnis. Das einfache nennt Art, Dauer und Ziel der Ausbildung und deine erworbenen Fertigkeiten.', show:{item:5}},
  {say:'Das qualifizierte Zeugnis bewertet zusätzlich Verhalten und Leistung. Das bekommst du aber nur, wenn du es verlangst.', show:{item:5}}
 ]},
{h:'Jugendarbeitsschutz unter 18', v:{table:[['Unter 18','Regel'],['Arbeitszeit','max. 8 h am Tag, 40 h die Woche'],['Pausen','30 min bei mehr als 4,5 h, 60 min bei mehr als 6 h'],['Freizeit','mind. 12 h zwischen zwei Arbeitstagen'],['Berufsschule','mehr als 5 Stunden: 1-mal pro Woche 8 h'],['Urlaub','30 / 27 / 25 Werktage']]},
 beats:[
  {say:'Unter 18 gilt das Jugendarbeitsschutzgesetz. Maximal 8 Stunden am Tag, 40 in der Woche, Fünf-Tage-Woche.', show:{rows:1}},
  {say:'Pausen: 30 Minuten bei mehr als viereinhalb Stunden. Bei mehr als 6 Stunden sind es insgesamt 60 Minuten.', show:{rows:2}},
  {say:'Mindestens 12 Stunden frei zwischen zwei Arbeitstagen. Ein Schultag mit mehr als 5 Stunden zählt einmal pro Woche als 8 Stunden Arbeit.', show:{rows:4}},
  {say:'Urlaub: 30 Werktage unter 16, 27 unter 17, 25 unter 18.', show:{rows:5}}
 ],
 check:{q:'Du bist 17 und arbeitest heute 7 Stunden. Wie viel Pause steht dir insgesamt zu?', o:['30 Minuten','45 Minuten','60 Minuten'], a:2, e:'Bei mehr als 6 Stunden sind es für Jugendliche 60 Minuten.'}},
{h:'Mindestvergütung', v:{stat:'724 €', sub:'1. Ausbildungsjahr bei Beginn 2026, danach +18 %, +35 %, +40 %'},
 beats:[
  {say:'Wie viel muss dein Betrieb mindestens zahlen? Bei Ausbildungsbeginn 2026 sind es im ersten Jahr 724 Euro.', show:{}},
  {say:'In den Folgejahren kommen 18, 35 und 40 Prozent obendrauf. Tarifverträge dürfen abweichen.', show:{}}
 ]}
],

arbeitsrecht: [
{h:'Kündigung per E-Mail?', v:{table:[['Kündigung','Regel'],['Form','schriftlich mit Unterschrift, keine E-Mail'],['Frist','4 Wochen zum 15. oder Monatsende, AG länger'],['Fristlos','wichtiger Grund, binnen 2 Wochen'],['Betriebsrat','vorher anhören, sonst unwirksam'],['KSchG','mehr als 10 AN, 6 Monate; Klage in 3 Wochen']]},
 beats:[
  {say:'Dein Chef kündigt dir per E-Mail. Gilt das? Nein. Eine Kündigung muss auf Papier, mit Unterschrift. E-Mail und WhatsApp reichen nicht.', show:{rows:1}},
  {say:'Grundfrist: 4 Wochen zum fünfzehnten oder zum Monatsende. Fristlos geht nur aus wichtigem Grund, innerhalb von 2 Wochen.', show:{rows:3}},
  {say:'Gibt es einen Betriebsrat, muss er vor jeder Kündigung durch den Arbeitgeber angehört werden. Sonst ist die Kündigung unwirksam.', show:{rows:4}},
  {say:'Das Kündigungsschutzgesetz gilt ab mehr als 10 Arbeitnehmern und 6 Monaten im Betrieb. Klagen kannst du innerhalb von 3 Wochen.', show:{rows:5}}
 ]},
{h:'Wer sticht wen?', v:{code:`Grundgesetz
 └ Gesetze: BGB, ArbZG, KSchG, BUrlG
    └ Tarifvertrag
       └ Betriebsvereinbarung
          └ Arbeitsvertrag

Günstigkeitsprinzip:
Eine untere Regel darf nur
abweichen, wenn sie für den
Arbeitnehmer besser ist.`},
 beats:[
  {say:'Was gilt, wenn sich Regeln widersprechen? Ganz oben stehen Grundgesetz und Gesetze.', show:{lines:[1,2]}},
  {say:'Darunter der Tarifvertrag, dann die Betriebsvereinbarung.', show:{lines:[3,4]}},
  {say:'Ganz unten steht dein Arbeitsvertrag.', show:{lines:[5,5]}},
  {say:'Eine untere Regel darf nur abweichen, wenn sie für den Arbeitnehmer günstiger ist. Das ist das Günstigkeitsprinzip.', show:{lines:[7,10]}}
 ]},
{h:'Arbeitszeit, Urlaub, Lohn', v:{table:[['Erwachsene','Regel'],['Arbeitszeit','8 h, bis 10 h bei Ausgleich auf Ø 8 h'],['Pause','30 min bei mehr als 6 h, 45 bei mehr als 9 h'],['Ruhezeit','11 h zwischen zwei Arbeitstagen'],['Mindesturlaub','24 Werktage = 20 Arbeitstage bei 5-Tage-Woche'],['Mindestlohn 2026','13,90 € pro Stunde']]},
 beats:[
  {say:'Für Erwachsene gilt das Arbeitszeitgesetz. 8 Stunden am Tag, bis zu 10, wenn es im Schnitt wieder auf 8 ausgeglichen wird.', show:{rows:1}},
  {say:'Pause: 30 Minuten bei mehr als 6 Stunden, 45 bei mehr als 9. Dazu 11 Stunden Ruhezeit zwischen zwei Arbeitstagen.', show:{rows:3}},
  {say:'Mindesturlaub: 24 Werktage. Die rechnen mit einer Sechs-Tage-Woche. Bei 5 Tagen pro Woche sind das 20 Arbeitstage.', show:{rows:4}},
  {say:'Und der gesetzliche Mindestlohn 2026: 13,90 Euro pro Stunde.', show:{rows:5}}
 ],
 check:{q:'Du arbeitest 5 Tage pro Woche. Wie viel Urlaub steht dir mindestens zu?', o:['20 Arbeitstage','24 Arbeitstage','30 Arbeitstage'], a:0, e:'24 Werktage bei 6-Tage-Woche entsprechen 20 Arbeitstagen bei 5-Tage-Woche.'}},
{h:'Betriebsrat und JAV', v:{table:[['','Betriebsrat','JAV'],['Ab','5 ständige wahlberechtigte AN, davon 3 wählbar','5 AN unter 18 oder Azubis unter 25, plus BR'],['Amtszeit','4 Jahre','2 Jahre'],['Wahl','wählen ab 16, gewählt ab 18 und 6 Monaten','arbeitet über den BR']]},
 beats:[
  {say:'Einen Betriebsrat kann man ab 5 ständigen wahlberechtigten Arbeitnehmern wählen. 3 davon müssen wählbar sein.', show:{rows:1, hl:[1,1]}},
  {say:'Die Jugend- und Auszubildendenvertretung, kurz JAV, gibt es ab 5 Arbeitnehmern unter 18 oder Azubis unter 25. Aber nur mit Betriebsrat.', show:{rows:1, hl:[1,2]}},
  {say:'Amtszeit: Betriebsrat 4 Jahre, JAV nur 2. Die JAV arbeitet über den Betriebsrat, nicht direkt mit dem Arbeitgeber.', show:{rows:2}},
  {say:'Den Betriebsrat wählen darfst du ab 16. Gewählt werden kannst du ab 18 und nach 6 Monaten im Betrieb.', show:{rows:3}}
 ]},
{h:'Rechte des Betriebsrats', v:{table:[['Stufe','Heißt','Beispiel'],['Mitbestimmung','ohne Zustimmung geht nichts','Arbeitszeit, Pausen, Urlaubsplan, Überwachungs-Software'],['Mitwirkung','angehört, Arbeitgeber entscheidet','Kündigung, Personalplanung'],['Information','nur unterrichtet','wirtschaftliche Lage']]},
 beats:[
  {say:'Drei Stufen. Mitbestimmung heißt: Ohne Zustimmung des Betriebsrats geht nichts. Zum Beispiel bei Arbeitszeiten, Pausen und Urlaubsplan.', show:{rows:1}},
  {say:'Für dich als ITler wichtig: Software, die Leistung oder Verhalten überwachen kann, braucht seine Zustimmung.', show:{rows:1, hl:[1,3]}},
  {say:'Mitwirkung: Er wird angehört, aber der Arbeitgeber entscheidet. Zum Beispiel bei Kündigungen.', show:{rows:2}},
  {say:'Information: Er wird nur unterrichtet, etwa über die wirtschaftliche Lage.', show:{rows:3}}
 ],
 check:{q:'Ihr führt ein Ticketsystem ein, das die Leistung jedes Mitarbeiters auswerten kann. Welches Recht hat der Betriebsrat?', o:['Information','Mitwirkung','Mitbestimmung'], a:2, e:'Technische Einrichtungen, die Leistung oder Verhalten überwachen können, sind mitbestimmungspflichtig.'}},
{h:'Tarifvertrag', v:{list:['Gewerkschaft und Arbeitgeberverband oder einzelner AG','Tarifautonomie: Der Staat mischt sich nicht ein','Manteltarif: Arbeitszeit, Urlaub, Kündigung','Lohn- und Gehaltstarif: Höhe der Bezahlung','Friedenspflicht: kein Streik während der Laufzeit']},
 beats:[
  {say:'Tarifverträge schließen Gewerkschaften mit Arbeitgeberverbänden oder einzelnen Arbeitgebern. Der Staat mischt sich nicht ein, das ist Tarifautonomie.', show:{item:2}},
  {say:'Der Manteltarifvertrag regelt den Rahmen: Arbeitszeit, Urlaub, Kündigung.', show:{item:3}},
  {say:'Der Lohn- und Gehaltstarifvertrag regelt nur das Geld, also die Höhe der Bezahlung.', show:{item:4}},
  {say:'Während der Laufzeit gilt Friedenspflicht, also kein Streik. Für einen Streik braucht es eine Urabstimmung, meist mit 75 Prozent.', show:{item:5}}
 ]},
{h:'Mutterschutz und Elternzeit', v:{table:[['Regel','Wert'],['Mutterschutz','6 Wochen vor, 8 Wochen nach Geburt'],['Kündigungsverbot','Schwangerschaft bis 4 Monate nach Geburt'],['Elternzeit','bis 3 Jahre pro Kind, für beide Eltern'],['Anmeldung','7 Wochen vorher']]},
 beats:[
  {say:'Mutterschutz gilt 6 Wochen vor und 8 Wochen nach der Geburt.', show:{rows:1}},
  {say:'Schwangere sind bis 4 Monate nach der Geburt vor Kündigung geschützt. Besonders geschützt sind auch Schwerbehinderte und Betriebsräte.', show:{rows:2}},
  {say:'Elternzeit gibt es bis zu 3 Jahre pro Kind, für beide Eltern. Anmelden musst du sie 7 Wochen vorher.', show:{rows:4}}
 ]}
],

sozial: [
{h:'Wo ist mein Geld?', v:{stat:'211,50 €', sub:'Sozialversicherung bei 1.000 € brutto, unter 23'},
 beats:[
  {say:'Im Vertrag stehen 1000 Euro brutto. Auf dem Konto landet deutlich weniger. Allein die Sozialversicherung nimmt sich 211,50 Euro.', show:{}},
  {say:'Wohin das Geld geht und wer was zahlt, ist ein WiSo-Dauerbrenner.', show:{}}
 ]},
{h:'Die 5 Säulen', v:{table:[['Versicherung','Träger','Beitrag 2026'],['Kranken','Krankenkassen','14,6 % + Ø 2,9 % Zusatz'],['Renten','Deutsche Rentenversicherung','18,6 %'],['Arbeitslosen','Bundesagentur für Arbeit','2,6 %'],['Pflege','Pflegekassen','3,6 %'],['Unfall','Berufsgenossenschaften','nur Arbeitgeber']]},
 beats:[
  {say:'Fünf Säulen. Krankenversicherung bei den Krankenkassen: 14,6 Prozent plus Zusatzbeitrag, im Schnitt 2,9.', show:{rows:1}},
  {say:'Rente bei der Deutschen Rentenversicherung: 18,6 Prozent.', show:{rows:2}},
  {say:'Arbeitslosenversicherung bei der Bundesagentur für Arbeit: 2,6 Prozent. Pflege bei den Pflegekassen: 3,6 Prozent.', show:{rows:4}},
  {say:'Und die Unfallversicherung bei den Berufsgenossenschaften. Die zahlt der Arbeitgeber ganz allein.', show:{rows:5}}
 ]},
{h:'Wer zahlt was?', v:{list:['Kranken, Rente, Arbeitslosen, Pflege: je zur Hälfte','Ausnahme Pflege in Sachsen: AN 2,3 %, AG 1,3 %','Kinderlos ab 23: 0,6 % Pflegezuschlag, AN allein','Unfallversicherung: nur Arbeitgeber','Azubi bis 325 € im Monat: Arbeitgeber zahlt alles']},
 beats:[
  {say:'Die ersten vier Versicherungen teilen sich Arbeitgeber und Arbeitnehmer je zur Hälfte. Von 18,6 Prozent Rente zahlst du also 9,3.', show:{item:1}},
  {say:'Ausnahme bei der Pflege in Sachsen: Arbeitnehmer 2,3, Arbeitgeber 1,3 Prozent. In Hessen gilt die Hälfte.', show:{item:2}},
  {say:'Bist du kinderlos und mindestens 23, zahlst du 0,6 Prozent Pflegezuschlag. Und zwar allein.', show:{item:3}},
  {say:'Unfall zahlt nur der Arbeitgeber. Und verdienst du als Azubi höchstens 325 Euro im Monat, zahlt er sogar alles allein.', show:{item:5}}
 ],
 check:{q:'Ein Azubi bekommt 300 Euro im Monat. Wer zahlt die Sozialversicherung?', o:['Der Azubi allein','Der Arbeitgeber allein','Beide je zur Hälfte'], a:1, e:'Bis 325 Euro im Monat zahlt der Arbeitgeber alles allein.'}},
{h:'Unfallversicherung', v:{list:['Arbeitsunfälle und Berufskrankheiten','Wegeunfall: direkter Weg zur Arbeit oder Schule und zurück','Privater Umweg, etwa Einkaufen: meist nicht versichert','Auch Azubis und Berufsschüler sind versichert','Unfall sofort melden, D-Arzt aufsuchen']},
 beats:[
  {say:'Die Unfallversicherung springt ein bei Arbeitsunfällen und Berufskrankheiten.', show:{item:1}},
  {say:'Auch Wegeunfälle zählen. Aber nur auf dem direkten Weg zur Arbeit oder Berufsschule und zurück.', show:{item:2}},
  {say:'Machst du einen privaten Umweg, zum Beispiel zum Einkaufen, bist du in der Regel nicht versichert.', show:{item:3}},
  {say:'Azubis und Berufsschüler sind mit drin. Unfall sofort dem Arbeitgeber melden und zum Durchgangsarzt, dem D-Arzt.', show:{item:5}}
 ],
 check:{q:'Nach Feierabend fährst du zum Supermarkt und hast einen Unfall. Zahlt die Unfallversicherung?', o:['Ja, immer','In der Regel nein, privater Umweg'], a:1, e:'Versichert ist nur der direkte Weg zwischen Zuhause und Arbeit oder Schule.'}},
{h:'Brutto zu Netto', v:{code:`  Bruttogehalt
− Lohnsteuer (nach Steuerklasse)
− Solidaritätszuschlag (meist entfallen)
− Kirchensteuer (8 % / 9 % der Lohnsteuer)
− Sozialversicherung (AN-Anteile)
= Nettogehalt

AN-Anteile unter 23:
KV  7,3 % + 1,45 %
RV  9,3 %
AV  1,3 %
PV  1,8 %
Summe 21,15 %
bei 1.000 € brutto: 211,50 €`},
 beats:[
  {say:'Vom Brutto geht zuerst die Lohnsteuer ab, je nach Steuerklasse. Der Solidaritätszuschlag ist meist entfallen.', show:{lines:[1,3]}},
  {say:'Dann gegebenenfalls Kirchensteuer, 8 oder 9 Prozent der Lohnsteuer. Dazu deine Anteile zur Sozialversicherung. Der Rest ist netto.', show:{lines:[4,6]}},
  {say:'Deine Anteile unter 23: Kranken 7,3 plus 1,45 Zusatz, Rente 9,3, Arbeitslosen 1,3, Pflege 1,8 Prozent.', show:{lines:[8,12]}},
  {say:'Zusammen 21,15 Prozent. Bei 1000 Euro brutto sind das 211,50 Euro, nur für die Sozialversicherung.', show:{lines:[13,14]}}
 ]},
{h:'Steuerklassen', v:{table:[['Klasse','Wer'],['I','ledig'],['II','alleinerziehend'],['III und V','verheiratet, unterschiedlich verdienend'],['IV','verheiratet, ähnlich verdienend'],['VI','Zweitjob']]},
 beats:[
  {say:'Steuerklasse 1 für Ledige, 2 für Alleinerziehende.', show:{rows:2}},
  {say:'Verheiratet mit unterschiedlichem Einkommen: 3 für den Besserverdienenden, 5 für den Partner. Ähnliches Einkommen: beide 4.', show:{rows:4}},
  {say:'Und Steuerklasse 6 gibt es für den Zweitjob.', show:{rows:5}}
 ]},
{h:'Prinzipien', v:{table:[['Prinzip','Bedeutung'],['Solidaritätsprinzip','Beitrag nach Einkommen, Leistung nach Bedarf'],['Generationenvertrag','Arbeitende zahlen die heutigen Renten'],['Versicherungspflicht','automatisch; KV und PV bis 77.400 € im Jahr'],['Beitragsbemessungsgrenze','darüber kein Beitrag']]},
 beats:[
  {say:'Solidaritätsprinzip: Du zahlst nach deinem Einkommen, bekommst aber Leistung nach Bedarf.', show:{rows:1}},
  {say:'Generationenvertrag: Die Arbeitenden zahlen die heutigen Renten. Das nennt man Umlageverfahren.', show:{rows:2}},
  {say:'Arbeitnehmer und Azubis sind automatisch pflichtversichert. In Kranken- und Pflege nur bis zur Pflichtgrenze, 2026 sind das 77400 Euro im Jahr.', show:{rows:3}},
  {say:'Beitragsbemessungsgrenze: Bis dahin wird der Beitrag berechnet. Einkommen darüber wird nicht mehr verbeitragt.', show:{rows:4}}
 ]}
],

unternehmen: [
{h:'Deine Kanzlei', v:{stat:'PartG mbB', sub:'Partnerschaftsgesellschaft mit beschränkter Berufshaftung'},
 beats:[
  {say:'Weißt du, welche Rechtsform deine eigene Kanzlei hat? Muth und Partner ist eine PartG mbB.', show:{}},
  {say:'Das heißt Partnerschaftsgesellschaft mit beschränkter Berufshaftung. Die gibt es nur für Freie Berufe wie Steuerberater und Anwälte.', show:{}},
  {say:'Eingetragen im Partnerschaftsregister. Für Berufsfehler haftet nur das Gesellschaftsvermögen, dafür ist eine erhöhte Berufshaftpflicht Pflicht.', show:{}}
 ]},
{h:'Wer haftet womit?', v:{table:[['Form','Gründer','Kapital','Haftung'],['Einzelunternehmen','1','kein Minimum','unbeschränkt, auch privat'],['GbR und OHG','mind. 2','kein Minimum','alle unbeschränkt'],['KG','mind. 2','kein Minimum','Komplementär voll, Kommanditist nur Einlage'],['GmbH, UG, AG','ab 1','25.000 / ab 1 / 50.000 €','nur Gesellschaftsvermögen']]},
 beats:[
  {say:'Einzelunternehmen: Du allein, kein Mindestkapital. Dafür haftest du unbeschränkt, auch mit deinem Privatvermögen.', show:{rows:1}},
  {say:'GbR und OHG: mindestens 2 Gründer. Alle haften unbeschränkt, bei der OHG unmittelbar und solidarisch.', show:{rows:2}},
  {say:'Die KG ist gemischt. Der Komplementär haftet voll, der Kommanditist nur mit seiner Einlage.', show:{rows:3}},
  {say:'Bei GmbH, UG und AG haftet nur das Gesellschaftsvermögen. Die UG geht ab 1 Euro, muss aber ein Viertel des Jahresüberschusses zurücklegen.', show:{rows:4}}
 ],
 check:{q:'Anna ist Kommanditistin einer KG, die pleitegeht. Womit haftet sie?', o:['Mit ihrem ganzen Privatvermögen','Nur mit ihrer Einlage'], a:1, e:'Voll haftet nur der Komplementär, der Kommanditist nur mit seiner Einlage.'}},
{h:'GmbH gegen AG', v:{table:[['','GmbH','AG'],['Kapital','25.000 € Stammkapital','50.000 € Grundkapital'],['Leitung','Geschäftsführer','Vorstand'],['Kontrolle','Aufsichtsrat bei mehr als 500 AN','Aufsichtsrat'],['Eigentümer','Gesellschafterversammlung','Hauptversammlung']]},
 beats:[
  {say:'Die GmbH braucht 25000 Euro Stammkapital, die AG 50000 Euro Grundkapital.', show:{rows:1}},
  {say:'Die GmbH leitet der Geschäftsführer. Die AG leitet der Vorstand.', show:{rows:2}},
  {say:'Den Vorstand kontrolliert der Aufsichtsrat. Bei der GmbH ist ein Aufsichtsrat erst ab mehr als 500 Arbeitnehmern Pflicht.', show:{rows:3}},
  {say:'Die Eigentümer treffen sich in der Gesellschafterversammlung. Bei der AG ist das die Hauptversammlung der Aktionäre.', show:{rows:4}}
 ]},
{h:'Prokura und Vollmacht', v:{table:[['','Prokura','Handlungsvollmacht'],['Handelsregister','ja','nein'],['Unterschrift','ppa.','i. V. oder i. A.'],['Darf','fast alle Geschäfte','gewöhnliche Geschäfte'],['Darf nicht','Grundstücke verkaufen, Bilanz, Prokura erteilen','zusätzlich Kredite, Prozesse, Grundstücke']]},
 beats:[
  {say:'Prokura wird ins Handelsregister eingetragen. Die Handlungsvollmacht nicht.', show:{rows:1}},
  {say:'Der Prokurist unterschreibt mit ppa, das steht für per procura. Mit Handlungsvollmacht schreibst du in Vertretung oder im Auftrag.', show:{rows:2}},
  {say:'Der Prokurist darf fast alles. Die Handlungsvollmacht gilt nur für gewöhnliche Geschäfte des Betriebs.', show:{rows:3}},
  {say:'Tabu für den Prokuristen: Grundstücke verkaufen oder belasten, die Bilanz unterschreiben und selbst Prokura erteilen.', show:{rows:4}}
 ]},
{h:'Ziele und Märkte', v:{list:['Maximalprinzip: gegebene Mittel, maximales Ergebnis','Minimalprinzip: Ziel mit minimalen Mitteln','Nachhaltigkeit: ökologisch, ökonomisch, sozial','Ziele: komplementär, konkurrierend, indifferent','Anbieter: viele Polypol, wenige Oligopol, einer Monopol']},
 beats:[
  {say:'Ökonomisches Prinzip, zwei Varianten. Maximal: aus gegebenen Mitteln das Beste rausholen. Minimal: ein Ziel mit möglichst wenig Mitteln.', show:{item:2}},
  {say:'Nachhaltigkeit hat drei Säulen: ökologisch, ökonomisch, sozial.', show:{item:3}},
  {say:'Ziele sind komplementär, wenn sie sich fördern, konkurrierend, wenn sie sich behindern, und indifferent, wenn sie sich nicht beeinflussen.', show:{item:4}},
  {say:'Preise bilden sich über Angebot und Nachfrage. Bei vielen Anbietern heißt der Markt Polypol, bei wenigen Oligopol, bei einem Monopol.', show:{item:5}}
 ]},
{h:'So entsteht ein Kaufvertrag', v:{list:['Antrag plus Annahme: zwei Willenserklärungen','Onlineshop, Katalog, Schaufenster: nur Aufforderung','Unter 7 geschäftsunfähig, 7 bis 17 beschränkt, ab 18 voll','Mit 15 ohne Eltern auf Raten: schwebend unwirksam']},
 beats:[
  {say:'Ein Kaufvertrag braucht zwei übereinstimmende Willenserklärungen: Antrag und Annahme.', show:{item:1}},
  {say:'Die Grafikkarte im Onlineshop für 499 Euro ist noch kein Angebot. Nur eine Aufforderung, eins zu machen. Deine Bestellung ist der Antrag.', show:{item:2}},
  {say:'Unter 7 bist du geschäftsunfähig, von 7 bis 17 beschränkt geschäftsfähig, ab 18 voll.', show:{item:3}},
  {say:'Ein 15-Jähriger kauft ohne Zustimmung der Eltern ein Handy auf Raten? Schwebend unwirksam. Raten deckt der Taschengeldparagraf nicht.', show:{item:4}}
 ],
 check:{q:'Ein Shop zeigt einen Laptop für 999 Euro. Wer macht den Antrag?', o:['Der Shop mit seiner Anzeige','Du mit deiner Bestellung'], a:1, e:'Die Anzeige ist nur eine Aufforderung zur Abgabe eines Angebots. Deine Bestellung ist der Antrag.'}},
{h:'Mangel und Widerruf', v:{list:['Gewährleistung: 2 Jahre, gesetzlich, vom Verkäufer','Zuerst Nacherfüllung: Reparatur oder Ersatz','Danach: Rücktritt, Minderung oder Schadensersatz','Garantie: freiwillig vom Hersteller','Online beim Unternehmer: 14 Tage Widerruf, privat nicht']},
 beats:[
  {say:'Ware kaputt? Dann greift die Gewährleistung: 2 Jahre, gesetzlich, gegenüber dem Verkäufer.', show:{item:1}},
  {say:'Zuerst darf der Verkäufer nacherfüllen, also reparieren oder ersetzen. Erst danach kommen Rücktritt, Minderung oder Schadensersatz.', show:{item:3}},
  {say:'Nicht verwechseln: Eine Garantie gibt der Hersteller freiwillig. Gewährleistung ist Gesetz.', show:{item:4}},
  {say:'Kaufst du als Verbraucher online bei einem Unternehmer, hast du 14 Tage Widerrufsrecht. Beim Privatverkauf nicht.', show:{item:5}}
 ]}
]

};
