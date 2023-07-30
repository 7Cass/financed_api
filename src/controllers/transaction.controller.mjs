import Logger from "../utils/logger.mjs";
import TransactionService from "../services/transaction.service.mjs";
import WalletService from "../services/wallet.service.mjs";

class TransactionController {
    async create(req, res) {
        try {
            const { transactionType, value } = req.body;

            if (!value) return res.status(400).json({ data: 'Missing body.' });

            const { userId } = req.user;
            const walletExists = await WalletService.findByUserId(userId);

            if (!walletExists) return res.status(404).json({ data: 'Wallet not found'});

            const updatedWallet = await TransactionService.create({ transactionType, value }, walletExists._id);

            return res.status(200).json({ data: updatedWallet });
        } catch (e) {
            Logger.error(e.message);
            return res.status(400).json({ data: e.message });
        }
    }

    async findAllByUserId(req, res) {
        try {
            const { userId } = req.user;

            const transactions = await TransactionService.findByUserId(userId);

            return res.status(200).json({ data: transactions });
        } catch (e) {
            Logger.error(e.message);
            return res.status(400).json({ data: e.message });
        }
    }
}

export default new TransactionController();
