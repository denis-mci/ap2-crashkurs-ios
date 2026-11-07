# SQL Profi: Daten übertragen, Subselects, UNION

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

SQL kommt in jeder AP2. Die schweren Teilaufgaben verlangen Daten übertragen, Subselects, Self-Joins oder n:m-Joins. INSERT INTO mit SELECT kam im Sommer 2026 dran.

## Inhalt

### 1. Daten übertragen

Im Sommer 2026 kam genau das dran: Daten von einer Tabelle in eine andere übertragen. Statt VALUES schreibst du einfach ein SELECT. Spaltenzahl und Reihenfolge müssen zur Zielliste passen. Alle Zeilen, die das SELECT liefert, landen im Archiv. Danach löschst du sie mit DELETE und demselben WHERE. Praktisch heißt das: Du kannst zum Beispiel alle abgeschlossenen Aufträge in eine Archivtabelle kopieren, mit einer einzigen Anweisung.

**Merk dir:** INSERT INTO mit SELECT statt VALUES überträgt Daten.

```
INSERT INTO AuftragArchiv
  (AuftragID, MandantID, Honorar)
SELECT AuftragID, MandantID, Honorar
FROM Auftrag
WHERE Datum < '2025-01-01';
```

### 2. Subselect in UPDATE und DELETE

*Leitfrage: Kann ich Subselects auch beim Ändern und Löschen benutzen?*

UPDATE mit Subselect: Erhöhe die Honorare aller Mandanten aus Fulda. IN prüft gegen die Liste aus dem Subselect. NOT EXISTS ist wahr, wenn das Subselect keine einzige Zeile liefert. Hier werden Mandanten ohne Auftrag gelöscht. Das Subselect greift auf die äußere Zeile zu. Das heißt korrelierte Unterabfrage, sie läuft für jede Zeile neu. Falle bei NOT IN: Liefert das Subselect ein NULL, kommt gar keine Zeile raus. NOT EXISTS ist da sicherer. NOT EXISTS ist ideal für Fragen wie: Mandanten, die noch nie einen Auftrag hatten. Das ist die Alternative zum LEFT JOIN mit IS NULL.

**Merk dir:** NOT EXISTS ist wahr, wenn das Subselect keine Zeile liefert.

```
UPDATE Auftrag SET Honorar = Honorar * 1.1
WHERE MandantID IN
  (SELECT MandantID FROM Mandant
   WHERE Ort = 'Fulda');

DELETE FROM Mandant
WHERE NOT EXISTS
  (SELECT * FROM Auftrag a
   WHERE a.MandantID = Mandant.MandantID);
```

Kontrollfrage: Welche Mandanten löscht das DELETE? Antwort: Mandanten ohne Auftrag. NOT EXISTS ist wahr, wenn kein Auftrag zum Mandanten existiert.

### 3. Self-Join: Chef und Mitarbeiter

*Leitfrage: Eine Tabelle mit sich selbst verbinden? Wie geht das denn?*

Self-Join: Eine Tabelle wird mit sich selbst verbunden. ChefID zeigt auf die MaID derselben Tabelle. Du nimmst die Tabelle zweimal mit zwei Aliasen, m und c. Verbunden wird ChefID von m mit MaID von c. Koch hat Weber als Chef, Schmitt und Becker haben Koch. Weber hat keinen Chef und fehlt beim INNER JOIN. Mit LEFT JOIN bleibt Weber drin. RIGHT JOIN behält alle Zeilen rechts, FULL JOIN alle von beiden Seiten. Typisches Beispiel ist die Hierarchie: Wer ist der Chef von wem? Beide Rollen stehen in derselben Mitarbeitertabelle, darum die zwei Aliase.

**Merk dir:** Self-Join: dieselbe Tabelle zweimal mit zwei Aliasen.

Kontrollfrage: Wer ist der Chef von Becker? Antwort: Koch. Becker hat ChefID 2, und MaID 2 ist Koch.

### 4. 3 Tabellen und UNION

*Leitfrage: Und bei drei Tabellen?*

n zu m: Ein Mitarbeiter arbeitet an vielen Aufträgen und umgekehrt. Dazwischen liegt eine Zwischentabelle. Also zwei JOINs: erst zur Zwischentabelle, dann weiter zum Auftrag. Bei 3 Tabellen brauchst du 2 ON-Bedingungen. UNION hängt Ergebnisse untereinander. Beide SELECTs brauchen gleich viele Spalten mit passenden Datentypen. UNION entfernt Duplikate, also 2 Zeilen. UNION ALL behält alle, also 4. INTERSECT ist die Schnittmenge, EXCEPT die Differenz. UNION hängt Ergebnisse untereinander und entfernt doppelte Zeilen. UNION ALL behält Doppelte. Die Spaltenzahl beider Abfragen muss gleich sein.

