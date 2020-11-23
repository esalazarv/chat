import Message from "../models/message.model";

const MessageRepository = () => {
    return {
        search() {
            return Message.find();
        },

        find(id) {
            return Message.findOne({_id: id});
        },

        create(data) {
            const message = new Message(data);
            return message.save();
        },

        update(id, data) {
            return Message.findOneAndUpdate({_id: id}, data, { new: true });
        },

        delete(id) {
            return Message.findOneAndDelete({_id: id});
        },
    }
}

export default MessageRepository;