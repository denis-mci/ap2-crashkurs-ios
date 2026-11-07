# Anforderungen, Stakeholder, BPMN

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Anforderungen, Stakeholder und Risiken gehören zu jeder Projektplanung, BPMN ist neu im Prüfungskatalog 2025.

## Inhalt

### 1. BPMN ist neu

BPMN ist neu im Prüfungskatalog 2025. Und Stakeholder, Anforderungen und Risiken gehören zu jeder Projektplanung. Wiederholung: Lastenheft vom Auftraggeber, was. Pflichtenheft vom Auftragnehmer, wie. Funktional heißt was, nicht-funktional wie gut. Diese Themen kommen meist am Anfang eines Prüfungsfalls. Gute Punkte hier geben dir Ruhe für den Rest.

**Merk dir:** BPMN ist neu im Katalog 2025.

### 2. Stakeholder-Matrix

*Leitfrage: Wie gehe ich mit Stakeholdern um?*

Stakeholder sind vom Projekt betroffen oder beeinflussen es. Intern etwa Mitarbeiter und Geschäftsleitung, extern Mandanten und Dienstleister. Die Matrix stellt Einfluss gegen Interesse. Viel Einfluss und viel Interesse: eng einbinden. Viel Einfluss, wenig Interesse: zufriedenstellen. Wenig Einfluss, aber hohes Interesse: informieren. Wenig von beidem: beobachten. Die Umfeldanalyse sammelt vorher alle Stakeholder. Wer hohen Einfluss und hohes Interesse hat, wird eng eingebunden, zum Beispiel die Kanzleipartner. Wer wenig von beidem hat, wird nur informiert.

**Merk dir:** Stakeholder-Matrix: Einfluss gegen Interesse.

| Einfluss, Interesse | Strategie |
|---|---|
| hoch, hoch | eng einbinden, managen |
| hoch, niedrig | zufriedenstellen |
| niedrig, hoch | informieren |
| niedrig, niedrig | beobachten |

### 3. Anforderungen erheben

*Leitfrage: Wie erhebe ich Anforderungen?*

Erst die Ist-Analyse: Wie läuft es heute? Daraus entsteht das Soll-Konzept. Das Interview geht in die Tiefe, kostet aber viel Zeit. Ein Fragebogen erreicht viele Personen und ist gut auswertbar, aber ohne Rückfragen. Ein Workshop findet gemeinsame Lösungen. Beobachtung zeigt die echten Abläufe, auch was Mitarbeiter nicht beschreiben können. Die Dokumentenanalyse wertet vorhandene Unterlagen aus. Beobachtung ist gut, wenn Nutzer ihre Abläufe schwer beschreiben können. Workshops bringen mehrere Stakeholder an einen Tisch.

**Merk dir:** Erst Ist-Analyse, dann Soll-Konzept.

| Technik | Plus | Minus |
|---|---|---|
| Interview | tief, Rückfragen möglich | zeitaufwendig |
| Fragebogen | viele Personen, auswertbar | keine Rückfragen |
| Workshop | gemeinsame Lösung | Wortführer dominieren |
| Beobachtung | echte Abläufe sichtbar | aufwendig |
| Dokumentenanalyse | objektiv, stört keinen | oft veraltet |

### 4. User Story und INVEST

*Leitfrage: Was macht eine gute User Story aus?*

Die User Story: Als Rolle möchte ich Ziel, damit Nutzen. Akzeptanzkriterien legen prüfbar fest, wann die Story erfüllt ist. Ohne sie gibt es in der Prüfung Abzug. Gute Stories erfüllen INVEST: unabhängig, verhandelbar, wertvoll, schätzbar, klein und testbar. Das T steht für Testable. Ein Use Case beschreibt den Ablauf zwischen Akteur und System ausführlich. Die User Story ist kurz, aus Nutzersicht und typisch agil. INVEST heißt: unabhängig, verhandelbar, wertvoll, schätzbar, klein und testbar. Eine Story, die du nicht testen kannst, ist keine gute Story.

