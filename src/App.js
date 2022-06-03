import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./general.css"
import { ChatApp } from "./chat.js"

export function App() {
    return (
        <div className="full-size">
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/chat" element={<Chat />} />
            </Routes>
        </div>
    )
}

function Login() {

    return (
        <div>
            <nav>
                <Link to="/chat">Home</Link>
            </nav>
        </div>
    )

}

function Chat() {

    return (
        <ChatApp />
    )

}