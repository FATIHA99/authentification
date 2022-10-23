const mongoose = require('mongoose');
const dotenv= require('dotenv')
dotenv.config()
mongoose.connect(process.env.DATABASE)
.then(()=>console.log('Connected to MongoDB'))
.catch(()=>console.log('not connected'))