**Merk dir:** User Story nur mit Akzeptanzkriterien.

```
Als Mandant möchte ich Belege per
App hochladen, damit ich nichts
mehr in die Kanzlei bringen muss.
Akzeptanzkriterien:
 PDF und JPG bis 20 MB möglich
 Bestätigung nach dem Upload
INVEST: Independent, Negotiable,
 Valuable, Estimable, Small, Testable
Use Case: Akteur, Ablauf, System,
 Haupt- und Alternativszenario
User Story: kurz, Nutzersicht, agil
```

### 5. Machbarkeit, SMART, Dreieck

*Leitfrage: Machbarkeit, SMART, und welches Dreieck?*

Die Machbarkeitsanalyse prüft fünf Seiten. Technisch, wirtschaftlich und rechtlich, zum Beispiel DSGVO und Berufsrecht. Dazu organisatorisch, passt es in unsere Abläufe, und zeitlich, schaffen wir es rechtzeitig. Ziele formulierst du SMART: spezifisch, messbar, attraktiv, realistisch, terminiert. Also mit Zahl und Datum. Das magische Dreieck: Zeit, Kosten und Qualität hängen zusammen. Änderst du eins, leiden die anderen. SMART heißt spezifisch, messbar, attraktiv, realistisch und terminiert. Schlecht: Das Portal soll schnell sein. Gut: Jede Seite lädt bis zum 31. März in unter zwei Sekunden. Das magische Dreieck aus Zeit, Kosten und Qualität zeigt: Ändert sich eine Ecke, leiden die anderen.

**Merk dir:** Ziele SMART formulieren.

```
Machbarkeit:
 technisch: können wir es bauen?
 wirtschaftlich: lohnt es sich?
 rechtlich: dürfen wir das?
 organisatorisch: passt es zu uns?
 zeitlich: schaffen wir es?
SMART: spezifisch, messbar,
 attraktiv, realistisch, terminiert
Magisches Dreieck:
 Zeit, Kosten, Qualität
```

### 6. Risiken und Protokoll

*Leitfrage: Wie bewerte ich Risiken?*

Risiko ist Eintrittswahrscheinlichkeit mal Schadenshöhe. 20 Prozent mal 50000 Euro sind 10000 Euro. Die größten Risiken der Matrix zuerst. Vier Maßnahmen: vermeiden, vermindern, übertragen, zum Beispiel per Versicherung, oder bewusst akzeptieren. Das Ergebnisprotokoll enthält nur Beschlüsse und Aufgaben. Das Verlaufsprotokoll zeigt auch den Ablauf der Diskussion. Pflicht sind Datum, Ort, Teilnehmer, Tagesordnung, Protokollant und Aufgaben mit Verantwortlichem und Termin. Die vier Maßnahmen: vermeiden, vermindern, übertragen, zum Beispiel per Versicherung, und akzeptieren. Nenne zu jedem Risiko eine passende Maßnahme.

**Merk dir:** Risiko gleich Wahrscheinlichkeit mal Schadenshöhe.

```
Risiko = Wahrscheinlichkeit x Schaden
 20 % x 50.000 € = 10.000 €
Maßnahmen:
 vermeiden: Ursache beseitigen
 vermindern: Backup, Tests, Schulung
 übertragen: Versicherung, Vertrag
 akzeptieren: bewusst tragen
Ergebnisprotokoll: nur Ergebnisse
Verlaufsprotokoll: auch Diskussion
Pflicht: Datum, Ort, Teilnehmer,
 Tagesordnung, Protokollant,
 Aufgaben: wer, was, bis wann
```

Kontrollfrage: Was kommt raus: 10 Prozent Wahrscheinlichkeit mal 30000 Euro Schaden? Antwort: 3000 Euro. 0,1 mal 30.000 Euro ergibt 3.000 Euro.

