import {Wallet} from "../models/wallet.mjs";
import TransactionService from "./transaction.service.mjs";

class WalletService {
    async create(createWalletDto) {
        return Wallet.create(createWalletDto);
    }

    async findAll() {
        return Wallet.find().populate(['user', 'transactions']);
    }

    async findById(walletId) {
        return Wallet.findOne({ _id: walletId }).populate(['user', 'transactions']);
    }

    async findByUserId(userId) {
        return Wallet.findOne({ user: userId }).populate('user');
    }

    async updateWallet(walletId, transactionId) {
        const wallet = await this.findById(walletId);
        const transaction = await TransactionService.findByTransactionId(transactionId);

        const { transactionType, value } = transaction;
        const { balance } = wallet;

        return Wallet.findOneAndUpdate(
            { _id: wallet._id },
            {
                $push: { transactions: transaction },
                balance: transactionType === 'income' ? balance + value : balance - value },
            { returnOriginal: false }
        ).populate('transactions');
    }
}

export default new WalletService();
