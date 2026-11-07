# SQL: SELECT und JOIN

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

SQL SELECT kam in allen 9 Prüfungen dran. Die Syntax steht im Belegsatz.

## Inhalt

### 1. SQL kam in jeder Prüfung

SQL SELECT kam in allen 9 Prüfungen dran. Das sind sichere Punkte. Und das Beste: Die SQL-Syntax steht im Belegsatz. Du darfst nachschlagen. Schau dir den Belegsatz vor der Prüfung einmal in Ruhe an, damit du weißt, wo was steht. Dann suchst du nicht unter Zeitdruck.

**Merk dir:** Die SQL-Syntax steht im Belegsatz. Nachschlagen ist erlaubt.

### 2. Das Grundgerüst

*Leitfrage: Gut, dann von vorne. Wie ist eine Abfrage aufgebaut?*

SELECT sagt, welche Spalten du willst. FROM sagt, aus welcher Tabelle. Hier unsere Mandanten. WHERE filtert die Zeilen. Texte kommen in einfache Anführungszeichen. ORDER BY sortiert, ASC aufsteigend, DESC absteigend. Merksatz: Select From Where Group Having Order. Die Reihenfolge, in der du schreibst, ist fest: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. Vertauschst du sie, ist die Abfrage syntaktisch falsch. Willst du alle Spalten, schreibst du SELECT Stern. In der Prüfung ist es aber besser, nur die gefragten Spalten zu nennen. Das zeigt, dass du die Aufgabe gelesen hast.

**Merk dir:** Reihenfolge: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY.

```
SELECT Name, Ort
FROM Mandant
WHERE Ort = 'Fulda'
ORDER BY Name ASC;
```

### 3. Werkzeuge für WHERE

*Leitfrage: Und wie filtere ich genauer? Nur ein Gleichheitszeichen reicht ja selten.*

Vergleichen mit größer oder gleich. Mehrere Bedingungen verknüpfst du mit AND und OR. IN prüft gegen eine Liste. BETWEEN prüft einen Bereich. LIKE mit Prozentzeichen als Platzhalter. B und dann Prozentzeichen heißt: beginnt mit B. Leere Werte prüfst du immer mit IS NULL. Niemals mit gleich NULL. Ein Beispiel: Alle Mandanten, deren Name mit Bäckerei beginnt. Das ist WHERE Name LIKE Bäckerei Prozent. Das Prozentzeichen steht für beliebig viele Zeichen. Und Vorsicht mit NULL: Leere Werte prüfst du nie mit gleich, sondern immer mit IS NULL oder IS NOT NULL.

**Merk dir:** Texte in einfache Anführungszeichen. LIKE mit Prozent als Platzhalter.

```
WHERE Honorar > 1000
WHERE Ort = 'Fulda' AND Honorar < 500
WHERE Ort IN ('Fulda', 'Erfurt')
WHERE Honorar BETWEEN 100 AND 1000
WHERE Name LIKE 'B%'   -- beginnt mit B
WHERE Ort IS NULL      -- nie = NULL
```

### 4. INNER JOIN: nur mit Partner

*Leitfrage: Jetzt kommen zwei Tabellen ins Spiel. Wie verbinde ich die?*

Zwei Tabellen. MandantID in Auftrag ist der Fremdschlüssel. Sie zeigt, zu welchem Mandanten der Auftrag gehört. Der JOIN verbindet sie über Primärschlüssel gleich Fremdschlüssel. Passende Schlüssel leuchten auf. INNER JOIN liefert nur Zeilen mit Partner in beiden Tabellen. Gies zweimal, Ruf einmal. Praxis Lenz hat keinen Auftrag und fehlt deshalb. Der Primärschlüssel identifiziert einen Datensatz eindeutig, zum Beispiel MandantID im Mandanten. Der Fremdschlüssel ist dieselbe Nummer in einer anderen Tabelle und verweist zurück. INNER JOIN heißt: Nur Paare, die zusammenpassen. Ein Mandant ohne Auftrag taucht im Ergebnis nicht auf.

**Merk dir:** INNER JOIN liefert nur Zeilen mit Partner auf beiden Seiten.

Kontrollfrage: Wie viele Zeilen liefert dieser INNER JOIN? Antwort: 3. Gies Steuer, Gies Lohn, Ruf Prüfung. Lenz fällt raus.

### 5. Der JOIN im Code

*Leitfrage: Wie schreibe ich das konkret hin?*

Im Code schreibst du FROM Mandant m. Das m ist ein Alias, damit du weniger schreiben musst. Hinter ON steht immer die Verbindung: Primärschlüssel gleich Fremdschlüssel. Bei mehreren Tabellen machen Aliase die Spalten eindeutig. Und am Ende das Semikolon. Bei gleichen Spaltennamen in beiden Tabellen musst du sagen, welche gemeint ist: m Punkt Name oder a Punkt Name. Sonst ist die Abfrage mehrdeutig. Statt INNER JOIN darfst du auch nur JOIN schreiben. Beides bedeutet dasselbe.

