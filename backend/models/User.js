const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema ({
    username: String,
    password: String

}, 
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);


