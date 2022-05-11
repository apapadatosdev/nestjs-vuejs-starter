import { Injectable } from '@nestjs/common';
const sgMail = require("@sendgrid/mail");
const sgMailContact = require("@sendgrid/client");


import * as fs from "fs";
import * as path from "path";


@Injectable()
export class EmailService { 
    constructor(){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMailContact.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendAccountActivationEmail(targetEmail: string, activationLink: string) {
        const filepath = path.resolve(__dirname, "../../../html/", "email-activate.html");
        let rawData = await fs.promises.readFile(filepath, "utf8");
        rawData = rawData.replace("#activationlink", activationLink);
        const textMsg = `Activate your account by following this link: '${activationLink}'`;
        await this.sendEmail({
            to: targetEmail,
            subject: "Please verify your account",
            message: rawData,
            text_msg: textMsg
        })
    }

    async sendEmail({ to, subject, message, text_msg }) {
        const msg = {
            to,
            from: {
                email: process.env.NOTIFICATION_EMAIL_FROM,
                name: process.env.NOTIFICATION_EMAIL_FROM_DESCRIPTION
            },
            subject,
            text: text_msg,
            html: message,
        };
        await sgMail.send(msg);
        // try {
            
        // } catch (e) {
        //     throw new Error("email error");
        // }
    }    
}