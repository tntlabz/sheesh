import React, { useState } from 'react';

import "./home.less";

const Home = () => {

    const [state, setState] = useState({
        contacts: [],
        currentChat: {
            recipient: "Tom",
            userPicture: "",
            messages: [
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tim"},
                {text: "Wazzup?", file: "", from: "Tom"},
                {text: "u gud?", file: "", from: "Tom"},
                {text: "ye-yeet!", file: "", from: "Tim"},
            ]
        },
        loadingContacts: true,
        loadingChat: false
    });

    return (
        <div className="homePage">
            <div className="contacts">
                {
                    state.contacts.forEach(contact => {
                        return <Contact {...contact} />
                    })
                }
            </div>
            <div className="chat">
                {state.currentchat && <Chat {...state.currentChat} />}
            </div>
        </div>
    )
}

const Contact = ({userPicture, userName, userInfo}) => {
    return (
        <div className="contact">
            <img src={userPicture} />
            <div>
                <span className="userName">{userName}</span>
                <span className="info">{userInfo}</span>
            </div>
        </div>
    )
}

const Chat = ({userName, userPicture, messages}) => {
    return (
        <>
            <div className="chatInfo">
                <img src={userPicture} />
                <span className="userName">{userName}</span>
            </div>
            {
                messages.forEach(msg => {
                    return <div className="message" className={msg.fromMe ? "fromMe" : ""} >
                        {msg.text}
                    </div>
                })
            }
        </>
    )
}

export default Home