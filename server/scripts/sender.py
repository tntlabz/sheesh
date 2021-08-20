import asyncio
import websockets


async def hello():
    uri = "wss://sheesh-server.herokuapp.com/0.0.0.0"
    async with websockets.connect(uri) as websocket:
        await websocket.send("Hello world!")
        msg = await websocket.recv()
        print(f"Got response: {msg}")


asyncio.get_event_loop().run_until_complete(hello())