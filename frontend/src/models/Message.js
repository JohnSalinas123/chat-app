const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    date: { type: Date, default: Date.now },
    
});

module.exports = mongoose.model('Message', messageSchema);