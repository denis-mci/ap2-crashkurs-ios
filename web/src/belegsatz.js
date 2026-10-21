// Spickzettel im Stil des IHK-Belegsatzes (nicht das Original, nur zum Üben)
const BELEGSATZ = [
{title:'SQL: Abfragen', code:`SELECT [DISTINCT] spalte1, spalte2 AS alias, COUNT(*)
FROM tabelle1 t1
[INNER | LEFT | RIGHT] JOIN tabelle2 t2 ON t1.id = t2.fk
WHERE bedingung
GROUP BY spalte1
HAVING aggregatbedingung
ORDER BY spalte1 [ASC | DESC]
LIMIT n;

Reihenfolge merken: Select From Where Group Having Order`},
{title:'SQL: Bedingungen', code:`=  <>  <  >  <=  >=
AND  OR  NOT
spalte IN (1, 2, 3)        spalte NOT IN (SELECT ...)
spalte BETWEEN 10 AND 20   (inklusive Grenzen)
spalte LIKE 'M%'           % = beliebig viele Zeichen
spalte LIKE 'M_ier'        _ = genau ein Zeichen
spalte IS NULL             spalte IS NOT NULL
EXISTS (SELECT ...)        NOT EXISTS (SELECT ...)`},
{title:'SQL: Funktionen', code:`COUNT(*)  COUNT(spalte)  COUNT(DISTINCT spalte)
SUM(spalte)  AVG(spalte)  MIN(spalte)  MAX(spalte)
COUNT(spalte) zählt keine NULL-Werte

Datumsfunktionen sind je nach DBMS verschieden,
z. B. YEAR(datum), MONTH(datum), CURRENT_DATE`},
{title:'SQL: Ändern (DML)', code:`INSERT INTO tabelle (sp1, sp2) VALUES (1, 'Text');
INSERT INTO ziel (sp1, sp2)
  SELECT a, b FROM quelle WHERE ...;
UPDATE tabelle SET sp1 = wert WHERE bedingung;
DELETE FROM tabelle WHERE bedingung;
Ohne WHERE trifft es ALLE Zeilen!`},
{title:'SQL: Struktur und Rechte', code:`CREATE TABLE tabelle (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  betrag DECIMAL(10,2),
  datum DATE,
  fk INT,
  FOREIGN KEY (fk) REFERENCES andere(id)
    ON DELETE CASCADE | SET NULL | RESTRICT
);
ALTER TABLE tabelle ADD spalte TYP;
DROP TABLE tabelle;
CREATE INDEX idx ON tabelle(spalte);
CREATE VIEW v AS SELECT ...;
GRANT SELECT, INSERT ON tabelle TO benutzer;
REVOKE INSERT ON tabelle FROM benutzer;
abfrage1 UNION [ALL] abfrage2`},
{title:'Pseudocode (Konvention dieser App)', code:`x = 5                        Zuweisung
falls bedingung dann ... sonst ... ende falls
für i = 0 bis n - 1 ... ende für
für jedes e in liste ... ende für
solange bedingung ... ende solange
funktion name(param) ... rückgabe wert ende funktion
liste = neue Liste      liste.hinzufuegen(x)
laenge(liste)           liste[i]   (Index ab 0)
objekt.getName()        neu Konto(100)
versuche ... fange Fehler ... ende versuche
Syntax ist frei, die Logik zählt.`},
{title:'UML: Klassendiagramm', code:`+ public   - private   # protected   ~ package
Attribut:  - name: String
Methode:   + getName(): String
statisch:  unterstrichen     abstrakt: kursiv / {abstract}
Interface: «interface»

———         Assoziation
———◇        Aggregation (Teil kann allein existieren)
———◆        Komposition (Teil stirbt mit dem Ganzen)
———▷        Vererbung (Dreieck zeigt auf Oberklasse)
- - -▷      Realisierung (implementiert Interface)
Multiplizität: 1   0..1   *   1..*`},
{title:'UML: Verhalten', code:`Aktivitätsdiagramm
  ● Start   ◉ Ende   ( Aktion )   ◇ Entscheidung/Zusammenführung
  [Bedingung] an den Pfeilen   ▬ Gabelung/Vereinigung (parallel)
Sequenzdiagramm
  Lebenslinien senkrecht, Zeit nach unten
  → synchroner Aufruf   ⇢ Antwort (gestrichelt)
  Fragmente: alt (Verzweigung)  opt (optional)  loop (Schleife)
Zustandsdiagramm
  [Zustand] ──Ereignis [Bedingung] / Aktion──→ [Zustand]
Use-Case-Diagramm
  Akteur außen, Systemgrenze als Rechteck, Anwendungsfall als Oval
  «include» immer   «extend» optional`},
{title:'ER-Modell und Tabellen', code:`Chen: Rechteck = Entität, Raute = Beziehung, Oval = Attribut
Kardinalität 1:1   1:n   n:m
(min,max)-Notation: (0,*) heißt keine bis viele
Krähenfuß: | = genau eins   O = null   < = viele

Umsetzung:
1:n  Fremdschlüssel auf die n-Seite
n:m  Zwischentabelle mit beiden Fremdschlüsseln
Schreibweise: Tabelle(PK, Attribut, #FK)`},
{title:'Notenschlüssel IHK', code:`100 bis 92 Punkte  sehr gut (1)
 91 bis 81 Punkte  gut (2)
 80 bis 67 Punkte  befriedigend (3)
 66 bis 50 Punkte  ausreichend (4)
 49 bis 30 Punkte  mangelhaft (5)
 29 bis  0 Punkte  ungenügend (6)`}
];
