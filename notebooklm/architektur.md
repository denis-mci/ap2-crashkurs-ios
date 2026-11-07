# Architektur und Programmierkonzepte

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Architektur, Cloud, Datenstrukturen und Rechenaufgaben zu Dateigrößen tauchen in GA1 immer wieder als Teilaufgaben auf und bringen schnelle Punkte.

## Inhalt

### 1. Wo gehört der Code hin?

Typischer Prüfungsfehler: Die Honorarprüfung steckt in der Oberfläche. Regeln und Prüfungen gehören in die Logikschicht. Drei Schichten: Präsentation zeigt an, Logik rechnet und prüft, Daten speichert. So bleibt jede Schicht austauschbar. Client-Server heißt: Der Client stellt eine Anfrage, der Server liefert die Antwort. Ein Thin Client zeigt nur an, die Logik läuft auf dem Server. Ein Fat Client hat viel Logik lokal und kann oft offline arbeiten. Warum? Eine Regel in der Oberfläche müsstest du in jeder App und jeder Webseite doppelt pflegen. In der Logikschicht gilt sie überall.

**Merk dir:** Regeln und Prüfungen gehören in die Logikschicht.

```
Präsentation  GUI, Browser, Eingaben
     │
Logik         Regeln: Honorar berechnen,
     │        Eingaben prüfen
Daten         Datenbank, Speicherung

Client-Server: Client fragt, Server liefert
Thin Client   nur Anzeige, Logik am Server
Fat Client    viel Logik lokal, auch offline
```

### 2. Monolith, Microservices, API

*Leitfrage: Monolith oder Microservices?*

Ein Monolith ist ein großes Programm. Einfach zu starten, aber du musst für jede Änderung alles neu deployen und kannst schlecht skalieren. Microservices sind kleine Dienste, einzeln deploybar und skalierbar. Der Preis: mehr Aufwand für Netzwerk, Betrieb und Monitoring. Eine API ist ein Vertrag. REST nutzt HTTP-Verben und meist JSON, SOAP schickt strengere XML-Nachrichten mit WSDL. Im UML-Komponentendiagramm heißt der Kreis am Stiel, der Lollipop: bietet Schnittstelle an. Der Halbkreis, der Socket: benötigt sie. Eine API ist die vereinbarte Schnittstelle, über die Programme miteinander reden. Microservices sprechen fast immer über APIs.

**Merk dir:** Microservices einzeln deployen und skalieren, dafür komplexer.

```
Monolith      alles in einem Programm
  + einfach zu entwickeln und testen
  - schwer skalierbar, alles neu deployen
Microservices kleine Dienste, eigene DB
  + einzeln deploy- und skalierbar
  - Netzwerk, Betrieb, Monitoring komplex

API = Vertrag: Endpunkte, Daten, Fehler
REST  HTTP-Verben, meist JSON, schlank
SOAP  XML-Nachrichten, WSDL, strenger

[Portal]──○  Lollipop: bietet an
[App]─────(  Socket: benötigt
```

### 3. Cloud, Apps, Verteilung

*Leitfrage: Und die Cloud-Modelle?*

IaaS: Du mietest VMs und verwaltest sie selbst. PaaS: Du bringst nur deinen Code. SaaS: Du nutzt fertige Software. Public Cloud teilen sich viele Kunden. Private Cloud gehört einer Organisation. Hybrid kombiniert beides. Native Apps baust du je Plattform. Hybride stecken Web-Technik in eine App-Hülle. Eine PWA ist eine Web-App, installierbar und offlinefähig. Im Verteilungsdiagramm sind Knoten die Hardware oder Laufzeitumgebung. Artefakte sind Dateien, die darauf laufen. Für eine Kanzlei spielt bei der Cloud der Speicherort eine große Rolle. Rechenzentrum in Deutschland oder der EU ist wegen DSGVO und Schweigepflicht oft Pflicht.

**Merk dir:** IaaS Server mieten, PaaS nur Code bringen, SaaS fertige Software.

```
IaaS  Infrastruktur: VMs, Netz, Speicher
PaaS  Plattform: nur eigenen Code deployen
SaaS  fertige Software, etwa Microsoft 365
Public, Private oder Hybrid Cloud

nativ    je Plattform, voller Gerätezugriff
hybrid   Web-Technik in nativer Hülle
Web-App  läuft im Browser
PWA      Web-App, installierbar, offline

Verteilungsdiagramm:
Knoten   Server, Gerät, Laufzeitumgebung
Artefakt Datei darauf, etwa portal.jar
```

