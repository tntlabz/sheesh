import React, { useState } from 'react';
import TitleBar from './components/TitleBar/TitleBar';

import Home from './pages/home/Home';
import Login from './pages/login/Login';


const App = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({
        username: "",
        password: "",
        id: null,
        createdAt: ""
    });

    const loginUser = () => {
        
    }

    return (
        <>
            <TitleBar />
            { authenticated ? <Home /> : <Login authenticated={authenticated} /> }
        </>
    )
}

export default App

