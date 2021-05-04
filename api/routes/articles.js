const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/articles.js');

router.get('/', (req, res, next) => {
   
Article.find()
  .select('_id postBy date title status discription reference created_at ')
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Articles Found'
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


//get only importent articles
router.get('/:id', (req, res, next) => {
    const status = req.params.id;
    Article.find({status: status})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Importent Articles Found' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})

module.exports = router; 