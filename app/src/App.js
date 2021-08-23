import React, { useState } from 'react';

import Home from './pages/home/Home';
import Login from './pages/login/Home';


const App = () => {

    const [authenticated, setAuthenticated] = useState(false);

    return (
        <>
            { authenticated ? <Home /> : <Login /> }
        </>
    )
}

export default App

