// GA1: neue Lektionen B (UI/UX, Anforderungen/BPMN, Projektplanung, IT-Sicherheit 2)
const L_NEU_B = [
{
id:'ui', area:'GA1', prio:1, title:'UI/UX: Mockups, Ergonomie, Usability', mins:25,
why:'Mockups kamen in 3 älteren Prüfungen und wieder im Sommer 2026 dran, "Bedienoberflächen konzipieren" steht im Katalog.',
clip:[],
videos:[],
quiz:[
{q:'Welcher Entwurf ist klickbar, sodass Nutzer echte Abläufe ausprobieren können?', o:['Wireframe','Mockup','Prototyp','Styleguide'], a:2, e:'Wireframe = grobes Layout, Mockup = statisch mit Design, Prototyp = klickbar.'},
{q:'Ein statischer Entwurf mit echten Farben, Schriften und Logo, aber nicht klickbar, ist ein ...', o:['Wireframe','Mockup','vertikaler Prototyp','Lastenheft'], a:1, e:'Mockup = High Fidelity, aber statisch.'},
{q:'Ihr baut nur die Funktion "Beleg hochladen", dafür komplett von der Oberfläche bis zur Datenbank. Welcher Prototyp ist das?', o:['horizontaler Prototyp','vertikaler Prototyp','Wireframe','Low-Fidelity-Mockup'], a:1, e:'Vertikal = eine Funktion durch alle Schichten. Horizontal = eine Schicht (meist die Oberfläche) in der Breite, ohne Logik dahinter.'},
{q:'Zahlungsart: Lastschrift, Überweisung oder Rechnung. Genau eine ist wählbar. Welches Steuerelement passt am besten?', o:['Checkbox','Radiobutton','Textfeld','Datepicker'], a:1, e:'Radiobutton = genau 1 aus wenigen, alle Optionen sofort sichtbar.'},
{q:'Ein Mandant soll sein Bundesland aus 16 Bundesländern wählen. Welches Steuerelement passt am besten?', o:['16 Radiobuttons','Dropdown','16 Checkboxen','freies Textfeld'], a:1, e:'Viele Optionen, genau eine Auswahl: Dropdown spart Platz und verhindert Tippfehler.'},
{q:'Ein falsch ausgefülltes Feld wird sofort rot markiert, direkt daneben steht, was falsch ist, die übrigen Eingaben bleiben erhalten. Welches Interaktionsprinzip nach ISO 9241-110 wird damit erfüllt?', o:['Robustheit gegen Benutzungsfehler','Benutzerbindung','Aufgabenangemessenheit','Erlernbarkeit'], a:0, e:'Fehler erkennen, verständlich melden, leicht korrigieren: Robustheit gegen Benutzungsfehler (früher Fehlertoleranz).'},
{q:'Der Speichern-Button steht in jeder Maske an derselben Stelle und heißt überall gleich. Welches Prinzip?', o:['Erwartungskonformität','Steuerbarkeit','Benutzerbindung','Robustheit gegen Benutzungsfehler'], a:0, e:'Konsistent und wie gewohnt = erwartungskonform.'},
{q:'Welche drei Kriterien definieren Gebrauchstauglichkeit (Usability) nach ISO 9241-11?', o:['Effektivität, Effizienz, Zufriedenheit','Vertraulichkeit, Integrität, Verfügbarkeit','Wahrnehmbar, bedienbar, robust','Zeit, Kosten, Qualität'], a:0, e:'Ziel erreicht, mit vertretbarem Aufwand, und der Nutzer ist zufrieden.'},
{q:'Welches Kontrastverhältnis fordert WCAG Stufe AA mindestens für normalen Fließtext? (Format x:1)', type:'input', a:['4,5:1','4.5:1','4,5','4.5','4,5zu1','4.5zu1'], e:'4,5:1 für normalen Text, 3:1 für große Schrift.'},
{q:'Ein Formular lässt sich nur mit der Maus bedienen, nicht mit der Tastatur. Welches WCAG-Prinzip ist verletzt?', o:['wahrnehmbar','bedienbar','verständlich','robust'], a:1, e:'Bedienbar heißt unter anderem: alles per Tastatur erreichbar.'},
{q:'Testpersonen erledigen Aufgaben und sprechen dabei laut aus, was sie denken. Welche Methode ist das?', o:['A/B-Test','Eye-Tracking','Thinking Aloud','heuristische Evaluation'], a:2, e:'Lautes Denken zeigt, wo Nutzer stolpern.'},
{q:'Straße, PLZ und Ort stehen eng beieinander, mit deutlichem Abstand zum Block Bankverbindung. Welches Gestaltgesetz wird genutzt?', o:['Gesetz der Nähe','Gesetz der Ähnlichkeit','Gesetz der Geschlossenheit','Mobile First'], a:0, e:'Was nah beieinander steht, wird als zusammengehörig wahrgenommen.'}
],
write:[
{task:'Entwerfen Sie in Textform ein Mockup für die Maske "Neuen Mandanten anlegen" mit den Angaben Anrede (Frau, Herr, Divers), Name, Rechtsform (eine aus 9 Möglichkeiten), gebuchte Leistungen (Lohn, Buchhaltung, Jahresabschluss; mehrere möglich) und "Mandant seit" (Datum). Begründen Sie die Wahl jedes Steuerelements und nennen Sie zwei weitere Gestaltungsregeln.',
 keys:[['Radiobutton für Anrede',/radio|optionsfeld/i],['Textfeld für Name',/textfeld|eingabefeld|textbox/i],['Dropdown für Rechtsform',/drop.?down|auswahlliste|combobox|kombinationsfeld|klappliste/i],['Checkbox für Leistungen',/checkbox|kontrollk(ä|ae)stchen|ankreuzfeld/i],['Datepicker für Datum',/date.?picker|datumsauswahl|kalender/i],['Pflichtfelder markieren',/pflicht/i],['klare Buttons',/button|schaltfl(ä|ae)che/i]],
 model:`Maske "Neuer Mandant"
[ Start | Mandanten | Aufträge ]            [Suche...]
Anrede *        ( ) Frau  ( ) Herr  ( ) Divers
Name *          [________________________]
Rechtsform *    [ GmbH                  v]
Leistungen      [ ] Lohn  [ ] Buchhaltung  [ ] Jahresabschluss
Mandant seit    [ 12.10.2026 ] (Kalender)
                         [Abbrechen]  [Mandant speichern]
* = Pflichtfeld

Begründung:
Anrede: Radiobutton, weil genau 1 aus wenigen Optionen gewählt wird und alle sofort sichtbar sind.
Name: Textfeld, weil es eine freie Eingabe ist.
Rechtsform: Dropdown, weil genau 1 aus vielen Optionen gewählt wird, spart Platz und verhindert Tippfehler.
Leistungen: Checkbox, weil mehrere gleichzeitig gewählt werden können.
Mandant seit: Datepicker, damit das Datum im richtigen Format eingegeben wird.

Weitere Regeln: Pflichtfelder mit * markieren, Fehlermeldungen direkt am Feld anzeigen, Buttons eindeutig mit Verb beschriften und in allen Masken an derselben Stelle platzieren (Konsistenz), zusammengehörige Felder gruppieren (Gesetz der Nähe).`},
{task:'Ein Kollege hat eine Erfassungsmaske gebaut. Ordnen Sie jedem Mangel das verletzte Interaktionsprinzip nach DIN EN ISO 9241-110 zu und schlagen Sie eine Verbesserung vor: 1. Die Maske verlangt sechs Angaben, die für die Aufgabe gar nicht gebraucht werden. 2. Icons haben weder Beschriftung noch Tooltip, man sieht nicht, in welchem Schritt man ist. 3. Der Abbrechen-Button ist mal links, mal rechts. 4. Ein gestarteter Import lässt sich weder abbrechen noch rückgängig machen. 5. Bei falschem Datumsformat wird das ganze Formular ohne Hinweis geleert.',
 keys:[['1: Aufgabenangemessenheit',/aufgabenangemessen|angemessenheit f(ü|ue)r benutzeraufgaben/i],['2: Selbstbeschreibungsfähigkeit',/selbstbeschreib/i],['3: Erwartungskonformität',/erwartungskonform/i],['4: Steuerbarkeit',/steuerbar/i],['5: Robustheit gegen Benutzungsfehler',/robust|fehlertoleran/i],['Verbesserung genannt',/verbesser|l(ö|oe)sung|besser|stattdessen/i]],
 model:`1. Aufgabenangemessenheit: Nur Felder abfragen, die für die Aufgabe nötig sind; überflüssige Felder entfernen oder optional machen.
2. Selbstbeschreibungsfähigkeit: Icons beschriften oder Tooltips ergänzen, Schrittanzeige ("Schritt 2 von 4") einblenden.
3. Erwartungskonformität: Abbrechen-Button in allen Masken an derselben Stelle und gleich benannt (Konsistenz).
4. Steuerbarkeit: Abbrechen-Funktion für den Import und eine Rückgängig-Möglichkeit anbieten.
5. Robustheit gegen Benutzungsfehler: Eingaben behalten, fehlerhaftes Feld markieren, verständliche Meldung mit Beispiel ("TT.MM.JJJJ") anzeigen, besser gleich einen Datepicker verwenden.`}
]},

{
id:'anforderung', area:'GA1', prio:1, title:'Anforderungen, Stakeholder, BPMN', mins:25,
why:'Anforderungen, Stakeholder und Risiken gehören zu jeder Projektplanung, BPMN ist neu im Prüfungskatalog 2025.',
clip:[],
videos:[],
quiz:[
{q:'Die Geschäftsleitung hat großen Einfluss auf das Projekt, interessiert sich aber kaum für Details. Welche Strategie empfiehlt die Stakeholder-Matrix?', o:['eng einbinden','zufriedenstellen','informieren','nur beobachten'], a:1, e:'Hoher Einfluss, geringes Interesse: zufriedenstellen, damit keine Blockade entsteht.'},
{q:'Du willst von 120 Mitarbeitern an drei Standorten schnell vergleichbare Antworten. Welche Erhebungstechnik passt am besten?', o:['Einzelinterview','Fragebogen','Beobachtung','Workshop'], a:1, e:'Fragebogen: viele Personen, gut auswertbar, aber keine Rückfragen möglich.'},
{q:'Die Mitarbeiter erledigen ihre Arbeit routiniert, können die Abläufe aber kaum beschreiben. Welche Technik deckt das implizite Wissen am besten auf?', o:['Fragebogen','Dokumentenanalyse','Beobachtung','Lastenheft'], a:2, e:'Beobachtung zeigt die echten Abläufe, ist aber aufwendig.'},
{q:'Wofür steht das T in INVEST (Kriterien für gute User Stories)?', o:['Transparent','Testable','Timeboxed','Technical'], a:1, e:'Independent, Negotiable, Valuable, Estimable, Small, Testable.'},
{q:'Was legen Akzeptanzkriterien einer User Story fest?', o:['wer die Story umsetzt','prüfbare Bedingungen, wann die Story erfüllt ist','die Kosten der Story','den Sprint, in dem sie umgesetzt wird'], a:1, e:'Akzeptanzkriterien machen die Story testbar.'},
{q:'"Dürfen wir Mandantendaten in diesem Cloud-Dienst speichern?" Welche Machbarkeit wird geprüft?', o:['technische','wirtschaftliche','rechtliche','zeitliche'], a:2, e:'Rechtliche Machbarkeit: DSGVO, Berufsrecht, Verträge.'},
{q:'Welches Ziel ist SMART formuliert?', o:['Das Tool soll schneller werden.','Bis 31.03.2027 sinkt die Bearbeitungszeit pro Beleg von 5 auf 3 Minuten.','Wir wollen die beste Software der Region.','Möglichst bald weniger Fehler.'], a:1, e:'Spezifisch, messbar, attraktiv, realistisch, terminiert.'},
{q:'Eintrittswahrscheinlichkeit 20 %, Schadenshöhe 50.000 €. Wie hoch ist der Risikowert in Euro?', type:'input', a:['10000','10.000','10000,00','10.000,00'], e:'Risiko = Wahrscheinlichkeit × Schaden = 0,2 × 50.000 € = 10.000 €.'},
{q:'Die Kanzlei schließt eine Cyberversicherung ab. Welche Risikomaßnahme ist das?', o:['vermeiden','vermindern','übertragen','akzeptieren'], a:2, e:'Der finanzielle Schaden wird auf die Versicherung übertragen.'},
{q:'Ein Protokoll enthält nur Beschlüsse und Aufgaben mit Verantwortlichem und Termin, nicht den Diskussionsverlauf. Welche Art?', o:['Verlaufsprotokoll','Ergebnisprotokoll','Wortprotokoll','Lastenheft'], a:1, e:'Ergebnisprotokoll = Ergebnisse. Verlaufsprotokoll = auch der Ablauf der Diskussion.'},
{q:'Ein BPMN-Gateway ist eine Raute mit einem Plus. Was bedeutet es?', o:['genau ein Weg wird gewählt','alle ausgehenden Wege laufen parallel','einer oder mehrere Wege','der Prozess endet'], a:1, e:'Plus = AND, paralleles Gateway. X = XOR, O = OR.'},
{q:'Wie stellst du in BPMN die Kommunikation zwischen den Pools "Kanzlei" und "Mandant" dar?', o:['Sequenzfluss, durchgezogener Pfeil','Nachrichtenfluss, gestrichelter Pfeil','Lane','Assoziation mit Raute'], a:1, e:'Sequenzfluss nur innerhalb eines Pools, zwischen Pools der Nachrichtenfluss.'}
],
write:[
{task:'Die Kanzlei plant ein Mandantenportal, über das Mandanten Belege hochladen. a) Nennen Sie je zwei interne und zwei externe Stakeholder. b) Formulieren Sie eine User Story mit zwei Akzeptanzkriterien.',
 keys:[['interne Stakeholder',/intern/i],['z. B. Mitarbeiter / Geschäftsleitung / IT',/mitarbeiter|sachbearbeiter|gesch(ä|ae)ftsf|gesch(ä|ae)ftsleitung|partner|it.?abteilung|betriebsrat/i],['externe Stakeholder',/extern/i],['z. B. Mandanten / Dienstleister',/mandant|dienstleister|hoster|beh(ö|oe)rde|finanzamt|softwarehersteller/i],['Als ... möchte ich ...',/\bals\b[\s\S]*m(ö|oe)chte\s+ich|\bals\b[\s\S]*will\s+ich/i],['damit ...',/damit/i],['Akzeptanzkriterien',/akzeptanz/i]],
 model:`a) Intern: Sachbearbeiter (arbeiten mit den Belegen), Geschäftsleitung/Partner (Budget, Entscheidung), IT-Abteilung (Betrieb).
Extern: Mandanten (laden hoch), Hosting-Dienstleister, Softwarehersteller der Kanzleisoftware.

b) User Story: Als Mandant möchte ich Belege per Smartphone hochladen, damit ich sie nicht mehr in die Kanzlei bringen muss.
Akzeptanzkriterien:
1. PDF, JPG und PNG bis 20 MB können hochgeladen werden.
2. Nach dem Upload erhält der Mandant eine Bestätigung und der Beleg erscheint beim zuständigen Sachbearbeiter.`},
{task:'Modellieren Sie in Textform einen BPMN-Prozess "Beleg prüfen": Pool Kanzlei mit den Lanes Sekretariat und Sachbearbeitung. Ein Beleg geht per Post ein, das Sekretariat scannt ihn. Die Sachbearbeitung prüft ihn: Ist er vollständig, wird er gebucht. Sonst wird eine Rückfrage an den Mandanten (eigener Pool) geschickt. Danach endet der Prozess. Benennen Sie die verwendeten BPMN-Elemente.',
 keys:[['Pool',/pool/i],['Lanes',/lane/i],['Startereignis',/startereignis|start.?ereignis/i],['Aufgaben',/aufgabe|task/i],['XOR-Gateway',/xor|exklusiv/i],['Nachrichtenfluss zum Mandanten',/nachrichtenfluss/i],['Endereignis',/endereignis|end.?ereignis/i]],
 diagram:`flowchart LR
  subgraph Kanzlei["Pool Kanzlei"]
    direction LR
    subgraph Sekretariat
      S(("Beleg per Post eingegangen")) --> T1(Beleg scannen)
    end
    subgraph Sachbearbeitung
      T2(Beleg prüfen) --> G{"X"}
      G -->|"ja, vollständig"| T3(Beleg buchen)
      T3 --> E1(("Beleg erledigt"))
      G -->|"nein"| T4(Rückfrage senden)
      T4 --> E2(("Rückfrage gestellt"))
    end
  end
  subgraph PoolMandant["Pool Mandant (zugeklappt)"]
    M["Mandant"]
  end
  T1 --> T2
  T4 -.->|Nachrichtenfluss| M
  style E1 stroke:#000,stroke-width:4px
  style E2 stroke:#000,stroke-width:4px`,
 model:`Pool "Kanzlei"
  Lane "Sekretariat":
    (Startereignis, Nachricht) Beleg per Post eingegangen
    -> [Aufgabe] Beleg scannen
  Lane "Sachbearbeitung":
    -> [Aufgabe] Beleg prüfen
    -> <X> XOR-Gateway "Beleg vollständig?"
         ja   -> [Aufgabe] Beleg buchen -> (Endereignis) Beleg erledigt
         nein -> [Aufgabe] Rückfrage senden -> (Endereignis) Rückfrage gestellt
Pool "Mandant" (zugeklappt)
  Rückfrage senden - - -> Mandant (Nachrichtenfluss, gestrichelt, zwischen den Pools)

Elemente: Pool, Lanes, Startereignis (dünner Kreis), Aufgaben (abgerundete Rechtecke), XOR-Gateway (Raute mit X), Sequenzfluss (durchgezogen, innerhalb des Pools), Nachrichtenfluss (gestrichelt, zwischen Pools), Endereignisse (dicker Kreis).`}
]},

{
id:'projekt', area:'GA1', prio:2, title:'Projektplanung und Kosten: Netzplan, Gantt', mins:25,
why:'Netzplan, Gantt und Projektkosten sind reine Rechen- und Zeichenpunkte, Projektplanung steht fest im Prüfungskatalog.',
clip:[],
videos:[],
quiz:[
{q:'Ein Vorgang hat FAZ 4 und Dauer 3. Wie groß ist sein FEZ?', type:'input', a:['7'], e:'FEZ = FAZ + Dauer = 4 + 3 = 7.'},
{q:'Vorgang D hat die Vorgänger B (FEZ 9) und C (FEZ 6). Wie groß ist der FAZ von D?', type:'input', a:['9'], e:'Vorwärtsrechnung: der größte FEZ aller Vorgänger. D kann erst starten, wenn beide fertig sind.'},
{q:'Ein Vorgang hat FAZ 5 und SAZ 8. Wie groß ist sein Gesamtpuffer?', type:'input', a:['3'], e:'GP = SAZ - FAZ = 8 - 5 = 3.'},
{q:'Welche Vorgänge liegen auf dem kritischen Pfad?', o:['alle mit der längsten Dauer','alle mit Gesamtpuffer 0','alle ohne Vorgänger','alle mit freiem Puffer größer 0'], a:1, e:'Kein Puffer: Jede Verzögerung verschiebt das Projektende.'},
{q:'Vorgang C hat FEZ 5 und Gesamtpuffer 1. Sein einziger Nachfolger D hat FAZ 5. Wie groß ist der freie Puffer von C?', type:'input', a:['0'], e:'FP = FAZ Nachfolger - FEZ = 5 - 5 = 0. Verschiebt sich C, verschiebt sich auch D.'},
{q:'Was zeigt ein Gantt-Diagramm besser als ein Netzplan?', o:['Puffer und kritischen Pfad rechnerisch','die zeitliche Lage der Vorgänge als Balken auf einer Zeitachse','die Kosten je Stunde','die Rückwärtsrechnung'], a:1, e:'Gantt ist anschaulich, Abhängigkeiten und Puffer zeigt der Netzplan genauer.'},
{q:'80 Stunden à 70 € plus 1.200 € Sachkosten für Lizenzen. Wie hoch sind die Projektkosten in Euro?', type:'input', a:['6800','6.800','6800,00','6.800,00'], e:'80 × 70 € = 5.600 € + 1.200 € = 6.800 €.'},
{q:'Kosten, die sich dem Projekt direkt zurechnen lassen, etwa eine nur dafür gekaufte Lizenz, heißen ...', o:['Einzelkosten','Gemeinkosten','Fixkosten','Opportunitätskosten'], a:0, e:'Einzelkosten = direkt zurechenbar. Gemeinkosten (Miete, Strom) werden per Zuschlag verteilt.'},
{q:'In C2 steht =B2*$E$1. Die Formel wird nach C3 kopiert. Was steht in C3?', o:['=B3*$E$1','=B3*$E$2','=B2*$E$1','=C3*$F$1'], a:0, e:'B2 ist relativ und wird zu B3, $E$1 ist absolut und bleibt fest.'},
{q:'Welche Formel gibt "teuer" aus, wenn B2 größer als 1000 ist, sonst "ok"?', o:['=WENN(B2>1000;"teuer";"ok")','=WENN(B2>1000;"ok";"teuer")','=SUMME(B2>1000;"teuer")','=SVERWEIS(B2;1000;"teuer")'], a:0, e:'WENN(Prüfung; Dann-Wert; Sonst-Wert).'},
{q:'Was liefert =SVERWEIS(4711;A2:C100;3;FALSCH)?', o:['die Summe der Spalte C','den Wert aus Spalte 3 der Zeile, in der in Spalte A genau 4711 steht','die Zeilennummer von 4711','die Anzahl der Treffer'], a:1, e:'Suchkriterium; Matrix; Spaltenindex; FALSCH = exakte Übereinstimmung. Gesucht wird immer in der ersten Spalte der Matrix.'},
{q:'Was begrenzt ein WIP-Limit auf einem Kanban-Board?', o:['die Projektdauer','die Anzahl gleichzeitig bearbeiteter Aufgaben in einer Spalte','das Budget','die Teamgröße'], a:1, e:'Work in Progress begrenzen: weniger parallel, schneller fertig.'}
],
write:[
{task:'Berechnen Sie für folgende Vorgänge FAZ, FEZ, SAZ, SEZ und Gesamtpuffer, geben Sie die Projektdauer und den kritischen Pfad an: A Analyse 2 Tage (kein Vorgänger), B Datenbank 5 Tage (nach A), C Oberfläche 3 Tage (nach A), D Test 2 Tage (nach B und C).',
 keys:[['B: FAZ 2, FEZ 7',/\bB\b[^\n]{0,40}\b2\b[^\n]{0,10}\b7\b/],['D: FAZ 7, FEZ 9',/\bD\b[^\n]{0,40}\b7\b[^\n]{0,10}\b9\b/],['C: SAZ 4, SEZ 7, GP 2',/\bC\b[^\n]{0,60}\b4\b[^\n]{0,10}\b7\b[^\n]{0,10}\b2\b/],['Projektdauer 9 Tage',/dauer[^\n]{0,20}\b9\b|\b9\s*tage/i],['kritischer Pfad A, B, D',/kritisch[^\n]*A\s*[-–>,]+\s*B\s*[-–>,]+\s*D/i]],
 model:`Vorgang  Dauer  FAZ  FEZ  SAZ  SEZ  GP
A        2      0    2    0    2    0
B        5      2    7    2    7    0
C        3      2    5    4    7    2
D        2      7    9    7    9    0

Vorwärts: FEZ = FAZ + Dauer, D startet beim größten FEZ der Vorgänger (max(7; 5) = 7).
Rückwärts: SAZ = SEZ - Dauer, A endet spätestens beim kleinsten SAZ der Nachfolger (min(2; 4) = 2).
GP = SAZ - FAZ.
Projektdauer: 9 Tage.
Kritischer Pfad: A - B - D (alle GP = 0).`},
{task:'Für ein Projekt arbeiten ein Entwickler 120 Stunden (Stundensatz 75 €) und eine Projektleiterin 30 Stunden (Stundensatz 90 €), dazu kommen 2.000 € Sachkosten. a) Berechnen Sie die Projektkosten. b) In einer Tabelle stehen die Stunden in B2:B3, die Stundensätze in C2:C3 und ein Gemeinkostenzuschlag von 10 % in F1. Schreiben Sie die Formel für D2 (Personalkosten inklusive Zuschlag), die sich nach D3 kopieren lässt, und begründen Sie den absoluten Bezug.',
 keys:[['Entwickler 9.000 €',/9[.\s]?000/],['Projektleiterin 2.700 €',/2[.\s]?700/],['Gesamt 13.700 €',/13[.\s]?700/],['Formel mit B2*C2',/=\s*b2\s*\*\s*c2/i],['absoluter Bezug $F$1',/\$f\$1/i],['Begründung: bleibt beim Kopieren fest',/kopier|fest|ver(ä|ae)ndert sich nicht|bleibt/i]],
 model:`a) Entwickler: 120 h × 75 € = 9.000 €
   Projektleiterin: 30 h × 90 € = 2.700 €
   Personalkosten: 11.700 €
   + Sachkosten: 2.000 €
   Projektkosten: 13.700 €

b) D2: =B2*C2*(1+$F$1)
   B2 und C2 sind relativ und werden beim Kopieren nach D3 zu B3 und C3.
   $F$1 ist absolut, weil der Zuschlag nur in einer Zelle steht und beim Kopieren fest bleiben muss.`}
]},

{
id:'sec2', area:'GA1', prio:1, title:'IT-Sicherheit 2: Login, OAuth, SSO, Zertifikate, Backup', mins:25,
why:'Login-Konzepte, Zertifikate und Backups tauchen in GA1 und GA2 immer wieder auf, oft als Pseudocode oder Fallbeispiel.',
clip:[],
videos:[],
quiz:[
{q:'Ein Nutzer ist angemeldet. Das System prüft nun, ob er die Lohnakten öffnen darf. Was passiert hier?', o:['Authentifizierung','Autorisierung','Verschlüsselung','Hashing'], a:1, e:'Authentifizierung = Wer bist du? Autorisierung = Was darfst du?'},
{q:'Anmeldung mit Passwort und Fingerabdruck. Welche Faktoren werden kombiniert?', o:['Wissen und Besitz','Wissen und Inhärenz','Besitz und Inhärenz','zweimal Wissen'], a:1, e:'Passwort = Wissen, Fingerabdruck = Inhärenz (Sein).'},
{q:'Was bedeutet Least Privilege?', o:['Alle bekommen Admin-Rechte, um Tickets zu sparen','Jeder bekommt nur die Rechte, die er für seine Aufgabe braucht','Rechte werden nur einmal im Jahr vergeben','Nur der Chef hat Rechte'], a:1, e:'Prinzip der minimalen Rechte, umgesetzt über ein Rollen- und Berechtigungskonzept.'},
{q:'Wer stellt bei OAuth 2.0 die Access Tokens aus?', o:['Resource Owner','Client','Authorization Server','Resource Server'], a:2, e:'Der Authorization Server authentifiziert den Nutzer und stellt die Tokens aus. Der Resource Server prüft sie.'},
{q:'Was ergänzt OpenID Connect (OIDC) gegenüber OAuth 2.0?', o:['Verschlüsselung der Festplatte','Informationen zur Identität des Nutzers über ein ID-Token','ein neues Passwort-Hashverfahren','Backups'], a:1, e:'OAuth regelt Zugriff (Autorisierung), OIDC ergänzt die Anmeldung (Authentifizierung).'},
{q:'Was ist ein typischer Nachteil von Single Sign-on?', o:['Nutzer müssen sich mehr Passwörter merken','Single Point of Failure: Fällt der Anmeldedienst aus oder wird das Konto gekapert, ist alles betroffen','SSO funktioniert nur offline','mehr Logins pro Tag'], a:1, e:'Vorteile: ein Login, weniger Passwörter, zentrale Verwaltung. Nachteil: ein zentraler Angriffs- und Ausfallpunkt.'},
{q:'Was enthält ein Zertifikat NICHT?', o:['den öffentlichen Schlüssel','den Inhaber','die Gültigkeitsdauer','den privaten Schlüssel des Inhabers'], a:3, e:'Der private Schlüssel verlässt nie den Inhaber. Das Zertifikat enthält Schlüssel, Inhaber, Gültigkeit und die Signatur der CA.'},
{q:'Warum speichert man Passwörter mit Salt?', o:['damit man sie wieder entschlüsseln kann','damit gleiche Passwörter unterschiedliche Hashes ergeben und vorberechnete Tabellen nutzlos sind','damit der Hash kürzer wird','weil MD5 sonst zu langsam ist'], a:1, e:'Salt = Zufallswert pro Nutzer. Rainbow Tables helfen dann nicht mehr.'},
{q:'Vollsicherung am Sonntag, inkrementelle Sicherungen Montag bis Donnerstag. Freitag früh fällt der Server aus. Was brauchst du zur Wiederherstellung?', o:['nur die Sicherung vom Donnerstag','Vollsicherung plus Donnerstag','Vollsicherung plus alle Sicherungen von Montag bis Donnerstag','Montag bis Donnerstag ohne Vollsicherung'], a:2, e:'Inkrementell sichert nur seit der letzten Sicherung, also wird jede Teilsicherung gebraucht, in der richtigen Reihenfolge.'},
{q:'Gleiche Situation, aber differenzielle Sicherungen Montag bis Donnerstag. Was brauchst du?', o:['Vollsicherung plus Donnerstag','Vollsicherung plus Montag bis Donnerstag','nur Donnerstag','nur die Vollsicherung'], a:0, e:'Differenziell sichert alles seit der letzten Vollsicherung, die letzte Differenz enthält also alle Änderungen.'},
{q:'Welcher DNS-Eintrag legt fest, welche Mailserver für eine Domain E-Mails versenden dürfen?', o:['SPF','DKIM','DMARC','S/MIME'], a:0, e:'SPF = erlaubte Server. DKIM = Signatur. DMARC = Regel, was bei Fehlschlag passiert, plus Berichte.'},
{q:'Eine fremde Webseite löst im Browser des angemeldeten Nutzers unbemerkt eine Überweisung aus. Welche Gegenmaßnahme hilft gegen diesen CSRF-Angriff?', o:['Prepared Statements','CSRF-Token im Formular','Ausgaben escapen','größere Festplatte'], a:1, e:'Der Server akzeptiert nur Anfragen mit dem geheimen, zufälligen Token aus dem eigenen Formular.'}
],
write:[
{task:'Schreiben Sie Pseudocode für eine Funktion pruefeLogin(benutzername, passwort). Sie holt den Nutzer mit gespeichertem Salt und Hash aus der Datenbank, prüft das eingegebene Passwort und sperrt das Konto nach 5 Fehlversuchen. Rückgabe: wahr oder falsch.',
 keys:[['Funktion',/funktion/i],['Salt verwenden',/salt/i],['Hash berechnen und vergleichen',/hash/i],['Verzweigung',/falls|wenn|if/i],['Fehlversuche zählen',/fehlversuch|versuche|z(ä|ae)hler/i],['Konto sperren',/sperr/i],['Rückgabe',/r(ü|ue)ckgabe|return/i]],
 model:`funktion pruefeLogin(benutzername, passwort)
  nutzer = db.holeNutzer(benutzername)
  falls nutzer == null oder nutzer.gesperrt dann
    rückgabe falsch
  ende falls
  hash = argon2(passwort, nutzer.salt)
  falls hash == nutzer.hash dann
    nutzer.fehlversuche = 0
    db.speichere(nutzer)
    rückgabe wahr
  sonst
    nutzer.fehlversuche = nutzer.fehlversuche + 1
    falls nutzer.fehlversuche >= 5 dann
      nutzer.gesperrt = wahr
    ende falls
    db.speichere(nutzer)
    rückgabe falsch
  ende falls
ende funktion`},
{task:'Die Kanzlei sichert ihren Fileserver jeden Sonntag voll. Erläutern Sie den Unterschied zwischen inkrementeller und differenzieller Sicherung, geben Sie jeweils an, welche Sicherungen bei einem Ausfall am Freitag benötigt werden, und erklären Sie die 3-2-1-Regel.',
 keys:[['inkrementell: seit letzter Sicherung',/inkrementell[\s\S]{0,80}letzten\s+sicherung/i],['differenziell: seit letzter Vollsicherung',/differenziell[\s\S]{0,80}vollsicherung/i],['Restore inkrementell: Voll plus alle',/alle[\s\S]{0,40}(inkrement|teilsicherung)|montag bis donnerstag/i],['Restore differenziell: Voll plus letzte',/letzte\s+differenz/i],['3 Kopien',/(3|drei)\s+kopien/i],['2 verschiedene Medien',/(2|zwei)\s+(verschiedenen?|unterschiedlichen?)\s+medien|(2|zwei)\s+medien/i],['1 Kopie außer Haus',/au(ß|ss)er\s*haus|extern|offsite|anderen\s+ort/i]],
 model:`Inkrementell: sichert nur die Änderungen seit der letzten Sicherung (egal ob voll oder inkrementell). Schnell und platzsparend, aber aufwendige Wiederherstellung.
Wiederherstellung am Freitag: Vollsicherung vom Sonntag plus alle inkrementellen Sicherungen von Montag bis Donnerstag in der richtigen Reihenfolge.

Differenziell: sichert alle Änderungen seit der letzten Vollsicherung. Die Sicherungen wachsen täglich, dafür ist die Wiederherstellung einfach.
Wiederherstellung am Freitag: Vollsicherung vom Sonntag plus die letzte Differenzsicherung vom Donnerstag.

3-2-1-Regel: 3 Kopien der Daten, auf 2 verschiedenen Medien, davon 1 Kopie außer Haus (extern, idealerweise offline), damit Brand, Diebstahl oder Ransomware nicht alle Kopien treffen.`}
]}
];
