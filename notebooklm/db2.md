# Datenbanken 2: NoSQL, Transaktionen, Index, View

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Neben SQL-Code fragt die AP2 Datenbank-Theorie ab. NoSQL, Transaktionen mit ACID, Index, View, Trigger und Datenqualität beim Import sind schnelle Punkte mit kurzen Antworten.

## Inhalt

### 1. 500 Euro verschwunden

Eine Überweisung. Die Abbuchung läuft durch, dann fällt der Strom aus. Die Gutschrift passiert nie. 500 Euro sind weg. Genau dafür gibt es Transaktionen, und dazu kommen Theoriefragen mit schnellen Punkten. Und genau so etwas darf in einer Kanzlei mit Mandantengeld nie passieren. Darum gehören Transaktionen zum Pflichtwissen.

**Merk dir:** Transaktion heißt alles oder nichts.

```
UPDATE Konto SET Saldo = Saldo - 500
WHERE KontoID = 1;
-- Stromausfall!
UPDATE Konto SET Saldo = Saldo + 500
WHERE KontoID = 2;
```

### 2. Transaktion: alles oder nichts

*Leitfrage: Wie sieht so eine Transaktion aus?*

BEGIN startet die Transaktion. In MySQL geht auch START TRANSACTION. Beide Buchungen gehören zusammen in eine Transaktion. COMMIT speichert alles dauerhaft. Geht etwas schief, nimmt ROLLBACK alles seit BEGIN zurück. Ein ROLLBACK setzt alles seit dem BEGIN zurück, als wäre nichts passiert. Erst das COMMIT macht die Änderungen für andere sichtbar und dauerhaft.

**Merk dir:** COMMIT speichert, ROLLBACK macht alles rückgängig.

```
BEGIN;
UPDATE Konto SET Saldo = Saldo - 500
WHERE KontoID = 1;
UPDATE Konto SET Saldo = Saldo + 500
WHERE KontoID = 2;
COMMIT;
-- bei Fehler: ROLLBACK;
```

### 3. ACID an der Überweisung

*Leitfrage: ACID, das hört man oft. Was steckt dahinter?*

Atomarität: ganz oder gar nicht. Konsistenz: Die Datenbank ist vorher und nachher gültig. Isolation: Parallele Transaktionen stören sich nicht. Dauerhaftigkeit: Nach dem COMMIT übersteht alles auch einen Absturz. Ohne Isolation droht ein Lost Update. A und B lesen beide 1000, A bucht 200 dazu, B zieht 100 ab. B schreibt zuletzt, also stehen 900 drin statt 1100. Die Änderung von A ist verloren. Dagegen helfen Sperren. Isolation ist der knifflige Teil: Zwei Mitarbeiter buchen gleichzeitig auf dasselbe Konto. Ohne Isolation könnte eine Buchung die andere überschreiben.

**Merk dir:** Atomarität, Konsistenz, Isolation, Dauerhaftigkeit.

| ACID | heißt | bei der Überweisung |
|---|---|---|
| Atomarität | ganz oder gar nicht | beide Buchungen oder keine |
| Konsistenz | gültig vorher und nachher | Summe der Salden stimmt |
| Isolation | Parallele stören sich nicht | keiner sieht Zwischenstand |
| Dauerhaftigkeit | nach COMMIT gespeichert | übersteht Absturz |

Kontrollfrage: Abbuchung klappt, Gutschrift scheitert, beides wird zurückgenommen. Welche Eigenschaft? Antwort: Atomarität. Atomarität heißt ganz oder gar nicht.

### 4. Dokument-Datenbank

*Leitfrage: Und was ist mit NoSQL? Gibt es auch Datenbanken ohne Tabellen?*

Eine dokumentenorientierte Datenbank wie MongoDB speichert JSON-Dokumente. Ein Dokument ist hier ein Mandant. Die Aufträge stecken verschachtelt drin. Statt zwei Tabellen mit Fremdschlüssel bettest du sie ins Dokument ein. Schemafrei, jedes Dokument darf andere Felder haben. Du liest alles mit einem Zugriff, JOINs sind nur eingeschränkt möglich. Sie skaliert horizontal auf viele Server. Die Redundanz hier ist gewollt, für schnelles Lesen. Ungewollte Redundanz führt zu Anomalien. Vorteil: Ein Mandant mit allen Aufträgen ist mit einem Zugriff geladen, ganz ohne JOIN. Nachteil: Daten können doppelt vorkommen, und Auswertungen quer über alle Mandanten werden schwerer.

**Merk dir:** Dokument-Datenbank speichert JSON, zusammengehörige Daten verschachtelt.

```
{
  "_id": 4711,
  "name": "Bäckerei Gies",
  "ort": "Fulda",
  "auftraege": [
    { "art": "Steuer", "honorar": 1200 },
    { "art": "Lohn", "honorar": 400 }
  ]
}
```

### 5. NoSQL-Typen, CAP und BASE

*Leitfrage: Welche Arten von NoSQL gibt es noch?*

