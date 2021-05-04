const mongoose = require('mongoose');
const moment = require('moment');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6
    },
    subject: {
        type: String,
       // type:[String],
       // index: '2dsphere',
        required: true
    },
    date: {
        type: String,
        default: moment().format("MMM Do YYYY"), //also use shortDate,
        required: true
    },
    postBy: {
        type: String,
      //  default: 'Donor',
        required: true,
    },
    discription: {
        type: String,
        required: true,
        min: 10
    },
   /*  image: {
        type: String
            // required:true
    }, */
    authortype: {
        type: String,
        default: "Donor",
        required: true,
    },
    
});

module.exports = mongoose.model('Posts', postSchema);