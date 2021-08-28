import React, { useState } from 'react';
import TitleBar from './components/TitleBar/TitleBar';

import Home from './pages/home/Home';
import Login from './pages/login/Login';


const App = () => {

    const [appState, setAppState] = useState({
        authenticated: false,
        user: {
            username: "",
            password: "",
            id: null,
            createdAt: ""
        },
        page: "login"
    });
    

    const loginUser = (user) => {
        
    }
    const registerUser = (user) => {
        
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
            {appState.page==="login" && <Login loginUser={loginUser} />}
            {appState.page==="signup" && <Signup registerUser={registerUser} />}
            {appState.page==="home" && <Home />}
            {appState.page==="settings" && "Settings"}
        </>
    )
}

export default App

