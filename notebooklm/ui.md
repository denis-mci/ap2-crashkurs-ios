# UI/UX: Mockups, Ergonomie, Usability

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Mockups kamen in 3 älteren Prüfungen und wieder im Sommer 2026 dran, "Bedienoberflächen konzipieren" steht im Katalog.

## Inhalt

### 1. Mockups bringen Punkte

Mockups kamen in 3 älteren Prüfungen dran und wieder im Sommer 2026. Bedienoberflächen konzipieren steht im Katalog. Typischer Fehler: Die Maske ist hübsch gemalt, aber kein Steuerelement ist begründet. Die Punkte gibt es für die Begründung. Zeichne immer echte Beschriftungen und passende Steuerelemente. Ein Kästchen mit Feld eins bekommt kaum Punkte.

**Merk dir:** Die Maske muss zur Aufgabe passen, nicht nur hübsch sein.

### 2. Wireframe, Mockup, Prototyp

*Leitfrage: Wireframe, Mockup, Prototyp. Was ist was?*

Ein Wireframe ist ein grobes Layout aus Kästen, ohne Design. Das nennt man Low Fidelity. Ein Mockup sieht aus wie das echte Produkt, mit Farben und Schrift, ist aber statisch. Ein Prototyp ist klickbar, damit testest du Abläufe. Horizontal: eine Schicht in der Breite, meist nur die Oberfläche ohne Logik. Vertikal: eine Funktion durch alle Schichten bis zur Datenbank. Ein Wegwerfprototyp wird danach verworfen. Ein evolutionärer Prototyp wird Schritt für Schritt zum fertigen Produkt. Prototypen gibt es als Wegwerf-Prototyp nur zum Testen, oder als evolutionären Prototyp, der Schritt für Schritt zum fertigen Produkt wird.

**Merk dir:** Wireframe grob, Mockup sieht echt aus, Prototyp ist klickbar.

| Begriff | Bedeutung |
|---|---|
| Wireframe | grobes Layout aus Kästen, Low Fidelity |
| Mockup | statisch, mit Farben und Schrift, High Fidelity |
| Prototyp | klickbar, Abläufe testbar |
| horizontal, vertikal | nur UI in der Breite, eine Funktion durch alle Schichten |
| Wegwerf, evolutionär | wird danach verworfen, wird zum Produkt |

Kontrollfrage: Nur die Funktion Login wird komplett gebaut, von der Maske bis zur Datenbank. Welcher Prototyp? Antwort: vertikal. Eine Funktion durch alle Schichten ist vertikal.

### 3. Eine Maske, die Punkte holt

*Leitfrage: Wie sieht eine Maske aus, die Punkte bringt?*

Oben eine klare Navigation und eine Suche. Dann ein Textfeld für freie Eingaben wie den Namen. Radiobuttons für genau eins aus wenigen, alle Optionen sind sofort sichtbar. Ein Dropdown für eins aus vielen, das spart Platz. Checkboxen, wenn mehrere gleichzeitig gehen. Für Daten einen Datepicker, dann stimmt das Format. Fehlermeldung direkt am Feld, Pflichtfelder mit Stern markieren, Buttons klar mit Verb beschriften. Pflichtfelder markierst du sichtbar, zum Beispiel mit Stern. Und jeder Button sagt, was passiert: Speichern statt OK. Fehlermeldungen gehören direkt an das betroffene Feld, nicht nur oben auf die Seite.

**Merk dir:** Radiobutton eins aus wenigen, Checkbox mehrere, Dropdown eins aus vielen.

```
Start | Mandanten | Aufträge  [Suche   ]
Name *       [________________]
Anrede       (o) Frau ( ) Herr ( ) Divers
Rechtsform   [ GmbH          v]
Leistungen   [x] Lohn  [ ] Buchhaltung
Seit         [12.10.2026] Kalender
! Name fehlt, bitte ausfüllen
       [Abbrechen]  [Mandant speichern]
* Pflichtfeld
```

### 4. ISO 9241-110: 7 Prinzipien

*Leitfrage: Die ISO 9241-110 hat sieben Prinzipien. Welche?*

