const nodemailer = require("nodemailer");
// const fs = require('fs');

module.exports = {
  sendMail: async function (mailOptions) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'thintryin@gmail.com',
        pass: 'mghs tals opjh gnrt'
      }
    });

    return await transporter.sendMail(mailOptions);
  }
};