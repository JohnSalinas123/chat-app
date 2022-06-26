const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    username: String,
    date: { type: Date, default: Date.now },
    //messageCount: Number,
    lastLogin: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', userSchema);


