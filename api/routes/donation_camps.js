const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Camps = require('../models/donation_camps.js');

router.get('/', (req, res, next) => {

Camps.find()
  .select('_id organize_by Contact_num location held_on  poster  indetail created_at longitude latitude address city ')
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Blood Donation Camps Found'
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


//get user's district blood requests
router.get('/:id', (req, res, next) => {
    const district = req.params.id;
    const setdistrict = district.charAt(0).toUpperCase() + district.slice(1)
    donation_camps.find({district: setdistrict})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Blood Donation Camps Found From Your District' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})

module.exports = router;
