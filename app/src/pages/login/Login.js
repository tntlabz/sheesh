import React, { useState } from 'react'

import { PersonRounded, ArrowRightAltRounded, VpnKeyRounded, DoneRounded } from '@material-ui/icons';

import "./login.less";
import ThreeDotSpinner from '../../components/ThreeDotSpinner/ThreeDotSpinner';

const Login = ({authenticated}) => {

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        username: "",
        password: "",
        rememberme: false
    })

    const loginUser = (e) => {
        e.preventDefault();
        setLoading(!loading);
        setAuthenticated(!authenticated);
    }

    const signUp = () => {}
    const stateChanged = (e) => {
        setState({...state, [e.target.id]: e.target.value})
    }

    return (
        <div className="loginWrapper">
            <form className="loginForm">
                <span className="title">Login</span>
                <div className="inputField">
                    <input
                        value={state.username}
                        id="username"
                        type="text"
                        placeholder="Username"
                        spellCheck="false"
                        onChange={stateChanged}
                    />
                    <PersonRounded className="inputIcon" />
                </div>
                <div className="inputField">
                    <input
                        value={state.password}
                        id="password"
                        type="password"
                        placeholder="Password"
                        spellCheck="false"
                        onChange={stateChanged}
                    />
                    <VpnKeyRounded className="inputIcon" />
                </div>
                <div className="remembermeWrapper">
                    <input
                        type="checkbox"
                        id="rememberme"
                        onClick={() =>
                            setState({
                                ...state,
                                rememberme: !state.rememberme
                            })
                        }
                    />
                    <div>{state.rememberme && <DoneRounded className="icon" />}</div>
                    <span>Remember Me</span>
                </div>
                <div className="buttonWrapper">
                    <button
                        className={
                            loading ? "loginButton loading" : "loginButton"
                        }
                        onClick={loginUser}
                    >
                        {!loading ? (
                            <ArrowRightAltRounded className="loginIcon" />
                        ) : (
                            <ThreeDotSpinner />
                        )}
                    </button>
                </div>
                <span className="signUp">
                    No Account? <a onClick={signUp}>Sign Up</a>
                </span>
                <footer className="formInfo">
                    Copyright (C) 2021 TnT Labz
                </footer>
            </form>
        </div>
    );
}

export default Login
