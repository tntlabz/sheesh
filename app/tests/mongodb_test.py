from typing import Collection
import pymongo

CONNECTION_STRING = "mongodb+srv://tntlabz:#teentee31415@sheesh-server-db.xh4mw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client["users"]
collection = db["user_collection"]
user1 = {"username" : "tomderfisch", "password":"12345"}
collection.insert_one(user1)