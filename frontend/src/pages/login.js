import React, {useState, useContext, useEffect} from 'react';
import '../styles/login.css';
import { useNavigate} from 'react-router-dom';
import { SocketContext } from '../context/socket';
import axios from 'axios';

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

        // check if all fields are filled or password match
        if (!username || !password || (!confirm && !loginMode)) {
            setAlert("All fields required!");
            return;
        } else if (password != confirm && !loginMode) {
            setAlert("Passwords don't match!");
            return;
        }

        // login user
        if (loginMode) {

            const loginUser = async () => {
                try {

                    const config = {
                        headers: {
                            "Content-type" : "application/json",
                        }
                    }

                    const { data } = await axios.post(
                        'api/user/login',
                        {
                            username,
                            password,
                        },
                        config
                    );

                    console.log(data);

                    navigate('/chat', { 
                        replace: false, 
                        state: {
                            id: data.id,
                            username: data.username,
                        },
                    });
                    
                } catch (error) {

                    if (error.response) {
                        setAlert(error.response.data.message)
                    }

                }

                

            }

            loginUser();

        // register user
        } else {


            const registerUser = async () => {
                try {

                    const config = {
                        headers: {
                            "Content-type" : "application/json",
                        },
                    }

                    const { data } = await axios.post(
                        '/api/user',
                        {
                            username,
                            password
                        },
                        config
                    );
                   
                    navigate('/chat', { 
                        replace: false, 
                        state: {
                            id: data.id,
                            username: data.username,
                        },
                    });
                
                } catch (error) {
                    console.log()
                    if (error.response) {
                        setAlert(error.response.data.message)
                    }

                }
            }

            registerUser();


        }        
        
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

