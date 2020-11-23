import Chat from "../models/chat.model";

const ChatRepository = () => {
    return {
        search(query = {}) {
            let filters = {};
            let $or = [{ public: true }, { default: true }];
            if (Object.keys(query).includes('user_id')) {
                $or.push({ members : query.user_id });
            }
            if ($or.length) {
                filters.$or = $or;
            }

            return Chat.find(filters)
                .populate({
                    path: 'messages',
                    populate:  {
                        path: 'sender',
                    },
                }).populate( { path: 'members' });
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

        async attachUser(chatId, userId) {
            const chat = await this.find(chatId);
            chat.members.addToSet(userId);
            return chat.save().then(chat => chat.populate({path: 'members', populate: 'messages'}).execPopulate());
        },

        async detachUser(chatId, userId) {
            const chat = await this.find(chatId);
            chat.members.pull({ _id: userId });
            return chat.save();
        },

        async attachMessage(chatId, messageId) {
            const chat = await this.find(chatId);
            chat.messages.addToSet(messageId);
            return chat.save();
        },
    }
}

export default ChatRepository;