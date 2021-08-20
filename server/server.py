# https://pypi.org/project/websockets/
# https://websockets.readthedocs.io/en/stable/

# Websockets sind wie normale sockets, reden aber irgendwie über normale
# domainnamen und brauchen nicht ne ip-addresse
#
# Der server hier läuft auf der internen url 0.0.0.0, soll man anscheinend so machen
# aber es geht anscheinend auch wenn man statt "0.0.0.0" unten einfach "" benutzt und dann
# beim verbinden das /0.0.0.0 am ende weglässt
# Als Port nimmt man den aus der umgebungsvariable den heroku einem gibt.
#
# Das heisst jetzt, dass sich unsere desktop app nur mit wss://sheesh-server.herokuapp.com/0.0.0.0
# verbinden muss, und gar nix über ip oder port wissen muss.


# Das ganze läuft über asyncio so wie auch die discord bots immer
import asyncio, os
import websockets

# die funktion wird immer aufgerufen wenn ne neue verbindung angefragt wird
# websocket is der socket vom verbinder, path ist der urlzusatz, also
# wenn du zb auf wss://sheesh-server.herokuapp.com/0.0.0.0/test gehst,
# ist path = "/test", könnte man verwenden um direkt mitzugeben zu wem man sich verbinden will
async def echo(websocket, path):

    # keine ahnung wie das zeug hier funktioniert, müssen uns halt iwas überlegen dass wir hier
    # binärdaten schicken können
    async for message in websocket:
        await websocket.send(message)

# das wird in echtzeit in die logs geschrieben, sehr hilfreich
print(f"Websocket Server ready, listening on port {os.environ['PORT']}")


# den part einfach mal so lassen, funktioniert irgendwie xD
start_server = websockets.serve(echo, "0.0.0.0", os.environ["PORT"])

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()



# Dafür dass des funktioniert mit dem weiterleiten, hab gesehen dass einer ne chat app programmiert hat,
# und dabei hatte er das hier irgendwo oben stehen:

connections = set()

# das ist dann ein set (array in dem jedes element nur einmal vorkommt) mit den ganzen websockets von den
# leuten die sich verbunden haben und du kannst dann in der methode die jetzt oben echo heisst,
# connections.add(websocket) machen, und dann ne schleife über die connections machen
# und die nachricht an alle schicken:

async def mehrere_benachrichtigen(websocket, path):

    connections.add(websocket)
    
    async for message in websocket:
        async for conn in connections:
            await conn.send(message)