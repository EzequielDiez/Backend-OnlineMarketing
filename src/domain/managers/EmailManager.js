import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import { resolve } from 'path';

import { smtp_config } from '../../config/index.js';

class EmailManager
{
    static async sendEmail(data)
    {
        const { templateFileName, payload } = data;
        const transporter = nodemailer.createTransport(smtp_config);
        const templatePath = resolve(`src/presentation/templates/${templateFileName}`);
        const source = fs.readFileSync(templatePath).toString();
        const compiledTemplate = Handlebars.compile(source);
        const html = compiledTemplate(payload);

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: payload.email,
            subject: payload.subject,
            html
        };

        await transporter.sendMail(mailOptions);
    }
}

export default EmailManager;
