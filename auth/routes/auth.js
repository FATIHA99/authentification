const router = require("express").Router()
const {signUp,signIn,confirmation,resetPassword} = require('../controllers/AuthController.js')
const verif = require('./verificationToken')
const emv = require('./email_verif')


router.post('/auth/login',signIn);
router.post('/auth/register',signUp);

router.post('/auth/resetpassword',resetPassword);
router.get('/auth/login',(req,res) => 
{ res.render('login')});
router.get('/auth/register',(req,res) =>
{res.render('register')});

// router.get('/auth/test',emv._nodemailer);
// ! confirmation 
router.get('/auth/confirm/:token',(req,res) => { 
    const token = req.params
    res.render('confirmation',{token})
});

router.post('/auth/confirm/:token',confirmation);


// router.get('/auth/client', (req,res)=>{
//     res.send('page client')
// });




router.get('/auth/client', verif.verificationToken(['client']),(req,res)=>{
    res.send('CLIENT  exist ')
})

module.exports = router