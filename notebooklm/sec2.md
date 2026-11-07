# IT-Sicherheit 2: Login, OAuth, SSO, Zertifikate, Backup

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

Login-Konzepte, Zertifikate und Backups tauchen in GA1 und GA2 immer wieder auf, oft als Pseudocode oder Fallbeispiel.

## Inhalt

### 1. Login bis Backup

Login-Konzepte, Zertifikate und Backups tauchen in GA1 und GA2 immer wieder auf, oft als Pseudocode oder Fall. Typischer Fehler: Authentifizierung und Autorisierung verwechseln. Und beim Restore die falschen Sicherungen nennen. Dieses Thema verbindet Theorie und Code. Oft sollst du einen Login-Ablauf beschreiben und danach einen Teil in Pseudocode umsetzen.

**Merk dir:** Authentifizierung: wer bist du. Autorisierung: was darfst du.

### 2. Wer bist du, was darfst du?

*Leitfrage: Authentifizierung und Autorisierung, wo ist der Unterschied?*

Authentifizierung prüft, wer du bist. Autorisierung prüft danach, was du darfst. Die drei Faktoren: Wissen wie ein Passwort, Besitz wie ein Handy oder Token, Inhärenz, also Sein, wie der Fingerabdruck. Multi-Faktor heißt mindestens zwei verschiedene Faktoren. Passwort plus PIN sind zweimal Wissen, also keine echte MFA. Least Privilege: Jeder bekommt nur die Rechte, die er braucht, geregelt über ein Rollen- und Berechtigungskonzept. Zwei Passwörter sind keine Zwei-Faktor-Authentifizierung, denn beides ist Wissen. Echte Mehrfaktor-Authentifizierung braucht zwei verschiedene Kategorien.

**Merk dir:** Wissen, Besitz, Inhärenz. MFA kombiniert zwei davon.

| Begriff | Bedeutung |
|---|---|
| Authentifizierung | Wer bist du? Identität prüfen |
| Autorisierung | Was darfst du? Rechte prüfen |
| Faktoren | Wissen, Besitz, Inhärenz |
| MFA | mindestens 2 verschiedene Faktoren |
| Least Privilege | nur die nötigsten Rechte |

Kontrollfrage: Ist Passwort plus Sicherheitsfrage eine Multi-Faktor-Authentifizierung? Antwort: Nein, beides ist Wissen. MFA braucht verschiedene Faktoren, etwa Wissen plus Besitz.

### 3. OAuth 2.0, OIDC und SSO

*Leitfrage: OAuth, OIDC, SSO. Das sind viele Abkürzungen.*

OAuth 2 hat vier Rollen. Resource Owner ist der Nutzer, Client die App. Der Authorization Server stellt Tokens aus, der Resource Server hat Daten. Der Client schickt dich zum Login, dort meldest du dich an, und der Client bekommt ein Access Token. Dein Passwort sieht er nie. Läuft das Access Token ab, holt das Refresh Token ein neues. OpenID Connect ergänzt ein ID-Token mit der Identität des Nutzers. Single Sign-on: einmal anmelden, überall drin. Bequem und zentral verwaltet, aber ein Single Point of Failure. Bei Anmelden mit Google gibt dir OpenID Connect die Identität. Mit OAuth erlaubst du einer App, auf bestimmte Daten zuzugreifen, ohne ihr dein Passwort zu geben. Single Sign-on heißt: einmal anmelden, viele Anwendungen nutzen. Bequem, aber das eine Konto muss dann besonders gut geschützt sein.

**Merk dir:** OAuth regelt Zugriff, OpenID Connect die Anmeldung.

```
Resource Owner: Nutzer, gibt frei
Client: App, will Zugriff
Authorization Server: Login, Tokens
Resource Server: API mit Daten

1 Client leitet zum Login weiter
2 Nutzer meldet sich dort an
3 Client bekommt Access Token
4 Client ruft API mit Token auf
Client sieht nie das Passwort
Refresh Token: neuen Access Token
OIDC: plus ID-Token, wer ist das?
SSO: einmal anmelden, überall drin
```

