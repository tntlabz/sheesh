import React, { useState } from 'react'

import Home from './pages/home'
import Login from './pages/login'


const App = () => {

    const [authenticated, setauthenticated] = useState(false);

    return (
        <>
            { authenticated ? <Home /> : <Login /> }
        </>
    )
}

export default App

