import React from 'react'
import {useState} from 'react'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';

export function Login() {

    const [username,setUsername] = useState("");
    let navigate = useNavigate();

    const getUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleClick = () => {
        console.log(username);
        if (username == "") {
            return;
        }
        navigate("./chat", { replace: true, state: {name: username}})
    };

    return (
        <div className="login-box-outer center">
            <div className="login-box-inner">
                <div className="input-box">
                    <label for="username">Username:</label>
                    <input type="text" id = "username" onChange={getUsername}></input>
                </div>
                {/*
                <div className="input-box">
                    <label for="password">Password:</label>
                    <input type="password" id="password"></input>
                </div>
                */}
                <button id="login-button" type="button" onClick={handleClick}>
                    Login
                </button>
                
            </div>
            
        </div>
        

    )

}

