const nodemailer = require("nodemailer");

// SMTP config
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "fredy.moen5@ethereal.email", // Ethereal Email address
        pass: "MKjBXSfhgpxsPC3bGb", // Ethereal Email password
    },
});

const sendEmail = (email, subject, html) => {
    transporter
        .sendMail({
            from: '"Alex Application" <alex@application.com>',
            to: email,
            subject, html,
        })
        .then(info => {
            console.log("Message sent! messageId: %s", info.messageId);
            console.log("View email: %s", nodemailer.getTestMessageUrl(info));
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = sendEmail;