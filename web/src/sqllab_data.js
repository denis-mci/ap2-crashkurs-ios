// SQL-Labor: Kanzlei-Datenbank und Aufgaben. Läuft komplett im Browser (SQLite über sql.js).
// Aufgabe: id, t (Titel), q (Aufgabe), hint, sol (Musterlösung), order (Reihenfolge zählt),
// check (nur bei Ändern/Anlegen: Abfragen, deren Ergebnis nach deiner Anweisung verglichen wird)
const SQLLAB = {
schema: `PRAGMA foreign_keys = ON;
CREATE TABLE Mitarbeiter (
  MaID INTEGER PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  Rolle VARCHAR(50),
  ChefID INTEGER REFERENCES Mitarbeiter(MaID),
  Stundensatz DECIMAL(6,2)
);
CREATE TABLE Mandant (
  MandantID INTEGER PRIMARY KEY,
  Name VARCHAR(80) NOT NULL,
  Ort VARCHAR(50),
  Rechtsform VARCHAR(30),
  KundeSeit DATE,
  BetreuerID INTEGER REFERENCES Mitarbeiter(MaID)
);
CREATE TABLE Auftrag (
  AuftragID INTEGER PRIMARY KEY,
  MandantID INTEGER NOT NULL REFERENCES Mandant(MandantID),
  Art VARCHAR(30),
  Honorar DECIMAL(10,2),
  Datum DATE,
  Status VARCHAR(20)
);
CREATE TABLE Mitarbeiter_Auftrag (
  MaID INTEGER REFERENCES Mitarbeiter(MaID),
  AuftragID INTEGER REFERENCES Auftrag(AuftragID) ON DELETE CASCADE,
  Stunden DECIMAL(5,1),
  PRIMARY KEY (MaID, AuftragID)
);
CREATE TABLE Rechnung (
  RechnungID INTEGER PRIMARY KEY,
  AuftragID INTEGER REFERENCES Auftrag(AuftragID),
  Betrag DECIMAL(10,2),
  Faellig DATE,
  Bezahlt INTEGER
);
CREATE TABLE AuftragArchiv (
  AuftragID INTEGER PRIMARY KEY,
  MandantID INTEGER,
  Art VARCHAR(30),
  Honorar DECIMAL(10,2),
  Datum DATE,
  Status VARCHAR(20)
);
INSERT INTO Mitarbeiter VALUES
 (1,'Weber','Partnerin',NULL,140),
 (2,'Koch','Steuerberater',1,110),
 (3,'Schmitt','Steuerfachangestellte',2,65),
 (4,'Yilmaz','Steuerfachangestellter',2,60),
 (5,'Becker','Lohnbuchhalterin',1,58),
 (6,'Neumann','Azubi',3,25);
INSERT INTO Mandant VALUES
 (1,'Bäckerei Gies','Fulda','Einzelunternehmen','2015-03-01',2),
 (2,'Autohaus Ruf','Erfurt','GmbH','2018-07-15',1),
 (3,'Praxis Lenz','Fulda','Freiberufler','2020-01-10',3),
 (4,'Café Mondo','Kassel','GbR','2022-05-02',4),
 (5,'Holzbau Brandt','Fulda','GmbH & Co. KG','2019-09-30',2),
 (6,'IT-Service Kraus','Kassel','UG','2024-02-01',NULL),
 (7,'Weingut Albers','Würzburg','KG','2016-11-20',1),
 (8,'Apotheke am Markt','Erfurt','e.K.','2023-08-14',3);
INSERT INTO Auftrag VALUES
 (10,1,'Steuer',1200,'2026-01-15','abgerechnet'),
 (11,1,'Lohn',400,'2026-02-01','abgerechnet'),
 (12,2,'Prüfung',5000,'2026-03-10','abgerechnet'),
 (13,2,'Steuer',2400,'2026-04-02','erledigt'),
 (14,3,'Buchhaltung',900,'2026-04-20','abgerechnet'),
 (15,3,'Steuer',1500,'2026-06-11','offen'),
 (16,5,'Lohn',650,'2026-05-05','abgerechnet'),
 (17,5,'Beratung',1800,'2026-07-01','erledigt'),
 (18,5,'Steuer',2100,'2026-08-19','offen'),
 (19,7,'Prüfung',4200,'2026-02-25','abgerechnet'),
 (20,7,'Buchhaltung',1100,'2026-09-03','offen'),
 (21,8,'Beratung',750,'2026-09-15','offen'),
 (22,8,'Steuer',1300,'2026-10-01','offen'),
 (23,2,'Lohn',950,'2026-10-12','offen');
INSERT INTO Mitarbeiter_Auftrag VALUES
 (2,10,6),(3,10,4),(5,11,3),(1,12,20),(2,12,15),(2,13,12),(3,14,8),(6,14,5),(3,15,6),(5,16,4),
 (2,17,10),(1,17,3),(4,18,9),(1,19,18),(4,20,7),(3,21,5),(3,22,6),(6,22,4),(5,23,5);
INSERT INTO Rechnung VALUES
 (100,10,1200,'2026-02-15',1),(101,11,400,'2026-03-01',1),(102,12,5000,'2026-04-10',0),
 (103,14,900,'2026-05-20',1),(104,16,650,'2026-06-05',0),(105,19,4200,'2026-03-25',1);`,
levels: [
{id:'l1', t:'Grundlagen', sub:'SELECT, WHERE, ORDER BY, LIKE, NULL', tasks:[
 {id:'s1', t:'Alles anzeigen', q:'Gib alle Mandanten mit allen Spalten aus.', hint:'SELECT * holt alle Spalten.', sol:'SELECT * FROM Mandant;'},
 {id:'s2', t:'Spalten wählen und sortieren', q:'Gib Name und Ort aller Mandanten aus, alphabetisch nach Name sortiert.', hint:'Spalten mit Komma trennen, am Ende ORDER BY Name.', sol:'SELECT Name, Ort FROM Mandant ORDER BY Name;', order:true},
 {id:'s3', t:'Filtern mit WHERE', q:'Gib die Namen aller Mandanten aus Fulda aus.', hint:"Text steht in einfachen Anführungszeichen: WHERE Ort = 'Fulda'", sol:"SELECT Name FROM Mandant WHERE Ort = 'Fulda';"},
 {id:'s4', t:'Vergleich und absteigend', q:'Gib AuftragID, Art und Honorar aller Aufträge mit einem Honorar über 2000 € aus, das höchste Honorar zuerst.', hint:'WHERE Honorar > 2000 und ORDER BY Honorar DESC', sol:'SELECT AuftragID, Art, Honorar FROM Auftrag WHERE Honorar > 2000 ORDER BY Honorar DESC;', order:true},
 {id:'s5', t:'Mehrere Bedingungen', q:'Gib AuftragID und Honorar aller offenen Steuer-Aufträge aus (Art = Steuer, Status = offen).', hint:'Zwei Bedingungen verbindest du mit AND.', sol:"SELECT AuftragID, Honorar FROM Auftrag WHERE Art = 'Steuer' AND Status = 'offen';"},
 {id:'s6', t:'Muster mit LIKE', q:'Gib Name und Rechtsform aller Mandanten aus, deren Rechtsform „GmbH“ enthält.', hint:"% steht für beliebig viele Zeichen: LIKE '%GmbH%'", sol:"SELECT Name, Rechtsform FROM Mandant WHERE Rechtsform LIKE '%GmbH%';"},
 {id:'s7', t:'Leere Werte', q:'Welche Mandanten haben noch keinen Betreuer? Gib die Namen aus.', hint:'Auf NULL prüfst du nie mit =, sondern mit IS NULL.', sol:'SELECT Name FROM Mandant WHERE BetreuerID IS NULL;'},
 {id:'s8', t:'Zeitraum mit BETWEEN', q:'Gib AuftragID und Datum aller Aufträge vom 1. April bis 30. Juni 2026 aus, nach Datum sortiert.', hint:"Datum im Format 'JJJJ-MM-TT': BETWEEN '2026-04-01' AND '2026-06-30'", sol:"SELECT AuftragID, Datum FROM Auftrag WHERE Datum BETWEEN '2026-04-01' AND '2026-06-30' ORDER BY Datum;", order:true},
 {id:'s9', t:'Liste mit IN', q:'Gib die Namen aller Mandanten aus Erfurt oder Kassel aus.', hint:"Statt zweimal OR: WHERE Ort IN ('Erfurt', 'Kassel')", sol:"SELECT Name FROM Mandant WHERE Ort IN ('Erfurt','Kassel');"},
 {id:'s10', t:'Doppelte entfernen', q:'Welche verschiedenen Auftragsarten gibt es? Jede Art nur einmal.', hint:'DISTINCT direkt hinter SELECT.', sol:'SELECT DISTINCT Art FROM Auftrag;'}
]},
{id:'l2', t:'Zählen und Gruppieren', sub:'COUNT, SUM, AVG, GROUP BY, HAVING', tasks:[
 {id:'g1', t:'Zählen', q:'Wie viele Aufträge gibt es insgesamt?', hint:'COUNT(*) zählt Zeilen.', sol:'SELECT COUNT(*) FROM Auftrag;'},
 {id:'g2', t:'Summe mit Filter', q:'Wie hoch ist die Summe aller Honorare der offenen Aufträge?', hint:"SUM(Honorar) mit WHERE Status = 'offen'", sol:"SELECT SUM(Honorar) FROM Auftrag WHERE Status = 'offen';"},
 {id:'g3', t:'Gruppieren', q:'Gib pro Auftragsart die Art und die Anzahl der Aufträge aus.', hint:'Alles, was im SELECT steht und keine Aggregatfunktion ist, gehört ins GROUP BY.', sol:'SELECT Art, COUNT(*) FROM Auftrag GROUP BY Art;'},
 {id:'g4', t:'Gruppen filtern mit HAVING', q:'Gib pro Mandant (MandantID) die Summe der Honorare aus, aber nur für Mandanten mit mehr als 3000 € Honorar insgesamt.', hint:'WHERE filtert Zeilen vor dem Gruppieren, HAVING filtert Gruppen danach: HAVING SUM(Honorar) > 3000', sol:'SELECT MandantID, SUM(Honorar) FROM Auftrag GROUP BY MandantID HAVING SUM(Honorar) > 3000;'},
 {id:'g5', t:'Durchschnitt und Runden', q:'Gib pro Auftragsart das durchschnittliche Honorar aus, auf 2 Nachkommastellen gerundet, den höchsten Durchschnitt zuerst.', hint:'ROUND(AVG(Honorar), 2) und ORDER BY mit DESC', sol:'SELECT Art, ROUND(AVG(Honorar), 2) AS Schnitt FROM Auftrag GROUP BY Art ORDER BY Schnitt DESC;', order:true},
 {id:'g6', t:'Minimum und Maximum', q:'Gib das kleinste und das größte Honorar aller Aufträge in einer Zeile aus.', hint:'MIN(...) und MAX(...) in einem SELECT.', sol:'SELECT MIN(Honorar), MAX(Honorar) FROM Auftrag;'}
]},
{id:'l3', t:'JOINs', sub:'Tabellen verbinden: INNER, LEFT, Self-Join, n:m', tasks:[
 {id:'j1', t:'INNER JOIN', q:'Gib zu jedem Auftrag AuftragID, den Namen des Mandanten und das Honorar aus.', hint:'FROM Auftrag a JOIN Mandant m ON a.MandantID = m.MandantID', sol:'SELECT a.AuftragID, m.Name, a.Honorar FROM Auftrag a JOIN Mandant m ON a.MandantID = m.MandantID;'},
 {id:'j2', t:'JOIN mit Filter', q:'Gib Mandantenname und Auftragsart aller offenen Aufträge aus, nach Mandantenname sortiert.', hint:"JOIN wie eben, dann WHERE a.Status = 'offen' und ORDER BY m.Name. Bei gleichem Namen ist die Reihenfolge egal.", sol:"SELECT m.Name, a.Art FROM Auftrag a JOIN Mandant m ON a.MandantID = m.MandantID WHERE a.Status = 'offen' ORDER BY m.Name, a.Art;", order:false},
 {id:'j3', t:'LEFT JOIN: auch ohne Partner', q:'Gib alle Mandanten mit der Anzahl ihrer Aufträge aus, auch Mandanten ohne Auftrag (dann 0). Spalten: Name, Anzahl.', hint:'LEFT JOIN behält alle Mandanten. Zähle COUNT(a.AuftragID), nicht COUNT(*), sonst zählt die leere Zeile als 1.', sol:'SELECT m.Name, COUNT(a.AuftragID) FROM Mandant m LEFT JOIN Auftrag a ON a.MandantID = m.MandantID GROUP BY m.MandantID, m.Name;'},
 {id:'j4', t:'Wer hat keinen Auftrag?', q:'Gib die Namen der Mandanten aus, die noch nie einen Auftrag hatten.', hint:'LEFT JOIN und dann WHERE a.AuftragID IS NULL', sol:'SELECT m.Name FROM Mandant m LEFT JOIN Auftrag a ON a.MandantID = m.MandantID WHERE a.AuftragID IS NULL;'},
 {id:'j5', t:'Self-Join', q:'Gib jeden Mitarbeiter mit dem Namen seines Vorgesetzten aus. Auch Weber, die keinen Vorgesetzten hat, soll erscheinen. Spalten: Mitarbeiter, Chef.', hint:'Die Tabelle Mitarbeiter zweimal mit verschiedenen Aliasen: FROM Mitarbeiter m LEFT JOIN Mitarbeiter c ON m.ChefID = c.MaID', sol:'SELECT m.Name, c.Name FROM Mitarbeiter m LEFT JOIN Mitarbeiter c ON m.ChefID = c.MaID;'},
 {id:'j6', t:'n:m über die Zwischentabelle', q:'Gib pro Mitarbeiter den Namen und die Summe seiner Stunden aus, die meisten Stunden zuerst.', hint:'Mitarbeiter JOIN Mitarbeiter_Auftrag über MaID, dann GROUP BY und SUM(Stunden).', sol:'SELECT ma.Name, SUM(x.Stunden) AS Std FROM Mitarbeiter ma JOIN Mitarbeiter_Auftrag x ON x.MaID = ma.MaID GROUP BY ma.MaID, ma.Name ORDER BY Std DESC;', order:true},
 {id:'j7', t:'Zwei Fremdschlüssel', q:'Gib für alle Mandanten aus Fulda den Mandantennamen und den Namen des Betreuers aus.', hint:'Mandant.BetreuerID verweist auf Mitarbeiter.MaID.', sol:"SELECT m.Name, ma.Name FROM Mandant m JOIN Mitarbeiter ma ON m.BetreuerID = ma.MaID WHERE m.Ort = 'Fulda';"},
 {id:'j8', t:'Drei Tabellen und Rechnen', q:'Berechne die internen Kosten pro Auftrag: AuftragID und Summe aus Stunden mal Stundensatz. Nach AuftragID sortiert.', hint:'Auftrag → Mitarbeiter_Auftrag → Mitarbeiter, dann SUM(x.Stunden * ma.Stundensatz) GROUP BY AuftragID', sol:'SELECT a.AuftragID, SUM(x.Stunden * ma.Stundensatz) FROM Auftrag a JOIN Mitarbeiter_Auftrag x ON x.AuftragID = a.AuftragID JOIN Mitarbeiter ma ON ma.MaID = x.MaID GROUP BY a.AuftragID ORDER BY a.AuftragID;', order:true}
]},
{id:'l4', t:'Unterabfragen', sub:'Subselect mit Vergleich, IN, EXISTS', tasks:[
 {id:'u1', t:'Über dem Durchschnitt', q:'Gib AuftragID und Honorar aller Aufträge aus, deren Honorar über dem Durchschnitt aller Honorare liegt.', hint:'WHERE Honorar > (SELECT AVG(Honorar) FROM Auftrag)', sol:'SELECT AuftragID, Honorar FROM Auftrag WHERE Honorar > (SELECT AVG(Honorar) FROM Auftrag);'},
 {id:'u2', t:'Subselect mit IN', q:'Gib die Namen der Mandanten aus, die mindestens einen offenen Auftrag haben. Jeder Name nur einmal.', hint:"WHERE MandantID IN (SELECT MandantID FROM Auftrag WHERE Status = 'offen')", sol:"SELECT Name FROM Mandant WHERE MandantID IN (SELECT MandantID FROM Auftrag WHERE Status = 'offen');"},
 {id:'u3', t:'Der Größte', q:'Welcher Auftrag hat das höchste Honorar? Gib Mandantenname, Art und Honorar aus.', hint:'JOIN plus WHERE a.Honorar = (SELECT MAX(Honorar) FROM Auftrag)', sol:'SELECT m.Name, a.Art, a.Honorar FROM Auftrag a JOIN Mandant m ON a.MandantID = m.MandantID WHERE a.Honorar = (SELECT MAX(Honorar) FROM Auftrag);'},
 {id:'u4', t:'NOT EXISTS', q:'Gib die Namen der Mitarbeiter aus, die an keinem Auftrag der Art „Prüfung“ gearbeitet haben.', hint:"WHERE NOT EXISTS (SELECT * FROM Mitarbeiter_Auftrag x JOIN Auftrag a ON ... WHERE x.MaID = ma.MaID AND a.Art = 'Prüfung')", sol:"SELECT ma.Name FROM Mitarbeiter ma WHERE NOT EXISTS (SELECT * FROM Mitarbeiter_Auftrag x JOIN Auftrag a ON a.AuftragID = x.AuftragID WHERE x.MaID = ma.MaID AND a.Art = 'Prüfung');"}
]},
{id:'l5', t:'Daten ändern', sub:'INSERT, UPDATE, DELETE, INSERT … SELECT', tasks:[
 {id:'d1', t:'Neuer Datensatz', q:"Lege den Mandanten 9 an: Name 'Fahrschule Roth', Ort 'Fulda', Rechtsform 'Einzelunternehmen', KundeSeit '2026-11-07', BetreuerID 4.", hint:"INSERT INTO Mandant (MandantID, Name, Ort, Rechtsform, KundeSeit, BetreuerID) VALUES (9, 'Fahrschule Roth', ...);", sol:"INSERT INTO Mandant (MandantID, Name, Ort, Rechtsform, KundeSeit, BetreuerID) VALUES (9, 'Fahrschule Roth', 'Fulda', 'Einzelunternehmen', '2026-11-07', 4);", check:['SELECT * FROM Mandant ORDER BY MandantID']},
 {id:'d2', t:'UPDATE mit Rechnung', q:'Erhöhe alle Honorare des Mandanten 5 um 5 Prozent.', hint:'UPDATE Auftrag SET Honorar = Honorar * 1.05 WHERE MandantID = 5; Ohne WHERE träfe es alle Aufträge!', sol:'UPDATE Auftrag SET Honorar = Honorar * 1.05 WHERE MandantID = 5;', check:['SELECT AuftragID, Honorar FROM Auftrag ORDER BY AuftragID']},
 {id:'d3', t:'Einen Wert setzen', q:'Rechnung 102 wurde bezahlt. Setze Bezahlt auf 1.', hint:'UPDATE Rechnung SET Bezahlt = 1 WHERE RechnungID = 102;', sol:'UPDATE Rechnung SET Bezahlt = 1 WHERE RechnungID = 102;', check:['SELECT RechnungID, Bezahlt FROM Rechnung ORDER BY RechnungID']},
 {id:'d4', t:'Löschen', q:'Der Mandant 8 kündigt. Lösche alle seine offenen Aufträge. (Die Einträge in Mitarbeiter_Auftrag verschwinden durch ON DELETE CASCADE automatisch mit.)', hint:"DELETE FROM Auftrag WHERE MandantID = 8 AND Status = 'offen';", sol:"DELETE FROM Auftrag WHERE MandantID = 8 AND Status = 'offen';", check:['SELECT AuftragID FROM Auftrag ORDER BY AuftragID','SELECT MaID, AuftragID FROM Mitarbeiter_Auftrag ORDER BY MaID, AuftragID']},
 {id:'d5', t:'Archivieren mit INSERT … SELECT', q:'Kopiere alle Aufträge mit dem Status „abgerechnet“ in die Tabelle AuftragArchiv (gleiche Spalten).', hint:"INSERT INTO AuftragArchiv SELECT * FROM Auftrag WHERE Status = 'abgerechnet'; Kein VALUES!", sol:"INSERT INTO AuftragArchiv SELECT * FROM Auftrag WHERE Status = 'abgerechnet';", check:['SELECT * FROM AuftragArchiv ORDER BY AuftragID']},
 {id:'d6', t:'UPDATE mit Subselect', q:'Alle Aufträge von Mandanten aus Würzburg werden auf den Status „erledigt“ gesetzt.', hint:"UPDATE Auftrag SET Status = 'erledigt' WHERE MandantID IN (SELECT MandantID FROM Mandant WHERE Ort = 'Würzburg');", sol:"UPDATE Auftrag SET Status = 'erledigt' WHERE MandantID IN (SELECT MandantID FROM Mandant WHERE Ort = 'Würzburg');", check:['SELECT AuftragID, Status FROM Auftrag ORDER BY AuftragID']}
]},
{id:'l6', t:'Tabellen anlegen', sub:'CREATE TABLE, ALTER TABLE, VIEW, INDEX', note:'GRANT und REVOKE (Rechte vergeben) kann die Browser-Datenbank nicht ausführen. Die Syntax für die Prüfung: GRANT SELECT, INSERT ON Auftrag TO azubi; und REVOKE INSERT ON Auftrag FROM azubi;', tasks:[
 {id:'c1', t:'CREATE TABLE', q:'Lege die Tabelle Termin an: TerminID (Ganzzahl, Primärschlüssel), MandantID (Ganzzahl, Fremdschlüssel auf Mandant), Datum (DATE, Pflichtfeld) und Thema (Text bis 100 Zeichen). Spalten in genau dieser Reihenfolge.', hint:'CREATE TABLE Termin ( TerminID INT PRIMARY KEY, MandantID INT, Datum DATE NOT NULL, Thema VARCHAR(100), FOREIGN KEY (MandantID) REFERENCES Mandant(MandantID) );', sol:'CREATE TABLE Termin (TerminID INT PRIMARY KEY, MandantID INT, Datum DATE NOT NULL, Thema VARCHAR(100), FOREIGN KEY (MandantID) REFERENCES Mandant(MandantID));', check:["SELECT lower(name), pk FROM pragma_table_info('Termin') ORDER BY cid","SELECT lower(name), \"notnull\" FROM pragma_table_info('Termin') WHERE lower(name) = 'datum'","SELECT lower(\"table\"), lower(\"from\"), lower(\"to\") FROM pragma_foreign_key_list('Termin')"]},
 {id:'c2', t:'ALTER TABLE', q:'Ergänze die Tabelle Mandant um die Spalte Email (Text bis 100 Zeichen).', hint:'ALTER TABLE Mandant ADD Email VARCHAR(100);', sol:'ALTER TABLE Mandant ADD COLUMN Email VARCHAR(100);', check:["SELECT lower(name) FROM pragma_table_info('Mandant') ORDER BY cid"]},
 {id:'c3', t:'VIEW', q:'Lege eine Sicht OffeneAuftraege an, die AuftragID, MandantID und Honorar aller offenen Aufträge zeigt.', hint:"CREATE VIEW OffeneAuftraege AS SELECT ... WHERE Status = 'offen';", sol:"CREATE VIEW OffeneAuftraege AS SELECT AuftragID, MandantID, Honorar FROM Auftrag WHERE Status = 'offen';", check:['SELECT * FROM OffeneAuftraege ORDER BY 1']},
 {id:'c4', t:'INDEX', q:'Die Suche nach Datum ist langsam. Lege einen Index auf die Spalte Datum der Tabelle Auftrag an (Name frei wählbar).', hint:'CREATE INDEX idx_auftrag_datum ON Auftrag(Datum);', sol:'CREATE INDEX idx_auftrag_datum ON Auftrag(Datum);', check:["SELECT lower(ii.name) FROM pragma_index_list('Auftrag') il, pragma_index_info(il.name) ii WHERE il.origin = 'c'"]}
]},
{id:'l7', t:'Prüfungsniveau', sub:'Gemischte Aufgaben wie in GA2', tasks:[
 {id:'p1', t:'Offene Rechnungen', q:'Gib alle unbezahlten Rechnungen (Bezahlt = 0) mit Mandantenname, Betrag und Fälligkeitsdatum aus, die älteste Fälligkeit zuerst.', hint:'Rechnung → Auftrag → Mandant, WHERE r.Bezahlt = 0 ORDER BY r.Faellig', sol:'SELECT m.Name, r.Betrag, r.Faellig FROM Rechnung r JOIN Auftrag a ON a.AuftragID = r.AuftragID JOIN Mandant m ON m.MandantID = a.MandantID WHERE r.Bezahlt = 0 ORDER BY r.Faellig;', order:true},
 {id:'p2', t:'Umsatz pro Ort', q:'Gib pro Ort die Anzahl der Mandanten mit Aufträgen und die Summe ihrer Honorare aus. Nur Orte mit mehr als 5000 €, die größte Summe zuerst.', hint:'Achtung: Nach dem JOIN steht ein Mandant mehrfach da. Darum COUNT(DISTINCT m.MandantID). Dann GROUP BY m.Ort HAVING SUM(a.Honorar) > 5000', sol:'SELECT m.Ort, COUNT(DISTINCT m.MandantID), SUM(a.Honorar) AS Summe FROM Mandant m JOIN Auftrag a ON a.MandantID = m.MandantID GROUP BY m.Ort HAVING SUM(a.Honorar) > 5000 ORDER BY Summe DESC;', order:true},
 {id:'p3', t:'Für wie viele Mandanten?', q:'Gib für jeden Mitarbeiter den Namen und die Anzahl der verschiedenen Mandanten aus, für die er gearbeitet hat.', hint:'Mitarbeiter → Mitarbeiter_Auftrag → Auftrag, dann COUNT(DISTINCT a.MandantID)', sol:'SELECT ma.Name, COUNT(DISTINCT a.MandantID) FROM Mitarbeiter ma JOIN Mitarbeiter_Auftrag x ON x.MaID = ma.MaID JOIN Auftrag a ON a.AuftragID = x.AuftragID GROUP BY ma.MaID, ma.Name;'},
 {id:'p4', t:'Umsatz pro Monat', q:'Gib für das Jahr 2026 pro Monat (als Zahl) die Summe der Honorare aus, nach Monat sortiert.', hint:'Die Funktionen YEAR(Datum) und MONTH(Datum) funktionieren hier wie in der Prüfung. GROUP BY MONTH(Datum)', sol:'SELECT MONTH(Datum) AS Monat, SUM(Honorar) FROM Auftrag WHERE YEAR(Datum) = 2026 GROUP BY MONTH(Datum) ORDER BY Monat;', order:true},
 {id:'p5', t:'Bester Betreuer', q:'Welcher Mitarbeiter betreut Mandanten mit der höchsten Honorarsumme? Gib Name und Summe aus (nur eine Zeile).', hint:'Mandant.BetreuerID → Mitarbeiter, JOIN Auftrag, GROUP BY Betreuer, ORDER BY Summe DESC LIMIT 1', sol:'SELECT ma.Name, SUM(a.Honorar) AS Summe FROM Mitarbeiter ma JOIN Mandant m ON m.BetreuerID = ma.MaID JOIN Auftrag a ON a.MandantID = m.MandantID GROUP BY ma.MaID, ma.Name ORDER BY Summe DESC LIMIT 1;'},
 {id:'p6', t:'Mandanten ohne offene Posten', q:'Gib die Namen der Mandanten aus, die Aufträge haben, aber keinen einzigen offenen.', hint:"WHERE MandantID IN (SELECT MandantID FROM Auftrag) AND MandantID NOT IN (SELECT MandantID FROM Auftrag WHERE Status = 'offen')", sol:"SELECT Name FROM Mandant WHERE MandantID IN (SELECT MandantID FROM Auftrag) AND MandantID NOT IN (SELECT MandantID FROM Auftrag WHERE Status = 'offen');"}
]}
]};