### 7. BPMN in 60 Sekunden

*Leitfrage: Und BPMN in einer Minute?*

Ein Pool ist ein Teilnehmer, etwa die Kanzlei. Lanes sind Rollen darin. Aufgaben sind abgerundete Rechtecke. Ereignisse sind Kreise: Start mit dünnem Rand, Zwischenereignis doppelt, Ende dick umrandet. Gateways sind Rauten. Mit X: genau ein Weg. Mit Plus: alle Wege parallel. Mit O: einer oder mehrere. Im Pool der Sequenzfluss, durchgezogen. Zwischen Pools der Nachrichtenfluss, gestrichelt. Das UML-Aktivitätsdiagramm ist softwarenäher. Ein Gateway ist eine Raute und steht für eine Verzweigung. Nachrichtenflüsse zwischen Pools zeichnest du gestrichelt.

**Merk dir:** Pool ist ein Teilnehmer, Lane eine Rolle darin.

```
Pool: Teilnehmer, etwa Kanzlei
 Lane: Rolle darin, etwa Sekretariat
Aufgabe: abgerundetes Rechteck
Ereignis: Kreis
 Start dünn, Zwischen doppelt,
 Ende dick
Gateway: Raute
 X  XOR: genau ein Weg
 +  AND: alle Wege parallel
 O  OR: einer oder mehrere
Sequenzfluss: durchgezogen, im Pool
Nachrichtenfluss: gestrichelt,
 zwischen Pools
UML-Aktivitätsdiagramm: softwarenah
```

Kontrollfrage: Ab 10000 Euro braucht eine Rechnung eine Freigabe, sonst wird sie direkt gebucht. Welches Gateway? Antwort: XOR. Genau einer der beiden Wege wird genommen: exklusives Gateway.

## Zusammenfassung

Also: Risiko gleich Wahrscheinlichkeit mal Schaden. User Story immer mit Akzeptanzkriterien. In BPMN ist ein Pool ein Teilnehmer und eine Lane eine Rolle darin.

## Übungsfragen mit Lösung

1. Die Geschäftsleitung hat großen Einfluss auf das Projekt, interessiert sich aber kaum für Details. Welche Strategie empfiehlt die Stakeholder-Matrix?
   - Lösung: zufriedenstellen. Hoher Einfluss, geringes Interesse: zufriedenstellen, damit keine Blockade entsteht.
2. Du willst von 120 Mitarbeitern an drei Standorten schnell vergleichbare Antworten. Welche Erhebungstechnik passt am besten?
   - Lösung: Fragebogen. Fragebogen: viele Personen, gut auswertbar, aber keine Rückfragen möglich.
3. Die Mitarbeiter erledigen ihre Arbeit routiniert, können die Abläufe aber kaum beschreiben. Welche Technik deckt das implizite Wissen am besten auf?
   - Lösung: Beobachtung. Beobachtung zeigt die echten Abläufe, ist aber aufwendig.
4. Wofür steht das T in INVEST (Kriterien für gute User Stories)?
   - Lösung: Testable. Independent, Negotiable, Valuable, Estimable, Small, Testable.
5. Was legen Akzeptanzkriterien einer User Story fest?
   - Lösung: prüfbare Bedingungen, wann die Story erfüllt ist. Akzeptanzkriterien machen die Story testbar.
6. "Dürfen wir Mandantendaten in diesem Cloud-Dienst speichern?" Welche Machbarkeit wird geprüft?
   - Lösung: rechtliche. Rechtliche Machbarkeit: DSGVO, Berufsrecht, Verträge.
7. Welches Ziel ist SMART formuliert?
   - Lösung: Bis 31.03.2027 sinkt die Bearbeitungszeit pro Beleg von 5 auf 3 Minuten.. Spezifisch, messbar, attraktiv, realistisch, terminiert.
