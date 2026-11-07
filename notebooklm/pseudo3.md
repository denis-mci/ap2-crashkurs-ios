# Pseudocode: Objekte, 2D-Arrays, Strings

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Pseudocode kam in jeder AP2 von Winter 2021 bis Winter 2025 dran. Die Aufgaben arbeiten oft mit Objekten aus dem Klassendiagramm, 2D-Arrays, Strings oder lassen dich Fehler in fremdem Code finden.

## Inhalt

### 1. Jeder Baustein zählt

Pseudocode kommt in jeder AP2. Die Daten stecken oft in Objekten, 2D-Arrays oder Strings. Gute Nachricht: Es gibt Teilpunkte. Signatur und Initialisierung bringen schon die ersten. Dazu Schleife, Bedingung und Rückgabe. Wenn du nicht weiterweißt, schreib hin, so weit du kommst. Nie leer lassen. Schreib deshalb immer zuerst den Methodenkopf mit Parametern und Rückgabetyp und initialisiere deine Variablen. Selbst wenn die Logik danach hakt, sind diese Punkte sicher.

**Merk dir:** Signatur und Initialisierung bringen schon Teilpunkte.

- Signatur: funktion name(parameter)
- Initialisierung: summe = 0, max = erstes Element
- Schleife mit richtigen Grenzen
- Bedingung im falls
- Rückgabe am Ende

### 2. Objekte: neu, get, set

*Leitfrage: Wie arbeite ich mit Objekten im Pseudocode?*

Ein Objekt erzeugst du mit neu und dem Konstruktor. Danach rufst du Methoden mit Punkt auf. Attribute sind privat. Also liest du sie mit dem Getter und änderst sie mit dem Setter. Über eine Liste von Objekten läufst du mit für jedes und rufst pro Objekt den Getter auf. Filtern und Summieren wie gewohnt. Maximum geht genauso: mit dem ersten Objekt starten und per Getter vergleichen. Ein Beispiel: konto gleich neu Konto mit Startbetrag 100. Danach konto Punkt einzahlen 50. Den Kontostand liest du mit konto Punkt getSaldo, nicht direkt über das Attribut.

**Merk dir:** Objekt mit neu erzeugen, private Attribute über Getter und Setter.

```
k = neu Konto("Gies", 500.0)
k.einzahlen(200.0)
ausgabe(k.getSaldo())      // 700.0
k.setInhaber("Ruf")

funktion summeSalden(konten)
  summe = 0
  für jedes k in konten
    falls k.getSaldo() > 0 dann
      summe = summe + k.getSaldo()
    ende falls
  ende für
  rückgabe summe
ende funktion
```

### 3. Methode aus dem Klassendiagramm

*Leitfrage: Und wenn mir ein Klassendiagramm gegeben wird?*

Gegeben ist ein Klassendiagramm. Minus heißt privat, Plus heißt öffentlich. Du sollst abheben implementieren. Erst die Eingabe prüfen: Betrag null oder negativ? Dann wirfst du einen Fehler. Null oder leere Werte prüfst du genauso. Der Aufrufer fängt den Fehler mit versuche und fange ab. Das ist try und catch. Dann die Deckungsprüfung. Reichen saldo plus dispo nicht, gibst du falsch zurück. Sonst abbuchen und wahr. Das sind Return-Codes. Mit Exception werfen zeigst du, dass du Fehlerfälle bedenkst. In der Prüfung reicht oft auch: falls Betrag kleiner gleich null, gib false zurück. Hauptsache, der Fall ist behandelt. Prüfe auch, ob genug Geld da ist, bevor du abziehst. Die Reihenfolge ist: prüfen, dann ändern, dann zurückgeben.

**Merk dir:** Erst Eingabe prüfen, dann rechnen, dann zurückgeben.

