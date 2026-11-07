# SQL: GROUP BY, HAVING, Subselect

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Gruppieren und Aggregieren ist die typische schwerere SQL-Teilaufgabe.

## Inhalt

### 1. Die schwerere SQL-Aufgabe

Gruppieren und Aggregieren ist die typische schwerere SQL-Teilaufgabe. Basis sind Aggregatfunktionen. COUNT zählt. SUM summiert. AVG bildet den Durchschnitt. MIN und MAX finden den kleinsten und den größten Wert. Alle fassen viele Zeilen zu einem Wert zusammen. Diese Aufgaben sind meist mehr Punkte wert als ein einfacher SELECT. Mit einem festen Vorgehen holst du sie trotzdem sicher.

**Merk dir:** COUNT zählt, SUM summiert, AVG mittelt, MIN und MAX.

| Funktion | liefert |
|---|---|
| COUNT(*) | Anzahl Zeilen |
| SUM(Honorar) | Summe |
| AVG(Honorar) | Durchschnitt |
| MIN / MAX | kleinster / größter Wert |

### 2. Kurz nachrechnen

*Leitfrage: Rechnen wir das einmal zusammen nach?*

Unsere drei Aufträge: 1200, 400 und 5000. COUNT ergibt 3. Die Summe ist 6600. Der Durchschnitt ist 2200. Das Maximum ist 5000. Wichtig: COUNT Stern zählt alle Zeilen. COUNT einer Spalte zählt nur die Zeilen, in denen dort kein NULL steht. Das wird gern abgefragt. Das Ergebnis dieser Abfrage ist genau eine Zeile, denn ohne GROUP BY fasst die Funktion die ganze Tabelle zusammen.

**Merk dir:** Aggregatfunktionen fassen viele Zeilen zu einem Wert zusammen.

```
Honorare: 1200, 400, 5000
COUNT(*)      = 3
SUM(Honorar)  = 6600
AVG(Honorar)  = 2200
MAX(Honorar)  = 5000
```

### 3. GROUP BY: pro Mandant

*Leitfrage: Und wenn ich die Summe pro Mandant will statt über alles?*

Jetzt wollen wir die Summe pro Mandant. Erst die Rohzeilen: Gies zweimal, Ruf einmal. GROUP BY bildet Gruppen. Gies in einen Topf, Ruf in den anderen. SUM rechnet pro Gruppe. Gies hat 1600, Ruf 5000. Typische Formulierungen in der Aufgabe: pro Mandant, je Monat, für jeden Mitarbeiter. Sobald du je oder pro liest, brauchst du ein GROUP BY.

**Merk dir:** GROUP BY bildet Gruppen, die Funktion rechnet pro Gruppe.

### 4. Die goldene Regel

*Leitfrage: Gibt es dabei eine Regel, die ich nie vergessen darf?*

Pro Mandant die Anzahl mit COUNT und die Summe mit SUM. AS gibt der Spalte einen Namen. Goldene Regel: Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steckt, muss auch ins GROUP BY. Ergebnis: Gies hat 2 Aufträge mit 1600, Ruf 1 Auftrag mit 5000. Warum diese Regel? Pro Gruppe gibt es genau eine Ergebniszeile. Eine Spalte, die in der Gruppe verschiedene Werte hat, könnte die Datenbank gar nicht eindeutig anzeigen. In der Prüfung kostet ein vergessenes GROUP BY-Feld fast immer Punkte. Kontrolliere am Ende jede Spalte im SELECT einmal.

**Merk dir:** Jede Spalte im SELECT ohne Aggregat muss ins GROUP BY.

```
SELECT m.Name, COUNT(*) AS Anzahl,
       SUM(a.Honorar) AS Gesamt
FROM Mandant m
JOIN Auftrag a ON m.MandantID = a.MandantID
GROUP BY m.Name;

→ Bäckerei Gies | 2 | 1600
→ Autohaus Ruf  | 1 | 5000
```

Kontrollfrage: Name steht im SELECT ohne Aggregatfunktion. Wo muss Name noch hin? Antwort: Ins GROUP BY. Jede Nicht-Aggregat-Spalte im SELECT muss ins GROUP BY.

### 5. WHERE oder HAVING?

*Leitfrage: WHERE und HAVING verwechsle ich ständig. Hilf mir.*

Jetzt filtern. Zwei Werkzeuge, die ständig verwechselt werden. WHERE filtert einzelne Zeilen, und zwar vor dem Gruppieren. HAVING filtert ganze Gruppen nach dem Gruppieren. Steckt SUM oder COUNT in der Bedingung, brauchst du HAVING. Ein Beispiel: Mandanten aus Fulda mit mehr als zwei Aufträgen. Fulda ist eine Eigenschaft einzelner Zeilen, also WHERE. Mehr als zwei Aufträge ist ein COUNT, also HAVING. Gut zu wissen: Die Datenbank wertet erst WHERE aus, dann gruppiert sie, dann prüft sie HAVING. Darum darf in WHERE nie eine Aggregatfunktion stehen.

