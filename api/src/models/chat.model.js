import { Schema, model } from 'mongoose';

const chatSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        alias: {
            type: String,
            default: null,
        },
        public: {
            type: Boolean,
            default: false
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