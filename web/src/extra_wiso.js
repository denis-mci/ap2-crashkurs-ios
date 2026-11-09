// Vertiefung WiSo: zusätzliche Erklärsätze pro Szene
const EXTRA_WISO = {
ausbildung:{
 0:['Darum: Kläre vor der Prüfung mit deinem Betrieb, wie es weitergeht. Wichtig: Arbeitest du nach der Ausbildung einfach weiter, ohne dass etwas vereinbart ist, entsteht automatisch ein unbefristetes Arbeitsverhältnis (§ 24 BBiG).'],
 1:['Der Ausbildungsvertrag muss vor Beginn in Textform festgehalten werden (seit 2024 reicht auch elektronisch), unter anderem mit Dauer, Probezeit, Vergütung und Urlaub. Die IHK trägt ihn ins Verzeichnis ein.','Die Ausbildungsordnung legt bundesweit fest, was du im Betrieb lernst. Den Rahmenlehrplan für die Berufsschule beschließt die Kultusministerkonferenz.'],
 2:['Für die Berufsschule musst du freigestellt werden, und die Zeit wird auf die Arbeitszeit angerechnet. Auch für Prüfungen gibt es Freistellung.','Ausbildungsfremde Arbeiten, etwa dauernd Kaffee kochen oder privat einkaufen, darf der Betrieb dir nicht aufgeben.'],
 3:['Nach der Probezeit kannst du als Azubi selbst mit vier Wochen Frist kündigen, wenn du die Ausbildung aufgibst oder den Beruf wechselst. Immer schriftlich und mit Grund.'],
 4:['Bei Nichtbestehen kannst du die Prüfung zweimal wiederholen. Auf deinen Wunsch verlängert sich die Ausbildung bis zur nächsten Wiederholungsprüfung, höchstens um ein Jahr.','Ein Zeugnis bekommst du immer. Das einfache nennt Art, Dauer und Ziel der Ausbildung. Auf Wunsch gibt es ein qualifiziertes mit Leistung und Verhalten.'],
 5:['Für Jugendliche gelten auch besondere Urlaubsregeln: mindestens 30 Werktage mit 15, 27 mit 16 und 25 mit 17 Jahren.'],
 6:['Die Mindestvergütung wird jedes Jahr angepasst. Gilt ein Tarifvertrag, zählt der, und der liegt oft deutlich darüber.']},
arbeitsrecht:{
 0:['Mit längerer Betriebszugehörigkeit verlängert sich die Frist für den Arbeitgeber, zum Beispiel nach zwei Jahren auf einen Monat zum Monatsende. Für dich als Arbeitnehmer bleibt es bei vier Wochen.'],
 1:['Es gibt aber das Günstigkeitsprinzip: Ein niedrigeres Regelwerk darf Besseres für dich regeln. Steht im Arbeitsvertrag mehr Urlaub als im Gesetz, gilt der Vertrag.'],
 2:['Der gesetzliche Mindesturlaub beträgt 24 Werktage bei einer Sechs-Tage-Woche. Bei fünf Tagen pro Woche sind das 20 Arbeitstage.','Wirst du krank, zahlt der Arbeitgeber bis zu sechs Wochen weiter. Danach gibt es Krankengeld von der Krankenkasse.'],
 3:['Die JAV kann gewählt werden, wenn mindestens fünf Arbeitnehmer unter 18 oder Azubis unter 25 im Betrieb sind. Sie vertritt deren Interessen gegenüber dem Betriebsrat.'],
 4:['Die zweite Stufe ist Mitwirkung, also Anhörung und Beratung, etwa vor jeder Kündigung. Die dritte ist Information, etwa über wirtschaftliche Planungen.','Eine Kündigung ohne vorherige Anhörung des Betriebsrats ist unwirksam. Das ist eine beliebte Prüfungsfrage.'],
 5:['Der Entgelttarifvertrag regelt die Bezahlung und läuft meist kurz. Der Manteltarifvertrag regelt Arbeitszeit und Urlaub und läuft länger.','Während ein Tarifvertrag gilt, herrscht Friedenspflicht. Streiks sind dann nicht erlaubt.'],
 6:['Elternzeit gibt es bis zum dritten Geburtstag des Kindes. Sie muss beim Arbeitgeber angemeldet werden, und in dieser Zeit besteht Kündigungsschutz.']},
sozial:{
 0:['Diese Abzüge sind kein verlorenes Geld. Dafür bist du versichert, wenn du krank wirst, deinen Job verlierst oder später in Rente gehst.'],
 1:['Die Pflegeversicherung liegt bei 3,6 Prozent. Kinderlose ab 23 zahlen einen kleinen Zuschlag. Die Arbeitslosenversicherung liegt bei 2,6 Prozent.'],
 2:['Bei Azubis bis 325 Euro im Monat zahlt der Arbeitgeber die Beiträge ganz allein. Das ist die Geringverdienergrenze.'],
 3:['Zuständig sind die Berufsgenossenschaften. Ein Unfall auf dem Umweg zum Supermarkt ist nicht versichert, ein Umweg, um dein Kind zur Kita zu bringen, schon.'],
 4:['Merke die Reihenfolge: Brutto minus Lohnsteuer, minus Soli und Kirchensteuer, falls fällig, minus Arbeitnehmeranteil zur Sozialversicherung, ergibt Netto.'],
 5:['Die Steuerklasse sechs gilt für jeden Zweitjob. Dort ist der Abzug am höchsten, weil keine Freibeträge berücksichtigt werden.'],
 6:['Dazu kommt das Subsidiaritätsprinzip: Erst hilft man sich selbst, dann die Familie, dann erst der Staat.']},
unternehmen:{
 0:['Bei der PartG mbB haften die Partner für Fehler bei der Berufsausübung nur mit dem Gesellschaftsvermögen. Dafür braucht es eine Berufshaftpflichtversicherung.'],
 1:['Bei der KG gibt es zwei Arten: Der Komplementär haftet unbeschränkt, der Kommanditist nur mit seiner Einlage.','Die UG, die Mini-GmbH, kann man schon mit einem Euro gründen. Sie muss aber Gewinne ansparen, bis 25.000 Euro erreicht sind.'],
 2:['Bei der AG wählt die Hauptversammlung der Aktionäre den Aufsichtsrat. Der Aufsichtsrat bestellt und kontrolliert den Vorstand.'],
 3:['Ein Prokurist darf fast alles. Grundstücke verkaufen oder belasten darf er nur mit besonderer Befugnis. Prokura erteilen oder weitergeben darf er nie, das kann nur der Inhaber.'],
 4:['Beim Markt unterscheidest du nach Anzahl der Anbieter: viele heißt Polypol, wenige heißt Oligopol, einer heißt Monopol.'],
 5:['Eine Bestellung nach einem Angebot ist die Annahme, der Vertrag steht. Eine Bestellung ohne vorheriges Angebot ist selbst der Antrag, und der Verkäufer muss noch annehmen.'],
 6:['Erst wenn die Nacherfüllung zweimal scheitert, darfst du zurücktreten oder den Preis mindern. Beim Onlinekauf hast du zusätzlich 14 Tage Widerrufsrecht ohne Grund.']},
betrieb_org:{
 0:['Diese Schilder siehst du jeden Tag im Büro, an Feuerlöschern und Fluchtwegen. Mit der Logik aus Farbe und Form beantwortest du jede Schilderfrage.'],
 1:['Die Aufbauorganisation zeigt die Struktur, wer wem unterstellt ist, als Organigramm. Die Ablauforganisation zeigt, wie Arbeit nacheinander erledigt wird.'],
 2:['Die Matrixorganisation kombiniert zwei Linien, zum Beispiel Fachabteilung und Projekt. Flexibel, aber mit zwei Chefs gibt es Konfliktpotenzial.'],
 3:['Führen durch Zielvereinbarung heißt Management by Objectives: Ziele werden gemeinsam festgelegt, der Weg dorthin bleibt dem Mitarbeiter überlassen.'],
 4:['Der Arbeitgeber bestellt dafür Fachleute, etwa eine Fachkraft für Arbeitssicherheit und einen Betriebsarzt. Mitarbeitende müssen regelmäßig unterwiesen werden.','Bildschirmarbeitsplätze haben eigene Regeln: blendfreie Bildschirme, ergonomische Stühle und regelmäßige Unterbrechungen.'],
 5:['Merkhilfe: rot wie Stoppschild, blau wie Pflicht, gelb wie Vorsicht, grün wie sicherer Weg. Brandschutzzeichen sind übrigens auch rot, aber eckig.'],
 6:['Alte Geräte gehören nicht in den Hausmüll, sondern zur Elektroschrott-Sammlung. Vorher müssen die Daten sicher gelöscht werden, gerade in einer Kanzlei.']},
wirtschaft:{
 0:['Diese Beweislastumkehr gilt nur, wenn ein Verbraucher bei einem Unternehmer kauft. Unter Privatleuten oder zwischen Firmen gilt sie nicht.'],
 1:['In der sozialen Marktwirtschaft gilt grundsätzlich der freie Markt, aber der Staat greift ein, um sozial auszugleichen, etwa mit Mindestlohn, Kartellrecht und Sozialversicherung.'],
 2:['Ein Kartell ist eine verbotene Absprache zwischen Wettbewerbern, etwa über Preise. Darüber wacht das Bundeskartellamt.'],
 3:['Magisch heißt das Viereck, weil sich die Ziele gegenseitig stören. Mehr Wachstum kann zum Beispiel die Preise steigen lassen.'],
 4:['Die Europäische Zentralbank strebt eine Inflation von zwei Prozent an. Steigt die Inflation, erhöht sie meist die Leitzinsen, damit weniger Geld im Umlauf ist.'],
 5:['Beim Annahmeverzug nimmt der Käufer die ordentlich gelieferte Ware nicht ab. Beim Zahlungsverzug zahlt er nicht, spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung ist er auch ohne Mahnung im Verzug. Bei Verbrauchern gilt das nur, wenn die Rechnung darauf hinweist.'],
 6:['Neben der Gewährleistung gibt es die Garantie. Die ist freiwillig und kommt meist vom Hersteller, mit Bedingungen, die er selbst festlegt.']},
beruf_recht:{
 0:['Die Schweigepflicht gilt auch nach dem Ende der Ausbildung weiter. Ein Verstoß kann nach Paragraf 203 Strafgesetzbuch bestraft werden.'],
 1:['Eine Befristung ohne Sachgrund ist bis zu zwei Jahre möglich, und in dieser Zeit höchstens dreimal verlängerbar.'],
 2:['In der ersten Instanz vor dem Arbeitsgericht zahlt jede Partei ihren Anwalt selbst, egal wer gewinnt. Danach geht es zum Landesarbeitsgericht und zum Bundesarbeitsgericht.','Gegen eine Kündigung musst du innerhalb von drei Wochen nach Zugang Klage erheben. Sonst gilt sie als wirksam.'],
 3:['In Stellenanzeigen heißt das: keine Altersgrenzen, und neutrale Formulierungen wie m, w, d. Wer benachteiligt wird, kann Entschädigung verlangen.'],
 4:['Ein Hinweisgebersystem erlaubt es, Verstöße anonym zu melden. Das Hinweisgeberschutzgesetz schützt solche Meldenden vor Nachteilen.'],
 5:['Für Fachinformatiker passt etwa der Weg zum Bachelor Professional in IT. Aufstiegs-BAföG kann die Kosten für solche Fortbildungen fördern.'],
 6:['Der Europass-Lebenslauf ist ein einheitliches Format, das Arbeitgeber in ganz Europa kennen. Berufsabschlüsse werden über den Europäischen Qualifikationsrahmen vergleichbar.']}
};
