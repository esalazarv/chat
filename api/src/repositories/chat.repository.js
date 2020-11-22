import Chat from "../models/chat.model";

const ChatRepository = () => {
    return {
        search() {
            return Chat.find();
        },

        find(id) {
            return Chat.findOne({_id: id});
        },

        findByName(name) {
            return Chat.findOne({name});
        },

        create(data) {
            const chat = new Chat(data);
            return chat.save();
        },

        async createIfNotExists(data) {
            const chat = await this.findByName(data.name);
            if (!chat) {
                return this.create(data);
            }
            return chat;
        },

        update(id, data) {
            return Chat.findOneAndUpdate({_id: id}, data, { new: true });
        },

        delete(id) {
            return Chat.findOneAndDelete({_id: id});
        },
    }
}

export default ChatRepository;