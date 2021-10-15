import React, { useState } from 'react';

import "./home.less";

const Home = ({user}) => {

    const [state, setState] = useState({
        contacts: [{username:"Tom F", userInfo:"Hey, im writing you a very long message."}],
        currentChat: {
            recipient: "Tom",
            userPicture: "",
            messages: [
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Eine lange Nachricht!", file: "", from: "Tom", fromMe:true},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom", fromMe:true},
                {text: "Eine noch deutlich längere Nachricht... Seeeehr lang... Noch länger, hört nicht auf!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom", fromMe:true},
                {text: "Hello!", file: "", from: "Tom", fromMe:true},
                {text: "test1234567890!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "awiluefgius!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Heawoufhsddofhllo!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tom"},
                {text: "Hello!", file: "", from: "Tim"},
                {text: "Wazzup?", file: "", from: "Tom", fromMe:true},
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
            <img src="https://avatars.githubusercontent.com/u/71983360?v=4" />
            <div>
                <span className="username">{username}</span>
                <span className="info">{userInfo}</span>
            </div>
        </div>
    )
}

const Chat = ({members, messages}) => {
    return (
        <>
            <div className="chatInfo">
                <img src="" />
                <span className="username"></span>
            </div>
            <div className="chatWrapper">
                {
                    messages.map(msg => {

                        // const sender = members.filter()

                        return (
                            
                            <div className={msg.fromMe ? "messageWrapper fromMe" : "messageWrapper notFromMe"} >
                                <img src="https://avatars.githubusercontent.com/u/71983360?v=4" alt="" className="profilePicture" />
                                <div className="message" >
                                    {msg.text}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home