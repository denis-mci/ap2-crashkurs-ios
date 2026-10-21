// GA2 Erklärclips, neue Lektionen Block A, Format v2
const CLIPS_NEU_A = {

pseudo3: [
{h:'Jeder Baustein zählt', v:{list:['Signatur: funktion name(parameter)','Initialisierung: summe = 0, max = erstes Element','Schleife mit richtigen Grenzen','Bedingung im falls','Rückgabe am Ende']},
 beats:[
  {say:'Pseudocode kommt in jeder AP2. Die Daten stecken oft in Objekten, 2D-Arrays oder Strings.', show:{item:1}},
  {say:'Gute Nachricht: Es gibt Teilpunkte. Signatur und Initialisierung bringen schon die ersten.', show:{item:2}},
  {say:'Dazu Schleife, Bedingung und Rückgabe. Wenn du nicht weiterweißt, schreib hin, so weit du kommst. Nie leer lassen.', show:{item:5}}
 ]},
{h:'Objekte: neu, get, set', v:{code:`k = neu Konto("Gies", 500.0)
k.einzahlen(200.0)
ausgabe(k.getSaldo())      // 700.0
k.setInhaber("Ruf")

funktion summeSalden(konten)
  summe = 0
  für jedes k in konten
    falls k.getSaldo() > 0 dann
      summe = summe + k.getSaldo()
    ende falls
  ende für
  rückgabe summe
ende funktion`},
 beats:[
  {say:'Ein Objekt erzeugst du mit neu und dem Konstruktor. Danach rufst du Methoden mit Punkt auf.', show:{lines:[1,2]}},
  {say:'Attribute sind privat. Also liest du sie mit dem Getter und änderst sie mit dem Setter.', show:{lines:[3,4]}},
  {say:'Über eine Liste von Objekten läufst du mit für jedes und rufst pro Objekt den Getter auf.', show:{lines:[6,8]}},
  {say:'Filtern und Summieren wie gewohnt. Maximum geht genauso: mit dem ersten Objekt starten und per Getter vergleichen.', show:{lines:[9,14]}}
 ]},
{h:'Methode aus dem Klassendiagramm', v:{code:`Konto
- saldo: Double
- dispo: Double
+ abheben(betrag: Double): Boolean
methode abheben(betrag)
  falls betrag <= 0 dann
    werfe Fehler("Betrag ungültig")
  ende falls
  falls saldo + dispo < betrag dann
    rückgabe falsch
  ende falls
  saldo = saldo - betrag
  rückgabe wahr
ende methode`},
 beats:[
  {say:'Gegeben ist ein Klassendiagramm. Minus heißt privat, Plus heißt öffentlich. Du sollst abheben implementieren.', show:{lines:[1,4]}},
  {say:'Erst die Eingabe prüfen: Betrag null oder negativ? Dann wirfst du einen Fehler. Null oder leere Werte prüfst du genauso.', show:{lines:[5,8]}},
  {say:'Der Aufrufer fängt den Fehler mit versuche und fange ab. Das ist try und catch.', show:{lines:[5,8]}},
  {say:'Dann die Deckungsprüfung. Reichen saldo plus dispo nicht, gibst du falsch zurück. Sonst abbuchen und wahr. Das sind Return-Codes.', show:{lines:[9,14]}}
 ]},
{h:'2D-Array: erst Zeile, dann Spalte', v:{code:`m = [[3, 5, 2],
     [1, 4, 6]]
m[1][2]          → 6
laenge(m)        → 2 Zeilen
laenge(m[0])     → 3 Spalten
für z = 0 bis laenge(m) - 1
  summe = 0
  für s = 0 bis laenge(m[0]) - 1
    summe = summe + m[z][s]
  ende für
  ausgabe(summe)       // 10, dann 11
ende für`},
 beats:[
  {say:'Ein 2D-Array ist eine Tabelle. Der erste Index ist die Zeile, der zweite die Spalte. m 1 2 ist also die 6.', show:{lines:[1,3]}},
  {say:'laenge von m liefert die Zeilen, laenge von m 0 die Spalten der ersten Zeile.', show:{lines:[4,5]}},
  {say:'Für die Zeilensumme zwei verschachtelte Schleifen. summe startet in jeder Zeile neu bei 0. Raus kommt 10, dann 11.', show:{lines:[6,12]}},
  {say:'Für Spaltensummen tauschst du die Schleifen. Duplikate findest du auch mit zwei Schleifen: jedes Element mit allen danach vergleichen.', show:{lines:[6,12]}}
 ],
 check:{q:'Welchen Wert hat m 0 1?', o:['5','1','3'], a:0, e:'Zeile 0 ist 3, 5, 2. Spalte 1 davon ist die 5.'}},
{h:'Strings und CSV', v:{code:`s = "Anna"
laenge(s)             → 4
s[0]                  → "A"
teilstring(s, 1, 3)   → "nn"
zeile = "4711;Gies;1200"
teile = zeile.split(";")
teile[1]              → "Gies"
umgedreht = ""
für i = laenge(s) - 1 bis 0 schritt -1
  umgedreht = umgedreht + s[i]
ende für
falls klein(s) == klein(umgedreht) dann
  ausgabe("Palindrom")
ende falls`},
 beats:[
  {say:'Ein String ist wie ein Array aus Zeichen. Index startet bei 0, das letzte Zeichen hat Index Länge minus 1. Teilstring hier bis ausschließlich 3.', show:{lines:[1,4]}},
  {say:'Eine CSV-Zeile zerlegst du mit split am Semikolon. Index 1 ist der zweite Wert, hier Gies.', show:{lines:[5,7]}},
  {say:'Umdrehen: rückwärts von hinten nach vorn laufen und Zeichen anhängen. Zeichen zählen ist das Zählmuster mit einem Zähler.', show:{lines:[8,11]}},
  {say:'Ist der umgedrehte String gleich dem Original, ist es ein Palindrom. Schreib dazu, ob Groß und klein egal sind.', show:{lines:[12,14]}}
 ]},
{h:'Zinsen über n Jahre', v:{anim:'trace', code:`kapital = 1000
zins = 0.05
für jahr = 1 bis 3
  kapital = kapital + kapital * zins
ende für`, vars:['jahr','kapital'], rows:[['-','1000'],['1','1050'],['2','1102,5'],['3','1157,63']]},
 beats:[
  {say:'Klassiker: Zinsen über mehrere Jahre. Jedes Jahr kommen 5 Prozent auf das aktuelle Kapital. Das ist der Zinseszins.', show:{rows:1}},
  {say:'Jahr 1: 1000 plus 50 ergibt 1050.', show:{rows:2}},
  {say:'Jahr 2: 1050 plus 52,50 ergibt 1102,50.', show:{rows:3}},
  {say:'Jahr 3: rund 1157,63 Euro. Genau so spielst du jeden Code im Schreibtischtest Zeile für Zeile durch.', show:{rows:4}}
 ]},
{h:'Fehlersuche: 3 Fehler finden', v:{code:`funktion login(pw)
  versuche = 1
  ok = falsch
  solange versuche < 3 und nicht ok
    eingabe = lies()
    falls eingabe = pw dann
      ok = wahr
    ende falls
  ende solange
  rückgabe ok
ende funktion`},
 beats:[
  {say:'Typische Aufgabe: Markieren und korrigieren Sie 3 Fehler. Ein Login mit maximal 3 Versuchen.', show:{lines:[1,1]}},
  {say:'Fehler 1: Start bei 1 und kleiner als 3 ergibt nur 2 Versuche. Off by one. Start bei 0 wäre richtig.', show:{lines:[2,4]}},
  {say:'Fehler 2: Im falls steht ein einfaches Gleich. Das ist eine Zuweisung. Zum Vergleichen brauchst du das doppelte Gleich.', show:{lines:[5,6]}},
  {say:'Fehler 3: versuche wird nie erhöht. Bei falschem Passwort ist das eine Endlosschleife. Achte auch auf fehlende Rückgabe.', show:{lines:[7,11]}}
 ],
 check:{q:'Angenommen, versuche wird erhöht. Wie viele Versuche erlaubt die Schleife dann?', o:['2','3','4'], a:0, e:'versuche ist 1 und 2, bei 3 ist Schluss. Also nur 2 Versuche.'}}
],

sql4: [
{h:'Daten übertragen', v:{code:`INSERT INTO AuftragArchiv
  (AuftragID, MandantID, Honorar)
SELECT AuftragID, MandantID, Honorar
FROM Auftrag
WHERE Datum < '2025-01-01';`},
 beats:[
  {say:'Im Sommer 2026 kam genau das dran: Daten von einer Tabelle in eine andere übertragen.', show:{lines:[1,2]}},
  {say:'Statt VALUES schreibst du einfach ein SELECT. Spaltenzahl und Reihenfolge müssen zur Zielliste passen.', show:{lines:[3,5]}},
  {say:'Alle Zeilen, die das SELECT liefert, landen im Archiv. Danach löschst du sie mit DELETE und demselben WHERE.', show:{lines:[1,5]}}
 ]},
{h:'Subselect in UPDATE und DELETE', v:{code:`UPDATE Auftrag SET Honorar = Honorar * 1.1
WHERE MandantID IN
  (SELECT MandantID FROM Mandant
   WHERE Ort = 'Fulda');

DELETE FROM Mandant
WHERE NOT EXISTS
  (SELECT * FROM Auftrag a
   WHERE a.MandantID = Mandant.MandantID);`},
 beats:[
  {say:'UPDATE mit Subselect: Erhöhe die Honorare aller Mandanten aus Fulda. IN prüft gegen die Liste aus dem Subselect.', show:{lines:[1,4]}},
  {say:'NOT EXISTS ist wahr, wenn das Subselect keine einzige Zeile liefert. Hier werden Mandanten ohne Auftrag gelöscht.', show:{lines:[6,9]}},
  {say:'Das Subselect greift auf die äußere Zeile zu. Das heißt korrelierte Unterabfrage, sie läuft für jede Zeile neu.', show:{lines:[8,9]}},
  {say:'Falle bei NOT IN: Liefert das Subselect ein NULL, kommt gar keine Zeile raus. NOT EXISTS ist da sicherer.', show:{lines:[1,9]}}
 ],
 check:{q:'Welche Mandanten löscht das DELETE?', o:['Mandanten ohne Auftrag','Mandanten mit Auftrag','Alle Mandanten'], a:0, e:'NOT EXISTS ist wahr, wenn kein Auftrag zum Mandanten existiert.'}},
{h:'Self-Join: Chef und Mitarbeiter', v:{anim:'join',
  left:{name:'Mitarbeiter m', cols:['m.MaID','m.Name','m.ChefID'], rows:[[1,'Weber','NULL'],[2,'Koch',1],[3,'Schmitt',2],[4,'Becker',2]]},
  right:{name:'Mitarbeiter c', cols:['c.MaID','c.Name','c.ChefID'], rows:[[1,'Weber','NULL'],[2,'Koch',1],[3,'Schmitt',2],[4,'Becker',2]]},
  on:[2,0], type:'inner'},
 beats:[
  {say:'Self-Join: Eine Tabelle wird mit sich selbst verbunden. ChefID zeigt auf die MaID derselben Tabelle.', show:{step:0}},
  {say:'Du nimmst die Tabelle zweimal mit zwei Aliasen, m und c. Verbunden wird ChefID von m mit MaID von c.', show:{step:1}},
  {say:'Koch hat Weber als Chef, Schmitt und Becker haben Koch. Weber hat keinen Chef und fehlt beim INNER JOIN.', show:{step:2}},
  {say:'Mit LEFT JOIN bleibt Weber drin. RIGHT JOIN behält alle Zeilen rechts, FULL JOIN alle von beiden Seiten.', show:{step:2}}
 ],
 check:{q:'Wer ist der Chef von Becker?', o:['Weber','Koch','Schmitt'], a:1, e:'Becker hat ChefID 2, und MaID 2 ist Koch.'}},
{h:'3 Tabellen und UNION', v:{code:`SELECT ma.Name, a.Art
FROM Mitarbeiter ma
JOIN Mitarbeiter_Auftrag ma_a
  ON ma.MaID = ma_a.MaID
JOIN Auftrag a
  ON ma_a.AuftragID = a.AuftragID;

SELECT Ort FROM Mandant
UNION
SELECT Ort FROM Interessent;
-- Mandant: Fulda, Erfurt, Fulda
-- Interessent: Fulda
-- UNION: 2 Zeilen, UNION ALL: 4`},
 beats:[
  {say:'n zu m: Ein Mitarbeiter arbeitet an vielen Aufträgen und umgekehrt. Dazwischen liegt eine Zwischentabelle.', show:{lines:[1,4]}},
  {say:'Also zwei JOINs: erst zur Zwischentabelle, dann weiter zum Auftrag. Bei 3 Tabellen brauchst du 2 ON-Bedingungen.', show:{lines:[5,6]}},
  {say:'UNION hängt Ergebnisse untereinander. Beide SELECTs brauchen gleich viele Spalten mit passenden Datentypen.', show:{lines:[8,10]}},
  {say:'UNION entfernt Duplikate, also 2 Zeilen. UNION ALL behält alle, also 4. INTERSECT ist die Schnittmenge, EXCEPT die Differenz.', show:{lines:[11,13]}}
 ]},
{h:'Zählen, Rechnen, Muster', v:{code:`SELECT COUNT(*), COUNT(Ort),
       COUNT(DISTINCT Ort)
FROM Mandant;
-- Orte: Fulda, Erfurt, Fulda, NULL
-- Ergebnis: 4 | 3 | 2

SELECT Art, Honorar * 1.19 AS Brutto
FROM Auftrag
WHERE Art LIKE '_o%'
ORDER BY Honorar DESC
LIMIT 3;`},
 beats:[
  {say:'Die Orte sind Fulda, Erfurt, Fulda und einmal NULL. COUNT mit Stern zählt alle Zeilen, also 4.', show:{lines:[1,4]}},
  {say:'NULL-Falle: COUNT Ort zählt NULL nicht mit, also 3. COUNT DISTINCT zählt nur verschiedene Werte, also 2.', show:{lines:[5,5]}},
  {say:'Im SELECT darfst du rechnen, hier mal 1,19. Bei LIKE steht der Unterstrich für genau ein Zeichen, Prozent für beliebig viele.', show:{lines:[7,9]}},
  {say:'ORDER BY DESC mit LIMIT 3 liefert die 3 teuersten. LIMIT gibt es in MySQL, in SQL Server heißt das TOP.', show:{lines:[10,11]}}
 ]},
{h:'Referentielle Integrität', v:{table:[['ON DELETE','Mandant gelöscht, seine Aufträge'],['CASCADE','werden mitgelöscht'],['SET NULL','bekommen MandantID NULL'],['RESTRICT','Löschen wird verweigert'],['Reihenfolge','Einfügen: erst Mandant. Löschen: erst Auftrag']]},
 beats:[
  {say:'Referentielle Integrität heißt: Jeder Fremdschlüssel zeigt auf einen existierenden Datensatz. Was passiert, wenn ein Mandant gelöscht wird?', show:{rows:1}},
  {say:'CASCADE löscht seine Aufträge mit. SET NULL setzt den Fremdschlüssel auf NULL.', show:{rows:2}},
  {say:'RESTRICT verweigert das Löschen, solange noch Aufträge auf den Mandanten verweisen.', show:{rows:3}},
  {say:'Einfügen immer erst den Mandanten, dann den Auftrag. Bei RESTRICT löschst du genau andersrum, erst die Aufträge.', show:{rows:4}}
 ]},
{h:'So knackst du schwere Abfragen', v:{list:['FROM und JOIN: welche Tabellen?','WHERE: welche Zeilen?','GROUP BY und HAVING: welche Gruppen?','SELECT und ORDER BY: was wird ausgegeben?','Gegen Beispieldaten durchspielen']},
 beats:[
  {say:'Geschrieben wird SELECT zuerst, ausgewertet aber FROM und JOIN. Bau deine Abfrage genau in dieser Reihenfolge.', show:{item:1}},
  {say:'Dann WHERE für die Zeilen, danach GROUP BY und HAVING für die Gruppen.', show:{item:3}},
  {say:'Erst ganz zum Schluss SELECT und ORDER BY. Und dann spielst du die Abfrage gegen die Beispieldaten durch.', show:{item:5}}
 ]}
],

db2: [
{h:'500 Euro verschwunden', v:{code:`UPDATE Konto SET Saldo = Saldo - 500
WHERE KontoID = 1;
-- Stromausfall!
UPDATE Konto SET Saldo = Saldo + 500
WHERE KontoID = 2;`},
 beats:[
  {say:'Eine Überweisung. Die Abbuchung läuft durch, dann fällt der Strom aus.', show:{lines:[1,3]}},
  {say:'Die Gutschrift passiert nie. 500 Euro sind weg. Genau dafür gibt es Transaktionen, und dazu kommen Theoriefragen mit schnellen Punkten.', show:{lines:[4,5]}}
 ]},
{h:'Transaktion: alles oder nichts', v:{code:`BEGIN;
UPDATE Konto SET Saldo = Saldo - 500
WHERE KontoID = 1;
UPDATE Konto SET Saldo = Saldo + 500
WHERE KontoID = 2;
COMMIT;
-- bei Fehler: ROLLBACK;`},
 beats:[
  {say:'BEGIN startet die Transaktion. In MySQL geht auch START TRANSACTION.', show:{lines:[1,1]}},
  {say:'Beide Buchungen gehören zusammen in eine Transaktion.', show:{lines:[2,5]}},
  {say:'COMMIT speichert alles dauerhaft. Geht etwas schief, nimmt ROLLBACK alles seit BEGIN zurück.', show:{lines:[6,7]}}
 ]},
{h:'ACID an der Überweisung', v:{table:[['ACID','heißt','bei der Überweisung'],['Atomarität','ganz oder gar nicht','beide Buchungen oder keine'],['Konsistenz','gültig vorher und nachher','Summe der Salden stimmt'],['Isolation','Parallele stören sich nicht','keiner sieht Zwischenstand'],['Dauerhaftigkeit','nach COMMIT gespeichert','übersteht Absturz']]},
 beats:[
  {say:'Atomarität: ganz oder gar nicht. Konsistenz: Die Datenbank ist vorher und nachher gültig.', show:{rows:2}},
  {say:'Isolation: Parallele Transaktionen stören sich nicht. Dauerhaftigkeit: Nach dem COMMIT übersteht alles auch einen Absturz.', show:{rows:4}},
  {say:'Ohne Isolation droht ein Lost Update. A und B lesen beide 1000, A bucht 200 dazu, B zieht 100 ab.', show:{rows:4, hl:[3,1]}},
  {say:'B schreibt zuletzt, also stehen 900 drin statt 1100. Die Änderung von A ist verloren. Dagegen helfen Sperren.', show:{rows:4, hl:[3,1]}}
 ],
 check:{q:'Abbuchung klappt, Gutschrift scheitert, beides wird zurückgenommen. Welche Eigenschaft?', o:['Atomarität','Dauerhaftigkeit','Isolation'], a:0, e:'Atomarität heißt ganz oder gar nicht.'}},
{h:'Dokument-Datenbank', v:{code:`{
  "_id": 4711,
  "name": "Bäckerei Gies",
  "ort": "Fulda",
  "auftraege": [
    { "art": "Steuer", "honorar": 1200 },
    { "art": "Lohn", "honorar": 400 }
  ]
}`},
 beats:[
  {say:'Eine dokumentenorientierte Datenbank wie MongoDB speichert JSON-Dokumente. Ein Dokument ist hier ein Mandant.', show:{lines:[1,4]}},
  {say:'Die Aufträge stecken verschachtelt drin. Statt zwei Tabellen mit Fremdschlüssel bettest du sie ins Dokument ein.', show:{lines:[5,8]}},
  {say:'Schemafrei, jedes Dokument darf andere Felder haben. Du liest alles mit einem Zugriff, JOINs sind nur eingeschränkt möglich.', show:{lines:[9,9]}},
  {say:'Sie skaliert horizontal auf viele Server. Die Redundanz hier ist gewollt, für schnelles Lesen. Ungewollte Redundanz führt zu Anomalien.', show:{lines:[1,9]}}
 ]},
{h:'NoSQL-Typen, CAP und BASE', v:{table:[['Typ','Prinzip','Beispiel'],['Dokument','JSON-Dokumente','MongoDB'],['Key-Value','Schlüssel und Wert','Redis, Session-Cache'],['Spaltenorientiert','Spaltenfamilien, riesige Mengen','Cassandra'],['Graph','Knoten und Kanten','Neo4j, Netzwerke']]},
 beats:[
  {say:'Neben Dokument-Datenbanken gibt es Key-Value-Stores. Ein Schlüssel, ein Wert, extrem schnell, zum Beispiel für Sessions.', show:{rows:2}},
  {say:'Spaltenorientierte Datenbanken für riesige Datenmengen. Graphdatenbanken für Beziehungen als Knoten und Kanten.', show:{rows:4}},
  {say:'CAP: Bei einer Netztrennung kann ein verteiltes System nicht gleichzeitig Konsistenz und Verfügbarkeit garantieren.', show:{rows:4}},
  {say:'Darum oft BASE statt ACID. Eventually Consistent heißt: Die Daten sind nach einer Weile auf allen Knoten gleich.', show:{rows:4}}
 ],
 check:{q:'Wer kennt wen in einem Netzwerk. Welcher Typ passt?', o:['Graph','Key-Value','Spaltenorientiert'], a:0, e:'Beziehungen als Knoten und Kanten sind die Stärke von Graphdatenbanken.'}},
{h:'Index, View, Trigger', v:{code:`CREATE INDEX idx_name ON Mandant(Name);

CREATE VIEW FuldaMandanten AS
  SELECT MandantID, Name FROM Mandant
  WHERE Ort = 'Fulda';

CREATE TRIGGER trg_log AFTER UPDATE
ON Auftrag FOR EACH ROW
  INSERT INTO Protokoll (AuftragID, Zeit)
  VALUES (NEW.AuftragID, NOW());`},
 beats:[
  {say:'Ein Index ist wie das Stichwortverzeichnis im Buch. Lesen und Suchen werden schneller.', show:{lines:[1,1]}},
  {say:'Aber jedes INSERT und UPDATE muss den Index mitpflegen. Schreiben wird langsamer, und er braucht Speicher.', show:{lines:[1,1]}},
  {say:'Eine View ist eine gespeicherte Abfrage, wie eine virtuelle Tabelle. Sie vereinfacht Abfragen, Rechte vergibst du nur auf die View.', show:{lines:[3,5]}},
  {say:'Ein Trigger läuft automatisch bei INSERT, UPDATE oder DELETE, hier fürs Protokoll. Eine Stored Procedure rufst du selbst auf.', show:{lines:[7,10]}}
 ]},
{h:'Datenqualität beim Import', v:{list:['Vollständig: Pflichtfelder gefüllt?','Korrekt und plausibel: Gründungsjahr 2091?','Konsistent und eindeutig: keine Dubletten','Aktuell: Adresse noch gültig?','CSV-Fallen: Trennzeichen, Encoding, Kopfzeile']},
 beats:[
  {say:'Vor dem Import prüfst du die Datenqualität. Vollständig, korrekt, und plausibel. Ein Gründungsjahr 2091 fällt bei der Plausibilitätsprüfung auf.', show:{item:2}},
  {say:'Konsistent und eindeutig, also keine Dubletten. Und aktuell. Dazu Formatprüfungen, zum Beispiel PLZ mit 5 Ziffern.', show:{item:4}},
  {say:'CSV-Fallen: Deutsches Excel trennt oft mit Semikolon statt Komma. Und die Kopfzeile ist kein Datensatz.', show:{item:5}},
  {say:'Das falsche Encoding zerschießt Umlaute. Dann steht statt Müller Zeichensalat da. Encoding vorher festlegen.', show:{item:5}}
 ]}
],

qs: [
{h:'Tests schreiben, nicht nur erklären', v:{stat:'3 A', sub:'Arrange, Act, Assert: das Gerüst für jeden Unit-Test'},
 beats:[
  {say:'Testen kam in 6 von 9 Prüfungen seit Winter 2021. Unit-Tests musst du nicht nur erklären, sondern auch schreiben können.', show:{}},
  {say:'Das Gerüst ist immer gleich: Arrange, Act, Assert. Merk dir 3 A.', show:{}}
 ]},
{h:'Ein Unit-Test in JUnit', v:{code:`@Test
void brutto() {
  var r = new Rechnung(100.0); // Arrange
  double ist = r.brutto();     // Act
  assertEquals(119.0, ist, 0.001); // Assert
}

@Test
void negativWirft() {
  assertThrows(
    IllegalArgumentException.class,
    () -> new Rechnung(-5.0));
}`},
 beats:[
  {say:'Arrange: Du baust die Testdaten auf, hier eine Rechnung über 100 Euro netto.', show:{lines:[1,3]}},
  {say:'Act: Du rufst genau die Methode auf, die du testest.', show:{lines:[4,4]}},
  {say:'Assert: assertEquals, erst der erwartete Wert, dann der tatsächliche. Bei Kommazahlen kommt eine Toleranz dazu.', show:{lines:[5,6]}},
  {say:'Fehlerfälle testest du mit assertThrows. Bei negativem Betrag muss eine Exception fliegen, sonst schlägt der Test fehl.', show:{lines:[8,13]}}
 ],
 check:{q:'Was steht in assertEquals zuerst?', o:['Der erwartete Wert','Der tatsächliche Wert'], a:0, e:'assertEquals erwartet, ist. Hier 119 erwartet.'}},
{h:'Gute Unit-Tests', v:{table:[['Eigenschaft','heißt'],['schnell','Millisekunden, oft ausführbar'],['isoliert','keine echte Datenbank, kein Netz'],['wiederholbar','immer gleiches Ergebnis'],['selbstprüfend','grün oder rot, ohne Nachschauen']]},
 beats:[
  {say:'Gute Unit-Tests sind schnell und isoliert. Kein Zugriff auf die echte Datenbank, kein Netz.', show:{rows:2}},
  {say:'Sie sind wiederholbar und selbstprüfend. Der Test sagt selbst grün oder rot.', show:{rows:4}},
  {say:'Statt der echten Datenbank nimmst du ein Testdouble. Ein Stub liefert nur feste Antworten.', show:{rows:4}},
  {say:'Ein Mock prüft zusätzlich, ob und wie er aufgerufen wurde.', show:{rows:4}}
 ]},
{h:'Die Testpyramide', v:{table:[['Ebene','Anzahl','Tempo'],['End-to-End, UI','wenige','langsam'],['Integration','mittel','mittel'],['Unit','viele','schnell']]},
 beats:[
  {say:'Oben wenige End-to-End-Tests über die Oberfläche. Die sind langsam und teuer.', show:{rows:1}},
  {say:'In der Mitte Integrationstests. Unten das breite Fundament: viele schnelle Unit-Tests.', show:{rows:3}},
  {say:'Ein Smoke-Test prüft nach dem Deployment nur grob, ob die Anwendung startet und der Login geht.', show:{rows:3}},
  {say:'Ein Lasttest prüft viele Nutzer gleichzeitig. Der Regressionstest prüft, ob nach einer Änderung Altes kaputt ist.', show:{rows:3}}
 ],
 check:{q:'Wovon schreibst du am meisten?', o:['Unit-Tests','End-to-End-Tests','Integrationstests'], a:0, e:'Unit-Tests bilden das breite Fundament der Pyramide.'}},
{h:'Testkonzept und Testprotokoll', v:{table:[['Testfall','Soll','Ist','Ergebnis'],['T1 gültig: 100','119','119','bestanden'],['T2 Grenze: 0','0','0','bestanden'],['T3 ungültig: -5','Exception','-5,95','nicht bestanden']]},
 beats:[
  {say:'Vorher legt ein Testkonzept fest: Testobjekte, Testziele, Teststufen und Testumgebung.', show:{rows:1}},
  {say:'Dazu Testdaten, anonymisiert, nie echte Mandantendaten. Und Endekriterien und wer verantwortlich ist.', show:{rows:1}},
  {say:'Die Testfälle kommen aus Äquivalenzklassen und Grenzwerten. Im Protokoll stehen Soll, Ist, Ergebnis, Datum und Tester.', show:{rows:2}},
  {say:'T3 ist nicht bestanden. Soll war eine Exception, Ist ist minus 5,95. Das geht als Fehler an die Entwicklung.', show:{rows:3, hl:[3,4]}}
 ]},
{h:'Clean Code und Review', v:{code:`// vorher
double b(double x) {
  return x * 1.19;
}
// nachher
static final double UST = 0.19;
double brutto(double netto) {
  return netto * (1 + UST);
}`},
 beats:[
  {say:'Was macht b von x? Keiner weiß es. Clean Code heißt zuerst: sprechende Namen.', show:{lines:[1,4]}},
  {say:'Nachher ist es klar. Das ist Refactoring: Struktur verbessern, Verhalten bleibt gleich, abgesichert durch Tests.', show:{lines:[5,9]}},
  {say:'Dazu kleine Funktionen. DRY: nichts doppelt. KISS: so einfach wie möglich. YAGNI: nichts auf Vorrat bauen.', show:{lines:[1,9]}},
  {say:'Vor dem Merge prüft ein Kollege den Pull Request, Vier-Augen-Prinzip mit Checkliste. Ein Linter findet Probleme ohne Ausführung.', show:{lines:[1,9]}}
 ]},
{h:'Fehlerarten und Debugging', v:{table:[['Fehlerart','Wann','Beispiel'],['Syntaxfehler','beim Kompilieren','Semikolon fehlt'],['Laufzeitfehler','beim Ausführen, Absturz','Division durch 0'],['Logikfehler','läuft, Ergebnis falsch','> statt >=']]},
 beats:[
  {say:'Syntaxfehler findet schon der Compiler, zum Beispiel ein fehlendes Semikolon.', show:{rows:1}},
  {say:'Laufzeitfehler knallen beim Ausführen, etwa Division durch 0 oder ein Index außerhalb des Arrays.', show:{rows:2}},
  {say:'Logikfehler sind gemein: Das Programm läuft, rechnet aber falsch. Zum Beispiel größer statt größer gleich.', show:{rows:3}},
  {say:'Zum Debuggen setzt du einen Breakpoint. Step over führt die Zeile aus, Step into springt in die aufgerufene Methode.', show:{rows:3}}
 ]}
]

};
