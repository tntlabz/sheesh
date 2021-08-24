const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    notificationApi: {
        sendNotification(message) {
            ipcRenderer.send("notify", message);
        }
    },
    ipc: {
        send(channel, data) {
            ipcRenderer.send(channel, data);
        }
    }
})