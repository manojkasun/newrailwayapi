const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    hospitel: {
        type: String,
        required: true
    },
    solution: {
        type: String,
   
    },
    postId: {
        type: String,

    },
    date: {
        type: String,

    },
    
    
});

module.exports = mongoose.model('Solution', solutionSchema);