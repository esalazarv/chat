import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        chat: {
            type: Schema.ObjectId,
            ref: 'Chat',
        },
        sender: {
            type: Schema.ObjectId,
            ref: 'User',
        },
        receiver: {
            type: Schema.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const Message = model('Message', messageSchema);
export default Message;