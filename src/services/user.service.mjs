import {User} from "../models/user.mjs";

class UserService {
    async findAll() {
        return User.find();
    }

    async findById(userId) {
        return User.findOne({_id: userId});
    }

    async findByEmail(email) {
        return User.findOne({ email });
    }
}

export default new UserService();
