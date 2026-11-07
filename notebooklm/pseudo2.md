# Sortieren, Suchen, Rekursion

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Bubble, Selection und Insertion Sort stehen seit 2025 ausdrücklich im Katalog.

## Inhalt

### 1. Neu im Katalog seit 2025

Seit dem Katalog 2025 stehen drei Sortierverfahren ausdrücklich drin. Die kannst du nicht mehr überspringen. Weiterhin im Katalog: lineare und binäre Suche und Rekursion. Du musst die Verfahren nicht auswendig programmieren können wie ein Profi. Aber du musst sie erklären, einen Durchlauf von Hand durchspielen und erkennen, welches Verfahren ein gegebener Code ist.

**Merk dir:** Bubble, Selection, Insertion Sort, Suche und Rekursion stehen im Katalog.

- Bubble Sort
- Selection Sort
- Insertion Sort
- Lineare und binäre Suche
- Rekursion

### 2. Bubble Sort live

*Leitfrage: Dann zeig mal. Wie funktioniert Bubble Sort?*

Bubble Sort vergleicht immer zwei Nachbarn. 5 ist größer als 1, also tauschen. 5 gegen 4. Wieder größer, wieder tauschen. 5 gegen 2, tauschen. Nach Durchlauf 1 steht da 1, 4, 2, 5. Die größte Zahl ist hinten, wie eine aufsteigende Blase. Das wiederholst du n minus 1 Mal. Wird in einem Durchlauf nichts mehr getauscht, darfst du früher abbrechen. Merk dir das Bild: Die großen Werte steigen auf wie Blasen im Wasser. Nach dem ersten Durchlauf steht das größte Element garantiert ganz hinten. Darum braucht jeder weitere Durchlauf einen Vergleich weniger. Und hat ein Durchlauf gar nicht getauscht, ist die Liste schon sortiert, und du kannst früh aufhören.

**Merk dir:** Bubble Sort tauscht Nachbarn, das Größte wandert nach hinten.

Kontrollfrage: Wie sah die Liste nach dem ersten Durchlauf aus? Antwort: 1, 4, 2, 5. Nur die 5 ist nach hinten gewandert. Sortiert ist erst nach weiteren Durchläufen.

### 3. Bubble Sort in Pseudocode

*Leitfrage: Und wie sieht das dann im Pseudocode aus?*

Im Code sind das zwei verschachtelte Schleifen. Die innere vergleicht die Nachbarn. Zum Tauschen brauchst du die Hilfsvariable temp. Das nennt man Dreieckstausch. Ohne temp überschreibst du einen Wert. Das kommt gerne als Fehlersuche dran. Warum temp? Schreibst du einfach a gleich b, ist der alte Wert von a weg. Erst sichern, dann überschreiben, dann zurückholen. Die innere Schleife läuft bis Länge minus eins minus Durchlauf. Das minus eins brauchst du, weil du immer j mit j plus eins vergleichst.

**Merk dir:** Tauschen geht nur mit Hilfsvariable temp: der Dreieckstausch.

```
für i = 0 bis n - 2
  für j = 0 bis n - 2 - i
    falls a[j] > a[j+1] dann
      temp = a[j]
      a[j] = a[j+1]
      a[j+1] = temp
    ende falls
  ende für
ende für
```

### 4. Selection und Insertion Sort

*Leitfrage: Es gibt ja noch zwei andere Sortierverfahren. Was ist da der Unterschied?*

Selection Sort sucht immer das kleinste Element im unsortierten Teil und tauscht es nach vorne. Insertion Sort ist wie Spielkarten auf der Hand: nächste Karte nehmen, links an die richtige Stelle stecken. Alle drei haben im schlechtesten Fall quadratische Laufzeit, O von n Quadrat. Ein Unterschied, der gern gefragt wird: Insertion Sort ist schnell, wenn die Liste fast sortiert ist, weil kaum verschoben werden muss. Selection Sort macht immer gleich viele Vergleiche. Alle drei Verfahren liegen im Normalfall bei O von n Quadrat. Für große Datenmengen nimmt man in der Praxis schnellere Verfahren, aber die sind nicht prüfungsrelevant.

**Merk dir:** Selection holt das Kleinste nach vorn, Insertion sortiert ein wie Spielkarten.

| Verfahren | Idee |
|---|---|
| Bubble Sort | Nachbarn vergleichen, tauschen |
| Selection Sort | Minimum im Rest suchen, nach vorne tauschen |
| Insertion Sort | Nächstes Element links einfügen |

### 5. Binäre Suche: immer halbieren

*Leitfrage: Und Suchen? Ich gehe die Liste doch einfach von vorne durch, oder?*

Gesucht ist die 23. Wichtig: Die binäre Suche klappt nur bei sortierten Listen. Blick in die Mitte: 12. Die 23 ist größer, also weiter in der rechten Hälfte. Übrig sind 16, 23 und 38. Neue Mitte: 23. Gefunden! Jeder Schritt halbiert, darum O von log n. Die lineare Suche ist O von n. Wie stark das spart, siehst du an Zahlen: Bei 1000 Einträgen braucht die lineare Suche im schlimmsten Fall 1000 Vergleiche. Die binäre Suche braucht etwa 10, weil sie jedes Mal halbiert. Aber Achtung: Ist die Liste nicht sortiert, liefert die binäre Suche falsche Ergebnisse. Das ist eine beliebte Ankreuz- und Erklärfrage.

