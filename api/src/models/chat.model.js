import { Schema, model } from 'mongoose';

const chatSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        members: [{
            type: Schema.ObjectId,
            ref: 'User'
        }],
        messages: [{
            type: Schema.ObjectId,
            ref: 'Message'
        }]
    },
    { timestamps: true },
);

const Chat = model('Chat', chatSchema);
export default Chat;