const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/db.js')
const route = require('./routes/auth');
const HandleError = require('./tools/ErrorHandling.js');
const ErrorHandling = require('./tools/ErrorHandling.js');
const GlobalErr = require('./tools/globalError');
const globalError = require('./tools/globalError');

const port = process.env.port || 8080
const app = express();
dotenv.config();
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use('/api',route);

app.all('*',(req,res,next)=>{
    next(new ErrorHandling(`page not found :${req.originalUrl}`,400))
})

app.use(globalError)
app.listen(port,()=>{ console.log(`PORT ${port}`)})