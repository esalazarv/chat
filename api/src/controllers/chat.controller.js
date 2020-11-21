export default (chatRepository) => {
    return {
        async search(req, resp) {
            const chats = await chatRepository.search();
            return resp.json(chats);
        },

        async find(req, resp) {
            const chat = await chatRepository.find({_id: req.params.id});
            return resp.json(chat);
        },

        async create (req, resp) {
            const chat = await chatRepository.create(req.body);
            return resp.json(chat);
        },

        async update(req, resp) {
            const chat = await chatRepository.update(req.params.id, req.body);
            return resp.json(chat);
        },

        async delete (req, resp) {
            await chatRepository.delete(req.params.id);
            return resp.json();
        }
    }
}