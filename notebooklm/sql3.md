# SQL: Ändern, Anlegen, Rechte

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

INSERT, UPDATE, DELETE kommen fast immer als kleine Teilaufgabe.

## Inhalt

### 1. Eine Zeile, alles weg

Was macht diese Zeile? Kein WHERE, also löscht sie alle Aufträge. Die ganze Tabelle. INSERT, UPDATE und DELETE kommen fast immer als kleine Teilaufgabe. Schnelle Punkte, wenn du sauber bist. Darum gehört in der Praxis vor jedes DELETE ein Blick mit SELECT und dem gleichen WHERE. Erst schauen, was getroffen wird, dann löschen.

**Merk dir:** DELETE oder UPDATE ohne WHERE trifft die ganze Tabelle.

```
DELETE FROM Auftrag;
```

### 2. Daten ändern: DML

*Leitfrage: Wie ändere ich Daten richtig?*

INSERT INTO fügt eine Zeile ein. Die Werte stehen hinter VALUES. UPDATE ändert bestehende Werte, mit SET. DELETE FROM löscht Zeilen. Bei UPDATE und DELETE immer ein WHERE. Ohne WHERE änderst oder löschst du die ganze Tabelle. Bei INSERT nennst du am besten die Spalten ausdrücklich: INSERT INTO Mandant, Klammer Name, Ort, Klammer zu, VALUES. Dann stimmt die Zuordnung auch, wenn sich die Tabelle ändert. UPDATE kann mehrere Spalten auf einmal ändern: SET Ort gleich Kassel, Komma, PLZ gleich 34117.

**Merk dir:** INSERT INTO mit VALUES, UPDATE mit SET, DELETE FROM.

```
INSERT INTO Mandant (MandantID, Name, Ort)
VALUES (4, 'Café Rhön', 'Fulda');

UPDATE Auftrag
SET Honorar = Honorar * 1.05
WHERE Art = 'Lohn';

DELETE FROM Auftrag
WHERE AuftragID = 11;
```

Kontrollfrage: Mit welchem Befehl änderst du bestehende Werte? Antwort: UPDATE. UPDATE mit SET und WHERE.

### 3. Tabellen anlegen: DDL

*Leitfrage: Und wie lege ich eine neue Tabelle an?*

CREATE TABLE legt eine Tabelle an. PRIMARY KEY macht jede Zeile eindeutig. Jede Spalte bekommt einen Datentyp. INT für ganze Zahlen, VARCHAR für Text, DECIMAL für Geldbeträge, DATE fürs Datum. FOREIGN KEY mit REFERENCES verweist auf die andere Tabelle. ALTER TABLE ändert eine Tabelle, hier kommt mit ADD eine Spalte dazu. Ein INDEX beschleunigt die Suche. Den Fremdschlüssel legst du mit FOREIGN KEY und REFERENCES an. So weiß die Datenbank, auf welche Tabelle er zeigt, und kann die Integrität prüfen. NOT NULL erzwingt, dass ein Feld immer gefüllt ist. UNIQUE verhindert doppelte Werte, zum Beispiel bei der E-Mail-Adresse.

**Merk dir:** CREATE TABLE: jede Spalte mit Datentyp, dazu ein PRIMARY KEY.

```
CREATE TABLE Auftrag (
  AuftragID  INT PRIMARY KEY,
  MandantID  INT NOT NULL,
  Art        VARCHAR(30),
  Honorar    DECIMAL(10,2),
  Datum      DATE,
  FOREIGN KEY (MandantID)
    REFERENCES Mandant(MandantID)
);
ALTER TABLE Auftrag ADD Status VARCHAR(20);
CREATE INDEX idx_art ON Auftrag(Art);
```

### 4. Rechte: DCL

*Leitfrage: Wer darf überhaupt was in der Datenbank?*

