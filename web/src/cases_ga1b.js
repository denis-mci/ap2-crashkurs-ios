// GA1-Prüfungsfälle (Teil 2): Planen eines Softwareproduktes
const CASES_GA1B = [
{
  id: 'ga1_fall3',
  area: 'GA1',
  title: 'Fall 3: Terminbuchung für eine Arztpraxis',
  minutes: 90,
  scenario: 'Die WebWerk Solutions GmbH in Würzburg ist ein Softwarehaus mit 30 Mitarbeitenden, das Webanwendungen für kleine und mittlere Unternehmen entwickelt. Ein neuer Kunde ist die Gemeinschaftspraxis am Ringpark, eine hausärztliche Praxis mit vier Ärztinnen und Ärzten und neun Medizinischen Fachangestellten (MFA). Bisher werden alle Termine telefonisch vergeben, die Telefonleitung ist morgens regelmäßig überlastet. Die Praxis wünscht sich die Webanwendung PraxisTermin, mit der Patientinnen und Patienten online Termine buchen und stornieren können, die Erinnerungen per SMS verschickt und die gebuchten Termine an das vorhandene Praxisverwaltungssystem (PVS) überträgt. Sie sind Auszubildende bzw. Auszubildender zur Fachinformatikerin bzw. zum Fachinformatiker für Anwendungsentwicklung bei WebWerk und arbeiten im Projektteam mit, das nach Kanban arbeitet.',
  material: [
    { title: 'Auszug Anforderungsbeschreibung der Praxis', code: `- Patientinnen und Patienten können ohne Anmeldung nach freien Terminen suchen.
- Patienten können einen Termin buchen und einen gebuchten Termin stornieren.
  Für das Buchen und das Stornieren ist immer eine Anmeldung erforderlich.
- Beim Buchen kann der Patient zusätzlich eine SMS-Erinnerung anfordern.
  Die SMS wird über einen externen SMS-Dienst versendet.
- Jeder gebuchte Termin wird automatisch an das Praxisverwaltungssystem (PVS)
  übertragen.
- MFA buchen und stornieren Termine für Patienten, die anrufen, und pflegen
  die Sprechzeiten der Ärztinnen und Ärzte.
- Ärztinnen und Ärzte sehen ihren Tagesplan ein.` },
    { title: 'Lebenszyklus eines Termins (Gesprächsnotiz)', code: `Wählt jemand einen freien Slot aus, wird der Termin zunächst für 10 Minuten
reserviert. Wird die Buchung innerhalb dieser Zeit bestätigt, ist der Termin
gebucht und das System sendet eine Bestätigungsmail. Läuft die Reservierung
ohne Bestätigung ab, wird der Slot wieder freigegeben und der Termin verworfen.
Ein gebuchter Termin kann vom Patienten nur storniert werden, wenn bis zum
Terminbeginn noch mindestens 24 Stunden verbleiben. Die Praxis kann jederzeit
stornieren. In beiden Fällen wird der Slot freigegeben.
Kommt der Patient in die Praxis, checkt ihn die MFA ein. Ruft die Ärztin den
Patienten auf, beginnt die Behandlung. Mit dem Ende der Behandlung ist der
Termin abgeschlossen. Ist ein Patient 15 Minuten nach Terminbeginn nicht
eingecheckt, gilt er als nicht erschienen.
Stornierte, abgeschlossene und nicht wahrgenommene Termine werden nicht mehr
verändert.` },
    { title: 'Ablauf der Online-Buchung (technische Beschreibung)', code: `1. Der Patient wählt im Web-Frontend einen Slot und klickt auf "Buchen".
2. Das Frontend sendet die Anfrage POST /termine mit slotId und der Angabe,
   ob eine SMS gewünscht ist, an den TerminService (Backend).
3. Der TerminService fragt in der Datenbank ab, ob der Slot noch frei ist.
4. Ist der Slot frei, speichert der TerminService den Termin in der Datenbank
   und erhält die neue terminId zurück. Falls eine SMS gewünscht ist, beauftragt
   er den SMS-Dienst mit dem späteren Versand, ohne auf eine Antwort zu warten.
   Danach antwortet er dem Frontend mit 201 Created, das Frontend zeigt die
   Buchungsbestätigung an.
5. Ist der Slot inzwischen belegt, antwortet der TerminService mit
   409 Conflict, das Frontend zeigt einen Hinweis und Alternativtermine an.` },
    { title: 'Risikoliste des Projekts', table: [
      ['Nr.', 'Risiko', 'Eintrittswahrscheinlichkeit', 'Schadenshöhe'],
      ['R1', 'Die Schnittstelle des PVS ist schlecht dokumentiert, die Anbindung verzögert sich.', '40 %', '12.000 €'],
      ['R2', 'Der Hauptentwickler fällt längere Zeit aus.', '10 %', '15.000 €'],
      ['R3', 'Durch eine Fehlkonfiguration werden Patientendaten öffentlich abrufbar.', '5 %', '50.000 €'],
      ['R4', 'Ältere Patienten nehmen die Online-Buchung nicht an, Telefonlast sinkt kaum.', '30 %', '6.000 €']
    ]},
    { title: 'Kanban-Board des Teams (Stand Dienstagmorgen)', table: [
      ['Backlog', 'In Arbeit (WIP-Limit 3)', 'Review (WIP-Limit 2)', 'Fertig'],
      ['K7 SMS-Erinnerung', 'K4 Slotsuche', 'K2 Sprechzeiten pflegen', 'K1 Projektgerüst'],
      ['K8 Tagesplan drucken', 'K5 Login', 'K3 Bestätigungsmail', ''],
      ['K9 Feiertage pflegen', 'K6 Stornierung (Lena)', '', '']
    ]},
    { title: 'Kostenvergleich Make or Buy', table: [
      ['Position', 'A: Eigenentwicklung durch WebWerk', 'B: SaaS-Lösung TerminCloud'],
      ['Einmalige Kosten', '24.000 € (Entwicklung und Einführung)', '900 € (Einrichtung)'],
      ['Laufende Kosten', '180 € pro Monat (Hosting und Wartung)', '149 € pro Monat je Arzt-Lizenz'],
      ['Benötigte Lizenzen', 'keine', '4 (eine je Ärztin bzw. Arzt)'],
      ['Planungszeitraum', '5 Jahre', '5 Jahre']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Anforderungen und Projektorganisation', points: 25,
      intro: 'Zu Projektbeginn sollen Sie die Anforderungen der Praxis grafisch aufbereiten, die Projektrisiken bewerten und die Arbeit im Team organisieren.',
      sub: [
        {
          id: 'a', points: 4,
          q: 'Die Praxis hat WebWerk eine Anforderungsbeschreibung übergeben. Erläutern Sie den Unterschied zwischen Lastenheft und Pflichtenheft. Gehen Sie dabei darauf ein, wer das Dokument jeweils erstellt und welche Fragen es beantwortet.',
          kind: 'text',
          model: `Lastenheft: wird vom Auftraggeber erstellt, hier von der Gemeinschaftspraxis. Es beschreibt aus Sicht des Kunden, WAS das System leisten soll und WOFÜR (Anforderungen, Rahmenbedingungen, Ziele), ohne die technische Umsetzung festzulegen.

Pflichtenheft: wird vom Auftragnehmer erstellt, hier von WebWerk, und zwar auf Grundlage des Lastenhefts. Es beschreibt, WIE und WOMIT die Anforderungen umgesetzt werden (technische Lösung, Architektur, Schnittstellen, Abnahmekriterien). Nach Freigabe durch den Auftraggeber ist es in der Regel verbindliche Vertragsgrundlage und Basis für die Abnahme.`,
          criteria: [
            { text: 'Lastenheft wird vom Auftraggeber (Praxis) erstellt', points: 1 },
            { text: 'Lastenheft beschreibt, was bzw. wofür (Anforderungen aus Kundensicht)', points: 1 },
            { text: 'Pflichtenheft wird vom Auftragnehmer (WebWerk) auf Basis des Lastenhefts erstellt', points: 1 },
            { text: 'Pflichtenheft beschreibt, wie bzw. womit, und dient als verbindliche Grundlage bzw. Abnahmebasis', points: 1 }
          ]
        },
        {
          id: 'b', points: 9,
          q: 'Zeichnen Sie auf Grundlage der Anforderungsbeschreibung ein UML-Anwendungsfalldiagramm (Use-Case-Diagramm) für PraxisTermin. Stellen Sie die Systemgrenze, alle Akteure (auch externe Systeme), die Anwendungsfälle, die Assoziationen sowie die include- und extend-Beziehungen dar.',
          kind: 'diagram',
          model: `Systemgrenze: Rechteck "PraxisTermin", Anwendungsfälle innen, Akteure außen.

Akteure: Patient, MFA, Arzt (Personen); SMS-Dienst, Praxisverwaltungssystem (externe Systeme, z. B. als Strichmännchen mit «system» oder als Kasten mit «actor»).

Anwendungsfälle: Freie Termine suchen, Termin buchen, Termin stornieren, Anmelden, SMS-Erinnerung anfordern, Sprechzeiten pflegen, Tagesplan einsehen.

Assoziationen:
- Patient: Freie Termine suchen, Termin buchen, Termin stornieren
- MFA: Termin buchen, Termin stornieren, Sprechzeiten pflegen
- Arzt: Tagesplan einsehen
- PVS: Termin buchen (erhält den Termin)
- SMS-Dienst: SMS-Erinnerung anfordern

Beziehungen:
- Termin buchen - - «include» - -> Anmelden (Pfeil zeigt auf Anmelden, weil Anmelden immer Teil des Buchens ist)
- Termin stornieren - - «include» - -> Anmelden
- SMS-Erinnerung anfordern - - «extend» - -> Termin buchen (Pfeil zeigt auf den erweiterten Basisfall, weil die SMS nur optional dazukommt)`,
          diagram: `flowchart LR
  P["Patient"]
  M["MFA"]
  A["Arzt"]
  subgraph SYS["System PraxisTermin"]
    UC1(["Freie Termine suchen"])
    UC2(["Termin buchen"])
    UC3(["Termin stornieren"])
    UC4(["Anmelden"])
    UC5(["SMS-Erinnerung anfordern"])
    UC6(["Sprechzeiten pflegen"])
    UC7(["Tagesplan einsehen"])
  end
  SMS["SMS-Dienst"]
  PVS["Praxisverwaltungssystem"]
  P ~~~ M
  M ~~~ A
  P --- UC1
  P --- UC2
  P --- UC3
  M --- UC2
  M --- UC3
  M --- UC6
  A --- UC7
  UC2 -.->|"«include»"| UC4
  UC3 -.->|"«include»"| UC4
  UC5 -.->|"«extend»"| UC2
  UC5 --- SMS
  UC2 --- PVS`,
          criteria: [
            { text: 'Systemgrenze mit Namen gezeichnet, Anwendungsfälle innerhalb, Akteure außerhalb', points: 1 },
            { text: 'Akteure Patient, MFA und Arzt vorhanden', points: 1 },
            { text: 'SMS-Dienst und PVS als externe Akteure dargestellt', points: 1 },
            { text: 'Anwendungsfälle Freie Termine suchen, Termin buchen und Termin stornieren vorhanden', points: 1 },
            { text: 'Anwendungsfälle Sprechzeiten pflegen und Tagesplan einsehen vorhanden', points: 1 },
            { text: 'Assoziationen von Patient und MFA vollständig und richtig', points: 1 },
            { text: 'Assoziationen Arzt zu Tagesplan, PVS zu Termin buchen und SMS-Dienst zu SMS-Erinnerung vorhanden', points: 1 },
            { text: 'Termin buchen und Termin stornieren jeweils mit «include» auf Anmelden, Pfeil zeigt auf Anmelden', points: 1 },
            { text: 'SMS-Erinnerung mit «extend» an Termin buchen, Pfeil zeigt auf Termin buchen', points: 1 }
          ]
        },
        {
          id: 'c', points: 7,
          q: 'Führen Sie mit der Risikoliste aus dem Material eine quantitative Risikobewertung durch. a) Berechnen Sie für jedes Risiko den Risikowert und bringen Sie die Risiken in eine Rangfolge. b) Berechnen Sie die Summe der Risikowerte und erläutern Sie, wofür diese Summe in der Projektkalkulation verwendet werden kann. c) Schlagen Sie für die beiden Risiken mit dem höchsten Risikowert je eine geeignete Gegenmaßnahme vor.',
          kind: 'text',
          model: `a) Risikowert = Eintrittswahrscheinlichkeit × Schadenshöhe
R1: 0,40 × 12.000 € = 4.800 €
R2: 0,10 × 15.000 € = 1.500 €
R3: 0,05 × 50.000 € = 2.500 €
R4: 0,30 ×  6.000 € = 1.800 €
Rangfolge: R1 (4.800 €) vor R3 (2.500 €) vor R4 (1.800 €) vor R2 (1.500 €)

b) Summe: 4.800 + 1.500 + 2.500 + 1.800 = 10.600 €
Die Summe ist der statistisch erwartete Schaden und kann als Risikozuschlag bzw. Risikopuffer (Budgetreserve) in die Projektkalkulation bzw. das Angebot einfließen.

c)
R1 (PVS-Schnittstelle): früh einen technischen Prototyp bzw. Durchstich zur PVS-Schnittstelle bauen, Ansprechpartner beim PVS-Hersteller vertraglich sichern, Zeitpuffer einplanen.
R3 (Datenleck): Sicherheitskonzept mit Konfigurationsreview nach Vier-Augen-Prinzip, automatisierte Sicherheitstests bzw. Penetrationstest vor dem Go-live, Infrastruktur als Code mit geprüften Vorlagen.`,
          criteria: [
            { text: 'Risikowerte R1 = 4.800 € und R2 = 1.500 € korrekt', points: 1 },
            { text: 'Risikowerte R3 = 2.500 € und R4 = 1.800 € korrekt', points: 1 },
            { text: 'Rangfolge R1, R3, R4, R2', points: 1 },
            { text: 'Summe 10.600 € korrekt', points: 1 },
            { text: 'Verwendung als Risikozuschlag bzw. Risikopuffer in der Kalkulation erläutert', points: 1 },
            { text: 'Geeignete Gegenmaßnahme für R1 (PVS-Schnittstelle)', points: 1 },
            { text: 'Geeignete Gegenmaßnahme für R3 (Datenleck)', points: 1 }
          ]
        },
        {
          id: 'd', points: 5,
          q: 'Betrachten Sie das Kanban-Board im Material. Ihre Kollegin Lena hat die Karte K6 fertig programmiert. Sie möchte K6 in die Spalte Review schieben und danach mit K7 beginnen. a) Erläutern Sie die Begriffe WIP-Limit und Pull-Prinzip. b) Beschreiben Sie, wie sich Lena nach den Kanban-Regeln verhalten sollte. c) Nennen Sie einen Unterschied zwischen Kanban und Scrum.',
          kind: 'text',
          model: `a) WIP-Limit (Work in Progress): maximale Anzahl Karten, die sich gleichzeitig in einer Spalte befinden dürfen. Es verhindert, dass zu viel parallel angefangen wird, und macht Engpässe sichtbar.
Pull-Prinzip: Eine Karte wird nur dann in die nächste Spalte gezogen, wenn dort Kapazität frei ist (das WIP-Limit nicht erreicht ist). Arbeit wird geholt, nicht zugeschoben.

b) Die Spalte Review ist mit K2 und K3 bereits voll (2 von 2). Lena darf K6 deshalb nicht in Review schieben. Sie darf auch K7 nicht beginnen, denn K6 bleibt in Arbeit und mit K7 wären es 4 Karten bei einem WIP-Limit von 3. Stattdessen sollte sie beim Review von K2 oder K3 helfen ("Stop starting, start finishing"). Sobald eine Karte nach Fertig gezogen ist, zieht sie K6 in Review und kann danach K7 aus dem Backlog ziehen.

c) Zum Beispiel: Kanban hat keine festen Sprints bzw. Iterationen, sondern einen kontinuierlichen Fluss. Kanban schreibt keine festen Rollen wie Scrum Master oder Product Owner vor. Scrum begrenzt die Arbeit über den Sprintumfang, Kanban über WIP-Limits je Spalte.`,
          criteria: [
            { text: 'WIP-Limit als maximale Anzahl Karten je Spalte erläutert', points: 1 },
            { text: 'Pull-Prinzip erläutert: Karte wird nur bei freier Kapazität in die nächste Spalte gezogen', points: 1 },
            { text: 'Erkannt: K6 darf nicht in Review (voll) und K7 darf nicht begonnen werden (WIP-Limit 3)', points: 1 },
            { text: 'Lena unterstützt beim Review von K2 oder K3, um den Engpass aufzulösen', points: 1 },
            { text: 'Ein zutreffender Unterschied zwischen Kanban und Scrum genannt', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: Verhalten modellieren', points: 25,
      intro: 'Für die Entwicklung sollen der Lebenszyklus eines Termins und der technische Ablauf der Online-Buchung mit UML-Verhaltensdiagrammen modelliert werden.',
      sub: [
        {
          id: 'a', points: 9,
          q: 'Zeichnen Sie auf Grundlage der Gesprächsnotiz "Lebenszyklus eines Termins" ein UML-Zustandsdiagramm für ein Objekt der Klasse Termin. Beschriften Sie die Transitionen mit Ereignis, Bedingung [Guard] und Aktion, soweit sie sich aus dem Text ergeben.',
          kind: 'diagram',
          model: `Startzustand → Reserviert : Slot auswählen

Reserviert → Gebucht : bestätigen / Bestätigungsmail senden
Reserviert → Endzustand : nach 10 min [nicht bestätigt] / Slot freigeben

Gebucht → Storniert : stornieren durch Patient [Restzeit bis Beginn >= 24 h] / Slot freigeben
Gebucht → Storniert : stornieren durch Praxis / Slot freigeben
Gebucht → Eingecheckt : einchecken (durch MFA)
Gebucht → Nicht erschienen : 15 min nach Beginn [nicht eingecheckt]

Eingecheckt → In Behandlung : aufrufen
In Behandlung → Abgeschlossen : Behandlung beenden

Storniert → Endzustand
Nicht erschienen → Endzustand
Abgeschlossen → Endzustand

Hinweis: Statt eines Endzustands nach Ablauf der Reservierung ist auch ein eigener Zustand "Verworfen" mit anschließendem Endzustand richtig.`,
          diagram: `stateDiagram-v2
  state "In Behandlung" as InBehandlung
  state "Nicht erschienen" as NichtErschienen
  [*] --> Reserviert : Slot auswählen
  Reserviert --> Gebucht : bestätigen / Bestätigungsmail senden
  Reserviert --> [*] : nach 10 min [nicht bestätigt] / Slot freigeben
  Gebucht --> Storniert : stornieren durch Patient [Restzeit >= 24 h] / Slot freigeben
  Gebucht --> Storniert : stornieren durch Praxis / Slot freigeben
  Gebucht --> Eingecheckt : einchecken
  Gebucht --> NichtErschienen : 15 min nach Beginn [nicht eingecheckt]
  Eingecheckt --> InBehandlung : aufrufen
  InBehandlung --> Abgeschlossen : Behandlung beenden
  Storniert --> [*]
  NichtErschienen --> [*]
  Abgeschlossen --> [*]`,
          criteria: [
            { text: 'Startzustand führt in den Zustand Reserviert', points: 1 },
            { text: 'Reserviert nach Gebucht mit Ereignis bestätigen und Aktion Bestätigungsmail senden', points: 1 },
            { text: 'Ablauf nach 10 Minuten ohne Bestätigung führt zum Ende bzw. Verworfen, mit Aktion Slot freigeben', points: 1 },
            { text: 'Stornierung durch Patient mit Guard mindestens 24 Stunden vor Beginn', points: 1 },
            { text: 'Stornierung durch Praxis ohne Bedingung als eigene Transition', points: 1 },
            { text: 'Kette Gebucht, Eingecheckt, In Behandlung, Abgeschlossen mit passenden Ereignissen', points: 2 },
            { text: 'Nicht erschienen nach 15 Minuten mit Bedingung nicht eingecheckt', points: 1 },
            { text: 'Storniert, Nicht erschienen und Abgeschlossen führen in einen Endzustand', points: 1 }
          ]
        },
        {
          id: 'b', points: 10,
          q: 'Zeichnen Sie auf Grundlage der technischen Beschreibung im Material ein UML-Sequenzdiagramm für die Online-Buchung eines Termins. Verwenden Sie die Lebenslinien Patient, Web-Frontend, TerminService, Datenbank und SMS-Dienst. Stellen Sie synchrone und asynchrone Nachrichten, Antworten sowie die passenden kombinierten Fragmente dar.',
          kind: 'diagram',
          model: `Lebenslinien: Patient, Web-Frontend, TerminService, Datenbank, SMS-Dienst

Patient → Web-Frontend: Slot wählen, Buchen klicken (synchron)
Web-Frontend → TerminService: POST /termine (slotId, smsGewuenscht) (synchron)
TerminService → Datenbank: slotFrei(slotId)
Datenbank - - > TerminService: true bzw. false (Antwort, gestrichelt)

alt [Slot frei]
  TerminService → Datenbank: speichern(termin)
  Datenbank - - > TerminService: terminId
  opt [SMS gewünscht]
    TerminService → SMS-Dienst: smsPlanen(nummer, text, zeitpunkt)  (asynchron, offene Pfeilspitze, keine Antwort)
  end
  TerminService - - > Web-Frontend: 201 Created (Termin)
  Web-Frontend - - > Patient: Buchungsbestätigung anzeigen
else [Slot belegt]
  TerminService - - > Web-Frontend: 409 Conflict
  Web-Frontend - - > Patient: Hinweis und Alternativtermine anzeigen
end`,
          diagram: `sequenceDiagram
  actor P as Patient
  participant F as Web-Frontend
  participant T as TerminService
  participant D as Datenbank
  participant S as SMS-Dienst
  P->>F: Slot wählen, Buchen klicken
  F->>T: POST /termine (slotId, smsGewuenscht)
  T->>D: slotFrei(slotId)
  D-->>T: true bzw. false
  alt Slot frei
    T->>D: speichern(termin)
    D-->>T: terminId
    opt SMS gewünscht
      T-)S: smsPlanen(nummer, text, zeitpunkt)
    end
    T-->>F: 201 Created (Termin)
    F-->>P: Buchungsbestätigung anzeigen
  else Slot belegt
    T-->>F: 409 Conflict
    F-->>P: Hinweis und Alternativtermine anzeigen
  end`,
          criteria: [
            { text: 'Fünf Lebenslinien in sinnvoller Reihenfolge mit Kopf und gestrichelter Linie', points: 1 },
            { text: 'Ablauf beginnt beim Patienten und läuft über das Frontend zum TerminService', points: 1 },
            { text: 'POST /termine als synchrone Nachricht (gefüllte Pfeilspitze) an den TerminService', points: 1 },
            { text: 'Abfrage slotFrei an die Datenbank mit gestrichelter Antwort', points: 1 },
            { text: 'alt-Fragment mit zwei Bereichen und Guards [Slot frei] und [Slot belegt]', points: 2 },
            { text: 'Im Zweig frei: Termin speichern, terminId als Antwort', points: 1 },
            { text: 'opt-Fragment [SMS gewünscht] um den SMS-Auftrag', points: 1 },
            { text: 'SMS-Auftrag als asynchrone Nachricht (offene Pfeilspitze, ohne Antwort)', points: 1 },
            { text: 'Antworten 201 bzw. 409 an das Frontend und passende Anzeige für den Patienten', points: 1 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'a) Erläutern Sie den Unterschied zwischen einer synchronen und einer asynchronen Nachricht im Sequenzdiagramm und begründen Sie, warum der Auftrag an den SMS-Dienst asynchron modelliert wird. b) Erläutern Sie die kombinierten Fragmente alt, opt und loop. Nennen Sie für loop ein Beispiel aus PraxisTermin.',
          kind: 'text',
          model: `a) Synchron: Der Sender wartet nach dem Aufruf, bis der Empfänger die Verarbeitung beendet und geantwortet hat (gefüllte Pfeilspitze, gestrichelte Antwort). Asynchron: Der Sender schickt die Nachricht und arbeitet sofort weiter, ohne auf eine Antwort zu warten (offene Pfeilspitze).
Der SMS-Versand ist ein externer Dienst, der langsam oder kurzzeitig nicht erreichbar sein kann. Die Buchung soll davon nicht blockiert werden. Der Patient erhält seine Bestätigung sofort, die SMS wird später verschickt.

b)
alt: Alternative, mehrere durch Guards getrennte Bereiche, von denen genau einer ausgeführt wird (wie falls ... sonst).
opt: Option, ein Bereich, der nur ausgeführt wird, wenn der Guard zutrifft (falls ohne sonst).
loop: Schleife, der Bereich wird wiederholt, solange die Bedingung gilt bzw. für jedes Element. Beispiel: Der Erinnerungsdienst durchläuft jeden Abend alle Termine des Folgetags und beauftragt für jeden Termin mit SMS-Wunsch den SMS-Dienst.`,
          criteria: [
            { text: 'Synchron: Sender wartet auf die Antwort', points: 1 },
            { text: 'Asynchron: Sender arbeitet ohne zu warten weiter', points: 1 },
            { text: 'Begründung: Buchung soll nicht vom externen, evtl. langsamen SMS-Dienst blockiert werden', points: 1 },
            { text: 'alt als Auswahl genau eines von mehreren Bereichen erläutert', points: 1 },
            { text: 'opt als optionaler Bereich (nur wenn Guard zutrifft) erläutert', points: 1 },
            { text: 'loop als Wiederholung erläutert, mit passendem Beispiel aus PraxisTermin', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: Datenschutz, Anmeldung und Zertifikate', points: 25,
      intro: 'In einer Arztpraxis werden besonders sensible Daten verarbeitet. Sie sollen das Sicherheitskonzept für PraxisTermin mit ausarbeiten. Das Praxispersonal nutzt bereits einen zentralen Identitätsanbieter für E-Mail und Office-Anwendungen.',
      sub: [
        {
          id: 'a', points: 5,
          q: 'Beim Buchen kann der Patient den Grund des Besuchs angeben (z. B. "Nachkontrolle Blutdruck"). Begründen Sie, in welche Datenkategorie nach DSGVO diese Daten fallen und welche Folge das grundsätzlich für ihre Verarbeitung hat. Nennen Sie drei konkrete Konsequenzen für die Entwicklung und den Betrieb von PraxisTermin.',
          kind: 'text',
          model: `Der Besuchsgrund lässt Rückschlüsse auf den Gesundheitszustand zu. Es handelt sich um Gesundheitsdaten und damit um besondere Kategorien personenbezogener Daten nach Art. 9 DSGVO. Ihre Verarbeitung ist grundsätzlich verboten, außer es greift eine Ausnahme, z. B. Verarbeitung für die Gesundheitsversorgung bzw. Behandlung (Art. 9 Abs. 2 lit. h) oder eine ausdrückliche Einwilligung des Patienten (Art. 9 Abs. 2 lit. a).

Konsequenzen (drei genügen):
- Datenschutz-Folgenabschätzung (Art. 35 DSGVO) prüfen und bei voraussichtlich hohem Risiko (Gesundheitsdaten, neue Online-Verarbeitung, externer SMS-Dienst) durchführen.
- Datenminimierung: Besuchsgrund nur optional und als Auswahlliste statt Freitext, in der SMS keine Gesundheitsangaben, sondern nur Datum und Uhrzeit.
- Verschlüsselung bei der Übertragung (TLS) und bei der Speicherung, strenges Rollen- und Berechtigungskonzept, Protokollierung der Zugriffe.
- Auftragsverarbeitungsverträge mit Hoster und SMS-Dienst, Hosting in der EU bzw. in Deutschland.
- Löschkonzept mit festen Fristen für alte Termine.`,
          criteria: [
            { text: 'Einordnung als Gesundheitsdaten bzw. besondere Kategorie nach Art. 9 DSGVO', points: 1 },
            { text: 'Verarbeitung grundsätzlich verboten, nur mit Ausnahme (z. B. Behandlung oder ausdrückliche Einwilligung)', points: 1 },
            { text: 'Erste passende Konsequenz (z. B. Datenschutz-Folgenabschätzung)', points: 1 },
            { text: 'Zweite passende Konsequenz (z. B. Datenminimierung, keine Gesundheitsdaten in der SMS)', points: 1 },
            { text: 'Dritte passende Konsequenz (z. B. Verschlüsselung, Berechtigungskonzept, AV-Vertrag)', points: 1 }
          ]
        },
        {
          id: 'b', points: 8,
          q: 'Die MFA und die Ärztinnen und Ärzte sollen sich per Single Sign-on (SSO) über den vorhandenen Identitätsanbieter anmelden. Technisch werden dafür OAuth 2.0 und OpenID Connect eingesetzt. a) Erläutern Sie SSO und nennen Sie zwei Vorteile für die Praxis. b) Erläutern Sie den Unterschied zwischen OAuth 2.0 und OpenID Connect. c) Ordnen Sie die vier Rollen von OAuth 2.0 den Beteiligten in diesem Szenario zu.',
          kind: 'text',
          model: `a) Single Sign-on: Der Benutzer authentifiziert sich einmal bei einem zentralen Identitätsanbieter und kann danach mehrere angebundene Anwendungen nutzen, ohne sich erneut anzumelden.
Vorteile: nur ein Passwort für die Mitarbeitenden, dadurch weniger Passwortzettel und schwache Passwörter; zentrale Benutzerverwaltung, z. B. wird beim Austritt einer MFA ein einziges Konto gesperrt; Mehrfaktor-Authentifizierung zentral erzwingbar; PraxisTermin speichert keine Passwörter des Personals.

b) OAuth 2.0 ist ein Protokoll zur Autorisierung: Eine Anwendung erhält ein Zugriffstoken (Access Token), mit dem sie im Namen des Benutzers auf Ressourcen zugreifen darf. Wer der Benutzer ist, regelt OAuth nicht. OpenID Connect ist eine Erweiterung auf Basis von OAuth 2.0 für die Authentifizierung: Zusätzlich wird ein ID-Token (JWT) mit Angaben zur Identität des Benutzers ausgestellt.

c)
Resource Owner: die MFA bzw. Ärztin, der die Daten bzw. das Konto gehören und die den Zugriff erlaubt
Client: die Anwendung PraxisTermin (Web-Frontend), die im Namen des Benutzers zugreifen will
Authorization Server: der zentrale Identitätsanbieter der Praxis, der den Benutzer anmeldet und Tokens ausstellt
Resource Server: die geschützte API, hier der TerminService (oder z. B. die Kalender-Schnittstelle des Identitätsanbieters), der das Token prüft und Daten liefert`,
          criteria: [
            { text: 'SSO erläutert: einmalige Anmeldung für mehrere Anwendungen über zentralen Anbieter', points: 1 },
            { text: 'Zwei passende Vorteile für die Praxis genannt (je 1 Punkt)', points: 2 },
            { text: 'OAuth 2.0 als Autorisierung mit Access Token erläutert', points: 1 },
            { text: 'OpenID Connect als Authentifizierungsschicht auf OAuth mit ID-Token erläutert', points: 1 },
            { text: 'Resource Owner (Mitarbeitende) und Client (PraxisTermin) richtig zugeordnet', points: 1 },
            { text: 'Authorization Server (Identitätsanbieter) richtig zugeordnet', points: 1 },
            { text: 'Resource Server (TerminService bzw. geschützte API) richtig zugeordnet', points: 1 }
          ]
        },
        {
          id: 'c', points: 8,
          q: 'PraxisTermin wird ausschließlich über HTTPS erreichbar sein. a) Nennen Sie drei Angaben, die ein X.509-Serverzertifikat enthält. b) Beschreiben Sie, welche Prüfungen der Browser eines Patienten beim Verbindungsaufbau mit dem Zertifikat durchführt. c) Ein Kollege schlägt vor, Kosten zu sparen und ein selbst signiertes Zertifikat zu verwenden. Nehmen Sie Stellung.',
          kind: 'text',
          model: `a) Drei der folgenden: Domainname bzw. Inhaber (Subject, z. B. termine.praxis-ringpark.de), öffentlicher Schlüssel des Servers, Aussteller (Zertifizierungsstelle, CA), Gültigkeitszeitraum (gültig von, gültig bis), Seriennummer, digitale Signatur der CA, Verwendungszweck.

b) Der Browser prüft,
- ob die Zertifikatskette bis zu einem vertrauenswürdigen Stammzertifikat (Root-CA) führt, das in seinem Zertifikatsspeicher hinterlegt ist (Chain of Trust, ggf. über Zwischenzertifikate),
- ob die Signatur des Zertifikats mit dem öffentlichen Schlüssel der ausstellenden CA gültig ist, das Zertifikat also nicht verändert wurde,
- ob das aktuelle Datum im Gültigkeitszeitraum liegt,
- ob der Domainname im Zertifikat mit der aufgerufenen Adresse übereinstimmt,
- ggf. ob das Zertifikat widerrufen wurde (OCSP bzw. Sperrliste).

c) Nicht geeignet. Ein selbst signiertes Zertifikat ist von keiner CA bestätigt, die Browser der Patienten vertrauen ihm nicht und zeigen eine Sicherheitswarnung. Patienten werden verunsichert oder gewöhnen sich an das Wegklicken von Warnungen, wodurch Man-in-the-Middle-Angriffe mit gefälschten Zertifikaten nicht mehr auffallen. Für eine öffentliche Anwendung sollte ein Zertifikat einer anerkannten CA verwendet werden. Kostenlose Zertifikate gibt es z. B. über Let's Encrypt, das Kostenargument entfällt also.`,
          criteria: [
            { text: 'Drei zutreffende Angaben eines Zertifikats genannt (mindestens zwei: 1 Punkt)', points: 2 },
            { text: 'Prüfung der Zertifikatskette bis zu einer vertrauenswürdigen Root-CA', points: 1 },
            { text: 'Prüfung der Signatur mit dem öffentlichen Schlüssel der CA', points: 1 },
            { text: 'Prüfung des Gültigkeitszeitraums', points: 1 },
            { text: 'Prüfung, dass der Domainname zur aufgerufenen Adresse passt', points: 1 },
            { text: 'Ablehnung begründet: kein Vertrauen, Browserwarnung, Gefahr durch Wegklicken bzw. Man-in-the-Middle', points: 1 },
            { text: 'Alternative genannt: Zertifikat einer anerkannten CA, z. B. kostenlos über Let\'s Encrypt', points: 1 }
          ]
        },
        {
          id: 'd', points: 4,
          q: 'Die Praxis möchte auf der Buchungsseite einen KI-Chatbot einsetzen, der Fragen von Patienten beantwortet und dafür ein Sprachmodell eines Cloud-Anbieters nutzt. Nennen Sie zwei datenschutzrechtliche Risiken dieses Vorhabens und je eine Maßnahme, mit der das Risiko verringert werden kann.',
          kind: 'text',
          model: `Zwei der folgenden Risiken mit Maßnahme:
- Patienten geben im Chat Gesundheitsdaten ein, die an den Cloud-Anbieter übertragen werden. Maßnahme: deutlicher Hinweis, keine Gesundheitsdaten einzugeben, automatische Erkennung und Schwärzung personenbezogener Daten vor der Übertragung, Chatbot nur für allgemeine Fragen (Öffnungszeiten, Ablauf).
- Datenübermittlung in ein Drittland (z. B. USA) ohne angemessenes Schutzniveau. Maßnahme: Anbieter mit Verarbeitung in der EU wählen bzw. Angemessenheitsbeschluss oder Standardvertragsklauseln prüfen, Auftragsverarbeitungsvertrag schließen.
- Der Anbieter verwendet die Eingaben zum Training seiner Modelle. Maßnahme: vertraglich ausschließen (Opt-out bzw. Business-Tarif ohne Training), kurze Speicherfristen vereinbaren.
- Falsche oder halluzinierte medizinische Auskünfte. Maßnahme: keine Diagnosen bzw. Empfehlungen zulassen, bei medizinischen Fragen an die Praxis verweisen, Transparenzhinweis, dass ein KI-System antwortet (KI-Verordnung).`,
          criteria: [
            { text: 'Erstes zutreffendes Datenschutzrisiko genannt', points: 1 },
            { text: 'Passende Maßnahme zum ersten Risiko', points: 1 },
            { text: 'Zweites zutreffendes Datenschutzrisiko genannt', points: 1 },
            { text: 'Passende Maßnahme zum zweiten Risiko', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Make or Buy und Servicevertrag', points: 25,
      intro: 'Die Praxis fragt, ob sich die Eigenentwicklung gegenüber einer fertigen SaaS-Lösung lohnt. Sie bereiten den Kostenvergleich vor und werten den englischen Servicevertrag des SaaS-Anbieters aus.',
      sub: [
        {
          id: 'a', points: 9,
          q: 'a) Berechnen Sie mit den Daten aus dem Material die Gesamtkosten beider Alternativen für 3 Jahre und für 5 Jahre. b) Ermitteln Sie, ab welchem Monat die Eigenentwicklung günstiger ist als die SaaS-Lösung (kritischer Zeitpunkt). c) Geben Sie auf Basis der Kosten eine Empfehlung für den Planungszeitraum von 5 Jahren ab. Der Rechenweg muss nachvollziehbar sein.',
          kind: 'text',
          model: `Laufende Kosten B: 4 Lizenzen × 149 € = 596 € pro Monat

a)
A, 3 Jahre: 24.000 € + 36 × 180 € = 24.000 € + 6.480 € = 30.480 €
B, 3 Jahre:    900 € + 36 × 596 € =    900 € + 21.456 € = 22.356 €
A, 5 Jahre: 24.000 € + 60 × 180 € = 24.000 € + 10.800 € = 34.800 €
B, 5 Jahre:    900 € + 60 × 596 € =    900 € + 35.760 € = 36.660 €

b) Ansatz: 24.000 + 180 × m = 900 + 596 × m
Differenz der einmaligen Kosten: 24.000 € − 900 € = 23.100 €
Differenz der monatlichen Kosten: 596 € − 180 € = 416 €
m = 23.100 € / 416 € pro Monat ≈ 55,5 Monate
Ab dem 56. Monat (nach rund 4 Jahren und 8 Monaten) ist die Eigenentwicklung günstiger.
Probe: Monat 55: A 33.900 €, B 33.680 € (B günstiger); Monat 56: A 34.080 €, B 34.276 € (A günstiger).

c) Über 5 Jahre ist A um 36.660 € − 34.800 € = 1.860 € günstiger, nach den reinen Kosten wäre A zu empfehlen. Der Vorteil ist allerdings sehr knapp und entsteht erst kurz vor Ende des Planungszeitraums. Bei einer kürzeren Nutzungsdauer ist B günstiger. Die Entscheidung sollte deshalb zusätzlich qualitative Kriterien berücksichtigen.`,
          criteria: [
            { text: 'Gesamtkosten A für 3 Jahre: 30.480 €', points: 1 },
            { text: 'Gesamtkosten B für 3 Jahre: 22.356 € (mit 596 € pro Monat)', points: 1 },
            { text: 'Gesamtkosten A für 5 Jahre: 34.800 €', points: 1 },
            { text: 'Gesamtkosten B für 5 Jahre: 36.660 €', points: 1 },
            { text: 'Differenzen 23.100 € einmalig und 416 € monatlich gebildet bzw. Gleichung aufgestellt', points: 1 },
            { text: 'Kritischer Zeitpunkt rund 55,5 Monate, A günstiger ab dem 56. Monat', points: 2 },
            { text: 'Empfehlung A mit Hinweis auf den knappen Vorteil von 1.860 €', points: 1 },
            { text: 'Rechenweg nachvollziehbar mit Einheiten', points: 1 }
          ]
        },
        {
          id: 'b', points: 3,
          q: 'Nennen Sie je einen nicht monetären Vorteil der Eigenentwicklung und der SaaS-Lösung. Erläutern Sie außerdem, warum das Ergebnis der Kostenrechnung aus Teilaufgabe a) mit Vorsicht zu betrachten ist.',
          kind: 'text',
          model: `Vorteil A (Eigenentwicklung): genau auf die Abläufe der Praxis zugeschnitten, z. B. passgenaue PVS-Schnittstelle; keine Abhängigkeit von einem Anbieter (kein Vendor-Lock-in); volle Kontrolle über Datenhaltung und Weiterentwicklung.
Vorteil B (SaaS): sofort einsetzbar, kein Entwicklungsrisiko, Updates und Betrieb übernimmt der Anbieter, bereits erprobt bei anderen Praxen.
Vorsicht: Der Kostenvorteil von A beträgt nur 1.860 € bzw. rund 5 % der Gesamtkosten. Bereits eine Überschreitung der Entwicklungskosten um mehr als 7,75 % (1.860 € von 24.000 €) oder eine kürzere Nutzungsdauer kehrt das Ergebnis um. Außerdem sind Preisänderungen des SaaS-Anbieters oder eine weitere Arzt-Lizenz nicht berücksichtigt.`,
          criteria: [
            { text: 'Zutreffender nicht monetärer Vorteil der Eigenentwicklung', points: 1 },
            { text: 'Zutreffender nicht monetärer Vorteil der SaaS-Lösung', points: 1 },
            { text: 'Begründet, warum das Ergebnis unsicher ist (knapper Vorteil, Schätzrisiko, Annahmen)', points: 1 }
          ]
        },
        {
          id: 'c', points: 8,
          q: 'Für die SaaS-Lösung liegt der folgende Auszug aus dem Service Level Agreement (SLA) vor. Beantworten Sie die Fragen auf Deutsch: 1. Welche Verfügbarkeit wird zugesagt und was wird dabei nicht mitgerechnet? 2. Welche Reaktionszeiten gelten bei Störungen? 3. Wo werden die Daten gespeichert und welcher Nachweis wird genannt? 4. Was geschieht mit den Daten nach einer Kündigung?',
          material: { code: `TerminCloud Service Level Agreement (excerpt)

1. Availability. We guarantee an availability of 99.5 % per calendar month.
Scheduled maintenance is not counted as downtime if it is announced at
least five days in advance. Maintenance usually takes place on Sundays
between 1 a.m. and 5 a.m.

2. Support. Critical incidents, which prevent all users from booking
appointments, are answered within one hour, 24 hours a day, 7 days a week.
All other requests are answered within one business day.

3. Service credits. If the availability falls below the guaranteed level,
the customer receives a credit of 10 % of the monthly fee for each full or
partial 0.5 percentage points below the guaranteed level, up to a maximum
of 50 % of the monthly fee.

4. Data location. All customer data is stored exclusively in data centres
located in Frankfurt am Main, Germany. The data centres are certified
according to ISO/IEC 27001.

5. Termination. Either party may terminate the contract with three months'
notice to the end of a month. After termination, the customer can export
all data in CSV or JSON format for 30 days. After this period, all data
will be deleted permanently.` },
          kind: 'text',
          model: `1. Zugesagt werden 99,5 % Verfügbarkeit pro Kalendermonat. Geplante Wartungen zählen nicht als Ausfallzeit, wenn sie mindestens fünf Tage vorher angekündigt werden (üblich sonntags zwischen 1 und 5 Uhr).
2. Kritische Störungen, bei denen kein Benutzer mehr Termine buchen kann, werden rund um die Uhr an 7 Tagen pro Woche innerhalb einer Stunde beantwortet. Alle anderen Anfragen innerhalb eines Werktags.
3. Die Daten werden ausschließlich in Rechenzentren in Frankfurt am Main (Deutschland) gespeichert. Die Rechenzentren sind nach ISO/IEC 27001 zertifiziert.
4. Nach einer Kündigung (Frist drei Monate zum Monatsende) kann die Praxis 30 Tage lang alle Daten als CSV oder JSON exportieren. Danach werden die Daten endgültig gelöscht.`,
          criteria: [
            { text: '99,5 % pro Kalendermonat, angekündigte Wartung (mindestens 5 Tage vorher) zählt nicht', points: 2 },
            { text: 'Kritische Störungen innerhalb 1 Stunde rund um die Uhr, sonstige innerhalb eines Werktags', points: 2 },
            { text: 'Speicherung nur in Frankfurt bzw. Deutschland, Nachweis ISO/IEC 27001', points: 2 },
            { text: 'Export 30 Tage als CSV oder JSON möglich, danach endgültige Löschung', points: 2 }
          ]
        },
        {
          id: 'd', points: 5,
          q: 'Im November (30 Tage) war TerminCloud insgesamt 7 Stunden nicht erreichbar. Davon war 1 Stunde eine fristgerecht angekündigte Wartung. a) Berechnen Sie die nach dem SLA zulässige Ausfallzeit pro Monat in Stunden und Minuten. b) Berechnen Sie die tatsächlich erreichte Verfügbarkeit im Sinne des SLA. c) Ermitteln Sie die Gutschrift, die der Praxis zusteht (monatliche Gebühr 596 €).',
          kind: 'text',
          model: `a) Stunden im November: 30 × 24 h = 720 h
Zulässige Ausfallzeit: 0,5 % von 720 h = 0,005 × 720 h = 3,6 h = 3 h 36 min

b) Angekündigte Wartung zählt nicht: 7 h − 1 h = 6 h Ausfallzeit
Verfügbarkeit = (720 h − 6 h) / 720 h = 714 / 720 ≈ 99,17 %

c) Unterschreitung: 99,5 % − 99,17 % ≈ 0,33 Prozentpunkte. Das ist ein angefangener Schritt von 0,5 Prozentpunkten, also 10 % Gutschrift.
Gutschrift: 10 % × 596 € = 59,60 €`,
          criteria: [
            { text: 'Zulässige Ausfallzeit 3,6 h bzw. 3 h 36 min', points: 1 },
            { text: 'Wartungsstunde abgezogen: 6 h anrechenbare Ausfallzeit', points: 1 },
            { text: 'Erreichte Verfügbarkeit rund 99,17 %', points: 1 },
            { text: 'Unterschreitung von rund 0,33 Prozentpunkten als ein angefangener 0,5-Schritt erkannt', points: 1 },
            { text: 'Gutschrift 59,60 €', points: 1 }
          ]
        }
      ]
    }
  ]
},
{
  id: 'ga1_fall4',
  area: 'GA1',
  title: 'Fall 4: Lagerverwaltung eines Großhändlers',
  minutes: 90,
  scenario: 'Die Kessler Haustechnik GmbH in Bamberg ist ein Großhändler für Sanitär- und Heizungsbedarf mit 140 Mitarbeitenden, einem Hauptlager und zwei Außenlagern sowie rund 18.000 Artikeln. Die Bestände werden bisher in Excel-Listen geführt, Lieferscheine und Bestellungen liegen ausgedruckt in Ordnern. Immer wieder fallen Fehlbestände erst auf, wenn ein Kunde bestellt. Die Geschäftsführung hat deshalb beschlossen, die webbasierte Lagerverwaltung LagerPro von der internen Softwareentwicklung (fünf Personen) entwickeln zu lassen. Die Lagermitarbeitenden sollen mit mobilen Handscannern arbeiten, LagerPro soll Bestände in Echtzeit führen und Nachbestellungen vorschlagen. Sie sind Auszubildende bzw. Auszubildender zur Fachinformatikerin bzw. zum Fachinformatiker für Anwendungsentwicklung in diesem Team.',
  material: [
    { title: 'Gesprächsprotokoll mit dem Lagerleiter: Wareneingang heute (Ist)', code: `Trifft eine Lieferung ein, nimmt ein Lagermitarbeiter den Lieferschein entgegen
und sucht im Ordner die ausgedruckte Bestellung. Er vergleicht Positionen und
Mengen per Hand. Stimmt etwas nicht, ruft er im Einkauf an, oft ist dort niemand
erreichbar. Danach trägt er die Mengen in die Excel-Liste seines Lagers ein. Jedes
Lager hat eine eigene Liste. Einen freien Lagerplatz sucht er, indem er durch das
Lager läuft. Die Lieferscheine legt er abends in ein Fach für die Buchhaltung,
die damit die Rechnungsprüfung macht. Das dauert oft mehrere Tage, sodass
Skontofristen verstreichen.` },
    { title: 'Soll-Prozess Wareneingang mit LagerPro', code: `Trifft eine Lieferung ein, scannt der Lagermitarbeiter den Barcode des
Lieferscheins. LagerPro zeigt die zugehörige Bestellung an. Der Mitarbeiter
scannt alle Artikel und erfasst die Mengen. LagerPro gleicht die Mengen mit der
Bestellung ab. Gibt es eine Abweichung, sendet LagerPro eine Abweichungsmeldung
an den Einkauf, der die Abweichung mit dem Lieferanten klärt. Anschließend bzw.
ohne Abweichung geht es mit den tatsächlich gelieferten Mengen weiter:
Gleichzeitig bucht LagerPro den Bestand ein und schlägt einen Lagerplatz vor,
auf dem der Mitarbeiter die Ware einlagert, und LagerPro gibt die
Rechnungsprüfung für die Buchhaltung frei. Wenn beides erledigt ist, ist der
Wareneingang abgeschlossen.` },
    { title: 'Stakeholder (Auszug aus der Projektdokumentation)', table: [
      ['Stakeholder', 'Beschreibung'],
      ['Geschäftsführung', 'Gibt das Budget frei und kann das Projekt stoppen. Erwartet vor allem einen Überblick über die Lagerkosten, an Details wenig interessiert.'],
      ['Lagermitarbeitende', 'Arbeiten täglich mit LagerPro und den Scannern, haben großes Interesse an einfacher Bedienung, aber keine Entscheidungsbefugnis im Projekt.'],
      ['Betriebsrat', 'Muss der Einführung zustimmen, da die Scanner Leistungsdaten erfassen könnten. Sehr interessiert an Regelungen zur Verhaltens- und Leistungskontrolle.'],
      ['Paketdienstleister', 'Liefert Ware an. LagerPro betrifft ihn kaum, er hat keinen Einfluss auf das Projekt.']
    ]},
    { title: 'Fachbeschreibung Datenhaltung', code: `- Ein Artikel hat eine Artikelnummer, eine Bezeichnung, eine Einheit (z. B. Stk, m)
  und einen Meldebestand.
- Ein Lieferant (Lieferantennummer, Firma, Ort) liefert viele Artikel, ein Artikel
  kann von mehreren Lieferanten bezogen werden. Für jede Kombination werden die
  Artikelnummer des Lieferanten und der Einkaufspreis gespeichert.
- Jedes Lager (Lagernummer, Bezeichnung, Ort) ist in mehrere Lagerplätze
  unterteilt. Ein Lagerplatz (Lagerplatz-ID, Regal, Fach) gehört zu genau einem
  Lager.
- Auf einem Lagerplatz können verschiedene Artikel liegen, ein Artikel kann auf
  mehreren Lagerplätzen liegen. Gespeichert wird jeweils die Menge.
- Eine Bestellung (Bestellnummer, Datum, Status) geht an genau einen Lieferanten
  und enthält mindestens einen Artikel mit der jeweils bestellten Menge.` },
    { title: 'Fachbeschreibung Etikettendruck', code: `Beim Einlagern druckt LagerPro Etiketten. Ein Etikett enthält Artikelnummer,
Bezeichnung, Lagerplatz-Code und den Barcode-Inhalt.
Es gibt zwei Ausgabewege: Thermodrucker im Hauptlager (Attribut ipAdresse) und
PDF-Export für Außenlager ohne Thermodrucker (Attribut verzeichnis). Beide bieten
die Methode drucken(e: Etikett): boolean an und sollen austauschbar sein.
Welcher Ausgabeweg erzeugt wird, entscheidet die Klasse DruckerFabrik über die
statische Methode erzeugeDrucker(typ: Druckertyp). Druckertyp kennt die Werte
THERMO und PDF.
Die Systemeinstellungen (Standard-Druckertyp, IP-Adresse des Thermodruckers)
verwaltet die Klasse Konfiguration, von der es im System genau ein Objekt
geben darf.
Ein Druckauftrag (Auftragsnummer, Erstellzeitpunkt) besteht aus mindestens
einem Etikett. Etiketten existieren nicht ohne ihren Druckauftrag. Jeder
Druckauftrag verwendet genau einen Ausgabeweg.` },
    { title: 'Klasse Artikel (Auszug für die Nachbestellung)', table: [
      ['Attribut', 'Datentyp', 'Bedeutung'],
      ['artikelNr', 'String', 'Artikelnummer'],
      ['bestand', 'int', 'Menge über alle Lagerplätze'],
      ['reserviert', 'int', 'für offene Kundenaufträge reservierte Menge'],
      ['offeneBestellmenge', 'int', 'bereits bestellte, noch nicht gelieferte Menge'],
      ['meldebestand', 'int', 'bei Erreichen oder Unterschreiten wird nachbestellt'],
      ['hoechstbestand', 'int', 'auf diesen Wert wird aufgefüllt'],
      ['ve', 'int', 'Verpackungseinheit, bestellt wird nur in ganzen VE (ve > 0)'],
      ['gesperrt', 'boolean', 'ausgelaufener Artikel, wird nicht nachbestellt']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Ist-Analyse und Geschäftsprozess', points: 25,
      intro: 'Bevor LagerPro entworfen wird, sollen Sie den Wareneingang analysieren und den künftigen Prozess modellieren.',
      sub: [
        {
          id: 'a', points: 4,
          q: 'Das Gesprächsprotokoll stammt aus einem Interview. Nennen Sie zwei weitere Erhebungstechniken für die Ist-Analyse und geben Sie für jede Technik einen Vorteil und einen Nachteil an.',
          kind: 'text',
          model: `Zwei der folgenden:
- Beobachtung (Mitarbeiter bei der Arbeit begleiten): Vorteil: zeigt den tatsächlichen Ablauf inkl. Umwegen und informeller Schritte. Nachteil: zeitaufwendig, Beobachtete verhalten sich evtl. anders als sonst.
- Fragebogen: Vorteil: viele Personen (z. B. alle Lagermitarbeitenden aller drei Lager) mit wenig Aufwand erreichbar, gut auswertbar. Nachteil: keine Rückfragen möglich, geringe Rücklaufquote, nur vorgedachte Fragen.
- Dokumentenanalyse (Excel-Listen, Lieferscheine, Arbeitsanweisungen): Vorteil: objektive Daten, z. B. Mengengerüst. Nachteil: Dokumente sind evtl. veraltet und zeigen nicht den gelebten Ablauf.
- Workshop: Vorteil: verschiedene Sichtweisen werden zusammengeführt, Konflikte früh sichtbar. Nachteil: Terminfindung schwierig, dominante Teilnehmer.`,
          criteria: [
            { text: 'Erste Erhebungstechnik mit passendem Vor- und Nachteil', points: 2 },
            { text: 'Zweite Erhebungstechnik mit passendem Vor- und Nachteil', points: 2 }
          ]
        },
        {
          id: 'b', points: 4,
          q: 'Ordnen Sie die vier Stakeholder aus dem Material in eine Stakeholder-Matrix (Einfluss und Interesse, jeweils hoch oder gering) ein und nennen Sie zu jedem eine passende Strategie für den Umgang im Projekt.',
          kind: 'text',
          model: `Geschäftsführung: hoher Einfluss, geringes Interesse → zufriedenstellen: regelmäßig knapp über Kosten, Termine und Nutzen informieren, bei wichtigen Entscheidungen einbinden.
Betriebsrat: hoher Einfluss, hohes Interesse → eng einbinden (Key Player): früh beteiligen, gemeinsam eine Betriebsvereinbarung zur Leistungs- und Verhaltenskontrolle abschließen.
Lagermitarbeitende: geringer Einfluss, hohes Interesse → aktiv informieren und beteiligen: Key-User benennen, an Tests und Schulungen beteiligen, Feedback einholen.
Paketdienstleister: geringer Einfluss, geringes Interesse → beobachten: nur bei Bedarf informieren, minimaler Aufwand.`,
          criteria: [
            { text: 'Geschäftsführung: hoher Einfluss, geringes Interesse, Strategie zufriedenstellen bzw. gezielt informieren', points: 1 },
            { text: 'Betriebsrat: hoher Einfluss, hohes Interesse, Strategie eng einbinden', points: 1 },
            { text: 'Lagermitarbeitende: geringer Einfluss, hohes Interesse, Strategie informieren bzw. beteiligen', points: 1 },
            { text: 'Paketdienstleister: geringer Einfluss, geringes Interesse, Strategie beobachten', points: 1 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'Nennen Sie drei Schwachstellen des heutigen Wareneingangs aus dem Gesprächsprotokoll und beschreiben Sie jeweils, wie LagerPro diese Schwachstelle beseitigt.',
          kind: 'text',
          model: `Drei der folgenden:
- Manueller Abgleich von Lieferschein und Bestellung, fehleranfällig und langsam → Barcode-Scan, LagerPro zeigt die Bestellung an und gleicht Mengen automatisch ab.
- Einkauf telefonisch oft nicht erreichbar, Abweichungen bleiben liegen → automatische Abweichungsmeldung an den Einkauf, nachvollziehbar dokumentiert.
- Getrennte Excel-Listen je Lager, kein Gesamtüberblick, Fehlbestände fallen spät auf → zentrale Datenbank mit Echtzeitbestand über alle Lager, Meldebestand löst Nachbestellvorschlag aus.
- Freier Lagerplatz wird durch Herumlaufen gesucht → LagerPro kennt die Belegung und schlägt einen Lagerplatz vor.
- Lieferscheine gehen erst abends per Papier an die Buchhaltung, Skonto verfällt → sofortige digitale Freigabe der Rechnungsprüfung nach Einbuchung.`,
          criteria: [
            { text: 'Erste Schwachstelle aus dem Protokoll mit passender Verbesserung durch LagerPro', points: 2 },
            { text: 'Zweite Schwachstelle aus dem Protokoll mit passender Verbesserung durch LagerPro', points: 2 },
            { text: 'Dritte Schwachstelle aus dem Protokoll mit passender Verbesserung durch LagerPro', points: 2 }
          ]
        },
        {
          id: 'd', points: 11,
          q: 'Zeichnen Sie den Soll-Prozess Wareneingang aus dem Material als BPMN-2.0-Diagramm. Verwenden Sie die Lanes Lager, LagerPro und Einkauf sowie Start- und Endereignis, Aufgaben, exklusive und parallele Gateways.',
          kind: 'diagram',
          model: `Pool Wareneingang mit drei Lanes.

Lane Lager: Startereignis "Lieferung eingetroffen" → Aufgabe "Lieferschein scannen"
Lane LagerPro: Aufgabe "Bestellung anzeigen"
Lane Lager: Aufgabe "Artikel scannen und Mengen erfassen"
Lane LagerPro: Aufgabe "Mengen mit Bestellung abgleichen" → exklusives Gateway (X) "Abweichung?"
  [ja] → LagerPro: "Abweichungsmeldung an Einkauf senden" → Lane Einkauf: "Abweichung mit Lieferant klären" → exklusives Gateway (X, Zusammenführung)
  [nein] → direkt zum zusammenführenden exklusiven Gateway
→ paralleles Gateway (+, Aufteilung)
  Zweig 1: LagerPro "Bestand einbuchen" → LagerPro "Lagerplatz vorschlagen" → Lager "Ware einlagern"
  Zweig 2: LagerPro "Rechnungsprüfung freigeben"
→ paralleles Gateway (+, Synchronisation) → Endereignis "Wareneingang abgeschlossen"

Die Abweichungsmeldung an den Einkauf kann statt als Sequenzfluss in der Lane Einkauf auch als Nachrichtenfluss zu einem eigenen Pool modelliert werden.`,
          diagram: `flowchart TB
  subgraph L["Lager"]
    S((" ")) --> A1("Lieferschein scannen")
    A3("Artikel scannen und Mengen erfassen")
    A9("Ware einlagern")
  end
  subgraph LP["LagerPro"]
    A2("Bestellung anzeigen")
    A4("Mengen mit Bestellung abgleichen")
    G1{"X"}
    A5("Abweichungsmeldung an Einkauf senden")
    G2{"X"}
    G3{"+"}
    A7("Bestand einbuchen")
    A8("Lagerplatz vorschlagen")
    A10("Rechnungsprüfung freigeben")
    G4{"+"}
    E(((" ")))
  end
  subgraph EK["Einkauf"]
    A6("Abweichung mit Lieferant klären")
  end
  A1 --> A2 --> A3 --> A4 --> G1
  G1 -->|"Abweichung"| A5 --> A6 --> G2
  G1 -->|"keine Abweichung"| G2
  G2 --> G3
  G3 --> A7 --> A8 --> A9 --> G4
  G3 --> A10 --> G4
  G4 --> E`,
          criteria: [
            { text: 'Drei Lanes Lager, LagerPro und Einkauf (in einem Pool)', points: 1 },
            { text: 'Startereignis (dünner Kreis) und Endereignis (dicker Kreis) vorhanden', points: 1 },
            { text: 'Lieferschein scannen, Artikel scannen und Ware einlagern in der Lane Lager', points: 1 },
            { text: 'Anzeigen, Abgleichen, Meldung, Einbuchen, Lagerplatz vorschlagen und Freigabe in der Lane LagerPro', points: 1 },
            { text: 'Abweichung klären in der Lane Einkauf', points: 1 },
            { text: 'Reihenfolge Lieferschein scannen, Bestellung anzeigen, Artikel scannen, Abgleich richtig', points: 1 },
            { text: 'Exklusives Gateway nach dem Abgleich mit beschrifteten Ausgängen (Abweichung ja oder nein)', points: 1 },
            { text: 'Exklusives Gateway führt beide Wege nach der Klärung wieder zusammen', points: 1 },
            { text: 'Paralleles Gateway teilt in zwei gleichzeitige Zweige auf', points: 1 },
            { text: 'Zweig Einbuchen, Lagerplatz vorschlagen, Einlagern und Zweig Rechnungsprüfung freigeben inhaltlich richtig', points: 1 },
            { text: 'Paralleles Gateway synchronisiert beide Zweige vor dem Endereignis', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: Datenmodell und Datenaustausch', points: 25,
      intro: 'Für LagerPro sollen Sie die Datenhaltung entwerfen und den Datenaustausch mit Lieferanten vorbereiten.',
      sub: [
        {
          id: 'a', points: 11,
          q: 'Zeichnen Sie auf Grundlage der Fachbeschreibung Datenhaltung ein Entity-Relationship-Modell. Geben Sie alle Entitätstypen mit Primärschlüssel und den genannten Attributen, die Beziehungen mit Kardinalitäten sowie die Attribute an Beziehungen an. Sie können die Chen-Notation (1:n, n:m) oder die Krähenfuß-Notation verwenden.',
          kind: 'diagram',
          model: `Entitätstypen (PK unterstrichen):
Artikel (_ArtikelNr_, Bezeichnung, Einheit, Meldebestand)
Lieferant (_LieferantNr_, Firma, Ort)
Lager (_LagerNr_, Bezeichnung, Ort)
Lagerplatz (_LagerplatzID_, Regal, Fach)
Bestellung (_BestellNr_, Datum, Status)

Beziehungen (Chen-Notation):
Lieferant n ——<liefert>—— m Artikel        Attribute: LiefArtikelNr, Einkaufspreis
Lager     1 ——<unterteilt in>—— n Lagerplatz
Lagerplatz n ——<lagert>—— m Artikel        Attribut: Menge
Lieferant 1 ——<erhält>—— n Bestellung
Bestellung n ——<enthält>—— m Artikel       Attribut: Menge

In Krähenfuß-Notation werden die n:m-Beziehungen über Beziehungsentitäten aufgelöst: Lieferkondition (LieferantNr, ArtikelNr, LiefArtikelNr, Einkaufspreis), Bestand (LagerplatzID, ArtikelNr, Menge), Bestellposition (BestellNr, ArtikelNr, Menge). Der Einkaufspreis gehört nicht zum Artikel, weil er je Lieferant unterschiedlich ist.`,
          diagram: `erDiagram
  LIEFERANT ||--o{ LIEFERKONDITION : bietet
  ARTIKEL ||--o{ LIEFERKONDITION : "bezogen ueber"
  LAGER ||--|{ LAGERPLATZ : "unterteilt in"
  LAGERPLATZ ||--o{ BESTAND : lagert
  ARTIKEL ||--o{ BESTAND : "liegt als"
  LIEFERANT ||--o{ BESTELLUNG : erhaelt
  BESTELLUNG ||--|{ BESTELLPOSITION : enthaelt
  ARTIKEL ||--o{ BESTELLPOSITION : "bestellt in"
  ARTIKEL {
    string artikelNr PK
    string bezeichnung
    string einheit
    int meldebestand
  }
  LIEFERANT {
    int lieferantNr PK
    string firma
    string ort
  }
  LIEFERKONDITION {
    int lieferantNr PK, FK
    string artikelNr PK, FK
    string liefArtikelNr
    decimal einkaufspreis
  }
  LAGER {
    int lagerNr PK
    string bezeichnung
    string ort
  }
  LAGERPLATZ {
    int lagerplatzId PK
    string regal
    string fach
    int lagerNr FK
  }
  BESTAND {
    int lagerplatzId PK, FK
    string artikelNr PK, FK
    int menge
  }
  BESTELLUNG {
    int bestellNr PK
    date datum
    string status
    int lieferantNr FK
  }
  BESTELLPOSITION {
    int bestellNr PK, FK
    string artikelNr PK, FK
    int menge
  }`,
          criteria: [
            { text: 'Entitätstypen Artikel, Lieferant, Lager, Lagerplatz und Bestellung mit Primärschlüssel', points: 2 },
            { text: 'Lager 1 zu n Lagerplatz', points: 1 },
            { text: 'Lieferant n zu m Artikel (bzw. über Beziehungsentität aufgelöst)', points: 1 },
            { text: 'Attribute LiefArtikelNr und Einkaufspreis an dieser Beziehung', points: 1 },
            { text: 'Lagerplatz n zu m Artikel (bzw. über Bestand aufgelöst)', points: 1 },
            { text: 'Attribut Menge an der Beziehung Lagerplatz und Artikel', points: 1 },
            { text: 'Lieferant 1 zu n Bestellung', points: 1 },
            { text: 'Bestellung n zu m Artikel (bzw. Bestellposition) mit Attribut Menge', points: 2 },
            { text: 'Einkaufspreis nicht beim Artikel, Meldebestand beim Artikel', points: 1 }
          ]
        },
        {
          id: 'b', points: 6,
          q: 'Die Handscanner erzeugen pro Monat rund zwei Millionen Scan-Ereignisse, deren Felder je nach Scannermodell und Vorgang unterschiedlich sind. Ein Kollege möchte dafür eine dokumentenorientierte NoSQL-Datenbank einsetzen. a) Nennen Sie zwei Unterschiede zwischen relationalen und dokumentenorientierten Datenbanken. b) Empfehlen Sie mit Begründung je ein Datenbankmodell für die Bestandsführung und für das Scan-Protokoll. c) Nennen Sie die vier ACID-Eigenschaften und erläutern Sie ihre Bedeutung am Beispiel einer Umbuchung von 20 Stück von Lagerplatz A nach Lagerplatz B.',
          kind: 'text',
          model: `a) Zwei der folgenden:
- Relational: feste Tabellenstruktur mit Schema; dokumentenorientiert: flexible, schemalose Dokumente (z. B. JSON), jedes Dokument kann andere Felder haben.
- Relational: Beziehungen über Fremdschlüssel und JOINs; dokumentenorientiert: zusammengehörige Daten verschachtelt in einem Dokument, kaum JOINs.
- Relational: starke Konsistenz mit ACID-Transaktionen; NoSQL: oft horizontale Skalierung über viele Server, teilweise nur eventual consistency.
- Abfragesprache: SQL gegenüber herstellerspezifischen Abfrage-APIs.

b) Bestandsführung: relationale Datenbank, weil die Daten klar strukturiert und stark verknüpft sind (Artikel, Lagerplätze, Bestellungen) und Bestandsänderungen konsistent per Transaktion gebucht werden müssen.
Scan-Protokoll: dokumentenorientierte Datenbank, weil die Ereignisse unterschiedlich aufgebaut sind (flexibles Schema), sehr viele Datensätze anfallen (gute Skalierung) und die Ereignisse meist nur geschrieben und selten verknüpft werden.

c) Atomarität: Abbuchung bei A und Zubuchung bei B erfolgen ganz oder gar nicht, bei einem Fehler wird alles zurückgerollt.
Konsistenz: Nach der Transaktion ist die Datenbank wieder in einem gültigen Zustand, die Gesamtmenge ist unverändert, kein Bestand wird negativ.
Isolation: Parallele Transaktionen, z. B. eine gleichzeitige Kommissionierung von Lagerplatz A, beeinflussen sich nicht.
Dauerhaftigkeit: Nach dem Commit bleibt die Umbuchung auch bei einem Systemabsturz erhalten.`,
          criteria: [
            { text: 'Zwei zutreffende Unterschiede genannt (je 1 Punkt)', points: 2 },
            { text: 'Bestandsführung relational, begründet mit Struktur bzw. Beziehungen bzw. Transaktionen', points: 1 },
            { text: 'Scan-Protokoll dokumentenorientiert, begründet mit flexiblem Schema bzw. Datenmenge', points: 1 },
            { text: 'Atomarität, Konsistenz, Isolation, Dauerhaftigkeit genannt', points: 1 },
            { text: 'Bedeutung am Beispiel der Umbuchung erläutert (z. B. ganz oder gar nicht)', points: 1 }
          ]
        },
        {
          id: 'c', points: 8,
          q: 'Ein Lieferant übermittelt Lieferavise als XML-Dokument (siehe unten). LagerPro arbeitet intern mit JSON. a) Stellen Sie die Daten des Lieferavis vollständig als JSON-Dokument dar. Verwenden Sie für Zahlen den passenden Datentyp. b) Erläutern Sie den Unterschied zwischen einem wohlgeformten und einem gültigen XML-Dokument. c) Nennen Sie einen weiteren Unterschied zwischen XML und JSON.',
          material: { code: `<?xml version="1.0" encoding="UTF-8"?>
<lieferavis nummer="LA-2026-4711">
  <lieferant id="L104">Gebr. Sommer KG</lieferant>
  <bestellnr>B-88231</bestellnr>
  <liefertermin>2026-11-03</liefertermin>
  <positionen>
    <position nr="1">
      <artikel>SAN-10045</artikel>
      <menge einheit="Stk">40</menge>
    </position>
    <position nr="2">
      <artikel>HZG-20311</artikel>
      <menge einheit="m">125.5</menge>
    </position>
  </positionen>
</lieferavis>` },
          kind: 'code',
          model: `a)
{
  "nummer": "LA-2026-4711",
  "lieferant": {
    "id": "L104",
    "name": "Gebr. Sommer KG"
  },
  "bestellnr": "B-88231",
  "liefertermin": "2026-11-03",
  "positionen": [
    { "nr": 1, "artikel": "SAN-10045", "menge": 40, "einheit": "Stk" },
    { "nr": 2, "artikel": "HZG-20311", "menge": 125.5, "einheit": "m" }
  ]
}
(Gleichwertig ist z. B. ein äußeres Objekt "lieferavis": { ... } oder "menge": { "wert": 40, "einheit": "Stk" }.)

b) Wohlgeformt: Das Dokument hält die allgemeinen XML-Syntaxregeln ein, z. B. genau ein Wurzelelement, jedes Element wird geschlossen, korrekte Verschachtelung, Attributwerte in Anführungszeichen. Gültig (valide): Das Dokument ist wohlgeformt und entspricht zusätzlich einer Strukturbeschreibung (XML-Schema XSD oder DTD), die z. B. erlaubte Elemente, Reihenfolge und Datentypen festlegt.

c) Zum Beispiel: XML kennt Attribute und Elemente, JSON nur Schlüssel-Wert-Paare; JSON ist kompakter (keine schließenden Tags) und lässt sich in JavaScript direkt verarbeiten; JSON kennt Datentypen wie Zahl, boolean und Array, in XML ist zunächst alles Text; XML unterstützt Namensräume und Kommentare.`,
          criteria: [
            { text: 'Gültiges JSON mit einem Wurzelobjekt und der Avisnummer', points: 1 },
            { text: 'Lieferant als Objekt mit id und Name', points: 1 },
            { text: 'Bestellnummer und Liefertermin als Zeichenketten übernommen', points: 1 },
            { text: 'Positionen als Array mit zwei Objekten', points: 1 },
            { text: 'Menge als Zahl (40 und 125.5, ohne Anführungszeichen) mit Einheit, nr als Zahl', points: 1 },
            { text: 'Wohlgeformt: XML-Syntaxregeln eingehalten', points: 1 },
            { text: 'Gültig: zusätzlich konform zu XSD bzw. DTD', points: 1 },
            { text: 'Ein weiterer zutreffender Unterschied zwischen XML und JSON', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: Objektorientierter Entwurf mit Entwurfsmustern', points: 25,
      intro: 'Für den Etikettendruck soll ein erweiterbarer Entwurf entstehen. Grundlage ist die Fachbeschreibung Etikettendruck im Material.',
      sub: [
        {
          id: 'a', points: 12,
          q: 'Zeichnen Sie ein UML-Klassendiagramm für den Etikettendruck. Geben Sie Attribute mit Sichtbarkeit und Datentyp, Methoden mit Parametern und Rückgabetyp, Beziehungsarten und Multiplizitäten an. Kennzeichnen Sie Interfaces, Aufzählungstypen und statische Elemente. Setzen Sie die Klasse Konfiguration als Singleton um.',
          kind: 'diagram',
          model: `«interface» Etikettendrucker
  + drucken(e: Etikett): boolean

Thermodrucker - - -▷ Etikettendrucker   (Realisierung)
  - ipAdresse: String
  + drucken(e: Etikett): boolean

PdfExport - - -▷ Etikettendrucker       (Realisierung)
  - verzeichnis: String
  + drucken(e: Etikett): boolean

DruckerFabrik
  + erzeugeDrucker(typ: Druckertyp): Etikettendrucker   (statisch, unterstrichen)

«enumeration» Druckertyp
  THERMO
  PDF

Konfiguration (Singleton)
  - instanz: Konfiguration            (statisch, unterstrichen)
  - standardTyp: Druckertyp
  - thermoIp: String
  - Konfiguration()                   (privater Konstruktor)
  + getInstanz(): Konfiguration       (statisch, unterstrichen)
  + getStandardTyp(): Druckertyp

Etikett
  - artikelNr: String
  - bezeichnung: String
  - lagerplatzCode: String
  - barcode: String

Druckauftrag
  - auftragsNr: int
  - erstelltAm: DateTime
  + ausfuehren(): boolean

Beziehungen:
Druckauftrag 1 ◆——— 1..* Etikett                  (Komposition, Raute bei Druckauftrag)
Druckauftrag 0..* ———> 1 Etikettendrucker         (gerichtete Assoziation "verwendet")
DruckerFabrik - - -> Etikettendrucker             (Abhängigkeit «create»)
DruckerFabrik - - -> Konfiguration bzw. Druckertyp (Abhängigkeit, nutzt)`,
          diagram: `classDiagram
  class Etikettendrucker {
    <<interface>>
    +drucken(e: Etikett) boolean
  }
  class Thermodrucker {
    -ipAdresse: String
    +drucken(e: Etikett) boolean
  }
  class PdfExport {
    -verzeichnis: String
    +drucken(e: Etikett) boolean
  }
  class DruckerFabrik {
    +erzeugeDrucker(typ: Druckertyp)$ Etikettendrucker
  }
  class Druckertyp {
    <<enumeration>>
    THERMO
    PDF
  }
  class Etikett {
    -artikelNr: String
    -bezeichnung: String
    -lagerplatzCode: String
    -barcode: String
  }
  class Druckauftrag {
    -auftragsNr: int
    -erstelltAm: DateTime
    +ausfuehren() boolean
  }
  class Konfiguration {
    -instanz: Konfiguration$
    -standardTyp: Druckertyp
    -thermoIp: String
    -Konfiguration()
    +getInstanz()$ Konfiguration
    +getStandardTyp() Druckertyp
  }
  Druckauftrag "1" *-- "1..*" Etikett
  Druckauftrag "0..*" --> "1" Etikettendrucker : verwendet
  Etikettendrucker <|.. Thermodrucker
  Etikettendrucker <|.. PdfExport
  DruckerFabrik ..> Etikettendrucker : erzeugt
  DruckerFabrik ..> Druckertyp : nutzt
  DruckerFabrik ..> Konfiguration : liest`,
          criteria: [
            { text: 'Interface Etikettendrucker gekennzeichnet, mit drucken(e: Etikett): boolean', points: 1 },
            { text: 'Thermodrucker und PdfExport mit ihren privaten Attributen und Datentypen', points: 1 },
            { text: 'Beide Klassen realisieren das Interface (gestrichelte Linie, leeres Dreieck am Interface)', points: 2 },
            { text: 'erzeugeDrucker als statisch gekennzeichnet (unterstrichen bzw. $)', points: 1 },
            { text: 'erzeugeDrucker mit Parameter typ: Druckertyp und Rückgabetyp Etikettendrucker', points: 1 },
            { text: 'Aufzählungstyp Druckertyp mit THERMO und PDF', points: 1 },
            { text: 'Konfiguration mit privatem statischen Attribut instanz und privatem Konstruktor', points: 1 },
            { text: 'Konfiguration mit öffentlicher statischer Methode getInstanz(): Konfiguration', points: 1 },
            { text: 'Klasse Etikett mit den vier Attributen', points: 1 },
            { text: 'Komposition Druckauftrag 1 zu 1..* Etikett, Raute beim Druckauftrag', points: 1 },
            { text: 'Druckauftrag verwendet genau einen Etikettendrucker (Multiplizität 1)', points: 1 }
          ]
        },
        {
          id: 'b', points: 6,
          q: 'a) Erläutern Sie Zweck und Aufbau des Entwurfsmusters Singleton. b) Implementieren Sie die Methode getInstanz() der Klasse Konfiguration in Pseudocode. c) Nennen Sie einen Nachteil des Singleton-Musters.',
          kind: 'code',
          model: `a) Zweck: Es soll von einer Klasse genau ein Objekt geben, auf das global zugegriffen werden kann, hier die einheitlichen Systemeinstellungen.
Aufbau: privater Konstruktor (von außen kann kein Objekt erzeugt werden), privates statisches Attribut, das die einzige Instanz hält, öffentliche statische Methode getInstanz(), die diese Instanz liefert und sie beim ersten Aufruf erzeugt.

b)
methode getInstanz(): Konfiguration     // statisch
  falls instanz == null dann
    instanz = neue Konfiguration()
  ende falls
  rückgabe instanz
ende methode

c) Zum Beispiel: globaler Zustand erschwert Unit-Tests (Instanz lässt sich schlecht austauschen bzw. mocken); versteckte Abhängigkeiten zwischen Klassen; bei mehreren Threads können ohne Synchronisation zwei Instanzen entstehen; verletzt das Single-Responsibility-Prinzip (Klasse steuert zusätzlich ihre Erzeugung).`,
          criteria: [
            { text: 'Zweck: genau eine Instanz mit globalem Zugriff', points: 1 },
            { text: 'Privater Konstruktor und private statische Instanzvariable genannt', points: 1 },
            { text: 'Öffentliche statische Zugriffsmethode genannt', points: 1 },
            { text: 'Pseudocode prüft, ob die Instanz noch nicht existiert, und erzeugt sie nur dann', points: 1 },
            { text: 'Pseudocode gibt die Instanz zurück', points: 1 },
            { text: 'Zutreffender Nachteil genannt', points: 1 }
          ]
        },
        {
          id: 'c', points: 7,
          q: 'a) Erläutern Sie zwei Vorteile der DruckerFabrik für LagerPro. Gehen Sie darauf ein, was zu tun ist, wenn später ein dritter Ausgabeweg (z. B. ein Netzwerk-Etikettendrucker eines anderen Herstellers) hinzukommt. b) Erläutern Sie den Begriff Polymorphie am Beispiel der Methode drucken(). c) Erläutern Sie einen Unterschied zwischen einem Interface und einer abstrakten Klasse und begründen Sie, warum hier ein Interface gewählt wurde.',
          kind: 'text',
          model: `a) Entkopplung: Der aufrufende Code (z. B. Druckauftrag) kennt nur das Interface Etikettendrucker und nicht die konkreten Klassen, die Erzeugung ist an einer Stelle gebündelt.
Erweiterbarkeit: Für einen dritten Ausgabeweg wird eine neue Klasse geschrieben, die Etikettendrucker realisiert, der Aufzählungstyp um einen Wert ergänzt und nur die DruckerFabrik angepasst. Der übrige Code bleibt unverändert.

b) Polymorphie (Vielgestaltigkeit): Der gleiche Methodenaufruf drucker.drucken(e) auf einer Variablen vom Typ Etikettendrucker führt zur Laufzeit je nach tatsächlichem Objekt zu unterschiedlichem Verhalten: Beim Thermodrucker werden ZPL-Befehle an die IP-Adresse gesendet, beim PdfExport wird eine PDF-Datei im Verzeichnis erzeugt (späte Bindung).

c) Unterschied (einer genügt): Ein Interface legt nur Methodensignaturen fest (klassisch ohne Implementierung und ohne Attribute), eine abstrakte Klasse kann Attribute und bereits implementierte Methoden enthalten. Eine Klasse kann mehrere Interfaces realisieren, aber nur von einer Klasse erben.
Begründung: Thermodrucker und PdfExport haben keine gemeinsamen Attribute oder gemeinsamen Code, sondern nur die gleiche Fähigkeit drucken. Ein Interface beschreibt genau diesen Vertrag und lässt den Klassen die Möglichkeit, von einer anderen Klasse zu erben.`,
          criteria: [
            { text: 'Vorteil Entkopplung: Aufrufer kennt nur das Interface, Erzeugung zentral', points: 1 },
            { text: 'Erweiterung: neue Klasse realisiert das Interface, nur Fabrik und Aufzählung werden angepasst', points: 1 },
            { text: 'Polymorphie als gleicher Aufruf mit unterschiedlichem Verhalten je Objekt erläutert', points: 1 },
            { text: 'Bezug zu drucken() bei Thermodrucker und PdfExport hergestellt', points: 1 },
            { text: 'Zutreffender Unterschied zwischen Interface und abstrakter Klasse', points: 2 },
            { text: 'Begründung für das Interface (kein gemeinsamer Code, nur gemeinsamer Vertrag bzw. Mehrfachrealisierung)', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Nachbestelllogik und Betrieb', points: 25,
      intro: 'Zum Abschluss sollen Sie die Kernlogik der Nachbestellung entwerfen und den Betrieb von LagerPro absichern.',
      sub: [
        {
          id: 'a', points: 10,
          q: 'Entwickeln Sie in Pseudocode die Funktion nachbestellvorschlaege(artikelListe). Sie erhält eine Liste von Objekten der Klasse Artikel (siehe Material) und gibt eine Liste von Objekten der Klasse Bestellvorschlag(artikelNr, menge) zurück. Gesperrte Artikel werden übersprungen. Der verfügbare Bestand ist bestand − reserviert + offeneBestellmenge. Ist er kleiner oder gleich dem Meldebestand, wird auf den Höchstbestand aufgefüllt, wobei die Menge auf ganze Verpackungseinheiten aufgerundet wird. Für die ganzzahlige Division steht DIV, für den Rest MOD zur Verfügung. Beispiel: bestand 30, reserviert 12, offeneBestellmenge 0, meldebestand 25, hoechstbestand 100, ve 25 ergibt verfügbar 18, Bedarf 82 und Bestellmenge 100.',
          kind: 'code',
          model: `funktion nachbestellvorschlaege(artikelListe)
  vorschlaege = neue Liste
  für jeden a in artikelListe
    falls a.gesperrt == falsch dann
      verfuegbar = a.bestand - a.reserviert + a.offeneBestellmenge
      falls verfuegbar <= a.meldebestand dann
        bedarf = a.hoechstbestand - verfuegbar
        anzahlVE = bedarf DIV a.ve
        falls bedarf MOD a.ve > 0 dann
          anzahlVE = anzahlVE + 1
        ende falls
        menge = anzahlVE * a.ve
        vorschlaege.hinzufuegen(neuer Bestellvorschlag(a.artikelNr, menge))
      ende falls
    ende falls
  ende für
  rückgabe vorschlaege
ende funktion

Probe mit dem Beispiel: verfügbar = 30 − 12 + 0 = 18 <= 25, Bedarf = 100 − 18 = 82, 82 DIV 25 = 3, 82 MOD 25 = 7 > 0, also 4 VE, Menge = 4 × 25 = 100.`,
          criteria: [
            { text: 'Ergebnisliste vor der Schleife leer initialisiert', points: 1 },
            { text: 'Schleife läuft über alle Artikel der Liste', points: 1 },
            { text: 'Gesperrte Artikel werden übersprungen', points: 1 },
            { text: 'Verfügbarer Bestand korrekt berechnet (bestand − reserviert + offeneBestellmenge)', points: 2 },
            { text: 'Bedingung verfügbar <= meldebestand', points: 1 },
            { text: 'Bedarf = hoechstbestand − verfügbar', points: 1 },
            { text: 'Aufrunden auf ganze VE korrekt (DIV und Erhöhung bei Rest > 0) und Menge = Anzahl VE × ve', points: 2 },
            { text: 'Bestellvorschlag mit artikelNr und menge hinzugefügt und Liste nach der Schleife zurückgegeben', points: 1 }
          ]
        },
        {
          id: 'b', points: 7,
          q: 'Die Datenbank von LagerPro ist 120 GB groß, täglich ändern sich rund 6 GB. Geplant ist: sonntags eine Vollsicherung, montags bis samstags eine inkrementelle Sicherung, jeweils um 22 Uhr. Alle Sicherungen werden 4 Wochen aufbewahrt. a) Erläutern Sie den Unterschied zwischen inkrementeller und differenzieller Sicherung. b) Berechnen Sie den Speicherbedarf für die Aufbewahrung von 4 Wochen. c) Am Donnerstag um 15 Uhr fällt der Datenbankserver aus. Geben Sie an, welche Sicherungen in welcher Reihenfolge für die Wiederherstellung benötigt werden und welche Daten verloren sind. d) Erläutern Sie die 3-2-1-Regel.',
          kind: 'text',
          model: `a) Inkrementell: sichert nur die Änderungen seit der letzten Sicherung, egal ob voll oder inkrementell. Kleine, schnelle Sicherungen, für die Wiederherstellung braucht man aber die Vollsicherung und alle folgenden Inkremente.
Differenziell: sichert alle Änderungen seit der letzten Vollsicherung. Die Sicherungen wachsen im Lauf der Woche, für die Wiederherstellung genügen die Vollsicherung und die letzte differenzielle Sicherung.

b) Vollsicherungen: 4 × 120 GB = 480 GB
Inkrementelle Sicherungen: 4 Wochen × 6 Tage × 6 GB = 144 GB
Gesamt: 480 GB + 144 GB = 624 GB

c) Benötigt: Vollsicherung vom Sonntag, dann die inkrementellen Sicherungen von Montag, Dienstag und Mittwoch in dieser Reihenfolge. Verloren sind alle Änderungen seit Mittwoch 22 Uhr bis zum Ausfall am Donnerstag 15 Uhr (falls nicht z. B. über Transaktionslogs rekonstruierbar).

d) Mindestens 3 Kopien der Daten (Original und zwei Sicherungen), auf 2 verschiedenen Speichermedien bzw. Systemen, davon 1 Kopie außer Haus (offsite bzw. offline), damit z. B. Brand oder Ransomware nicht alle Kopien zerstören.`,
          criteria: [
            { text: 'Inkrementell: Änderungen seit der letzten Sicherung', points: 1 },
            { text: 'Differenziell: Änderungen seit der letzten Vollsicherung', points: 1 },
            { text: 'Vollsicherungen 4 × 120 GB = 480 GB', points: 1 },
            { text: 'Inkremente 24 × 6 GB = 144 GB, gesamt 624 GB', points: 1 },
            { text: 'Wiederherstellung: Vollsicherung Sonntag, dann Inkremente Montag, Dienstag, Mittwoch der Reihe nach', points: 1 },
            { text: 'Datenverlust seit Mittwoch 22 Uhr erkannt', points: 1 },
            { text: '3-2-1-Regel korrekt erläutert (3 Kopien, 2 Medien, 1 außer Haus)', points: 1 }
          ]
        },
        {
          id: 'c', points: 4,
          q: 'Das Team möchte eine CI/CD-Pipeline einführen. Erläutern Sie Continuous Integration und den Unterschied zwischen Continuous Delivery und Continuous Deployment. Nennen Sie vier typische Stufen einer Pipeline in sinnvoller Reihenfolge.',
          kind: 'text',
          model: `Continuous Integration: Entwickler integrieren ihre Änderungen häufig (mindestens täglich) in den gemeinsamen Hauptzweig. Jeder Push löst automatisch Build und Tests aus, Fehler werden früh erkannt.
Continuous Delivery: Jede erfolgreich getestete Version wird automatisch so vorbereitet, dass sie jederzeit auslieferbar ist, die Freigabe in die Produktion erfolgt aber manuell. Continuous Deployment: Auch die Auslieferung in die Produktion erfolgt automatisch ohne manuelle Freigabe.
Stufen z. B.: Checkout bzw. Build, Unit-Tests, statische Codeanalyse bzw. Security-Scan, Paketieren (z. B. Container-Image), Deployment auf Testsystem mit Integrationstests, Deployment in Produktion.`,
          criteria: [
            { text: 'CI erläutert: häufige Integration mit automatischem Build und Test', points: 1 },
            { text: 'Delivery: manuelle Freigabe in Produktion; Deployment: vollautomatisch', points: 1 },
            { text: 'Vier passende Stufen in sinnvoller Reihenfolge (mindestens zwei: 1 Punkt)', points: 2 }
          ]
        },
        {
          id: 'd', points: 4,
          q: 'Für die Barcode-Erzeugung stehen zwei Open-Source-Bibliotheken zur Auswahl: eine unter der MIT-Lizenz und eine unter der GPL-3.0. Erläutern Sie den Begriff Copyleft und die Pflichten aus der MIT-Lizenz. Beurteilen Sie, ob die GPL-Bibliothek in LagerPro eingesetzt werden darf, wenn LagerPro nur intern genutzt wird, und was sich ändert, wenn Kessler LagerPro später an andere Großhändler verkauft.',
          kind: 'text',
          model: `Copyleft: Abgeleitete Werke bzw. veränderte Versionen dürfen nur unter derselben Lizenz weitergegeben werden, der Quellcode muss den Empfängern zugänglich gemacht werden. Die Freiheit der Software "vererbt" sich.
MIT-Lizenz: freizügig (permissiv). Nutzung, Änderung und Verkauf auch in proprietärer Software sind erlaubt. Pflicht ist nur, den Urheberrechtshinweis und den Lizenztext beizubehalten.
GPL bei interner Nutzung: zulässig, denn die Pflichten der GPL greifen erst bei der Weitergabe (Verbreitung) der Software. Eine rein interne Nutzung innerhalb der Kessler GmbH ist keine Weitergabe, der Quellcode von LagerPro muss nicht veröffentlicht werden.
Bei Verkauf an andere Großhändler: Das ist eine Weitergabe. LagerPro müsste als abgeleitetes Werk unter der GPL lizenziert und den Käufern der vollständige Quellcode mit den GPL-Rechten bereitgestellt werden. Will Kessler das nicht, sollte von Anfang an die MIT-Bibliothek gewählt werden.`,
          criteria: [
            { text: 'Copyleft erläutert: Weitergabe abgeleiteter Werke nur unter gleicher Lizenz mit Quellcode', points: 1 },
            { text: 'MIT: freizügig, Pflicht nur Copyright-Hinweis und Lizenztext beibehalten', points: 1 },
            { text: 'Interne Nutzung der GPL-Bibliothek zulässig, da keine Weitergabe', points: 1 },
            { text: 'Bei Verkauf: LagerPro unter GPL, Quellcode an Käufer, daher MIT-Bibliothek vorzuziehen', points: 1 }
          ]
        }
      ]
    }
  ]
}
];
