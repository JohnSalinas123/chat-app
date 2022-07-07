const path = require('path');

// initialize express app
const express = require('express');
const app = express()

// environental variables and port
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

// socket io server
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io");
const { emit } = require('process');
const io = new Server(server)

app.use('/api/messages', require('./routes/chatRoute'))


const indexPath = __dirname + "/../frontend/public"
const resolvedPath = path.resolve(indexPath)
//console.log(resolvedPath)
app.use(express.static(path.join(__dirname, "../frontend","build")))
app.use(express.static(resolvedPath))


// socket.io on connection
io.on('connection', (socket) => {

    socket.on('guest', () => {
        console.log("A guest has connected")
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

});




server.listen(process.env.PORT, () => console.log(`Server started on ${port}`));