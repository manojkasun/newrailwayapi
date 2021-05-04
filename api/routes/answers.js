const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Solutions = require('../models/solutions.js');

router.get('/', (req, res, next) => {

Solutions.find()
  .select('_id hospitel solution postId  date  ')
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Sample solutions Found'
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


//get answers on question id
router.get('/:id', (req, res, next) => {
    const qId = req.params.id;
    Solutions.find({postId: qId})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Sample solutions Found' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})

module.exports = router;
