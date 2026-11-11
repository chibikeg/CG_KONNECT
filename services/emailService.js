const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const sendVerificationCode = async (email, name, code) => {
    return transporter.sendMail({
        from: process.env.sendMail,
        to: email,
        subject: "Verify your CG KONNECT email",
        text: `Hello ${name},\n\nYour verification code is: ${code}\n\nPlease use this code to verify your email address. It expires in 10 minutes.\n\nThank you,\nCG KONNECT Team.`,
    })
}

module.exports = {
    sendVerificationCode
}