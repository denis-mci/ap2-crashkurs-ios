# REST, HTTP, JSON, Git

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

REST und HTTP kamen in 4 von 9 Prüfungen, oft mit JSON.

## Inhalt

### 1. 4 von 9 Prüfungen

REST und HTTP kamen in 4 von 9 Prüfungen, oft zusammen mit JSON. Klassiker: 401 und 403 verwechseln. Nach diesem Clip nicht mehr. Bei 401 fehlt die Anmeldung oder sie ist ungültig. Bei 403 kennt der Server dich, aber du hast für diese Aktion keine Rechte.

**Merk dir:** 401 heißt nicht angemeldet, 403 heißt nicht berechtigt.

### 2. HTTP-Methoden und CRUD

*Leitfrage: Welche HTTP-Methoden gibt es und wofür?*

REST nutzt HTTP-Methoden für die vier Grundoperationen. GET liest. POST legt neu an. PUT ersetzt komplett, PATCH ändert nur teilweise. DELETE löscht. Die Ressource steht in der URL, zum Beispiel Mandanten Schrägstrich 4. Eine Ressource ist ein Ding mit eigener Adresse, zum Beispiel Schrägstrich mandanten Schrägstrich 42. Die Methode sagt, was du mit dem Ding machst. GET verändert nie Daten. Das ist eine wichtige Eigenschaft und wird gern abgefragt.

**Merk dir:** GET liest, POST legt an, PUT ersetzt, PATCH ändert teilweise, DELETE löscht.

| Methode | CRUD | Beispiel |
|---|---|---|
| GET | Read | GET /mandanten/4 |
| POST | Create | POST /mandanten |
| PUT | Update komplett | PUT /mandanten/4 |
| PATCH | Update teilweise | PATCH /mandanten/4 |
| DELETE | Delete | DELETE /mandanten/4 |

### 3. Statuscodes

*Leitfrage: Und die Statuscodes? 401 und 403 verwechsle ich immer.*

Zweihunderter heißt Erfolg. 200 okay, 201 angelegt, typisch nach POST. 204 okay, aber keine Daten. Vierhunderter: Der Client hat einen Fehler gemacht. 400 falsche Anfrage, 401 nicht angemeldet. 403: angemeldet, aber keine Rechte. 404: gibt es nicht. Fünfhunderter: Der Fehler liegt auf dem Server. Die Fünfhunderter bedeuten: Der Server hat einen Fehler gemacht. 500 ist ein interner Serverfehler, 503 heißt, der Dienst ist gerade nicht erreichbar. 404 heißt: Die Ressource gibt es nicht. Das ist ein Clientfehler, weil der Client etwas angefragt hat, das nicht existiert.

**Merk dir:** 2xx Erfolg, 4xx Fehler beim Client, 5xx Fehler beim Server.

```
2xx  Erfolg
 200 OK
 201 Created, nach POST
 204 No Content

4xx  Fehler beim Client
 400 Bad Request
 401 Unauthorized: nicht angemeldet
 403 Forbidden: keine Rechte
 404 Not Found

5xx  Fehler beim Server
 500 Internal Server Error
```

Kontrollfrage: Du bist eingeloggt, darfst die Akte aber nicht öffnen. Welcher Code? Antwort: 403. 401 heißt nicht angemeldet, 403 angemeldet ohne Rechte.

### 4. REST-Prinzipien

*Leitfrage: Was macht eine Schnittstelle zu einer REST-Schnittstelle?*

Zustandslos: Der Server merkt sich nichts zwischen Anfragen. Jede Anfrage bringt alles mit, zum Beispiel ein Token. Ressourcen haben eindeutige URLs. Die Schnittstelle ist einheitlich, über die HTTP-Methoden. Daten fließen meist als JSON. Client und Server sind getrennt. Zustandslos macht REST gut skalierbar: Jeder Server kann jede Anfrage beantworten, weil er sich nichts merken muss.

