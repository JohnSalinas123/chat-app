import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'

class ChatApp extends React.Component {


    renderMessage(message,time) {

    }


    render() {

        return (
            
            <div className="outer-chatbox">
                <CurrentUser userName="John Salinas" />

                <div className="chatbox">

                

                </div>
                <ChatInput />
            </div>
        )
    }

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
    return (
        <div className="message-bubble">
            <p>{this.props.message}</p>
            <p>{this.props.time}</p>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ChatApp />)