const express = require('express');
const router = express.Router();
const Comment = require('../models/comments.js')
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Comment.find()
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Comments Found'
          });
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  })
});

router.post('/', (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        postId: req.body.postId,
        commentBy: req.body.commentBy,
        date: req.body.postOn,
        comment: req.body.comment

    });

    comment
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Comment successfull",
            createdComment: result
        });
  
})
    .catch(err => console.log(err));
    
    res.status(201).json({
        message: 'Comment REq /Post',
        createdComment: comment
    });
});


router.get('/:id', (req, res, next) => {
    const qId = req.params.id;
    Comment.find({articleId: qId})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Comments Found' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})

router.delete('/:commentId', (req, res, next) => {
    res.status(200).json({
        message: 'Comment deleted /posts',
        commentId: req.params.commentId
    });
});
module.exports = router;