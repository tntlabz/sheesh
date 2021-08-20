import asyncio
import websockets


async def hello():

    # das "wss://" am anfang sorgt dafür, dass der server weiss, dass man ne verbindung aufbauen will
    # es gibt auch "ws://", das ist quasi wie http und https, wss ist irgendwie sicherer.
    uri = "wss://sheesh-server.herokuapp.com/0.0.0.0"

    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello world!")

        msg = await websocket.recv()
        print(f"Got response: {msg}")


asyncio.get_event_loop().run_until_complete(hello())