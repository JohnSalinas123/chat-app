import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles/general.css"
import { ChatApp } from "./pages/chat.js"
import { Login } from "./pages/login.js"
import { socket, SocketContext } from "./context/socket";

export function App() {
    return (
        <SocketContext.Provider value={socket}>
            <div className="full-size">
            <Routes>
               <Route path="/" element={<LoginPage />} />
               <Route path="/chat" element={<ChatPage />} />
            </Routes>
            </div>
        </SocketContext.Provider>
        
    )
}

function LoginPage() {

    return (
        <Login />
    )

}

function ChatPage() {

    return (
        <ChatApp />
    )

}