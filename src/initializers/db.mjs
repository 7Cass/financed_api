import mongoose from "mongoose";
import Logger from "../utils/logger.mjs";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        Logger.verbose('🗄️Connected to database!');
    } catch (e) {
        Logger.error('⚠️ Error connecting to database!');
        process.exit(1);
    }
}
