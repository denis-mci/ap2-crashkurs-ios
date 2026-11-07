# Unit-Tests, Testkonzept, Clean Code

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Testen kam in 6 von 9 Prüfungen seit Winter 2021. Unit-Tests schreiben, Testkonzept, Testprotokoll und Clean Code gehören zu den offenen Fragen dazu.

## Inhalt

### 1. Tests schreiben, nicht nur erklären

Testen kam in 6 von 9 Prüfungen seit Winter 2021. Unit-Tests musst du nicht nur erklären, sondern auch schreiben können. Das Gerüst ist immer gleich: Arrange, Act, Assert. Merk dir 3 A. Ein guter Test prüft genau eine Sache. Lieber mehrere kleine Tests als ein riesiger, bei dem keiner weiß, was eigentlich schiefging.

**Merk dir:** Arrange, Act, Assert.

### 2. Ein Unit-Test in JUnit

*Leitfrage: Zeig mal einen echten Unit-Test.*

Arrange: Du baust die Testdaten auf, hier eine Rechnung über 100 Euro netto. Act: Du rufst genau die Methode auf, die du testest. Assert: assertEquals, erst der erwartete Wert, dann der tatsächliche. Bei Kommazahlen kommt eine Toleranz dazu. Fehlerfälle testest du mit assertThrows. Bei negativem Betrag muss eine Exception fliegen, sonst schlägt der Test fehl. Achte auf die Reihenfolge in assertEquals: erst erwartet, dann tatsächlich. Bei Kommazahlen gibst du noch eine kleine Toleranz an, weil Rundungsfehler möglich sind. Und gib dem Test einen sprechenden Namen, etwa bruttoBerechnenMitNeunzehnProzent. Dann weiß jeder sofort, was getestet wird.

**Merk dir:** assertEquals: erst der erwartete Wert, dann der tatsächliche.

```
@Test
void brutto() {
  var r = new Rechnung(100.0); // Arrange
  double ist = r.brutto();     // Act
  assertEquals(119.0, ist, 0.001); // Assert
}

@Test
void negativWirft() {
  assertThrows(
    IllegalArgumentException.class,
    () -> new Rechnung(-5.0));
}
```

Kontrollfrage: Was steht in assertEquals zuerst? Antwort: Der erwartete Wert. assertEquals erwartet, ist. Hier 119 erwartet.

### 3. Gute Unit-Tests

*Leitfrage: Was macht einen guten Unit-Test aus?*

Gute Unit-Tests sind schnell und isoliert. Kein Zugriff auf die echte Datenbank, kein Netz. Sie sind wiederholbar und selbstprüfend. Der Test sagt selbst grün oder rot. Statt der echten Datenbank nimmst du ein Testdouble. Ein Stub liefert nur feste Antworten. Ein Mock prüft zusätzlich, ob und wie er aufgerufen wurde. Damit Tests isoliert laufen, ersetzt man echte Abhängigkeiten durch Attrappen, sogenannte Mocks. Statt der echten Datenbank antwortet ein Mock mit festen Testdaten.

**Merk dir:** Gute Unit-Tests sind schnell, isoliert und wiederholbar.

| Eigenschaft | heißt |
|---|---|
| schnell | Millisekunden, oft ausführbar |
| isoliert | keine echte Datenbank, kein Netz |
| wiederholbar | immer gleiches Ergebnis |
| selbstprüfend | grün oder rot, ohne Nachschauen |

### 4. Die Testpyramide

*Leitfrage: Und wie viele Tests von welcher Art?*

Oben wenige End-to-End-Tests über die Oberfläche. Die sind langsam und teuer. In der Mitte Integrationstests. Unten das breite Fundament: viele schnelle Unit-Tests. Ein Smoke-Test prüft nach dem Deployment nur grob, ob die Anwendung startet und der Login geht. Ein Lasttest prüft viele Nutzer gleichzeitig. Der Regressionstest prüft, ob nach einer Änderung Altes kaputt ist. Der Grund für die Form: Unit-Tests laufen in Millisekunden und finden Fehler früh. End-to-End-Tests sind langsam und brechen bei jeder Oberflächenänderung.

**Merk dir:** Viele Unit-Tests unten, wenige End-to-End-Tests oben.

| Ebene | Anzahl | Tempo |
|---|---|---|
| End-to-End, UI | wenige | langsam |
| Integration | mittel | mittel |
| Unit | viele | schnell |

Kontrollfrage: Wovon schreibst du am meisten? Antwort: Unit-Tests. Unit-Tests bilden das breite Fundament der Pyramide.