Neben Dokument-Datenbanken gibt es Key-Value-Stores. Ein Schlüssel, ein Wert, extrem schnell, zum Beispiel für Sessions. Spaltenorientierte Datenbanken für riesige Datenmengen. Graphdatenbanken für Beziehungen als Knoten und Kanten. CAP: Bei einer Netztrennung kann ein verteiltes System nicht gleichzeitig Konsistenz und Verfügbarkeit garantieren. Darum oft BASE statt ACID. Eventually Consistent heißt: Die Daten sind nach einer Weile auf allen Knoten gleich. CAP heißt: Ein verteiltes System kann bei einem Netzwerkausfall nicht gleichzeitig voll konsistent und voll verfügbar sein. Man muss sich entscheiden. BASE ist das lockere Gegenstück zu ACID: Daten werden irgendwann konsistent, aber nicht sofort.

**Merk dir:** Key-Value, Dokument, Spalten, Graph.

| Typ | Prinzip | Beispiel |
|---|---|---|
| Dokument | JSON-Dokumente | MongoDB |
| Key-Value | Schlüssel und Wert | Redis, Session-Cache |
| Spaltenorientiert | Spaltenfamilien, riesige Mengen | Cassandra |
| Graph | Knoten und Kanten | Neo4j, Netzwerke |

Kontrollfrage: Wer kennt wen in einem Netzwerk. Welcher Typ passt? Antwort: Graph. Beziehungen als Knoten und Kanten sind die Stärke von Graphdatenbanken.

### 6. Index, View, Trigger

*Leitfrage: Index, View, Trigger. Was ist was?*

Ein Index ist wie das Stichwortverzeichnis im Buch. Lesen und Suchen werden schneller. Aber jedes INSERT und UPDATE muss den Index mitpflegen. Schreiben wird langsamer, und er braucht Speicher. Eine View ist eine gespeicherte Abfrage, wie eine virtuelle Tabelle. Sie vereinfacht Abfragen, Rechte vergibst du nur auf die View. Ein Trigger läuft automatisch bei INSERT, UPDATE oder DELETE, hier fürs Protokoll. Eine Stored Procedure rufst du selbst auf. Eine View ist eine gespeicherte Abfrage, die sich wie eine Tabelle anfühlt. Praktisch, um Mitarbeitern nur bestimmte Spalten zu zeigen. Ein Trigger läuft automatisch bei INSERT, UPDATE oder DELETE, zum Beispiel um jede Änderung in einer Protokolltabelle festzuhalten.

**Merk dir:** Index macht Lesen schneller und Schreiben langsamer.

```
CREATE INDEX idx_name ON Mandant(Name);

CREATE VIEW FuldaMandanten AS
  SELECT MandantID, Name FROM Mandant
  WHERE Ort = 'Fulda';

CREATE TRIGGER trg_log AFTER UPDATE
ON Auftrag FOR EACH ROW
  INSERT INTO Protokoll (AuftragID, Zeit)
  VALUES (NEW.AuftragID, NOW());
```

### 7. Datenqualität beim Import

*Leitfrage: Und wenn ich Daten importiere, worauf achte ich?*

Vor dem Import prüfst du die Datenqualität. Vollständig, korrekt, und plausibel. Ein Gründungsjahr 2091 fällt bei der Plausibilitätsprüfung auf. Konsistent und eindeutig, also keine Dubletten. Und aktuell. Dazu Formatprüfungen, zum Beispiel PLZ mit 5 Ziffern. CSV-Fallen: Deutsches Excel trennt oft mit Semikolon statt Komma. Und die Kopfzeile ist kein Datensatz. Das falsche Encoding zerschießt Umlaute. Dann steht statt Müller Zeichensalat da. Encoding vorher festlegen. In der Prüfung sollst du oft konkrete Fehler im Datensatz finden und benennen. Geh jedes Kriterium einzeln durch und nenne die betroffene Zeile.

**Merk dir:** Vollständig, korrekt, plausibel, konsistent, eindeutig.

- Vollständig: Pflichtfelder gefüllt?
- Korrekt und plausibel: Gründungsjahr 2091?
- Konsistent und eindeutig: keine Dubletten
- Aktuell: Adresse noch gültig?
- CSV-Fallen: Trennzeichen, Encoding, Kopfzeile

## Zusammenfassung

Also: Transaktion heißt alles oder nichts, mit COMMIT und ROLLBACK. ACID: Atomarität, Konsistenz, Isolation, Dauerhaftigkeit. Ein Index macht Lesen schneller und Schreiben langsamer.

## Übungsfragen mit Lösung

1. Bei einer Überweisung klappt die Abbuchung, die Gutschrift scheitert. Alles wird zurückgenommen. Welche ACID-Eigenschaft ist das?
   - Lösung: Atomarität. Atomarität: ganz oder gar nicht. Beide Buchungen oder keine.
2. Mit welchem Befehl machst du die Änderungen einer Transaktion dauerhaft?
   - Lösung: COMMIT. COMMIT speichert endgültig, ROLLBACK nimmt alles seit BEGIN zurück.
