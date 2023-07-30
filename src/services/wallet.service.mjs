import {Wallet} from "../models/wallet.mjs";

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
}

export default new WalletService();
