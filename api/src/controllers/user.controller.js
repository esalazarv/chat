const UserRepository = (userRepository) => {
    return {
        async search(req, resp) {
            const users = await userRepository.search();
            return resp.json(users);
        },

        async find(req, resp) {
            const user = await userRepository.find({_id: req.params.id});
            return resp.json(user);
        },

        async create (req, resp) {
            const user = await userRepository.create(req.body);
            return resp.json(user);
        },

        async update(req, resp) {
            const user = await userRepository.update(req.params.id, req.body);
            return resp.json(user);
        },

        async delete (req, resp) {
            await userRepository.delete(req.params.id);
            return resp.json();
        }
    }
}

export default UserRepository;