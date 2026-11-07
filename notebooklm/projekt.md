# Projektplanung und Kosten: Netzplan, Gantt

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Netzplan, Gantt und Projektkosten sind reine Rechen- und Zeichenpunkte, Projektplanung steht fest im Prüfungskatalog.

## Inhalt

### 1. Rechenpunkte pur

Netzplan, Gantt und Projektkosten sind reine Rechen- und Zeichenpunkte. Wer das Schema kann, holt sie sicher. Typischer Fehler: In der Vorwärtsrechnung den kleinsten statt den größten Wert nehmen. Heute nicht. Das Schema ist immer gleich. Wer es zwei- oder dreimal geübt hat, rechnet jeden Netzplan in wenigen Minuten.

**Merk dir:** Vorwärts den größten Vorgänger nehmen, nicht den kleinsten.

### 2. Projekt zerlegen und darstellen

*Leitfrage: Wie zerlege ich ein Projekt?*

Phasen: Initialisierung, Planung, Durchführung, Abschluss. Der Projektstrukturplan zerlegt das Projekt in Arbeitspakete mit Verantwortlichem. Ein Meilenstein ist ein Prüfpunkt ohne Dauer. Das Gantt-Diagramm zeigt Vorgänge als Balken auf einer Zeitachse, sehr anschaulich. Der Netzplan zeigt Abhängigkeiten genauer und berechnet Puffer und kritischen Pfad, ist aber weniger anschaulich. Kanban nutzt ein Board mit Spalten. Das WIP-Limit begrenzt, wie viele Aufgaben gleichzeitig in einer Spalte sein dürfen. Ein Gantt-Diagramm zeigt die Vorgänge als Balken auf einer Zeitachse. Es ist anschaulicher, zeigt Abhängigkeiten aber schlechter als der Netzplan.

**Merk dir:** Meilenstein ist ein Prüfpunkt ohne Dauer.

| Werkzeug | Wofür |
|---|---|
| Projektstrukturplan | Projekt in Arbeitspakete zerlegen |
| Meilenstein | Prüfpunkt ohne Dauer |
| Gantt | Balken auf Zeitachse, anschaulich |
| Netzplan | Abhängigkeiten, Puffer, kritischer Pfad |
| Kanban | Board, Spalten, WIP-Limit |

### 3. Das Beispiel

*Leitfrage: Zeig mal das Beispiel.*

Unser Projekt hat fünf Vorgänge. B und C starten nach A, D nach C, und E braucht B und D als Vorgänger. Jeder Knoten hat oben die frühesten, unten die spätesten Zeiten. Die Anordnung variiert, halte dich an die Legende in der Aufgabe. Die Regeln vorwärts: Frühestes Ende ist frühester Anfang plus Dauer. Ein Nachfolger startet beim größten frühesten Ende seiner Vorgänger. Lies die Vorgängerliste ganz genau. Ein vergessener Vorgänger verschiebt alle folgenden Zeiten.

**Merk dir:** Oben die frühesten Zeiten, unten die spätesten.

```
Vorgang          Dauer  Vorgänger
A Analyse          3    keiner
B Implementierung  6    A
C Mockups          2    A
D Handbuch         3    C
E Abnahme          2    B und D

Knoten:  FAZ | Dauer | FEZ
           Vorgang
         SAZ |  GP   | SEZ
FEZ = FAZ + Dauer
FAZ = größter FEZ der Vorgänger
```

### 4. Vorwärtsrechnung

*Leitfrage: Wie geht die Vorwärtsrechnung?*

A startet bei 0 und endet bei 3. B und C hängen nur an A, sie starten also beide bei 3. B endet bei 3 plus 6, also 9. C endet bei 5. D startet nach C bei 5 und endet bei 8. E hat zwei Vorgänger: B endet bei 9, D bei 8. Du nimmst den größten Wert, also startet E bei 9. E endet bei 11. Das Projekt dauert also 11 Tage. Bei E zählt das spätere Ende der Vorgänger: B endet bei 9, D bei 8. Also startet E frühestens bei 9 und endet bei 11.

**Merk dir:** FEZ gleich FAZ plus Dauer.

| Vorgang | Dauer | FAZ | FEZ |
|---|---|---|---|
| A Analyse | 3 | 0 | 3 |
| B Implementierung | 6 | 3 | 9 |
| C Mockups | 2 | 3 | 5 |
| D Handbuch | 3 | 5 | 8 |
| E Abnahme | 2 | 9 | 11 |

Kontrollfrage: Ein Vorgang hat die Vorgänger X mit FEZ 7 und Y mit FEZ 12. Wann ist sein FAZ? Antwort: 12. Vorwärts immer den größten FEZ der Vorgänger nehmen.

### 5. Rückwärtsrechnung

*Leitfrage: Und rückwärts?*

