import {Transaction} from "../models/transaction.mjs";
import WalletService from "./wallet.service.mjs";

class TransactionService {
    async findByUserId(userId) {
        return Transaction.find({ user: userId }).populate('wallet');
    }

    async create(createTransactionDto, walletId) {
        const transaction = await Transaction.create(createTransactionDto);
        return await WalletService.updateWallet(walletId, transaction._id);
    }

    async findByTransactionId(transactionId) {
        return Transaction.findOne({ _id: transactionId });
    }
}

export default new TransactionService();
