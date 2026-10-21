// GA2-Prüfungsfälle: Entwicklung und Umsetzung von Algorithmen (je 90 Minuten, 4 x 25 Punkte)
const CASES_GA2 = [
// =====================================================================
// FALL 1: Steuerkanzlei-Software
// =====================================================================
{
  id: 'ga2_fall1',
  area: 'GA2',
  title: 'Fall 1: Belegportal einer Steuerkanzlei',
  minutes: 90,
  scenario: 'Die Steuerkanzlei Hartwig & Kollegen in Fulda betreut rund 400 Mandanten, vom Einzelunternehmen bis zur GmbH. Bisher reichen die Mandanten ihre Belege per Post oder E-Mail ein, die Mitarbeiter erfassen sie von Hand. Die Kanzlei lässt deshalb von ihrer internen Entwicklungsabteilung das Belegportal "BelegFlow" entwickeln: Mandanten laden Belege hoch, das System erkennt Beträge, prüft auf Dubletten und ordnet die Belege den Aufträgen zu. Zusätzlich sollen Zeiterfassung, Auftragsauswertungen und eine Fristenkontrolle integriert werden. Sie sind Auszubildende(r) zum Fachinformatiker für Anwendungsentwicklung und arbeiten im Projektteam mit. Die relationale Datenbank existiert bereits in Teilen (siehe Material).',
  material: [
    { title: 'Tabellenmodell (Primärschlüssel unterstrichen gedacht: jeweils erstes Attribut, Fremdschlüssel mit ↑)', code: `Mandant(MandantID, Name, Rechtsform, Ort)
Mitarbeiter(MitarbeiterID, Name, Rolle, Stundensatz)
Auftrag(AuftragID, MandantID↑, MitarbeiterID↑, Art, Jahr, Status, Honorar)
Zeiterfassung(ZeitID, AuftragID↑, MitarbeiterID↑, Datum, Stunden)
Beleg(BelegID, MandantID↑, Datum, Betrag, Kategorie, Gebucht)

Gebucht: 1 = gebucht, 0 = noch nicht gebucht
Status in Auftrag: 'offen', 'in Arbeit', 'erledigt'` },
    { title: 'Tabelle Mandant', table: [
      ['MandantID','Name','Rechtsform','Ort'],
      ['101','Bäckerei Hahn','Einzelunternehmen','Fulda'],
      ['102','Autohaus Brandt GmbH','GmbH','Fulda'],
      ['103','Praxis Dr. Lenz','Freiberufler','Hünfeld'],
      ['104','Metallbau Stein GmbH','GmbH','Erfurt'],
      ['105','Café Rosa','Einzelunternehmen','Erfurt'],
      ['106','Kfz-Teile Ruf KG','KG','Fulda'],
      ['107','IT-Service Kraus','Einzelunternehmen','Petersberg']
    ]},
    { title: 'Tabelle Mitarbeiter', table: [
      ['MitarbeiterID','Name','Rolle','Stundensatz'],
      ['1','Anna Keller','Steuerberaterin','140.00'],
      ['2','Tom Weiß','Steuerfachangestellter','75.00'],
      ['3','Lea Schmitt','Steuerfachangestellte','75.00'],
      ['4','Jonas Vogt','Lohnbuchhalter','70.00'],
      ['5','Mia Berger','Auszubildende','35.00'],
      ['6','Paul Arnold','Steuerberater','140.00']
    ]},
    { title: 'Tabelle Auftrag', table: [
      ['AuftragID','MandantID','MitarbeiterID','Art','Jahr','Status','Honorar'],
      ['5001','101','2','Finanzbuchhaltung','2026','offen','1800.00'],
      ['5002','101','1','Jahresabschluss','2025','erledigt','3200.00'],
      ['5003','102','1','Jahresabschluss','2025','erledigt','6500.00'],
      ['5004','102','4','Lohnabrechnung','2026','offen','2400.00'],
      ['5005','103','3','Einkommensteuer','2025','in Arbeit','950.00'],
      ['5006','104','6','Jahresabschluss','2025','in Arbeit','5200.00'],
      ['5007','104','2','Finanzbuchhaltung','2026','offen','2100.00'],
      ['5008','105','3','Finanzbuchhaltung','2026','offen','900.00'],
      ['5009','106','6','Jahresabschluss','2025','erledigt','4100.00']
    ]},
    { title: 'Tabelle Zeiterfassung', table: [
      ['ZeitID','AuftragID','MitarbeiterID','Datum','Stunden'],
      ['1','5002','1','2026-03-02','6.0'],
      ['2','5002','5','2026-03-03','4.0'],
      ['3','5003','1','2026-03-10','12.0'],
      ['4','5003','2','2026-03-11','8.0'],
      ['5','5005','3','2026-04-07','5.5'],
      ['6','5006','6','2026-04-14','10.0'],
      ['7','5006','5','2026-04-15','6.0'],
      ['8','5009','6','2026-05-05','9.0'],
      ['9','5004','4','2026-05-20','3.5'],
      ['10','5001','2','2026-06-01','7.0']
    ]},
    { title: 'Tabelle Beleg', table: [
      ['BelegID','MandantID','Datum','Betrag','Kategorie','Gebucht'],
      ['9001','101','2026-01-15','420.00','Wareneinkauf','1'],
      ['9002','101','2026-01-15','420.00','Wareneinkauf','0'],
      ['9003','101','2026-02-03','89.90','Büromaterial','1'],
      ['9004','102','2026-02-10','1250.00','Werkstatt','1'],
      ['9005','101','2026-02-28','1310.00','Miete','1'],
      ['9006','104','2026-03-01','640.00','Material','0'],
      ['9007','101','2026-03-12','55.00','Büromaterial','0'],
      ['9008','102','2026-02-10','1250.00','Werkstatt','0'],
      ['9009','101','2026-03-12','75.00','Büromaterial','1'],
      ['9010','105','2026-03-20','210.50','Wareneinkauf','0']
    ]},
    { title: 'Auszug Klassen Beleg und Datum (Getter)', table: [
      ['Klasse','Methode','Rückgabe'],
      ['Beleg','getBelegID()','int'],
      ['Beleg','getMandantID()','int'],
      ['Beleg','getDatum()','Datum'],
      ['Beleg','getBetrag()','double'],
      ['Beleg','getKategorie()','String'],
      ['Beleg','istGebucht()','boolean'],
      ['Datum','getTag()','int'],
      ['Datum','getMonat()','int (1 bis 12)'],
      ['Datum','getJahr()','int'],
      ['Datum','istGleich(d: Datum)','boolean']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Algorithmen für die Belegverwaltung', points: 25,
      intro: 'Die Belege eines Mandanten liegen im Programm als Liste von Objekten der Klasse Beleg vor (siehe Material). Der Pseudocode ist frei wählbar, muss aber eindeutig und nachvollziehbar sein. Listen beginnen beim Index 0, laenge(liste) liefert die Anzahl der Elemente.',
      sub: [
        {
          id: 'a', points: 10,
          q: 'Für ein Diagramm im Mandantenportal werden die gebuchten Beträge je Monat benötigt. Entwickeln Sie in Pseudocode die Funktion monatsSummen(belege, mandantID, jahr). Sie erhält eine Liste von Beleg-Objekten und gibt ein Array mit 12 Werten zurück. Index 0 enthält die Summe der gebuchten Belege des Mandanten im Januar des angegebenen Jahres, Index 11 die Summe im Dezember. Nicht gebuchte Belege, Belege anderer Mandanten und anderer Jahre werden ignoriert.',
          kind: 'code',
          model: `funktion monatsSummen(belege: Liste<Beleg>, mandantID: int, jahr: int): double[]
  summen = neues Array double[12]
  für m = 0 bis 11
    summen[m] = 0
  ende für

  für jeden b in belege
    falls b.getMandantID() == mandantID
          und b.getDatum().getJahr() == jahr
          und b.istGebucht() dann
      index = b.getDatum().getMonat() - 1
      summen[index] = summen[index] + b.getBetrag()
    ende falls
  ende für

  rückgabe summen
ende funktion`,
          criteria: [
            { text: 'Array mit 12 Elementen angelegt und alle Werte mit 0 initialisiert', points: 2 },
            { text: 'Schleife läuft über alle Elemente der Liste belege', points: 2 },
            { text: 'Bedingung prüft Mandant, Jahr und gebucht über die Getter (alle drei mit UND verknüpft)', points: 3 },
            { text: 'Richtiger Index: Monat minus 1, Betrag wird aufaddiert (nicht überschrieben)', points: 2 },
            { text: 'Array wird zurückgegeben', points: 1 }
          ]
        },
        {
          id: 'b', points: 9,
          q: 'Mandanten laden Belege gelegentlich doppelt hoch. Zwei Belege gelten als mögliche Dublette, wenn sie zum selben Mandanten gehören, dasselbe Datum und denselben Betrag haben. Entwickeln Sie in Pseudocode die Funktion findeDubletten(belege), die eine Liste der BelegIDs zurückgibt, die als Dublette eines in der Liste weiter vorne stehenden Belegs erkannt wurden. Jedes Paar darf nur einmal gefunden werden, ein Beleg darf nicht mit sich selbst verglichen werden.',
          kind: 'code',
          model: `funktion findeDubletten(belege: Liste<Beleg>): Liste<int>
  ergebnis = neue Liste<int>
  n = laenge(belege)

  für i = 0 bis n - 2
    für j = i + 1 bis n - 1
      a = belege[i]
      b = belege[j]
      falls a.getMandantID() == b.getMandantID()
            und a.getDatum().istGleich(b.getDatum())
            und a.getBetrag() == b.getBetrag() dann
        ergebnis.hinzufuegen(b.getBelegID())
      ende falls
    ende für
  ende für

  rückgabe ergebnis
ende funktion`,
          criteria: [
            { text: 'Leere Ergebnisliste vor den Schleifen angelegt', points: 1 },
            { text: 'Äußere Schleife über die Liste (Index i)', points: 1 },
            { text: 'Innere Schleife beginnt bei i + 1 (kein Selbstvergleich, jedes Paar nur einmal)', points: 2 },
            { text: 'Schleifengrenzen korrekt, kein Zugriff außerhalb der Liste', points: 1 },
            { text: 'Vergleich von Mandant, Datum (über istGleich) und Betrag mit UND', points: 2 },
            { text: 'BelegID des hinteren Belegs (j) wird der Ergebnisliste hinzugefügt', points: 1 },
            { text: 'Ergebnisliste wird zurückgegeben', points: 1 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'Die Liste belege enthält genau die zehn Belege aus der Tabelle Beleg (Material), sortiert nach BelegID. (1) Geben Sie alle Werte ungleich 0 an, die monatsSummen(belege, 101, 2026) liefert, mit Index. (2) Geben Sie das Ergebnis von findeDubletten(belege) an. (3) Nennen Sie die Zeitkomplexität von findeDubletten in O-Notation und begründen Sie sie kurz.',
          kind: 'text',
          model: `(1) summen[0] = 420.00 (Januar: Beleg 9001; 9002 ist nicht gebucht)
    summen[1] = 1399.90 (Februar: 9003 mit 89.90 + 9005 mit 1310.00)
    summen[2] = 75.00 (März: 9009; 9007 ist nicht gebucht)
    alle anderen Indizes 3 bis 11 sind 0.

(2) [9002, 9008]
    9002 ist Dublette von 9001 (101, 2026-01-15, 420.00),
    9008 ist Dublette von 9004 (102, 2026-02-10, 1250.00).
    9007 und 9009 haben gleiches Datum, aber unterschiedliche Beträge.

(3) O(n²): zwei verschachtelte Schleifen, es werden n·(n-1)/2 Paare verglichen.
    Bei doppelter Belegzahl vervierfacht sich die Laufzeit ungefähr.`,
          criteria: [
            { text: 'Index 0 = 420.00 und Index 2 = 75.00 richtig', points: 1 },
            { text: 'Index 1 = 1399.90 richtig', points: 1 },
            { text: 'Ergebnis [9002, 9008] richtig und vollständig', points: 2 },
            { text: 'O(n²) genannt', points: 1 },
            { text: 'Begründung über verschachtelte Schleifen bzw. Paarvergleiche', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: SQL-Auswertungen', points: 25,
      intro: 'Die Kanzleileitung wünscht Auswertungen direkt aus der Datenbank. Verwenden Sie die Tabellen aus dem Material. Schreiben Sie Standard-SQL.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Erstellen Sie eine SQL-Abfrage, die für jeden Mitarbeiter den Namen, die Summe der erfassten Stunden (Alias Stunden) und den internen Aufwand (Stunden mal Stundensatz, Alias Aufwand) ausgibt. Berücksichtigt werden nur Zeiten zu Aufträgen der Art \'Jahresabschluss\'. Es sollen nur Mitarbeiter mit mehr als 10 Stunden erscheinen, absteigend nach Stunden sortiert. Geben Sie zusätzlich die Ergebnistabelle für die Beispieldaten an.',
          kind: 'code',
          model: `SELECT m.Name,
       SUM(z.Stunden) AS Stunden,
       SUM(z.Stunden * m.Stundensatz) AS Aufwand
FROM Mitarbeiter m
  JOIN Zeiterfassung z ON z.MitarbeiterID = m.MitarbeiterID
  JOIN Auftrag a ON a.AuftragID = z.AuftragID
WHERE a.Art = 'Jahresabschluss'
GROUP BY m.MitarbeiterID, m.Name
HAVING SUM(z.Stunden) > 10
ORDER BY Stunden DESC;

Ergebnis:
Name         | Stunden | Aufwand
Paul Arnold  | 19.0    | 2660.00
Anna Keller  | 18.0    | 2520.00

(Mia Berger hat genau 10.0 Stunden und fällt durch > 10 heraus,
 Tom Weiß hat 8.0 Stunden.)`,
          criteria: [
            { text: 'Drei Tabellen über zwei JOINs mit korrekten ON-Bedingungen (PK = FK) verknüpft', points: 2 },
            { text: 'WHERE filtert auf Art = \'Jahresabschluss\'', points: 1 },
            { text: 'SUM für Stunden und Aufwand (Stunden * Stundensatz) mit Aliasen', points: 1 },
            { text: 'GROUP BY über Mitarbeiter (alle nicht aggregierten Spalten enthalten)', points: 1 },
            { text: 'HAVING SUM(Stunden) > 10 (nicht im WHERE)', points: 1 },
            { text: 'ORDER BY Stunden absteigend', points: 1 },
            { text: 'Ergebnistabelle mit Paul Arnold 19 / 2660 und Anna Keller 18 / 2520 richtig', points: 1 }
          ]
        },
        {
          id: 'b', points: 5,
          q: 'Für eine Akquise-Aktion werden alle Mandanten (Name, Ort) benötigt, für die im Jahr 2026 noch kein Auftrag angelegt wurde. Lösen Sie die Aufgabe mit einer Unterabfrage und geben Sie die Ergebniszeilen für die Beispieldaten an.',
          kind: 'code',
          model: `SELECT Name, Ort
FROM Mandant
WHERE MandantID NOT IN (SELECT MandantID
                        FROM Auftrag
                        WHERE Jahr = 2026);

Ergebnis (3 Zeilen):
Praxis Dr. Lenz   | Hünfeld
Kfz-Teile Ruf KG  | Fulda
IT-Service Kraus  | Petersberg

(Alternative: WHERE NOT EXISTS (SELECT * FROM Auftrag a
 WHERE a.MandantID = Mandant.MandantID AND a.Jahr = 2026))`,
          criteria: [
            { text: 'Äußere Abfrage auf Mandant mit Name und Ort', points: 1 },
            { text: 'NOT IN (oder NOT EXISTS) mit Unterabfrage auf Auftrag', points: 2 },
            { text: 'Unterabfrage filtert auf Jahr = 2026', points: 1 },
            { text: 'Ergebnis Praxis Dr. Lenz, Kfz-Teile Ruf KG, IT-Service Kraus vollständig', points: 1 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'Abgeschlossene Aufträge sollen archiviert werden. Die Tabelle AuftragArchiv(AuftragID, MandantID, Art, Jahr, Honorar) ist bereits angelegt. Schreiben Sie eine SQL-Anweisung, die alle Aufträge mit Status \'erledigt\' aus dem Jahr 2025 in einem einzigen Befehl in AuftragArchiv kopiert. Geben Sie an, welche AuftragIDs eingefügt werden.',
          kind: 'code',
          model: `INSERT INTO AuftragArchiv (AuftragID, MandantID, Art, Jahr, Honorar)
SELECT AuftragID, MandantID, Art, Jahr, Honorar
FROM Auftrag
WHERE Status = 'erledigt'
  AND Jahr = 2025;

Eingefügt werden 3 Datensätze: 5002, 5003, 5009.
(5005 und 5006 sind aus 2025, aber noch 'in Arbeit'.)`,
          criteria: [
            { text: 'INSERT INTO AuftragArchiv mit Spaltenliste', points: 1 },
            { text: 'SELECT statt VALUES, Spalten in passender Reihenfolge', points: 2 },
            { text: 'WHERE mit Status = \'erledigt\' AND Jahr = 2025', points: 2 },
            { text: 'AuftragIDs 5002, 5003, 5009 genannt', points: 1 }
          ]
        },
        {
          id: 'd', points: 6,
          q: '(1) Das Honorar aller offenen Aufträge der Art \'Finanzbuchhaltung\' soll um 5 Prozent erhöht werden. Schreiben Sie die SQL-Anweisung und geben Sie die neuen Honorare an. (2) Ein Kollege möchte die archivierten Aufträge anschließend mit DELETE FROM Auftrag WHERE Status = \'erledigt\'; löschen. Die Datenbank verweigert dies. Erläutern Sie den Grund und nennen Sie eine Lösung.',
          kind: 'code',
          model: `(1)
UPDATE Auftrag
SET Honorar = Honorar * 1.05
WHERE Status = 'offen'
  AND Art = 'Finanzbuchhaltung';

Neue Honorare: 5001: 1890.00, 5007: 2205.00, 5008: 945.00

(2) Die Tabelle Zeiterfassung verweist mit dem Fremdschlüssel AuftragID
auf die Aufträge 5002, 5003 und 5009. Durch die referentielle Integrität
darf ein Datensatz, auf den noch verwiesen wird, nicht gelöscht werden.
Lösung: zuerst die abhängigen Zeiterfassungen archivieren bzw. löschen,
oder den Fremdschlüssel mit ON DELETE CASCADE definieren (dann werden die
Zeiten mitgelöscht, was fachlich bewusst entschieden werden muss).`,
          criteria: [
            { text: 'UPDATE Auftrag SET Honorar = Honorar * 1.05', points: 1 },
            { text: 'WHERE mit Status = \'offen\' AND Art = \'Finanzbuchhaltung\'', points: 1 },
            { text: 'Neue Honorare 1890, 2205, 945 richtig', points: 1 },
            { text: 'Grund: Fremdschlüssel in Zeiterfassung, referentielle Integrität', points: 2 },
            { text: 'Sinnvolle Lösung genannt (abhängige Datensätze zuerst, ON DELETE CASCADE o. Ä.)', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: Fristenkontrolle und Belegupload modellieren', points: 25,
      intro: 'Die Fristen werden bisher in einer Excel-Liste geführt, die in die Datenbank übernommen werden soll. Außerdem soll der Ablauf des Belegeingangs dokumentiert werden.',
      sub: [
        {
          id: 'a', points: 4,
          q: 'Nennen Sie anhand der abgebildeten Excel-Liste zwei Verstöße gegen die Normalformen. Geben Sie jeweils die betroffene Normalform und eine Begründung an.',
          material: { table: [
            ['FristNr','Mandant','Finanzamt','Steuerarten','Fällig','Bearbeiter'],
            ['F1','101 Bäckerei Hahn, Fulda','2620 FA Fulda','USt-VA, LSt-Anmeldung','2026-11-10','TW Tom Weiß'],
            ['F2','102 Autohaus Brandt GmbH, Fulda','2620 FA Fulda','USt-VA','2026-11-10','LS Lea Schmitt'],
            ['F3','104 Metallbau Stein GmbH, Erfurt','4151 FA Erfurt','USt-VA, LSt-Anmeldung','2026-11-10','TW Tom Weiß'],
            ['F4','101 Bäckerei Hahn, Fulda','2620 FA Fulda','ESt-Vorauszahlung','2026-12-10','AK Anna Keller']
          ]},
          kind: 'text',
          model: `1. Verstoß gegen die 1. NF: Die Spalten sind nicht atomar.
   "Mandant" enthält Nummer, Name und Ort in einem Feld, "Bearbeiter"
   enthält Kürzel und Name, "Finanzamt" Nummer und Bezeichnung.
   "Steuerarten" ist mehrwertig (mehrere Steuerarten in einer Zelle).

2. Verstoß gegen die 3. NF: transitive Abhängigkeit.
   FristNr → MandantNr → Mandantname, Ort und Finanzamt.
   Name und Finanzamt hängen vom Mandanten ab, nicht von der Frist.
   Folge: Redundanz (Bäckerei Hahn und FA Fulda mehrfach) und
   Änderungsanomalien.`,
          criteria: [
            { text: 'Verstoß gegen 1. NF (nicht atomar oder mehrwertig) genannt', points: 1 },
            { text: 'Konkrete Spalte als Begründung (z. B. Mandant oder Steuerarten)', points: 1 },
            { text: 'Verstoß gegen 3. NF (transitive Abhängigkeit) genannt', points: 1 },
            { text: 'Begründung: Mandantendaten/Finanzamt hängen vom Mandanten statt von der Frist ab', points: 1 }
          ]
        },
        {
          id: 'b', points: 10,
          q: 'Überführen Sie die Excel-Liste in ein relationales Datenmodell in der 3. Normalform. Geben Sie die Tabellen in Textform an: Tabellenname(Attribute), Primärschlüssel unterstrichen bzw. mit PK markiert, Fremdschlüssel mit ↑ oder FK.',
          kind: 'code',
          model: `Finanzamt(FinanzamtNr PK, Bezeichnung)
Mandant(MandantNr PK, Name, Ort, FinanzamtNr↑)
Mitarbeiter(Kuerzel PK, Name)
Steuerart(SteuerartID PK, Bezeichnung)
Frist(FristNr PK, MandantNr↑, Faellig, Kuerzel↑)
Frist_Steuerart(FristNr↑, SteuerartID↑)   PK = (FristNr, SteuerartID)

Begründung der Zwischentabelle: Eine Frist umfasst mehrere Steuerarten,
eine Steuerart kommt in vielen Fristen vor (m:n).
(Hinweis: Die Tabelle Mandant existiert bereits mit MandantID, ein
Verweis auf die vorhandene Tabelle ist ebenfalls richtig.)`,
          criteria: [
            { text: 'Tabelle Mandant mit Name, Ort und Fremdschlüssel auf Finanzamt', points: 2 },
            { text: 'Eigene Tabelle Finanzamt', points: 1 },
            { text: 'Eigene Tabelle Mitarbeiter/Bearbeiter', points: 1 },
            { text: 'Eigene Tabelle Steuerart', points: 1 },
            { text: 'Tabelle Frist mit Fälligkeit und Fremdschlüsseln auf Mandant und Bearbeiter', points: 2 },
            { text: 'Zwischentabelle Frist_Steuerart mit zusammengesetztem Primärschlüssel', points: 2 },
            { text: 'Alle Primär- und Fremdschlüssel korrekt gekennzeichnet', points: 1 }
          ]
        },
        {
          id: 'c', points: 11,
          q: 'Stellen Sie den folgenden Ablauf als UML-Aktivitätsdiagramm (zeichnen oder in Textform) dar (Startknoten, Aktionen, Entscheidungs- und Zusammenführungsknoten mit Bedingungen, Gabelung/Vereinigung, Endknoten). Verwenden Sie die Partitionen (Swimlanes) Mandant, System und Mitarbeiter.\n\nDer Mandant lädt einen Beleg hoch. Das System prüft das Dateiformat. Ist es kein PDF oder JPG, wird eine Fehlermeldung angezeigt und der Mandant lädt erneut hoch. Bei gültigem Format liest das System den Betrag per Texterkennung aus. Wird kein Betrag erkannt, erfasst ein Mitarbeiter den Betrag manuell. Anschließend prüft das System auf Dubletten. Bei einer Dublette markiert das System den Beleg und benachrichtigt den Mitarbeiter, danach endet der Ablauf. Andernfalls speichert das System den Beleg. Danach werden gleichzeitig eine Eingangsbestätigung an den Mandanten gesendet und der Beleg dem offenen Auftrag zugeordnet. Sind beide Aktionen abgeschlossen, endet der Ablauf.',
          kind: 'diagram',
          diagram: `flowchart TD
  subgraph Mandant
    S((" ")) --> M1{ }
    M1 --> A1(Beleg hochladen)
  end
  subgraph System
    A2(Dateiformat prüfen) --> D1{ }
    D1 -->|"[kein PDF/JPG]"| A3(Fehlermeldung anzeigen)
    D1 -->|"[PDF oder JPG]"| A4(Betrag per Texterkennung auslesen)
    A4 --> D2{ }
    D2 -->|"[Betrag erkannt]"| M2{ }
    M2 --> A5(Auf Dubletten prüfen)
    A5 --> D3{ }
    D3 -->|"[Dublette]"| A6(Beleg markieren)
    A6 --> A7(Mitarbeiter benachrichtigen)
    A7 --> E1(((" ")))
    D3 -->|"[keine Dublette]"| A8(Beleg speichern)
    A8 --> F1[" "]
    F1 --> A9(Eingangsbestätigung an Mandant senden)
    F1 --> A10(Beleg offenem Auftrag zuordnen)
    A9 --> J1[" "]
    A10 --> J1
    J1 --> E2(((" ")))
  end
  subgraph Mitarbeiter
    A11(Betrag manuell erfassen)
  end
  A1 --> A2
  A3 --> M1
  D2 -->|"[Betrag nicht erkannt]"| A11
  A11 --> M2
  style S fill:#000,stroke:#000
  style E1 fill:#000,stroke:#fff,stroke-width:2px
  style E2 fill:#000,stroke:#fff,stroke-width:2px
  style F1 fill:#000,stroke:#000
  style J1 fill:#000,stroke:#000`,
          model: `[Mandant]     ● Start
[Mandant]     → ◇ Zusammenführung M1
[Mandant]     → (Beleg hochladen)
[System]      → (Dateiformat prüfen)
[System]      → ◇ Entscheidung
                 [kein PDF/JPG] → (Fehlermeldung anzeigen) → zurück zu ◇ M1
                 [PDF oder JPG] → (Betrag per Texterkennung auslesen)
[System]      → ◇ Entscheidung
                 [Betrag nicht erkannt] → [Mitarbeiter] (Betrag manuell erfassen) → ◇ M2
                 [Betrag erkannt] → ◇ M2
[System]      ◇ M2 (Zusammenführung) → (Auf Dubletten prüfen)
[System]      → ◇ Entscheidung
                 [Dublette] → (Beleg markieren) → (Mitarbeiter benachrichtigen) → ◉ Ende
                 [keine Dublette] → (Beleg speichern)
[System]      → ▬ Gabelung
                 → (Eingangsbestätigung an Mandant senden)
                 → (Beleg offenem Auftrag zuordnen)
              → ▬ Vereinigung → ◉ Ende`,
          criteria: [
            { text: 'Startknoten und mindestens ein Endknoten vorhanden', points: 1 },
            { text: 'Aktionen in sinnvoller Reihenfolge den richtigen Swimlanes zugeordnet', points: 2 },
            { text: 'Entscheidung Dateiformat mit beiden Bedingungen, Rücksprung über Zusammenführungsknoten (nicht direkt in die Aktion)', points: 2 },
            { text: 'Entscheidung Betrag erkannt/nicht erkannt mit manueller Erfassung durch Mitarbeiter und Zusammenführung', points: 2 },
            { text: 'Entscheidung Dublette mit Markieren, Benachrichtigen und Ende', points: 2 },
            { text: 'Gabelung und Vereinigung (Balken) für die beiden parallelen Aktionen', points: 2 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Testen der Säumniszuschlag-Berechnung', points: 25,
      intro: 'Ein Kollege hat für die Fristenkontrolle eine Funktion geschrieben, die den Säumniszuschlag bei verspäteter Zahlung einer Steuer berechnet (vereinfachte Regel: 1 Prozent je angefangenem Monat von 30 Tagen auf den auf volle 50 Euro abgerundeten Betrag, bis 3 Tage Verspätung kein Zuschlag). abrunden(x) liefert die größte ganze Zahl kleiner oder gleich x.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Führen Sie für den Aufruf saeumniszuschlag(1234.00, 65) einen Schreibtischtest durch. Notieren Sie in einer Tracetabelle die Werte von basis, monate und rest nach jeder Wertänderung sowie den Rückgabewert.',
          material: { code: `funktion saeumniszuschlag(betrag: double, tage: int): double
  falls betrag < 0 oder tage < 0 dann          // E1
    rückgabe -1
  ende falls
  falls tage <= 3 dann                          // E2
    rückgabe 0
  ende falls
  basis = abrunden(betrag / 50) * 50
  monate = 0
  rest = tage
  solange rest > 0                              // E3
    monate = monate + 1
    rest = rest - 30
  ende solange
  rückgabe basis * monate / 100
ende funktion` },
          kind: 'text',
          model: `E1: 1234 < 0 oder 65 < 0 → falsch
E2: 65 <= 3 → falsch

Schritt              | basis | monate | rest | Bedingung rest > 0
Initialisierung      | 1200  | 0      | 65   | wahr
1. Durchlauf         | 1200  | 1      | 35   | wahr
2. Durchlauf         | 1200  | 2      | 5    | wahr
3. Durchlauf         | 1200  | 3      | -25  | falsch → Ende

basis = abrunden(1234 / 50) * 50 = abrunden(24.68) * 50 = 24 * 50 = 1200
Rückgabe: 1200 * 3 / 100 = 36.00`,
          criteria: [
            { text: 'Beide Abfragen E1 und E2 als falsch erkannt', points: 1 },
            { text: 'basis = 1200 richtig berechnet', points: 2 },
            { text: 'Drei Schleifendurchläufe mit monate 1, 2, 3', points: 2 },
            { text: 'rest-Werte 65, 35, 5, -25 richtig', points: 2 },
            { text: 'Rückgabewert 36.00', points: 1 }
          ]
        },
        {
          id: 'b', points: 9,
          q: 'Bilden Sie für die Parameter betrag und tage gültige und ungültige Äquivalenzklassen. Geben Sie zu jeder Klasse einen Testfall mit Eingabewerten und erwartetem Ergebnis an. Ergänzen Sie drei sinnvolle Grenzwerttestfälle für den Parameter tage.',
          kind: 'text',
          model: `Äquivalenzklassen:
Nr  | Parameter | Klasse              | gültig?  | Testfall (betrag, tage) | erwartet
ÄK1 | tage      | tage < 0            | ungültig | (500, -5)               | -1
ÄK2 | tage      | 0 <= tage <= 3      | gültig   | (500, 2)                | 0
ÄK3 | tage      | tage > 3            | gültig   | (500, 40)               | 10.00 (2 Monate)
ÄK4 | betrag    | betrag < 0          | ungültig | (-100, 40)              | -1
ÄK5 | betrag    | 0 <= betrag < 50    | gültig   | (49.99, 40)             | 0 (Basis 0)
ÄK6 | betrag    | betrag >= 50        | gültig   | (500, 40)               | 10.00

Grenzwerte tage (betrag = 500):
(500, -1) → -1      (500, 0) → 0       (500, 3) → 0
(500, 4) → 5.00     (500, 30) → 5.00   (500, 31) → 10.00`,
          criteria: [
            { text: 'Ungültige Klasse tage < 0 mit Ergebnis -1', points: 1 },
            { text: 'Gültige Klassen 0 bis 3 Tage (Ergebnis 0) und über 3 Tage (Zuschlag) getrennt', points: 2 },
            { text: 'Ungültige Klasse betrag < 0 mit Ergebnis -1', points: 1 },
            { text: 'Gültige Klasse für betrag (mind. eine) mit Testfall', points: 1 },
            { text: 'Erwartete Ergebnisse der Testfälle rechnerisch richtig', points: 2 },
            { text: 'Drei sinnvolle Grenzwerte für tage (z. B. 3/4 oder 30/31 oder -1/0) mit richtigem Ergebnis', points: 2 }
          ]
        },
        {
          id: 'c', points: 8,
          q: '(1) Erläutern Sie den Unterschied zwischen Anweisungsüberdeckung (C0) und Zweigüberdeckung (C1). (2) Geben Sie eine minimale Menge von Testfällen an, mit der für saeumniszuschlag eine vollständige Zweigüberdeckung erreicht wird, und ordnen Sie jedem Testfall die durchlaufenen Zweige zu. (3) Begründen Sie, warum die Bedingung in E1 durch Ihre Testfälle trotz 100 Prozent Zweigüberdeckung nicht vollständig getestet sein muss.',
          kind: 'text',
          model: `(1) C0: Jede Anweisung wird mindestens einmal ausgeführt.
    C1: Jeder Zweig jeder Entscheidung (wahr und falsch, bei Schleifen
    auch "Schleife betreten" und "Schleife verlassen") wird mindestens
    einmal durchlaufen. C1 schließt C0 ein und ist stärker.

(2) Drei Testfälle genügen:
    T1 (500, -5)  → E1 wahr                                → -1
    T2 (500, 2)   → E1 falsch, E2 wahr                     → 0
    T3 (500, 40)  → E1 falsch, E2 falsch, E3 wahr (2x),
                    E3 falsch                              → 10.00
    Damit sind alle 6 Zweige (E1 w/f, E2 w/f, E3 w/f) abgedeckt.

(3) E1 besteht aus zwei Teilbedingungen (betrag < 0 ODER tage < 0).
    Zweigüberdeckung verlangt nur, dass E1 insgesamt einmal wahr und
    einmal falsch ist. In T1 ist nur tage < 0 wahr, der Fall betrag < 0
    wird nie geprüft. Ein Fehler dort (z. B. betrag <= 0) bliebe
    unentdeckt. Abhilfe: Bedingungs- bzw. Mehrfachbedingungsüberdeckung.`,
          criteria: [
            { text: 'C0 korrekt erklärt (jede Anweisung mindestens einmal)', points: 1 },
            { text: 'C1 korrekt erklärt (jeder Zweig wahr und falsch), C1 stärker als C0', points: 1 },
            { text: 'Drei Testfälle angegeben, die zusammen alle Zweige abdecken', points: 2 },
            { text: 'Zuordnung der Zweige je Testfall richtig, inkl. Schleife betreten und verlassen', points: 2 },
            { text: 'Begründung: zusammengesetzte Bedingung, Teilbedingung betrag < 0 nie wahr geprüft', points: 2 }
          ]
        }
      ]
    }
  ]
},

// =====================================================================
// FALL 2: E-Bike-Verleih
// =====================================================================
{
  id: 'ga2_fall2',
  area: 'GA2',
  title: 'Fall 2: Software für einen E-Bike-Verleih',
  minutes: 90,
  scenario: 'Die Kuppenrad GmbH betreibt in Fulda und der Rhön einen E-Bike-Verleih mit festen Stationen. Kunden leihen die Räder per App aus, bezahlt wird nach Minuten, je nach Abo-Modell. Die bisherige Software stößt an ihre Grenzen: Wartungen werden auf Papier dokumentiert, Stationen sind oft leer, und die monatliche Abrechnung erfolgt halb manuell. Ihr Ausbildungsbetrieb, ein Softwarehaus in Fulda, hat den Auftrag erhalten, die Verleihsoftware zu erweitern. Sie sind Auszubildende(r) zum Fachinformatiker für Anwendungsentwicklung und übernehmen Teile von Datenmodell, Algorithmen, Datenbankabfragen und Tests.',
  material: [
    { title: 'Tabellenmodell (Primärschlüssel jeweils erstes Attribut, Fremdschlüssel mit ↑)', code: `Kunde(KundeID, Name, Ort, Abo)
Station(StationID, Bezeichnung, Ort, Stellplaetze)
EBike(BikeID, Modell, StationID↑, Akkustand, KmGesamt, Status)
Ausleihe(AusleiheID, KundeID↑, BikeID↑, StartStationID↑, ZielStationID↑, Start, Ende, Km, Preis)

Abo: 'Basis' oder 'Plus'
Status: 'verfuegbar', 'ausgeliehen', 'Wartung'
Akkustand in Prozent. Bei laufender Ausleihe sind Ende, ZielStationID, Km und Preis NULL,
bei ausgeliehenen Rädern ist EBike.StationID NULL.` },
    { title: 'Tarif', table: [
      ['Abo','Entsperrgebühr','Preis je Minute','Höchstpreis je Ausleihe'],
      ['Basis','1.00 €','0.25 €','25.00 €'],
      ['Plus','0.00 €','0.15 €','25.00 €']
    ]},
    { title: 'Tabelle Kunde', table: [
      ['KundeID','Name','Ort','Abo'],
      ['1','Lena Fischer','Fulda','Plus'],
      ['2','Max Wagner','Fulda','Basis'],
      ['3','Sara Yilmaz','Künzell','Basis'],
      ['4','Tim Becker','Hünfeld','Plus'],
      ['5','Nora Hartmann','Fulda','Basis'],
      ['6','Ben Schulz','Petersberg','Basis'],
      ['7','Eva Lange','Gersfeld','Plus'],
      ['8','Jan Koch','Fulda','Basis']
    ]},
    { title: 'Tabelle Station', table: [
      ['StationID','Bezeichnung','Ort','Stellplaetze'],
      ['1','Bahnhof','Fulda','12'],
      ['2','Domplatz','Fulda','8'],
      ['3','Hochschule','Fulda','10'],
      ['4','Wasserkuppe','Gersfeld','6'],
      ['5','Marktplatz','Hünfeld','6']
    ]},
    { title: 'Tabelle EBike', table: [
      ['BikeID','Modell','StationID','Akkustand','KmGesamt','Status'],
      ['1','CityE 500','1','85','1240','verfuegbar'],
      ['2','CityE 500','1','15','3980','verfuegbar'],
      ['3','TrekkingE 700','2','60','2210','verfuegbar'],
      ['4','TrekkingE 700','NULL','55','1830','ausgeliehen'],
      ['5','MountainE 900','4','90','5120','Wartung'],
      ['6','CityE 500','3','40','760','verfuegbar'],
      ['7','MountainE 900','4','70','4870','verfuegbar'],
      ['8','CityE 500','2','95','300','verfuegbar'],
      ['9','CityE 500','1','70','1900','verfuegbar'],
      ['10','TrekkingE 700','3','25','2950','verfuegbar']
    ]},
    { title: 'Tabelle Ausleihe', table: [
      ['AusleiheID','KundeID','BikeID','StartStationID','ZielStationID','Start','Ende','Km','Preis'],
      ['1','1','1','1','3','2026-09-01 08:00','2026-09-01 08:25','6.2','3.75'],
      ['2','2','3','2','1','2026-09-03 17:10','2026-09-03 17:50','9.8','11.00'],
      ['3','3','7','4','4','2026-09-06 10:00','2026-09-06 13:00','42.5','25.00'],
      ['4','1','6','2','3','2026-09-08 12:05','2026-09-08 12:20','3.1','2.25'],
      ['5','4','8','5','2','2026-09-12 09:30','2026-09-12 10:40','18.0','10.50'],
      ['6','2','2','2','1','2026-09-15 07:45','2026-09-15 08:05','4.4','6.00'],
      ['7','5','5','4','4','2026-09-20 11:00','2026-09-20 13:00','35.0','25.00'],
      ['8','1','3','1','2','2026-09-22 18:00','2026-09-22 18:30','7.0','4.50'],
      ['9','6','1','3','1','2026-09-25 14:15','2026-09-25 14:50','8.1','9.75'],
      ['10','7','4','4','NULL','2026-09-30 16:10','NULL','NULL','NULL']
    ]},
    { title: 'Auszug Klassen (Getter)', table: [
      ['Klasse','Methode','Rückgabe'],
      ['Station','getStationID()','int'],
      ['Station','getBezeichnung()','String'],
      ['EBike','getBikeID()','int'],
      ['EBike','getStationID()','int (NULL, wenn ausgeliehen)'],
      ['EBike','getAkkustand()','int'],
      ['EBike','getStatus()','String'],
      ['Ausleihe','istBeendet()','boolean'],
      ['Ausleihe','getKm()','double']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Datenmodell erweitern und Zustände modellieren', points: 25,
      intro: 'Die Wartung der Räder soll künftig in der Datenbank erfasst werden. Außerdem soll das Verhalten eines E-Bikes eindeutig festgelegt werden, bevor die Steuerlogik programmiert wird.',
      sub: [
        {
          id: 'a', points: 12,
          q: 'Erweitern Sie das vorhandene Tabellenmodell um die folgenden Anforderungen. Geben Sie nur die neuen Tabellen in Textform an (Primärschlüssel mit PK, Fremdschlüssel mit ↑). Das Modell muss der 3. Normalform entsprechen.\n\nJede Wartung betrifft genau ein E-Bike und wird an einem Datum von genau einem Techniker durchgeführt. Zu einem Techniker werden Name und Telefonnummer gespeichert. Eine Wartung hat eine Art (z. B. Inspektion, Reparatur). Bei einer Wartung können mehrere Ersatzteile in unterschiedlicher Menge verbaut werden. Jedes Ersatzteil hat eine Bezeichnung und einen aktuellen Preis.\n\nBegründen Sie außerdem, warum die Gesamtkosten einer Wartung nicht als eigene Spalte gespeichert werden sollten.',
          kind: 'code',
          model: `Techniker(TechnikerID PK, Name, Telefon)
Wartung(WartungID PK, BikeID↑, TechnikerID↑, Datum, Art)
Ersatzteil(TeilID PK, Bezeichnung, Preis)
Wartung_Ersatzteil(WartungID↑, TeilID↑, Menge)   PK = (WartungID, TeilID)

Begründung Gesamtkosten: Die Kosten lassen sich aus Menge und Preis
berechnen (abgeleitetes Attribut). Eine gespeicherte Summe wäre
redundant und könnte bei Änderungen inkonsistent werden.
(Hinweis: Weil sich der aktuelle Preis ändert, ist es fachlich
sinnvoll, in Wartung_Ersatzteil zusätzlich den Preis zum
Einbauzeitpunkt zu speichern. Das ist kein Verstoß gegen die 3. NF,
da er vom Schlüssel (WartungID, TeilID) abhängt.)`,
          criteria: [
            { text: 'Tabelle Techniker mit Name und Telefon', points: 2 },
            { text: 'Tabelle Wartung mit Datum und Art', points: 1 },
            { text: 'Wartung hat Fremdschlüssel auf EBike und Techniker', points: 2 },
            { text: 'Tabelle Ersatzteil mit Bezeichnung und Preis', points: 1 },
            { text: 'Zwischentabelle Wartung_Ersatzteil mit zusammengesetztem Primärschlüssel', points: 2 },
            { text: 'Menge steht in der Zwischentabelle', points: 2 },
            { text: 'Begründung: abgeleiteter Wert, Redundanz bzw. Inkonsistenzgefahr', points: 2 }
          ]
        },
        {
          id: 'b', points: 13,
          q: 'Stellen Sie das Verhalten eines E-Bikes als UML-Zustandsdiagramm (zeichnen oder in Textform) dar. Geben Sie Anfangszustand, Zustände, Endzustand und alle Übergänge im Format "Zustand A → Zustand B: Ereignis [Bedingung] / Aktion" an.\n\nEin neues E-Bike ist nach der Inbetriebnahme verfügbar. Ein verfügbares Rad kann reserviert werden, aber nur, wenn der Akkustand mindestens 30 Prozent beträgt. Wird ein reserviertes Rad nicht innerhalb von 15 Minuten entsperrt, ist es wieder verfügbar. Wird es entsperrt, ist es ausgeliehen. Ein verfügbares Rad kann auch direkt ohne Reservierung entsperrt werden (ebenfalls nur ab 30 Prozent Akku). Bei der Rückgabe an einer Station wird das Rad wieder verfügbar, wenn der Akkustand mindestens 20 Prozent beträgt und kein Defekt gemeldet wurde. Andernfalls kommt es in die Wartung, dabei wird ein Wartungsauftrag erzeugt. Nach abgeschlossener Wartung ist das Rad verfügbar. Ein Rad in Wartung kann ausgemustert werden, damit endet sein Lebenszyklus.',
          kind: 'diagram',
          diagram: `stateDiagram-v2
  state "verfügbar" as verfuegbar
  state "reserviert" as reserviert
  state "ausgeliehen" as ausgeliehen
  state "in Wartung" as wartung
  [*] --> verfuegbar : Inbetriebnahme
  verfuegbar --> reserviert : reservieren [Akkustand >= 30]
  reserviert --> verfuegbar : after(15 min) / Reservierung verwerfen
  reserviert --> ausgeliehen : entsperren / Ausleihe starten
  verfuegbar --> ausgeliehen : entsperren [Akkustand >= 30] / Ausleihe starten
  ausgeliehen --> verfuegbar : zurückgeben [Akkustand >= 20 und kein Defekt] / Ausleihe beenden
  ausgeliehen --> wartung : zurückgeben [Akkustand < 20 oder Defekt gemeldet] / Ausleihe beenden, Wartungsauftrag erzeugen
  wartung --> verfuegbar : Wartung abgeschlossen
  wartung --> [*] : ausmustern`,
          model: `Anfangszustand ● → verfügbar: Inbetriebnahme

verfügbar   → reserviert:  reservieren [Akkustand >= 30]
reserviert  → verfügbar:   after(15 min) / Reservierung verwerfen
reserviert  → ausgeliehen: entsperren / Ausleihe starten
verfügbar   → ausgeliehen: entsperren [Akkustand >= 30] / Ausleihe starten
ausgeliehen → verfügbar:   zurückgeben [Akkustand >= 20 und kein Defekt]
                           / Ausleihe beenden
ausgeliehen → in Wartung:  zurückgeben [Akkustand < 20 oder Defekt gemeldet]
                           / Ausleihe beenden, Wartungsauftrag erzeugen
in Wartung  → verfügbar:   Wartung abgeschlossen
in Wartung  → ◉ Endzustand: ausmustern

Zustände: verfügbar, reserviert, ausgeliehen, in Wartung`,
          criteria: [
            { text: 'Anfangszustand und Endzustand korrekt eingebunden', points: 2 },
            { text: 'Vier Zustände verfügbar, reserviert, ausgeliehen, in Wartung', points: 2 },
            { text: 'Reservieren mit Wächter [Akku >= 30] und Zeitablauf after(15 min) zurück nach verfügbar', points: 2 },
            { text: 'Entsperren aus reserviert und direkt aus verfügbar (mit Wächter)', points: 2 },
            { text: 'Rückgabe mit zwei sich ausschließenden Wächtern nach verfügbar bzw. in Wartung', points: 3 },
            { text: 'Aktion Wartungsauftrag erzeugen und Übergang Wartung abgeschlossen → verfügbar', points: 2 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: Algorithmen für Tarif und Stationen', points: 25,
      intro: 'Pseudocode ist frei wählbar, muss aber eindeutig sein. Listen beginnen beim Index 0. Verwenden Sie die Getter aus dem Material und die Tarife aus der Tariftabelle.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Entwickeln Sie in Pseudocode die Funktion berechnePreis(minuten, abo), die den Preis einer Ausleihe nach der Tariftabelle zurückgibt. Der Preis darf den Höchstpreis von 25.00 Euro nicht überschreiten. Ist minuten kleiner als 1 oder abo weder \'Basis\' noch \'Plus\', soll -1 zurückgegeben werden.',
          kind: 'code',
          model: `funktion berechnePreis(minuten: int, abo: String): double
  HOECHSTPREIS = 25.00

  falls minuten < 1 dann
    rückgabe -1
  ende falls

  falls abo == "Basis" dann
    preis = 1.00 + minuten * 0.25
  sonst falls abo == "Plus" dann
    preis = minuten * 0.15
  sonst
    rückgabe -1
  ende falls

  falls preis > HOECHSTPREIS dann
    preis = HOECHSTPREIS
  ende falls

  rückgabe preis
ende funktion`,
          criteria: [
            { text: 'Prüfung minuten < 1 mit Rückgabe -1', points: 1 },
            { text: 'Basis: 1.00 + minuten * 0.25 korrekt', points: 2 },
            { text: 'Plus: minuten * 0.15 korrekt', points: 1 },
            { text: 'Unbekanntes Abo liefert -1', points: 1 },
            { text: 'Deckelung auf 25.00 nach der Berechnung für beide Abos', points: 2 },
            { text: 'Preis wird zurückgegeben', points: 1 }
          ]
        },
        {
          id: 'b', points: 12,
          q: 'Die Disposition möchte leere Stationen früh erkennen. Entwickeln Sie in Pseudocode die Funktion unterversorgteStationen(stationen, bikes, mindestanzahl). stationen ist eine Liste von Station-Objekten, bikes eine Liste von EBike-Objekten. Ein Rad zählt für eine Station als einsatzbereit, wenn es an dieser Station steht, den Status \'verfuegbar\' hat und einen Akkustand von mindestens 30 Prozent besitzt. Die Funktion gibt eine Liste aller Stationen zurück, an denen weniger als mindestanzahl Räder einsatzbereit sind.',
          kind: 'code',
          model: `funktion unterversorgteStationen(stationen: Liste<Station>,
                                 bikes: Liste<EBike>,
                                 mindestanzahl: int): Liste<Station>
  ergebnis = neue Liste<Station>

  für jede s in stationen
    anzahl = 0                                  // je Station neu!
    für jedes b in bikes
      falls b.getStationID() == s.getStationID()
            und b.getStatus() == "verfuegbar"
            und b.getAkkustand() >= 30 dann
        anzahl = anzahl + 1
      ende falls
    ende für
    falls anzahl < mindestanzahl dann
      ergebnis.hinzufuegen(s)
    ende falls
  ende für

  rückgabe ergebnis
ende funktion`,
          criteria: [
            { text: 'Leere Ergebnisliste angelegt', points: 1 },
            { text: 'Äußere Schleife über alle Stationen', points: 1 },
            { text: 'Zähler wird für jede Station innerhalb der äußeren Schleife auf 0 gesetzt', points: 2 },
            { text: 'Innere Schleife über alle Bikes', points: 1 },
            { text: 'Bedingung vergleicht StationID über die Getter', points: 2 },
            { text: 'Bedingung prüft Status \'verfuegbar\' und Akkustand >= 30 mit UND', points: 2 },
            { text: 'Nach der inneren Schleife: anzahl < mindestanzahl → Station hinzufügen', points: 2 },
            { text: 'Ergebnisliste wird zurückgegeben', points: 1 }
          ]
        },
        {
          id: 'c', points: 5,
          q: '(1) Ermitteln Sie, welche Stationen unterversorgteStationen für die Beispieldaten aus den Tabellen Station und EBike bei mindestanzahl = 2 zurückgibt, und begründen Sie das Ergebnis je Station mit der Anzahl einsatzbereiter Räder. (2) Geben Sie die Laufzeitkomplexität in Abhängigkeit von der Anzahl s der Stationen und b der Bikes an.',
          kind: 'text',
          model: `(1) Einsatzbereite Räder je Station:
    Bahnhof (1):     Bike 1 (85 %), Bike 9 (70 %) → 2; Bike 2 nur 15 % → nicht unterversorgt
    Domplatz (2):    Bike 3 (60 %), Bike 8 (95 %) → 2 → nicht unterversorgt
    Hochschule (3):  Bike 6 (40 %) → 1; Bike 10 nur 25 % → unterversorgt
    Wasserkuppe (4): Bike 7 (70 %) → 1; Bike 5 in Wartung → unterversorgt
    Marktplatz (5):  kein Rad → 0 → unterversorgt
    (Bike 4 ist ausgeliehen, StationID NULL, zählt nirgends.)

    Rückgabe: [Hochschule, Wasserkuppe, Marktplatz] (IDs 3, 4, 5)

(2) O(s · b), da für jede Station alle Bikes durchlaufen werden.`,
          criteria: [
            { text: 'Ergebnis Stationen 3, 4 und 5 vollständig und ohne falsche Station', points: 2 },
            { text: 'Begründung mit richtigen Anzahlen (Akku zu niedrig, Wartung, leer)', points: 2 },
            { text: 'Laufzeit O(s · b) angegeben', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: SQL für Auswertung und Abrechnung', points: 25,
      intro: 'Für das Controlling und die monatliche Abrechnung sollen SQL-Anweisungen erstellt werden. Verwenden Sie die Tabellen aus dem Material.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Erstellen Sie eine Abfrage, die je Startstation die Bezeichnung, die Anzahl der beendeten Ausleihen (Alias Anzahl) und den Umsatz (Summe der Preise, Alias Umsatz) ausgibt. Es sollen nur Stationen mit einem Umsatz über 15 Euro angezeigt werden, absteigend nach Umsatz sortiert. Geben Sie die Ergebnistabelle an und erläutern Sie, welchen Fehler im Ergebnis ein fehlender Filter auf beendete Ausleihen verursachen würde.',
          kind: 'code',
          model: `SELECT s.Bezeichnung,
       COUNT(*) AS Anzahl,
       SUM(a.Preis) AS Umsatz
FROM Station s
  JOIN Ausleihe a ON a.StartStationID = s.StationID
WHERE a.Ende IS NOT NULL
GROUP BY s.StationID, s.Bezeichnung
HAVING SUM(a.Preis) > 15
ORDER BY Umsatz DESC;

Ergebnis:
Bezeichnung  | Anzahl | Umsatz
Wasserkuppe  | 2      | 50.00
Domplatz     | 3      | 19.25

Ohne WHERE a.Ende IS NOT NULL würde COUNT(*) die laufende Ausleihe 10
mitzählen: Wasserkuppe hätte Anzahl 3. Der Umsatz bliebe gleich, weil SUM
NULL-Werte ignoriert.`,
          criteria: [
            { text: 'JOIN Station und Ausleihe über StartStationID = StationID', points: 2 },
            { text: 'Filter auf beendete Ausleihen (Ende IS NOT NULL bzw. Preis IS NOT NULL)', points: 1 },
            { text: 'COUNT und SUM mit Aliasen, GROUP BY Station', points: 1 },
            { text: 'HAVING SUM(Preis) > 15 und ORDER BY Umsatz DESC', points: 2 },
            { text: 'Ergebnis Wasserkuppe 2 / 50.00 und Domplatz 3 / 19.25 richtig', points: 1 },
            { text: 'Erläuterung: COUNT(*) zählt laufende Ausleihe mit (Wasserkuppe 3), SUM ignoriert NULL', points: 1 }
          ]
        },
        {
          id: 'b', points: 5,
          q: 'Geben Sie alle Ausleihen (AusleiheID, Name des Kunden, Preis) aus, deren Preis über dem Durchschnittspreis aller Ausleihen liegt. Verwenden Sie eine Unterabfrage. Geben Sie den Durchschnittswert (auf zwei Nachkommastellen gerundet) und die Ergebniszeilen an.',
          kind: 'code',
          model: `SELECT a.AusleiheID, k.Name, a.Preis
FROM Ausleihe a
  JOIN Kunde k ON k.KundeID = a.KundeID
WHERE a.Preis > (SELECT AVG(Preis) FROM Ausleihe);

Durchschnitt: 97.75 / 9 = 10.86 (AVG ignoriert den NULL-Preis von Ausleihe 10)

Ergebnis:
2 | Max Wagner    | 11.00
3 | Sara Yilmaz   | 25.00
7 | Nora Hartmann | 25.00`,
          criteria: [
            { text: 'JOIN Ausleihe und Kunde mit korrekter ON-Bedingung', points: 1 },
            { text: 'Unterabfrage SELECT AVG(Preis) FROM Ausleihe im WHERE', points: 2 },
            { text: 'Durchschnitt 10.86 richtig (Division durch 9, nicht 10)', points: 1 },
            { text: 'Ergebniszeilen 2, 3 und 7 richtig', points: 1 }
          ]
        },
        {
          id: 'c', points: 7,
          q: 'Für die Monatsabrechnung existiert die Tabelle Rechnung(RechnungID, KundeID, Monat, Betrag). RechnungID wird automatisch vergeben. Schreiben Sie eine einzige SQL-Anweisung, die für jeden Kunden mit mindestens einer im September 2026 beendeten Ausleihe eine Rechnung mit Monat \'2026-09\' und der Summe seiner Preise anlegt. Geben Sie an, wie viele Rechnungen entstehen und welchen Betrag Kundin Lena Fischer erhält.',
          kind: 'code',
          model: `INSERT INTO Rechnung (KundeID, Monat, Betrag)
SELECT KundeID, '2026-09', SUM(Preis)
FROM Ausleihe
WHERE Ende >= '2026-09-01' AND Ende < '2026-10-01'
GROUP BY KundeID;

Es entstehen 6 Rechnungen (Kunden 1 bis 6). Kundin 7 hat nur die laufende
Ausleihe 10 (Ende NULL), Kunde 8 hat keine Ausleihe.
Lena Fischer (Kunde 1): 3.75 + 2.25 + 4.50 = 10.50 €`,
          criteria: [
            { text: 'INSERT INTO Rechnung mit Spaltenliste ohne RechnungID', points: 1 },
            { text: 'SELECT mit KundeID, konstantem Wert \'2026-09\' und SUM(Preis)', points: 2 },
            { text: 'WHERE schränkt auf im September 2026 beendete Ausleihen ein', points: 1 },
            { text: 'GROUP BY KundeID', points: 1 },
            { text: '6 Rechnungen genannt', points: 1 },
            { text: 'Betrag 10.50 € für Lena Fischer', points: 1 }
          ]
        },
        {
          id: 'd', points: 5,
          q: '(1) Alle verfügbaren E-Bikes mit einem Akkustand unter 20 Prozent sollen den Status \'Wartung\' erhalten. (2) Kunden, die noch nie ein Rad ausgeliehen haben, sollen gelöscht werden. Schreiben Sie beide SQL-Anweisungen und geben Sie jeweils an, welche Datensätze betroffen sind.',
          kind: 'code',
          model: `(1)
UPDATE EBike
SET Status = 'Wartung'
WHERE Akkustand < 20
  AND Status = 'verfuegbar';
Betroffen: Bike 2 (15 %).

(2)
DELETE FROM Kunde
WHERE KundeID NOT IN (SELECT KundeID FROM Ausleihe);
Betroffen: Kunde 8 (Jan Koch).`,
          criteria: [
            { text: 'UPDATE EBike SET Status = \'Wartung\'', points: 1 },
            { text: 'WHERE mit Akkustand < 20 AND Status = \'verfuegbar\'', points: 1 },
            { text: 'DELETE FROM Kunde mit NOT IN/NOT EXISTS-Unterabfrage auf Ausleihe', points: 2 },
            { text: 'Betroffene Datensätze Bike 2 und Kunde 8 richtig', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Testen und Ablauf der Ausleihe', points: 25,
      intro: 'Vor der Freigabe werden die neuen Funktionen getestet. Außerdem soll das Zusammenspiel der Komponenten beim Entsperren dokumentiert werden.',
      sub: [
        {
          id: 'a', points: 7,
          q: 'Die Funktion berechnePreis(minuten, abo) aus Handlungsschritt 2 soll per Black-Box-Test geprüft werden. Bilden Sie Äquivalenzklassen für beide Parameter (gültig und ungültig) und geben Sie je Klasse einen Testfall mit erwartetem Ergebnis an. Ergänzen Sie für das Abo \'Basis\' die Grenzwerte rund um den Höchstpreis.',
          kind: 'text',
          model: `Äquivalenzklassen:
ÄK1 minuten < 1            ungültig  (-5, 'Plus')   → -1
ÄK2 abo unbekannt          ungültig  (10, 'Gold')   → -1
ÄK3 Basis unter Höchstpreis gültig   (20, 'Basis')  → 6.00
ÄK4 Basis über Höchstpreis  gültig   (200, 'Basis') → 25.00
ÄK5 Plus unter Höchstpreis  gültig   (30, 'Plus')   → 4.50
ÄK6 Plus über Höchstpreis   gültig   (200, 'Plus')  → 25.00

Grenzwerte Basis (1.00 + 0.25 · m >= 25 ab m = 96):
(95, 'Basis') → 24.75
(96, 'Basis') → 25.00
(97, 'Basis') → 25.00 (rechnerisch 25.25, gedeckelt)
Untere Grenze: (0, 'Basis') → -1, (1, 'Basis') → 1.25`,
          criteria: [
            { text: 'Ungültige Klasse minuten < 1 mit -1', points: 1 },
            { text: 'Ungültige Klasse unbekanntes Abo mit -1', points: 1 },
            { text: 'Gültige Klassen je Abo unter und über Höchstpreis unterschieden', points: 2 },
            { text: 'Erwartete Ergebnisse der Testfälle richtig berechnet', points: 1 },
            { text: 'Grenzwerte 95/96/97 Minuten mit 24.75 / 25.00 / 25.00', points: 2 }
          ]
        },
        {
          id: 'b', points: 10,
          q: 'Ein Kollege hat die folgende Funktion geschrieben. Sie soll die durchschnittliche Strecke aller beendeten Ausleihen einer Liste liefern (0, wenn keine beendet ist). (1) Führen Sie einen Schreibtischtest mit einer Liste aus vier Ausleihen durch: Index 0 beendet mit 6.2 km, Index 1 beendet mit 9.8 km, Index 2 noch laufend, Index 3 beendet mit 3.1 km. Notieren Sie i, summe und anzahl nach jedem Durchlauf. (2) Benennen Sie die drei Fehler. (3) Geben Sie die korrigierte Funktion an und nennen Sie den korrekten Rückgabewert für die Testliste.',
          material: { code: `funktion durchschnittKm(ausleihen: Liste<Ausleihe>): double
  summe = 0
  anzahl = 0
  für i = 0 bis laenge(ausleihen)
    falls ausleihen[i].istBeendet() dann
      summe = summe + ausleihen[i].getKm()
    ende falls
    anzahl = anzahl + 1
  ende für
  rückgabe summe / anzahl
ende funktion` },
          kind: 'code',
          model: `(1) Tracetabelle:
i | beendet? | summe | anzahl
0 | ja       | 6.2   | 1
1 | ja       | 16.0  | 2
2 | nein     | 16.0  | 3
3 | ja       | 19.1  | 4
4 | Zugriff auf ausleihen[4] → Laufzeitfehler (Index außerhalb der Liste)
(ohne den Absturz wäre das Ergebnis 19.1 / 4 = 4.775, also falsch)

(2) Fehler:
1. Schleifengrenze: für i = 0 bis laenge(ausleihen) läuft einen Schritt
   zu weit, richtig ist laenge(ausleihen) - 1.
2. anzahl = anzahl + 1 steht außerhalb von falls, laufende Ausleihen
   werden mitgezählt.
3. Keine Prüfung auf anzahl == 0: Division durch 0 bei leerer Liste oder
   wenn keine Ausleihe beendet ist.

(3)
funktion durchschnittKm(ausleihen: Liste<Ausleihe>): double
  summe = 0
  anzahl = 0
  für i = 0 bis laenge(ausleihen) - 1
    falls ausleihen[i].istBeendet() dann
      summe = summe + ausleihen[i].getKm()
      anzahl = anzahl + 1
    ende falls
  ende für
  falls anzahl == 0 dann
    rückgabe 0
  ende falls
  rückgabe summe / anzahl
ende funktion

Korrekter Rückgabewert: 19.1 / 3 = 6.37 (gerundet)`,
          criteria: [
            { text: 'Tracetabelle für i = 0 bis 3 mit richtigen Werten für summe und anzahl', points: 2 },
            { text: 'Laufzeitfehler bei i = 4 erkannt', points: 1 },
            { text: 'Fehler Schleifengrenze (Off-by-one) benannt', points: 1 },
            { text: 'Fehler anzahl außerhalb der Bedingung benannt', points: 1 },
            { text: 'Fehler fehlende Prüfung auf Division durch 0 benannt', points: 1 },
            { text: 'Korrigierte Funktion behebt alle drei Fehler', points: 3 },
            { text: 'Korrekter Rückgabewert 6.37', points: 1 }
          ]
        },
        {
          id: 'c', points: 8,
          q: 'Stellen Sie den folgenden Ablauf als UML-Sequenzdiagramm (zeichnen oder in Textform) dar. Beteiligte (Lebenslinien): Kunde, App, Server, Datenbank, EBike. Geben Sie jede Nachricht im Format "Sender → Empfänger: nachricht(parameter)" an, Antworten mit gestricheltem Pfeil (--→), und kennzeichnen Sie die Alternative als alt-Fragment.\n\nDer Kunde scannt den QR-Code eines Rads in der App. Die App sendet eine Entsperranfrage mit BikeID und KundeID an den Server. Der Server lässt sich von der Datenbank den Kundenstatus geben. Ist der Kunde gesperrt, meldet der Server der App einen Fehler, die App zeigt eine Fehlermeldung an. Andernfalls sendet der Server dem E-Bike den Befehl zum Entsperren, das E-Bike bestätigt. Danach legt der Server die Ausleihe in der Datenbank an und erhält die AusleiheID zurück. Der Server bestätigt der App die Ausleihe, und die App zeigt dem Kunden den laufenden Timer an.',
          kind: 'diagram',
          diagram: `sequenceDiagram
  participant Kunde
  participant App
  participant Server
  participant Datenbank
  participant EBike
  Kunde->>App: qrCodeScannen(bikeID)
  App->>Server: entsperrAnfrage(bikeID, kundeID)
  Server->>Datenbank: getKundenstatus(kundeID)
  Datenbank-->>Server: status
  alt status == gesperrt
    Server-->>App: fehler("Kunde gesperrt")
    App->>Kunde: fehlermeldungAnzeigen()
  else status == aktiv
    Server->>EBike: entsperren()
    EBike-->>Server: ok
    Server->>Datenbank: ausleiheAnlegen(kundeID, bikeID, startzeit)
    Datenbank-->>Server: ausleiheID
    Server-->>App: bestaetigung(ausleiheID)
    App->>Kunde: timerAnzeigen()
  end`,
          model: `Kunde  → App:       qrCodeScannen(bikeID)
App    → Server:    entsperrAnfrage(bikeID, kundeID)
Server → Datenbank: getKundenstatus(kundeID)
Datenbank --→ Server: status

alt [status == gesperrt]
  Server --→ App:   fehler("Kunde gesperrt")
  App    → Kunde:   fehlermeldungAnzeigen()
else [status == aktiv]
  Server → EBike:   entsperren()
  EBike  --→ Server: ok
  Server → Datenbank: ausleiheAnlegen(kundeID, bikeID, startzeit)
  Datenbank --→ Server: ausleiheID
  Server --→ App:   bestaetigung(ausleiheID)
  App    → Kunde:   timerAnzeigen()
end alt`,
          criteria: [
            { text: 'Alle fünf Lebenslinien beteiligt', points: 1 },
            { text: 'Nachrichten in richtiger zeitlicher Reihenfolge bis zur Statusabfrage, Parameter bikeID und kundeID übergeben', points: 2 },
            { text: 'alt-Fragment mit beiden Bedingungen (gesperrt / nicht gesperrt)', points: 2 },
            { text: 'Entsperren am EBike und Anlegen der Ausleihe im richtigen Zweig', points: 2 },
            { text: 'Antworten als Rückantworten (gestrichelt) gekennzeichnet', points: 1 }
          ]
        }
      ]
    }
  ]
}
];
