// GA1: Erklärclips neue Lektionen C, Format v2
const CLIPS_NEU_C = {

architektur: [
{h:'Wo gehört der Code hin?', v:{code:`Präsentation  GUI, Browser, Eingaben
     │
Logik         Regeln: Honorar berechnen,
     │        Eingaben prüfen
Daten         Datenbank, Speicherung

Client-Server: Client fragt, Server liefert
Thin Client   nur Anzeige, Logik am Server
Fat Client    viel Logik lokal, auch offline`},
 beats:[
  {say:'Typischer Prüfungsfehler: Die Honorarprüfung steckt in der Oberfläche. Regeln und Prüfungen gehören in die Logikschicht.', show:{lines:[3,4]}},
  {say:'Drei Schichten: Präsentation zeigt an, Logik rechnet und prüft, Daten speichert. So bleibt jede Schicht austauschbar.', show:{lines:[1,5]}},
  {say:'Client-Server heißt: Der Client stellt eine Anfrage, der Server liefert die Antwort.', show:{lines:[7,7]}},
  {say:'Ein Thin Client zeigt nur an, die Logik läuft auf dem Server. Ein Fat Client hat viel Logik lokal und kann oft offline arbeiten.', show:{lines:[8,9]}}
 ]},
{h:'Monolith, Microservices, API', v:{code:`Monolith      alles in einem Programm
  + einfach zu entwickeln und testen
  - schwer skalierbar, alles neu deployen
Microservices kleine Dienste, eigene DB
  + einzeln deploy- und skalierbar
  - Netzwerk, Betrieb, Monitoring komplex

API = Vertrag: Endpunkte, Daten, Fehler
REST  HTTP-Verben, meist JSON, schlank
SOAP  XML-Nachrichten, WSDL, strenger

[Portal]──○  Lollipop: bietet an
[App]─────(  Socket: benötigt`},
 beats:[
  {say:'Ein Monolith ist ein großes Programm. Einfach zu starten, aber du musst für jede Änderung alles neu deployen und kannst schlecht skalieren.', show:{lines:[1,3]}},
  {say:'Microservices sind kleine Dienste, einzeln deploybar und skalierbar. Der Preis: mehr Aufwand für Netzwerk, Betrieb und Monitoring.', show:{lines:[4,6]}},
  {say:'Eine API ist ein Vertrag. REST nutzt HTTP-Verben und meist JSON, SOAP schickt strengere XML-Nachrichten mit WSDL.', show:{lines:[8,10]}},
  {say:'Im UML-Komponentendiagramm heißt der Kreis am Stiel, der Lollipop: bietet Schnittstelle an. Der Halbkreis, der Socket: benötigt sie.', show:{lines:[12,13]}}
 ]},
{h:'Cloud, Apps, Verteilung', v:{code:`IaaS  Infrastruktur: VMs, Netz, Speicher
PaaS  Plattform: nur eigenen Code deployen
SaaS  fertige Software, etwa Microsoft 365
Public, Private oder Hybrid Cloud

nativ    je Plattform, voller Gerätezugriff
hybrid   Web-Technik in nativer Hülle
Web-App  läuft im Browser
PWA      Web-App, installierbar, offline

Verteilungsdiagramm:
Knoten   Server, Gerät, Laufzeitumgebung
Artefakt Datei darauf, etwa portal.jar`},
 beats:[
  {say:'IaaS: Du mietest VMs und verwaltest sie selbst. PaaS: Du bringst nur deinen Code. SaaS: Du nutzt fertige Software.', show:{lines:[1,3]}},
  {say:'Public Cloud teilen sich viele Kunden. Private Cloud gehört einer Organisation. Hybrid kombiniert beides.', show:{lines:[4,4]}},
  {say:'Native Apps baust du je Plattform. Hybride stecken Web-Technik in eine App-Hülle. Eine PWA ist eine Web-App, installierbar und offlinefähig.', show:{lines:[6,9]}},
  {say:'Im Verteilungsdiagramm sind Knoten die Hardware oder Laufzeitumgebung. Artefakte sind Dateien, die darauf laufen.', show:{lines:[11,13]}}
 ]},
{h:'Paradigmen und Übersetzung', v:{code:`imperativ   Schritt für Schritt: WIE
prozedural  imperativ plus Funktionen, C
OOP         Klassen und Objekte, Java
funktional  reine Funktionen, Lambdas
deklarativ  nur WAS, nicht wie: SQL

Compiler    vorab ganz in Maschinencode
Interpreter zur Laufzeit, Zeile für Zeile
Java        Bytecode, JVM, JIT

statisch    Typ fest, Fehler beim Übersetzen
dynamisch   Typ zur Laufzeit, Python, JS`},
 beats:[
  {say:'Imperativ sagt Schritt für Schritt, wie. Prozedural ergänzt Funktionen. Objektorientiert arbeitet mit Klassen und Objekten.', show:{lines:[1,3]}},
  {say:'Funktional setzt auf reine Funktionen ohne Seiteneffekte. Deklarativ sagt nur, was du willst. SQL ist das Paradebeispiel.', show:{lines:[4,5]}},
  {say:'Ein Compiler übersetzt vorab alles, ein Interpreter zur Laufzeit. Java erzeugt Bytecode, die JVM führt ihn aus und der JIT übersetzt zur Laufzeit.', show:{lines:[7,9]}},
  {say:'Statisch typisiert heißt: Typfehler fallen schon beim Compilieren auf. Dynamisch typisiert prüft erst zur Laufzeit.', show:{lines:[11,12]}}
 ]},
{h:'Datenstrukturen und Lambdas', v:{code:`Array  feste Größe, Zugriff per Index
Liste  wächst, List<Mandant> typsicher
Stack  LIFO: push, pop, etwa Undo
Queue  FIFO: Warteschlange, Drucker
Map    Schlüssel zu Wert, MandantNr
Baum   Hierarchie, Ordner, Suchbaum

z = [1, 2, 3, 4]
z.filter(x -> x > 2)     ergibt [3, 4]
 .map(x -> x * 10)       ergibt [30, 40]
 .reduce((a, b) -> a+b)  ergibt 70
z bleibt [1, 2, 3, 4]: immutable`},
 beats:[
  {say:'Ein Array hat eine feste Größe. Eine Liste wächst. Mit Generics wie List of Mandant passen nur Mandanten rein, das prüft der Compiler.', show:{lines:[1,2]}},
  {say:'Stack heißt LIFO, der letzte rein ist der erste raus, wie bei Undo. Queue heißt FIFO, wie eine Druckerwarteschlange.', show:{lines:[3,4]}},
  {say:'Eine Map ordnet Schlüssel einem Wert zu. Ein Baum bildet Hierarchien ab, etwa Ordner.', show:{lines:[5,6]}},
  {say:'Lambdas: filter behält passende Werte, map wandelt jeden um, reduce fasst zu einem Wert zusammen. Die Originalliste bleibt unverändert.', show:{lines:[8,12]}}
 ],
 check:{q:'push 1, push 2, push 3, dann pop. Was kommt heraus?', o:['1','3','2'], a:1, e:'Stack ist LIFO: Die 3 kam zuletzt rein und kommt zuerst raus.'}},
{h:'XML vertieft', v:{code:`<mandant nr="4711">
  <name>Bäckerei Gies</name>
  <ort>Fulda</ort>
</mandant>

wohlgeformt: ein Wurzelelement, Tags
  korrekt geschlossen und verschachtelt
valide: wohlgeformt UND passt zu DTD/XSD

JSON: {"nr": 4711, "name": "Bäckerei Gies",
       "ort": "Fulda"}
Tabelle: nr   | name          | ort
         4711 | Bäckerei Gies | Fulda`},
 beats:[
  {say:'Hier ist nr ein Attribut im Start-Tag, name und ort sind Elemente. Attribute für Metadaten, Elemente für Inhalte.', show:{lines:[1,4]}},
  {say:'Wohlgeformt heißt: Die Syntax stimmt, es gibt ein Wurzelelement und alle Tags sind sauber geschlossen und verschachtelt.', show:{lines:[6,7]}},
  {say:'Valide heißt zusätzlich: Das Dokument passt zum Schema, also zur DTD oder XSD. Fehlt ein Pflichtelement, ist es nicht valide.', show:{lines:[8,8]}},
  {say:'Dieselben Daten als JSON oder Tabelle: Jedes Element wird zu einem Schlüssel oder einer Spalte.', show:{lines:[10,13]}}
 ]},
{h:'Die Rechenfalle Bit und Byte', v:{code:`1 Byte = 8 Bit  kB = 1000 B  KiB = 1024 B
Bild in Byte = Breite x Höhe x Bit / 8

1000 x 800 = 800.000 Pixel
800.000 x 24 Bit = 19.200.000 Bit
19.200.000 / 8 = 2.400.000 Byte = 2,4 MB

Dauer = Größe in Bit / Bandbreite in Bit/s
2 GB = 2.000.000.000 Byte
     x 8 = 16.000.000.000 Bit
16.000.000.000 / 100.000.000 = 160 s`},
 beats:[
  {say:'Ein Byte hat 8 Bit. Ein Kilobyte sind 1000 Byte, ein Kibibyte 1024 Byte. Bildgröße: Breite mal Höhe mal Farbtiefe, geteilt durch 8.', show:{lines:[1,2]}},
  {say:'Beispiel: 1000 mal 800 Pixel mal 24 Bit sind 19,2 Millionen Bit. Geteilt durch 8 sind das 2,4 Megabyte.', show:{lines:[4,6]}},
  {say:'Die Falle: Leitungen werden in Megabit pro Sekunde angegeben, Dateien in Byte. Also erst die Dateigröße mal 8 nehmen.', show:{lines:[8,10]}},
  {say:'2 Gigabyte sind 16 Milliarden Bit. Bei 100 Megabit pro Sekunde dauert das 160 Sekunden.', show:{lines:[11,11]}}
 ],
 check:{q:'Eine Datei hat 100 MB. Die Leitung schafft 100 Mbit pro Sekunde. Wie lange dauert es?', o:['1 Sekunde','8 Sekunden','100 Sekunden'], a:1, e:'100 MB sind 800 Mbit. 800 geteilt durch 100 ergibt 8 Sekunden.'}}
],

betrieb: [
{h:'Die Pipeline: vom Push zum Release', v:{code:`push ─> Build ─> Test ─> Analyse ─> Deploy
Stufe rot: Pipeline stoppt, kein Deploy

CI   oft mergen, automatisch bauen
     und testen
CD   Delivery: immer auslieferbar,
     Release nach manueller Freigabe
CD   Deployment: jede grüne Änderung
     geht automatisch live
Vorteil: Fehler früh, kleine Releases`},
 beats:[
  {say:'Delivery oder Deployment? Ein Wort Unterschied, und genau das wird gern gefragt. Erst die Pipeline: Build, Test, Analyse, Deploy.', show:{lines:[1,1]}},
  {say:'Ist eine Stufe rot, zum Beispiel ein Unit-Test schlägt fehl, stoppt die Pipeline. Dann wird nichts deployt.', show:{lines:[2,2]}},
  {say:'Continuous Integration: oft mergen, automatisch bauen und testen. Continuous Delivery: immer auslieferbar, aber Release per Freigabe.', show:{lines:[4,7]}},
  {say:'Continuous Deployment: Jede grüne Änderung geht automatisch live. Vorteil von allem: Fehler früh finden, kleine Releases, weniger Handarbeit.', show:{lines:[8,10]}}
 ]},
{h:'Container gegen VM', v:{table:[['','VM','Container'],['Betriebssystem','eigenes Gast-OS','teilt Host-Kernel'],['Start, Größe','Minuten, GB','Sekunden, MB'],['Isolation','stärker','schwächer'],['Vorteil','beliebiges OS','überall gleiche Umgebung'],['Begriffe','Hypervisor','Image: Vorlage, Container: Instanz']]},
 beats:[
  {say:'Eine VM bringt ein eigenes Gast-Betriebssystem mit. Ein Container teilt sich den Kernel des Hosts.', show:{rows:1}},
  {say:'Darum sind Container leichtgewichtig: Start in Sekunden, Größe in Megabyte. VMs sind dafür stärker isoliert.', show:{rows:3}},
  {say:'Großer Vorteil von Docker: Die Umgebung ist auf dem Laptop, im Test und in Produktion gleich.', show:{rows:4}},
  {say:'Ein Image ist die schreibgeschützte Vorlage. Ein Container ist eine laufende Instanz davon.', show:{rows:5}}
 ],
 check:{q:'Was teilt sich ein Container mit dem Host?', o:['den Kernel','ein Gast-Betriebssystem','den Hypervisor'], a:0, e:'Container teilen den Kernel des Host-Systems, deshalb sind sie so leicht.'}},
{h:'Git-Workflow', v:{code:`main    ●──●────────●  merge
            \\      /
feature      ●──●──●
git switch -c feature  Branch anlegen
git add, git commit    lokal sichern
git push               hochladen
Pull Request: Review, dann Merge
<<<<<<< HEAD
honorar = 120
=======
honorar = 135
>>>>>>> feature
Konflikt: richtig wählen, Marker weg
rebase: Commits neu auf main setzen`},
 beats:[
  {say:'Git ist verteilt: Jeder hat das komplette Repository mit Historie lokal. Bei zentralen Systemen liegt alles nur auf dem Server.', show:{lines:[1,3]}},
  {say:'Neuer Branch, lokal committen, pushen. Dann ein Pull Request: Ein Kollege macht das Review, erst danach wird gemergt.', show:{lines:[4,7]}},
  {say:'Haben beide dieselbe Zeile geändert, gibt es einen Merge-Konflikt. Du wählst den richtigen Stand, löschst die Marker, dann add und commit.', show:{lines:[8,13]}},
  {say:'Rebase setzt deine Commits neu auf den aktuellen main. Die Historie wird gerade, ohne Merge-Commit.', show:{lines:[14,14]}}
 ]},
{h:'Lizenzen', v:{table:[['Lizenz','Typ','Folge'],['proprietär','Closed Source','nur nutzen laut Vertrag'],['GPL','Copyleft','Weitergabe nur als GPL mit Quellcode'],['MIT','permissiv','fast alles, Hinweis behalten'],['Apache 2.0','permissiv','wie MIT, plus Patentklausel']]},
 beats:[
  {say:'Proprietäre Software darfst du nur so nutzen, wie der Lizenzvertrag es erlaubt. Den Quellcode bekommst du nicht.', show:{rows:1}},
  {say:'GPL ist Copyleft. Baust du sie in dein Produkt ein und gibst es weiter, muss es auch unter GPL mit Quellcode stehen.', show:{rows:2}},
  {say:'MIT und Apache sind permissiv. Kommerziell nutzen ist erlaubt, du musst nur den Lizenzhinweis behalten.', show:{rows:4}}
 ],
 check:{q:'Du verkaufst ein Programm mit fest eingebauter GPL-Bibliothek. Was musst du beachten?', o:['Nichts, Open Source ist frei','Weitergabe nur unter GPL mit Quellcode','Nur den Hinweis behalten'], a:1, e:'Copyleft: Abgeleitete Werke müssen bei Weitergabe ebenfalls unter GPL stehen.'}},
{h:'Change, Incident, SLA', v:{code:`Change: Antrag, Bewertung, Freigabe,
        Umsetzung, Dokumentation
Incident: Störung, Ticket, schnell lösen
SLA: Vertrag über Leistung, etwa
     Verfügbarkeit und Reaktionszeit

1st Level  Annahme, Passwort zurücksetzen
2nd Level  Spezialisten, tiefere Analyse
3rd Level  Entwickler oder Hersteller`},
 beats:[
  {say:'Change Management: Antrag, Bewertung, Freigabe, Umsetzung, Dokumentation. Ohne Freigabe wird nichts umgesetzt.', show:{lines:[1,2]}},
  {say:'Incident Management: Eine Störung kommt als Ticket rein und soll schnell behoben werden.', show:{lines:[3,3]}},
  {say:'Ein SLA ist ein Vertrag über die Servicequalität, etwa Verfügbarkeit und Reaktionszeit.', show:{lines:[4,5]}},
  {say:'1st Level nimmt an und löst Einfaches wie ein Passwort. 2nd Level sind Spezialisten. 3rd Level sind Entwickler oder Hersteller.', show:{lines:[7,9]}}
 ]},
{h:'KI und EU AI Act', v:{code:`regelbasiert  Mensch schreibt Regeln
ML            lernt Muster aus Daten
Trainingsdaten lernen, Testdaten prüfen
Bias: schiefe Daten, unfaire Ergebnisse
Halluzination: klingt sicher, ist falsch
Datenschutz: keine Mandantendaten in
             ungeprüfte KI-Dienste

AI Act, Risikoklassen:
unannehmbar  verboten, Social Scoring
hoch         Bewerberauswahl: Pflichten
begrenzt     Chatbot: als KI kennzeichnen
minimal      Spamfilter: keine Pflichten`},
 beats:[
  {say:'Regelbasiert schreibt ein Mensch die Regeln. Machine Learning lernt Muster aus Trainingsdaten, Testdaten prüfen danach das Ergebnis.', show:{lines:[1,3]}},
  {say:'Risiken: Bias durch schiefe Daten, Halluzinationen, die sicher klingen und falsch sind, und Datenschutz bei sensiblen Daten.', show:{lines:[4,7]}},
  {say:'Der EU AI Act hat vier Risikoklassen. Unannehmbar ist verboten, etwa Social Scoring. Hochrisiko wie Bewerberauswahl hat strenge Pflichten.', show:{lines:[9,11]}},
  {say:'Begrenzt, etwa Chatbot: als KI kennzeichnen. Verbote gelten seit Februar 2025, Hochrisiko-Pflichten nach Verschiebung ab Dezember 2027.', show:{lines:[12,13]}}
 ]},
{h:'Green IT und IoT', v:{code:`Green IT
- Geräte länger nutzen, reparieren
- effiziente Hardware, Energie sparen
- effizienter Code: weniger CPU, Daten
- Rechenzentrum: Ökostrom, Kühlung,
  Abwärme nutzen

IoT
Sensor   misst: Temperatur, Bewegung
Aktor    handelt: Ventil, Fenster, Licht
Gateway  sammelt, übersetzt, ins Netz
Risiko   Standardpasswörter, keine
         Updates, unverschlüsselt`},
 beats:[
  {say:'Green IT heißt: Geräte länger nutzen, effiziente Hardware und effizienter Code, der weniger Rechenzeit braucht.', show:{lines:[1,4]}},
  {say:'Im Rechenzentrum zählen Ökostrom, effiziente Kühlung und die Nutzung der Abwärme.', show:{lines:[5,6]}},
  {say:'Beim Internet der Dinge misst der Sensor, der Aktor handelt, und das Gateway bringt die Daten ins Netz.', show:{lines:[8,11]}},
  {say:'IoT-Geräte sind oft unsicher: Standardpasswörter, keine Updates, unverschlüsselte Kommunikation.', show:{lines:[12,13]}}
 ]}
],

technik: [
{h:'Technik bringt Punkte', v:{code:`Mi, 25.11.2026: schriftliche AP2 Teil 2
GA1   90 Minuten   meist 4 x 25 Punkte
GA2   90 Minuten   meist 4 x 25 Punkte
WiSo  60 Minuten
Abwahl von Aufgaben: üblich keine

90 Minuten / 100 Punkte
= ca. 0,9 Minuten pro Punkt
25-Punkte-Aufgabe: ca. 22 Minuten

1. Erst alles überfliegen
2. Zeit je Aufgabe planen
3. Nichts leer lassen`},
 beats:[
  {say:'Viele verlieren Punkte nicht durch Unwissen, sondern durch Technik. Am 25. November 2026 ist die schriftliche Prüfung.', show:{lines:[1,1]}},
  {say:'GA1 und GA2 dauern je 90 Minuten, WiSo 60. Üblich sind 4 Aufgaben mit je 25 Punkten, ohne Abwahl. Garantiert ist das nicht.', show:{lines:[2,5]}},
  {say:'90 Minuten für 100 Punkte, das sind rund 0,9 Minuten pro Punkt. Eine 25-Punkte-Aufgabe bekommt also etwa 22 Minuten.', show:{lines:[7,9]}},
  {say:'Erst alles überfliegen, Zeit planen, und nichts leer lassen. Stichworte bringen oft noch Teilpunkte.', show:{lines:[11,13]}}
 ]},
{h:'Operatoren lesen', v:{table:[['Operator','Was du lieferst'],['nennen','Stichwort, ohne Erklärung'],['beschreiben','Sachverhalt in ganzen Sätzen'],['erläutern, erklären','Aussage plus Begründung oder Beispiel'],['begründen, vergleichen','Warum, Gemeinsamkeiten, Unterschiede'],['beurteilen, bewerten','eigenes Urteil anhand von Kriterien']]},
 beats:[
  {say:'Nennen heißt: Stichwort reicht. Keine Romane schreiben, das kostet nur Zeit.', show:{rows:1}},
  {say:'Beschreiben heißt ganze Sätze. Erläutern und erklären heißt: Aussage plus Begründung oder Beispiel.', show:{rows:3}},
  {say:'Begründen fragt nach dem Warum. Vergleichen heißt Gemeinsamkeiten und Unterschiede.', show:{rows:4}},
  {say:'Beurteilen und bewerten: Kriterien nennen, abwägen, und am Ende ein klares eigenes Urteil.', show:{rows:5}}
 ]},
{h:'Zwei heißt zwei', v:{code:`Nennen Sie zwei Vorteile von SaaS.
- keine eigene Wartung
- schnell einsatzbereit
- dritter Punkt: meist nicht gewertet

Erläutern Sie einen Vorteil.
Die Kanzlei spart Wartung, weil der
Anbieter Server und Updates übernimmt.

entwerfen, darstellen: Modell, Code
Notation laut Belegsatz: SQL, UML
Fakten aus dem Szenario übernehmen`},
 beats:[
  {say:'Nennen Sie zwei heißt zwei. Gewertet werden meist die ersten zwei, ein dritter Punkt rettet keinen falschen.', show:{lines:[1,4]}},
  {say:'Situationsbezug: Nicht allgemein antworten, sondern mit den Fakten aus dem Szenario. Hier die Kanzlei.', show:{lines:[6,8]}},
  {say:'Entwerfen oder darstellen heißt Modell oder Code liefern. Nutze die Notation aus dem Belegsatz, etwa das SQL-Beiblatt.', show:{lines:[10,12]}}
 ],
 check:{q:'Nennen Sie drei Ursachen. Du schreibst fünf. Was wird meist gewertet?', o:['alle fünf','die ersten drei','die besten drei'], a:1, e:'Gewertet werden meist die ersten genannten, so viele wie verlangt.'}},
{h:'Vokabeln: Projekt', v:{code:`requirement      Anforderung
stakeholder      Beteiligter, Interessent
feature request  Funktionswunsch
acceptance criteria  Abnahmekriterien
user story       Anforderung aus Nutzersicht
milestone        Meilenstein
scalability      Skalierbarkeit
maintainability  Wartbarkeit
dependency       Abhängigkeit
deployment       Bereitstellung
release          veröffentlichte Version
issue            Problem, Ticket
troubleshooting  Fehlersuche`},
 beats:[
  {say:'Englische Texte kommen in GA1 vor. Projekt-Vokabeln zuerst: requirement ist die Anforderung, stakeholder die Beteiligten.', show:{lines:[1,5]}},
  {say:'Scalability heißt Skalierbarkeit, maintainability Wartbarkeit. Dependency ist eine Abhängigkeit.', show:{lines:[6,9]}},
  {say:'Deployment ist die Bereitstellung, release die Version. Ein issue ist ein Problem oder Ticket.', show:{lines:[10,13]}}
 ]},
{h:'Vokabeln: Sicherheit, Betrieb', v:{code:`vulnerability    Schwachstelle
encryption       Verschlüsselung
authentication   Authentifizierung
legacy system    Altsystem
backward compatible  abwärtskompatibel
deprecated       veraltet, wird entfernt
patch            Korrektur, Update
rollback         Zurücksetzen
downtime         Ausfallzeit
workaround       Notlösung
latency          Verzögerung
throughput       Durchsatz`},
 beats:[
  {say:'Vulnerability ist eine Schwachstelle. Encryption die Verschlüsselung, authentication die Anmeldung mit Identitätsprüfung.', show:{lines:[1,3]}},
  {say:'Legacy system ist ein Altsystem. Backward compatible heißt abwärtskompatibel. Deprecated heißt veraltet, wird bald entfernt.', show:{lines:[4,6]}},
  {say:'Patch ist eine Korrektur, rollback das Zurücksetzen, downtime die Ausfallzeit, latency die Verzögerung.', show:{lines:[7,12]}}
 ]},
{h:'Englischen Text knacken', v:{code:`KanzleiPortal 3.2: Release Notes
This release fixes a critical
vulnerability in the login module.
Attackers could bypass authentication
with a manipulated session token.
We strongly recommend installing this
update immediately. All client documents
are now stored with AES-256 encryption.
The endpoint /api/v1/clients is
deprecated and will be removed in 4.0.
Version 3.2 is backward compatible.
Legacy systems running Windows Server
2012 are no longer supported. Please
report any issues via the support portal.`},
 beats:[
  {say:'Strategie: Erst die Fragen lesen, dann im Text gezielt nach Schlüsselwörtern suchen. Antworte in der Sprache, die die Aufgabe verlangt.', show:{lines:[1,1]}},
  {say:'Hier: Eine kritische Schwachstelle im Login. Angreifer konnten die Authentifizierung umgehen. Also sofort updaten.', show:{lines:[2,8]}},
  {say:'Der alte Endpunkt ist veraltet und fliegt mit 4.0 raus. Bestehende Schnittstellen laufen weiter, weil abwärtskompatibel.', show:{lines:[9,11]}},
  {say:'Und Altsysteme mit Windows Server 2012 werden nicht mehr unterstützt.', show:{lines:[12,14]}}
 ]},
{h:'Bestehen und Gewichtung', v:{code:`AP1 20, Projekt 50, GA1 10,
GA2 10, WiSo 10 Prozent

Bestanden, wenn
1. Gesamt mind. 50 Punkte
2. Teil 2 mind. 50 Punkte
3. 3 von 4 Bereichen Teil 2 mind. 50
4. kein Bereich in Teil 2 unter 30

Mündliche Ergänzung: auf Antrag,
in GA1, GA2 oder WiSo, ca. 15 Minuten,
nur wenn sie über Bestehen entscheidet
neu = (alt x 2 + mündlich) / 3`},
 beats:[
  {say:'Gewichtung: AP1 20 Prozent, Projekt 50, GA1, GA2 und WiSo je 10 Prozent.', show:{lines:[1,2]}},
  {say:'Bestanden bei mindestens 50 Punkten gesamt und in Teil 2, mindestens 50 in drei von vier Bereichen und keinem Bereich unter 30.', show:{lines:[4,8]}},
  {say:'Mündliche Ergänzungsprüfung auf Antrag in GA1, GA2 oder WiSo, etwa 15 Minuten, wenn sie über das Bestehen entscheiden kann.', show:{lines:[10,12]}},
  {say:'Gewichtung 2 zu 1: alte Punkte doppelt plus mündliche, geteilt durch 3.', show:{lines:[13,13]}}
 ],
 check:{q:'Schriftlich 40, mündlich 70. Neues Ergebnis?', o:['50','55','60'], a:0, e:'40 mal 2 plus 70 ergibt 150, geteilt durch 3 sind 50.'}}
]

};
