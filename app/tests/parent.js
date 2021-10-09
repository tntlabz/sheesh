const { spawn } = require("child_process");

class PythonWorker {

    constructor(file, args=[], isCompiled=false) {

        const pycmd = process.platform === "win32" ? "python" : "python3";

        if (isCompiled) {
            this.process = spawn(file, args)
        } else {
            this.process = spawn(pycmd, [file, ...args])
        }
    }

    send(msg) {
        this.process.stdin.write(msg + "\n");
    }

    on(event, callback) {

        switch(event) {
            case "message":
                this.process.stdout.on("data", callback);
                break;
            
            case "error":
                this.process.stderr.on("data", callback);
                break;
        }
    }
    kill() {
        this.process.kill();
    }

    get pid() {
        return this.process.pid;
    }
}

const child = new PythonWorker("../scripts/main.py");
child.on("message", (d)=>console.log(String(d)));
child.on("error", (d)=>console.log(String(d)));

// console.log(child)

setInterval(() => {
    // console.log(child.exitCode)
    child.send("Hello");

}, 1000);