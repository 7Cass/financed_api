import { Router } from 'express';
import {Wallet} from "../models/wallet.mjs";
import {ensureAuth} from "../middlewares/ensureAuth.mjs";

const router = Router();

router.get('/', ensureAuth, async (req, res) => {
    try {
        const walletList = await Wallet.find().populate(['user', 'transactions']);

        res.status(200).json({ data: walletList });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

router.get('/:id', ensureAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const wallet = await Wallet.findOne({ _id: id }).populate(['user', 'transactions']);

        res.status(200).json({ data: wallet });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

router.post('/', ensureAuth, async (req, res) => {
    try {
        const { balance, user } = req.body;

        if (!user) return res.status(400).json({ data: 'Invalid body, you must pass a user. Ex: "user": "8b64c5a45b6"' });

        const walletAlreadyExists = await Wallet.findOne({ user });

        if (walletAlreadyExists) {
            return res.status(400).json({ data: 'User already has a wallet.' });
        }

        await Wallet.create({
            balance,
            user
        });

        const newWallet = await Wallet.findOne({user}).populate('user');

        res.status(201).json({ data: newWallet });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

export default router;
