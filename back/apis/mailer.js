const nodemailer = require("nodemailer");

const USER = process.env.EMAIL_USER;
const PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER,
    pass: PASS,
  },
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: USER,
    to,
    subject: `[Mahafolio] ${subject}`,
    text,
  };
  try {
    await transporter.sendMail(mailOptions);
    return { receiver: to };
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendMail,
};
