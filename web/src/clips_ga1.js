// GA1: Erklärclips im Format v2
const CLIPS_GA1 = {

klasse: [
{h:'Thema Nr. 1 in GA1', v:{stat:'Nr. 1', sub:'Klassendiagramm ist das wichtigste Thema in GA1'},
 beats:[
  {say:'Das Klassendiagramm ist das wichtigste Thema in GA1. Wer es kann, holt hier sichere Punkte.', show:{}},
  {say:'Typischer Fehler: die Raute auf der falschen Seite. Nach diesem Clip passiert dir das nicht mehr.', show:{}}
 ]},
{h:'Aufbau einer Klasse', v:{code:`┌───────────────────────────┐
│ Mandant                   │
├───────────────────────────┤
│ - id: int                 │
│ - name: String            │
│ # ort: String             │
│ - anzahl: int   (static)  │
├───────────────────────────┤
│ + Mandant(name: String)   │
│ + getName(): String       │
│ + addAuftrag(a: Auftrag)  │
└───────────────────────────┘`},
 beats:[
  {say:'Eine Klasse ist ein Kasten mit drei Teilen. Ganz oben steht der Name.', show:{lines:[1,2]}},
  {say:'In der Mitte die Attribute. Immer Name, Doppelpunkt, Datentyp.', show:{lines:[3,6]}},
  {say:'Statische Attribute werden im Diagramm unterstrichen. Sie gehören zur Klasse, nicht zu einem einzelnen Objekt.', show:{lines:[7,7]}},
  {say:'Unten die Methoden: Parameter in Klammern, Rückgabetyp hinter dem Doppelpunkt. Der Konstruktor heißt wie die Klasse.', show:{lines:[8,12]}}
 ]},
{h:'Sichtbarkeiten', v:{table:[['Zeichen','Bedeutung','Zugriff'],['+','public','alle'],['-','private','nur die Klasse selbst'],['#','protected','Klasse und Unterklassen'],['~','package','gleiches Paket']]},
 beats:[
  {say:'Plus heißt public. Alle dürfen zugreifen.', show:{rows:1}},
  {say:'Minus heißt private. Nur die Klasse selbst.', show:{rows:2}},
  {say:'Raute heißt protected. Die Klasse und ihre Unterklassen. Das wird gern abgefragt.', show:{rows:3}},
  {say:'Tilde heißt package. Attribute sind meist private, Zugriff über Getter und Setter. Das ist Kapselung.', show:{rows:4}}
 ]},
{h:'Beziehungen', v:{table:[['Linie','Name','Bedeutung'],['——','Assoziation','kennt, benutzt'],['——◇','Aggregation','Teil kann allein existieren'],['——◆','Komposition','Teil stirbt mit dem Ganzen'],['——▷','Vererbung','ist ein'],['- - -▷','Realisierung','implementiert Interface']]},
 beats:[
  {say:'Eine einfache Linie ist eine Assoziation. Die Klassen kennen sich.', show:{rows:1}},
  {say:'Leere Raute: Aggregation. Das Teil kann allein existieren, wie ein Spieler ohne Mannschaft.', show:{rows:2}},
  {say:'Gefüllte Raute: Komposition. Das Teil stirbt mit dem Ganzen, wie ein Raum mit dem Gebäude. Die Raute sitzt immer beim Ganzen.', show:{rows:3}},
  {say:'Leeres Dreieck an der Oberklasse heißt Vererbung, also ist ein. Gestrichelt mit Dreieck: implementiert ein Interface.', show:{rows:5}}
 ],
 check:{q:'Ein Gebäude hat Räume. Ohne Gebäude gibt es den Raum nicht. Welche Raute?', o:['leere Raute, Aggregation','gefüllte Raute, Komposition','keine, Vererbung'], a:1, e:'Der Raum stirbt mit dem Gebäude: Komposition, gefüllte Raute beim Gebäude.'}},
{h:'Multiplizitäten', v:{code:`Mandant 1 ──────── 0..* Auftrag

1      genau einer
0..1   keiner oder einer
*      beliebig viele, also 0..*
1..*   mindestens einer

Ein Mandant hat 0 bis viele Aufträge.
Ein Auftrag gehört zu genau 1 Mandant.`},
 beats:[
  {say:'An die Linien kommen Multiplizitäten. Hier steht eine 1 beim Mandanten und null bis Stern beim Auftrag.', show:{lines:[1,1]}},
  {say:'Eins heißt genau einer. Null Punkt Punkt eins heißt keiner oder einer.', show:{lines:[3,4]}},
  {say:'Stern heißt beliebig viele. Eins Punkt Punkt Stern heißt mindestens einer.', show:{lines:[5,6]}},
  {say:'Die Zahl steht auf der gegenüberliegenden Seite. Ein Mandant hat null bis viele Aufträge, ein Auftrag genau einen Mandanten.', show:{lines:[8,9]}}
 ],
 check:{q:'Mandant 1 ──── 0..* Auftrag. Zu wie vielen Mandanten gehört ein Auftrag?', o:['genau 1','0 bis viele','mindestens 1'], a:0, e:'Die 1 steht beim Mandanten, also gehört jeder Auftrag zu genau einem Mandanten.'}},
{h:'Die 4 Säulen der OOP', v:{table:[['Prinzip','In einem Satz'],['Kapselung','Daten private, Zugriff über Methoden'],['Vererbung','Unterklasse übernimmt alles der Oberklasse'],['Polymorphie','gleicher Aufruf, anderes Verhalten'],['Abstraktion','nur das Wichtige modellieren']]},
 beats:[
  {say:'Kapselung: Daten sind privat, Zugriff nur über Methoden.', show:{rows:1}},
  {say:'Vererbung: Die Unterklasse übernimmt Attribute und Methoden der Oberklasse.', show:{rows:2}},
  {say:'Polymorphie: Die Unterklasse überschreibt eine Methode. Gleicher Aufruf, je nach Objekt anderes Verhalten.', show:{rows:3}},
  {say:'Abstraktion: Nur das Wichtige modellieren, mit abstrakten Klassen und Interfaces.', show:{rows:4}}
 ]},
{h:'Abstrakte Klasse vs. Interface', v:{table:[['','Abstrakte Klasse','Interface'],['Objekte erzeugen?','nein','nein'],['Attribute, fertige Methoden','ja','klassisch nein'],['Wie viele?','nur von einer erben','mehrere implementieren'],['UML','kursiv, {abstract}','«interface»']]},
 beats:[
  {say:'Von beiden kannst du keine Objekte erzeugen.', show:{rows:1}},
  {say:'Die abstrakte Klasse darf Attribute und fertige Methoden haben. Das Interface gibt klassisch nur Signaturen vor.', show:{rows:2}},
  {say:'Erben geht nur von einer Klasse. Interfaces kann eine Klasse dagegen mehrere implementieren.', show:{rows:3}},
  {say:'In UML ist die abstrakte Klasse kursiv. Das Interface trägt den Stereotyp interface in spitzen Klammern.', show:{rows:4}}
 ]}
],

erm: [
{h:'Hier liegen die Punkte', v:{stat:'83 %', sub:'Datenbanken: das häufigste Themencluster'},
 beats:[
  {say:'Datenbanken sind mit 83 Prozent das häufigste Themencluster der Prüfung.', show:{}},
  {say:'Du lernst jetzt drei Dinge: ER-Modell lesen, in Tabellen umwandeln, normalisieren.', show:{}}
 ]},
{h:'ER-Modell: die Bausteine', v:{table:[['Symbol','Bedeutung'],['Rechteck','Entität, etwa Mandant'],['Oval','Attribut, Schlüssel unterstrichen'],['Raute','Beziehung, etwa erteilt'],['1:1, 1:n, n:m','Kardinalität']]},
 beats:[
  {say:'Entitäten sind Rechtecke, zum Beispiel Mandant.', show:{rows:1}},
  {say:'Attribute sind Ovale. Der Schlüssel wird unterstrichen.', show:{rows:2}},
  {say:'Beziehungen sind Rauten, zum Beispiel erteilt.', show:{rows:3}},
  {say:'An die Linien kommen Kardinalitäten: eins zu eins, eins zu n oder n zu m.', show:{rows:4}}
 ]},
{h:'Kardinalität in Tabellen', v:{table:[['Beziehung','Umsetzung'],['1:1','Fremdschlüssel in eine der Tabellen'],['1:n','Fremdschlüssel auf die n-Seite'],['n:m','Zwischentabelle mit beiden Fremdschlüsseln']]},
 beats:[
  {say:'Das ist der wichtigste Punkt. Eins zu eins: Der Fremdschlüssel kommt in eine der beiden Tabellen.', show:{rows:1}},
  {say:'Eins zu n: Fremdschlüssel auf die n-Seite. Ein Mandant hat viele Aufträge, also bekommt Auftrag die MandantID.', show:{rows:2}},
  {say:'n zu m: Du brauchst eine Zwischentabelle mit beiden Fremdschlüsseln.', show:{rows:3}}
 ],
 check:{q:'Ein Mandant hat viele Aufträge. Wohin kommt die MandantID?', o:['in die Tabelle Mandant','in die Tabelle Auftrag','in eine Zwischentabelle'], a:1, e:'1:n, der Fremdschlüssel kommt auf die n-Seite, also zu Auftrag.'}},
{h:'Beispiel n:m', v:{code:`Mitarbeiter(MitarbeiterID, Name)
Auftrag(AuftragID, Art)

Mitarbeit(#MitarbeiterID, #AuftragID,
          Stunden)

#: Fremdschlüssel
Beide # zusammen: Primärschlüssel
= zusammengesetzter Schlüssel`},
 beats:[
  {say:'Ein Mitarbeiter arbeitet an vielen Aufträgen, ein Auftrag hat viele Mitarbeiter. Also n zu m.', show:{lines:[1,2]}},
  {say:'Die Zwischentabelle Mitarbeit bekommt beide Fremdschlüssel. Infos wie die Stunden gehören genau hierher.', show:{lines:[4,5]}},
  {say:'Beide Fremdschlüssel zusammen bilden den Primärschlüssel. Das ist ein zusammengesetzter Schlüssel.', show:{lines:[7,9]}}
 ]},
{h:'Anomalien', v:{code:`ID | Mandant       | Ort   | Art
10 | Bäckerei Gies | Fulda | Steuer
11 | Bäckerei Gies | Fulda | Lohn

Ändern:   Ort in vielen Zeilen ändern
Einfügen: Mandant ohne Auftrag geht nicht
Löschen:  letzter Auftrag weg, Mandant weg`},
 beats:[
  {say:'Schau hin: Bäckerei Gies steht doppelt drin. Diese Redundanz führt zu Anomalien.', show:{lines:[1,3]}},
  {say:'Änderungsanomalie: Zieht der Mandant um, änderst du viele Zeilen und vergisst eine.', show:{lines:[5,5]}},
  {say:'Einfügeanomalie: Einen neuen Mandanten ohne Auftrag kannst du nicht speichern.', show:{lines:[6,6]}},
  {say:'Löschanomalie: Löschst du den letzten Auftrag, ist der Mandant auch weg. Deshalb normalisiert man.', show:{lines:[7,7]}}
 ]},
{h:'Die 3 Normalformen', v:{table:[['NF','Regel','Merke'],['1. NF','alle Werte atomar','ein Feld, ein Wert'],['2. NF','hängt vom ganzen Schlüssel ab','nur bei zusammengesetztem Schlüssel'],['3. NF','keine Abhängigkeit zwischen Nicht-Schlüsseln','keine transitiven Abhängigkeiten']]},
 beats:[
  {say:'Erste Normalform: Alle Werte atomar. Keine zwei Telefonnummern in einer Zelle.', show:{rows:1}},
  {say:'Zweite: Alles hängt vom ganzen Schlüssel ab, nicht nur von einem Teil. Betrifft nur zusammengesetzte Schlüssel.', show:{rows:2}},
  {say:'Dritte: Kein Nicht-Schlüsselattribut hängt von einem anderen ab. Klassiker: Die Postleitzahl bestimmt den Ort.', show:{rows:3}},
  {say:'Die Lösung: Ort kommt in eine eigene Tabelle mit der Postleitzahl als Schlüssel.', show:{rows:3}}
 ],
 check:{q:'Im Mandanten stehen PLZ und Ort. Die PLZ bestimmt den Ort, ist aber kein Schlüssel. Was ist verletzt?', o:['1. NF','2. NF','3. NF'], a:2, e:'Transitive Abhängigkeit: Schlüssel bestimmt PLZ, PLZ bestimmt Ort.'}},
{h:'Merksatz', v:{stat:'Der Schlüssel, der ganze Schlüssel und nichts als der Schlüssel', sub:'1. NF · 2. NF · 3. NF'},
 beats:[
  {say:'Jedes Attribut hängt vom Schlüssel ab, vom ganzen Schlüssel und von nichts als dem Schlüssel.', show:{}},
  {say:'Das sind die drei Normalformen in einem Satz. Merk ihn dir.', show:{}}
 ]}
],

vorgehen: [
{h:'5 von 9 Prüfungen', v:{stat:'5 von 9', sub:'Prüfungen mit Vorgehensmodellen'},
 beats:[
  {say:'Vorgehensmodelle kamen in 5 von 9 Prüfungen. Anforderungsanalyse sogar sehr häufig.', show:{}},
  {say:'Klassischer Fehler: Lastenheft und Pflichtenheft verwechseln. Das klären wir gleich.', show:{}}
 ]},
{h:'Klassisch vs. agil', v:{table:[['','Wasserfall, V-Modell','Agil, Scrum'],['Anforderungen','am Anfang komplett','entwickeln sich'],['Ergebnis','am Ende','nach jedem Sprint'],['Änderungen','teuer','willkommen'],['Gut wenn','feste, klare Anforderungen','unklare Anforderungen']]},
 beats:[
  {say:'Klassisch planst du alle Anforderungen am Anfang. Agil entwickeln sie sich.', show:{rows:1}},
  {say:'Wasserfall liefert am Ende. Scrum liefert nach jedem Sprint ein funktionierendes Stück.', show:{rows:2}},
  {say:'Änderungen sind klassisch teuer, agil willkommen.', show:{rows:3}},
  {say:'Faustregel: Feste, klare Anforderungen, dann Wasserfall. Weiß der Kunde noch nicht genau, was er will, dann Scrum.', show:{rows:4}}
 ]},
{h:'Wasserfall und V-Modell', v:{code:`Wasserfall: eine Phase nach der anderen

V-Modell: links Entwurf, rechts Test
Anforderungen ─────── Abnahmetest
 Systementwurf ────── Systemtest
  Architektur ────── Integrationstest
   Modulentwurf ──── Unit-Test
     Implementierung: Spitze des V`},
 beats:[
  {say:'Beim Wasserfall startet jede Phase erst, wenn die vorige fertig ist.', show:{lines:[1,1]}},
  {say:'Das V-Modell: Zu jeder Entwurfsphase links gehört rechts eine Teststufe. Zu den Anforderungen gehört der Abnahmetest.', show:{lines:[3,4]}},
  {say:'Systementwurf zum Systemtest, Architektur zum Integrationstest, Modulentwurf zum Unit-Test.', show:{lines:[5,7]}},
  {say:'Ganz unten an der Spitze des V steht die Implementierung.', show:{lines:[8,8]}}
 ],
 check:{q:'Welche Teststufe steht im V-Modell gegenüber dem Modulentwurf?', o:['Unit-Test','Systemtest','Abnahmetest'], a:0, e:'Modulentwurf gehört zum Unit-Test, Anforderungen zum Abnahmetest.'}},
{h:'Scrum: 3 Verantwortlichkeiten', v:{table:[['Verantwortlichkeit','Aufgabe'],['Product Owner','verantwortet und priorisiert das Product Backlog'],['Scrum Master','entfernt Hindernisse, achtet auf Regeln, kein Chef'],['Developers','setzen um']]},
 beats:[
  {say:'Scrum hat drei Verantwortlichkeiten. Der Scrum Guide 2020 nennt sie nicht mehr Rollen.', show:{rows:1}},
  {say:'Der Product Owner verantwortet und priorisiert das Product Backlog. Er vertritt die Stakeholder.', show:{rows:1}},
  {say:'Der Scrum Master räumt Hindernisse weg und achtet auf die Regeln. Er ist kein Chef.', show:{rows:2}},
  {say:'Die Developers setzen um. Das ganze Scrum Team managt sich selbst.', show:{rows:3}}
 ]},
{h:'Scrum: die Events', v:{table:[['Event','Wann, Dauer'],['Sprint','höchstens 1 Monat, feste Länge'],['Sprint Planning','Start: was kommt rein'],['Daily Scrum','täglich 15 Minuten'],['Sprint Review','Ende: Ergebnis mit Stakeholdern prüfen'],['Retrospektive','Ende: wie arbeiten wir besser']]},
 beats:[
  {say:'Ein Sprint dauert höchstens einen Monat, meist zwei bis vier Wochen. Immer gleich lang.', show:{rows:1}},
  {say:'Am Anfang das Sprint Planning. Jeden Tag ein Daily Scrum von 15 Minuten.', show:{rows:3}},
  {say:'Am Ende das Review: Das Ergebnis wird mit den Stakeholdern geprüft, Feedback inklusive.', show:{rows:4}},
  {say:'Dann die Retrospektive: Das Team spricht über die eigene Zusammenarbeit. Review ist Produkt, Retro ist Prozess.', show:{rows:5}}
 ],
 check:{q:'Das Team will klären, wie es besser zusammenarbeitet. Welches Event?', o:['Sprint Review','Retrospektive','Daily Scrum'], a:1, e:'Review prüft das Produkt, die Retro den Prozess.'}},
{h:'Lastenheft und Anforderungen', v:{table:[['Begriff','Kurz'],['Lastenheft','Auftraggeber: WAS soll es können?'],['Pflichtenheft','Auftragnehmer: WIE wird es umgesetzt?'],['funktional','WAS das System tut'],['nicht-funktional','WIE GUT, etwa Upload unter 2 Sekunden']]},
 beats:[
  {say:'Das Lastenheft schreibt der Auftraggeber. Es sagt, was das System können soll. Merke: Lasten trägt der Kunde.', show:{rows:1}},
  {say:'Das Pflichtenheft schreibt der Auftragnehmer. Es sagt, wie es umgesetzt wird.', show:{rows:2}},
  {say:'Funktionale Anforderungen beschreiben, was das System tut. Zum Beispiel: Mandanten können Belege hochladen.', show:{rows:3}},
  {say:'Nicht-funktionale beschreiben, wie gut: Performance, Sicherheit, Bedienbarkeit. Upload in unter 2 Sekunden ist nicht-funktional.', show:{rows:4}}
 ]},
{h:'User Story und Use Cases', v:{code:`User Story:
Als <Rolle> möchte ich <Ziel>,
damit <Nutzen>.

Anwendungsfalldiagramm:
Strichmännchen: Akteur, außerhalb
Rechteck: Systemgrenze
Oval: Anwendungsfall

«include»: wird IMMER mit ausgeführt
  Bestellen ──▷ Anmelden
«extend»: wird nur OPTIONAL ausgeführt
  Gutschein einlösen ──▷ Bestellen`},
 beats:[
  {say:'Eine User Story hat immer das Muster: Als Rolle möchte ich Ziel, damit Nutzen.', show:{lines:[1,3]}},
  {say:'Im Anwendungsfalldiagramm sind Akteure Strichmännchen außerhalb. Das System ist ein Rechteck, Anwendungsfälle sind Ovale.', show:{lines:[5,8]}},
  {say:'Include heißt: wird immer mit ausgeführt. Wer bestellt, muss sich anmelden.', show:{lines:[10,11]}},
  {say:'Extend heißt: wird nur manchmal, optional ausgeführt. Einen Gutschein löst nicht jeder ein.', show:{lines:[12,13]}}
 ]}
],

security: [
{h:'Fast jede zweite Prüfung', v:{stat:'Fast jede 2.', sub:'Prüfung hatte IT-Sicherheit'},
 beats:[
  {say:'IT-Sicherheit kam in fast jeder zweiten Prüfung. In der Kanzlei bist du da eh Profi.', show:{}},
  {say:'Typischer Fehler: öffentlichen und privaten Schlüssel vertauschen. Heute nicht.', show:{}}
 ]},
{h:'Die 3 Schutzziele', v:{table:[['Schutzziel','Frage','Maßnahme'],['Vertraulichkeit','Nur Befugte lesen?','Verschlüsselung, Rechte'],['Integrität','Unverändert?','Hash, Signatur'],['Verfügbarkeit','Erreichbar, wenn nötig?','Backup, RAID, USV']]},
 beats:[
  {say:'Vertraulichkeit: Nur Befugte dürfen Daten lesen. Zum Beispiel durch Verschlüsselung.', show:{rows:1}},
  {say:'Integrität: Daten sind nicht unbemerkt verändert. Zum Beispiel durch Hashwerte.', show:{rows:2}},
  {say:'Verfügbarkeit: Systeme sind da, wenn man sie braucht. Dafür sorgen Backups und Redundanz.', show:{rows:3}},
  {say:'Dazu kommen oft noch Authentizität und Verbindlichkeit.', show:{rows:3}}
 ]},
{h:'Symmetrisch vs. asymmetrisch', v:{table:[['','Symmetrisch','Asymmetrisch'],['Schlüssel','1 gemeinsamer','Paar: öffentlich und privat'],['Tempo','schnell','langsam'],['Problem','Schlüsselaustausch','Vertrauen in öffentlichen Schlüssel'],['Beispiel','AES','RSA']]},
 beats:[
  {say:'Symmetrisch heißt: ein gemeinsamer Schlüssel. Asymmetrisch: ein Schlüsselpaar aus öffentlich und privat.', show:{rows:1}},
  {say:'Symmetrisch ist schnell, aber wie tauscht man den Schlüssel sicher aus? Asymmetrisch ist langsamer.', show:{rows:3}},
  {say:'Beispiele: AES ist symmetrisch, RSA asymmetrisch.', show:{rows:4}},
  {say:'Asymmetrisch verschlüsselst du mit dem öffentlichen Schlüssel des Empfängers. Nur sein privater Schlüssel entschlüsselt.', show:{rows:4}}
 ],
 check:{q:'Du willst Bob eine geheime Nachricht schicken. Womit verschlüsselst du?', o:['mit Bobs öffentlichem Schlüssel','mit Bobs privatem Schlüssel','mit deinem privaten Schlüssel'], a:0, e:'Nur Bobs privater Schlüssel kann sie dann entschlüsseln.'}},
{h:'Hybrid, Hash, Signatur', v:{code:`HTTPS ist hybrid:
 asymmetrisch: Schlüssel aushandeln,
   Server per Zertifikat prüfen
 symmetrisch: Daten schnell verschlüsseln

Hash: Einwegfunktion
 Passwörter gehasht plus Salt speichern

Signatur: Hash mit PRIVATEM Schlüssel
 des Absenders signieren
Prüfen: mit ÖFFENTLICHEM Schlüssel
 des Absenders
Sichert Integrität, Authentizität,
 Nichtabstreitbarkeit`},
 beats:[
  {say:'HTTPS ist hybrid. Asymmetrisch wird ein Sitzungsschlüssel ausgehandelt und der Server per Zertifikat geprüft. Dann symmetrisch und schnell.', show:{lines:[1,4]}},
  {say:'Ein Hash ist eine Einwegfunktion. Passwörter speicherst du nur gehasht mit Salt, zum Beispiel mit bcrypt oder Argon2.', show:{lines:[6,7]}},
  {say:'Digitale Signatur: Der Absender signiert den Hash mit seinem privaten Schlüssel.', show:{lines:[9,10]}},
  {say:'Prüfen kann jeder mit dem öffentlichen Schlüssel des Absenders. Das sichert Integrität, Authentizität und Nichtabstreitbarkeit.', show:{lines:[11,14]}}
 ]},
{h:'Angriffe und Schutz', v:{table:[['Angriff','Schutz'],['SQL-Injection','Prepared Statements'],['XSS','Ausgaben escapen'],['Man-in-the-Middle','TLS, Zertifikate prüfen'],['Phishing','Schulung, MFA'],['Ransomware','Offline-Backups, Updates']]},
 beats:[
  {say:'SQL-Injection stoppst du mit Prepared Statements. Gegen Cross Site Scripting: Ausgaben escapen.', show:{rows:2}},
  {say:'Man in the Middle: TLS und Zertifikate prüfen.', show:{rows:3}},
  {say:'Phishing und Social Engineering: Mitarbeiter schulen und Multi-Faktor-Authentifizierung.', show:{rows:4}},
  {say:'Ransomware: Offline-Backups und Updates.', show:{rows:5}}
 ]},
{h:'DSGVO: das Wichtigste', v:{list:['Personenbezogen: Infos zu identifizierbarer Person','Zweckbindung, Datenminimierung, Speicherbegrenzung','Rechte: Auskunft, Berichtigung, Löschung','Datenpanne: unverzüglich, möglichst binnen 72 Stunden','Auftragsverarbeitung braucht AV-Vertrag']},
 beats:[
  {say:'Die DSGVO schützt personenbezogene Daten. Also alles, was sich auf eine identifizierbare Person bezieht.', show:{item:1}},
  {say:'Grundsätze: Zweckbindung, Speicherbegrenzung und Datenminimierung, also nur so viele Daten wie nötig.', show:{item:2}},
  {say:'Betroffene haben Rechte auf Auskunft, Berichtigung und Löschung. Eine Datenpanne meldest du unverzüglich, möglichst binnen 72 Stunden.', show:{item:4}},
  {say:'Keine Meldung nur, wenn voraussichtlich kein Risiko besteht. Und wer Daten für andere verarbeitet, braucht einen AV-Vertrag.', show:{item:5}}
 ]},
{h:'TOM: technisch oder organisatorisch?', v:{table:[['Technisch','Organisatorisch'],['Verschlüsselung, BitLocker','Berechtigungskonzept'],['MFA, Passwortrichtlinie','Schulungen'],['Firewall, Backups','Clean-Desk-Policy'],['Protokollierung','Verpflichtung auf Vertraulichkeit']]},
 beats:[
  {say:'TOM heißt technische und organisatorische Maßnahmen. Technisch ist zum Beispiel BitLocker, organisatorisch das Berechtigungskonzept.', show:{rows:1}},
  {say:'Multi-Faktor ist technisch. Schulungen sind organisatorisch.', show:{rows:2}},
  {say:'Firewall, Backups und Protokollierung: technisch. Aufgeräumter Schreibtisch und Verschwiegenheit: organisatorisch.', show:{rows:4}}
 ],
 check:{q:'Die Kanzlei führt eine Clean-Desk-Policy ein. Was für eine Maßnahme ist das?', o:['technisch','organisatorisch'], a:1, e:'Eine Regel für Menschen, keine Technik: organisatorisch.'}}
],

patterns: [
{h:'Observer kam schon 3 Mal', v:{stat:'3 Mal', sub:'Observer in der Prüfung, dazu Singleton, Factory, Facade, MVC'},
 beats:[
  {say:'Observer kam schon 3 Mal dran. Singleton, Factory, Facade und MVC stehen im Katalog.', show:{}},
  {say:'Entwurfsmuster sind bewährte Lösungen für wiederkehrende Probleme. Du musst sie nicht programmieren, nur erkennen und erklären.', show:{}}
 ]},
{h:'Singleton', v:{code:`┌─────────────────────────────┐
│ Datenbankverbindung         │
├─────────────────────────────┤
│ - instanz   (static)        │
├─────────────────────────────┤
│ - Datenbankverbindung()     │
│ + getInstanz()   (static)   │
└─────────────────────────────┘`},
 beats:[
  {say:'Singleton: Von einer Klasse gibt es genau ein Objekt. Zum Beispiel eine Datenbankverbindung oder ein Logger.', show:{lines:[1,2]}},
  {say:'Merkmal eins: ein statisches Attribut für die Instanz.', show:{lines:[3,4]}},
  {say:'Merkmal zwei: ein privater Konstruktor. Niemand außer der Klasse kann Objekte erzeugen.', show:{lines:[5,6]}},
  {say:'Merkmal drei: die statische Methode getInstanz.', show:{lines:[7,8]}}
 ]},
{h:'Observer', v:{code:`Subjekt, etwa Belegeingang
 + anmelden(o: Observer)
 + abmelden(o: Observer)
 + benachrichtigen()
     ruft bei allen update() auf

«interface» Observer
 + update()

Anzeige, Logger, Mailer
 implementieren Observer`},
 beats:[
  {say:'Observer heißt Beobachter. Ein Subjekt hat eine Liste von Beobachtern. Die melden sich selbst an und ab.', show:{lines:[1,3]}},
  {say:'Ändert sich etwas, ruft das Subjekt bei allen Beobachtern die Methode update auf.', show:{lines:[4,5]}},
  {say:'Dafür implementiert jeder Beobachter das Interface Observer mit update.', show:{lines:[7,8]}},
  {say:'Neuer Beleg kommt rein: Anzeige, Logger und Mail werden automatisch informiert. Vorteil: lose Kopplung.', show:{lines:[10,11]}}
 ],
 check:{q:'Ein neuer Beleg kommt rein. Welche Methode ruft das Subjekt beim Logger auf?', o:['getInstanz()','update()','anmelden()'], a:1, e:'Das Subjekt benachrichtigt alle Beobachter über update().'}},
{h:'Factory und Facade', v:{table:[['Muster','Idee','Beispiel'],['Factory','erzeugt Objekte, konkrete Klasse egal','erzeugeExport("pdf")'],['Facade','einfache Schnittstelle vor komplexem Subsystem','monatsabschluss()']]},
 beats:[
  {say:'Die Factory erzeugt Objekte für dich. Du sagst nur: PDF-Export bitte. Die konkrete Klasse musst du nicht kennen.', show:{rows:1}},
  {say:'Bei der Factory Method entscheidet eine Unterklasse per überschriebener Methode, welche Klasse erzeugt wird.', show:{rows:1}},
  {say:'Die Facade ist eine einfache Fassade vor einem komplizierten Subsystem. Ein Aufruf, dahinter laufen zehn Dienste.', show:{rows:2}}
 ]},
{h:'MVC', v:{table:[['Teil','Aufgabe'],['Model','Daten und Geschäftslogik'],['View','Darstellung, Oberfläche'],['Controller','nimmt Eingaben an, steuert Model und View']]},
 beats:[
  {say:'MVC trennt eine Anwendung in drei Teile. Das Model enthält Daten und Logik.', show:{rows:1}},
  {say:'Die View zeigt an.', show:{rows:2}},
  {say:'Der Controller nimmt Benutzereingaben an und steuert Model und View.', show:{rows:3}},
  {say:'Vorteil: Trennung der Zuständigkeiten. Du tauschst die Oberfläche, ohne die Logik anzufassen. Das ist Wartbarkeit.', show:{rows:3}}
 ],
 check:{q:'Ein Nutzer klickt auf Speichern. Welcher Teil nimmt den Klick an?', o:['Model','View','Controller'], a:2, e:'Der Controller nimmt Eingaben an und steuert Model und View.'}}
],

rest: [
{h:'4 von 9 Prüfungen', v:{stat:'4 von 9', sub:'Prüfungen mit REST und HTTP, oft mit JSON'},
 beats:[
  {say:'REST und HTTP kamen in 4 von 9 Prüfungen, oft zusammen mit JSON.', show:{}},
  {say:'Klassiker: 401 und 403 verwechseln. Nach diesem Clip nicht mehr.', show:{}}
 ]},
{h:'HTTP-Methoden und CRUD', v:{table:[['Methode','CRUD','Beispiel'],['GET','Read','GET /mandanten/4'],['POST','Create','POST /mandanten'],['PUT','Update komplett','PUT /mandanten/4'],['PATCH','Update teilweise','PATCH /mandanten/4'],['DELETE','Delete','DELETE /mandanten/4']]},
 beats:[
  {say:'REST nutzt HTTP-Methoden für die vier Grundoperationen. GET liest.', show:{rows:1}},
  {say:'POST legt neu an.', show:{rows:2}},
  {say:'PUT ersetzt komplett, PATCH ändert nur teilweise.', show:{rows:4}},
  {say:'DELETE löscht. Die Ressource steht in der URL, zum Beispiel Mandanten Schrägstrich 4.', show:{rows:5}}
 ]},
{h:'Statuscodes', v:{code:`2xx  Erfolg
 200 OK
 201 Created, nach POST
 204 No Content

4xx  Fehler beim Client
 400 Bad Request
 401 Unauthorized: nicht angemeldet
 403 Forbidden: keine Rechte
 404 Not Found

5xx  Fehler beim Server
 500 Internal Server Error`},
 beats:[
  {say:'Zweihunderter heißt Erfolg. 200 okay, 201 angelegt, typisch nach POST. 204 okay, aber keine Daten.', show:{lines:[1,4]}},
  {say:'Vierhunderter: Der Client hat einen Fehler gemacht. 400 falsche Anfrage, 401 nicht angemeldet.', show:{lines:[6,8]}},
  {say:'403: angemeldet, aber keine Rechte. 404: gibt es nicht.', show:{lines:[9,10]}},
  {say:'Fünfhunderter: Der Fehler liegt auf dem Server.', show:{lines:[12,13]}}
 ],
 check:{q:'Du bist eingeloggt, darfst die Akte aber nicht öffnen. Welcher Code?', o:['401','403','404'], a:1, e:'401 heißt nicht angemeldet, 403 angemeldet ohne Rechte.'}},
{h:'REST-Prinzipien', v:{list:['Zustandslos: jede Anfrage bringt alles mit, etwa Token','Ressourcen über eindeutige URLs','Einheitliche Schnittstelle über HTTP-Methoden','Daten meist als JSON','Client und Server getrennt']},
 beats:[
  {say:'Zustandslos: Der Server merkt sich nichts zwischen Anfragen. Jede Anfrage bringt alles mit, zum Beispiel ein Token.', show:{item:1}},
  {say:'Ressourcen haben eindeutige URLs.', show:{item:2}},
  {say:'Die Schnittstelle ist einheitlich, über die HTTP-Methoden.', show:{item:3}},
  {say:'Daten fließen meist als JSON. Client und Server sind getrennt.', show:{item:5}}
 ]},
{h:'JSON, XML, CSV', v:{code:`JSON:
{ "id": 4, "name": "Café Rhön",
  "auftraege": [
    {"art": "Lohn"}, {"art": "Steuer"} ] }

XML:
<mandant id="4">
  <name>Café Rhön</name></mandant>

CSV:
id;name;ort
4;Café Rhön;Fulda`},
 beats:[
  {say:'JSON: Geschweifte Klammern für Objekte. Schlüssel stehen in Anführungszeichen.', show:{lines:[1,2]}},
  {say:'Eckige Klammern für Listen. Hier die Liste der Aufträge.', show:{lines:[3,4]}},
  {say:'XML arbeitet mit Tags. Gut per Schema validierbar, aber mehr Text.', show:{lines:[6,8]}},
  {say:'CSV ist eine einfache Tabelle mit Trennzeichen. Gut für Excel, aber ohne Verschachtelung.', show:{lines:[10,12]}}
 ],
 check:{q:'Woran erkennst du in JSON eine Liste?', o:['geschweifte Klammern','eckige Klammern','spitze Klammern'], a:1, e:'Eckige Klammern stehen für ein Array, geschweifte für ein Objekt.'}},
{h:'Git in 6 Befehlen', v:{code:`git clone <url>       Repo holen
git add datei.py      vormerken
git commit -m "..."   lokal speichern
git push / git pull   hoch, runter
git branch feature-x  Zweig anlegen
git merge feature-x   zusammenführen`},
 beats:[
  {say:'Clone holt ein Repository.', show:{lines:[1,1]}},
  {say:'Add merkt Änderungen vor. Commit speichert den Stand lokal.', show:{lines:[2,3]}},
  {say:'Push und Pull synchronisieren mit dem Server.', show:{lines:[4,4]}},
  {say:'Branch legt einen Zweig an, Merge führt zusammen. Vorteile: Versionierung, paralleles Arbeiten, Nachvollziehbarkeit.', show:{lines:[5,6]}}
 ]}
],

quali: [
{h:'Schnell verdiente Punkte', v:{stat:'Schnelle Punkte', sub:'kleinere Teilaufgaben: Qualität, UX, Kosten'},
 beats:[
  {say:'Qualität, UX und Kosten sind kleinere Teilaufgaben. Aber hier verdienst du schnell Punkte.', show:{}},
  {say:'Zwei Rechnungen und ein paar Begriffe. Los gehts.', show:{}}
 ]},
{h:'ISO 25010: Softwarequalität', v:{code:`ISO 25010, Fassung 2011: 8 Merkmale
 Funktionale Eignung
 Leistungseffizienz
 Kompatibilität
 Benutzbarkeit
 Zuverlässigkeit
 Sicherheit
 Wartbarkeit
 Übertragbarkeit

Fassung 2023: 9 Merkmale

Wartbarkeit: Kommentare, Tests,
 sauberer Code`},
 beats:[
  {say:'Die ISO 25010 definiert in der Fassung von 2011 acht Qualitätsmerkmale. Für die Prüfung reichen diese acht.', show:{lines:[1,1]}},
  {say:'Funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit.', show:{lines:[2,5]}},
  {say:'Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit. Die Fassung von 2023 hat neun.', show:{lines:[6,11]}},
  {say:'Oft sollst du ein Merkmal mit einer Maßnahme verbinden. Wartbarkeit zum Beispiel durch Kommentare, Tests und sauberen Code.', show:{lines:[13,14]}}
 ]},
{h:'Barrierefreiheit', v:{list:['Guter Kontrast, Farbe nie einzige Information','Schrift skalierbar, Alternativtexte für Screenreader','Bedienbar nur mit Tastatur, einfache Sprache','BFSG seit 28.06.2025, etwa Onlineshops, Banking','Standard: EN 301 549 mit WCAG 2.1 AA']},
 beats:[
  {say:'Barrierefreiheit heißt: Alle können die Software nutzen. Farbe nie als einzige Info, Farbenblinde erkennen sie sonst nicht.', show:{item:1}},
  {say:'Alternativtexte für Screenreader, Bedienung per Tastatur und einfache Sprache.', show:{item:3}},
  {say:'Seit Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz für bestimmte Produkte und Dienste wie Onlineshops und Banking.', show:{item:4}},
  {say:'Der technische Standard ist die EN 301 549. Sie baut auf den WCAG auf, den Richtlinien für barrierefreie Webinhalte.', show:{item:5}}
 ]},
{h:'Amortisation', v:{code:`Amortisationsdauer =
  Investition / jährliche Ersparnis

Tool kostet           12.000 €
spart 300 h × 40 €    12.000 €/Jahr
minus Wartung         −2.000 €/Jahr
Ersparnis             10.000 €/Jahr

12.000 / 10.000 = 1,2 Jahre`},
 beats:[
  {say:'Wann hat sich eine Investition bezahlt gemacht? Investition geteilt durch jährliche Ersparnis.', show:{lines:[1,2]}},
  {say:'Beispiel: Ein Tool kostet 12000 Euro. Es spart 300 Stunden im Jahr zu je 40 Euro.', show:{lines:[4,5]}},
  {say:'Minus 2000 Euro Wartung. Bleiben 10000 Euro Ersparnis pro Jahr.', show:{lines:[6,7]}},
  {say:'12000 geteilt durch 10000. Nach 1,2 Jahren hat sich das Tool amortisiert.', show:{lines:[9,9]}}
 ],
 check:{q:'Investition 6000 Euro, Ersparnis 3000 Euro pro Jahr. Amortisationsdauer?', o:['0,5 Jahre','2 Jahre','3 Jahre'], a:1, e:'6000 geteilt durch 3000 ergibt 2 Jahre.'}},
{h:'Make or Buy', v:{table:[['Make: selbst entwickeln','Buy: kaufen'],['passt genau','sofort verfügbar'],['Know-how bleibt im Haus','Support und Updates vom Hersteller'],['hoher Aufwand, Risiko','Lizenzkosten, Abhängigkeit'],['eigene Wartung nötig','passt eventuell nicht ganz']]},
 beats:[
  {say:'Make or Buy: selbst entwickeln oder kaufen. Make passt genau, Buy ist sofort da.', show:{rows:1}},
  {say:'Beim Make bleibt das Know-how im Haus. Beim Buy gibt es Support und Updates vom Hersteller.', show:{rows:2}},
  {say:'Nachteile: Make kostet Aufwand und Wartung. Buy bringt Lizenzkosten und Abhängigkeit vom Hersteller.', show:{rows:4}},
  {say:'Zur Entscheidung nutzt man eine Nutzwertanalyse mit gewichteten Kriterien.', show:{rows:4}}
 ]},
{h:'Nutzwertanalyse', v:{table:[['Kriterium','Gewicht','A: Bew. → Pkt','B: Bew. → Pkt'],['Kosten','40 %','3 → 1,2','5 → 2,0'],['Funktionen','35 %','5 → 1,75','3 → 1,05'],['Support','25 %','4 → 1,0','2 → 0,5'],['Summe','100 %','3,95','3,55']]},
 beats:[
  {say:'Jedes Kriterium bekommt ein Gewicht, zusammen 100 Prozent. Bewertet wird von 1 bis 5, 5 ist am besten.', show:{rows:1}},
  {say:'Kosten wiegen 40 Prozent. B bekommt 5 Punkte. 5 mal 0,4 ergibt 2,0.', show:{rows:1}},
  {say:'Genauso für Funktionen und Support: Bewertung mal Gewicht, Zeile für Zeile.', show:{rows:3}},
  {say:'Dann addieren. A hat 3,95, B hat 3,55. Die höchste Summe gewinnt, also A.', show:{rows:4}}
 ],
 check:{q:'Gewicht 50 Prozent, Bewertung 3 Punkte. Welcher gewichtete Wert?', o:['1,5','3,5','0,15'], a:0, e:'3 mal 0,5 ergibt 1,5.'}}
]

};