Jetzt rückwärts vom Ende. E muss spätestens bei 11 enden, also spätestens bei 11 minus 2 gleich 9 anfangen. B und D müssen bei 9 fertig sein. D startet spätestens bei 6, B spätestens bei 3. C muss vor D fertig sein, also spätestes Ende 6, spätester Anfang 4. A hat zwei Nachfolger, B mit 3 und C mit 4. Rückwärts nimmst du den kleinsten Wert, also endet A spätestens bei 3. Bei C wird es spannend: C hat nur D als Nachfolger. D muss spätestens bei 6 starten, also muss C spätestens bei 6 enden und spätestens bei 4 beginnen.

**Merk dir:** SAZ gleich SEZ minus Dauer, rückwärts den kleinsten Nachfolger nehmen.

| Vorgang | SAZ | SEZ | GP |
|---|---|---|---|
| E | 9 | 11 | 0 |
| D | 6 | 9 | 1 |
| B | 3 | 9 | 0 |
| C | 4 | 6 | 1 |
| A | 0 | 3 | 0 |

### 6. Puffer und kritischer Pfad

*Leitfrage: Was ist Puffer, und was ist der kritische Pfad?*

Gesamtpuffer ist spätester Anfang minus frühester Anfang. Freier Puffer ist der früheste Anfang des Nachfolgers minus das eigene früheste Ende. C hat einen Gesamtpuffer von 1, aber freien Puffer 0. Verschiebt sich C, rutscht D mit, das Projektende aber nicht. D hat Gesamtpuffer 1 und freien Puffer 1. D kann sich einen Tag verschieben, ohne irgendwen zu stören. Der kritische Pfad besteht aus allen Vorgängen mit Gesamtpuffer 0: A, B, E. Jede Verzögerung dort verschiebt das Projektende. Der kritische Pfad hier ist A, B, E. Verzögert sich einer davon, verschiebt sich das ganze Projekt. C und D haben einen Tag Luft.

**Merk dir:** Kritischer Pfad: alle Vorgänge mit Puffer null.

```
GP = SAZ - FAZ  oder  SEZ - FEZ
FP = FAZ Nachfolger - eigener FEZ
     bei mehreren: kleinster FAZ

C: GP = 4 - 3 = 1
   FP = FAZ D 5 - FEZ C 5 = 0
D: GP = 6 - 5 = 1
   FP = FAZ E 9 - FEZ D 8 = 1

Kritischer Pfad: alle mit GP 0
A - B - E: 3 + 6 + 2 = 11 Tage
```

Kontrollfrage: B liegt auf dem kritischen Pfad und verzögert sich um 2 Tage. Was passiert? Antwort: Das Projekt endet 2 Tage später. Kritische Vorgänge haben Gesamtpuffer 0.

### 7. Kosten und Tabellenkalkulation

*Leitfrage: Und die Kosten?*

Fixkosten hängen nicht von der Menge ab, variable schon. Einzelkosten sind dem Projekt direkt zurechenbar, Gemeinkosten wie Miete nicht. Projektkosten sind Stunden mal Stundensatz plus Sachkosten. 120 Stunden mal 75 Euro sind 9000 Euro, plus 1500 Euro Sachkosten ergibt 10500 Euro. Excel: SUMME, MITTELWERT, WENN mit Prüfung, Dann, Sonst. SVERWEIS sucht in Spalte eins und liefert Spalte Index, FALSCH heißt exakt. Mit Dollarzeichen ist ein Bezug absolut und bleibt beim Kopieren fest. Outsourcing bringt Know-how und Tempo, aber Abhängigkeit und Datenschutzfragen. In der Tabellenkalkulation summierst du mit SUMME und rechnest mit absoluten Bezügen, also Dollarzeichen, wenn ein Stundensatz für alle Zeilen gilt.

**Merk dir:** Projektkosten gleich Stunden mal Stundensatz plus Sachkosten.

```
fix oder variabel
Einzelkosten oder Gemeinkosten
einmalig oder laufend
Stunden x Satz + Sachkosten
 120 h x 75 € = 9.000 €
 + 1.500 € Sachkosten = 10.500 €
=SUMME(B2:B9)  =MITTELWERT(B2:B9)
=WENN(B2>1000;"teuer";"ok")
=SVERWEIS(4711;A2:C99;3;FALSCH)
=B2*$E$1  $E$1 bleibt beim Kopieren
Outsourcing: Know-how, Kosten, Tempo
 Risiko: Abhängigkeit, Datenschutz
```

## Zusammenfassung

Merke: Vorwärts den größten frühesten Endwert der Vorgänger nehmen, rückwärts den kleinsten spätesten Anfang der Nachfolger. Kritischer Pfad heißt Puffer null.

## Übungsfragen mit Lösung

1. Ein Vorgang hat FAZ 4 und Dauer 3. Wie groß ist sein FEZ?
   - Lösung: 7. FEZ = FAZ + Dauer = 4 + 3 = 7.
2. Vorgang D hat die Vorgänger B (FEZ 9) und C (FEZ 6). Wie groß ist der FAZ von D?
   - Lösung: 9. Vorwärtsrechnung: der größte FEZ aller Vorgänger. D kann erst starten, wenn beide fertig sind.
