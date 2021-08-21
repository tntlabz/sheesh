import os, math, asyncio, json, time
import websockets


async def send_file(file):

    # das "wss://" am anfang sorgt dafür, dass der server weiss, dass man ne verbindung aufbauen will
    # es gibt auch "ws://", das ist quasi wie http und https, wss ist irgendwie sicherer.
    uri = "wss://sheesh-server.herokuapp.com/0.0.0.0"

    async with websockets.connect(uri) as websocket:

        # await websocket.send("Helloo")

        transfer_info = {
            "filename": file,
            "frame_count": math.ceil(os.path.getsize(file) / (1024 * 1024)),
        }
        print(transfer_info)

        await websocket.send(json.dumps(transfer_info))


        # with open(file, "rb") as f:
        #     frame = f.read((1024 * 1024))
        #     while frame:
        #         print("Sending frame")
        #         await websocket.send(frame)
        #         frame = f.read((1024 * 1024))

        # print("Done Sending")
        # transfer_info = json.loads(await websocket.recv())
        # print(transfer_info)

        # fn_parts = transfer_info["filename"].split(".")
        # fn_parts[-2] += "-recv"
        # file_name = ".".join(fn_parts)

        # with open(file_name, "wb") as f:
        #     for _ in range(transfer_info["frame_count"]):
        #         print("Writing frame")
        #         f.write(await websocket.recv())



asyncio.get_event_loop().run_until_complete(send_file("img.exr"))