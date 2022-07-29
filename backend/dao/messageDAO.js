const mongoose = require('mongoose');
const Message = require('../models/Message');

async function createMessage(message) {
    const { username, text } = message;
    try {
        const message = await Message.create({
            username: username,
            text: text,
        });
        return message;
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    createMessage,
}