Die DIN EN ISO 9241-110 von 2020 hat 7 Interaktionsprinzipien. Aufgabenangemessenheit: nur die Schritte und Felder, die die Aufgabe braucht. Selbstbeschreibungsfähigkeit: Du siehst immer, wo du bist und was geht. Erwartungskonformität: konsistent und wie gewohnt. Erlernbarkeit: leicht zu lernen. Steuerbarkeit: abbrechen und rückgängig machen. Robustheit: Fehler vermeiden, verständlich melden, leicht beheben. Neu ist Benutzerbindung: Die Nutzung motiviert und wirkt vertrauenswürdig. Alte Prüfungen nutzen noch die Fassung 2006 mit Fehlertoleranz. Zu den sieben gehören auch Erwartungskonformität, also Bedienung wie gewohnt, und Robustheit gegen Benutzerfehler. Nenne in der Prüfung immer ein Beispiel aus der Maske.

**Merk dir:** Aufgabenangemessenheit heißt: nur was die Aufgabe braucht.

```
Aufgabenangemessenheit
  nur nötige Schritte und Felder
Selbstbeschreibungsfähigkeit
  wo bin ich, was kann ich tun?
Erwartungskonformität
  konsistent, wie gewohnt
Erlernbarkeit: leicht zu lernen
Steuerbarkeit: abbrechen, rückgängig
Robustheit gegen Benutzungsfehler
  Fehler vermeiden, leicht beheben
Benutzerbindung
  motivierend, vertrauenswürdig
Alt 2006: Fehlertoleranz,
  Individualisierbarkeit, Lernförderlichkeit
```

Kontrollfrage: Nach einem Tippfehler ist das ganze Formular leer. Welches Prinzip ist verletzt? Antwort: Robustheit gegen Benutzungsfehler. Eingaben müssen erhalten bleiben und der Fehler leicht behebbar sein.

### 5. Usability, UX und Gestalt

*Leitfrage: Usability und UX, ist das nicht dasselbe?*

Usability nach ISO 9241-11 heißt: Effektivität, also Ziel erreicht. Effizienz, also mit wenig Aufwand. Und Zufriedenheit. User Experience ist mehr. Sie umfasst das Erleben vor, während und nach der Nutzung. Gestaltgesetze: Was nah beieinander steht, gehört zusammen. Was gleich aussieht, hat die gleiche Funktion. Ein Rahmen bildet eine Gruppe. Dazu Konsistenz und guter Kontrast. Responsive Design passt sich jedem Bildschirm an, Mobile First entwirft zuerst fürs Handy. Die Gestaltgesetze erklären, warum Gruppen wirken: Was nah beieinander steht oder ähnlich aussieht, nimmt man als zusammengehörig wahr.

**Merk dir:** Usability: Effektivität, Effizienz, Zufriedenheit.

```
ISO 9241-11 Usability:
 Effektivität   Ziel erreicht?
 Effizienz      mit wenig Aufwand?
 Zufriedenheit  gern genutzt?
UX: vor, während und nach der Nutzung
Gestaltgesetze:
 Nähe: Nahes gehört zusammen
 Ähnlichkeit: Gleiches sieht gleich aus
 Geschlossenheit: Rahmen bildet Gruppe
Konsistenz und Kontrast
Responsive: passt sich dem Gerät an
Mobile First: erst klein, dann groß
```

### 6. Barrierefreiheit

*Leitfrage: Was gehört zur Barrierefreiheit?*

Die WCAG haben 4 Prinzipien. Wahrnehmbar: zum Beispiel Alt-Texte für Bilder. Bedienbar: alles geht auch per Tastatur. Verständlich: klare Sprache und Hilfen. Robust: funktioniert auch mit Hilfsmitteln wie dem Screenreader. Kontrast nach Stufe AA: normaler Text mindestens 4,5 zu 1, große Schrift 3 zu 1. Farbe ist nie die einzige Information. Rechtlich gilt die BITV für öffentliche Stellen. Seit dem 28. Juni 2025 gilt das BFSG für bestimmte Produkte und Dienste, etwa Onlineshops. In Deutschland verpflichtet das Barrierefreiheitsstärkungsgesetz seit Mitte 2025 viele Anbieter digitaler Dienste zur Barrierefreiheit.

**Merk dir:** WCAG: wahrnehmbar, bedienbar, verständlich, robust.