3. Ein Vorgang hat FAZ 5 und SAZ 8. Wie groß ist sein Gesamtpuffer?
   - Lösung: 3. GP = SAZ - FAZ = 8 - 5 = 3.
4. Welche Vorgänge liegen auf dem kritischen Pfad?
   - Lösung: alle mit Gesamtpuffer 0. Kein Puffer: Jede Verzögerung verschiebt das Projektende.
5. Vorgang C hat FEZ 5 und Gesamtpuffer 1. Sein einziger Nachfolger D hat FAZ 5. Wie groß ist der freie Puffer von C?
   - Lösung: 0. FP = FAZ Nachfolger - FEZ = 5 - 5 = 0. Verschiebt sich C, verschiebt sich auch D.
6. Was zeigt ein Gantt-Diagramm besser als ein Netzplan?
   - Lösung: die zeitliche Lage der Vorgänge als Balken auf einer Zeitachse. Gantt ist anschaulich, Abhängigkeiten und Puffer zeigt der Netzplan genauer.
7. 80 Stunden à 70 € plus 1.200 € Sachkosten für Lizenzen. Wie hoch sind die Projektkosten in Euro?
   - Lösung: 6800. 80 × 70 € = 5.600 € + 1.200 € = 6.800 €.
8. Kosten, die sich dem Projekt direkt zurechnen lassen, etwa eine nur dafür gekaufte Lizenz, heißen ...
   - Lösung: Einzelkosten. Einzelkosten = direkt zurechenbar. Gemeinkosten (Miete, Strom) werden per Zuschlag verteilt.
9. In C2 steht =B2*$E$1. Die Formel wird nach C3 kopiert. Was steht in C3?
   - Lösung: =B3*$E$1. B2 ist relativ und wird zu B3, $E$1 ist absolut und bleibt fest.
10. Welche Formel gibt "teuer" aus, wenn B2 größer als 1000 ist, sonst "ok"?
   - Lösung: =WENN(B2>1000;"teuer";"ok"). WENN(Prüfung; Dann-Wert; Sonst-Wert).
11. Was liefert =SVERWEIS(4711;A2:C100;3;FALSCH)?
   - Lösung: den Wert aus Spalte 3 der Zeile, in der in Spalte A genau 4711 steht. Suchkriterium; Matrix; Spaltenindex; FALSCH = exakte Übereinstimmung. Gesucht wird immer in der ersten Spalte der Matrix.
12. Was begrenzt ein WIP-Limit auf einem Kanban-Board?
   - Lösung: die Anzahl gleichzeitig bearbeiteter Aufgaben in einer Spalte. Work in Progress begrenzen: weniger parallel, schneller fertig.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Berechnen Sie für folgende Vorgänge FAZ, FEZ, SAZ, SEZ und Gesamtpuffer, geben Sie die Projektdauer und den kritischen Pfad an: A Analyse 2 Tage (kein Vorgänger), B Datenbank 5 Tage (nach A), C Oberfläche 3 Tage (nach A), D Test 2 Tage (nach B und C).

```
Vorgang  Dauer  FAZ  FEZ  SAZ  SEZ  GP
A        2      0    2    0    2    0
B        5      2    7    2    7    0
C        3      2    5    4    7    2
D        2      7    9    7    9    0

Vorwärts: FEZ = FAZ + Dauer, D startet beim größten FEZ der Vorgänger (max(7; 5) = 7).
Rückwärts: SAZ = SEZ - Dauer, A endet spätestens beim kleinsten SAZ der Nachfolger (min(2; 4) = 2).
GP = SAZ - FAZ.
Projektdauer: 9 Tage.
Kritischer Pfad: A - B - D (alle GP = 0).
```

### Aufgabe 2

Für ein Projekt arbeiten ein Entwickler 120 Stunden (Stundensatz 75 €) und eine Projektleiterin 30 Stunden (Stundensatz 90 €), dazu kommen 2.000 € Sachkosten. a) Berechnen Sie die Projektkosten. b) In einer Tabelle stehen die Stunden in B2:B3, die Stundensätze in C2:C3 und ein Gemeinkostenzuschlag von 10 % in F1. Schreiben Sie die Formel für D2 (Personalkosten inklusive Zuschlag), die sich nach D3 kopieren lässt, und begründen Sie den absoluten Bezug.

```
a) Entwickler: 120 h × 75 € = 9.000 €
   Projektleiterin: 30 h × 90 € = 2.700 €
   Personalkosten: 11.700 €
   + Sachkosten: 2.000 €
   Projektkosten: 13.700 €

b) D2: =B2*C2*(1+$F$1)
   B2 und C2 sind relativ und werden beim Kopieren nach D3 zu B3 und C3.
   $F$1 ist absolut, weil der Zuschlag nur in einer Zelle steht und beim Kopieren fest bleiben muss.
```
