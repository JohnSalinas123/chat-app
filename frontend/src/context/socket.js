import React from 'react'
import io from "socket.io-client"

export const socket = io(process.env.APP_SOCKET_URL);
export const SocketContext = React.createContext();