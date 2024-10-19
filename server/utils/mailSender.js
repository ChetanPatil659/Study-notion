const nodemailer = require("nodemailer")
require('dotenv').config();

const mailSender = async (email, title, body) => {
  console.log(email)
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user:  process.env.EMAIL,
          pass: process.env.PASS
      }
  })
    let info = await transporter.sendMail({
      from: `"StudyNotion"`,
      to: `${email}`, 
      subject: `${title}`, 
      html: `${body}`, 
    })
    return info
  } 
  catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender
