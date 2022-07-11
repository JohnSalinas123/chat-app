import React, {useState, useContext, useEffect} from 'react'
import '../styles/login.css'
import { useNavigate} from 'react-router-dom';
import { SocketContext } from '../context/socket'

export function Login() {

    // User credentials
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    // alert message
    const [alert, setAlert] = useState("")

    const [loginMode, setLoginMode] = useState(true);
    const navigate = useNavigate();

    // Socket connection
    const socket = useContext(SocketContext);

    // handle changes in input
    const getCredentials = (event) => {
        const eventID = event.target.id

        switch (eventID) {
            case "username":
                setUserName(event.target.value);
                //console.log(username);
                break;

            case "password":
                setPassword(event.target.value);
                //console.log(password);
                break;

            case "confirm":
                setConfirm(event.target.value);
                //console.log(confirm);
                break;
            default:
                console.log("Credential error!")
            
        }

    };

    const handleClick = () => {
        
        // stop if fields are empty
        if (username == "") {
            return;
        }

        // login or signup
        const emitName = loginMode ? "login" : "signup";

        socket.emit(`${emitName}`, {
            username: username,
            password: password,
        }, (response) => {
            console.log(response.valid);

            if (response.valid == true) {
                console.log("Login successful!");
                navigate("./chat", { replace: true, state: {name: username}});
                return;
            }

            setAlert(response.reason)

            console.log(`${loginMode ? "Login failed!" : "Sign up failed!"}`)

        })
        
        
    };

    const toggleMode = () => {
        if (loginMode) {
            setLoginMode(false);
        } else {
            setLoginMode(true);
        }
        console.log(loginMode.toString())
    };

    
    useEffect(() => {

        socket.emit("guest")

        return () => socket.disconnect();
    }, [])

    return (
        <div className="login-box-outer center">
            <div className="login-box-inner">
                
                <div className="center-text form-title">
                    <p>Quick Chat</p>
                </div>

                <button className={"login-switch " + (loginMode ? "switch-selected" : "")} type="button" onClick={toggleMode}>
                    Login
                </button>
                <button className={"login-switch " + (!loginMode ? "switch-selected" : "")} type="button" onClick={toggleMode}>
                    Signup
                </button>

                <div className="center-text report-box">
                    <p>{alert}</p>
                </div>
                

                <div className="field">
                    <input id = "username" className="input-box" placeholder="Username" onChange={getCredentials}/> 
                </div>
                <div className="field">

                    <input id = "password" type="password" className="input-box" placeholder="Password" onChange={getCredentials}/>
                </div>    
                    { !loginMode &&
                        <div className="field">
                            <input id = "confirm" type="password" className="input-box" placeholder="Confirm Password" onChange={getCredentials}/>
                        </div>
                    }
                
                

                <button id="action-button" type="button" onClick={handleClick}>
                    {loginMode ? "Login" : "Sign Up"}
                </button>
                
                
            </div>
            
        </div>
        

    )

}

