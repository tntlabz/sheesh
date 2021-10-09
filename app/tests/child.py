import asyncio
from concurrent.futures import ThreadPoolExecutor


async def recv_msg() -> str:
    with ThreadPoolExecutor(1, "MsgReceiver") as executor:
        return await asyncio.get_event_loop().run_in_executor(executor, input)

def send_msg(*msgs) -> None:
    print(*msgs, end="", flush=True)


async def listen_for_input():
    while True:
        print("STDIN: ", await recv_msg(), flush=True)
        await asyncio.sleep(1)

async def otherTask():
    i = 0
    while i < 20:
        print(i, flush=True, end="")
        i += 1
        await asyncio.sleep(3)


asyncio.get_event_loop().create_task(listen_for_input())
asyncio.get_event_loop().run_until_complete(otherTask())
asyncio.get_event_loop().run_forever()