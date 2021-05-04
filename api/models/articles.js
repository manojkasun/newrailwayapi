const mongoose = require('mongoose');

const articlesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postBy: {
        type: String, 
    },
    title:  {
        type: String, 
     },
    status:  {
        type: String, 
    },
    discription:  {
        type: String, 
      },
    reference:  {
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
    date:{
        type: String,
    }
    
});

module.exports = mongoose.model('articles', articlesSchema)