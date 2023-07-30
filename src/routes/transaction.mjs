import {ensureAuth} from "../middlewares/ensureAuth.mjs";
import {Router} from "express";
import {Transaction, TransactionTypesEnum} from "../models/transaction.mjs";
import {Wallet} from "../models/wallet.mjs";
import wallet from "./wallet.mjs";
const router = Router();

router.get('/', ensureAuth, async (req, res) => {
    try {
        const { userId } = req.user;

        const transactions = await Transaction.find({ user: userId }).populate('wallet');

        return res.status(200).json({ data: transactions });
    } catch (e) {
        console.error(e);

        return res.status(400).json({ data: e.message });
    }
});

router.post('/', ensureAuth, async (req, res) => {
    try {
        const { transactionType, value } = req.body;
        const { userId } = req.user;
        const walletExists = await Wallet.findOne({ user: userId });

        if (!walletExists) return res.status(404).json({ data: 'Wallet not found'});

        const transaction = await Transaction.create({ transactionType, value });
        const updatedWallet = await Wallet.findOneAndUpdate(
            { _id: walletExists._id },
            {
                $push: { transactions: transaction },
                balance: TransactionTypesEnum[transactionType] === 'income' ? walletExists.balance + value : walletExists.balance - value },
            { returnOriginal: false }
        ).populate('transactions');

        return res.status(200).json({ data: updatedWallet });
    } catch (e) {
        console.error(e);

        return res.status(400).json({ data: e.message });
    }
});

export default router;
