# Testen und Schreibtischtest

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Testen kam in 6 von 9 Prüfungen seit Winter 2021. Schreibtischtests sind leicht verdiente Punkte.

## Inhalt

### 1. Leicht verdiente Punkte

Testen kam in 6 von 9 Prüfungen seit Winter 2021 dran. Und Schreibtischtests sind leicht verdiente Punkte. Holen wir sie uns. Testaufgaben sind gut planbar, weil sie fast immer nach demselben Muster kommen: Testfälle finden, Testarten erklären, Code durchspielen.

### 2. Black-Box gegen White-Box

*Leitfrage: Welche Grundarten von Tests gibt es?*

Beim Black-Box-Test kennst du den Code nicht. Eingabe rein, Ausgabe prüfen. Du testest nur gegen die Anforderungen. Beim White-Box-Test kennst du den Code und testest gezielt Anweisungen und Zweige. Black-Box nutzt Äquivalenzklassen und Grenzwerte. White-Box nutzt Überdeckung. White-Box-Tests schreibt meist der Entwickler selbst. Black-Box-Tests kann auch jemand machen, der den Code nie gesehen hat, zum Beispiel die Fachabteilung.

**Merk dir:** Black-Box ohne Code gegen Anforderungen, White-Box mit Code.

|  | Black-Box | White-Box |
|---|---|---|
| Kennt Code? | Nein | Ja |
| Basis | Anforderungen | Quellcode |
| Methoden | Äquivalenzklassen, Grenzwerte | Anweisungs-, Zweigüberdeckung |

### 3. Äquivalenzklassen

*Leitfrage: Ich kann ja nicht jeden Wert testen. Wie wähle ich Testfälle aus?*

Beispiel: Rabatt ab 100 Euro Bestellwert. Zulässig sind 0 bis 10.000 Euro. Äquivalenzklassen sind Gruppen, die sich gleich verhalten. Aus jeder Klasse reicht ein Testwert. Vergiss die ungültigen Klassen nicht, zum Beispiel negative Zahlen. Die geben oft die Extrapunkte. Die gültigen Klassen hier: 0 bis 99,99 Euro ohne Rabatt, 100 bis 10.000 Euro mit Rabatt. Ungültig sind negative Werte und alles über 10.000 Euro. Vergiss die ungültigen Klassen nicht. Gerade die prüfen, ob dein Programm falsche Eingaben sauber abfängt.

**Merk dir:** Äquivalenzklassen: aus jeder Klasse reicht ein Testwert.

```
Rabatt ab Bestellwert 100 €
Zulässig: 0 bis 10.000 €

gültig, kein Rabatt: 0 bis 99,99
  Testwert 50
gültig, Rabatt: 100 bis 10.000
  Testwert 500
ungültig: < 0, Testwert -5
ungültig: > 10.000, Testwert 20.000
```

### 4. Grenzwerte: an den Rand

*Leitfrage: Und wo verstecken sich die meisten Fehler?*

Die Grenzwertanalyse testet genau an den Rändern. Direkt unter, auf und über der Grenze. Denn die meisten Fehler sind ein größer statt größer gleich. An der Grenze 100 testest du also 99,99, 100 und 100,01. Ein Fehler wie größer statt größer gleich fällt genau bei 100 auf. In der Prüfung gibt es meist eine Tabelle mit Testfall, Eingabe und erwartetem Ergebnis. Fülle das erwartete Ergebnis immer aus, sonst ist der Testfall wertlos.

**Merk dir:** Grenzwerte: direkt unter, auf und über der Grenze testen.

```
Grenze bei 100:
  99,99  → kein Rabatt
 100,00  → Rabatt
 100,01  → Rabatt
Fehler an den Rändern: > statt >=
```

### 5. Überdeckung

*Leitfrage: Was heißt Überdeckung beim White-Box-Test?*

White-Box mit einem kleinen falls. Anweisungsüberdeckung: Jede Anweisung läuft mindestens einmal. Dafür reicht x gleich 5. Zweigüberdeckung: Bei jedem falls einmal ja und einmal nein. Also 5 und minus 1. Zweigüberdeckung ist stärker. Zweigüberdeckung schließt Anweisungsüberdeckung ein. Wer alle Zweige testet, hat automatisch jede Anweisung ausgeführt. Umgekehrt gilt das nicht.

**Merk dir:** Zweigüberdeckung: jedes falls einmal mit ja und einmal mit nein.

```
y = 0
falls x > 0 dann
  y = 1
ende falls
ausgabe(y)

Anweisungsüberdeckung C0:
  x = 5 reicht
Zweigüberdeckung C1:
  x = 5 UND x = -1
```

