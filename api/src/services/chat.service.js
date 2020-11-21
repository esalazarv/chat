import Chat from "../models/chat.model";

export default class ChatService {
    search() {
        return Chat.find();
    }

    find(id) {
        return Chat.findOne({_id: id});
    }

    create(data) {
        const chat = new Chat(data);
        return chat.save();
    }

    update(id, data) {
        return Chat.findOneAndUpdate({_id: id}, data, { new: true });
    }

    delete(id) {
        return Chat.findOneAndDelete({_id: id});
    }
}