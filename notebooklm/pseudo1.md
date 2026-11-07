# Pseudocode: die 4 Grundmuster

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

War in jeder AP2 von Winter 2021 bis Winter 2025 dran und bringt die meisten Punkte überhaupt.

## Inhalt

### 1. Das Thema mit den meisten Punkten

Pseudocode kam in jeder einzelnen AP2 von Winter 2021 bis Winter 2025 dran. Kein Thema bringt mehr Punkte. Wenn du nur eine Sache lernst, dann diese. Und das Schöne: Pseudocode hat keine feste Syntax. Die Prüfer wollen sehen, dass deine Logik stimmt. Ob du für oder for schreibst, ist egal, solange du konsequent bleibst.

### 2. Fünf Bausteine reichen

*Leitfrage: Okay, und was brauche ich davon wirklich? Das sieht nach viel Syntax aus.*

Erst die Zuweisung, dann falls sonst. Damit entscheidet dein Programm. Die Für-Schleife nimmst du zum Zählen, wenn die Anzahl feststeht. Die Solange-Schleife nimmst du, wenn du vorher nicht weißt, wie oft sie laufen muss. Dazu eine Funktion mit Rückgabe. Die Syntax ist frei, keine Programmiersprache ist vorgeschrieben. Es zählt die Logik. Ein Beispiel aus der Kanzlei: Du willst alle Belege eines Monats durchgehen. Die Anzahl kennst du, also Für-Schleife. Du wartest dagegen, bis ein Mandant den richtigen Beleg hochlädt? Dann weißt du nicht, wie oft, also Solange-Schleife. Gib deinen Variablen sprechende Namen wie summe oder anzahlOffen. Das macht den Code lesbar, und lesbarer Code bekommt in der Prüfung eher Teilpunkte.

**Merk dir:** Zählen mit Für-Schleife, unbekannte Anzahl mit Solange-Schleife.

```
x = 5
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
ende solange
```

### 3. Arrays: Index startet bei 0

*Leitfrage: Arrays kenne ich. Wo stolpern die Leute da?*

Achtung, hier passiert der häufigste Fehler der ganzen Prüfung. Arrays fangen bei Index 0 an. Index 0 ist die 7, Index 3 ist die 4. Vier Elemente heißt Indizes 0 bis 3. Der letzte Index ist also immer Länge minus 1. Stell dir das Array wie Schließfächer vor, die bei null nummeriert sind. Das letzte Fach hat also immer die Nummer Länge minus eins. Darum läuft eine Schleife über alle Elemente von 0 bis laenge minus 1, oder mit kleiner als laenge. Schreibst du kleiner gleich laenge, greifst du ins Leere. Das ist der klassische Off-by-one-Fehler.

**Merk dir:** Arrays starten bei Index 0. Vier Elemente heißt Index 0 bis 3.

```
zahlen = [7, 3, 9, 4]
zahlen[0]        → 7
zahlen[3]        → 4
laenge(zahlen)   → 4
letzter Index    → laenge(zahlen) - 1 = 3
```

Kontrollfrage: Welchen Index hat die 9 in zahlen? Antwort: 2. 7 hat Index 0, 3 hat Index 1, 9 hat Index 2.

### 4. Muster 1: Summe und Durchschnitt

*Leitfrage: Jetzt wird es konkret. Was ist das erste Muster, das ich draufhaben muss?*

Zuerst prüfen: Ist das Array leer? Sonst teilst du durch null. Genau dafür gibt es Punkte. Dann summe auf 0 setzen. Die Schleife geht durch alle Elemente und addiert. Für den Durchschnitt teilst du am Ende durch die Anzahl. Warum die Prüfung auf leer so wichtig ist: Bei null Elementen teilst du durch null, und das Programm stürzt ab. Prüfer achten genau darauf, ob du diesen Sonderfall abfängst. Achte auch auf den Datentyp. Die Summe ganzer Zahlen geteilt durch die Anzahl soll oft eine Kommazahl ergeben. Schreib im Zweifel dazu, dass der Durchschnitt als Kommazahl zurückgegeben wird.

**Merk dir:** Erst auf leeres Array prüfen, dann summieren, dann teilen.

```
funktion durchschnitt(werte)
  falls laenge(werte) == 0 dann
    rückgabe 0
  ende falls
  summe = 0
  für i = 0 bis laenge(werte) - 1
    summe = summe + werte[i]
  ende für
  rückgabe summe / laenge(werte)
ende funktion
```

### 5. Muster 2: Maximum finden

*Leitfrage: Und wenn ich den größten Wert suche? Einfach mit null anfangen?*

Starte max mit dem ersten Element, nicht mit null. Sind alle Werte negativ, wäre null sonst falsch. Dann vergleichst du jedes weitere Element und merkst dir das größere. Minimum geht genauso, nur mit kleiner als. Probier es im Kopf: Werte minus fünf, minus zwei, minus acht. Startest du mit null, bleibt null das Maximum. Falsch, denn null kommt gar nicht vor. Mit dem ersten Element startest du bei minus fünf und findest korrekt minus zwei. Das Minimum funktioniert genauso, nur mit kleiner statt größer. Wenn du eins kannst, kannst du beide.

**Merk dir:** Maximum mit dem ersten Element starten, nie mit 0.

```
funktion maximum(werte)
  max = werte[0]          // NICHT 0!
  für i = 1 bis laenge(werte) - 1
    falls werte[i] > max dann
      max = werte[i]
    ende falls
  ende für
  rückgabe max
ende funktion
```

### 6. Muster 3: Filtern und Zählen

*Leitfrage: Was ist, wenn ich nur bestimmte Elemente will, zum Beispiel alle über 100?*

