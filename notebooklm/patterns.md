# Entwurfsmuster und MVC

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Observer kam schon 3 Mal. Singleton, Factory, Facade, MVC stehen im Katalog.

## Inhalt

### 1. Observer kam schon 3 Mal

Observer kam schon 3 Mal dran. Singleton, Factory, Facade und MVC stehen im Katalog. Entwurfsmuster sind bewährte Lösungen für wiederkehrende Probleme. Du musst sie nicht programmieren, nur erkennen und erklären. In der Prüfung reicht es meist, ein Muster zu erkennen, seinen Zweck zu erklären und ein Klassendiagramm zu skizzieren.

**Merk dir:** Entwurfsmuster sind bewährte Lösungen für wiederkehrende Probleme.

### 2. Singleton

*Leitfrage: Was ist ein Singleton?*

Singleton: Von einer Klasse gibt es genau ein Objekt. Zum Beispiel eine Datenbankverbindung oder ein Logger. Merkmal eins: ein statisches Attribut für die Instanz. Merkmal zwei: ein privater Konstruktor. Niemand außer der Klasse kann Objekte erzeugen. Merkmal drei: die statische Methode getInstanz. Der Konstruktor ist privat, damit niemand von außen ein zweites Objekt erzeugt. Nur die statische Methode getInstance liefert das eine Objekt.

**Merk dir:** Singleton: privater Konstruktor plus statisches getInstance.

```
┌─────────────────────────────┐
│ Datenbankverbindung         │
├─────────────────────────────┤
│ - instanz   (static)        │
├─────────────────────────────┤
│ - Datenbankverbindung()     │
│ + getInstanz()   (static)   │
└─────────────────────────────┘
```

### 3. Observer

*Leitfrage: Und der Observer, der schon dreimal dran war?*

Observer heißt Beobachter. Ein Subjekt hat eine Liste von Beobachtern. Die melden sich selbst an und ab. Ändert sich etwas, ruft das Subjekt bei allen Beobachtern die Methode update auf. Dafür implementiert jeder Beobachter das Interface Observer mit update. Neuer Beleg kommt rein: Anzeige, Logger und Mail werden automatisch informiert. Vorteil: lose Kopplung. Ein Kanzlei-Beispiel: Ändert sich der Status eines Belegs, sollen Dashboard, E-Mail-Benachrichtigung und Protokoll reagieren. Alle drei melden sich als Beobachter an. Der Vorteil: Das Subjekt muss seine Beobachter nicht im Detail kennen. Neue Beobachter kommen dazu, ohne den Code des Subjekts zu ändern.

**Merk dir:** Observer: Subjekt benachrichtigt alle angemeldeten Beobachter.

```
Subjekt, etwa Belegeingang
 + anmelden(o: Observer)
 + abmelden(o: Observer)
 + benachrichtigen()
     ruft bei allen update() auf

«interface» Observer
 + update()

Anzeige, Logger, Mailer
 implementieren Observer
```

Kontrollfrage: Ein neuer Beleg kommt rein. Welche Methode ruft das Subjekt beim Logger auf? Antwort: update(). Das Subjekt benachrichtigt alle Beobachter über update().

### 4. Factory und Facade

*Leitfrage: Was machen Factory und Facade?*

Die Factory erzeugt Objekte für dich. Du sagst nur: PDF-Export bitte. Die konkrete Klasse musst du nicht kennen. Bei der Factory Method entscheidet eine Unterklasse per überschriebener Methode, welche Klasse erzeugt wird. Die Facade ist eine einfache Fassade vor einem komplizierten Subsystem. Ein Aufruf, dahinter laufen zehn Dienste. Die Facade ist wie eine Rezeption: Du sprichst mit einer Stelle, und die erledigt im Hintergrund die Arbeit mit vielen Klassen.

**Merk dir:** Factory erzeugt Objekte, Facade vereinfacht ein Subsystem.

| Muster | Idee | Beispiel |
|---|---|---|
| Factory | erzeugt Objekte, konkrete Klasse egal | erzeugeExport("pdf") |
| Facade | einfache Schnittstelle vor komplexem Subsystem | monatsabschluss() |

### 5. MVC

*Leitfrage: Und MVC?*

MVC trennt eine Anwendung in drei Teile. Das Model enthält Daten und Logik. Die View zeigt an. Der Controller nimmt Benutzereingaben an und steuert Model und View. Vorteil: Trennung der Zuständigkeiten. Du tauschst die Oberfläche, ohne die Logik anzufassen. Das ist Wartbarkeit. Der Vorteil von MVC in der Prüfung: Die Oberfläche lässt sich austauschen, ohne die Logik anzufassen. Eine Web- und eine App-Ansicht nutzen dasselbe Model.

**Merk dir:** MVC: Model Daten, View Anzeige, Controller Steuerung.

| Teil | Aufgabe |
|---|---|
| Model | Daten und Geschäftslogik |
| View | Darstellung, Oberfläche |
| Controller | nimmt Eingaben an, steuert Model und View |

Kontrollfrage: Ein Nutzer klickt auf Speichern. Welcher Teil nimmt den Klick an? Antwort: Controller. Der Controller nimmt Eingaben an und steuert Model und View.

## Zusammenfassung

Also: Singleton genau ein Objekt, mit privatem Konstruktor. Observer: Beobachter melden sich an und werden benachrichtigt. MVC trennt Model, View und Controller.

## Übungsfragen mit Lösung

1. Woran erkennst du ein Singleton?
   - Lösung: privater Konstruktor und statisches getInstanz(). Niemand außer der Klasse kann Objekte erzeugen.
2. Ein Objekt informiert automatisch alle angemeldeten Objekte über Änderungen.
   - Lösung: Observer. Beobachter-Muster.
3. Welche Methode ruft das Subjekt beim Observer typischerweise auf?
   - Lösung: update(). update() bzw. aktualisieren().
4. Welche MVC-Komponente nimmt Benutzereingaben entgegen?
   - Lösung: Controller. Controller steuert.
5. Eine einfache Schnittstelle vor einem komplexen Subsystem heißt:
   - Lösung: Facade. Fassade.
6. Was ist der Hauptvorteil von MVC?
   - Lösung: Trennung von Daten, Darstellung und Steuerung. Bessere Wartbarkeit und Austauschbarkeit.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Erkläre das Observer-Muster in 2 bis 3 Sätzen und nenne ein Beispiel aus einer Kanzlei-Software.

```
Beim Observer-Muster gibt es ein Subjekt, bei dem sich beliebig viele Beobachter an- und abmelden können. Ändert sich der Zustand des Subjekts, ruft es bei allen Beobachtern update() auf. So sind die Klassen lose gekoppelt. Beispiel: Geht ein neuer Beleg ein, werden automatisch die Übersicht aktualisiert, der zuständige Sachbearbeiter per Mail informiert und ein Protokolleintrag geschrieben.
```
