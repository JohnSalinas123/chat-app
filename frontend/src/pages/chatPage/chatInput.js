import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../styles/chat.css';
import { SocketContext, socket } from '../../context/socket';

export function ChatInput({setInput,handleClick}) {

    const getInput = (event) => {
        setInput(event.target.value)
    }

    return (
        <div className="chat-input">
            <div className="chat-textbox-box">
                <input className="chat-textbox" type="text" onChange={getInput}/>
            </div>
            <input className="chat-button" type="submit" value="Send" onClick={handleClick} />
        </div>
    )
}