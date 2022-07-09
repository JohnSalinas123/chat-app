const path = require('path');

// initialize express app
const express = require('express');
const app = express();

// environental variables and port
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

// daos for mongo db and connection
let userDAO = require('./dao/userDAO.js');
let MessagesDAO = require('./dao/messagesDAO');
const mongoose = require('mongoose');

//mongoose connection
mongoose.connect(process.env.CHAT_DB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to mongodb!");
}).catch(error => console.log(error));

// socket io server
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io");
const { emit } = require('process');
const io = new Server(server);

app.use('/api/messages', require('./routes/chatRoute'));


const indexPath = __dirname + "/../frontend/public";
const resolvedPath = path.resolve(indexPath);
app.use(express.static(path.join(__dirname, "../frontend","build")));
app.use(express.static(resolvedPath));

let curUser

// socket.io on connection
io.on('connection', (socket) => {

    socket.on('guest', () => {
        console.log("A user has connected")
    })

    socket.on('signup', (user, callback) => {

        // check if username already exists
        if (userDAO.checkIfUserExists(user.username)) {
            console.log("Username taken!");
            callback({
                valid: false,
                reason: "username-taken"
            })
            return
        }

        // create new user
        userDAO.createUser(user);
        console.log(user);
        callback({
            valid: true
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

});




server.listen(process.env.PORT, () => console.log(`Server started on ${port}`));