```
Konto
- saldo: Double
- dispo: Double
+ abheben(betrag: Double): Boolean
methode abheben(betrag)
  falls betrag <= 0 dann
    werfe Fehler("Betrag ungültig")
  ende falls
  falls saldo + dispo < betrag dann
    rückgabe falsch
  ende falls
  saldo = saldo - betrag
  rückgabe wahr
ende methode
```

### 4. 2D-Array: erst Zeile, dann Spalte

*Leitfrage: 2D-Arrays verwirren mich. Was war zuerst, Zeile oder Spalte?*

Ein 2D-Array ist eine Tabelle. Der erste Index ist die Zeile, der zweite die Spalte. m 1 2 ist also die 6. laenge von m liefert die Zeilen, laenge von m 0 die Spalten der ersten Zeile. Für die Zeilensumme zwei verschachtelte Schleifen. summe startet in jeder Zeile neu bei 0. Raus kommt 10, dann 11. Für Spaltensummen tauschst du die Schleifen. Duplikate findest du auch mit zwei Schleifen: jedes Element mit allen danach vergleichen. Für alle Zellen brauchst du zwei verschachtelte Schleifen: außen über die Zeilen, innen über die Spalten. Typische Aufgabe: Summe jeder Zeile oder Maximum der ganzen Tabelle. Das sind die bekannten Muster, nur eben zweimal geschachtelt.

**Merk dir:** 2D-Array: erst Zeile, dann Spalte.

```
m = [[3, 5, 2],
     [1, 4, 6]]
m[1][2]          → 6
laenge(m)        → 2 Zeilen
laenge(m[0])     → 3 Spalten
für z = 0 bis laenge(m) - 1
  summe = 0
  für s = 0 bis laenge(m[0]) - 1
    summe = summe + m[z][s]
  ende für
  ausgabe(summe)       // 10, dann 11
ende für
```

Kontrollfrage: Welchen Wert hat m 0 1? Antwort: 5. Zeile 0 ist 3, 5, 2. Spalte 1 davon ist die 5.

### 5. Strings und CSV

*Leitfrage: Wie gehe ich mit Strings und CSV-Zeilen um?*

Ein String ist wie ein Array aus Zeichen. Index startet bei 0, das letzte Zeichen hat Index Länge minus 1. Teilstring hier bis ausschließlich 3. Eine CSV-Zeile zerlegst du mit split am Semikolon. Index 1 ist der zweite Wert, hier Gies. Umdrehen: rückwärts von hinten nach vorn laufen und Zeichen anhängen. Zeichen zählen ist das Zählmuster mit einem Zähler. Ist der umgedrehte String gleich dem Original, ist es ein Palindrom. Schreib dazu, ob Groß und klein egal sind. Bei split bekommst du ein Array von Texten. Brauchst du eine Zahl, wandelst du sie um, zum Beispiel mit zuZahl. Das vergessen viele.

**Merk dir:** Letztes Zeichen hat Index Länge minus 1.

```
s = "Anna"
laenge(s)             → 4
s[0]                  → "A"
teilstring(s, 1, 3)   → "nn"
zeile = "4711;Gies;1200"
teile = zeile.split(";")
teile[1]              → "Gies"
umgedreht = ""
für i = laenge(s) - 1 bis 0 schritt -1
  umgedreht = umgedreht + s[i]
ende für
falls klein(s) == klein(umgedreht) dann
  ausgabe("Palindrom")
ende falls
```

### 6. Zinsen über n Jahre

*Leitfrage: Eine Rechenaufgabe, die oft kommt?*

Klassiker: Zinsen über mehrere Jahre. Jedes Jahr kommen 5 Prozent auf das aktuelle Kapital. Das ist der Zinseszins. Jahr 1: 1000 plus 50 ergibt 1050. Jahr 2: 1050 plus 52,50 ergibt 1102,50. Jahr 3: rund 1157,63 Euro. Genau so spielst du jeden Code im Schreibtischtest Zeile für Zeile durch. Den Endbetrag gibt es auch als Formel: Kapital mal eins Komma null fünf hoch n. In der Prüfung ist aber meist die Schleife gefragt.

