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
    },
    db: {
        login(user) {
            ipcRenderer.send("user:login", user);
        },
        logout() {
            ipcRenderer.send("user:logout");
        },
        register(user) {
            ipcRenderer.send("user:register", user);
        }
    }
})