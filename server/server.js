const express = require("express");
const { Server } = require("ws");
const path = require("path");
const PORT = process.env.PORT || 3000;


const app = express();

const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const wss = new Server({ server });


app.use("/.well-known/pki-validation", express.static(path.join(__dirname, "ssl-auth")));


app.get("/", (req,res) => {
    console.log("Homepage requested");
    res.status(200).sendFile("./website/index.html", {root: __dirname});
});

wss.on("connection", ws => {
    console.log("Client connected");
    console.log(ws);
    console.log(ws.constructor.name);
    ws.on("message", messageHandler);
    ws.on("close", () => console.log("Client disconnected"));
});

const messageHandler = buffer => {
    try {
        const msg = JSON.parse(String(buffer))
        console.log(msg);
    } catch (e) {
        console.log("Invalid message.", e)
    }
}
