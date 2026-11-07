# DevOps, Git, Lizenzen, KI und Green IT

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

CI/CD, Container, Git, Lizenzen und KI sind aktuelle Themen, die die IHK gern als Teilaufgabe mit Fallbezug abfragt.

## Inhalt

### 1. Die Pipeline: vom Push zum Release

Delivery oder Deployment? Ein Wort Unterschied, und genau das wird gern gefragt. Erst die Pipeline: Build, Test, Analyse, Deploy. Ist eine Stufe rot, zum Beispiel ein Unit-Test schlägt fehl, stoppt die Pipeline. Dann wird nichts deployt. Continuous Integration: oft mergen, automatisch bauen und testen. Continuous Delivery: immer auslieferbar, aber Release per Freigabe. Continuous Deployment: Jede grüne Änderung geht automatisch live. Vorteil von allem: Fehler früh finden, kleine Releases, weniger Handarbeit. Bei Continuous Delivery drückt am Ende noch ein Mensch auf den Knopf. Bei Continuous Deployment geht jede grüne Änderung automatisch live.

**Merk dir:** Delivery heißt auslieferbar, Deployment heißt automatisch ausgeliefert.

```
push ─> Build ─> Test ─> Analyse ─> Deploy
Stufe rot: Pipeline stoppt, kein Deploy

CI   oft mergen, automatisch bauen
     und testen
CD   Delivery: immer auslieferbar,
     Release nach manueller Freigabe
CD   Deployment: jede grüne Änderung
     geht automatisch live
Vorteil: Fehler früh, kleine Releases
```

### 2. Container gegen VM

*Leitfrage: Container oder virtuelle Maschine?*

Eine VM bringt ein eigenes Gast-Betriebssystem mit. Ein Container teilt sich den Kernel des Hosts. Darum sind Container leichtgewichtig: Start in Sekunden, Größe in Megabyte. VMs sind dafür stärker isoliert. Großer Vorteil von Docker: Die Umgebung ist auf dem Laptop, im Test und in Produktion gleich. Ein Image ist die schreibgeschützte Vorlage. Ein Container ist eine laufende Instanz davon. Darum starten Container in Sekunden, VMs dagegen in Minuten. Dafür sind VMs stärker voneinander abgeschottet.

**Merk dir:** Container teilen den Kernel des Hosts, VMs haben ein eigenes Betriebssystem.

|  | VM | Container |
|---|---|---|
| Betriebssystem | eigenes Gast-OS | teilt Host-Kernel |
| Start, Größe | Minuten, GB | Sekunden, MB |
| Isolation | stärker | schwächer |
| Vorteil | beliebiges OS | überall gleiche Umgebung |
| Begriffe | Hypervisor | Image: Vorlage, Container: Instanz |

Kontrollfrage: Was teilt sich ein Container mit dem Host? Antwort: den Kernel. Container teilen den Kernel des Host-Systems, deshalb sind sie so leicht.

### 3. Git-Workflow

*Leitfrage: Wie sieht ein guter Git-Workflow aus?*

Git ist verteilt: Jeder hat das komplette Repository mit Historie lokal. Bei zentralen Systemen liegt alles nur auf dem Server. Neuer Branch, lokal committen, pushen. Dann ein Pull Request: Ein Kollege macht das Review, erst danach wird gemergt. Haben beide dieselbe Zeile geändert, gibt es einen Merge-Konflikt. Du wählst den richtigen Stand, löschst die Marker, dann add und commit. Rebase setzt deine Commits neu auf den aktuellen main. Die Historie wird gerade, ohne Merge-Commit. Ein Pull Request ist die Bitte, einen Branch zu übernehmen. Dort findet das Code-Review statt, bevor gemergt wird.

**Merk dir:** Git ist verteilt: jeder hat das ganze Repository.

```
main    ●──●────────●  merge
            \      /
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
rebase: Commits neu auf main setzen
```

### 4. Lizenzen

*Leitfrage: Welche Lizenzen muss ich kennen?*

Proprietäre Software darfst du nur so nutzen, wie der Lizenzvertrag es erlaubt. Den Quellcode bekommst du nicht. GPL ist Copyleft. Baust du sie in dein Produkt ein und gibst es weiter, muss es auch unter GPL mit Quellcode stehen. MIT und Apache sind permissiv. Kommerziell nutzen ist erlaubt, du musst nur den Lizenzhinweis behalten. MIT und Apache sind freizügige Lizenzen: Du darfst den Code nutzen, auch in proprietärer Software, musst aber den Lizenzhinweis behalten.

**Merk dir:** GPL ist Copyleft: wer weitergibt, muss den Quellcode offenlegen.

| Lizenz | Typ | Folge |
|---|---|---|
| proprietär | Closed Source | nur nutzen laut Vertrag |
| GPL | Copyleft | Weitergabe nur als GPL mit Quellcode |
| MIT | permissiv | fast alles, Hinweis behalten |
| Apache 2.0 | permissiv | wie MIT, plus Patentklausel |

