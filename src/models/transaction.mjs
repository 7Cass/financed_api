import mongoose from "mongoose";

export const TransactionTypesEnum = {
    income: 'income',
    outcome: 'outcome'
}

const TransactionSchema = new mongoose.Schema(
    {
        transactionType: {
            type: String,
            enum: TransactionTypesEnum,
            default: TransactionTypesEnum["income"],
            required: true
        },
        value: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        wallet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallets'
        }
    },
    { timestamps: true }
);

export const Transaction = mongoose.model("Transactions", TransactionSchema);
