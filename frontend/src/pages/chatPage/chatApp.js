import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../../styles/chat.css';
import { ChatInput } from './chatInput'
import { ChatMsg } from './chatMsg'
import { useLocation } from "react-router-dom";
import { SocketContext } from '../../context/socket';
import { io } from 'socket.io-client';



export function ChatApp() {

    const { state } = useLocation();
    const { name } = state;
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const socket = useContext(SocketContext)

    const handleClick = () => {
        const isOwner = true

        const newMessage = {
            userName: name,
            text: input,
            owner: isOwner
        }

        console.log(newMessage)

        setMessages(messages => [...messages, newMessage])
        console.log(messages)
    }

    let listMessages = messages.map((msg) => {
        <ChatMsg key={msg.userName} message={msg.text} owner={msg.owner}/>
    });

    
    useEffect(() => {


        return () => socket.disconnect();
    }, [])
    


    //renderMessage(message,time) {

    //}

    return (

        <div className="outer-chatbox">
            <CurrentUser userName={name} />

            <div className="chatbox">
                {listMessages}
            </div>
            <ChatInput setInput={setInput} handleClick={handleClick}/>
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





