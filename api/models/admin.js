const moment = require('moment');
const mongoose = require('mongoose');

const adminsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        unique: true
    },
    email:  {
        type: String, 
        unique: true
     },
    password:  {
        type: String, 
    },
    created_at:
    {
        type: String,
        default: moment().format("MMM Do YYYY"), 
    },
    
});

module.exports = mongoose.model('admin', adminsSchema)