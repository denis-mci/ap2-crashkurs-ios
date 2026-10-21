// GA1: neue Lektionen C (Architektur, Betrieb, Prüfungstechnik)
const L_NEU_C = [
{
id:'architektur', area:'GA1', prio:2, title:'Architektur und Programmierkonzepte', mins:30,
why:'Architektur, Cloud, Datenstrukturen und Rechenaufgaben zu Dateigrößen tauchen in GA1 immer wieder als Teilaufgaben auf und bringen schnelle Punkte.',
clip:[],
videos:[],
quiz:[
{q:'Im Mandantenportal wird geprüft, ob ein Honorar größer als 0 ist, bevor es gespeichert wird. In welche Schicht gehört diese Prüfung?', o:['Präsentationsschicht','Logikschicht','Datenschicht','Netzwerkschicht'], a:1, e:'Geschäftsregeln und Validierung gehören in die Logikschicht. Die Präsentation zeigt nur an, die Datenschicht speichert.'},
{q:'Was kennzeichnet einen Thin Client?', o:['Er arbeitet komplett offline','Er zeigt nur an, die Logik läuft auf dem Server','Er hat immer eine eigene lokale Datenbank','Er braucht keinen Server'], a:1, e:'Thin Client = nur Anzeige und Eingabe. Ein Fat Client hat viel Logik lokal und kann oft auch offline arbeiten.'},
{q:'Welcher Punkt ist ein typischer Nachteil von Microservices gegenüber einem Monolithen?', o:['Einzelne Dienste lassen sich nicht unabhängig deployen','Höherer Aufwand für Netzwerk, Betrieb und Monitoring','Alle Dienste müssen dieselbe Programmiersprache nutzen','Ein Fehler legt immer das ganze System lahm'], a:1, e:'Viele kleine Dienste kommunizieren über das Netzwerk. Das macht Betrieb, Fehlersuche und Monitoring aufwendiger. Unabhängiges Deployment ist dagegen ein Vorteil.'},
{q:'Die Kanzlei lädt nur ihre selbst entwickelte Web-App hoch. Server, Betriebssystem und Laufzeitumgebung betreut der Cloud-Anbieter. Welches Modell ist das?', o:['IaaS','PaaS','SaaS','On-Premises'], a:1, e:'PaaS = Plattform: Du bringst nur deinen Code. Bei IaaS verwaltest du die VMs selbst, bei SaaS nutzt du fertige Software.'},
{q:'Welche Aussage über eine Progressive Web App (PWA) stimmt?', o:['Sie wird für jede Plattform separat nativ programmiert','Sie ist eine Web-App, die sich installieren lässt und offline funktionieren kann','Sie läuft nur mit Internetverbindung im Browser-Tab','Sie ist nur über einen App Store erhältlich'], a:1, e:'Eine PWA ist eine Web-App mit Extras: installierbar auf dem Startbildschirm und offlinefähig (technisch über einen Service Worker).'},
{q:'Im UML-Komponentendiagramm hängt an einer Komponente ein Kreis am Stiel (Lollipop). Was bedeutet das?', o:['Die Komponente benötigt eine Schnittstelle','Die Komponente stellt eine Schnittstelle bereit','Die Komponente ist ein Knoten','Die Komponente ist abstrakt'], a:1, e:'Lollipop = bereitgestellte Schnittstelle. Der Halbkreis (Socket) = benötigte Schnittstelle.'},
{q:'Ein Editor soll Aktionen rückgängig machen, die zuletzt ausgeführte zuerst. Welche Datenstruktur passt?', o:['Queue (FIFO)','Stack (LIFO)','Map','Array fester Größe'], a:1, e:'Last In, First Out: Die letzte Aktion liegt oben auf dem Stack und wird per pop zuerst zurückgenommen.'},
{q:'Wie wird ein Java-Programm typischerweise ausgeführt?', o:['Der Quelltext wird Zeile für Zeile interpretiert','Der Compiler erzeugt Bytecode, den die JVM ausführt und per JIT zur Laufzeit in Maschinencode übersetzt','Der Compiler erzeugt direkt eine plattformabhängige EXE-Datei','Java wird gar nicht übersetzt'], a:1, e:'javac erzeugt Bytecode, die JVM führt ihn aus und übersetzt häufig genutzte Teile per JIT in Maschinencode. Dadurch ist Java plattformunabhängig.'},
{q:'zahlen = [2, 5, 8, 1]\nergebnis = zahlen.filter(x -> x > 3)\n               .map(x -> x * 2)\n               .reduce((a, b) -> a + b)\n\nWelchen Wert hat ergebnis?', type:'input', a:['26'], e:'filter behält 5 und 8, map ergibt 10 und 16, reduce addiert: 10 + 16 = 26.'},
{q:'<mandant><name>Gies</name></mandant> ist syntaktisch korrekt. Laut XSD ist aber das Element ort Pflicht. Das Dokument ist ...', o:['weder wohlgeformt noch valide','wohlgeformt, aber nicht valide','valide, aber nicht wohlgeformt','wohlgeformt und valide'], a:1, e:'Wohlgeformt = Syntax stimmt. Valide = zusätzlich passend zur DTD oder XSD. Ohne Pflichtelement ort ist es nicht valide.'},
{q:'Ein Foto hat 800 x 600 Pixel und 24 Bit Farbtiefe, unkomprimiert. Wie groß ist es in MB (1 MB = 1.000.000 Byte)?', type:'input', a:['1,44','1.44','1,44mb','1.44mb'], e:'800 x 600 = 480.000 Pixel. x 24 Bit = 11.520.000 Bit. / 8 = 1.440.000 Byte = 1,44 MB.'},
{q:'Ein Backup von 500 MB soll über eine Leitung mit 50 Mbit/s übertragen werden. Wie viele Sekunden dauert das mindestens (1 MB = 1.000.000 Byte)?', type:'input', a:['80','80s','80sekunden'], e:'500 MB = 500.000.000 Byte x 8 = 4.000.000.000 Bit. Geteilt durch 50.000.000 Bit/s = 80 s. Wer Bit und Byte nicht umrechnet, kommt auf falsche 10 s.'}
],
write:[
{task:'Die Kanzlei scannt Belege mit 2480 x 3508 Pixeln (A4, 300 dpi) und 24 Bit Farbtiefe, unkomprimiert. a) Berechnen Sie die Größe eines Scans in MB (1 MB = 1.000.000 Byte). b) Berechnen Sie, wie lange der Upload von 200 Scans über eine Leitung mit 50 Mbit/s mindestens dauert. Geben Sie den Rechenweg an.',
 keys:[['Pixelanzahl 8.699.840',/8[.\s]?699[.\s]?840/],['Größe 26.099.520 Byte bzw. ca. 26,1 MB',/26[.\s]?099[.\s]?520|26[,.]1\s*mb/i],['in Bit umrechnen (x 8)',/41[.\s]?759[.\s]?232[.\s]?000|x\s*8\b|mal\s*8/i],['durch Bandbreite in Bit/s teilen',/50[.\s]?000[.\s]?000|50\s*mbit/i],['Ergebnis ca. 835 s bzw. 13,9 min',/835|13[,.]9/]],
 model:`a) Pixel:  2480 x 3508 = 8.699.840 Pixel
   Bit:    8.699.840 x 24 Bit = 208.796.160 Bit
   Byte:   208.796.160 / 8 = 26.099.520 Byte
   MB:     26.099.520 / 1.000.000 = ca. 26,1 MB

b) 200 Scans: 200 x 26.099.520 = 5.219.904.000 Byte
   in Bit:    5.219.904.000 x 8 = 41.759.232.000 Bit
   Bandbreite: 50 Mbit/s = 50.000.000 Bit/s
   Dauer: 41.759.232.000 / 50.000.000 = ca. 835 s
          = ca. 13,9 Minuten`},
{task:'Die Kanzlei plant ein Mandantenportal. a) Beschreiben Sie die Drei-Schichten-Architektur am Beispiel dieses Portals. b) Nennen Sie zwei Vorteile und einen Nachteil einer Microservice-Architektur gegenüber einem Monolithen.',
 keys:[['Präsentationsschicht',/pr(ä|ae)sentation|oberfl(ä|ae)che|gui|frontend/i],['Logikschicht',/logik|gesch(ä|ae)ftslogik|fachlogik|anwendungsschicht/i],['Datenschicht',/daten(schicht|bank|haltung)/i],['Vorteil: einzeln deploybar oder skalierbar',/skalier|unabh(ä|ae)ngig|einzeln/i],['Vorteil: Technologiefreiheit oder Ausfall isoliert',/technolog|sprache|ausfall|robust|teams/i],['Nachteil: Komplexität, Netzwerk, Betrieb',/komplex|netzwerk|aufwand|monitoring|latenz/i]],
 model:`a) Präsentationsschicht: Die Weboberfläche im Browser zeigt Belege und Aufträge an und nimmt Eingaben des Mandanten entgegen.
Logikschicht: Der Anwendungsserver enthält die Geschäftslogik, zum Beispiel prüft er Uploads, berechnet Fristen und prüft Berechtigungen.
Datenschicht: Die Datenbank speichert Mandanten, Belege und Aufträge dauerhaft.
Jede Schicht spricht nur mit der benachbarten, dadurch sind die Schichten austauschbar und einzeln wartbar.

b) Vorteile Microservices:
- Dienste sind unabhängig deploybar und einzeln skalierbar (zum Beispiel nur der Beleg-Upload im Januar).
- Technologiefreiheit je Dienst, und der Ausfall eines Dienstes legt nicht das ganze System lahm.
Nachteil:
- Höhere Komplexität: Kommunikation über das Netzwerk, aufwendigeres Monitoring und Betrieb.`}
]},

{
id:'betrieb', area:'GA1', prio:2, title:'DevOps, Git, Lizenzen, KI und Green IT', mins:25,
why:'CI/CD, Container, Git, Lizenzen und KI sind aktuelle Themen, die die IHK gern als Teilaufgabe mit Fallbezug abfragt.',
clip:[],
videos:[],
quiz:[
{q:'Jede Änderung, die alle Tests besteht, geht ohne menschliche Freigabe automatisch in Produktion. Wie heißt das?', o:['Continuous Integration','Continuous Delivery','Continuous Deployment','Change Management'], a:2, e:'Continuous Deployment = automatisch live. Bei Continuous Delivery ist der Stand jederzeit auslieferbar, das Release braucht aber eine manuelle Freigabe.'},
{q:'In der Pipeline schlagen nach dem Build zwei Unit-Tests fehl. Was passiert?', o:['Es wird trotzdem deployt, Tests sind nur Hinweise','Die Pipeline stoppt, es wird nicht deployt und das Team bekommt eine Rückmeldung','Die Tests werden beim nächsten Lauf übersprungen','Der Code wird automatisch korrigiert'], a:1, e:'Jede Stufe ist ein Qualitätstor. Ist eine Stufe rot, bricht die Pipeline ab und es gibt kein Deployment.'},
{q:'Was unterscheidet einen Container von einer virtuellen Maschine?', o:['Der Container bringt ein vollständiges eigenes Gast-Betriebssystem mit','Der Container teilt sich den Kernel des Host-Systems und ist dadurch leichtgewichtiger','Container laufen nur unter Windows','Container brauchen immer einen Typ-1-Hypervisor'], a:1, e:'Container teilen den Host-Kernel, starten in Sekunden und brauchen wenig Speicher. Eine VM hat ein eigenes Gast-Betriebssystem.'},
{q:'Was ist ein Docker-Image?', o:['eine laufende Instanz','eine schreibgeschützte Vorlage, aus der Container gestartet werden','ein Backup einer VM','eine virtuelle Festplatte des Hosts'], a:1, e:'Image = Bauplan, unveränderlich. Container = laufende Instanz eines Images. Aus einem Image kannst du viele Container starten.'},
{q:'<<<<<<< HEAD\nsatz = 0.19\n=======\nsatz = 0.07\n>>>>>>> feature\n\nWas ist nach diesem Merge-Konflikt zu tun?', o:['Datei löschen und neu anlegen','Richtigen Inhalt festlegen, Konfliktmarker entfernen, dann add und commit','git push --force ausführen','Nichts, Git löst das automatisch'], a:1, e:'Git kann nicht entscheiden, welche Zeile richtig ist. Du wählst den richtigen Stand, löschst die Marker und schließt den Merge mit add und commit ab.'},
{q:'Was kennzeichnet eine verteilte Versionsverwaltung wie Git?', o:['Es gibt nur ein zentrales Repository, ohne Server ist kein Commit möglich','Jeder Entwickler hat eine vollständige Kopie inklusive Historie und kann lokal committen','Dateien werden per E-Mail ausgetauscht','Branches sind nicht möglich'], a:1, e:'Bei zentralen Systemen wie SVN liegt die Historie nur auf dem Server. Bei Git hat jeder das komplette Repository lokal.'},
{q:'Die Kanzlei will ein Programm verkaufen und darin eine GPL-lizenzierte Bibliothek fest einbinden. Was folgt daraus?', o:['Nichts, Open Source ist immer frei verwendbar','Bei Weitergabe muss auch das eigene Programm unter der GPL mit Quellcode weitergegeben werden','Nur der Lizenzhinweis muss erhalten bleiben, wie bei MIT','Der Verkauf ist grundsätzlich verboten'], a:1, e:'GPL = Copyleft. Verkaufen ist erlaubt, aber abgeleitete Werke müssen bei Weitergabe ebenfalls unter GPL mit Quellcode stehen. MIT und Apache sind permissiv.'},
{q:'Eine Mitarbeiterin ruft an, weil ihr Passwort abgelaufen ist. Wer löst das typischerweise?', o:['1st Level Support','2nd Level Support','3rd Level Support','der Hersteller'], a:0, e:'Einfache Standardfälle wie Passwort zurücksetzen erledigt der 1st Level direkt. Komplexes geht an Level 2, Fehler im Code an Level 3.'},
{q:'Ein Change-Antrag wurde bewertet (Risiko, Aufwand, Nutzen). Was kommt als Nächstes?', o:['Umsetzung','Freigabe','Dokumentation','neuer Antrag'], a:1, e:'Reihenfolge: Antrag, Bewertung, Freigabe, Umsetzung, Dokumentation. Ohne Freigabe wird nichts umgesetzt.'},
{q:'Eine Firma setzt eine KI ein, die Bewerbungen vorsortiert und Bewerber aussortiert. In welche Risikoklasse fällt das nach dem EU AI Act?', o:['minimales Risiko','begrenztes Risiko','hohes Risiko','verbotene Praxis'], a:2, e:'KI in Personalauswahl und Beschäftigung gilt als Hochrisiko-System mit strengen Pflichten (Risikomanagement, Datenqualität, menschliche Aufsicht).'},
{q:'Ein smartes Thermostat misst die Raumtemperatur und öffnet daraufhin das Heizungsventil. Was ist das Ventil?', o:['Sensor','Aktor','Gateway','Cloud'], a:1, e:'Sensor misst, Aktor handelt. Das Ventil greift aktiv in die Umwelt ein, also Aktor.'},
{q:'Welche Maßnahme gehört zu Green IT?', o:['Laptops jedes Jahr ersetzen','Ineffiziente Abfragen optimieren, damit Server weniger Rechenzeit brauchen','Alle Server dauerhaft unter Volllast laufen lassen','Daten möglichst oft redundant in jeder Tabelle speichern'], a:1, e:'Effizienter Code spart Rechenzeit und damit Energie. Dazu kommen längere Nutzung der Geräte und effiziente Rechenzentren.'}
],
write:[
{task:'Du sollst für die Rechnungs-App der Kanzlei das Feature PDF-Export entwickeln. Schreiben Sie die Git-Befehle für folgende Schritte: Branch anlegen, Änderungen lokal sichern, hochladen. Beschreiben Sie, wie die Änderung per Pull Request in main kommt und wie Sie einen Merge-Konflikt lösen.',
 keys:[['Branch anlegen',/git\s+(switch\s+-c|checkout\s+-b|branch)/i],['git add',/git\s+add/i],['git commit',/git\s+commit/i],['git push',/git\s+push/i],['Pull Request mit Review',/pull\s*request|merge\s*request|review/i],['Konfliktmarker prüfen und entfernen',/marker|<<<<<<<|=======/i]],
 model:`git switch -c feature/pdf-export      Branch anlegen
(Code ändern)
git add .                             Änderungen vormerken
git commit -m "PDF-Export ergänzt"    lokal sichern
git push -u origin feature/pdf-export hochladen

Auf GitHub einen Pull Request nach main erstellen.
Die CI-Pipeline baut und testet, ein Kollege macht das Review.
Erst nach Freigabe wird der Pull Request in main gemergt.

Merge-Konflikt lösen:
1. main holen: git pull origin main
2. betroffene Datei öffnen, Bereich zwischen <<<<<<<, ======= und >>>>>>> prüfen
3. richtigen Inhalt festlegen und alle Marker löschen
4. git add datei, git commit, dann erneut git push`},
{task:'Die Kanzlei möchte auf ihrer Website einen KI-Chatbot einsetzen, der Fragen von Mandanten beantwortet. Erläutern Sie drei Risiken. Ordnen Sie den Chatbot einer Risikoklasse des EU AI Act zu und nennen Sie die daraus folgende Pflicht.',
 keys:[['Halluzination',/halluzin|erfind/i],['Datenschutz, DSGVO',/datenschutz|dsgvo|personenbezogen|mandantendaten/i],['Bias',/bias|verzerr|diskrimin|vorurteil/i],['begrenztes Risiko',/begrenzt/i],['Transparenz: als KI kennzeichnen',/transparen|kennzeichn|hinweis/i]],
 model:`Risiken:
1. Halluzination: Das Sprachmodell erfindet plausibel klingende, aber falsche Antworten, zum Beispiel eine nicht existierende Frist. Für eine Kanzlei kann das zu Haftungsproblemen führen.
2. Datenschutz: Mandanten geben personenbezogene Daten und Steuerdaten ein. Werden diese an einen externen KI-Dienst übertragen, müssen DSGVO und Verschwiegenheit gewahrt bleiben (Auftragsverarbeitung, Serverstandort EU).
3. Bias: Verzerrte Trainingsdaten können zu unfairen oder einseitigen Antworten führen.

Einordnung EU AI Act: begrenztes Risiko.
Pflicht: Transparenz. Nutzer müssen erkennen können, dass sie mit einer KI sprechen, also Hinweis bzw. Kennzeichnung im Chatfenster.`}
]},

{
id:'technik', area:'GA1', prio:1, title:'Prüfungstechnik, Operatoren, Englisch', mins:20,
why:'Viele Punkte gehen nicht durch Unwissen verloren, sondern durch falsch gelesene Operatoren, schlechtes Zeitmanagement und leere Felder.',
clip:[],
videos:[],
quiz:[
{q:'GA1 dauert 90 Minuten bei 100 Punkten. Wie viele Minuten planst du ungefähr für eine Teilaufgabe mit 12 Punkten ein?', type:'input', a:['10,8','10.8','11','ca.11','ca11'], e:'90 Minuten / 100 Punkte = 0,9 Minuten pro Punkt. 12 x 0,9 = 10,8, also rund 11 Minuten.'},
{q:'In der Aufgabe steht: Nennen Sie zwei Vorteile. Du schreibst vier. Was passiert in der Regel?', o:['Alle vier bringen Punkte','Meist werden nur die ersten zwei gewertet','Die Aufgabe gibt null Punkte','Der Prüfer sucht die besten zwei aus'], a:1, e:'Zwei heißt zwei. Gewertet werden meist die ersten genannten. Ist davon einer falsch, rettet dich ein richtiger dritter nicht.'},
{q:'Was verlangt der Operator erläutern?', o:['nur ein Stichwort','eine Aussage mit Begründung oder Beispiel, sodass der Zusammenhang klar wird','eine Zeichnung','ein Ja oder Nein'], a:1, e:'Erläutern und erklären = Sachverhalt plus Warum oder Beispiel. Nur ein Stichwort reicht dafür nicht.'},
{q:'Was gehört zwingend zu einer Antwort auf beurteilen oder bewerten?', o:['eine Liste von Stichworten','ein eigenes Urteil, gestützt auf Kriterien','eine reine Definition','eine Skizze'], a:1, e:'Beurteilen und bewerten = Kriterien nennen, abwägen und am Ende ein klares Urteil fällen.'},
{q:'Im Szenario hat die Kanzlei zwei Standorte und speichert Mandantendaten. Du sollst eine Backup-Lösung begründen. Was bringt die meisten Punkte?', o:['Die Lehrbuchdefinition von Backup','Eine Begründung mit Bezug auf die Kanzlei, etwa zwei Standorte und sensible Mandantendaten','Möglichst viele Fachbegriffe ohne Zusammenhang','Eine Gegenfrage an den Prüfer'], a:1, e:'Situationsbezug: Fakten aus dem Szenario übernehmen. Allgemeine Antworten ohne Bezug geben oft nur Teilpunkte.'},
{q:'In Release Notes steht: The endpoint /api/v1 is deprecated. Was bedeutet das?', o:['Er ist neu','Er ist veraltet, funktioniert noch, wird aber künftig entfernt','Er ist verschlüsselt','Er wurde bereits gelöscht'], a:1, e:'deprecated = veraltet, abgekündigt. Noch nutzbar, aber du solltest umsteigen.'},
{q:'Ein Text spricht von a critical vulnerability. Was ist gemeint?', o:['eine kritische Schwachstelle','eine wichtige neue Funktion','ein Lasttest','eine Verfügbarkeitsgarantie'], a:0, e:'vulnerability = Schwachstelle, Sicherheitslücke.'},
{q:'Wie gehst du bei einer Aufgabe zu einem englischen Fachtext am besten vor?', o:['Text Wort für Wort übersetzen, dann die Fragen lesen','Erst die Fragen lesen, dann im Text gezielt nach Schlüsselwörtern suchen','Nur die Überschrift lesen','Immer auf Englisch antworten'], a:1, e:'Fragen zuerst, dann gezielt suchen. Die Antwortsprache steht in der Aufgabenstellung, meist Deutsch.'},
{q:'Ergebnisse: AP1 60, Projekt 68, GA1 45, GA2 62, WiSo 70 Punkte. Ist die Prüfung bestanden?', o:['Nein, GA1 liegt unter 50','Ja: Gesamt und Teil 2 mindestens 50, drei von vier Bereichen mindestens 50, keiner unter 30','Nein, weil AP1 unter 70 liegt','Nur mit mündlicher Ergänzungsprüfung'], a:1, e:'Teil 2 = (68 x 50 + 45 x 10 + 62 x 10 + 70 x 10) / 80 = ca. 64,6. Gesamt mit AP1 = ca. 63,7. Ein Bereich unter 50 ist erlaubt, solange er nicht unter 30 liegt.'},
{q:'Du hast in GA1 28 Punkte, alle anderen Bereiche sind gut. Was gilt?', o:['Bestanden, da nur ein Bereich schwach ist','Nicht bestanden, weil ein Bereich unter 30 liegt; eine mündliche Ergänzungsprüfung in GA1 kann beantragt werden','Nicht bestanden, ohne jede Möglichkeit bis zur Wiederholung','GA1 wird gestrichen'], a:1, e:'Unter 30 = ungenügend, damit nicht bestanden. Die mündliche Ergänzungsprüfung ist möglich, weil sie hier über das Bestehen entscheiden kann.'},
{q:'GA1 schriftlich 40 Punkte, mündliche Ergänzungsprüfung 70 Punkte. Wie lautet das neue Ergebnis in GA1 (Gewichtung 2:1)?', type:'input', a:['50'], e:'(40 x 2 + 70) / 3 = 150 / 3 = 50 Punkte.'},
{q:'Wie stark zählt GA1 im Gesamtergebnis der Abschlussprüfung?', o:['10 Prozent','20 Prozent','25 Prozent','50 Prozent'], a:0, e:'AP1 20 %, Projekt 50 %, GA1 10 %, GA2 10 %, WiSo 10 %.'}
],
write:[
{task:`Lesen Sie den Text und beantworten Sie die Fragen auf Deutsch.

KanzleiPortal 3.2 Release Notes
This release fixes a critical vulnerability in the login module. Attackers could bypass authentication with a manipulated session token. We strongly recommend installing this update immediately. All client documents are now stored with AES-256 encryption. The endpoint /api/v1/clients is deprecated and will be removed in version 4.0. Version 3.2 is backward compatible, so existing integrations keep working. Legacy systems running Windows Server 2012 are no longer supported. Please report any issues via the support portal.

a) Welches Problem behebt das Release und warum ist es kritisch?
b) Was empfiehlt der Hersteller?
c) Was passiert mit dem Endpunkt /api/v1/clients?
d) Müssen bestehende Schnittstellen sofort angepasst werden?
e) Was bedeutet das Release für einen Server mit Windows Server 2012?`,
 keys:[['Schwachstelle im Login',/schwachstelle|sicherheitsl(ü|ue)cke/i],['Authentifizierung umgehbar',/authentifizierung|anmeldung|umgeh/i],['sofort installieren',/sofort|umgehend/i],['Endpunkt veraltet, Entfernung in 4.0',/4\.0|entfernt/i],['abwärtskompatibel',/abw(ä|ae)rtskompatibel|weiterhin funktion|laufen weiter/i],['Windows Server 2012 nicht mehr unterstützt',/nicht mehr unterst(ü|ue)tzt|kein support/i]],
 model:`a) Das Release schließt eine kritische Schwachstelle im Login-Modul. Angreifer konnten mit einem manipulierten Session-Token die Authentifizierung umgehen, also ohne gültige Anmeldung auf das Portal zugreifen.
b) Der Hersteller empfiehlt dringend, das Update sofort zu installieren.
c) Der Endpunkt ist veraltet (deprecated). Er funktioniert noch, wird aber in Version 4.0 entfernt. Man sollte rechtzeitig umstellen.
d) Nein. Version 3.2 ist abwärtskompatibel, bestehende Integrationen funktionieren weiterhin.
e) Windows Server 2012 wird nicht mehr unterstützt. Der Server sollte auf ein unterstütztes System migriert werden.

Vokabeln: vulnerability = Schwachstelle, authentication = Authentifizierung, encryption = Verschlüsselung, deprecated = veraltet, backward compatible = abwärtskompatibel, legacy system = Altsystem, issue = Problem, Fehlermeldung.`},
{task:'Situation: Die Kanzlei mit 45 Mitarbeitern an den Standorten Fulda und Erfurt überlegt, ihr Ticketsystem als SaaS zu mieten statt es selbst zu betreiben. a) Nennen Sie zwei Vorteile von SaaS. b) Beurteilen Sie, ob SaaS für die Kanzlei geeignet ist. Achten Sie auf die Operatoren und den Situationsbezug.',
 keys:[['Vorteil: Wartung und Updates beim Anbieter',/wartung|update|betrieb/i],['Vorteil: Zugriff, Kosten oder Skalierung',/kosten|skalier|(ü|ue)berall|zugriff/i],['Kriterium Datenschutz',/datenschutz|dsgvo|serverstandort|mandantendaten|verschwiegenheit/i],['Situationsbezug Kanzlei, Standorte',/kanzlei|fulda|erfurt|standort/i],['eigenes Urteil, Fazit',/fazit|urteil|empfehl|geeignet/i]],
 model:`a) (nennen = Stichworte)
- keine eigene Wartung, Updates übernimmt der Anbieter
- Zugriff von beiden Standorten über den Browser

b) (beurteilen = Kriterien abwägen, dann Urteil)
Kriterium Aufwand: Die Kanzlei muss keinen eigenen Server betreiben, das entlastet die kleine IT.
Kriterium Standorte: Fulda und Erfurt greifen ohne zusätzliche Infrastruktur auf dasselbe System zu.
Kriterium Datenschutz: Tickets können Mandantendaten enthalten. Nötig sind ein Auftragsverarbeitungsvertrag und ein Serverstandort in der EU.
Kriterium Kosten: laufende Lizenzkosten pro Nutzer statt einmaliger Anschaffung.
Fazit: SaaS ist für die Kanzlei geeignet, sofern der Anbieter die DSGVO-Anforderungen erfüllt. Ich empfehle SaaS.`}
]}
];
