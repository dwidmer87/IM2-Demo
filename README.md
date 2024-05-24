# Air-Qualitiy worldwide
Ein Projekt im Rahmen des Modul "Interaktive Medien 02", welches Teil des Studiengangs "Multimedia Production (MMP) an der Fachhochschule Graubünden ist.

## Kurzbeschrieb Projekt
Mit dieser Website sollen Daten über die Luftqualität weltweit eingesehen werden können. Die Daten dafür beziehe ich von "openaq.org". Dieses Nonprofit-Umwelttechnik-Unternehmen stellt die Daten in einer API gratis zur Verfügung. Es erschien mir von Anfang an sinnvoll, die Daten auf einer Karte zu visualisieren. Um eine gewisse Übersichtlichkeit zu wahren, musste ich mich entscheiden, welche Daten ich anzeigen will. (Alle verfügbaren hätten eine Unmenge dargestellt.) Ich entschied mich für:<br>
<ul>
<li>die aktuellsten Messungen</li>
<li>die Suche nach gewissen Parametern</li>
<li>Daten aus der Nähe der Person, die die Website besucht</li></ul>

## Learnings
JavaScript war neu für mich. Alle detaillierten Learnings hier aufzulisten, fände daher kein Ende. Ich beschränke mich daher auf die wichtigsten:<br>
<ul>
<li><strong>Reihenfolge</strong><br>
Es kann absolut entscheidend sein, in welcher Reihenfolge Daten abgerufen und Funktionen ausgeführt werden. Ich musste die Reihenfolge des Codes für "script_close.js" im Vergleich zu "script_latest.js" und "script_parameters.js" komplett umkrempeln, obwohl die Subsite für den User scheinbar nicht gross anders ist. Auch konnte ich das "script.js" nicht als Basis verwenden. Dies liegt daran, dass ich nur bei "close.html" auf Positionsdaten des Users zugreife und nicht nur die Karte dementsprechend anzeige, sondern logischerweise auch die API-Daten der Position entsprechend abrufe.</li>
<li><strong>Einbettung externer Scripts</strong><br>
Sowohl die Karte als auch die Menü-Symbole sind externe Javascript-Files, auf welche die Website online zugreift. Auf den Code in diesen Files habe ich keinen Einfluss. Ich lernte den Befehl "!important" kennen, um das Problem zu umgehen, dass die externen Javascript-Files meinen Code, z. B. im CSS einfach überschreiben.</li>
<li><strong>Copilot</strong><br>
Mit präzisen Prompts für ein Problem und dem Verständnis dafür, was die vorgeschlagene Lösung "tut", ist der Copilot ein wunderbares Werkzeug. Viele der vorgeschlagenen Codes kannte ich nicht. Sie waren aber teilweise ziemlich "sprechend", sodass schnell klar war, wie sie funktionieren. In den anderen Fällen liess ich sie mir erklären oder rief "w3schools" auf.</li></ul>

## Schwierigkeiten
Am meisten Schwierigkeiten hatte ich damit:<br>
<ul>
<li><strong>Maps</strong><br>
Für meine Anwendung musste ich auf ein Map-Tool zugreifen. Eigentlich war mir klar, dafür das am breitesten akzeptierte Tool von Google, "Google-Maps" zu verwenden. Schnell zeigte sich, wie schwierig dieses Unterfangen sein würde: Gratis gibt es sehr wenig und die Dokumentation für die Gratis-Anwendungen waren meines Erachtens maximal-kompliziert. Nina empfahl mir in einem Coaching, stattdessen viel besser "leafletjs.com" zu verwenden. Das Tutorial der Betreiber, die diese Open-Source-Library zur Verfügung stellen, war sehr verständlich und einfach umzusetzen.<br>
Etwas unschön anzusehen sind die Schatten der Pin-Nadeln. Egal welche Variante ich dafür verwende (Default oder eigenes Design), der an sich transparente Hintergrund des PNGs wird leider immer sichtbar. Darauf habe ich keinen Einfluss (externes Javascript-File).</li>
<li><strong>zur Verfügung gestellte Daten</strong><br>
Die API von "openaq.org" ist zwar bis zu einem weiten Bereich gratis nutzbar. Bei gewissen Daten, die abgefragt werden, würde aber ein kostenpflichtiger Zugang nötig. Dies führte in meinem Fall zu drei Problemen:
<ol><li>Der maximale Radius für "Messstationen in meiner Nähe" ist nicht sehr gross. Deshalb wird in vielen Fällen wohl die Meldung aufpoppen: "In deiner Nähe befinden sich offenbar keine Messstationen." Diese poppt zum Beispiel in Chur auf, obwohl es in Zürich und St. Gallen Messstationen gibt. Sie sind aber zu weit weg. Ich kann (gratis) nicht auf diese Daten zugreifen.</li>
<li>Der Gratis-Zugang beschränkt die Anzahl API-Aufrufe innerhalb einer gewissen Zeitspanne. Dies kann dazu führen, dass meine Website - wenn zu oft hintereinander genutzt - keine Ergebnisse für jegliche Daten anzeigt. Erst nach einer Pause ist es dann wieder möglich.</li>
<li>Nicht alle Daten der Messstationen sind sauber bezeichnet. Darauf kann ich keinen Einfluss nehmen. Ich kann zwar umgehen, dass ein anderer sinnvoller Parameter angezeigt wird, wenn z.B. der Wert für "location" "none" beträgt. Aber wenn er mit einem Fantasienamen, z. B. "CH0019A" bezeichnet ist, kann ich das nicht mit einem Code umgehen. Der Entscheid, welcher der zur Verfügung gestellten Daten als (Haupt-)Parameter für die Ortsbezeichnung der Messstationen Sinn macht, war dementsprechend nicht ganz einfach.</ol></li></ul>

## benutzte Ressourcen
<ul>
<li>Copilot</li>
<li>w3schools</li>
<li>weitere Online-Recherche, z. B. bezüglich der Möglichkeiten von leafletjs.com</li>
<li>Coachings bei Nina, Wolfgang, Alen</li></ul>
<br><br><br>
David Widmer, mmp23c, 24.05.2024