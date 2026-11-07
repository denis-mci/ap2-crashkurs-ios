# Aktivitäts-, Sequenz-, Zustandsdiagramm

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA2 Algorithmen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Struktogramm und PAP sind seit 2025 gestrichen. Abläufe zeigst du als Aktivitätsdiagramm oder Pseudocode.

## Inhalt

### 1. Struktogramm ist raus

Struktogramm und Programmablaufplan? Seit 2025 aus dem Katalog gestrichen. Abläufe zeigst du jetzt als Aktivitätsdiagramm oder in Pseudocode. Wenn eine Aufgabe also einen Ablauf zeichnen will, nimm das Aktivitätsdiagramm. Ein Struktogramm wird nicht mehr erwartet.

**Merk dir:** Struktogramm und PAP sind seit 2025 raus.

### 2. Aktivitätsdiagramm: Elemente

*Leitfrage: Was sind die Bausteine eines Aktivitätsdiagramms?*

Start ist ein schwarzer Punkt. Ende ist ein Punkt im Ring. Aktionen sind abgerundete Rechtecke. Eine Raute ist eine Verzweigung. An die Pfeile schreibst du die Bedingungen in eckigen Klammern. Ein dicker Balken bedeutet parallele Abläufe. Und Swimlanes trennen, wer was macht. Gabelungs- und Vereinigungsbalken, also dicke schwarze Striche, zeigen Aktionen, die parallel laufen. Zum Beispiel Rechnung drucken und gleichzeitig E-Mail senden. Swimlanes teilen das Diagramm in Spalten, eine pro Rolle. So sieht man, wer welche Aktion ausführt.

**Merk dir:** Start schwarzer Punkt, Ende Punkt im Ring, Raute ist eine Verzweigung.

| Symbol | Bedeutung |
|---|---|
| ● Punkt | Start |
| ◉ Punkt im Ring | Ende |
| ▢ abgerundet | Aktion |
| ◇ Raute | Entscheidung, Zusammenführung |
| ▬ dicker Balken | Parallele Abläufe |

### 3. Beispiel: Login

*Leitfrage: Kannst du das an einem Beispiel zeigen?*

Ein Login. Start, dann Zugangsdaten eingeben. Dann eine Entscheidungsraute. Wenn falsch: Fehlermeldung und zurück. Der Rückpfeil geht in eine Zusammenführungsraute, nicht direkt in die Aktion. Zwei Pfeile in eine Aktion heißen: beide müssen ankommen. Wenn richtig: Dashboard und Ende. Jeder Pfeil aus einer Entscheidungsraute braucht eine Bedingung. Häufiger Fehler: Pfeile aus der Raute ohne Bedingung. Jeder ausgehende Pfeil braucht eine Bedingung in eckigen Klammern, und zusammen müssen sie alle Fälle abdecken.

**Merk dir:** Bedingungen in eckigen Klammern an die Pfeile schreiben.

```
●  Start
↓
◇  Zusammenführung  ←──────┐
↓                          │
( Zugangsdaten eingeben )  │
↓                          │
◇ ─[falsch]→ ( Fehlermeldung )
↓ [richtig]
( Dashboard anzeigen )
↓
◉  Ende
```

Kontrollfrage: Wie schreibst du die Bedingung an einen Pfeil? Antwort: In eckigen Klammern. Die Wächterbedingung steht in eckigen Klammern, zum Beispiel falsch oder richtig.

### 4. Sequenzdiagramm

*Leitfrage: Und wann brauche ich ein Sequenzdiagramm?*

Das Sequenzdiagramm zeigt, wer wem in welcher Reihenfolge Nachrichten schickt. Oben stehen die Objekte. Darunter gestrichelte Lebenslinien. Die Zeit läuft von oben nach unten. Ein Pfeil mit voller Spitze ist ein synchroner Aufruf. Die Antwort ist gestrichelt. Kästen zeigen Fragmente: alt für Verzweigung, loop für Schleife, opt für optionale Teile. Ein durchgezogener Pfeil mit gefüllter Spitze ist ein synchroner Aufruf: Der Sender wartet auf die Antwort. Die Antwort zeichnest du gestrichelt zurück. Die schmalen Balken auf der Lebenslinie zeigen, wann ein Objekt gerade aktiv ist.

**Merk dir:** Sequenzdiagramm: Wer schickt wem in welcher Reihenfolge Nachrichten.

```
:Client     :Server     :Datenbank
   | login() →  |            |
   |            | prüfe() →  |
   |            |  ← ok      |
   |  ← Token   |            |
Lebenslinien senkrecht
Zeit läuft nach unten
→ synchron, volle Spitze
⇢ Antwort, gestrichelt
alt  loop  opt: Fragmente
```