**Merk dir:** n zu m heißt zwei JOINs über die Zwischentabelle.

```
SELECT ma.Name, a.Art
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
-- UNION: 2 Zeilen, UNION ALL: 4
```

### 5. Zählen, Rechnen, Muster

*Leitfrage: Beim Zählen gibt es angeblich eine NULL-Falle.*

Die Orte sind Fulda, Erfurt, Fulda und einmal NULL. COUNT mit Stern zählt alle Zeilen, also 4. NULL-Falle: COUNT Ort zählt NULL nicht mit, also 3. COUNT DISTINCT zählt nur verschiedene Werte, also 2. Im SELECT darfst du rechnen, hier mal 1,19. Bei LIKE steht der Unterstrich für genau ein Zeichen, Prozent für beliebig viele. ORDER BY DESC mit LIMIT 3 liefert die 3 teuersten. LIMIT gibt es in MySQL, in SQL Server heißt das TOP. DISTINCT wirkt auf die ganze Zeile, nicht nur auf eine Spalte. Und COUNT DISTINCT zählt verschiedene Werte, NULL wieder nicht mit.

**Merk dir:** COUNT Stern zählt alles, COUNT Spalte ignoriert NULL.

```
SELECT COUNT(*), COUNT(Ort),
       COUNT(DISTINCT Ort)
FROM Mandant;
-- Orte: Fulda, Erfurt, Fulda, NULL
-- Ergebnis: 4 | 3 | 2

SELECT Art, Honorar * 1.19 AS Brutto
FROM Auftrag
WHERE Art LIKE '_o%'
ORDER BY Honorar DESC
LIMIT 3;
```

### 6. Referentielle Integrität

*Leitfrage: Was passiert eigentlich beim Löschen mit den Fremdschlüsseln?*

Referentielle Integrität heißt: Jeder Fremdschlüssel zeigt auf einen existierenden Datensatz. Was passiert, wenn ein Mandant gelöscht wird? CASCADE löscht seine Aufträge mit. SET NULL setzt den Fremdschlüssel auf NULL. RESTRICT verweigert das Löschen, solange noch Aufträge auf den Mandanten verweisen. Einfügen immer erst den Mandanten, dann den Auftrag. Bei RESTRICT löschst du genau andersrum, erst die Aufträge. Ohne Regel lehnt die Datenbank das Löschen eines Mandanten mit Aufträgen ab. Das ist meist auch gewünscht, denn Aufträge ohne Mandant ergeben keinen Sinn.

**Merk dir:** CASCADE löscht abhängige Zeilen mit, RESTRICT verhindert das Löschen.

| ON DELETE | Mandant gelöscht, seine Aufträge |
|---|---|
| CASCADE | werden mitgelöscht |
| SET NULL | bekommen MandantID NULL |
| RESTRICT | Löschen wird verweigert |
| Reihenfolge | Einfügen: erst Mandant. Löschen: erst Auftrag |

### 7. So knackst du schwere Abfragen

*Leitfrage: Hast du eine Strategie für schwere Abfragen?*

Geschrieben wird SELECT zuerst, ausgewertet aber FROM und JOIN. Bau deine Abfrage genau in dieser Reihenfolge. Dann WHERE für die Zeilen, danach GROUP BY und HAVING für die Gruppen. Erst ganz zum Schluss SELECT und ORDER BY. Und dann spielst du die Abfrage gegen die Beispieldaten durch. Und am Ende: Lies deine Abfrage einmal laut als Satz vor. Klingt sie nach der Aufgabenstellung, stimmt sie meistens.

**Merk dir:** Bau die Abfrage in der Reihenfolge FROM, JOIN, WHERE, GROUP BY.

- FROM und JOIN: welche Tabellen?
- WHERE: welche Zeilen?
- GROUP BY und HAVING: welche Gruppen?
- SELECT und ORDER BY: was wird ausgegeben?
- Gegen Beispieldaten durchspielen

## Zusammenfassung

Merke: INSERT mit SELECT statt VALUES. COUNT Stern zählt alles, COUNT Spalte ignoriert NULL. Und baue schwere Abfragen in der Reihenfolge FROM, JOIN, WHERE, GROUP BY, HAVING, SELECT.

## Übungsfragen mit Lösung

1. Du willst alle Aufträge vor 2025 in die Tabelle Archiv kopieren. Welche Anweisung ist richtig?
   - Lösung: INSERT INTO Archiv (AuftragID, Honorar) SELECT AuftragID, Honorar FROM Auftrag WHERE Datum < '2025-01-01';. Beim Übertragen ersetzt das SELECT die VALUES-Klausel. Spaltenzahl und Reihenfolge müssen zur Zielspaltenliste passen.
