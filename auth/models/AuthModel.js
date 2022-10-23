const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    confirmation: {type: Boolean,default: false},
});

mongoose.model('User', employeeSchema);