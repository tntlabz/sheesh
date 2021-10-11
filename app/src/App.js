import React, { useState, useEffect } from 'react';
import TitleBar from './components/TitleBar/TitleBar';

import Home from './pages/home/Home';
import Login from './pages/login/Login';

import ws from "./util/socket";



const App = () => {

    const [appState, setAppState] = useState({
        authenticated: false,
        user: {
            username: "",
            email: "",
            password: "",
            id: null,
            createdAt: ""
        },
        page: "home"
    });

    useEffect(() => {
        const callback = data => {
            console.log("got user: ", data);
            setAppState({
                ...appState,
                authenticated: true,
                user: data.user,
                page: "home"
            });
        }
        ws.on("user", callback);

        return () => { ws.off("user", callback) };
    }, []);

    // const showPage = (page) => {
    //     setAppState({
    //         ...appState,
    //         page: page
    //     });
    // }

    return (
        <>
            <TitleBar />
            {appState.page==="login" && <Login />}
            {appState.page==="home" && <Home user={appState.user} />}
            {appState.page==="settings" && "Settings"}
        </>
    )
}

export default App