Filtern: Du legst eine leere Liste an. Du gehst alle Elemente durch. Passt die Bedingung, fügst du das Element hinzu. Zählen ist das Gleiche. Statt hinzufügen rechnest du einen Zähler plus 1. In der Prüfung heißt das zum Beispiel: Gib alle Rechnungen über 1000 Euro zurück. Das ist Filtern. Oder: Wie viele Rechnungen sind überfällig? Das ist Zählen. Die Schleife ist identisch, nur der Inhalt des falls ändert sich. Kombinieren ist auch erlaubt: In einem Durchlauf kannst du zählen und gleichzeitig summieren. Das spart eine zweite Schleife.

**Merk dir:** Filtern: leere Liste anlegen, passende Elemente hinzufügen.

```
funktion teureAuftraege(auftraege)
  ergebnis = neue Liste
  für jeden a in auftraege
    falls a.honorar > 1000 dann
      ergebnis.hinzufuegen(a)
    ende falls
  ende für
  rückgabe ergebnis
ende funktion
```

### 7. Muster 4: Suchen mit Abbruch

*Leitfrage: Und das letzte Muster? Ich vermute: suchen.*

Suchen: Mit einer Solange-Schleife läufst du durch die Liste. Gefunden? Dann gibst du sofort den Index zurück. Und vergiss nie, i zu erhöhen, sonst hast du eine Endlosschleife. Findest du nichts, gibst du minus 1 zurück. Und das Wichtigste: Lass nie etwas leer. Auch eine halbe Lösung bringt Teilpunkte. Warum hier die Solange-Schleife? Weil du aufhören willst, sobald du etwas gefunden hast. Mit einer Für-Schleife und einem return mittendrin geht es auch, beides ist in der Prüfung korrekt. Und denk an den Fall, dass nichts gefunden wird. Dann gibst du einen klaren Wert zurück, zum Beispiel minus eins. Ohne diesen Fall fehlt dir ein Punkt.

**Merk dir:** Gefunden heißt sofort zurückgeben. Und i erhöhen, sonst Endlosschleife.

```
funktion finde(liste, gesucht)
  i = 0
  solange i < laenge(liste)
    falls liste[i] == gesucht dann
      rückgabe i          // gefunden
    ende falls
    i = i + 1
  ende solange
  rückgabe -1             // nicht gefunden
ende funktion
```

Kontrollfrage: Du vergisst die Zeile i plus 1. Was passiert? Antwort: Endlosschleife. Die Bedingung bleibt immer wahr, die Schleife hört nie auf.

## Zusammenfassung

Also zusammengefasst: Index startet bei null, beim Durchschnitt erst auf leer prüfen, das Maximum mit dem ersten Element starten, und bei Solange-Schleifen nie das Hochzählen vergessen.

## Übungsfragen mit Lösung

1. Ein Array hat 5 Elemente. Welchen Index hat das letzte Element?
   - Lösung: 4. Index startet bei 0, also 0 bis 4. Letzter Index = laenge - 1.
2. Welche Schleife nimmst du, wenn du vorher NICHT weißt, wie oft sie laufen muss?
   - Lösung: solange-Schleife. Die solange-Schleife läuft, bis eine Bedingung nicht mehr stimmt. Die für-Schleife nimmst du, wenn die Anzahl feststeht.
3. Womit initialisierst du max beim Suchen des Maximums am besten?
   - Lösung: mit dem ersten Element des Arrays. Mit 0 wäre das Ergebnis falsch, wenn alle Werte negativ sind. Das erste Element ist immer ein gültiger Startwert.
4. summe = 0  
für i = 1 bis 4  
  summe = summe + i  
ende für  
ausgabe(summe)  
  
Was wird ausgegeben?
   - Lösung: 10. 1 + 2 + 3 + 4 = 10.
5. Ist in der Prüfung eine bestimmte Programmiersprache oder Pseudocode-Syntax vorgeschrieben?
   - Lösung: Nein, die Logik zählt. Keine Sprache ist vorgeschrieben. Lesbar und logisch richtig reicht. Struktogramme sind seit 2025 sogar raus.
6. Was solltest du bei einer Durchschnittsberechnung vorher prüfen?
   - Lösung: Ob das Array leer ist (Division durch 0). Bei einer leeren Liste wäre die Anzahl 0 und du würdest durch 0 teilen.
7. Bei der linearen Suche wird nichts gefunden. Was gibt die Funktion im Clip zurück?
   - Lösung: -1. -1 ist der übliche Wert für "nicht gefunden", weil es keinen Index -1 gibt.
8. Was passiert, wenn du in einer solange-Schleife vergisst, i zu erhöhen?
   - Lösung: Endlosschleife. Die Bedingung bleibt immer wahr, die Schleife hört nie auf.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Schreibe in Pseudocode eine Funktion durchschnittPositiv(werte), die den Durchschnitt aller Werte größer 0 zurückgibt. Gibt es keine positiven Werte, soll 0 zurückgegeben werden.

```
funktion durchschnittPositiv(werte)
  summe = 0
  anzahl = 0
  für i = 0 bis laenge(werte) - 1
    falls werte[i] > 0 dann
      summe = summe + werte[i]
      anzahl = anzahl + 1
    ende falls
  ende für
  falls anzahl == 0 dann
    rückgabe 0
  ende falls
  rückgabe summe / anzahl
ende funktion
```

### Aufgabe 2

Schreibe eine Funktion zaehleUeber(liste, grenze), die zurückgibt, wie viele Elemente größer als grenze sind.

```
funktion zaehleUeber(liste, grenze)
  zaehler = 0
  für jedes element in liste
    falls element > grenze dann
      zaehler = zaehler + 1
    ende falls
  ende für
  rückgabe zaehler
ende funktion
```
