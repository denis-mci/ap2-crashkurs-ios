# IT-Sicherheit und Datenschutz

> Quelle für NotebookLM. Thema der IHK-Abschlussprüfung Teil 2, Fachinformatiker Anwendungsentwicklung (Prüfungskatalog 2025), Bereich GA1 Planen.

**Prompt für die Video- oder Audio-Übersicht:** Erkläre dieses Thema für einen Prüfling, der am 25.11.2026 die schriftliche AP2 schreibt. Schnell, klar, mit einem durchgehenden Praxisbeispiel aus einer Steuerberatungskanzlei. Betone typische Prüfungsfehler und zeige, wie eine volle-Punkte-Antwort aussieht. Maximal 8 Minuten.

## Warum prüfungsrelevant

IT-Sicherheit kam in fast jeder zweiten Prüfung. In einer Kanzlei bist du da eh Profi.

## Inhalt

### 1. Fast jede zweite Prüfung

IT-Sicherheit kam in fast jeder zweiten Prüfung. In der Kanzlei bist du da eh Profi. Typischer Fehler: öffentlichen und privaten Schlüssel vertauschen. Heute nicht. Und für die Kanzlei gilt zusätzlich die Schweigepflicht. IT-Sicherheit schützt hier nicht nur Daten, sondern auch das Vertrauen der Mandanten.

**Merk dir:** Verschlüsseln mit dem öffentlichen Schlüssel des Empfängers.

### 2. Die 3 Schutzziele

*Leitfrage: Was sind die Schutzziele?*

Vertraulichkeit: Nur Befugte dürfen Daten lesen. Zum Beispiel durch Verschlüsselung. Integrität: Daten sind nicht unbemerkt verändert. Zum Beispiel durch Hashwerte. Verfügbarkeit: Systeme sind da, wenn man sie braucht. Dafür sorgen Backups und Redundanz. Dazu kommen oft noch Authentizität und Verbindlichkeit. Manchmal wird noch Authentizität ergänzt, also die Echtheit eines Absenders. Die drei Grundschutzziele bleiben aber Vertraulichkeit, Integrität und Verfügbarkeit. Ordne in der Prüfung jede Maßnahme einem Schutzziel zu. Backup schützt Verfügbarkeit, Verschlüsselung Vertraulichkeit, Hash Integrität.

**Merk dir:** Vertraulichkeit, Integrität, Verfügbarkeit.

| Schutzziel | Frage | Maßnahme |
|---|---|---|
| Vertraulichkeit | Nur Befugte lesen? | Verschlüsselung, Rechte |
| Integrität | Unverändert? | Hash, Signatur |
| Verfügbarkeit | Erreichbar, wenn nötig? | Backup, RAID, USV |

### 3. Symmetrisch vs. asymmetrisch

*Leitfrage: Verschlüsselung: symmetrisch oder asymmetrisch, was ist der Unterschied?*

Symmetrisch heißt: ein gemeinsamer Schlüssel. Asymmetrisch: ein Schlüsselpaar aus öffentlich und privat. Symmetrisch ist schnell, aber wie tauscht man den Schlüssel sicher aus? Asymmetrisch ist langsamer. Beispiele: AES ist symmetrisch, RSA asymmetrisch. Asymmetrisch verschlüsselst du mit dem öffentlichen Schlüssel des Empfängers. Nur sein privater Schlüssel entschlüsselt. Beim asymmetrischen Verfahren verschlüsselt der Absender mit dem öffentlichen Schlüssel des Empfängers. Nur der Empfänger kann mit seinem privaten Schlüssel entschlüsseln.

**Merk dir:** Symmetrisch ist schnell, asymmetrisch löst den Schlüsseltausch.

|  | Symmetrisch | Asymmetrisch |
|---|---|---|
| Schlüssel | 1 gemeinsamer | Paar: öffentlich und privat |
| Tempo | schnell | langsam |
| Problem | Schlüsselaustausch | Vertrauen in öffentlichen Schlüssel |
| Beispiel | AES | RSA |

Kontrollfrage: Du willst Bob eine geheime Nachricht schicken. Womit verschlüsselst du? Antwort: mit Bobs öffentlichem Schlüssel. Nur Bobs privater Schlüssel kann sie dann entschlüsseln.

### 4. Hybrid, Hash, Signatur

*Leitfrage: Und wie macht HTTPS das in der Praxis?*

HTTPS ist hybrid. Asymmetrisch wird ein Sitzungsschlüssel ausgehandelt und der Server per Zertifikat geprüft. Dann symmetrisch und schnell. Ein Hash ist eine Einwegfunktion. Passwörter speicherst du nur gehasht mit Salt, zum Beispiel mit bcrypt oder Argon2. Digitale Signatur: Der Absender signiert den Hash mit seinem privaten Schlüssel. Prüfen kann jeder mit dem öffentlichen Schlüssel des Absenders. Das sichert Integrität, Authentizität und Nichtabstreitbarkeit. Bei der Signatur ist es umgekehrt: Der Absender signiert mit seinem privaten Schlüssel, und jeder prüft mit dem öffentlichen Schlüssel des Absenders. Signiert wird übrigens nicht die ganze Nachricht, sondern ihr Hashwert. Das ist schneller und beweist trotzdem, dass nichts verändert wurde.

**Merk dir:** HTTPS ist hybrid. Signieren mit dem eigenen privaten Schlüssel.

```
HTTPS ist hybrid:
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
 Nichtabstreitbarkeit
```

### 5. Angriffe und Schutz

*Leitfrage: Welche Angriffe muss ich kennen?*

