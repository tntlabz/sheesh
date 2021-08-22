import React from 'react'

import "./login.less";

const Login = () => {
    return (
        <div className="loginWrapper">
            <form className="loginForm" >
                <span className="title">Account<br/>Login</span>
                <div className="inputField">
                    <input id="username" type="text" placeholder="Username" />
                </div>
                <div className="inputField">
                    <input id="password" type="password" placeholder="Password" />
                </div>
                <div className="inputField buttonWrapper"><button className="loginButton">Login</button></div>
            </form>
        </div>
    )
}

export default Login
