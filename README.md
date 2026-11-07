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

## Sicherheit (Web-Version)

- Strenge Content-Security-Policy: Inline-Skripte nur per SHA-256-Hash (wird beim Build berechnet), keine fremden Skript-CDNs. Erlaubt sind nur die eigene Domain und Googles Anmeldedienst.
- Firebase-SDK liegt selbst gehostet unter `web/vendor/firebase` (Version 10.12.2 aus npm), nicht per CDN.
- Sync per Google-Login (optional, `web/src/firebase-config.js`): Jede Person liest und schreibt nur ihr eigenes Dokument `progress/{uid}`. Firestore-Regeln:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /progress/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if request.auth != null && request.auth.uid == uid
        && request.resource.data.keys().hasOnly(['json', 'updatedAt'])
        && request.resource.data.json is string
        && request.resource.data.json.size() < 300000
        && request.resource.data.updatedAt is number;
    }
  }
}
```

- Importierte oder synchronisierte Fortschrittsdaten werden vor dem Übernehmen geprüft (Größe, Typen, bekannte Felder).
- GitHub Actions: TTS-Schlüssel nur im Vertonungsschritt als Umgebungsvariable, Dependabot hält die Actions aktuell.
