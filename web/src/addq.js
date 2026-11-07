// Zusatzfragen für Begriffe, die in Themenlisten anderer Trainer stehen und bei uns bisher nur am Rand vorkamen.
// Werden ans Ende des jeweiligen Quiz angehängt (bestehende Fragen behalten ihre Nummer).
const QADD = {
patterns:[
 {q:'Ein Objekt soll zur Laufzeit zusätzliche Funktionen bekommen (z. B. ein Datenstrom zusätzlich verschlüsselt), ohne die Klasse zu ändern. Welches Muster passt?', o:['Singleton','Decorator','Factory Method','Observer'], a:1, e:'Der Decorator umhüllt ein Objekt mit derselben Schnittstelle und ergänzt Verhalten. Man kann mehrere Decorator stapeln.'},
 {q:'Ein Objekt mit vielen optionalen Parametern soll Schritt für Schritt lesbar zusammengebaut werden. Welches Muster?', o:['Builder','Adapter','Strategy','Proxy'], a:0, e:'Der Builder setzt ein komplexes Objekt in Einzelschritten zusammen, z. B. new RechnungBuilder().mandant(m).betrag(b).build().'},
 {q:'Wofür steht das S in SOLID?', o:['Separation of Data: Daten und Logik trennen','Static Binding: Methoden zur Compilezeit binden','Single Responsibility: eine Klasse hat genau eine Aufgabe','Secure by Default: Sicherheit als Grundeinstellung'], a:2, e:'Single Responsibility Principle: Eine Klasse soll nur einen Grund haben, sich zu ändern.'}
],
vorgehen:[
 {q:'Welches Vorgehensmodell stellt die Risikoanalyse in jedem Durchlauf in den Mittelpunkt?', o:['V-Modell','Wasserfallmodell','Kanban','Spiralmodell'], a:3, e:'Das Spiralmodell (Boehm) durchläuft wiederholt Ziele, Risikoanalyse, Entwicklung und Planung.'}
],
qs:[
 {q:'Was verlangt die Zweigüberdeckung (C1)?', o:['Jede Anweisung wird mindestens einmal ausgeführt','Jeder Zweig jeder Verzweigung wird mindestens einmal durchlaufen','Jeder mögliche Pfad durch das Programm wird getestet','Jede Teilbedingung wird einmal wahr und einmal falsch'], a:1, e:'C0 = Anweisungsüberdeckung, C1 = Zweigüberdeckung (auch der leere sonst-Zweig), Pfadüberdeckung ist meist nicht vollständig erreichbar.'},
 {q:'Wie läuft Test Driven Development (TDD) ab?', o:['Code schreiben, dann Tests, dann Abnahme','Erst Test schreiben (rot), dann Code bis grün, dann aufräumen','Tester und Entwickler arbeiten gleichzeitig am selben Code','Tests werden erst vor dem Release automatisch erzeugt'], a:1, e:'Red, Green, Refactor: fehlschlagenden Test schreiben, minimalen Code bis er besteht, dann refaktorisieren.'}
],
db2:[
 {q:'Was ist der Unterschied zwischen DELETE FROM Auftrag und TRUNCATE TABLE Auftrag?', o:['DELETE löscht die Tabelle samt Struktur, TRUNCATE nur die Daten','Beide sind identisch, TRUNCATE ist nur die ältere Schreibweise','DELETE kann mit WHERE einzelne Zeilen löschen, TRUNCATE leert die ganze Tabelle','TRUNCATE kann mit WHERE filtern, DELETE leert immer alles'], a:2, e:'TRUNCATE leert die Tabelle komplett und schnell, die Struktur bleibt. DROP TABLE würde die Tabelle selbst entfernen.'},
 {q:'Welche Datenstruktur nutzen relationale Datenbanken typischerweise für einen Index?', o:['Verkettete Liste','Stapel (Stack)','B-Baum','Warteschlange (Queue)'], a:2, e:'Ein B-Baum hält die Schlüssel sortiert und ausgeglichen, Suchen kostet nur O(log n).'}
],
rest:[
 {q:'Wozu dient OpenAPI (früher Swagger)?', o:['Zum Verschlüsseln von REST-Aufrufen','Zur maschinenlesbaren Beschreibung und Dokumentation einer REST-Schnittstelle','Als Ersatz für JSON bei großen Datenmengen','Zur Lastverteilung zwischen mehreren Servern'], a:1, e:'Eine OpenAPI-Datei beschreibt Endpunkte, Parameter und Antworten. Daraus entstehen Doku, Testoberflächen und Client-Code.'}
],
security:[
 {q:'Was schützt eine Web Application Firewall (WAF) im Unterschied zu einer klassischen Paketfilter-Firewall?', o:['Sie prüft nur IP-Adressen und Ports','Sie prüft HTTP-Inhalte und erkennt z. B. SQL-Injection und XSS','Sie verschlüsselt den gesamten Netzwerkverkehr','Sie ersetzt die Anmeldung mit Passwort'], a:1, e:'Die WAF arbeitet auf Anwendungsebene (Schicht 7) und filtert schädliche Anfragen an Webanwendungen.'},
 {q:'Was regelt ein Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO?', o:['Die Kündigungsfrist eines Arbeitsvertrags','Wie ein Dienstleister personenbezogene Daten im Auftrag verarbeiten darf','Die Lizenzbedingungen einer Software','Den Preis einer Cloud-Leistung'], a:1, e:'Beispiel: Die Kanzlei nutzt einen Cloud-Anbieter. Der AVV legt Zweck, TOMs, Weisungsrecht und Unterauftragnehmer fest.'}
],
architektur:[
 {q:'Was weist ein DHCP-Server einem Client im Netzwerk zu?', o:['Nur einen Domainnamen','IP-Adresse, Subnetzmaske, Gateway und DNS-Server','Ein TLS-Zertifikat','Einen Benutzernamen fürs Active Directory'], a:1, e:'DHCP vergibt die Netzwerkkonfiguration automatisch. DNS übersetzt dagegen Namen in IP-Adressen.'}
],
arbeitsrecht:[
 {q:'Welches Gesetz schützt Schwangere und junge Mütter am Arbeitsplatz?', o:['Mutterschutzgesetz (MuSchG)','Kündigungsschutzgesetz (KSchG)','Jugendarbeitsschutzgesetz (JArbSchG)','Arbeitszeitgesetz (ArbZG)'], a:0, e:'Das MuSchG regelt u. a. Schutzfristen (6 Wochen vor, 8 Wochen nach der Geburt) und einen besonderen Kündigungsschutz.'}
],
unternehmen:[
 {q:'Ein Unternehmen nutzt Server, ohne sie zu kaufen, und zahlt monatliche Raten an den Eigentümer. Wie heißt das?', o:['Factoring','Leasing','Kontokorrentkredit','Selbstfinanzierung'], a:1, e:'Beim Leasing bleibt der Leasinggeber Eigentümer. Vorteil: Liquidität bleibt erhalten, Raten sind planbar.'},
 {q:'Was ist der Break-even-Point?', o:['Der Punkt, an dem der Umsatz am höchsten ist','Die Menge, ab der Erlöse die Gesamtkosten decken (Gewinnschwelle)','Der Zeitpunkt, an dem ein Kredit getilgt ist','Die Grenze, ab der Umsatzsteuer fällig wird'], a:1, e:'Break-even-Menge = Fixkosten / (Preis − variable Stückkosten). Ab hier macht man Gewinn.'},
 {q:'Ein Betrieb kauft Material für 1.000 € netto plus 190 € Umsatzsteuer. Was passiert mit den 190 €?', o:['Sie sind Kosten des Betriebs','Er kann sie als Vorsteuer mit der eigenen Umsatzsteuer verrechnen','Er muss sie zusätzlich ans Finanzamt zahlen','Sie gehen an den Lieferanten als Gewinn'], a:1, e:'Unternehmer verrechnen gezahlte Vorsteuer mit eingenommener Umsatzsteuer. Ans Finanzamt geht nur die Differenz (Zahllast).'},
 {q:'Was verbietet das Gesetz gegen den unlauteren Wettbewerb (UWG)?', o:['Preisabsprachen zwischen Konkurrenten','Irreführende Werbung und aggressive Geschäftspraktiken','Den Zusammenschluss großer Unternehmen','Die Gründung einer GmbH ohne Notar'], a:1, e:'Das UWG schützt vor unlauteren Methoden wie Irreführung. Preisabsprachen (Kartelle) regelt dagegen das GWB.'}
]
};
