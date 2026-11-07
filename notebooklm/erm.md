# ER-Modell und Normalisierung

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Datenbanken sind mit 83 % das häufigste Themencluster.

## Inhalt

### 1. Hier liegen die Punkte

Datenbanken sind mit 83 Prozent das häufigste Themencluster der Prüfung. Du lernst jetzt drei Dinge: ER-Modell lesen, in Tabellen umwandeln, normalisieren. ER-Modell, Tabellenmodell und SQL hängen zusammen. Wer das ER-Modell sauber umwandeln kann, schreibt danach auch die passenden JOINs.

**Merk dir:** Datenbanken sind das häufigste Themencluster der AP2.

### 2. ER-Modell: die Bausteine

*Leitfrage: Was sind die Bausteine eines ER-Modells?*

Entitäten sind Rechtecke, zum Beispiel Mandant. Attribute sind Ovale. Der Schlüssel wird unterstrichen. Beziehungen sind Rauten, zum Beispiel erteilt. An die Linien kommen Kardinalitäten: eins zu eins, eins zu n oder n zu m. In der Prüfung ist die Krähenfuß-Notation genauso erlaubt wie die Chen-Notation mit Rauten. Bleib nur innerhalb eines Diagramms bei einer Notation.

**Merk dir:** Rechteck Entität, Oval Attribut, Raute Beziehung.

| Symbol | Bedeutung |
|---|---|
| Rechteck | Entität, etwa Mandant |
| Oval | Attribut, Schlüssel unterstrichen |
| Raute | Beziehung, etwa erteilt |
| 1:1, 1:n, n:m | Kardinalität |

### 3. Kardinalität in Tabellen

*Leitfrage: Und wie wird daraus eine Tabelle? Wo kommt der Fremdschlüssel hin?*

Das ist der wichtigste Punkt. Eins zu eins: Der Fremdschlüssel kommt in eine der beiden Tabellen. Eins zu n: Fremdschlüssel auf die n-Seite. Ein Mandant hat viele Aufträge, also bekommt Auftrag die MandantID. n zu m: Du brauchst eine Zwischentabelle mit beiden Fremdschlüsseln. Warum auf die n-Seite? Ein Auftrag gehört zu genau einem Mandanten, also passt eine einzelne MandantID in jede Auftragszeile. Andersherum müsstest du viele Auftragsnummern in eine Zelle quetschen, und das verbietet die erste Normalform.

**Merk dir:** Bei 1 zu n kommt der Fremdschlüssel auf die n-Seite.

| Beziehung | Umsetzung |
|---|---|
| 1:1 | Fremdschlüssel in eine der Tabellen |
| 1:n | Fremdschlüssel auf die n-Seite |
| n:m | Zwischentabelle mit beiden Fremdschlüsseln |

Kontrollfrage: Ein Mandant hat viele Aufträge. Wohin kommt die MandantID? Antwort: in die Tabelle Auftrag. 1:n, der Fremdschlüssel kommt auf die n-Seite, also zu Auftrag.

### 4. Beispiel n:m

*Leitfrage: Was mache ich bei n zu m?*

Ein Mitarbeiter arbeitet an vielen Aufträgen, ein Auftrag hat viele Mitarbeiter. Also n zu m. Die Zwischentabelle Mitarbeit bekommt beide Fremdschlüssel. Infos wie die Stunden gehören genau hierher. Beide Fremdschlüssel zusammen bilden den Primärschlüssel. Das ist ein zusammengesetzter Schlüssel. Der Primärschlüssel der Zwischentabelle besteht meist aus beiden Fremdschlüsseln zusammen. Das nennt man zusammengesetzten Schlüssel. Eigenschaften der Beziehung, wie die Stunden eines Mitarbeiters an einem Auftrag, gehören genau in diese Zwischentabelle.

**Merk dir:** n zu m braucht eine Zwischentabelle mit beiden Fremdschlüsseln.

```
Mitarbeiter(MitarbeiterID, Name)
Auftrag(AuftragID, Art)

Mitarbeit(#MitarbeiterID, #AuftragID,
          Stunden)

#: Fremdschlüssel
Beide # zusammen: Primärschlüssel
= zusammengesetzter Schlüssel
```

### 5. Anomalien

*Leitfrage: Was sind Anomalien?*

Schau hin: Bäckerei Gies steht doppelt drin. Diese Redundanz führt zu Anomalien. Änderungsanomalie: Zieht der Mandant um, änderst du viele Zeilen und vergisst eine. Einfügeanomalie: Einen neuen Mandanten ohne Auftrag kannst du nicht speichern. Löschanomalie: Löschst du den letzten Auftrag, ist der Mandant auch weg. Deshalb normalisiert man. Einfügeanomalie: Du kannst einen neuen Mandanten nicht speichern, weil er noch keinen Auftrag hat. Löschanomalie: Du löschst den letzten Auftrag und verlierst damit den ganzen Mandanten.

**Merk dir:** Redundanz führt zu Änderungs-, Einfüge- und Löschanomalien.

