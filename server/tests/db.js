global.mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://tntlabz:teentee31415@sheesh-server-db.xh4mw.mongodb.net/sheesh?retryWrites=true&w=majority",
    (err) => {
        if(err) {
            console.error("Couldnt connect:", String(err));
        } else {
            console.log("Connected to MongoDB");
        }
    }
);

global.User = require("../models/User");
global.Chat = require("../models/Chat");