### 4. PKI und Zertifikate

*Leitfrage: Wie funktionieren Zertifikate?*

Ein Zertifikat enthält öffentlichen Schlüssel, Inhaber, Gültigkeit und die Signatur der Zertifizierungsstelle. Den privaten Schlüssel nie. Vertrauen läuft über eine Kette: Root-CA, Zwischen-CA, Serverzertifikat. Die Root-Zertifikate liegen im Browser und im Betriebssystem. Gestohlene Zertifikate werden gesperrt, über Sperrlisten oder OCSP. Beim TLS-Handshake schickt der Server sein Zertifikat, der Client prüft es. Dann Sitzungsschlüssel aushandeln und symmetrisch weiter. Der Browser vertraut einer Handvoll Wurzelzertifikaten. Von dort aus wird die Kette bis zum Zertifikat der Website geprüft. Ist ein Glied ungültig, kommt die Warnung.

**Merk dir:** Ein Zertifikat enthält nie den privaten Schlüssel.

```
Zertifikat enthält:
 öffentlichen Schlüssel, Inhaber,
 Gültigkeit, Aussteller,
 Signatur der CA
Kette: Root-CA, Zwischen-CA, Server
Root-Zertifikate liegen in Browser
 und Betriebssystem
Sperrung: Sperrliste CRL oder OCSP
TLS grob:
 1 Client Hello
 2 Server schickt Zertifikat
 3 Client prüft Kette und Gültigkeit
 4 Sitzungsschlüssel aushandeln
 5 symmetrisch verschlüsselt weiter
```

### 5. Hash, Salt und E-Mail

*Leitfrage: Hash und Salt, wozu brauche ich das?*

Ein Hash ist eine Einwegfunktion mit fester Länge und kollisionsresistent. Gleicher Hash heißt unverändert, so prüfst du Integrität. Passwörter hashst du mit Salt, einem Zufallswert pro Nutzer. Gleiche Passwörter ergeben so verschiedene Hashes. Pepper: geheim, nie in der Datenbank. Nimm absichtlich langsame Verfahren wie bcrypt oder Argon2, nicht MD5. Das bremst Brute Force. Mail: S MIME nutzt Zertifikate einer CA, PGP das Web of Trust. SPF nennt erlaubte Server, DKIM signiert, DMARC regelt den Fehlschlag. Das Salt ist für jedes Passwort zufällig und anders. So haben zwei gleiche Passwörter trotzdem unterschiedliche Hashes, und vorberechnete Tabellen nützen Angreifern nichts.

**Merk dir:** Passwörter mit Salt hashen, nie verschlüsseln oder im Klartext.

```
Hash: Einweg, feste Länge,
 kollisionsresistent
Passwort: Hash aus Passwort und Salt
 Salt: zufällig, pro Nutzer, in DB
 Pepper: geheim, nicht in der DB
 langsam: bcrypt, Argon2, nicht MD5
Integrität: Hashwerte vergleichen
S/MIME: Zertifikate einer CA
PGP: Web of Trust
SPF: welche Server dürfen senden
DKIM: Signatur im Mail-Header
DMARC: Regel bei Fehlschlag
```

### 6. OWASP und Schutzbedarf

*Leitfrage: Was ist OWASP?*

XSS: Fremdes Script läuft in deiner Seite, also Ausgaben escapen. Bei CSRF löst eine fremde Seite eine Aktion aus, dagegen hilft ein CSRF-Token. Broken Access Control: Ein Nutzer ändert eine ID in der URL und sieht fremde Daten. Rechte immer auf dem Server prüfen. Das BSI teilt den Schutzbedarf in normal, hoch und sehr hoch ein. Security by Design heißt: Sicherheit von Anfang an mitplanen. Den Schutzbedarf stufst du meist in normal, hoch und sehr hoch ein. Mandantendaten einer Steuerkanzlei haben mindestens hohen Schutzbedarf.

**Merk dir:** CSRF-Token gegen CSRF, Escapen gegen XSS.

