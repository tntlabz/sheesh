import React, { useState, useContext } from 'react'

import { PersonRounded, EmailRounded, ArrowRightAltRounded, VpnKeyRounded, DoneRounded } from '@material-ui/icons';

import "./login.less";
import ThreeDotSpinner from '../../components/ThreeDotSpinner/ThreeDotSpinner';

import ws from "../../util/socket";



const Login = () => {

    const [loading, setLoading] = useState(false);
    const [needsAccount, setNeedsAccount] = useState(true);
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        rememberme: false
    });

    const loginUser = (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        console.log("start login");
        ws.send({
            type: "login",
            ...state
        });
    }

    const registerUser = (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        console.log("start register");
        ws.send({
            type: "register",
            ...state
        })
    }

    const stateChanged = (e) => {
        setState({...state, [e.target.id]: e.target.value})
    }

    return (
        <>
            <div className={needsAccount ? "hidden" : "loginWrapper"}>
                <CredentialForm title="Login" info="Copyright (C) 2021 TnT Labz" >
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
                    <span className="changeLoginSignup">
                        No Account? <a onClick={() => setNeedsAccount(true)}>Sign Up</a>
                    </span>
                </CredentialForm>
            </div>

            <div className={!needsAccount ? "hidden" : "loginWrapper"}>
                <CredentialForm title="Sign Up" info="Copyright (C) 2021 TnT Labz" >
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
                            value={state.email}
                            id="email"
                            type="text"
                            placeholder="Email"
                            spellCheck="false"
                            onChange={stateChanged}
                        />
                        <EmailRounded className="inputIcon" />
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
                    <div className="buttonWrapper">
                        <button
                            className={
                                loading ? "loginButton loading" : "loginButton"
                            }
                            onClick={registerUser}
                        >
                            {!loading ? (
                                <ArrowRightAltRounded className="loginIcon" />
                            ) : (
                                <ThreeDotSpinner />
                            )}
                        </button>
                    </div>
                    <span className="changeLoginSignup">
                        Already have an Account? <a onClick={()=>setNeedsAccount(false)}>Log In</a>
                    </span>
                </CredentialForm>
            </div>
        </>
    );
}

const CredentialForm = (props) => {

    return (
        <form className="loginForm">
            <span className="title">{props.title}</span>
            {props.children}
            <footer className="formInfo">
                {props.info}
            </footer>
        </form>
    )
}

export default Login
