require('dotenv').config();
const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.TRANSPORTER,
                pass: process.env.EMAIL_APPLICATION_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.TRANSPORTER,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendMail };
