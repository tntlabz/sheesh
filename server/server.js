/*
TODO:
- Handle Users connecting from two places simultaneosly
- Handle Users spamming, over-creation of sessionTokens
- add periodic cleanup of tokens
- add tokens.renew()
- Set up Listeners for messages in the users chats
- more checks when updating user / handling friends

*/


// Modules
const express = require("express");
const { Server } = require("ws");

const mongoose = require("mongoose");


// Custom Client Class
const WSClient = require("./util/wsclient");

// WebSocket Message Handlers
const auth = require("./handlers/auth");
const user = require("./handlers/user");
const chat = require("./handlers/chat");






// MongoDB Setup
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("Successfully connected to MongoDB.");
        } else {
            console.log("MongoDB Error:", err.codeName, `(${err.code})`);
        }
    }
)


// Setup WebServer & WebSocket
const PORT = process.env.PORT || 3000;

const app = express();
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const wss = new Server({ server });



// Homepage
app.get("/", (req,res) => {
    console.log("Homepage requested");
    res.status(200).sendFile("./website/index.html", {root: __dirname});
});



// WebSocket Connections
wss.on("connection", ws => {

    console.log("Client connected");
    const client = new WSClient(ws);

    // Auth
    client.on("register", auth.register);
    client.on("login", auth.login);
    client.on("reconnect", auth.reconnect);

    // User
    client.on("updateUser", user.updateUser, "authorized");
    // * getUser
    // * searchUser
    
    // Friends
    client.on("addFriend", user.addFriend, "authorized");
    client.on("acceptFriend", user.acceptFriend, "authorized");
    client.on("removeFriend", user.removeFriend, "authorized");

    // Chat
    // * createChat
    // * updateChat
    // * deleteChat

    // * sendMessage
    // * deleteMessage

    // File
    // * sendFile

});
