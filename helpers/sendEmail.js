const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const { MAILTRAP_USER, MAILTRAP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});

const sendEmail = async (data) => {
  try {
    const { to, subject, text } = data;

    await transporter.sendMail({
      from: "nastia60203@gmail.com",
      to,
      subject,
      text,
    });

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendEmail;
