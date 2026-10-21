// GA2: Entwicklung und Umsetzung von Algorithmen
const L_GA2 = [
{
id:'pseudo1', area:'GA2', prio:1, title:'Pseudocode: die 4 Grundmuster', mins:25,
why:'War in jeder AP2 von Winter 2021 bis Winter 2025 dran und bringt die meisten Punkte überhaupt.',
clip:[
{h:'Warum das hier zuerst?', v:{stat:'9 von 9', sub:'Prüfungen von Winter 2021 bis Winter 2025 hatten Pseudocode. Kein anderes Thema bringt mehr Punkte.'},
 say:'Pseudocode kam in jeder einzelnen AP2 von Winter 2021 bis Winter 2025 dran. Kein Thema bringt mehr Punkte. Wenn du nur eine Sache lernst, dann diese.'},
{h:'Die Bausteine', v:{code:`x = 5                     // Zuweisung
falls x > 3 dann          // Verzweigung
  ausgabe("groß")
sonst
  ausgabe("klein")
ende falls

für i = 0 bis 9           // Zählschleife
  ...
ende für

solange x > 0             // Bedingungsschleife
  x = x - 1
ende solange`},
 say:'Du brauchst nur fünf Bausteine. Zuweisung, falls sonst, die Für-Schleife zum Zählen, die Solange-Schleife wenn du nicht weißt wie oft, und eine Funktion mit Rückgabe. Die Syntax ist frei. Keine Programmiersprache ist vorgeschrieben. Es zählt die Logik.'},
{h:'Arrays: Index startet bei 0', v:{code:`zahlen = [7, 3, 9, 4]
zahlen[0]        → 7
zahlen[3]        → 4
laenge(zahlen)   → 4
letzter Index    → laenge(zahlen) - 1 = 3`},
 say:'Arrays fangen bei Index null an. Ein Array mit vier Elementen hat die Indizes null bis drei. Der letzte Index ist also immer Länge minus eins. Das ist der häufigste Fehler in der Prüfung.'},
{h:'Muster 1: Summe und Durchschnitt', v:{code:`funktion durchschnitt(werte)
  falls laenge(werte) == 0 dann
    rückgabe 0
  ende falls
  summe = 0
  für i = 0 bis laenge(werte) - 1
    summe = summe + werte[i]
  ende für
  rückgabe summe / laenge(werte)
ende funktion`},
 say:'Muster eins: Summe. Du setzt eine Variable auf null, gehst mit der Schleife durch alle Elemente und addierst. Für den Durchschnitt teilst du am Ende durch die Anzahl. Und ganz wichtig: Prüfe vorher, ob das Array leer ist. Sonst teilst du durch null. Dafür gibt es Punkte.'},
{h:'Muster 2: Maximum finden', v:{code:`funktion maximum(werte)
  max = werte[0]          // NICHT 0!
  für i = 1 bis laenge(werte) - 1
    falls werte[i] > max dann
      max = werte[i]
    ende falls
  ende für
  rückgabe max
ende funktion`},
 say:'Muster zwei: Maximum. Starte mit dem ersten Element, nicht mit null. Wenn alle Werte negativ sind, wäre null sonst falsch. Dann vergleichst du jedes weitere Element und merkst dir das größere. Minimum geht genauso, nur mit kleiner als.'},
{h:'Muster 3: Zählen und Filtern', v:{code:`funktion teureAuftraege(auftraege)
  ergebnis = neue Liste
  für jeden a in auftraege
    falls a.honorar > 1000 dann
      ergebnis.hinzufuegen(a)
    ende falls
  ende für
  rückgabe ergebnis
ende funktion`},
 say:'Muster drei: Filtern. Du legst eine leere Liste an, gehst alle Elemente durch, und wenn die Bedingung passt, fügst du das Element hinzu. Zählen ist das Gleiche, nur dass du statt hinzufügen einen Zähler plus eins rechnest.'},
{h:'Muster 4: Suchen mit Abbruch', v:{code:`funktion finde(liste, gesucht)
  i = 0
  solange i < laenge(liste)
    falls liste[i] == gesucht dann
      rückgabe i          // gefunden
    ende falls
    i = i + 1
  ende solange
  rückgabe -1             // nicht gefunden
ende funktion`},
 say:'Muster vier: Suchen. Mit einer Solange-Schleife läufst du durch, bis du das Element findest. Dann gibst du sofort den Index zurück. Findest du nichts, gibst du minus eins zurück. Vergiss nicht, i zu erhöhen, sonst hast du eine Endlosschleife.'},
{h:'So holst du die Punkte', v:{list:['Erst in eigenen Worten hinschreiben, was passieren soll','Variablen am Anfang initialisieren (summe = 0, max = erstes Element)','Grenzen prüfen: 0 bis laenge - 1','Sonderfälle: leere Liste, nichts gefunden','Sauber einrücken, Rückgabe nicht vergessen','Auch halbe Lösungen bringen Teilpunkte. Nie leer lassen!']},
 say:'So holst du die Punkte. Initialisiere deine Variablen. Achte auf die Grenzen der Schleife. Denk an Sonderfälle wie die leere Liste. Rücke sauber ein und vergiss die Rückgabe nicht. Und das Wichtigste: Lass nie etwas leer. Auch eine halbe Lösung bringt Teilpunkte.'}
],
videos:[{id:'t30J-xu0XzE',t:'Der Pseudocode, Teil 1: Einführung',c:'Dozenten aus Leidenschaft'}],
quiz:[
{q:'Ein Array hat 5 Elemente. Welchen Index hat das letzte Element?', type:'input', a:['4'], e:'Index startet bei 0, also 0 bis 4. Letzter Index = laenge - 1.'},
{q:'Welche Schleife nimmst du, wenn du vorher NICHT weißt, wie oft sie laufen muss?', o:['für-Schleife','solange-Schleife','falls-sonst','gar keine'], a:1, e:'Die solange-Schleife läuft, bis eine Bedingung nicht mehr stimmt. Die für-Schleife nimmst du, wenn die Anzahl feststeht.'},
{q:'Womit initialisierst du max beim Suchen des Maximums am besten?', o:['mit 0','mit -1','mit dem ersten Element des Arrays','mit der Länge des Arrays'], a:2, e:'Mit 0 wäre das Ergebnis falsch, wenn alle Werte negativ sind. Das erste Element ist immer ein gültiger Startwert.'},
{q:'summe = 0\nfür i = 1 bis 4\n  summe = summe + i\nende für\nausgabe(summe)\n\nWas wird ausgegeben?', type:'input', a:['10'], e:'1 + 2 + 3 + 4 = 10.'},
{q:'Ist in der Prüfung eine bestimmte Programmiersprache oder Pseudocode-Syntax vorgeschrieben?', o:['Ja, Java','Ja, Python','Nein, die Logik zählt','Ja, Struktogramm'], a:2, e:'Keine Sprache ist vorgeschrieben. Lesbar und logisch richtig reicht. Struktogramme sind seit 2025 sogar raus.'},
{q:'Was solltest du bei einer Durchschnittsberechnung vorher prüfen?', o:['Ob das Array sortiert ist','Ob das Array leer ist (Division durch 0)','Ob die Werte Strings sind','Nichts'], a:1, e:'Bei einer leeren Liste wäre die Anzahl 0 und du würdest durch 0 teilen.'},
{q:'Bei der linearen Suche wird nichts gefunden. Was gibt die Funktion im Clip zurück?', type:'input', a:['-1'], e:'-1 ist der übliche Wert für "nicht gefunden", weil es keinen Index -1 gibt.'},
{q:'Was passiert, wenn du in einer solange-Schleife vergisst, i zu erhöhen?', o:['Nichts','Endlosschleife','Fehler beim Kompilieren','Die Schleife läuft genau einmal'], a:1, e:'Die Bedingung bleibt immer wahr, die Schleife hört nie auf.'}
],
write:[
{task:'Schreibe in Pseudocode eine Funktion durchschnittPositiv(werte), die den Durchschnitt aller Werte größer 0 zurückgibt. Gibt es keine positiven Werte, soll 0 zurückgegeben werden.',
 keys:[['Schleife über alle Werte',/(f(ü|ue)r|solange|for|while|each|jede)/i],['Bedingung größer 0',/(>\s*0|gr(ö|oe)(ß|ss)er\s*(als\s*)?(0|null))/i],['Summe aufaddieren',/summe|sum/i],['Anzahl zählen',/anzahl|z(ä|ae)hler|count|anz/i],['Sonderfall keine Werte',/(anzahl|z(ä|ae)hler|count|anz)\s*(==|=|ist|is)\s*(0|null)|keine/i],['Division',/\/|geteilt|div/i],['Rückgabe',/r(ü|ue)ckgabe|return/i]],
 model:`funktion durchschnittPositiv(werte)
  summe = 0
  anzahl = 0
  für i = 0 bis laenge(werte) - 1
    falls werte[i] > 0 dann
      summe = summe + werte[i]
      anzahl = anzahl + 1
    ende falls
  ende für
  falls anzahl == 0 dann
    rückgabe 0
  ende falls
  rückgabe summe / anzahl
ende funktion`},
{task:'Schreibe eine Funktion zaehleUeber(liste, grenze), die zurückgibt, wie viele Elemente größer als grenze sind.',
 keys:[['Zähler auf 0 setzen',/=\s*0/],['Schleife',/(f(ü|ue)r|solange|for|while|each|jede)/i],['Vergleich mit grenze',/>\s*grenze/i],['Zähler erhöhen',/\+\s*1|\+\+|\+=\s*1/],['Rückgabe',/r(ü|ue)ckgabe|return/i]],
 model:`funktion zaehleUeber(liste, grenze)
  zaehler = 0
  für jedes element in liste
    falls element > grenze dann
      zaehler = zaehler + 1
    ende falls
  ende für
  rückgabe zaehler
ende funktion`}
]},

{
id:'pseudo2', area:'GA2', prio:2, title:'Sortieren, Suchen, Rekursion', mins:25,
why:'Bubble, Selection und Insertion Sort stehen seit 2025 ausdrücklich im Katalog.',
clip:[
{h:'Was im Katalog steht', v:{list:['Im Katalog: Bubble Sort','Im Katalog: Selection Sort','Im Katalog: Insertion Sort','Weiterhin: lineare und binäre Suche','Weiterhin: Rekursion']},
 say:'Seit dem Prüfungskatalog 2025 stehen drei Sortierverfahren ausdrücklich drin: Bubble Sort, Selection Sort und Insertion Sort. Weiterhin im Katalog sind lineare und binäre Suche sowie Rekursion.'},
{h:'Bubble Sort', v:{code:`[5, 1, 4, 2]
 5>1 tauschen → [1, 5, 4, 2]
 5>4 tauschen → [1, 4, 5, 2]
 5>2 tauschen → [1, 4, 2, 5]   ← nach Durchlauf 1
                                  größte Zahl ist hinten`},
 say:'Bubble Sort vergleicht immer zwei Nachbarn. Ist der linke größer, werden sie getauscht. Nach dem ersten Durchlauf ist die größte Zahl ganz hinten. Wie eine Blase, die nach oben steigt. Das wiederholst du n minus eins Mal, dann ist die Liste sortiert. Wird in einem Durchlauf nichts mehr getauscht, kann man auch früher abbrechen.'},
{h:'Bubble Sort in Pseudocode', v:{code:`für i = 0 bis n - 2
  für j = 0 bis n - 2 - i
    falls a[j] > a[j+1] dann
      temp = a[j]          // Dreieckstausch
      a[j] = a[j+1]
      a[j+1] = temp
    ende falls
  ende für
ende für
// Optional: Flag getauscht, Abbruch wenn
// in einem Durchlauf nichts getauscht wurde`},
 say:'Im Code sind das zwei verschachtelte Schleifen. Die innere vergleicht Nachbarn. Zum Tauschen brauchst du eine Hilfsvariable temp. Das nennt man Dreieckstausch. Ohne temp überschreibst du einen Wert. Das kommt gerne als Fehlersuche dran.'},
{h:'Selection und Insertion Sort', v:{table:[['Verfahren','Idee'],['Selection Sort','Suche das Minimum im unsortierten Rest, tausche es nach vorne'],['Insertion Sort','Nimm das nächste Element und füge es links an der richtigen Stelle ein, wie Spielkarten sortieren']]},
 say:'Selection Sort sucht immer das kleinste Element im unsortierten Teil und tauscht es nach vorne. Insertion Sort funktioniert wie Spielkarten auf der Hand: Du nimmst die nächste Karte und steckst sie links an die richtige Stelle. Alle drei haben im schlechtesten Fall quadratische Laufzeit, O von n Quadrat.'},
{h:'Binäre Suche', v:{code:`Sortiert: [2, 5, 8, 12, 16, 23, 38]
gesucht 23
Mitte = 12 → 23 ist größer → rechte Hälfte
[16, 23, 38]  Mitte = 23 → gefunden

Voraussetzung: Liste ist SORTIERT
Laufzeit: O(log n)`},
 say:'Die binäre Suche funktioniert nur bei sortierten Listen. Du schaust in die Mitte. Ist der gesuchte Wert größer, suchst du rechts weiter, sonst links. Jedes Mal halbierst du die Liste. Deshalb ist sie sehr schnell, O von log n. Die lineare Suche dagegen ist O von n.'},
{h:'Rekursion', v:{code:`funktion fakultaet(n)
  falls n <= 1 dann
    rückgabe 1            // Abbruchbedingung
  ende falls
  rückgabe n * fakultaet(n - 1)   // Selbstaufruf
ende funktion

fakultaet(4) = 4 * 3 * 2 * 1 = 24`},
 say:'Rekursion heißt: Eine Funktion ruft sich selbst auf. Du brauchst immer zwei Dinge. Eine Abbruchbedingung, sonst läuft sie unendlich und es gibt einen Stack Overflow. Und einen Selbstaufruf, der das Problem kleiner macht. Fakultät von vier ist vier mal drei mal zwei mal eins, also vierundzwanzig.'},
{h:'Laufzeiten merken', v:{table:[['O-Notation','Beispiel'],['O(1)','Zugriff auf a[3]'],['O(log n)','Binäre Suche'],['O(n)','Lineare Suche, eine Schleife'],['O(n²)','Bubble/Selection/Insertion, zwei verschachtelte Schleifen']]},
 say:'Die Laufzeiten kurz: O von eins ist ein direkter Zugriff. O von log n ist binäre Suche. O von n ist eine einfache Schleife. O von n Quadrat sind zwei verschachtelte Schleifen, also die einfachen Sortierverfahren.'}
],
videos:[{id:'Mj-payJDsdw',t:'Bubble Sort Algorithmus mit Animation',c:'HappyCoders'},{id:'jfH_h660gas',t:'Binäre Suche anschaulich erklärt',c:'informatikZentrale'},{id:'x7dEhDBPwX4',t:'Rekursion ganz einfach erklärt',c:'Kevin Chromik'},{id:'x9NhQUxyCpY',t:'Big O Notation in 6 Minuten',c:'Turing Informatik'}],
quiz:[
{q:'Wie sieht [5, 1, 4, 2] nach dem ERSTEN Durchlauf Bubble Sort aus? (Zahlen mit Komma)', type:'input', a:['1,4,2,5'], e:'5 wandert Schritt für Schritt nach hinten: [1,4,2,5].'},
{q:'Wofür brauchst du beim Tauschen die Variable temp?', o:['Für die Laufzeit','Damit ein Wert nicht überschrieben wird','Für die Rekursion','Gar nicht'], a:1, e:'Ohne Zwischenspeicher wäre a[j] nach a[j] = a[j+1] verloren.'},
{q:'Welche Voraussetzung hat die binäre Suche?', o:['Liste muss sortiert sein','Liste muss Zahlen enthalten','Liste muss gerade Länge haben','Keine'], a:0, e:'Nur bei sortierten Daten kann man entscheiden, ob links oder rechts weitergesucht wird.'},
{q:'Was berechnet fakultaet(4)?', type:'input', a:['24'], e:'4 * 3 * 2 * 1 = 24.'},
{q:'Was passiert bei einer Rekursion ohne Abbruchbedingung?', o:['Sie liefert 0','Stack Overflow','Sie läuft genau einmal','Sie wird automatisch iterativ'], a:1, e:'Jeder Aufruf belegt Speicher auf dem Stack, bis er voll ist.'},
{q:'Welches Verfahren sucht im unsortierten Rest das Minimum und tauscht es nach vorne?', o:['Bubble Sort','Insertion Sort','Selection Sort','Binäre Suche'], a:2, e:'Selection = auswählen: das kleinste Element wird ausgewählt.'},
{q:'Welches Verfahren funktioniert wie Spielkarten auf der Hand einsortieren?', o:['Bubble Sort','Insertion Sort','Selection Sort','Quick Sort'], a:1, e:'Insertion = einfügen.'},
{q:'Welche Laufzeit haben zwei verschachtelte Schleifen über n Elemente?', o:['O(1)','O(log n)','O(n)','O(n²)'], a:3, e:'n mal n Durchläufe.'}
],
write:[
{task:'Erkläre in 2 bis 3 Sätzen, wie Bubble Sort funktioniert und welche Laufzeit er hat.',
 keys:[['benachbarte Elemente vergleichen',/nachbar|benachbart|nebeneinander|j\s*\+\s*1/i],['tauschen',/tausch/i],['wiederholen bis sortiert',/wiederhol|durchl(ä|ae)uf|bis.*sortiert|kein.*tausch/i],['Laufzeit O(n²)',/n\s*(²|\^?\s*2|quadrat)/i]],
 model:'Bubble Sort vergleicht immer zwei benachbarte Elemente und tauscht sie, wenn das linke größer ist. Nach jedem Durchlauf steht das größte unsortierte Element am Ende. Das wird wiederholt, bis in einem Durchlauf nicht mehr getauscht wird. Die Laufzeit ist im schlechtesten Fall O(n²).'},
{task:'Schreibe eine rekursive Funktion summeBis(n), die 1 + 2 + ... + n berechnet.',
 keys:[['Abbruchbedingung',/falls|if|wenn/i],['Basisfall 0 oder 1',/(<=|==|=|<)\s*(0|1)/],['Selbstaufruf mit n - 1',/summeBis\s*\(\s*n\s*-\s*1\s*\)/i],['Rückgabe',/r(ü|ue)ckgabe|return/i]],
 model:`funktion summeBis(n)
  falls n <= 0 dann
    rückgabe 0
  ende falls
  rückgabe n + summeBis(n - 1)
ende funktion`}
]},

{
id:'sql1', area:'GA2', prio:1, title:'SQL: SELECT und JOIN', mins:25,
why:'SQL SELECT kam in allen 9 Prüfungen dran. Die Syntax steht im Belegsatz.',
clip:[
{h:'Unsere Beispiel-Tabellen', v:{table:[['Mandant','',''],['MandantID','Name','Ort'],['1','Bäckerei Gies','Fulda'],['2','Autohaus Ruf','Erfurt'],['3','Praxis Lenz','Fulda']], table2:[['Auftrag','','',''],['AuftragID','MandantID','Art','Honorar'],['10','1','Steuer','1200'],['11','1','Lohn','400'],['12','2','Prüfung','5000']]},
 say:'Wir nehmen zwei Tabellen aus einer Kanzlei. Mandant mit ID, Name und Ort. Und Auftrag mit Art und Honorar. Die Spalte MandantID in Auftrag ist der Fremdschlüssel. Sie zeigt, zu welchem Mandanten der Auftrag gehört.'},
{h:'Grundgerüst SELECT', v:{code:`SELECT Name, Ort          -- welche Spalten
FROM Mandant              -- aus welcher Tabelle
WHERE Ort = 'Fulda'       -- welche Zeilen
ORDER BY Name ASC;        -- sortiert`},
 say:'Jede Abfrage hat das gleiche Grundgerüst. SELECT sagt, welche Spalten. FROM sagt, welche Tabelle. WHERE filtert die Zeilen. ORDER BY sortiert, aufsteigend mit ASC oder absteigend mit DESC. Merksatz für die Reihenfolge: Select From Where Group Having Order.'},
{h:'WHERE-Werkzeuge', v:{code:`WHERE Honorar > 1000
WHERE Ort = 'Fulda' AND Honorar < 500
WHERE Ort IN ('Fulda', 'Erfurt')
WHERE Honorar BETWEEN 100 AND 1000
WHERE Name LIKE 'B%'        -- beginnt mit B
WHERE Ort IS NULL           -- nie "= NULL"!`},
 say:'Im WHERE hast du ein paar Werkzeuge. Vergleich mit größer oder gleich. Mehrere Bedingungen mit AND und OR. IN für eine Liste. BETWEEN für einen Bereich. LIKE mit Prozentzeichen als Platzhalter. Und leere Werte prüfst du immer mit IS NULL, niemals mit gleich NULL.'},
{h:'INNER JOIN', v:{code:`SELECT m.Name, a.Art, a.Honorar
FROM Mandant m
INNER JOIN Auftrag a
  ON m.MandantID = a.MandantID;

→ Bäckerei Gies | Steuer  | 1200
→ Bäckerei Gies | Lohn    |  400
→ Autohaus Ruf  | Prüfung | 5000`},
 say:'Mit JOIN verbindest du Tabellen. Hinter ON steht die Verbindung: Primärschlüssel gleich Fremdschlüssel. Der INNER JOIN liefert nur Zeilen, die in beiden Tabellen einen Partner haben. Praxis Lenz hat keinen Auftrag und fehlt deshalb. Die Buchstaben m und a sind Aliase, damit du weniger schreiben musst.'},
{h:'LEFT JOIN: auch ohne Partner', v:{code:`SELECT m.Name, a.Art
FROM Mandant m
LEFT JOIN Auftrag a
  ON m.MandantID = a.MandantID;

→ ...
→ Praxis Lenz   | NULL

-- Mandanten OHNE Auftrag:
... WHERE a.AuftragID IS NULL;`},
 say:'Der LEFT JOIN nimmt alle Zeilen der linken Tabelle, auch wenn es rechts keinen Partner gibt. Dann steht dort NULL. Klassische Prüfungsfrage: Finde alle Mandanten ohne Auftrag. Lösung: LEFT JOIN und dann WHERE AuftragID IS NULL.'},
{h:'Prüfungstricks', v:{list:['Belegsatz liegt bei: SQL-Syntax nachschlagen ist erlaubt','Texte in einfache Anführungszeichen: \'Fulda\'','Bei JOIN immer ON mit PK = FK','Bei mehreren Tabellen Spalten mit Alias eindeutig machen: m.Name','DISTINCT entfernt doppelte Zeilen','Semikolon am Ende']},
 say:'Ein paar Tricks. Die SQL-Syntax steht im Belegsatz, du darfst nachschauen. Texte kommen in einfache Anführungszeichen. Bei JOIN immer die ON Bedingung mit Primärschlüssel gleich Fremdschlüssel. Und DISTINCT entfernt doppelte Zeilen.'}
],
videos:[{id:'CaWOzl0Y_vE',t:'INNER, LEFT, RIGHT JOIN in 5 Minuten',c:'biservices'},{id:'SBiuRA1RVnw',t:'Joins in SQL einfach erklärt',c:'Patrick Boekhoven'}],
quiz:[
{q:'In welcher Reihenfolge stehen die Klauseln?', o:['SELECT, WHERE, FROM, ORDER BY','SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY','FROM, SELECT, HAVING, WHERE','SELECT, FROM, ORDER BY, WHERE'], a:1, e:'Merksatz: Select From Where Group Having Order.'},
{q:'Wie prüfst du, ob die Spalte Ort leer ist?', o:["WHERE Ort = NULL","WHERE Ort IS NULL","WHERE Ort == ''","WHERE NULL(Ort)"], a:1, e:'NULL vergleicht man nur mit IS NULL bzw. IS NOT NULL.'},
{q:'Welche Mandanten liefert ein INNER JOIN Mandant mit Auftrag aus dem Clip?', o:['Alle drei','Nur Bäckerei Gies und Autohaus Ruf','Nur Praxis Lenz','Keinen'], a:1, e:'Praxis Lenz hat keinen Auftrag und fällt beim INNER JOIN raus.'},
{q:'Wie viele Zeilen liefert der INNER JOIN aus dem Clip?', type:'input', a:['3'], e:'Gies Steuer, Gies Lohn, Ruf Prüfung.'},
{q:'Wie findest du Mandanten OHNE Auftrag?', o:['INNER JOIN + WHERE AuftragID IS NULL','LEFT JOIN + WHERE a.AuftragID IS NULL','RIGHT JOIN ohne WHERE','DISTINCT'], a:1, e:'LEFT JOIN behält alle Mandanten, die ohne Partner haben NULL in den Auftragsspalten.'},
{q:"Was findet WHERE Name LIKE 'B%'?", o:['Namen, die mit B enden','Namen, die mit B beginnen','Namen mit genau 2 Zeichen','Nur den Namen "B%"'], a:1, e:'% steht für beliebig viele Zeichen.'},
{q:'Was steht hinter ON beim JOIN?', o:['Die Sortierung','Primärschlüssel = Fremdschlüssel','Die Spaltenauswahl','Die Gruppierung'], a:1, e:'Damit werden die passenden Zeilen verknüpft.'},
{q:'Darfst du in der Prüfung SQL-Syntax nachschlagen?', o:['Nein','Ja, im Belegsatz','Nur mit Handy','Nur in GA1'], a:1, e:'Der bundeseinheitliche Belegsatz hat ein SQL-Beiblatt.'}
],
write:[
{task:"Schreibe eine SQL-Abfrage: Gib Name des Mandanten, Art und Honorar aller Aufträge mit einem Honorar über 1000 aus, sortiert nach Honorar absteigend. Tabellen: Mandant(MandantID, Name, Ort), Auftrag(AuftragID, MandantID, Art, Honorar).",
 keys:[['SELECT mit Spalten',/select\s+.*name.*honorar|select\s+.*honorar.*name/is],['FROM Mandant / Auftrag',/from\s+(mandant|auftrag)/i],['JOIN',/join/i],['ON MandantID = MandantID',/on\s+\w*\.?mandantid\s*=\s*\w*\.?mandantid/i],['WHERE Honorar > 1000',/where\s+.*honorar\s*>\s*1000/is],['ORDER BY Honorar DESC',/order\s+by\s+\w*\.?honorar\s+desc/i]],
 model:`SELECT m.Name, a.Art, a.Honorar
FROM Mandant m
INNER JOIN Auftrag a ON m.MandantID = a.MandantID
WHERE a.Honorar > 1000
ORDER BY a.Honorar DESC;`},
{task:'Schreibe eine Abfrage, die die Namen aller Mandanten ausgibt, die KEINEN Auftrag haben.',
 keys:[['LEFT JOIN',/left\s+(outer\s+)?join/i],['ON-Bedingung',/on\s+\w*\.?mandantid\s*=\s*\w*\.?mandantid/i],['IS NULL',/is\s+null/i]],
 alt:'Alternativ geht auch: WHERE MandantID NOT IN (SELECT MandantID FROM Auftrag)',
 model:`SELECT m.Name
FROM Mandant m
LEFT JOIN Auftrag a ON m.MandantID = a.MandantID
WHERE a.AuftragID IS NULL;`}
]},

{
id:'sql2', area:'GA2', prio:1, title:'SQL: GROUP BY, HAVING, Subselect', mins:25,
why:'Gruppieren und Aggregieren ist die typische schwerere SQL-Teilaufgabe.',
clip:[
{h:'Aggregatfunktionen', v:{table:[['Funktion','liefert'],['COUNT(*)','Anzahl Zeilen'],['SUM(Honorar)','Summe'],['AVG(Honorar)','Durchschnitt'],['MIN / MAX','kleinster / größter Wert']]},
 say:'Aggregatfunktionen fassen viele Zeilen zu einem Wert zusammen. COUNT zählt, SUM summiert, AVG bildet den Durchschnitt, MIN und MAX finden den kleinsten und größten Wert.'},
{h:'GROUP BY: pro Gruppe rechnen', v:{code:`SELECT m.Name, COUNT(*) AS Anzahl,
       SUM(a.Honorar) AS Gesamt
FROM Mandant m
JOIN Auftrag a ON m.MandantID = a.MandantID
GROUP BY m.Name;

→ Bäckerei Gies | 2 | 1600
→ Autohaus Ruf  | 1 | 5000`},
 say:'Mit GROUP BY rechnest du pro Gruppe. Hier pro Mandant: Anzahl der Aufträge und Summe der Honorare. Die goldene Regel: Jede Spalte im SELECT, die nicht in einer Aggregatfunktion steckt, muss auch im GROUP BY stehen. AS gibt der Spalte einen Namen.'},
{h:'WHERE oder HAVING?', v:{code:`WHERE   filtert ZEILEN   vor dem Gruppieren
HAVING  filtert GRUPPEN  nach dem Gruppieren

SELECT m.Name, SUM(a.Honorar) AS Gesamt
FROM Mandant m
JOIN Auftrag a ON m.MandantID = a.MandantID
WHERE a.Art <> 'Lohn'
GROUP BY m.Name
HAVING SUM(a.Honorar) > 2000;`},
 say:'Der wichtigste Unterschied: WHERE filtert einzelne Zeilen vor dem Gruppieren. HAVING filtert ganze Gruppen nach dem Gruppieren. Sobald in der Bedingung eine Aggregatfunktion wie SUM oder COUNT steckt, brauchst du HAVING.'},
{h:'Subselect', v:{code:`-- Aufträge über dem Durchschnitt
SELECT AuftragID, Honorar
FROM Auftrag
WHERE Honorar > (SELECT AVG(Honorar)
                 FROM Auftrag);

-- Mandanten mit Prüfungsauftrag
SELECT Name FROM Mandant
WHERE MandantID IN (SELECT MandantID
                    FROM Auftrag
                    WHERE Art = 'Prüfung');`},
 say:'Ein Subselect ist eine Abfrage in der Abfrage. Typisch: Alle Aufträge, deren Honorar über dem Durchschnitt liegt. Der Durchschnitt kommt aus der inneren Abfrage. Oder mit IN: alle Mandanten, deren ID in der Liste der Prüfungsaufträge vorkommt.'},
{h:'Rechenbeispiel', v:{code:`Honorare: 1200, 400, 5000
COUNT(*)      = 3
SUM(Honorar)  = 6600
AVG(Honorar)  = 2200
MAX(Honorar)  = 5000`},
 say:'Kurz rechnen mit unseren Daten. Drei Aufträge mit 1200, 400 und 5000. Count ist drei. Summe ist sechstausendsechshundert. Durchschnitt ist zweitausendzweihundert. Das Maximum ist fünftausend.'},
{h:'Checkliste', v:{list:['Was soll pro ... berechnet werden? → das kommt ins GROUP BY','Bedingung mit SUM/COUNT/AVG → HAVING','Bedingung auf normale Spalte → WHERE','Vergleich mit einem berechneten Wert → Subselect','"Mehr als / mindestens" lesen und richtig in > oder >= übersetzen']},
 say:'Deine Checkliste. Lies, was pro irgendwas berechnet werden soll, das kommt ins GROUP BY. Bedingung mit Aggregat, dann HAVING. Bedingung auf eine normale Spalte, dann WHERE. Und achte auf mehr als gegen mindestens. Das ist größer gegen größer gleich.'}
],
videos:[{id:'fN8OlBsvT8I',t:'GROUP BY und HAVING schnell erklärt',c:'Patrick Boekhoven'},{id:'4sP03pekdys',t:'SQL GROUP BY in 12 Minuten',c:'biservices'}],
quiz:[
{q:'Du willst nur Mandanten, deren Honorarsumme über 2000 liegt. Was nimmst du?', o:['WHERE SUM(Honorar) > 2000','HAVING SUM(Honorar) > 2000','ORDER BY SUM(Honorar)','DISTINCT'], a:1, e:'Aggregat in der Bedingung → HAVING.'},
{q:'Was ist der AVG der Honorare 1200, 400 und 5000?', type:'input', a:['2200'], e:'6600 / 3 = 2200.'},
{q:'Welche Regel gilt für Spalten im SELECT bei GROUP BY?', o:['Keine','Alle Nicht-Aggregat-Spalten müssen ins GROUP BY','Nur Zahlen dürfen rein','Nur eine Spalte erlaubt'], a:1, e:'Sonst weiß die Datenbank nicht, welchen Wert sie pro Gruppe anzeigen soll.'},
{q:'Wann filtert WHERE?', o:['Nach dem Gruppieren','Vor dem Gruppieren','Nach ORDER BY','Gar nicht bei GROUP BY'], a:1, e:'WHERE wirkt auf einzelne Zeilen, bevor gruppiert wird.'},
{q:'Was liefert COUNT(*) bei den 3 Aufträgen?', type:'input', a:['3'], e:'COUNT(*) zählt alle Zeilen.'},
{q:'Wie heißt eine Abfrage innerhalb einer Abfrage?', o:['Join','Subselect / Unterabfrage','View','Trigger'], a:1, e:'Subselects stehen z. B. im WHERE in Klammern.'},
{q:'"Mindestens 3 Aufträge" heißt in SQL:', o:['COUNT(*) > 3','COUNT(*) >= 3','COUNT(*) = 3','COUNT(*) < 3'], a:1, e:'Mindestens = größer oder gleich.'}
],
write:[
{task:'Gib pro Ort die Anzahl der Mandanten aus, aber nur Orte mit mindestens 2 Mandanten. Tabelle: Mandant(MandantID, Name, Ort).',
 keys:[['SELECT Ort, COUNT',/select\s+.*ort.*count/is],['FROM Mandant',/from\s+mandant/i],['GROUP BY Ort',/group\s+by\s+\w*\.?ort/i],['HAVING COUNT >= 2',/having\s+count\s*\(.*\)\s*(>=\s*2\b|>\s*1\b)/i]],
 model:`SELECT Ort, COUNT(*) AS Anzahl
FROM Mandant
GROUP BY Ort
HAVING COUNT(*) >= 2;`},
{task:'Gib alle Aufträge (AuftragID, Honorar) aus, deren Honorar über dem Durchschnitt aller Honorare liegt.',
 keys:[['SELECT AuftragID, Honorar',/select\s+.*auftragid.*honorar/is],['WHERE Honorar >',/where\s+honorar\s*>/i],['Subselect mit AVG',/\(\s*select\s+avg\s*\(\s*honorar\s*\)/i]],
 model:`SELECT AuftragID, Honorar
FROM Auftrag
WHERE Honorar > (SELECT AVG(Honorar) FROM Auftrag);`}
]},

{
id:'sql3', area:'GA2', prio:2, title:'SQL: Ändern, Anlegen, Rechte', mins:20,
why:'INSERT, UPDATE, DELETE kommen fast immer als kleine Teilaufgabe.',
clip:[
{h:'Daten ändern: DML', v:{code:`INSERT INTO Mandant (MandantID, Name, Ort)
VALUES (4, 'Café Rhön', 'Fulda');

UPDATE Auftrag
SET Honorar = Honorar * 1.05
WHERE Art = 'Lohn';

DELETE FROM Auftrag
WHERE AuftragID = 11;`},
 say:'Drei Befehle zum Ändern von Daten. INSERT INTO fügt eine Zeile ein, mit VALUES für die Werte. UPDATE ändert Werte mit SET. DELETE FROM löscht Zeilen. Ganz wichtig: Bei UPDATE und DELETE immer ein WHERE. Ohne WHERE änderst oder löschst du die ganze Tabelle.'},
{h:'Tabellen anlegen: DDL', v:{code:`CREATE TABLE Auftrag (
  AuftragID  INT PRIMARY KEY,
  MandantID  INT NOT NULL,
  Art        VARCHAR(30),
  Honorar    DECIMAL(10,2),
  Datum      DATE,
  FOREIGN KEY (MandantID)
    REFERENCES Mandant(MandantID)
);
ALTER TABLE Auftrag ADD Status VARCHAR(20);
CREATE INDEX idx_art ON Auftrag(Art);`},
 say:'Mit CREATE TABLE legst du eine Tabelle an. Jede Spalte bekommt einen Datentyp. INT für ganze Zahlen, VARCHAR für Text, DECIMAL für Geldbeträge, DATE für Datum. PRIMARY KEY macht die Zeile eindeutig. FOREIGN KEY mit REFERENCES verweist auf die andere Tabelle. ALTER TABLE ändert eine Tabelle, und ein INDEX beschleunigt die Suche.'},
{h:'Rechte: DCL', v:{code:`GRANT SELECT, INSERT ON Auftrag TO azubi;
REVOKE INSERT ON Auftrag FROM azubi;`},
 say:'Rechte vergibst du mit GRANT und entziehst sie mit REVOKE. So bekommt ein Benutzer nur die Rechte, die er wirklich braucht. Das nennt man das Prinzip der minimalen Rechte.'},
{h:'Die drei Sprachteile', v:{table:[['Teil','Befehle'],['DDL Definition','CREATE, ALTER, DROP'],['DML Manipulation','SELECT, INSERT, UPDATE, DELETE'],['DCL Control','GRANT, REVOKE']]},
 say:'Die drei Sprachteile von SQL. DDL definiert Strukturen: CREATE, ALTER, DROP. DML bearbeitet Daten: SELECT, INSERT, UPDATE, DELETE. DCL regelt Rechte: GRANT und REVOKE.'},
{h:'SQL-Injection', v:{code:`Eingabe: ' OR '1'='1
"SELECT * FROM User WHERE name = '" + eingabe + "'"
→ WHERE name = '' OR '1'='1'   → ALLE Zeilen!

Schutz: Prepared Statements
SELECT * FROM User WHERE name = ?`},
 say:'SQL-Injection ist ein Klassiker. Wenn Benutzereingaben direkt in den SQL-String geklebt werden, kann ein Angreifer eigenen SQL-Code einschleusen. Der Schutz: Prepared Statements mit Platzhaltern. Dazu Eingaben prüfen und minimale Rechte für den Datenbankbenutzer.'}
],
videos:[],
quiz:[
{q:'Was passiert bei DELETE FROM Auftrag; ohne WHERE?', o:['Fehler','Nichts','Alle Zeilen werden gelöscht','Nur die erste Zeile'], a:2, e:'Ohne WHERE betrifft der Befehl die ganze Tabelle.'},
{q:'Zu welchem Sprachteil gehört GRANT?', o:['DDL','DML','DCL','TCL'], a:2, e:'Data Control Language regelt Rechte.'},
{q:'Welcher Datentyp passt für Geldbeträge?', o:['INT','VARCHAR','DECIMAL(10,2)','BOOLEAN'], a:2, e:'DECIMAL speichert Nachkommastellen exakt.'},
{q:'Was schützt am besten gegen SQL-Injection?', o:['Prepared Statements','Längere Passwörter','Index anlegen','DISTINCT'], a:0, e:'Platzhalter trennen Code und Daten.'},
{q:'Mit welchem Befehl änderst du bestehende Werte?', o:['INSERT','UPDATE','ALTER','CHANGE'], a:1, e:'UPDATE ... SET ... WHERE ...'},
{q:'Womit fügst du einer bestehenden Tabelle eine Spalte hinzu?', o:['UPDATE TABLE','ALTER TABLE ... ADD','INSERT COLUMN','CREATE COLUMN'], a:1, e:'ALTER gehört zur DDL.'}
],
write:[
{task:"Erhöhe alle Honorare der Art 'Steuer' um 10 Prozent.",
 keys:[['UPDATE Auftrag',/update\s+auftrag/i],['SET Honorar = Honorar * 1.1',/set\s+honorar\s*=\s*(honorar\s*\*\s*1[.,]10?\b|honorar\s*\+\s*honorar\s*\*\s*0[.,]10?\b)/i],["WHERE Art = 'Steuer'",/where\s+art\s*=\s*'steuer'/i]],
 model:`UPDATE Auftrag
SET Honorar = Honorar * 1.1
WHERE Art = 'Steuer';`}
]},

{
id:'test', area:'GA2', prio:1, title:'Testen und Schreibtischtest', mins:25,
why:'Testen kam in 6 von 9 Prüfungen seit Winter 2021. Schreibtischtests sind leicht verdiente Punkte.',
clip:[
{h:'Black-Box vs. White-Box', v:{table:[['','Black-Box','White-Box'],['Kennt Code?','Nein','Ja'],['Basis','Anforderungen','Quellcode'],['Methoden','Äquivalenzklassen, Grenzwerte','Anweisungs-, Zweigüberdeckung']]},
 say:'Es gibt zwei Sichten. Beim Black-Box-Test kennst du den Code nicht. Du testest nur gegen die Anforderungen: Eingabe rein, Ausgabe prüfen. Beim White-Box-Test kennst du den Code und testest gezielt alle Anweisungen und Zweige.'},
{h:'Äquivalenzklassen', v:{code:`Rabatt ab Bestellwert 100 €. Zulässiger Bestellwert: 0 bis 10.000 €

ungültig   |   gültig: kein Rabatt | gültig: Rabatt | ungültig
   < 0     |      0 bis 99,99      | 100 bis 10.000 |  > 10.000

Testwerte: -5   |   50   |   500   |   20.000`},
 say:'Äquivalenzklassen teilen alle Eingaben in Gruppen, die sich gleich verhalten. Aus jeder Klasse reicht ein Testwert. Vergiss die ungültigen Klassen nicht, zum Beispiel negative Zahlen. Die geben in der Prüfung oft die Extrapunkte.'},
{h:'Grenzwertanalyse', v:{code:`Grenze bei 100:
  99,99  → kein Rabatt
 100,00  → Rabatt
 100,01  → Rabatt
Fehler passieren an den Rändern: > statt >=`},
 say:'Die Grenzwertanalyse testet genau an den Rändern der Klassen. Also direkt unter, auf und über der Grenze. Denn die meisten Fehler sind ein größer statt größer gleich.'},
{h:'Überdeckung', v:{code:`y = 0
falls x > 0 dann
  y = 1
ende falls
ausgabe(y)

Anweisungsüberdeckung (C0): x = 5 reicht
  → jede Anweisung einmal ausgeführt
Zweigüberdeckung (C1): x = 5 UND x = -1
  → jeder Zweig (ja UND nein) einmal`},
 say:'Bei White-Box gibt es Überdeckungsgrade. Anweisungsüberdeckung heißt, jede Anweisung wird mindestens einmal ausgeführt. Zweigüberdeckung heißt, jeder Zweig wird durchlaufen, also bei jedem falls einmal ja und einmal nein. Zweigüberdeckung ist stärker.'},
{h:'Schreibtischtest', v:{code:`a = 3, b = 0
solange a > 0
  b = b + a
  a = a - 1
ende solange

 a | b
 3 | 0
 2 | 3
 1 | 5
 0 | 6   → Ergebnis b = 6`},
 say:'Der Schreibtischtest, auch Tracetabelle. Du spielst den Code von Hand durch und schreibst nach jedem Schritt alle Variablen in eine Tabelle. Hier: a ist drei, b null. Dann b drei, a zwei. Dann b fünf, a eins. Dann b sechs, a null, Schleife endet. Ergebnis sechs.'},
{h:'Teststufen und Testarten', v:{table:[['Stufe / Art','Was'],['Unit-Test','einzelne Funktion/Klasse, automatisiert'],['Integrationstest','Zusammenspiel von Modulen'],['Systemtest','ganzes System gegen Anforderungen'],['Abnahmetest','Kunde prüft, ob es passt'],['Regressionstest','Altes kaputt nach Änderung?'],['Last-/Performancetest','Verhalten bei vielen Nutzern'],['TDD','erst Test schreiben, dann Code']]},
 say:'Die Teststufen von klein nach groß: Unit-Test für einzelne Funktionen. Integrationstest für das Zusammenspiel. Systemtest für das ganze System. Abnahmetest durch den Kunden. Dazu: Regressionstest, ob nach einer Änderung Altes kaputt ist. Lasttest bei vielen Nutzern. Und testgetriebene Entwicklung: erst den Test, dann den Code.'}
],
videos:[{id:'GshMbff3mzw',t:'Testfälle mit Äquivalenzklassen und Grenzwertanalyse',c:'Thomas Grosser'},{id:'00PO7GFsSzs',t:'Blackbox- und Whitebox-Test',c:'NUCIDA Group'},{id:'EcrTSZZraZI',t:'Die vier Teststufen (V-Modell)',c:'ModelMyMind'}],
quiz:[
{q:'Beim Black-Box-Test ...', o:['kennt der Tester den Code','kennt der Tester den Code nicht','wird nur die Datenbank getestet','testet der Kunde'], a:1, e:'Black-Box: nur Ein- und Ausgaben gegen die Anforderungen.'},
{q:'a = 3, b = 0\nsolange a > 0: b = b + a; a = a - 1\nWelchen Wert hat b am Ende?', type:'input', a:['6'], e:'3 + 2 + 1 = 6.'},
{q:'Welche Überdeckung verlangt, dass bei jeder Verzweigung (falls) beide Zweige mindestens einmal durchlaufen werden?', o:['Anweisungsüberdeckung','Zweigüberdeckung','Black-Box','Lasttest'], a:1, e:'Zweigüberdeckung (C1) durchläuft jeden Zweig.'},
{q:'Rabatt ab 100 €. Welche Werte testet die Grenzwertanalyse?', o:['0 und 1000','99,99 / 100 / 100,01','nur 100','50 und 500'], a:1, e:'Unter, auf und über der Grenze.'},
{q:'Wie heißt der Test, ob nach einer Änderung alte Funktionen noch gehen?', o:['Abnahmetest','Regressionstest','Unit-Test','Lasttest'], a:1, e:'Regression = Rückschritt.'},
{q:'Was ist TDD?', o:['Erst Code, dann Test','Erst Test, dann Code','Testen durch den Kunden','Test ohne Code'], a:1, e:'Test Driven Development: Red, Green, Refactor.'},
{q:'Welche Teststufe führt der Kunde durch?', o:['Unit-Test','Integrationstest','Abnahmetest','Regressionstest'], a:2, e:'Bei der Abnahme bestätigt der Kunde, dass es seine Anforderungen erfüllt.'},
{q:'x = 1\nfür i = 1 bis 3\n  x = x * 2\nende für\nWert von x?', type:'input', a:['8'], e:'1 → 2 → 4 → 8.'}
],
write:[
{task:'Eine Funktion prüft ein Alter: unter 0 ungültig, 0 bis 17 minderjährig, 18 bis 120 volljährig, über 120 ungültig. Nenne die Äquivalenzklassen und je einen Testwert, plus die Grenzwerte.',
 keys:[['ungültig negativ',/(<\s*0|negativ|-\d)/i],['minderjährig 0 bis 17',/(0\s*(bis|-)\s*17|minderj)/i],['volljährig 18 bis 120',/(18\s*(bis|-)\s*120|vollj)/i],['ungültig über 120',/(>\s*120|(ü|ue)ber\s*120|121|\b1[3-9]\d\b)/i],['Grenzwerte 17/18',/17.*18|18.*17/s]],
 model:'Klassen: ungültig < 0 (Testwert -5), minderjährig 0 bis 17 (Testwert 10), volljährig 18 bis 120 (Testwert 40), ungültig > 120 (Testwert 150). Grenzwerte: -1, 0, 17, 18, 120, 121.'}
]},

{
id:'umlv', area:'GA2', prio:2, title:'Aktivitäts-, Sequenz-, Zustandsdiagramm', mins:25,
why:'Struktogramm und PAP sind seit 2025 gestrichen. Abläufe zeigst du als Aktivitätsdiagramm oder Pseudocode.',
clip:[
{h:'Aktivitätsdiagramm: Elemente', v:{table:[['Symbol','Bedeutung'],['● schwarzer Punkt','Start'],['◉ Punkt mit Ring','Ende'],['▢ abgerundetes Rechteck','Aktion'],['◇ Raute','Entscheidung (ein Pfeil rein, mehrere raus) oder Zusammenführung (mehrere rein, einer raus)'],['[Bedingung]','Wächter an den Pfeilen'],['▬ dicker Balken','Parallelität: Gabelung / Vereinigung'],['Swimlanes','Spalten pro Akteur']]},
 say:'Struktogramm und Programmablaufplan sind seit 2025 aus dem Katalog gestrichen. Abläufe zeigst du jetzt als Aktivitätsdiagramm oder in Pseudocode. Das Aktivitätsdiagramm beginnt mit einem schwarzen Punkt und endet mit einem Punkt im Ring. Aktionen sind abgerundete Rechtecke. Eine Raute ist eine Verzweigung, und an die Pfeile schreibst du die Bedingungen in eckigen Klammern. Ein dicker Balken bedeutet parallele Abläufe. Swimlanes trennen, wer was macht.'},
{h:'Beispiel: Login', v:{code:`●
↓
◇ ←──────────────────────────────┐  (Zusammenführung)
↓                                │
( Zugangsdaten eingeben )        │
↓                                │
◇ ── [falsch] ──→ ( Fehlermeldung ) ─┘
│ [richtig]
↓
( Dashboard anzeigen )
↓
◉`},
 say:'Ein Beispiel. Start, Zugangsdaten eingeben, dann eine Entscheidungsraute. Wenn falsch, Fehlermeldung und zurück. Der Rückpfeil geht in eine Zusammenführungsraute vor der Eingabe, nicht direkt in die Aktion. Denn zwei Pfeile in eine Aktion bedeuten in UML, dass beide gleichzeitig ankommen müssen. Wenn richtig, Dashboard anzeigen und Ende. Jeder Pfeil aus einer Entscheidungsraute braucht eine Bedingung.'},
{h:'Sequenzdiagramm', v:{code:`:Client      :Server       :Datenbank
   |  login()  →  |                |
   |              | prüfe() →      |
   |              |  ← ok          |
   |  ← Token     |                |
   |              |                |
 Lebenslinien senkrecht, Zeit läuft nach unten
 → synchron (volle Spitze)   ⇢ Antwort (gestrichelt)
 alt / loop / opt = kombinierte Fragmente`},
 say:'Das Sequenzdiagramm zeigt, wer wem in welcher Reihenfolge Nachrichten schickt. Oben stehen die Objekte, darunter gestrichelte Lebenslinien. Die Zeit läuft nach unten. Ein Pfeil mit voller Spitze ist ein synchroner Aufruf, die Antwort ist gestrichelt. Mit Kästen namens alt, loop und opt zeigst du Verzweigungen, Schleifen und optionale Teile.'},
{h:'Zustandsdiagramm', v:{code:`●→ [Entwurf] ──einreichen──→ [In Prüfung]
      ↑                        │      │
      └──────── ablehnen ──────┘      └──freigeben──→ [Freigegeben] →◉

Zustand = abgerundetes Rechteck
Übergang = Pfeil mit Ereignis [Bedingung] / Aktion`},
 say:'Das Zustandsdiagramm zeigt, welche Zustände ein Objekt haben kann und welche Ereignisse es wechseln lassen. Zum Beispiel ein Dokument: Entwurf, einreichen, In Prüfung, dann freigeben nach Freigegeben oder ablehnen zurück nach Entwurf. An den Pfeil schreibst du das Ereignis, optional eine Bedingung in eckigen Klammern und eine Aktion nach dem Schrägstrich.'},
{h:'Welches Diagramm wann?', v:{table:[['Frage','Diagramm'],['Ablauf, Schritte, Algorithmus','Aktivitätsdiagramm'],['Wer ruft wen in welcher Reihenfolge?','Sequenzdiagramm'],['Welche Zustände hat ein Objekt?','Zustandsdiagramm'],['Welche Klassen und Beziehungen?','Klassendiagramm'],['Was kann der Nutzer mit dem System tun?','Anwendungsfalldiagramm']]},
 say:'Welches Diagramm wann? Ablauf oder Algorithmus: Aktivitätsdiagramm. Wer ruft wen in welcher Reihenfolge: Sequenzdiagramm. Welche Zustände hat ein Objekt: Zustandsdiagramm. Klassen und Beziehungen: Klassendiagramm. Was kann der Nutzer tun: Anwendungsfalldiagramm.'}
],
videos:[{id:'IKq-wBDfU7s',t:'UML Teil 3: Das Aktivitätsdiagramm',c:'Patrick Boekhoven'},{id:'CHkVwoxxg58',t:'UML-Sequenzdiagramm für AP2 FIAE',c:'Stefan Macke'},{id:'5qp0WkU_T-M',t:'UML-Zustandsdiagramm für FIAE',c:'Stefan Macke'}],
quiz:[
{q:'Was ersetzt seit dem Katalog 2025 Struktogramm und PAP?', o:['Klassendiagramm','Aktivitätsdiagramm oder Pseudocode','ER-Diagramm','Gantt-Diagramm'], a:1, e:'Struktogramm und PAP sind gestrichen.'},
{q:'Welches Symbol steht im Aktivitätsdiagramm für eine Verzweigung?', o:['Kreis','Raute','dicker Balken','Rechteck mit Ecken'], a:1, e:'Raute = Entscheidung oder Zusammenführung.'},
{q:'Was zeigt ein dicker schwarzer Balken im Aktivitätsdiagramm?', o:['Ende','Parallele Abläufe','Fehler','Datenbank'], a:1, e:'Gabelung (Fork) und Vereinigung (Join).'},
{q:'In welche Richtung läuft die Zeit im Sequenzdiagramm?', o:['Von links nach rechts','Von oben nach unten','Von unten nach oben','Gar nicht'], a:1, e:'Die Lebenslinien gehen nach unten.'},
{q:'Welches Fragment zeigt im Sequenzdiagramm eine Schleife?', o:['alt','opt','loop','par'], a:2, e:'alt = Verzweigung, opt = optional, loop = Schleife.'},
{q:'"Welche Zustände durchläuft ein Antrag?" Welches Diagramm?', o:['Sequenzdiagramm','Zustandsdiagramm','Klassendiagramm','Use-Case'], a:1, e:'Zustände und Übergänge.'},
{q:'Wie wird eine Bedingung an einen Pfeil geschrieben?', o:['In runden Klammern','In eckigen Klammern [ ]','Fett','Gar nicht'], a:1, e:'Wächterbedingung, englisch Guard.'}
],
write:[
{task:'Beschreibe in Textform ein Aktivitätsdiagramm für: Kunde gibt Bestellmenge ein. Ist die Menge größer als der Lagerbestand, wird ein Hinweis angezeigt und erneut eingegeben. Sonst wird die Bestellung gespeichert. Nenne Start, Aktionen, Verzweigung mit Bedingungen und Ende.',
 keys:[['Startknoten',/start/i],['Aktion Menge eingeben',/eingeb|eingab/i],['Verzweigung / Raute',/raute|verzweig|entscheid/i],['Bedingungen in eckigen Klammern',/\[.*\]/],['Rücksprung / Schleife',/zur(ü|ue)ck|erneut|schleife/i],['speichern',/speicher/i],['Endknoten',/end(e|knoten|punkt)/i]],
 diagram:`flowchart TD
  S((" ")) --> M{ }
  M --> A(Bestellmenge eingeben)
  A --> D{ }
  D -->|"[Menge > Lagerbestand]"| H(Hinweis anzeigen)
  H --> M
  D -->|"[Menge <= Lagerbestand]"| B(Bestellung speichern)
  B --> E(((" ")))
  style S fill:#000,stroke:#000
  style E fill:#000,stroke:#fff,stroke-width:2px`,
 model:'Startknoten → Zusammenführungsraute → Aktion "Bestellmenge eingeben" → Entscheidungsraute. Pfeil [Menge > Lagerbestand] → Aktion "Hinweis anzeigen" → zurück zur Zusammenführungsraute vor "Bestellmenge eingeben". Pfeil [Menge <= Lagerbestand] → Aktion "Bestellung speichern" → Endknoten.'}
]}
];
