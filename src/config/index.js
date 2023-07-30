import dotenv from "dotenv";
dotenv.config();

export const smtp_config = {
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_KEY
    }
};