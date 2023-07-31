import {loadEnv} from "./initializers/loadEnv.mjs";
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { connectDb } from './initializers/db.mjs';
import wallet from './routes/wallet.mjs';
import user from "./routes/user.mjs";
import transaction from './routes/transaction.mjs';
import Logger from "./utils/logger.mjs";

loadEnv();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/wallet', wallet);
app.use('/user', user);
app.use('/transaction', transaction);

app.listen(PORT, async () => {
    await connectDb();
    Logger.verbose(`🚀 Server is running on port: ${PORT}`);
});
