import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'

class ChatApp extends React.Component {

    render() {

        return (
            <div id="outer-chatbox">

                <div className="chatbox">



                </div>
                
            </div>
        )
    }

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
root.render(Cha)