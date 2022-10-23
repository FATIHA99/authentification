// !this file contain the
// TODO  sign in and signup function
// TODO  function confirmation for the email adresse 
// TODO  function forget password to  send the verification to the email 
// TODO function reset password to update password  after the email sended 
// TODO fuctions to render pages
// TODO function to logout
const model = require('../models/AuthModel.js')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken');
const ls = require('local-storage')
const verf = require('../tools/email_verif')
const password_verification = require('../tools/forgetPassword')

function signUp(req, res) {
    const { body } = req;
    ls('email', req.body.email)
    const hashPassword = bcrypt.hashSync(body.password, 10)
    User.findOne({ email: body.email })
        .then((e) => {
            if (e) { res.json({ message: 'email already exist  ' }) }
            else {
                body.password = hashPassword;
                User.create({ ...body })
                    .then(() => {
                        verf._nodemailer()
                        res.send('verify your email')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
        .catch()
}

function signIn(req, res) {
    const { body } = req
    const inputPass = body.password
    User.findOne({ email: body.email }).then((e) => {
        const data = e;
        const password = bcrypt.compareSync(inputPass, e.password)
        if (!e) { res.json({ success: false, message: 'User not found.' }); }
        else if (e) {
            if (!password) { res.json({ message: 'password wrong ' }) }
            else {
                if (e.confirmation) {
                    console.log('everything is right ')
                    const token = jwt.sign({ data }, process.env.SECRETWORD)
                    ls('token', token);
                    // res.redirect('http://localhost:8080/api/auth/'+data.role)   
                    res.render('home', { d: data })
                } else {
                    res.send('verify your account ')
                }
            }
        }
    })
        .catch(error => { res.send(error) })
}

const confirmation = (req, res) => {
    console.log('confirmation')
    const { token } = req.params;
    const tkn = jwt.verify(token, process.env.SECRETWORD)
    req.data = tkn
    User.findOneAndUpdate({ email: req.data.email }, { confirmation: true })
        .then(res.redirect('/api/auth/login'))
}

const forgetPassword = (req, res) => {
    const { body } = req
    const email = body.email;
    console.log(email)
    User.findOne({ email: email })
        .then((user) => {
            if (!user) { res.send('user not found with this email') }
            else {
                ls('mailToken', email)
                password_verification.forgetpassword()
                res.send('visit email')
            }
        })
}

const resetPassword = (req, res) => {
    const { mailToken } = req.params
    const verifToken = jwt.verify(mailToken, process.env.SECRETWORD)
    req.mail = verifToken.mail;
    const pass = req.body.password;
    const passHash = bcrypt.hashSync(pass, 10)
    User.findOneAndUpdate({ email: req.mail }, { password: passHash })
        .then((e) => {
            res.redirect('/api/auth/login')
        })
        .catch(error => {
            res.send(error)
        })
}

const renderLoginPage = (req, res) => { res.render('login') }
const renderRegisterPage = (req, res) => { res.render('register') }
const renderConfirmationPage = (req, res) => {
    const token = req.params
    res.render('confirmation', { token })
}
const Client = (req, res) => { res.send('Client Page ') }
const Livreur = (req, res) => { res.send('Livreur Page') }
const forgetPasswordPage = (req, res) => { res.render('forgotPassword') }
const resetPasswordPage = (req, res) => {
    const mailToken = req.params
    res.render('resetPassword', { mailToken })
}
const logout = (req,res)=>{
    ls.clear()
    res.redirect('/api/auth/login')
}
module.exports = { signUp, signIn, confirmation, forgetPassword, resetPassword, renderLoginPage, renderRegisterPage, renderConfirmationPage, Client, Livreur, forgetPasswordPage, resetPasswordPage,logout}