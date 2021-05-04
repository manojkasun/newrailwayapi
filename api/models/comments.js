const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    commentBy: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    
    
});

module.exports = mongoose.model('comment', commentSchema);