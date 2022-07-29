const express = require('express');
const dbConnect = require('./database.js');
const dotenv = require('dotenv').config();
//const userDAO = require('./dao/userDAO.js');
const MessageDAO = require('./dao/messageDAO');
const { Server } = require("socket.io");
const path = require('path');

dbConnect();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

const indexPath = __dirname + "/../frontend/public";
const resolvedPath = path.resolve(indexPath);
app.use(express.static(path.join(__dirname, "../frontend","build")));
app.use(express.static(resolvedPath));

const http = require('http');
const server = http.createServer(app)

const io = new Server(server);

// socket.io connection
io.on('connection', (socket) => {

    socket.on("guest", () => {
        console.log("An unknown user has connected");
    });

    socket.on("login", (username) => {
        console.log(`${username} has logged in!`)
    });

    socket.on("signup", (username) =>  {
        console.log(`${username} has signed up!`);
    });

    socket.on("message", (message, callback) => {

        const { username, text, date } = message;

        if (!username || !text) {
            callback({
                status: "error",
                info: "Message details missing!"
            })
            return;
        }

        // create message, add it to database
        const newMessage = {
            username : username,
            text : text,
            date : date,

        }
        let createdMessage = MessageDAO.createMessage(newMessage);
        console.log(newMessage);

        if (createdMessage) {
            // broadcast new message to all connected
            socket.broadcast.emit("receiving", newMessage)

            callback({
                status: "ok",
                message: newMessage,
            });

        } else {
            callback({
                status: "error",
                info: "Failed to create message!"
            });
        }

    });

    socket.on('disconnect', () => {

        console.log('A user disconnected');    

    });

});




server.listen(process.env.PORT, () => console.log(`Server started on ${port}`));