# Bezier Kurven

## Info
Im Rahmen der Vorlesung Web Clients der FHNW im Herbstsemester 2020 wird kurz erklärt, 
was Bezier Kurven sind und in welcher Art diese anzutreffen sind in der Web-Umgebung. Zur Vereinfachung der 
Erklärung habe ich dieses schlichte Tool bestehend aus HTML & JavaScript Dateien erstellt. Diese Veranschaulichung 
dient lediglich für die linearen, quadratischen  und kubischen Bezier Kurven.

## Try it out
Das Tool ist online erreichbar unter [https://sivakumm.github.io/webcl-hs20-bezier-curve](https://sivakumm.github.io/webcl-hs20-bezier-curve).

## Lokales Setup
Um das Tool zu starten, muss lediglich zuerst das Repository gecloned oder heruntergeladen werden.
```git
$ git clone https://github.com/sivakumm/webcl-hs20-bezier-curve.git
```

Anschliessend kann die Datei [index.html](./index.html) in einem der gängigsten Browser geöffnet werden. 
> Dieses Tool funktioniert nicht mit dem Internet Explorer. Erfolgreich getestete Browser sind: Google Chrome, 
> Firefox & Microsoft Edge

## Aufbau
Das Tool ist hauptsächlich in drei Dateien aufgegliedert:
- [index.html](./index.html) - Eine einfache HTML-Seite für die Darstellung
- [controller.js](/controller.js) -  Dieses Script reagiert auf Interaktionen vom Benutzer & berechnet die nächsten Schritte
- [drawer.js](./drawer.js) - Dieses Script ist für die Darstellung des Canvas zuständig

Zusätzlich wurden im Verzeichnis [lib](./lib) die CSS von Bootstrap und im Verzeichnis [icons](./icons) SVGs abgelegt für ein minimales Styling des Tools.

## Erklärung
Das Grundkonzept bei den Bezier Kurven ist, dass ein Punkt von einem Startpunkt zum Zielpunkt gezeichnet wird. Die so 
entstandene Spur ist eine Bezier Kurve _(nachfolgend rot dargestellt)_.

### Lineare Bezier Kurve
So sieht das bei einer linearen Bezier Kurve aus: \
![](https://upload.wikimedia.org/wikipedia/commons/8/8c/Bezier_linear_anim.gif) _Quelle: [Wikipedia](https://de.wikipedia.org/wiki/B%C3%A9zierkurve)_

Zu beachten ist der Wert `t`, welcher von 0 bis 1 wandert. Dieser Wert entspricht der prozentualer Strecke, welcher der Punkt bereits 
zurück gelegt hat. 

### Quadratische Bezier Kurve
Hier gibt es drei Stützpunkte P<sub>0</sub>, P<sub>1</sub> und P<sub>2</sub>. Die Punkte werden mit grauen Strecken verbunden. 
Auf jeder dieser Strecken verlaufen grüne Punkte vom Start zum Ziel. Dabei ist zu beachten, dass die Positionen der grünen 
Punkte sich prozentual zur aufligenden Strecke gleich ist. Sprich, wenn der eine grüne Punkt sich in der Mitte seiner Strecke befindet,
dann ist der andere grüne Punkt auch in der Mitte seiner Strecke. Dieser prozentualer Wert ist nachfolgend erneut mit `t` gekennzeichnet. 
Zusätzlich werden die grünen Punkte durch eine grüne Strecke verbunden. Darauf ist der schwarze Punkt, welcher auch prozentual 
auf derselben Position auf der grünen Strecke ist. Die vom schwarzen Punkt gezeichnete rote Spur entspricht hier der Bezier Kurve. \
![](https://upload.wikimedia.org/wikipedia/commons/3/35/Bezier_quadratic_anim.gif) _Quelle: [Wikipedia](https://de.wikipedia.org/wiki/B%C3%A9zierkurve)_

### Kubische Bezier Kurve
Im Prinzip passiert hier nochmals dasselbe, wobei die Stützpunkte um P<sub>3</sub> erweitert worden sind. Statt zwei grünen Punkten 
verlaufen nun 3 grüne Punkte auf ihre Strecke. Auf den zwei grünen Strecken verläuft je ein blauer Punkt, welche mit einer blauen 
Strecke verbunden sind. Nun zeichnet der schwarze Punkt die rote Bezier Kurve, indem dieser prozentual über die blaue Strecke fährt. 
Alle Punkte starten bei `t = 0` bei ihren Startpunkten und sind am Ziel bei `t = 1`. \
![](https://upload.wikimedia.org/wikipedia/commons/a/a3/Bezier_cubic_anim.gif) _Quelle: [Wikipedia](https://de.wikipedia.org/wiki/B%C3%A9zierkurve)_


## Rechte
Dieses Tool benutzt Icons von [Font Awesome](https://fontawesome.com) für Buttons und ein SVG von [Free SVG](https://freesvg.org/) als Favicon. \
![CC BY-SA](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg) Mithusan Sivakumar, FHNW