### 4. Paradigmen und Übersetzung

*Leitfrage: Programmierparadigmen, was muss ich kennen?*

Imperativ sagt Schritt für Schritt, wie. Prozedural ergänzt Funktionen. Objektorientiert arbeitet mit Klassen und Objekten. Funktional setzt auf reine Funktionen ohne Seiteneffekte. Deklarativ sagt nur, was du willst. SQL ist das Paradebeispiel. Ein Compiler übersetzt vorab alles, ein Interpreter zur Laufzeit. Java erzeugt Bytecode, die JVM führt ihn aus und der JIT übersetzt zur Laufzeit. Statisch typisiert heißt: Typfehler fallen schon beim Compilieren auf. Dynamisch typisiert prüft erst zur Laufzeit. Java ist ein Mischfall: Der Compiler erzeugt Bytecode, und die virtuelle Maschine führt ihn aus. Das macht Java plattformunabhängig.

**Merk dir:** Compiler übersetzt vorher, Interpreter zur Laufzeit.

```
imperativ   Schritt für Schritt: WIE
prozedural  imperativ plus Funktionen, C
OOP         Klassen und Objekte, Java
funktional  reine Funktionen, Lambdas
deklarativ  nur WAS, nicht wie: SQL

Compiler    vorab ganz in Maschinencode
Interpreter zur Laufzeit, Zeile für Zeile
Java        Bytecode, JVM, JIT

statisch    Typ fest, Fehler beim Übersetzen
dynamisch   Typ zur Laufzeit, Python, JS
```

### 5. Datenstrukturen und Lambdas

*Leitfrage: Welche Datenstrukturen kommen dran?*

Ein Array hat eine feste Größe. Eine Liste wächst. Mit Generics wie List of Mandant passen nur Mandanten rein, das prüft der Compiler. Stack heißt LIFO, der letzte rein ist der erste raus, wie bei Undo. Queue heißt FIFO, wie eine Druckerwarteschlange. Eine Map ordnet Schlüssel einem Wert zu. Ein Baum bildet Hierarchien ab, etwa Ordner. Lambdas: filter behält passende Werte, map wandelt jeden um, reduce fasst zu einem Wert zusammen. Die Originalliste bleibt unverändert. Ein Lambda ist eine kleine Funktion ohne Namen, zum Beispiel um eine Liste nach Honorar zu filtern oder zu sortieren.

**Merk dir:** Stack ist LIFO, Queue ist FIFO.

```
Array  feste Größe, Zugriff per Index
Liste  wächst, List<Mandant> typsicher
Stack  LIFO: push, pop, etwa Undo
Queue  FIFO: Warteschlange, Drucker
Map    Schlüssel zu Wert, MandantNr
Baum   Hierarchie, Ordner, Suchbaum

z = [1, 2, 3, 4]
z.filter(x -> x > 2)     ergibt [3, 4]
 .map(x -> x * 10)       ergibt [30, 40]
 .reduce((a, b) -> a+b)  ergibt 70
z bleibt [1, 2, 3, 4]: immutable
```

Kontrollfrage: push 1, push 2, push 3, dann pop. Was kommt heraus? Antwort: 3. Stack ist LIFO: Die 3 kam zuletzt rein und kommt zuerst raus.

### 6. XML vertieft

*Leitfrage: XML noch mal genauer?*

Hier ist nr ein Attribut im Start-Tag, name und ort sind Elemente. Attribute für Metadaten, Elemente für Inhalte. Wohlgeformt heißt: Die Syntax stimmt, es gibt ein Wurzelelement und alle Tags sind sauber geschlossen und verschachtelt. Valide heißt zusätzlich: Das Dokument passt zum Schema, also zur DTD oder XSD. Fehlt ein Pflichtelement, ist es nicht valide. Dieselben Daten als JSON oder Tabelle: Jedes Element wird zu einem Schlüssel oder einer Spalte. Mit einer XSD, dem XML-Schema, legst du fest, welche Elemente erlaubt sind. Wohlgeformt ist also Grammatik, gültig ist Grammatik plus Regeln.

**Merk dir:** Wohlgeformt heißt Syntax stimmt, gültig heißt passt zum Schema.

```
<mandant nr="4711">
  <name>Bäckerei Gies</name>
  <ort>Fulda</ort>
</mandant>

wohlgeformt: ein Wurzelelement, Tags
  korrekt geschlossen und verschachtelt
valide: wohlgeformt UND passt zu DTD/XSD

JSON: {"nr": 4711, "name": "Bäckerei Gies",
       "ort": "Fulda"}
Tabelle: nr   | name          | ort
         4711 | Bäckerei Gies | Fulda
```

