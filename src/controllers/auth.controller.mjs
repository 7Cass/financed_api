import UserService from "../services/user.service.mjs";
import Logger from "../utils/logger.mjs";
import AuthService from "../services/auth.service.mjs";
import {User} from "../models/user.mjs";
import bcrypt from "bcryptjs";

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) return res.status(400).json({ data: 'Invalid body' });

            const emailAlreadyExists = await UserService.findByEmail(email);

            if (emailAlreadyExists) {
                return res.status(400).json({ data: 'Email already exists.'});
            }

            const newUser = await AuthService.register({name, email, password});

            res.status(201).json({ data: newUser });

        } catch (e) {
            Logger.error(e);
            res.status(400).json({ data: e.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const userExists = await User.findOne({ email });

            if (!userExists) {
                return res.status(404).json({ data: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, userExists.password);

            if (!passwordMatch) {
                return res.status(400).json({ data: 'Wrong password' });
            }

            const token = await AuthService.generateToken(userExists._id);

            res.status(200).json({ data: token });
        } catch (e) {
            Logger.error(e.message);
            res.status(400).json({ data: e.message });
        }
    }
}

export default new AuthController();