8. Eintrittswahrscheinlichkeit 20 %, Schadenshöhe 50.000 €. Wie hoch ist der Risikowert in Euro?
   - Lösung: 10000. Risiko = Wahrscheinlichkeit × Schaden = 0,2 × 50.000 € = 10.000 €.
9. Die Kanzlei schließt eine Cyberversicherung ab. Welche Risikomaßnahme ist das?
   - Lösung: übertragen. Der finanzielle Schaden wird auf die Versicherung übertragen.
10. Ein Protokoll enthält nur Beschlüsse und Aufgaben mit Verantwortlichem und Termin, nicht den Diskussionsverlauf. Welche Art?
   - Lösung: Ergebnisprotokoll. Ergebnisprotokoll = Ergebnisse. Verlaufsprotokoll = auch der Ablauf der Diskussion.
11. Ein BPMN-Gateway ist eine Raute mit einem Plus. Was bedeutet es?
   - Lösung: alle ausgehenden Wege laufen parallel. Plus = AND, paralleles Gateway. X = XOR, O = OR.
12. Wie stellst du in BPMN die Kommunikation zwischen den Pools "Kanzlei" und "Mandant" dar?
   - Lösung: Nachrichtenfluss, gestrichelter Pfeil. Sequenzfluss nur innerhalb eines Pools, zwischen Pools der Nachrichtenfluss.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Die Kanzlei plant ein Mandantenportal, über das Mandanten Belege hochladen. a) Nennen Sie je zwei interne und zwei externe Stakeholder. b) Formulieren Sie eine User Story mit zwei Akzeptanzkriterien.

```
a) Intern: Sachbearbeiter (arbeiten mit den Belegen), Geschäftsleitung/Partner (Budget, Entscheidung), IT-Abteilung (Betrieb).
Extern: Mandanten (laden hoch), Hosting-Dienstleister, Softwarehersteller der Kanzleisoftware.

b) User Story: Als Mandant möchte ich Belege per Smartphone hochladen, damit ich sie nicht mehr in die Kanzlei bringen muss.
Akzeptanzkriterien:
1. PDF, JPG und PNG bis 20 MB können hochgeladen werden.
2. Nach dem Upload erhält der Mandant eine Bestätigung und der Beleg erscheint beim zuständigen Sachbearbeiter.
```

### Aufgabe 2

Modellieren Sie in Textform einen BPMN-Prozess "Beleg prüfen": Pool Kanzlei mit den Lanes Sekretariat und Sachbearbeitung. Ein Beleg geht per Post ein, das Sekretariat scannt ihn. Die Sachbearbeitung prüft ihn: Ist er vollständig, wird er gebucht. Sonst wird eine Rückfrage an den Mandanten (eigener Pool) geschickt. Danach endet der Prozess. Benennen Sie die verwendeten BPMN-Elemente.

```
Pool "Kanzlei"
  Lane "Sekretariat":
    (Startereignis, Nachricht) Beleg per Post eingegangen
    -> [Aufgabe] Beleg scannen
  Lane "Sachbearbeitung":
    -> [Aufgabe] Beleg prüfen
    -> <X> XOR-Gateway "Beleg vollständig?"
         ja   -> [Aufgabe] Beleg buchen -> (Endereignis) Beleg erledigt
         nein -> [Aufgabe] Rückfrage senden -> (Endereignis) Rückfrage gestellt
Pool "Mandant" (zugeklappt)
  Rückfrage senden - - -> Mandant (Nachrichtenfluss, gestrichelt, zwischen den Pools)

Elemente: Pool, Lanes, Startereignis (dünner Kreis), Aufgaben (abgerundete Rechtecke), XOR-Gateway (Raute mit X), Sequenzfluss (durchgezogen, innerhalb des Pools), Nachrichtenfluss (gestrichelt, zwischen Pools), Endereignisse (dicker Kreis).
```
