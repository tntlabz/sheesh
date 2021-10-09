const ws = new WebSocket("ws://localhost:3000");

var eventHandlers = {};



function send(data) {
    this.ws.send(JSON.stringify(data));
}


// invokes all Event Handlers
function _onMessage(data) {
    const req = JSON.parse(String(data));

    if (!(req.type in eventHandlers)) return;

    for (const handler of eventHandlers[req.type]) {
        handler(req, data => send(Object.assign(data, { type: req.type })));
    }
}


/**  Set up an Event Handler */
function on(eventName, callback) {

    if (eventHandlers[eventName]) {
        eventHandlers[eventName].push(callback);
    } else {
        eventHandlers[eventName] = [callback];
    }
}


/** Remove an Event Handler */
function off(eventName, callback) {

    const index = eventHandlers[eventName].indexOf(callback);

    if(eventName in eventHandlers && index > -1) {
        eventHandlers[eventName].splice(index, 1);
        if (eventHandlers[eventName].length == 0) delete eventHandlers[eventName];
    }
}

/** Add an one-time Event Listener */
function once(eventName, callback) {

    function wrapper(...args) {
        callback(...args);
        off(arguments.callee);
    }

    on(eventName, wrapper);
}

ws.onmessage = _onMessage;

export default {
    on,
    off,
    once,
    _onMessage,
    send,
    eventHandlers

}