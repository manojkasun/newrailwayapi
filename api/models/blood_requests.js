const mongoose = require('mongoose');
const moment = require('moment');

const blood_requestsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hospitel: {
        type: String, 
    },
    hospitelAddress:  {
        type: String, 
     },
     hospitelcontact:  {
        type: String, 
    },
    postedDate:  {
        type: String, 
      },
    details:  {
        type: String,
        },
    blood:
    {
        type: String,

    },
    created_at:
    {
        type: String,
    },
    city:
    {
        Type: String,
        
    },
    district:{
        type: String,
    },
    
});

module.exports = mongoose.model('blood_requests', blood_requestsSchema)