### 5. Zustandsdiagramm

*Leitfrage: Was zeigt ein Zustandsdiagramm?*

Das Zustandsdiagramm zeigt die Zustände eines Objekts. Ein Dokument startet im Entwurf, einreichen, dann In Prüfung. Freigeben führt nach Freigegeben. Ablehnen führt zurück nach Entwurf. Am Pfeil steht das Ereignis, optional eine Bedingung in eckigen Klammern und nach dem Schrägstrich eine Aktion. An die Übergänge schreibst du das Ereignis, das den Wechsel auslöst, zum Beispiel einreichen oder freigeben. Optional mit einer Bedingung in eckigen Klammern.

**Merk dir:** Zustandsdiagramm: Zustände eines Objekts und die Übergänge.

```
● → [Entwurf]
        │ einreichen
        ↓
     [In Prüfung]
     │          │
  ablehnen   freigeben
  zurück        ↓
  zu Entwurf [Freigegeben] → ◉

Zustand: abgerundetes Rechteck
Pfeil: Ereignis [Bedingung] / Aktion
```

### 6. Welches Diagramm wann?

*Leitfrage: Wie entscheide ich in der Prüfung, welches Diagramm passt?*

Ablauf oder Algorithmus: Aktivitätsdiagramm. Wer ruft wen in welcher Reihenfolge: Sequenzdiagramm. Welche Zustände hat ein Objekt: Zustandsdiagramm. Klassen und Beziehungen: Klassendiagramm. Was kann der Nutzer tun: Anwendungsfalldiagramm. Lies die Aufgabe auf das Verb hin: Ablauf modellieren, Kommunikation darstellen, Zustände abbilden. Das Verb verrät dir fast immer das gesuchte Diagramm.

**Merk dir:** Ablauf heißt Aktivitätsdiagramm, Reihenfolge heißt Sequenzdiagramm.

| Frage | Diagramm |
|---|---|
| Ablauf, Algorithmus | Aktivitätsdiagramm |
| Wer ruft wen wann? | Sequenzdiagramm |
| Welche Zustände? | Zustandsdiagramm |
| Klassen, Beziehungen | Klassendiagramm |
| Was kann der Nutzer tun? | Anwendungsfalldiagramm |

Kontrollfrage: Welche Zustände durchläuft ein Antrag? Welches Diagramm nimmst du? Antwort: Zustandsdiagramm. Zustände und Übergänge zeigt das Zustandsdiagramm.

## Zusammenfassung

Merke: Ablauf gleich Aktivitätsdiagramm, wer schickt wem was gleich Sequenzdiagramm, welche Zustände hat ein Objekt gleich Zustandsdiagramm.

## Übungsfragen mit Lösung

1. Was ersetzt seit dem Katalog 2025 Struktogramm und PAP?
   - Lösung: Aktivitätsdiagramm oder Pseudocode. Struktogramm und PAP sind gestrichen.
2. Welches Symbol steht im Aktivitätsdiagramm für eine Verzweigung?
   - Lösung: Raute. Raute = Entscheidung oder Zusammenführung.
3. Was zeigt ein dicker schwarzer Balken im Aktivitätsdiagramm?
   - Lösung: Parallele Abläufe. Gabelung (Fork) und Vereinigung (Join).
4. In welche Richtung läuft die Zeit im Sequenzdiagramm?
   - Lösung: Von oben nach unten. Die Lebenslinien gehen nach unten.
5. Welches Fragment zeigt im Sequenzdiagramm eine Schleife?
   - Lösung: loop. alt = Verzweigung, opt = optional, loop = Schleife.
6. "Welche Zustände durchläuft ein Antrag?" Welches Diagramm?
   - Lösung: Zustandsdiagramm. Zustände und Übergänge.
7. Wie wird eine Bedingung an einen Pfeil geschrieben?
   - Lösung: In eckigen Klammern [ ]. Wächterbedingung, englisch Guard.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Beschreibe in Textform ein Aktivitätsdiagramm für: Kunde gibt Bestellmenge ein. Ist die Menge größer als der Lagerbestand, wird ein Hinweis angezeigt und erneut eingegeben. Sonst wird die Bestellung gespeichert. Nenne Start, Aktionen, Verzweigung mit Bedingungen und Ende.

```
Startknoten → Zusammenführungsraute → Aktion "Bestellmenge eingeben" → Entscheidungsraute. Pfeil [Menge > Lagerbestand] → Aktion "Hinweis anzeigen" → zurück zur Zusammenführungsraute vor "Bestellmenge eingeben". Pfeil [Menge <= Lagerbestand] → Aktion "Bestellung speichern" → Endknoten.
```
