const mongoose = require('mongoose');

const donationrecordsSchema = new mongoose.Schema({
    donorNIC: {
        type: String,
   
    },
    bloodType: {
        type: String,
    },
    donateDate: {
        type: String,
    },
    addBy: {
        type: String,
    },
    details:
    {
        type: String,
    }

});

module.exports = mongoose.model('donationrecords', donationrecordsSchema);