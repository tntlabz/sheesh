import asyncio, time, sys, sysconfig, pymongo

from ipc import recv_msg, send_msg


# gets username & password from console
if sys.argv[0] == __file__:
    username, password = sys.argv[1:]
else:
    username, password = sys.argv[0:]


# create DB connection
CONNECTION_STRING = sysconfig.get_config_var("MONGODB_URI")
client = pymongo.MongoClient(CONNECTION_STRING)
db = client["users"]
collection = db["user_collection"]
user = {"username" : username, "password": password}
collection.insert_one(user)


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