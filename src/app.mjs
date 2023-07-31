import {loadEnv} from "./initializers/loadEnv.mjs";
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { connectDb } from './initializers/db.mjs';
import wallet from './routes/wallet.mjs';
import user from "./routes/user.mjs";
import transaction from './routes/transaction.mjs';
import Logger from "./utils/logger.mjs";
import cron from 'node-cron';

loadEnv();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/wallet', wallet);
app.use('/user', user);
app.use('/transaction', transaction);

// Ping
app.get('/ping', (_, res) => res.status(200).send('pong!'));

app.listen(PORT, async () => {
    await connectDb();
    Logger.verbose(`🚀 Server is running on port: ${PORT}.`);
    Logger.verbose('🔧 Initializing Ping Cron Job.');
    // cron.schedule('* * * * *', async () => {
    //     Logger.log('🛰️Cron running ' + new Date().toString());
    //     await fetch('https://financed-api.onrender.com/ping');
    // });
});
