const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/db.js')
const route = require('./routes/auth');
const port = process.env.port || 8080
const app = express();
dotenv.config();
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use('/api',route);
app.listen(port,()=>{ console.log(`PORT ${port}`)})