Kontrollfrage: Du verkaufst ein Programm mit fest eingebauter GPL-Bibliothek. Was musst du beachten? Antwort: Weitergabe nur unter GPL mit Quellcode. Copyleft: Abgeleitete Werke müssen bei Weitergabe ebenfalls unter GPL stehen.

### 5. Change, Incident, SLA

*Leitfrage: Change, Incident, SLA, was ist was?*

Change Management: Antrag, Bewertung, Freigabe, Umsetzung, Dokumentation. Ohne Freigabe wird nichts umgesetzt. Incident Management: Eine Störung kommt als Ticket rein und soll schnell behoben werden. Ein SLA ist ein Vertrag über die Servicequalität, etwa Verfügbarkeit und Reaktionszeit. 1st Level nimmt an und löst Einfaches wie ein Passwort. 2nd Level sind Spezialisten. 3rd Level sind Entwickler oder Hersteller. Ein SLA ist die vertragliche Zusage, zum Beispiel 99,5 Prozent Verfügbarkeit oder Antwort auf Störungen innerhalb von vier Stunden.

**Merk dir:** Ohne Freigabe wird kein Change umgesetzt.

```
Change: Antrag, Bewertung, Freigabe,
        Umsetzung, Dokumentation
Incident: Störung, Ticket, schnell lösen
SLA: Vertrag über Leistung, etwa
     Verfügbarkeit und Reaktionszeit

1st Level  Annahme, Passwort zurücksetzen
2nd Level  Spezialisten, tiefere Analyse
3rd Level  Entwickler oder Hersteller
```

### 6. KI und EU AI Act

*Leitfrage: Was regelt der EU AI Act?*

Regelbasiert schreibt ein Mensch die Regeln. Machine Learning lernt Muster aus Trainingsdaten, Testdaten prüfen danach das Ergebnis. Risiken: Bias durch schiefe Daten, Halluzinationen, die sicher klingen und falsch sind, und Datenschutz bei sensiblen Daten. Der EU AI Act hat vier Risikoklassen. Unannehmbar ist verboten, etwa Social Scoring. Hochrisiko wie Bewerberauswahl hat strenge Pflichten. Begrenzt, etwa Chatbot: als KI kennzeichnen. Verbote gelten seit Februar 2025, Hochrisiko-Pflichten nach Verschiebung ab Dezember 2027. Verboten sind etwa Systeme zur Bewertung des sozialen Verhaltens von Menschen. Für Chatbots gilt vor allem: Nutzer müssen wissen, dass sie mit einer KI sprechen.

**Merk dir:** EU AI Act: je höher das Risiko, desto strenger die Pflichten.

```
regelbasiert  Mensch schreibt Regeln
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
minimal      Spamfilter: keine Pflichten
```

### 7. Green IT und IoT

*Leitfrage: Und Green IT?*

Green IT heißt: Geräte länger nutzen, effiziente Hardware und effizienter Code, der weniger Rechenzeit braucht. Im Rechenzentrum zählen Ökostrom, effiziente Kühlung und die Nutzung der Abwärme. Beim Internet der Dinge misst der Sensor, der Aktor handelt, und das Gateway bringt die Daten ins Netz. IoT-Geräte sind oft unsicher: Standardpasswörter, keine Updates, unverschlüsselte Kommunikation. IoT heißt Internet der Dinge: vernetzte Geräte wie Sensoren. Für die Prüfung wichtig sind die Risiken, vor allem schwache Standardpasswörter und fehlende Updates.

**Merk dir:** Green IT: Geräte länger nutzen, effizienter Code, Ökostrom.

```
Green IT
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
         Updates, unverschlüsselt
```

## Zusammenfassung

Also: Continuous Delivery heißt auslieferbar, Deployment heißt automatisch ausgeliefert. Container teilen den Kernel. GPL ist Copyleft.

## Übungsfragen mit Lösung

1. Jede Änderung, die alle Tests besteht, geht ohne menschliche Freigabe automatisch in Produktion. Wie heißt das?
   - Lösung: Continuous Deployment. Continuous Deployment = automatisch live. Bei Continuous Delivery ist der Stand jederzeit auslieferbar, das Release braucht aber eine manuelle Freigabe.
2. In der Pipeline schlagen nach dem Build zwei Unit-Tests fehl. Was passiert?
   - Lösung: Die Pipeline stoppt, es wird nicht deployt und das Team bekommt eine Rückmeldung. Jede Stufe ist ein Qualitätstor. Ist eine Stufe rot, bricht die Pipeline ab und es gibt kein Deployment.
3. Was unterscheidet einen Container von einer virtuellen Maschine?
   - Lösung: Der Container teilt sich den Kernel des Host-Systems und ist dadurch leichtgewichtiger. Container teilen den Host-Kernel, starten in Sekunden und brauchen wenig Speicher. Eine VM hat ein eigenes Gast-Betriebssystem.
