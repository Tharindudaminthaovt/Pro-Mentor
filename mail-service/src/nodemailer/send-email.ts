import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, html: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_EMAIL as string,
            pass: process.env.NODEMAILER_PASSWORD as string,
        }
    });

    try {
        const response = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to,
            subject,
            html,
            text
        });
        console.debug(response);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email.", (error as Error).message);
        console.debug(error);
    }
    
};

export default sendEmail;