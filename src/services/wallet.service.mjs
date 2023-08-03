import {Wallet} from "../models/wallet.mjs";
import TransactionService from "./transaction.service.mjs";
import {User} from "../models/user.mjs";

class WalletService {
    async create(createWalletDto) {
        const wallet = await Wallet.create(createWalletDto);
        await User.findByIdAndUpdate(
            { _id: createWalletDto.user },
            { wallet: wallet._id }
        );

        return wallet;
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
