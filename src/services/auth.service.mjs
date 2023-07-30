import bcrypt from "bcryptjs";
import {User} from "../models/user.mjs";
import jwt from "jsonwebtoken";

class AuthService {
    generateToken(userId) {
        return jwt.sign(
            {userId: userId},
            process.env.SECRET,
            {expiresIn: process.env.TOKEN_EXPIRATION}
        );
    }

    async register(createUserDto) {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);

        return await User.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashPassword
        });
    }
}

export default new AuthService();
