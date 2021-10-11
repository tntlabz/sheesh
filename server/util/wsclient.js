
class WSClient {

    constructor(ws) {
        this._eventHandlers = {};
        this.ws = ws;

        this.isAuthorized = false;
        
        this.ws.on("message", data => this._onMessage(data));
        this.ws.on("close", () => console.log("Client disconnected"));
    }

    respond(data) {
        this.ws.send(JSON.stringify(data));
    }

    // invokes all Event Handlers
    _onMessage(data) {
        const req = JSON.parse(String(data));

        if (!(req.type in this._eventHandlers)) return;

        for (const handler of this._eventHandlers[req.type]) {
            handler.call(this, req, (data, type) => this.respond(Object.assign(data, { type: type || req.type })));
        }
    }

    /**  Set up an Event Handler */
    on(eventName, callback, restrictedTo="all") {

        let handler = callback;

        if (restrictedTo==="authorized") {
            handler = (req, respond) => {
                if (this.isAuthorized) callback.call(this, req, respond);
            }
        } else if (restrictedTo==="admin") {
            handler = (req, respond) => {
                if (this.isAuthorized && this.user.isAdmin) callback.call(this, req, respond);
            }
        }

        if (this._eventHandlers[eventName]) {
            this._eventHandlers[eventName].push(handler);
        } else {
            this._eventHandlers[eventName] = [handler];
        }
    }

    reject() {
        this.ws.close();
    }
}

module.exports = WSClient;