const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
    });

    const message = {
        from: `${process.env.SMTP_SENDER_NAME} <${process.env.SMTP_SENDER_EMAIL}>`,
        to: options?.recipientEmail,
        subject: options?.subject,
        html: options?.html
    };

    await transport.sendMail(message);
}

module.exports = sendEmail;