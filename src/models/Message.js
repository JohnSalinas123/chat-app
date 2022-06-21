import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    date: { type: Date, default: Date.now },
    
});

export const Message = mongoose.model('Blog', blogSchema);