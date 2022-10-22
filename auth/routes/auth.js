const router = require("express").Router()
const {signUp,signIn,confirmation,forgetPassword,resetPassword} = require('../controllers/AuthController.js')
const verif = require('../tools/verificationToken')
const emv = require('../tools/email_verif')


router.post('/auth/login',signIn);
router.post('/auth/register',signUp);


router.get('/auth/login',(req,res) => 
{ res.render('login')});
router.get('/auth/register',(req,res) =>
{res.render('register')});

// ! confirmation 
router.get('/auth/confirm/:token',(req,res) => { 
    const token = req.params
    res.render('confirmation',{token})
});

router.post('/auth/confirm/:token',confirmation);

// ! role
router.get('/auth/client', verif.verificationToken(['client']),(req,res)=>{
    res.send('CLIENT  exist ')
})
// ! forget password

router.get('/auth/forgotPassword',(req,res) =>
{
    res.render('forgotPassword')
});
router.post('/auth/forgotPassword',forgetPassword)
router.get('/auth/resetPassword/:mailToken',(req,res)=>{
    const mailToken = req.params
    res.render('resetPassword',{mailToken})
})
router.post('/auth/resetPassword/:mailToken',resetPassword)
module.exports = router