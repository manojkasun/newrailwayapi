const mongoose = require('mongoose');
const moment = require('moment');

const donorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String, 
        required: true, 
        unique: true
    },
    email:  {
        type: String, 
        min: 7 , 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:  {
        type: String, 
        min: 8 , 
        required: true, 
    },
    phoneNumber:  {
        type: String, 
        min: 10 , 
        default: '94713156112',
       // required: true, 
       // unique: true,
      //  match: /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/
    },
    nic:  {
        type: String,
        min: 10,
        max: 12 , 
        required: true, 
        unique: true
        },
    type:
    {
        type: String,
        required: true,
        default: 'donor'

    },
    birthYear:
    {
        type: Number,
        max:4,
        min:4,
        default: null
    },
    donorType:
    {
        max: 3,
        type: String,
        default: "not set"
    },
    bloodType: {
        type: String,
        max: 3,
        default: 'Pending'
    },
    city:
    {
           type: String,
        max: 3,
        default: 'Pending'
        
    },
    district:{
        type: String,
        min: 4,
        default: "not set"
    },
    homeNumber:{
        type: String, 
        min: 10 , 
       default: "not set"
    },
    address: {
        type: String, 
        min: 15, 
        default: "not set"
    },
    relatedBloodBank: {
        type: String,
        default: "not set"
    },
    EBloodCardNo: {
        type: String,
        default: "not set"
    },
    status:
    {
        type: String,
        required: true,
        default: 'pending'

    },
    created_on:
    {
        type: String,
        required: true,
        default: moment().format('LL'),
    },
    update_on: 
    {
        type: Date,
        required: true,
        default: new Date(),
    }

});

module.exports = mongoose.model('Donor', donorSchema)