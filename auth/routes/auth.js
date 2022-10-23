const router = require("express").Router()
const {signUp,signIn,confirmation,forgetPassword,resetPassword,renderLoginPage,renderRegisterPage,renderConfirmationPage,Client,Livreur,forgetPasswordPage,resetPasswordPage, logout} = require('../controllers/AuthController.js')
const verif = require('../tools/verificationRole')
const emv = require('../tools/email_verif')


router.post('/auth/login',signIn);
router.post('/auth/register',signUp);
router.get('/auth/login',renderLoginPage);
router.get('/auth/register',renderRegisterPage);
router.get('/auth/confirm/:token',renderConfirmationPage); 
router.post('/auth/confirm/:token',confirmation);
router.get('/auth/client', verif.verificationRole(['client']),Client)
router.get('/auth/livreur', verif.verificationRole(['livreur']),Livreur)
router.get('/auth/forgotPassword',forgetPasswordPage);
router.post('/auth/forgotPassword',forgetPassword)
router.get('/auth/resetPassword/:mailToken',resetPasswordPage)
router.post('/auth/resetPassword/:mailToken',resetPassword)
router.get('/auth/logout',logout)
module.exports = router