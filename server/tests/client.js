global.ws = require("ws");

global.sock;

global.connect = function connect (url="ws://localhost:3000") {
    sock = new ws.WebSocket(url);
    sock.on("message", m => console.log(JSON.parse(m)));
    console.log("Connecting...")
}

global.send = function send (data) {
    sock.send(JSON.stringify(data));
}