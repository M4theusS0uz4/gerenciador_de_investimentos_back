import nodemailer from 'nodemailer';
import { emailConfig } from './emailConfig.js';
import logger from '../log-service/utils/logger.js'
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Criar transporte sem o 'service' (remover 'service: gmail')
const transporter = nodemailer.createTransport({
    host: emailConfig.host,  // Defina explicitamente o host do Gmail
    port: emailConfig.port,  // Porta STARTTLS (587)
    secure: emailConfig.secure,  // Definido como false para STARTTLS
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
    },
});

const getEmailTemplate = (filename) => {
    const filePath = path.join(__dirname, '../../views/', filename+'.html');
    return fs.readFileSync(filePath, 'utf-8');
};

export const sendEmailWelcome = async (username,userEmail) => {
    const template = getEmailTemplate('welcome');
    const htmlBody = template
    .replace('{{nome}}',username)
    .replace('{{ano}}', new Date().getFullYear())
    const mailOptions = {
        from: emailConfig.from,
        to: userEmail,
        subject: "Welcome!",
        html: htmlBody,
    };

    try{
        await transporter.sendMail(mailOptions);
        logger.info("Email sent sucessfully!")
        return;
    }catch(error){
        logger.info("Error sending email!")
        return;
    }
}


export const sendEmailPasswordChanged = async (username,userEmail) => {
    const template = getEmailTemplate('resetPassword');
    const htmlBody = template
    .replace('{{nome}}',username)
    .replace('{{ano}}', new Date().getFullYear())
    const mailOptions = {
        from: emailConfig.from,
        to: userEmail,
        subject: "Password Changed!",
        html: htmlBody,
    };


    try{
        await transporter.sendMail(mailOptions);
        logger.info("Email sent sucessfully!")
        return;
    }catch(error){
        console.log(error)
        logger.info("Error sending email!")
        return;
    }
}