### 7. Die Rechenfalle Bit und Byte

*Leitfrage: Und die Rechenfalle mit Bit und Byte?*

Ein Byte hat 8 Bit. Ein Kilobyte sind 1000 Byte, ein Kibibyte 1024 Byte. Bildgröße: Breite mal Höhe mal Farbtiefe, geteilt durch 8. Beispiel: 1000 mal 800 Pixel mal 24 Bit sind 19,2 Millionen Bit. Geteilt durch 8 sind das 2,4 Megabyte. Die Falle: Leitungen werden in Megabit pro Sekunde angegeben, Dateien in Byte. Also erst die Dateigröße mal 8 nehmen. 2 Gigabyte sind 16 Milliarden Bit. Bei 100 Megabit pro Sekunde dauert das 160 Sekunden. Gerechnet: 1000 mal 800 mal 24 sind 19,2 Millionen Bit. Geteilt durch 8 sind das 2,4 Millionen Byte, also 2,4 Megabyte.

**Merk dir:** Bildgröße: Breite mal Höhe mal Farbtiefe, geteilt durch 8.

```
1 Byte = 8 Bit  kB = 1000 B  KiB = 1024 B
Bild in Byte = Breite x Höhe x Bit / 8

1000 x 800 = 800.000 Pixel
800.000 x 24 Bit = 19.200.000 Bit
19.200.000 / 8 = 2.400.000 Byte = 2,4 MB

Dauer = Größe in Bit / Bandbreite in Bit/s
2 GB = 2.000.000.000 Byte
     x 8 = 16.000.000.000 Bit
16.000.000.000 / 100.000.000 = 160 s
```

Kontrollfrage: Eine Datei hat 100 MB. Die Leitung schafft 100 Mbit pro Sekunde. Wie lange dauert es? Antwort: 8 Sekunden. 100 MB sind 800 Mbit. 800 geteilt durch 100 ergibt 8 Sekunden.

## Zusammenfassung

Merke: Regeln gehören in die Logikschicht. IaaS, PaaS, SaaS. Stack ist LIFO, Queue ist FIFO. Und Bildgröße gleich Breite mal Höhe mal Farbtiefe, geteilt durch acht.

## Übungsfragen mit Lösung

1. Im Mandantenportal wird geprüft, ob ein Honorar größer als 0 ist, bevor es gespeichert wird. In welche Schicht gehört diese Prüfung?
   - Lösung: Logikschicht. Geschäftsregeln und Validierung gehören in die Logikschicht. Die Präsentation zeigt nur an, die Datenschicht speichert.
2. Was kennzeichnet einen Thin Client?
   - Lösung: Er zeigt nur an, die Logik läuft auf dem Server. Thin Client = nur Anzeige und Eingabe. Ein Fat Client hat viel Logik lokal und kann oft auch offline arbeiten.
3. Welcher Punkt ist ein typischer Nachteil von Microservices gegenüber einem Monolithen?
   - Lösung: Höherer Aufwand für Netzwerk, Betrieb und Monitoring. Viele kleine Dienste kommunizieren über das Netzwerk. Das macht Betrieb, Fehlersuche und Monitoring aufwendiger. Unabhängiges Deployment ist dagegen ein Vorteil.
4. Die Kanzlei lädt nur ihre selbst entwickelte Web-App hoch. Server, Betriebssystem und Laufzeitumgebung betreut der Cloud-Anbieter. Welches Modell ist das?
   - Lösung: PaaS. PaaS = Plattform: Du bringst nur deinen Code. Bei IaaS verwaltest du die VMs selbst, bei SaaS nutzt du fertige Software.
5. Welche Aussage über eine Progressive Web App (PWA) stimmt?
   - Lösung: Sie ist eine Web-App, die sich installieren lässt und offline funktionieren kann. Eine PWA ist eine Web-App mit Extras: installierbar auf dem Startbildschirm und offlinefähig (technisch über einen Service Worker).
6. Im UML-Komponentendiagramm hängt an einer Komponente ein Kreis am Stiel (Lollipop). Was bedeutet das?
   - Lösung: Die Komponente stellt eine Schnittstelle bereit. Lollipop = bereitgestellte Schnittstelle. Der Halbkreis (Socket) = benötigte Schnittstelle.
