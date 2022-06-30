const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const path = require('path');

const app = express()

app.use('/api/messages', require('./routes/chatRoute'))


const indexPath = __dirname + "/../frontend/public"
const resolvedPath = path.resolve(indexPath)
console.log(resolvedPath)
app.use(express.static(path.join(__dirname, "../frontend","build")))
app.use(express.static(resolvedPath))

app.listen(process.env.PORT, () => console.log(`Server started on ${port}`));