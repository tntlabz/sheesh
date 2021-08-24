import React from 'react'
import "./titleBar.less";


import { SyncAltRounded, RemoveRounded, Crop54Rounded, CloseRounded } from "@material-ui/icons";

// const { ipcRenderer } = require("electron");

const TitleBar = () => {
    console.log(electron)
    return (
        <div className="titleBar">
            <div className="appInfo">
                <SyncAltRounded className="appIcon" />
                <span className="appName">SHEESH</span>
            </div>
            <div className="dragArea"></div>
            <div className="windowButtons">
                <button
                    onClick={() => {
                        electron.ipc.send("window:minimize");
                    }}
                >
                    <RemoveRounded className="windowIcon" />
                </button>
                <button
                    onClick={() => {
                        electron.ipc.send("window:maximize");
                    }}
                >
                    <Crop54Rounded className="windowIcon maximize" />
                </button>
                <button
                    onClick={() => {
                        electron.ipc.send("window:close");
                    }}
                >
                    <CloseRounded className="windowIcon" />
                </button>
            </div>
        </div>
    );
}

export default TitleBar
