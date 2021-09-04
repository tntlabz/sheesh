import React, { useState } from 'react';
import TitleBar from './components/TitleBar/TitleBar';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
const db = electron.db;


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

    const showPage = (page) => {
        setAppState({
            ...appState,
            page: page
        });
    }

    return (
        <>
            <TitleBar />
            {appState.page==="login" && <Login showPage={showPage} />}
            {appState.page==="home" && <Home />}
            {appState.page==="settings" && "Settings"}
        </>
    )
}

export default App

