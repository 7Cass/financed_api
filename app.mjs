import './loadEnv.mjs';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import wallet from './routes/wallet.mjs';
import user from "./routes/user.mjs";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/wallet', wallet);
app.use('/user', user);

app.listen(PORT, async () => {
    console.log(`🟢 Server is running on port: ${PORT}`);

    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log('🗄️Connected to database!');
    } catch (e) {
        console.log('⚠️ Error connecting to database!');
    }
});