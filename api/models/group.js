const mongoose = require('mongoose');
const moment = require('moment');
const groupSchema = new mongoose.Schema({
    details: {
        type: String,
    },
    date: {
        type: String,
        default: moment().format("MMM Do YYYY"),
    },
    donorID: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    district: {
        type: String,
    },
    name: {
        type: String,
    },

    
    
});

module.exports = mongoose.model('group', groupSchema);