7. Ein Editor soll Aktionen rückgängig machen, die zuletzt ausgeführte zuerst. Welche Datenstruktur passt?
   - Lösung: Stack (LIFO). Last In, First Out: Die letzte Aktion liegt oben auf dem Stack und wird per pop zuerst zurückgenommen.
8. Wie wird ein Java-Programm typischerweise ausgeführt?
   - Lösung: Der Compiler erzeugt Bytecode, den die JVM ausführt und per JIT zur Laufzeit in Maschinencode übersetzt. javac erzeugt Bytecode, die JVM führt ihn aus und übersetzt häufig genutzte Teile per JIT in Maschinencode. Dadurch ist Java plattformunabhängig.
9. zahlen = [2, 5, 8, 1]  
ergebnis = zahlen.filter(x -> x > 3)  
               .map(x -> x * 2)  
               .reduce((a, b) -> a + b)  
  
Welchen Wert hat ergebnis?
   - Lösung: 26. filter behält 5 und 8, map ergibt 10 und 16, reduce addiert: 10 + 16 = 26.
10. <mandant><name>Gies</name></mandant> ist syntaktisch korrekt. Laut XSD ist aber das Element ort Pflicht. Das Dokument ist ...
   - Lösung: wohlgeformt, aber nicht valide. Wohlgeformt = Syntax stimmt. Valide = zusätzlich passend zur DTD oder XSD. Ohne Pflichtelement ort ist es nicht valide.
11. Ein Foto hat 800 x 600 Pixel und 24 Bit Farbtiefe, unkomprimiert. Wie groß ist es in MB (1 MB = 1.000.000 Byte)?
   - Lösung: 1,44. 800 x 600 = 480.000 Pixel. x 24 Bit = 11.520.000 Bit. / 8 = 1.440.000 Byte = 1,44 MB.
12. Ein Backup von 500 MB soll über eine Leitung mit 50 Mbit/s übertragen werden. Wie viele Sekunden dauert das mindestens (1 MB = 1.000.000 Byte)?
   - Lösung: 80. 500 MB = 500.000.000 Byte x 8 = 4.000.000.000 Bit. Geteilt durch 50.000.000 Bit/s = 80 s. Wer Bit und Byte nicht umrechnet, kommt auf falsche 10 s.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Die Kanzlei scannt Belege mit 2480 x 3508 Pixeln (A4, 300 dpi) und 24 Bit Farbtiefe, unkomprimiert. a) Berechnen Sie die Größe eines Scans in MB (1 MB = 1.000.000 Byte). b) Berechnen Sie, wie lange der Upload von 200 Scans über eine Leitung mit 50 Mbit/s mindestens dauert. Geben Sie den Rechenweg an.

```
a) Pixel:  2480 x 3508 = 8.699.840 Pixel
   Bit:    8.699.840 x 24 Bit = 208.796.160 Bit
   Byte:   208.796.160 / 8 = 26.099.520 Byte
   MB:     26.099.520 / 1.000.000 = ca. 26,1 MB

b) 200 Scans: 200 x 26.099.520 = 5.219.904.000 Byte
   in Bit:    5.219.904.000 x 8 = 41.759.232.000 Bit
   Bandbreite: 50 Mbit/s = 50.000.000 Bit/s
   Dauer: 41.759.232.000 / 50.000.000 = ca. 835 s
          = ca. 13,9 Minuten
```

### Aufgabe 2

Die Kanzlei plant ein Mandantenportal. a) Beschreiben Sie die Drei-Schichten-Architektur am Beispiel dieses Portals. b) Nennen Sie zwei Vorteile und einen Nachteil einer Microservice-Architektur gegenüber einem Monolithen.

```
a) Präsentationsschicht: Die Weboberfläche im Browser zeigt Belege und Aufträge an und nimmt Eingaben des Mandanten entgegen.
Logikschicht: Der Anwendungsserver enthält die Geschäftslogik, zum Beispiel prüft er Uploads, berechnet Fristen und prüft Berechtigungen.
Datenschicht: Die Datenbank speichert Mandanten, Belege und Aufträge dauerhaft.
Jede Schicht spricht nur mit der benachbarten, dadurch sind die Schichten austauschbar und einzeln wartbar.

b) Vorteile Microservices:
- Dienste sind unabhängig deploybar und einzeln skalierbar (zum Beispiel nur der Beleg-Upload im Januar).
- Technologiefreiheit je Dienst, und der Ausfall eines Dienstes legt nicht das ganze System lahm.
Nachteil:
- Höhere Komplexität: Kommunikation über das Netzwerk, aufwendigeres Monitoring und Betrieb.
```