### 5. Testkonzept und Testprotokoll

*Leitfrage: Was gehört in ein Testkonzept?*

Vorher legt ein Testkonzept fest: Testobjekte, Testziele, Teststufen und Testumgebung. Dazu Testdaten, anonymisiert, nie echte Mandantendaten. Und Endekriterien und wer verantwortlich ist. Die Testfälle kommen aus Äquivalenzklassen und Grenzwerten. Im Protokoll stehen Soll, Ist, Ergebnis, Datum und Tester. T3 ist nicht bestanden. Soll war eine Exception, Ist ist minus 5,95. Das geht als Fehler an die Entwicklung. Im Testprotokoll stehen pro Testfall: erwartetes Ergebnis, tatsächliches Ergebnis, bestanden oder nicht, Datum und Tester. Das ist auch für die Projektdoku wichtig.

**Merk dir:** Testdaten anonymisieren, nie echte Mandantendaten.

| Testfall | Soll | Ist | Ergebnis |
|---|---|---|---|
| T1 gültig: 100 | 119 | 119 | bestanden |
| T2 Grenze: 0 | 0 | 0 | bestanden |
| T3 ungültig: -5 | Exception | -5,95 | nicht bestanden |

### 6. Clean Code und Review

*Leitfrage: Clean Code, was heißt das konkret?*

Was macht b von x? Keiner weiß es. Clean Code heißt zuerst: sprechende Namen. Nachher ist es klar. Das ist Refactoring: Struktur verbessern, Verhalten bleibt gleich, abgesichert durch Tests. Dazu kleine Funktionen. DRY: nichts doppelt. KISS: so einfach wie möglich. YAGNI: nichts auf Vorrat bauen. Vor dem Merge prüft ein Kollege den Pull Request, Vier-Augen-Prinzip mit Checkliste. Ein Linter findet Probleme ohne Ausführung. Ein Code-Review heißt: Jemand anderes liest deinen Code, bevor er übernommen wird. Das findet Fehler und verteilt Wissen im Team.

**Merk dir:** Refactoring: Struktur verbessern, Verhalten bleibt gleich.

```
// vorher
double b(double x) {
  return x * 1.19;
}
// nachher
static final double UST = 0.19;
double brutto(double netto) {
  return netto * (1 + UST);
}
```

### 7. Fehlerarten und Debugging

*Leitfrage: Welche Fehlerarten gibt es?*

Syntaxfehler findet schon der Compiler, zum Beispiel ein fehlendes Semikolon. Laufzeitfehler knallen beim Ausführen, etwa Division durch 0 oder ein Index außerhalb des Arrays. Logikfehler sind gemein: Das Programm läuft, rechnet aber falsch. Zum Beispiel größer statt größer gleich. Zum Debuggen setzt du einen Breakpoint. Step over führt die Zeile aus, Step into springt in die aufgerufene Methode. Logische Fehler sind am gemeinsten: Das Programm läuft, rechnet aber falsch. Die findest du nur mit Tests oder mit dem Debugger, Schritt für Schritt.

**Merk dir:** Syntaxfehler findet der Compiler, Laufzeitfehler knallen beim Ausführen.

| Fehlerart | Wann | Beispiel |
|---|---|---|
| Syntaxfehler | beim Kompilieren | Semikolon fehlt |
| Laufzeitfehler | beim Ausführen, Absturz | Division durch 0 |
| Logikfehler | läuft, Ergebnis falsch | > statt >= |

## Zusammenfassung

Merke: Arrange, Act, Assert. Erwarteter Wert zuerst. Viele schnelle Unit-Tests unten in der Pyramide, wenige End-to-End-Tests oben. Und nie echte Mandantendaten als Testdaten.

## Übungsfragen mit Lösung

1. In welcher Reihenfolge ist ein Unit-Test aufgebaut?
   - Lösung: Arrange, Act, Assert. Testdaten aufbauen, Methode aufrufen, Ergebnis prüfen.
2. assertEquals(119.0, r.brutto(), 0.001);  
  
Was ist 119.0?
   - Lösung: Der erwartete Wert. JUnit: assertEquals(erwartet, ist). Der dritte Wert ist die Toleranz für Kommazahlen.
3. Wie prüfst du in JUnit, dass new Rechnung(-5.0) eine Exception wirft?
   - Lösung: assertThrows. assertThrows(IllegalArgumentException.class, () -> new Rechnung(-5.0)) schlägt fehl, wenn keine Exception fliegt.
4. Testfall T3: Eingabe -5, Soll: Exception, Ist: -5,95.  
  