SQL-Injection stoppst du mit Prepared Statements. Gegen Cross Site Scripting: Ausgaben escapen. Man in the Middle: TLS und Zertifikate prüfen. Phishing und Social Engineering: Mitarbeiter schulen und Multi-Faktor-Authentifizierung. Ransomware: Offline-Backups und Updates. Social Engineering greift den Menschen an, nicht die Technik. Dagegen helfen vor allem Schulungen und klare Regeln, etwa nie Passwörter am Telefon herausgeben.

**Merk dir:** Prepared Statements gegen Injection, Escapen gegen XSS.

| Angriff | Schutz |
|---|---|
| SQL-Injection | Prepared Statements |
| XSS | Ausgaben escapen |
| Man-in-the-Middle | TLS, Zertifikate prüfen |
| Phishing | Schulung, MFA |
| Ransomware | Offline-Backups, Updates |

### 6. DSGVO: das Wichtigste

*Leitfrage: Was ist das Wichtigste an der DSGVO?*

Die DSGVO schützt personenbezogene Daten. Also alles, was sich auf eine identifizierbare Person bezieht. Grundsätze: Zweckbindung, Speicherbegrenzung und Datenminimierung, also nur so viele Daten wie nötig. Betroffene haben Rechte auf Auskunft, Berichtigung und Löschung. Eine Datenpanne meldest du unverzüglich, möglichst binnen 72 Stunden. Keine Meldung nur, wenn voraussichtlich kein Risiko besteht. Und wer Daten für andere verarbeitet, braucht einen AV-Vertrag. Betroffene haben Rechte, zum Beispiel auf Auskunft, Berichtigung und Löschung. Und eine Datenpanne muss innerhalb von 72 Stunden der Aufsichtsbehörde gemeldet werden.

**Merk dir:** Zweckbindung, Datenminimierung, Speicherbegrenzung.

- Personenbezogen: Infos zu identifizierbarer Person
- Zweckbindung, Datenminimierung, Speicherbegrenzung
- Rechte: Auskunft, Berichtigung, Löschung
- Datenpanne: unverzüglich, möglichst binnen 72 Stunden
- Auftragsverarbeitung braucht AV-Vertrag

### 7. TOM: technisch oder organisatorisch?

*Leitfrage: Und was sind TOM?*

TOM heißt technische und organisatorische Maßnahmen. Technisch ist zum Beispiel BitLocker, organisatorisch das Berechtigungskonzept. Multi-Faktor ist technisch. Schulungen sind organisatorisch. Firewall, Backups und Protokollierung: technisch. Aufgeräumter Schreibtisch und Verschwiegenheit: organisatorisch. Faustregel: Kann man es installieren oder einschalten, ist es technisch. Ist es eine Regel, Schulung oder Zuständigkeit, ist es organisatorisch.

**Merk dir:** BitLocker ist technisch, Schulung ist organisatorisch.

| Technisch | Organisatorisch |
|---|---|
| Verschlüsselung, BitLocker | Berechtigungskonzept |
| MFA, Passwortrichtlinie | Schulungen |
| Firewall, Backups | Clean-Desk-Policy |
| Protokollierung | Verpflichtung auf Vertraulichkeit |

Kontrollfrage: Die Kanzlei führt eine Clean-Desk-Policy ein. Was für eine Maßnahme ist das? Antwort: organisatorisch. Eine Regel für Menschen, keine Technik: organisatorisch.

## Zusammenfassung

Merke: Vertraulichkeit, Integrität, Verfügbarkeit. Verschlüsselt wird mit dem öffentlichen Schlüssel des Empfängers, signiert mit dem eigenen privaten Schlüssel. HTTPS ist hybrid.

## Übungsfragen mit Lösung

1. Ein Backup schützt vor allem welches Schutzziel?
   - Lösung: Verfügbarkeit. Daten bleiben verfügbar, auch nach Ausfall.
2. Womit verschlüsselt man eine Nachricht an Bob asymmetrisch?
   - Lösung: Bobs öffentlichem Schlüssel. Nur Bobs privater Schlüssel kann dann entschlüsseln.
3. Womit erstellt der Absender eine digitale Signatur?
   - Lösung: seinem privaten Schlüssel. Prüfen kann jeder mit dem öffentlichen Schlüssel des Absenders.
4. Warum ist HTTPS hybrid?
   - Lösung: asymmetrisch für Schlüsselaustausch, symmetrisch für Daten. Kombiniert Sicherheit beim Austausch mit Geschwindigkeit.
5. In wie vielen Stunden muss eine Datenpanne gemeldet werden?
   - Lösung: 72. Art. 33 DSGVO: binnen 72 Stunden an die Aufsichtsbehörde.
6. Wie speichert man Passwörter richtig?
   - Lösung: gehasht mit Salt. Hash plus Salt, z. B. bcrypt oder Argon2.
7. "Nur so viele Daten erheben wie nötig." Welcher DSGVO-Grundsatz?
   - Lösung: Datenminimierung. Datenminimierung.
8. Ist eine Schulung der Mitarbeiter eine technische oder organisatorische Maßnahme?
   - Lösung: organisatorisch. Organisatorisch.

## Schreibaufgaben mit Musterlösung

### Aufgabe 1

Eure Kanzlei will Mandanten-Dokumente in einem Webportal bereitstellen. Nenne 4 Maßnahmen zur IT-Sicherheit und ordne jede einem Schutzziel zu.

```
1. TLS-Verschlüsselung (HTTPS): Vertraulichkeit.
2. Multi-Faktor-Authentifizierung: Vertraulichkeit / Authentizität.
3. Rollen- und Berechtigungskonzept, jeder Mandant sieht nur seine Dokumente: Vertraulichkeit.
4. Regelmäßige Backups und redundante Server: Verfügbarkeit.
5. Hashwerte/Protokollierung von Änderungen: Integrität.
```
