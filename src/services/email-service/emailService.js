import nodemailer from 'nodemailer';
import { emailConfig } from './emailConfig';
import logger from '../log-service/utils/logger'

const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
    }
});


export const sendEmail = async (userEmail, emailBody, emailSubject) => {
    const mailOptions = {
        from: emailConfig.from,
        to: userEmail,
        subject: emailSubject,
        text: emailBody,
    };

    try{
        await transporter.sendMail(mailOptions);
        logger.info("Email sent sucessfully!")
    }catch(error){
        logger.info("Error sending email!")
    }
}