4. Was ist ein Docker-Image?
   - Lösung: eine schreibgeschützte Vorlage, aus der Container gestartet werden. Image = Bauplan, unveränderlich. Container = laufende Instanz eines Images. Aus einem Image kannst du viele Container starten.
5. <<<<<<< HEAD  
satz = 0.19  
=======  
satz = 0.07  
>>>>>>> feature  
  
Was ist nach diesem Merge-Konflikt zu tun?
   - Lösung: Richtigen Inhalt festlegen, Konfliktmarker entfernen, dann add und commit. Git kann nicht entscheiden, welche Zeile richtig ist. Du wählst den richtigen Stand, löschst die Marker und schließt den Merge mit add und commit ab.
6. Was kennzeichnet eine verteilte Versionsverwaltung wie Git?
   - Lösung: Jeder Entwickler hat eine vollständige Kopie inklusive Historie und kann lokal committen. Bei zentralen Systemen wie SVN liegt die Historie nur auf dem Server. Bei Git hat jeder das komplette Repository lokal.
7. Die Kanzlei will ein Programm verkaufen und darin eine GPL-lizenzierte Bibliothek fest einbinden. Was folgt daraus?
   - Lösung: Bei Weitergabe muss auch das eigene Programm unter der GPL mit Quellcode weitergegeben werden. GPL = Copyleft. Verkaufen ist erlaubt, aber abgeleitete Werke müssen bei Weitergabe ebenfalls unter GPL mit Quellcode stehen. MIT und Apache sind permissiv.
8. Eine Mitarbeiterin ruft an, weil ihr Passwort abgelaufen ist. Wer löst das typischerweise?
   - Lösung: 1st Level Support. Einfache Standardfälle wie Passwort zurücksetzen erledigt der 1st Level direkt. Komplexes geht an Level 2, Fehler im Code an Level 3.
9. Ein Change-Antrag wurde bewertet (Risiko, Aufwand, Nutzen). Was kommt als Nächstes?
   - Lösung: Freigabe. Reihenfolge: Antrag, Bewertung, Freigabe, Umsetzung, Dokumentation. Ohne Freigabe wird nichts umgesetzt.
10. Eine Firma setzt eine KI ein, die Bewerbungen vorsortiert und Bewerber aussortiert. In welche Risikoklasse fällt das nach dem EU AI Act?
   - Lösung: hohes Risiko. KI in Personalauswahl und Beschäftigung gilt als Hochrisiko-System mit strengen Pflichten (Risikomanagement, Datenqualität, menschliche Aufsicht).
11. Ein smartes Thermostat misst die Raumtemperatur und öffnet daraufhin das Heizungsventil. Was ist das Ventil?
   - Lösung: Aktor. Sensor misst, Aktor handelt. Das Ventil greift aktiv in die Umwelt ein, also Aktor.
12. Welche Maßnahme gehört zu Green IT?
   - Lösung: Ineffiziente Abfragen optimieren, damit Server weniger Rechenzeit brauchen. Effizienter Code spart Rechenzeit und damit Energie. Dazu kommen längere Nutzung der Geräte und effiziente Rechenzentren.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Du sollst für die Rechnungs-App der Kanzlei das Feature PDF-Export entwickeln. Schreiben Sie die Git-Befehle für folgende Schritte: Branch anlegen, Änderungen lokal sichern, hochladen. Beschreiben Sie, wie die Änderung per Pull Request in main kommt und wie Sie einen Merge-Konflikt lösen.

```
git switch -c feature/pdf-export      Branch anlegen
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
4. git add datei, git commit, dann erneut git push
```

### Aufgabe 2

Die Kanzlei möchte auf ihrer Website einen KI-Chatbot einsetzen, der Fragen von Mandanten beantwortet. Erläutern Sie drei Risiken. Ordnen Sie den Chatbot einer Risikoklasse des EU AI Act zu und nennen Sie die daraus folgende Pflicht.

```
Risiken:
1. Halluzination: Das Sprachmodell erfindet plausibel klingende, aber falsche Antworten, zum Beispiel eine nicht existierende Frist. Für eine Kanzlei kann das zu Haftungsproblemen führen.
2. Datenschutz: Mandanten geben personenbezogene Daten und Steuerdaten ein. Werden diese an einen externen KI-Dienst übertragen, müssen DSGVO und Verschwiegenheit gewahrt bleiben (Auftragsverarbeitung, Serverstandort EU).
3. Bias: Verzerrte Trainingsdaten können zu unfairen oder einseitigen Antworten führen.

Einordnung EU AI Act: begrenztes Risiko.
Pflicht: Transparenz. Nutzer müssen erkennen können, dass sie mit einer KI sprechen, also Hinweis bzw. Kennzeichnung im Chatfenster.
```
