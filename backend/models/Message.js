const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    username: String,
    text: String,
    date: {type: Date, default: Date.now},
    
});

module.exports = mongoose.model('Message', messageSchema);