**Merk dir:** Hinter ON steht immer: Primärschlüssel gleich Fremdschlüssel.

```
SELECT m.Name, a.Art, a.Honorar
FROM Mandant m
INNER JOIN Auftrag a
  ON m.MandantID = a.MandantID;
```

### 6. LEFT JOIN: auch ohne Partner

*Leitfrage: Und was passiert mit Zeilen, die keinen Partner haben?*

Jetzt der LEFT JOIN. Er nimmt alle Zeilen der linken Tabelle. Gies und Ruf finden ihre Partner. Lenz findet rechts keinen. Lenz bleibt trotzdem drin. In den Auftragsspalten steht dann NULL. Wichtig ist, welche Tabelle links steht: die nach FROM. Tauschst du die Tabellen, bekommst du ein anderes Ergebnis. Ein RIGHT JOIN ist einfach das Spiegelbild. In der Praxis schreibt man fast immer LEFT JOIN und stellt die Tabellen passend.

**Merk dir:** LEFT JOIN behält alle Zeilen links, fehlende Partner werden NULL.

Kontrollfrage: Bei welchem Mandanten steht im LEFT JOIN NULL? Antwort: Praxis Lenz. Lenz hat keinen Auftrag, also bleiben die Auftragsspalten leer.

### 7. Mandanten ohne Auftrag

*Leitfrage: Das klingt nach einer typischen Prüfungsfrage.*

Klassische Prüfungsfrage: Finde alle Mandanten ohne Auftrag. Schritt eins: LEFT JOIN. Schritt zwei: WHERE AuftragID IS NULL. Übrig bleibt Praxis Lenz. Letzter Trick für die Prüfung: DISTINCT entfernt doppelte Zeilen. Warum funktioniert das? Der LEFT JOIN füllt bei fehlendem Partner alle Spalten der rechten Tabelle mit NULL. Genau diese Zeilen filterst du dann mit IS NULL heraus.

**Merk dir:** Ohne Partner finden: LEFT JOIN plus WHERE Spalte IS NULL.

```
SELECT m.Name
FROM Mandant m
LEFT JOIN Auftrag a
  ON m.MandantID = a.MandantID
WHERE a.AuftragID IS NULL;
```

## Zusammenfassung

Also: SELECT, FROM, WHERE, ORDER BY. INNER JOIN nur mit Partner, LEFT JOIN behält alle von links. Und Mandanten ohne Auftrag findest du mit LEFT JOIN plus IS NULL.

## Übungsfragen mit Lösung

1. In welcher Reihenfolge stehen die Klauseln?
   - Lösung: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. Merksatz: Select From Where Group Having Order.
2. Wie prüfst du, ob die Spalte Ort leer ist?
   - Lösung: WHERE Ort IS NULL. NULL vergleicht man nur mit IS NULL bzw. IS NOT NULL.
3. Welche Mandanten liefert ein INNER JOIN Mandant mit Auftrag aus dem Clip?
   - Lösung: Nur Bäckerei Gies und Autohaus Ruf. Praxis Lenz hat keinen Auftrag und fällt beim INNER JOIN raus.
4. Wie viele Zeilen liefert der INNER JOIN aus dem Clip?
   - Lösung: 3. Gies Steuer, Gies Lohn, Ruf Prüfung.
5. Wie findest du Mandanten OHNE Auftrag?
   - Lösung: LEFT JOIN + WHERE a.AuftragID IS NULL. LEFT JOIN behält alle Mandanten, die ohne Partner haben NULL in den Auftragsspalten.
6. Was findet WHERE Name LIKE 'B%'?
   - Lösung: Namen, die mit B beginnen. % steht für beliebig viele Zeichen.
7. Was steht hinter ON beim JOIN?
   - Lösung: Primärschlüssel = Fremdschlüssel. Damit werden die passenden Zeilen verknüpft.
8. Darfst du in der Prüfung SQL-Syntax nachschlagen?
   - Lösung: Ja, im Belegsatz. Der bundeseinheitliche Belegsatz hat ein SQL-Beiblatt.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Schreibe eine SQL-Abfrage: Gib Name des Mandanten, Art und Honorar aller Aufträge mit einem Honorar über 1000 aus, sortiert nach Honorar absteigend. Tabellen: Mandant(MandantID, Name, Ort), Auftrag(AuftragID, MandantID, Art, Honorar).

```
SELECT m.Name, a.Art, a.Honorar
FROM Mandant m
INNER JOIN Auftrag a ON m.MandantID = a.MandantID
WHERE a.Honorar > 1000
ORDER BY a.Honorar DESC;
```

### Aufgabe 2

Schreibe eine Abfrage, die die Namen aller Mandanten ausgibt, die KEINEN Auftrag haben.

```
SELECT m.Name
FROM Mandant m
LEFT JOIN Auftrag a ON m.MandantID = a.MandantID
WHERE a.AuftragID IS NULL;
```
