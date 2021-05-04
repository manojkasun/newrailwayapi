const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    time: {
        type: String,
    },
    details: {
        type: String,
    },
    date: {
        type: String,
    },
    donorID: {
        type: String,
        required: true,
    },
    hospitel: {
        type: String,
    },
    hospitelContact: {
        type: String,
    },
    hospitelAddress: {
        type: String,
    },
    taskName:{
        type: String,
    },
    reqId:{
        type: String,
    }
    
    
});

module.exports = mongoose.model('Task', taskSchema);

