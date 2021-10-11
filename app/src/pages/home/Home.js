import React, { useState } from 'react';

import "./home.less";

const Home = ({user}) => {

    const [state, setState] = useState({
        contacts: [{username:"Tom F", userInfo:"Hey im tom"}],
        currentChat: {
            recipient: "Tom",
            userPicture: "",
            messages: [
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tim"},
                {text: "Wazzup?", file: "", from: "Tom"},
                {text: "u gud?", file: "", from: "Tom"},
                {text: "ye-yeet! I really feel like writing an essay today. so how are you doing? I'm currently programming a sick chat app with javascript and react!", file: "", from: "Tim"},
            ]
        },
        loadingContacts: true,
        loadingChat: false
    });

    console.log("contacts:", state.contacts);
    console.log("mapped:", state.contacts.map(contact => {
        return "test";
    }));

    return (
        <div className="homePage">
            {/* { `Logged in as ${user.username} (${user.id})` } */}
            <div className="contacts">
                {state.contacts.map(contact => {
                    return <Contact key={contact.username} {...contact} />;
                })}
            </div>
            <div className="chat">
                {state.currentChat && <Chat {...state.currentChat} />}
            </div>
        </div>
    )
}

const Contact = ({profilePicture, username, userInfo}) => {
    return (
        <div className="contact">
            <img src={profilePicture} />
            <div>
                <span className="username">{username}</span>
                <span className="info">{userInfo}</span>
            </div>
        </div>
    )
}

const Chat = ({username, profilePicture, messages}) => {
    return (
        <>
            <div className="chatInfo">
                <img src={profilePicture} />
                <span className="username">{username}</span>
            </div>
            <div className="chatWrapper">
                {
                    messages.map(msg => {
                        return (
                            
                            <>
                                <div className="messageWrapper">
                                    <div className={msg.fromMe ? "message fromMe" : "message"} >
                                        {msg.text}
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home