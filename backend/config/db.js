import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(ENV_VARS.DATABASE_URL);
        console.log("Connected to Database: " + conn.connection.host);
    } catch(e) {
        console.log("Error connecting to Database: " + e.message);
        process.exit(1); //1 error, 0 success
    }
}