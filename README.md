# AP2 Crashkurs

Lern-App (native iOS-App und Web-Version) für die schriftliche IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung, plus WiSo (Termin 25.11.2026).

## Was die App kann

- 32 Lektionen (GA1, GA2, WiSo), sortiert nach Prüfungsrelevanz
- Pro Lektion: Erklärclip mit Sprachausgabe, Quiz zum Clip, Schreibaufgabe mit Stichwortprüfung und Musterlösung
- Wiederholen nach Leitner-Prinzip (1, 3, 6 Tage)
- Prüfungsmodus mit Zeitdruck und Bestehens-Rechner
- Fortschritt lokal auf dem Gerät

## Web-Version (ohne iOS, für alle Geräte)

Läuft im Browser auf iPhone, Android und PC: **https://denis-mci.github.io/ap2-crashkurs-ios/**

- Auf dem Handy: Seite öffnen, Teilen → „Zum Home-Bildschirm“, dann startet sie wie eine App.
- Fortschritt wird lokal im Browser gespeichert (pro Gerät, kein Konto nötig).
- Quellcode in `web/src`, Build mit `python3 web/build.py`. Jeder Push auf `web/**` veröffentlicht automatisch über GitHub Pages.

## Build iOS

Kein Mac nötig. Jeder Push auf `main` baut über GitHub Actions (macOS-Runner) eine unsignierte IPA und legt sie unter Releases → `latest` ab.

Lokal mit Mac: `brew install xcodegen && xcodegen generate`, dann `AP2Crashkurs.xcodeproj` öffnen.

## Installation aufs iPhone (ohne Mac)

1. SideStore einmalig per Windows-PC einrichten (Anleitung: sidestore.io)
2. Auf dem iPhone in Safari Releases → `latest` → `AP2Crashkurs.ipa` herunterladen
3. In SideStore unter „My Apps“ auf „+“ tippen und die IPA aus „Dateien“ wählen

SideStore erneuert die 7-Tage-Signatur danach selbst.

## Inhalte

`App/Resources/lessons.json`, Quelle der Inhalte ist die Web-Version des Crashkurses.
