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
            
            return new Promise((resolve, reject) => {
                ipcRenderer.send("db:login", user);
                ipcRenderer.once("db:login", (e, res) => {
                    if(res.error) reject(res.error);
                    resolve(res);
                })
            })
        },
        logout() {
            ipcRenderer.send("user:logout");
        },
        register(user) {

            return new Promise((resolve, reject) => {
                ipcRenderer.send("db:register", user);
                ipcRenderer.once("db:register", (e, res) => {
                    if(res.error) reject(res.error);
                    resolve(res);
                })
            })
        }
    }
})