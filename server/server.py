import asyncio, os
import websockets


async def echo(websocket, path):
    async for message in websocket:
        await websocket.send(message)


print(f"Websocket Server ready, listening on port {os.environ['PORT']}")
start_server = websockets.serve(echo, "0.0.0.0", os.environ["PORT"])

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()