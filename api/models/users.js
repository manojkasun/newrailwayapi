const mongoose = require('mongoose');
const moment = require('moment');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    location: {
        type: String,
    },
    city:
    {
        Type: String,

    },
   

});

module.exports = mongoose.model('users', usersSchema)