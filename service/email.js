import dotenv from "dotenv"
import nodemailer from "nodemailer";
dotenv.config()

var transporters = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
});
export default transporters;