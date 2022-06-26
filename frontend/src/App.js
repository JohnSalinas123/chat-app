import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles/general.css"
import { ChatApp } from "./pages/chat.js"
import { Login } from "./pages/login.js"

export function App() {
    return (
        <div className="full-size">
            <Routes>
               <Route path="/" element={<LoginPage />} />
               <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </div>
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