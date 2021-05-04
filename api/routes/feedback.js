const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback.js')
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Feedback.find()
    .limit(20)
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No feedbacks Found'
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
    const feedback = new Feedback({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        rate: req.body.rate,
        date: req.body.postOn,
        feedback: req.body.feedback,

    });

    feedback
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Feedback add successfull",
            createdFeedback: result
        });
  
})
    .catch(err => console.log(err));
    
    res.status(201).json({
        message: 'Feedback REq /Post',
        createdFeedback: feedback
    });
});

//get all feedbacks
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
    .then()
    .catch();
    });

module.exports = router;