# Klassendiagramm und OOP

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Das Klassendiagramm ist das wichtigste Thema in GA1.

## Inhalt

### 1. Thema Nr. 1 in GA1

Das Klassendiagramm ist das wichtigste Thema in GA1. Wer es kann, holt hier sichere Punkte. Typischer Fehler: die Raute auf der falschen Seite. Nach diesem Clip passiert dir das nicht mehr. In fast jeder GA1 sollst du ein Klassendiagramm zeichnen, ergänzen oder lesen. Mit den Regeln aus diesem Video holst du dort sichere Punkte.

**Merk dir:** Die Raute sitzt immer beim Ganzen.

### 2. Aufbau einer Klasse

*Leitfrage: Fangen wir ganz vorne an. Wie ist eine Klasse aufgebaut?*

Eine Klasse ist ein Kasten mit drei Teilen. Ganz oben steht der Name. In der Mitte die Attribute. Immer Name, Doppelpunkt, Datentyp. Statische Attribute werden im Diagramm unterstrichen. Sie gehören zur Klasse, nicht zu einem einzelnen Objekt. Unten die Methoden: Parameter in Klammern, Rückgabetyp hinter dem Doppelpunkt. Der Konstruktor heißt wie die Klasse. Ein Konstruktor hat keinen Rückgabetyp, denn er erzeugt ja das Objekt selbst. Darum steht hinter Mandant Klammer name kein Doppelpunkt. Getter und Setter musst du in der Prüfung nur zeichnen, wenn sie gefragt sind. Sonst reichen die fachlich wichtigen Methoden.

**Merk dir:** Klasse: Name oben, Attribute Mitte, Methoden unten.

```
┌───────────────────────────┐
│ Mandant                   │
├───────────────────────────┤
│ - id: int                 │
│ - name: String            │
│ # ort: String             │
│ - anzahl: int   (static)  │
├───────────────────────────┤
│ + Mandant(name: String)   │
│ + getName(): String       │
│ + addAuftrag(a: Auftrag)  │
└───────────────────────────┘
```

### 3. Sichtbarkeiten

*Leitfrage: Was bedeuten diese Plus- und Minuszeichen?*

Plus heißt public. Alle dürfen zugreifen. Minus heißt private. Nur die Klasse selbst. Raute heißt protected. Die Klasse und ihre Unterklassen. Das wird gern abgefragt. Tilde heißt package. Attribute sind meist private, Zugriff über Getter und Setter. Das ist Kapselung. Warum ist private der Normalfall? Weil die Klasse so kontrolliert, wer ihre Daten ändert. Ein Setter kann zum Beispiel verhindern, dass ein negatives Honorar gespeichert wird.

**Merk dir:** Plus public, Minus private, Raute protected, Tilde package.

| Zeichen | Bedeutung | Zugriff |
|---|---|---|
| + | public | alle |
| - | private | nur die Klasse selbst |
| # | protected | Klasse und Unterklassen |
| ~ | package | gleiches Paket |

### 4. Beziehungen

*Leitfrage: Jetzt die Linien zwischen den Klassen. Da gibt es ja Rauten und Dreiecke.*

Eine einfache Linie ist eine Assoziation. Die Klassen kennen sich. Leere Raute: Aggregation. Das Teil kann allein existieren, wie ein Spieler ohne Mannschaft. Gefüllte Raute: Komposition. Das Teil stirbt mit dem Ganzen, wie ein Raum mit dem Gebäude. Die Raute sitzt immer beim Ganzen. Leeres Dreieck an der Oberklasse heißt Vererbung, also ist ein. Gestrichelt mit Dreieck: implementiert ein Interface. Die Frage, die alles klärt: Kann das Teil ohne das Ganze existieren? Ein Mitarbeiter existiert auch ohne Abteilung, also Aggregation. Eine Rechnungsposition ohne Rechnung ergibt keinen Sinn, also Komposition. Vererbung prüfst du mit dem Satz: ist ein. Ein Privatmandant ist ein Mandant. Passt der Satz nicht, ist es keine Vererbung.

**Merk dir:** Leere Raute Aggregation, gefüllte Raute Komposition, Dreieck Vererbung.

| Linie | Name | Bedeutung |
|---|---|---|
| —— | Assoziation | kennt, benutzt |
| ——◇ | Aggregation | Teil kann allein existieren |
| ——◆ | Komposition | Teil stirbt mit dem Ganzen |
| ——▷ | Vererbung | ist ein |
| - - -▷ | Realisierung | implementiert Interface |

Kontrollfrage: Ein Gebäude hat Räume. Ohne Gebäude gibt es den Raum nicht. Welche Raute? Antwort: gefüllte Raute, Komposition. Der Raum stirbt mit dem Gebäude: Komposition, gefüllte Raute beim Gebäude.

### 5. Multiplizitäten

*Leitfrage: Und die Zahlen an den Linien?*

An die Linien kommen Multiplizitäten. Hier steht eine 1 beim Mandanten und null bis Stern beim Auftrag. Eins heißt genau einer. Null Punkt Punkt eins heißt keiner oder einer. Stern heißt beliebig viele. Eins Punkt Punkt Stern heißt mindestens einer. Die Zahl steht auf der gegenüberliegenden Seite. Ein Mandant hat null bis viele Aufträge, ein Auftrag genau einen Mandanten. Lies Multiplizitäten immer von der gegenüberliegenden Seite: Ein Mandant hat null bis viele Aufträge, ein Auftrag gehört zu genau einem Mandanten. In der Prüfung gibt es oft einen Punkt pro richtig gesetzter Multiplizität. Vergiss also keine Linie.

