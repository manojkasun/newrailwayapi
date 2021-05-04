const mongoose = require('mongoose');
const moment = require('moment');

const blood_confirmSchema = mongoose.Schema({
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
    bloodRequestId:  {
        type: String, 
    },
    confirmDate:  {
        type: String, 
        default: moment().format("MMM Do YYYY")
      },
     month:  {
       required: true,
        type: String, 
        default: moment().format("MMM YYYY")
      },
    details:  {
        type: String,
        },
    requestedblood:
    {
        type: String,

    },
    city:
    {
        Type: String,
        
    },
    donorId:{
        type: String,
        required: true,
        unique: true,
    },
    donorContact:{
        type: String,
    },
    donorBloodType:{
        type: String,
    },
    status:{
        type: String,
        default: 'not',
    },

  
});
 blood_confirmSchema.index({ "month": 1, "donorId": 1}, { "unique": true });
module.exports = mongoose.model('blood_confirm', blood_confirmSchema)