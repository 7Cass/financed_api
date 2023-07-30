import dotenv from 'dotenv';
import Logger from "../utils/logger.mjs";

export function loadEnv() {
    dotenv.config();

    Logger.verbose('Loaded Environment Variables.');
}
