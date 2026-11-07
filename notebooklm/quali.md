# Qualität, UX und Kosten

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Kleinere Teilaufgaben, aber schnell verdiente Punkte.

## Inhalt

### 1. Schnell verdiente Punkte

Qualität, UX und Kosten sind kleinere Teilaufgaben. Aber hier verdienst du schnell Punkte. Zwei Rechnungen und ein paar Begriffe. Los gehts. Die Rechnungen sind einfach, aber man verrechnet sich leicht. Schreib immer den Rechenweg hin, dafür gibt es Teilpunkte.

### 2. ISO 25010: Softwarequalität

*Leitfrage: Welche Qualitätsmerkmale gibt es nach ISO?*

Die ISO 25010 definiert in der Fassung von 2011 acht Qualitätsmerkmale. Für die Prüfung reichen diese acht. Funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit. Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit. Die Fassung von 2023 hat neun. Oft sollst du ein Merkmal mit einer Maßnahme verbinden. Wartbarkeit zum Beispiel durch Kommentare, Tests und sauberen Code. Merk dir mindestens vier der acht Merkmale mit Beispiel: Sicherheit, Wartbarkeit, Benutzbarkeit und Zuverlässigkeit. Damit kannst du fast jede Frage beantworten.

**Merk dir:** ISO 25010 hat acht Qualitätsmerkmale.

```
ISO 25010, Fassung 2011: 8 Merkmale
 Funktionale Eignung
 Leistungseffizienz
 Kompatibilität
 Benutzbarkeit
 Zuverlässigkeit
 Sicherheit
 Wartbarkeit
 Übertragbarkeit

Fassung 2023: 9 Merkmale

Wartbarkeit: Kommentare, Tests,
 sauberer Code
```

### 3. Barrierefreiheit

*Leitfrage: Was heißt Barrierefreiheit konkret?*

Barrierefreiheit heißt: Alle können die Software nutzen. Farbe nie als einzige Info, Farbenblinde erkennen sie sonst nicht. Alternativtexte für Screenreader, Bedienung per Tastatur und einfache Sprache. Seit Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz für bestimmte Produkte und Dienste wie Onlineshops und Banking. Der technische Standard ist die EN 301 549. Sie baut auf den WCAG auf, den Richtlinien für barrierefreie Webinhalte. Barrierefreiheit hilft allen: Gute Kontraste lesen sich auch im Sonnenlicht besser, und Tastaturbedienung ist für Vielnutzer schneller.

**Merk dir:** Farbe nie als einzige Information verwenden.

- Guter Kontrast, Farbe nie einzige Information
- Schrift skalierbar, Alternativtexte für Screenreader
- Bedienbar nur mit Tastatur, einfache Sprache
- BFSG seit 28.06.2025, etwa Onlineshops, Banking
- Standard: EN 301 549 mit WCAG 2.1 AA

### 4. Amortisation

*Leitfrage: Wie rechne ich die Amortisation aus?*

Wann hat sich eine Investition bezahlt gemacht? Investition geteilt durch jährliche Ersparnis. Beispiel: Ein Tool kostet 12000 Euro. Es spart 300 Stunden im Jahr zu je 40 Euro. Minus 2000 Euro Wartung. Bleiben 10000 Euro Ersparnis pro Jahr. 12000 geteilt durch 10000. Nach 1,2 Jahren hat sich das Tool amortisiert. Erst die jährliche Ersparnis ausrechnen: 300 Stunden mal 40 Euro sind 12.000 Euro im Jahr. 12.000 Euro Kosten geteilt durch 12.000 Euro pro Jahr ergibt genau ein Jahr. Gibt es laufende Kosten, etwa Lizenzgebühren, ziehst du sie vorher von der Ersparnis ab. Das ist eine typische Falle.

**Merk dir:** Amortisation gleich Investition durch jährliche Ersparnis.

```
Amortisationsdauer =
  Investition / jährliche Ersparnis

Tool kostet           12.000 €
spart 300 h × 40 €    12.000 €/Jahr
minus Wartung         −2.000 €/Jahr
Ersparnis             10.000 €/Jahr

12.000 / 10.000 = 1,2 Jahre
```

Kontrollfrage: Investition 6000 Euro, Ersparnis 3000 Euro pro Jahr. Amortisationsdauer? Antwort: 2 Jahre. 6000 geteilt durch 3000 ergibt 2 Jahre.

### 5. Make or Buy