**Merk dir:** REST ist zustandslos: jede Anfrage bringt alles mit.

- Zustandslos: jede Anfrage bringt alles mit, etwa Token
- Ressourcen über eindeutige URLs
- Einheitliche Schnittstelle über HTTP-Methoden
- Daten meist als JSON
- Client und Server getrennt

### 5. JSON, XML, CSV

*Leitfrage: JSON, XML, CSV. Wie unterscheiden die sich?*

JSON: Geschweifte Klammern für Objekte. Schlüssel stehen in Anführungszeichen. Eckige Klammern für Listen. Hier die Liste der Aufträge. XML arbeitet mit Tags. Gut per Schema validierbar, aber mehr Text. CSV ist eine einfache Tabelle mit Trennzeichen. Gut für Excel, aber ohne Verschachtelung. In JSON gibt es Zeichenketten, Zahlen, true, false, null, Objekte und Listen. Ein Datum gibt es nicht als eigenen Typ, das schreibt man als Text.

**Merk dir:** JSON: geschweifte Klammern Objekt, eckige Klammern Liste.

```
JSON:
{ "id": 4, "name": "Café Rhön",
  "auftraege": [
    {"art": "Lohn"}, {"art": "Steuer"} ] }

XML:
<mandant id="4">
  <name>Café Rhön</name></mandant>

CSV:
id;name;ort
4;Café Rhön;Fulda
```

Kontrollfrage: Woran erkennst du in JSON eine Liste? Antwort: eckige Klammern. Eckige Klammern stehen für ein Array, geschweifte für ein Objekt.

### 6. Git in 6 Befehlen

*Leitfrage: Und Git in Kurzform?*

Clone holt ein Repository. Add merkt Änderungen vor. Commit speichert den Stand lokal. Push und Pull synchronisieren mit dem Server. Branch legt einen Zweig an, Merge führt zusammen. Vorteile: Versionierung, paralleles Arbeiten, Nachvollziehbarkeit. Pull holt Änderungen vom Server und führt sie zusammen. Gibt es dabei Widersprüche, entsteht ein Merge-Konflikt, den du von Hand auflöst.

**Merk dir:** Commit speichert lokal, Push lädt auf den Server.

```
git clone <url>       Repo holen
git add datei.py      vormerken
git commit -m "..."   lokal speichern
git push / git pull   hoch, runter
git branch feature-x  Zweig anlegen
git merge feature-x   zusammenführen
```

## Zusammenfassung

Merke: GET liest, POST legt an, PUT ersetzt, PATCH ändert teilweise, DELETE löscht. 401 heißt nicht angemeldet, 403 heißt angemeldet, aber nicht berechtigt.

## Übungsfragen mit Lösung

1. Mit welcher HTTP-Methode legst du per REST einen neuen Datensatz an?
   - Lösung: POST. POST = Create.
2. Welcher Statuscode bedeutet "angemeldet, aber keine Berechtigung"?
   - Lösung: 403. 401 = nicht angemeldet, 403 = keine Rechte.
3. Welcher Statuscode kommt typisch nach erfolgreichem POST?
   - Lösung: 201. 201 Created.
4. Was heißt "REST ist zustandslos"?
   - Lösung: Jede Anfrage enthält alle nötigen Infos. Keine Sitzung auf dem Server zwischen Anfragen.
5. Woran erkennst du eine Liste in JSON?
   - Lösung: [ ]. Eckige Klammern = Array.
6. Welcher git-Befehl speichert einen Stand lokal?
   - Lösung: git commit. commit lokal, push zum Server.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Schreibe ein JSON-Objekt für einen Mandanten mit id 7, name "Autohaus Ruf", ort "Erfurt" und einer Liste von zwei Aufträgen (art "Prüfung" und "Steuer").

```
{
  "id": 7,
  "name": "Autohaus Ruf",
  "ort": "Erfurt",
  "auftraege": [
    { "art": "Prüfung" },
    { "art": "Steuer" }
  ]
}
```
