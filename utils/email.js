const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: "9jaPoll Admin <info@9japoll.ng>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. send email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
