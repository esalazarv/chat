import User from "../models/user.model";

const UserRepository = () => {
    return {
        search() {
            return User.find();
        },

        find(id) {
            return User.findOne({_id: id});
        },

        findByNickName(nickname) {
            return User.findOne({nickname});
        },

        create(data) {
            const user = new User(data);
            return user.save();
        },

        async createIfNotExists(data) {
            const user = await this.findByNickName(data.nickname);
            if (!user) {
                return this.create(data);
            }
            return user;
        },

        update(id, data) {
            return User.findOneAndUpdate({_id: id}, data, { new: true });
        },

        delete(id) {
            return User.findOneAndDelete({_id: id});
        },
    }
}

export default UserRepository;