**Merk dir:** WHERE filtert Zeilen vor dem Gruppieren, HAVING Gruppen danach.

```
SELECT m.Name, SUM(a.Honorar) AS Gesamt
FROM Mandant m
JOIN Auftrag a ON m.MandantID = a.MandantID
WHERE a.Art <> 'Lohn'
GROUP BY m.Name
HAVING SUM(a.Honorar) > 2000;
```

Kontrollfrage: Nur Mandanten mit Honorarsumme über 2000. Was nimmst du? Antwort: HAVING. Eine Aggregatfunktion in der Bedingung heißt HAVING.

### 6. Subselect: Abfrage in der Abfrage

*Leitfrage: Was ist ein Subselect?*

Ein Subselect ist eine Abfrage in der Abfrage. Die innere Abfrage liefert den Durchschnitt. Raus kommen alle Aufträge mit Honorar darüber. Oder mit IN: alle Mandanten, deren ID in der Liste der Prüfungsaufträge vorkommt. Das Subselect in Klammern wird zuerst ausgewertet. Der äußere SELECT arbeitet dann mit dessen Ergebnis wie mit einem festen Wert oder einer Liste. Liefert das Subselect genau einen Wert, darfst du mit gleich oder größer vergleichen. Liefert es mehrere, brauchst du IN.

**Merk dir:** Ein Subselect ist eine Abfrage in der Abfrage, oft mit IN oder Vergleich.

```
-- Aufträge über dem Durchschnitt
SELECT AuftragID, Honorar
FROM Auftrag
WHERE Honorar > (SELECT AVG(Honorar)
                 FROM Auftrag);

-- Mandanten mit Prüfungsauftrag
SELECT Name FROM Mandant
WHERE MandantID IN (SELECT MandantID
                    FROM Auftrag
                    WHERE Art = 'Prüfung');
```

### 7. Deine Checkliste

*Leitfrage: Hast du eine Checkliste für die Prüfung?*

Lies, was pro irgendwas berechnet werden soll. Das kommt ins GROUP BY. Bedingung mit Aggregat, dann HAVING. Bedingung auf eine normale Spalte, dann WHERE. Vergleich mit einem berechneten Wert, dann Subselect. Und Achtung: mehr als heißt größer als. Mindestens heißt größer oder gleich. Schreib die Abfrage ruhig in Schritten auf Schmierpapier: erst FROM und JOIN, dann WHERE, dann GROUP BY, ganz zum Schluss SELECT. So passieren die wenigsten Fehler.

**Merk dir:** „Pro irgendwas“ heißt GROUP BY. Bedingung mit Aggregat heißt HAVING.

- Pro ... berechnen: ins GROUP BY
- Bedingung mit SUM, COUNT, AVG: HAVING
- Bedingung auf normale Spalte: WHERE
- Vergleich mit berechnetem Wert: Subselect
- mehr als: >    mindestens: >=

## Zusammenfassung

Merksatz: Jede Spalte im SELECT ohne Aggregat muss ins GROUP BY. WHERE filtert Zeilen vor dem Gruppieren, HAVING filtert Gruppen danach.

## Übungsfragen mit Lösung

1. Du willst nur Mandanten, deren Honorarsumme über 2000 liegt. Was nimmst du?
   - Lösung: HAVING SUM(Honorar) > 2000. Aggregat in der Bedingung → HAVING.
2. Was ist der AVG der Honorare 1200, 400 und 5000?
   - Lösung: 2200. 6600 / 3 = 2200.
3. Welche Regel gilt für Spalten im SELECT bei GROUP BY?
   - Lösung: Alle Nicht-Aggregat-Spalten müssen ins GROUP BY. Sonst weiß die Datenbank nicht, welchen Wert sie pro Gruppe anzeigen soll.
4. Wann filtert WHERE?
   - Lösung: Vor dem Gruppieren. WHERE wirkt auf einzelne Zeilen, bevor gruppiert wird.
5. Was liefert COUNT(*) bei den 3 Aufträgen?
   - Lösung: 3. COUNT(*) zählt alle Zeilen.
6. Wie heißt eine Abfrage innerhalb einer Abfrage?
   - Lösung: Subselect / Unterabfrage. Subselects stehen z. B. im WHERE in Klammern.
7. "Mindestens 3 Aufträge" heißt in SQL:
   - Lösung: COUNT(*) >= 3. Mindestens = größer oder gleich.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Gib pro Ort die Anzahl der Mandanten aus, aber nur Orte mit mindestens 2 Mandanten. Tabelle: Mandant(MandantID, Name, Ort).

```
SELECT Ort, COUNT(*) AS Anzahl
FROM Mandant
GROUP BY Ort
HAVING COUNT(*) >= 2;
```

### Aufgabe 2

Gib alle Aufträge (AuftragID, Honorar) aus, deren Honorar über dem Durchschnitt aller Honorare liegt.

```
SELECT AuftragID, Honorar
FROM Auftrag
WHERE Honorar > (SELECT AVG(Honorar) FROM Auftrag);
```