Rechte vergibst du mit GRANT. Und entziehst sie mit REVOKE. Jeder bekommt nur, was er wirklich braucht. Das ist das Prinzip der minimalen Rechte. In der Kanzlei heißt das zum Beispiel: Die Auszubildende darf Belege lesen, aber nicht löschen. Also GRANT SELECT, aber kein DELETE.

**Merk dir:** GRANT vergibt Rechte, REVOKE entzieht sie. Nur so viel wie nötig.

```
GRANT SELECT, INSERT ON Auftrag TO azubi;
REVOKE INSERT ON Auftrag FROM azubi;
```

### 5. Die drei Sprachteile

*Leitfrage: Das sind jetzt drei Gruppen von Befehlen. Wie heißen die?*

DDL definiert Strukturen: CREATE, ALTER, DROP. DML bearbeitet Daten: SELECT, INSERT, UPDATE, DELETE. DCL regelt Rechte: GRANT und REVOKE. SELECT wird je nach Lehrbuch auch als DQL getrennt aufgeführt. Wenn du in der Prüfung SELECT bei DML einordnest, ist das aber üblich und richtig.

**Merk dir:** DDL für Strukturen, DML für Daten, DCL für Rechte.

| Teil | Befehle |
|---|---|
| DDL Definition | CREATE, ALTER, DROP |
| DML Manipulation | SELECT, INSERT, UPDATE, DELETE |
| DCL Control | GRANT, REVOKE |

Kontrollfrage: Zu welchem Sprachteil gehört ALTER TABLE? Antwort: DDL. ALTER ändert die Struktur, also Definition.

### 6. SQL-Injection

*Leitfrage: Zum Schluss Sicherheit. Was ist SQL-Injection?*

Ein Klassiker. Die Benutzereingabe wird direkt in den SQL-String geklebt. So schleust der Angreifer eigenen SQL-Code ein und bekommt alle Zeilen. Der Schutz: Prepared Statements mit Platzhaltern. Dazu Eingaben prüfen und minimale Rechte für den Datenbankbenutzer. Ein Prepared Statement trennt Code und Daten. Die Eingabe wird nie als SQL ausgeführt, sondern nur als Wert eingesetzt. Zusätzlich hilft das Prinzip der minimalen Rechte: Selbst wenn ein Angriff gelingt, darf das Datenbankkonto der Anwendung möglichst wenig.

**Merk dir:** Gegen SQL-Injection helfen Prepared Statements.

```
Eingabe: ' OR '1'='1
sql = "SELECT * FROM User
  WHERE name = '" + eingabe + "'"
→ WHERE name = '' OR '1'='1'
→ ALLE Zeilen!

Schutz: Prepared Statements
SELECT * FROM User WHERE name = ?
```

## Zusammenfassung

Also: DDL für Strukturen, DML für Daten, DCL für Rechte. Bei UPDATE und DELETE immer ein WHERE. Und gegen SQL-Injection helfen Prepared Statements.

## Übungsfragen mit Lösung

1. Was passiert bei DELETE FROM Auftrag; ohne WHERE?
   - Lösung: Alle Zeilen werden gelöscht. Ohne WHERE betrifft der Befehl die ganze Tabelle.
2. Zu welchem Sprachteil gehört GRANT?
   - Lösung: DCL. Data Control Language regelt Rechte.
3. Welcher Datentyp passt für Geldbeträge?
   - Lösung: DECIMAL(10,2). DECIMAL speichert Nachkommastellen exakt.
4. Was schützt am besten gegen SQL-Injection?
   - Lösung: Prepared Statements. Platzhalter trennen Code und Daten.
5. Mit welchem Befehl änderst du bestehende Werte?
   - Lösung: UPDATE. UPDATE ... SET ... WHERE ...
6. Womit fügst du einer bestehenden Tabelle eine Spalte hinzu?
   - Lösung: ALTER TABLE ... ADD. ALTER gehört zur DDL.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Erhöhe alle Honorare der Art 'Steuer' um 10 Prozent.

```
UPDATE Auftrag
SET Honorar = Honorar * 1.1
WHERE Art = 'Steuer';
```
