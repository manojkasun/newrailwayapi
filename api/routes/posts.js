const express = require('express');
const router = express.Router();
const Post = require('../models/post.js')
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Post.find()
    .limit(20)
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Posts Found'
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
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        subject: req.body.subject,
        date: req.body.postOn,
        discription: req.body.discription,
        author_type: req.body.author,
        postBy: req.body.postBy

    });

    post
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Posted successfull",
            createdPost: result
        });
  
})
    .catch(err => console.log(err));
    
    res.status(201).json({
        message: 'POST REq /Post',
        createdPost: post
    });
});

//get user's posts
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Post.find({postBy: id})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No post Found that id' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})





router.delete('/:postId', (req, res, next) => {
    Post.deleteOne({_id: req.params.postId})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Post Deleted' });
    }
})
    .catch();
    });

module.exports = router;