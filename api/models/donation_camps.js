const mongoose = require('mongoose');
const donation_campsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organize_by: {
        type: String,
    },
     Contact_num:  {
        type: String,
    },
    created_at:  {
        type: String,
      },
    indetail:  {
        type: String,
        },
        poster:
    {
        type: String,

    },
    held_on:
    {
        type: String,
    },
    location:
    {
        Type: String,

    },
  latitude:{
    Type: String,
  },
  longitude:
  {
    Type: String,
  },
  address:{
    Type: String,
  },
  city:{
    Type: String,
  }


});

module.exports = mongoose.model('donation_camps', donation_campsSchema)