*Leitfrage: Make or Buy, wie entscheide ich?*

Make or Buy: selbst entwickeln oder kaufen. Make passt genau, Buy ist sofort da. Beim Make bleibt das Know-how im Haus. Beim Buy gibt es Support und Updates vom Hersteller. Nachteile: Make kostet Aufwand und Wartung. Buy bringt Lizenzkosten und Abhängigkeit vom Hersteller. Zur Entscheidung nutzt man eine Nutzwertanalyse mit gewichteten Kriterien. Begründe deine Entscheidung immer mit der Situation aus der Aufgabe, zum Beispiel: Die Kanzlei hat keine eigenen Entwickler, also Buy.

**Merk dir:** Make passt genau, Buy ist sofort verfügbar.

| Make: selbst entwickeln | Buy: kaufen |
|---|---|
| passt genau | sofort verfügbar |
| Know-how bleibt im Haus | Support und Updates vom Hersteller |
| hoher Aufwand, Risiko | Lizenzkosten, Abhängigkeit |
| eigene Wartung nötig | passt eventuell nicht ganz |

### 6. Nutzwertanalyse

*Leitfrage: Und wie funktioniert eine Nutzwertanalyse?*

Jedes Kriterium bekommt ein Gewicht, zusammen 100 Prozent. Bewertet wird von 1 bis 5, 5 ist am besten. Kosten wiegen 40 Prozent. B bekommt 5 Punkte. 5 mal 0,4 ergibt 2,0. Genauso für Funktionen und Support: Bewertung mal Gewicht, Zeile für Zeile. Dann addieren. A hat 3,95, B hat 3,55. Die höchste Summe gewinnt, also A. Am Ende vergleichst du die Summen: Die Lösung mit dem höchsten Nutzwert wird empfohlen. Schreib diese Empfehlung als Satz hin, sie gibt oft einen eigenen Punkt.

**Merk dir:** Nutzwert gleich Gewicht mal Punkte, dann alles summieren.

| Kriterium | Gewicht | A: Bew. → Pkt | B: Bew. → Pkt |
|---|---|---|---|
| Kosten | 40 % | 3 → 1,2 | 5 → 2,0 |
| Funktionen | 35 % | 5 → 1,75 | 3 → 1,05 |
| Support | 25 % | 4 → 1,0 | 2 → 0,5 |
| Summe | 100 % | 3,95 | 3,55 |

Kontrollfrage: Gewicht 50 Prozent, Bewertung 3 Punkte. Welcher gewichtete Wert? Antwort: 1,5. 3 mal 0,5 ergibt 1,5.

## Zusammenfassung

Also: Amortisation gleich Investition durch jährliche Ersparnis. Bei der Nutzwertanalyse Gewicht mal Punkte, dann summieren. Und Farbe nie als einzige Information.

## Übungsfragen mit Lösung

1. Investition 20.000 €, jährliche Ersparnis 8.000 €. Amortisationsdauer in Jahren?
   - Lösung: 2,5. 20.000 / 8.000 = 2,5 Jahre.
2. Kommentare, Tests und Clean Code verbessern vor allem ...
   - Lösung: Wartbarkeit. Wartbarkeit.
3. Welcher Standard beschreibt Barrierefreiheit im Web?
   - Lösung: WCAG. Web Content Accessibility Guidelines.
4. Was ist ein Nachteil von "Buy"?
   - Lösung: Abhängigkeit vom Hersteller. Vendor Lock-in und Lizenzkosten.
5. Gewicht 40 %, Bewertung 5 Punkte. Welcher gewichtete Punktwert?
   - Lösung: 2. 0,4 × 5 = 2.
6. Warum sollte Farbe nie die einzige Information sein?
   - Lösung: Farbenblinde Nutzer erkennen sie nicht. Zusätzlich Text oder Symbol nutzen.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Euer Team überlegt, ein Zeiterfassungstool selbst zu entwickeln oder zu kaufen. Nenne je 2 Vorteile von Make und von Buy und eine Methode, um zu entscheiden.

```
Make: passt genau zu unseren Abläufen, Know-how bleibt im Haus, keine Lizenzkosten, keine Abhängigkeit vom Hersteller.
Buy: sofort einsatzbereit, Support und Updates durch Hersteller, erprobt, kalkulierbare Kosten.
Entscheidung: Nutzwertanalyse mit gewichteten Kriterien, ergänzt um Kostenvergleich und Amortisationsrechnung.
```
