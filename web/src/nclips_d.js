// WiSo Teil D: Erklärclips im Format v2
const CLIPS_NEU_D = {

betrieb_org: [
{h:'Blau und rund: Verbot?', v:{stat:'Blau + rund', sub:'Verbot oder Gebot? Klassiker in der WiSo-Prüfung'},
 beats:[
  {say:'Ein blaues rundes Schild. Verbot oder Gebot? Genau hier verlieren viele Prüflinge leichte Punkte.', show:{}},
  {say:'Blau und rund heißt Gebot, also eine Pflicht. Heute geht es um Organisation, Arbeitsschutz und Umwelt im Betrieb.', show:{}}
 ]},
{h:'Aufbau und Ablauf', v:{list:['Stelle: kleinste organisatorische Einheit','Abteilung: mehrere Stellen unter einer Leitung','Organigramm: zeigt die Aufbauorganisation als Grafik','Ablauforganisation: wer macht was, wann, in welcher Folge']},
 beats:[
  {say:'Die kleinste Einheit im Betrieb ist die Stelle. Das ist der Aufgabenbereich einer Person, zum Beispiel Lohnbuchhaltung.', show:{item:1}},
  {say:'Mehrere Stellen unter einer gemeinsamen Leitung bilden eine Abteilung.', show:{item:2}},
  {say:'Das Organigramm zeigt diese Aufbauorganisation als Grafik. Wer ist wem unterstellt?', show:{item:3}},
  {say:'Die Ablauforganisation regelt dagegen die Prozesse. Wer macht was, wann und in welcher Reihenfolge.', show:{item:4}}
 ]},
{h:'Organisationsformen', v:{table:[['Form','Prinzip','Plus','Minus'],['Einlinie','ein Chef, Dienstweg','klare Zuständigkeit','lange Wege'],['Mehrlinie','mehrere Fachchefs','kurze Wege','Kompetenzkonflikte'],['Stablinie','Linie plus Stäbe','Leitung entlastet','Stab ohne Weisungsrecht'],['Matrix','Abteilung kreuzt Projekt','flexibel','zwei Chefs, Konflikte'],['Sparte','nach Produkt, Region, Kunde','marktnah','teuer, doppelte Stellen']]},
 beats:[
  {say:'Einliniensystem: Jeder hat genau einen Vorgesetzten, alles läuft über den Dienstweg. Klare Zuständigkeit, aber lange Wege.', show:{rows:1}},
  {say:'Mehrlinie: mehrere Fachvorgesetzte, kurze Wege, aber Kompetenzkonflikte. Stablinie: Stäbe beraten die Leitung, haben aber kein Weisungsrecht.', show:{rows:3}},
  {say:'Matrix: Abteilung und Projekt kreuzen sich, du hast zwei Chefs. Flexibel, aber Konflikte und viel Abstimmung.', show:{rows:4}},
  {say:'Sparten bilden Bereiche nach Produkt, Region oder Kunde, etwa Steuerberatung und Wirtschaftsprüfung mit eigener Ergebnisverantwortung.', show:{rows:5}}
 ],
 check:{q:'Der Datenschutzbeauftragte berät die Kanzleileitung, darf aber niemandem Anweisungen geben. Was ist er?', o:['Eine Stabsstelle','Eine Sparte','Ein zweiter Linienvorgesetzter'], a:0, e:'Stabsstellen beraten und bereiten Entscheidungen vor, ohne Weisungsrecht.'}},
{h:'Führen und Zusammenarbeiten', v:{list:['Autoritär: Chef entscheidet allein, schnell','Kooperativ: Team wird beteiligt, motiviert','Laissez-faire: kaum Führung, Team regelt selbst','Delegation: Aufgabe, Befugnis, Verantwortung abgeben','Digital: Netiquette, Homeoffice-Regeln']},
 beats:[
  {say:'Autoritär heißt: Der Chef entscheidet allein. Das geht schnell, motiviert aber kaum.', show:{item:1}},
  {say:'Kooperativ: Das Team wird beteiligt und entscheidet mit. Laissez-faire: kaum Führung, das Team regelt vieles selbst.', show:{item:3}},
  {say:'Delegation heißt, eine Aufgabe mit Befugnis und Verantwortung abzugeben. Die Führungsverantwortung bleibt beim Chef.', show:{item:4}},
  {say:'Im Chat gilt Netiquette. Und im Homeoffice gelten Datenschutz, Arbeitszeitgesetz und Arbeitsschutz genauso wie im Büro.', show:{item:5}}
 ]},
{h:'Wer sorgt für Sicherheit?', v:{list:['Arbeitgeber: Gefährdungsbeurteilung nach ArbSchG','Bildschirm: Pausen, Ergonomie, Augen-Vorsorge anbieten','Fachkraft für Arbeitssicherheit, Betriebsarzt: beraten','Sicherheitsbeauftragte: seit Mai 2026 generell ab 50','Mehr als 3 Tage arbeitsunfähig: Unfallanzeige an BG']},
 beats:[
  {say:'Verantwortlich ist der Arbeitgeber. Er muss nach dem Arbeitsschutzgesetz eine Gefährdungsbeurteilung machen.', show:{item:1}},
  {say:'Bildschirmarbeit wird regelmäßig durch Pausen oder andere Aufgaben unterbrochen. Augenvorsorge muss angeboten werden, mitmachen ist freiwillig.', show:{item:2}},
  {say:'Fachkraft für Arbeitssicherheit und Betriebsarzt beraten. Sicherheitsbeauftragte sind seit Mai 2026 generell erst ab 50 Beschäftigten Pflicht.', show:{item:4}},
  {say:'Ist jemand nach einem Arbeitsunfall mehr als 3 Tage arbeitsunfähig, geht binnen 3 Tagen eine Unfallanzeige an die Berufsgenossenschaft.', show:{item:5}}
 ]},
{h:'Sicherheitszeichen', v:{table:[['Zeichen','Farbe','Form'],['Verbot','rot','rund'],['Gebot','blau','rund'],['Warnung','gelb','Dreieck'],['Rettung, Erste Hilfe','grün','Rechteck'],['Brandschutz','rot','Rechteck']]},
 beats:[
  {say:'Verbot ist rot und rund, zum Beispiel Rauchen verboten. Gebot ist blau und rund, zum Beispiel Gehörschutz tragen.', show:{rows:2}},
  {say:'Warnung ist gelb und dreieckig, etwa Warnung vor elektrischer Spannung.', show:{rows:3}},
  {say:'Rettungszeichen sind grün und eckig, wie Notausgang oder Erste Hilfe. Brandschutz ist rot und eckig, etwa der Feuerlöscher.', show:{rows:5}},
  {say:'Ab 2 anwesenden Beschäftigten braucht der Betrieb mindestens einen Ersthelfer. Die Ausbildung wird alle 2 Jahre aufgefrischt.', show:{rows:4, hl:[4,1]}}
 ],
 check:{q:'Ein Schild ist gelb und dreieckig. Was zeigt es an?', o:['Ein Gebot','Eine Warnung','Einen Rettungsweg'], a:1, e:'Gelb und dreieckig ist immer ein Warnzeichen.'}},
{h:'Umwelt und Green IT', v:{list:['Vermeiden, Wiederverwenden, Recyceln, Verwerten, Beseitigen','Durchgestrichene Tonne: zurückgeben, Daten vernichten','Blauer Engel, EU Ecolabel: umweltfreundliche Produkte','TCO Certified, Energy Star, EU-Energielabel']},
 beats:[
  {say:'Die Abfallhierarchie hat 5 Stufen. Ganz oben steht vermeiden, dann zur Wiederverwendung vorbereiten, dann recyceln.', show:{item:1}},
  {say:'Danach kommt sonstige Verwertung, zum Beispiel Verbrennen zur Energiegewinnung. Ganz unten steht beseitigen.', show:{item:1}},
  {say:'Durchgestrichene Mülltonne heißt: nicht in den Hausmüll, sondern zurückgeben. Datenträger vorher datenschutzgerecht löschen oder vernichten.', show:{item:2}},
  {say:'Beim Kauf auf Umweltzeichen achten: Blauer Engel, EU Ecolabel, TCO Certified für nachhaltige IT, Energy Star und Energielabel.', show:{item:4}}
 ]}
],

wirtschaft: [
{h:'Nach 8 Monaten kaputt', v:{stat:'1 Jahr', sub:'Beweislastumkehr beim Verbrauchsgüterkauf'},
 beats:[
  {say:'Dein Notebook vom Händler geht nach 8 Monaten kaputt. Musst du beweisen, dass der Fehler schon beim Kauf da war?', show:{}},
  {say:'Nein. Im ersten Jahr muss der Händler das Gegenteil beweisen. Solche Fälle und die Wirtschaftsordnung kommen in WiSo sicher dran.', show:{}}
 ]},
{h:'Wirtschaftsordnungen', v:{table:[['Ordnung','Wer steuert?','Eigentum'],['Freie Marktwirtschaft','nur der Markt','privat'],['Zentralverwaltungswirtschaft','staatlicher Plan','Staat, Kollektiv'],['Soziale Marktwirtschaft','Markt plus sozialer Ausgleich','privat']]},
 beats:[
  {say:'In der freien Marktwirtschaft steuert nur der Markt, der Staat hält sich raus. Problem: keine soziale Absicherung, Monopole drohen.', show:{rows:1}},
  {say:'In der Zentralverwaltungswirtschaft plant der Staat Produktion und Preise. Die Produktionsmittel gehören dem Staat.', show:{rows:2}},
  {say:'Deutschland hat die soziale Marktwirtschaft: freier Markt, aber der Staat sichert Wettbewerb und sozialen Ausgleich.', show:{rows:3}},
  {say:'Kreislauf: Haushalte geben Arbeit gegen Einkommen, Unternehmen Güter gegen Konsumausgaben. Erweitert kommen Staat, Banken und Ausland dazu.', show:{rows:3}}
 ]},
{h:'Preis und Wettbewerb', v:{list:['Gleichgewichtspreis: Angebot gleich Nachfrage','Nachfrage steigt, Angebot gleich: Preis steigt','Angebot steigt, Nachfrage gleich: Preis sinkt','Kartellverbot: Preisabsprachen, Bundeskartellamt','Globalisierung: große Märkte, aber Abhängigkeit']},
 beats:[
  {say:'Am Gleichgewichtspreis ist die angebotene Menge gleich der nachgefragten. Der Markt wird geräumt.', show:{item:1}},
  {say:'Steigt die Nachfrage bei gleichem Angebot, steigt der Preis. Steigt das Angebot bei gleicher Nachfrage, sinkt der Preis.', show:{item:3}},
  {say:'Dafür braucht es Wettbewerb. Preisabsprachen zwischen Konkurrenten sind als Kartell verboten, dagegen geht das Bundeskartellamt vor.', show:{item:4}},
  {say:'Globalisierung heißt weltweite Verflechtung. Vorteil: größere Märkte, günstige Waren. Nachteil: Abhängigkeit, Lohndruck, mehr Transporte.', show:{item:5}}
 ]},
{h:'Magisches Viereck', v:{table:[['Ziel','Messgröße'],['Preisniveaustabilität','Inflationsrate'],['Hoher Beschäftigungsstand','Arbeitslosenquote'],['Außenwirtschaftl. Gleichgewicht','Exporte und Importe'],['Stetiges Wachstum','reales BIP'],['Sechseck zusätzlich','Verteilung, Umweltschutz']]},
 beats:[
  {say:'Das Stabilitätsgesetz nennt 4 Ziele. Preisniveaustabilität, also wenig Inflation, und ein hoher Beschäftigungsstand.', show:{rows:2}},
  {say:'Dazu außenwirtschaftliches Gleichgewicht und stetiges, angemessenes Wachstum. Magisch, weil man nie alle gleichzeitig erreicht.', show:{rows:4}},
  {say:'Das Sechseck ergänzt gerechte Einkommensverteilung und Umweltschutz.', show:{rows:5}},
  {say:'Wachstum misst das BIP. Real heißt: Preissteigerung rausgerechnet. 5 Prozent nominal bei 3 Prozent Inflation sind rund 2 Prozent real.', show:{rows:4, hl:[4,2]}}
 ],
 check:{q:'Welches Ziel gehört nicht zum Viereck, sondern erst zum Sechseck?', o:['Hoher Beschäftigungsstand','Umweltschutz','Preisniveaustabilität'], a:1, e:'Umweltschutz und gerechte Einkommensverteilung ergänzen das Viereck zum Sechseck.'}},
{h:'Konjunktur und Geld', v:{list:['Aufschwung: Nachfrage und Produktion steigen','Boom: volle Auslastung, Preise steigen','Abschwung oder Rezession, Tiefstand Depression','Inflation: Preise steigen, Kaufkraft sinkt','EZB: Ziel 2 Prozent mittelfristig, Leitzins']},
 beats:[
  {say:'Die Konjunktur läuft in Wellen. Im Aufschwung steigen Nachfrage und Produktion, im Boom sind Betriebe voll ausgelastet, Preise steigen.', show:{item:2}},
  {say:'Dann folgt der Abschwung, auch Rezession genannt, bis zum Tiefstand, der Depression. Dort sind Arbeitslosigkeit hoch und Nachfrage schwach.', show:{item:3}},
  {say:'Inflation heißt: Das Preisniveau steigt, die Kaufkraft deines Geldes sinkt. Bei Deflation fallen die Preise dauerhaft.', show:{item:4}},
  {say:'Die EZB strebt mittelfristig 2 Prozent Inflation an. Ist sie zu hoch, erhöht sie den Leitzins. Kredite werden teurer, Nachfrage sinkt.', show:{item:5}}
 ]},
{h:'Kaufvertragsstörungen', v:{table:[['Störung','Wann?','Folge'],['Mangelhafte Lieferung','kaputt, falsch, zu wenig','erst Nacherfüllung'],['Lieferungsverzug','fällig, Mahnung, Verschulden','Nachfrist, dann Rücktritt'],['Annahmeverzug','Käufer nimmt nicht an','Einlagern, Selbsthilfeverkauf'],['Zahlungsverzug','fällig, Mahnung oder 30 Tage','Verzugszinsen']]},
 beats:[
  {say:'Mangelhafte Lieferung: kaputt, falsch oder zu wenig. Erst Nacherfüllung, danach Rücktritt, Minderung oder Schadensersatz.', show:{rows:1}},
  {say:'Lieferungsverzug: Der Verkäufer liefert trotz Fälligkeit und Mahnung schuldhaft nicht. Nach einer angemessenen Nachfrist darfst du zurücktreten.', show:{rows:2}},
  {say:'Annahmeverzug: Der Käufer nimmt ordentlich gelieferte Ware nicht an. Der Verkäufer lagert auf dessen Kosten ein oder macht einen Selbsthilfeverkauf.', show:{rows:3}},
  {say:'Zahlungsverzug: Zinsen 5 Prozentpunkte über dem Basiszinssatz bei Verbrauchern, 9 Prozentpunkte, wenn kein Verbraucher beteiligt ist.', show:{rows:4}}
 ],
 check:{q:'Der Kunde verweigert grundlos die Annahme pünktlich gelieferter Ware. Welche Störung?', o:['Lieferungsverzug','Annahmeverzug','Mangelhafte Lieferung'], a:1, e:'Annahmeverzug: Der Käufer nimmt ordnungsgemäß angebotene Ware nicht an.'}},
{h:'Verbraucherschutz', v:{list:['Gewährleistung 2 Jahre, Beweislastumkehr im 1. Jahr','Verjährung regelmäßig 3 Jahre, Garantie freiwillig','Online beim Händler: 14 Tage Widerruf, AGB prüfen','Kredit: effektiven Jahreszins vergleichen, Schufa','Überschuldet: Haushaltsplan, Schuldnerberatung']},
 beats:[
  {say:'Gewährleistung: 2 Jahre. Seit 2022 vermutet das Gesetz beim Verbrauchsgüterkauf im ersten Jahr, dass der Mangel schon da war.', show:{item:1}},
  {say:'Regelmäßige Verjährung: 3 Jahre. Online beim Händler hast du 14 Tage Widerruf. AGB dürfen dich nicht unangemessen benachteiligen.', show:{item:3}},
  {say:'Bei Krediten zählt der effektive Jahreszins, er enthält auch Gebühren. Die Schufa speichert, ob du Kredite pünktlich zahlst.', show:{item:4}},
  {say:'Ein Haushaltsplan hilft vorzubeugen. Bei Überschuldung erst Schuldnerberatung und Einigung, dann Verbraucherinsolvenz, meist 3 Jahre.', show:{item:5}}
 ]}
],

beruf_recht: [
{h:'Tratsch über Mandanten', v:{stat:'§ 203 StGB', sub:'Die Schweigepflicht gilt auch für dich als IT-Azubi'},
 beats:[
  {say:'Du erzählst beim Sport, welcher bekannte Unternehmer Mandant deiner Kanzlei ist. Harmloser Tratsch? Nein, das kann strafbar sein.', show:{}},
  {say:'Die Schweigepflicht der Steuerberater und Prüfer gilt auch für ihre Mitarbeitenden, also auch für dich. Recht im Beruf bringt sichere Punkte.', show:{}}
 ]},
{h:'Der Arbeitsvertrag', v:{list:['Nachweisgesetz: wesentliche Bedingungen festhalten','Befristung: schriftlich, sonst unbefristet','Ohne Sachgrund: max. 2 Jahre, max. 3 Verlängerungen','Teilzeit: Anspruch nach 6 Monaten, mehr als 15 AN','Zeugnis: einfach oder qualifiziert, wohlwollend']},
 beats:[
  {say:'Das Nachweisgesetz verpflichtet den Arbeitgeber, die wesentlichen Bedingungen festzuhalten. Seit 2022 erweitert, seit 2025 oft auch in Textform.', show:{item:1}},
  {say:'Eine Befristung muss schriftlich vereinbart sein, sonst ist der Vertrag unbefristet. Ohne Sachgrund höchstens 2 Jahre und maximal 3 Verlängerungen.', show:{item:3}},
  {say:'Teilzeit kannst du verlangen, wenn du länger als 6 Monate da bist und der Betrieb mehr als 15 Arbeitnehmer hat.', show:{item:4}},
  {say:'Zum Schluss gibt es ein Zeugnis. Einfach mit Art und Dauer, qualifiziert auch mit Leistung und Verhalten. Wahr und wohlwollend.', show:{item:5}}
 ],
 check:{q:'6 Monate befristet, dann dreimal je 6 Monate verlängert. Geht noch eine sachgrundlose Verlängerung?', o:['Ja','Nein'], a:1, e:'24 Monate und 3 Verlängerungen sind ausgeschöpft.'}},
{h:'Der Weg durch die Gerichte', v:{table:[['Stufe','Arbeitsrecht','Sozialrecht'],['Start','Klage, erst Güteverhandlung','erst Widerspruch'],['1. Instanz','Arbeitsgericht','Sozialgericht'],['2. Instanz','Landesarbeitsgericht','Landessozialgericht'],['3. Instanz','Bundesarbeitsgericht, Erfurt','Bundessozialgericht, Kassel']]},
 beats:[
  {say:'Streit mit dem Arbeitgeber geht vor das Arbeitsgericht. Zuerst kommt die Güteverhandlung, dort soll man sich einigen, oft per Vergleich.', show:{rows:2}},
  {say:'In der ersten Instanz gibt es keinen Anwaltszwang, und jede Seite zahlt ihren Anwalt selbst. Kündigungsschutzklage: innerhalb von 3 Wochen.', show:{rows:2, hl:[2,2]}},
  {say:'Danach geht es zum Landesarbeitsgericht und zuletzt zum Bundesarbeitsgericht in Erfurt.', show:{rows:4}},
  {say:'Bei Rente, Krankenkasse oder Arbeitsagentur legst du erst Widerspruch bei der Behörde ein. Danach klagst du beim Sozialgericht.', show:{rows:4, hl:[1,3]}}
 ]},
{h:'AGG und Vielfalt', v:{list:['Rasse oder ethnische Herkunft, Geschlecht, Religion','Behinderung, Alter, sexuelle Identität','Beschwerderecht bei der zuständigen Stelle','Ansprüche binnen 2 Monaten schriftlich','Diversity: Vielfalt im Team aktiv fördern']},
 beats:[
  {say:'Das AGG schützt vor Benachteiligung wegen 6 Merkmalen. Rasse oder ethnische Herkunft, Geschlecht sowie Religion oder Weltanschauung.', show:{item:1}},
  {say:'Dazu Behinderung, Alter und sexuelle Identität. Raucher oder Nichtraucher gehört zum Beispiel nicht dazu.', show:{item:2}},
  {say:'Wer benachteiligt wird, kann sich im Betrieb beschweren. Ansprüche musst du innerhalb von 2 Monaten schriftlich geltend machen.', show:{item:4}},
  {say:'Eine Reform mit 4 Monaten Frist wird beraten, ist aber noch nicht beschlossen. Diversity heißt: Vielfalt im Team aktiv fördern.', show:{item:5}}
 ],
 check:{q:'Ein Bewerber wird abgelehnt, weil er 58 ist. Welches AGG-Merkmal ist betroffen?', o:['Alter','Weltanschauung','Keins, Alter ist nicht geschützt'], a:0, e:'Alter ist eines der 6 Merkmale des AGG.'}},
{h:'Compliance und Schweigepflicht', v:{list:['Compliance: Gesetze und interne Regeln einhalten','Verhaltenskodex: Geschenke, Interessenkonflikte','Korruption: Bestechung, Bestechlichkeit strafbar','Hinweisgeberschutz: interne Meldestelle ab 50','Kanzlei: Schweigepflicht nach § 203 StGB']},
 beats:[
  {say:'Compliance heißt: Gesetze und interne Regeln einhalten. Ein Verhaltenskodex regelt etwa, welche Geschenke du annehmen darfst.', show:{item:2}},
  {say:'Korruption, also Bestechung und Bestechlichkeit, ist strafbar, auch im Geschäftsverkehr zwischen Firmen.', show:{item:3}},
  {say:'Wer Verstöße meldet, ist durch das Hinweisgeberschutzgesetz geschützt. Ab 50 Beschäftigten braucht es eine interne Meldestelle.', show:{item:4}},
  {say:'In der Kanzlei gilt die Schweigepflicht aus Paragraf 203 Strafgesetzbuch. Sie gilt auch für Azubis und IT, die an Mandantendaten mitwirken.', show:{item:5}}
 ]},
{h:'Weiterbildung', v:{table:[['Stufe','Was','DQR'],['Ausbildung FIAE','dein Abschluss','4'],['Geprüfter Berufsspezialist','1. Fortbildungsstufe','5'],['Bachelor Professional','2. Stufe, wie Bachelor','6'],['Master Professional','3. Stufe, wie Master','7']]},
 beats:[
  {say:'Deine Ausbildung liegt im Deutschen Qualifikationsrahmen auf Niveau 4. Wer sein Wissen nur aktuell hält, macht eine Anpassungsfortbildung.', show:{rows:1}},
  {say:'Aufstiegsfortbildung: Berufsspezialist auf Niveau 5, Bachelor Professional auf 6, Master Professional auf 7. Umschulung heißt neuer Beruf.', show:{rows:4}},
  {say:'Aufstiegs-BAföG: Lehrgangskosten zur Hälfte als Zuschuss. Bei bestandener Prüfung wird die Hälfte des Restdarlehens erlassen.', show:{rows:4}},
  {say:'In Hessen gibt es 5 Arbeitstage Bildungsurlaub pro Jahr, erstmals nach 6 Monaten. Azubis nur für politische Bildung oder Ehrenamt.', show:{rows:1, hl:[1,1]}}
 ]},
{h:'Arbeiten in Europa', v:{list:['Freizügigkeit: EU-weit ohne Arbeitserlaubnis','Erasmus+: Auslandsaufenthalte, auch in der Ausbildung','Europass: Lebenslauf, Europass Mobilität','Zeugniserläuterung, Diploma Supplement','EQR: europäischer Rahmen, DQR deutsche Version']},
 beats:[
  {say:'Als EU-Bürger darfst du in jedem EU-Land ohne Arbeitserlaubnis arbeiten. Erasmus plus fördert Auslandsaufenthalte, auch in der Ausbildung.', show:{item:2}},
  {say:'Der Europass hilft beim Bewerben: Lebenslauf und Europass Mobilität, der deine Auslandsaufenthalte bescheinigt.', show:{item:3}},
  {say:'Zeugniserläuterungen erklären Berufsabschlüsse, das Diploma Supplement Hochschulabschlüsse. Der frühere Sprachenpass steckt heute im Europass-Profil.', show:{item:4}},
  {say:'Der Europäische Qualifikationsrahmen EQR macht Abschlüsse vergleichbar. Der DQR ist die deutsche Umsetzung mit 8 Niveaus.', show:{item:5}}
 ]}
]

};
