const mongoose = require('mongoose');
const moment = require('moment');
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    rate: {
        type: String,
    },
    date: {
        type: String,
        default: moment().format("MMM Do YYYY"), //also use shortDate,
        required: true
    },
    feedback: {
        type: String,
    },
    
    
});

module.exports = mongoose.model('Feedbacks', feedbackSchema);