```
ID | Mandant       | Ort   | Art
10 | Bäckerei Gies | Fulda | Steuer
11 | Bäckerei Gies | Fulda | Lohn

Ändern:   Ort in vielen Zeilen ändern
Einfügen: Mandant ohne Auftrag geht nicht
Löschen:  letzter Auftrag weg, Mandant weg
```

### 6. Die 3 Normalformen

*Leitfrage: Und die drei Normalformen?*

Erste Normalform: Alle Werte atomar. Keine zwei Telefonnummern in einer Zelle. Zweite: Alles hängt vom ganzen Schlüssel ab, nicht nur von einem Teil. Betrifft nur zusammengesetzte Schlüssel. Dritte: Kein Nicht-Schlüsselattribut hängt von einem anderen ab. Klassiker: Die Postleitzahl bestimmt den Ort. Die Lösung: Ort kommt in eine eigene Tabelle mit der Postleitzahl als Schlüssel. Ein Beispiel zur dritten Normalform: Steht beim Mandanten Postleitzahl und Ort, hängt der Ort an der Postleitzahl, nicht am Schlüssel. Sauber wäre eine eigene Tabelle für Orte. In der Prüfung sollst du oft eine Tabelle in die dritte Normalform bringen. Geh Stufe für Stufe vor und nenne bei jeder Tabelle den Primärschlüssel.

**Merk dir:** 1NF atomar, 2NF ganzer Schlüssel, 3NF keine transitiven Abhängigkeiten.

| NF | Regel | Merke |
|---|---|---|
| 1. NF | alle Werte atomar | ein Feld, ein Wert |
| 2. NF | hängt vom ganzen Schlüssel ab | nur bei zusammengesetztem Schlüssel |
| 3. NF | keine Abhängigkeit zwischen Nicht-Schlüsseln | keine transitiven Abhängigkeiten |

Kontrollfrage: Im Mandanten stehen PLZ und Ort. Die PLZ bestimmt den Ort, ist aber kein Schlüssel. Was ist verletzt? Antwort: 3. NF. Transitive Abhängigkeit: Schlüssel bestimmt PLZ, PLZ bestimmt Ort.

### 7. Merksatz

*Leitfrage: Gibt es einen Merksatz dafür?*

Jedes Attribut hängt vom Schlüssel ab, vom ganzen Schlüssel und von nichts als dem Schlüssel. Das sind die drei Normalformen in einem Satz. Merk ihn dir. Sprich den Merksatz ein paarmal laut. Er hilft dir in der Prüfung sofort zu prüfen, ob eine Spalte in die richtige Tabelle gehört.

**Merk dir:** Vom Schlüssel, vom ganzen Schlüssel, von nichts als dem Schlüssel.

## Zusammenfassung

Merke: Bei eins zu n kommt der Fremdschlüssel auf die n-Seite. Bei n zu m brauchst du eine Zwischentabelle. Und: vom Schlüssel, vom ganzen Schlüssel, und von nichts als dem Schlüssel.

## Übungsfragen mit Lösung

1. Bei einer 1:n-Beziehung kommt der Fremdschlüssel ...
   - Lösung: auf die n-Seite. Jeder Auftrag merkt sich seinen einen Mandanten.
2. Was brauchst du bei einer n:m-Beziehung?
   - Lösung: eine Zwischentabelle. Zwischentabelle mit beiden Fremdschlüsseln.
3. In einer Zelle steht "0661-123, 0171-456". Welche Normalform ist verletzt?
   - Lösung: 1. NF. Werte sind nicht atomar.
4. PLZ bestimmt Ort, PLZ ist kein Schlüssel. Welche Normalform ist verletzt?
   - Lösung: 3. NF. Transitive Abhängigkeit: Schlüssel → PLZ → Ort.
5. Die 2. NF ist nur ein Thema, wenn ...
   - Lösung: der Primärschlüssel zusammengesetzt ist. Teilabhängigkeiten gibt es nur bei mehrteiligen Schlüsseln.
6. Löscht man den letzten Auftrag, ist der Mandant auch weg. Welche Anomalie?
   - Lösung: Löschanomalie. Löschen reißt ungewollt Daten mit.
7. Was ist im ER-Modell eine Raute?
   - Lösung: Beziehung. Rechteck = Entität, Oval = Attribut, Raute = Beziehung.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Eine Kanzlei speichert: Mitarbeiter (Personalnummer, Name), Mandanten (MandantNr, Name, PLZ, Ort) und welcher Mitarbeiter wie viele Stunden für welchen Mandanten gearbeitet hat (ein Mitarbeiter hat viele Mandanten, ein Mandant viele Mitarbeiter). Gib die Tabellen in 3. NF mit Primär- und Fremdschlüsseln an.

```
Mitarbeiter(PersonalNr, Name)
Mandant(MandantNr, Name, #PLZ)
Ort(PLZ, Ort)
Arbeitszeit(#PersonalNr, #MandantNr, Stunden)

Primärschlüssel: PersonalNr, MandantNr, PLZ, und in Arbeitszeit beide zusammen.
# = Fremdschlüssel. Ort ist ausgelagert wegen 3. NF (PLZ → Ort).
```