```
WCAG: 4 Prinzipien
 wahrnehmbar   Alt-Texte, Kontrast
 bedienbar     alles per Tastatur
 verständlich  klare Sprache, Hilfen
 robust        Screenreader-tauglich
Kontrast AA: Text 4,5:1, groß 3:1
Farbe nie einzige Information
Recht:
 BITV 2.0: öffentliche Stellen
 BFSG seit 28.06.2025: bestimmte
  Produkte und Dienste, etwa Shops
```

### 7. Usability testen

*Leitfrage: Und wie teste ich die Usability?*

Thinking Aloud: Testpersonen lösen Aufgaben und sprechen laut aus, was sie denken. So siehst du, wo sie stolpern. Beim A B Test bekommen Nutzergruppen zwei Varianten, und du misst, welche besser funktioniert. Eye-Tracking misst, wohin die Augen schauen. Bei der heuristischen Evaluation prüfen Experten die Oberfläche gegen bekannte Regeln. Ein Fragebogen misst die Zufriedenheit. Fünf Testpersonen finden schon einen Großteil der Usability-Probleme. Man muss also nicht riesig testen, sondern früh und regelmäßig.

**Merk dir:** Thinking Aloud: Testperson spricht laut aus, was sie denkt.

| Methode | Wie |
|---|---|
| Thinking Aloud | Nutzer denkt beim Bedienen laut |
| A/B-Test | zwei Varianten, welche wirkt besser? |
| Eye-Tracking | Blickverlauf wird gemessen |
| Heuristische Evaluation | Experten prüfen gegen Regeln |
| Fragebogen | Zufriedenheit standardisiert abfragen |

## Zusammenfassung

Merke: Radiobuttons für eins aus wenigen, Checkboxen für mehrere, Dropdown für eins aus vielen. Und jede Maske muss zur Aufgabe passen, nicht nur hübsch aussehen.

## Übungsfragen mit Lösung

1. Welcher Entwurf ist klickbar, sodass Nutzer echte Abläufe ausprobieren können?
   - Lösung: Prototyp. Wireframe = grobes Layout, Mockup = statisch mit Design, Prototyp = klickbar.
2. Ein statischer Entwurf mit echten Farben, Schriften und Logo, aber nicht klickbar, ist ein ...
   - Lösung: Mockup. Mockup = High Fidelity, aber statisch.
3. Ihr baut nur die Funktion "Beleg hochladen", dafür komplett von der Oberfläche bis zur Datenbank. Welcher Prototyp ist das?
   - Lösung: vertikaler Prototyp. Vertikal = eine Funktion durch alle Schichten. Horizontal = eine Schicht (meist die Oberfläche) in der Breite, ohne Logik dahinter.
4. Zahlungsart: Lastschrift, Überweisung oder Rechnung. Genau eine ist wählbar. Welches Steuerelement passt am besten?
   - Lösung: Radiobutton. Radiobutton = genau 1 aus wenigen, alle Optionen sofort sichtbar.
5. Ein Mandant soll sein Bundesland aus 16 Bundesländern wählen. Welches Steuerelement passt am besten?
   - Lösung: Dropdown. Viele Optionen, genau eine Auswahl: Dropdown spart Platz und verhindert Tippfehler.
6. Ein falsch ausgefülltes Feld wird sofort rot markiert, direkt daneben steht, was falsch ist, die übrigen Eingaben bleiben erhalten. Welches Interaktionsprinzip nach ISO 9241-110 wird damit erfüllt?
   - Lösung: Robustheit gegen Benutzungsfehler. Fehler erkennen, verständlich melden, leicht korrigieren: Robustheit gegen Benutzungsfehler (früher Fehlertoleranz).
7. Der Speichern-Button steht in jeder Maske an derselben Stelle und heißt überall gleich. Welches Prinzip?
   - Lösung: Erwartungskonformität. Konsistent und wie gewohnt = erwartungskonform.
8. Welche drei Kriterien definieren Gebrauchstauglichkeit (Usability) nach ISO 9241-11?
   - Lösung: Effektivität, Effizienz, Zufriedenheit. Ziel erreicht, mit vertretbarem Aufwand, und der Nutzer ist zufrieden.
