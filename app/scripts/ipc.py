import asyncio
from concurrent.futures import ThreadPoolExecutor


async def recv_msg() -> str:
    with ThreadPoolExecutor(1, "MsgReceiver") as executor:
        return await asyncio.get_event_loop().run_in_executor(executor, input)

def send_msg(*messages) -> None:
    print(*messages, end="", flush=True)