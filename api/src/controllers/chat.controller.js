export default (chatService) => {
    return {
        search: async (req, resp) => {
            const chats = await chatService.search();
            return resp.json(chats);
        },

        find: async (req, resp)  => {
            const chat = await chatService.find({_id: req.params.id});
            return resp.json(chat);
        },

        create: async (req, resp) =>{
            const chat = await chatService.create(req.body);
            return resp.json(chat);
        },

        update: async (req, resp) => {
            const chat = await chatService.update(req.params.id, req.body);
            return resp.json(chat);
        },

        delete: async (req, resp) => {
            await chatService.delete(req.params.id);
            return resp.json();
        }
    }
}