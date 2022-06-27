const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

var path = require('path')
var filePath = __dirname + "/../frontend/public/index.html"
var resolvedPath = path.resolve(filePath);
console.log(resolvedPath);

app.get('/', (req, res) => {
    res.sendFile(resolvedPath)
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});