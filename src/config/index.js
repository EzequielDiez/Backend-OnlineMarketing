import pino from 'pino';
import dotenv from 'dotenv';
dotenv.config();
import { resolve } from 'path';

export const smtp_config = {
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_KEY
    }
};

export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentation Ecommerce API',
            description: 'This is the documentation of the API created for an ecommerce.'
        }
    },
    apis: [resolve('docs/*.yaml')]
};

export const loggerConfig = pino({
    transport: {
        level: "debug",
        target: 'pino-pretty'
    }
});
