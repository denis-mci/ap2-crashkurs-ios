// GA2 Erklärclips, Format v2
const CLIPS_GA2 = {

pseudo1: [
{h:'Das Thema mit den meisten Punkten', v:{stat:'9 von 9', sub:'Prüfungen von Winter 2021 bis Winter 2025 hatten Pseudocode'},
 beats:[
  {say:'Pseudocode kam in jeder einzelnen AP2 von Winter 2021 bis Winter 2025 dran.', show:{}},
  {say:'Kein Thema bringt mehr Punkte. Wenn du nur eine Sache lernst, dann diese.', show:{}}
 ]},
{h:'Fünf Bausteine reichen', v:{code:`x = 5
falls x > 3 dann
  ausgabe("groß")
sonst
  ausgabe("klein")
ende falls
für i = 0 bis 9
  ...
ende für
solange x > 0
  x = x - 1
ende solange`},
 beats:[
  {say:'Erst die Zuweisung, dann falls sonst. Damit entscheidet dein Programm.', show:{lines:[1,6]}},
  {say:'Die Für-Schleife nimmst du zum Zählen, wenn die Anzahl feststeht.', show:{lines:[7,9]}},
  {say:'Die Solange-Schleife nimmst du, wenn du vorher nicht weißt, wie oft sie laufen muss.', show:{lines:[10,12]}},
  {say:'Dazu eine Funktion mit Rückgabe. Die Syntax ist frei, keine Programmiersprache ist vorgeschrieben. Es zählt die Logik.', show:{lines:[1,12]}}
 ]},
{h:'Arrays: Index startet bei 0', v:{code:`zahlen = [7, 3, 9, 4]
zahlen[0]        → 7
zahlen[3]        → 4
laenge(zahlen)   → 4
letzter Index    → laenge(zahlen) - 1 = 3`},
 beats:[
  {say:'Achtung, hier passiert der häufigste Fehler der ganzen Prüfung.', show:{lines:[1,1]}},
  {say:'Arrays fangen bei Index 0 an. Index 0 ist die 7, Index 3 ist die 4.', show:{lines:[2,3]}},
  {say:'Vier Elemente heißt Indizes 0 bis 3. Der letzte Index ist also immer Länge minus 1.', show:{lines:[4,5]}}
 ],
 check:{q:'Welchen Index hat die 9 in zahlen?', o:['2','3','9'], a:0, e:'7 hat Index 0, 3 hat Index 1, 9 hat Index 2.'}},
{h:'Muster 1: Summe und Durchschnitt', v:{code:`funktion durchschnitt(werte)
  falls laenge(werte) == 0 dann
    rückgabe 0
  ende falls
  summe = 0
  für i = 0 bis laenge(werte) - 1
    summe = summe + werte[i]
  ende für
  rückgabe summe / laenge(werte)
ende funktion`},
 beats:[
  {say:'Zuerst prüfen: Ist das Array leer? Sonst teilst du durch null. Genau dafür gibt es Punkte.', show:{lines:[1,4]}},
  {say:'Dann summe auf 0 setzen. Die Schleife geht durch alle Elemente und addiert.', show:{lines:[5,8]}},
  {say:'Für den Durchschnitt teilst du am Ende durch die Anzahl.', show:{lines:[9,10]}}
 ]},
{h:'Muster 2: Maximum finden', v:{code:`funktion maximum(werte)
  max = werte[0]          // NICHT 0!
  für i = 1 bis laenge(werte) - 1
    falls werte[i] > max dann
      max = werte[i]
    ende falls
  ende für
  rückgabe max
ende funktion`},
 beats:[
  {say:'Starte max mit dem ersten Element, nicht mit null. Sind alle Werte negativ, wäre null sonst falsch.', show:{lines:[1,2]}},
  {say:'Dann vergleichst du jedes weitere Element und merkst dir das größere.', show:{lines:[3,6]}},
  {say:'Minimum geht genauso, nur mit kleiner als.', show:{lines:[7,9]}}
 ]},
{h:'Muster 3: Filtern und Zählen', v:{code:`funktion teureAuftraege(auftraege)
  ergebnis = neue Liste
  für jeden a in auftraege
    falls a.honorar > 1000 dann
      ergebnis.hinzufuegen(a)
    ende falls
  ende für
  rückgabe ergebnis
ende funktion`},
 beats:[
  {say:'Filtern: Du legst eine leere Liste an.', show:{lines:[1,2]}},
  {say:'Du gehst alle Elemente durch. Passt die Bedingung, fügst du das Element hinzu.', show:{lines:[3,7]}},
  {say:'Zählen ist das Gleiche. Statt hinzufügen rechnest du einen Zähler plus 1.', show:{lines:[8,9]}}
 ]},
{h:'Muster 4: Suchen mit Abbruch', v:{code:`funktion finde(liste, gesucht)
  i = 0
  solange i < laenge(liste)
    falls liste[i] == gesucht dann
      rückgabe i          // gefunden
    ende falls
    i = i + 1
  ende solange
  rückgabe -1             // nicht gefunden
ende funktion`},
 beats:[
  {say:'Suchen: Mit einer Solange-Schleife läufst du durch die Liste.', show:{lines:[1,3]}},
  {say:'Gefunden? Dann gibst du sofort den Index zurück. Und vergiss nie, i zu erhöhen, sonst hast du eine Endlosschleife.', show:{lines:[4,7]}},
  {say:'Findest du nichts, gibst du minus 1 zurück.', show:{lines:[8,10]}},
  {say:'Und das Wichtigste: Lass nie etwas leer. Auch eine halbe Lösung bringt Teilpunkte.', show:{lines:[1,10]}}
 ],
 check:{q:'Du vergisst die Zeile i plus 1. Was passiert?', o:['Endlosschleife','Rückgabe minus 1','Fehler beim Kompilieren'], a:0, e:'Die Bedingung bleibt immer wahr, die Schleife hört nie auf.'}}
],

pseudo2: [
{h:'Neu im Katalog seit 2025', v:{list:['Bubble Sort','Selection Sort','Insertion Sort','Lineare und binäre Suche','Rekursion']},
 beats:[
  {say:'Seit dem Katalog 2025 stehen drei Sortierverfahren ausdrücklich drin. Die kannst du nicht mehr überspringen.', show:{item:3}},
  {say:'Weiterhin im Katalog: lineare und binäre Suche und Rekursion.', show:{item:5}}
 ]},
{h:'Bubble Sort live', v:{anim:'bubble', arr:[5,1,4,2]},
 beats:[
  {say:'Bubble Sort vergleicht immer zwei Nachbarn. 5 ist größer als 1, also tauschen.', show:{step:1}},
  {say:'5 gegen 4. Wieder größer, wieder tauschen.', show:{step:2}},
  {say:'5 gegen 2, tauschen. Nach Durchlauf 1 steht da 1, 4, 2, 5. Die größte Zahl ist hinten, wie eine aufsteigende Blase.', show:{step:3}},
  {say:'Das wiederholst du n minus 1 Mal. Wird in einem Durchlauf nichts mehr getauscht, darfst du früher abbrechen.', show:{step:'end'}}
 ],
 check:{q:'Wie sah die Liste nach dem ersten Durchlauf aus?', o:['1, 4, 2, 5','1, 2, 4, 5','1, 5, 4, 2'], a:0, e:'Nur die 5 ist nach hinten gewandert. Sortiert ist erst nach weiteren Durchläufen.'}},
{h:'Bubble Sort in Pseudocode', v:{code:`für i = 0 bis n - 2
  für j = 0 bis n - 2 - i
    falls a[j] > a[j+1] dann
      temp = a[j]
      a[j] = a[j+1]
      a[j+1] = temp
    ende falls
  ende für
ende für`},
 beats:[
  {say:'Im Code sind das zwei verschachtelte Schleifen. Die innere vergleicht die Nachbarn.', show:{lines:[1,3]}},
  {say:'Zum Tauschen brauchst du die Hilfsvariable temp. Das nennt man Dreieckstausch.', show:{lines:[4,6]}},
  {say:'Ohne temp überschreibst du einen Wert. Das kommt gerne als Fehlersuche dran.', show:{lines:[7,9]}}
 ]},
{h:'Selection und Insertion Sort', v:{table:[['Verfahren','Idee'],['Bubble Sort','Nachbarn vergleichen, tauschen'],['Selection Sort','Minimum im Rest suchen, nach vorne tauschen'],['Insertion Sort','Nächstes Element links einfügen']]},
 beats:[
  {say:'Selection Sort sucht immer das kleinste Element im unsortierten Teil und tauscht es nach vorne.', show:{rows:2}},
  {say:'Insertion Sort ist wie Spielkarten auf der Hand: nächste Karte nehmen, links an die richtige Stelle stecken.', show:{rows:3}},
  {say:'Alle drei haben im schlechtesten Fall quadratische Laufzeit, O von n Quadrat.', show:{rows:3}}
 ]},
{h:'Binäre Suche: immer halbieren', v:{anim:'binsearch', arr:[2,5,8,12,16,23,38], target:23},
 beats:[
  {say:'Gesucht ist die 23. Wichtig: Die binäre Suche klappt nur bei sortierten Listen.', show:{step:0}},
  {say:'Blick in die Mitte: 12. Die 23 ist größer, also weiter in der rechten Hälfte.', show:{step:1}},
  {say:'Übrig sind 16, 23 und 38. Neue Mitte: 23.', show:{step:2}},
  {say:'Gefunden! Jeder Schritt halbiert, darum O von log n. Die lineare Suche ist O von n.', show:{step:'end'}}
 ],
 check:{q:'Was muss für die binäre Suche gelten?', o:['Die Liste ist sortiert','Die Liste hat gerade Länge'], a:0, e:'Nur bei sortierten Daten weißt du, ob links oder rechts weitergesucht wird.'}},
{h:'Rekursion: fakultaet von 4', v:{anim:'stack', calls:['fakultaet(4)','fakultaet(3)','fakultaet(2)','fakultaet(1)'], returns:['24','6','2','1']},
 beats:[
  {say:'Rekursion heißt: Eine Funktion ruft sich selbst auf, mit einem kleineren Problem.', show:{step:1}},
  {say:'Runter bis fakultaet von 1. Das ist die Abbruchbedingung. Fehlt sie, gibt es einen Stack Overflow.', show:{step:4}},
  {say:'Jetzt löst sich der Stapel von oben auf. fakultaet von 1 liefert 1, fakultaet von 2 liefert 2.', show:{step:6}},
  {say:'Dann 6 und ganz unten 24. Also 4 mal 3 mal 2 mal 1 gleich 24.', show:{step:8}}
 ]},
{h:'Laufzeiten merken', v:{table:[['O-Notation','Beispiel'],['O(1)','Zugriff auf a[3]'],['O(log n)','Binäre Suche'],['O(n)','Lineare Suche, eine Schleife'],['O(n²)','Zwei verschachtelte Schleifen']]},
 beats:[
  {say:'O von 1 ist ein direkter Zugriff. O von log n ist die binäre Suche.', show:{rows:2}},
  {say:'O von n ist eine einfache Schleife.', show:{rows:3}},
  {say:'O von n Quadrat sind zwei verschachtelte Schleifen. Also Bubble, Selection und Insertion Sort.', show:{rows:4}}
 ]}
],

sql1: [
{h:'SQL kam in jeder Prüfung', v:{stat:'9 von 9', sub:'Prüfungen hatten SQL SELECT'},
 beats:[
  {say:'SQL SELECT kam in allen 9 Prüfungen dran. Das sind sichere Punkte.', show:{}},
  {say:'Und das Beste: Die SQL-Syntax steht im Belegsatz. Du darfst nachschlagen.', show:{}}
 ]},
{h:'Das Grundgerüst', v:{code:`SELECT Name, Ort
FROM Mandant
WHERE Ort = 'Fulda'
ORDER BY Name ASC;`},
 beats:[
  {say:'SELECT sagt, welche Spalten du willst.', show:{lines:[1,1]}},
  {say:'FROM sagt, aus welcher Tabelle. Hier unsere Mandanten.', show:{lines:[2,2]}},
  {say:'WHERE filtert die Zeilen. Texte kommen in einfache Anführungszeichen.', show:{lines:[3,3]}},
  {say:'ORDER BY sortiert, ASC aufsteigend, DESC absteigend. Merksatz: Select From Where Group Having Order.', show:{lines:[4,4]}}
 ]},
{h:'Werkzeuge für WHERE', v:{code:`WHERE Honorar > 1000
WHERE Ort = 'Fulda' AND Honorar < 500
WHERE Ort IN ('Fulda', 'Erfurt')
WHERE Honorar BETWEEN 100 AND 1000
WHERE Name LIKE 'B%'   -- beginnt mit B
WHERE Ort IS NULL      -- nie = NULL`},
 beats:[
  {say:'Vergleichen mit größer oder gleich. Mehrere Bedingungen verknüpfst du mit AND und OR.', show:{lines:[1,2]}},
  {say:'IN prüft gegen eine Liste. BETWEEN prüft einen Bereich.', show:{lines:[3,4]}},
  {say:'LIKE mit Prozentzeichen als Platzhalter. B und dann Prozentzeichen heißt: beginnt mit B.', show:{lines:[5,5]}},
  {say:'Leere Werte prüfst du immer mit IS NULL. Niemals mit gleich NULL.', show:{lines:[6,6]}}
 ]},
{h:'INNER JOIN: nur mit Partner', v:{anim:'join',
  left:{name:'Mandant', cols:['MandantID','Name','Ort'], rows:[[1,'Bäckerei Gies','Fulda'],[2,'Autohaus Ruf','Erfurt'],[3,'Praxis Lenz','Fulda']]},
  right:{name:'Auftrag', cols:['AuftragID','MandantID','Art','Honorar'], rows:[[10,1,'Steuer',1200],[11,1,'Lohn',400],[12,2,'Prüfung',5000]]},
  on:[0,1], type:'inner'},
 beats:[
  {say:'Zwei Tabellen. MandantID in Auftrag ist der Fremdschlüssel. Sie zeigt, zu welchem Mandanten der Auftrag gehört.', show:{step:0}},
  {say:'Der JOIN verbindet sie über Primärschlüssel gleich Fremdschlüssel. Passende Schlüssel leuchten auf.', show:{step:1}},
  {say:'INNER JOIN liefert nur Zeilen mit Partner in beiden Tabellen. Gies zweimal, Ruf einmal.', show:{step:2}},
  {say:'Praxis Lenz hat keinen Auftrag und fehlt deshalb.', show:{step:2}}
 ],
 check:{q:'Wie viele Zeilen liefert dieser INNER JOIN?', o:['2','3','4'], a:1, e:'Gies Steuer, Gies Lohn, Ruf Prüfung. Lenz fällt raus.'}},
{h:'Der JOIN im Code', v:{code:`SELECT m.Name, a.Art, a.Honorar
FROM Mandant m
INNER JOIN Auftrag a
  ON m.MandantID = a.MandantID;`},
 beats:[
  {say:'Im Code schreibst du FROM Mandant m. Das m ist ein Alias, damit du weniger schreiben musst.', show:{lines:[1,2]}},
  {say:'Hinter ON steht immer die Verbindung: Primärschlüssel gleich Fremdschlüssel.', show:{lines:[3,4]}},
  {say:'Bei mehreren Tabellen machen Aliase die Spalten eindeutig. Und am Ende das Semikolon.', show:{lines:[1,4]}}
 ]},
{h:'LEFT JOIN: auch ohne Partner', v:{anim:'join',
  left:{name:'Mandant', cols:['MandantID','Name','Ort'], rows:[[1,'Bäckerei Gies','Fulda'],[2,'Autohaus Ruf','Erfurt'],[3,'Praxis Lenz','Fulda']]},
  right:{name:'Auftrag', cols:['AuftragID','MandantID','Art','Honorar'], rows:[[10,1,'Steuer',1200],[11,1,'Lohn',400],[12,2,'Prüfung',5000]]},
  on:[0,1], type:'left'},
 beats:[
  {say:'Jetzt der LEFT JOIN. Er nimmt alle Zeilen der linken Tabelle.', show:{step:0}},
  {say:'Gies und Ruf finden ihre Partner. Lenz findet rechts keinen.', show:{step:1}},
  {say:'Lenz bleibt trotzdem drin. In den Auftragsspalten steht dann NULL.', show:{step:2}}
 ],
 check:{q:'Bei welchem Mandanten steht im LEFT JOIN NULL?', o:['Bäckerei Gies','Autohaus Ruf','Praxis Lenz'], a:2, e:'Lenz hat keinen Auftrag, also bleiben die Auftragsspalten leer.'}},
{h:'Mandanten ohne Auftrag', v:{code:`SELECT m.Name
FROM Mandant m
LEFT JOIN Auftrag a
  ON m.MandantID = a.MandantID
WHERE a.AuftragID IS NULL;`},
 beats:[
  {say:'Klassische Prüfungsfrage: Finde alle Mandanten ohne Auftrag. Schritt eins: LEFT JOIN.', show:{lines:[1,4]}},
  {say:'Schritt zwei: WHERE AuftragID IS NULL. Übrig bleibt Praxis Lenz.', show:{lines:[5,5]}},
  {say:'Letzter Trick für die Prüfung: DISTINCT entfernt doppelte Zeilen.', show:{lines:[1,5]}}
 ]}
],

sql2: [
{h:'Die schwerere SQL-Aufgabe', v:{table:[['Funktion','liefert'],['COUNT(*)','Anzahl Zeilen'],['SUM(Honorar)','Summe'],['AVG(Honorar)','Durchschnitt'],['MIN / MAX','kleinster / größter Wert']]},
 beats:[
  {say:'Gruppieren und Aggregieren ist die typische schwerere SQL-Teilaufgabe. Basis sind Aggregatfunktionen. COUNT zählt.', show:{rows:1}},
  {say:'SUM summiert. AVG bildet den Durchschnitt.', show:{rows:3}},
  {say:'MIN und MAX finden den kleinsten und den größten Wert. Alle fassen viele Zeilen zu einem Wert zusammen.', show:{rows:4}}
 ]},
{h:'Kurz nachrechnen', v:{code:`Honorare: 1200, 400, 5000
COUNT(*)      = 3
SUM(Honorar)  = 6600
AVG(Honorar)  = 2200
MAX(Honorar)  = 5000`},
 beats:[
  {say:'Unsere drei Aufträge: 1200, 400 und 5000. COUNT ergibt 3.', show:{lines:[1,2]}},
  {say:'Die Summe ist 6600. Der Durchschnitt ist 2200.', show:{lines:[3,4]}},
  {say:'Das Maximum ist 5000.', show:{lines:[5,5]}}
 ]},
{h:'GROUP BY: pro Mandant', v:{anim:'group', cols:['Mandant','Honorar'], rows:[['Gies',1200],['Gies',400],['Ruf',5000]], fn:'SUM'},
 beats:[
  {say:'Jetzt wollen wir die Summe pro Mandant. Erst die Rohzeilen: Gies zweimal, Ruf einmal.', show:{step:0}},
  {say:'GROUP BY bildet Gruppen. Gies in einen Topf, Ruf in den anderen.', show:{step:1}},
  {say:'SUM rechnet pro Gruppe. Gies hat 1600, Ruf 5000.', show:{step:2}}
 ]},
{h:'Die goldene Regel', v:{code:`SELECT m.Name, COUNT(*) AS Anzahl,
       SUM(a.Honorar) AS Gesamt
FROM Mandant m
JOIN Auftrag a ON m.MandantID = a.MandantID
GROUP BY m.Name;

→ Bäckerei Gies | 2 | 1600
→ Autohaus Ruf  | 1 | 5000`},
 beats:[
  {say:'Pro Mandant die Anzahl mit COUNT und die Summe mit SUM. AS gibt der Spalte einen Namen.', show:{lines:[1,2]}},
  {say:'Goldene Regel: Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steckt, muss auch ins GROUP BY.', show:{lines:[3,5]}},
  {say:'Ergebnis: Gies hat 2 Aufträge mit 1600, Ruf 1 Auftrag mit 5000.', show:{lines:[6,8]}}
 ],
 check:{q:'Name steht im SELECT ohne Aggregatfunktion. Wo muss Name noch hin?', o:['Ins GROUP BY','Ins HAVING','Nirgends'], a:0, e:'Jede Nicht-Aggregat-Spalte im SELECT muss ins GROUP BY.'}},
{h:'WHERE oder HAVING?', v:{code:`SELECT m.Name, SUM(a.Honorar) AS Gesamt
FROM Mandant m
JOIN Auftrag a ON m.MandantID = a.MandantID
WHERE a.Art <> 'Lohn'
GROUP BY m.Name
HAVING SUM(a.Honorar) > 2000;`},
 beats:[
  {say:'Jetzt filtern. Zwei Werkzeuge, die ständig verwechselt werden.', show:{lines:[1,3]}},
  {say:'WHERE filtert einzelne Zeilen, und zwar vor dem Gruppieren.', show:{lines:[4,4]}},
  {say:'HAVING filtert ganze Gruppen nach dem Gruppieren. Steckt SUM oder COUNT in der Bedingung, brauchst du HAVING.', show:{lines:[5,6]}}
 ],
 check:{q:'Nur Mandanten mit Honorarsumme über 2000. Was nimmst du?', o:['WHERE','HAVING'], a:1, e:'Eine Aggregatfunktion in der Bedingung heißt HAVING.'}},
{h:'Subselect: Abfrage in der Abfrage', v:{code:`-- Aufträge über dem Durchschnitt
SELECT AuftragID, Honorar
FROM Auftrag
WHERE Honorar > (SELECT AVG(Honorar)
                 FROM Auftrag);

-- Mandanten mit Prüfungsauftrag
SELECT Name FROM Mandant
WHERE MandantID IN (SELECT MandantID
                    FROM Auftrag
                    WHERE Art = 'Prüfung');`},
 beats:[
  {say:'Ein Subselect ist eine Abfrage in der Abfrage.', show:{lines:[1,3]}},
  {say:'Die innere Abfrage liefert den Durchschnitt. Raus kommen alle Aufträge mit Honorar darüber.', show:{lines:[4,5]}},
  {say:'Oder mit IN: alle Mandanten, deren ID in der Liste der Prüfungsaufträge vorkommt.', show:{lines:[7,11]}}
 ]},
{h:'Deine Checkliste', v:{list:['Pro ... berechnen: ins GROUP BY','Bedingung mit SUM, COUNT, AVG: HAVING','Bedingung auf normale Spalte: WHERE','Vergleich mit berechnetem Wert: Subselect','mehr als: >    mindestens: >=']},
 beats:[
  {say:'Lies, was pro irgendwas berechnet werden soll. Das kommt ins GROUP BY.', show:{item:1}},
  {say:'Bedingung mit Aggregat, dann HAVING. Bedingung auf eine normale Spalte, dann WHERE.', show:{item:3}},
  {say:'Vergleich mit einem berechneten Wert, dann Subselect.', show:{item:4}},
  {say:'Und Achtung: mehr als heißt größer als. Mindestens heißt größer oder gleich.', show:{item:5}}
 ]}
],

sql3: [
{h:'Eine Zeile, alles weg', v:{code:`DELETE FROM Auftrag;`},
 beats:[
  {say:'Was macht diese Zeile? Kein WHERE, also löscht sie alle Aufträge. Die ganze Tabelle.', show:{lines:[1,1]}},
  {say:'INSERT, UPDATE und DELETE kommen fast immer als kleine Teilaufgabe. Schnelle Punkte, wenn du sauber bist.', show:{lines:[1,1]}}
 ]},
{h:'Daten ändern: DML', v:{code:`INSERT INTO Mandant (MandantID, Name, Ort)
VALUES (4, 'Café Rhön', 'Fulda');

UPDATE Auftrag
SET Honorar = Honorar * 1.05
WHERE Art = 'Lohn';

DELETE FROM Auftrag
WHERE AuftragID = 11;`},
 beats:[
  {say:'INSERT INTO fügt eine Zeile ein. Die Werte stehen hinter VALUES.', show:{lines:[1,2]}},
  {say:'UPDATE ändert bestehende Werte, mit SET.', show:{lines:[4,6]}},
  {say:'DELETE FROM löscht Zeilen.', show:{lines:[8,9]}},
  {say:'Bei UPDATE und DELETE immer ein WHERE. Ohne WHERE änderst oder löschst du die ganze Tabelle.', show:{lines:[4,9]}}
 ],
 check:{q:'Mit welchem Befehl änderst du bestehende Werte?', o:['INSERT','UPDATE','ALTER'], a:1, e:'UPDATE mit SET und WHERE.'}},
{h:'Tabellen anlegen: DDL', v:{code:`CREATE TABLE Auftrag (
  AuftragID  INT PRIMARY KEY,
  MandantID  INT NOT NULL,
  Art        VARCHAR(30),
  Honorar    DECIMAL(10,2),
  Datum      DATE,
  FOREIGN KEY (MandantID)
    REFERENCES Mandant(MandantID)
);
ALTER TABLE Auftrag ADD Status VARCHAR(20);
CREATE INDEX idx_art ON Auftrag(Art);`},
 beats:[
  {say:'CREATE TABLE legt eine Tabelle an. PRIMARY KEY macht jede Zeile eindeutig.', show:{lines:[1,3]}},
  {say:'Jede Spalte bekommt einen Datentyp. INT für ganze Zahlen, VARCHAR für Text, DECIMAL für Geldbeträge, DATE fürs Datum.', show:{lines:[4,6]}},
  {say:'FOREIGN KEY mit REFERENCES verweist auf die andere Tabelle.', show:{lines:[7,9]}},
  {say:'ALTER TABLE ändert eine Tabelle, hier kommt mit ADD eine Spalte dazu. Ein INDEX beschleunigt die Suche.', show:{lines:[10,11]}}
 ]},
{h:'Rechte: DCL', v:{code:`GRANT SELECT, INSERT ON Auftrag TO azubi;
REVOKE INSERT ON Auftrag FROM azubi;`},
 beats:[
  {say:'Rechte vergibst du mit GRANT.', show:{lines:[1,1]}},
  {say:'Und entziehst sie mit REVOKE. Jeder bekommt nur, was er wirklich braucht. Das ist das Prinzip der minimalen Rechte.', show:{lines:[2,2]}}
 ]},
{h:'Die drei Sprachteile', v:{table:[['Teil','Befehle'],['DDL Definition','CREATE, ALTER, DROP'],['DML Manipulation','SELECT, INSERT, UPDATE, DELETE'],['DCL Control','GRANT, REVOKE']]},
 beats:[
  {say:'DDL definiert Strukturen: CREATE, ALTER, DROP.', show:{rows:1}},
  {say:'DML bearbeitet Daten: SELECT, INSERT, UPDATE, DELETE.', show:{rows:2}},
  {say:'DCL regelt Rechte: GRANT und REVOKE.', show:{rows:3}}
 ],
 check:{q:'Zu welchem Sprachteil gehört ALTER TABLE?', o:['DDL','DML','DCL'], a:0, e:'ALTER ändert die Struktur, also Definition.'}},
{h:'SQL-Injection', v:{code:`Eingabe: ' OR '1'='1
sql = "SELECT * FROM User
  WHERE name = '" + eingabe + "'"
→ WHERE name = '' OR '1'='1'
→ ALLE Zeilen!

Schutz: Prepared Statements
SELECT * FROM User WHERE name = ?`},
 beats:[
  {say:'Ein Klassiker. Die Benutzereingabe wird direkt in den SQL-String geklebt.', show:{lines:[1,3]}},
  {say:'So schleust der Angreifer eigenen SQL-Code ein und bekommt alle Zeilen.', show:{lines:[4,5]}},
  {say:'Der Schutz: Prepared Statements mit Platzhaltern. Dazu Eingaben prüfen und minimale Rechte für den Datenbankbenutzer.', show:{lines:[7,8]}}
 ]}
],

test: [
{h:'Leicht verdiente Punkte', v:{stat:'6 von 9', sub:'Prüfungen seit Winter 2021 hatten Testen'},
 beats:[
  {say:'Testen kam in 6 von 9 Prüfungen seit Winter 2021 dran.', show:{}},
  {say:'Und Schreibtischtests sind leicht verdiente Punkte. Holen wir sie uns.', show:{}}
 ]},
{h:'Black-Box gegen White-Box', v:{table:[['','Black-Box','White-Box'],['Kennt Code?','Nein','Ja'],['Basis','Anforderungen','Quellcode'],['Methoden','Äquivalenzklassen, Grenzwerte','Anweisungs-, Zweigüberdeckung']]},
 beats:[
  {say:'Beim Black-Box-Test kennst du den Code nicht. Eingabe rein, Ausgabe prüfen.', show:{rows:1, hl:[1,1]}},
  {say:'Du testest nur gegen die Anforderungen. Beim White-Box-Test kennst du den Code und testest gezielt Anweisungen und Zweige.', show:{rows:2}},
  {say:'Black-Box nutzt Äquivalenzklassen und Grenzwerte. White-Box nutzt Überdeckung.', show:{rows:3}}
 ]},
{h:'Äquivalenzklassen', v:{code:`Rabatt ab Bestellwert 100 €
Zulässig: 0 bis 10.000 €

gültig, kein Rabatt: 0 bis 99,99
  Testwert 50
gültig, Rabatt: 100 bis 10.000
  Testwert 500
ungültig: < 0, Testwert -5
ungültig: > 10.000, Testwert 20.000`},
 beats:[
  {say:'Beispiel: Rabatt ab 100 Euro Bestellwert. Zulässig sind 0 bis 10.000 Euro.', show:{lines:[1,2]}},
  {say:'Äquivalenzklassen sind Gruppen, die sich gleich verhalten. Aus jeder Klasse reicht ein Testwert.', show:{lines:[4,7]}},
  {say:'Vergiss die ungültigen Klassen nicht, zum Beispiel negative Zahlen. Die geben oft die Extrapunkte.', show:{lines:[8,9]}}
 ]},
{h:'Grenzwerte: an den Rand', v:{code:`Grenze bei 100:
  99,99  → kein Rabatt
 100,00  → Rabatt
 100,01  → Rabatt
Fehler an den Rändern: > statt >=`},
 beats:[
  {say:'Die Grenzwertanalyse testet genau an den Rändern. Direkt unter, auf und über der Grenze.', show:{lines:[1,4]}},
  {say:'Denn die meisten Fehler sind ein größer statt größer gleich.', show:{lines:[5,5]}}
 ]},
{h:'Überdeckung', v:{code:`y = 0
falls x > 0 dann
  y = 1
ende falls
ausgabe(y)

Anweisungsüberdeckung C0:
  x = 5 reicht
Zweigüberdeckung C1:
  x = 5 UND x = -1`},
 beats:[
  {say:'White-Box mit einem kleinen falls.', show:{lines:[1,5]}},
  {say:'Anweisungsüberdeckung: Jede Anweisung läuft mindestens einmal. Dafür reicht x gleich 5.', show:{lines:[7,8]}},
  {say:'Zweigüberdeckung: Bei jedem falls einmal ja und einmal nein. Also 5 und minus 1. Zweigüberdeckung ist stärker.', show:{lines:[9,10]}}
 ],
 check:{q:'Welche Überdeckung verlangt bei jedem falls einmal ja und einmal nein?', o:['Anweisungsüberdeckung','Zweigüberdeckung'], a:1, e:'Zweigüberdeckung durchläuft jeden Zweig mindestens einmal.'}},
{h:'Schreibtischtest', v:{anim:'trace', code:`a = 3, b = 0
solange a > 0
  b = b + a
  a = a - 1
ende solange`, vars:['a','b'], rows:[[3,0],[2,3],[1,5],[0,6]]},
 beats:[
  {say:'Schreibtischtest heißt: Du spielst den Code von Hand durch und notierst nach jedem Schritt alle Variablen. Start: a ist 3, b ist 0.', show:{rows:1}},
  {say:'Erste Runde: b wird 3, a wird 2.', show:{rows:2}},
  {say:'Zweite Runde: b wird 5, a wird 1.', show:{rows:3}},
  {say:'Dritte Runde: b wird 6, a wird 0. Die Schleife endet. Ergebnis 6.', show:{rows:4}}
 ],
 check:{q:'Was stand nach der zweiten Runde in b?', o:['3','5','6'], a:1, e:'0 plus 3 ist 3, plus 2 ist 5.'}},
{h:'Teststufen und Testarten', v:{table:[['Stufe / Art','Was'],['Unit-Test','einzelne Funktion'],['Integrationstest','Zusammenspiel von Modulen'],['Systemtest','ganzes System'],['Abnahmetest','Kunde prüft'],['Regressionstest','Altes kaputt nach Änderung?']]},
 beats:[
  {say:'Von klein nach groß. Unit-Test für einzelne Funktionen, Integrationstest für das Zusammenspiel.', show:{rows:2}},
  {say:'Systemtest für das ganze System. Beim Abnahmetest prüft der Kunde, ob es passt.', show:{rows:4}},
  {say:'Regressionstest: Ist nach einer Änderung Altes kaputt? Lasttest: Wie verhält sich das System bei vielen Nutzern?', show:{rows:5}},
  {say:'Und TDD, testgetriebene Entwicklung: erst den Test schreiben, dann den Code.', show:{rows:5}}
 ]}
],

umlv: [
{h:'Struktogramm ist raus', v:{stat:'Gestrichen', sub:'Struktogramm und PAP seit dem Katalog 2025'},
 beats:[
  {say:'Struktogramm und Programmablaufplan? Seit 2025 aus dem Katalog gestrichen.', show:{}},
  {say:'Abläufe zeigst du jetzt als Aktivitätsdiagramm oder in Pseudocode.', show:{}}
 ]},
{h:'Aktivitätsdiagramm: Elemente', v:{table:[['Symbol','Bedeutung'],['● Punkt','Start'],['◉ Punkt im Ring','Ende'],['▢ abgerundet','Aktion'],['◇ Raute','Entscheidung, Zusammenführung'],['▬ dicker Balken','Parallele Abläufe']]},
 beats:[
  {say:'Start ist ein schwarzer Punkt. Ende ist ein Punkt im Ring.', show:{rows:2}},
  {say:'Aktionen sind abgerundete Rechtecke.', show:{rows:3}},
  {say:'Eine Raute ist eine Verzweigung. An die Pfeile schreibst du die Bedingungen in eckigen Klammern.', show:{rows:4}},
  {say:'Ein dicker Balken bedeutet parallele Abläufe. Und Swimlanes trennen, wer was macht.', show:{rows:5}}
 ]},
{h:'Beispiel: Login', v:{code:`●  Start
↓
◇  Zusammenführung  ←──────┐
↓                          │
( Zugangsdaten eingeben )  │
↓                          │
◇ ─[falsch]→ ( Fehlermeldung )
↓ [richtig]
( Dashboard anzeigen )
↓
◉  Ende`},
 beats:[
  {say:'Ein Login. Start, dann Zugangsdaten eingeben.', show:{lines:[1,5]}},
  {say:'Dann eine Entscheidungsraute. Wenn falsch: Fehlermeldung und zurück.', show:{lines:[6,7]}},
  {say:'Der Rückpfeil geht in eine Zusammenführungsraute, nicht direkt in die Aktion. Zwei Pfeile in eine Aktion heißen: beide müssen ankommen.', show:{lines:[3,7]}},
  {say:'Wenn richtig: Dashboard und Ende. Jeder Pfeil aus einer Entscheidungsraute braucht eine Bedingung.', show:{lines:[8,11]}}
 ],
 check:{q:'Wie schreibst du die Bedingung an einen Pfeil?', o:['In eckigen Klammern','In runden Klammern','Fett'], a:0, e:'Die Wächterbedingung steht in eckigen Klammern, zum Beispiel falsch oder richtig.'}},
{h:'Sequenzdiagramm', v:{code:`:Client     :Server     :Datenbank
   | login() →  |            |
   |            | prüfe() →  |
   |            |  ← ok      |
   |  ← Token   |            |
Lebenslinien senkrecht
Zeit läuft nach unten
→ synchron, volle Spitze
⇢ Antwort, gestrichelt
alt  loop  opt: Fragmente`},
 beats:[
  {say:'Das Sequenzdiagramm zeigt, wer wem in welcher Reihenfolge Nachrichten schickt. Oben stehen die Objekte.', show:{lines:[1,1]}},
  {say:'Darunter gestrichelte Lebenslinien. Die Zeit läuft von oben nach unten.', show:{lines:[2,7]}},
  {say:'Ein Pfeil mit voller Spitze ist ein synchroner Aufruf. Die Antwort ist gestrichelt.', show:{lines:[8,9]}},
  {say:'Kästen zeigen Fragmente: alt für Verzweigung, loop für Schleife, opt für optionale Teile.', show:{lines:[10,10]}}
 ]},
{h:'Zustandsdiagramm', v:{code:`● → [Entwurf]
        │ einreichen
        ↓
     [In Prüfung]
     │          │
  ablehnen   freigeben
  zurück        ↓
  zu Entwurf [Freigegeben] → ◉

Zustand: abgerundetes Rechteck
Pfeil: Ereignis [Bedingung] / Aktion`},
 beats:[
  {say:'Das Zustandsdiagramm zeigt die Zustände eines Objekts. Ein Dokument startet im Entwurf, einreichen, dann In Prüfung.', show:{lines:[1,4]}},
  {say:'Freigeben führt nach Freigegeben. Ablehnen führt zurück nach Entwurf.', show:{lines:[5,8]}},
  {say:'Am Pfeil steht das Ereignis, optional eine Bedingung in eckigen Klammern und nach dem Schrägstrich eine Aktion.', show:{lines:[10,11]}}
 ]},
{h:'Welches Diagramm wann?', v:{table:[['Frage','Diagramm'],['Ablauf, Algorithmus','Aktivitätsdiagramm'],['Wer ruft wen wann?','Sequenzdiagramm'],['Welche Zustände?','Zustandsdiagramm'],['Klassen, Beziehungen','Klassendiagramm'],['Was kann der Nutzer tun?','Anwendungsfalldiagramm']]},
 beats:[
  {say:'Ablauf oder Algorithmus: Aktivitätsdiagramm. Wer ruft wen in welcher Reihenfolge: Sequenzdiagramm.', show:{rows:2}},
  {say:'Welche Zustände hat ein Objekt: Zustandsdiagramm.', show:{rows:3}},
  {say:'Klassen und Beziehungen: Klassendiagramm. Was kann der Nutzer tun: Anwendungsfalldiagramm.', show:{rows:5}}
 ],
 check:{q:'Welche Zustände durchläuft ein Antrag? Welches Diagramm nimmst du?', o:['Sequenzdiagramm','Zustandsdiagramm','Klassendiagramm'], a:1, e:'Zustände und Übergänge zeigt das Zustandsdiagramm.'}}
]

};
