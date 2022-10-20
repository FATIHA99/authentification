const model = require('../models/AuthModel.js')
const  bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
// const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const ls = require('local-storage')
const verf = require('../routes/email_verif')

// ! register  (hash , verification for email , localstorage , )
// *************************************************************************************
 function signUp(req,res){
   const {body} = req;
   ls('email',req.body.email)
   const hashPassword = bcrypt.hashSync(body.password,10)
   User.findOne({ email : body.email })
    .then((e)=>{
        if(e){res.json({  message: 'email already exist  '})}
        else
        {
        body.password = hashPassword;
        User.create({...body})
        .then((e)=>{
             verf._nodemailer()
             if(confirmation===false){
                res.send('verify your email')
             }
            //  res.send('verifier votre compte ')  
        }) 
        //! confirmation
        .catch((error)=>{
            console.log(error)
        })
        }
    })
    .catch()
}
// *************************************************************************************

// ! authentification 
function signIn(req,res){
 const {body} = req
  const inputPass = body.password
    User.findOne({ email : body.email }).then((e)=>{
        const data = e;
        const password = bcrypt.compareSync(inputPass ,e.password)
        if (!e) { res.json({ success: false, message: 'User not found.' });}
        else if(e){
            if(!password) { res.json({  message: 'password wrong '})}
            else{
                console.log('everything is right ')
                const token = jwt.sign({data} , process.env.SECRETWORD)     //! creation token 
                ls('token',token);                                         //!  stock the token to the local storage 
                // res.redirect('http://localhost:8080/api/auth/'+data.role)   
                res.render('home',{d: data})
            }
        }
    })
    .catch(error=>{res.send(error)})
}
// *************************************************************************************

// ! confirmation 

const confirmation = (req,res)=>
{ 
    console.log('confirmation')

   const {token} = req.params;
   const tkn = jwt.verify(token,process.env.SECRETWORD) //!
   req.data = tkn
   User.findOneAndUpdate({email:req.data.email},{confirmation: true})
   .then(res.redirect('/api/auth/login'))
}
// *************************************************************************************

// ! reset password 
const resetPassword  = (req,res)=>{

   const {body} = req
   res.json({ body})

}

module.exports = {signUp,signIn,confirmation,resetPassword}