**Merk dir:** Zinseszins: Kapital gleich Kapital plus Kapital mal Zinssatz.

```
kapital = 1000
zins = 0.05
für jahr = 1 bis 3
  kapital = kapital + kapital * zins
ende für
```

### 7. Fehlersuche: 3 Fehler finden

*Leitfrage: Und die Fehlersuche-Aufgaben?*

Typische Aufgabe: Markieren und korrigieren Sie 3 Fehler. Ein Login mit maximal 3 Versuchen. Fehler 1: Start bei 1 und kleiner als 3 ergibt nur 2 Versuche. Off by one. Start bei 0 wäre richtig. Fehler 2: Im falls steht ein einfaches Gleich. Das ist eine Zuweisung. Zum Vergleichen brauchst du das doppelte Gleich. Fehler 3: versuche wird nie erhöht. Bei falschem Passwort ist das eine Endlosschleife. Achte auch auf fehlende Rückgabe. Geh beim Fehler finden systematisch vor: Startwert prüfen, Abbruchbedingung prüfen, Hochzählen prüfen, Rückgabe prüfen. Die meisten Fehler stecken an genau diesen vier Stellen.

**Merk dir:** Off by one: Startwert und Vergleich genau prüfen.

```
funktion login(pw)
  versuche = 1
  ok = falsch
  solange versuche < 3 und nicht ok
    eingabe = lies()
    falls eingabe = pw dann
      ok = wahr
    ende falls
  ende solange
  rückgabe ok
ende funktion
```

Kontrollfrage: Angenommen, versuche wird erhöht. Wie viele Versuche erlaubt die Schleife dann? Antwort: 2. versuche ist 1 und 2, bei 3 ist Schluss. Also nur 2 Versuche.

## Zusammenfassung

Also: Objekte mit neu erzeugen, private Attribute über Getter und Setter. Beim 2D-Array erst Zeile, dann Spalte. Letztes Zeichen hat Index Länge minus eins. Und bei der Fehlersuche auf Off-by-one achten.

## Übungsfragen mit Lösung

1. m = [[3, 5, 2],  
     [1, 4, 6]]  
  
Was liefert laenge(m[0])?
   - Lösung: 3. m[0] ist die erste Zeile [3, 5, 2]. Ihre Länge ist die Spaltenzahl 3. laenge(m) wäre die Zeilenzahl 2.
2. m = [[3, 5, 2],  
     [1, 4, 6]]  
  
Welchen Wert hat m[1][0]?
   - Lösung: 1. Erst die Zeile, dann die Spalte. Zeile 1 ist [1, 4, 6], Spalte 0 davon ist 1.
3. Das Attribut saldo der Klasse Konto ist privat (-). Wie liest du es außerhalb der Klasse?
   - Lösung: k.getSaldo(). Private Attribute liest du über den öffentlichen Getter, geändert wird über den Setter.
4. s = "Beleg"  
ausgabe(s[laenge(s) - 1])  
  
Was wird ausgegeben?
   - Lösung: g. laenge(s) ist 5, der letzte Index also 4. s[4] ist "g".
5. zeile = "4711;Gies;1200"  
teile = zeile.split(";")  
  
Was steht in teile[2]?
   - Lösung: 1200. split zerlegt in ["4711", "Gies", "1200"]. Index 2 ist das dritte Element.
6. kapital = 1000  
für jahr = 1 bis 2  
  kapital = kapital + kapital * 0.05  
ende für  
  
Welchen Wert hat kapital am Ende?
   - Lösung: 1102,5. Jahr 1: 1000 + 50 = 1050. Jahr 2: 1050 + 52,50 = 1102,50. Zinseszins, weil immer vom aktuellen Kapital gerechnet wird.
7. methode abheben(betrag)  
  falls saldo + dispo < betrag dann  
    rückgabe falsch  
  ende falls  
  saldo = saldo - betrag  
  rückgabe wahr  