| Problem | Gegenmaßnahme |
|---|---|
| XSS: fremdes Script läuft | Ausgaben escapen, CSP |
| CSRF: fremde Seite löst Aktion aus | CSRF-Token, SameSite-Cookie |
| Broken Access Control | Rechte serverseitig prüfen |
| Schutzbedarf nach BSI | normal, hoch, sehr hoch |
| Security by Design | Sicherheit von Anfang an |

### 7. Backup richtig

*Leitfrage: Und wie mache ich Backups richtig?*

Voll sichert alles. Inkrementell nur, was seit der letzten Sicherung neu ist. Restore: Vollsicherung plus alle Inkremente in Reihenfolge. Differenziell sichert alles seit der letzten Vollsicherung. Restore: Vollsicherung plus nur die letzte Differenz. Die Drei zwei eins Regel: 3 Kopien, auf 2 verschiedenen Medien, eine davon außer Haus. Backup dient der Wiederherstellung nach Verlust. Archivierung bewahrt Daten langfristig und unveränderbar auf, etwa wegen Aufbewahrungspflichten. Für den Restore bei differenzieller Sicherung brauchst du nur die Vollsicherung plus die letzte differenzielle. Das ist schneller als inkrementell, aber die Sicherungen werden größer.

**Merk dir:** Inkrementell: seit letzter Sicherung. Differenziell: seit letzter Vollsicherung.

| Art | sichert | Restore braucht |
|---|---|---|
| Voll | alles | nur die Vollsicherung |
| Inkrementell | seit letzter Sicherung | Voll plus alle Inkremente |
| Differenziell | seit letzter Vollsicherung | Voll plus letzte Differenz |
| 3-2-1 | 3 Kopien, 2 Medien | 1 Kopie extern |
| Archiv | langfristig, unveränderbar | Aufbewahrungspflichten |

Kontrollfrage: Vollsicherung Sonntag, differenziell Montag bis Donnerstag, Crash am Freitag. Was brauchst du? Antwort: Voll plus Donnerstag. Die letzte Differenz enthält alle Änderungen seit der Vollsicherung.

## Zusammenfassung

Also: Authentifizierung prüft, wer du bist, Autorisierung, was du darfst. Passwörter mit Salt hashen. Backup: drei Kopien, zwei Medien, eine außer Haus.

## Übungsfragen mit Lösung

1. Ein Nutzer ist angemeldet. Das System prüft nun, ob er die Lohnakten öffnen darf. Was passiert hier?
   - Lösung: Autorisierung. Authentifizierung = Wer bist du? Autorisierung = Was darfst du?
2. Anmeldung mit Passwort und Fingerabdruck. Welche Faktoren werden kombiniert?
   - Lösung: Wissen und Inhärenz. Passwort = Wissen, Fingerabdruck = Inhärenz (Sein).
3. Was bedeutet Least Privilege?
   - Lösung: Jeder bekommt nur die Rechte, die er für seine Aufgabe braucht. Prinzip der minimalen Rechte, umgesetzt über ein Rollen- und Berechtigungskonzept.
4. Wer stellt bei OAuth 2.0 die Access Tokens aus?
   - Lösung: Authorization Server. Der Authorization Server authentifiziert den Nutzer und stellt die Tokens aus. Der Resource Server prüft sie.
5. Was ergänzt OpenID Connect (OIDC) gegenüber OAuth 2.0?
   - Lösung: Informationen zur Identität des Nutzers über ein ID-Token. OAuth regelt Zugriff (Autorisierung), OIDC ergänzt die Anmeldung (Authentifizierung).
6. Was ist ein typischer Nachteil von Single Sign-on?
   - Lösung: Single Point of Failure: Fällt der Anmeldedienst aus oder wird das Konto gekapert, ist alles betroffen. Vorteile: ein Login, weniger Passwörter, zentrale Verwaltung. Nachteil: ein zentraler Angriffs- und Ausfallpunkt.
