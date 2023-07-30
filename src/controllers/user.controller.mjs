import userService from "../services/user.service.mjs";
import UserService from "../services/user.service.mjs";
import Logger from "../utils/logger.mjs";

class UserController {
    async findAll(req, res) {
        try {
            const usersList = await userService.findAll();

            res.status(200).json({ data: usersList });
        } catch (e) {
            Logger.error(e);
            res.status(400).json({ data: e.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(id);

            if (!user) return res.status(404).json({ data: 'User not found'});

            res.status(200).json({ data: user });
        } catch (e) {
            Logger.error(e);
            res.status(400).json({ data: e.message });
        }
    }
}

export default new UserController();