ende methode  
  
saldo = 100, dispo = 50. Was passiert bei abheben(160)?
   - Lösung: Rückgabe falsch, saldo bleibt 100. 100 + 50 = 150 ist kleiner als 160. Die Deckung reicht nicht, also Rückgabe falsch, ohne abzubuchen.
8. versuche = 1  
solange versuche < 3 und nicht ok  
  ...  
  versuche = versuche + 1  
ende solange  
  
Wie viele Login-Versuche erlaubt diese Schleife?
   - Lösung: 2. Durchläufe mit versuche = 1 und 2, bei 3 bricht sie ab. Off-by-one: Für 3 Versuche mit 0 starten oder <= 3 schreiben.
9. In einer Aufgabe steht: falls eingabe = pw dann. Was ist der Fehler?
   - Lösung: = ist eine Zuweisung, zum Vergleichen braucht man ==. Ein einfaches = weist zu. Für den Vergleich steht == (oder klar beschrieben: "ist gleich").
10. Eine Methode wirft bei ungültigem Betrag einen Fehler. Womit fängt der Aufrufer ihn ab?
   - Lösung: versuche ... fange. versuche/fange entspricht try/catch. werfe (throw) löst den Fehler aus, fange (catch) behandelt ihn.
11. zahlen = [4, 2, 4, 7, 2]  
anzahl = 0  
für i = 0 bis laenge(zahlen) - 2  
  für j = i + 1 bis laenge(zahlen) - 1  
    falls zahlen[i] == zahlen[j] dann  
      anzahl = anzahl + 1  
    ende falls  
  ende für  
ende für  
  
Welchen Wert hat anzahl am Ende?
   - Lösung: 2. Jedes Element wird mit allen danach verglichen. Gleich sind Index 0 und 2 (die 4) sowie Index 1 und 4 (die 2).
12. Du weißt bei einer Pseudocode-Aufgabe nicht weiter. Was bringt die meisten Punkte?
   - Lösung: Signatur, Initialisierung, Schleife und Rückgabe hinschreiben, so weit du kommst. Bewertet wird in Teilschritten. Signatur, Initialisierung, Schleife, Bedingung und Rückgabe bringen jeweils eigene Punkte.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Gegeben ist die Klasse Mandant mit den Methoden getName(): String und getHonorar(): Double. Schreiben Sie in Pseudocode eine Funktion topMandant(mandanten), die den Namen des Mandanten mit dem höchsten Honorar zurückgibt. Ist die Liste null oder leer, soll ein Fehler geworfen werden.

```
funktion topMandant(mandanten)
  falls mandanten == null oder laenge(mandanten) == 0 dann
    werfe Fehler("Keine Mandanten")
  ende falls
  bester = mandanten[0]
  für jeden m in mandanten
    falls m.getHonorar() > bester.getHonorar() dann
      bester = m
    ende falls
  ende für
  rückgabe bester.getName()
ende funktion
```

### Aufgabe 2

Die folgende Funktion soll für jede Zeile eines 2D-Arrays m die Zeilensumme ausgeben. Markieren und korrigieren Sie 3 Fehler.

1 funktion zeilensummen(m)
2   summe = 0
3   für z = 0 bis laenge(m)
4     für s = 0 bis laenge(m[0]) - 1
5       summe = m[z][s]
6     ende für
7     ausgabe(summe)
8   ende für
9 ende funktion

```
Fehler 1, Zeile 3: Off-by-one. Die Schleife läuft bis laenge(m) und greift auf einen Index außerhalb des Arrays zu.
Korrektur: für z = 0 bis laenge(m) - 1

Fehler 2, Zeile 2: Falsche Initialisierung. summe = 0 muss innerhalb der äußeren Schleife stehen (vor der inneren Schleife), damit die Summe pro Zeile neu bei 0 startet.

Fehler 3, Zeile 5: Es wird zugewiesen statt addiert.
Korrektur: summe = summe + m[z][s]
```
