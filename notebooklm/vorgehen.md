# Scrum, Vorgehensmodelle, Anforderungen

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Vorgehensmodelle kamen in 5 von 9 Prüfungen, Anforderungsanalyse sehr häufig.

## Inhalt

### 1. 5 von 9 Prüfungen

Vorgehensmodelle kamen in 5 von 9 Prüfungen. Anforderungsanalyse sogar sehr häufig. Klassischer Fehler: Lastenheft und Pflichtenheft verwechseln. Das klären wir gleich. Diese Begriffe tauchen auch in deiner Projektdokumentation auf. Das Lernen lohnt sich also doppelt.

**Merk dir:** Lastenheft vom Auftraggeber, Pflichtenheft vom Auftragnehmer.

### 2. Klassisch vs. agil

*Leitfrage: Was ist der grundlegende Unterschied zwischen klassisch und agil?*

Klassisch planst du alle Anforderungen am Anfang. Agil entwickeln sie sich. Wasserfall liefert am Ende. Scrum liefert nach jedem Sprint ein funktionierendes Stück. Änderungen sind klassisch teuer, agil willkommen. Faustregel: Feste, klare Anforderungen, dann Wasserfall. Weiß der Kunde noch nicht genau, was er will, dann Scrum. Agil heißt nicht ohne Plan. Es wird nur in kurzen Abständen neu geplant, nach dem Feedback des Kunden. Klassisch passt gut, wenn die Anforderungen fest stehen, etwa bei gesetzlichen Vorgaben. Agil passt, wenn sich die Wünsche noch ändern werden.

**Merk dir:** Agil liefert nach jedem Sprint ein funktionierendes Stück.

|  | Wasserfall, V-Modell | Agil, Scrum |
|---|---|---|
| Anforderungen | am Anfang komplett | entwickeln sich |
| Ergebnis | am Ende | nach jedem Sprint |
| Änderungen | teuer | willkommen |
| Gut wenn | feste, klare Anforderungen | unklare Anforderungen |

### 3. Wasserfall und V-Modell

*Leitfrage: Wie funktionieren Wasserfall und V-Modell?*

Beim Wasserfall startet jede Phase erst, wenn die vorige fertig ist. Das V-Modell: Zu jeder Entwurfsphase links gehört rechts eine Teststufe. Zu den Anforderungen gehört der Abnahmetest. Systementwurf zum Systemtest, Architektur zum Integrationstest, Modulentwurf zum Unit-Test. Ganz unten an der Spitze des V steht die Implementierung. Beim V-Modell gehört zum Systementwurf links der Systemtest rechts, zu den Anforderungen der Abnahmetest. So wird jede Entwurfsentscheidung später geprüft.

**Merk dir:** V-Modell: zu jeder Entwurfsphase gehört eine Teststufe.

```
Wasserfall: eine Phase nach der anderen

V-Modell: links Entwurf, rechts Test
Anforderungen ─────── Abnahmetest
 Systementwurf ────── Systemtest
  Architektur ────── Integrationstest
   Modulentwurf ──── Unit-Test
     Implementierung: Spitze des V
```

Kontrollfrage: Welche Teststufe steht im V-Modell gegenüber dem Modulentwurf? Antwort: Unit-Test. Modulentwurf gehört zum Unit-Test, Anforderungen zum Abnahmetest.

### 4. Scrum: 3 Verantwortlichkeiten

*Leitfrage: Wer macht was bei Scrum?*

Scrum hat drei Verantwortlichkeiten. Der Scrum Guide 2020 nennt sie nicht mehr Rollen. Der Product Owner verantwortet und priorisiert das Product Backlog. Er vertritt die Stakeholder. Der Scrum Master räumt Hindernisse weg und achtet auf die Regeln. Er ist kein Chef. Die Developers setzen um. Das ganze Scrum Team managt sich selbst. Der Scrum Master ist kein Chef. Er sorgt dafür, dass Scrum funktioniert, und räumt Hindernisse aus dem Weg. Die Developers entscheiden selbst, wie sie die Arbeit im Sprint erledigen. Der Product Owner entscheidet, was gemacht wird.

**Merk dir:** Product Owner, Scrum Master, Developers.

| Verantwortlichkeit | Aufgabe |
|---|---|
| Product Owner | verantwortet und priorisiert das Product Backlog |
| Scrum Master | entfernt Hindernisse, achtet auf Regeln, kein Chef |
| Developers | setzen um |

### 5. Scrum: die Events

*Leitfrage: Und welche Termine gibt es in Scrum?*

Ein Sprint dauert höchstens einen Monat, meist zwei bis vier Wochen. Immer gleich lang. Am Anfang das Sprint Planning. Jeden Tag ein Daily Scrum von 15 Minuten. Am Ende das Review: Das Ergebnis wird mit den Stakeholdern geprüft, Feedback inklusive. Dann die Retrospektive: Das Team spricht über die eigene Zusammenarbeit. Review ist Produkt, Retro ist Prozess. In der Sprint Review zeigt das Team dem Kunden das Ergebnis. In der Retrospektive schaut das Team auf die eigene Zusammenarbeit. Diese beiden werden ständig verwechselt.

**Merk dir:** Sprint höchstens einen Monat, Daily Scrum 15 Minuten.

