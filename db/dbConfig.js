import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()


export const dbConfig = mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
}).catch((error) => {
    console.log(error);
});