9. Welches Kontrastverhältnis fordert WCAG Stufe AA mindestens für normalen Fließtext? (Format x:1)
   - Lösung: 4,5:1. 4,5:1 für normalen Text, 3:1 für große Schrift.
10. Ein Formular lässt sich nur mit der Maus bedienen, nicht mit der Tastatur. Welches WCAG-Prinzip ist verletzt?
   - Lösung: bedienbar. Bedienbar heißt unter anderem: alles per Tastatur erreichbar.
11. Testpersonen erledigen Aufgaben und sprechen dabei laut aus, was sie denken. Welche Methode ist das?
   - Lösung: Thinking Aloud. Lautes Denken zeigt, wo Nutzer stolpern.
12. Straße, PLZ und Ort stehen eng beieinander, mit deutlichem Abstand zum Block Bankverbindung. Welches Gestaltgesetz wird genutzt?
   - Lösung: Gesetz der Nähe. Was nah beieinander steht, wird als zusammengehörig wahrgenommen.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Entwerfen Sie in Textform ein Mockup für die Maske "Neuen Mandanten anlegen" mit den Angaben Anrede (Frau, Herr, Divers), Name, Rechtsform (eine aus 9 Möglichkeiten), gebuchte Leistungen (Lohn, Buchhaltung, Jahresabschluss; mehrere möglich) und "Mandant seit" (Datum). Begründen Sie die Wahl jedes Steuerelements und nennen Sie zwei weitere Gestaltungsregeln.

```
Maske "Neuer Mandant"
[ Start | Mandanten | Aufträge ]            [Suche...]
Anrede *        ( ) Frau  ( ) Herr  ( ) Divers
Name *          [________________________]
Rechtsform *    [ GmbH                  v]
Leistungen      [ ] Lohn  [ ] Buchhaltung  [ ] Jahresabschluss
Mandant seit    [ 12.10.2026 ] (Kalender)
                         [Abbrechen]  [Mandant speichern]
* = Pflichtfeld

Begründung:
Anrede: Radiobutton, weil genau 1 aus wenigen Optionen gewählt wird und alle sofort sichtbar sind.
Name: Textfeld, weil es eine freie Eingabe ist.
Rechtsform: Dropdown, weil genau 1 aus vielen Optionen gewählt wird, spart Platz und verhindert Tippfehler.
Leistungen: Checkbox, weil mehrere gleichzeitig gewählt werden können.
Mandant seit: Datepicker, damit das Datum im richtigen Format eingegeben wird.

Weitere Regeln: Pflichtfelder mit * markieren, Fehlermeldungen direkt am Feld anzeigen, Buttons eindeutig mit Verb beschriften und in allen Masken an derselben Stelle platzieren (Konsistenz), zusammengehörige Felder gruppieren (Gesetz der Nähe).
```

### Aufgabe 2

Ein Kollege hat eine Erfassungsmaske gebaut. Ordnen Sie jedem Mangel das verletzte Interaktionsprinzip nach DIN EN ISO 9241-110 zu und schlagen Sie eine Verbesserung vor: 1. Die Maske verlangt sechs Angaben, die für die Aufgabe gar nicht gebraucht werden. 2. Icons haben weder Beschriftung noch Tooltip, man sieht nicht, in welchem Schritt man ist. 3. Der Abbrechen-Button ist mal links, mal rechts. 4. Ein gestarteter Import lässt sich weder abbrechen noch rückgängig machen. 5. Bei falschem Datumsformat wird das ganze Formular ohne Hinweis geleert.

```
1. Aufgabenangemessenheit: Nur Felder abfragen, die für die Aufgabe nötig sind; überflüssige Felder entfernen oder optional machen.
2. Selbstbeschreibungsfähigkeit: Icons beschriften oder Tooltips ergänzen, Schrittanzeige ("Schritt 2 von 4") einblenden.
3. Erwartungskonformität: Abbrechen-Button in allen Masken an derselben Stelle und gleich benannt (Konsistenz).
4. Steuerbarkeit: Abbrechen-Funktion für den Import und eine Rückgängig-Möglichkeit anbieten.
5. Robustheit gegen Benutzungsfehler: Eingaben behalten, fehlerhaftes Feld markieren, verständliche Meldung mit Beispiel ("TT.MM.JJJJ") anzeigen, besser gleich einen Datepicker verwenden.
```
