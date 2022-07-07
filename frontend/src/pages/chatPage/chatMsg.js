import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../styles/chat.css';
import { SocketContext, socket } from '../../context/socket'


export function ChatMsg(props) {
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