Was trägst du im Testprotokoll als Ergebnis ein?
   - Lösung: nicht bestanden. Soll und Ist weichen ab, also nicht bestanden. Der Fehler geht als Ticket an die Entwicklung.
5. Ein Testdouble ersetzt die echte Datenbank und liefert nur feste Antworten. Wie heißt es?
   - Lösung: Stub. Ein Stub liefert vorbereitete Antworten. Ein Mock prüft zusätzlich, ob und wie er aufgerufen wurde.
6. Ein Unit-Test greift auf die echte Produktionsdatenbank zu. Welche Eigenschaft guter Unit-Tests verletzt er vor allem?
   - Lösung: isoliert. Unit-Tests sollen unabhängig von Datenbank, Netz und anderen Tests laufen. Sonst sind sie langsam und nicht wiederholbar.
7. Wovon schreibst du laut Testpyramide am meisten?
   - Lösung: Unit-Tests. Unten viele schnelle Unit-Tests, in der Mitte weniger Integrationstests, oben wenige langsame E2E-Tests.
8. Nach dem Deployment prüfst du kurz, ob die Anwendung startet und der Login funktioniert. Welche Testart ist das?
   - Lösung: Smoke-Test. Ein Smoke-Test prüft nur grob, ob das System überhaupt läuft.
9. Welche Testdaten gehören in die Testumgebung einer Steuerkanzlei?
   - Lösung: Anonymisierte oder künstlich erzeugte Daten. Echte Mandantendaten unterliegen Datenschutz und Verschwiegenheit. Testdaten werden anonymisiert oder künstlich erzeugt.
10. Was ist Refactoring?
   - Lösung: Die Struktur des Codes verbessern, ohne das Verhalten zu ändern. Abgesichert wird das durch Tests: Vorher grün, nachher grün.
11. Derselbe Codeblock zur Umsatzsteuerberechnung steht an 5 Stellen im Programm. Welches Prinzip ist verletzt?
   - Lösung: DRY. DRY heißt Don't Repeat Yourself. Die Berechnung gehört in eine Funktion.
12. Ein Programm läuft ohne Absturz, gewährt den Rabatt aber erst ab 101 statt ab 100 Euro. Welche Fehlerart ist das?
   - Lösung: Logikfehler. Es läuft, rechnet aber falsch, typisch > statt >=. Syntaxfehler findet der Compiler, Laufzeitfehler führen zum Absturz.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Die Methode brutto(netto) der Klasse Rechner berechnet den Bruttobetrag mit 19 Prozent Umsatzsteuer. Bei negativem Nettobetrag wirft sie eine IllegalArgumentException. Schreiben Sie zwei Unit-Tests (Java mit JUnit oder Pseudocode): einen für einen gültigen Wert und einen für den Fehlerfall. Kennzeichnen Sie Arrange, Act und Assert.

```
@Test
void bruttoGueltig() {
  // Arrange
  Rechner r = new Rechner();
  // Act
  double ist = r.brutto(100.0);
  // Assert
  assertEquals(119.0, ist, 0.001);
}

@Test
void bruttoNegativWirft() {
  // Arrange
  Rechner r = new Rechner();
  // Act und Assert
  assertThrows(IllegalArgumentException.class,
      () -> r.brutto(-5.0));
}
```

### Aufgabe 2

Ihr Team soll das neue Honorar-Modul der Kanzlei testen. Nennen Sie fünf Inhalte eines Testkonzepts und erläutern Sie, warum dabei keine echten Mandantendaten verwendet werden dürfen.

```
Inhalte eines Testkonzepts:
1. Testobjekte: was wird getestet, hier das Honorar-Modul mit Berechnung und Rechnungsausgabe.
2. Testziele: welche Anforderungen nachgewiesen werden sollen.
3. Teststufen: Unit-, Integrations-, System- und Abnahmetest.
4. Testumgebung: eigene Testdatenbank und Testserver, getrennt von der Produktion.
5. Testdaten: anonymisiert oder künstlich erzeugt.
6. Endekriterien: zum Beispiel alle Testfälle mit Priorität hoch bestanden, keine offenen kritischen Fehler.
7. Verantwortliche und Zeitplan.

Echte Mandantendaten dürfen nicht verwendet werden, weil sie personenbezogen sind und unter die DSGVO fallen. Außerdem unterliegt die Kanzlei der beruflichen Verschwiegenheit. Testumgebungen sind oft weniger geschützt und mehr Personen haben Zugriff. Deshalb werden anonymisierte oder künstliche Testdaten verwendet.
```
