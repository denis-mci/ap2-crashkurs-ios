const CLIPS_NEU_B = {

ui: [
{h:'Mockups bringen Punkte', v:{stat:'4 Mal', sub:'Mockups in der AP2, zuletzt Sommer 2026'},
 beats:[
  {say:'Mockups kamen in 3 älteren Prüfungen dran und wieder im Sommer 2026. Bedienoberflächen konzipieren steht im Katalog.', show:{}},
  {say:'Typischer Fehler: Die Maske ist hübsch gemalt, aber kein Steuerelement ist begründet. Die Punkte gibt es für die Begründung.', show:{}}
 ]},
{h:'Wireframe, Mockup, Prototyp', v:{table:[['Begriff','Bedeutung'],['Wireframe','grobes Layout aus Kästen, Low Fidelity'],['Mockup','statisch, mit Farben und Schrift, High Fidelity'],['Prototyp','klickbar, Abläufe testbar'],['horizontal, vertikal','nur UI in der Breite, eine Funktion durch alle Schichten'],['Wegwerf, evolutionär','wird danach verworfen, wird zum Produkt']]},
 beats:[
  {say:'Ein Wireframe ist ein grobes Layout aus Kästen, ohne Design. Das nennt man Low Fidelity.', show:{rows:1}},
  {say:'Ein Mockup sieht aus wie das echte Produkt, mit Farben und Schrift, ist aber statisch. Ein Prototyp ist klickbar, damit testest du Abläufe.', show:{rows:3}},
  {say:'Horizontal: eine Schicht in der Breite, meist nur die Oberfläche ohne Logik. Vertikal: eine Funktion durch alle Schichten bis zur Datenbank.', show:{rows:4}},
  {say:'Ein Wegwerfprototyp wird danach verworfen. Ein evolutionärer Prototyp wird Schritt für Schritt zum fertigen Produkt.', show:{rows:5}}
 ],
 check:{q:'Nur die Funktion Login wird komplett gebaut, von der Maske bis zur Datenbank. Welcher Prototyp?', o:['horizontal','vertikal','Wireframe'], a:1, e:'Eine Funktion durch alle Schichten ist vertikal.'}},
{h:'Eine Maske, die Punkte holt', v:{code:`Start | Mandanten | Aufträge  [Suche   ]
Name *       [________________]
Anrede       (o) Frau ( ) Herr ( ) Divers
Rechtsform   [ GmbH          v]
Leistungen   [x] Lohn  [ ] Buchhaltung
Seit         [12.10.2026] Kalender
! Name fehlt, bitte ausfüllen
       [Abbrechen]  [Mandant speichern]
* Pflichtfeld`},
 beats:[
  {say:'Oben eine klare Navigation und eine Suche. Dann ein Textfeld für freie Eingaben wie den Namen.', show:{lines:[1,2]}},
  {say:'Radiobuttons für genau eins aus wenigen, alle Optionen sind sofort sichtbar. Ein Dropdown für eins aus vielen, das spart Platz.', show:{lines:[3,4]}},
  {say:'Checkboxen, wenn mehrere gleichzeitig gehen. Für Daten einen Datepicker, dann stimmt das Format.', show:{lines:[5,6]}},
  {say:'Fehlermeldung direkt am Feld, Pflichtfelder mit Stern markieren, Buttons klar mit Verb beschriften.', show:{lines:[7,9]}}
 ]},
{h:'ISO 9241-110: 7 Prinzipien', v:{code:`Aufgabenangemessenheit
  nur nötige Schritte und Felder
Selbstbeschreibungsfähigkeit
  wo bin ich, was kann ich tun?
Erwartungskonformität
  konsistent, wie gewohnt
Erlernbarkeit: leicht zu lernen
Steuerbarkeit: abbrechen, rückgängig
Robustheit gegen Benutzungsfehler
  Fehler vermeiden, leicht beheben
Benutzerbindung
  motivierend, vertrauenswürdig
Alt 2006: Fehlertoleranz,
  Individualisierbarkeit, Lernförderlichkeit`},
 beats:[
  {say:'Die DIN EN ISO 9241-110 von 2020 hat 7 Interaktionsprinzipien. Aufgabenangemessenheit: nur die Schritte und Felder, die die Aufgabe braucht.', show:{lines:[1,2]}},
  {say:'Selbstbeschreibungsfähigkeit: Du siehst immer, wo du bist und was geht. Erwartungskonformität: konsistent und wie gewohnt.', show:{lines:[3,6]}},
  {say:'Erlernbarkeit: leicht zu lernen. Steuerbarkeit: abbrechen und rückgängig machen. Robustheit: Fehler vermeiden, verständlich melden, leicht beheben.', show:{lines:[7,10]}},
  {say:'Neu ist Benutzerbindung: Die Nutzung motiviert und wirkt vertrauenswürdig. Alte Prüfungen nutzen noch die Fassung 2006 mit Fehlertoleranz.', show:{lines:[11,14]}}
 ],
 check:{q:'Nach einem Tippfehler ist das ganze Formular leer. Welches Prinzip ist verletzt?', o:['Robustheit gegen Benutzungsfehler','Benutzerbindung','Erlernbarkeit'], a:0, e:'Eingaben müssen erhalten bleiben und der Fehler leicht behebbar sein.'}},
{h:'Usability, UX und Gestalt', v:{code:`ISO 9241-11 Usability:
 Effektivität   Ziel erreicht?
 Effizienz      mit wenig Aufwand?
 Zufriedenheit  gern genutzt?
UX: vor, während und nach der Nutzung
Gestaltgesetze:
 Nähe: Nahes gehört zusammen
 Ähnlichkeit: Gleiches sieht gleich aus
 Geschlossenheit: Rahmen bildet Gruppe
Konsistenz und Kontrast
Responsive: passt sich dem Gerät an
Mobile First: erst klein, dann groß`},
 beats:[
  {say:'Usability nach ISO 9241-11 heißt: Effektivität, also Ziel erreicht. Effizienz, also mit wenig Aufwand. Und Zufriedenheit.', show:{lines:[1,4]}},
  {say:'User Experience ist mehr. Sie umfasst das Erleben vor, während und nach der Nutzung.', show:{lines:[5,5]}},
  {say:'Gestaltgesetze: Was nah beieinander steht, gehört zusammen. Was gleich aussieht, hat die gleiche Funktion. Ein Rahmen bildet eine Gruppe.', show:{lines:[6,9]}},
  {say:'Dazu Konsistenz und guter Kontrast. Responsive Design passt sich jedem Bildschirm an, Mobile First entwirft zuerst fürs Handy.', show:{lines:[10,12]}}
 ]},
{h:'Barrierefreiheit', v:{code:`WCAG: 4 Prinzipien
 wahrnehmbar   Alt-Texte, Kontrast
 bedienbar     alles per Tastatur
 verständlich  klare Sprache, Hilfen
 robust        Screenreader-tauglich
Kontrast AA: Text 4,5:1, groß 3:1
Farbe nie einzige Information
Recht:
 BITV 2.0: öffentliche Stellen
 BFSG seit 28.06.2025: bestimmte
  Produkte und Dienste, etwa Shops`},
 beats:[
  {say:'Die WCAG haben 4 Prinzipien. Wahrnehmbar: zum Beispiel Alt-Texte für Bilder. Bedienbar: alles geht auch per Tastatur.', show:{lines:[1,3]}},
  {say:'Verständlich: klare Sprache und Hilfen. Robust: funktioniert auch mit Hilfsmitteln wie dem Screenreader.', show:{lines:[4,5]}},
  {say:'Kontrast nach Stufe AA: normaler Text mindestens 4,5 zu 1, große Schrift 3 zu 1. Farbe ist nie die einzige Information.', show:{lines:[6,7]}},
  {say:'Rechtlich gilt die BITV für öffentliche Stellen. Seit dem 28. Juni 2025 gilt das BFSG für bestimmte Produkte und Dienste, etwa Onlineshops.', show:{lines:[8,11]}}
 ]},
{h:'Usability testen', v:{table:[['Methode','Wie'],['Thinking Aloud','Nutzer denkt beim Bedienen laut'],['A/B-Test','zwei Varianten, welche wirkt besser?'],['Eye-Tracking','Blickverlauf wird gemessen'],['Heuristische Evaluation','Experten prüfen gegen Regeln'],['Fragebogen','Zufriedenheit standardisiert abfragen']]},
 beats:[
  {say:'Thinking Aloud: Testpersonen lösen Aufgaben und sprechen laut aus, was sie denken. So siehst du, wo sie stolpern.', show:{rows:1}},
  {say:'Beim A B Test bekommen Nutzergruppen zwei Varianten, und du misst, welche besser funktioniert. Eye-Tracking misst, wohin die Augen schauen.', show:{rows:3}},
  {say:'Bei der heuristischen Evaluation prüfen Experten die Oberfläche gegen bekannte Regeln. Ein Fragebogen misst die Zufriedenheit.', show:{rows:5}}
 ]}
],

anforderung: [
{h:'BPMN ist neu', v:{stat:'Neu', sub:'BPMN im Prüfungskatalog 2025'},
 beats:[
  {say:'BPMN ist neu im Prüfungskatalog 2025. Und Stakeholder, Anforderungen und Risiken gehören zu jeder Projektplanung.', show:{}},
  {say:'Wiederholung: Lastenheft vom Auftraggeber, was. Pflichtenheft vom Auftragnehmer, wie. Funktional heißt was, nicht-funktional wie gut.', show:{}}
 ]},
{h:'Stakeholder-Matrix', v:{table:[['Einfluss, Interesse','Strategie'],['hoch, hoch','eng einbinden, managen'],['hoch, niedrig','zufriedenstellen'],['niedrig, hoch','informieren'],['niedrig, niedrig','beobachten']]},
 beats:[
  {say:'Stakeholder sind vom Projekt betroffen oder beeinflussen es. Intern etwa Mitarbeiter und Geschäftsleitung, extern Mandanten und Dienstleister.', show:{rows:1}},
  {say:'Die Matrix stellt Einfluss gegen Interesse. Viel Einfluss und viel Interesse: eng einbinden. Viel Einfluss, wenig Interesse: zufriedenstellen.', show:{rows:2}},
  {say:'Wenig Einfluss, aber hohes Interesse: informieren. Wenig von beidem: beobachten. Die Umfeldanalyse sammelt vorher alle Stakeholder.', show:{rows:4}}
 ]},
{h:'Anforderungen erheben', v:{table:[['Technik','Plus','Minus'],['Interview','tief, Rückfragen möglich','zeitaufwendig'],['Fragebogen','viele Personen, auswertbar','keine Rückfragen'],['Workshop','gemeinsame Lösung','Wortführer dominieren'],['Beobachtung','echte Abläufe sichtbar','aufwendig'],['Dokumentenanalyse','objektiv, stört keinen','oft veraltet']]},
 beats:[
  {say:'Erst die Ist-Analyse: Wie läuft es heute? Daraus entsteht das Soll-Konzept. Das Interview geht in die Tiefe, kostet aber viel Zeit.', show:{rows:1}},
  {say:'Ein Fragebogen erreicht viele Personen und ist gut auswertbar, aber ohne Rückfragen. Ein Workshop findet gemeinsame Lösungen.', show:{rows:3}},
  {say:'Beobachtung zeigt die echten Abläufe, auch was Mitarbeiter nicht beschreiben können. Die Dokumentenanalyse wertet vorhandene Unterlagen aus.', show:{rows:5}}
 ]},
{h:'User Story und INVEST', v:{code:`Als Mandant möchte ich Belege per
App hochladen, damit ich nichts
mehr in die Kanzlei bringen muss.
Akzeptanzkriterien:
 PDF und JPG bis 20 MB möglich
 Bestätigung nach dem Upload
INVEST: Independent, Negotiable,
 Valuable, Estimable, Small, Testable
Use Case: Akteur, Ablauf, System,
 Haupt- und Alternativszenario
User Story: kurz, Nutzersicht, agil`},
 beats:[
  {say:'Die User Story: Als Rolle möchte ich Ziel, damit Nutzen.', show:{lines:[1,3]}},
  {say:'Akzeptanzkriterien legen prüfbar fest, wann die Story erfüllt ist. Ohne sie gibt es in der Prüfung Abzug.', show:{lines:[4,6]}},
  {say:'Gute Stories erfüllen INVEST: unabhängig, verhandelbar, wertvoll, schätzbar, klein und testbar. Das T steht für Testable.', show:{lines:[7,8]}},
  {say:'Ein Use Case beschreibt den Ablauf zwischen Akteur und System ausführlich. Die User Story ist kurz, aus Nutzersicht und typisch agil.', show:{lines:[9,11]}}
 ]},
{h:'Machbarkeit, SMART, Dreieck', v:{code:`Machbarkeit:
 technisch: können wir es bauen?
 wirtschaftlich: lohnt es sich?
 rechtlich: dürfen wir das?
 organisatorisch: passt es zu uns?
 zeitlich: schaffen wir es?
SMART: spezifisch, messbar,
 attraktiv, realistisch, terminiert
Magisches Dreieck:
 Zeit, Kosten, Qualität`},
 beats:[
  {say:'Die Machbarkeitsanalyse prüft fünf Seiten. Technisch, wirtschaftlich und rechtlich, zum Beispiel DSGVO und Berufsrecht.', show:{lines:[1,4]}},
  {say:'Dazu organisatorisch, passt es in unsere Abläufe, und zeitlich, schaffen wir es rechtzeitig.', show:{lines:[5,6]}},
  {say:'Ziele formulierst du SMART: spezifisch, messbar, attraktiv, realistisch, terminiert. Also mit Zahl und Datum.', show:{lines:[7,8]}},
  {say:'Das magische Dreieck: Zeit, Kosten und Qualität hängen zusammen. Änderst du eins, leiden die anderen.', show:{lines:[9,10]}}
 ]},
{h:'Risiken und Protokoll', v:{code:`Risiko = Wahrscheinlichkeit x Schaden
 20 % x 50.000 € = 10.000 €
Maßnahmen:
 vermeiden: Ursache beseitigen
 vermindern: Backup, Tests, Schulung
 übertragen: Versicherung, Vertrag
 akzeptieren: bewusst tragen
Ergebnisprotokoll: nur Ergebnisse
Verlaufsprotokoll: auch Diskussion
Pflicht: Datum, Ort, Teilnehmer,
 Tagesordnung, Protokollant,
 Aufgaben: wer, was, bis wann`},
 beats:[
  {say:'Risiko ist Eintrittswahrscheinlichkeit mal Schadenshöhe. 20 Prozent mal 50000 Euro sind 10000 Euro. Die größten Risiken der Matrix zuerst.', show:{lines:[1,2]}},
  {say:'Vier Maßnahmen: vermeiden, vermindern, übertragen, zum Beispiel per Versicherung, oder bewusst akzeptieren.', show:{lines:[3,7]}},
  {say:'Das Ergebnisprotokoll enthält nur Beschlüsse und Aufgaben. Das Verlaufsprotokoll zeigt auch den Ablauf der Diskussion.', show:{lines:[8,9]}},
  {say:'Pflicht sind Datum, Ort, Teilnehmer, Tagesordnung, Protokollant und Aufgaben mit Verantwortlichem und Termin.', show:{lines:[10,12]}}
 ],
 check:{q:'Was kommt raus: 10 Prozent Wahrscheinlichkeit mal 30000 Euro Schaden?', o:['3000 Euro','300 Euro','30000 Euro'], a:0, e:'0,1 mal 30.000 Euro ergibt 3.000 Euro.'}},
{h:'BPMN in 60 Sekunden', v:{code:`Pool: Teilnehmer, etwa Kanzlei
 Lane: Rolle darin, etwa Sekretariat
Aufgabe: abgerundetes Rechteck
Ereignis: Kreis
 Start dünn, Zwischen doppelt,
 Ende dick
Gateway: Raute
 X  XOR: genau ein Weg
 +  AND: alle Wege parallel
 O  OR: einer oder mehrere
Sequenzfluss: durchgezogen, im Pool
Nachrichtenfluss: gestrichelt,
 zwischen Pools
UML-Aktivitätsdiagramm: softwarenah`},
 beats:[
  {say:'Ein Pool ist ein Teilnehmer, etwa die Kanzlei. Lanes sind Rollen darin. Aufgaben sind abgerundete Rechtecke.', show:{lines:[1,3]}},
  {say:'Ereignisse sind Kreise: Start mit dünnem Rand, Zwischenereignis doppelt, Ende dick umrandet.', show:{lines:[4,6]}},
  {say:'Gateways sind Rauten. Mit X: genau ein Weg. Mit Plus: alle Wege parallel. Mit O: einer oder mehrere.', show:{lines:[7,10]}},
  {say:'Im Pool der Sequenzfluss, durchgezogen. Zwischen Pools der Nachrichtenfluss, gestrichelt. Das UML-Aktivitätsdiagramm ist softwarenäher.', show:{lines:[11,14]}}
 ],
 check:{q:'Ab 10000 Euro braucht eine Rechnung eine Freigabe, sonst wird sie direkt gebucht. Welches Gateway?', o:['XOR','AND','OR'], a:0, e:'Genau einer der beiden Wege wird genommen: exklusives Gateway.'}}
],

projekt: [
{h:'Rechenpunkte pur', v:{stat:'FAZ bis GP', sub:'Netzplan: sichere Rechenpunkte'},
 beats:[
  {say:'Netzplan, Gantt und Projektkosten sind reine Rechen- und Zeichenpunkte. Wer das Schema kann, holt sie sicher.', show:{}},
  {say:'Typischer Fehler: In der Vorwärtsrechnung den kleinsten statt den größten Wert nehmen. Heute nicht.', show:{}}
 ]},
{h:'Projekt zerlegen und darstellen', v:{table:[['Werkzeug','Wofür'],['Projektstrukturplan','Projekt in Arbeitspakete zerlegen'],['Meilenstein','Prüfpunkt ohne Dauer'],['Gantt','Balken auf Zeitachse, anschaulich'],['Netzplan','Abhängigkeiten, Puffer, kritischer Pfad'],['Kanban','Board, Spalten, WIP-Limit']]},
 beats:[
  {say:'Phasen: Initialisierung, Planung, Durchführung, Abschluss. Der Projektstrukturplan zerlegt das Projekt in Arbeitspakete mit Verantwortlichem.', show:{rows:1}},
  {say:'Ein Meilenstein ist ein Prüfpunkt ohne Dauer. Das Gantt-Diagramm zeigt Vorgänge als Balken auf einer Zeitachse, sehr anschaulich.', show:{rows:3}},
  {say:'Der Netzplan zeigt Abhängigkeiten genauer und berechnet Puffer und kritischen Pfad, ist aber weniger anschaulich.', show:{rows:4}},
  {say:'Kanban nutzt ein Board mit Spalten. Das WIP-Limit begrenzt, wie viele Aufgaben gleichzeitig in einer Spalte sein dürfen.', show:{rows:5}}
 ]},
{h:'Das Beispiel', v:{code:`Vorgang          Dauer  Vorgänger
A Analyse          3    keiner
B Implementierung  6    A
C Mockups          2    A
D Handbuch         3    C
E Abnahme          2    B und D

Knoten:  FAZ | Dauer | FEZ
           Vorgang
         SAZ |  GP   | SEZ
FEZ = FAZ + Dauer
FAZ = größter FEZ der Vorgänger`},
 beats:[
  {say:'Unser Projekt hat fünf Vorgänge. B und C starten nach A, D nach C, und E braucht B und D als Vorgänger.', show:{lines:[1,6]}},
  {say:'Jeder Knoten hat oben die frühesten, unten die spätesten Zeiten. Die Anordnung variiert, halte dich an die Legende in der Aufgabe.', show:{lines:[8,10]}},
  {say:'Die Regeln vorwärts: Frühestes Ende ist frühester Anfang plus Dauer. Ein Nachfolger startet beim größten frühesten Ende seiner Vorgänger.', show:{lines:[11,12]}}
 ]},
{h:'Vorwärtsrechnung', v:{table:[['Vorgang','Dauer','FAZ','FEZ'],['A Analyse','3','0','3'],['B Implementierung','6','3','9'],['C Mockups','2','3','5'],['D Handbuch','3','5','8'],['E Abnahme','2','9','11']]},
 beats:[
  {say:'A startet bei 0 und endet bei 3. B und C hängen nur an A, sie starten also beide bei 3.', show:{rows:1}},
  {say:'B endet bei 3 plus 6, also 9. C endet bei 5. D startet nach C bei 5 und endet bei 8.', show:{rows:4}},
  {say:'E hat zwei Vorgänger: B endet bei 9, D bei 8. Du nimmst den größten Wert, also startet E bei 9.', show:{rows:5, hl:[5,3]}},
  {say:'E endet bei 11. Das Projekt dauert also 11 Tage.', show:{rows:5, hl:[5,4]}}
 ],
 check:{q:'Ein Vorgang hat die Vorgänger X mit FEZ 7 und Y mit FEZ 12. Wann ist sein FAZ?', o:['12','7','19'], a:0, e:'Vorwärts immer den größten FEZ der Vorgänger nehmen.'}},
{h:'Rückwärtsrechnung', v:{table:[['Vorgang','SAZ','SEZ','GP'],['E','9','11','0'],['D','6','9','1'],['B','3','9','0'],['C','4','6','1'],['A','0','3','0']]},
 beats:[
  {say:'Jetzt rückwärts vom Ende. E muss spätestens bei 11 enden, also spätestens bei 11 minus 2 gleich 9 anfangen.', show:{rows:1}},
  {say:'B und D müssen bei 9 fertig sein. D startet spätestens bei 6, B spätestens bei 3.', show:{rows:3}},
  {say:'C muss vor D fertig sein, also spätestes Ende 6, spätester Anfang 4.', show:{rows:4}},
  {say:'A hat zwei Nachfolger, B mit 3 und C mit 4. Rückwärts nimmst du den kleinsten Wert, also endet A spätestens bei 3.', show:{rows:5, hl:[5,3]}}
 ]},
{h:'Puffer und kritischer Pfad', v:{code:`GP = SAZ - FAZ  oder  SEZ - FEZ
FP = FAZ Nachfolger - eigener FEZ
     bei mehreren: kleinster FAZ

C: GP = 4 - 3 = 1
   FP = FAZ D 5 - FEZ C 5 = 0
D: GP = 6 - 5 = 1
   FP = FAZ E 9 - FEZ D 8 = 1

Kritischer Pfad: alle mit GP 0
A - B - E: 3 + 6 + 2 = 11 Tage`},
 beats:[
  {say:'Gesamtpuffer ist spätester Anfang minus frühester Anfang. Freier Puffer ist der früheste Anfang des Nachfolgers minus das eigene früheste Ende.', show:{lines:[1,3]}},
  {say:'C hat einen Gesamtpuffer von 1, aber freien Puffer 0. Verschiebt sich C, rutscht D mit, das Projektende aber nicht.', show:{lines:[5,6]}},
  {say:'D hat Gesamtpuffer 1 und freien Puffer 1. D kann sich einen Tag verschieben, ohne irgendwen zu stören.', show:{lines:[7,8]}},
  {say:'Der kritische Pfad besteht aus allen Vorgängen mit Gesamtpuffer 0: A, B, E. Jede Verzögerung dort verschiebt das Projektende.', show:{lines:[10,11]}}
 ],
 check:{q:'B liegt auf dem kritischen Pfad und verzögert sich um 2 Tage. Was passiert?', o:['Das Projekt endet 2 Tage später','Nichts, B hat Puffer','Nur D verschiebt sich'], a:0, e:'Kritische Vorgänge haben Gesamtpuffer 0.'}},
{h:'Kosten und Tabellenkalkulation', v:{code:`fix oder variabel
Einzelkosten oder Gemeinkosten
einmalig oder laufend
Stunden x Satz + Sachkosten
 120 h x 75 € = 9.000 €
 + 1.500 € Sachkosten = 10.500 €
=SUMME(B2:B9)  =MITTELWERT(B2:B9)
=WENN(B2>1000;"teuer";"ok")
=SVERWEIS(4711;A2:C99;3;FALSCH)
=B2*$E$1  $E$1 bleibt beim Kopieren
Outsourcing: Know-how, Kosten, Tempo
 Risiko: Abhängigkeit, Datenschutz`},
 beats:[
  {say:'Fixkosten hängen nicht von der Menge ab, variable schon. Einzelkosten sind dem Projekt direkt zurechenbar, Gemeinkosten wie Miete nicht.', show:{lines:[1,3]}},
  {say:'Projektkosten sind Stunden mal Stundensatz plus Sachkosten. 120 Stunden mal 75 Euro sind 9000 Euro, plus 1500 Euro Sachkosten ergibt 10500 Euro.', show:{lines:[4,6]}},
  {say:'Excel: SUMME, MITTELWERT, WENN mit Prüfung, Dann, Sonst. SVERWEIS sucht in Spalte eins und liefert Spalte Index, FALSCH heißt exakt.', show:{lines:[7,9]}},
  {say:'Mit Dollarzeichen ist ein Bezug absolut und bleibt beim Kopieren fest. Outsourcing bringt Know-how und Tempo, aber Abhängigkeit und Datenschutzfragen.', show:{lines:[10,12]}}
 ]}
],

sec2: [
{h:'Login bis Backup', v:{stat:'Wer, was, wohin', sub:'Anmeldung, Rechte, Zertifikate, Sicherung'},
 beats:[
  {say:'Login-Konzepte, Zertifikate und Backups tauchen in GA1 und GA2 immer wieder auf, oft als Pseudocode oder Fall.', show:{}},
  {say:'Typischer Fehler: Authentifizierung und Autorisierung verwechseln. Und beim Restore die falschen Sicherungen nennen.', show:{}}
 ]},
{h:'Wer bist du, was darfst du?', v:{table:[['Begriff','Bedeutung'],['Authentifizierung','Wer bist du? Identität prüfen'],['Autorisierung','Was darfst du? Rechte prüfen'],['Faktoren','Wissen, Besitz, Inhärenz'],['MFA','mindestens 2 verschiedene Faktoren'],['Least Privilege','nur die nötigsten Rechte']]},
 beats:[
  {say:'Authentifizierung prüft, wer du bist. Autorisierung prüft danach, was du darfst.', show:{rows:2}},
  {say:'Die drei Faktoren: Wissen wie ein Passwort, Besitz wie ein Handy oder Token, Inhärenz, also Sein, wie der Fingerabdruck.', show:{rows:3}},
  {say:'Multi-Faktor heißt mindestens zwei verschiedene Faktoren. Passwort plus PIN sind zweimal Wissen, also keine echte MFA.', show:{rows:4}},
  {say:'Least Privilege: Jeder bekommt nur die Rechte, die er braucht, geregelt über ein Rollen- und Berechtigungskonzept.', show:{rows:5}}
 ],
 check:{q:'Ist Passwort plus Sicherheitsfrage eine Multi-Faktor-Authentifizierung?', o:['Ja','Nein, beides ist Wissen'], a:1, e:'MFA braucht verschiedene Faktoren, etwa Wissen plus Besitz.'}},
{h:'OAuth 2.0, OIDC und SSO', v:{code:`Resource Owner: Nutzer, gibt frei
Client: App, will Zugriff
Authorization Server: Login, Tokens
Resource Server: API mit Daten

1 Client leitet zum Login weiter
2 Nutzer meldet sich dort an
3 Client bekommt Access Token
4 Client ruft API mit Token auf
Client sieht nie das Passwort
Refresh Token: neuen Access Token
OIDC: plus ID-Token, wer ist das?
SSO: einmal anmelden, überall drin`},
 beats:[
  {say:'OAuth 2 hat vier Rollen. Resource Owner ist der Nutzer, Client die App. Der Authorization Server stellt Tokens aus, der Resource Server hat Daten.', show:{lines:[1,4]}},
  {say:'Der Client schickt dich zum Login, dort meldest du dich an, und der Client bekommt ein Access Token. Dein Passwort sieht er nie.', show:{lines:[6,10]}},
  {say:'Läuft das Access Token ab, holt das Refresh Token ein neues. OpenID Connect ergänzt ein ID-Token mit der Identität des Nutzers.', show:{lines:[11,12]}},
  {say:'Single Sign-on: einmal anmelden, überall drin. Bequem und zentral verwaltet, aber ein Single Point of Failure.', show:{lines:[13,13]}}
 ]},
{h:'PKI und Zertifikate', v:{code:`Zertifikat enthält:
 öffentlichen Schlüssel, Inhaber,
 Gültigkeit, Aussteller,
 Signatur der CA
Kette: Root-CA, Zwischen-CA, Server
Root-Zertifikate liegen in Browser
 und Betriebssystem
Sperrung: Sperrliste CRL oder OCSP
TLS grob:
 1 Client Hello
 2 Server schickt Zertifikat
 3 Client prüft Kette und Gültigkeit
 4 Sitzungsschlüssel aushandeln
 5 symmetrisch verschlüsselt weiter`},
 beats:[
  {say:'Ein Zertifikat enthält öffentlichen Schlüssel, Inhaber, Gültigkeit und die Signatur der Zertifizierungsstelle. Den privaten Schlüssel nie.', show:{lines:[1,4]}},
  {say:'Vertrauen läuft über eine Kette: Root-CA, Zwischen-CA, Serverzertifikat. Die Root-Zertifikate liegen im Browser und im Betriebssystem.', show:{lines:[5,7]}},
  {say:'Gestohlene Zertifikate werden gesperrt, über Sperrlisten oder OCSP.', show:{lines:[8,8]}},
  {say:'Beim TLS-Handshake schickt der Server sein Zertifikat, der Client prüft es. Dann Sitzungsschlüssel aushandeln und symmetrisch weiter.', show:{lines:[9,14]}}
 ]},
{h:'Hash, Salt und E-Mail', v:{code:`Hash: Einweg, feste Länge,
 kollisionsresistent
Passwort: Hash aus Passwort und Salt
 Salt: zufällig, pro Nutzer, in DB
 Pepper: geheim, nicht in der DB
 langsam: bcrypt, Argon2, nicht MD5
Integrität: Hashwerte vergleichen
S/MIME: Zertifikate einer CA
PGP: Web of Trust
SPF: welche Server dürfen senden
DKIM: Signatur im Mail-Header
DMARC: Regel bei Fehlschlag`},
 beats:[
  {say:'Ein Hash ist eine Einwegfunktion mit fester Länge und kollisionsresistent. Gleicher Hash heißt unverändert, so prüfst du Integrität.', show:{lines:[1,2]}},
  {say:'Passwörter hashst du mit Salt, einem Zufallswert pro Nutzer. Gleiche Passwörter ergeben so verschiedene Hashes. Pepper: geheim, nie in der Datenbank.', show:{lines:[3,5]}},
  {say:'Nimm absichtlich langsame Verfahren wie bcrypt oder Argon2, nicht MD5. Das bremst Brute Force.', show:{lines:[6,7]}},
  {say:'Mail: S MIME nutzt Zertifikate einer CA, PGP das Web of Trust. SPF nennt erlaubte Server, DKIM signiert, DMARC regelt den Fehlschlag.', show:{lines:[8,12]}}
 ]},
{h:'OWASP und Schutzbedarf', v:{table:[['Problem','Gegenmaßnahme'],['XSS: fremdes Script läuft','Ausgaben escapen, CSP'],['CSRF: fremde Seite löst Aktion aus','CSRF-Token, SameSite-Cookie'],['Broken Access Control','Rechte serverseitig prüfen'],['Schutzbedarf nach BSI','normal, hoch, sehr hoch'],['Security by Design','Sicherheit von Anfang an']]},
 beats:[
  {say:'XSS: Fremdes Script läuft in deiner Seite, also Ausgaben escapen. Bei CSRF löst eine fremde Seite eine Aktion aus, dagegen hilft ein CSRF-Token.', show:{rows:2}},
  {say:'Broken Access Control: Ein Nutzer ändert eine ID in der URL und sieht fremde Daten. Rechte immer auf dem Server prüfen.', show:{rows:3}},
  {say:'Das BSI teilt den Schutzbedarf in normal, hoch und sehr hoch ein. Security by Design heißt: Sicherheit von Anfang an mitplanen.', show:{rows:5}}
 ]},
{h:'Backup richtig', v:{table:[['Art','sichert','Restore braucht'],['Voll','alles','nur die Vollsicherung'],['Inkrementell','seit letzter Sicherung','Voll plus alle Inkremente'],['Differenziell','seit letzter Vollsicherung','Voll plus letzte Differenz'],['3-2-1','3 Kopien, 2 Medien','1 Kopie extern'],['Archiv','langfristig, unveränderbar','Aufbewahrungspflichten']]},
 beats:[
  {say:'Voll sichert alles. Inkrementell nur, was seit der letzten Sicherung neu ist. Restore: Vollsicherung plus alle Inkremente in Reihenfolge.', show:{rows:2}},
  {say:'Differenziell sichert alles seit der letzten Vollsicherung. Restore: Vollsicherung plus nur die letzte Differenz.', show:{rows:3}},
  {say:'Die Drei zwei eins Regel: 3 Kopien, auf 2 verschiedenen Medien, eine davon außer Haus.', show:{rows:4}},
  {say:'Backup dient der Wiederherstellung nach Verlust. Archivierung bewahrt Daten langfristig und unveränderbar auf, etwa wegen Aufbewahrungspflichten.', show:{rows:5}}
 ],
 check:{q:'Vollsicherung Sonntag, differenziell Montag bis Donnerstag, Crash am Freitag. Was brauchst du?', o:['Voll plus Donnerstag','Voll plus Montag bis Donnerstag','Nur Donnerstag'], a:0, e:'Die letzte Differenz enthält alle Änderungen seit der Vollsicherung.'}}
]

};