**Merk dir:** Binäre Suche nur bei sortierten Listen: immer die Mitte prüfen und halbieren.

Kontrollfrage: Was muss für die binäre Suche gelten? Antwort: Die Liste ist sortiert. Nur bei sortierten Daten weißt du, ob links oder rechts weitergesucht wird.

### 6. Rekursion: fakultaet von 4

*Leitfrage: Rekursion fand ich immer verwirrend. Kannst du das an einem Beispiel zeigen?*

Rekursion heißt: Eine Funktion ruft sich selbst auf, mit einem kleineren Problem. Runter bis fakultaet von 1. Das ist die Abbruchbedingung. Fehlt sie, gibt es einen Stack Overflow. Jetzt löst sich der Stapel von oben auf. fakultaet von 1 liefert 1, fakultaet von 2 liefert 2. Dann 6 und ganz unten 24. Also 4 mal 3 mal 2 mal 1 gleich 24. Jeder Aufruf wartet auf das Ergebnis des nächsten. Erst wenn die Abbruchbedingung erreicht ist, laufen die Ergebnisse zurück nach oben: 1, dann 2, dann 6, dann 24. Jede Rekursion lässt sich auch mit einer Schleife lösen. Rekursion ist oft eleganter, braucht aber mehr Speicher auf dem Stack.

**Merk dir:** Rekursion braucht eine Abbruchbedingung, sonst Stack Overflow.

### 7. Laufzeiten merken

*Leitfrage: Zum Schluss Laufzeiten. Wie merke ich mir das am einfachsten?*

O von 1 ist ein direkter Zugriff. O von log n ist die binäre Suche. O von n ist eine einfache Schleife. O von n Quadrat sind zwei verschachtelte Schleifen. Also Bubble, Selection und Insertion Sort. So erkennst du das schnell im Code: eine Schleife über alles heißt O von n. Eine Schleife in einer Schleife heißt O von n Quadrat. Halbieren in jedem Schritt heißt O von log n.

**Merk dir:** Zwei verschachtelte Schleifen heißt O von n Quadrat.

| O-Notation | Beispiel |
|---|---|
| O(1) | Zugriff auf a[3] |
| O(log n) | Binäre Suche |
| O(n) | Lineare Suche, eine Schleife |
| O(n²) | Zwei verschachtelte Schleifen |

## Zusammenfassung

Merke: Bubble tauscht Nachbarn, Selection holt das Kleinste nach vorne, Insertion sortiert ein wie Spielkarten. Binäre Suche nur bei sortierten Listen. Und Rekursion braucht immer eine Abbruchbedingung.

## Übungsfragen mit Lösung

1. Wie sieht [5, 1, 4, 2] nach dem ERSTEN Durchlauf Bubble Sort aus? (Zahlen mit Komma)
   - Lösung: 1,4,2,5. 5 wandert Schritt für Schritt nach hinten: [1,4,2,5].
2. Wofür brauchst du beim Tauschen die Variable temp?
   - Lösung: Damit ein Wert nicht überschrieben wird. Ohne Zwischenspeicher wäre a[j] nach a[j] = a[j+1] verloren.
3. Welche Voraussetzung hat die binäre Suche?
   - Lösung: Liste muss sortiert sein. Nur bei sortierten Daten kann man entscheiden, ob links oder rechts weitergesucht wird.
4. Was berechnet fakultaet(4)?
   - Lösung: 24. 4 * 3 * 2 * 1 = 24.
5. Was passiert bei einer Rekursion ohne Abbruchbedingung?
   - Lösung: Stack Overflow. Jeder Aufruf belegt Speicher auf dem Stack, bis er voll ist.
6. Welches Verfahren sucht im unsortierten Rest das Minimum und tauscht es nach vorne?
   - Lösung: Selection Sort. Selection = auswählen: das kleinste Element wird ausgewählt.
7. Welches Verfahren funktioniert wie Spielkarten auf der Hand einsortieren?
   - Lösung: Insertion Sort. Insertion = einfügen.
8. Welche Laufzeit haben zwei verschachtelte Schleifen über n Elemente?
   - Lösung: O(n²). n mal n Durchläufe.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Erkläre in 2 bis 3 Sätzen, wie Bubble Sort funktioniert und welche Laufzeit er hat.

```
Bubble Sort vergleicht immer zwei benachbarte Elemente und tauscht sie, wenn das linke größer ist. Nach jedem Durchlauf steht das größte unsortierte Element am Ende. Das wird wiederholt, bis in einem Durchlauf nicht mehr getauscht wird. Die Laufzeit ist im schlechtesten Fall O(n²).
```

### Aufgabe 2

Schreibe eine rekursive Funktion summeBis(n), die 1 + 2 + ... + n berechnet.

```
funktion summeBis(n)
  falls n <= 0 dann
    rückgabe 0
  ende falls
  rückgabe n + summeBis(n - 1)
ende funktion
```
