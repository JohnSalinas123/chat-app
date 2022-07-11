const express = require('express');
const dbConnect = require('./database.js');
const dotenv = require('dotenv').config();
const userDAO = require('./dao/userDAO.js');
const MessagesDAO = require('./dao/messagesDAO');
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
const { Server } = require("socket.io");
const { emit } = require('process');
const io = new Server(server);

// socket.io connection
io.on('connection', (socket) => {

    socket.on('guest', () => {
        console.log("A user has connected")
    })

    socket.on('signup', (user, callback) => {

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