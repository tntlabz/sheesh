# Kurze info zu den dateien hier die Heroku braucht:

## `runtime.txt`
Hier steht die python version drin

## `requirements.txt`
Hier stehen externe module drin, um noch eins hinzuzufügen einfach reinschreiben, version bekommst du mit `pip show <modulname>`, wenn man dann auf heroku deployed werden die automatisch installiert

## `Procfile`
die datei sagt welcher prozess automatisch gestartet werden soll. Für die websockets datei muss davor ein `web:`, es gibt aber auch andere wie zb `worker:`, falls du das mal brauchen solltest. nach dem prefix kommt dann ein normaler kommandozeilen command, hier jetzt zb `python3 /app/server/server.py`

# Dokumentation zu den Websockets gibt's hier:

* https://websockets.readthedocs.io/en/stable/