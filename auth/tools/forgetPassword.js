const nodemailer=require('nodemailer')
const ls = require('local-storage')
const jwt = require('jsonwebtoken')

function forgetpassword() {
const mail = ls('mailToken')
console.log(mail)

const mailToken = jwt.sign({mail},process.env.SECRETWORD)  // TOKEN HAVE EMAIL 
        let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'fatihhaa27@gmail.com',
                    pass:'fwpktpowqxesuptk',
                },
        });
  
    let info = {
      from: '"MARHABA :forget password" <fatihhaa27@gmail.com>', 
      to: mail,  // ! deja stocker dans  "signup"
      subject: "acount verification",  
      html: '<a href="http://localhost:8080/api/auth/resetPassword/'+mailToken+'">click here to reset password </a>', 
    };

    transporter.sendMail(info)
    console.log('visit your email to reset password')
  
  }
  module.exports = {forgetpassword}