2. WHERE MandantID NOT IN (SELECT MandantID FROM Auftrag)  
  
Das Subselect liefert auch einen NULL-Wert. Was passiert?
   - Lösung: Es kommen keine Zeilen heraus. Ein Vergleich mit NULL ist nie wahr, darum ist NOT IN dann für keine Zeile wahr. NOT EXISTS hat diese Falle nicht.
3. Wann ist WHERE NOT EXISTS (Subselect) für eine Zeile wahr?
   - Lösung: Wenn das Subselect keine einzige Zeile liefert. EXISTS fragt nur: Gibt es mindestens eine Zeile? NOT EXISTS ist wahr, wenn es keine gibt.
4. Mandant.Ort: Fulda, Erfurt, Fulda  
Interessent.Ort: Fulda  
  
SELECT Ort FROM Mandant  
UNION ALL  
SELECT Ort FROM Interessent;  
  
Wie viele Zeilen kommen heraus?
   - Lösung: 4. UNION ALL behält Duplikate: 3 + 1 = 4. Mit UNION wären es nur 2 (Fulda, Erfurt).
5. Was müssen zwei SELECTs für UNION erfüllen?
   - Lösung: Gleiche Spaltenzahl und passende Datentypen. UNION hängt Zeilen untereinander, darum müssen die Spalten zusammenpassen.
6. Mitarbeiter(MaID, Name, ChefID)  
1 Weber NULL  
2 Koch 1  
3 Schmitt 2  
  
SELECT m.Name, c.Name  
FROM Mitarbeiter m  
JOIN Mitarbeiter c ON m.ChefID = c.MaID;  
  
Wer steht als Chef neben Schmitt?
   - Lösung: koch. Schmitt hat ChefID 2, MaID 2 ist Koch. Self-Join: dieselbe Tabelle zweimal mit zwei Aliasen.
7. Du verbindest Mitarbeiter, Mitarbeiter_Auftrag (n:m-Zwischentabelle) und Auftrag. Wie viele ON-Bedingungen brauchst du?
   - Lösung: 2. Bei n Tabellen brauchst du n - 1 Verknüpfungen: Mitarbeiter mit Zwischentabelle und Zwischentabelle mit Auftrag.
8. Mandant.Ort: Fulda, Erfurt, Fulda, NULL  
  
Was liefert COUNT(Ort)?
   - Lösung: 3. COUNT(spalte) zählt NULL nicht mit. COUNT(*) würde 4 liefern.
9. Mandant.Ort: Fulda, Erfurt, Fulda, NULL  
  
Was liefert COUNT(DISTINCT Ort)?
   - Lösung: 2. Nur verschiedene Werte ohne NULL: Fulda und Erfurt.
10. Welche Art trifft WHERE Art LIKE '_o%'?
   - Lösung: Lohn. _ steht für genau ein Zeichen, % für beliebig viele. Das zweite Zeichen muss also o sein.
11. Ein Mandant darf nicht gelöscht werden können, solange noch Aufträge auf ihn verweisen. Welche Regel setzt du beim Fremdschlüssel?
   - Lösung: ON DELETE RESTRICT. RESTRICT verweigert das Löschen. CASCADE würde die Aufträge mitlöschen, SET NULL den Fremdschlüssel leeren.
12. In welcher Reihenfolge wertet die Datenbank eine Abfrage logisch aus?
   - Lösung: FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. Geschrieben wird SELECT zuerst, ausgewertet aber zuerst FROM und JOIN. So baust du schwere Abfragen auch auf.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Die Kanzlei archiviert alte Aufträge. Schreiben Sie SQL-Anweisungen, die alle Aufträge mit einem Datum vor dem 01.01.2025 in die Tabelle AuftragArchiv(AuftragID, MandantID, Honorar, Datum) übertragen und sie anschließend aus Auftrag löschen. Tabelle: Auftrag(AuftragID, MandantID, Art, Honorar, Datum).

```
INSERT INTO AuftragArchiv (AuftragID, MandantID, Honorar, Datum)
SELECT AuftragID, MandantID, Honorar, Datum
FROM Auftrag
WHERE Datum < '2025-01-01';

DELETE FROM Auftrag
WHERE Datum < '2025-01-01';
```

### Aufgabe 2

Geben Sie für jeden Mitarbeiter seinen Namen und den Namen seines Vorgesetzten aus. Mitarbeiter ohne Vorgesetzten sollen ebenfalls erscheinen. Tabelle: Mitarbeiter(MaID, Name, ChefID), ChefID verweist auf MaID.

```
SELECT m.Name, c.Name AS Vorgesetzter
FROM Mitarbeiter m
LEFT JOIN Mitarbeiter c ON m.ChefID = c.MaID;
```