Kontrollfrage: Welche Überdeckung verlangt bei jedem falls einmal ja und einmal nein? Antwort: Zweigüberdeckung. Zweigüberdeckung durchläuft jeden Zweig mindestens einmal.

### 6. Schreibtischtest

*Leitfrage: Jetzt der Schreibtischtest. Wie gehe ich da vor?*

Schreibtischtest heißt: Du spielst den Code von Hand durch und notierst nach jedem Schritt alle Variablen. Start: a ist 3, b ist 0. Erste Runde: b wird 3, a wird 2. Zweite Runde: b wird 5, a wird 1. Dritte Runde: b wird 6, a wird 0. Die Schleife endet. Ergebnis 6. Leg dir eine Tabelle an: eine Spalte pro Variable, eine Zeile pro Schritt. Trag nur ein, was sich ändert. So verlierst du nie den Überblick. Schau besonders auf die Schleifenbedingung beim letzten Durchlauf. Dort entscheidet sich, ob die Schleife einmal zu oft oder zu wenig läuft.

**Merk dir:** Schreibtischtest: nach jedem Schritt alle Variablen notieren.

```
a = 3, b = 0
solange a > 0
  b = b + a
  a = a - 1
ende solange
```

Kontrollfrage: Was stand nach der zweiten Runde in b? Antwort: 5. 0 plus 3 ist 3, plus 2 ist 5.

### 7. Teststufen und Testarten

*Leitfrage: Und welche Teststufen muss ich kennen?*

Von klein nach groß. Unit-Test für einzelne Funktionen, Integrationstest für das Zusammenspiel. Systemtest für das ganze System. Beim Abnahmetest prüft der Kunde, ob es passt. Regressionstest: Ist nach einer Änderung Altes kaputt? Lasttest: Wie verhält sich das System bei vielen Nutzern? Und TDD, testgetriebene Entwicklung: erst den Test schreiben, dann den Code. Regressionstest heißt: Nach einer Änderung alte Tests erneut laufen lassen, damit nichts kaputtgeht, was vorher funktioniert hat.

**Merk dir:** Unit, Integration, System, Abnahme: von klein nach groß.

| Stufe / Art | Was |
|---|---|
| Unit-Test | einzelne Funktion |
| Integrationstest | Zusammenspiel von Modulen |
| Systemtest | ganzes System |
| Abnahmetest | Kunde prüft |
| Regressionstest | Altes kaputt nach Änderung? |

## Zusammenfassung

Zusammengefasst: Black-Box ohne Code, White-Box mit Code. Äquivalenzklassen plus Grenzwerte. Zweigüberdeckung ist stärker als Anweisungsüberdeckung. Und beim Schreibtischtest jede Variable nach jedem Schritt notieren.

## Übungsfragen mit Lösung

1. Beim Black-Box-Test ...
   - Lösung: kennt der Tester den Code nicht. Black-Box: nur Ein- und Ausgaben gegen die Anforderungen.
2. a = 3, b = 0  
solange a > 0: b = b + a; a = a - 1  
Welchen Wert hat b am Ende?
   - Lösung: 6. 3 + 2 + 1 = 6.
3. Welche Überdeckung verlangt, dass bei jeder Verzweigung (falls) beide Zweige mindestens einmal durchlaufen werden?
   - Lösung: Zweigüberdeckung. Zweigüberdeckung (C1) durchläuft jeden Zweig.
4. Rabatt ab 100 €. Welche Werte testet die Grenzwertanalyse?
   - Lösung: 99,99 / 100 / 100,01. Unter, auf und über der Grenze.
5. Wie heißt der Test, ob nach einer Änderung alte Funktionen noch gehen?
   - Lösung: Regressionstest. Regression = Rückschritt.
6. Was ist TDD?
   - Lösung: Erst Test, dann Code. Test Driven Development: Red, Green, Refactor.
7. Welche Teststufe führt der Kunde durch?
   - Lösung: Abnahmetest. Bei der Abnahme bestätigt der Kunde, dass es seine Anforderungen erfüllt.
8. x = 1  
für i = 1 bis 3  
  x = x * 2  
ende für  
Wert von x?
   - Lösung: 8. 1 → 2 → 4 → 8.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Eine Funktion prüft ein Alter: unter 0 ungültig, 0 bis 17 minderjährig, 18 bis 120 volljährig, über 120 ungültig. Nenne die Äquivalenzklassen und je einen Testwert, plus die Grenzwerte.

```
Klassen: ungültig < 0 (Testwert -5), minderjährig 0 bis 17 (Testwert 10), volljährig 18 bis 120 (Testwert 40), ungültig > 120 (Testwert 150). Grenzwerte: -1, 0, 17, 18, 120, 121.
```
