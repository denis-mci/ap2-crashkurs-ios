// GA2-Prüfungsfälle, Teil 2: Entwicklung und Umsetzung von Algorithmen (je 90 Minuten, 4 x 25 Punkte)
const CASES_GA2B = [
// =====================================================================
// FALL 3: Ticketsystem eines IT-Dienstleisters
// =====================================================================
{
  id: 'ga2_fall3',
  area: 'GA2',
  title: 'Fall 3: Helpdesk-Ticketsystem eines IT-Dienstleisters',
  minutes: 90,
  scenario: 'Die ServiceWerk IT GmbH in Fulda betreut rund 120 kleine und mittlere Unternehmen aus der Region, von der Zahnarztpraxis bis zum Autohaus. Störungen melden die Kunden per E-Mail oder Telefon, je nach Wartungsvertrag (SLA Gold, Silber oder Bronze) gelten unterschiedliche Reaktionszeiten. Das bisherige Ticketsystem ist eine selbst gebaute Tabellenlösung, die weder Auswertungen noch eine automatische Eskalation erlaubt. Die Geschäftsführung hat deshalb die Eigenentwicklung "HelpPoint" beauftragt. Sie sind Auszubildende(r) zum Fachinformatiker für Anwendungsentwicklung und übernehmen im Projektteam Algorithmen, Datenbankabfragen, Modellierung und Tests. Die relationale Datenbank ist in Teilen bereits vorhanden (siehe Material).',
  material: [
    { title: 'Tabellenmodell (Primärschlüssel jeweils erstes Attribut, Fremdschlüssel mit ↑)', code: `Kunde(KundeID, Firma, Ort, SLA)
Mitarbeiter(MitarbeiterID, Name, Team, VorgesetzterID↑)
Ticket(TicketID, KundeID↑, MitarbeiterID↑, Kategorie, Prioritaet, Status, Erstellt, Geloest)
Zeitbuchung(BuchungID, TicketID↑, MitarbeiterID↑, Datum, Minuten)

SLA: 'Gold', 'Silber', 'Bronze'
Prioritaet: 1 = hoch, 2 = mittel, 3 = niedrig
Status: 'neu', 'in Bearbeitung', 'wartend', 'geloest', 'geschlossen'
Mitarbeiter.VorgesetzterID verweist auf Mitarbeiter.MitarbeiterID (NULL bei der Leitung).
Ticket.MitarbeiterID ist NULL, solange das Ticket niemandem zugewiesen ist.` },
    { title: 'Reaktionszeiten in Stunden je SLA und Priorität', table: [
      ['SLA','Priorität 1','Priorität 2','Priorität 3'],
      ['Gold','2','4','8'],
      ['Silber','4','8','24'],
      ['Bronze','8','24','48']
    ]},
    { title: 'Tabelle Kunde', table: [
      ['KundeID','Firma','Ort','SLA'],
      ['1','Zahnarztpraxis Dr. Roth','Fulda','Gold'],
      ['2','Holzbau Kremer GmbH','Hünfeld','Silber'],
      ['3','Autohaus Lindner KG','Fulda','Gold'],
      ['4','Physiotherapie Vital','Petersberg','Bronze'],
      ['5','Getränke Möller e.K.','Künzell','Silber'],
      ['6','Architekturbüro Nolte','Fulda','Bronze'],
      ['7','Hotel Bergblick','Gersfeld','Silber']
    ]},
    { title: 'Tabelle Mitarbeiter', table: [
      ['MitarbeiterID','Name','Team','VorgesetzterID'],
      ['1','Sabine Kraft','Leitung','NULL'],
      ['2','Markus Haas','1st Level','1'],
      ['3','Julia Weber','1st Level','2'],
      ['4','Deniz Arslan','1st Level','2'],
      ['5','Thomas Brehm','2nd Level','1'],
      ['6','Laura Pohl','2nd Level','5'],
      ['7','Felix Jung','2nd Level','5']
    ]},
    { title: 'Tabelle Ticket', table: [
      ['TicketID','KundeID','MitarbeiterID','Kategorie','Prioritaet','Status','Erstellt','Geloest'],
      ['1001','1','3','Zugang','2','geschlossen','2026-10-01 08:10','2026-10-01 09:00'],
      ['1002','1','6','Netzwerk','1','geloest','2026-10-02 07:45','2026-10-03 11:30'],
      ['1003','2','4','Hardware','3','in Bearbeitung','2026-10-05 10:00','NULL'],
      ['1004','3','5','Software','2','wartend','2026-10-06 13:20','NULL'],
      ['1005','3','3','Zugang','3','geschlossen','2026-10-06 15:00','2026-10-07 08:30'],
      ['1006','4','NULL','Hardware','2','neu','2026-10-08 09:15','NULL'],
      ['1007','5','7','Netzwerk','1','in Bearbeitung','2026-10-08 11:40','NULL'],
      ['1008','1','4','Software','3','in Bearbeitung','2026-10-09 08:05','NULL'],
      ['1009','3','6','Netzwerk','2','in Bearbeitung','2026-10-09 14:30','NULL'],
      ['1010','7','NULL','Software','1','neu','2026-10-12 07:30','NULL']
    ]},
    { title: 'Tabelle Zeitbuchung', table: [
      ['BuchungID','TicketID','MitarbeiterID','Datum','Minuten'],
      ['1','1001','3','2026-10-01','30'],
      ['2','1002','2','2026-10-02','20'],
      ['3','1002','6','2026-10-02','150'],
      ['4','1003','4','2026-10-05','45'],
      ['5','1004','5','2026-10-06','90'],
      ['6','1004','5','2026-10-07','60'],
      ['7','1005','3','2026-10-07','25'],
      ['8','1007','7','2026-10-08','120'],
      ['9','1009','6','2026-10-10','40'],
      ['10','1002','6','2026-10-03','30']
    ]},
    { title: 'Auszug Klasse Ticket (Getter)', table: [
      ['Methode','Rückgabe','Bedeutung'],
      ['getTicketID()','int','Ticketnummer'],
      ['getKategorie()','String','z. B. "Hardware"'],
      ['getPrioritaet()','int','1 = hoch bis 3 = niedrig'],
      ['getStatus()','String','siehe Tabellenmodell'],
      ['getAlterStunden()','int','volle Stunden seit Erstellung bis zum Stichtag 2026-10-12 10:00']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Algorithmen für das Ticket-Dashboard', points: 25,
      intro: 'Für das Dashboard der Teamleitung sollen offene Tickets ausgewertet und sortiert werden. Ein Ticket gilt als offen, wenn sein Status weder "geloest" noch "geschlossen" ist. Der Pseudocode ist frei wählbar, muss aber eindeutig sein. Listen und Arrays beginnen beim Index 0, laenge(x) liefert die Anzahl der Elemente, neues Array int[z][s] legt ein 2D-Array mit z Zeilen und s Spalten an, Zugriff mit m[zeile][spalte].',
      sub: [
        {
          id: 'a', points: 12,
          q: 'Entwickeln Sie in Pseudocode die Funktion ticketMatrix(tickets, kategorien). tickets ist eine Liste von Ticket-Objekten, kategorien ein String-Array mit den Kategorienamen, z. B. ["Hardware", "Software", "Netzwerk", "Zugang"]. Die Funktion gibt ein 2D-Array zurück, das je Kategorie (Zeile, gleiche Reihenfolge wie in kategorien) und je Priorität (Spalte 0 = Priorität 1 bis Spalte 2 = Priorität 3) die Anzahl der offenen Tickets enthält. Tickets mit einer Kategorie, die nicht im Array kategorien vorkommt, werden ignoriert.',
          kind: 'code',
          model: `funktion ticketMatrix(tickets: Liste<Ticket>, kategorien: String[]): int[][]
  anzahlKat = laenge(kategorien)
  matrix = neues Array int[anzahlKat][3]
  für z = 0 bis anzahlKat - 1
    für s = 0 bis 2
      matrix[z][s] = 0
    ende für
  ende für

  für jedes t in tickets
    falls t.getStatus() != "geloest" und t.getStatus() != "geschlossen" dann
      // Zeilenindex der Kategorie suchen
      zeile = -1
      für k = 0 bis anzahlKat - 1
        falls kategorien[k] == t.getKategorie() dann
          zeile = k
        ende falls
      ende für
      falls zeile != -1 dann
        spalte = t.getPrioritaet() - 1
        matrix[zeile][spalte] = matrix[zeile][spalte] + 1
      ende falls
    ende falls
  ende für

  rückgabe matrix
ende funktion`,
          criteria: [
            { text: '2D-Array mit laenge(kategorien) Zeilen und 3 Spalten angelegt und mit 0 initialisiert', points: 2 },
            { text: 'Schleife läuft über alle Tickets der Liste', points: 1 },
            { text: 'Filter auf offene Tickets: Status ungleich "geloest" UND ungleich "geschlossen" (nicht ODER)', points: 2 },
            { text: 'Zeilenindex wird per Suche im Array kategorien ermittelt (Vergleich mit getKategorie())', points: 3 },
            { text: 'Unbekannte Kategorie wird ignoriert (z. B. Startwert -1 und Prüfung vor dem Zugriff)', points: 1 },
            { text: 'Spaltenindex = Priorität minus 1, Zelle wird um 1 erhöht', points: 2 },
            { text: 'Matrix wird zurückgegeben', points: 1 }
          ]
        },
        {
          id: 'b', points: 8,
          q: 'Die offenen Tickets sollen nach Dringlichkeit sortiert werden: zuerst nach Priorität aufsteigend (1 vor 2 vor 3), bei gleicher Priorität das ältere Ticket (größeres getAlterStunden()) zuerst. Entwickeln Sie in Pseudocode die Prozedur sortiereNachDringlichkeit(tickets), die die Liste mit einem Sortierverfahren Ihrer Wahl (z. B. Bubble Sort) direkt in der Liste sortiert. Fertige Sortierfunktionen dürfen nicht verwendet werden.',
          kind: 'code',
          model: `prozedur sortiereNachDringlichkeit(tickets: Liste<Ticket>)
  n = laenge(tickets)
  für i = 0 bis n - 2
    für j = 0 bis n - 2 - i
      a = tickets[j]
      b = tickets[j + 1]
      falls a.getPrioritaet() > b.getPrioritaet()
            oder (a.getPrioritaet() == b.getPrioritaet()
                  und a.getAlterStunden() < b.getAlterStunden()) dann
        temp = tickets[j]              // Dreieckstausch
        tickets[j] = tickets[j + 1]
        tickets[j + 1] = temp
      ende falls
    ende für
  ende für
ende prozedur`,
          criteria: [
            { text: 'Zwei verschachtelte Schleifen eines korrekten Sortierverfahrens', points: 2 },
            { text: 'Schleifengrenzen korrekt, kein Zugriff auf Index n (innere Schleife bis n - 2 - i bzw. n - 2)', points: 1 },
            { text: 'Erstes Kriterium: Priorität aufsteigend (Tausch bei größerer Priorität links)', points: 1 },
            { text: 'Zweites Kriterium nur bei gleicher Priorität: Alter absteigend', points: 2 },
            { text: 'Korrekter Tausch mit Hilfsvariable (Dreieckstausch)', points: 2 }
          ]
        },
        {
          id: 'c', points: 5,
          q: 'Die Liste tickets enthält die zehn Tickets aus der Tabelle Ticket, kategorien = ["Hardware", "Software", "Netzwerk", "Zugang"]. (1) Geben Sie die Matrix an, die ticketMatrix liefert. (2) Die offenen Tickets haben zum Stichtag folgendes Alter in Stunden: 1003: 168, 1004: 140, 1006: 96, 1007: 94, 1008: 73, 1009: 67, 1010: 2. Geben Sie die Reihenfolge der TicketIDs nach sortiereNachDringlichkeit an. (3) Geben Sie die Zeitkomplexität von sortiereNachDringlichkeit in O-Notation an.',
          kind: 'text',
          model: `(1) Offen sind 1003, 1004, 1006, 1007, 1008, 1009, 1010.
             Prio 1  Prio 2  Prio 3
    Hardware [  0,      1,      1  ]   (1006, 1003)
    Software [  1,      1,      1  ]   (1010, 1004, 1008)
    Netzwerk [  1,      1,      0  ]   (1007, 1009)
    Zugang   [  0,      0,      0  ]   (1001 und 1005 sind geschlossen)

(2) 1007, 1010, 1004, 1006, 1009, 1003, 1008
    Prio 1: 1007 (94 h) vor 1010 (2 h)
    Prio 2: 1004 (140 h), 1006 (96 h), 1009 (67 h)
    Prio 3: 1003 (168 h) vor 1008 (73 h)

(3) O(n²), zwei verschachtelte Schleifen über die Liste.`,
          criteria: [
            { text: 'Zeilen Hardware [0,1,1] und Zugang [0,0,0] richtig', points: 1 },
            { text: 'Zeilen Software [1,1,1] und Netzwerk [1,1,0] richtig', points: 1 },
            { text: 'Sortierreihenfolge vollständig richtig', points: 2 },
            { text: 'O(n²) genannt', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: SQL-Auswertungen und Datenbankerweiterung', points: 25,
      intro: 'Die Teamleitung benötigt Auswertungen, außerdem soll die Datenbank um Kommentare erweitert werden. Verwenden Sie die Tabellen aus dem Material und Standard-SQL.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Erstellen Sie eine Abfrage, die je Kunde die Firma, die Anzahl der Tickets mit mindestens einer Zeitbuchung (Alias Tickets) und die Summe der gebuchten Minuten (Alias Minuten) ausgibt. Es sollen nur Kunden mit mehr als 100 gebuchten Minuten erscheinen, absteigend nach Minuten sortiert. Geben Sie die Ergebnistabelle an und erläutern Sie, warum COUNT(*) hier ein falsches Ergebnis liefern würde.',
          kind: 'code',
          model: `SELECT k.Firma,
       COUNT(DISTINCT t.TicketID) AS Tickets,
       SUM(z.Minuten) AS Minuten
FROM Kunde k
  JOIN Ticket t      ON t.KundeID = k.KundeID
  JOIN Zeitbuchung z ON z.TicketID = t.TicketID
GROUP BY k.KundeID, k.Firma
HAVING SUM(z.Minuten) > 100
ORDER BY Minuten DESC;

Ergebnis:
Firma                    | Tickets | Minuten
Zahnarztpraxis Dr. Roth  | 2       | 230
Autohaus Lindner KG      | 3       | 215
Getränke Möller e.K.     | 1       | 120

COUNT(*) zählt die Zeilen nach dem JOIN, also die Zeitbuchungen. Ticket
1002 hat drei Buchungen, damit hätte die Zahnarztpraxis 4 statt 2 Tickets,
das Autohaus ebenfalls 4 statt 3 (1004 hat zwei Buchungen).
COUNT(DISTINCT t.TicketID) zählt jedes Ticket nur einmal.`,
          criteria: [
            { text: 'Drei Tabellen über zwei JOINs mit korrekten ON-Bedingungen verknüpft', points: 2 },
            { text: 'COUNT(DISTINCT TicketID) und SUM(Minuten) mit Aliasen', points: 2 },
            { text: 'GROUP BY Kunde, HAVING SUM(Minuten) > 100 (nicht im WHERE)', points: 1 },
            { text: 'ORDER BY Minuten DESC', points: 1 },
            { text: 'Ergebnistabelle mit 230 / 2, 215 / 3 und 120 / 1 richtig', points: 1 },
            { text: 'Erläuterung: JOIN vervielfacht Zeilen je Zeitbuchung, COUNT(*) zählt Buchungen statt Tickets', points: 1 }
          ]
        },
        {
          id: 'b', points: 5,
          q: 'Für das Organigramm wird eine Liste aller Mitarbeiter mit Name, Team und dem Namen des direkten Vorgesetzten (Alias Vorgesetzter) benötigt. Auch die Leitung soll in der Liste erscheinen. Schreiben Sie die Abfrage, geben Sie das Ergebnis für Sabine Kraft und Julia Weber an und begründen Sie die Wahl des JOIN-Typs.',
          kind: 'code',
          model: `SELECT m.Name, m.Team, v.Name AS Vorgesetzter
FROM Mitarbeiter m
  LEFT JOIN Mitarbeiter v ON v.MitarbeiterID = m.VorgesetzterID
ORDER BY m.MitarbeiterID;

Sabine Kraft | Leitung   | NULL
Julia Weber  | 1st Level | Markus Haas

Begründung: Es ist ein Self-Join, die Tabelle wird mit zwei Aliasen (m, v)
mit sich selbst verknüpft. Ein INNER JOIN würde Sabine Kraft weglassen,
weil ihre VorgesetzterID NULL ist und keinen Partner findet. Der LEFT JOIN
liefert alle Mitarbeiter, fehlende Vorgesetzte werden mit NULL aufgefüllt.`,
          criteria: [
            { text: 'Tabelle Mitarbeiter zweimal mit unterschiedlichen Aliasen (Self-Join)', points: 1 },
            { text: 'ON-Bedingung v.MitarbeiterID = m.VorgesetzterID richtig herum', points: 1 },
            { text: 'LEFT (OUTER) JOIN verwendet', points: 1 },
            { text: 'Ergebnis: Sabine Kraft mit NULL, Julia Weber mit Markus Haas', points: 1 },
            { text: 'Begründung: INNER JOIN würde die Leitung (VorgesetzterID NULL) weglassen', points: 1 }
          ]
        },
        {
          id: 'c', points: 5,
          q: 'Die Teamleitung möchte alle offenen Tickets sehen, auf die noch keine Zeit gebucht wurde (TicketID, Firma des Kunden, Prioritaet), sortiert nach Priorität. Lösen Sie die Aufgabe mit NOT EXISTS und geben Sie die Ergebniszeilen an.',
          kind: 'code',
          model: `SELECT t.TicketID, k.Firma, t.Prioritaet
FROM Ticket t
  JOIN Kunde k ON k.KundeID = t.KundeID
WHERE t.Status NOT IN ('geloest', 'geschlossen')
  AND NOT EXISTS (SELECT *
                  FROM Zeitbuchung z
                  WHERE z.TicketID = t.TicketID)
ORDER BY t.Prioritaet;

Ergebnis:
1010 | Hotel Bergblick          | 1
1006 | Physiotherapie Vital     | 2
1008 | Zahnarztpraxis Dr. Roth  | 3`,
          criteria: [
            { text: 'JOIN Ticket und Kunde mit korrekter ON-Bedingung', points: 1 },
            { text: 'Filter auf offene Tickets (Status nicht geloest/geschlossen)', points: 1 },
            { text: 'NOT EXISTS mit korrelierter Unterabfrage (z.TicketID = t.TicketID)', points: 2 },
            { text: 'Ergebnis 1010, 1006, 1008 in dieser Reihenfolge', points: 1 }
          ]
        },
        {
          id: 'd', points: 7,
          q: '(1) Zu jedem Ticket sollen Kommentare gespeichert werden: eine fortlaufende KommentarID, das Ticket (Pflicht), der verfassende Mitarbeiter, der Zeitpunkt (Pflicht) und der Text (Pflicht, bis 2000 Zeichen). Wird ein Ticket gelöscht, sollen seine Kommentare automatisch mitgelöscht werden. Wird ein Mitarbeiter gelöscht, sollen seine Kommentare erhalten bleiben, der Verfasser ist dann leer. Schreiben Sie die CREATE TABLE-Anweisung. (2) Alle offenen Tickets (Status neu, in Bearbeitung oder wartend) von Gold-Kunden mit Priorität 2 sollen auf Priorität 1 hochgestuft werden. Schreiben Sie die UPDATE-Anweisung mit einer Unterabfrage und geben Sie die betroffenen TicketIDs an.',
          kind: 'code',
          model: `(1)
CREATE TABLE Kommentar (
  KommentarID   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                -- fortlaufend; MySQL: INT AUTO_INCREMENT PRIMARY KEY
  TicketID      INTEGER NOT NULL,
  MitarbeiterID INTEGER,
  Zeitpunkt     TIMESTAMP NOT NULL,
  Text          VARCHAR(2000) NOT NULL,
  FOREIGN KEY (TicketID) REFERENCES Ticket(TicketID)
    ON DELETE CASCADE,
  FOREIGN KEY (MitarbeiterID) REFERENCES Mitarbeiter(MitarbeiterID)
    ON DELETE SET NULL
);

(2)
UPDATE Ticket
SET Prioritaet = 1
WHERE Prioritaet = 2
  AND Status IN ('neu', 'in Bearbeitung', 'wartend')
  AND KundeID IN (SELECT KundeID FROM Kunde WHERE SLA = 'Gold');

Betroffen: 1004 und 1009 (beide Autohaus Lindner KG).
1001 ist zwar Gold und Priorität 2, aber geschlossen.`,
          criteria: [
            { text: 'Primärschlüssel KommentarID fortlaufend (IDENTITY bzw. AUTO_INCREMENT) und sinnvolle Datentypen', points: 1 },
            { text: 'NOT NULL bei TicketID, Zeitpunkt und Text, MitarbeiterID darf NULL sein', points: 1 },
            { text: 'Fremdschlüssel auf Ticket mit ON DELETE CASCADE', points: 1 },
            { text: 'Fremdschlüssel auf Mitarbeiter mit ON DELETE SET NULL', points: 1 },
            { text: 'UPDATE Ticket SET Prioritaet = 1 WHERE Prioritaet = 2 und offener Status', points: 1 },
            { text: 'Unterabfrage KundeID IN (SELECT ... WHERE SLA = \'Gold\')', points: 1 },
            { text: 'Betroffene Tickets 1004 und 1009 richtig', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: Geräteverwaltung modellieren und Ticket-Lebenszyklus', points: 25,
      intro: 'HelpPoint soll künftig auch die Geräte der Kunden kennen. Außerdem muss vor der Programmierung der Statuslogik eindeutig festgelegt werden, welche Statuswechsel ein Ticket durchlaufen darf.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Zeichnen Sie ein Entity-Relationship-Modell (Chen- oder Krähenfuß-Notation) mit Kardinalitäten für folgende Anforderungen. Die vorhandenen Entitäten Kunde und Ticket sind nur mit Primärschlüssel darzustellen.\n\nZu jedem Kunden werden seine Geräte erfasst. Ein Gerät hat eine Inventarnummer, eine Seriennummer und ein Kaufdatum und gehört genau einem Kunden. Jedes Gerät ist von genau einem Gerätetyp (z. B. Notebook, Drucker, Firewall), zu einem Gerätetyp werden Bezeichnung und Hersteller gespeichert, zu einem Hersteller Name und Support-Hotline. Ein Ticket kann mehrere Geräte betreffen, ein Gerät kann in vielen Tickets vorkommen. Je Ticket und Gerät wird festgehalten, ob das Gerät ausgetauscht wurde.',
          kind: 'diagram',
          model: `Entitäten und Attribute:
Kunde(KundeID)
Ticket(TicketID)
Geraet(InventarNr, Seriennummer, Kaufdatum)
Geraetetyp(TypID, Bezeichnung)
Hersteller(HerstellerID, Name, Hotline)

Beziehungen:
Kunde 1 : n Ticket          (meldet, vorhanden)
Kunde 1 : n Geraet          (besitzt)
Geraetetyp 1 : n Geraet     (typisiert)
Hersteller 1 : n Geraetetyp (stellt her)
Ticket m : n Geraet         (betrifft) mit Attribut Ausgetauscht

In Chen-Notation steht Ausgetauscht als Attribut an der Beziehung
"betrifft". In Krähenfuß-Notation wird die m:n-Beziehung über die
Entität Ticket_Geraet aufgelöst, die das Attribut Ausgetauscht trägt.`,
          diagram: `erDiagram
  KUNDE ||--o{ TICKET : meldet
  KUNDE ||--o{ GERAET : besitzt
  HERSTELLER ||--o{ GERAETETYP : stellt_her
  GERAETETYP ||--o{ GERAET : typisiert
  TICKET ||--o{ TICKET_GERAET : betrifft
  GERAET ||--o{ TICKET_GERAET : "betroffen in"
  KUNDE {
    int KundeID PK
  }
  TICKET {
    int TicketID PK
    int KundeID FK
  }
  GERAET {
    string InventarNr PK
    string Seriennummer
    date Kaufdatum
    int KundeID FK
    int TypID FK
  }
  GERAETETYP {
    int TypID PK
    string Bezeichnung
    int HerstellerID FK
  }
  HERSTELLER {
    int HerstellerID PK
    string Name
    string Hotline
  }
  TICKET_GERAET {
    int TicketID PK, FK
    string InventarNr PK, FK
    boolean Ausgetauscht
  }`,
          criteria: [
            { text: 'Entitäten Gerät, Gerätetyp und Hersteller mit den geforderten Attributen', points: 2 },
            { text: 'Kunde 1 : n Gerät', points: 1 },
            { text: 'Gerätetyp 1 : n Gerät und Hersteller 1 : n Gerätetyp', points: 2 },
            { text: 'Ticket m : n Gerät (bzw. über Zwischenentität aufgelöst)', points: 2 },
            { text: 'Attribut Ausgetauscht an der Beziehung bzw. Zwischenentität, nicht am Gerät', points: 1 }
          ]
        },
        {
          id: 'b', points: 5,
          q: 'Leiten Sie aus Ihrem ERM die neuen Tabellen in der 3. Normalform ab. Geben Sie sie in Textform an (Primärschlüssel mit PK, Fremdschlüssel mit ↑).',
          kind: 'code',
          model: `Hersteller(HerstellerID PK, Name, Hotline)
Geraetetyp(TypID PK, Bezeichnung, HerstellerID↑)
Geraet(InventarNr PK, Seriennummer, Kaufdatum, KundeID↑, TypID↑)
Ticket_Geraet(TicketID↑, InventarNr↑, Ausgetauscht)
  PK = (TicketID, InventarNr)

Hotline steht beim Hersteller und nicht beim Gerätetyp, sonst wäre sie
transitiv abhängig (TypID → HerstellerID → Hotline), Verstoß gegen die 3. NF.`,
          criteria: [
            { text: 'Tabellen Hersteller und Geraetetyp mit Fremdschlüssel HerstellerID', points: 1 },
            { text: 'Tabelle Geraet mit Fremdschlüsseln auf Kunde und Geraetetyp', points: 2 },
            { text: 'Zwischentabelle Ticket_Geraet mit zusammengesetztem PK und Attribut Ausgetauscht', points: 2 }
          ]
        },
        {
          id: 'c', points: 12,
          q: 'Zeichnen Sie für ein Ticket ein UML-Zustandsdiagramm mit Anfangs- und Endzustand. Beschriften Sie die Übergänge im Format "Ereignis [Bedingung] / Aktion".\n\nEin neu angelegtes Ticket hat den Zustand neu. Der Kunde kann ein neues Ticket zurückziehen, dann wird es geschlossen. Übernimmt ein Mitarbeiter das Ticket, wird er als Bearbeiter zugewiesen und das Ticket ist in Bearbeitung. Kann der 1st Level das Problem nicht lösen, wird das Ticket an den 2nd Level weitergeleitet, es bleibt in Bearbeitung, der Bearbeiter wird neu zugewiesen. Stellt der Mitarbeiter eine Rückfrage an den Kunden, ist das Ticket wartend. Antwortet der Kunde, ist es wieder in Bearbeitung, antwortet er nicht innerhalb von 10 Tagen, wird es geschlossen und der Kunde per E-Mail informiert. Ist das Problem behoben, wird eine Lösungsmail gesendet und das Ticket ist gelöst. Meldet der Kunde innerhalb von 5 Tagen, dass das Problem weiter besteht, ist es wieder in Bearbeitung und der Zähler wiedereroeffnet wird erhöht. Bestätigt der Kunde die Lösung oder sind 5 Tage vergangen, wird es geschlossen. Ein geschlossenes Ticket kann nicht mehr verändert werden.',
          kind: 'diagram',
          model: `● → neu: Ticket angelegt
neu            → geschlossen:    zurückziehen
neu            → in Bearbeitung: übernehmen / Bearbeiter zuweisen
in Bearbeitung → in Bearbeitung: an 2nd Level weiterleiten
                                 / Bearbeiter neu zuweisen   (Selbsttransition)
in Bearbeitung → wartend:        Rückfrage an Kunden
wartend        → in Bearbeitung: Kunde antwortet
wartend        → geschlossen:    after(10 Tage) / Kunden per E-Mail informieren
in Bearbeitung → gelöst:         Problem behoben / Lösungsmail senden
gelöst         → in Bearbeitung: Problem besteht weiter [innerhalb 5 Tage]
                                 / wiedereroeffnet erhöhen
gelöst         → geschlossen:    Kunde bestätigt Lösung
gelöst         → geschlossen:    after(5 Tage)
geschlossen    → ◉ Endzustand`,
          diagram: `stateDiagram-v2
  state "in Bearbeitung" as inBearbeitung
  state "gelöst" as geloest
  [*] --> neu : Ticket angelegt
  neu --> inBearbeitung : übernehmen / Bearbeiter zuweisen
  neu --> geschlossen : zurückziehen
  inBearbeitung --> inBearbeitung : an 2nd Level weiterleiten / Bearbeiter neu zuweisen
  inBearbeitung --> wartend : Rückfrage an Kunden
  wartend --> inBearbeitung : Kunde antwortet
  wartend --> geschlossen : after(10 Tage) / Kunden per E-Mail informieren
  inBearbeitung --> geloest : Problem behoben / Lösungsmail senden
  geloest --> inBearbeitung : Problem besteht weiter [innerhalb 5 Tage] / wiedereroeffnet erhöhen
  geloest --> geschlossen : Kunde bestätigt Lösung
  geloest --> geschlossen : after(5 Tage)
  geschlossen --> [*]`,
          criteria: [
            { text: 'Anfangszustand → neu und geschlossen → Endzustand', points: 1 },
            { text: 'Fünf Zustände neu, in Bearbeitung, wartend, gelöst, geschlossen', points: 2 },
            { text: 'neu → geschlossen (zurückziehen) und neu → in Bearbeitung mit Aktion Bearbeiter zuweisen', points: 2 },
            { text: 'Selbsttransition an 2nd Level weiterleiten / Bearbeiter neu zuweisen', points: 2 },
            { text: 'wartend: Rückweg bei Antwort und after(10 Tage) nach geschlossen mit Aktion', points: 2 },
            { text: 'gelöst → in Bearbeitung mit Bedingung [innerhalb 5 Tage] und Aktion Zähler erhöhen', points: 2 },
            { text: 'gelöst → geschlossen bei Bestätigung und nach 5 Tagen', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Fehlersuche, Ablauf und Tests', points: 25,
      intro: 'Ein Kollege hat die Funktion naechstesTicket geschrieben. Sie soll aus einer Liste das offene Ticket mit der höchsten Dringlichkeit liefern: kleinste Prioritätszahl, bei gleicher Priorität das ältere Ticket. Gibt es kein offenes Ticket, soll null zurückgegeben werden.',
      sub: [
        {
          id: 'a', points: 10,
          q: '(1) Führen Sie für die Liste [1004, 1005, 1010, 1002, 1007] (Index 0 bis 4, Daten aus der Tabelle Ticket, Alter in Stunden: 1004: 140, 1005: 139, 1010: 2, 1002: 242, 1007: 94) einen Schreibtischtest durch. Notieren Sie für jeden Schleifendurchlauf i, das betrachtete Ticket und den Wert von bestes. (2) Benennen Sie die drei Fehler mit Zeilennummer. (3) Geben Sie die korrigierten Zeilen und den korrekten Rückgabewert für die Testliste an.',
          material: { code: `01 funktion naechstesTicket(tickets: Liste<Ticket>): Ticket
02   bestes = null
03   für i = 1 bis laenge(tickets) - 1
04     t = tickets[i]
05     falls t.getStatus() != "geloest" oder t.getStatus() != "geschlossen" dann
06       falls bestes == null dann
07         bestes = t
08       sonst falls t.getPrioritaet() > bestes.getPrioritaet() dann
09         bestes = t
10       sonst falls t.getPrioritaet() == bestes.getPrioritaet()
11             und t.getAlterStunden() > bestes.getAlterStunden() dann
12         bestes = t
13       ende falls
14     ende falls
15   ende für
16   rückgabe bestes
17 ende funktion` },
          kind: 'code',
          model: `(1) Tracetabelle (fehlerhafte Funktion):
i | t                         | bestes
1 | 1005 (Prio 3, geschlossen) | 1005   (Bedingung Z05 ist immer wahr)
2 | 1010 (Prio 1)              | 1005   (1 > 3 falsch, Prio ungleich)
3 | 1002 (Prio 1, geloest)     | 1005
4 | 1007 (Prio 1)              | 1005
Rückgabe: 1005, ein geschlossenes Ticket. Index 0 (1004) wurde nie betrachtet.

(2) Fehler:
Z03: Schleife beginnt bei 1, das erste Ticket (Index 0) wird übersprungen.
Z05: oder statt und. Ein Status kann nie gleichzeitig "geloest" und
     "geschlossen" sein, die Bedingung ist daher immer wahr, auch
     geschlossene Tickets werden berücksichtigt.
Z08: > statt <. Gesucht ist die kleinste Prioritätszahl (1 = hoch).

(3) Korrektur:
03   für i = 0 bis laenge(tickets) - 1
05     falls t.getStatus() != "geloest" und t.getStatus() != "geschlossen" dann
08       sonst falls t.getPrioritaet() < bestes.getPrioritaet() dann

Korrekter Ablauf: i=0 1004 → bestes 1004; i=1 1005 übersprungen;
i=2 1010 (1 < 2) → 1010; i=3 1002 übersprungen;
i=4 1007 (gleiche Prio, 94 > 2) → 1007.
Korrekter Rückgabewert: Ticket 1007.`,
          criteria: [
            { text: 'Tracetabelle für i = 1 bis 4 mit bestes = 1005 in jedem Durchlauf', points: 2 },
            { text: 'Erkannt, dass die fehlerhafte Funktion ein geschlossenes Ticket liefert', points: 1 },
            { text: 'Fehler Z03 (Start bei 1 statt 0) benannt', points: 1 },
            { text: 'Fehler Z05 (oder statt und, Bedingung immer wahr) benannt', points: 2 },
            { text: 'Fehler Z08 (> statt <) benannt', points: 1 },
            { text: 'Alle drei Zeilen korrekt korrigiert', points: 2 },
            { text: 'Korrekter Rückgabewert Ticket 1007', points: 1 }
          ]
        },
        {
          id: 'b', points: 8,
          q: 'Zeichnen Sie den folgenden Ablauf als UML-Aktivitätsdiagramm mit den Partitionen (Swimlanes) System, 1st Level und 2nd Level.\n\nEine Störungsmeldung geht per E-Mail ein. Das System legt ein Ticket an und prüft den Absender. Ist der Absender keinem Kunden zugeordnet, sendet das System einen Hinweis auf das Kundenportal, und der Ablauf endet. Andernfalls ermittelt das System die Reaktionsfrist. Ein Mitarbeiter des 1st Level analysiert das Problem. Ist es lösbar, dokumentiert er die Lösung. Andernfalls leitet er das Ticket an den 2nd Level weiter, dort wird das Problem gelöst und die Lösung dokumentiert. Danach informiert das System gleichzeitig den Kunden über die Lösung und setzt den Status auf gelöst. Sind beide Aktionen abgeschlossen, endet der Ablauf.',
          kind: 'diagram',
          model: `[System]     ● Start → (Ticket aus E-Mail anlegen) → (Absender prüfen) → ◇
               [Absender unbekannt] → (Hinweis auf Kundenportal senden) → ◉ Ende
               [Kunde bekannt] → (Reaktionsfrist ermitteln)
[1st Level]  → (Problem analysieren) → ◇
               [lösbar] → (Lösung dokumentieren) → ◇ Zusammenführung
               [nicht lösbar] → (An 2nd Level weiterleiten)
[2nd Level]  → (Problem lösen) → (Lösung dokumentieren) → ◇ Zusammenführung
[System]     ◇ Zusammenführung → ▬ Gabelung
               → (Kunden über Lösung informieren)
               → (Status auf gelöst setzen)
             → ▬ Vereinigung → ◉ Ende`,
          diagram: `flowchart TD
  subgraph SYS["System"]
    S((" ")) --> A1("Ticket aus E-Mail anlegen")
    A1 --> A2("Absender prüfen")
    A2 --> D1{" "}
    D1 -->|"[Absender unbekannt]"| A3("Hinweis auf Kundenportal senden")
    A3 --> E1((("Ende")))
    D1 -->|"[Kunde bekannt]"| A4("Reaktionsfrist ermitteln")
    M1{" "} --> F1[" "]
    F1 --> A7("Kunden über Lösung informieren")
    F1 --> A8("Status auf gelöst setzen")
    A7 --> F2[" "]
    A8 --> F2
    F2 --> E2((("Ende")))
  end
  subgraph L1["1st Level"]
    A5("Problem analysieren") --> D2{" "}
    D2 -->|"[lösbar]"| A6("Lösung dokumentieren")
    D2 -->|"[nicht lösbar]"| A9("An 2nd Level weiterleiten")
  end
  subgraph L2["2nd Level"]
    A10("Problem lösen") --> A11("Lösung dokumentieren")
  end
  A4 --> A5
  A9 --> A10
  A6 --> M1
  A11 --> M1
  classDef bar fill:#000,stroke:#000,color:#000
  classDef start fill:#000,stroke:#000
  class F1,F2 bar
  class S start`,
          criteria: [
            { text: 'Startknoten und zwei Endknoten (Abbruch und reguläres Ende)', points: 1 },
            { text: 'Drei Swimlanes, Aktionen der richtigen Partition zugeordnet', points: 2 },
            { text: 'Entscheidung Absender mit beiden Bedingungen und Ende im Fehlerfall', points: 1 },
            { text: 'Entscheidung lösbar/nicht lösbar mit Weiterleitung an den 2nd Level', points: 1 },
            { text: 'Zusammenführungsknoten vor dem gemeinsamen Weiterlauf', points: 1 },
            { text: 'Gabelung und Vereinigung (Balken) für die beiden parallelen Aktionen', points: 2 }
          ]
        },
        {
          id: 'c', points: 7,
          q: 'Die Funktion reaktionsfrist(sla: String, prio: int): int liefert die Reaktionszeit in Stunden laut Tabelle im Material und -1 bei ungültiger Eingabe. (1) Bilden Sie Äquivalenzklassen für beide Parameter. (2) Schreiben Sie vier Unit-Tests im Format assertEquals(erwartet, reaktionsfrist(...)), darunter zwei Grenzwerttests für prio.',
          kind: 'code',
          model: `(1) Äquivalenzklassen:
sla:  ÄK1 "Gold"          gültig
      ÄK2 "Silber"        gültig
      ÄK3 "Bronze"        gültig
      ÄK4 sonstiger Text  ungültig (z. B. "Platin", "")
prio: ÄK5 prio < 1        ungültig
      ÄK6 1 <= prio <= 3  gültig
      ÄK7 prio > 3        ungültig

(2) Unit-Tests:
assertEquals(4,  reaktionsfrist("Gold", 2));     // ÄK1, ÄK6
assertEquals(48, reaktionsfrist("Bronze", 3));   // ÄK3, Grenzwert prio = 3
assertEquals(-1, reaktionsfrist("Silber", 0));   // ÄK5, Grenzwert prio = 0
assertEquals(-1, reaktionsfrist("Platin", 1));   // ÄK4
weitere sinnvolle Grenzwerte: prio = 1 (z. B. Silber → 4), prio = 4 → -1`,
          criteria: [
            { text: 'Drei gültige Klassen (bzw. eine gültige Klasse) für sla und ungültige Klasse für sonstige Werte', points: 1 },
            { text: 'prio: gültige Klasse 1 bis 3 und ungültige Klassen < 1 und > 3', points: 2 },
            { text: 'Vier Tests im Format assertEquals(erwartet, aufruf)', points: 1 },
            { text: 'Erwartete Werte stimmen mit der Tabelle bzw. -1 überein', points: 2 },
            { text: 'Zwei Grenzwerttests für prio (0/1 oder 3/4)', points: 1 }
          ]
        }
      ]
    }
  ]
},

// =====================================================================
// FALL 4: Online-Shop eines regionalen Händlers
// =====================================================================
{
  id: 'ga2_fall4',
  area: 'GA2',
  title: 'Fall 4: Online-Shop für regionale Spezialitäten',
  minutes: 90,
  scenario: 'Die Hofkiste Rhön GmbH vertreibt Wurst, Käse, Honig und Getränke von Erzeugern aus der Rhön über einen eigenen Online-Shop. Das Sortiment ist in einem Kategorienbaum organisiert, die Ware stammt von mehreren regionalen Lieferanten. Mit dem Wachstum häufen sich die Probleme: Versandkosten werden von Hand berechnet, Nachbestellungen vergessen und Retouren nur per E-Mail abgewickelt. Ihr Ausbildungsbetrieb, eine Webagentur in Fulda, erweitert den Shop. Sie sind Auszubildende(r) zum Fachinformatiker für Anwendungsentwicklung und übernehmen Algorithmen, Datenbankabfragen, Modellierung und Tests.',
  material: [
    { title: 'Tabellenmodell (Primärschlüssel jeweils erstes Attribut, bei Bestellposition beide ersten Attribute, Fremdschlüssel mit ↑)', code: `Lieferant(LieferantID, Firma, Ort)
Kategorie(KategorieID, Bezeichnung, OberkategorieID↑)
Artikel(ArtikelID, Bezeichnung, KategorieID↑, LieferantID↑, Preis, Bestand, Mindestbestand)
Kunde(KundeID, Name, PLZ, Ort, Newsletter)
Bestellung(BestellID, KundeID↑, Datum, Status)
Bestellposition(BestellID↑, ArtikelID↑, Menge, Einzelpreis)

Kategorie.OberkategorieID verweist auf Kategorie.KategorieID (NULL bei Hauptkategorien).
Newsletter: 1 = abonniert, 0 = nicht abonniert
Status: 'offen', 'versendet', 'storniert'
Einzelpreis ist der Preis zum Bestellzeitpunkt.` },
    { title: 'Tabelle Lieferant', table: [
      ['LieferantID','Firma','Ort'],
      ['1','Metzgerei Wehner','Tann'],
      ['2','Imkerei Sommer','Gersfeld'],
      ['3','Rhönschaf-Hof Bauer','Hilders'],
      ['4','Brauerei Bergquell','Fulda'],
      ['5','Käserei Talblick','Poppenhausen']
    ]},
    { title: 'Tabelle Kategorie', table: [
      ['KategorieID','Bezeichnung','OberkategorieID'],
      ['1','Lebensmittel','NULL'],
      ['2','Getränke','NULL'],
      ['3','Wurst & Fleisch','1'],
      ['4','Süßes & Honig','1'],
      ['5','Käse','1'],
      ['6','Bier','2'],
      ['7','Ahle Wurst','3'],
      ['8','Präsentkörbe','NULL']
    ]},
    { title: 'Tabelle Artikel', table: [
      ['ArtikelID','Bezeichnung','KategorieID','LieferantID','Preis','Bestand','Mindestbestand'],
      ['101','Ahle Wurst Stracke 500 g','7','1','14.90','12','10'],
      ['102','Ahle Wurst Dürre 250 g','7','1','7.50','4','10'],
      ['103','Rhönschaf-Salami 200 g','3','3','6.90','25','15'],
      ['104','Blütenhonig 500 g','4','2','8.50','30','20'],
      ['105','Waldhonig 500 g','4','2','9.90','8','10'],
      ['106','Bergkäse 300 g','5','5','7.80','18','10'],
      ['107','Rhöner Landbier 6er','6','4','9.60','40','24'],
      ['108','Kräuterlikör 0,5 l','2','4','16.50','6','6']
    ]},
    { title: 'Tabelle Kunde', table: [
      ['KundeID','Name','PLZ','Ort','Newsletter'],
      ['1','Anna Roth','36037','Fulda','1'],
      ['2','Peter Klee','36088','Hünfeld','0'],
      ['3','Miriam Groß','60311','Frankfurt','1'],
      ['4','Jonas Brand','99084','Erfurt','0'],
      ['5','Sophie Lenz','36129','Gersfeld','1'],
      ['6','Erik Vogel','36037','Fulda','0'],
      ['7','Hanna Wolf','97070','Würzburg','1']
    ]},
    { title: 'Tabelle Bestellung', table: [
      ['BestellID','KundeID','Datum','Status'],
      ['5001','1','2026-09-03','versendet'],
      ['5002','3','2026-09-05','versendet'],
      ['5003','2','2026-09-10','storniert'],
      ['5004','1','2026-09-18','versendet'],
      ['5005','4','2026-09-22','versendet'],
      ['5006','5','2026-10-01','offen'],
      ['5007','7','2026-10-06','offen']
    ]},
    { title: 'Tabelle Bestellposition (sortiert nach BestellID)', table: [
      ['BestellID','ArtikelID','Menge','Einzelpreis'],
      ['5001','101','2','13.90'],
      ['5001','104','1','8.50'],
      ['5002','107','3','9.60'],
      ['5002','106','2','7.80'],
      ['5002','108','1','16.50'],
      ['5003','105','2','9.90'],
      ['5004','102','4','7.50'],
      ['5005','103','2','6.90'],
      ['5006','104','6','8.50'],
      ['5007','106','1','7.80']
    ]},
    { title: 'Auszug Klassen (Getter und Konstruktor)', table: [
      ['Klasse','Methode','Rückgabe'],
      ['Bestellposition','getBestellID()','int'],
      ['Bestellposition','getMenge()','int'],
      ['Bestellposition','getEinzelpreis()','double'],
      ['Bestellsumme','neue Bestellsumme(bestellID: int, warenwert: double, versand: double)','Konstruktor'],
      ['Kategorie','getKategorieID()','int'],
      ['Kategorie','getBezeichnung()','String'],
      ['Kategorie','getOberkategorieID()','int (0 bei Hauptkategorie)']
    ]}
  ],
  tasks: [
    {
      nr: 1, title: 'Handlungsschritt 1: Algorithmen für Bestellungen, Gutscheine und Kategorien', points: 25,
      intro: 'Pseudocode ist frei wählbar, muss aber eindeutig sein. Listen und Strings beginnen beim Index 0, laenge(x) liefert die Anzahl der Elemente bzw. Zeichen, s[i] liefert das Zeichen an Position i. Strings werden mit + verkettet.',
      sub: [
        {
          id: 'a', points: 12,
          q: 'Für die Rechnungsstellung sollen die Bestellpositionen zu Bestellsummen zusammengefasst werden. Entwickeln Sie in Pseudocode die Funktion bestellsummen(positionen). positionen ist eine nach BestellID sortierte Liste von Bestellposition-Objekten. Die Funktion gibt eine Liste von Bestellsumme-Objekten zurück, je Bestellung eines mit dem Warenwert (Summe aus Menge mal Einzelpreis) und den Versandkosten: 4.90 Euro bei einem Warenwert unter 50 Euro, sonst 0 Euro. Die Liste positionen soll nur einmal durchlaufen werden. Bei einer leeren Liste wird eine leere Liste zurückgegeben.',
          kind: 'code',
          model: `funktion bestellsummen(positionen: Liste<Bestellposition>): Liste<Bestellsumme>
  ergebnis = neue Liste<Bestellsumme>
  falls laenge(positionen) == 0 dann
    rückgabe ergebnis
  ende falls

  aktuelleID = positionen[0].getBestellID()
  warenwert = 0

  für jede p in positionen
    falls p.getBestellID() != aktuelleID dann     // Gruppenwechsel
      ergebnis.hinzufuegen(neue Bestellsumme(aktuelleID, warenwert,
                                             versandkosten(warenwert)))
      aktuelleID = p.getBestellID()
      warenwert = 0
    ende falls
    warenwert = warenwert + p.getMenge() * p.getEinzelpreis()
  ende für

  // letzte Gruppe abschließen
  ergebnis.hinzufuegen(neue Bestellsumme(aktuelleID, warenwert,
                                         versandkosten(warenwert)))
  rückgabe ergebnis
ende funktion

funktion versandkosten(warenwert: double): double
  falls warenwert < 50 dann
    rückgabe 4.90
  ende falls
  rückgabe 0
ende funktion`,
          criteria: [
            { text: 'Leere Ergebnisliste angelegt und Sonderfall leere Eingabeliste behandelt', points: 1 },
            { text: 'Gruppenschlüssel mit BestellID der ersten Position und Warenwert mit 0 initialisiert', points: 2 },
            { text: 'Eine Schleife über alle Positionen', points: 1 },
            { text: 'Gruppenwechsel erkannt (BestellID ungleich aktueller ID): Summe speichern, ID übernehmen, Warenwert auf 0', points: 3 },
            { text: 'Warenwert += Menge * Einzelpreis für jede Position (auch die erste der neuen Gruppe)', points: 2 },
            { text: 'Versandkosten 4.90 bei Warenwert < 50, sonst 0', points: 1 },
            { text: 'Letzte Gruppe nach der Schleife hinzugefügt und Liste zurückgegeben', points: 2 }
          ]
        },
        {
          id: 'b', points: 7,
          q: 'Gutscheincodes bestehen aus genau 9 Zeichen: den Großbuchstaben "HK", gefolgt von 6 Ziffern und einer Prüfziffer. Die Prüfziffer ist die Summe der 6 Ziffern modulo 10 (Beispiel: HK2026044, 2+0+2+6+0+4 = 14, Prüfziffer 4). Entwickeln Sie in Pseudocode die Funktion pruefeGutschein(code): boolean. Verfügbar sind istZiffer(zeichen): boolean und ziffernwert(zeichen): int sowie der Operator mod. Geben Sie außerdem das Ergebnis für "HK2026047" und "HK20260A4" an.',
          kind: 'code',
          model: `funktion pruefeGutschein(code: String): boolean
  falls laenge(code) != 9 dann
    rückgabe falsch
  ende falls
  falls code[0] != "H" oder code[1] != "K" dann
    rückgabe falsch
  ende falls
  summe = 0
  für i = 2 bis 7
    falls nicht istZiffer(code[i]) dann
      rückgabe falsch
    ende falls
    summe = summe + ziffernwert(code[i])
  ende für
  falls nicht istZiffer(code[8]) dann
    rückgabe falsch
  ende falls
  rückgabe summe mod 10 == ziffernwert(code[8])
ende funktion

"HK2026047" → falsch (Summe 14, Prüfziffer müsste 4 sein, ist 7)
"HK20260A4" → falsch (an Position 7 steht "A", keine Ziffer)`,
          criteria: [
            { text: 'Länge 9 geprüft', points: 1 },
            { text: 'Präfix "HK" über code[0] und code[1] geprüft', points: 1 },
            { text: 'Schleife über die Positionen 2 bis 7 mit Ziffernprüfung', points: 2 },
            { text: 'Summe gebildet und mit Prüfziffer (mod 10) an Position 8 verglichen', points: 2 },
            { text: 'Beide Beispielcodes richtig als ungültig erkannt', points: 1 }
          ]
        },
        {
          id: 'c', points: 6,
          q: 'Im Shop soll über jedem Artikel der Kategoriepfad angezeigt werden, z. B. "Lebensmittel > Wurst & Fleisch > Ahle Wurst". Entwickeln Sie die Funktion kategoriePfad(kategorieID, kategorien) rekursiv, ohne Schleife. Zur Verfügung steht findeKategorie(id, kategorien): Kategorie. Geben Sie die Folge der rekursiven Aufrufe für kategoriePfad(7, kategorien) mit Rückgabewert an und nennen Sie die Folge einer fehlenden Abbruchbedingung.',
          kind: 'code',
          model: `funktion kategoriePfad(kategorieID: int, kategorien: Liste<Kategorie>): String
  k = findeKategorie(kategorieID, kategorien)
  falls k.getOberkategorieID() == 0 dann            // Abbruchbedingung
    rückgabe k.getBezeichnung()
  ende falls
  rückgabe kategoriePfad(k.getOberkategorieID(), kategorien)
           + " > " + k.getBezeichnung()             // Selbstaufruf
ende funktion

Aufrufe:
kategoriePfad(7) → ruft kategoriePfad(3) auf
  kategoriePfad(3) → ruft kategoriePfad(1) auf
    kategoriePfad(1) → Hauptkategorie, liefert "Lebensmittel"
  liefert "Lebensmittel > Wurst & Fleisch"
liefert "Lebensmittel > Wurst & Fleisch > Ahle Wurst"

Ohne Abbruchbedingung ruft sich die Funktion endlos selbst auf, bis der
Aufrufstapel voll ist (Stack Overflow) bzw. findeKategorie(0) fehlschlägt.`,
          criteria: [
            { text: 'Abbruchbedingung: Hauptkategorie (Oberkategorie 0) liefert nur die Bezeichnung', points: 2 },
            { text: 'Rekursiver Aufruf mit der OberkategorieID, Ergebnis vorne mit " > " und eigener Bezeichnung verkettet', points: 2 },
            { text: 'Aufruffolge 7 → 3 → 1 und Rückgabe "Lebensmittel > Wurst & Fleisch > Ahle Wurst"', points: 1 },
            { text: 'Folge: Endlosrekursion bzw. Stack Overflow', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 2, title: 'Handlungsschritt 2: SQL für Controlling und Lager', points: 25,
      intro: 'Controlling, Marketing und Lager benötigen Abfragen auf die Shop-Datenbank. Verwenden Sie die Tabellen aus dem Material und Standard-SQL.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Erstellen Sie eine Abfrage, die je Kategorie die Bezeichnung, die Anzahl verkaufter Stück (Alias Stueck) und den Umsatz (Summe aus Menge mal Einzelpreis, Alias Umsatz) ausgibt. Berücksichtigt werden nur versendete Bestellungen. Es sollen nur Kategorien mit einem Umsatz über 20 Euro erscheinen, absteigend nach Umsatz sortiert. Geben Sie die Ergebnistabelle an.',
          kind: 'code',
          model: `SELECT k.Bezeichnung,
       SUM(p.Menge) AS Stueck,
       SUM(p.Menge * p.Einzelpreis) AS Umsatz
FROM Kategorie k
  JOIN Artikel a         ON a.KategorieID = k.KategorieID
  JOIN Bestellposition p ON p.ArtikelID = a.ArtikelID
  JOIN Bestellung b      ON b.BestellID = p.BestellID
WHERE b.Status = 'versendet'
GROUP BY k.KategorieID, k.Bezeichnung
HAVING SUM(p.Menge * p.Einzelpreis) > 20
ORDER BY Umsatz DESC;

Ergebnis:
Bezeichnung | Stueck | Umsatz
Ahle Wurst  | 6      | 57.80   (5001: 2 x 13.90, 5004: 4 x 7.50)
Bier        | 3      | 28.80   (5002: 3 x 9.60)

(Käse 15.60, Getränke 16.50, Wurst & Fleisch 13.80, Süßes & Honig 8.50
liegen unter 20 Euro. 5003 ist storniert, 5006 und 5007 sind offen.)`,
          criteria: [
            { text: 'Vier Tabellen über drei JOINs mit korrekten ON-Bedingungen', points: 2 },
            { text: 'WHERE Status = \'versendet\'', points: 1 },
            { text: 'SUM(Menge) und SUM(Menge * Einzelpreis) mit Aliasen, Einzelpreis statt Artikel.Preis', points: 1 },
            { text: 'GROUP BY Kategorie, HAVING SUM(...) > 20', points: 2 },
            { text: 'ORDER BY Umsatz DESC', points: 1 },
            { text: 'Ergebnis Ahle Wurst 6 / 57.80 und Bier 3 / 28.80', points: 1 }
          ]
        },
        {
          id: 'b', points: 5,
          q: 'Geben Sie alle Artikel (ArtikelID, Bezeichnung, Preis) aus, deren Preis über dem Durchschnittspreis der Artikel ihrer eigenen Kategorie liegt. Verwenden Sie eine korrelierte Unterabfrage und geben Sie die Ergebniszeilen mit den jeweiligen Durchschnittswerten an.',
          kind: 'code',
          model: `SELECT a.ArtikelID, a.Bezeichnung, a.Preis
FROM Artikel a
WHERE a.Preis > (SELECT AVG(a2.Preis)
                 FROM Artikel a2
                 WHERE a2.KategorieID = a.KategorieID);

Ergebnis:
101 | Ahle Wurst Stracke 500 g | 14.90   (Durchschnitt Kategorie 7: 11.20)
105 | Waldhonig 500 g          | 9.90    (Durchschnitt Kategorie 4: 9.20)

Kategorien mit nur einem Artikel liefern nichts, weil der Preis dort
gleich dem Durchschnitt ist.`,
          criteria: [
            { text: 'Unterabfrage mit AVG(Preis) im WHERE', points: 1 },
            { text: 'Korrelation über a2.KategorieID = a.KategorieID mit zwei Aliasen', points: 2 },
            { text: 'Ergebnis 101 und 105 richtig', points: 1 },
            { text: 'Durchschnitte 11.20 und 9.20 richtig', points: 1 }
          ]
        },
        {
          id: 'c', points: 5,
          q: 'Für den Versand von Weihnachtsgrüßen benötigt das Marketing eine gemeinsame Liste aus allen Kunden mit Newsletter-Abo und allen Lieferanten mit den Spalten Name, Ort und Typ (\'Kunde\' bzw. \'Lieferant\'), sortiert nach Ort und Name. (1) Schreiben Sie die Abfrage. (2) Geben Sie an, wie viele Zeilen entstehen und welche Zeile an erster Stelle steht. (3) Erläutern Sie den Unterschied zwischen UNION und UNION ALL.',
          kind: 'code',
          model: `(1)
SELECT Name, Ort, 'Kunde' AS Typ
FROM Kunde
WHERE Newsletter = 1
UNION
SELECT Firma, Ort, 'Lieferant'
FROM Lieferant
ORDER BY Ort, Name;

(2) 9 Zeilen (4 Kunden: Roth, Groß, Lenz, Wolf und 5 Lieferanten).
    Erste Zeile: Miriam Groß | Frankfurt | Kunde

(3) UNION entfernt doppelte Zeilen aus dem Gesamtergebnis (dafür wird
    intern sortiert bzw. verglichen), UNION ALL übernimmt alle Zeilen
    unverändert und ist schneller. Beide verlangen gleich viele Spalten
    mit verträglichen Datentypen, ORDER BY steht nur einmal am Ende.`,
          criteria: [
            { text: 'Zwei SELECTs mit gleicher Spaltenanzahl, verbunden mit UNION', points: 1 },
            { text: 'Konstante Typ-Spalte und WHERE Newsletter = 1 im ersten SELECT', points: 1 },
            { text: 'ORDER BY Ort, Name einmal am Ende', points: 1 },
            { text: '9 Zeilen und erste Zeile Miriam Groß (Frankfurt) genannt', points: 1 },
            { text: 'Unterschied: UNION entfernt Duplikate, UNION ALL nicht', points: 1 }
          ]
        },
        {
          id: 'd', points: 7,
          q: '(1) Die Tabelle Nachbestellung(NachbestellID, ArtikelID, LieferantID, Menge, Datum) existiert bereits, NachbestellID wird automatisch vergeben. Legen Sie mit einer einzigen Anweisung für jeden Artikel, dessen Bestand unter dem Mindestbestand liegt, eine Nachbestellung mit dem heutigen Datum an. Bestellt wird so viel, dass der Bestand danach doppelt so hoch ist wie der Mindestbestand. Geben Sie die entstehenden Datensätze an. (2) Stornierte Bestellungen sollen gelöscht werden. Schreiben Sie die notwendigen DELETE-Anweisungen in der richtigen Reihenfolge und begründen Sie die Reihenfolge.',
          kind: 'code',
          model: `(1)
INSERT INTO Nachbestellung (ArtikelID, LieferantID, Menge, Datum)
SELECT ArtikelID, LieferantID, 2 * Mindestbestand - Bestand, CURRENT_DATE
FROM Artikel
WHERE Bestand < Mindestbestand;

Es entstehen 2 Datensätze:
Artikel 102, Lieferant 1, Menge 16  (2 * 10 - 4)
Artikel 105, Lieferant 2, Menge 12  (2 * 10 - 8)
Artikel 108 (Bestand 6 = Mindestbestand 6) wird nicht nachbestellt.

(2)
DELETE FROM Bestellposition
WHERE BestellID IN (SELECT BestellID FROM Bestellung
                    WHERE Status = 'storniert');
DELETE FROM Bestellung
WHERE Status = 'storniert';

Begründung: Bestellposition verweist per Fremdschlüssel auf Bestellung.
Würde zuerst die Bestellung 5003 gelöscht, verletzte das die referentielle
Integrität, das DBMS lehnt das Löschen ab (sofern kein ON DELETE CASCADE
definiert ist). Daher zuerst die abhängigen Positionen löschen.`,
          criteria: [
            { text: 'INSERT INTO Nachbestellung mit Spaltenliste ohne NachbestellID', points: 1 },
            { text: 'SELECT statt VALUES mit berechneter Menge 2 * Mindestbestand - Bestand und aktuellem Datum', points: 2 },
            { text: 'WHERE Bestand < Mindestbestand, Datensätze 102/16 und 105/12 genannt', points: 1 },
            { text: 'Zuerst DELETE der Bestellpositionen per Unterabfrage auf stornierte Bestellungen', points: 1 },
            { text: 'Danach DELETE FROM Bestellung WHERE Status = \'storniert\'', points: 1 },
            { text: 'Begründung über Fremdschlüssel bzw. referentielle Integrität', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 3, title: 'Handlungsschritt 3: Bewertungen und Retouren modellieren, Bestellablauf', points: 25,
      intro: 'Der Shop soll Kundenbewertungen und eine geordnete Retourenabwicklung erhalten. Außerdem soll das Zusammenspiel der Komponenten beim Abschicken einer Bestellung dokumentiert werden.',
      sub: [
        {
          id: 'a', points: 9,
          q: 'Zeichnen Sie ein Entity-Relationship-Modell (Chen- oder Krähenfuß-Notation) mit Kardinalitäten. Die vorhandenen Entitäten Kunde, Artikel und Bestellung sind nur mit Schlüsseln darzustellen.\n\nKunden können Artikel bewerten. Eine Bewertung enthält 1 bis 5 Sterne, einen optionalen Text und das Datum; jeder Kunde darf einen Artikel nur einmal bewerten. Zu einer Bestellung kann es mehrere Retouren geben, eine Retoure gehört zu genau einer Bestellung und hat ein Eingangsdatum. In einer Retoure werden ein oder mehrere Artikel mit jeweils einer Menge zurückgeschickt. Zu jedem zurückgeschickten Artikel wird genau ein Rückgabegrund aus einer festen Liste (z. B. beschädigt, falscher Artikel, gefällt nicht) gespeichert.',
          kind: 'diagram',
          model: `Entitäten:
Kunde(KundeID), Artikel(ArtikelID), Bestellung(BestellID)
Retoure(RetoureID, Eingangsdatum)
Rueckgabegrund(GrundID, Bezeichnung)

Beziehungen:
Kunde m : n Artikel       "bewertet" mit Attributen Sterne, Text, Datum
                          (Krähenfuß: Entität Bewertung mit PK (KundeID, ArtikelID),
                          der zusammengesetzte Schlüssel erzwingt "nur einmal")
Kunde 1 : n Bestellung    (vorhanden)
Bestellung 1 : n Retoure  (eine Bestellung kann 0..n Retouren haben)
Retoure m : n Artikel     "enthält" mit Attribut Menge
                          (Krähenfuß: Retourenposition, je Retoure mindestens 1)
Rueckgabegrund 1 : n Retourenposition (jede Position genau ein Grund)`,
          diagram: `erDiagram
  KUNDE ||--o{ BEWERTUNG : schreibt
  ARTIKEL ||--o{ BEWERTUNG : erhaelt
  KUNDE ||--o{ BESTELLUNG : gibt_auf
  BESTELLUNG ||--o{ RETOURE : hat
  RETOURE ||--|{ RETOURENPOSITION : umfasst
  ARTIKEL ||--o{ RETOURENPOSITION : betroffen
  RUECKGABEGRUND ||--o{ RETOURENPOSITION : begruendet
  KUNDE {
    int KundeID PK
  }
  ARTIKEL {
    int ArtikelID PK
  }
  BESTELLUNG {
    int BestellID PK
    int KundeID FK
  }
  BEWERTUNG {
    int KundeID PK, FK
    int ArtikelID PK, FK
    int Sterne
    string Text
    date Datum
  }
  RETOURE {
    int RetoureID PK
    int BestellID FK
    date Eingangsdatum
  }
  RETOURENPOSITION {
    int RetoureID PK, FK
    int ArtikelID PK, FK
    int Menge
    int GrundID FK
  }
  RUECKGABEGRUND {
    int GrundID PK
    string Bezeichnung
  }`,
          criteria: [
            { text: 'Bewertung als m:n zwischen Kunde und Artikel bzw. als Entität mit Sterne, Text, Datum', points: 2 },
            { text: 'Eindeutigkeit Kunde/Artikel über zusammengesetzten Schlüssel oder Beziehungsdefinition erkennbar', points: 1 },
            { text: 'Entität Retoure mit Eingangsdatum, Bestellung 1 : n Retoure', points: 2 },
            { text: 'Retoure m : n Artikel mit Attribut Menge (bzw. Retourenposition, mindestens eine je Retoure)', points: 2 },
            { text: 'Eigene Entität Rückgabegrund, 1 : n zur Retourenposition', points: 2 }
          ]
        },
        {
          id: 'b', points: 4,
          q: 'Leiten Sie aus Ihrem ERM die neuen Tabellen in der 3. Normalform ab (Primärschlüssel mit PK, Fremdschlüssel mit ↑).',
          kind: 'code',
          model: `Bewertung(KundeID↑, ArtikelID↑, Sterne, Text, Datum)
  PK = (KundeID, ArtikelID)
Retoure(RetoureID PK, BestellID↑, Eingangsdatum)
Rueckgabegrund(GrundID PK, Bezeichnung)
Retourenposition(RetoureID↑, ArtikelID↑, Menge, GrundID↑)
  PK = (RetoureID, ArtikelID)`,
          criteria: [
            { text: 'Bewertung mit zusammengesetztem PK (KundeID, ArtikelID)', points: 1 },
            { text: 'Retoure mit Fremdschlüssel BestellID', points: 1 },
            { text: 'Rueckgabegrund als eigene Tabelle', points: 1 },
            { text: 'Retourenposition mit PK (RetoureID, ArtikelID), Menge und FK GrundID', points: 1 }
          ]
        },
        {
          id: 'c', points: 12,
          q: 'Zeichnen Sie den folgenden Ablauf als UML-Sequenzdiagramm mit den Lebenslinien Kunde, Webshop, Bestellservice, Lager und Zahlungsdienst. Verwenden Sie für Wiederholungen und Alternativen die passenden kombinierten Fragmente.\n\nDer Kunde klickt im Webshop auf "Jetzt kaufen". Der Webshop übergibt den Warenkorb an den Bestellservice. Der Bestellservice prüft für jede Position beim Lager die Verfügbarkeit von Artikel und Menge. Ist mindestens ein Artikel nicht verfügbar, meldet der Bestellservice dem Webshop einen Fehler, und der Webshop zeigt dem Kunden einen Hinweis an. Andernfalls fordert der Bestellservice beim Zahlungsdienst die Zahlung über den Gesamtbetrag an. Ist die Zahlung erfolgreich, reserviert der Bestellservice die Ware im Lager, erhält eine Bestätigung und gibt die Bestellnummer an den Webshop zurück, der dem Kunden die Bestellbestätigung anzeigt. Wird die Zahlung abgelehnt, meldet der Bestellservice dem Webshop einen Zahlungsfehler, der Webshop zeigt eine Fehlermeldung an.',
          kind: 'diagram',
          model: `Kunde → Webshop: jetztKaufen()
Webshop → Bestellservice: bestellen(warenkorb)
loop [für jede Position]
  Bestellservice → Lager: pruefeVerfuegbarkeit(artikelID, menge)
  Lager --→ Bestellservice: verfuegbar
end loop
alt [mindestens ein Artikel nicht verfügbar]
  Bestellservice --→ Webshop: fehler(nichtVerfuegbar)
  Webshop → Kunde: hinweisAnzeigen()
else [alle Artikel verfügbar]
  Bestellservice → Zahlungsdienst: zahlungAnfordern(gesamtbetrag)
  Zahlungsdienst --→ Bestellservice: ergebnis
  alt [Zahlung erfolgreich]
    Bestellservice → Lager: reservieren(positionen)
    Lager --→ Bestellservice: ok
    Bestellservice --→ Webshop: bestellnummer
    Webshop → Kunde: bestaetigungAnzeigen(bestellnummer)
  else [Zahlung abgelehnt]
    Bestellservice --→ Webshop: zahlungsfehler()
    Webshop → Kunde: fehlermeldungAnzeigen()
  end alt
end alt`,
          diagram: `sequenceDiagram
  participant K as Kunde
  participant W as Webshop
  participant B as Bestellservice
  participant L as Lager
  participant Z as Zahlungsdienst
  K->>W: jetztKaufen()
  W->>B: bestellen(warenkorb)
  loop für jede Position
    B->>L: pruefeVerfuegbarkeit(artikelID, menge)
    L-->>B: verfuegbar
  end
  alt mindestens ein Artikel nicht verfügbar
    B-->>W: fehler(nichtVerfuegbar)
    W->>K: hinweisAnzeigen()
  else alle Artikel verfügbar
    B->>Z: zahlungAnfordern(gesamtbetrag)
    Z-->>B: ergebnis
    alt Zahlung erfolgreich
      B->>L: reservieren(positionen)
      L-->>B: ok
      B-->>W: bestellnummer
      W->>K: bestaetigungAnzeigen(bestellnummer)
    else Zahlung abgelehnt
      B-->>W: zahlungsfehler()
      W->>K: fehlermeldungAnzeigen()
    end
  end`,
          criteria: [
            { text: 'Fünf Lebenslinien, erste Nachrichten jetztKaufen und bestellen(warenkorb) in richtiger Reihenfolge', points: 2 },
            { text: 'loop-Fragment um die Verfügbarkeitsprüfung mit Antwort des Lagers', points: 2 },
            { text: 'Äußeres alt-Fragment mit beiden Bedingungen (nicht verfügbar / verfügbar)', points: 2 },
            { text: 'Zahlungsanforderung mit Parameter gesamtbetrag im richtigen Zweig', points: 1 },
            { text: 'Verschachteltes alt-Fragment Zahlung erfolgreich / abgelehnt', points: 2 },
            { text: 'Reservierung und Bestellbestätigung nur im Erfolgszweig', points: 2 },
            { text: 'Antworten als gestrichelte Pfeile gekennzeichnet', points: 1 }
          ]
        }
      ]
    },
    {
      nr: 4, title: 'Handlungsschritt 4: Rabattberechnung darstellen und testen', points: 25,
      intro: 'Für den Checkout wurde die folgende Funktion entwickelt. Stammkunden erhalten ab 100 Euro Warenwert 10 Prozent Rabatt, alle anderen ab 200 Euro 5 Prozent. Ein gültiger Gutschein bringt zusätzlich 5 Euro, der Rabatt darf den Warenwert aber nicht übersteigen.',
      sub: [
        {
          id: 'a', points: 8,
          q: 'Zeichnen Sie die Funktion berechneRabatt als UML-Aktivitätsdiagramm. Verwenden Sie Entscheidungs- und Zusammenführungsknoten mit Bedingungen in eckigen Klammern.',
          material: { code: `funktion berechneRabatt(warenwert: double, stammkunde: boolean,
                        gutscheinGueltig: boolean): double
  falls warenwert <= 0 dann                         // E1
    werfe Fehler("Ungültiger Warenwert")
  ende falls
  rabatt = 0
  falls stammkunde und warenwert >= 100 dann         // E2
    rabatt = warenwert * 0.10
  sonst falls warenwert >= 200 dann                  // E3
    rabatt = warenwert * 0.05
  ende falls
  falls gutscheinGueltig dann                        // E4
    rabatt = rabatt + 5
  ende falls
  falls rabatt > warenwert dann                      // E5
    rabatt = warenwert
  ende falls
  rückgabe rabatt
ende funktion` },
          kind: 'diagram',
          model: `● Start → ◇ E1
  [warenwert <= 0] → (Fehler werfen) → ◉ Ende
  [warenwert > 0]  → (rabatt = 0) → ◇ E2
     [stammkunde und warenwert >= 100] → (rabatt = warenwert * 0.10) → ◇ M1
     [sonst] → ◇ E3
        [warenwert >= 200] → (rabatt = warenwert * 0.05) → ◇ M1
        [sonst] → ◇ M1
◇ M1 → ◇ E4
  [gutscheinGueltig] → (rabatt = rabatt + 5) → ◇ M2
  [sonst] → ◇ M2
◇ M2 → ◇ E5
  [rabatt > warenwert] → (rabatt = warenwert) → ◇ M3
  [sonst] → ◇ M3
◇ M3 → (rabatt zurückgeben) → ◉ Ende`,
          diagram: `flowchart TD
  S((" ")) --> D1{" "}
  D1 -->|"[warenwert <= 0]"| A0("Fehler werfen")
  A0 --> E0((("Ende")))
  D1 -->|"[warenwert > 0]"| A1("rabatt = 0")
  A1 --> D2{" "}
  D2 -->|"[stammkunde und warenwert >= 100]"| A2("rabatt = warenwert * 0.10")
  D2 -->|"[sonst]"| D3{" "}
  D3 -->|"[warenwert >= 200]"| A3("rabatt = warenwert * 0.05")
  D3 -->|"[sonst]"| M1{" "}
  A2 --> M1
  A3 --> M1
  M1 --> D4{" "}
  D4 -->|"[gutscheinGueltig]"| A4("rabatt = rabatt + 5")
  D4 -->|"[sonst]"| M2{" "}
  A4 --> M2
  M2 --> D5{" "}
  D5 -->|"[rabatt > warenwert]"| A5("rabatt = warenwert")
  D5 -->|"[sonst]"| M3{" "}
  A5 --> M3
  M3 --> A6("rabatt zurückgeben")
  A6 --> E((("Ende")))
  classDef start fill:#000,stroke:#000
  class S start`,
          criteria: [
            { text: 'Startknoten, Endknoten für Fehlerfall und reguläres Ende', points: 1 },
            { text: 'Entscheidung E1 mit Fehlerzweig', points: 1 },
            { text: 'Verschachtelte Entscheidung E2/E3 mit drei Ausgängen, korrekt zusammengeführt', points: 2 },
            { text: 'Entscheidungen E4 und E5 jeweils mit Aktion im Ja-Zweig und leerem Sonst-Zweig', points: 2 },
            { text: 'Alle Bedingungen in eckigen Klammern an den Kanten, Zusammenführungen als Raute', points: 1 },
            { text: 'Aktion Rückgabe am Ende vor dem Endknoten', points: 1 }
          ]
        },
        {
          id: 'b', points: 8,
          q: '(1) Wie viele Zweige besitzt berechneRabatt (E1 bis E5)? (2) Welchen Zweigüberdeckungsgrad in Prozent erreicht allein der Testfall berechneRabatt(150, wahr, wahr)? (3) Geben Sie eine minimale Testfallmenge für 100 Prozent Zweigüberdeckung mit erwarteten Ergebnissen an, ordnen Sie die Zweige zu und begründen Sie, warum weniger Testfälle nicht ausreichen.',
          kind: 'text',
          model: `(1) 5 Entscheidungen mit je 2 Zweigen = 10 Zweige.

(2) (150, wahr, wahr): E1 falsch, E2 wahr, E4 wahr, E5 falsch.
    E3 wird nicht ausgewertet (sonst-Zweig von E2 nicht betreten).
    4 von 10 Zweigen = 40 %. Ergebnis 15 + 5 = 20.00

(3) Vier Testfälle:
T1 (0, falsch, falsch)    → Fehler        E1 wahr
T2 (150, wahr, wahr)      → 20.00         E1 f, E2 w, E4 w, E5 f
T3 (250, falsch, falsch)  → 12.50         E1 f, E2 f, E3 w, E4 f, E5 f
T4 (3, falsch, wahr)      → 3.00          E1 f, E2 f, E3 f, E4 w, E5 w
Alle 10 Zweige sind abgedeckt.

Weniger geht nicht: T1 endet mit dem Fehler. E2 wahr und E3 wahr
schließen sich in einem Durchlauf aus. E5 wahr ist nur möglich, wenn
der Rabatt den Warenwert übersteigt, also nur bei warenwert < 5 mit
Gutschein, dann sind E2 und E3 zwingend falsch. Damit braucht man vier
getrennte Testfälle.`,
          criteria: [
            { text: '10 Zweige', points: 1 },
            { text: '40 Prozent mit Begründung (4 von 10, E3 nicht erreicht)', points: 2 },
            { text: 'Vier Testfälle, die zusammen alle 10 Zweige abdecken, mit richtigen Ergebnissen', points: 2 },
            { text: 'Zuordnung der Zweige je Testfall richtig', points: 1 },
            { text: 'Begründung: Fehlerzweig, E2/E3 schließen sich aus, E5 wahr nur bei Warenwert unter 5', points: 2 }
          ]
        },
        {
          id: 'c', points: 9,
          q: 'Schreiben Sie fünf Unit-Tests für berechneRabatt im Format assertEquals(erwartet, berechneRabatt(...), 0.001) bzw. assertThrows(Fehler, () -> berechneRabatt(...)) für den Fehlerfall. Die Tests sollen die Grenzwerte beider Rabattschwellen (100 Euro für Stammkunden, 200 Euro für andere Kunden) und den Fehlerfall abdecken. Begründen Sie, warum die Grenzwerte besonders wichtig sind.',
          kind: 'code',
          model: `assertEquals(0.00,  berechneRabatt(99.99, wahr, falsch), 0.001);
assertEquals(10.00, berechneRabatt(100.00, wahr, falsch), 0.001);
assertEquals(0.00,  berechneRabatt(199.99, falsch, falsch), 0.001);
assertEquals(10.00, berechneRabatt(200.00, falsch, falsch), 0.001);
assertThrows(Fehler, () -> berechneRabatt(0, falsch, falsch));

weitere sinnvolle Tests:
assertEquals(15.00, berechneRabatt(200.00, falsch, wahr), 0.001);
assertEquals(4.99,  berechneRabatt(4.99, falsch, wahr), 0.001);   // Deckelung

Begründung: An den Grenzen passieren die meisten Programmierfehler,
z. B. > statt >= (Off-by-one). Mit 100.00 bzw. 200.00 wird geprüft, dass
der Rabatt genau ab der Schwelle gilt, mit 99.99 bzw. 199.99, dass er
darunter nicht gilt. assertThrows erhält den Aufruf als Lambda, damit
das Test-Framework die Ausnahme selbst auffangen kann. Die Toleranz 0.001 ist nötig, weil double-Werte
nicht exakt darstellbar sind.`,
          criteria: [
            { text: 'Grenzwerte Stammkunde 99.99 → 0 und 100.00 → 10.00', points: 2 },
            { text: 'Grenzwerte andere Kunden 199.99 → 0 und 200.00 → 10.00', points: 2 },
            { text: 'Fehlerfall (warenwert <= 0) mit assertThrows bzw. erwartetem Fehler', points: 1 },
            { text: 'Syntax assertEquals(erwartet, tatsächlich, Toleranz) korrekt und Stammkunden-Flag passend gesetzt', points: 2 },
            { text: 'Begründung: Fehler häufen sich an Grenzen (> statt >=)', points: 2 }
          ]
        }
      ]
    }
  ]
}
];