3. Saldo 1000. Transaktion A liest 1000 und schreibt 1000 + 200. Gleichzeitig liest B ebenfalls 1000 und schreibt 1000 - 100. B schreibt zuletzt.  
  
Welcher Saldo steht am Ende in der Datenbank?
   - Lösung: 900. Lost Update: B überschreibt das Ergebnis von A. Richtig wäre 1100. Dagegen hilft Isolation, zum Beispiel durch Sperren.
4. Welche Aussage zu einem Index stimmt?
   - Lösung: Lesen und Suchen werden schneller, Schreiben wird langsamer. Der Index muss bei jedem INSERT, UPDATE und DELETE mitgepflegt werden und braucht zusätzlich Speicher.
5. Was ist eine View?
   - Lösung: Eine gespeicherte Abfrage, die wie eine virtuelle Tabelle genutzt wird. Die View speichert die Abfrage, nicht die Daten. Sie vereinfacht Abfragen und du kannst Rechte nur auf die View vergeben.
6. Jede Honoraränderung soll automatisch in eine Protokolltabelle geschrieben werden. Was nutzt du?
   - Lösung: Trigger. Ein Trigger läuft automatisch bei INSERT, UPDATE oder DELETE.
7. Was ist typisch für eine dokumentenorientierte Datenbank wie MongoDB?
   - Lösung: JSON-Dokumente, verschachtelt, schemaflexibel, horizontal skalierbar. Zusammengehörige Daten stecken in einem Dokument. JOINs sind nur eingeschränkt möglich, dafür liest du alles mit einem Zugriff.
8. Die Kanzlei will abbilden, welche Mitarbeiter mit welchen Mandanten und Partnern vernetzt sind. Welcher NoSQL-Typ passt am besten?
   - Lösung: Graphdatenbank. Beziehungen als Knoten und Kanten sind die Stärke von Graphdatenbanken, zum Beispiel Neo4j.
9. Was bedeutet "Eventually Consistent" bei BASE?
   - Lösung: Die Daten sind nach einer Weile auf allen Knoten konsistent. BASE verzichtet auf sofortige Konsistenz zugunsten von Verfügbarkeit. ACID verlangt sie sofort.
10. Beim CSV-Import steht bei einem Mandanten das Gründungsjahr 2091. Welche Prüfung schlägt an?
   - Lösung: Plausibilitätsprüfung. Der Wert hat das richtige Format, ist aber unmöglich. Das fängt die Plausibilitätsprüfung.
11. Nach dem Import steht "MÃ¼ller" statt "Müller". Was ist die Ursache?
   - Lösung: Falsches Encoding, zum Beispiel UTF-8 als ANSI gelesen. Umlaute werden bei falscher Zeichenkodierung zerschossen. Encoding vor dem Import festlegen.
12. Wann ist Redundanz gewollt?
   - Lösung: Wenn sie bewusst geplant ist, zum Beispiel für schnellere Lesezugriffe. Ungewollte Redundanz führt zu Anomalien, darum normalisierst du. Gewollte Redundanz ist kontrolliert, etwa in Dokument-Datenbanken.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Die Kanzlei will Mandanten mit ihren Aufträgen in einer dokumentenorientierten Datenbank speichern. Relational gibt es Mandant(MandantID, Name, Ort) und Auftrag(AuftragID, MandantID, Art, Honorar). Modellieren Sie einen Mandanten mit zwei Aufträgen als JSON-Dokument und nennen Sie je einen Vorteil und einen Nachteil gegenüber der relationalen Lösung.

```
{
  "_id": 4711,
  "name": "Bäckerei Gies",
  "ort": "Fulda",
  "auftraege": [
    { "auftragId": 10, "art": "Steuer", "honorar": 1200 },
    { "auftragId": 11, "art": "Lohn", "honorar": 400 }
  ]
}

Vorteil: Mandant und Aufträge werden mit einem Zugriff ohne JOIN gelesen, das Schema ist flexibel und die Datenbank skaliert horizontal.
Nachteil: Auswertungen über alle Aufträge hinweg sind aufwendiger, und kopierte Daten führen zu Redundanz, die man selbst konsistent halten muss.
```

### Aufgabe 2

Erläutern Sie die vier ACID-Eigenschaften am Beispiel einer Überweisung von 500 Euro von Konto 1 auf Konto 2 und schreiben Sie die Überweisung als SQL-Transaktion. Tabelle: Konto(KontoID, Saldo).

```
Atomarität: Abbuchung und Gutschrift werden ganz oder gar nicht ausgeführt.
Konsistenz: Vorher und nachher ist die Datenbank gültig, die Summe beider Salden bleibt gleich.
Isolation: Parallele Transaktionen sehen keinen Zwischenstand, es gibt kein Lost Update.
Dauerhaftigkeit: Nach dem COMMIT ist die Überweisung gespeichert und übersteht auch einen Absturz.

BEGIN;
UPDATE Konto SET Saldo = Saldo - 500 WHERE KontoID = 1;
UPDATE Konto SET Saldo = Saldo + 500 WHERE KontoID = 2;
COMMIT;
-- tritt ein Fehler auf: ROLLBACK;
```
