// GA1-Prüfungsfälle: Planen eines Softwareproduktes
const CASES_GA1 = [
{
  id: 'ga1_fall1',
  area: 'GA1',
  title: 'Fall 1: Mandantenportal einer Steuerkanzlei',
  minutes: 90,
  scenario: 'Die Brandt & Weller Steuerberatung PartGmbB in Kassel betreut mit 45 Mitarbeitenden rund 320 Unternehmensmandanten. Belege erreichen die Kanzlei bisher per Post, E-Mail oder als Papierstapel im Pendelordner, Termine werden telefonisch vereinbart. Die Kanzlei möchte deshalb ein eigenes webbasiertes Mandantenportal entwickeln lassen, über das Mandanten Belege hochladen, Termine buchen und sichere Nachrichten mit ihrer Sachbearbeitung austauschen können. Die Entwicklung übernimmt die interne IT-Abteilung, unterstützt von einem externen Hosting-Anbieter mit Rechenzentrum in Frankfurt. Sie sind Auszubildende bzw. Auszubildender zur Fachinformatikerin bzw. zum Fachinformatiker für Anwendungsentwicklung in dieser IT-Abteilung und arbeiten im Projektteam mit.',
  material: [
    { title: 'Gesprächsnotiz Kick-off mit Kanzleipartnerin Frau Weller (Auszug)', table: [
      ['Nr.', 'Aussage'],
      ['1', 'Mandanten sollen Belege als PDF oder Foto hochladen können.'],
      ['2', 'Das Portal soll auch auf dem Smartphone gut bedienbar sein.'],
      ['3', 'Hochgeladene Belege sollen automatisch der richtigen Mandantenakte zugeordnet werden.'],
      ['4', 'Jede Seite soll innerhalb von 2 Sekunden laden, auch zum Quartalsende.'],
      ['5', 'Mandanten sollen Termine mit ihrer Sachbearbeitung online buchen können.'],
      ['6', 'Alle Daten müssen in Deutschland gespeichert und verschlüsselt übertragen werden.'],
      ['7', 'Das Portal soll im Jahresmittel zu 99,5 % verfügbar sein.'],
      ['8', 'Bei einer neuen Nachricht erhält der Mandant eine E-Mail-Benachrichtigung.']
    ]},
    { title: 'Fachbeschreibung Datenmodell', code: `- Mandanten und Mitarbeitende melden sich mit E-Mail-Adresse und Passwort an.
  Für beide werden eine Benutzer-ID, die E-Mail-Adresse und ein Passwort-Hash
  gespeichert. Ein reiner "Benutzer" ohne Rolle existiert nicht.
- Ein Mandant hat zusätzlich eine Mandantennummer und einen Firmennamen,
  ein Mitarbeiter ein Kürzel (z. B. "SW").
- Jeder Mandant wird von genau einem Mitarbeiter betreut, ein Mitarbeiter
  betreut beliebig viele Mandanten.
- Ein Mandant lädt beliebig viele Belege hoch (Beleg-ID, Dateiname, Zeitpunkt
  des Uploads, Kategorie, Status). Wird ein Mandantenkonto nach Ablauf der
  Aufbewahrungsfrist gelöscht, werden alle seine Belege mitgelöscht.
- Ein Termin (Termin-ID, Beginn, Dauer in Minuten, Terminart PRAESENZ,
  TELEFON oder VIDEO) gehört zu genau einem Mandanten und genau einem
  Mitarbeiter. Termine können verschoben werden.
- Eine Nachricht (Text, Sendezeitpunkt, gelesen ja/nein) hat genau einen
  Absender und genau einen Empfänger, jeweils ein Benutzer.` },
    { title: 'Kalkulationsdaten Wirtschaftlichkeit', table: [
      ['Position', 'Wert'],
      ['Einmalige Entwicklungs- und Einführungskosten', '48.000 €'],
      ['Laufende Kosten (Hosting, Wartung, Lizenzen) pro Jahr', '6.000 €'],
      ['Anzahl Mandanten, die das Portal nutzen werden', '320'],
      ['Zeitersparnis der Sachbearbeitung je Mandant und Monat', '0,25 Stunden'],
      ['Interner Stundensatz Sachbearbeitung', '35 €/h'],
      ['Wegfallende Porto- und Papierkosten pro Jahr', '4.800 €']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Anforderungen erheben und Projekt organisieren', points: 25,
      intro: 'Vor dem Projektstart sollen Sie die Anforderungen strukturieren. Grundlage ist die Gesprächsnotiz aus dem Material.',
      sub: [
        {
          id: 'a', points: 6,
          q: 'Nennen Sie drei Stakeholder des Mandantenportals und beschreiben Sie jeweils ein typisches Interesse, das dieser Stakeholder am Projekt hat.',
          kind: 'text',
          model: `- Mandanten: einfache, auch mobile Belegübermittlung ohne Papier und Porto, schnelle Terminbuchung, Vertraulichkeit ihrer Daten.
- Sachbearbeitung (Steuerfachangestellte): Belege kommen vollständig und bereits richtig zugeordnet an, weniger Rückfragen und Telefonate.
- Kanzleipartner bzw. Geschäftsleitung: Wirtschaftlichkeit (Kosten amortisieren sich), moderner Auftritt, Mandantenbindung.
Weitere mögliche Antworten: Datenschutzbeauftragter (DSGVO-Konformität, Wahrung der Verschwiegenheitspflicht), Hosting-Anbieter (klarer Auftrag, planbare Last), interne IT (wartbare Technik, geringer Supportaufwand).`,
          criteria: [
            { text: 'Erster Stakeholder genannt und mit passendem Interesse beschrieben', points: 2 },
            { text: 'Zweiter Stakeholder genannt und mit passendem Interesse beschrieben', points: 2 },
            { text: 'Dritter Stakeholder genannt und mit passendem Interesse beschrieben', points: 2 }
          ]
        },
        {
          id: 'b', points: 6,
          q: 'Ordnen Sie die acht Aussagen der Gesprächsnotiz jeweils den funktionalen oder den nicht-funktionalen Anforderungen zu. Nennen Sie außerdem für zwei der nicht-funktionalen Anforderungen das betroffene Qualitätsmerkmal nach ISO/IEC 25010.',
          kind: 'text',
          model: `Funktional (was das System tun soll): 1, 3, 5, 8
Nicht-funktional (wie gut bzw. unter welchen Bedingungen): 2, 4, 6, 7

Qualitätsmerkmale (zwei genügen):
- 2 Smartphone-Bedienung: Benutzbarkeit (auch Übertragbarkeit bzw. Anpassbarkeit an Endgeräte vertretbar)
- 4 Ladezeit 2 Sekunden: Leistungseffizienz (Zeitverhalten)
- 6 Speicherung in Deutschland, verschlüsselte Übertragung: Sicherheit (Vertraulichkeit)
- 7 Verfügbarkeit 99,5 %: Zuverlässigkeit (Verfügbarkeit)`,
          criteria: [
            { text: 'Aussagen 1, 3, 5 und 8 als funktional zugeordnet', points: 2 },
            { text: 'Aussagen 2, 4, 6 und 7 als nicht-funktional zugeordnet', points: 2 },
            { text: 'Zwei nicht-funktionalen Anforderungen das passende ISO-25010-Merkmal zugeordnet (je 1 Punkt)', points: 2 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'Formulieren Sie für den Belegupload eine User Story im üblichen Satzmuster und geben Sie zwei überprüfbare Akzeptanzkriterien an.',
          kind: 'text',
          model: `User Story:
Als Mandant möchte ich Belege als PDF oder Foto im Portal hochladen, damit ich sie nicht mehr per Post an die Kanzlei schicken muss.

Akzeptanzkriterien:
1. Es können Dateien der Typen PDF, JPG und PNG bis 20 MB hochgeladen werden, andere Typen werden mit einer verständlichen Fehlermeldung abgelehnt.
2. Nach erfolgreichem Upload erscheint der Beleg mit Dateiname, Datum und Status "eingegangen" in der Belegliste des Mandanten und ist in seiner Mandantenakte für die zuständige Sachbearbeitung sichtbar.`,
          criteria: [
            { text: 'Satzmuster "Als <Rolle> möchte ich <Funktion>, damit <Nutzen>" vollständig verwendet', points: 2 },
            { text: 'Rolle, Funktion und Nutzen passen fachlich zum Belegupload', points: 2 },
            { text: 'Zwei Akzeptanzkriterien, die konkret und eindeutig prüfbar sind (je 1 Punkt)', points: 2 }
          ]
        },
        {
          id: 'd', points: 7,
          q: 'Das Portal soll mit Scrum entwickelt werden. a) Begründen Sie, wer in diesem Projekt die Rolle des Product Owners übernehmen sollte, und nennen Sie zwei seiner Aufgaben. b) Erläutern Sie den Unterschied zwischen Sprint Review und Sprint Retrospektive. c) Erläutern Sie den Begriff Definition of Done an einem Beispiel aus diesem Projekt.',
          kind: 'text',
          model: `a) Product Owner sollte eine Person auf Kanzleiseite sein, die die fachlichen Anforderungen kennt und Entscheidungen treffen darf, z. B. Frau Weller oder eine von ihr beauftragte Digitalisierungsverantwortliche. Aufgaben: Product Backlog pflegen und priorisieren, User Stories formulieren und abnehmen, Ansprechpartner für das Entwicklungsteam sein, Wert des Produkts maximieren.
b) Sprint Review: Am Sprintende stellt das Team das Inkrement den Stakeholdern vor, es geht um das Produkt, Feedback fließt ins Backlog. Sprint Retrospektive: Das Scrum Team reflektiert danach intern seine Zusammenarbeit und Arbeitsweise und legt Verbesserungen fest, es geht um den Prozess.
c) Die Definition of Done ist eine im Team vereinbarte Checkliste, wann ein Backlog-Eintrag als fertig gilt. Beispiel: Code ist reviewt, Unit-Tests laufen erfolgreich, die Funktion ist auf dem Testsystem bereitgestellt und die Akzeptanzkriterien sind vom Product Owner abgenommen.`,
          criteria: [
            { text: 'Product Owner sinnvoll auf Kanzlei- bzw. Fachseite verortet und begründet', points: 1 },
            { text: 'Zwei zutreffende Aufgaben des Product Owners genannt (je 1 Punkt)', points: 2 },
            { text: 'Review = Produkt bzw. Inkrement mit Stakeholdern, Retrospektive = Prozess bzw. Zusammenarbeit im Team', points: 2 },
            { text: 'Definition of Done als gemeinsame Fertig-Kriterien erklärt', points: 1 },
            { text: 'Passendes konkretes Beispiel für ein DoD-Kriterium genannt', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: Objektorientierter Entwurf', points: 25,
      intro: 'Auf Basis der Fachbeschreibung im Material soll das Klassenmodell entstehen. Außerdem sollen Benachrichtigungen flexibel erweiterbar sein.',
      sub: [
        {
          id: 'a', points: 15,
          q: 'Erstellen Sie auf Grundlage der Fachbeschreibung ein UML-Klassendiagramm (zeichnen oder in Textform). Geben Sie alle Klassen mit Attributen (Sichtbarkeit, Name, Datentyp), je Klasse mindestens eine sinnvolle Methode mit Parametern und Rückgabetyp, die Beziehungsarten sowie die Multiplizitäten an. Kennzeichnen Sie abstrakte Klassen und Aufzählungstypen.',
          kind: 'diagram',
          diagram: `classDiagram
  class Benutzer {
    <<abstract>>
    -benutzerId: int
    -email: String
    -passwortHash: String
    +anmelden(email: String, passwort: String) boolean
  }
  class Mandant {
    -mandantenNr: String
    -firmenname: String
    +belegHochladen(datei: Datei, kategorie: String) Beleg
  }
  class Mitarbeiter {
    -kuerzel: String
    +getMandanten() List~Mandant~
  }
  class Beleg {
    -belegId: int
    -dateiname: String
    -hochgeladenAm: DateTime
    -kategorie: String
    -status: String
    +setStatus(status: String) void
  }
  class Termin {
    -terminId: int
    -beginn: DateTime
    -dauerMin: int
    -art: Terminart
    +verschieben(neuerBeginn: DateTime) void
  }
  class Terminart {
    <<enumeration>>
    PRAESENZ
    TELEFON
    VIDEO
  }
  class Nachricht {
    -text: String
    -gesendetAm: DateTime
    -gelesen: boolean
    +alsGelesenMarkieren() void
  }
  Benutzer <|-- Mandant
  Benutzer <|-- Mitarbeiter
  Mitarbeiter "1" -- "0..*" Mandant : betreut
  Mandant "1" *-- "0..*" Beleg
  Mandant "1" -- "0..*" Termin
  Mitarbeiter "1" -- "0..*" Termin
  Benutzer "1 Absender" -- "0..*" Nachricht
  Benutzer "1 Empfänger" -- "0..*" Nachricht`,
          model: `{abstract} Benutzer
  - benutzerId: int
  - email: String
  - passwortHash: String
  + anmelden(email: String, passwort: String): boolean

Mandant ——▷ Benutzer          (Vererbung)
  - mandantenNr: String
  - firmenname: String
  + belegHochladen(datei: Datei, kategorie: String): Beleg

Mitarbeiter ——▷ Benutzer      (Vererbung)
  - kuerzel: String
  + getMandanten(): List<Mandant>

Beleg
  - belegId: int
  - dateiname: String
  - hochgeladenAm: DateTime
  - kategorie: String
  - status: String
  + setStatus(status: String): void

Termin
  - terminId: int
  - beginn: DateTime
  - dauerMin: int
  - art: Terminart
  + verschieben(neuerBeginn: DateTime): void

«enumeration» Terminart
  PRAESENZ
  TELEFON
  VIDEO

Nachricht
  - text: String
  - gesendetAm: DateTime
  - gelesen: boolean
  + alsGelesenMarkieren(): void

Beziehungen:
Mitarbeiter 1 ——— betreut ——— 0..* Mandant
Mandant 1 ◆——— 0..* Beleg              (Komposition, Raute bei Mandant)
Mandant 1 ——— 0..* Termin
Mitarbeiter 1 ——— 0..* Termin
Benutzer 1 (Absender) ——— 0..* Nachricht
Benutzer 1 (Empfänger) ——— 0..* Nachricht`,
          criteria: [
            { text: 'Klasse Benutzer als abstrakt gekennzeichnet, mit benutzerId, email, passwortHash', points: 2 },
            { text: 'Mandant und Mitarbeiter erben von Benutzer (Vererbungspfeil zur Oberklasse)', points: 2 },
            { text: 'Mandant und Mitarbeiter mit ihren Zusatzattributen, Attribute private und mit Datentyp', points: 2 },
            { text: 'Klasse Beleg mit allen Attributen und Komposition zu Mandant, Raute beim Mandant', points: 2 },
            { text: 'Multiplizität Mandant 1 zu 0..* Beleg', points: 1 },
            { text: 'Klasse Termin mit Attributen und Aufzählungstyp Terminart (PRAESENZ, TELEFON, VIDEO)', points: 2 },
            { text: 'Termin jeweils mit Multiplizität 1 zu Mandant und 1 zu Mitarbeiter, Gegenseite 0..*', points: 1 },
            { text: 'Betreuung Mitarbeiter 1 zu 0..* Mandant', points: 1 },
            { text: 'Nachricht mit zwei Assoziationen (Absender, Empfänger) zu Benutzer', points: 1 },
            { text: 'Methoden mit Parametern und Rückgabetyp korrekt notiert (z. B. verschieben(neuerBeginn: DateTime): void)', points: 1 }
          ]
        },
        {
          id: 'b', points: 4,
          q: 'Bei einer neuen Nachricht sollen künftig mehrere Kanäle informiert werden (E-Mail, Push-Nachricht in einer späteren App, Zähler für ungelesene Nachrichten im Portal). Ihr Teamleiter schlägt dafür das Entwurfsmuster Observer vor. Erläutern Sie das Grundprinzip des Musters und nennen Sie zwei Vorteile für diesen Anwendungsfall.',
          kind: 'text',
          model: `Prinzip: Ein Subjekt (hier das Nachrichtenpostfach) verwaltet eine Liste von Beobachtern, die sich an- und abmelden können. Ändert sich der Zustand des Subjekts (neue Nachricht), ruft es bei allen angemeldeten Beobachtern eine einheitliche Methode auf (z. B. aktualisieren). Die Beobachter reagieren dann jeweils auf ihre Weise.

Vorteile:
- Lose Kopplung: Das Postfach kennt nur die Schnittstelle Beobachter, nicht die konkreten Kanäle.
- Erweiterbarkeit: Ein neuer Kanal (z. B. Push für die App) wird als neue Beobachterklasse ergänzt, ohne das Postfach zu ändern (Open-Closed-Prinzip).
- Beobachter können zur Laufzeit hinzugefügt oder entfernt werden, z. B. wenn ein Mandant E-Mail-Benachrichtigungen abschaltet.`,
          criteria: [
            { text: 'Subjekt verwaltet Beobachter, die sich an- und abmelden', points: 1 },
            { text: 'Bei Zustandsänderung werden alle Beobachter über eine gemeinsame Methode benachrichtigt', points: 1 },
            { text: 'Zwei zutreffende Vorteile genannt, z. B. lose Kopplung, Erweiterbarkeit, Änderung zur Laufzeit (je 1 Punkt)', points: 2 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'Stellen Sie die Umsetzung des Observer-Musters für die Benachrichtigungen als Klassendiagramm (zeichnen oder in Textform) dar. Verwenden Sie die Klasse Nachrichtenpostfach als konkretes Subjekt sowie mindestens zwei konkrete Beobachter.',
          kind: 'diagram',
          diagram: `classDiagram
  class Subjekt {
    <<interface>>
    +registrieren(b: Beobachter) void
    +entfernen(b: Beobachter) void
    +benachrichtigen(n: Nachricht) void
  }
  class Beobachter {
    <<interface>>
    +aktualisieren(n: Nachricht) void
  }
  class Nachrichtenpostfach {
    -beobachter: List~Beobachter~
    +nachrichtEmpfangen(n: Nachricht) void
  }
  class EmailBenachrichtigung {
    +aktualisieren(n: Nachricht) void
  }
  class PushBenachrichtigung {
    +aktualisieren(n: Nachricht) void
  }
  class UngelesenZaehler {
    -anzahl: int
    +aktualisieren(n: Nachricht) void
  }
  Subjekt <|.. Nachrichtenpostfach
  Beobachter <|.. EmailBenachrichtigung
  Beobachter <|.. PushBenachrichtigung
  Beobachter <|.. UngelesenZaehler
  Nachrichtenpostfach "1" o-- "0..*" Beobachter`,
          model: `«interface» Subjekt
  + registrieren(b: Beobachter): void
  + entfernen(b: Beobachter): void
  + benachrichtigen(n: Nachricht): void

«interface» Beobachter
  + aktualisieren(n: Nachricht): void

Nachrichtenpostfach - - -▷ Subjekt      (Realisierung)
  - beobachter: List<Beobachter>
  + nachrichtEmpfangen(n: Nachricht): void   // ruft benachrichtigen(n) auf

EmailBenachrichtigung - - -▷ Beobachter
  + aktualisieren(n: Nachricht): void
PushBenachrichtigung - - -▷ Beobachter
  + aktualisieren(n: Nachricht): void
UngelesenZaehler - - -▷ Beobachter
  - anzahl: int
  + aktualisieren(n: Nachricht): void

Nachrichtenpostfach 1 ◇——— 0..* Beobachter   (Aggregation bzw. Assoziation)`,
          criteria: [
            { text: 'Interface Beobachter mit Methode aktualisieren(...)', points: 1 },
            { text: 'Subjekt mit Methoden zum Registrieren, Entfernen und Benachrichtigen', points: 1 },
            { text: 'Nachrichtenpostfach hält eine Liste von Beobachtern', points: 1 },
            { text: 'Mindestens zwei konkrete Beobachter, die das Interface realisieren (gestrichelter Pfeil)', points: 2 },
            { text: 'Beziehung Postfach 1 zu 0..* Beobachter mit Multiplizität', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: IT-Sicherheit und Datenschutz', points: 25,
      intro: 'Steuerunterlagen sind besonders schützenswert. Ihr Teamleiter gibt Ihnen einen englischen Fachartikel zum sicheren Dateiupload und bittet Sie, das Sicherheitskonzept mitzugestalten.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Lesen Sie den englischen Fachtext. Nennen Sie vier im Text empfohlene Maßnahmen für einen sicheren Dateiupload und erläutern Sie jeweils in eigenen Worten auf Deutsch, welchen Zweck die Maßnahme erfüllt.',
          material: { code: `Secure File Uploads in Web Applications

File upload functions are one of the most common entry points for attacks
on web applications. An attacker may try to upload a script disguised as a
harmless document in order to execute code on the server. Therefore,
developers should never rely on the file extension alone, because it can be
changed easily by the user. Instead, the server should check the actual
content of the file, for example by reading its first bytes, the so-called
magic number. Only file types that are really needed, such as PDF, JPEG and
PNG, should be accepted by an allowlist. In addition, the maximum file size
should be limited to prevent attackers from filling up the storage or
slowing down the service. Uploaded files should be stored outside the web
root and renamed with a randomly generated name so that they cannot be
called directly via a URL. Every file should be scanned by an up-to-date
antivirus solution before employees are able to open it. Finally, all
upload attempts, including rejected ones, should be logged so that
suspicious activity can be detected early. Following these recommendations
does not guarantee complete security, but it significantly reduces the
attack surface.` },
          kind: 'text',
          model: `Vier der folgenden Maßnahmen:
- Inhaltsprüfung über die ersten Bytes (Magic Number): erkennt den echten Dateityp, auch wenn die Endung gefälscht ist, z. B. ein Skript mit Endung .pdf.
- Allowlist erlaubter Dateitypen (PDF, JPEG, PNG): nur benötigte Formate werden angenommen, alles andere wird abgelehnt, das verkleinert die Angriffsfläche.
- Begrenzung der maximalen Dateigröße: verhindert, dass Angreifer den Speicher füllen oder den Dienst verlangsamen (Denial of Service).
- Speicherung außerhalb des Web-Roots mit zufälligem Dateinamen: Dateien können nicht direkt per URL aufgerufen oder ausgeführt werden, Dateinamen sind nicht erratbar.
- Virenscan mit aktuellem Virenschutz vor dem Öffnen durch Mitarbeitende: Schadsoftware wird erkannt, bevor sie Kanzleirechner infiziert.
- Protokollierung aller Uploadversuche, auch abgelehnter: verdächtige Aktivitäten, z. B. viele abgelehnte Versuche, werden früh erkannt.`,
          criteria: [
            { text: 'Erste Maßnahme aus dem Text korrekt genannt und Zweck erläutert', points: 2 },
            { text: 'Zweite Maßnahme aus dem Text korrekt genannt und Zweck erläutert', points: 2 },
            { text: 'Dritte Maßnahme aus dem Text korrekt genannt und Zweck erläutert', points: 2 },
            { text: 'Vierte Maßnahme aus dem Text korrekt genannt und Zweck erläutert', points: 2 }
          ]
        },
        {
          id: 'b', points: 3,
          q: 'Erläutern Sie mithilfe des Textes, warum die Prüfung der Dateiendung allein nicht ausreicht, und geben Sie an, welche Aussage der Text zur Wirksamkeit aller Maßnahmen insgesamt trifft.',
          kind: 'text',
          model: `Die Dateiendung kann vom Benutzer beliebig umbenannt werden. Ein Angreifer kann so ein ausführbares Skript als harmloses Dokument tarnen, z. B. schadcode.php in rechnung.pdf umbenennen. Deshalb muss der tatsächliche Inhalt der Datei geprüft werden.
Laut letztem Satz garantieren die Maßnahmen keine vollständige Sicherheit, sie verringern aber die Angriffsfläche deutlich.`,
          criteria: [
            { text: 'Endung ist durch den Benutzer leicht änderbar bzw. fälschbar', points: 1 },
            { text: 'Folge: getarnte Skripte bzw. Schadcode könnten durchkommen, daher Inhaltsprüfung nötig', points: 1 },
            { text: 'Aussage erkannt: keine vollständige Sicherheit, aber deutlich reduzierte Angriffsfläche', points: 1 }
          ]
        },
        {
          id: 'c', points: 7,
          q: 'Die Passwörter der Portalnutzer sollen sicher gespeichert werden. a) Erläutern Sie den Unterschied zwischen Verschlüsselung und Hashing und begründen Sie, welches Verfahren für Passwörter eingesetzt wird. b) Erläutern Sie die Funktion eines Salts. c) Ein Kollege schlägt MD5 vor. Nehmen Sie Stellung und nennen Sie ein geeignetes Verfahren.',
          kind: 'text',
          model: `a) Verschlüsselung ist umkehrbar: Mit dem passenden Schlüssel erhält man den Klartext zurück. Hashing ist eine Einwegfunktion: Aus dem Hashwert lässt sich der Klartext nicht berechnen, gleiche Eingabe ergibt aber immer den gleichen Hash. Für Passwörter wird gehasht, denn das System muss das Passwort nie im Klartext kennen. Bei der Anmeldung wird das eingegebene Passwort erneut gehasht und mit dem gespeicherten Hash verglichen. Bei einem Datenbankdiebstahl liegen keine Klartextpasswörter vor.
b) Ein Salt ist ein zufälliger, pro Benutzer unterschiedlicher Wert, der vor dem Hashen an das Passwort angehängt und mit dem Hash gespeichert wird. Dadurch erhalten gleiche Passwörter unterschiedliche Hashes, und vorberechnete Tabellen (Rainbow Tables) werden wirkungslos.
c) MD5 ist ungeeignet: Es ist veraltet, kollisionsanfällig und vor allem extrem schnell berechenbar, sodass Brute-Force-Angriffe mit Grafikkarten Milliarden Versuche pro Sekunde schaffen. Geeignet sind langsame, speziell für Passwörter entwickelte Verfahren mit eingebautem Salt und einstellbarem Aufwand, z. B. Argon2id, bcrypt oder PBKDF2.`,
          criteria: [
            { text: 'Verschlüsselung umkehrbar mit Schlüssel, Hashing Einwegfunktion', points: 2 },
            { text: 'Begründet, dass Passwörter gehasht werden (Vergleich der Hashes, kein Klartext gespeichert)', points: 1 },
            { text: 'Salt als zufälliger Wert pro Benutzer erklärt, der mit dem Passwort gehasht wird', points: 1 },
            { text: 'Wirkung des Salts: gleiche Passwörter ergeben verschiedene Hashes, Rainbow Tables wirkungslos', points: 1 },
            { text: 'MD5 abgelehnt mit Begründung (zu schnell bzw. veraltet, Brute Force)', points: 1 },
            { text: 'Geeignetes Verfahren genannt (Argon2, bcrypt, scrypt oder PBKDF2)', points: 1 }
          ]
        },
        {
          id: 'd', points: 7,
          q: 'Das Portal wird beim externen Hosting-Anbieter betrieben. a) Erläutern Sie, welcher Vertrag nach DSGVO mit dem Hosting-Anbieter geschlossen werden muss und warum. b) Nennen Sie zwei technische oder organisatorische Maßnahmen (TOM) nach Art. 32 DSGVO, die für das Portal sinnvoll sind. c) Nennen Sie zwei Betroffenenrechte, die die Mandanten gegenüber der Kanzlei geltend machen können.',
          kind: 'text',
          model: `a) Ein Vertrag zur Auftragsverarbeitung (AV-Vertrag) nach Art. 28 DSGVO. Der Hosting-Anbieter verarbeitet personenbezogene Daten im Auftrag und nach Weisung der Kanzlei, die Kanzlei bleibt als Verantwortliche für den Datenschutz haftbar. Im Vertrag werden u. a. Gegenstand, Dauer, Weisungsbindung, Vertraulichkeit und die TOM des Anbieters festgelegt. Wegen der Verschwiegenheitspflicht der Steuerberater muss der Anbieter zusätzlich zur Verschwiegenheit verpflichtet werden.
b) Zum Beispiel: Transportverschlüsselung mit TLS, Verschlüsselung der gespeicherten Belege, Zwei-Faktor-Authentifizierung, rollenbasiertes Berechtigungskonzept, regelmäßige verschlüsselte Backups, Protokollierung der Zugriffe, Schulung der Mitarbeitenden.
c) Zum Beispiel: Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17, eingeschränkt durch gesetzliche Aufbewahrungsfristen), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21).`,
          criteria: [
            { text: 'Auftragsverarbeitungsvertrag (Art. 28 DSGVO) genannt', points: 1 },
            { text: 'Begründung: Anbieter verarbeitet Daten im Auftrag bzw. nach Weisung, Kanzlei bleibt verantwortlich', points: 2 },
            { text: 'Zwei passende TOM genannt (je 1 Punkt)', points: 2 },
            { text: 'Zwei Betroffenenrechte genannt (je 1 Punkt)', points: 2 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Schnittstelle und Wirtschaftlichkeit', points: 25,
      intro: 'Frontend und Backend kommunizieren über eine REST-API mit JSON. Zusätzlich möchte Frau Weller wissen, wann sich das Portal bezahlt macht.',
      sub: [
        {
          id: 'a', points: 6,
          q: 'Geben Sie für die folgenden Aktionen der Terminverwaltung jeweils die passende HTTP-Methode und einen ressourcenorientierten URI an. Die Basisadresse lautet /api/v1.',
          material: { table: [
            ['Nr.', 'Aktion'],
            ['1', 'Alle Termine des angemeldeten Mandanten abrufen'],
            ['2', 'Einen neuen Termin buchen'],
            ['3', 'Den Termin mit der ID 42 auf eine andere Uhrzeit verschieben'],
            ['4', 'Den Termin mit der ID 42 absagen']
          ]},
          kind: 'text',
          model: `1. GET    /api/v1/termine
2. POST   /api/v1/termine
3. PATCH  /api/v1/termine/42   (PUT ebenfalls richtig, wenn der komplette Termin gesendet wird)
4. DELETE /api/v1/termine/42

Ressourcenorientiert heißt: Substantive im Plural, die ID im Pfad, keine Verben wie /bucheTermin im URI. Die Aktion ergibt sich aus der HTTP-Methode. Alternativ /api/v1/mandanten/{id}/termine für die Liste.`,
          criteria: [
            { text: 'Aktion 1: GET', points: 1 },
            { text: 'Aktion 2: POST', points: 1 },
            { text: 'Aktion 3: PATCH oder PUT', points: 1 },
            { text: 'Aktion 4: DELETE', points: 1 },
            { text: 'URIs ressourcenorientiert: Substantiv, ID im Pfad, keine Verben', points: 2 }
          ]
        },
        {
          id: 'b', points: 5,
          q: 'Erstellen Sie den JSON-Body für die Buchung eines Termins mit folgenden Daten: Beginn am 14.11.2026 um 10:30 Uhr, Dauer 45 Minuten, Terminart VIDEO, Thema "Jahresabschluss 2025", Mitarbeiterkürzel "SW", mitzubesprechende Belege mit den IDs 1017 und 1023.',
          kind: 'code',
          model: `{
  "beginn": "2026-11-14T10:30:00",
  "dauerMin": 45,
  "art": "VIDEO",
  "thema": "Jahresabschluss 2025",
  "mitarbeiter": "SW",
  "belegIds": [1017, 1023]
}`,
          criteria: [
            { text: 'Gültige JSON-Syntax: geschweifte Klammern, Schlüssel in doppelten Anführungszeichen, Kommas korrekt', points: 2 },
            { text: 'Datentypen passend: Dauer als Zahl, Texte als String', points: 1 },
            { text: 'Datum und Uhrzeit sinnvoll als String, z. B. ISO 8601', points: 1 },
            { text: 'Beleg-IDs als Array', points: 1 }
          ]
        },
        {
          id: 'c', points: 4,
          q: 'Nennen Sie für die folgenden Situationen jeweils den passenden HTTP-Statuscode: 1. Der Termin wurde erfolgreich angelegt. 2. Die Anfrage enthält kein gültiges Zugriffstoken. 3. Der Termin mit der angefragten ID existiert nicht. 4. Der gewünschte Zeitslot ist bereits durch einen anderen Termin belegt.',
          kind: 'text',
          model: `1. 201 Created
2. 401 Unauthorized
3. 404 Not Found
4. 409 Conflict (422 Unprocessable Entity ist vertretbar)`,
          criteria: [
            { text: '201 für erfolgreich angelegt', points: 1 },
            { text: '401 für fehlendes bzw. ungültiges Token', points: 1 },
            { text: '404 für nicht vorhandenen Termin', points: 1 },
            { text: '409 (oder 422) für belegten Zeitslot', points: 1 }
          ]
        },
        {
          id: 'd', points: 10,
          q: 'a) Berechnen Sie mit den Kalkulationsdaten aus dem Material die jährliche Nettoersparnis und die Amortisationsdauer des Portals in Jahren und in Monaten. Der Rechenweg muss nachvollziehbar sein. b) Nennen Sie zwei nicht monetäre Vorteile, die in der Rechnung nicht enthalten sind.',
          kind: 'text',
          model: `a)
Eingesparte Arbeitszeit: 320 Mandanten × 0,25 h × 12 Monate = 960 h pro Jahr
Wert der Arbeitszeit:    960 h × 35 €/h = 33.600 € pro Jahr
+ Porto und Papier:                         4.800 € pro Jahr
− laufende Kosten:                          6.000 € pro Jahr
= Nettoersparnis:                          32.400 € pro Jahr

Amortisationsdauer = Investition / jährliche Nettoersparnis
                   = 48.000 € / 32.400 € ≈ 1,48 Jahre
                   ≈ 1,48 × 12 ≈ 17,8 Monate
Das Portal hat sich also nach rund 18 Monaten amortisiert.

b) Zum Beispiel: höhere Mandantenzufriedenheit und Mandantenbindung, modernes Image, schnellere und vollständigere Belegübermittlung, weniger Medienbrüche und Fehler, Belege rund um die Uhr übermittelbar, bessere Nachvollziehbarkeit, Entlastung der Telefonzentrale.`,
          criteria: [
            { text: 'Eingesparte Stunden korrekt: 960 h pro Jahr', points: 1 },
            { text: 'Monetärer Wert der Zeitersparnis korrekt: 33.600 €', points: 1 },
            { text: 'Porto addiert und laufende Kosten abgezogen: Nettoersparnis 32.400 €', points: 2 },
            { text: 'Formel Investition durch jährliche Ersparnis angewendet', points: 1 },
            { text: 'Ergebnis rund 1,48 Jahre', points: 1 },
            { text: 'Umrechnung in Monate: rund 17,8 bzw. 18 Monate', points: 1 },
            { text: 'Rechenweg nachvollziehbar mit Einheiten', points: 1 },
            { text: 'Zwei nicht monetäre Vorteile genannt (je 1 Punkt)', points: 2 }
          ]
        }
      ]
    }
  ]
},
{
  id: 'ga1_fall2',
  area: 'GA1',
  title: 'Fall 2: Lernplattform einer Berufsschule',
  minutes: 90,
  scenario: 'Die EduNova GmbH in Gießen entwickelt Software für Schulen und Bildungsträger. Der Landkreis als Schulträger hat sie beauftragt, für die Berufliche Schule am Rosenberg eine webbasierte Lernplattform zu entwickeln. Lehrkräfte sollen dort Kurse anlegen, Aufgaben mit Abgabefristen stellen und Abgaben bewerten, Schülerinnen und Schüler laden ihre Lösungen hoch und sehen ihre Ergebnisse. Bisher werden Abgaben per E-Mail eingesammelt und Punkte in Tabellenkalkulationen gepflegt. Da die Schule eine öffentliche Stelle ist, muss die Plattform barrierefrei sein. Sie sind Auszubildende bzw. Auszubildender zur Fachinformatikerin bzw. zum Fachinformatiker für Anwendungsentwicklung bei der EduNova GmbH und gehören zum Projektteam.',
  material: [
    { title: 'Vorgangsliste Projekt Lernplattform (Dauer in Arbeitstagen)', table: [
      ['Vorgang', 'Beschreibung', 'Dauer', 'Vorgänger'],
      ['A', 'Anforderungsanalyse', '5', '-'],
      ['B', 'Datenbankentwurf', '4', 'A'],
      ['C', 'UI-Entwurf und Mockups', '6', 'A'],
      ['D', 'Backend entwickeln', '10', 'B'],
      ['E', 'Frontend entwickeln', '8', 'C'],
      ['F', 'Schnittstelle zur Schulverwaltungssoftware', '5', 'B'],
      ['G', 'Integrationstest', '4', 'D, E, F'],
      ['H', 'Barrierefreiheitsprüfung', '3', 'E'],
      ['I', 'Schulung der Lehrkräfte', '2', 'G, H'],
      ['J', 'Go-live', '1', 'I']
    ]},
    { title: 'Fachbeschreibung Datenhaltung', code: `- Jede Schülerin bzw. jeder Schüler (Schülernummer, Vorname, Nachname, E-Mail)
  gehört zu genau einer Klasse (Klassenkürzel, z. B. FI24A, Ausbildungsberuf).
  Einer Klasse sind beliebig viele Schüler zugeordnet.
- Lehrkräfte (Personalnummer, Name, E-Mail) leiten Kurse. Ein Kurs (Kurs-ID,
  Titel, Lernfeld) wird von genau einer Lehrkraft geleitet, eine Lehrkraft
  kann beliebig viele Kurse leiten.
- Schüler können in beliebig viele Kurse eingeschrieben sein, ein Kurs hat
  beliebig viele Teilnehmer. Gespeichert wird das Einschreibedatum.
- Zu einem Kurs gehören beliebig viele Aufgaben (Aufgaben-ID, Titel, Frist,
  maximale Punktzahl). Jede Aufgabe gehört zu genau einem Kurs.
- Schüler reichen zu Aufgaben Abgaben ein. Pro Schüler und Aufgabe ist
  höchstens eine Abgabe möglich. Gespeichert werden Einreichungszeitpunkt,
  Dateipfad und erreichte Punkte.` },
    { title: 'Bisherige Punkteliste einer Lehrkraft (Auszug)', table: [
      ['SchuelerNr', 'Name', 'Klasse', 'Klassenlehrer', 'AufgabeNr', 'Aufgabentitel', 'Punkte'],
      ['1001', 'Lena Krüger', 'FI24A', 'Herr Sommer', 'A1', 'ER-Modell Bibliothek', '18'],
      ['1001', 'Lena Krüger', 'FI24A', 'Herr Sommer', 'A2', 'SQL-Abfragen Kino', '22'],
      ['1002', 'Can Yilmaz', 'FI24A', 'Herr Sommer', 'A1', 'ER-Modell Bibliothek', '15'],
      ['1003', 'Mia Wolf', 'FI24B', 'Frau Lange', 'A1', 'ER-Modell Bibliothek', '20']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Projektplanung mit Netzplan', points: 25,
      intro: 'Der Projektleiter bittet Sie, auf Basis der Vorgangsliste im Material die Termine zu berechnen. Rechnen Sie mit Projektstart zum Zeitpunkt 0: Der früheste Anfang eines Vorgangs entspricht dem größten frühesten Ende seiner Vorgänger.',
      sub: [
        {
          id: 'a', points: 10,
          q: 'Berechnen Sie für alle Vorgänge FAZ, FEZ, SAZ, SEZ und den Gesamtpuffer (GP). Stellen Sie die Ergebnisse in einer Tabelle in Textform dar.',
          kind: 'code',
          model: `Vorwärtsrechnung: FEZ = FAZ + Dauer, FAZ = größtes FEZ der Vorgänger
Rückwärtsrechnung: SAZ = SEZ − Dauer, SEZ = kleinstes SAZ der Nachfolger
GP = SAZ − FAZ

Vorgang | Dauer | FAZ | FEZ | SAZ | SEZ | GP
A       |   5   |   0 |   5 |   0 |   5 |  0
B       |   4   |   5 |   9 |   5 |   9 |  0
C       |   6   |   5 |  11 |   5 |  11 |  0
D       |  10   |   9 |  19 |   9 |  19 |  0
E       |   8   |  11 |  19 |  11 |  19 |  0
F       |   5   |   9 |  14 |  14 |  19 |  5
G       |   4   |  19 |  23 |  19 |  23 |  0
H       |   3   |  19 |  22 |  20 |  23 |  1
I       |   2   |  23 |  25 |  23 |  25 |  0
J       |   1   |  25 |  26 |  25 |  26 |  0

Hinweise: FAZ von G = max(19, 19, 14) = 19, FAZ von I = max(23, 22) = 23.
SEZ von E = min(SAZ G 19, SAZ H 20) = 19, SEZ von B = min(SAZ D 9, SAZ F 14) = 9.`,
          criteria: [
            { text: 'FAZ und FEZ von A bis F korrekt', points: 2 },
            { text: 'FAZ und FEZ von G bis J korrekt (insbesondere G = 19 als Maximum, I = 23)', points: 2 },
            { text: 'SAZ und SEZ von G bis J korrekt (insbesondere H: SAZ 20, SEZ 23)', points: 2 },
            { text: 'SAZ und SEZ von A bis F korrekt (insbesondere F: SAZ 14, SEZ 19)', points: 2 },
            { text: 'Gesamtpuffer korrekt: F = 5, H = 1, alle anderen 0', points: 2 }
          ]
        },
        {
          id: 'b', points: 4,
          q: 'Geben Sie die Projektdauer an und nennen Sie den kritischen Pfad bzw. die kritischen Pfade. Erläutern Sie kurz, was einen kritischen Vorgang kennzeichnet.',
          kind: 'text',
          model: `Projektdauer: 26 Arbeitstage.
Es gibt zwei kritische Pfade:
A → B → D → G → I → J  (5 + 4 + 10 + 4 + 2 + 1 = 26)
A → C → E → G → I → J  (5 + 6 + 8 + 4 + 2 + 1 = 26)
Ein kritischer Vorgang hat einen Gesamtpuffer von 0 (FAZ = SAZ). Jede Verzögerung verschiebt direkt das Projektende.`,
          criteria: [
            { text: 'Projektdauer 26 Tage', points: 1 },
            { text: 'Pfad A, B, D, G, I, J als kritisch erkannt', points: 1 },
            { text: 'Pfad A, C, E, G, I, J als kritisch erkannt', points: 1 },
            { text: 'Kritischer Vorgang: Puffer 0, Verzögerung verschiebt das Projektende', points: 1 }
          ]
        },
        {
          id: 'c', points: 5,
          q: 'Ermitteln Sie den freien Puffer der Vorgänge F und H. Beurteilen Sie anschließend die Auswirkung auf das Projektende, wenn sich (1) die Schnittstelle F um 3 Tage und (2) die Barrierefreiheitsprüfung H um 2 Tage verzögert. Die beiden Fälle sind unabhängig voneinander zu betrachten.',
          kind: 'text',
          model: `Freier Puffer FP = kleinstes FAZ der Nachfolger − FEZ des Vorgangs
F: FAZ von G (19) − FEZ von F (14) = 5 Tage
H: FAZ von I (23) − FEZ von H (22) = 1 Tag

(1) F verzögert sich um 3 Tage: 3 ≤ 5 Tage Puffer, F endet an Tag 17 statt 14. Kein Einfluss auf G und auf das Projektende (bleibt 26).
(2) H verzögert sich um 2 Tage: Puffer nur 1 Tag. H endet an Tag 24 statt 22, I kann erst an Tag 24 beginnen. Das Projekt verlängert sich um 1 Tag auf 27 Arbeitstage.`,
          criteria: [
            { text: 'Freier Puffer F = 5 Tage', points: 1 },
            { text: 'Freier Puffer H = 1 Tag', points: 1 },
            { text: 'Fall 1: keine Auswirkung auf das Projektende, mit Begründung über den Puffer', points: 1 },
            { text: 'Fall 2: Projektende verschiebt sich um 1 Tag auf 27 Tage', points: 2 }
          ]
        },
        {
          id: 'd', points: 6,
          q: 'Der Projektleiter möchte das Projekt nach dem Wasserfallmodell durchführen, weil sich dafür ein Netzplan gut erstellen lässt. Eine Kollegin schlägt Scrum vor. Nennen Sie zwei Vorteile von Scrum für dieses Projekt und erläutern Sie eine Voraussetzung, unter der das Wasserfallmodell trotzdem sinnvoll wäre.',
          kind: 'text',
          model: `Vorteile von Scrum hier:
- Lehrkräfte und Schüler können früh lauffähige Teilergebnisse testen (z. B. Abgabefunktion nach dem ersten Sprint), Feedback fließt direkt ein.
- Anforderungen, die sich erst im Schulalltag zeigen, z. B. zusätzliche Bewertungsformen, lassen sich im Backlog flexibel neu priorisieren.
- Risiken wie die Barrierefreiheit oder die Schnittstelle zur Schulverwaltung werden früh sichtbar statt erst am Ende.
- Regelmäßige Reviews erhöhen die Akzeptanz bei den späteren Nutzern.

Wasserfall wäre sinnvoll, wenn die Anforderungen zu Projektbeginn vollständig, eindeutig und stabil sind, z. B. weil der Landkreis ein verbindliches Pflichtenheft mit Festpreis und festem Termin vorgibt. Dann sind die Phasen gut planbar und die Abnahme erfolgt einmal gegen das Pflichtenheft.`,
          criteria: [
            { text: 'Erster Vorteil von Scrum mit Bezug zum Projekt', points: 2 },
            { text: 'Zweiter Vorteil von Scrum mit Bezug zum Projekt', points: 2 },
            { text: 'Voraussetzung für Wasserfall: stabile, vollständig bekannte Anforderungen (z. B. festes Pflichtenheft)', points: 1 },
            { text: 'Voraussetzung nachvollziehbar erläutert (z. B. Festpreis, feste Abnahme, gute Planbarkeit)', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: Datenmodellierung', points: 25,
      intro: 'Grundlage ist die Fachbeschreibung zur Datenhaltung im Material. Die bisherige Punkteliste einer Lehrkraft soll abgelöst werden.',
      sub: [
        {
          id: 'a', points: 9,
          q: 'Erstellen Sie ein Entity-Relationship-Modell (zeichnen oder in Textform). Geben Sie alle Entitäten mit Primärschlüssel, die Beziehungen mit Namen und Kardinalitäten (1:n, n:m) sowie Attribute an Beziehungen an.',
          kind: 'diagram',
          diagram: `erDiagram
  KLASSE ||--o{ SCHUELER : "gehört zu"
  LEHRKRAFT ||--o{ KURS : "leitet"
  SCHUELER }o--o{ KURS : "eingeschrieben in (Einschreibedatum)"
  KURS ||--o{ AUFGABE : "enthält"
  SCHUELER }o--o{ AUFGABE : "reicht ein (Einreichungszeitpunkt, Dateipfad, Punkte)"
  KLASSE {
    string Klassenkuerzel PK
    string Ausbildungsberuf
  }
  SCHUELER {
    int SchuelerNr PK
    string Vorname
    string Nachname
    string EMail
  }
  LEHRKRAFT {
    int PersonalNr PK
    string Name
    string EMail
  }
  KURS {
    int KursID PK
    string Titel
    string Lernfeld
  }
  AUFGABE {
    int AufgabeID PK
    string Titel
    datetime Frist
    int MaxPunkte
  }`,
          model: `Entitäten (Primärschlüssel in _Unterstrichen_):
Klasse(_Klassenkuerzel_, Ausbildungsberuf)
Schueler(_SchuelerNr_, Vorname, Nachname, EMail)
Lehrkraft(_PersonalNr_, Name, EMail)
Kurs(_KursID_, Titel, Lernfeld)
Aufgabe(_AufgabeID_, Titel, Frist, MaxPunkte)

Beziehungen:
Klasse    1 —— <gehört zu>  —— n Schueler
Lehrkraft 1 —— <leitet>     —— n Kurs
Schueler  n —— <eingeschrieben in> —— m Kurs    Attribut: Einschreibedatum
Kurs      1 —— <enthält>    —— n Aufgabe
Schueler  n —— <reicht ein> —— m Aufgabe        Attribute: Einreichungszeitpunkt, Dateipfad, Punkte`,
          criteria: [
            { text: 'Alle fünf Entitäten mit passendem Primärschlüssel', points: 2 },
            { text: 'Beziehungen sinnvoll benannt', points: 1 },
            { text: 'Klasse–Schüler, Lehrkraft–Kurs und Kurs–Aufgabe jeweils als 1:n mit 1 auf der richtigen Seite', points: 2 },
            { text: 'Schüler–Kurs und Schüler–Aufgabe als n:m', points: 2 },
            { text: 'Einschreibedatum bzw. Einreichungszeitpunkt, Dateipfad, Punkte als Attribute der n:m-Beziehungen', points: 2 }
          ]
        },
        {
          id: 'b', points: 9,
          q: 'Überführen Sie Ihr ER-Modell in ein relationales Datenbankmodell in Textform. Kennzeichnen Sie Primärschlüssel (unterstrichen, z. B. _ID_) und Fremdschlüssel (z. B. mit ↑).',
          kind: 'code',
          model: `Klasse(_Klassenkuerzel_, Ausbildungsberuf)
Schueler(_SchuelerNr_, Vorname, Nachname, EMail, ↑Klassenkuerzel)
Lehrkraft(_PersonalNr_, Name, EMail)
Kurs(_KursID_, Titel, Lernfeld, ↑PersonalNr)
Aufgabe(_AufgabeID_, Titel, Frist, MaxPunkte, ↑KursID)
Einschreibung(_↑SchuelerNr_, _↑KursID_, Einschreibedatum)
Abgabe(_↑SchuelerNr_, _↑AufgabeID_, Einreichungszeitpunkt, Dateipfad, Punkte)

Regel: Bei 1:n wandert der Fremdschlüssel auf die n-Seite, n:m wird über eine eigene Tabelle mit zusammengesetztem Primärschlüssel aufgelöst. Der zusammengesetzte Schlüssel in Abgabe stellt sicher, dass pro Schüler und Aufgabe höchstens eine Abgabe existiert.`,
          criteria: [
            { text: 'Tabellen Klasse, Schueler, Lehrkraft, Kurs, Aufgabe mit korrektem Primärschlüssel', points: 2 },
            { text: 'Fremdschlüssel Klassenkuerzel in Schueler', points: 1 },
            { text: 'Fremdschlüssel PersonalNr in Kurs', points: 1 },
            { text: 'Fremdschlüssel KursID in Aufgabe', points: 1 },
            { text: 'Zwischentabelle Einschreibung mit zusammengesetztem PK aus beiden Fremdschlüsseln und Einschreibedatum', points: 2 },
            { text: 'Tabelle Abgabe mit zusammengesetztem PK (SchuelerNr, AufgabeID) und den drei Attributen', points: 2 }
          ]
        },
        {
          id: 'c', points: 7,
          q: 'Die bisherige Punkteliste (Material) ist nicht normalisiert. Erläutern Sie anhand konkreter Daten aus dem Auszug je ein Beispiel für eine Änderungs-, eine Einfüge- und eine Löschanomalie. Nennen Sie außerdem eine Normalform, gegen die die Liste verstößt, mit Begründung.',
          kind: 'text',
          model: `Änderungsanomalie: Ändert sich der Nachname von Lena Krüger oder wechselt der Klassenlehrer der FI24A, muss der Wert in mehreren Zeilen geändert werden. Wird eine Zeile vergessen, ist der Datenbestand widersprüchlich (z. B. Herr Sommer in Zeile 1, neuer Klassenlehrer in Zeile 3).
Einfügeanomalie: Eine neue Aufgabe A3 oder ein neuer Schüler ohne bisherige Abgabe kann nicht erfasst werden, weil der Schlüssel aus SchuelerNr und AufgabeNr unvollständig wäre bzw. leere Felder entstehen.
Löschanomalie: Wird die einzige Zeile von Mia Wolf gelöscht, geht auch die Information verloren, dass Frau Lange Klassenlehrerin der FI24B ist.

Normalform: Verstoß gegen die 2. NF, weil Name, Klasse und Klassenlehrer nur von SchuelerNr und Aufgabentitel nur von AufgabeNr abhängen, also nur von einem Teil des zusammengesetzten Schlüssels (SchuelerNr, AufgabeNr). Ebenso Verstoß gegen die 3. NF: Klassenlehrer hängt transitiv über Klasse vom Schlüssel ab. Streng genommen ist schon die 1. NF verletzt, weil Name Vor- und Nachname in einem Feld enthält (nicht atomar).`,
          criteria: [
            { text: 'Änderungsanomalie mit konkretem Beispiel aus dem Auszug', points: 2 },
            { text: 'Einfügeanomalie mit konkretem Beispiel', points: 2 },
            { text: 'Löschanomalie mit konkretem Beispiel (z. B. Mia Wolf, FI24B, Frau Lange)', points: 2 },
            { text: 'Verletzte Normalform korrekt benannt und begründet (2. NF partielle Abhängigkeit oder 3. NF transitive Abhängigkeit; 1. NF wegen nicht atomarem Feld Name ebenfalls richtig)', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: Benutzungsoberfläche und Qualität', points: 25,
      intro: 'Als Nächstes entwerfen Sie die Seite, auf der Schüler eine Lösung zu einer Aufgabe abgeben.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Beschreiben Sie ein Mockup der Seite "Aufgabe abgeben" in Textform. Nennen Sie die Bereiche der Seite von oben nach unten mit den enthaltenen Inhalten und Steuerelementen. Begründen Sie die Wahl von zwei Steuerelementen.',
          kind: 'text',
          model: `Aufbau von oben nach unten:
1. Kopfzeile: Logo der Schule, Navigation (Kurse, Aufgaben, Ergebnisse), Name des angemeldeten Schülers, Abmelden-Link.
2. Breadcrumb: Kurse > LF 8 Daten systemübergreifend bereitstellen > Aufgabe A2.
3. Aufgabeninfo: Titel, Aufgabentext, Frist "15.03.2026, 23:59 Uhr" mit Restzeit, maximale Punktzahl, Lehrkraft.
4. Upload-Bereich: Schaltfläche "Datei auswählen" plus Drag-and-drop-Feld, Hinweis "PDF, DOCX oder ZIP, max. 20 MB", Liste der gewählten Dateien mit Entfernen-Symbol.
5. Mehrzeiliges Textfeld "Kommentar an die Lehrkraft (optional)".
6. Kontrollkästchen "Ich versichere, dass ich die Aufgabe selbstständig bearbeitet habe" (Pflicht).
7. Schaltflächen: primär "Abgeben" (erst aktiv, wenn Datei gewählt und Häkchen gesetzt), sekundär "Abbrechen".
8. Statusbereich: Bestätigung "Abgabe am ... eingegangen" bzw. verständliche Fehlermeldung.

Begründungen (Beispiele):
- Kontrollkästchen für die Versicherung: ja/nein-Entscheidung, die aktiv bestätigt werden muss, ein Optionsfeld wäre unpassend.
- Mehrzeiliges Textfeld für den Kommentar: Freitext beliebiger Länge, ein einzeiliges Feld wäre zu klein.
- Dateiauswahl-Schaltfläche zusätzlich zu Drag and drop: per Tastatur und Screenreader bedienbar, Drag and drop allein wäre nicht barrierefrei.
- Deaktivierte Abgeben-Schaltfläche: verhindert unvollständige Abgaben (Robustheit gegen Benutzungsfehler, früher Fehlertoleranz).`,
          criteria: [
            { text: 'Navigation bzw. Kopfbereich und Orientierung (z. B. Breadcrumb) vorhanden', points: 1 },
            { text: 'Aufgabeninformationen mit Frist und Punktzahl angezeigt', points: 1 },
            { text: 'Upload-Steuerelement mit Hinweis auf erlaubte Dateitypen bzw. Größe', points: 1 },
            { text: 'Kommentarfeld und Bestätigungs-Kontrollkästchen vorgesehen', points: 1 },
            { text: 'Schaltflächen Abgeben und Abbrechen sowie Rückmeldung nach dem Absenden', points: 2 },
            { text: 'Zwei Steuerelemente nachvollziehbar begründet (je 1 Punkt)', points: 2 }
          ]
        },
        {
          id: 'b', points: 6,
          q: 'Nennen Sie drei Grundsätze der Interaktionsgestaltung nach DIN EN ISO 9241-110 und beschreiben Sie zu jedem eine konkrete Umsetzung auf der Seite "Aufgabe abgeben".',
          kind: 'text',
          model: `Drei der folgenden:
- Aufgabenangemessenheit: Alle für die Abgabe nötigen Informationen (Frist, Dateitypen) stehen auf einer Seite, keine unnötigen Felder.
- Selbstbeschreibungsfähigkeit: Beschriftete Felder, Hinweis "max. 20 MB, PDF/DOCX/ZIP", Restzeit bis zur Frist wird angezeigt.
- Erwartungskonformität: Primäre Schaltfläche rechts unten und einheitlich gestaltet wie auf allen anderen Seiten, übliche Symbole.
- Erlernbarkeit (früher Lernförderlichkeit): Kurze Hilfetexte bzw. Tooltips beim ersten Upload.
- Steuerbarkeit: Gewählte Datei kann vor dem Absenden entfernt oder ersetzt werden, Abbrechen jederzeit möglich, Upload-Fortschritt sichtbar.
- Robustheit gegen Benutzungsfehler (früher Fehlertoleranz): Falscher Dateityp wird vor dem Upload mit verständlicher Meldung abgelehnt, Abgeben erst aktiv, wenn alles ausgefüllt ist.
- Benutzerbindung (2020 neu aufgenommen; die frühere Individualisierbarkeit ist in der Steuerbarkeit aufgegangen): ansprechende, motivierende Gestaltung, z. B. positive Bestätigung nach erfolgreicher Abgabe.`,
          criteria: [
            { text: 'Erster Grundsatz korrekt benannt mit passender konkreter Umsetzung', points: 2 },
            { text: 'Zweiter Grundsatz korrekt benannt mit passender konkreter Umsetzung', points: 2 },
            { text: 'Dritter Grundsatz korrekt benannt mit passender konkreter Umsetzung', points: 2 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'Die Plattform muss barrierefrei sein. Nennen Sie die für die Schule als öffentliche Stelle maßgebliche rechtliche Grundlage bzw. den technischen Standard und beschreiben Sie vier konkrete Maßnahmen zur Barrierefreiheit der Lernplattform.',
          kind: 'text',
          model: `Rechtliche Grundlage: Für öffentliche Stellen gilt die Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) bzw. die entsprechende Landesregelung. Technischer Standard ist die EN 301 549, die auf die WCAG 2.1 Konformitätsstufe AA verweist.

Maßnahmen (vier davon):
- Ausreichender Farbkontrast (mind. 4,5:1 für normalen Text), Informationen nie nur über Farbe, z. B. "Frist überschritten" zusätzlich als Text.
- Vollständige Bedienbarkeit per Tastatur mit sichtbarem Fokus, auch für den Datei-Upload.
- Alternativtexte für Bilder und Symbole sowie korrekte HTML-Struktur (Überschriften, Labels an Formularfeldern) für Screenreader.
- Skalierbare Schrift bis 200 % ohne Informationsverlust, responsives Layout.
- Verständliche Fehlermeldungen in einfacher Sprache, die das Problem und die Lösung nennen.
- Untertitel bzw. Transkripte für Lernvideos.
- Zeitlimits vermeiden oder verlängerbar machen, z. B. kein automatischer Logout während des Uploads.`,
          criteria: [
            { text: 'BITV 2.0 (bzw. Landesrecht für öffentliche Stellen) oder WCAG 2.1 AA bzw. EN 301 549 genannt', points: 2 },
            { text: 'Vier konkrete, unterschiedliche Maßnahmen beschrieben (je 1 Punkt)', points: 4 }
          ]
        },
        {
          id: 'd', points: 5,
          q: 'Ordnen Sie den folgenden Anforderungen jeweils ein Qualitätsmerkmal nach ISO/IEC 25010 zu. Nennen Sie für zwei der Anforderungen eine Maßnahme, mit der die Erfüllung sichergestellt bzw. überprüft werden kann. 1. Am Abgabetag sollen bis zu 600 Schüler gleichzeitig hochladen können, ohne dass die Antwortzeit über 3 Sekunden steigt. 2. Schüler- und Klassendaten sollen automatisch aus der vorhandenen Schulverwaltungssoftware übernommen werden. 3. Neue Bewertungsarten sollen später mit geringem Aufwand ergänzt werden können.',
          kind: 'text',
          model: `1. Leistungseffizienz (Zeitverhalten, Kapazität). Maßnahme: Lasttest mit 600 simulierten Nutzern, horizontale Skalierung, Caching.
2. Kompatibilität (Interoperabilität). Maßnahme: dokumentierte Schnittstelle mit Standardformat (z. B. REST/JSON oder CSV-Import), Integrationstests mit Testdaten der Schulverwaltung.
3. Wartbarkeit (Modifizierbarkeit, Modularität). Maßnahme: modulare Architektur, z. B. Bewertungsart über ein Interface bzw. Strategy-Muster, Clean Code, Unit-Tests, Dokumentation.`,
          criteria: [
            { text: 'Anforderung 1: Leistungseffizienz', points: 1 },
            { text: 'Anforderung 2: Kompatibilität bzw. Interoperabilität', points: 1 },
            { text: 'Anforderung 3: Wartbarkeit', points: 1 },
            { text: 'Zwei passende Maßnahmen genannt (je 1 Punkt)', points: 2 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Betriebsentscheidung und Auswertungslogik', points: 25,
      intro: 'Der Landkreis muss entscheiden, wo die Plattform betrieben wird. Zusätzlich soll für die Kursübersicht eine Auswertungsfunktion entworfen werden.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Für den Betrieb stehen zwei Alternativen zur Wahl: A: eigener Server im Rechenzentrum des Landkreises, B: Cloud-Hosting bei einem Anbieter mit Rechenzentrum in Deutschland. Das Gewicht des Kriteriums Wartungsaufwand fehlt in der Tabelle. Ermitteln Sie das fehlende Gewicht, führen Sie die Nutzwertanalyse durch und geben Sie eine Empfehlung ab. Bewertung: 1 (schlecht) bis 10 (sehr gut).',
          material: { table: [
            ['Kriterium', 'Gewicht', 'Bewertung A', 'Bewertung B'],
            ['Datenschutz und Datenhoheit', '35 %', '9', '7'],
            ['Kosten', '25 %', '6', '7'],
            ['Verfügbarkeit', '20 %', '6', '9'],
            ['Wartungsaufwand (hoch bewertet = wenig Aufwand)', '?', '4', '9']
          ]},
          kind: 'text',
          model: `Fehlendes Gewicht: 100 % − 35 % − 25 % − 20 % = 20 %

Kriterium        Gewicht | A Bew. | A Nutzen | B Bew. | B Nutzen
Datenschutz        0,35  |   9    |   3,15   |   7    |   2,45
Kosten             0,25  |   6    |   1,50   |   7    |   1,75
Verfügbarkeit      0,20  |   6    |   1,20   |   9    |   1,80
Wartungsaufwand    0,20  |   4    |   0,80   |   9    |   1,80
Summe                             |   6,65   |          |   7,80

Empfehlung: Alternative B (Cloud-Hosting in Deutschland) hat mit 7,80 den höheren Nutzwert als A mit 6,65 und sollte gewählt werden. Voraussetzung ist ein AV-Vertrag nach Art. 28 DSGVO mit dem Anbieter.`,
          criteria: [
            { text: 'Fehlendes Gewicht 20 % ermittelt', points: 1 },
            { text: 'Teilnutzwerte A korrekt (3,15; 1,50; 1,20; 0,80)', points: 2 },
            { text: 'Teilnutzwerte B korrekt (2,45; 1,75; 1,80; 1,80)', points: 2 },
            { text: 'Summen korrekt: A = 6,65 und B = 7,80', points: 2 },
            { text: 'Empfehlung für B aus dem Ergebnis abgeleitet', points: 1 }
          ]
        },
        {
          id: 'b', points: 2,
          q: 'Nennen Sie zwei Schwächen der Nutzwertanalyse.',
          kind: 'text',
          model: `- Gewichtung und Bewertung sind subjektiv und können das Ergebnis gezielt beeinflussen.
- Kriterien können sich überschneiden (z. B. Kosten und Wartungsaufwand), dadurch werden Aspekte doppelt gewertet.
- Scheingenauigkeit: Nachkommastellen täuschen eine Exaktheit vor, die die Punktbewertung nicht hat.
- Ein K.-o.-Kriterium (z. B. Datenschutz nicht erfüllt) kann durch gute Werte bei anderen Kriterien ausgeglichen werden.`,
          criteria: [
            { text: 'Zwei zutreffende Schwächen genannt (je 1 Punkt)', points: 2 }
          ]
        },
        {
          id: 'c', points: 12,
          q: 'Entwickeln Sie in Pseudocode die Funktion durchschnittPuenktlich(abgaben, frist). Sie erhält eine Liste von Objekten der Klasse Abgabe und den Fristzeitpunkt. Zurückgegeben wird der Durchschnitt der Punkte aller Abgaben, die rechtzeitig (eingereicht am oder vor der Frist) eingereicht und bereits bewertet wurden. Gibt es keine solche Abgabe, wird -1 zurückgegeben. Zeitpunkte können mit <, <=, > und >= verglichen werden.',
          material: { code: `Klasse Abgabe (Auszug)
+ getEingereichtAm(): DatumZeit   // null, falls noch nicht eingereicht
+ getPunkte(): int                // -1, falls noch nicht bewertet

Rückgabetyp der Funktion: Kommazahl` },
          kind: 'code',
          model: `funktion durchschnittPuenktlich(abgaben, frist)
  summe = 0
  anzahl = 0
  für jede abgabe in abgaben
    zeitpunkt = abgabe.getEingereichtAm()
    falls zeitpunkt != null und zeitpunkt <= frist und abgabe.getPunkte() >= 0 dann
      summe = summe + abgabe.getPunkte()
      anzahl = anzahl + 1
    ende falls
  ende für
  falls anzahl == 0 dann
    rückgabe -1
  ende falls
  rückgabe summe / anzahl
ende funktion`,
          criteria: [
            { text: 'Summe und Zähler vor der Schleife mit 0 initialisiert', points: 2 },
            { text: 'Schleife läuft über alle Elemente der Liste abgaben', points: 2 },
            { text: 'Prüfung auf null (nicht eingereicht) vor dem Vergleich mit der Frist', points: 2 },
            { text: 'Vergleich Einreichungszeitpunkt <= frist (Abgabe genau zur Frist zählt als rechtzeitig)', points: 1 },
            { text: 'Unbewertete Abgaben (Punkte -1) werden ausgeschlossen', points: 1 },
            { text: 'Summe und Zähler nur innerhalb der Bedingung erhöht', points: 1 },
            { text: 'Sonderfall anzahl == 0 liefert -1, keine Division durch null', points: 2 },
            { text: 'Rückgabe summe / anzahl', points: 1 }
          ]
        },
        {
          id: 'd', points: 3,
          q: 'Ermitteln Sie mit einem Schreibtischtest, welchen Wert Ihre Funktion für die folgenden Abgaben zurückgibt. Die Frist ist der 15.03.2026, 23:59 Uhr. Geben Sie für jede Abgabe an, ob sie gezählt wird.',
          material: { table: [
            ['Abgabe', 'getEingereichtAm()', 'getPunkte()'],
            ['1', '14.03.2026 18:00', '80'],
            ['2', 'null', '-1'],
            ['3', '15.03.2026 23:50', '65'],
            ['4', '16.03.2026 08:10', '90'],
            ['5', '13.03.2026 10:00', '-1'],
            ['6', '15.03.2026 12:00', '74']
          ]},
          kind: 'text',
          model: `1: rechtzeitig, bewertet → gezählt (summe 80, anzahl 1)
2: nicht eingereicht → nicht gezählt
3: 23:50 vor 23:59, bewertet → gezählt (summe 145, anzahl 2)
4: nach der Frist → nicht gezählt
5: rechtzeitig, aber unbewertet → nicht gezählt
6: rechtzeitig, bewertet → gezählt (summe 219, anzahl 3)

Rückgabe: 219 / 3 = 73`,
          criteria: [
            { text: 'Abgaben 1, 3 und 6 als gezählt erkannt', points: 1 },
            { text: 'Abgaben 2, 4 und 5 mit passendem Grund ausgeschlossen', points: 1 },
            { text: 'Ergebnis 219 / 3 = 73', points: 1 }
          ]
        }
      ]
    }
  ]
}
];
