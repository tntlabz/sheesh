import asyncio, time

from ipc import recv_msg, send_msg

   
async def listen_for_input():
    while True:
        send_msg("MSG: ", await recv_msg())
        # time.sleep(1)


async def otherTask():
    i = 0
    while i < 20:
        jj = 0
        for j in range(9999999):
            jj += j
        send_msg(jj, i)
        i += 1
        # await asyncio.sleep(3)


asyncio.get_event_loop().create_task(listen_for_input())
asyncio.get_event_loop().run_until_complete(otherTask())
asyncio.get_event_loop().run_forever()