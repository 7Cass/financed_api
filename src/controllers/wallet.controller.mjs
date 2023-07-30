import WalletService from "../services/wallet.service.mjs";
import Logger from "../utils/logger.mjs";

class WalletController {
    async create(req, res) {
        try {
            const { balance, user } = req.body;

            if (!user) return res.status(400).json({ data: 'Invalid body, you must pass a user. Ex: "user": "8b64c5a45b6"' });

            const walletAlreadyExists = await WalletService.findByUserId(user);

            if (walletAlreadyExists) {
                return res.status(400).json({ data: 'User already has a wallet.' });
            }

            await WalletService.create({
                balance,
                user
            });

            const newWallet = await WalletService.findByUserId(user);

            res.status(201).json({ data: newWallet });
        } catch (e) {
            Logger.error(e.message);
            res.status(400).json({ data: e.message });
        }
    }

    async findAll(req, res) {
        try {
            const walletList = await WalletService.findAll();

            res.status(200).json({ data: walletList });
        } catch (e) {
            Logger.error(e.message);
            res.status(400).json({ data: e.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;

            const wallet = await WalletService.findById(id);

            if (!wallet) return res.status(404).json({ data: 'Wallet not found'});

            res.status(200).json({ data: wallet });
        } catch (e) {
            Logger.error(e.message);
            res.status(400).json({ data: e.message });
        }
    }
}

export default new WalletController();
