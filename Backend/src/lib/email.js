const nodeMailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
    if (!process.env.SMTP_HOST || !process.env.SMTP_PASS || !process.env.SMTP_USER) {
        console.log("Email envs are not available");
        return;
    }
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.EMAIL_FROM;

    const transport = nodeMailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
            user,
            pass
        }
    });

    await transport.sendMail({
        from, to, subject, html
    });

}

module.exports = sendEmail;