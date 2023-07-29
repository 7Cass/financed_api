import { Router } from 'express';
import { User } from "../models/user.mjs";
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const usersList = await User.find();

        res.status(200).json({ data: usersList });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });

        res.status(200).json({ data: user });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailAlreadyExists = await User.findOne({ email });

        if (emailAlreadyExists) {
            return res.status(400).json({ data: 'Email already exists.'});
        }

        const newUser = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({ data: newUser });

    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(404).json({ data: 'User not found' });
        }

        const passwordMatch = userExists?.password === password;

        if (!passwordMatch) {
            return res.status(400).json({ data: 'Wrong password' });
        }

        const token = jwt.sign(
            {_id: userExists?._id, email: userExists?.email },
            'secret',
            { expiresIn: '1min'});

        res.status(200).json({ data: token });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

export default router;