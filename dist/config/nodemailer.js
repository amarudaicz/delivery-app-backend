"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
const sendEmail = (email, token, body) => {
    const dataEmail = {
        from: process.env.SMTP_USER,
        to: email,
        subject: body.subject,
        html: body.html,
        text: body.text,
    };
    transport.sendMail(dataEmail, (err, info) => {
        if (err) {
            return console.log("ERROR AL ENVIAR MAIL", err);
        }
        console.log(`Mail send succesfull ${info.messageId}`);
    });
};
exports.sendEmail = sendEmail;
