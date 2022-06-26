import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/chat.css'
import  { useLocation } from "react-router-dom"


export function ChatApp() {

    const { state } = useLocation();
    const { name } = state;

    //renderMessage(message,time) {

    //}

    return (
        
        <div className="outer-chatbox">
            <CurrentUser userName={name} />

            <div className="chatbox">
                <MessageBubble message="Alright its set then!" owner={true} />
                <MessageBubble message="Yeah I'm down!" owner={false} />
                <MessageBubble message="Hey, is anyone down to play civ 5?
                I want to try out that new strategy with the french.
                The french weaponry is superior during this new path." owner={true}/>

            </div>
            <ChatInput />
        </div>

    )
    

}

function CurrentUser(props) {

    return (
        <div className="current-user-box">
            <p>Welcome {props.userName}!</p>
        </div>
    )

}

function ChatInput() {

    return (
        <div className="chat-input">
            <div className="chat-textbox-box">
                <input className="chat-textbox" type="text"/>
            </div>
            <input className="chat-button" type="submit" value="Send" />
        </div>
    )
}

function MessageBubble(props) {
    let dateObj= new Date();
    let msgTime = dateObj.toLocaleTimeString();
    let msgDate = dateObj.toLocaleDateString();

    let ownerClass = "msg-user";
    if (props.owner == false) {
        ownerClass = "msg-other";
    }

    return (
        <div className="msg-block">
            <div className={`msg-general ${ownerClass}`}>
                <div className="msg-interior">
                    <p className="msg-text">{props.message}</p>
                    <p className="msg-time">{`${msgDate}   ${msgTime}`}</p>
                </div>
            </div>
        </div>
        
    )
}

