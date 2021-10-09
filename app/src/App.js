import React, { useState } from 'react';
import TitleBar from './components/TitleBar/TitleBar';

import Home from './pages/home/Home';
import Login from './pages/login/Login';

import ws from "./util/socket";


const AppContext = React.createContext();


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
        page: "login"
    });

    function register(data) {
        ws.send({
            type: "register",
            ...data
        });
        ws.once("register", data => {
            setAppState({
                ...appState,
                authenticated: true,
                user: data.user
            });
        });
    }

    const showPage = (page) => {
        setAppState({
            ...appState,
            page: page
        });
    }

    return (
        <>
            <TitleBar />
            <AppContext.Provider value={register}>
                {appState.page==="login" && <Login showPage={showPage} />}
            </AppContext.Provider>
            {appState.page==="home" && <Home />}
            {appState.page==="settings" && "Settings"}
        </>
    )
}

export default App

