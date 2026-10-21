// GA1: Planen eines Softwareproduktes
const L_GA1 = [
{
id:'klasse', area:'GA1', prio:1, title:'Klassendiagramm und OOP', mins:25,
why:'Das Klassendiagramm ist das wichtigste Thema in GA1.',
clip:[
{h:'Aufbau einer Klasse', v:{code:`┌──────────────────────────┐
│        Mandant           │  ← Name
├──────────────────────────┤
│ - id: int                │  ← Attribute
│ - name: String           │
│ # ort: String            │
├──────────────────────────┤
│ + getName(): String      │  ← Methoden
│ + addAuftrag(a: Auftrag) │
└──────────────────────────┘`},
 say:'Eine Klasse ist ein Kasten mit drei Teilen. Oben der Name. In der Mitte die Attribute, unten die Methoden. Schreibweise: Name, Doppelpunkt, Datentyp. Bei Methoden stehen die Parameter in Klammern und der Rückgabetyp hinter dem Doppelpunkt.'},
{h:'Sichtbarkeiten', v:{table:[['Zeichen','Bedeutung','Wer darf zugreifen'],['+','public','alle'],['-','private','nur die Klasse selbst'],['#','protected','Klasse und Unterklassen'],['~','package','gleiches Paket']]},
 say:'Die Sichtbarkeiten. Plus heißt public, alle dürfen zugreifen. Minus heißt private, nur die Klasse selbst. Raute heißt protected, die Klasse und ihre Unterklassen. Attribute sind normalerweise private, und der Zugriff läuft über öffentliche Getter und Setter. Das ist Kapselung.'},
{h:'Beziehungen', v:{table:[['Linie','Name','Bedeutung'],['——','Assoziation','kennt / benutzt'],['——◇','Aggregation','hat, Teil kann alleine existieren'],['——◆','Komposition','besteht aus, Teil stirbt mit dem Ganzen'],['——▷','Vererbung','ist ein'],['- - -▷','Realisierung','implementiert Interface']]},
 say:'Die Beziehungen. Eine einfache Linie ist eine Assoziation, die Klassen kennen sich. Eine leere Raute ist eine Aggregation: Das Teil kann alleine existieren, wie ein Spieler in einer Mannschaft. Eine gefüllte Raute ist eine Komposition: Das Teil stirbt mit dem Ganzen, wie ein Raum mit dem Gebäude. Ein leeres Dreieck ist Vererbung, also ist ein. Gestrichelt mit Dreieck heißt: implementiert ein Interface. Die Raute sitzt immer beim Ganzen.'},
{h:'Multiplizitäten', v:{code:`Mandant 1 ──────── 0..* Auftrag

1      genau einer
0..1   keiner oder einer
*      beliebig viele (0..*)
1..*   mindestens einer

Lies: Ein Mandant hat 0 bis viele Aufträge.
      Ein Auftrag gehört zu genau 1 Mandant.`},
 say:'An die Linien kommen Multiplizitäten. Eins heißt genau einer. Null Punkt Punkt eins heißt keiner oder einer. Stern heißt beliebig viele. Eins Punkt Punkt Stern heißt mindestens einer. Lesen: Ein Mandant hat null bis viele Aufträge. Ein Auftrag gehört zu genau einem Mandanten. Die Zahl steht immer auf der gegenüberliegenden Seite.'},
{h:'Die 4 Säulen der OOP', v:{table:[['Prinzip','In einem Satz'],['Kapselung','Daten private, Zugriff nur über Methoden'],['Vererbung','Unterklasse übernimmt Attribute und Methoden der Oberklasse'],['Polymorphie','Gleicher Methodenaufruf, unterschiedliches Verhalten je nach Objekt (Überschreiben)'],['Abstraktion','Nur das Wichtige modellieren, abstrakte Klassen und Interfaces']]},
 say:'Die vier Säulen der Objektorientierung. Kapselung: Daten sind privat, Zugriff nur über Methoden. Vererbung: Eine Unterklasse übernimmt alles von der Oberklasse. Polymorphie: Die gleiche Methode verhält sich je nach Objekt anders, weil die Unterklasse sie überschreibt. Abstraktion: Nur das Wichtige modellieren.'},
{h:'Abstrakte Klasse vs. Interface', v:{table:[['','Abstrakte Klasse','Interface'],['Objekte erzeugen?','nein','nein'],['Attribute','ja','klassisch nein (nur Konstanten)'],['Implementierte Methoden','ja, gemischt','klassisch nur Signaturen (Java ab 8: auch default-Methoden)'],['Mehrfach?','nur eine erben','mehrere implementieren'],['UML','Name kursiv / {abstract}','«interface»']]},
 say:'Abstrakte Klasse gegen Interface. Von beiden kannst du keine Objekte erzeugen. Eine abstrakte Klasse kann Attribute und fertige Methoden haben, aber du kannst nur von einer erben. Ein Interface gibt klassisch nur Methodensignaturen vor, dafür kann eine Klasse mehrere implementieren. Neuere Sprachen erlauben im Interface auch Standard-Implementierungen, für die Prüfung reicht die klassische Sicht. In UML ist die abstrakte Klasse kursiv, das Interface hat den Stereotyp interface in spitzen Klammern.'},
{h:'Statisch und Konstruktor', v:{code:`- anzahl: int        (unterstrichen = static)
+ Mandant(name: String)   ← Konstruktor, heißt wie die Klasse

static = gehört zur Klasse, nicht zum Objekt`},
 say:'Noch zwei Details. Statische Attribute und Methoden werden unterstrichen. Sie gehören zur Klasse, nicht zu einem einzelnen Objekt. Der Konstruktor heißt wie die Klasse und erzeugt das Objekt.'}
],
videos:[{id:'VsCYGYtZT0I',t:'UML-Klassendiagramme kurz erklärt',c:'informatikZentrale'},{id:'2hZmqX60tLg',t:'UML Teil 1: Das Klassendiagramm',c:'Patrick Boekhoven'},{id:'WhXyB0_0sTU',t:'Vererbung, Polymorphismus und Interfaces',c:'42 Entwickler'},{id:'KbkSpsF0vzE',t:'Abstrakte Klasse vs. Interface',c:'nerdwest'}],
quiz:[
{q:'Was bedeutet das Zeichen # vor einem Attribut?', o:['public','private','protected','static'], a:2, e:'# = protected: Klasse und Unterklassen.'},
{q:'Gebäude und Raum: Der Raum existiert nicht ohne das Gebäude. Welche Beziehung?', o:['Assoziation','Aggregation','Komposition','Vererbung'], a:2, e:'Komposition, gefüllte Raute beim Gebäude.'},
{q:'Mannschaft und Spieler: Der Spieler kann auch ohne die Mannschaft existieren.', o:['Komposition','Aggregation','Vererbung','Realisierung'], a:1, e:'Aggregation, leere Raute.'},
{q:'Was bedeutet die Multiplizität 1..*?', o:['genau einer','keiner oder einer','mindestens einer','beliebig viele, auch keiner'], a:2, e:'Untergrenze 1, Obergrenze unbegrenzt.'},
{q:'Eine Unterklasse überschreibt eine Methode. Ein Aufruf verhält sich je nach Objekt anders. Wie heißt das?', o:['Kapselung','Polymorphie','Komposition','Abstraktion'], a:1, e:'Polymorphie = Vielgestaltigkeit.'},
{q:'Wie viele Interfaces kann eine Klasse implementieren?', o:['keins','genau eins','mehrere','nur zwei'], a:2, e:'Erben nur von einer Klasse, implementieren beliebig viele Interfaces.'},
{q:'Wie erkennst du in UML ein statisches Attribut?', o:['kursiv','unterstrichen','fett','mit Stern'], a:1, e:'Unterstrichen = static.'},
{q:'Welcher Pfeil steht für Vererbung?', o:['gefüllte Raute','leeres Dreieck an der Oberklasse','gestrichelter Pfeil ohne Spitze','Doppelpfeil'], a:1, e:'Das leere Dreieck zeigt auf die Oberklasse.'}
],
write:[
{task:'Modelliere in Textform: Eine abstrakte Klasse Person (privat name: String, öffentliche Methode getName). Die Klassen Mitarbeiter (privat gehalt: double) und Mandant (privat mandantNr: int) erben davon. Ein Mitarbeiter betreut 0 bis viele Mandanten, ein Mandant hat genau 1 betreuenden Mitarbeiter.',
 keys:[['abstrakt kennzeichnen',/abstract|abstrakt|kursiv/i],['- name: String',/-\s*name\s*:\s*string/i],['+ getName(): String',/\+\s*getname\s*\(\s*\)\s*:\s*string/i],['Vererbung zu Person',/erb|vererb|dreieck|ist ein|extends|▷/i],['- gehalt: double',/-\s*gehalt\s*:\s*(double|float|decimal)/i],['Multiplizität 0..*',/0\.\.\*|\*/],['Multiplizität 1',/\b1\b/]],
 diagram:`classDiagram
  class Person {
    <<abstract>>
    -name: String
    +getName() String
  }
  class Mitarbeiter {
    -gehalt: double
  }
  class Mandant {
    -mandantNr: int
  }
  Person <|-- Mitarbeiter
  Person <|-- Mandant
  Mitarbeiter "1" -- "0..*" Mandant : betreut`,
 model:`{abstract} Person
  - name: String
  + getName(): String

Mitarbeiter ——▷ Person
  - gehalt: double

Mandant ——▷ Person
  - mandantNr: int

Mitarbeiter 1 ——— betreut ——— 0..* Mandant`}
]},

{
id:'erm', area:'GA1', prio:1, title:'ER-Modell und Normalisierung', mins:25,
why:'Datenbanken sind mit 83 % das häufigste Themencluster.',
clip:[
{h:'ER-Modell: die Bausteine', v:{table:[['Symbol','Bedeutung'],['Rechteck','Entität (z. B. Mandant)'],['Ellipse / Oval','Attribut, Schlüssel unterstrichen'],['Raute','Beziehung (z. B. erteilt)'],['1 : n, n : m','Kardinalität']]},
 say:'Im Entity-Relationship-Modell sind Entitäten Rechtecke, zum Beispiel Mandant. Attribute sind Ovale, der Schlüssel wird unterstrichen. Beziehungen sind Rauten. An die Linien schreibst du die Kardinalitäten: eins zu eins, eins zu n oder n zu m.'},
{h:'Kardinalitäten in Tabellen umwandeln', v:{table:[['Beziehung','Umsetzung in Tabellen'],['1 : 1','Fremdschlüssel in eine der Tabellen'],['1 : n','Fremdschlüssel auf der n-Seite'],['n : m','Eigene Zwischentabelle mit beiden Fremdschlüsseln']]},
 say:'Das ist der wichtigste Punkt. Eins zu n: Der Fremdschlüssel kommt auf die n-Seite. Ein Mandant hat viele Aufträge, also bekommt Auftrag die MandantID. n zu m: Du brauchst eine Zwischentabelle. Ein Mitarbeiter arbeitet an vielen Aufträgen, ein Auftrag hat viele Mitarbeiter. Also Tabelle Mitarbeit mit MitarbeiterID und AuftragID.'},
{h:'Beispiel n : m', v:{code:`Mitarbeiter(MitarbeiterID, Name)
Auftrag(AuftragID, Art)
Mitarbeit(#MitarbeiterID, #AuftragID, Stunden)

unterstrichen/PK: Primärschlüssel
#: Fremdschlüssel
Mitarbeit hat einen zusammengesetzten Schlüssel`},
 say:'So sieht das aus. Die Zwischentabelle Mitarbeit hat beide Fremdschlüssel. Zusammen bilden sie den Primärschlüssel, das ist ein zusammengesetzter Schlüssel. Zusätzliche Infos wie die Stunden gehören genau in diese Tabelle.'},
{h:'Anomalien: warum normalisieren?', v:{code:`AuftragID | Mandant       | Ort    | Art
10        | Bäckerei Gies | Fulda  | Steuer
11        | Bäckerei Gies | Fulda  | Lohn

Änderungsanomalie: Ort ändern → in vielen Zeilen
Einfügeanomalie:  Mandant ohne Auftrag nicht speicherbar
Löschanomalie:    letzten Auftrag löschen → Mandant weg`},
 say:'Redundanz führt zu Anomalien. Änderungsanomalie: Zieht der Mandant um, musst du den Ort in vielen Zeilen ändern, und vergisst eine. Einfügeanomalie: Einen neuen Mandanten ohne Auftrag kannst du nicht speichern. Löschanomalie: Löschst du den letzten Auftrag, ist der Mandant auch weg. Deshalb normalisiert man.'},
{h:'Die 3 Normalformen', v:{table:[['Normalform','Regel','Merksatz'],['1. NF','Alle Werte atomar, keine Listen in einer Zelle','Ein Feld, ein Wert'],['2. NF','1. NF + jedes Nicht-Schlüsselattribut hängt vom GANZEN Schlüssel ab','Nur relevant bei zusammengesetztem Schlüssel'],['3. NF','2. NF + keine Abhängigkeit zwischen Nicht-Schlüsselattributen','Keine transitiven Abhängigkeiten']]},
 say:'Die drei Normalformen. Erste: Alle Werte sind atomar. Keine Listen wie Telefon eins Komma Telefon zwei in einer Zelle, und Name in Vor- und Nachname trennen. Zweite: Alles hängt vom ganzen Schlüssel ab, nicht nur von einem Teil. Das betrifft nur zusammengesetzte Schlüssel. Dritte: Kein Nicht-Schlüsselattribut hängt von einem anderen Nicht-Schlüsselattribut ab. Klassiker, als vereinfachende Annahme: Postleitzahl bestimmt den Ort. Also Ort in eine eigene Tabelle.'},
{h:'Merksatz', v:{stat:'Der Schlüssel, der ganze Schlüssel und nichts als der Schlüssel', sub:'1. NF: es gibt einen Schlüssel und atomare Werte · 2. NF: der ganze · 3. NF: nichts anderes'},
 say:'Der Merksatz: Jedes Attribut hängt vom Schlüssel ab, vom ganzen Schlüssel, und von nichts als dem Schlüssel. Das sind die drei Normalformen in einem Satz.'}
],
videos:[{id:'fVbYB_34v-E',t:'Das Entity-Relationship-Modell',c:'Patrick Boekhoven'},{id:'I2_hNwaQvBI',t:'Die drei Normalformen einfach erklärt',c:'Patrick Boekhoven'}],
quiz:[
{q:'Bei einer 1:n-Beziehung kommt der Fremdschlüssel ...', o:['auf die 1-Seite','auf die n-Seite','in eine Zwischentabelle','gar nicht'], a:1, e:'Jeder Auftrag merkt sich seinen einen Mandanten.'},
{q:'Was brauchst du bei einer n:m-Beziehung?', o:['nichts Besonderes','eine Zwischentabelle','zwei Primärschlüssel in einer Tabelle','einen Index'], a:1, e:'Zwischentabelle mit beiden Fremdschlüsseln.'},
{q:'In einer Zelle steht "0661-123, 0171-456". Welche Normalform ist verletzt?', o:['1. NF','2. NF','3. NF','keine'], a:0, e:'Werte sind nicht atomar.'},
{q:'PLZ bestimmt Ort, PLZ ist kein Schlüssel. Welche Normalform ist verletzt?', o:['1. NF','2. NF','3. NF','keine'], a:2, e:'Transitive Abhängigkeit: Schlüssel → PLZ → Ort.'},
{q:'Die 2. NF ist nur ein Thema, wenn ...', o:['die Tabelle leer ist','der Primärschlüssel zusammengesetzt ist','es Fremdschlüssel gibt','Text gespeichert wird'], a:1, e:'Teilabhängigkeiten gibt es nur bei mehrteiligen Schlüsseln.'},
{q:'Löscht man den letzten Auftrag, ist der Mandant auch weg. Welche Anomalie?', o:['Einfügeanomalie','Änderungsanomalie','Löschanomalie','keine'], a:2, e:'Löschen reißt ungewollt Daten mit.'},
{q:'Was ist im ER-Modell eine Raute?', o:['Entität','Attribut','Beziehung','Schlüssel'], a:2, e:'Rechteck = Entität, Oval = Attribut, Raute = Beziehung.'}
],
write:[
{task:'Eine Kanzlei speichert: Mitarbeiter (Personalnummer, Name), Mandanten (MandantNr, Name, PLZ, Ort) und welcher Mitarbeiter wie viele Stunden für welchen Mandanten gearbeitet hat (ein Mitarbeiter hat viele Mandanten, ein Mandant viele Mitarbeiter). Gib die Tabellen in 3. NF mit Primär- und Fremdschlüsseln an.',
 keys:[['Tabelle Mitarbeiter',/mitarbeiter\s*\(/i],['Tabelle Mandant',/mandant\s*\(/i],['Zwischentabelle mit beiden FK',/\(\s*#?\s*\w*(personal|mitarbeiter)\w*\s*,\s*#?\s*\w*mandant\w*|\(\s*#?\s*\w*mandant\w*\s*,\s*#?\s*\w*(personal|mitarbeiter)/i],['Stunden in Zwischentabelle',/stunden/i],['PLZ/Ort ausgelagert',/(ort|plz)\s*\(\s*#?\s*plz/i]],
 diagram:`erDiagram
  MITARBEITER ||--o{ ARBEITSZEIT : "leistet"
  MANDANT ||--o{ ARBEITSZEIT : "erhält"
  ORT ||--o{ MANDANT : "liegt in"
  MITARBEITER {
    int PersonalNr PK
    string Name
  }
  MANDANT {
    int MandantNr PK
    string Name
    string PLZ FK
  }
  ORT {
    string PLZ PK
    string Ort
  }
  ARBEITSZEIT {
    int PersonalNr PK, FK
    int MandantNr PK, FK
    decimal Stunden
  }`,
 model:`Mitarbeiter(PersonalNr, Name)
Mandant(MandantNr, Name, #PLZ)
Ort(PLZ, Ort)
Arbeitszeit(#PersonalNr, #MandantNr, Stunden)

Primärschlüssel: PersonalNr, MandantNr, PLZ, und in Arbeitszeit beide zusammen.
# = Fremdschlüssel. Ort ist ausgelagert wegen 3. NF (PLZ → Ort).`}
]},

{
id:'vorgehen', area:'GA1', prio:2, title:'Scrum, Vorgehensmodelle, Anforderungen', mins:20,
why:'Vorgehensmodelle kamen in 5 von 9 Prüfungen, Anforderungsanalyse sehr häufig.',
clip:[
{h:'Klassisch vs. agil', v:{table:[['','Wasserfall / V-Modell','Agil / Scrum'],['Anforderungen','am Anfang komplett','entwickeln sich'],['Ergebnis','am Ende','nach jedem Sprint, spätestens alle 4 Wochen'],['Änderungen','teuer','willkommen'],['Gut wenn','feste, klare Anforderungen','unklare, sich ändernde Anforderungen']]},
 say:'Klassische Modelle wie Wasserfall planen alles am Anfang und liefern am Ende. Das ist gut bei festen Anforderungen, aber Änderungen sind teuer. Agile Modelle wie Scrum liefern nach jedem Sprint ein funktionierendes Stück. Gut, wenn der Kunde noch nicht genau weiß, was er will.'},
{h:'Wasserfall und V-Modell', v:{code:`Wasserfall: Analyse → Entwurf → Implementierung → Test → Betrieb
            (jede Phase erst nach Abschluss der vorigen)

V-Modell: zu jeder Entwurfsphase gehört eine Teststufe
 Anforderungen ──────────── Abnahmetest
   Systementwurf ───────── Systemtest
     Architektur/Grobentwurf ─ Integrationstest
       Modulentwurf ──── Unit-Test
          Implementierung (Spitze des V)`},
 say:'Beim Wasserfall läuft eine Phase nach der anderen. Das V-Modell ist ein Wasserfall mit eingebauter Qualität: Zu jeder Entwurfsphase links gehört rechts eine Teststufe. Zu den Anforderungen gehört der Abnahmetest, zum Systementwurf der Systemtest, zur Architektur der Integrationstest und zum Modulentwurf der Unit-Test. Die Implementierung ist die Spitze des V.'},
{h:'Scrum: 3 Verantwortlichkeiten', v:{table:[['Verantwortlichkeit (früher Rolle)','Aufgabe'],['Product Owner','verantwortet das Product Backlog, priorisiert, vertritt die Stakeholder'],['Scrum Master','entfernt Hindernisse, achtet auf Scrum-Regeln, ist KEIN Chef'],['Developers','setzen um, das ganze Scrum Team managt sich selbst']]},
 say:'Scrum hat drei Verantwortlichkeiten, der Scrum Guide 2020 nennt sie nicht mehr Rollen. Der Product Owner verantwortet und priorisiert das Product Backlog. Der Scrum Master räumt Hindernisse aus dem Weg und achtet auf die Regeln. Er ist kein Chef. Die Developers setzen um. Das ganze Scrum Team managt sich selbst.'},
{h:'Scrum: Events und Artefakte', v:{table:[['Event','Wann / Dauer'],['Sprint','höchstens 1 Monat, feste Länge'],['Sprint Planning','Start: was kommt in den Sprint'],['Daily Scrum','täglich 15 Minuten'],['Sprint Review','Ende: Ergebnis mit Stakeholdern prüfen, Feedback einholen'],['Retrospektive','Ende: wie arbeiten wir besser']], table2:[['Artefakt','Commitment dazu'],['Product Backlog','Product Goal'],['Sprint Backlog','Sprint Goal'],['Increment','Definition of Done']]},
 say:'Die Events. Ein Sprint dauert höchstens einen Monat, meist zwei bis vier Wochen, immer gleich lang. Am Anfang das Sprint Planning. Jeden Tag ein Daily von fünfzehn Minuten. Am Ende das Review, wo das Ergebnis mit den Stakeholdern geprüft wird, und die Retrospektive, wo das Team über die Zusammenarbeit spricht. Die Artefakte: Product Backlog mit dem Product Goal, Sprint Backlog mit dem Sprint Goal und das Increment mit der Definition of Done.'},
{h:'Lastenheft und Pflichtenheft', v:{table:[['','Lastenheft','Pflichtenheft'],['Wer schreibt?','Auftraggeber','Auftragnehmer'],['Frage','WAS soll es können?','WIE wird es umgesetzt?']]},
 say:'Lastenheft und Pflichtenheft. Das Lastenheft schreibt der Auftraggeber. Es beschreibt, was das System können soll. Das Pflichtenheft schreibt der Auftragnehmer. Es beschreibt, wie es umgesetzt wird. Merke: Lasten trägt der Kunde.'},
{h:'Anforderungen', v:{code:`Funktional:      WAS das System tut
                 "Mandanten können Belege hochladen"
Nicht-funktional: WIE GUT es das tut
                 "Upload in unter 2 Sekunden", "DSGVO-konform"

User Story:
Als <Rolle> möchte ich <Ziel>, damit <Nutzen>.
Als Sachbearbeiter möchte ich Belege filtern,
damit ich schneller buchen kann.`},
 say:'Funktionale Anforderungen beschreiben, was das System tut. Nicht-funktionale beschreiben, wie gut: Performance, Sicherheit, Bedienbarkeit. Eine User Story hat immer das Muster: Als Rolle möchte ich Ziel, damit Nutzen.'},
{h:'Anwendungsfalldiagramm', v:{code:`  Strichmännchen = Akteur (außerhalb des Systems)
  Rechteck       = Systemgrenze
  Oval           = Anwendungsfall

  «include»: wird IMMER mit ausgeführt
             (Bestellen → include → Anmelden)
  «extend»:  wird OPTIONAL ausgeführt
             (Gutschein einlösen → extend → Bestellen)`},
 say:'Das Anwendungsfalldiagramm. Akteure sind Strichmännchen außerhalb des Systems. Das System ist ein Rechteck, die Anwendungsfälle sind Ovale darin. Include heißt, wird immer mit ausgeführt. Extend heißt, wird nur manchmal, optional ausgeführt.'}
],
videos:[{id:'Ibz9STVjtzI',t:'Scrum einfach erklärt',c:'Sebastian Schneider'},{id:'P0TgRjj8hQg',t:'V-Modell',c:'Thomas Grosser'},{id:'eQoC4GDzYbI',t:'UML-Anwendungsfalldiagramm',c:'Stefan Macke'}],
quiz:[
{q:'Wer schreibt das Pflichtenheft?', o:['Auftraggeber','Auftragnehmer','Scrum Master','Betriebsrat'], a:1, e:'Pflichtenheft = wie, vom Auftragnehmer.'},
{q:'Wer priorisiert in Scrum das Product Backlog?', o:['Scrum Master','Product Owner','Developers','Kunde direkt'], a:1, e:'Der Product Owner.'},
{q:'Wie lange dauert das Daily Scrum?', type:'input', a:['15','15 minuten','15min','15 min'], e:'Maximal 15 Minuten.'},
{q:'"Die Seite lädt in unter 2 Sekunden." Welche Art Anforderung?', o:['funktional','nicht-funktional','User Story','Lastenheft'], a:1, e:'Beschreibt Qualität (Performance), nicht Funktion.'},
{q:'Im V-Modell gehört zur Phase "Anforderungsdefinition" welcher Test?', o:['Unit-Test','Integrationstest','Systemtest','Abnahmetest'], a:3, e:'Ganz oben im V: Anforderungen ↔ Abnahme.'},
{q:'In welchem Scrum-Event spricht das Team über die eigene Zusammenarbeit?', o:['Review','Retrospektive','Planning','Daily'], a:1, e:'Review = Produkt, Retro = Prozess.'},
{q:'Anwendungsfall wird nur manchmal zusätzlich ausgeführt. Welche Beziehung?', o:['«include»','«extend»','Vererbung','Komposition'], a:1, e:'extend = optional.'},
{q:'Wann passt Wasserfall besser als Scrum?', o:['Anforderungen sind unklar','Anforderungen sind fest und klar','Kunde will jede Woche Feedback','nie'], a:1, e:'Klassisch bei stabilen Anforderungen.'}
],
write:[
{task:'Ein Mandant soll Belege per App hochladen können. Schreibe eine User Story dazu und nenne je eine funktionale und eine nicht-funktionale Anforderung.',
 keys:[['Als ...',/\bals\b/i],['möchte ich ...',/m(ö|oe)chte\s+ich|will\s+ich/i],['damit ...',/damit/i],['funktionale Anforderung',/funktional/i],['nicht-funktionale Anforderung',/nicht.?funktional/i]],
 model:'User Story: Als Mandant möchte ich Belege mit dem Handy fotografieren und hochladen, damit ich sie nicht mehr in die Kanzlei bringen muss.\nFunktional: Die App lädt Fotos und PDFs hoch und ordnet sie dem Mandanten zu.\nNicht-funktional: Die Übertragung ist verschlüsselt (TLS) und ein Upload dauert unter 5 Sekunden.'}
]},

{
id:'security', area:'GA1', prio:2, title:'IT-Sicherheit und Datenschutz', mins:25,
why:'IT-Sicherheit kam in fast jeder zweiten Prüfung. In einer Kanzlei bist du da eh Profi.',
clip:[
{h:'Schutzziele', v:{table:[['Schutzziel','Frage','Maßnahme'],['Vertraulichkeit','Nur Befugte lesen?','Verschlüsselung, Rechte'],['Integrität','Unverändert?','Hash, Signatur'],['Verfügbarkeit','Erreichbar wenn nötig?','Backup, RAID, USV']]},
 say:'Die drei Schutzziele. Vertraulichkeit: Nur Befugte dürfen Daten lesen, zum Beispiel durch Verschlüsselung. Integrität: Daten sind nicht unbemerkt verändert, zum Beispiel durch Hashwerte. Verfügbarkeit: Systeme sind da, wenn man sie braucht, durch Backups und Redundanz. Dazu kommen oft Authentizität und Verbindlichkeit.'},
{h:'Symmetrisch vs. asymmetrisch', v:{table:[['','Symmetrisch','Asymmetrisch'],['Schlüssel','1 gemeinsamer','Paar: öffentlich + privat'],['Geschwindigkeit','schnell','langsam'],['Problem','Schlüsselaustausch','Vertrauen in öffentlichen Schlüssel'],['Beispiel','AES','RSA']]},
 say:'Symmetrische Verschlüsselung nutzt einen gemeinsamen Schlüssel, zum Beispiel AES. Schnell, aber wie tauscht man den Schlüssel sicher aus? Asymmetrische Verschlüsselung nutzt ein Schlüsselpaar, zum Beispiel RSA. Mit dem öffentlichen Schlüssel des Empfängers verschlüsseln, nur sein privater Schlüssel kann entschlüsseln. Langsamer.'},
{h:'Hybrid, Signatur, Hash', v:{code:`Hybrid (z. B. TLS/HTTPS):
  asymmetrisch → Sitzungsschlüssel aushandeln + Server per Zertifikat prüfen
  symmetrisch  → Daten schnell verschlüsseln

Hash: Einwegfunktion, gleiche Eingabe = gleicher Hash
  Passwörter nur gehasht + Salt speichern (bcrypt, Argon2)

Digitale Signatur:
  Hash der Nachricht mit PRIVATEM Schlüssel des Absenders signieren
  Prüfen mit ÖFFENTLICHEM Schlüssel des Absenders
  → Integrität + Authentizität + Nichtabstreitbarkeit`},
 say:'In der Praxis nutzt man hybride Verfahren wie bei HTTPS. Asymmetrisch wird ein Sitzungsschlüssel ausgehandelt und der Server über sein Zertifikat geprüft, dann wird symmetrisch schnell verschlüsselt. Ein Hash ist eine Einwegfunktion. Passwörter speichert man nur gehasht und mit Salt. Bei der digitalen Signatur signiert der Absender den Hash mit seinem privaten Schlüssel. Jeder kann mit dem öffentlichen Schlüssel prüfen. Das sichert Integrität, Authentizität und Nichtabstreitbarkeit.'},
{h:'Angriffe', v:{table:[['Angriff','Schutz'],['SQL-Injection','Prepared Statements'],['XSS','Ausgaben escapen'],['Man-in-the-Middle','TLS, Zertifikate prüfen'],['Phishing / Social Engineering','Schulung, MFA'],['DDoS','Firewall, CDN, Rate Limiting'],['Brute Force','Sperre nach Fehlversuchen, MFA'],['Ransomware','Offline-Backups, Updates']]},
 say:'Typische Angriffe und Schutz. SQL-Injection: Prepared Statements. Cross Site Scripting: Ausgaben escapen. Man in the Middle: TLS und Zertifikate. Phishing und Social Engineering: Schulung der Mitarbeiter und Multi-Faktor-Authentifizierung. DDoS: Firewall und Rate Limiting. Ransomware: Offline-Backups.'},
{h:'DSGVO: das Wichtigste', v:{list:['Personenbezogene Daten: alle Infos, die sich auf eine identifizierte oder identifizierbare Person beziehen','Grundsätze: Zweckbindung, Datenminimierung, Speicherbegrenzung, Rechtmäßigkeit','Rechte: Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Widerspruch','Datenpanne: Meldung an Aufsichtsbehörde unverzüglich, möglichst binnen 72 Stunden (außer voraussichtlich kein Risiko)','Privacy by Design / by Default','Auftragsverarbeitung braucht AV-Vertrag','TOM: technische und organisatorische Maßnahmen']},
 say:'Die DSGVO schützt personenbezogene Daten. Wichtige Grundsätze: Zweckbindung, Datenminimierung, also nur so viele Daten wie nötig, und Speicherbegrenzung. Betroffene haben Rechte auf Auskunft, Berichtigung und Löschung. Eine Datenpanne muss unverzüglich gemeldet werden, möglichst innerhalb von zweiundsiebzig Stunden, außer es besteht voraussichtlich kein Risiko für die Betroffenen. Wer Daten für andere verarbeitet, braucht einen Auftragsverarbeitungsvertrag.'},
{h:'TOM-Beispiele', v:{table:[['Technisch','Organisatorisch'],['Verschlüsselung (BitLocker)','Berechtigungskonzept'],['MFA, Passwortrichtlinie','Schulungen'],['Firewall, Backups','Clean-Desk-Policy'],['Protokollierung','Verpflichtung auf Vertraulichkeit']]},
 say:'Technische und organisatorische Maßnahmen, kurz TOM. Technisch: Festplattenverschlüsselung wie BitLocker, Multi-Faktor, Firewall, Backups. Organisatorisch: Berechtigungskonzept, Schulungen, aufgeräumter Schreibtisch, Verschwiegenheitsverpflichtung. Das kennst du alles aus der Kanzlei.'}
],
videos:[{id:'9TuHFuzXKKo',t:'Schutzziele der Informationssicherheit',c:'InformatikVideos'},{id:'xFnkDxccp2g',t:'DSGVO in 5 Minuten erklärt',c:'Masterplan.com'}],
quiz:[
{q:'Ein Backup schützt vor allem welches Schutzziel?', o:['Vertraulichkeit','Integrität','Verfügbarkeit','Anonymität'], a:2, e:'Daten bleiben verfügbar, auch nach Ausfall.'},
{q:'Womit verschlüsselt man eine Nachricht an Bob asymmetrisch?', o:['Bobs privatem Schlüssel','Bobs öffentlichem Schlüssel','eigenem privatem Schlüssel','AES'], a:1, e:'Nur Bobs privater Schlüssel kann dann entschlüsseln.'},
{q:'Womit erstellt der Absender eine digitale Signatur?', o:['seinem privaten Schlüssel','seinem öffentlichen Schlüssel','dem Schlüssel des Empfängers','einem Passwort'], a:0, e:'Prüfen kann jeder mit dem öffentlichen Schlüssel des Absenders.'},
{q:'Warum ist HTTPS hybrid?', o:['weil es zwei Server gibt','asymmetrisch für Schlüsselaustausch, symmetrisch für Daten','weil es Hash und Salt nutzt','gar nicht'], a:1, e:'Kombiniert Sicherheit beim Austausch mit Geschwindigkeit.'},
{q:'In wie vielen Stunden muss eine Datenpanne gemeldet werden?', type:'input', a:['72','72 stunden'], e:'Art. 33 DSGVO: binnen 72 Stunden an die Aufsichtsbehörde.'},
{q:'Wie speichert man Passwörter richtig?', o:['verschlüsselt mit AES','im Klartext','gehasht mit Salt','Base64'], a:2, e:'Hash plus Salt, z. B. bcrypt oder Argon2.'},
{q:'"Nur so viele Daten erheben wie nötig." Welcher DSGVO-Grundsatz?', o:['Zweckbindung','Datenminimierung','Transparenz','Integrität'], a:1, e:'Datenminimierung.'},
{q:'Ist eine Schulung der Mitarbeiter eine technische oder organisatorische Maßnahme?', o:['technisch','organisatorisch'], a:1, e:'Organisatorisch.'}
],
write:[
{task:'Eure Kanzlei will Mandanten-Dokumente in einem Webportal bereitstellen. Nenne 4 Maßnahmen zur IT-Sicherheit und ordne jede einem Schutzziel zu.',
 keys:[['Verschlüsselung / TLS',/verschl(ü|ue)ssel|tls|https/i],['Authentifizierung / MFA / Passwort',/mfa|2fa|zwei.?faktor|multi.?faktor|passwort|authent/i],['Backup',/backup|sicherung/i],['Berechtigung / Rechte',/recht|berechtig|rolle/i],['Schutzziel genannt',/vertraulich|integrit|verf(ü|ue)gbar/i]],
 model:'1. TLS-Verschlüsselung (HTTPS): Vertraulichkeit.\n2. Multi-Faktor-Authentifizierung: Vertraulichkeit / Authentizität.\n3. Rollen- und Berechtigungskonzept, jeder Mandant sieht nur seine Dokumente: Vertraulichkeit.\n4. Regelmäßige Backups und redundante Server: Verfügbarkeit.\n5. Hashwerte/Protokollierung von Änderungen: Integrität.'}
]},

{
id:'patterns', area:'GA1', prio:2, title:'Entwurfsmuster und MVC', mins:15,
why:'Observer kam schon 3 Mal. Singleton, Factory, Facade, MVC stehen im Katalog.',
clip:[
{h:'Was sind Entwurfsmuster?', v:{stat:'Bewährte Lösungen', sub:'für wiederkehrende Probleme beim Software-Entwurf'},
 say:'Entwurfsmuster sind bewährte Lösungsschablonen für Probleme, die immer wieder auftauchen. Du musst sie nicht programmieren können, aber erkennen und erklären.'},
{h:'Singleton', v:{code:`┌───────────────────────────────┐
│ Datenbankverbindung           │
├───────────────────────────────┤
│ - instanz: Datenbankverbindung│ (static)
├───────────────────────────────┤
│ - Datenbankverbindung()       │ ← PRIVATER Konstruktor
│ + getInstanz(): Datenbankverb.│ (static)
└───────────────────────────────┘`},
 say:'Singleton sorgt dafür, dass es von einer Klasse nur genau ein Objekt gibt. Zum Beispiel eine Datenbankverbindung oder ein Logger. Erkennungsmerkmale: privater Konstruktor, statisches Attribut für die Instanz und eine statische Methode getInstanz.'},
{h:'Observer', v:{code:`Subjekt (z. B. Aktienkurs)
  + anmelden(o: Observer)
  + abmelden(o: Observer)
  + benachrichtigen()   → ruft bei allen update() auf

«interface» Observer
  + update()

Anzeige, Logger, Mailer implementieren Observer`},
 say:'Observer, auf Deutsch Beobachter. Ein Subjekt hat eine Liste von Beobachtern. Ändert sich etwas, ruft es bei allen die Methode update auf. Die Beobachter melden sich selbst an und ab. Beispiel: Ein neuer Beleg kommt rein, und Anzeige, Logger und Mail-Benachrichtigung werden automatisch informiert. Vorteil: lose Kopplung.'},
{h:'Factory und Facade', v:{table:[['Muster','Idee'],['Factory','Eine Fabrik erzeugt Objekte, der Aufrufer muss die konkrete Klasse nicht kennen. erzeugeExport("pdf") → PdfExport. Bei der GoF Factory Method entscheidet eine Unterklasse per überschriebener Methode, welche Klasse erzeugt wird'],['Facade','Eine einfache Schnittstelle vor einem komplizierten Subsystem. kanzlei.monatsabschluss() ruft intern 10 Dienste auf']]},
 say:'Die Factory erzeugt Objekte für dich. Du sagst nur, ich brauche einen PDF-Export, und bekommst das passende Objekt, ohne die konkrete Klasse zu kennen. Die Facade ist eine einfache Fassade vor einem komplizierten System. Ein Aufruf, und dahinter passieren zehn Dinge.'},
{h:'MVC', v:{table:[['Teil','Aufgabe'],['Model','Daten und Geschäftslogik'],['View','Darstellung, Oberfläche'],['Controller','nimmt Eingaben an, steuert Model und View']]},
 say:'MVC trennt eine Anwendung in drei Teile. Das Model enthält Daten und Logik. Die View zeigt an. Der Controller nimmt Benutzereingaben an und steuert beides. Vorteil: Du kannst zum Beispiel die Oberfläche austauschen, ohne die Logik anzufassen. Das ist Wartbarkeit durch Trennung der Zuständigkeiten.'}
],
videos:[{id:'bLQVsvEGQFU',t:'Observer Pattern / Beobachter-Muster',c:'Patrick Boekhoven'},{id:'1WnHxLANz9I',t:'Design-Pattern: Singleton',c:'moinLeude'},{id:'VGQMQUa_o5o',t:'MVC kurz erklärt',c:'gude Education'}],
quiz:[
{q:'Woran erkennst du ein Singleton?', o:['öffentlicher Konstruktor','privater Konstruktor und statisches getInstanz()','Interface update()','drei Schichten'], a:1, e:'Niemand außer der Klasse kann Objekte erzeugen.'},
{q:'Ein Objekt informiert automatisch alle angemeldeten Objekte über Änderungen.', o:['Factory','Singleton','Observer','Facade'], a:2, e:'Beobachter-Muster.'},
{q:'Welche Methode ruft das Subjekt beim Observer typischerweise auf?', o:['getInstanz()','update()','create()','render()'], a:1, e:'update() bzw. aktualisieren().'},
{q:'Welche MVC-Komponente nimmt Benutzereingaben entgegen?', o:['Model','View','Controller','Router'], a:2, e:'Controller steuert.'},
{q:'Eine einfache Schnittstelle vor einem komplexen Subsystem heißt:', o:['Facade','Observer','Adapter','Singleton'], a:0, e:'Fassade.'},
{q:'Was ist der Hauptvorteil von MVC?', o:['schnellere Datenbank','Trennung von Daten, Darstellung und Steuerung','weniger Klassen','keine Tests nötig'], a:1, e:'Bessere Wartbarkeit und Austauschbarkeit.'}
],
write:[
{task:'Erkläre das Observer-Muster in 2 bis 3 Sätzen und nenne ein Beispiel aus einer Kanzlei-Software.',
 keys:[['Subjekt / Beobachtetes',/subjekt|beobachtet|observable|publisher/i],['Beobachter an-/abmelden',/anmeld|registrier|abonn|abmeld/i],['benachrichtigen / update',/benachrichtig|update|informier/i],['Beispiel',/beispiel|z\.\s*b|zum beispiel|etwa/i]],
 diagram:`classDiagram
  class Subjekt {
    <<interface>>
    +anmelden(b: Beobachter) void
    +abmelden(b: Beobachter) void
    +benachrichtigen() void
  }
  class Beobachter {
    <<interface>>
    +update() void
  }
  class Belegeingang {
    -beobachter: List~Beobachter~
    +neuerBeleg(b: Beleg) void
  }
  class Uebersicht {
    +update() void
  }
  class MailAnSachbearbeiter {
    +update() void
  }
  class Protokoll {
    +update() void
  }
  Subjekt <|.. Belegeingang
  Beobachter <|.. Uebersicht
  Beobachter <|.. MailAnSachbearbeiter
  Beobachter <|.. Protokoll
  Belegeingang "1" o-- "0..*" Beobachter : benachrichtigt`,
 model:'Beim Observer-Muster gibt es ein Subjekt, bei dem sich beliebig viele Beobachter an- und abmelden können. Ändert sich der Zustand des Subjekts, ruft es bei allen Beobachtern update() auf. So sind die Klassen lose gekoppelt. Beispiel: Geht ein neuer Beleg ein, werden automatisch die Übersicht aktualisiert, der zuständige Sachbearbeiter per Mail informiert und ein Protokolleintrag geschrieben.'}
]},

{
id:'rest', area:'GA1', prio:3, title:'REST, HTTP, JSON, Git', mins:15,
why:'REST und HTTP kamen in 4 von 9 Prüfungen, oft mit JSON.',
clip:[
{h:'HTTP-Methoden = CRUD', v:{table:[['Methode','CRUD','Beispiel'],['GET','Read','GET /mandanten/4'],['POST','Create','POST /mandanten'],['PUT','Update (komplett)','PUT /mandanten/4'],['PATCH','Update (teilweise)','PATCH /mandanten/4'],['DELETE','Delete','DELETE /mandanten/4']]},
 say:'REST nutzt die HTTP-Methoden für die vier Grundoperationen. GET liest. POST legt neu an. PUT ersetzt komplett, PATCH ändert teilweise. DELETE löscht. Die Ressource steht in der URL, zum Beispiel Mandanten Schrägstrich vier.'},
{h:'Statuscodes', v:{table:[['Code','Bedeutung'],['200 OK','alles gut'],['201 Created','neu angelegt (nach POST)'],['204 No Content','ok, keine Daten'],['400 Bad Request','Anfrage fehlerhaft'],['401 Unauthorized','nicht angemeldet'],['403 Forbidden','angemeldet, aber keine Rechte'],['404 Not Found','gibt es nicht'],['500 Internal Server Error','Fehler auf dem Server']]},
 say:'Die Statuscodes. Zweihunderter heißt Erfolg: zweihundert okay, zweihunderteins angelegt. Vierhunderter heißt, der Client hat einen Fehler gemacht: vierhundert falsche Anfrage, vierhunderteins nicht angemeldet, vierhundertdrei keine Rechte, vierhundertvier nicht gefunden. Fünfhunderter heißt, der Server hat einen Fehler.'},
{h:'REST-Prinzipien', v:{list:['Zustandslos: jede Anfrage enthält alles Nötige (z. B. Token)','Ressourcen über eindeutige URLs','Einheitliche Schnittstelle über HTTP-Methoden','Daten meist als JSON','Client und Server getrennt']},
 say:'Die REST-Prinzipien. Zustandslos: Der Server merkt sich nichts zwischen Anfragen, jede Anfrage bringt alles mit, zum Beispiel ein Token. Ressourcen haben eindeutige URLs. Daten werden meistens als JSON übertragen.'},
{h:'JSON, XML, CSV', v:{code:`JSON:
{ "id": 4, "name": "Café Rhön",
  "auftraege": [ {"art": "Lohn"}, {"art": "Steuer"} ] }

XML:
<mandant id="4"><name>Café Rhön</name></mandant>

CSV:
id;name;ort
4;Café Rhön;Fulda`},
 say:'Drei Datenformate. JSON mit geschweiften Klammern für Objekte und eckigen für Listen. Schlüssel stehen in Anführungszeichen. XML mit Tags, gut validierbar per Schema, aber mehr Text. CSV ist eine einfache Tabelle mit Trennzeichen, gut für Excel, aber ohne Verschachtelung.'},
{h:'Git in 6 Befehlen', v:{code:`git clone <url>        Repository holen
git add datei.py       zum Commit vormerken
git commit -m "..."    Stand lokal speichern
git push / git pull    hoch- / runterladen
git branch feature-x   neuen Zweig anlegen
git merge feature-x    Zweig zusammenführen`},
 say:'Git kennst du aus der Arbeit. Für die Prüfung: Clone holt ein Repository. Add merkt Änderungen vor. Commit speichert lokal. Push und Pull synchronisieren mit dem Server. Branch legt einen Zweig an, Merge führt zusammen. Vorteile: Versionierung, paralleles Arbeiten, Nachvollziehbarkeit.'}
],
videos:[{id:'ZuINS_-n-AM',t:'Was ist eine REST-API?',c:'Coding Crashkurse'},{id:'unXWk2plEoc',t:'JSON in 5 Minuten',c:'Vibe Venture'},{id:'V0bXqLxIivo',t:'Lerne Git in 30 Minuten',c:'Mit Mario'}],
quiz:[
{q:'Mit welcher HTTP-Methode legst du per REST einen neuen Datensatz an?', o:['GET','POST','DELETE','HEAD'], a:1, e:'POST = Create.'},
{q:'Welcher Statuscode bedeutet "angemeldet, aber keine Berechtigung"?', type:'input', a:['403'], e:'401 = nicht angemeldet, 403 = keine Rechte.'},
{q:'Welcher Statuscode kommt typisch nach erfolgreichem POST?', o:['200','201','204','404'], a:1, e:'201 Created.'},
{q:'Was heißt "REST ist zustandslos"?', o:['Server speichert keine Daten','Jede Anfrage enthält alle nötigen Infos','Es gibt keine Statuscodes','Nur GET erlaubt'], a:1, e:'Keine Sitzung auf dem Server zwischen Anfragen.'},
{q:'Woran erkennst du eine Liste in JSON?', o:['{ }','[ ]','< >','( )'], a:1, e:'Eckige Klammern = Array.'},
{q:'Welcher git-Befehl speichert einen Stand lokal?', o:['git push','git commit','git clone','git pull'], a:1, e:'commit lokal, push zum Server.'}
],
write:[
{task:'Schreibe ein JSON-Objekt für einen Mandanten mit id 7, name "Autohaus Ruf", ort "Erfurt" und einer Liste von zwei Aufträgen (art "Prüfung" und "Steuer").',
 keys:[['geschweifte Klammern',/\{[\s\S]*\}/],['"id": 7',/"id"\s*:\s*7/],['"name": "Autohaus Ruf"',/"name"\s*:\s*"autohaus ruf"/i],['Liste mit [ ]',/\[[\s\S]*\]/],['"art" als Schlüssel',/"art"\s*:/i]],
 model:`{
  "id": 7,
  "name": "Autohaus Ruf",
  "ort": "Erfurt",
  "auftraege": [
    { "art": "Prüfung" },
    { "art": "Steuer" }
  ]
}`}
]},

{
id:'quali', area:'GA1', prio:3, title:'Qualität, UX und Kosten', mins:15,
why:'Kleinere Teilaufgaben, aber schnell verdiente Punkte.',
clip:[
{h:'ISO 25010: Softwarequalität', v:{list:['Funktionale Eignung','Leistungseffizienz (Performance)','Kompatibilität','Benutzbarkeit (Usability, in der Fassung 2023: Interaction Capability)','Zuverlässigkeit','Sicherheit','Wartbarkeit','Übertragbarkeit (Portabilität, 2023: Flexibility)','Neu in der Fassung 2023: Safety (Sicherheit für Mensch und Umwelt)']},
 say:'Die ISO 25010 definiert in der Fassung von 2011 acht Qualitätsmerkmale, die Fassung von 2023 hat neun. In der Prüfung reichen die klassischen acht Begriffe. Funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit, Zuverlässigkeit, Sicherheit, Wartbarkeit und Übertragbarkeit. In der Prüfung sollst du oft eins nennen und mit einer Maßnahme verbinden, zum Beispiel Wartbarkeit durch Kommentare, Tests und sauberen Code.'},
{h:'Barrierefreiheit', v:{list:['Ausreichender Kontrast, nicht nur Farbe als Info','Schrift skalierbar','Alternativtexte für Bilder (Screenreader)','Bedienbar nur mit Tastatur','Klare, einfache Sprache','Gesetzlich: BFSG seit 28.06.2025 für bestimmte Produkte und Dienste (z. B. Onlineshops, Banking), Norm EN 301 549 mit WCAG 2.1 AA; öffentliche Stellen: BITV 2.0']},
 say:'Barrierefreiheit heißt, alle Menschen können die Software nutzen. Guter Kontrast, Farbe nie als einzige Information, Alternativtexte für Screenreader, Bedienung per Tastatur und einfache Sprache. Seit Juni 2025 gilt in Deutschland das Barrierefreiheitsstärkungsgesetz für bestimmte Produkte und Dienste wie Onlineshops und Banking. Der technische Standard ist die EN 301 549, die auf den WCAG aufbaut.'},
{h:'Amortisation', v:{code:`Amortisationsdauer = Investition / jährliche Ersparnis

Beispiel: Tool kostet 12.000 €
spart 300 h/Jahr × 40 €/h  = 12.000 €/Jahr
minus Wartung              −  2.000 €/Jahr
→ Ersparnis                  10.000 €/Jahr
→ 12.000 / 10.000 = 1,2 Jahre`},
 say:'Die Amortisationsrechnung: Wie lange dauert es, bis sich eine Investition bezahlt gemacht hat? Investition geteilt durch jährliche Ersparnis. Beispiel: Ein Tool kostet zwölftausend Euro und spart nach Abzug der Wartung zehntausend Euro im Jahr. Dann hat es sich nach eins Komma zwei Jahren amortisiert.'},
{h:'Make or Buy', v:{table:[['Make (selbst entwickeln)','Buy (kaufen)'],['passt genau','sofort verfügbar'],['Know-how bleibt im Haus','Support und Updates vom Hersteller'],['hoher Aufwand, Risiko','Lizenzkosten, Abhängigkeit'],['eigene Wartung nötig','passt evtl. nicht 100 %']]},
 say:'Make or Buy: selbst entwickeln oder kaufen. Selbst entwickeln passt genau und das Wissen bleibt im Haus, kostet aber Zeit und Wartung. Kaufen geht sofort und hat Support, bringt aber Lizenzkosten und Abhängigkeit vom Hersteller. Als Entscheidungshilfe nutzt man eine Nutzwertanalyse mit gewichteten Kriterien.'},
{h:'Nutzwertanalyse', v:{code:`Bewertung 1 bis 5, 5 = am besten
Kriterium   Gewicht | A Bew. | A Pkt | B Bew. | B Pkt
Kosten        40 %  |   3    |  1,2  |   5    |  2,0
Funktionen    35 %  |   5    |  1,75 |   3    |  1,05
Support       25 %  |   4    |  1,0  |   2    |  0,5
Summe                         3,95            3,55  → A gewinnt`},
 say:'Bei der Nutzwertanalyse gibst du jedem Kriterium ein Gewicht, die Summe ist hundert Prozent. Dann bewertest du jede Alternative mit Punkten, zum Beispiel eins bis fünf, wobei fünf am besten ist. Punkte mal Gewicht, dann addieren. Die höchste Summe gewinnt.'}
],
videos:[{id:'-JUe3QWp0rw',t:'Amortisationsrechnung einfach erklärt',c:'Herr Tafelschwamm'},{id:'LR8_8qaOKT8',t:'Make or Buy einfach erklärt',c:'JL Education'}],
quiz:[
{q:'Investition 20.000 €, jährliche Ersparnis 8.000 €. Amortisationsdauer in Jahren?', type:'input', a:['2,5','2.5'], e:'20.000 / 8.000 = 2,5 Jahre.'},
{q:'Kommentare, Tests und Clean Code verbessern vor allem ...', o:['Leistungseffizienz','Wartbarkeit','Kompatibilität','Sicherheit'], a:1, e:'Wartbarkeit.'},
{q:'Welcher Standard beschreibt Barrierefreiheit im Web?', o:['ISO 9001','WCAG','DSGVO','ITIL'], a:1, e:'Web Content Accessibility Guidelines.'},
{q:'Was ist ein Nachteil von "Buy"?', o:['Know-how bleibt im Haus','Abhängigkeit vom Hersteller','passt genau','keine Lizenzkosten'], a:1, e:'Vendor Lock-in und Lizenzkosten.'},
{q:'Gewicht 40 %, Bewertung 5 Punkte. Welcher gewichtete Punktwert?', type:'input', a:['2','2,0','2.0'], e:'0,4 × 5 = 2.'},
{q:'Warum sollte Farbe nie die einzige Information sein?', o:['Druckkosten','Farbenblinde Nutzer erkennen sie nicht','DSGVO','Performance'], a:1, e:'Zusätzlich Text oder Symbol nutzen.'}
],
write:[
{task:'Euer Team überlegt, ein Zeiterfassungstool selbst zu entwickeln oder zu kaufen. Nenne je 2 Vorteile von Make und von Buy und eine Methode, um zu entscheiden.',
 keys:[['Make: passt genau / individuell',/genau|individuell|anforderung|ma(ß|ss)geschneidert/i],['Make: Know-how / Unabhängigkeit',/know|wissen|unabh(ä|ae)ngig|kontrolle/i],['Buy: schnell verfügbar',/schnell|sofort|verf(ü|ue)gbar/i],['Buy: Support / Updates',/support|update|wartung|hersteller/i],['Entscheidungsmethode',/nutzwert|kosten.?vergleich|amortisation/i]],
 model:'Make: passt genau zu unseren Abläufen, Know-how bleibt im Haus, keine Lizenzkosten, keine Abhängigkeit vom Hersteller.\nBuy: sofort einsatzbereit, Support und Updates durch Hersteller, erprobt, kalkulierbare Kosten.\nEntscheidung: Nutzwertanalyse mit gewichteten Kriterien, ergänzt um Kostenvergleich und Amortisationsrechnung.'}
]}
];
