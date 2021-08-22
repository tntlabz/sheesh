# Heroku



* `runtime.txt`  
Hier steht die Python Version drin, falls irgendwelche Module nicht mit 3.9 funktionieren.

* `requirements.txt`  
Hier stehen externe Module drin, um noch eins hinzuzufügen einfach reinschreiben,  
Version bekommst du mit `pip show <modulname>`, wenn man dann auf Heroku deployed  
werden die automatisch installiert.

* `Procfile`  
Die Datei sagt welcher Prozess automatisch gestartet werden soll. Für die Websockets Datei  
muss davor ein `web:`, es gibt aber auch andere wie zb `worker:`, falls du das mal brauchen  
solltest. Nach dem Prefix kommt dann ein normaler cmd command, hier jetzt  
zb `python3 /app/server/server.py`.

# Server-Client Kommunikation


* Alles an Kommunikation muss über Websockets laufen, ausser wir wollen Flask verwenden   
und rausfinden wie da Websockets funktionieren

* Die User-Daten sind in einer Datenbank, die entweder auf dem server selber läuft,  
je nachdem wie gut das bei heroku geht, oder in der cloud auf so nem MongoDB Server.

* Wenn wir was Gutes finden, können wir uns überlegen die Dateien in ne Cloud hochzuladen  
sodass man richtige Chats hat mit dateien die dann dort immer sind und mehrfach gedownloadet werden können. Oder wenn das zuviel Platz kostet, dass man die da für einen Tag speichern  
kann und dann werden sie automatisch gelöscht

## Registrierung

* Ein neuer User sollte eine Registrierungs-Message schicken können  
(an die Sub-URL `/register`) mit Passwort, username und eventuell email  
(falls man mal pw-resets einbinden will).

## "Anmeldung" beim App-Start

* Wenn die App gestartet wird, wird automatisch eine Verbindung zum Server aufgebaut.  
Die sollte immer aufrecht erhalten werden, bis das Skript geschlossen wird.

* Der Server bekommt beim Starten der App eine Nachricht mit passwort und username, die er  
überprüfen muss, bevor er den socket dieses Clients abspeichert.

* Ist die Verbindungsinfo korrekt, wird (am besten in nem hash mit username als key)  
der Socket zum Zurückschicken abgespeichert.

## Datentransfer

* Der Sender sendet eine Infonachricht (mit empfänger, dateiname, dateigröße, etc),  
dass er jetzt an username X senden will. Der Server schaut nun ob der user online ist und sendet dann die Übertragungsinfos an ihn weiter. Der Empfänger schickt dann zurück ob er die Datei annehmen will und das wird dann an den sender weitergeleitet.

* Hat der Empfänger angenommen, wird nun vom Sender die Datei verschickt, der Server  
leitet die einfach weiter.




# Links

* [Websockets Dokumentation](https://websockets.readthedocs.io/en/stable/)
* [MongoDB für Python](https://www.mongodb.com/languages/python)