7. Was enthält ein Zertifikat NICHT?
   - Lösung: den privaten Schlüssel des Inhabers. Der private Schlüssel verlässt nie den Inhaber. Das Zertifikat enthält Schlüssel, Inhaber, Gültigkeit und die Signatur der CA.
8. Warum speichert man Passwörter mit Salt?
   - Lösung: damit gleiche Passwörter unterschiedliche Hashes ergeben und vorberechnete Tabellen nutzlos sind. Salt = Zufallswert pro Nutzer. Rainbow Tables helfen dann nicht mehr.
9. Vollsicherung am Sonntag, inkrementelle Sicherungen Montag bis Donnerstag. Freitag früh fällt der Server aus. Was brauchst du zur Wiederherstellung?
   - Lösung: Vollsicherung plus alle Sicherungen von Montag bis Donnerstag. Inkrementell sichert nur seit der letzten Sicherung, also wird jede Teilsicherung gebraucht, in der richtigen Reihenfolge.
10. Gleiche Situation, aber differenzielle Sicherungen Montag bis Donnerstag. Was brauchst du?
   - Lösung: Vollsicherung plus Donnerstag. Differenziell sichert alles seit der letzten Vollsicherung, die letzte Differenz enthält also alle Änderungen.
11. Welcher DNS-Eintrag legt fest, welche Mailserver für eine Domain E-Mails versenden dürfen?
   - Lösung: SPF. SPF = erlaubte Server. DKIM = Signatur. DMARC = Regel, was bei Fehlschlag passiert, plus Berichte.
12. Eine fremde Webseite löst im Browser des angemeldeten Nutzers unbemerkt eine Überweisung aus. Welche Gegenmaßnahme hilft gegen diesen CSRF-Angriff?
   - Lösung: CSRF-Token im Formular. Der Server akzeptiert nur Anfragen mit dem geheimen, zufälligen Token aus dem eigenen Formular.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Schreiben Sie Pseudocode für eine Funktion pruefeLogin(benutzername, passwort). Sie holt den Nutzer mit gespeichertem Salt und Hash aus der Datenbank, prüft das eingegebene Passwort und sperrt das Konto nach 5 Fehlversuchen. Rückgabe: wahr oder falsch.

```
funktion pruefeLogin(benutzername, passwort)
  nutzer = db.holeNutzer(benutzername)
  falls nutzer == null oder nutzer.gesperrt dann
    rückgabe falsch
  ende falls
  hash = argon2(passwort, nutzer.salt)
  falls hash == nutzer.hash dann
    nutzer.fehlversuche = 0
    db.speichere(nutzer)
    rückgabe wahr
  sonst
    nutzer.fehlversuche = nutzer.fehlversuche + 1
    falls nutzer.fehlversuche >= 5 dann
      nutzer.gesperrt = wahr
    ende falls
    db.speichere(nutzer)
    rückgabe falsch
  ende falls
ende funktion
```

### Aufgabe 2

Die Kanzlei sichert ihren Fileserver jeden Sonntag voll. Erläutern Sie den Unterschied zwischen inkrementeller und differenzieller Sicherung, geben Sie jeweils an, welche Sicherungen bei einem Ausfall am Freitag benötigt werden, und erklären Sie die 3-2-1-Regel.

```
Inkrementell: sichert nur die Änderungen seit der letzten Sicherung (egal ob voll oder inkrementell). Schnell und platzsparend, aber aufwendige Wiederherstellung.
Wiederherstellung am Freitag: Vollsicherung vom Sonntag plus alle inkrementellen Sicherungen von Montag bis Donnerstag in der richtigen Reihenfolge.

Differenziell: sichert alle Änderungen seit der letzten Vollsicherung. Die Sicherungen wachsen täglich, dafür ist die Wiederherstellung einfach.
Wiederherstellung am Freitag: Vollsicherung vom Sonntag plus die letzte Differenzsicherung vom Donnerstag.

3-2-1-Regel: 3 Kopien der Daten, auf 2 verschiedenen Medien, davon 1 Kopie außer Haus (extern, idealerweise offline), damit Brand, Diebstahl oder Ransomware nicht alle Kopien treffen.
```
