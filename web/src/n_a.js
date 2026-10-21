// GA2: neue Lektionen, Block A
const L_NEU_A = [
{
id:'pseudo3', area:'GA2', prio:1, title:'Pseudocode: Objekte, 2D-Arrays, Strings', mins:30,
why:'Pseudocode kam in jeder AP2 von Winter 2021 bis Winter 2025 dran. Die Aufgaben arbeiten oft mit Objekten aus dem Klassendiagramm, 2D-Arrays, Strings oder lassen dich Fehler in fremdem Code finden.',
clip:[],
videos:[],
quiz:[
{q:'m = [[3, 5, 2],\n     [1, 4, 6]]\n\nWas liefert laenge(m[0])?', type:'input', a:['3'], e:'m[0] ist die erste Zeile [3, 5, 2]. Ihre Länge ist die Spaltenzahl 3. laenge(m) wäre die Zeilenzahl 2.'},
{q:'m = [[3, 5, 2],\n     [1, 4, 6]]\n\nWelchen Wert hat m[1][0]?', type:'input', a:['1'], e:'Erst die Zeile, dann die Spalte. Zeile 1 ist [1, 4, 6], Spalte 0 davon ist 1.'},
{q:'Das Attribut saldo der Klasse Konto ist privat (-). Wie liest du es außerhalb der Klasse?', o:['k.saldo','k.getSaldo()','Konto.saldo','saldo(k)'], a:1, e:'Private Attribute liest du über den öffentlichen Getter, geändert wird über den Setter.'},
{q:'s = "Beleg"\nausgabe(s[laenge(s) - 1])\n\nWas wird ausgegeben?', type:'input', a:['g','"g"'], e:'laenge(s) ist 5, der letzte Index also 4. s[4] ist "g".'},
{q:'zeile = "4711;Gies;1200"\nteile = zeile.split(";")\n\nWas steht in teile[2]?', type:'input', a:['1200','"1200"'], e:'split zerlegt in ["4711", "Gies", "1200"]. Index 2 ist das dritte Element.'},
{q:'kapital = 1000\nfür jahr = 1 bis 2\n  kapital = kapital + kapital * 0.05\nende für\n\nWelchen Wert hat kapital am Ende?', type:'input', a:['1102,5','1102.5','1102,50','1102.50'], e:'Jahr 1: 1000 + 50 = 1050. Jahr 2: 1050 + 52,50 = 1102,50. Zinseszins, weil immer vom aktuellen Kapital gerechnet wird.'},
{q:'methode abheben(betrag)\n  falls saldo + dispo < betrag dann\n    rückgabe falsch\n  ende falls\n  saldo = saldo - betrag\n  rückgabe wahr\nende methode\n\nsaldo = 100, dispo = 50. Was passiert bei abheben(160)?', o:['Rückgabe wahr, saldo ist -60','Rückgabe falsch, saldo bleibt 100','Es wird ein Fehler geworfen','Rückgabe wahr, saldo ist 0'], a:1, e:'100 + 50 = 150 ist kleiner als 160. Die Deckung reicht nicht, also Rückgabe falsch, ohne abzubuchen.'},
{q:'versuche = 1\nsolange versuche < 3 und nicht ok\n  ...\n  versuche = versuche + 1\nende solange\n\nWie viele Login-Versuche erlaubt diese Schleife?', type:'input', a:['2'], e:'Durchläufe mit versuche = 1 und 2, bei 3 bricht sie ab. Off-by-one: Für 3 Versuche mit 0 starten oder <= 3 schreiben.'},
{q:'In einer Aufgabe steht: falls eingabe = pw dann. Was ist der Fehler?', o:['= ist eine Zuweisung, zum Vergleichen braucht man ==','pw muss großgeschrieben werden','Es fehlt ein sonst','Kein Fehler'], a:0, e:'Ein einfaches = weist zu. Für den Vergleich steht == (oder klar beschrieben: "ist gleich").'},
{q:'Eine Methode wirft bei ungültigem Betrag einen Fehler. Womit fängt der Aufrufer ihn ab?', o:['werfe','versuche ... fange','falls ... sonst','rückgabe -1'], a:1, e:'versuche/fange entspricht try/catch. werfe (throw) löst den Fehler aus, fange (catch) behandelt ihn.'},
{q:'zahlen = [4, 2, 4, 7, 2]\nanzahl = 0\nfür i = 0 bis laenge(zahlen) - 2\n  für j = i + 1 bis laenge(zahlen) - 1\n    falls zahlen[i] == zahlen[j] dann\n      anzahl = anzahl + 1\n    ende falls\n  ende für\nende für\n\nWelchen Wert hat anzahl am Ende?', type:'input', a:['2'], e:'Jedes Element wird mit allen danach verglichen. Gleich sind Index 0 und 2 (die 4) sowie Index 1 und 4 (die 2).'},
{q:'Du weißt bei einer Pseudocode-Aufgabe nicht weiter. Was bringt die meisten Punkte?', o:['Leer lassen und Zeit sparen','Signatur, Initialisierung, Schleife und Rückgabe hinschreiben, so weit du kommst','Nur einen Satz Erklärung schreiben','Die Aufgabe in Java statt Pseudocode lösen'], a:1, e:'Bewertet wird in Teilschritten. Signatur, Initialisierung, Schleife, Bedingung und Rückgabe bringen jeweils eigene Punkte.'}
],
write:[
{task:'Gegeben ist die Klasse Mandant mit den Methoden getName(): String und getHonorar(): Double. Schreiben Sie in Pseudocode eine Funktion topMandant(mandanten), die den Namen des Mandanten mit dem höchsten Honorar zurückgibt. Ist die Liste null oder leer, soll ein Fehler geworfen werden.',
 keys:[['Signatur topMandant(mandanten)',/funktion\s+topMandant\s*\(/i],['Prüfung auf null oder leer',/null|leer|laenge\s*\(\s*mandanten\s*\)\s*(==|=)\s*0/i],['Fehler werfen',/werfe|throw/i],['Start mit erstem Element',/mandanten\s*\[\s*0\s*\]/i],['Schleife',/(f(ü|ue)r|solange|for|while|each|jede)/i],['Vergleich per Getter',/getHonorar\s*\(\s*\)\s*>/i],['Rückgabe des Namens',/(r(ü|ue)ckgabe|return)\s+\w+\.getName\s*\(\s*\)/i]],
 model:`funktion topMandant(mandanten)
  falls mandanten == null oder laenge(mandanten) == 0 dann
    werfe Fehler("Keine Mandanten")
  ende falls
  bester = mandanten[0]
  für jeden m in mandanten
    falls m.getHonorar() > bester.getHonorar() dann
      bester = m
    ende falls
  ende für
  rückgabe bester.getName()
ende funktion`},
{task:'Die folgende Funktion soll für jede Zeile eines 2D-Arrays m die Zeilensumme ausgeben. Markieren und korrigieren Sie 3 Fehler.\n\n1 funktion zeilensummen(m)\n2   summe = 0\n3   für z = 0 bis laenge(m)\n4     für s = 0 bis laenge(m[0]) - 1\n5       summe = m[z][s]\n6     ende für\n7     ausgabe(summe)\n8   ende für\n9 ende funktion',
 keys:[['Zeile 3: bis laenge(m) - 1',/laenge\s*\(\s*m\s*\)\s*-\s*1/i],['Off-by-one benannt',/off.?by.?one|au(ß|ss)erhalb|index/i],['summe = 0 in die äußere Schleife',/summe\s*=\s*0[\s\S]*(innerhalb|(ä|ae)u(ß|ss)ere|pro\s+zeile|jede\s+zeile)/i],['Zeile 5: summe = summe + m[z][s]',/summe\s*=\s*summe\s*\+\s*m\s*\[\s*z\s*\]\s*\[\s*s\s*\]|summe\s*\+=\s*m\s*\[/i]],
 model:`Fehler 1, Zeile 3: Off-by-one. Die Schleife läuft bis laenge(m) und greift auf einen Index außerhalb des Arrays zu.
Korrektur: für z = 0 bis laenge(m) - 1

Fehler 2, Zeile 2: Falsche Initialisierung. summe = 0 muss innerhalb der äußeren Schleife stehen (vor der inneren Schleife), damit die Summe pro Zeile neu bei 0 startet.

Fehler 3, Zeile 5: Es wird zugewiesen statt addiert.
Korrektur: summe = summe + m[z][s]`}
]},

{
id:'sql4', area:'GA2', prio:1, title:'SQL Profi: Daten übertragen, Subselects, UNION', mins:30,
why:'SQL kommt in jeder AP2. Die schweren Teilaufgaben verlangen Daten übertragen, Subselects, Self-Joins oder n:m-Joins. INSERT INTO mit SELECT kam im Sommer 2026 dran.',
clip:[],
videos:[],
quiz:[
{q:'Du willst alle Aufträge vor 2025 in die Tabelle Archiv kopieren. Welche Anweisung ist richtig?', o:['INSERT INTO Archiv (AuftragID, Honorar) SELECT AuftragID, Honorar FROM Auftrag WHERE Datum < \'2025-01-01\';','INSERT INTO Archiv VALUES (SELECT * FROM Auftrag);','SELECT INTO Archiv FROM Auftrag VALUES (*);','UPDATE Archiv SET (SELECT * FROM Auftrag);'], a:0, e:'Beim Übertragen ersetzt das SELECT die VALUES-Klausel. Spaltenzahl und Reihenfolge müssen zur Zielspaltenliste passen.'},
{q:'WHERE MandantID NOT IN (SELECT MandantID FROM Auftrag)\n\nDas Subselect liefert auch einen NULL-Wert. Was passiert?', o:['Es kommen keine Zeilen heraus','NULL wird einfach ignoriert','Es gibt eine Fehlermeldung','Es kommen alle Zeilen heraus'], a:0, e:'Ein Vergleich mit NULL ist nie wahr, darum ist NOT IN dann für keine Zeile wahr. NOT EXISTS hat diese Falle nicht.'},
{q:'Wann ist WHERE NOT EXISTS (Subselect) für eine Zeile wahr?', o:['Wenn das Subselect keine einzige Zeile liefert','Wenn das Subselect NULL liefert','Wenn das Subselect genau eine Zeile liefert','Immer'], a:0, e:'EXISTS fragt nur: Gibt es mindestens eine Zeile? NOT EXISTS ist wahr, wenn es keine gibt.'},
{q:'Mandant.Ort: Fulda, Erfurt, Fulda\nInteressent.Ort: Fulda\n\nSELECT Ort FROM Mandant\nUNION ALL\nSELECT Ort FROM Interessent;\n\nWie viele Zeilen kommen heraus?', type:'input', a:['4'], e:'UNION ALL behält Duplikate: 3 + 1 = 4. Mit UNION wären es nur 2 (Fulda, Erfurt).'},
{q:'Was müssen zwei SELECTs für UNION erfüllen?', o:['Gleiche Spaltenzahl und passende Datentypen','Gleiche Tabellennamen','Einen gemeinsamen Primärschlüssel','Beide brauchen GROUP BY'], a:0, e:'UNION hängt Zeilen untereinander, darum müssen die Spalten zusammenpassen.'},
{q:'Mitarbeiter(MaID, Name, ChefID)\n1 Weber NULL\n2 Koch 1\n3 Schmitt 2\n\nSELECT m.Name, c.Name\nFROM Mitarbeiter m\nJOIN Mitarbeiter c ON m.ChefID = c.MaID;\n\nWer steht als Chef neben Schmitt?', type:'input', a:['koch'], e:'Schmitt hat ChefID 2, MaID 2 ist Koch. Self-Join: dieselbe Tabelle zweimal mit zwei Aliasen.'},
{q:'Du verbindest Mitarbeiter, Mitarbeiter_Auftrag (n:m-Zwischentabelle) und Auftrag. Wie viele ON-Bedingungen brauchst du?', type:'input', a:['2'], e:'Bei n Tabellen brauchst du n - 1 Verknüpfungen: Mitarbeiter mit Zwischentabelle und Zwischentabelle mit Auftrag.'},
{q:'Mandant.Ort: Fulda, Erfurt, Fulda, NULL\n\nWas liefert COUNT(Ort)?', type:'input', a:['3'], e:'COUNT(spalte) zählt NULL nicht mit. COUNT(*) würde 4 liefern.'},
{q:'Mandant.Ort: Fulda, Erfurt, Fulda, NULL\n\nWas liefert COUNT(DISTINCT Ort)?', type:'input', a:['2'], e:'Nur verschiedene Werte ohne NULL: Fulda und Erfurt.'},
{q:"Welche Art trifft WHERE Art LIKE '_o%'?", o:['Lohn','Steuer','Prüfung','Abschluss'], a:0, e:'_ steht für genau ein Zeichen, % für beliebig viele. Das zweite Zeichen muss also o sein.'},
{q:'Ein Mandant darf nicht gelöscht werden können, solange noch Aufträge auf ihn verweisen. Welche Regel setzt du beim Fremdschlüssel?', o:['ON DELETE CASCADE','ON DELETE SET NULL','ON DELETE RESTRICT','UNION ALL'], a:2, e:'RESTRICT verweigert das Löschen. CASCADE würde die Aufträge mitlöschen, SET NULL den Fremdschlüssel leeren.'},
{q:'In welcher Reihenfolge wertet die Datenbank eine Abfrage logisch aus?', o:['SELECT, FROM, WHERE, GROUP BY, HAVING','FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY','WHERE, FROM, SELECT, HAVING, GROUP BY','ORDER BY, SELECT, FROM, WHERE'], a:1, e:'Geschrieben wird SELECT zuerst, ausgewertet aber zuerst FROM und JOIN. So baust du schwere Abfragen auch auf.'}
],
write:[
{task:"Die Kanzlei archiviert alte Aufträge. Schreiben Sie SQL-Anweisungen, die alle Aufträge mit einem Datum vor dem 01.01.2025 in die Tabelle AuftragArchiv(AuftragID, MandantID, Honorar, Datum) übertragen und sie anschließend aus Auftrag löschen. Tabelle: Auftrag(AuftragID, MandantID, Art, Honorar, Datum).",
 keys:[['INSERT INTO AuftragArchiv',/insert\s+into\s+auftragarchiv/i],['Zielspalten angegeben',/auftragarchiv\s*\(\s*auftragid/i],['SELECT statt VALUES',/\)\s*select\s+auftragid/i],["WHERE Datum < '2025-01-01'",/where\s+datum\s*<\s*'2025-01-01'/i],['DELETE FROM Auftrag mit WHERE',/delete\s+from\s+auftrag\s+where/i]],
 model:`INSERT INTO AuftragArchiv (AuftragID, MandantID, Honorar, Datum)
SELECT AuftragID, MandantID, Honorar, Datum
FROM Auftrag
WHERE Datum < '2025-01-01';

DELETE FROM Auftrag
WHERE Datum < '2025-01-01';`},
{task:'Geben Sie für jeden Mitarbeiter seinen Namen und den Namen seines Vorgesetzten aus. Mitarbeiter ohne Vorgesetzten sollen ebenfalls erscheinen. Tabelle: Mitarbeiter(MaID, Name, ChefID), ChefID verweist auf MaID.',
 keys:[['LEFT JOIN',/left\s+(outer\s+)?join/i],['Tabelle zweimal mit Aliasen',/from\s+mitarbeiter\s+(as\s+)?\w+\s+left\s+(outer\s+)?join\s+mitarbeiter\s+(as\s+)?\w+/i],['ON ChefID = MaID',/on\s+\w+\.chefid\s*=\s*\w+\.maid|on\s+\w+\.maid\s*=\s*\w+\.chefid/i],['Spaltenalias für den Chef',/\.name\s+as\s+\w+/i]],
 model:`SELECT m.Name, c.Name AS Vorgesetzter
FROM Mitarbeiter m
LEFT JOIN Mitarbeiter c ON m.ChefID = c.MaID;`}
]},

{
id:'db2', area:'GA2', prio:1, title:'Datenbanken 2: NoSQL, Transaktionen, Index, View', mins:25,
why:'Neben SQL-Code fragt die AP2 Datenbank-Theorie ab. NoSQL, Transaktionen mit ACID, Index, View, Trigger und Datenqualität beim Import sind schnelle Punkte mit kurzen Antworten.',
clip:[],
videos:[],
quiz:[
{q:'Bei einer Überweisung klappt die Abbuchung, die Gutschrift scheitert. Alles wird zurückgenommen. Welche ACID-Eigenschaft ist das?', o:['Atomarität','Konsistenz','Isolation','Dauerhaftigkeit'], a:0, e:'Atomarität: ganz oder gar nicht. Beide Buchungen oder keine.'},
{q:'Mit welchem Befehl machst du die Änderungen einer Transaktion dauerhaft?', o:['ROLLBACK','COMMIT','BEGIN','GRANT'], a:1, e:'COMMIT speichert endgültig, ROLLBACK nimmt alles seit BEGIN zurück.'},
{q:'Saldo 1000. Transaktion A liest 1000 und schreibt 1000 + 200. Gleichzeitig liest B ebenfalls 1000 und schreibt 1000 - 100. B schreibt zuletzt.\n\nWelcher Saldo steht am Ende in der Datenbank?', type:'input', a:['900'], e:'Lost Update: B überschreibt das Ergebnis von A. Richtig wäre 1100. Dagegen hilft Isolation, zum Beispiel durch Sperren.'},
{q:'Welche Aussage zu einem Index stimmt?', o:['Lesen und Suchen werden schneller, Schreiben wird langsamer','Schreiben wird schneller, Lesen langsamer','Ein Index spart Speicherplatz','Ein Index ersetzt den Primärschlüssel'], a:0, e:'Der Index muss bei jedem INSERT, UPDATE und DELETE mitgepflegt werden und braucht zusätzlich Speicher.'},
{q:'Was ist eine View?', o:['Eine gespeicherte Abfrage, die wie eine virtuelle Tabelle genutzt wird','Eine Kopie einer Tabelle','Ein Index auf mehreren Spalten','Ein Backup der Datenbank'], a:0, e:'Die View speichert die Abfrage, nicht die Daten. Sie vereinfacht Abfragen und du kannst Rechte nur auf die View vergeben.'},
{q:'Jede Honoraränderung soll automatisch in eine Protokolltabelle geschrieben werden. Was nutzt du?', o:['Trigger','View','Index','UNION'], a:0, e:'Ein Trigger läuft automatisch bei INSERT, UPDATE oder DELETE.'},
{q:'Was ist typisch für eine dokumentenorientierte Datenbank wie MongoDB?', o:['JSON-Dokumente, verschachtelt, schemaflexibel, horizontal skalierbar','Feste Tabellen mit Fremdschlüsseln und vielen JOINs','Nur Schlüssel-Wert-Paare ohne Struktur','Nur Knoten und Kanten'], a:0, e:'Zusammengehörige Daten stecken in einem Dokument. JOINs sind nur eingeschränkt möglich, dafür liest du alles mit einem Zugriff.'},
{q:'Die Kanzlei will abbilden, welche Mitarbeiter mit welchen Mandanten und Partnern vernetzt sind. Welcher NoSQL-Typ passt am besten?', o:['Graphdatenbank','Key-Value-Store','Spaltenorientierte Datenbank'], a:0, e:'Beziehungen als Knoten und Kanten sind die Stärke von Graphdatenbanken, zum Beispiel Neo4j.'},
{q:'Was bedeutet "Eventually Consistent" bei BASE?', o:['Die Daten sind nach einer Weile auf allen Knoten konsistent','Die Daten sind immer sofort konsistent','Die Daten werden nie konsistent','Konsistenz gibt es nur nach COMMIT'], a:0, e:'BASE verzichtet auf sofortige Konsistenz zugunsten von Verfügbarkeit. ACID verlangt sie sofort.'},
{q:'Beim CSV-Import steht bei einem Mandanten das Gründungsjahr 2091. Welche Prüfung schlägt an?', o:['Plausibilitätsprüfung','Encoding-Prüfung','Dublettenprüfung','Vollständigkeitsprüfung'], a:0, e:'Der Wert hat das richtige Format, ist aber unmöglich. Das fängt die Plausibilitätsprüfung.'},
{q:'Nach dem Import steht "MÃ¼ller" statt "Müller". Was ist die Ursache?', o:['Falsches Encoding, zum Beispiel UTF-8 als ANSI gelesen','Falsches Trennzeichen','Fehlende Kopfzeile','Eine Dublette'], a:0, e:'Umlaute werden bei falscher Zeichenkodierung zerschossen. Encoding vor dem Import festlegen.'},
{q:'Wann ist Redundanz gewollt?', o:['Wenn sie bewusst geplant ist, zum Beispiel für schnellere Lesezugriffe','Immer, weil mehr Daten sicherer sind','Wenn Daten sich widersprechen','Nie, in keinem Fall'], a:0, e:'Ungewollte Redundanz führt zu Anomalien, darum normalisierst du. Gewollte Redundanz ist kontrolliert, etwa in Dokument-Datenbanken.'}
],
write:[
{task:'Die Kanzlei will Mandanten mit ihren Aufträgen in einer dokumentenorientierten Datenbank speichern. Relational gibt es Mandant(MandantID, Name, Ort) und Auftrag(AuftragID, MandantID, Art, Honorar). Modellieren Sie einen Mandanten mit zwei Aufträgen als JSON-Dokument und nennen Sie je einen Vorteil und einen Nachteil gegenüber der relationalen Lösung.',
 keys:[['JSON-Dokument mit geschweiften Klammern',/\{[\s\S]*\}/],['Felder name und ort',/"name"\s*:[\s\S]*"ort"\s*:/i],['Aufträge als eingebettetes Array',/"auftr(ä|ae)ge"\s*:\s*\[/i],['Vorteil (kein JOIN, schnell, skalierbar, flexibel)',/vorteil[\s\S]*(join|schnell|skalier|flexib|schema)/i],['Nachteil (Redundanz, Konsistenz, Abfragen über Dokumente)',/nachteil[\s\S]*(redundan|konsisten|join|abfrage|auswert)/i]],
 model:`{
  "_id": 4711,
  "name": "Bäckerei Gies",
  "ort": "Fulda",
  "auftraege": [
    { "auftragId": 10, "art": "Steuer", "honorar": 1200 },
    { "auftragId": 11, "art": "Lohn", "honorar": 400 }
  ]
}

Vorteil: Mandant und Aufträge werden mit einem Zugriff ohne JOIN gelesen, das Schema ist flexibel und die Datenbank skaliert horizontal.
Nachteil: Auswertungen über alle Aufträge hinweg sind aufwendiger, und kopierte Daten führen zu Redundanz, die man selbst konsistent halten muss.`},
{task:'Erläutern Sie die vier ACID-Eigenschaften am Beispiel einer Überweisung von 500 Euro von Konto 1 auf Konto 2 und schreiben Sie die Überweisung als SQL-Transaktion. Tabelle: Konto(KontoID, Saldo).',
 keys:[['Atomarität',/atomar/i],['Konsistenz',/konsisten/i],['Isolation',/isolat/i],['Dauerhaftigkeit',/dauerhaft|durab|persist/i],['BEGIN / START TRANSACTION',/begin|start\s+transaction/i],['COMMIT',/commit/i],['ROLLBACK im Fehlerfall',/rollback/i]],
 model:`Atomarität: Abbuchung und Gutschrift werden ganz oder gar nicht ausgeführt.
Konsistenz: Vorher und nachher ist die Datenbank gültig, die Summe beider Salden bleibt gleich.
Isolation: Parallele Transaktionen sehen keinen Zwischenstand, es gibt kein Lost Update.
Dauerhaftigkeit: Nach dem COMMIT ist die Überweisung gespeichert und übersteht auch einen Absturz.

BEGIN;
UPDATE Konto SET Saldo = Saldo - 500 WHERE KontoID = 1;
UPDATE Konto SET Saldo = Saldo + 500 WHERE KontoID = 2;
COMMIT;
-- tritt ein Fehler auf: ROLLBACK;`}
]},

{
id:'qs', area:'GA2', prio:1, title:'Unit-Tests, Testkonzept, Clean Code', mins:25,
why:'Testen kam in 6 von 9 Prüfungen seit Winter 2021. Unit-Tests schreiben, Testkonzept, Testprotokoll und Clean Code gehören zu den offenen Fragen dazu.',
clip:[],
videos:[],
quiz:[
{q:'In welcher Reihenfolge ist ein Unit-Test aufgebaut?', o:['Arrange, Act, Assert','Act, Arrange, Assert','Assert, Act, Arrange','Arrange, Assert, Act'], a:0, e:'Testdaten aufbauen, Methode aufrufen, Ergebnis prüfen.'},
{q:'assertEquals(119.0, r.brutto(), 0.001);\n\nWas ist 119.0?', o:['Der erwartete Wert','Der tatsächliche Wert','Die Toleranz','Die Nummer des Testfalls'], a:0, e:'JUnit: assertEquals(erwartet, ist). Der dritte Wert ist die Toleranz für Kommazahlen.'},
{q:'Wie prüfst du in JUnit, dass new Rechnung(-5.0) eine Exception wirft?', o:['assertThrows','assertEquals','assertNotNull','Gar nicht, Exceptions testet man nicht'], a:0, e:'assertThrows(IllegalArgumentException.class, () -> new Rechnung(-5.0)) schlägt fehl, wenn keine Exception fliegt.'},
{q:'Testfall T3: Eingabe -5, Soll: Exception, Ist: -5,95.\n\nWas trägst du im Testprotokoll als Ergebnis ein?', o:['nicht bestanden','bestanden','nicht testbar'], a:0, e:'Soll und Ist weichen ab, also nicht bestanden. Der Fehler geht als Ticket an die Entwicklung.'},
{q:'Ein Testdouble ersetzt die echte Datenbank und liefert nur feste Antworten. Wie heißt es?', o:['Stub','Mock','Linter','Breakpoint'], a:0, e:'Ein Stub liefert vorbereitete Antworten. Ein Mock prüft zusätzlich, ob und wie er aufgerufen wurde.'},
{q:'Ein Unit-Test greift auf die echte Produktionsdatenbank zu. Welche Eigenschaft guter Unit-Tests verletzt er vor allem?', o:['isoliert','selbstprüfend','lesbar','dokumentiert'], a:0, e:'Unit-Tests sollen unabhängig von Datenbank, Netz und anderen Tests laufen. Sonst sind sie langsam und nicht wiederholbar.'},
{q:'Wovon schreibst du laut Testpyramide am meisten?', o:['Unit-Tests','Integrationstests','End-to-End-Tests'], a:0, e:'Unten viele schnelle Unit-Tests, in der Mitte weniger Integrationstests, oben wenige langsame E2E-Tests.'},
{q:'Nach dem Deployment prüfst du kurz, ob die Anwendung startet und der Login funktioniert. Welche Testart ist das?', o:['Smoke-Test','Lasttest','Regressionstest','Abnahmetest'], a:0, e:'Ein Smoke-Test prüft nur grob, ob das System überhaupt läuft.'},
{q:'Welche Testdaten gehören in die Testumgebung einer Steuerkanzlei?', o:['Anonymisierte oder künstlich erzeugte Daten','Echte Mandantendaten, weil sie realistisch sind','Gar keine Daten','Ein ungeprüfter Abzug der Produktion'], a:0, e:'Echte Mandantendaten unterliegen Datenschutz und Verschwiegenheit. Testdaten werden anonymisiert oder künstlich erzeugt.'},
{q:'Was ist Refactoring?', o:['Die Struktur des Codes verbessern, ohne das Verhalten zu ändern','Neue Funktionen einbauen','Fehler beim Kunden beheben','Alte Tests löschen'], a:0, e:'Abgesichert wird das durch Tests: Vorher grün, nachher grün.'},
{q:'Derselbe Codeblock zur Umsatzsteuerberechnung steht an 5 Stellen im Programm. Welches Prinzip ist verletzt?', o:['DRY','KISS','YAGNI','ACID'], a:0, e:"DRY heißt Don't Repeat Yourself. Die Berechnung gehört in eine Funktion."},
{q:'Ein Programm läuft ohne Absturz, gewährt den Rabatt aber erst ab 101 statt ab 100 Euro. Welche Fehlerart ist das?', o:['Logikfehler','Syntaxfehler','Laufzeitfehler'], a:0, e:'Es läuft, rechnet aber falsch, typisch > statt >=. Syntaxfehler findet der Compiler, Laufzeitfehler führen zum Absturz.'}
],
write:[
{task:'Die Methode brutto(netto) der Klasse Rechner berechnet den Bruttobetrag mit 19 Prozent Umsatzsteuer. Bei negativem Nettobetrag wirft sie eine IllegalArgumentException. Schreiben Sie zwei Unit-Tests (Java mit JUnit oder Pseudocode): einen für einen gültigen Wert und einen für den Fehlerfall. Kennzeichnen Sie Arrange, Act und Assert.',
 keys:[['Arrange, Act, Assert gekennzeichnet',/arrange[\s\S]*act[\s\S]*assert/i],['Testmethode',/@test|testfall|test\w*\s*\(/i],['assertEquals mit erwartetem Wert',/assertEquals\s*\(\s*119/i],['Fehlerfall mit assertThrows',/assertThrows|erwarte\w*\s+(exception|fehler)/i],['negativer Testwert',/brutto\s*\(\s*-\s*\d/i]],
 model:`@Test
void bruttoGueltig() {
  // Arrange
  Rechner r = new Rechner();
  // Act
  double ist = r.brutto(100.0);
  // Assert
  assertEquals(119.0, ist, 0.001);
}

@Test
void bruttoNegativWirft() {
  // Arrange
  Rechner r = new Rechner();
  // Act und Assert
  assertThrows(IllegalArgumentException.class,
      () -> r.brutto(-5.0));
}`},
{task:'Ihr Team soll das neue Honorar-Modul der Kanzlei testen. Nennen Sie fünf Inhalte eines Testkonzepts und erläutern Sie, warum dabei keine echten Mandantendaten verwendet werden dürfen.',
 keys:[['Testobjekte',/testobjekt/i],['Testziele',/testziel/i],['Teststufen',/teststufe/i],['Testumgebung',/testumgebung|umgebung/i],['Endekriterien',/endekriter|abbruchkriter/i],['Anonymisierte Testdaten',/anonymi|pseudonym|k(ü|ue)nstlich/i],['Begründung Datenschutz oder Verschwiegenheit',/dsgvo|datenschutz|verschwiegen/i]],
 model:`Inhalte eines Testkonzepts:
1. Testobjekte: was wird getestet, hier das Honorar-Modul mit Berechnung und Rechnungsausgabe.
2. Testziele: welche Anforderungen nachgewiesen werden sollen.
3. Teststufen: Unit-, Integrations-, System- und Abnahmetest.
4. Testumgebung: eigene Testdatenbank und Testserver, getrennt von der Produktion.
5. Testdaten: anonymisiert oder künstlich erzeugt.
6. Endekriterien: zum Beispiel alle Testfälle mit Priorität hoch bestanden, keine offenen kritischen Fehler.
7. Verantwortliche und Zeitplan.

Echte Mandantendaten dürfen nicht verwendet werden, weil sie personenbezogen sind und unter die DSGVO fallen. Außerdem unterliegt die Kanzlei der beruflichen Verschwiegenheit. Testumgebungen sind oft weniger geschützt und mehr Personen haben Zugriff. Deshalb werden anonymisierte oder künstliche Testdaten verwendet.`}
]}
];
