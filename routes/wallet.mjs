import { Router } from 'express';
import {Wallet} from "../models/wallet.mjs";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const walletList = await Wallet.find().populate('user');

        res.status(200).json({ data: walletList });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const wallet = await Wallet.findOne({ _id: id }).populate('user');

        res.status(200).json({ data: wallet });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

router.post('/', async (req, res) => {
    try {
        const { balance, user } = req.body;

        // todo: Add verificação qnd houver user_id vinculado ao wallet
        const walletAlreadyExists = await Wallet.findOne({ user });

        if (walletAlreadyExists) {
            return res.status(400).json({ data: 'User already has a wallet.' });
        }

        await Wallet.create({
            balance,
            user
        });

        const newWallet = await Wallet.find({user}).populate('user');

        res.status(201).json({ data: newWallet });
    } catch (e) {
        console.error(e);

        res.status(400).json({ status: 400, message: e.message.toString() });
    }
});

export default router;