import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    username: String,
    date: { type: Date, default: Date.now },
    //messageCount: Number,
    lastLogin: { type: Date, default: Date.now }

});

export const User = mongoose.model('User', userSchema);