| Event | Wann, Dauer |
|---|---|
| Sprint | höchstens 1 Monat, feste Länge |
| Sprint Planning | Start: was kommt rein |
| Daily Scrum | täglich 15 Minuten |
| Sprint Review | Ende: Ergebnis mit Stakeholdern prüfen |
| Retrospektive | Ende: wie arbeiten wir besser |

Kontrollfrage: Das Team will klären, wie es besser zusammenarbeitet. Welches Event? Antwort: Retrospektive. Review prüft das Produkt, die Retro den Prozess.

### 6. Lastenheft und Anforderungen

*Leitfrage: Lastenheft und Pflichtenheft, wer schreibt was?*

Das Lastenheft schreibt der Auftraggeber. Es sagt, was das System können soll. Merke: Lasten trägt der Kunde. Das Pflichtenheft schreibt der Auftragnehmer. Es sagt, wie es umgesetzt wird. Funktionale Anforderungen beschreiben, was das System tut. Zum Beispiel: Mandanten können Belege hochladen. Nicht-funktionale beschreiben, wie gut: Performance, Sicherheit, Bedienbarkeit. Upload in unter 2 Sekunden ist nicht-funktional. Ein Merktrick: Das Lastenheft ist die Last, die der Kunde trägt, also seine Wünsche. Das Pflichtenheft ist die Pflicht des Auftragnehmers, also wie er es umsetzt. Funktionale Anforderungen sagen, was das System tut, zum Beispiel Belege hochladen. Nicht-funktionale sagen, wie gut, zum Beispiel Laden in unter zwei Sekunden.

**Merk dir:** Lastenheft sagt was, Pflichtenheft sagt wie.

| Begriff | Kurz |
|---|---|
| Lastenheft | Auftraggeber: WAS soll es können? |
| Pflichtenheft | Auftragnehmer: WIE wird es umgesetzt? |
| funktional | WAS das System tut |
| nicht-funktional | WIE GUT, etwa Upload unter 2 Sekunden |

### 7. User Story und Use Cases

*Leitfrage: Was ist eine User Story?*

Eine User Story hat immer das Muster: Als Rolle möchte ich Ziel, damit Nutzen. Im Anwendungsfalldiagramm sind Akteure Strichmännchen außerhalb. Das System ist ein Rechteck, Anwendungsfälle sind Ovale. Include heißt: wird immer mit ausgeführt. Wer bestellt, muss sich anmelden. Extend heißt: wird nur manchmal, optional ausgeführt. Einen Gutschein löst nicht jeder ein. Bei Use Cases heißt include: wird immer mit ausgeführt, etwa Anmelden. Extend heißt: wird nur manchmal ausgeführt, etwa Passwort zurücksetzen.

**Merk dir:** User Story: Als Rolle möchte ich Ziel, damit Nutzen.

```
User Story:
Als <Rolle> möchte ich <Ziel>,
damit <Nutzen>.

Anwendungsfalldiagramm:
Strichmännchen: Akteur, außerhalb
Rechteck: Systemgrenze
Oval: Anwendungsfall

«include»: wird IMMER mit ausgeführt
  Bestellen ──▷ Anmelden
«extend»: wird nur OPTIONAL ausgeführt
  Gutschein einlösen ──▷ Bestellen
```

## Zusammenfassung

Also: Lastenheft vom Auftraggeber, das Was. Pflichtenheft vom Auftragnehmer, das Wie. Scrum hat Product Owner, Scrum Master und Developers. Ein Sprint dauert höchstens einen Monat.

## Übungsfragen mit Lösung

1. Wer schreibt das Pflichtenheft?
   - Lösung: Auftragnehmer. Pflichtenheft = wie, vom Auftragnehmer.
2. Wer priorisiert in Scrum das Product Backlog?
   - Lösung: Product Owner. Der Product Owner.
3. Wie lange dauert das Daily Scrum?
   - Lösung: 15. Maximal 15 Minuten.
4. "Die Seite lädt in unter 2 Sekunden." Welche Art Anforderung?
   - Lösung: nicht-funktional. Beschreibt Qualität (Performance), nicht Funktion.
5. Im V-Modell gehört zur Phase "Anforderungsdefinition" welcher Test?
   - Lösung: Abnahmetest. Ganz oben im V: Anforderungen ↔ Abnahme.
6. In welchem Scrum-Event spricht das Team über die eigene Zusammenarbeit?
   - Lösung: Retrospektive. Review = Produkt, Retro = Prozess.
7. Anwendungsfall wird nur manchmal zusätzlich ausgeführt. Welche Beziehung?
   - Lösung: «extend». extend = optional.
8. Wann passt Wasserfall besser als Scrum?
   - Lösung: Anforderungen sind fest und klar. Klassisch bei stabilen Anforderungen.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Ein Mandant soll Belege per App hochladen können. Schreibe eine User Story dazu und nenne je eine funktionale und eine nicht-funktionale Anforderung.

```
User Story: Als Mandant möchte ich Belege mit dem Handy fotografieren und hochladen, damit ich sie nicht mehr in die Kanzlei bringen muss.
Funktional: Die App lädt Fotos und PDFs hoch und ordnet sie dem Mandanten zu.
Nicht-funktional: Die Übertragung ist verschlüsselt (TLS) und ein Upload dauert unter 5 Sekunden.
```
