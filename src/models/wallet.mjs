import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
    {
        balance: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transactions'
        }]
    },
    { timestamps: true }
);

export const Wallet = mongoose.model("Wallets", WalletSchema);
