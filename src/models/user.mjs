import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        wallet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Wallets'
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);
