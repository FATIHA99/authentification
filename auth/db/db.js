const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authentification')
.then(()=>console.log('Connected to MongoDB'))
.catch(()=>console.log('not connected'))