**Merk dir:** 1 heißt genau einer, 0..* heißt beliebig viele.

```
Mandant 1 ──────── 0..* Auftrag

1      genau einer
0..1   keiner oder einer
*      beliebig viele, also 0..*
1..*   mindestens einer

Ein Mandant hat 0 bis viele Aufträge.
Ein Auftrag gehört zu genau 1 Mandant.
```

Kontrollfrage: Mandant 1 ──── 0..* Auftrag. Zu wie vielen Mandanten gehört ein Auftrag? Antwort: genau 1. Die 1 steht beim Mandanten, also gehört jeder Auftrag zu genau einem Mandanten.

### 6. Die 4 Säulen der OOP

*Leitfrage: Die vier Säulen der OOP, kannst du die kurz erklären?*

Kapselung: Daten sind privat, Zugriff nur über Methoden. Vererbung: Die Unterklasse übernimmt Attribute und Methoden der Oberklasse. Polymorphie: Die Unterklasse überschreibt eine Methode. Gleicher Aufruf, je nach Objekt anderes Verhalten. Abstraktion: Nur das Wichtige modellieren, mit abstrakten Klassen und Interfaces. Polymorphie im Alltag: Du rufst bei jedem Mandanten berechneHonorar auf. Ein Privatmandant rechnet anders als ein Firmenmandant, aber der Aufruf ist derselbe.

**Merk dir:** Kapselung, Vererbung, Polymorphie, Abstraktion.

| Prinzip | In einem Satz |
|---|---|
| Kapselung | Daten private, Zugriff über Methoden |
| Vererbung | Unterklasse übernimmt alles der Oberklasse |
| Polymorphie | gleicher Aufruf, anderes Verhalten |
| Abstraktion | nur das Wichtige modellieren |

### 7. Abstrakte Klasse vs. Interface

*Leitfrage: Abstrakte Klasse oder Interface, wo ist der Unterschied?*

Von beiden kannst du keine Objekte erzeugen. Die abstrakte Klasse darf Attribute und fertige Methoden haben. Das Interface gibt klassisch nur Signaturen vor. Erben geht nur von einer Klasse. Interfaces kann eine Klasse dagegen mehrere implementieren. In UML ist die abstrakte Klasse kursiv. Das Interface trägt den Stereotyp interface in spitzen Klammern. Eine Klasse darf nur von einer Klasse erben, aber beliebig viele Interfaces implementieren. Darum nimmt man Interfaces für Fähigkeiten wie druckbar oder exportierbar.

**Merk dir:** Von abstrakter Klasse und Interface kann man keine Objekte erzeugen.

|  | Abstrakte Klasse | Interface |
|---|---|---|
| Objekte erzeugen? | nein | nein |
| Attribute, fertige Methoden | ja | klassisch nein |
| Wie viele? | nur von einer erben | mehrere implementieren |
| UML | kursiv, {abstract} | «interface» |

## Zusammenfassung

Also: Minus privat, Plus öffentlich, Raute protected. Leere Raute Aggregation, gefüllte Raute Komposition, und die Raute sitzt immer beim Ganzen. Dreieck heißt Vererbung.

## Übungsfragen mit Lösung

1. Was bedeutet das Zeichen # vor einem Attribut?
   - Lösung: protected. # = protected: Klasse und Unterklassen.
2. Gebäude und Raum: Der Raum existiert nicht ohne das Gebäude. Welche Beziehung?
   - Lösung: Komposition. Komposition, gefüllte Raute beim Gebäude.
3. Mannschaft und Spieler: Der Spieler kann auch ohne die Mannschaft existieren.
   - Lösung: Aggregation. Aggregation, leere Raute.
4. Was bedeutet die Multiplizität 1..*?
   - Lösung: mindestens einer. Untergrenze 1, Obergrenze unbegrenzt.
5. Eine Unterklasse überschreibt eine Methode. Ein Aufruf verhält sich je nach Objekt anders. Wie heißt das?
   - Lösung: Polymorphie. Polymorphie = Vielgestaltigkeit.
6. Wie viele Interfaces kann eine Klasse implementieren?
   - Lösung: mehrere. Erben nur von einer Klasse, implementieren beliebig viele Interfaces.
7. Wie erkennst du in UML ein statisches Attribut?
   - Lösung: unterstrichen. Unterstrichen = static.
8. Welcher Pfeil steht für Vererbung?
   - Lösung: leeres Dreieck an der Oberklasse. Das leere Dreieck zeigt auf die Oberklasse.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Modelliere in Textform: Eine abstrakte Klasse Person (privat name: String, öffentliche Methode getName). Die Klassen Mitarbeiter (privat gehalt: double) und Mandant (privat mandantNr: int) erben davon. Ein Mitarbeiter betreut 0 bis viele Mandanten, ein Mandant hat genau 1 betreuenden Mitarbeiter.

```
{abstract} Person
  - name: String
  + getName(): String

Mitarbeiter ——▷ Person
  - gehalt: double

Mandant ——▷ Person
  - mandantNr: int

Mitarbeiter 1 ——— betreut ——— 0..* Mandant
```
